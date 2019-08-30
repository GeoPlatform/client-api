import { GPHttpClient, Config, ItemService, Query, ServiceService, LayerService, DatasetService, MapService, GalleryService, UtilsService, KGQuery, KGService, AgolService } from '@geoplatform/client';

class NodeHttpClient extends GPHttpClient {
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    constructor(options) {
        super(options);
    }
    /**
     * @param options - request configuration
     * @return request object
     */
    createRequestOpts(options) {
        let opts = {
            method: options.method,
            url: options.url,
            json: false !== options.json,
            timeout: options.timeout || this.timeout
        };
        if (options.params) {
            opts.qs = options.params;
        }
        if (options.file) {
            const fs = require('fs');
            if (!fs)
                throw new Error("Module 'fs' not available");
            opts.formData = {
                file: {
                    value: fs.createReadStream(options.file.path),
                    options: {
                        filename: options.file.originalFilename
                    }
                }
            };
            Object.assign(opts.formData, options.data || {});
        }
        else if (options.data) {
            if (options.formData) {
                opts.formData = options.data;
            }
            else {
                opts.body = options.data;
            }
        }
        if (options.headers) {
            opts.headers = options.headers;
        }
        //set authorization header if one was provided
        if (this.token) {
            let token = this.token();
            if (token) {
                opts.auth = { 'bearer': token };
            }
        }
        //copy over user-supplied options
        if (options.options) {
            for (let o in options.options) {
                if (options.options.hasOwnProperty(o)) {
                    opts[o] = options.options[o];
                }
            }
        }
        // console.log(JSON.stringify(opts));
        return opts;
    }
    /**
     *
     */
    execute(options) {
        const request = require('request');
        // require('request-debug')(request);
        if (!request) {
            throw new Error("Module 'request' not available");
        }
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                this.checkAndHandleError(error, response)
                    .then(() => {
                    if (options.json === false)
                        resolve(response);
                    else
                        resolve(body);
                })
                    .catch(e => reject(e));
            });
        });
    }
    /**
     *
     */
    checkAndHandleError(error, response) {
        let props = {
            message: null,
            error: null,
            status: 200
        };
        if (error) {
            // Logger.debug("Error generated by request library: " + error.code);
            if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {
                props.status = 500;
                props.error = "Connection Timeout";
                props.message = "The response from the service took too long to read";
                if (error.connect === true) {
                    props.message = "Unable to establish a connection to the service";
                }
            }
            else {
                return Promise.reject(error);
            }
        }
        else if (response.statusCode < 200 || response.statusCode > 204) {
            // Logger.debug('Error returned by remote endpoint (' + response.statusCode + ')');
            // Logger.debug(JSON.stringify(response));
            props.status = response.statusCode;
            if (response.body && typeof (response.body) === 'object') {
                props = response.body;
                props.status = props.status || response.statusCode;
                props.message = props.message || "An error occurred communicating with service";
                if (response.statusCode === 409) {
                    let sidx = response.body.message.indexOf(" ");
                    let eidx = response.body.message.indexOf(' already exists');
                    if (sidx >= 0 && eidx > sidx) {
                        props.item = response.body.message.substring(sidx + 1, eidx);
                    }
                }
            }
            else {
                switch (response.statusCode) {
                    case 404:
                        props.error = "Not Found";
                        props.message = response.request.uri.pathname + " cannot be found";
                        break;
                    case 401:
                        props.error = "Unauthenticated";
                        props.message = "You are not authenticated";
                        break;
                    case 403:
                        props.error = "Unauthorized";
                        props.message = "You are not authorized to access " + response.request.uri.pathname;
                        break;
                    case 409:
                        props.error = "Conflict";
                        props.message = "Item already exists";
                        // pattern received is: { ..., message: 'Resource <identifier> already exists', ... }
                        try {
                            let json = JSON.parse(response.body);
                            let sidx = json.message.indexOf(" ");
                            let eidx = json.message.indexOf(' already exists');
                            if (sidx >= 0 && eidx > sidx) {
                                props.item = json.message.substring(sidx + 1, eidx);
                            }
                        }
                        catch (e) {
                            props.message += '.  Unable to extract existing identifier from service response';
                        }
                        break;
                    default:
                        try {
                            let json = JSON.parse(response.body);
                            props = json;
                            props.status = response.statusCode;
                            // Logger.debug("PARSED ERROR: " + JSON.stringify(props));
                        }
                        catch (e) {
                            props.error = "Server Error";
                            props.message = response.body;
                            // Logger.debug("DEFAULTED ERROR: " + JSON.stringify(props));
                        }
                }
            }
        }
        if (props.status < 200 || props.status > 204) {
            props.error = props.error || "Server Error";
            props.status = props.status || response.statusCode;
            props.message = props.message || "An error occurred communicating with service";
            let err = new Error(props.message);
            Object.assign(err, props);
            // Logger.debug("UTILS.checkAndHandleError : " + err);
            // Logger.debug("UTILS.checkAndHandleError : " + JSON.stringify(err));
            // Logger.debug("UTILS.checkAndHandleError : " + err.message);
            return Promise.reject(err);
        }
        return Promise.resolve(null);
    }
}

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

