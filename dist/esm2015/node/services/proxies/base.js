import NodeHttpClient from '../../http/node';
import { Config, ItemService } from '@geoplatform/client';
const ɵ0 = function (router, routes, options) {
    options = options || {};
    let paths = options.paths || {};
    let auths = options.auth || {};
    routes.forEach(route => {
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
        let overrides = options[route.key] || {};
        //look for overriden paths in either new override structure or older key:path format
        let path = '/' + (overrides.path || paths[route.key] || route.path);
        //look for authentication override in either new structure or older format
        let needsAuth = overrides.auth || auths[route.key] || route.auth;
        if (options.logger) {
            options.logger.debug(`Binding Service Route [${route.method}] ${path}`);
        }
        router[route.method](path, (req, res, next) => {
            let promise = null;
            if (typeof (route.onExecute) !== 'function') {
                promise = Promise.resolve(null);
            }
            else {
                if (options.logger) {
                    options.logger.debug(`Executing Service Route [${route.method}] ${path}`);
                    options.logger.debug(JSON.stringify(req.params));
                    options.logger.debug("-------------------------");
                }
                let svc = this.getService(req, needsAuth, options);
                try {
                    promise = route.onExecute(svc, req);
                }
                catch (e) {
                    promise = Promise.reject(e);
                }
            }
            promise.then((result) => {
                let onResponse = overrides.onResponse || route.onResponse;
                if (onResponse)
                    onResponse(result, res, next);
                else
                    res.json(result);
            })
                .catch((err) => {
                if (overrides.onError)
                    overrides.onError(err);
                if (options.onError)
                    options.onError(route.key, err);
                next(err);
            })
                .finally(() => {
                //if route has a finish function defined, invoke it
                if (overrides.onFinish) {
                    overrides.onFinish(req, res);
                }
                //if proxy has an overall finish function defined, invoke it
                let finishFn = options.onFinish;
                if (finishFn)
                    finishFn(route.key, req, res);
            });
        });
    });
}, ɵ1 = function (req, needsAuth, options) {
    let token = req.accessToken || null;
    if (needsAuth && options.logger) {
        if (!token) {
            options.logger.warn("ServiceProxy.getClient() - No Access Token was provided on incoming request header!");
        }
        else if (!!options.debug) {
            options.logger.debug(`ServiceProxy.getClient() - Token: ${token}`);
            options.logger.debug(`ServiceProxy.getClient() - JWT: ${req.jwt}`);
        }
    }
    return new NodeHttpClient({
        timeout: Config.timeout,
        token: needsAuth ? token : null
    });
}, ɵ2 = function (req, needsAuth, options) {
    let client = this.getClient(req, needsAuth, options);
    let svcClass = options.serviceClass || ItemService;
    // console.log("Proxying to " + Config.ualUrl);
    if (options.logger) {
        options.logger.debug(`Proxying to ${Config.ualUrl}`);
        // options.logger.debug("Using service class: " + svcClass);
    }
    let service = new svcClass(Config.ualUrl, client);
    if (options.logger) {
        service.setLogger(options.logger);
    }
    return service;
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvbm9kZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb3hpZXMvYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLGNBQWMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO1dBVzFDLFVBQVMsTUFBWSxFQUFFLE1BQWMsRUFBRSxPQUFjO0lBRTdELE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ3hCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO0lBQ2hDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0lBRS9CLE1BQU0sQ0FBQyxPQUFPLENBQUUsS0FBSyxDQUFDLEVBQUU7UUFFcEIsSUFBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUs7WUFBRSxPQUFPLENBQUUsbUJBQW1CO1FBQzNELElBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFBRSxPQUFPLENBQUMsK0JBQStCO1FBRTVFLHlCQUF5QjtRQUN6QixJQUFJO1FBQ0osZ0JBQWdCO1FBQ2hCLDZCQUE2QjtRQUM3QixvQkFBb0I7UUFDcEIsb0RBQW9EO1FBQ3BELE1BQU07UUFDTixJQUFJO1FBQ0osSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFekMsb0ZBQW9GO1FBQ3BGLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFFLFNBQVMsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFFLENBQUM7UUFDdEUsMEVBQTBFO1FBQzFFLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRWpFLElBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNmLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDBCQUEwQixLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRSxDQUFDLENBQUE7U0FDMUU7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFFLElBQUksRUFBRSxDQUFDLEdBQVMsRUFBRSxHQUFTLEVBQUUsSUFBZSxFQUFFLEVBQUU7WUFFbEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUcsT0FBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxVQUFVLEVBQUU7Z0JBQ3ZDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFFLElBQUksQ0FBRSxDQUFDO2FBQ3JDO2lCQUFNO2dCQUNILElBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRTtvQkFDZixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFBO29CQUN6RSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNqRCxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2lCQUNyRDtnQkFDRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBRW5ELElBQUk7b0JBQ0EsT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUN2QztnQkFBQyxPQUFPLENBQUMsRUFBRztvQkFDVCxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDL0I7YUFDSjtZQUVELE9BQU8sQ0FBQyxJQUFJLENBQUUsQ0FBRSxNQUFZLEVBQUcsRUFBRTtnQkFDN0IsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDO2dCQUMxRCxJQUFHLFVBQVU7b0JBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7O29CQUN4QyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUUsQ0FBQyxHQUFXLEVBQUUsRUFBRTtnQkFDcEIsSUFBRyxTQUFTLENBQUMsT0FBTztvQkFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QyxJQUFHLE9BQU8sQ0FBQyxPQUFPO29CQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxDQUFDO2lCQUNELE9BQU8sQ0FBRSxHQUFHLEVBQUU7Z0JBRVgsbURBQW1EO2dCQUNuRCxJQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUU7b0JBQ25CLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQztnQkFFRCw0REFBNEQ7Z0JBQzVELElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7Z0JBQ2hDLElBQUcsUUFBUTtvQkFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxPQVFVLFVBQVMsR0FBUyxFQUFFLFNBQW1CLEVBQUUsT0FBYztJQUU5RCxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQztJQUNwQyxJQUFHLFNBQVMsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQzVCLElBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDUCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxRkFBcUYsQ0FBQyxDQUFDO1NBQzlHO2FBQU0sSUFBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtZQUN2QixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUNuRSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDdEU7S0FDSjtJQUVELE9BQU8sSUFBSSxjQUFjLENBQUM7UUFDdEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1FBQ3ZCLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSTtLQUNsQyxDQUFDLENBQUM7QUFDUCxDQUFDLE9BUVcsVUFBUyxHQUFTLEVBQUUsU0FBbUIsRUFBRSxPQUFjO0lBQy9ELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxJQUFJLFdBQVcsQ0FBQztJQUNuRCwrQ0FBK0M7SUFDL0MsSUFBRyxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQ2YsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNyRCw0REFBNEQ7S0FDL0Q7SUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELElBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRTtRQUNmLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3JDO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQTdITCxNQUFNLFlBQVksR0FBRztJQUVqQjs7OztPQUlHO0lBQ0gsVUFBVSxJQXlFVDtJQUVEOzs7OztNQUtFO0lBQ0YsU0FBUyxJQWdCUjtJQUdEOzs7O09BSUc7SUFDSCxVQUFVLElBYVQ7Q0FDSixDQUFDO0FBRUYsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IE5vZGVIdHRwQ2xpZW50IGZyb20gJy4uLy4uL2h0dHAvbm9kZSc7XG5pbXBvcnQgeyBDb25maWcsIEl0ZW1TZXJ2aWNlIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuXG5jb25zdCBTZXJ2aWNlUHJveHkgPSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyIC0gRXhwcmVzc0pTIHJvdXRlciBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7YXJyYXlbb2JqZWN0XX0gcm91dGVzIC0gbGlzdCBvZiByb3V0ZXMgdG8gbWFwIHRvIHRoZSByb3V0ZXJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBuZWVkZWRcbiAgICAgKi9cbiAgICBiaW5kUm91dGVzOiBmdW5jdGlvbihyb3V0ZXIgOiBhbnksIHJvdXRlcyA6IGFueVtdLCBvcHRpb25zID86IGFueSkge1xuXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBsZXQgcGF0aHMgPSBvcHRpb25zLnBhdGhzIHx8IHt9O1xuICAgICAgICBsZXQgYXV0aHMgPSBvcHRpb25zLmF1dGggfHwge307XG5cbiAgICAgICAgcm91dGVzLmZvckVhY2goIHJvdXRlID0+IHtcblxuICAgICAgICAgICAgaWYocGF0aHNbcm91dGUua2V5XSA9PT0gZmFsc2UpIHJldHVybjsgIC8vZGlzYWJsZWQgZW5kcG9pbnRcbiAgICAgICAgICAgIGlmKCFwYXRoc1tyb3V0ZS5rZXldICYmICFyb3V0ZS5wYXRoKSByZXR1cm47IC8vc29tZXRoaW5nIGlzIHdyb25nIHdpdGggcm91dGVcblxuICAgICAgICAgICAgLy9uZXdlciByb3V0ZSBvdmVycmlkZS4uLlxuICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgLy8gICAnY3JlYXRlJzoge1xuICAgICAgICAgICAgLy8gICAgICdwYXRoJzogJ2N1c3RvbS9wYXRoJyxcbiAgICAgICAgICAgIC8vICAgICAnYXV0aCc6IHRydWUsXG4gICAgICAgICAgICAvLyAgICAgJ29uUmVzcG9uc2UnOiBmdW5jdGlvbihyZXN1bHQsIHJlcywgbmV4dCkgeyB9XG4gICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGxldCBvdmVycmlkZXMgPSBvcHRpb25zW3JvdXRlLmtleV0gfHwge307XG5cbiAgICAgICAgICAgIC8vbG9vayBmb3Igb3ZlcnJpZGVuIHBhdGhzIGluIGVpdGhlciBuZXcgb3ZlcnJpZGUgc3RydWN0dXJlIG9yIG9sZGVyIGtleTpwYXRoIGZvcm1hdFxuICAgICAgICAgICAgbGV0IHBhdGggPSAnLycgKyAoIG92ZXJyaWRlcy5wYXRoIHx8IHBhdGhzW3JvdXRlLmtleV0gfHwgcm91dGUucGF0aCApO1xuICAgICAgICAgICAgLy9sb29rIGZvciBhdXRoZW50aWNhdGlvbiBvdmVycmlkZSBpbiBlaXRoZXIgbmV3IHN0cnVjdHVyZSBvciBvbGRlciBmb3JtYXRcbiAgICAgICAgICAgIGxldCBuZWVkc0F1dGggPSBvdmVycmlkZXMuYXV0aCB8fCBhdXRoc1tyb3V0ZS5rZXldIHx8IHJvdXRlLmF1dGg7XG5cbiAgICAgICAgICAgIGlmKG9wdGlvbnMubG9nZ2VyKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5sb2dnZXIuZGVidWcoYEJpbmRpbmcgU2VydmljZSBSb3V0ZSBbJHtyb3V0ZS5tZXRob2R9XSAke3BhdGh9YClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvdXRlcltyb3V0ZS5tZXRob2RdKCBwYXRoLCAocmVxIDogYW55LCByZXMgOiBhbnksIG5leHQgOiBGdW5jdGlvbikgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihyb3V0ZS5vbkV4ZWN1dGUpICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoIG51bGwgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZihvcHRpb25zLmxvZ2dlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5sb2dnZXIuZGVidWcoYEV4ZWN1dGluZyBTZXJ2aWNlIFJvdXRlIFske3JvdXRlLm1ldGhvZH1dICR7cGF0aH1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5sb2dnZXIuZGVidWcoSlNPTi5zdHJpbmdpZnkocmVxLnBhcmFtcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5sb2dnZXIuZGVidWcoXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdmMgPSB0aGlzLmdldFNlcnZpY2UocmVxLCBuZWVkc0F1dGgsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gcm91dGUub25FeGVjdXRlKHN2YywgcmVxKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCggZSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbiggKCByZXN1bHQgOiBhbnkgKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvblJlc3BvbnNlID0gb3ZlcnJpZGVzLm9uUmVzcG9uc2UgfHwgcm91dGUub25SZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgaWYob25SZXNwb25zZSkgb25SZXNwb25zZShyZXN1bHQsIHJlcywgbmV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmVzLmpzb24ocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCggKGVyciA6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKG92ZXJyaWRlcy5vbkVycm9yKSBvdmVycmlkZXMub25FcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICBpZihvcHRpb25zLm9uRXJyb3IpIG9wdGlvbnMub25FcnJvcihyb3V0ZS5rZXksIGVycik7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5maW5hbGx5KCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9pZiByb3V0ZSBoYXMgYSBmaW5pc2ggZnVuY3Rpb24gZGVmaW5lZCwgaW52b2tlIGl0XG4gICAgICAgICAgICAgICAgICAgIGlmKG92ZXJyaWRlcy5vbkZpbmlzaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcnJpZGVzLm9uRmluaXNoKHJlcSwgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgcHJveHkgaGFzIGFuIG92ZXJhbGwgZmluaXNoIGZ1bmN0aW9uIGRlZmluZWQsIGludm9rZSBpdFxuICAgICAgICAgICAgICAgICAgICBsZXQgZmluaXNoRm4gPSBvcHRpb25zLm9uRmluaXNoO1xuICAgICAgICAgICAgICAgICAgICBpZihmaW5pc2hGbikgZmluaXNoRm4ocm91dGUua2V5LCByZXEsIHJlcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIEBwYXJhbSB7SHR0cFJlcXVlc3R9IHJlcSAtIGluY29taW5nIGh0dHAgcmVxdWVzdCBiZWluZyBwcm94aWVkXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5lZWRzQXV0aCAtIGZsYWcgaW5kaWNhdGluZyBpZiB0aGUgcmVxdWVzdCBtdXN0IHByb3ZpZGUgYW4gYXV0aGVudGljYXRpb24gdG9rZW5cbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gYWRkaXRpb25hbCBjb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgICAqIEByZXR1cm4ge0h0dHBDbGllbnR9IGNsaWVudCB0byB1c2UgdG8gbWFrZSByZXF1ZXN0cyB0byBHZW9QbGF0Zm9ybSBBUEkgZW5kcG9pbnRcbiAgICAqL1xuICAgIGdldENsaWVudDogZnVuY3Rpb24ocmVxIDogYW55LCBuZWVkc0F1dGggOiBib29sZWFuLCBvcHRpb25zID86IGFueSkge1xuXG4gICAgICAgIGxldCB0b2tlbiA9IHJlcS5hY2Nlc3NUb2tlbiB8fCBudWxsO1xuICAgICAgICBpZihuZWVkc0F1dGggJiYgb3B0aW9ucy5sb2dnZXIpIHtcbiAgICAgICAgICAgIGlmKCF0b2tlbikge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLndhcm4oXCJTZXJ2aWNlUHJveHkuZ2V0Q2xpZW50KCkgLSBObyBBY2Nlc3MgVG9rZW4gd2FzIHByb3ZpZGVkIG9uIGluY29taW5nIHJlcXVlc3QgaGVhZGVyIVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZighIW9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhgU2VydmljZVByb3h5LmdldENsaWVudCgpIC0gVG9rZW46ICR7dG9rZW59YCk7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5sb2dnZXIuZGVidWcoYFNlcnZpY2VQcm94eS5nZXRDbGllbnQoKSAtIEpXVDogJHtyZXEuand0fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBOb2RlSHR0cENsaWVudCh7XG4gICAgICAgICAgICB0aW1lb3V0OiBDb25maWcudGltZW91dCxcbiAgICAgICAgICAgIHRva2VuOiBuZWVkc0F1dGggPyB0b2tlbiA6IG51bGxcbiAgICAgICAgfSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtIdHRwUmVxdWVzdH0gcmVxIC0gaW5jb21pbmcgaHR0cCByZXF1ZXN0IGJlaW5nIHByb3hpZWRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5lZWRzQXV0aCAtIGZsYWcgaW5kaWNhdGluZyBpZiByZXF1ZXN0IHJlcXVpcmVzIGF1dGhvcml6YXRpb24gdG9rZW5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAgICovXG4gICAgZ2V0U2VydmljZTogZnVuY3Rpb24ocmVxIDogYW55LCBuZWVkc0F1dGggOiBib29sZWFuLCBvcHRpb25zID86IGFueSkge1xuICAgICAgICBsZXQgY2xpZW50ID0gdGhpcy5nZXRDbGllbnQocmVxLCBuZWVkc0F1dGgsIG9wdGlvbnMpO1xuICAgICAgICBsZXQgc3ZjQ2xhc3MgPSBvcHRpb25zLnNlcnZpY2VDbGFzcyB8fCBJdGVtU2VydmljZTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJQcm94eWluZyB0byBcIiArIENvbmZpZy51YWxVcmwpO1xuICAgICAgICBpZihvcHRpb25zLmxvZ2dlcikge1xuICAgICAgICAgICAgb3B0aW9ucy5sb2dnZXIuZGVidWcoYFByb3h5aW5nIHRvICR7Q29uZmlnLnVhbFVybH1gKTtcbiAgICAgICAgICAgIC8vIG9wdGlvbnMubG9nZ2VyLmRlYnVnKFwiVXNpbmcgc2VydmljZSBjbGFzczogXCIgKyBzdmNDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlcnZpY2UgPSBuZXcgc3ZjQ2xhc3MoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbiAgICAgICAgaWYob3B0aW9ucy5sb2dnZXIpIHtcbiAgICAgICAgICAgIHNlcnZpY2Uuc2V0TG9nZ2VyKG9wdGlvbnMubG9nZ2VyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZXJ2aWNlUHJveHk7XG4iXX0=