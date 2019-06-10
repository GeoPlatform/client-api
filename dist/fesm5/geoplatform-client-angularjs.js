import { __extends } from 'tslib';
import { resolve, reject } from 'q';
import * as angular from 'angular';
import { module as module$1, injector } from 'angular';
import { GPHttpClient, Config, QueryFactory, ItemService, UtilsService, TrackingService, DatasetService, ServiceService, LayerService, MapService, GalleryService } from '@geoplatform/client';

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
        var $http = this.$http || injector(['ng']).get('$http');
        return resolve($http)
            .then(function ($http) {
            if (typeof ($http) === 'undefined')
                throw new Error("Angular $http not resolved");
            // console.log(opts);
            return $http(opts);
        })
            .then(function (response) { return response.data; })
            .catch(function (response) { return reject(response.data); });
    };
    return NGHttpClient;
}(GPHttpClient));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
if (angular && typeof (module$1) !== 'undefined') {
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
    module$1('gpClient', [])
        .provider('gpConfig', function () {
        return {
            $get: function () {
                return Config;
            }
        };
    })
        .factory('gpQueryFactory', function () { return QueryFactory; })
        .factory('gpNgHttpClient', ['$http',
        function ($http) {
            return new NGHttpClient({ $http: $http });
        }
    ])
        .factory('gpTrackingServiceFactory', function () {
        return function (options) {
            return new TrackingService(options);
        };
    });
    /** @type {?} */
    var serviceClasses_1 = {
        'gpItemService': ItemService,
        'gpUtilsService': UtilsService,
        'gpDatasetService': DatasetService,
        'gpServiceService': ServiceService,
        'gpLayerService': LayerService,
        'gpMapService': MapService,
        'gpGalleryService': GalleryService
    };
    Object.keys(serviceClasses_1).forEach(function (name) {
        /** @type {?} */
        var svcClass = serviceClasses_1[name];
        module$1('gpClient')
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

export { NGHttpClient };

//# sourceMappingURL=geoplatform-client-angularjs.js.map