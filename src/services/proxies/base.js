

import Q from 'q';
import NodeHttpClient from '../../http/node';
import Config from '../../shared/config';
import ItemService from "../item";



const ServiceProxy = {

    /**
     * @param {Router} router - ExpressJS router instance
     * @param {array[object]} routes - list of routes to map to the router
     * @param {object} options - additional configuration needed
     */
    bindRoutes: function(router, routes, options) {

        options = options || {};
        let paths = options.paths || {};

        routes.forEach( route => {

            if(paths[route.key] === false) return;  //disabled endpoint
            if(!paths[route.key] && !route.path) return; //something is wrong with route

            // let path = '/' + ( paths[route.key] || route.pathFn(pathBase) );
            let path = '/' + ( paths[route.key] || route.path );

            router[route.method]( path, (req, res, next) => {
                let svc = this.getService(req, route.auth, options);
                let promise = route.execFn(svc, req)
                promise.then( result => {
                    if(route.respFn) route.respFn(result, res, next);
                    else res.json(result)
                })
                .catch( (err) => {
                    if(options.onError)
                        options.onError(route.key, err);
                    next(err);
                })
                .finally( () => {
                    if(options.onFinish)
                        options.onFinish(route.key, req, res);
                });
            })
        });

    },

    /**
    * @param {HttpRequest} req - incoming http request being proxied
    * @param {boolean} needsAuth - flag indicating if the request must provide an authentication token
    * @param {object} options - additional configuration options
    * @return {HttpClient} client to use to make requests to GeoPlatform API endpoint
    */
    getClient: function(req, needsAuth, options) {

        let token = req.accessToken || null;
        if(needsAuth) {
            if(!token && options.logger)
                options.logger.warn("ServiceProxy.getClient() - No Access Token was provided on incoming request header!");

            else if(!!options.debug && options.logger) {
                options.logger.debug(`ServiceProxy.getClient() - Token: ${token}`);
                options.logger.debug(`ServiceProxy.getClient() - JWT: ${req.jwt}`);
            }
        }

        return new NodeHttpClient({
            timeout: Config.timeout,
            token: needsAuth ? token : null
        });
    },


    /**
     * @param {HttpRequest} req - incoming http request being proxied
     * @param {boolean} needsAuth - flag indicating if request requires authorization token
     * @param {object} options - additional configuration options
     */
    getService: function(req, needsAuth, options) {
        let client = this.getClient(req, needsAuth, options);
        let svcClass = options.serviceClass || ItemService;
        let service = new svcClass(Config.ualUrl, client);
        if(options.logger) {
            service.setLogger(options.logger);
        }
        return service;
    }
};

export default ServiceProxy;
