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
    service.setTimeout(Config.timeout || 30000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvbm9kZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb3hpZXMvYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLGNBQWMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO1dBVzFDLFVBQVMsTUFBWSxFQUFFLE1BQWMsRUFBRSxPQUFjO0lBRTdELE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ3hCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO0lBQ2hDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0lBRS9CLE1BQU0sQ0FBQyxPQUFPLENBQUUsS0FBSyxDQUFDLEVBQUU7UUFFcEIsSUFBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUs7WUFBRSxPQUFPLENBQUUsbUJBQW1CO1FBQzNELElBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFBRSxPQUFPLENBQUMsK0JBQStCO1FBRTVFLHlCQUF5QjtRQUN6QixJQUFJO1FBQ0osZ0JBQWdCO1FBQ2hCLDZCQUE2QjtRQUM3QixvQkFBb0I7UUFDcEIsb0RBQW9EO1FBQ3BELE1BQU07UUFDTixJQUFJO1FBQ0osSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFekMsb0ZBQW9GO1FBQ3BGLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFFLFNBQVMsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFFLENBQUM7UUFDdEUs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LENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQztJQUM1QyxJQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7UUFDZixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNyQztJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUE5SEwsTUFBTSxZQUFZLEdBQUc7SUFFakI7Ozs7T0FJRztJQUNILFVBQVUsSUF5RVQ7SUFFRDs7Ozs7TUFLRTtJQUNGLFNBQVMsSUFnQlI7SUFHRDs7OztPQUlHO0lBQ0gsVUFBVSxJQWNUO0NBQ0osQ0FBQztBQUVGLGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCBOb2RlSHR0cENsaWVudCBmcm9tICcuLi8uLi9odHRwL25vZGUnO1xuaW1wb3J0IHsgQ29uZmlnLCBJdGVtU2VydmljZSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cblxuY29uc3QgU2VydmljZVByb3h5ID0ge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlciAtIEV4cHJlc3NKUyByb3V0ZXIgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge2FycmF5W29iamVjdF19IHJvdXRlcyAtIGxpc3Qgb2Ygcm91dGVzIHRvIG1hcCB0byB0aGUgcm91dGVyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBhZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gbmVlZGVkXG4gICAgICovXG4gICAgYmluZFJvdXRlczogZnVuY3Rpb24ocm91dGVyIDogYW55LCByb3V0ZXMgOiBhbnlbXSwgb3B0aW9ucyA/OiBhbnkpIHtcblxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgbGV0IHBhdGhzID0gb3B0aW9ucy5wYXRocyB8fCB7fTtcbiAgICAgICAgbGV0IGF1dGhzID0gb3B0aW9ucy5hdXRoIHx8IHt9O1xuXG4gICAgICAgIHJvdXRlcy5mb3JFYWNoKCByb3V0ZSA9PiB7XG5cbiAgICAgICAgICAgIGlmKHBhdGhzW3JvdXRlLmtleV0gPT09IGZhbHNlKSByZXR1cm47ICAvL2Rpc2FibGVkIGVuZHBvaW50XG4gICAgICAgICAgICBpZighcGF0aHNbcm91dGUua2V5XSAmJiAhcm91dGUucGF0aCkgcmV0dXJuOyAvL3NvbWV0aGluZyBpcyB3cm9uZyB3aXRoIHJvdXRlXG5cbiAgICAgICAgICAgIC8vbmV3ZXIgcm91dGUgb3ZlcnJpZGUuLi5cbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgIC8vICAgJ2NyZWF0ZSc6IHtcbiAgICAgICAgICAgIC8vICAgICAncGF0aCc6ICdjdXN0b20vcGF0aCcsXG4gICAgICAgICAgICAvLyAgICAgJ2F1dGgnOiB0cnVlLFxuICAgICAgICAgICAgLy8gICAgICdvblJlc3BvbnNlJzogZnVuY3Rpb24ocmVzdWx0LCByZXMsIG5leHQpIHsgfVxuICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBsZXQgb3ZlcnJpZGVzID0gb3B0aW9uc1tyb3V0ZS5rZXldIHx8IHt9O1xuXG4gICAgICAgICAgICAvL2xvb2sgZm9yIG92ZXJyaWRlbiBwYXRocyBpbiBlaXRoZXIgbmV3IG92ZXJyaWRlIHN0cnVjdHVyZSBvciBvbGRlciBrZXk6cGF0aCBmb3JtYXRcbiAgICAgICAgICAgIGxldCBwYXRoID0gJy8nICsgKCBvdmVycmlkZXMucGF0aCB8fCBwYXRoc1tyb3V0ZS5rZXldIHx8IHJvdXRlLnBhdGggKTtcbiAgICAgICAgICAgIC8vbG9vayBmb3IgYXV0aGVudGljYXRpb24gb3ZlcnJpZGUgaW4gZWl0aGVyIG5ldyBzdHJ1Y3R1cmUgb3Igb2xkZXIgZm9ybWF0XG4gICAgICAgICAgICBsZXQgbmVlZHNBdXRoID0gb3ZlcnJpZGVzLmF1dGggfHwgYXV0aHNbcm91dGUua2V5XSB8fCByb3V0ZS5hdXRoO1xuXG4gICAgICAgICAgICBpZihvcHRpb25zLmxvZ2dlcikge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKGBCaW5kaW5nIFNlcnZpY2UgUm91dGUgWyR7cm91dGUubWV0aG9kfV0gJHtwYXRofWApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3V0ZXJbcm91dGUubWV0aG9kXSggcGF0aCwgKHJlcSA6IGFueSwgcmVzIDogYW55LCBuZXh0IDogRnVuY3Rpb24pID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2Yocm91dGUub25FeGVjdXRlKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCBudWxsICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9ucy5sb2dnZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKGBFeGVjdXRpbmcgU2VydmljZSBSb3V0ZSBbJHtyb3V0ZS5tZXRob2R9XSAke3BhdGh9YClcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKEpTT04uc3RyaW5naWZ5KHJlcS5wYXJhbXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgc3ZjID0gdGhpcy5nZXRTZXJ2aWNlKHJlcSwgbmVlZHNBdXRoLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IHJvdXRlLm9uRXhlY3V0ZShzdmMsIHJlcSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2goIGUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oICggcmVzdWx0IDogYW55ICkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb25SZXNwb25zZSA9IG92ZXJyaWRlcy5vblJlc3BvbnNlIHx8IHJvdXRlLm9uUmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmKG9uUmVzcG9uc2UpIG9uUmVzcG9uc2UocmVzdWx0LCByZXMsIG5leHQpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHJlcy5qc29uKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goIChlcnIgOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihvdmVycmlkZXMub25FcnJvcikgb3ZlcnJpZGVzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9ucy5vbkVycm9yKSBvcHRpb25zLm9uRXJyb3Iocm91dGUua2V5LCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluYWxseSggKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgcm91dGUgaGFzIGEgZmluaXNoIGZ1bmN0aW9uIGRlZmluZWQsIGludm9rZSBpdFxuICAgICAgICAgICAgICAgICAgICBpZihvdmVycmlkZXMub25GaW5pc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJyaWRlcy5vbkZpbmlzaChyZXEsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL2lmIHByb3h5IGhhcyBhbiBvdmVyYWxsIGZpbmlzaCBmdW5jdGlvbiBkZWZpbmVkLCBpbnZva2UgaXRcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmlzaEZuID0gb3B0aW9ucy5vbkZpbmlzaDtcbiAgICAgICAgICAgICAgICAgICAgaWYoZmluaXNoRm4pIGZpbmlzaEZuKHJvdXRlLmtleSwgcmVxLCByZXMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBAcGFyYW0ge0h0dHBSZXF1ZXN0fSByZXEgLSBpbmNvbWluZyBodHRwIHJlcXVlc3QgYmVpbmcgcHJveGllZFxuICAgICogQHBhcmFtIHtib29sZWFufSBuZWVkc0F1dGggLSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIHJlcXVlc3QgbXVzdCBwcm92aWRlIGFuIGF1dGhlbnRpY2F0aW9uIHRva2VuXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAgKiBAcmV0dXJuIHtIdHRwQ2xpZW50fSBjbGllbnQgdG8gdXNlIHRvIG1ha2UgcmVxdWVzdHMgdG8gR2VvUGxhdGZvcm0gQVBJIGVuZHBvaW50XG4gICAgKi9cbiAgICBnZXRDbGllbnQ6IGZ1bmN0aW9uKHJlcSA6IGFueSwgbmVlZHNBdXRoIDogYm9vbGVhbiwgb3B0aW9ucyA/OiBhbnkpIHtcblxuICAgICAgICBsZXQgdG9rZW4gPSByZXEuYWNjZXNzVG9rZW4gfHwgbnVsbDtcbiAgICAgICAgaWYobmVlZHNBdXRoICYmIG9wdGlvbnMubG9nZ2VyKSB7XG4gICAgICAgICAgICBpZighdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmxvZ2dlci53YXJuKFwiU2VydmljZVByb3h5LmdldENsaWVudCgpIC0gTm8gQWNjZXNzIFRva2VuIHdhcyBwcm92aWRlZCBvbiBpbmNvbWluZyByZXF1ZXN0IGhlYWRlciFcIik7XG4gICAgICAgICAgICB9IGVsc2UgaWYoISFvcHRpb25zLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5sb2dnZXIuZGVidWcoYFNlcnZpY2VQcm94eS5nZXRDbGllbnQoKSAtIFRva2VuOiAke3Rva2VufWApO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKGBTZXJ2aWNlUHJveHkuZ2V0Q2xpZW50KCkgLSBKV1Q6ICR7cmVxLmp3dH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgTm9kZUh0dHBDbGllbnQoe1xuICAgICAgICAgICAgdGltZW91dDogQ29uZmlnLnRpbWVvdXQsXG4gICAgICAgICAgICB0b2tlbjogbmVlZHNBdXRoID8gdG9rZW4gOiBudWxsXG4gICAgICAgIH0pO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7SHR0cFJlcXVlc3R9IHJlcSAtIGluY29taW5nIGh0dHAgcmVxdWVzdCBiZWluZyBwcm94aWVkXG4gICAgICogQHBhcmFtIHtib29sZWFufSBuZWVkc0F1dGggLSBmbGFnIGluZGljYXRpbmcgaWYgcmVxdWVzdCByZXF1aXJlcyBhdXRob3JpemF0aW9uIHRva2VuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBhZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgICAqL1xuICAgIGdldFNlcnZpY2U6IGZ1bmN0aW9uKHJlcSA6IGFueSwgbmVlZHNBdXRoIDogYm9vbGVhbiwgb3B0aW9ucyA/OiBhbnkpIHtcbiAgICAgICAgbGV0IGNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KHJlcSwgbmVlZHNBdXRoLCBvcHRpb25zKTtcbiAgICAgICAgbGV0IHN2Y0NsYXNzID0gb3B0aW9ucy5zZXJ2aWNlQ2xhc3MgfHwgSXRlbVNlcnZpY2U7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUHJveHlpbmcgdG8gXCIgKyBDb25maWcudWFsVXJsKTtcbiAgICAgICAgaWYob3B0aW9ucy5sb2dnZXIpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubG9nZ2VyLmRlYnVnKGBQcm94eWluZyB0byAke0NvbmZpZy51YWxVcmx9YCk7XG4gICAgICAgICAgICAvLyBvcHRpb25zLmxvZ2dlci5kZWJ1ZyhcIlVzaW5nIHNlcnZpY2UgY2xhc3M6IFwiICsgc3ZjQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZXJ2aWNlID0gbmV3IHN2Y0NsYXNzKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG4gICAgICAgIHNlcnZpY2Uuc2V0VGltZW91dChDb25maWcudGltZW91dCB8fCAzMDAwMCk7XG4gICAgICAgIGlmKG9wdGlvbnMubG9nZ2VyKSB7XG4gICAgICAgICAgICBzZXJ2aWNlLnNldExvZ2dlcihvcHRpb25zLmxvZ2dlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VydmljZVByb3h5O1xuIl19