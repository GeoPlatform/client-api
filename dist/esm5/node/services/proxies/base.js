import NodeHttpClient from '../../http/node';
import { Config, ItemService } from '@geoplatform/client';
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
}, ɵ1 = function (req, needsAuth, options) {
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
}, ɵ2 = function (req, needsAuth, options) {
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
}, ɵ3 = function (req) {
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
}, ɵ4 = function parse(str) {
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
    * @param {HttpRequest} req - incoming http request being proxied
    * @param {boolean} needsAuth - flag indicating if the request must provide an authentication token
    * @param {object} options - additional configuration options
    * @return {HttpClient} client to use to make requests to GeoPlatform API endpoint
    */
    getClient: ɵ1,
    /**
     * @param {HttpRequest} req - incoming http request being proxied
     * @param {boolean} needsAuth - flag indicating if request requires authorization token
     * @param {object} options - additional configuration options
     */
    getService: ɵ2,
    getAuthCookie: ɵ3,
    parseCookies: ɵ4
};
export default ServiceProxy;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvbm9kZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb3hpZXMvYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLGNBQWMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTFELElBQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQztTQVNuQixVQUFTLE1BQVksRUFBRSxNQUFjLEVBQUUsT0FBYztJQUFyRCxpQkF5RVg7SUF2RUcsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDeEIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7SUFDaEMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7SUFFL0IsTUFBTSxDQUFDLE9BQU8sQ0FBRSxVQUFBLEtBQUs7UUFFakIsSUFBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUs7WUFBRSxPQUFPLENBQUUsbUJBQW1CO1FBQzNELElBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFBRSxPQUFPLENBQUMsK0JBQStCO1FBRTVFLHlCQUF5QjtRQUN6QixJQUFJO1FBQ0osZ0JBQWdCO1FBQ2hCLDZCQUE2QjtRQUM3QixvQkFBb0I7UUFDcEIsb0RBQW9EO1FBQ3BELE1BQU07UUFDTixJQUFJO1FBQ0osSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFekMsb0ZBQW9GO1FBQ3BGLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFFLFNBQVMsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFFLENBQUM7UUFDdEUsMEVBQTBFO1FBQzFFLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRWpFLElBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNmLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDRCQUEwQixLQUFLLENBQUMsTUFBTSxVQUFLLElBQU0sQ0FBQyxDQUFBO1NBQzFFO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBRSxJQUFJLEVBQUUsVUFBQyxHQUFTLEVBQUUsR0FBUyxFQUFFLElBQWU7WUFFOUQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUcsT0FBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxVQUFVLEVBQUU7Z0JBQ3ZDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFFLElBQUksQ0FBRSxDQUFDO2FBQ3JDO2lCQUFNO2dCQUNILElBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRTtvQkFDZixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw4QkFBNEIsS0FBSyxDQUFDLE1BQU0sVUFBSyxJQUFNLENBQUMsQ0FBQTtvQkFDekUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDakQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztpQkFDckQ7Z0JBQ0QsSUFBSSxHQUFHLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUVuRCxJQUFJO29CQUNBLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDdkM7Z0JBQUMsT0FBTyxDQUFDLEVBQUc7b0JBQ1QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQy9CO2FBQ0o7WUFFRCxPQUFPLENBQUMsSUFBSSxDQUFFLFVBQUUsTUFBWTtnQkFDeEIsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDO2dCQUMxRCxJQUFHLFVBQVU7b0JBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7O29CQUN4QyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUUsVUFBQyxHQUFXO2dCQUNoQixJQUFHLFNBQVMsQ0FBQyxPQUFPO29CQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdDLElBQUcsT0FBTyxDQUFDLE9BQU87b0JBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZCxDQUFDLENBQUM7aUJBQ0QsT0FBTyxDQUFFO2dCQUVOLG1EQUFtRDtnQkFDbkQsSUFBRyxTQUFTLENBQUMsUUFBUSxFQUFFO29CQUNuQixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDaEM7Z0JBRUQsNERBQTREO2dCQUM1RCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO2dCQUNoQyxJQUFHLFFBQVE7b0JBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQztBQUVQLENBQUMsT0FRVSxVQUFTLEdBQVMsRUFBRSxTQUFtQixFQUFFLE9BQWM7SUFFOUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLElBQUcsU0FBUyxFQUFFO1FBRVYsS0FBSyxHQUFHLEdBQUcsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDO1FBQ2hDLElBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUssbUNBQW1DO1lBQzNELEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUMsRUFBRSxDQUFDLENBQUM7U0FDbkU7UUFFRCxJQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQzFCLHNFQUFzRTtZQUN0RSxzRUFBc0U7WUFDdEUsSUFBRyxDQUFDLEtBQUssRUFBRTtnQkFDUCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxRkFBcUYsQ0FBQyxDQUFDO2FBQzlHO2lCQUNJLElBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQ3JCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHVDQUFxQyxLQUFPLENBQUMsQ0FBQztnQkFDbkUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMscUNBQW1DLEdBQUcsQ0FBQyxHQUFLLENBQUMsQ0FBQzthQUN0RTtTQUNKO2FBQU0sSUFBRyxDQUFDLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsNERBQTRELENBQUMsQ0FBQztTQUM3RTtLQUNKO0lBRUQsK0VBQStFO0lBQy9FLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsc0NBQXNDO0lBQ3RDLElBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07UUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBRTNDLGtDQUFrQztJQUNsQyxrRUFBa0U7SUFDbEUsaUNBQWlDO0lBQ2pDLFdBQVc7SUFDWCx5REFBeUQ7SUFDekQsSUFBSTtJQUdKLE9BQU8sSUFBSSxjQUFjLENBQUM7UUFDdEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1FBQ3ZCLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUMvQixNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUk7S0FDcEMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxPQVFXLFVBQVMsR0FBUyxFQUFFLFNBQW1CLEVBQUUsT0FBYztJQUMvRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksSUFBSSxXQUFXLENBQUM7SUFDbkQsK0NBQStDO0lBQy9DLElBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRTtRQUNmLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFlLE1BQU0sQ0FBQyxNQUFRLENBQUMsQ0FBQztRQUNyRCw0REFBNEQ7S0FDL0Q7SUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQztJQUM1QyxJQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7UUFDZixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNyQztJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUMsT0FFYyxVQUFTLEdBQVE7SUFDNUIsSUFBRyxDQUFDLEdBQUc7UUFBRSxPQUFPLElBQUksQ0FBQztJQUNyQixJQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBSSxnQ0FBZ0M7UUFDaEQsc0NBQXNDO1FBQ3RDLGlDQUFpQztRQUNqQyw0Q0FBNEM7UUFDNUMsb0JBQW9CO1FBQ3BCLGdFQUFnRTtRQUNoRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDdEM7U0FBTSxJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQzFCLHVDQUF1QztRQUN2QyxJQUFJO1lBQ0EsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELE9BQU8sT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ2xDO1FBQUMsT0FBTyxDQUFDLEVBQUc7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuRCxPQUFPLElBQUksQ0FBQztTQUNmO0tBQ0o7QUFDTCxDQUFDLE9BRWEsU0FBUyxLQUFLLENBQUMsR0FBWTtJQUNyQyxJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFaEUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFNUIsS0FBSyxDQUFDLE9BQU8sQ0FBRSxVQUFBLElBQUk7UUFDZixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9CLElBQUksTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPLENBQUMsZ0NBQWdDO1FBRXhELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXBELGdCQUFnQjtRQUNoQixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUMsbUJBQW1CO1FBQ25CLElBQUksU0FBUyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMxQixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDaEIsSUFBSTtnQkFDQSxLQUFLLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbkM7WUFBQyxPQUFPLENBQUMsRUFBRSxHQUFHO1lBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUN2QjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQTdNTCxJQUFNLFlBQVksR0FBRztJQUVqQjs7OztPQUlHO0lBQ0gsVUFBVSxJQXlFVDtJQUVEOzs7OztNQUtFO0lBQ0YsU0FBUyxJQTJDUjtJQUdEOzs7O09BSUc7SUFDSCxVQUFVLElBY1Q7SUFFRCxhQUFhLElBbUJaO0lBRUQsWUFBWSxJQTZCWDtDQUtKLENBQUM7QUFFRixlQUFlLFlBQVksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgTm9kZUh0dHBDbGllbnQgZnJvbSAnLi4vLi4vaHR0cC9ub2RlJztcbmltcG9ydCB7IENvbmZpZywgSXRlbVNlcnZpY2UgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuY29uc3QgR1BfQVVUSF9DT09LSUUgPSAnZ3BvYXV0aC1hJztcblxuY29uc3QgU2VydmljZVByb3h5ID0ge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlciAtIEV4cHJlc3NKUyByb3V0ZXIgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge2FycmF5W29iamVjdF19IHJvdXRlcyAtIGxpc3Qgb2Ygcm91dGVzIHRvIG1hcCB0byB0aGUgcm91dGVyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBhZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gbmVlZGVkXG4gICAgICovXG4gICAgYmluZFJvdXRlczogZnVuY3Rpb24ocm91dGVyIDogYW55LCByb3V0ZXMgOiBhbnlbXSwgb3B0aW9ucyA/OiBhbnkpIHtcblxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgbGV0IHBhdGhzID0gb3B0aW9ucy5wYXRocyB8fCB7fTtcbiAgICAgICAgbGV0IGF1dGhzID0gb3B0aW9ucy5hdXRoIHx8IHt9O1xuXG4gICAgICAgIHJvdXRlcy5mb3JFYWNoKCByb3V0ZSA9PiB7XG5cbiAgICAgICAgICAgIGlmKHBhdGhzW3JvdXRlLmtleV0gPT09IGZhbHNlKSByZXR1cm47ICAvL2Rpc2FibGVkIGVuZHBvaW50XG4gICAgICAgICAgICBpZighcGF0aHNbcm91dGUua2V5XSAmJiAhcm91dGUucGF0aCkgcmV0dXJuOyAvL3NvbWV0aGluZyBpcyB3cm9uZyB3aXRoIHJvdXRlXG5cbiAgICAgICAgICAgIC8vbmV3ZXIgcm91dGUgb3ZlcnJpZGUuLi5cbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgIC8vICAgJ2NyZWF0ZSc6IHtcbiAgICAgICAgICAgIC8vICAgICAncGF0aCc6ICdjdXN0b20vcGF0aCcsXG4gICAgICAgICAgICAvLyAgICAgJ2F1dGgnOiB0cnVlLFxuICAgICAgICAgICAgLy8gICAgICdvblJlc3BvbnNlJzogZnVuY3Rpb24ocmVzdWx0LCByZXMsIG5leHQpIHsgfVxuICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBsZXQgb3ZlcnJpZGVzID0gb3B0aW9uc1tyb3V0ZS5rZXldIHx8IHt9O1xuXG4gICAgICAgICAgICAvL2xvb2sgZm9yIG92ZXJyaWRlbiBwYXRocyBpbiBlaXRoZXIgbmV3IG92ZXJyaWRlIHN0cnVjdHVyZSBvciBvbGRlciBrZXk6cGF0aCBmb3JtYXRcbiAgICAgICAgICAgIGxldCBwYXRoID0gJy8nICsgKCBvdmVycmlkZXMucGF0aCB8fCBwYXRoc1tyb3V0ZS5rZXldIHx8IHJvdXRlLnBhdGggKTtcbiAgICAgICAgICAgIC8vbG9vayBmb3IgYXV0aGVudGljYXRpb24gb3ZlcnJpZGUgaW4gZWl0aGVyIG5ldyBzdHJ1Y3R1cmUgb3Igb2xkZXIgZm9ybWF0XG4gICAgICAgICAgICBsZXQgbmVlZHNBdXRoID0gb3ZlcnJpZGVzLmF1dGggfHwgYXV0aHNbcm91dGUua2V5XSB8fCByb3V0ZS5hdXRoO1xuXG4gICAgICAgICAgICBpZihvcHRpb25zLmxvZ2dlcikge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKGBCaW5kaW5nIFNlcnZpY2UgUm91dGUgWyR7cm91dGUubWV0aG9kfV0gJHtwYXRofWApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3V0ZXJbcm91dGUubWV0aG9kXSggcGF0aCwgKHJlcSA6IGFueSwgcmVzIDogYW55LCBuZXh0IDogRnVuY3Rpb24pID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2Yocm91dGUub25FeGVjdXRlKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCBudWxsICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9ucy5sb2dnZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKGBFeGVjdXRpbmcgU2VydmljZSBSb3V0ZSBbJHtyb3V0ZS5tZXRob2R9XSAke3BhdGh9YClcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKEpTT04uc3RyaW5naWZ5KHJlcS5wYXJhbXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgc3ZjID0gdGhpcy5nZXRTZXJ2aWNlKHJlcSwgbmVlZHNBdXRoLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IHJvdXRlLm9uRXhlY3V0ZShzdmMsIHJlcSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2goIGUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oICggcmVzdWx0IDogYW55ICkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb25SZXNwb25zZSA9IG92ZXJyaWRlcy5vblJlc3BvbnNlIHx8IHJvdXRlLm9uUmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmKG9uUmVzcG9uc2UpIG9uUmVzcG9uc2UocmVzdWx0LCByZXMsIG5leHQpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHJlcy5qc29uKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goIChlcnIgOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihvdmVycmlkZXMub25FcnJvcikgb3ZlcnJpZGVzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9ucy5vbkVycm9yKSBvcHRpb25zLm9uRXJyb3Iocm91dGUua2V5LCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluYWxseSggKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgcm91dGUgaGFzIGEgZmluaXNoIGZ1bmN0aW9uIGRlZmluZWQsIGludm9rZSBpdFxuICAgICAgICAgICAgICAgICAgICBpZihvdmVycmlkZXMub25GaW5pc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJyaWRlcy5vbkZpbmlzaChyZXEsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL2lmIHByb3h5IGhhcyBhbiBvdmVyYWxsIGZpbmlzaCBmdW5jdGlvbiBkZWZpbmVkLCBpbnZva2UgaXRcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmlzaEZuID0gb3B0aW9ucy5vbkZpbmlzaDtcbiAgICAgICAgICAgICAgICAgICAgaWYoZmluaXNoRm4pIGZpbmlzaEZuKHJvdXRlLmtleSwgcmVxLCByZXMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBAcGFyYW0ge0h0dHBSZXF1ZXN0fSByZXEgLSBpbmNvbWluZyBodHRwIHJlcXVlc3QgYmVpbmcgcHJveGllZFxuICAgICogQHBhcmFtIHtib29sZWFufSBuZWVkc0F1dGggLSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIHJlcXVlc3QgbXVzdCBwcm92aWRlIGFuIGF1dGhlbnRpY2F0aW9uIHRva2VuXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAgKiBAcmV0dXJuIHtIdHRwQ2xpZW50fSBjbGllbnQgdG8gdXNlIHRvIG1ha2UgcmVxdWVzdHMgdG8gR2VvUGxhdGZvcm0gQVBJIGVuZHBvaW50XG4gICAgKi9cbiAgICBnZXRDbGllbnQ6IGZ1bmN0aW9uKHJlcSA6IGFueSwgbmVlZHNBdXRoIDogYm9vbGVhbiwgb3B0aW9ucyA/OiBhbnkpIHtcblxuICAgICAgICBsZXQgdG9rZW4gPSBudWxsO1xuICAgICAgICBpZihuZWVkc0F1dGgpIHtcblxuICAgICAgICAgICAgdG9rZW4gPSByZXEuYWNjZXNzVG9rZW4gfHwgbnVsbDtcbiAgICAgICAgICAgIGlmKCF0b2tlbiAmJiAhcmVxLmp3dCkgeyAgICAvL2lmIG5vdCBwcm9jZXNzZWQgYnkgbWlkZGxld2FyZS4uLlxuICAgICAgICAgICAgICAgIHRva2VuID0gKHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24gfHwgJycpLnJlcGxhY2UoJ0JlYXJlciAnLCcnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmxvZ2dlcikge1xuICAgICAgICAgICAgICAgIC8vIG9wdGlvbnMubG9nZ2VyLmRlYnVnKGBTZXJ2aWNlUHJveHkuZ2V0Q2xpZW50KCkgLSBUb2tlbjogJHt0b2tlbn1gKTtcbiAgICAgICAgICAgICAgICAvLyBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhgU2VydmljZVByb3h5LmdldENsaWVudCgpIC0gSldUOiAke3JlcS5qd3R9YCk7XG4gICAgICAgICAgICAgICAgaWYoIXRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLndhcm4oXCJTZXJ2aWNlUHJveHkuZ2V0Q2xpZW50KCkgLSBObyBBY2Nlc3MgVG9rZW4gd2FzIHByb3ZpZGVkIG9uIGluY29taW5nIHJlcXVlc3QgaGVhZGVyIVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZighIW9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5sb2dnZXIuZGVidWcoYFNlcnZpY2VQcm94eS5nZXRDbGllbnQoKSAtIFRva2VuOiAke3Rva2VufWApO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhgU2VydmljZVByb3h5LmdldENsaWVudCgpIC0gSldUOiAke3JlcS5qd3R9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmKCF0b2tlbikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW1dBUk5dIE5vIEFjY2VzcyBUb2tlbiBwcm92aWRlZCBvbiBpbmNvbWluZyByZXF1ZXN0IGhlYWRlclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vY2hlY2sgdGhlIGluY29taW5nIHByb3hpZWQgcmVxdWVzdCBmb3IgY29va2llcyB0aGF0IHNob3VsZCBiZSBmb3J3YXJkZWQgYWxvbmdcbiAgICAgICAgbGV0IGNvb2tpZSA9IHRoaXMuZ2V0QXV0aENvb2tpZShyZXEpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNPT0tJRSBJUyBcIiArIGNvb2tpZSk7XG4gICAgICAgIGlmKGNvb2tpZSAmJiAhY29va2llLmxlbmd0aCkgY29va2llID0gbnVsbDtcblxuICAgICAgICAvLyBpZihvcHRpb25zICYmIG9wdGlvbnMubG9nZ2VyKSB7XG4gICAgICAgIC8vICAgICBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhcIlByb3h5aW5nIFJlcXVlc3QgQ29va2llOiBcIiArIGNvb2tpZSk7XG4gICAgICAgIC8vICAgICBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhcIiBcIik7XG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlByb3h5aW5nIFJlcXVlc3QgQ29va2llOiBcIiArIGNvb2tpZSk7XG4gICAgICAgIC8vIH1cblxuXG4gICAgICAgIHJldHVybiBuZXcgTm9kZUh0dHBDbGllbnQoe1xuICAgICAgICAgICAgdGltZW91dDogQ29uZmlnLnRpbWVvdXQsXG4gICAgICAgICAgICB0b2tlbjogbmVlZHNBdXRoID8gdG9rZW4gOiBudWxsLFxuICAgICAgICAgICAgY29va2llOiBuZWVkc0F1dGggPyBjb29raWUgOiBudWxsXG4gICAgICAgIH0pO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7SHR0cFJlcXVlc3R9IHJlcSAtIGluY29taW5nIGh0dHAgcmVxdWVzdCBiZWluZyBwcm94aWVkXG4gICAgICogQHBhcmFtIHtib29sZWFufSBuZWVkc0F1dGggLSBmbGFnIGluZGljYXRpbmcgaWYgcmVxdWVzdCByZXF1aXJlcyBhdXRob3JpemF0aW9uIHRva2VuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBhZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgICAqL1xuICAgIGdldFNlcnZpY2U6IGZ1bmN0aW9uKHJlcSA6IGFueSwgbmVlZHNBdXRoIDogYm9vbGVhbiwgb3B0aW9ucyA/OiBhbnkpIHtcbiAgICAgICAgbGV0IGNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KHJlcSwgbmVlZHNBdXRoLCBvcHRpb25zKTtcbiAgICAgICAgbGV0IHN2Y0NsYXNzID0gb3B0aW9ucy5zZXJ2aWNlQ2xhc3MgfHwgSXRlbVNlcnZpY2U7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUHJveHlpbmcgdG8gXCIgKyBDb25maWcudWFsVXJsKTtcbiAgICAgICAgaWYob3B0aW9ucy5sb2dnZXIpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKGBQcm94eWluZyB0byAke0NvbmZpZy51YWxVcmx9YCk7XG4gICAgICAgICAgICAvLyBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhcIlVzaW5nIHNlcnZpY2UgY2xhc3M6IFwiICsgc3ZjQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZXJ2aWNlID0gbmV3IHN2Y0NsYXNzKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG4gICAgICAgIHNlcnZpY2Uuc2V0VGltZW91dChDb25maWcudGltZW91dCB8fCAzMDAwMCk7XG4gICAgICAgIGlmKG9wdGlvbnMubG9nZ2VyKSB7XG4gICAgICAgICAgICBzZXJ2aWNlLnNldExvZ2dlcihvcHRpb25zLmxvZ2dlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgfSxcblxuICAgIGdldEF1dGhDb29raWU6IGZ1bmN0aW9uKHJlcTogYW55KSA6IHN0cmluZyB7XG4gICAgICAgIGlmKCFyZXEpIHJldHVybiBudWxsO1xuICAgICAgICBpZihyZXEuY29va2llcykgeyAgIC8vcGFyc2VkIGJ5IGNvb2tpZVBhcnNlciBhbHJlYWR5XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNPT0tJRVMgUEFSU0VEIC4uLiBcIik7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNPT0tJRVMgQVJFLi4uXCIpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVxLmNvb2tpZXMpKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIFwiKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQVVUSCBDT09LSUUgSVMgXCIgKyByZXEuY29va2llc1tHUF9BVVRIX0NPT0tJRV0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlcS5jb29raWVzW0dQX0FVVEhfQ09PS0lFXTtcbiAgICAgICAgfSBlbHNlIGlmKHJlcS5oZWFkZXJzLmNvb2tpZSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDT09LSUVTIE5FRUQgUEFSU0lOR1wiKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvb2tpZXMgPSB0aGlzLnBhcnNlQ29va2llcyhyZXEuaGVhZGVycy5jb29raWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb29raWVzW0dQX0FVVEhfQ09PS0lFXTtcbiAgICAgICAgICAgIH0gY2F0Y2goIGUgKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBwYXJzaW5nIGNvb2tpZXM6IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwYXJzZUNvb2tpZXM6IGZ1bmN0aW9uIHBhcnNlKHN0ciA6IHN0cmluZykge1xuICAgICAgICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJyB8fCAhc3RyLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9XG4gICAgICAgIGxldCBleHByID0gLzsgKi87XG4gICAgICAgIGxldCBwYWlycyA9IHN0ci5zcGxpdChleHByKTtcblxuICAgICAgICBwYWlycy5mb3JFYWNoKCBwYWlyID0+IHtcbiAgICAgICAgICAgIGxldCBzZXBJZHggPSBwYWlyLmluZGV4T2YoJz0nKTtcblxuICAgICAgICAgICAgaWYgKHNlcElkeCA8IDApIHJldHVybjsgLy9pZ25vcmUgbm9uLSAna2V5PXZhbHVlJyB2YWx1ZXNcblxuICAgICAgICAgICAgbGV0IGtleSA9IHBhaXIuc3Vic3RyKDAsIHNlcElkeCkudHJpbSgpO1xuICAgICAgICAgICAgbGV0IHZhbCA9IHBhaXIuc3Vic3RyKCsrc2VwSWR4LCBwYWlyLmxlbmd0aCkudHJpbSgpO1xuXG4gICAgICAgICAgICAvLyBxdW90ZWQgdmFsdWVzXG4gICAgICAgICAgICBpZiAoJ1wiJyA9PSB2YWxbMF0pIHZhbCA9IHZhbC5zbGljZSgxLCAtMSk7XG5cbiAgICAgICAgICAgIC8vIG9ubHkgYXNzaWduIG9uY2VcbiAgICAgICAgICAgIGlmICh1bmRlZmluZWQgPT0gcmVzdWx0W2tleV0pIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWw7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQodmFsKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7IH1cbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VydmljZVByb3h5O1xuIl19