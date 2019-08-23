

import NodeHttpClient from '../../http/node';
import { Config, ItemService } from '@geoplatform/client';



const ServiceProxy = {

    /**
     * @param {Router} router - ExpressJS router instance
     * @param {array[object]} routes - list of routes to map to the router
     * @param {object} options - additional configuration needed
     */
    bindRoutes: function(router : any, routes : any[], options ?: any) {

        options = options || {};
        let paths = options.paths || {};
        let auths = options.auth || {};

        routes.forEach( route => {

            if(paths[route.key] === false) return;  //disabled endpoint
            if(!paths[route.key] && !route.path) return; //something is wrong with route

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
            let path = '/' + ( overrides.path || paths[route.key] || route.path );
            //look for authentication override in either new structure or older format
            let needsAuth = overrides.auth || auths[route.key] || route.auth;

            if(options.logger) {
                options.logger.debug(`Binding Service Route [${route.method}] ${path}`)
            }
            router[route.method]( path, (req : any, res : any, next : Function) => {

                let promise = null;
                if(typeof(route.onExecute) !== 'function') {
                    promise = Promise.resolve( null );
                } else {
                    if(options.logger) {
                        options.logger.debug(`Executing Service Route [${route.method}] ${path}`)
                        options.logger.debug(JSON.stringify(req.params));
                        options.logger.debug("-------------------------");
                    }
                    let svc = this.getService(req, needsAuth, options);

                    try {
                        promise = route.onExecute(svc, req);
                    } catch( e ) {
                        promise = Promise.reject(e);
                    }
                }

                promise.then( ( result : any ) => {
                    let onResponse = overrides.onResponse || route.onResponse;
                    if(onResponse) onResponse(result, res, next);
                    else res.json(result);
                })
                .catch( (err : Error) => {
                    if(overrides.onError) overrides.onError(err);
                    if(options.onError) options.onError(route.key, err);
                    next(err);
                })
                .finally( () => {

                    //if route has a finish function defined, invoke it
                    if(overrides.onFinish) {
                        overrides.onFinish(req, res);
                    }

                    //if proxy has an overall finish function defined, invoke it
                    let finishFn = options.onFinish;
                    if(finishFn) finishFn(route.key, req, res);
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
    getClient: function(req : any, needsAuth : boolean, options ?: any) {

        let token = req.accessToken || null;
        if(needsAuth && options.logger) {
            if(!token) {
                options.logger.warn("ServiceProxy.getClient() - No Access Token was provided on incoming request header!");
            } else if(!!options.debug) {
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
    getService: function(req : any, needsAuth : boolean, options ?: any) {
        let client = this.getClient(req, needsAuth, options);
        let svcClass = options.serviceClass || ItemService;
        // console.log("Proxying to " + Config.ualUrl);
        if(options.logger) {
            options.logger.debug(`Proxying to ${Config.ualUrl}`);
            // options.logger.debug("Using service class: " + svcClass);
        }
        let service = new svcClass(Config.ualUrl, client);
        if(options.logger) {
            service.setLogger(options.logger);
        }
        return service;
    }
};

export default ServiceProxy;
