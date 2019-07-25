/*
This software has been approved for release by the U.S. Department of the Interior. Although the software has been subjected to rigorous review, the DOI reserves the right to update the software as needed pursuant to further analysis and review. No warranty, expressed or implied, is made by the DOI or the U.S. Government as to the functionality of the software and related material nor shall the fact of release constitute any such warranty. Furthermore, the software is released on condition that neither the DOI nor the U.S. Government shall be held liable for any damages resulting from its authorized or unauthorized use.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('angular'), require('@geoplatform/client')) :
    typeof define === 'function' && define.amd ? define('@geoplatform/client/angularjs', ['exports', 'angular', '@geoplatform/client'], factory) :
    (factory((global.geoplatform = global.geoplatform || {}, global.geoplatform.client = global.geoplatform.client || {}, global.geoplatform.client.angularjs = {}),global.angular,global.geoplatform.client));
}(this, (function (exports,angular,client) { 'use strict';

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
            if (options && options["$http"])
                _this.$http = options["$http"];
            if (options && options["$q"])
                _this.$q = options["$q"];
            return _this;
        }
        /**
         * @param {?} options
         * @return {?}
         */
        NGHttpClient.prototype.createRequestOpts = /**
         * @param {?} options
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var opts = {
                    method: options["method"],
                    url: options["url"],
                    timeout: options["timeout"] || this.timeout
                };
                if (options["json"] === true || 'json' === options["responseType"])
                    opts["dataType"] = 'json';
                else if ('text' === options["responseType"])
                    opts["dataType"] = 'text';
                if (options["params"]) {
                    opts["params"] = options["params"];
                }
                if (options["data"]) {
                    opts["data"] = options["data"];
                }
                //set authorization token if one was provided
                if (this.token) {
                    /** @type {?} */
                    var token = this.token();
                    if (token) {
                        opts["headers"] = opts["headers"] || {};
                        opts["headers"].Authorization = 'Bearer ' + token;
                        opts["useXDomain"] = true;
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
                return opts;
            };
        /**
         * @param {?} opts
         * @return {?}
         */
        NGHttpClient.prototype.execute = /**
         * @param {?} opts
         * @return {?}
         */
            function (opts) {
                /** @type {?} */
                var $injector = angular.injector(['ng']);
                /** @type {?} */
                var $q = this.$q || $injector.get('$q');
                /** @type {?} */
                var $http = this.$http || $injector.get('$http');
                /** @type {?} */
                var deferred = $q.defer();
                $http(opts)
                    .then(function (response) { deferred.resolve(response.data); })
                    .catch(function (response) { deferred.reject(new Error(response.data)); });
                return /** @type {?} */ (deferred.promise.then(function (data) { return data; }));
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Angular-aware instance of ItemService
     */
    var /**
     * Angular-aware instance of ItemService
     */ NGItemService = /** @class */ (function (_super) {
        __extends(NGItemService, _super);
        function NGItemService(url, httpClient, $q) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.$q = $q;
            return _this;
        }
        /**
         * @param {?} arg
         * @return {?}
         */
        NGItemService.prototype.createPromise = /**
         * @param {?} arg
         * @return {?}
         */
            function (arg) {
                return this.$q(arg);
            };
        /**
         * @param {?} value
         * @return {?}
         */
        NGItemService.prototype.createAndResolvePromise = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return this.$q.resolve(value);
            };
        /**
         * @param {?} error
         * @return {?}
         */
        NGItemService.prototype.createAndRejectPromise = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                return this.$q.reject(error);
            };
        return NGItemService;
    }(client.ItemService));
    /**
     * Angular-aware instance of DatasetService
     */
    var /**
     * Angular-aware instance of DatasetService
     */ NGDatasetService = /** @class */ (function (_super) {
        __extends(NGDatasetService, _super);
        function NGDatasetService(url, httpClient, $q) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.$q = $q;
            return _this;
        }
        /**
         * @param {?} arg
         * @return {?}
         */
        NGDatasetService.prototype.createPromise = /**
         * @param {?} arg
         * @return {?}
         */
            function (arg) {
                return this.$q(arg);
            };
        /**
         * @param {?} value
         * @return {?}
         */
        NGDatasetService.prototype.createAndResolvePromise = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return this.$q.resolve(value);
            };
        /**
         * @param {?} error
         * @return {?}
         */
        NGDatasetService.prototype.createAndRejectPromise = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                return this.$q.reject(error);
            };
        return NGDatasetService;
    }(client.DatasetService));
    /**
     * Angular-aware instance of GalleryService
     */
    var /**
     * Angular-aware instance of GalleryService
     */ NGGalleryService = /** @class */ (function (_super) {
        __extends(NGGalleryService, _super);
        function NGGalleryService(url, httpClient, $q) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.$q = $q;
            return _this;
        }
        /**
         * @param {?} arg
         * @return {?}
         */
        NGGalleryService.prototype.createPromise = /**
         * @param {?} arg
         * @return {?}
         */
            function (arg) {
                return this.$q(arg);
            };
        /**
         * @param {?} value
         * @return {?}
         */
        NGGalleryService.prototype.createAndResolvePromise = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return this.$q.resolve(value);
            };
        /**
         * @param {?} error
         * @return {?}
         */
        NGGalleryService.prototype.createAndRejectPromise = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                return this.$q.reject(error);
            };
        return NGGalleryService;
    }(client.GalleryService));
    /**
     * Angular-aware instance of LayerService
     */
    var /**
     * Angular-aware instance of LayerService
     */ NGLayerService = /** @class */ (function (_super) {
        __extends(NGLayerService, _super);
        function NGLayerService(url, httpClient, $q) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.$q = $q;
            return _this;
        }
        /**
         * @param {?} arg
         * @return {?}
         */
        NGLayerService.prototype.createPromise = /**
         * @param {?} arg
         * @return {?}
         */
            function (arg) {
                return this.$q(arg);
            };
        /**
         * @param {?} value
         * @return {?}
         */
        NGLayerService.prototype.createAndResolvePromise = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return this.$q.resolve(value);
            };
        /**
         * @param {?} error
         * @return {?}
         */
        NGLayerService.prototype.createAndRejectPromise = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                return this.$q.reject(error);
            };
        return NGLayerService;
    }(client.LayerService));
    /**
     * Angular-aware instance of MapService
     */
    var /**
     * Angular-aware instance of MapService
     */ NGMapService = /** @class */ (function (_super) {
        __extends(NGMapService, _super);
        function NGMapService(url, httpClient, $q) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.$q = $q;
            return _this;
        }
        /**
         * @param {?} arg
         * @return {?}
         */
        NGMapService.prototype.createPromise = /**
         * @param {?} arg
         * @return {?}
         */
            function (arg) {
                return this.$q(arg);
            };
        /**
         * @param {?} value
         * @return {?}
         */
        NGMapService.prototype.createAndResolvePromise = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return this.$q.resolve(value);
            };
        /**
         * @param {?} error
         * @return {?}
         */
        NGMapService.prototype.createAndRejectPromise = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                return this.$q.reject(error);
            };
        return NGMapService;
    }(client.MapService));
    /**
     * Angular-aware instance of ServiceService
     */
    var /**
     * Angular-aware instance of ServiceService
     */ NGServiceService = /** @class */ (function (_super) {
        __extends(NGServiceService, _super);
        function NGServiceService(url, httpClient, $q) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.$q = $q;
            return _this;
        }
        /**
         * @param {?} arg
         * @return {?}
         */
        NGServiceService.prototype.createPromise = /**
         * @param {?} arg
         * @return {?}
         */
            function (arg) {
                return this.$q(arg);
            };
        /**
         * @param {?} value
         * @return {?}
         */
        NGServiceService.prototype.createAndResolvePromise = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return this.$q.resolve(value);
            };
        /**
         * @param {?} error
         * @return {?}
         */
        NGServiceService.prototype.createAndRejectPromise = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                return this.$q.reject(error);
            };
        return NGServiceService;
    }(client.ServiceService));
    /**
     * Angular-aware instance of UtilsService
     */
    var /**
     * Angular-aware instance of UtilsService
     */ NGUtilsService = /** @class */ (function (_super) {
        __extends(NGUtilsService, _super);
        function NGUtilsService(url, httpClient, $q) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.$q = $q;
            return _this;
        }
        /**
         * @param {?} arg
         * @return {?}
         */
        NGUtilsService.prototype.createPromise = /**
         * @param {?} arg
         * @return {?}
         */
            function (arg) {
                return this.$q(arg);
            };
        /**
         * @param {?} value
         * @return {?}
         */
        NGUtilsService.prototype.createAndResolvePromise = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return this.$q.resolve(value);
            };
        /**
         * @param {?} error
         * @return {?}
         */
        NGUtilsService.prototype.createAndRejectPromise = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                return this.$q.reject(error);
            };
        return NGUtilsService;
    }(client.UtilsService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    if (angular && typeof (angular.module) !== 'undefined') {
        /** @type {?} */
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
        /** @type {?} */
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
            /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NGHttpClient = NGHttpClient;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=geoplatform-client-angularjs.umd.js.map