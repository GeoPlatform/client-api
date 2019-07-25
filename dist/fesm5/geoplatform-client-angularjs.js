import * as angular from 'angular';
import { module as module$1, injector } from 'angular';
import { __extends } from 'tslib';
import { GPHttpClient, ItemService, UtilsService, DatasetService, ServiceService, LayerService, MapService, GalleryService, Config, QueryFactory, TrackingService } from '@geoplatform/client';

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
        var $injector = injector(['ng']);
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
}(GPHttpClient));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Angular-aware instance of ItemService
 */
var /**
 * Angular-aware instance of ItemService
 */
NGItemService = /** @class */ (function (_super) {
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
}(ItemService));
/**
 * Angular-aware instance of DatasetService
 */
var /**
 * Angular-aware instance of DatasetService
 */
NGDatasetService = /** @class */ (function (_super) {
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
}(DatasetService));
/**
 * Angular-aware instance of GalleryService
 */
var /**
 * Angular-aware instance of GalleryService
 */
NGGalleryService = /** @class */ (function (_super) {
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
}(GalleryService));
/**
 * Angular-aware instance of LayerService
 */
var /**
 * Angular-aware instance of LayerService
 */
NGLayerService = /** @class */ (function (_super) {
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
}(LayerService));
/**
 * Angular-aware instance of MapService
 */
var /**
 * Angular-aware instance of MapService
 */
NGMapService = /** @class */ (function (_super) {
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
}(MapService));
/**
 * Angular-aware instance of ServiceService
 */
var /**
 * Angular-aware instance of ServiceService
 */
NGServiceService = /** @class */ (function (_super) {
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
}(ServiceService));
/**
 * Angular-aware instance of UtilsService
 */
var /**
 * Angular-aware instance of UtilsService
 */
NGUtilsService = /** @class */ (function (_super) {
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
}(UtilsService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
if (angular && typeof (module$1) !== 'undefined') {
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
    module$1('gpClient', [])
        .provider('gpConfig', function () {
        return {
            $get: function () {
                return Config;
            }
        };
    })
        .factory('gpQueryFactory', function () { return QueryFactory; })
        .factory('gpNgHttpClient', ['$http', '$q',
        function ($http, $q) {
            return new NGHttpClient({ $http: $http, $q: $q });
        }
    ])
        .factory('gpTrackingServiceFactory', function () {
        return function (options) {
            return new TrackingService(options);
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
        module$1('gpClient')
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

export { NGHttpClient };

//# sourceMappingURL=geoplatform-client-angularjs.js.map