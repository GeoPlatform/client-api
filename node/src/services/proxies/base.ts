

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
            //     'respFn': function(result, res, next) { }
            //   }
            // }
            let overrides = options[route.key] || {};

            //look for overriden paths in either new override structure or older key:path format
            let path = '/' + ( overrides.path || paths[route.key] || route.path );
            //look for authentication override in either new structure or older format
            let needsAuth = overrides.auth || auths[route.key] || route.auth;

            // console.log(`Binding Service Route [${route.method}] ${path}`)
            router[route.method]( path, (req : any, res : any, next : Function) => {
                // console.log(`Executing Service Route [${route.method}] ${path}`)
                // console.log(JSON.stringify(req.params));
                // console.log(" ");
                let svc = this.getService(req, needsAuth, options);
                let promise = route.execFn(svc, req)
                promise.then( ( result:any ) => {
                    let respFn = overrides.respFn || route.respFn;
                    if(respFn) respFn(result, res, next);
                    else res.json(result);
                })
                .catch( (err : Error) => {
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
    getClient: function(req : any, needsAuth : boolean, options ?: any) {

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
    getService: function(req : any, needsAuth : boolean, options ?: any) {
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