const ɵ0$1 = function (svc, req) {
    let query = new Query(req.query);
    return svc.search(query);
}, ɵ1$1 = function (svc, req) {
    return svc.get(req.params.id);
}, ɵ2$1 = function (svc, req) {
    return svc.save(req.body);
}, ɵ3 = function (svc, req) {
    return svc.save(req.body);
}, ɵ4 = function (svc, req) {
    return svc.remove(req.params.id);
}, ɵ5 = function (
// @ts-ignore
result, res) {
    res.status(204).end();
}, ɵ6 = function (svc, req) {
    return svc.patch(req.params.id, req.body);
}, ɵ7 = function (svc, req) { return svc.clone(req.params.id, req.body); }, ɵ8 = function (svc, req) {
    return svc.export(req.params.id, req.query.format);
}, ɵ9 = function (result, res) {
    let mimeType = result.headers['content-type'];
    let disposition = result.headers['content-disposition'];
    res.set("Content-Type", mimeType);
    res.setHeader('Content-disposition', disposition);
    res.send(result.body);
}, ɵ10 = function (svc, req) {
    return svc.getUri(req.body);
}, ɵ11 = function (result, res) {
    res.json({ uri: result });
}, ɵ12 = function (svc, req) {
    return svc.getUri(req.body)
        .then(uri => {
        let fields = ['serviceType', 'services', 'scheme', 'themes', 'publishers', 'keywords'];
        let query = new Query().uri(uri).fields(fields);
        return svc.search(query);
    });
}, ɵ13 = function (svc, req) {
    let input = req.body.url || req.files.file;
    return svc.import(input, req.query.format);
}, ɵ14 = function (svc, req) {
    return svc.associations(req.params.id, req.query);
}, ɵ15 = function (svc, req) {
    return svc.versions(req.params.id, req.query);
}, ɵ16 = function (svc, req) {
    return svc.get(req.params.id, { version: req.params.version });
};
const Routes = [
    {
        key: 'search',
        method: 'get',
        path: 'items',
        auth: false,
        onExecute: ɵ0$1
    },
    {
        key: 'get',
        method: 'get',
        path: 'items/:id',
        auth: false,
        onExecute: ɵ1$1
    },
    {
        key: 'create',
        method: 'post',
        path: 'items',
        auth: true,
        onExecute: ɵ2$1
    },
    {
        key: 'update',
        method: 'put',
        path: 'items/:id',
        auth: true,
        onExecute: ɵ3
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'items/:id',
        auth: true,
        onExecute: ɵ4,
        onResponse: ɵ5
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'items/:id',
        auth: true,
        onExecute: ɵ6
    },
    {
        key: 'clone',
        method: 'post',
        path: 'items/:id/clone',
        auth: true,
        onExecute: ɵ7
    },
    {
        key: 'export',
        method: 'get',
        path: 'items/:id/export',
        auth: false,
        onExecute: ɵ8,
        onResponse: ɵ9
    },
    {
        key: 'uri',
        method: 'post',
        path: 'items/uri',
        auth: false,
        onExecute: ɵ10,
        onResponse: ɵ11
    },
    {
        key: 'exists',
        method: 'post',
        path: 'items/exists',
        auth: false,
        onExecute: ɵ12
    },
    {
        key: 'import',
        method: 'post',
        path: 'items/import',
        auth: true,
        onExecute: ɵ13
    },
    {
        key: 'associations',
        method: 'get',
        path: 'items/:id/associations',
        auth: false,
        onExecute: ɵ14
    },
    {
        key: 'versions',
        method: 'get',
        path: 'items/:id/versions',
        auth: false,
        onExecute: ɵ15
    },
    {
        key: 'getVersion',
        method: 'get',
        path: 'items/:id/versions/:version',
        auth: false,
        onExecute: ɵ16
    }
    // TODO findMultiple
];
/**
 *
 */
