/*
This software has been approved for release by the U.S. Department of the Interior. Although the software has been subjected to rigorous review, the DOI reserves the right to update the software as needed pursuant to further analysis and review. No warranty, expressed or implied, is made by the DOI or the U.S. Government as to the functionality of the software and related material nor shall the fact of release constitute any such warranty. Furthermore, the software is released on condition that neither the DOI nor the U.S. Government shall be held liable for any damages resulting from its authorized or unauthorized use.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@geoplatform/client')) :
    typeof define === 'function' && define.amd ? define('@geoplatform/client/node', ['exports', '@geoplatform/client'], factory) :
    (factory((global.geoplatform = global.geoplatform || {}, global.geoplatform.client = global.geoplatform.client || {}, global.geoplatform.client.node = {}),global.geoplatform.client));
}(this, (function (exports,client) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NodeHttpClient = /** @class */ (function (_super) {
        __extends(NodeHttpClient, _super);
        /**
         * @param options.timeout
         * @param options.token - the bearer token or a function to retrieve it
         */
        function NodeHttpClient(options) {
            return _super.call(this, options) || this;
        }
        /**
         * @param {?} options
         * @return {?}
         */
        NodeHttpClient.prototype.createRequestOpts = /**
         * @param {?} options
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var opts = {
                    method: options["method"],
                    url: options["url"],
                    json: false !== options["json"],
                    timeout: options["timeout"] || this.timeout
                };
                if (options["params"]) {
                    opts["qs"] = options["params"];
                }
                if (options["file"]) {
                    /** @type {?} */
                    var fs = require('fs');
                    if (!fs)
                        throw new Error("Module 'fs' not available");
                    opts["formData"] = {
                        file: {
                            value: fs.createReadStream(options["file"].path),
                            options: {
                                filename: options["file"].originalFilename
                            }
                        }
                    };
                    Object.assign(opts["formData"], options["data"] || {});
                }
                else if (options["data"]) {
                    if (options["formData"]) {
                        opts["formData"] = options["data"];
                    }
                    else {
                        opts["body"] = options["data"];
                    }
                }
                //set authorization header if one was provided
                if (this.token) {
                    /** @type {?} */
                    var token = this.token();
                    if (token) {
                        opts["auth"] = { 'bearer': token };
                    }
                }
                //copy over user-supplied options
                if (options["options"]) {
                    for (var o in options["options"]) {
                        if (options["options"].hasOwnProperty(o)) {
                            opts[o] = options["options"][o];
                        }
                    }
                }
                // console.log(JSON.stringify(opts));
                return opts;
            };
        /**
         *
         */
        /**
         *
         * @param {?} options
         * @return {?}
         */
        NodeHttpClient.prototype.execute = /**
         *
         * @param {?} options
         * @return {?}
         */
            function (options) {
                var _this = this;
                /** @type {?} */
                var request = require('request');
                // require('request-debug')(request);
                if (!request) {
                    throw new Error("Module 'request' not available");
                }
                return new Promise(function (resolve, reject) {
                    request(options, function (error, response, body) {
                        _this.checkAndHandleError(error, response)
                            .then(function () {
                            if (options.json === false)
                                resolve(response);
                            else
                                resolve(body);
                        })
                            .catch(function (e) { return reject(e); });
                    });
                });
            };
        /**
         *
         */
        /**
         *
         * @param {?} error
         * @param {?} response
         * @return {?}
         */
        NodeHttpClient.prototype.checkAndHandleError = /**
         *
         * @param {?} error
         * @param {?} response
         * @return {?}
         */
            function (error, response) {
                /** @type {?} */
                var props = {
                    message: null,
                    error: null,
                    //error type
                    status: 200
                };
                if (error) {
                    // Logger.debug("Error generated by request library: " + error.code);
                    if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {
                        props["status"] = 500;
                        props["error"] = "Connection Timeout";
                        props["message"] = "The response from the service took too long to read";
                        if (error.connect === true) {
                            props["message"] = "Unable to establish a connection to the service";
                        }
                    }
                    else {
                        return Promise.reject(error);
                    }
                }
                else if (response.statusCode < 200 || response.statusCode > 204) {
                    // Logger.debug('Error returned by remote endpoint (' + response.statusCode + ')');
                    // Logger.debug(JSON.stringify(response));
                    props["status"] = response.statusCode;
                    if (response.body && typeof (response.body) === 'object') {
                        props = response.body;
                        props["status"] = props["status"] || response.statusCode;
                        props["message"] = props["message"] || "An error occurred communicating with service";
                        if (response.statusCode === 409) {
                            /** @type {?} */
                            var sidx = response.body.message.indexOf(" ");
                            /** @type {?} */
                            var eidx = response.body.message.indexOf(' already exists');
                            if (sidx >= 0 && eidx > sidx) {
                                props["item"] = response.body.message.substring(sidx + 1, eidx);
                            }
                        }
                    }
                    else {
                        switch (response.statusCode) {
                            case 404:
                                props["error"] = "Not Found";
                                props["message"] = response.request.uri.pathname + " cannot be found";
                                break;
                            case 401:
                                props["error"] = "Unauthenticated";
                                props["message"] = "You are not authenticated";
                                break;
                            case 403:
                                props["error"] = "Unauthorized";
                                props["message"] = "You are not authorized to access " + response.request.uri.pathname;
                                break;
                            case 409:
                                props["error"] = "Conflict";
                                props["message"] = "Item already exists";
                                // pattern received is: { ..., message: 'Resource <identifier> already exists', ... }
                                try {
                                    /** @type {?} */
                                    var json = JSON.parse(response.body);
                                    /** @type {?} */
                                    var sidx = json.message.indexOf(" ");
                                    /** @type {?} */
                                    var eidx = json.message.indexOf(' already exists');
                                    if (sidx >= 0 && eidx > sidx) {
                                        props["item"] = json.message.substring(sidx + 1, eidx);
                                    }
                                }
                                catch (e) {
                                    props["message"] += '.  Unable to extract existing identifier from service response';
                                }
                                break;
                            default:
                                try {
                                    /** @type {?} */
                                    var json = JSON.parse(response.body);
                                    props = json;
                                    props["status"] = response.statusCode;
                                    // Logger.debug("PARSED ERROR: " + JSON.stringify(props));
                                }
                                catch (e) {
                                    props["error"] = "Server Error";
                                    props["message"] = response.body;
                                    // Logger.debug("DEFAULTED ERROR: " + JSON.stringify(props));
                                }
                        }
                    }
                }
                if (props["status"] < 200 || props["status"] > 204) {
                    props["error"] = props["error"] || "Server Error";
                    props["status"] = props["status"] || response.statusCode;
                    props["message"] = props["message"] || "An error occurred communicating with service";
                    /** @type {?} */
                    var err = new Error(props["message"]);
                    Object.assign(err, props);
                    // Logger.debug("UTILS.checkAndHandleError : " + err);
                    // Logger.debug("UTILS.checkAndHandleError : " + JSON.stringify(err));
                    // Logger.debug("UTILS.checkAndHandleError : " + err.message);
                    return Promise.reject(err);
                }
                return Promise.resolve(null);
            };
        return NodeHttpClient;
    }(client.GPHttpClient));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
            timeout: client.Config["timeout"],
            token: needsAuth ? token : null
        });
    }, ɵ2 = function (req, needsAuth, options) {
        /** @type {?} */
        var client$$1 = this.getClient(req, needsAuth, options);
        /** @type {?} */
        var svcClass = options.serviceClass || client.ItemService;
        /** @type {?} */
        var service = new svcClass(client.Config["ualUrl"], client$$1);
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ɵ0$1 = function (svc, req) {
        return svc.search(req.query);
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
    // @ts-ignore
    result, res) {
        res.status(204).end();
    }, ɵ6 = function (svc, req) {
        return svc.patch(req.params.id, req.body);
    }, ɵ7 = function (svc, req) { return svc.clone(req.params.id, req.body); }, ɵ8 = function (svc, req) {
        return svc.export(req.params.id, req.query.format);
    }, ɵ9 = function (result, res) {
        /** @type {?} */
        var mimeType = result.headers['content-type'];
        /** @type {?} */
        var disposition = result.headers['content-disposition'];
        res.set("Content-Type", mimeType);
        res.setHeader('Content-disposition', disposition);
        res.send(result.body);
    }, ɵ10 = function (svc, req) {
        return svc.getUri(req.body);
    }, ɵ11 = function (result, res) {
        res.json({ uri: result });
    }, ɵ12 = function (svc, req) {
        return svc.getUri(req.body)
            .then(function (uri) {
            /** @type {?} */
            var fields = ['serviceType', 'services', 'scheme', 'themes', 'publishers', 'keywords'];
            /** @type {?} */
            var query = new client.Query().uri(uri).fields(fields);
            return svc.search(query);
        });
    }, ɵ13 = function (svc, req) {
        /** @type {?} */
        var input = req.body.url || req.files.file;
        return svc.import(input, req.query.format);
    }, ɵ14 = function (svc, req) {
        return svc.associations(req.params.id, req.query);
    }, ɵ15 = function (svc, req) {
        return svc.versions(req.params.id, req.query);
    }, ɵ16 = function (svc, req) {
        return svc.get(req.params.id, { version: req.params.version });
    };
    /** @type {?} */
    var Routes = [
        {
            key: 'search',
            method: 'get',
            path: 'items',
            auth: false,
            execFn: ɵ0$1
        },
        {
            key: 'get',
            method: 'get',
            path: 'items/:id',
            auth: false,
            execFn: ɵ1$1
        },
        {
            key: 'create',
            method: 'post',
            path: 'items',
            auth: true,
            execFn: ɵ2$1
        },
        {
            key: 'update',
            method: 'put',
            path: 'items/:id',
            auth: true,
            execFn: ɵ3
        },
        {
            key: 'delete',
            method: 'delete',
            path: 'items/:id',
            auth: true,
            execFn: ɵ4,
            respFn: ɵ5
        },
        {
            key: 'patch',
            method: 'patch',
            path: 'items/:id',
            auth: true,
            execFn: ɵ6
        },
        {
            key: 'clone',
            method: 'post',
            path: 'items/:id/clone',
            auth: true,
            execFn: ɵ7
        },
        {
            key: 'export',
            method: 'get',
            path: 'items/:id/export',
            auth: false,
            execFn: ɵ8,
            respFn: ɵ9
        },
        {
            key: 'uri',
            method: 'post',
            path: 'items/uri',
            auth: false,
            execFn: ɵ10,
            respFn: ɵ11
        },
        {
            key: 'exists',
            method: 'post',
            path: 'items/exists',
            auth: false,
            execFn: ɵ12
        },
        {
            key: 'import',
            method: 'post',
            path: 'items/import',
            auth: true,
            execFn: ɵ13
        },
        {
            key: 'associations',
            method: 'get',
            path: 'items/:id/associations',
            auth: false,
            execFn: ɵ14
        },
        {
            key: 'versions',
            method: 'get',
            path: 'items/:id/versions',
            auth: false,
            execFn: ɵ15
        },
        {
            key: 'getVersion',
            method: 'get',
            path: 'items/:id/versions/:version',
            auth: false,
            execFn: ɵ16
        }
    ];
    /**
     *
     * @param {?} router
     * @param {?=} options
     * @return {?}
     */
    function bindRoutes(router, options) {
        //bind common endpoints
        options.pathBaseDefault = "items";
        options.serviceClass = client.ItemService;
        ServiceProxy.bindRoutes(router, Routes, options);
    }
    /**
     * ItemServiceProxy
     *
     * see examples/node/item-proxy for an in-depth example
     * @param {?=} options
     * @return {?}
     */
    function ItemServiceProxy(options) {
        if (typeof (options) === 'undefined') {
            options = {};
        }
        /** @type {?} */
        var router = options.router;
        if (!options.router) {
            /** @type {?} */
            var express = require('express');
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ɵ0$2 = function (svc, req) {
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
    // @ts-ignore
    result, res) {
        res.status(204).end();
    }, ɵ6$1 = function (svc, req) {
        return svc.patch(req.params.id, req.body);
    }, ɵ7$1 = function (svc, req) {
        return svc.export(req.params.id, req.query.format);
    }, ɵ8$1 = function (result, res) {
        /** @type {?} */
        var mimeType = result.headers['content-type'];
        /** @type {?} */
        var disposition = result.headers['content-disposition'];
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
    /** @type {?} */
    var Routes$1 = [
        {
            key: 'search',
            method: 'get',
            path: 'services',
            auth: false,
            execFn: ɵ0$2
        },
        {
            key: 'get',
            method: 'get',
            path: 'services/:id',
            auth: false,
            execFn: ɵ1$2
        },
        {
            key: 'create',
            method: 'post',
            path: 'services',
            auth: true,
            execFn: ɵ2$2
        },
        {
            key: 'update',
            method: 'put',
            path: 'services/:id',
            auth: true,
            execFn: ɵ3$1
        },
        {
            key: 'delete',
            method: 'delete',
            path: 'services/:id',
            auth: true,
            execFn: ɵ4$1,
            respFn: ɵ5$1
        },
        {
            key: 'patch',
            method: 'patch',
            path: 'services/:id',
            auth: true,
            execFn: ɵ6$1
        },
        {
            key: 'export',
            method: 'get',
            path: 'services/:id/export',
            auth: false,
            execFn: ɵ7$1,
            respFn: ɵ8$1
        },
        {
            key: 'types',
            method: 'get',
            path: 'serviceTypes',
            auth: false,
            execFn: ɵ9$1
        },
        {
            key: 'import',
            method: 'post',
            path: 'services/import',
            auth: true,
            execFn: ɵ10$1
        },
        {
            key: 'about',
            method: 'get',
            path: 'services/:id/about',
            auth: false,
            execFn: ɵ11$1
        },
        {
            key: 'harvest',
            method: 'get',
            path: 'services/:id/harvest',
            auth: false,
            execFn: ɵ12$1
        },
        {
            key: 'test',
            method: 'get',
            path: 'services/:id/test',
            auth: false,
            execFn: ɵ13$1
        },
        {
            key: 'statistics',
            method: 'get',
            path: 'services/:id/statistics',
            auth: false,
            execFn: ɵ14$1
        }
    ];
    /**
     *
     * @param {?=} options
     * @return {?}
     */
    function ServiceServiceProxy(options) {
        if (typeof (options) === 'undefined') {
            options = {};
        }
        /** @type {?} */
        var router = options.router;
        if (!options.router) {
            /** @type {?} */
            var express = require('express');
            if (!express) {
                throw new Error("ServiceServiceProxy() - Must provide" +
                    "'options.router' or include express as a dependency");
            }
            router = express.Router();
        }
        if (!router)
            throw new Error("ServiceServiceProxy() - " +
                "Unable to create proxy route, missing router");
        options.serviceClass = client.ServiceService;
        ServiceProxy.bindRoutes(router, Routes$1, options);
        return router;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ɵ0$3 = function (svc, req) {
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
    // @ts-ignore
    result, res) { res.status(204).end(); }, ɵ6$2 = function (svc, req) {
        return svc.patch(req.params.id, req.body);
    }, ɵ7$2 = function (svc, req) {
        return svc.export(req.params.id, req.query.format);
    }, ɵ8$2 = function (result, res) {
        /** @type {?} */
        var mimeType = result.headers['content-type'];
        /** @type {?} */
        var disposition = result.headers['content-disposition'];
        res.set("Content-Type", mimeType);
        res.setHeader('Content-disposition', disposition);
        res.send(result.body);
    }, ɵ9$2 = function (svc, req) {
        return svc.style(req.params.id);
    }, ɵ10$2 = function (svc, req) {
        return svc.describe(req.params.id, req.body);
    }, ɵ11$2 = function (svc, req) {
        return svc.validate(req.params.id, req.body);
    };
    /** @type {?} */
    var Routes$2 = [
        {
            key: 'search',
            method: 'get',
            path: 'layers',
            auth: false,
            execFn: ɵ0$3
        },
        {
            key: 'get',
            method: 'get',
            path: 'layers/:id',
            auth: false,
            execFn: ɵ1$3
        },
        {
            key: 'create',
            method: 'post',
            path: 'layers',
            auth: true,
            execFn: ɵ2$3
        },
        {
            key: 'update',
            method: 'put',
            path: 'layers/:id',
            auth: true,
            execFn: ɵ3$2
        },
        {
            key: 'delete',
            method: 'delete',
            path: 'layers/:id',
            auth: true,
            execFn: ɵ4$2,
            respFn: ɵ5$2
        },
        {
            key: 'patch',
            method: 'patch',
            path: 'layers/:id',
            auth: true,
            execFn: ɵ6$2
        },
        {
            key: 'export',
            method: 'get',
            path: 'layers/:id/export',
            auth: false,
            execFn: ɵ7$2,
            respFn: ɵ8$2
        },
        {
            key: 'style',
            method: 'get',
            path: 'layers/:id/style',
            auth: false,
            execFn: ɵ9$2
        },
        {
            key: 'describe',
            method: 'post',
            path: 'layers/:id/describe',
            auth: false,
            execFn: ɵ10$2
        },
        {
            key: 'validate',
            method: 'post',
            path: 'layers/:id/validate',
            auth: false,
            execFn: ɵ11$2
        }
    ];
    /**
     *
     * @param {?=} options
     * @return {?}
     */
    function LayerServiceProxy(options) {
        if (typeof (options) === 'undefined') {
            options = {};
        }
        /** @type {?} */
        var router = options.router;
        if (!options.router) {
            /** @type {?} */
            var express = require('express');
            if (!express) {
                throw new Error("LayerServiceProxy() - Must provide" +
                    "'options.router' or include express as a dependency");
            }
            router = express.Router();
        }
        if (!router)
            throw new Error("LayerServiceProxy() - " +
                "Unable to create proxy route, missing router");
        options.serviceClass = client.LayerService;
        ServiceProxy.bindRoutes(router, Routes$2, options);
        return router;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ɵ0$4 = function (svc, req) {
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
    // @ts-ignore
    result, res) {
        res.status(204).end();
    }, ɵ6$3 = function (svc, req) {
        return svc.patch(req.params.id, req.body);
    }, ɵ7$3 = function (svc, req) {
        return svc.export(req.params.id, req.query.format);
    }, ɵ8$3 = function (result, res) {
        /** @type {?} */
        var mimeType = result.headers['content-type'];
        /** @type {?} */
        var disposition = result.headers['content-disposition'];
        res.set("Content-Type", mimeType);
        res.setHeader('Content-disposition', disposition);
        res.send(result.body);
    };
    /** @type {?} */
    var Routes$3 = [
        {
            key: 'search',
            method: 'get',
            path: 'datasets',
            auth: false,
            execFn: ɵ0$4
        },
        {
            key: 'get',
            method: 'get',
            path: 'datasets/:id',
            auth: false,
            execFn: ɵ1$4
        },
        {
            key: 'create',
            method: 'post',
            path: 'datasets',
            auth: true,
            execFn: ɵ2$4
        },
        {
            key: 'update',
            method: 'put',
            path: 'datasets/:id',
            auth: true,
            execFn: ɵ3$3
        },
        {
            key: 'delete',
            method: 'delete',
            path: 'datasets/:id',
            auth: true,
            execFn: ɵ4$3,
            respFn: ɵ5$3
        },
        {
            key: 'patch',
            method: 'patch',
            path: 'datasets/:id',
            auth: true,
            execFn: ɵ6$3
        },
        {
            key: 'export',
            method: 'get',
            path: 'datasets/:id/export',
            auth: false,
            execFn: ɵ7$3,
            respFn: ɵ8$3
        }
    ];
    /**
     * DatasetServiceProxy
     *
     * see examples/node/item-proxy for an in-depth example
     * @param {?=} options
     * @return {?}
     */
    function DatasetServiceProxy(options) {
        if (typeof (options) === 'undefined') {
            options = {};
        }
        /** @type {?} */
        var router = options.router;
        if (!options.router) {
            /** @type {?} */
            var express = require('express');
            if (!express) {
                throw new Error("DatasetServiceProxy() - Must provide" +
                    "'options.router' or include express as a dependency");
            }
            router = express.Router();
        }
        if (!router)
            throw new Error("DatasetServiceProxy() - " +
                "Unable to create proxy route, missing router");
        options.serviceClass = client.DatasetService;
        ServiceProxy.bindRoutes(router, Routes$3, options);
        return router;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ɵ0$5 = function (svc, req) {
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
    // @ts-ignore
    result, res) {
        res.status(204).end();
    }, ɵ6$4 = function (svc, req) {
        return svc.patch(req.params.id, req.body);
    }, ɵ7$4 = function (svc, req) {
        return svc.export(req.params.id, req.query.format);
    }, ɵ8$4 = function (result, res) {
        /** @type {?} */
        var mimeType = result.headers['content-type'];
        /** @type {?} */
        var disposition = result.headers['content-disposition'];
        res.set("Content-Type", mimeType);
        res.setHeader('Content-disposition', disposition);
        res.send(result.body);
    };
    /** @type {?} */
    var Routes$4 = [
        {
            key: 'search',
            method: 'get',
            path: 'maps',
            auth: false,
            execFn: ɵ0$5
        },
        {
            key: 'get',
            method: 'get',
            path: 'maps/:id',
            auth: false,
            execFn: ɵ1$5
        },
        {
            key: 'create',
            method: 'post',
            path: 'maps',
            auth: true,
            execFn: ɵ2$5
        },
        {
            key: 'update',
            method: 'put',
            path: 'maps/:id',
            auth: true,
            execFn: ɵ3$4
        },
        {
            key: 'delete',
            method: 'delete',
            path: 'maps/:id',
            auth: true,
            execFn: ɵ4$4,
            respFn: ɵ5$4
        },
        {
            key: 'patch',
            method: 'patch',
            path: 'maps/:id',
            auth: true,
            execFn: ɵ6$4
        },
        {
            key: 'export',
            method: 'get',
            path: 'maps/:id/export',
            auth: false,
            execFn: ɵ7$4,
            respFn: ɵ8$4
        }
    ];
    /**
     * MapServiceProxy
     *
     * see examples/node/item-proxy for an in-depth example
     * @param {?=} options
     * @return {?}
     */
    function MapServiceProxy(options) {
        if (typeof (options) === 'undefined') {
            options = {};
        }
        /** @type {?} */
        var router = options.router;
        if (!options.router) {
            /** @type {?} */
            var express = require('express');
            if (!express) {
                throw new Error("MapServiceProxy() - Must provide" +
                    "'options.router' or include express as a dependency");
            }
            router = express.Router();
        }
        if (!router)
            throw new Error("MapServiceProxy() - " +
                "Unable to create proxy route, missing router");
        options.serviceClass = client.MapService;
        ServiceProxy.bindRoutes(router, Routes$4, options);
        return router;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ɵ0$6 = function (svc, req) {
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
    // @ts-ignore
    result, res) {
        res.status(204).end();
    }, ɵ6$5 = function (svc, req) {
        return svc.patch(req.params.id, req.body);
    }, ɵ7$5 = function (svc, req) {
        return svc.export(req.params.id, req.query.format);
    }, ɵ8$5 = function (result, res) {
        /** @type {?} */
        var mimeType = result.headers['content-type'];
        /** @type {?} */
        var disposition = result.headers['content-disposition'];
        res.set("Content-Type", mimeType);
        res.setHeader('Content-disposition', disposition);
        res.send(result.body);
    };
    /** @type {?} */
    var Routes$5 = [
        {
            key: 'search',
            method: 'get',
            path: 'galleries',
            auth: false,
            execFn: ɵ0$6
        },
        {
            key: 'get',
            method: 'get',
            path: 'galleries/:id',
            auth: false,
            execFn: ɵ1$6
        },
        {
            key: 'create',
            method: 'post',
            path: 'galleries',
            auth: true,
            execFn: ɵ2$6
        },
        {
            key: 'update',
            method: 'put',
            path: 'galleries/:id',
            auth: true,
            execFn: ɵ3$5
        },
        {
            key: 'delete',
            method: 'delete',
            path: 'galleries/:id',
            auth: true,
            execFn: ɵ4$5,
            respFn: ɵ5$5
        },
        {
            key: 'patch',
            method: 'patch',
            path: 'galleries/:id',
            auth: true,
            execFn: ɵ6$5
        },
        {
            key: 'export',
            method: 'get',
            path: 'galleries/:id/export',
            auth: false,
            execFn: ɵ7$5,
            respFn: ɵ8$5
        }
    ];
    /**
     * GalleryServiceProxy
     *
     * see examples/node/item-proxy for an in-depth example
     * @param {?=} options
     * @return {?}
     */
    function GalleryServiceProxy(options) {
        if (typeof (options) === 'undefined') {
            options = {};
        }
        /** @type {?} */
        var router = options.router;
        if (!options.router) {
            /** @type {?} */
            var express = require('express');
            if (!express) {
                throw new Error("GalleryServiceProxy() - Must provide" +
                    "'options.router' or include express as a dependency");
            }
            router = express.Router();
        }
        if (!router)
            throw new Error("GalleryServiceProxy() - " +
                "Unable to create proxy route, missing router");
        options.serviceClass = client.GalleryService;
        ServiceProxy.bindRoutes(router, Routes$5, options);
        return router;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ɵ0$7 = function (svc, req) {
        return svc.locate(req.query.q);
    }, ɵ1$7 = function (svc, req) {
        return svc.parseFile(req.files.file, req.body.format);
    }, ɵ2$7 = function (svc, req) {
        return svc.capabilities(null, req.query);
    }, ɵ3$6 = function (svc, req) {
        return svc.capabilities(req.params.id, req.query);
    };
    /** @type {?} */
    var Routes$6 = [
        {
            key: 'locate',
            method: 'get',
            path: 'utils/locate',
            auth: false,
            execFn: ɵ0$7
        },
        {
            key: 'parseFile',
            method: 'post',
            path: 'utils/parse',
            auth: false,
            execFn: ɵ1$7
        },
        {
            key: 'capabilities',
            method: 'get',
            path: 'utils/capabilities',
            auth: false,
            execFn: ɵ2$7
        },
        {
            key: 'capabilitiesProperty',
            method: 'get',
            path: 'utils/capabilities/:id',
            auth: false,
            execFn: ɵ3$6
        }
    ];
    /**
     *
     * @param {?=} options
     * @return {?}
     */
    function UtilsServiceProxy(options) {
        if (typeof (options) === 'undefined') {
            options = {};
        }
        /** @type {?} */
        var router = options.router;
        if (!options.router) {
            /** @type {?} */
            var express = require('express');
            if (!express) {
                throw new Error("UtilsServiceProxy() - Must provide" +
                    "'options.router' or include express as a dependency");
            }
            router = express.Router();
        }
        if (!router)
            throw new Error("UtilsServiceProxy() - " +
                "Unable to create proxy route, missing router");
        options.serviceClass = client.UtilsService;
        ServiceProxy.bindRoutes(router, Routes$6, options);
        return router;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ɵ0$8 = function (svc, req) {
        return svc.searchItems(req.query);
    }, ɵ1$8 = function (svc, req) {
        return svc.searchGroups(req.query);
    }, ɵ2$8 = function (svc, req) {
        return svc.searchOrgs(req.query);
    }, ɵ3$7 = function (svc, req) {
        return svc.getItem(req.params.id);
    }, ɵ4$6 = function (svc, req) {
        return svc.getGroup(req.params.id);
    }, ɵ5$6 = function (svc, req) {
        return svc.getOrg(req.params.id);
    };
    /** @type {?} */
    var Routes$7 = [
        {
            key: 'searchItems',
            method: 'get',
            path: 'agol/items',
            auth: false,
            execFn: ɵ0$8
        },
        {
            key: 'searchGroups',
            method: 'get',
            path: 'agol/groups',
            auth: false,
            execFn: ɵ1$8
        },
        {
            key: 'searchOrgs',
            method: 'get',
            path: 'agol/orgs',
            auth: false,
            execFn: ɵ2$8
        },
        {
            key: 'getItem',
            method: 'get',
            path: 'agol/items/:id',
            auth: false,
            execFn: ɵ3$7
        },
        {
            key: 'getGroup',
            method: 'get',
            path: 'agol/groups/:id',
            auth: false,
            execFn: ɵ4$6
        },
        {
            key: 'getOrg',
            method: 'get',
            path: 'agol/orgs/:id',
            auth: false,
            execFn: ɵ5$6
        }
    ];
    /**
     *
     * @param {?=} options
     * @return {?}
     */
    function AgolServiceProxy(options) {
        if (typeof (options) === 'undefined') {
            options = {};
        }
        /** @type {?} */
        var router = options.router;
        if (!options.router) {
            /** @type {?} */
            var express = require('express');
            if (!express) {
                throw new Error("AgolServiceProxy() - Must provide" +
                    "'options.router' or include express as a dependency");
            }
            router = express.Router();
        }
        if (!router)
            throw new Error("AgolServiceProxy() - " +
                "Unable to create proxy route, missing router");
        options.serviceClass = client.AgolService;
        ServiceProxy.bindRoutes(router, Routes$7, options);
        return router;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NodeHttpClient = NodeHttpClient;
    exports.ItemServiceProxy = ItemServiceProxy;
    exports.ServiceServiceProxy = ServiceServiceProxy;
    exports.LayerServiceProxy = LayerServiceProxy;
    exports.DatasetServiceProxy = DatasetServiceProxy;
    exports.MapServiceProxy = MapServiceProxy;
    exports.GalleryServiceProxy = GalleryServiceProxy;
    exports.UtilsServiceProxy = UtilsServiceProxy;
    exports.AgolServiceProxy = AgolServiceProxy;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=geoplatform-client-node.umd.js.map