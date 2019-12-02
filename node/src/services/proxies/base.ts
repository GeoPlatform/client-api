
import request                 from 'request';
import { Config, ItemService } from '@geoplatform/client';
import NodeHttpClient          from '../../http/node';

const GP_AUTH_COOKIE = 'gpoauth-a';

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

        if(options && options.addl) {
            this.bindAdditionalRoutes(router, options);
        }

    },

    /**
     *
     */
    bindAdditionalRoutes: function( router : any, options ?: any ) {

        //fetch thumbnail proxy
        router.get('/items/:id/thumbnail', (req, res, next) => {
            let url = Config.ualUrl + '/api/items/' + req.params.id + '/thumbnail';
            request.get(url).pipe(res);
        });
        if(options && options.logger) {
            options.logger.debug("Binding Service Route [get] /items/:id/thumbnail");
        }

        //request new thumbnail be created
        router.post('/items/:id/thumbnail', (req, res, next) => {
            let url = Config.ualUrl + '/api/items/' + req.params.id + '/thumbnail';
            let token = this.getAuthToken(req);
            let cookie = this.getAuthCookie(req);
            let opts : any = {};  //doesn't need a body when posting to thumbnail
            if(token)  opts.auth = { bearer : token };
            if(cookie) opts.headers = { Cookie : this.authCookieName + '=' + cookie };
            request.post(url, opts).pipe(res);
        });
        if(options && options.logger) {
            options.logger.debug("Binding Service Route [post] /items/:id/thumbnail");
        }

    },

    /**
    * @param {HttpRequest} req - incoming http request being proxied
    * @param {boolean} needsAuth - flag indicating if the request must provide an authentication token
    * @param {object} options - additional configuration options
    * @return {HttpClient} client to use to make requests to GeoPlatform API endpoint
    */
    getClient: function(req : any, needsAuth : boolean, options ?: any) {

        let token = this.getAuthToken(req);
        if(needsAuth) {

            if(options && options.logger) {
                // options.logger.debug(`ServiceProxy.getClient() - Token: ${token}`);
                // options.logger.debug(`ServiceProxy.getClient() - JWT: ${req.jwt}`);
                if(!token) {
                    options.logger.warn("ServiceProxy.getClient() - No Access Token was provided on incoming request header!");
                }
                else if(!!options.debug) {
                    options.logger.debug(`ServiceProxy.getClient() - Token: ${token}`);
                    options.logger.debug(`ServiceProxy.getClient() - JWT: ${req.jwt}`);
                }
            } else if(!token) {
                console.log("[WARN] No Access Token provided on incoming request header");
            }
        }

        //check the incoming proxied request for cookies that should be forwarded along
        let cookie = this.getAuthCookie(req);
        // console.log("COOKIE IS " + cookie);
        if(cookie && !cookie.length) cookie = null;

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
        service.setTimeout(Config.timeout || 30000);
        if(options.logger) {
            service.setLogger(options.logger);
        }
        return service;
    },

    /**
     * @return JWT authorization bearer token
     */
    getAuthToken: function(req : any) : string {
        let token = req.accessToken || null;
        if(!token && !req.jwt) {    //if not processed by middleware...
            token = (req.headers.authorization || '').replace('Bearer ','');
        }
        return token;
    },

    /**
     * @return GP Authentication cookie
     */
    getAuthCookie: function(req: any) : string {
        if(!req) return null;
        if(req.cookies) {   //parsed by cookieParser already
            // console.log("COOKIES PARSED ... ");
            // console.log("COOKIES ARE...");
            // console.log(JSON.stringify(req.cookies));
            // console.log(" ");
            // console.log("AUTH COOKIE IS " + req.cookies[GP_AUTH_COOKIE]);
            return req.cookies[GP_AUTH_COOKIE];

        } else if(req.headers.cookie) {
            // console.log("COOKIES NEED PARSING");
            try {
                let cookies = this.parseCookies(req.headers.cookie);
                return cookies[GP_AUTH_COOKIE];
            } catch( e ) {
                console.log("ERROR parsing cookies: " + e.message);
                return null;
            }
        }
    },

    parseCookies: function parse(str : string) {
        if (!str || typeof str !== 'string' || !str.length) return null;

        let result = {}
        let expr = /; */;
        let pairs = str.split(expr);

        pairs.forEach( pair => {
            let sepIdx = pair.indexOf('=');

            if (sepIdx < 0) return; //ignore non- 'key=value' values

            let key = pair.substr(0, sepIdx).trim();
            let val = pair.substr(++sepIdx, pair.length).trim();

            // quoted values
            if ('"' == val[0]) val = val.slice(1, -1);

            // only assign once
            if (undefined == result[key]) {
                let value = val;
                try {
                    value = decodeURIComponent(val);
                } catch (e) { }
                result[key] = value;
            }
        });

        return result;
    }




};

export default ServiceProxy;