function bindRoutes(router, options) {
    //bind common endpoints
    options.pathBaseDefault = "items";
    options.serviceClass = ItemService;
    ServiceProxy.bindRoutes(router, Routes, options);
}
/**
 * ItemServiceProxy
 *
 * see examples/node/item-proxy for an in-depth example
 */
function ItemServiceProxy(options) {
    if (typeof (options) === 'undefined') {
        options = {};
    }
    ;
    let router = options.router;
    if (!options.router) {
        let express = require('express');
        if (!express) {
            throw new Error("ItemServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("ItemServiceProxy() - " +
            "Unable to create proxy route, missing router");
    bindRoutes(router, options);
    return router;
}

const ɵ0$2 = function (svc, req) {
    return svc.search(req.query);
}, ɵ1$2 = function (svc, req) {
    return svc.get(req.params.id);
}, ɵ2$2 = function (svc, req) {
    return svc.save(req.body);
}, ɵ3$1 = function (svc, req) {
    return svc.save(req.body);
}, ɵ4$1 = function (svc, req) {
    return svc.remove(req.params.id);
}, ɵ5$1 = function (
// @ts-ignore
result, res) {
    res.status(204).end();
}, ɵ6$1 = function (svc, req) {
    return svc.patch(req.params.id, req.body);
}, ɵ7$1 = function (svc, req) {
    return svc.export(req.params.id, req.query.format);
}, ɵ8$1 = function (result, res) {
    let mimeType = result.headers['content-type'];
    let disposition = result.headers['content-disposition'];
    res.set("Content-Type", mimeType);
    res.setHeader('Content-disposition', disposition);
    res.send(result.body);
}, ɵ9$1 = function (svc) {
    return svc.types();
}, ɵ10$1 = function (svc, req) {
    return svc.import(req.body);
}, ɵ11$1 = function (svc, req) {
    return svc.about(req.params.id);
}, ɵ12$1 = function (svc, req) {
    return svc.harvest(req.params.id);
}, ɵ13$1 = function (svc, req) {
    return svc.liveTest(req.params.id);
}, ɵ14$1 = function (svc, req) {
    return svc.statistics(req.params.id);
};
const Routes$1 = [
    {
        key: 'search',
        method: 'get',
        path: 'services',
        auth: false,
        onExecute: ɵ0$2
    },
    {
        key: 'get',
        method: 'get',
        path: 'services/:id',
        auth: false,
        onExecute: ɵ1$2
    },
    {
        key: 'create',
        method: 'post',
        path: 'services',
        auth: true,
        onExecute: ɵ2$2
    },
    {
        key: 'update',
        method: 'put',
        path: 'services/:id',
        auth: true,
        onExecute: ɵ3$1
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'services/:id',
        auth: true,
        onExecute: ɵ4$1,
        onResponse: ɵ5$1
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'services/:id',
        auth: true,
        onExecute: ɵ6$1
    },
    {
        key: 'export',
        method: 'get',
        path: 'services/:id/export',
        auth: false,
        onExecute: ɵ7$1,
        onResponse: ɵ8$1
    },
    {
        key: 'types',
        method: 'get',
        path: 'serviceTypes',
        auth: false,
        onExecute: ɵ9$1
    },
    {
        key: 'import',
        method: 'post',
        path: 'services/import',
        auth: true,
        onExecute: ɵ10$1
    },
    {
        key: 'about',
        method: 'get',
        path: 'services/:id/about',
        auth: false,
        onExecute: ɵ11$1
    },
    {
        key: 'harvest',
        method: 'get',
        path: 'services/:id/harvest',
        auth: false,
        onExecute: ɵ12$1
    },
    {
        key: 'test',
        method: 'get',
        path: 'services/:id/test',
        auth: false,
        onExecute: ɵ13$1
    },
    {
        key: 'statistics',
        method: 'get',
        path: 'services/:id/statistics',
        auth: false,
        onExecute: ɵ14$1
    }
];
/**
 *
 */
function ServiceServiceProxy(options) {
    if (typeof (options) === 'undefined') {
        options = {};
    }
    ;
    let router = options.router;
    if (!options.router) {
        let express = require('express');
        if (!express) {
            throw new Error("ServiceServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("ServiceServiceProxy() - " +
            "Unable to create proxy route, missing router");
    options.serviceClass = ServiceService;
    ServiceProxy.bindRoutes(router, Routes$1, options);
    return router;
}

const ɵ0$3 = function (svc, req) {
    return svc.search(req.query);
}, ɵ1$3 = function (svc, req) {
    return svc.get(req.params.id);
}, ɵ2$3 = function (svc, req) {
    return svc.save(req.body);
}, ɵ3$2 = function (svc, req) {
    return svc.save(req.body);
}, ɵ4$2 = function (svc, req) {
    return svc.remove(req.params.id);
}, ɵ5$2 = function (
// @ts-ignore
result, res) { res.status(204).end(); }, ɵ6$2 = function (svc, req) {
    return svc.patch(req.params.id, req.body);
}, ɵ7$2 = function (svc, req) {
    return svc.export(req.params.id, req.query.format);
}, ɵ8$2 = function (result, res) {
    let mimeType = result.headers['content-type'];
    let disposition = result.headers['content-disposition'];
    res.set("Content-Type", mimeType);
    res.setHeader('Content-disposition', disposition);
    res.send(result.body);
}, ɵ9$2 = function (svc, req) {
    return svc.style(req.params.id);
}, ɵ10$2 = function (svc, req) {
    return svc.style(req.params.id, req.params.styleId);
}, ɵ11$2 = function (svc, req) {
    return svc.styles(req.params.id);
}, ɵ12$2 = function (svc, req) {
    return svc.describe(req.params.id, req.body);
}, ɵ13$2 = function (svc, req) {
    return svc.validate(req.params.id, req.body);
};
const Routes$2 = [
    {
        key: 'search',
        method: 'get',
        path: 'layers',
        auth: false,
        onExecute: ɵ0$3
    },
    {
        key: 'get',
        method: 'get',
        path: 'layers/:id',
        auth: false,
        onExecute: ɵ1$3
    },
    {
        key: 'create',
        method: 'post',
        path: 'layers',
        auth: true,
        onExecute: ɵ2$3
    },
    {
        key: 'update',
        method: 'put',
        path: 'layers/:id',
        auth: true,
        onExecute: ɵ3$2
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'layers/:id',
        auth: true,
        onExecute: ɵ4$2,
        onResponse: ɵ5$2
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'layers/:id',
        auth: true,
        onExecute: ɵ6$2
    },
    {
        key: 'export',
        method: 'get',
        path: 'layers/:id/export',
        auth: false,
        onExecute: ɵ7$2,
        onResponse: ɵ8$2
    },
    {
        key: 'style',
        method: 'get',
        path: 'layers/:id/style',
        auth: false,
        onExecute: ɵ9$2
    },
    {
        key: 'styleById',
        method: 'get',
        path: 'layers/:id/styles/:styleId',
        auth: false,
        onExecute: ɵ10$2
    },
    {
        key: 'styles',
        method: 'get',
        path: 'layers/:id/styles',
        auth: false,
        onExecute: ɵ11$2
    },
    {
        key: 'describe',
        method: 'post',
        path: 'layers/:id/describe',
        auth: false,
        onExecute: ɵ12$2
    },
    {
        key: 'validate',
        method: 'post',
        path: 'layers/:id/validate',
        auth: false,
        onExecute: ɵ13$2
    }
];
/**
 *
 */
function LayerServiceProxy(options) {
    if (typeof (options) === 'undefined') {
        options = {};
    }
    ;
    let router = options.router;
    if (!options.router) {
        let express = require('express');
        if (!express) {
            throw new Error("LayerServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("LayerServiceProxy() - " +
            "Unable to create proxy route, missing router");
    options.serviceClass = LayerService;
    ServiceProxy.bindRoutes(router, Routes$2, options);
    return router;
}

const ɵ0$4 = function (svc, req) {
    return svc.search(req.query);
}, ɵ1$4 = function (svc, req) {
    return svc.get(req.params.id);
}, ɵ2$4 = function (svc, req) {
    return svc.save(req.body);
}, ɵ3$3 = function (svc, req) {
    return svc.save(req.body);
}, ɵ4$3 = function (svc, req) {
    return svc.remove(req.params.id);
}, ɵ5$3 = function (
// @ts-ignore
result, res) {
    res.status(204).end();
}, ɵ6$3 = function (svc, req) {
    return svc.patch(req.params.id, req.body);
}, ɵ7$3 = function (svc, req) {
    return svc.export(req.params.id, req.query.format);
}, ɵ8$3 = function (result, res) {
    let mimeType = result.headers['content-type'];
    let disposition = result.headers['content-disposition'];
    res.set("Content-Type", mimeType);
    res.setHeader('Content-disposition', disposition);
    res.send(result.body);
};
const Routes$3 = [
    {
        key: 'search',
        method: 'get',
        path: 'datasets',
        auth: false,
        onExecute: ɵ0$4
    },
    {
        key: 'get',
        method: 'get',
        path: 'datasets/:id',
        auth: false,
        onExecute: ɵ1$4
    },
    {
        key: 'create',
        method: 'post',
        path: 'datasets',
        auth: true,
        onExecute: ɵ2$4
    },
    {
        key: 'update',
        method: 'put',
        path: 'datasets/:id',
        auth: true,
        onExecute: ɵ3$3
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'datasets/:id',
        auth: true,
        onExecute: ɵ4$3,
        onResponse: ɵ5$3
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'datasets/:id',
        auth: true,
        onExecute: ɵ6$3
    },
    {
        key: 'export',
        method: 'get',
        path: 'datasets/:id/export',
        auth: false,
        onExecute: ɵ7$3,
        onResponse: ɵ8$3
    }
];
/**
 * DatasetServiceProxy
 *
 * see examples/node/item-proxy for an in-depth example
 */
function DatasetServiceProxy(options) {
    if (typeof (options) === 'undefined') {
        options = {};
    }
    ;
    let router = options.router;
    if (!options.router) {
        let express = require('express');
        if (!express) {
            throw new Error("DatasetServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("DatasetServiceProxy() - " +
            "Unable to create proxy route, missing router");
    options.serviceClass = DatasetService;
    ServiceProxy.bindRoutes(router, Routes$3, options);
    return router;
}

const ɵ0$5 = function (svc, req) {
    return svc.search(req.query);
}, ɵ1$5 = function (svc, req) {
    return svc.get(req.params.id);
}, ɵ2$5 = function (svc, req) {
    return svc.save(req.body);
}, ɵ3$4 = function (svc, req) {
    return svc.save(req.body);
}, ɵ4$4 = function (svc, req) {
    return svc.remove(req.params.id);
}, ɵ5$4 = function (
// @ts-ignore
result, res) {
    res.status(204).end();
}, ɵ6$4 = function (svc, req) {
    return svc.patch(req.params.id, req.body);
}, ɵ7$4 = function (svc, req) {
    return svc.export(req.params.id, req.query.format);
}, ɵ8$4 = function (result, res) {
    let mimeType = result.headers['content-type'];
    let disposition = result.headers['content-disposition'];
    res.set("Content-Type", mimeType);
    res.setHeader('Content-disposition', disposition);
    res.send(result.body);
};
const Routes$4 = [
    {
        key: 'search',
        method: 'get',
        path: 'maps',
        auth: false,
        onExecute: ɵ0$5
    },
    {
        key: 'get',
        method: 'get',
        path: 'maps/:id',
        auth: false,
        onExecute: ɵ1$5
    },
    {
        key: 'create',
        method: 'post',
        path: 'maps',
        auth: true,
        onExecute: ɵ2$5
    },
    {
        key: 'update',
        method: 'put',
        path: 'maps/:id',
        auth: true,
        onExecute: ɵ3$4
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'maps/:id',
        auth: true,
        onExecute: ɵ4$4,
        onResponse: ɵ5$4
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'maps/:id',
        auth: true,
        onExecute: ɵ6$4
    },
    {
        key: 'export',
        method: 'get',
        path: 'maps/:id/export',
        auth: false,
        onExecute: ɵ7$4,
        onResponse: ɵ8$4
    }
];
/**
 * MapServiceProxy
 *
 * see examples/node/item-proxy for an in-depth example
 */
function MapServiceProxy(options) {
    if (typeof (options) === 'undefined') {
        options = {};
    }
    ;
    let router = options.router;
    if (!options.router) {
        let express = require('express');
        if (!express) {
            throw new Error("MapServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("MapServiceProxy() - " +
            "Unable to create proxy route, missing router");
    options.serviceClass = MapService;
    ServiceProxy.bindRoutes(router, Routes$4, options);
    return router;
}

const ɵ0$6 = function (svc, req) {
    return svc.search(req.query);
}, ɵ1$6 = function (svc, req) {
    return svc.get(req.params.id);
}, ɵ2$6 = function (svc, req) {
    return svc.save(req.body);
}, ɵ3$5 = function (svc, req) {
    return svc.save(req.body);
}, ɵ4$5 = function (svc, req) {
    return svc.remove(req.params.id);
}, ɵ5$5 = function (
// @ts-ignore
result, res) {
    res.status(204).end();
}, ɵ6$5 = function (svc, req) {
    return svc.patch(req.params.id, req.body);
}, ɵ7$5 = function (svc, req) {
    return svc.export(req.params.id, req.query.format);
}, ɵ8$5 = function (result, res) {
    let mimeType = result.headers['content-type'];
    let disposition = result.headers['content-disposition'];
    res.set("Content-Type", mimeType);
    res.setHeader('Content-disposition', disposition);
    res.send(result.body);
};
const Routes$5 = [
    {
        key: 'search',
        method: 'get',
        path: 'galleries',
        auth: false,
        onExecute: ɵ0$6
    },
    {
        key: 'get',
        method: 'get',
        path: 'galleries/:id',
        auth: false,
        onExecute: ɵ1$6
    },
    {
        key: 'create',
        method: 'post',
        path: 'galleries',
        auth: true,
        onExecute: ɵ2$6
    },
    {
        key: 'update',
        method: 'put',
        path: 'galleries/:id',
        auth: true,
        onExecute: ɵ3$5
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'galleries/:id',
        auth: true,
        onExecute: ɵ4$5,
        onResponse: ɵ5$5
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'galleries/:id',
        auth: true,
        onExecute: ɵ6$5
    },
    {
        key: 'export',
        method: 'get',
        path: 'galleries/:id/export',
        auth: false,
        onExecute: ɵ7$5,
        onResponse: ɵ8$5
    }
];
/**
 * GalleryServiceProxy
 *
 * see examples/node/item-proxy for an in-depth example
 */
function GalleryServiceProxy(options) {
    if (typeof (options) === 'undefined') {
        options = {};
    }
    ;
    let router = options.router;
    if (!options.router) {
        let express = require('express');
        if (!express) {
            throw new Error("GalleryServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("GalleryServiceProxy() - " +
            "Unable to create proxy route, missing router");
    options.serviceClass = GalleryService;
    ServiceProxy.bindRoutes(router, Routes$5, options);
    return router;
}

const ɵ0$7 = function (svc, req) {
    return svc.locate(req.query.location);
}, ɵ1$7 = function (svc, req) {
    return svc.parseFile(req.files.file, req.body.format);
}, ɵ2$7 = function (svc, req) {
    return svc.capabilities(null, req.query);
}, ɵ3$6 = function (svc, req) {
    return svc.capabilities(req.params.id, req.query);
}, ɵ4$6 = function (svc, req) {
    return svc.store(req.files.file, req.body.format);
};
const Routes$6 = [
    {
        key: 'locate',
        method: 'get',
        path: 'utils/locate',
        auth: false,
        onExecute: ɵ0$7
    },
    {
        key: 'parseFile',
        method: 'post',
        path: 'utils/parse',
        auth: false,
        onExecute: ɵ1$7
    },
    {
        key: 'capabilities',
        method: 'get',
        path: 'utils/capabilities',
        auth: false,
        onExecute: ɵ2$7
    },
    {
        key: 'capabilitiesProperty',
        method: 'get',
        path: 'utils/capabilities/:id',
        auth: false,
        onExecute: ɵ3$6
    },
    {
        key: 'store',
        method: 'post',
        path: 'store',
        auth: true,
        onExecute: ɵ4$6
    }
];
/**
 *
 */
function UtilsServiceProxy(options) {
    if (typeof (options) === 'undefined') {
        options = {};
    }
    ;
    let router = options.router;
    if (!options.router) {
        let express = require('express');
        if (!express) {
            throw new Error("UtilsServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("UtilsServiceProxy() - " +
            "Unable to create proxy route, missing router");
    options.serviceClass = UtilsService;
    ServiceProxy.bindRoutes(router, Routes$6, options);
    return router;
}

const ɵ0$8 = function (svc, req) {
    let query = new KGQuery(req.query);
    return svc.suggest(query);
}, ɵ1$8 = function (svc, req) {
    let query = new KGQuery(req.query);
    return svc.types(query);
}, ɵ2$8 = function (svc, req) {
    let query = new KGQuery(req.query);
    return svc.sources(query);
};
const Routes$7 = [
    {
        key: 'suggest',
        method: 'get',
        path: 'recommender/suggest',
        auth: false,
        onExecute: ɵ0$8
    },
    {
        key: 'types',
        method: 'get',
        path: 'recommender/types',
        auth: false,
        onExecute: ɵ1$8
    },
    {
        key: 'sources',
        method: 'get',
        path: 'recommender/sources',
        auth: false,
        onExecute: ɵ2$8
    }
];
/**
 *
 */
function KGServiceProxy(options) {
    if (typeof (options) === 'undefined') {
        options = {};
    }
    ;
    let router = options.router;
    if (!options.router) {
        let express = require('express');
        if (!express) {
            throw new Error("KGServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("KGServiceProxy() - " +
            "Unable to create proxy route, missing router");
    options.serviceClass = KGService;
    ServiceProxy.bindRoutes(router, Routes$7, options);
    return router;
}

const ɵ0$9 = function (svc, req) {
    return svc.searchItems(req.query);
}, ɵ1$9 = function (svc, req) {
    return svc.searchGroups(req.query);
}, ɵ2$9 = function (svc, req) {
    return svc.searchOrgs(req.query);
}, ɵ3$7 = function (svc, req) {
    return svc.getItem(req.params.id);
}, ɵ4$7 = function (svc, req) {
    return svc.getGroup(req.params.id);
}, ɵ5$6 = function (svc, req) {
    return svc.getOrg(req.params.id);
};
const Routes$8 = [
    {
        key: 'searchItems',
        method: 'get',
        path: 'agol/items',
        auth: false,
        onExecute: ɵ0$9
    },
    {
        key: 'searchGroups',
        method: 'get',
        path: 'agol/groups',
        auth: false,
        onExecute: ɵ1$9
    },
    {
        key: 'searchOrgs',
        method: 'get',
        path: 'agol/orgs',
        auth: false,
        onExecute: ɵ2$9
    },
    {
        key: 'getItem',
        method: 'get',
        path: 'agol/items/:id',
        auth: false,
        onExecute: ɵ3$7
    },
    {
        key: 'getGroup',
        method: 'get',
        path: 'agol/groups/:id',
        auth: false,
        onExecute: ɵ4$7
    },
    {
        key: 'getOrg',
        method: 'get',
        path: 'agol/orgs/:id',
        auth: false,
        onExecute: ɵ5$6
    }
];
/**
 *
 */
function AgolServiceProxy(options) {
    if (typeof (options) === 'undefined') {
        options = {};
    }
    ;
    let router = options.router;
    if (!options.router) {
        let express = require('express');
        if (!express) {
            throw new Error("AgolServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("AgolServiceProxy() - " +
            "Unable to create proxy route, missing router");
    options.serviceClass = AgolService;
    ServiceProxy.bindRoutes(router, Routes$8, options);
    return router;
}

/**
 * Generated bundle index. Do not edit.
 */

export { AgolServiceProxy, DatasetServiceProxy, GalleryServiceProxy, ItemServiceProxy, KGServiceProxy, LayerServiceProxy, MapServiceProxy, NodeHttpClient, ServiceServiceProxy, UtilsServiceProxy };
//# sourceMappingURL=geoplatform-client-node.js.map
