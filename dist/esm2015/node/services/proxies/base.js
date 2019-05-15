/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import NodeHttpClient from '../../http/node';
import { Config, ItemService } from '@geoplatform/client';
const ɵ0 = function (router, routes, options) {
    options = options || {};
    /** @type {?} */
    let paths = options.paths || {};
    routes.forEach(route => {
        if (paths[route.key] === false)
            return; //disabled endpoint
        if (!paths[route.key] && !route.path)
            return;
        /** @type {?} */
        let path = '/' + (paths[route.key] || route.path);
        // console.log(`Binding Service Route [${route.method}] ${path}`)
        router[route.method](path, (req, res, next) => {
            /** @type {?} */
            let svc = this.getService(req, route.auth, options);
            /** @type {?} */
            let promise = route.execFn(svc, req);
            promise.then((result) => {
                if (route.respFn)
                    route.respFn(result, res, next);
                else
                    res.json(result);
            })
                .catch((err) => {
                if (options.onError)
                    options.onError(route.key, err);
                next(err);
            })
                .finally(() => {
                if (options.onFinish)
                    options.onFinish(route.key, req, res);
            });
        });
    });
}, ɵ1 = function (req, needsAuth, options) {
    /** @type {?} */
    let token = req.accessToken || null;
    if (needsAuth) {
        if (!token && options.logger)
            options.logger.warn("ServiceProxy.getClient() - No Access Token was provided on incoming request header!");
        else if (!!options.debug && options.logger) {
            options.logger.debug(`ServiceProxy.getClient() - Token: ${token}`);
            options.logger.debug(`ServiceProxy.getClient() - JWT: ${req.jwt}`);
        }
    }
    return new NodeHttpClient({
        timeout: Config["timeout"],
        token: needsAuth ? token : null
    });
}, ɵ2 = function (req, needsAuth, options) {
    /** @type {?} */
    let client = this.getClient(req, needsAuth, options);
    /** @type {?} */
    let svcClass = options.serviceClass || ItemService;
    /** @type {?} */
    let service = new svcClass(Config["ualUrl"], client);
    if (options.logger) {
        service.setLogger(options.logger);
    }
    return service;
};
/** @type {?} */
const ServiceProxy = {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvbm9kZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb3hpZXMvYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxjQUFjLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztXQVcxQyxVQUFTLE1BQVksRUFBRSxNQUFjLEVBQUUsT0FBYztJQUU3RCxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQzs7SUFDeEIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7SUFFaEMsTUFBTSxDQUFDLE9BQU8sQ0FBRSxLQUFLLENBQUMsRUFBRTtRQUVwQixJQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSztZQUFFLE9BQU87UUFDdEMsSUFBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtZQUFFLE9BQU87O1FBRzVDLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBRSxDQUFDOztRQUdwRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFFLElBQUksRUFBRSxDQUFDLEdBQVMsRUFBRSxHQUFTLEVBQUUsSUFBZSxFQUFFLEVBQUU7O1lBSWxFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7O1lBQ3BELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQ3BDLE9BQU8sQ0FBQyxJQUFJLENBQUUsQ0FBQyxNQUFVLEVBQUUsRUFBRTtnQkFDekIsSUFBRyxLQUFLLENBQUMsTUFBTTtvQkFDWCxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7O29CQUVoQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQ3ZCLENBQUM7aUJBQ0QsS0FBSyxDQUFFLENBQUMsR0FBVyxFQUFFLEVBQUU7Z0JBQ3BCLElBQUcsT0FBTyxDQUFDLE9BQU87b0JBQ2QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDYixDQUFDO2lCQUNELE9BQU8sQ0FBRSxHQUFHLEVBQUU7Z0JBQ1gsSUFBRyxPQUFPLENBQUMsUUFBUTtvQkFDZixPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQzdDLENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQTtLQUNMLENBQUMsQ0FBQztDQUVOLE9BUVUsVUFBUyxHQUFTLEVBQUUsU0FBbUIsRUFBRSxPQUFjOztJQUU5RCxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQztJQUNwQyxJQUFHLFNBQVMsRUFBRTtRQUNWLElBQUcsQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLE1BQU07WUFDdkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUZBQXFGLENBQUMsQ0FBQzthQUUxRyxJQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDdkMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMscUNBQXFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDbkUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ3RFO0tBQ0o7SUFFRCxPQUFPLElBQUksY0FBYyxDQUFDO1FBQ3RCLE9BQU8sRUFBRSxNQUFNLFdBQVE7UUFDdkIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJO0tBQ2xDLENBQUMsQ0FBQztDQUNOLE9BUVcsVUFBUyxHQUFTLEVBQUUsU0FBbUIsRUFBRSxPQUFjOztJQUMvRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7O0lBQ3JELElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLElBQUksV0FBVyxDQUFDOztJQUNuRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLFlBQVMsTUFBTSxDQUFDLENBQUM7SUFDbEQsSUFBRyxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQ2YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDckM7SUFDRCxPQUFPLE9BQU8sQ0FBQztDQUNsQjs7QUF0RkwsTUFBTSxZQUFZLEdBQUc7Ozs7OztJQU9qQixVQUFVLElBc0NUOzs7Ozs7O0lBUUQsU0FBUyxJQWlCUjs7Ozs7O0lBUUQsVUFBVSxJQVFUO0NBQ0osQ0FBQztBQUVGLGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCBOb2RlSHR0cENsaWVudCBmcm9tICcuLi8uLi9odHRwL25vZGUnO1xuaW1wb3J0IHsgQ29uZmlnLCBJdGVtU2VydmljZSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cblxuY29uc3QgU2VydmljZVByb3h5ID0ge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlciAtIEV4cHJlc3NKUyByb3V0ZXIgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge2FycmF5W29iamVjdF19IHJvdXRlcyAtIGxpc3Qgb2Ygcm91dGVzIHRvIG1hcCB0byB0aGUgcm91dGVyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBhZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gbmVlZGVkXG4gICAgICovXG4gICAgYmluZFJvdXRlczogZnVuY3Rpb24ocm91dGVyIDogYW55LCByb3V0ZXMgOiBhbnlbXSwgb3B0aW9ucyA/OiBhbnkpIHtcblxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgbGV0IHBhdGhzID0gb3B0aW9ucy5wYXRocyB8fCB7fTtcblxuICAgICAgICByb3V0ZXMuZm9yRWFjaCggcm91dGUgPT4ge1xuXG4gICAgICAgICAgICBpZihwYXRoc1tyb3V0ZS5rZXldID09PSBmYWxzZSkgcmV0dXJuOyAgLy9kaXNhYmxlZCBlbmRwb2ludFxuICAgICAgICAgICAgaWYoIXBhdGhzW3JvdXRlLmtleV0gJiYgIXJvdXRlLnBhdGgpIHJldHVybjsgLy9zb21ldGhpbmcgaXMgd3Jvbmcgd2l0aCByb3V0ZVxuXG4gICAgICAgICAgICAvLyBsZXQgcGF0aCA9ICcvJyArICggcGF0aHNbcm91dGUua2V5XSB8fCByb3V0ZS5wYXRoRm4ocGF0aEJhc2UpICk7XG4gICAgICAgICAgICBsZXQgcGF0aCA9ICcvJyArICggcGF0aHNbcm91dGUua2V5XSB8fCByb3V0ZS5wYXRoICk7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBCaW5kaW5nIFNlcnZpY2UgUm91dGUgWyR7cm91dGUubWV0aG9kfV0gJHtwYXRofWApXG4gICAgICAgICAgICByb3V0ZXJbcm91dGUubWV0aG9kXSggcGF0aCwgKHJlcSA6IGFueSwgcmVzIDogYW55LCBuZXh0IDogRnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgRXhlY3V0aW5nIFNlcnZpY2UgUm91dGUgWyR7cm91dGUubWV0aG9kfV0gJHtwYXRofWApXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVxLnBhcmFtcykpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIFwiKTtcbiAgICAgICAgICAgICAgICBsZXQgc3ZjID0gdGhpcy5nZXRTZXJ2aWNlKHJlcSwgcm91dGUuYXV0aCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSByb3V0ZS5leGVjRm4oc3ZjLCByZXEpXG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKCAocmVzdWx0OmFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihyb3V0ZS5yZXNwRm4pXG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZS5yZXNwRm4ocmVzdWx0LCByZXMsIG5leHQpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuanNvbihyZXN1bHQpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goIChlcnIgOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihvcHRpb25zLm9uRXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9uRXJyb3Iocm91dGUua2V5LCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluYWxseSggKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihvcHRpb25zLm9uRmluaXNoKVxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vbkZpbmlzaChyb3V0ZS5rZXksIHJlcSwgcmVzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICogQHBhcmFtIHtIdHRwUmVxdWVzdH0gcmVxIC0gaW5jb21pbmcgaHR0cCByZXF1ZXN0IGJlaW5nIHByb3hpZWRcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbmVlZHNBdXRoIC0gZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSByZXF1ZXN0IG11c3QgcHJvdmlkZSBhbiBhdXRoZW50aWNhdGlvbiB0b2tlblxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBhZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgICogQHJldHVybiB7SHR0cENsaWVudH0gY2xpZW50IHRvIHVzZSB0byBtYWtlIHJlcXVlc3RzIHRvIEdlb1BsYXRmb3JtIEFQSSBlbmRwb2ludFxuICAgICovXG4gICAgZ2V0Q2xpZW50OiBmdW5jdGlvbihyZXEgOiBhbnksIG5lZWRzQXV0aCA6IGJvb2xlYW4sIG9wdGlvbnMgPzogYW55KSB7XG5cbiAgICAgICAgbGV0IHRva2VuID0gcmVxLmFjY2Vzc1Rva2VuIHx8IG51bGw7XG4gICAgICAgIGlmKG5lZWRzQXV0aCkge1xuICAgICAgICAgICAgaWYoIXRva2VuICYmIG9wdGlvbnMubG9nZ2VyKVxuICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLndhcm4oXCJTZXJ2aWNlUHJveHkuZ2V0Q2xpZW50KCkgLSBObyBBY2Nlc3MgVG9rZW4gd2FzIHByb3ZpZGVkIG9uIGluY29taW5nIHJlcXVlc3QgaGVhZGVyIVwiKTtcblxuICAgICAgICAgICAgZWxzZSBpZighIW9wdGlvbnMuZGVidWcgJiYgb3B0aW9ucy5sb2dnZXIpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhgU2VydmljZVByb3h5LmdldENsaWVudCgpIC0gVG9rZW46ICR7dG9rZW59YCk7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5sb2dnZXIuZGVidWcoYFNlcnZpY2VQcm94eS5nZXRDbGllbnQoKSAtIEpXVDogJHtyZXEuand0fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBOb2RlSHR0cENsaWVudCh7XG4gICAgICAgICAgICB0aW1lb3V0OiBDb25maWcudGltZW91dCxcbiAgICAgICAgICAgIHRva2VuOiBuZWVkc0F1dGggPyB0b2tlbiA6IG51bGxcbiAgICAgICAgfSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtIdHRwUmVxdWVzdH0gcmVxIC0gaW5jb21pbmcgaHR0cCByZXF1ZXN0IGJlaW5nIHByb3hpZWRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5lZWRzQXV0aCAtIGZsYWcgaW5kaWNhdGluZyBpZiByZXF1ZXN0IHJlcXVpcmVzIGF1dGhvcml6YXRpb24gdG9rZW5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAgICovXG4gICAgZ2V0U2VydmljZTogZnVuY3Rpb24ocmVxIDogYW55LCBuZWVkc0F1dGggOiBib29sZWFuLCBvcHRpb25zID86IGFueSkge1xuICAgICAgICBsZXQgY2xpZW50ID0gdGhpcy5nZXRDbGllbnQocmVxLCBuZWVkc0F1dGgsIG9wdGlvbnMpO1xuICAgICAgICBsZXQgc3ZjQ2xhc3MgPSBvcHRpb25zLnNlcnZpY2VDbGFzcyB8fCBJdGVtU2VydmljZTtcbiAgICAgICAgbGV0IHNlcnZpY2UgPSBuZXcgc3ZjQ2xhc3MoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbiAgICAgICAgaWYob3B0aW9ucy5sb2dnZXIpIHtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2V0TG9nZ2VyKG9wdGlvbnMubG9nZ2VyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZXJ2aWNlUHJveHk7XG4iXX0=