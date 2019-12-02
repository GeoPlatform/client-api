import request from 'request';
import { Config, ItemService } from '@geoplatform/client';
import NodeHttpClient from '../../http/node';
var GP_AUTH_COOKIE = 'gpoauth-a';
var ɵ0 = function (router, routes, options) {
    var _this = this;
    options = options || {};
    var paths = options.paths || {};
    var auths = options.auth || {};
    routes.forEach(function (route) {
        if (paths[route.key] === false)
            return; //disabled endpoint
        if (!paths[route.key] && !route.path)
            return; //something is wrong with route
        //newer route override...
        // {
        //   'create': {
        //     'path': 'custom/path',
        //     'auth': true,
        //     'onResponse': function(result, res, next) { }
        //   }
        // }
        var overrides = options[route.key] || {};
        //look for overriden paths in either new override structure or older key:path format
        var path = '/' + (overrides.path || paths[route.key] || route.path);
        //look for authentication override in either new structure or older format
        var needsAuth = overrides.auth || auths[route.key] || route.auth;
        if (options.logger) {
            options.logger.debug("Binding Service Route [" + route.method + "] " + path);
        }
        router[route.method](path, function (req, res, next) {
            var promise = null;
            if (typeof (route.onExecute) !== 'function') {
                promise = Promise.resolve(null);
            }
            else {
                if (options.logger) {
                    options.logger.debug("Executing Service Route [" + route.method + "] " + path);
                    options.logger.debug(JSON.stringify(req.params));
                    options.logger.debug("-------------------------");
                }
                var svc = _this.getService(req, needsAuth, options);
                try {
                    promise = route.onExecute(svc, req);
                }
                catch (e) {
                    promise = Promise.reject(e);
                }
            }
            promise.then(function (result) {
                var onResponse = overrides.onResponse || route.onResponse;
                if (onResponse)
                    onResponse(result, res, next);
                else
                    res.json(result);
            })
                .catch(function (err) {
                if (overrides.onError)
                    overrides.onError(err);
                if (options.onError)
                    options.onError(route.key, err);
                next(err);
            })
                .finally(function () {
                //if route has a finish function defined, invoke it
                if (overrides.onFinish) {
                    overrides.onFinish(req, res);
                }
                //if proxy has an overall finish function defined, invoke it
                var finishFn = options.onFinish;
                if (finishFn)
                    finishFn(route.key, req, res);
            });
        });
    });
    if (options && options.addl) {
        this.bindAdditionalRoutes(router, options);
    }
}, ɵ1 = function (router, options) {
    //fetch thumbnail proxy
    router.get('/items/:id/thumbnail', function (req, res, next) {
        var url = Config.ualUrl + '/api/items/' + req.params.id + '/thumbnail';
        request.get(url).pipe(res);
    });
    if (options && options.logger) {
        options.logger.debug("Binding Service Route [get] /items/:id/thumbnail");
    }
    //request new thumbnail be created
    router.post('/items/:id/thumbnail', function (req, res, next) {
        var url = Config.ualUrl + '/api/items/' + req.params.id + '/thumbnail';
        var token = (req.headers.authorization || '').replace('Bearer ', '');
        var cookie = this.getCookie();
        var opts = {}; //doesn't need a body when posting to thumbnail
        if (token)
            opts.auth = { bearer: token };
        if (cookie)
            opts.headers = { Cookie: this.authCookieName + '=' + cookie };
        request.post(url, opts).pipe(res);
    });
    if (options && options.logger) {
        options.logger.debug("Binding Service Route [post] /items/:id/thumbnail");
    }
}, ɵ2 = function (req, needsAuth, options) {
    var token = null;
    if (needsAuth) {
        token = req.accessToken || null;
        if (!token && !req.jwt) { //if not processed by middleware...
            token = (req.headers.authorization || '').replace('Bearer ', '');
        }
        if (options && options.logger) {
            // options.logger.debug(`ServiceProxy.getClient() - Token: ${token}`);
            // options.logger.debug(`ServiceProxy.getClient() - JWT: ${req.jwt}`);
            if (!token) {
                options.logger.warn("ServiceProxy.getClient() - No Access Token was provided on incoming request header!");
            }
            else if (!!options.debug) {
                options.logger.debug("ServiceProxy.getClient() - Token: " + token);
                options.logger.debug("ServiceProxy.getClient() - JWT: " + req.jwt);
            }
        }
        else if (!token) {
            console.log("[WARN] No Access Token provided on incoming request header");
        }
    }
    //check the incoming proxied request for cookies that should be forwarded along
    var cookie = this.getAuthCookie(req);
    // console.log("COOKIE IS " + cookie);
    if (cookie && !cookie.length)
        cookie = null;
    // if(options && options.logger) {
    //     options.logger.debug("Proxying Request Cookie: " + cookie);
    //     options.logger.debug(" ");
    // } else {
    //     console.log("Proxying Request Cookie: " + cookie);
    // }
    return new NodeHttpClient({
        timeout: Config.timeout,
        token: needsAuth ? token : null,
        cookie: needsAuth ? cookie : null
    });
}, ɵ3 = function (req, needsAuth, options) {
    var client = this.getClient(req, needsAuth, options);
    var svcClass = options.serviceClass || ItemService;
    // console.log("Proxying to " + Config.ualUrl);
    if (options.logger) {
        options.logger.debug("Proxying to " + Config.ualUrl);
        // options.logger.debug("Using service class: " + svcClass);
    }
    var service = new svcClass(Config.ualUrl, client);
    service.setTimeout(Config.timeout || 30000);
    if (options.logger) {
        service.setLogger(options.logger);
    }
    return service;
}, ɵ4 = function (req) {
    if (!req)
        return null;
    if (req.cookies) { //parsed by cookieParser already
        // console.log("COOKIES PARSED ... ");
        // console.log("COOKIES ARE...");
        // console.log(JSON.stringify(req.cookies));
        // console.log(" ");
        // console.log("AUTH COOKIE IS " + req.cookies[GP_AUTH_COOKIE]);
        return req.cookies[GP_AUTH_COOKIE];
    }
    else if (req.headers.cookie) {
        // console.log("COOKIES NEED PARSING");
        try {
            var cookies = this.parseCookies(req.headers.cookie);
            return cookies[GP_AUTH_COOKIE];
        }
        catch (e) {
            console.log("ERROR parsing cookies: " + e.message);
            return null;
        }
    }
}, ɵ5 = function parse(str) {
    if (!str || typeof str !== 'string' || !str.length)
        return null;
    var result = {};
    var expr = /; */;
    var pairs = str.split(expr);
    pairs.forEach(function (pair) {
        var sepIdx = pair.indexOf('=');
        if (sepIdx < 0)
            return; //ignore non- 'key=value' values
        var key = pair.substr(0, sepIdx).trim();
        var val = pair.substr(++sepIdx, pair.length).trim();
        // quoted values
        if ('"' == val[0])
            val = val.slice(1, -1);
        // only assign once
        if (undefined == result[key]) {
            var value = val;
            try {
                value = decodeURIComponent(val);
            }
            catch (e) { }
            result[key] = value;
        }
    });
    return result;
};
var ServiceProxy = {
    /**
     * @param {Router} router - ExpressJS router instance
     * @param {array[object]} routes - list of routes to map to the router
     * @param {object} options - additional configuration needed
     */
    bindRoutes: ɵ0,
    /**
     *
     */
    bindAdditionalRoutes: ɵ1,
    /**
    * @param {HttpRequest} req - incoming http request being proxied
    * @param {boolean} needsAuth - flag indicating if the request must provide an authentication token
    * @param {object} options - additional configuration options
    * @return {HttpClient} client to use to make requests to GeoPlatform API endpoint
    */
    getClient: ɵ2,
    /**
     * @param {HttpRequest} req - incoming http request being proxied
     * @param {boolean} needsAuth - flag indicating if request requires authorization token
     * @param {object} options - additional configuration options
     */
    getService: ɵ3,
    getAuthCookie: ɵ4,
    parseCookies: ɵ5
};
export default ServiceProxy;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvbm9kZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb3hpZXMvYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLE9BQU8sTUFBc0IsU0FBUyxDQUFDO0FBQzlDLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUQsT0FBTyxjQUFjLE1BQWUsaUJBQWlCLENBQUM7QUFFdEQsSUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDO1NBU25CLFVBQVMsTUFBWSxFQUFFLE1BQWMsRUFBRSxPQUFjO0lBQXJELGlCQTZFWDtJQTNFRyxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUN4QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUNoQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUUvQixNQUFNLENBQUMsT0FBTyxDQUFFLFVBQUEsS0FBSztRQUVqQixJQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSztZQUFFLE9BQU8sQ0FBRSxtQkFBbUI7UUFDM0QsSUFBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtZQUFFLE9BQU8sQ0FBQywrQkFBK0I7UUFFNUUseUJBQXlCO1FBQ3pCLElBQUk7UUFDSixnQkFBZ0I7UUFDaEIsNkJBQTZCO1FBQzdCLG9CQUFvQjtRQUNwQixvREFBb0Q7UUFDcEQsTUFBTTtRQUNOLElBQUk7UUFDSixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV6QyxvRkFBb0Y7UUFDcEYsSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUUsU0FBUyxDQUFDLElBQUks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LGFBQWEsSUFtQlo7SUFFRCxZQUFZLElBNkJYO0NBS0osQ0FBQztBQUVGLGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgcmVxdWVzdCAgICAgICAgICAgICAgICAgZnJvbSAncmVxdWVzdCc7XG5pbXBvcnQgeyBDb25maWcsIEl0ZW1TZXJ2aWNlIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5pbXBvcnQgTm9kZUh0dHBDbGllbnQgICAgICAgICAgZnJvbSAnLi4vLi4vaHR0cC9ub2RlJztcblxuY29uc3QgR1BfQVVUSF9DT09LSUUgPSAnZ3BvYXV0aC1hJztcblxuY29uc3QgU2VydmljZVByb3h5ID0ge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlciAtIEV4cHJlc3NKUyByb3V0ZXIgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge2FycmF5W29iamVjdF19IHJvdXRlcyAtIGxpc3Qgb2Ygcm91dGVzIHRvIG1hcCB0byB0aGUgcm91dGVyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBhZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gbmVlZGVkXG4gICAgICovXG4gICAgYmluZFJvdXRlczogZnVuY3Rpb24ocm91dGVyIDogYW55LCByb3V0ZXMgOiBhbnlbXSwgb3B0aW9ucyA/OiBhbnkpIHtcblxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgbGV0IHBhdGhzID0gb3B0aW9ucy5wYXRocyB8fCB7fTtcbiAgICAgICAgbGV0IGF1dGhzID0gb3B0aW9ucy5hdXRoIHx8IHt9O1xuXG4gICAgICAgIHJvdXRlcy5mb3JFYWNoKCByb3V0ZSA9PiB7XG5cbiAgICAgICAgICAgIGlmKHBhdGhzW3JvdXRlLmtleV0gPT09IGZhbHNlKSByZXR1cm47ICAvL2Rpc2FibGVkIGVuZHBvaW50XG4gICAgICAgICAgICBpZighcGF0aHNbcm91dGUua2V5XSAmJiAhcm91dGUucGF0aCkgcmV0dXJuOyAvL3NvbWV0aGluZyBpcyB3cm9uZyB3aXRoIHJvdXRlXG5cbiAgICAgICAgICAgIC8vbmV3ZXIgcm91dGUgb3ZlcnJpZGUuLi5cbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgIC8vICAgJ2NyZWF0ZSc6IHtcbiAgICAgICAgICAgIC8vICAgICAncGF0aCc6ICdjdXN0b20vcGF0aCcsXG4gICAgICAgICAgICAvLyAgICAgJ2F1dGgnOiB0cnVlLFxuICAgICAgICAgICAgLy8gICAgICdvblJlc3BvbnNlJzogZnVuY3Rpb24ocmVzdWx0LCByZXMsIG5leHQpIHsgfVxuICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBsZXQgb3ZlcnJpZGVzID0gb3B0aW9uc1tyb3V0ZS5rZXldIHx8IHt9O1xuXG4gICAgICAgICAgICAvL2xvb2sgZm9yIG92ZXJyaWRlbiBwYXRocyBpbiBlaXRoZXIgbmV3IG92ZXJyaWRlIHN0cnVjdHVyZSBvciBvbGRlciBrZXk6cGF0aCBmb3JtYXRcbiAgICAgICAgICAgIGxldCBwYXRoID0gJy8nICsgKCBvdmVycmlkZXMucGF0aCB8fCBwYXRoc1tyb3V0ZS5rZXldIHx8IHJvdXRlLnBhdGggKTtcbiAgICAgICAgICAgIC8vbG9vayBmb3IgYXV0aGVudGljYXRpb24gb3ZlcnJpZGUgaW4gZWl0aGVyIG5ldyBzdHJ1Y3R1cmUgb3Igb2xkZXIgZm9ybWF0XG4gICAgICAgICAgICBsZXQgbmVlZHNBdXRoID0gb3ZlcnJpZGVzLmF1dGggfHwgYXV0aHNbcm91dGUua2V5XSB8fCByb3V0ZS5hdXRoO1xuXG4gICAgICAgICAgICBpZihvcHRpb25zLmxvZ2dlcikge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKGBCaW5kaW5nIFNlcnZpY2UgUm91dGUgWyR7cm91dGUubWV0aG9kfV0gJHtwYXRofWApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3V0ZXJbcm91dGUubWV0aG9kXSggcGF0aCwgKHJlcSA6IGFueSwgcmVzIDogYW55LCBuZXh0IDogRnVuY3Rpb24pID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2Yocm91dGUub25FeGVjdXRlKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCBudWxsICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9ucy5sb2dnZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKGBFeGVjdXRpbmcgU2VydmljZSBSb3V0ZSBbJHtyb3V0ZS5tZXRob2R9XSAke3BhdGh9YClcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKEpTT04uc3RyaW5naWZ5KHJlcS5wYXJhbXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgc3ZjID0gdGhpcy5nZXRTZXJ2aWNlKHJlcSwgbmVlZHNBdXRoLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IHJvdXRlLm9uRXhlY3V0ZShzdmMsIHJlcSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2goIGUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oICggcmVzdWx0IDogYW55ICkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb25SZXNwb25zZSA9IG92ZXJyaWRlcy5vblJlc3BvbnNlIHx8IHJvdXRlLm9uUmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmKG9uUmVzcG9uc2UpIG9uUmVzcG9uc2UocmVzdWx0LCByZXMsIG5leHQpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHJlcy5qc29uKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goIChlcnIgOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihvdmVycmlkZXMub25FcnJvcikgb3ZlcnJpZGVzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9ucy5vbkVycm9yKSBvcHRpb25zLm9uRXJyb3Iocm91dGUua2V5LCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluYWxseSggKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgcm91dGUgaGFzIGEgZmluaXNoIGZ1bmN0aW9uIGRlZmluZWQsIGludm9rZSBpdFxuICAgICAgICAgICAgICAgICAgICBpZihvdmVycmlkZXMub25GaW5pc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJyaWRlcy5vbkZpbmlzaChyZXEsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL2lmIHByb3h5IGhhcyBhbiBvdmVyYWxsIGZpbmlzaCBmdW5jdGlvbiBkZWZpbmVkLCBpbnZva2UgaXRcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmlzaEZuID0gb3B0aW9ucy5vbkZpbmlzaDtcbiAgICAgICAgICAgICAgICAgICAgaWYoZmluaXNoRm4pIGZpbmlzaEZuKHJvdXRlLmtleSwgcmVxLCByZXMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmFkZGwpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZEFkZGl0aW9uYWxSb3V0ZXMocm91dGVyLCBvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgYmluZEFkZGl0aW9uYWxSb3V0ZXM6IGZ1bmN0aW9uKCByb3V0ZXIgOiBhbnksIG9wdGlvbnMgPzogYW55ICkge1xuXG4gICAgICAgIC8vZmV0Y2ggdGh1bWJuYWlsIHByb3h5XG4gICAgICAgIHJvdXRlci5nZXQoJy9pdGVtcy86aWQvdGh1bWJuYWlsJywgZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgICAgIGxldCB1cmwgPSBDb25maWcudWFsVXJsICsgJy9hcGkvaXRlbXMvJyArIHJlcS5wYXJhbXMuaWQgKyAnL3RodW1ibmFpbCc7XG4gICAgICAgICAgICByZXF1ZXN0LmdldCh1cmwpLnBpcGUocmVzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5sb2dnZXIpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKFwiQmluZGluZyBTZXJ2aWNlIFJvdXRlIFtnZXRdIC9pdGVtcy86aWQvdGh1bWJuYWlsXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9yZXF1ZXN0IG5ldyB0aHVtYm5haWwgYmUgY3JlYXRlZFxuICAgICAgICByb3V0ZXIucG9zdCgnL2l0ZW1zLzppZC90aHVtYm5haWwnLCBmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICAgICAgbGV0IHVybCA9IENvbmZpZy51YWxVcmwgKyAnL2FwaS9pdGVtcy8nICsgcmVxLnBhcmFtcy5pZCArICcvdGh1bWJuYWlsJztcbiAgICAgICAgICAgIGxldCB0b2tlbiA9IChyZXEuaGVhZGVycy5hdXRob3JpemF0aW9uIHx8ICcnKS5yZXBsYWNlKCdCZWFyZXIgJywnJyk7XG4gICAgICAgICAgICBsZXQgY29va2llID0gdGhpcy5nZXRDb29raWUoKTtcbiAgICAgICAgICAgIGxldCBvcHRzIDogYW55ID0ge307ICAvL2RvZXNuJ3QgbmVlZCBhIGJvZHkgd2hlbiBwb3N0aW5nIHRvIHRodW1ibmFpbFxuICAgICAgICAgICAgaWYodG9rZW4pICBvcHRzLmF1dGggPSB7IGJlYXJlciA6IHRva2VuIH07XG4gICAgICAgICAgICBpZihjb29raWUpIG9wdHMuaGVhZGVycyA9IHsgQ29va2llIDogdGhpcy5hdXRoQ29va2llTmFtZSArICc9JyArIGNvb2tpZSB9O1xuICAgICAgICAgICAgcmVxdWVzdC5wb3N0KHVybCwgb3B0cykucGlwZShyZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmxvZ2dlcikge1xuICAgICAgICAgICAgb3B0aW9ucy5sb2dnZXIuZGVidWcoXCJCaW5kaW5nIFNlcnZpY2UgUm91dGUgW3Bvc3RdIC9pdGVtcy86aWQvdGh1bWJuYWlsXCIpO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBAcGFyYW0ge0h0dHBSZXF1ZXN0fSByZXEgLSBpbmNvbWluZyBodHRwIHJlcXVlc3QgYmVpbmcgcHJveGllZFxuICAgICogQHBhcmFtIHtib29sZWFufSBuZWVkc0F1dGggLSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIHJlcXVlc3QgbXVzdCBwcm92aWRlIGFuIGF1dGhlbnRpY2F0aW9uIHRva2VuXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAgKiBAcmV0dXJuIHtIdHRwQ2xpZW50fSBjbGllbnQgdG8gdXNlIHRvIG1ha2UgcmVxdWVzdHMgdG8gR2VvUGxhdGZvcm0gQVBJIGVuZHBvaW50XG4gICAgKi9cbiAgICBnZXRDbGllbnQ6IGZ1bmN0aW9uKHJlcSA6IGFueSwgbmVlZHNBdXRoIDogYm9vbGVhbiwgb3B0aW9ucyA/OiBhbnkpIHtcblxuICAgICAgICBsZXQgdG9rZW4gPSBudWxsO1xuICAgICAgICBpZihuZWVkc0F1dGgpIHtcblxuICAgICAgICAgICAgdG9rZW4gPSByZXEuYWNjZXNzVG9rZW4gfHwgbnVsbDtcbiAgICAgICAgICAgIGlmKCF0b2tlbiAmJiAhcmVxLmp3dCkgeyAgICAvL2lmIG5vdCBwcm9jZXNzZWQgYnkgbWlkZGxld2FyZS4uLlxuICAgICAgICAgICAgICAgIHRva2VuID0gKHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24gfHwgJycpLnJlcGxhY2UoJ0JlYXJlciAnLCcnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmxvZ2dlcikge1xuICAgICAgICAgICAgICAgIC8vIG9wdGlvbnMubG9nZ2VyLmRlYnVnKGBTZXJ2aWNlUHJveHkuZ2V0Q2xpZW50KCkgLSBUb2tlbjogJHt0b2tlbn1gKTtcbiAgICAgICAgICAgICAgICAvLyBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhgU2VydmljZVByb3h5LmdldENsaWVudCgpIC0gSldUOiAke3JlcS5qd3R9YCk7XG4gICAgICAgICAgICAgICAgaWYoIXRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLndhcm4oXCJTZXJ2aWNlUHJveHkuZ2V0Q2xpZW50KCkgLSBObyBBY2Nlc3MgVG9rZW4gd2FzIHByb3ZpZGVkIG9uIGluY29taW5nIHJlcXVlc3QgaGVhZGVyIVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZighIW9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5sb2dnZXIuZGVidWcoYFNlcnZpY2VQcm94eS5nZXRDbGllbnQoKSAtIFRva2VuOiAke3Rva2VufWApO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhgU2VydmljZVByb3h5LmdldENsaWVudCgpIC0gSldUOiAke3JlcS5qd3R9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmKCF0b2tlbikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW1dBUk5dIE5vIEFjY2VzcyBUb2tlbiBwcm92aWRlZCBvbiBpbmNvbWluZyByZXF1ZXN0IGhlYWRlclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vY2hlY2sgdGhlIGluY29taW5nIHByb3hpZWQgcmVxdWVzdCBmb3IgY29va2llcyB0aGF0IHNob3VsZCBiZSBmb3J3YXJkZWQgYWxvbmdcbiAgICAgICAgbGV0IGNvb2tpZSA9IHRoaXMuZ2V0QXV0aENvb2tpZShyZXEpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNPT0tJRSBJUyBcIiArIGNvb2tpZSk7XG4gICAgICAgIGlmKGNvb2tpZSAmJiAhY29va2llLmxlbmd0aCkgY29va2llID0gbnVsbDtcblxuICAgICAgICAvLyBpZihvcHRpb25zICYmIG9wdGlvbnMubG9nZ2VyKSB7XG4gICAgICAgIC8vICAgICBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhcIlByb3h5aW5nIFJlcXVlc3QgQ29va2llOiBcIiArIGNvb2tpZSk7XG4gICAgICAgIC8vICAgICBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhcIiBcIik7XG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlByb3h5aW5nIFJlcXVlc3QgQ29va2llOiBcIiArIGNvb2tpZSk7XG4gICAgICAgIC8vIH1cblxuXG4gICAgICAgIHJldHVybiBuZXcgTm9kZUh0dHBDbGllbnQoe1xuICAgICAgICAgICAgdGltZW91dDogQ29uZmlnLnRpbWVvdXQsXG4gICAgICAgICAgICB0b2tlbjogbmVlZHNBdXRoID8gdG9rZW4gOiBudWxsLFxuICAgICAgICAgICAgY29va2llOiBuZWVkc0F1dGggPyBjb29raWUgOiBudWxsXG4gICAgICAgIH0pO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7SHR0cFJlcXVlc3R9IHJlcSAtIGluY29taW5nIGh0dHAgcmVxdWVzdCBiZWluZyBwcm94aWVkXG4gICAgICogQHBhcmFtIHtib29sZWFufSBuZWVkc0F1dGggLSBmbGFnIGluZGljYXRpbmcgaWYgcmVxdWVzdCByZXF1aXJlcyBhdXRob3JpemF0aW9uIHRva2VuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBhZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgICAqL1xuICAgIGdldFNlcnZpY2U6IGZ1bmN0aW9uKHJlcSA6IGFueSwgbmVlZHNBdXRoIDogYm9vbGVhbiwgb3B0aW9ucyA/OiBhbnkpIHtcbiAgICAgICAgbGV0IGNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KHJlcSwgbmVlZHNBdXRoLCBvcHRpb25zKTtcbiAgICAgICAgbGV0IHN2Y0NsYXNzID0gb3B0aW9ucy5zZXJ2aWNlQ2xhc3MgfHwgSXRlbVNlcnZpY2U7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUHJveHlpbmcgdG8gXCIgKyBDb25maWcudWFsVXJsKTtcbiAgICAgICAgaWYob3B0aW9ucy5sb2dnZXIpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKGBQcm94eWluZyB0byAke0NvbmZpZy51YWxVcmx9YCk7XG4gICAgICAgICAgICAvLyBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhcIlVzaW5nIHNlcnZpY2UgY2xhc3M6IFwiICsgc3ZjQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZXJ2aWNlID0gbmV3IHN2Y0NsYXNzKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG4gICAgICAgIHNlcnZpY2Uuc2V0VGltZW91dChDb25maWcudGltZW91dCB8fCAzMDAwMCk7XG4gICAgICAgIGlmKG9wdGlvbnMubG9nZ2VyKSB7XG4gICAgICAgICAgICBzZXJ2aWNlLnNldExvZ2dlcihvcHRpb25zLmxvZ2dlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgfSxcblxuICAgIGdldEF1dGhDb29raWU6IGZ1bmN0aW9uKHJlcTogYW55KSA6IHN0cmluZyB7XG4gICAgICAgIGlmKCFyZXEpIHJldHVybiBudWxsO1xuICAgICAgICBpZihyZXEuY29va2llcykgeyAgIC8vcGFyc2VkIGJ5IGNvb2tpZVBhcnNlciBhbHJlYWR5XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNPT0tJRVMgUEFSU0VEIC4uLiBcIik7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNPT0tJRVMgQVJFLi4uXCIpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVxLmNvb2tpZXMpKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIFwiKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQVVUSCBDT09LSUUgSVMgXCIgKyByZXEuY29va2llc1tHUF9BVVRIX0NPT0tJRV0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlcS5jb29raWVzW0dQX0FVVEhfQ09PS0lFXTtcbiAgICAgICAgfSBlbHNlIGlmKHJlcS5oZWFkZXJzLmNvb2tpZSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDT09LSUVTIE5FRUQgUEFSU0lOR1wiKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvb2tpZXMgPSB0aGlzLnBhcnNlQ29va2llcyhyZXEuaGVhZGVycy5jb29raWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb29raWVzW0dQX0FVVEhfQ09PS0lFXTtcbiAgICAgICAgICAgIH0gY2F0Y2goIGUgKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBwYXJzaW5nIGNvb2tpZXM6IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwYXJzZUNvb2tpZXM6IGZ1bmN0aW9uIHBhcnNlKHN0ciA6IHN0cmluZykge1xuICAgICAgICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJyB8fCAhc3RyLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9XG4gICAgICAgIGxldCBleHByID0gLzsgKi87XG4gICAgICAgIGxldCBwYWlycyA9IHN0ci5zcGxpdChleHByKTtcblxuICAgICAgICBwYWlycy5mb3JFYWNoKCBwYWlyID0+IHtcbiAgICAgICAgICAgIGxldCBzZXBJZHggPSBwYWlyLmluZGV4T2YoJz0nKTtcblxuICAgICAgICAgICAgaWYgKHNlcElkeCA8IDApIHJldHVybjsgLy9pZ25vcmUgbm9uLSAna2V5PXZhbHVlJyB2YWx1ZXNcblxuICAgICAgICAgICAgbGV0IGtleSA9IHBhaXIuc3Vic3RyKDAsIHNlcElkeCkudHJpbSgpO1xuICAgICAgICAgICAgbGV0IHZhbCA9IHBhaXIuc3Vic3RyKCsrc2VwSWR4LCBwYWlyLmxlbmd0aCkudHJpbSgpO1xuXG4gICAgICAgICAgICAvLyBxdW90ZWQgdmFsdWVzXG4gICAgICAgICAgICBpZiAoJ1wiJyA9PSB2YWxbMF0pIHZhbCA9IHZhbC5zbGljZSgxLCAtMSk7XG5cbiAgICAgICAgICAgIC8vIG9ubHkgYXNzaWduIG9uY2VcbiAgICAgICAgICAgIGlmICh1bmRlZmluZWQgPT0gcmVzdWx0W2tleV0pIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWw7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQodmFsKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7IH1cbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VydmljZVByb3h5O1xuIl19