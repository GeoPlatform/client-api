/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import NodeHttpClient from '../../http/node';
import { Config, ItemService } from '@geoplatform/client';
var ɵ0 = function (router, routes, options) {
    var _this = this;
    options = options || {};
    /** @type {?} */
    var paths = options.paths || {};
    /** @type {?} */
    var auths = options.auth || {};
    routes.forEach(function (route) {
        if (paths[route.key] === false)
            return; //disabled endpoint
        if (!paths[route.key] && !route.path)
            return;
        /** @type {?} */
        var overrides = options[route.key] || {};
        /** @type {?} */
        var path = '/' + (overrides.path || paths[route.key] || route.path);
        /** @type {?} */
        var needsAuth = overrides.auth || auths[route.key] || route.auth;
        // console.log(`Binding Service Route [${route.method}] ${path}`)
        router[route.method](path, function (req, res, next) {
            /** @type {?} */
            var svc = _this.getService(req, needsAuth, options);
            /** @type {?} */
            var promise = route.execFn(svc, req);
            promise.then(function (result) {
                /** @type {?} */
                var respFn = overrides.respFn || route.respFn;
                if (respFn)
                    respFn(result, res, next);
                else
                    res.json(result);
            })
                .catch(function (err) {
                if (options.onError)
                    options.onError(route.key, err);
                next(err);
            })
                .finally(function () {
                if (options.onFinish)
                    options.onFinish(route.key, req, res);
            });
        });
    });
}, ɵ1 = function (req, needsAuth, options) {
    /** @type {?} */
    var token = req.accessToken || null;
    if (needsAuth) {
        if (!token && options.logger)
            options.logger.warn("ServiceProxy.getClient() - No Access Token was provided on incoming request header!");
        else if (!!options.debug && options.logger) {
            options.logger.debug("ServiceProxy.getClient() - Token: " + token);
            options.logger.debug("ServiceProxy.getClient() - JWT: " + req.jwt);
        }
    }
    return new NodeHttpClient({
        timeout: Config["timeout"],
        token: needsAuth ? token : null
    });
}, ɵ2 = function (req, needsAuth, options) {
    /** @type {?} */
    var client = this.getClient(req, needsAuth, options);
    /** @type {?} */
    var svcClass = options.serviceClass || ItemService;
    /** @type {?} */
    var service = new svcClass(Config["ualUrl"], client);
    if (options.logger) {
        service.setLogger(options.logger);
    }
    return service;
};
/** @type {?} */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvbm9kZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb3hpZXMvYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxjQUFjLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztTQVcxQyxVQUFTLE1BQVksRUFBRSxNQUFjLEVBQUUsT0FBYztJQUFyRCxpQkFrRFg7SUFoREcsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7O0lBQ3hCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDOztJQUNoQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUUvQixNQUFNLENBQUMsT0FBTyxDQUFFLFVBQUEsS0FBSztRQUVqQixJQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSztZQUFFLE9BQU87UUFDdEMsSUFBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtZQUFFLE9BQU87O1FBVTVDLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDOztRQUd6QyxJQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBRSxTQUFTLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBRSxDQUFDOztRQUV0RSxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQzs7UUFHakUsTUFBTSxDQUFDLEtBQUssQ0FB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XG5pbXBvcnQgeyBDb25maWcsIEl0ZW1TZXJ2aWNlIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuXG5jb25zdCBTZXJ2aWNlUHJveHkgPSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyIC0gRXhwcmVzc0pTIHJvdXRlciBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7YXJyYXlbb2JqZWN0XX0gcm91dGVzIC0gbGlzdCBvZiByb3V0ZXMgdG8gbWFwIHRvIHRoZSByb3V0ZXJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBuZWVkZWRcbiAgICAgKi9cbiAgICBiaW5kUm91dGVzOiBmdW5jdGlvbihyb3V0ZXIgOiBhbnksIHJvdXRlcyA6IGFueVtdLCBvcHRpb25zID86IGFueSkge1xuXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBsZXQgcGF0aHMgPSBvcHRpb25zLnBhdGhzIHx8IHt9O1xuICAgICAgICBsZXQgYXV0aHMgPSBvcHRpb25zLmF1dGggfHwge307XG5cbiAgICAgICAgcm91dGVzLmZvckVhY2goIHJvdXRlID0+IHtcblxuICAgICAgICAgICAgaWYocGF0aHNbcm91dGUua2V5XSA9PT0gZmFsc2UpIHJldHVybjsgIC8vZGlzYWJsZWQgZW5kcG9pbnRcbiAgICAgICAgICAgIGlmKCFwYXRoc1tyb3V0ZS5rZXldICYmICFyb3V0ZS5wYXRoKSByZXR1cm47IC8vc29tZXRoaW5nIGlzIHdyb25nIHdpdGggcm91dGVcblxuICAgICAgICAgICAgLy9uZXdlciByb3V0ZSBvdmVycmlkZS4uLlxuICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgLy8gICAnY3JlYXRlJzoge1xuICAgICAgICAgICAgLy8gICAgICdwYXRoJzogJ2N1c3RvbS9wYXRoJyxcbiAgICAgICAgICAgIC8vICAgICAnYXV0aCc6IHRydWUsXG4gICAgICAgICAgICAvLyAgICAgJ3Jlc3BGbic6IGZ1bmN0aW9uKHJlc3VsdCwgcmVzLCBuZXh0KSB7IH1cbiAgICAgICAgICAgIC8vICAgfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgbGV0IG92ZXJyaWRlcyA9IG9wdGlvbnNbcm91dGUua2V5XSB8fCB7fTtcblxuICAgICAgICAgICAgLy9sb29rIGZvciBvdmVycmlkZW4gcGF0aHMgaW4gZWl0aGVyIG5ldyBvdmVycmlkZSBzdHJ1Y3R1cmUgb3Igb2xkZXIga2V5OnBhdGggZm9ybWF0XG4gICAgICAgICAgICBsZXQgcGF0aCA9ICcvJyArICggb3ZlcnJpZGVzLnBhdGggfHwgcGF0aHNbcm91dGUua2V5XSB8fCByb3V0ZS5wYXRoICk7XG4gICAgICAgICAgICAvL2xvb2sgZm9yIGF1dGhlbnRpY2F0aW9uIG92ZXJyaWRlIGluIGVpdGhlciBuZXcgc3RydWN0dXJlIG9yIG9sZGVyIGZvcm1hdFxuICAgICAgICAgICAgbGV0IG5lZWRzQXV0aCA9IG92ZXJyaWRlcy5hdXRoIHx8IGF1dGhzW3JvdXRlLmtleV0gfHwgcm91dGUuYXV0aDtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYEJpbmRpbmcgU2VydmljZSBSb3V0ZSBbJHtyb3V0ZS5tZXRob2R9XSAke3BhdGh9YClcbiAgICAgICAgICAgIHJvdXRlcltyb3V0ZS5tZXRob2RdKCBwYXRoLCAocmVxIDogYW55LCByZXMgOiBhbnksIG5leHQgOiBGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBFeGVjdXRpbmcgU2VydmljZSBSb3V0ZSBbJHtyb3V0ZS5tZXRob2R9XSAke3BhdGh9YClcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXEucGFyYW1zKSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIgXCIpO1xuICAgICAgICAgICAgICAgIGxldCBzdmMgPSB0aGlzLmdldFNlcnZpY2UocmVxLCBuZWVkc0F1dGgsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gcm91dGUuZXhlY0ZuKHN2YywgcmVxKVxuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbiggKCByZXN1bHQ6YW55ICkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzcEZuID0gb3ZlcnJpZGVzLnJlc3BGbiB8fCByb3V0ZS5yZXNwRm47XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3BGbikgcmVzcEZuKHJlc3VsdCwgcmVzLCBuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXMuanNvbihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCAoZXJyIDogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9ucy5vbkVycm9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vbkVycm9yKHJvdXRlLmtleSwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9ucy5vbkZpbmlzaClcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub25GaW5pc2gocm91dGUua2V5LCByZXEsIHJlcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIEBwYXJhbSB7SHR0cFJlcXVlc3R9IHJlcSAtIGluY29taW5nIGh0dHAgcmVxdWVzdCBiZWluZyBwcm94aWVkXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5lZWRzQXV0aCAtIGZsYWcgaW5kaWNhdGluZyBpZiB0aGUgcmVxdWVzdCBtdXN0IHByb3ZpZGUgYW4gYXV0aGVudGljYXRpb24gdG9rZW5cbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gYWRkaXRpb25hbCBjb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgICAqIEByZXR1cm4ge0h0dHBDbGllbnR9IGNsaWVudCB0byB1c2UgdG8gbWFrZSByZXF1ZXN0cyB0byBHZW9QbGF0Zm9ybSBBUEkgZW5kcG9pbnRcbiAgICAqL1xuICAgIGdldENsaWVudDogZnVuY3Rpb24ocmVxIDogYW55LCBuZWVkc0F1dGggOiBib29sZWFuLCBvcHRpb25zID86IGFueSkge1xuXG4gICAgICAgIGxldCB0b2tlbiA9IHJlcS5hY2Nlc3NUb2tlbiB8fCBudWxsO1xuICAgICAgICBpZihuZWVkc0F1dGgpIHtcbiAgICAgICAgICAgIGlmKCF0b2tlbiAmJiBvcHRpb25zLmxvZ2dlcilcbiAgICAgICAgICAgICAgICBvcHRpb25zLmxvZ2dlci53YXJuKFwiU2VydmljZVByb3h5LmdldENsaWVudCgpIC0gTm8gQWNjZXNzIFRva2VuIHdhcyBwcm92aWRlZCBvbiBpbmNvbWluZyByZXF1ZXN0IGhlYWRlciFcIik7XG5cbiAgICAgICAgICAgIGVsc2UgaWYoISFvcHRpb25zLmRlYnVnICYmIG9wdGlvbnMubG9nZ2VyKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5sb2dnZXIuZGVidWcoYFNlcnZpY2VQcm94eS5nZXRDbGllbnQoKSAtIFRva2VuOiAke3Rva2VufWApO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKGBTZXJ2aWNlUHJveHkuZ2V0Q2xpZW50KCkgLSBKV1Q6ICR7cmVxLmp3dH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgTm9kZUh0dHBDbGllbnQoe1xuICAgICAgICAgICAgdGltZW91dDogQ29uZmlnLnRpbWVvdXQsXG4gICAgICAgICAgICB0b2tlbjogbmVlZHNBdXRoID8gdG9rZW4gOiBudWxsXG4gICAgICAgIH0pO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7SHR0cFJlcXVlc3R9IHJlcSAtIGluY29taW5nIGh0dHAgcmVxdWVzdCBiZWluZyBwcm94aWVkXG4gICAgICogQHBhcmFtIHtib29sZWFufSBuZWVkc0F1dGggLSBmbGFnIGluZGljYXRpbmcgaWYgcmVxdWVzdCByZXF1aXJlcyBhdXRob3JpemF0aW9uIHRva2VuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBhZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgICAqL1xuICAgIGdldFNlcnZpY2U6IGZ1bmN0aW9uKHJlcSA6IGFueSwgbmVlZHNBdXRoIDogYm9vbGVhbiwgb3B0aW9ucyA/OiBhbnkpIHtcbiAgICAgICAgbGV0IGNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KHJlcSwgbmVlZHNBdXRoLCBvcHRpb25zKTtcbiAgICAgICAgbGV0IHN2Y0NsYXNzID0gb3B0aW9ucy5zZXJ2aWNlQ2xhc3MgfHwgSXRlbVNlcnZpY2U7XG4gICAgICAgIGxldCBzZXJ2aWNlID0gbmV3IHN2Y0NsYXNzKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG4gICAgICAgIGlmKG9wdGlvbnMubG9nZ2VyKSB7XG4gICAgICAgICAgICBzZXJ2aWNlLnNldExvZ2dlcihvcHRpb25zLmxvZ2dlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VydmljZVByb3h5O1xuIl19