/*
This software has been approved for release by the U.S. Department of the Interior. Although the software has been subjected to rigorous review, the DOI reserves the right to update the software as needed pursuant to further analysis and review. No warranty, expressed or implied, is made by the DOI or the U.S. Government as to the functionality of the software and related material nor shall the fact of release constitute any such warranty. Furthermore, the software is released on condition that neither the DOI nor the U.S. Government shall be held liable for any damages resulting from its authorized or unauthorized use.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@geoplatform/client')) :
    typeof define === 'function' && define.amd ? define('@geoplatform/client/node', ['exports', '@geoplatform/client'], factory) :
    (global = global || self, factory((global.geoplatform = global.geoplatform || {}, global.geoplatform.client = global.geoplatform.client || {}, global.geoplatform.client.node = {}), global.geoplatform.client));
}(this, function (exports, client) { 'use strict';

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

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

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
         * @param options - request configuration
         * @return request object
         */
        NodeHttpClient.prototype.createRequestOpts = function (options) {
            var opts = {
                method: options.method,
                url: options.url,
                json: false !== options.json,
                timeout: options.timeout || this.timeout
            };
            if (options.params) {
                opts.qs = options.params;
            }
            if (options.file) {
                var fs = require('fs');
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
                var token = this.token();
                if (token) {
                    opts.auth = { 'bearer': token };
                }
            }
            var cookie = this.getCookie();
            if (cookie) {
                opts.headers = opts.headers || {};
                opts.headers.Cookie = this.authCookieName + '=' + cookie;
            }
            //copy over user-supplied options
            if (options.options) {
                for (var o in options.options) {
                    if (options.options.hasOwnProperty(o)) {
                        opts[o] = options.options[o];
                    }
                }
            }
            // console.log(JSON.stringify(opts));
            return opts;
        };
        /**
         *
         */
        NodeHttpClient.prototype.execute = function (options) {
            var _this = this;
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
        NodeHttpClient.prototype.checkAndHandleError = function (error, response) {
            var props = {
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
                        var sidx = response.body.message.indexOf(" ");
                        var eidx = response.body.message.indexOf(' already exists');
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
                                var json = JSON.parse(response.body);
                                var sidx = json.message.indexOf(" ");
                                var eidx = json.message.indexOf(' already exists');
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
                                var json = JSON.parse(response.body);
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
                var err = new Error(props.message);
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

    var GP_AUTH_COOKIE = 'gpoauth-a';
    var ɵ0 = function (router, routes, options) {
        var _this = this;
        console.log(" ");
        console.log("BINDING ROUTES!");
        console.log(" ");
        options = options || {};
        var paths = options.paths || {};
        var auths = options.auth || {};
        routes.forEach(function (route) {
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
            var overrides = options[route.key] || {};
            //look for overriden paths in either new override structure or older key:path format
            var path = '/' + (overrides.path || paths[route.key] || route.path);
            //look for authentication override in either new structure or older format
            var needsAuth = overrides.auth || auths[route.key] || route.auth;
            if (options.logger) {
                options.logger.debug("Binding Service Route [" + route.method + "] " + path);
            }
            router[route.method](path, function (req, res, next) {
                var promise = null;
                if (typeof (route.onExecute) !== 'function') {
                    promise = Promise.resolve(null);
                }
                else {
                    if (options.logger) {
                        options.logger.debug("Executing Service Route [" + route.method + "] " + path);
                        options.logger.debug(JSON.stringify(req.params));
                        options.logger.debug("-------------------------");
                    }
                    var svc = _this.getService(req, needsAuth, options);
                    try {
                        promise = route.onExecute(svc, req);
                    }
                    catch (e) {
                        promise = Promise.reject(e);
                    }
                }
                promise.then(function (result) {
                    var onResponse = overrides.onResponse || route.onResponse;
                    if (onResponse)
                        onResponse(result, res, next);
                    else
                        res.json(result);
                })
                    .catch(function (err) {
                    if (overrides.onError)
                        overrides.onError(err);
                    if (options.onError)
                        options.onError(route.key, err);
                    next(err);
                })
                    .finally(function () {
                    //if route has a finish function defined, invoke it
                    if (overrides.onFinish) {
                        overrides.onFinish(req, res);
                    }
                    //if proxy has an overall finish function defined, invoke it
                    var finishFn = options.onFinish;
                    if (finishFn)
                        finishFn(route.key, req, res);
                });
            });
        });
    }, ɵ1 = function (req, needsAuth, options) {
        var token = req.accessToken || null;
        if (needsAuth && options && options.logger) {
            if (!token) {
                options.logger.warn("ServiceProxy.getClient() - No Access Token was provided on incoming request header!");
            }
            else if (!!options.debug) {
                options.logger.debug("ServiceProxy.getClient() - Token: " + token);
                options.logger.debug("ServiceProxy.getClient() - JWT: " + req.jwt);
            }
        }
        //check the incoming proxied request for cookies that should be forwarded along
        var cookie = this.getAuthCookie(req);
        // console.log("COOKIE IS " + cookie);
        if (cookie && !cookie.length)
            cookie = null;
        // if(options && options.logger) {
        //     options.logger.debug("Proxying Request Cookie: " + cookie);
        //     options.logger.debug(" ");
        // } else {
        //     console.log("Proxying Request Cookie: " + cookie);
        // }
        return new NodeHttpClient({
            timeout: client.Config.timeout,
            token: needsAuth ? token : null,
            cookie: needsAuth ? cookie : null
        });
    }, ɵ2 = function (req, needsAuth, options) {
        var client$1 = this.getClient(req, needsAuth, options);
        var svcClass = options.serviceClass || client.ItemService;
        // console.log("Proxying to " + Config.ualUrl);
        if (options.logger) {
            options.logger.debug("Proxying to " + client.Config.ualUrl);
            // options.logger.debug("Using service class: " + svcClass);
        }
        var service = new svcClass(client.Config.ualUrl, client$1);
        service.setTimeout(client.Config.timeout || 30000);
        if (options.logger) {
            service.setLogger(options.logger);
        }
        return service;
    }, ɵ3 = function (req) {
        if (!req)
            return null;
        if (req.cookies) { //parsed by cookieParser already
            // console.log("COOKIES PARSED ... ");
            // console.log("COOKIES ARE...");
            // console.log(JSON.stringify(req.cookies));
            // console.log(" ");
            // console.log("AUTH COOKIE IS " + req.cookies[GP_AUTH_COOKIE]);
            return req.cookies[GP_AUTH_COOKIE];
        }
        else if (req.headers.cookie) {
            // console.log("COOKIES NEED PARSING");
            try {
                var cookies = this.parseCookies(req.headers.cookie);
                return cookies[GP_AUTH_COOKIE];
            }
            catch (e) {
                console.log("ERROR parsing cookies: " + e.message);
                return null;
            }
        }
    }, ɵ4 = function parse(str) {
        if (!str || typeof str !== 'string' || !str.length)
            return null;
        var result = {};
        var expr = /; */;
        var pairs = str.split(expr);
        pairs.forEach(function (pair) {
            var sepIdx = pair.indexOf('=');
            if (sepIdx < 0)
                return; //ignore non- 'key=value' values
            var key = pair.substr(0, sepIdx).trim();
            var val = pair.substr(++sepIdx, pair.length).trim();
            // quoted values
            if ('"' == val[0])
                val = val.slice(1, -1);
            // only assign once
            if (undefined == result[key]) {
                var value = val;
                try {
                    value = decodeURIComponent(val);
                }
                catch (e) { }
                result[key] = value;
            }
        });
        return result;
    };
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
        getService: ɵ2,
        getAuthCookie: ɵ3,
        parseCookies: ɵ4
    };

    var ɵ0$1 = function (svc, req) {
        var query = new client.Query(req.query);
        return svc.search(query);
    }, ɵ1$1 = function (svc, req) {
        return svc.get(req.params.id);
    }, ɵ2$1 = function (svc, req) {
        return svc.save(req.body);
    }, ɵ3$1 = function (svc, req) {
        return svc.save(req.body);
    }, ɵ4$1 = function (svc, req) {
        return svc.remove(req.params.id);
    }, ɵ5 = function (
    // @ts-ignore
    result, res) {
        res.status(204).end();
    }, ɵ6 = function (svc, req) {
        return svc.patch(req.params.id, req.body);
    }, ɵ7 = function (svc, req) { return svc.clone(req.params.id, req.body); }, ɵ8 = function (svc, req) { return svc.clone(req.params.id, req.body); }, ɵ9 = function (svc, req) {
        return svc.export(req.params.id, req.query.format);
    }, ɵ10 = function (result, res) {
        var mimeType = result.headers['content-type'];
        var disposition = result.headers['content-disposition'];
        res.set("Content-Type", mimeType);
        res.setHeader('Content-disposition', disposition);
        res.send(result.body);
    }, ɵ11 = function (svc, req) {
        return svc.getUri(req.body);
    }, ɵ12 = function (result, res) {
        res.json({ uri: result });
    }, ɵ13 = function (svc, req) {
        return svc.getUri(req.body)
            .then(function (uri) {
            var fields = ['serviceType', 'services', 'scheme', 'themes', 'publishers', 'keywords'];
            var query = new client.Query().uri(uri).fields(fields);
            return svc.search(query);
        });
    }, ɵ14 = function (svc, req) {
        var input = req.body.url || req.files.file;
        return svc.import(input, req.query.format);
    }, ɵ15 = function (svc, req) {
        return svc.associations(req.params.id, req.query);
    }, ɵ16 = function (svc, req) {
        return svc.versions(req.params.id, req.query);
    }, ɵ17 = function (svc, req) {
        return svc.get(req.params.id, { version: req.params.version });
    };
    var Routes = [
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
            onExecute: ɵ3$1
        },
        {
            key: 'delete',
            method: 'delete',
            path: 'items/:id',
            auth: true,
            onExecute: ɵ4$1,
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
            key: 'clone',
            method: 'post',
            path: 'items/:id/clone',
            auth: true,
            execFn: ɵ8
        },
        {
            key: 'export',
            method: 'get',
            path: 'items/:id/export',
            auth: false,
            onExecute: ɵ9,
            onResponse: ɵ10
        },
        {
            key: 'uri',
            method: 'post',
            path: 'items/uri',
            auth: false,
            onExecute: ɵ11,
            onResponse: ɵ12
        },
        {
            key: 'exists',
            method: 'post',
            path: 'items/exists',
            auth: false,
            onExecute: ɵ13
        },
        {
            key: 'import',
            method: 'post',
            path: 'items/import',
            auth: true,
            onExecute: ɵ14
        },
        {
            key: 'associations',
            method: 'get',
            path: 'items/:id/associations',
            auth: false,
            onExecute: ɵ15
        },
        {
            key: 'versions',
            method: 'get',
            path: 'items/:id/versions',
            auth: false,
            onExecute: ɵ16
        },
        {
            key: 'getVersion',
            method: 'get',
            path: 'items/:id/versions/:version',
            auth: false,
            onExecute: ɵ17
        }
        // TODO findMultiple
    ];
    /**
     *
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
     */
    function ItemServiceProxy(options) {
        if (typeof (options) === 'undefined') {
            options = {};
        }
        ;
        var router = options.router;
        if (!options.router) {
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

    var ɵ0$2 = function (svc, req) {
        return svc.search(req.query);
    }, ɵ1$2 = function (svc, req) {
        return svc.get(req.params.id);
    }, ɵ2$2 = function (svc, req) {
        return svc.save(req.body);
    }, ɵ3$2 = function (svc, req) {
        return svc.save(req.body);
    }, ɵ4$2 = function (svc, req) {
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
        var mimeType = result.headers['content-type'];
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
    var Routes$1 = [
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
            onExecute: ɵ3$2
        },
        {
            key: 'delete',
            method: 'delete',
            path: 'services/:id',
            auth: true,
            onExecute: ɵ4$2,
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
        var router = options.router;
        if (!options.router) {
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

    var ɵ0$3 = function (svc, req) {
        return svc.search(req.query);
    }, ɵ1$3 = function (svc, req) {
        return svc.get(req.params.id);
    }, ɵ2$3 = function (svc, req) {
        return svc.save(req.body);
    }, ɵ3$3 = function (svc, req) {
        return svc.save(req.body);
    }, ɵ4$3 = function (svc, req) {
        return svc.remove(req.params.id);
    }, ɵ5$2 = function (
    // @ts-ignore
    result, res) { res.status(204).end(); }, ɵ6$2 = function (svc, req) {
        return svc.patch(req.params.id, req.body);
    }, ɵ7$2 = function (svc, req) {
        return svc.export(req.params.id, req.query.format);
    }, ɵ8$2 = function (result, res) {
        var mimeType = result.headers['content-type'];
        var disposition = result.headers['content-disposition'];
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
    var Routes$2 = [
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
            onExecute: ɵ3$3
        },
        {
            key: 'delete',
            method: 'delete',
            path: 'layers/:id',
            auth: true,
            onExecute: ɵ4$3,
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
        var router = options.router;
        if (!options.router) {
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

    var ɵ0$4 = function (svc, req) {
        return svc.search(req.query);
    }, ɵ1$4 = function (svc, req) {
        return svc.get(req.params.id);
    }, ɵ2$4 = function (svc, req) {
        return svc.save(req.body);
    }, ɵ3$4 = function (svc, req) {
        return svc.save(req.body);
    }, ɵ4$4 = function (svc, req) {
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
        var mimeType = result.headers['content-type'];
        var disposition = result.headers['content-disposition'];
        res.set("Content-Type", mimeType);
        res.setHeader('Content-disposition', disposition);
        res.send(result.body);
    };
    var Routes$3 = [
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
            onExecute: ɵ3$4
        },
        {
            key: 'delete',
            method: 'delete',
            path: 'datasets/:id',
            auth: true,
            onExecute: ɵ4$4,
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
        var router = options.router;
        if (!options.router) {
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

    var ɵ0$5 = function (svc, req) {
        return svc.search(req.query);
    }, ɵ1$5 = function (svc, req) {
        return svc.get(req.params.id);
    }, ɵ2$5 = function (svc, req) {
        return svc.save(req.body);
    }, ɵ3$5 = function (svc, req) {
        return svc.save(req.body);
    }, ɵ4$5 = function (svc, req) {
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
        var mimeType = result.headers['content-type'];
        var disposition = result.headers['content-disposition'];
        res.set("Content-Type", mimeType);
        res.setHeader('Content-disposition', disposition);
        res.send(result.body);
    };
    var Routes$4 = [
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
            onExecute: ɵ3$5
        },
        {
            key: 'delete',
            method: 'delete',
            path: 'maps/:id',
            auth: true,
            onExecute: ɵ4$5,
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
        var router = options.router;
        if (!options.router) {
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

    var ɵ0$6 = function (svc, req) {
        return svc.search(req.query);
    }, ɵ1$6 = function (svc, req) {
        return svc.get(req.params.id);
    }, ɵ2$6 = function (svc, req) {
        return svc.save(req.body);
    }, ɵ3$6 = function (svc, req) {
        return svc.save(req.body);
    }, ɵ4$6 = function (svc, req) {
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
        var mimeType = result.headers['content-type'];
        var disposition = result.headers['content-disposition'];
        res.set("Content-Type", mimeType);
        res.setHeader('Content-disposition', disposition);
        res.send(result.body);
    };
    var Routes$5 = [
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
            onExecute: ɵ3$6
        },
        {
            key: 'delete',
            method: 'delete',
            path: 'galleries/:id',
            auth: true,
            onExecute: ɵ4$6,
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
        var router = options.router;
        if (!options.router) {
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

    var ɵ0$7 = function (svc, req) {
        return svc.locate(req.query.location);
    }, ɵ1$7 = function (svc, req) {
        return svc.parseFile(req.files.file, req.body.format);
    }, ɵ2$7 = function (svc, req) {
        return svc.capabilities(null, req.query);
    }, ɵ3$7 = function (svc, req) {
        return svc.capabilities(req.params.id, req.query);
    }, ɵ4$7 = function (svc, req) {
        return svc.store(req.files.file, req.body.format);
    };
    var Routes$6 = [
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
            onExecute: ɵ3$7
        },
        {
            key: 'store',
            method: 'post',
            path: 'store',
            auth: true,
            onExecute: ɵ4$7
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
        var router = options.router;
        if (!options.router) {
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

    var ɵ0$8 = function (svc, req) {
        var query = new client.KGQuery(req.query);
        return svc.suggest(query);
    }, ɵ1$8 = function (svc, req) {
        var query = new client.KGQuery(req.query);
        return svc.types(query);
    }, ɵ2$8 = function (svc, req) {
        var query = new client.KGQuery(req.query);
        return svc.sources(query);
    };
    var Routes$7 = [
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
        var router = options.router;
        if (!options.router) {
            var express = require('express');
            if (!express) {
                throw new Error("KGServiceProxy() - Must provide" +
                    "'options.router' or include express as a dependency");
            }
            router = express.Router();
        }
        if (!router)
            throw new Error("KGServiceProxy() - " +
                "Unable to create proxy route, missing router");
        options.serviceClass = client.KGService;
        ServiceProxy.bindRoutes(router, Routes$7, options);
        return router;
    }

    var ɵ0$9 = function (svc, req) {
        return svc.searchItems(req.query);
    }, ɵ1$9 = function (svc, req) {
        return svc.searchGroups(req.query);
    }, ɵ2$9 = function (svc, req) {
        return svc.searchOrgs(req.query);
    }, ɵ3$8 = function (svc, req) {
        return svc.getItem(req.params.id);
    }, ɵ4$8 = function (svc, req) {
        return svc.getGroup(req.params.id);
    }, ɵ5$6 = function (svc, req) {
        return svc.getOrg(req.params.id);
    };
    var Routes$8 = [
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
            onExecute: ɵ3$8
        },
        {
            key: 'getGroup',
            method: 'get',
            path: 'agol/groups/:id',
            auth: false,
            onExecute: ɵ4$8
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
        var router = options.router;
        if (!options.router) {
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
        ServiceProxy.bindRoutes(router, Routes$8, options);
        return router;
    }

    exports.AgolServiceProxy = AgolServiceProxy;
    exports.DatasetServiceProxy = DatasetServiceProxy;
    exports.GalleryServiceProxy = GalleryServiceProxy;
    exports.ItemServiceProxy = ItemServiceProxy;
    exports.KGServiceProxy = KGServiceProxy;
    exports.LayerServiceProxy = LayerServiceProxy;
    exports.MapServiceProxy = MapServiceProxy;
    exports.NodeHttpClient = NodeHttpClient;
    exports.ServiceServiceProxy = ServiceServiceProxy;
    exports.UtilsServiceProxy = UtilsServiceProxy;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=geoplatform-client-node.umd.js.map
