/*
This software has been approved for release by the U.S. Department of the Interior. Although the software has been subjected to rigorous review, the DOI reserves the right to update the software as needed pursuant to further analysis and review. No warranty, expressed or implied, is made by the DOI or the U.S. Government as to the functionality of the software and related material nor shall the fact of release constitute any such warranty. Furthermore, the software is released on condition that neither the DOI nor the U.S. Government shall be held liable for any damages resulting from its authorized or unauthorized use.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('q'), require('angular'), require('@geoplatform/client')) :
    typeof define === 'function' && define.amd ? define('@geoplatform/client/angularjs', ['exports', 'q', 'angular', '@geoplatform/client'], factory) :
    (factory((global.geoplatform = global.geoplatform || {}, global.geoplatform.client = global.geoplatform.client || {}, global.geoplatform.client.angularjs = {}),global.Q,global.angular,global.geoplatform.client));
}(this, (function (exports,Q,angular,client) { 'use strict';

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
                var $http = this.$http || angular.injector(['ng']).get('$http');
                return Q.resolve($http)
                    .then(function ($http) {
                    if (typeof ($http) === 'undefined')
                        throw new Error("Angular $http not resolved");
                    // console.log(opts);
                    return $http(opts);
                })
                    .then(function (response) { return response.data; })
                    .catch(function (response) { return Q.reject(response.data); });
            };
        return NGHttpClient;
    }(client.GPHttpClient));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    if (angular && typeof (angular.module) !== 'undefined') {
        /** @type {?} */
        var serviceFactory_1 = function (gpNgHttpClient, svcClass, url) {
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
            .factory('gpNgHttpClient', ['$http',
            function ($http) {
                return new NGHttpClient({ $http: $http });
            }
        ])
            .factory('gpTrackingServiceFactory', function () {
            return function (options) {
                return new client.TrackingService(options);
            };
        });
        /** @type {?} */
        var serviceClasses_1 = {
            'gpItemService': client.ItemService,
            'gpUtilsService': client.UtilsService,
            'gpDatasetService': client.DatasetService,
            'gpServiceService': client.ServiceService,
            'gpLayerService': client.LayerService,
            'gpMapService': client.MapService,
            'gpGalleryService': client.GalleryService
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
                .service(name, ['gpNgHttpClient', 'gpConfig',
                function (gpNgHttpClient, gpConfig) {
                    return serviceFactory_1(gpNgHttpClient, svcClass, gpConfig.ualUrl);
                }
            ])
                /*
                    Factory for creating services for each client service class
                    which uses a customizable endpoint to request data from. Use
                    this if services need to be able to change API endpoints
                    during application runtime.
                 */
                .factory(name + 'Factory', ['gpNgHttpClient', function (gpNgHttpClient) {
                    return function (url) {
                        return serviceFactory_1(gpNgHttpClient, svcClass, url);
                    };
                }]);
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