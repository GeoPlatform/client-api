import NodeHttpClient from '../../http/node';
import { Config, ItemService } from '@geoplatform/client';
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
    var token = req.accessToken || null;
    if (needsAuth && options.logger) {
        if (!token) {
            options.logger.warn("ServiceProxy.getClient() - No Access Token was provided on incoming request header!");
        }
        else if (!!options.debug) {
            options.logger.debug("ServiceProxy.getClient() - Token: " + token);
            options.logger.debug("ServiceProxy.getClient() - JWT: " + req.jwt);
        }
    }
    return new NodeHttpClient({
        timeout: Config.timeout,
        token: needsAuth ? token : null
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
    getService: ɵ2
};
export default ServiceProxy;
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvbm9kZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb3hpZXMvYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLGNBQWMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO1NBVzFDLFVBQVMsTUFBWSxFQUFFLE1BQWMsRUFBRSxPQUFjO0lBQXJELGlCQXlFWDtJQXZFRyxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUN4QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUNoQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUUvQixNQUFNLENBQUMsT0FBTyxDQUFFLFVBQUEsS0FBSztRQUVqQixJQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSztZQUFFLE9BQU8sQ0FBRSxtQkFBbUI7UUFDM0QsSUFBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtZQUFFLE9BQU8sQ0FBQywrQkFBK0I7UUFFNUUseUJBQXlCO1FBQ3pCLElBQUk7UUFDSixnQkFBZ0I7UUFDaEIsNkJBQTZCO1FBQzdCLG9CQUFvQjtRQUNwQixvREFBb0Q7UUFDcEQsTUFBTTtRQUNOLElBQUk7UUFDSixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV6QyxvRkFBb0Y7UUFDcEYsSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUUsU0FBUyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUUsQ0FB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LENBQUMsTUFBTSxFQUFFO1FBQ2YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDckM7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBOUhMLElBQU0sWUFBWSxHQUFHO0lBRWpCOzs7O09BSUc7SUFDSCxVQUFVLElBeUVUO0lBRUQ7Ozs7O01BS0U7SUFDRixTQUFTLElBZ0JSO0lBR0Q7Ozs7T0FJRztJQUNILFVBQVUsSUFjVDtDQUNKLENBQUM7QUFFRixlQUFlLFlBQVksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgTm9kZUh0dHBDbGllbnQgZnJvbSAnLi4vLi4vaHR0cC9ub2RlJztcbmltcG9ydCB7IENvbmZpZywgSXRlbVNlcnZpY2UgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuXG5cbmNvbnN0IFNlcnZpY2VQcm94eSA9IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Um91dGVyfSByb3V0ZXIgLSBFeHByZXNzSlMgcm91dGVyIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHthcnJheVtvYmplY3RdfSByb3V0ZXMgLSBsaXN0IG9mIHJvdXRlcyB0byBtYXAgdG8gdGhlIHJvdXRlclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gYWRkaXRpb25hbCBjb25maWd1cmF0aW9uIG5lZWRlZFxuICAgICAqL1xuICAgIGJpbmRSb3V0ZXM6IGZ1bmN0aW9uKHJvdXRlciA6IGFueSwgcm91dGVzIDogYW55W10sIG9wdGlvbnMgPzogYW55KSB7XG5cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIGxldCBwYXRocyA9IG9wdGlvbnMucGF0aHMgfHwge307XG4gICAgICAgIGxldCBhdXRocyA9IG9wdGlvbnMuYXV0aCB8fCB7fTtcblxuICAgICAgICByb3V0ZXMuZm9yRWFjaCggcm91dGUgPT4ge1xuXG4gICAgICAgICAgICBpZihwYXRoc1tyb3V0ZS5rZXldID09PSBmYWxzZSkgcmV0dXJuOyAgLy9kaXNhYmxlZCBlbmRwb2ludFxuICAgICAgICAgICAgaWYoIXBhdGhzW3JvdXRlLmtleV0gJiYgIXJvdXRlLnBhdGgpIHJldHVybjsgLy9zb21ldGhpbmcgaXMgd3Jvbmcgd2l0aCByb3V0ZVxuXG4gICAgICAgICAgICAvL25ld2VyIHJvdXRlIG92ZXJyaWRlLi4uXG4gICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAvLyAgICdjcmVhdGUnOiB7XG4gICAgICAgICAgICAvLyAgICAgJ3BhdGgnOiAnY3VzdG9tL3BhdGgnLFxuICAgICAgICAgICAgLy8gICAgICdhdXRoJzogdHJ1ZSxcbiAgICAgICAgICAgIC8vICAgICAnb25SZXNwb25zZSc6IGZ1bmN0aW9uKHJlc3VsdCwgcmVzLCBuZXh0KSB7IH1cbiAgICAgICAgICAgIC8vICAgfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgbGV0IG92ZXJyaWRlcyA9IG9wdGlvbnNbcm91dGUua2V5XSB8fCB7fTtcblxuICAgICAgICAgICAgLy9sb29rIGZvciBvdmVycmlkZW4gcGF0aHMgaW4gZWl0aGVyIG5ldyBvdmVycmlkZSBzdHJ1Y3R1cmUgb3Igb2xkZXIga2V5OnBhdGggZm9ybWF0XG4gICAgICAgICAgICBsZXQgcGF0aCA9ICcvJyArICggb3ZlcnJpZGVzLnBhdGggfHwgcGF0aHNbcm91dGUua2V5XSB8fCByb3V0ZS5wYXRoICk7XG4gICAgICAgICAgICAvL2xvb2sgZm9yIGF1dGhlbnRpY2F0aW9uIG92ZXJyaWRlIGluIGVpdGhlciBuZXcgc3RydWN0dXJlIG9yIG9sZGVyIGZvcm1hdFxuICAgICAgICAgICAgbGV0IG5lZWRzQXV0aCA9IG92ZXJyaWRlcy5hdXRoIHx8IGF1dGhzW3JvdXRlLmtleV0gfHwgcm91dGUuYXV0aDtcblxuICAgICAgICAgICAgaWYob3B0aW9ucy5sb2dnZXIpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhgQmluZGluZyBTZXJ2aWNlIFJvdXRlIFske3JvdXRlLm1ldGhvZH1dICR7cGF0aH1gKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm91dGVyW3JvdXRlLm1ldGhvZF0oIHBhdGgsIChyZXEgOiBhbnksIHJlcyA6IGFueSwgbmV4dCA6IEZ1bmN0aW9uKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKHJvdXRlLm9uRXhlY3V0ZSkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSggbnVsbCApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMubG9nZ2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhgRXhlY3V0aW5nIFNlcnZpY2UgUm91dGUgWyR7cm91dGUubWV0aG9kfV0gJHtwYXRofWApXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhKU09OLnN0cmluZ2lmeShyZXEucGFyYW1zKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHN2YyA9IHRoaXMuZ2V0U2VydmljZShyZXEsIG5lZWRzQXV0aCwgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSByb3V0ZS5vbkV4ZWN1dGUoc3ZjLCByZXEpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKCBlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKCAoIHJlc3VsdCA6IGFueSApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9uUmVzcG9uc2UgPSBvdmVycmlkZXMub25SZXNwb25zZSB8fCByb3V0ZS5vblJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICBpZihvblJlc3BvbnNlKSBvblJlc3BvbnNlKHJlc3VsdCwgcmVzLCBuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXMuanNvbihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCAoZXJyIDogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYob3ZlcnJpZGVzLm9uRXJyb3IpIG92ZXJyaWRlcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMub25FcnJvcikgb3B0aW9ucy5vbkVycm9yKHJvdXRlLmtleSwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAvL2lmIHJvdXRlIGhhcyBhIGZpbmlzaCBmdW5jdGlvbiBkZWZpbmVkLCBpbnZva2UgaXRcbiAgICAgICAgICAgICAgICAgICAgaWYob3ZlcnJpZGVzLm9uRmluaXNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVycmlkZXMub25GaW5pc2gocmVxLCByZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9pZiBwcm94eSBoYXMgYW4gb3ZlcmFsbCBmaW5pc2ggZnVuY3Rpb24gZGVmaW5lZCwgaW52b2tlIGl0XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaW5pc2hGbiA9IG9wdGlvbnMub25GaW5pc2g7XG4gICAgICAgICAgICAgICAgICAgIGlmKGZpbmlzaEZuKSBmaW5pc2hGbihyb3V0ZS5rZXksIHJlcSwgcmVzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICogQHBhcmFtIHtIdHRwUmVxdWVzdH0gcmVxIC0gaW5jb21pbmcgaHR0cCByZXF1ZXN0IGJlaW5nIHByb3hpZWRcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbmVlZHNBdXRoIC0gZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSByZXF1ZXN0IG11c3QgcHJvdmlkZSBhbiBhdXRoZW50aWNhdGlvbiB0b2tlblxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBhZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgICogQHJldHVybiB7SHR0cENsaWVudH0gY2xpZW50IHRvIHVzZSB0byBtYWtlIHJlcXVlc3RzIHRvIEdlb1BsYXRmb3JtIEFQSSBlbmRwb2ludFxuICAgICovXG4gICAgZ2V0Q2xpZW50OiBmdW5jdGlvbihyZXEgOiBhbnksIG5lZWRzQXV0aCA6IGJvb2xlYW4sIG9wdGlvbnMgPzogYW55KSB7XG5cbiAgICAgICAgbGV0IHRva2VuID0gcmVxLmFjY2Vzc1Rva2VuIHx8IG51bGw7XG4gICAgICAgIGlmKG5lZWRzQXV0aCAmJiBvcHRpb25zLmxvZ2dlcikge1xuICAgICAgICAgICAgaWYoIXRva2VuKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5sb2dnZXIud2FybihcIlNlcnZpY2VQcm94eS5nZXRDbGllbnQoKSAtIE5vIEFjY2VzcyBUb2tlbiB3YXMgcHJvdmlkZWQgb24gaW5jb21pbmcgcmVxdWVzdCBoZWFkZXIhXCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKCEhb3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKGBTZXJ2aWNlUHJveHkuZ2V0Q2xpZW50KCkgLSBUb2tlbjogJHt0b2tlbn1gKTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhgU2VydmljZVByb3h5LmdldENsaWVudCgpIC0gSldUOiAke3JlcS5qd3R9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IE5vZGVIdHRwQ2xpZW50KHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IENvbmZpZy50aW1lb3V0LFxuICAgICAgICAgICAgdG9rZW46IG5lZWRzQXV0aCA/IHRva2VuIDogbnVsbFxuICAgICAgICB9KTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0h0dHBSZXF1ZXN0fSByZXEgLSBpbmNvbWluZyBodHRwIHJlcXVlc3QgYmVpbmcgcHJveGllZFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbmVlZHNBdXRoIC0gZmxhZyBpbmRpY2F0aW5nIGlmIHJlcXVlc3QgcmVxdWlyZXMgYXV0aG9yaXphdGlvbiB0b2tlblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gYWRkaXRpb25hbCBjb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgICAgKi9cbiAgICBnZXRTZXJ2aWNlOiBmdW5jdGlvbihyZXEgOiBhbnksIG5lZWRzQXV0aCA6IGJvb2xlYW4sIG9wdGlvbnMgPzogYW55KSB7XG4gICAgICAgIGxldCBjbGllbnQgPSB0aGlzLmdldENsaWVudChyZXEsIG5lZWRzQXV0aCwgb3B0aW9ucyk7XG4gICAgICAgIGxldCBzdmNDbGFzcyA9IG9wdGlvbnMuc2VydmljZUNsYXNzIHx8IEl0ZW1TZXJ2aWNlO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlByb3h5aW5nIHRvIFwiICsgQ29uZmlnLnVhbFVybCk7XG4gICAgICAgIGlmKG9wdGlvbnMubG9nZ2VyKSB7XG4gICAgICAgICAgICBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhgUHJveHlpbmcgdG8gJHtDb25maWcudWFsVXJsfWApO1xuICAgICAgICAgICAgLy8gb3B0aW9ucy5sb2dnZXIuZGVidWcoXCJVc2luZyBzZXJ2aWNlIGNsYXNzOiBcIiArIHN2Y0NsYXNzKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VydmljZSA9IG5ldyBzdmNDbGFzcyhDb25maWcudWFsVXJsLCBjbGllbnQpO1xuICAgICAgICBzZXJ2aWNlLnNldFRpbWVvdXQoQ29uZmlnLnRpbWVvdXQgfHwgMzAwMDApO1xuICAgICAgICBpZihvcHRpb25zLmxvZ2dlcikge1xuICAgICAgICAgICAgc2VydmljZS5zZXRMb2dnZXIob3B0aW9ucy5sb2dnZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZpY2VQcm94eTtcbiJdfQ==