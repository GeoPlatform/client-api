/*
This software has been approved for release by the U.S. Department of the Interior. Although the software has been subjected to rigorous review, the DOI reserves the right to update the software as needed pursuant to further analysis and review. No warranty, expressed or implied, is made by the DOI or the U.S. Government as to the functionality of the software and related material nor shall the fact of release constitute any such warranty. Furthermore, the software is released on condition that neither the DOI nor the U.S. Government shall be held liable for any damages resulting from its authorized or unauthorized use.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('angular'), require('@geoplatform/client')) :
    typeof define === 'function' && define.amd ? define('@geoplatform/client/angularjs', ['exports', 'angular', '@geoplatform/client'], factory) :
    (global = global || self, factory((global.geoplatform = global.geoplatform || {}, global.geoplatform.client = global.geoplatform.client || {}, global.geoplatform.client.angularjs = {}), global.angular, global.geoplatform.client));
}(this, function (exports, angular, client) { 'use strict';

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

    var NGHttpClient = /** @class */ (function (_super) {
        __extends(NGHttpClient, _super);
        /**
         * @param options.timeout
         * @param options.token - the bearer token or a function to retrieve it
         * @param options.$http - angular $http service instance
         */
        function NGHttpClient(options) {
            var _this = _super.call(this, options) || this;
            if (typeof (angular) === 'undefined' || angular === null) {
                throw new Error("AngularJS could not be found globally");
            }
            if (options && options.$http)
                _this.$http = options.$http;
            if (options && options.$q)
                _this.$q = options.$q;
            return _this;
        }
        NGHttpClient.prototype.createRequestOpts = function (options) {
            var opts = {
                method: options.method,
                url: options.url,
                timeout: options.timeout || this.timeout
            };
            if (options.json === true || 'json' === options.responseType)
                opts.dataType = 'json';
            else if ('text' === options.responseType)
                opts.dataType = 'text';
            if (options.params) {
                opts.params = options.params;
            }
            if (options.data) {
                opts.data = options.data;
            }
            //set headers requested by user config
            opts.headers = {};
            if (options.headers) {
                Object.assign(opts.headers, options.headers);
            }
            //set authorization token if one was provided
            if (this.token) {
                var token = this.token();
                if (token) {
                    opts.headers.Authorization = 'Bearer ' + token;
                    opts.useXDomain = true;
                }
            }
            //copy over user-supplied options
            if (options.options) {
                for (var o in options.options) {
                    if (options.options.hasOwnProperty(o)) {
                        opts[o] = options.options[o];
                    }
                }
            }
            return opts;
        };
        NGHttpClient.prototype.execute = function (opts) {
            var $injector = angular.injector(['ng']);
            var $q = this.$q || $injector.get('$q');
            var $http = this.$http || $injector.get('$http');
            var deferred = $q.defer();
            $http(opts)
                .then(function (response) { deferred.resolve(response.data); })
                .catch(function (response) { deferred.reject(new Error(response.data)); });
            return deferred.promise.then(function (data) { return data; });
            // return Promise.resolve( $http )
            // .then($http => {
            //     if(typeof($http) === 'undefined')
            //         throw new Error("Angular $http not resolved");
            //
            //     // console.log(opts);
            //     return $http(opts);
            // })
            // .then(response=> () => {
            //     return $timeout(()=>{return response.data;});
            // })
            // .catch(response=> { throw new Error(response.data); });
        };
        return NGHttpClient;
    }(client.GPHttpClient));

    /*
     * NOTICE:
     *
     * These services are angular aware (using angular's $q wrapper)
     * to ensure that any Promises returned are ultimately gated
     * through a $q instance and therefore will trigger a digest
     * upon completion.
     *
     * If you manually create an instance that is not angular aware,
     * you will need to wrap any response handler's manipulation of data
     * with $scope.$apply, $timeout, or an equivalent to trigger a digest
     */
    /** Angular-aware instance of ItemService */
    var NGItemService = /** @class */ (function (_super) {
        __extends(NGItemService, _super);
        function NGItemService(url, httpClient, $q) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.$q = $q;
            return _this;
        }
        NGItemService.prototype.createPromise = function (arg) {
            return this.$q(arg);
        };
        NGItemService.prototype.createAndResolvePromise = function (value) {
            return this.$q.resolve(value);
        };
        NGItemService.prototype.createAndRejectPromise = function (error) {
            return this.$q.reject(error);
        };
        return NGItemService;
    }(client.ItemService));
    /** Angular-aware instance of DatasetService */
    var NGDatasetService = /** @class */ (function (_super) {
        __extends(NGDatasetService, _super);
        function NGDatasetService(url, httpClient, $q) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.$q = $q;
            return _this;
        }
        NGDatasetService.prototype.createPromise = function (arg) {
            return this.$q(arg);
        };
        NGDatasetService.prototype.createAndResolvePromise = function (value) {
            return this.$q.resolve(value);
        };
        NGDatasetService.prototype.createAndRejectPromise = function (error) {
            return this.$q.reject(error);
        };
        return NGDatasetService;
    }(client.DatasetService));
    /** Angular-aware instance of GalleryService */
    var NGGalleryService = /** @class */ (function (_super) {
        __extends(NGGalleryService, _super);
        function NGGalleryService(url, httpClient, $q) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.$q = $q;
            return _this;
        }
        NGGalleryService.prototype.createPromise = function (arg) {
            return this.$q(arg);
        };
        NGGalleryService.prototype.createAndResolvePromise = function (value) {
            return this.$q.resolve(value);
        };
        NGGalleryService.prototype.createAndRejectPromise = function (error) {
            return this.$q.reject(error);
        };
        return NGGalleryService;
    }(client.GalleryService));
    /** Angular-aware instance of LayerService */
    var NGLayerService = /** @class */ (function (_super) {
        __extends(NGLayerService, _super);
        function NGLayerService(url, httpClient, $q) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.$q = $q;
            return _this;
        }
        NGLayerService.prototype.createPromise = function (arg) {
            return this.$q(arg);
        };
        NGLayerService.prototype.createAndResolvePromise = function (value) {
            return this.$q.resolve(value);
        };
        NGLayerService.prototype.createAndRejectPromise = function (error) {
            return this.$q.reject(error);
        };
        return NGLayerService;
    }(client.LayerService));
    /** Angular-aware instance of MapService */
    var NGMapService = /** @class */ (function (_super) {
        __extends(NGMapService, _super);
        function NGMapService(url, httpClient, $q) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.$q = $q;
            return _this;
        }
        NGMapService.prototype.createPromise = function (arg) {
            return this.$q(arg);
        };
        NGMapService.prototype.createAndResolvePromise = function (value) {
            return this.$q.resolve(value);
        };
        NGMapService.prototype.createAndRejectPromise = function (error) {
            return this.$q.reject(error);
        };
        return NGMapService;
    }(client.MapService));
    /** Angular-aware instance of ServiceService */
    var NGServiceService = /** @class */ (function (_super) {
        __extends(NGServiceService, _super);
        function NGServiceService(url, httpClient, $q) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.$q = $q;
            return _this;
        }
        NGServiceService.prototype.createPromise = function (arg) {
            return this.$q(arg);
        };
        NGServiceService.prototype.createAndResolvePromise = function (value) {
            return this.$q.resolve(value);
        };
        NGServiceService.prototype.createAndRejectPromise = function (error) {
            return this.$q.reject(error);
        };
        return NGServiceService;
    }(client.ServiceService));
    /** Angular-aware instance of UtilsService */
    var NGUtilsService = /** @class */ (function (_super) {
        __extends(NGUtilsService, _super);
        function NGUtilsService(url, httpClient, $q) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.$q = $q;
            return _this;
        }
        NGUtilsService.prototype.createPromise = function (arg) {
            return this.$q(arg);
        };
        NGUtilsService.prototype.createAndResolvePromise = function (value) {
            return this.$q.resolve(value);
        };
        NGUtilsService.prototype.createAndRejectPromise = function (error) {
            return this.$q.reject(error);
        };
        return NGUtilsService;
    }(client.UtilsService));

    if (angular && typeof (angular.module) !== 'undefined') {
        var serviceFactory_1 = function (gpNgHttpClient, svcClass, url, $q) {
            if (NGItemService === svcClass || NGDatasetService === svcClass ||
                NGServiceService === svcClass || NGLayerService === svcClass ||
                NGMapService === svcClass || NGGalleryService === svcClass ||
                NGUtilsService === svcClass) {
                return new svcClass(url, gpNgHttpClient, $q);
            }
            return new svcClass(url, gpNgHttpClient);
        };
        /*
         * Define AngularJS module that can be included in downstream applications
         *
         * Example:
         *
         *  angular.module('myApp', [ 'ui-router', 'gpClient' ])
         *  .component('myComponent', {
         *    bindings: { },
         *    template: "<div></div>",
         *    controller: function(gpQueryFactory, gpItemService) {
         *       this.$onInit = function() {
         *          gpItemService.search( gpQueryFactory() ).then( response => { ... });
         *       };
         *    }
         *  ]);
         */
        angular.module('gpClient', [])
            .provider('gpConfig', function () {
            return {
                $get: function () {
                    return client.Config;
                }
            };
        })
            .factory('gpQueryFactory', function () { return client.QueryFactory; })
            .factory('gpNgHttpClient', ['$http', '$q',
            function ($http, $q) {
                return new NGHttpClient({ $http: $http, $q: $q });
            }
        ])
            .factory('gpTrackingServiceFactory', function () {
            return function (options) {
                return new client.TrackingService(options);
            };
        });
        /*
         * Expose Service instances in the 'gpClient' module
         * These services are angular aware using angular's $q wrapper
         */
        var serviceClasses_1 = {
            'gpItemService': NGItemService,
            'gpUtilsService': NGUtilsService,
            'gpDatasetService': NGDatasetService,
            'gpServiceService': NGServiceService,
            'gpLayerService': NGLayerService,
            'gpMapService': NGMapService,
            'gpGalleryService': NGGalleryService
        };
        Object.keys(serviceClasses_1).forEach(function (name) {
            var svcClass = serviceClasses_1[name];
            angular.module('gpClient')
                /*
                    Service for each client service class that uses the
                    currently configured settings when created.  Note the
                    settings may change after the service singleton is
                    created, in which case the factory option should be used.
                 */
                .service(name, ['gpNgHttpClient', 'gpConfig', '$q',
                function (gpNgHttpClient, gpConfig, $q) {
                    return serviceFactory_1(gpNgHttpClient, svcClass, gpConfig.ualUrl, $q);
                }
            ])
                /*
                    Factory for creating services for each client service class
                    which uses a customizable endpoint to request data from. Use
                    this if services need to be able to change API endpoints
                    during application runtime.
                 */
                .factory(name + 'Factory', ['gpNgHttpClient', 'gpConfig', '$q',
                function (gpNgHttpClient, gpConfig, $q) {
                    return function (url) {
                        return serviceFactory_1(gpNgHttpClient, svcClass, url || gpConfig.ualUrl, $q);
                    };
                }
            ]);
        });
    }

    exports.NGHttpClient = NGHttpClient;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=geoplatform-client-angularjs.umd.js.map
