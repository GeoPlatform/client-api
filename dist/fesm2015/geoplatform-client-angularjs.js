import * as angular from 'angular';
import { module as module$1, injector } from 'angular';
import { GPHttpClient, ItemService, UtilsService, DatasetService, ServiceService, LayerService, MapService, GalleryService, Config, QueryFactory, TrackingService } from '@geoplatform/client';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NGHttpClient extends GPHttpClient {
    /**
     * @param {?=} options
     */
    constructor(options) {
        super(options);
        if (typeof (angular) === 'undefined' || angular === null) {
            throw new Error("AngularJS could not be found globally");
        }
        if (options && options["$http"])
            this.$http = options["$http"];
        if (options && options["$q"])
            this.$q = options["$q"];
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(options) {
        /** @type {?} */
        let opts = {
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
            let token = this.token();
            if (token) {
                opts["headers"] = opts["headers"] || {};
                opts["headers"].Authorization = 'Bearer ' + token;
                opts["useXDomain"] = true;
            }
        }
        //copy over user-supplied options
        if (options["options"]) {
            for (let o in options["options"]) {
                if (options["options"].hasOwnProperty(o)) {
                    opts[o] = options["options"][o];
                }
            }
        }
        return opts;
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    execute(opts) {
        /** @type {?} */
        let $injector = injector(['ng']);
        /** @type {?} */
        let $q = this.$q || $injector.get('$q');
        /** @type {?} */
        let $http = this.$http || $injector.get('$http');
        /** @type {?} */
        let deferred = $q.defer();
        $http(opts)
            .then(response => { deferred.resolve(response.data); })
            .catch(response => { deferred.reject(new Error(response.data)); });
        return /** @type {?} */ (deferred.promise.then((data) => data));
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
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Angular-aware instance of ItemService
 */
class NGItemService extends ItemService {
    /**
     * @param {?} url
     * @param {?} httpClient
     * @param {?} $q
     */
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    createPromise(arg) {
        return this.$q(arg);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/**
 * Angular-aware instance of DatasetService
 */
class NGDatasetService extends DatasetService {
    /**
     * @param {?} url
     * @param {?} httpClient
     * @param {?} $q
     */
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    createPromise(arg) {
        return this.$q(arg);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/**
 * Angular-aware instance of GalleryService
 */
class NGGalleryService extends GalleryService {
    /**
     * @param {?} url
     * @param {?} httpClient
     * @param {?} $q
     */
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    createPromise(arg) {
        return this.$q(arg);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/**
 * Angular-aware instance of LayerService
 */
class NGLayerService extends LayerService {
    /**
     * @param {?} url
     * @param {?} httpClient
     * @param {?} $q
     */
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    createPromise(arg) {
        return this.$q(arg);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/**
 * Angular-aware instance of MapService
 */
class NGMapService extends MapService {
    /**
     * @param {?} url
     * @param {?} httpClient
     * @param {?} $q
     */
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    createPromise(arg) {
        return this.$q(arg);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/**
 * Angular-aware instance of ServiceService
 */
class NGServiceService extends ServiceService {
    /**
     * @param {?} url
     * @param {?} httpClient
     * @param {?} $q
     */
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    createPromise(arg) {
        return this.$q(arg);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/**
 * Angular-aware instance of UtilsService
 */
class NGUtilsService extends UtilsService {
    /**
     * @param {?} url
     * @param {?} httpClient
     * @param {?} $q
     */
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    createPromise(arg) {
        return this.$q(arg);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
if (angular && typeof (module$1) !== 'undefined') {
    /** @type {?} */
    let serviceFactory = function (gpNgHttpClient, svcClass, url, $q) {
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
    const serviceClasses = {
        'gpItemService': NGItemService,
        'gpUtilsService': NGUtilsService,
        'gpDatasetService': NGDatasetService,
        'gpServiceService': NGServiceService,
        'gpLayerService': NGLayerService,
        'gpMapService': NGMapService,
        'gpGalleryService': NGGalleryService
    };
    Object.keys(serviceClasses).forEach((name) => {
        /** @type {?} */
        let svcClass = serviceClasses[name];
        module$1('gpClient')
            /*
                Service for each client service class that uses the
                currently configured settings when created.  Note the
                settings may change after the service singleton is
                created, in which case the factory option should be used.
             */
            .service(name, ['gpNgHttpClient', 'gpConfig', '$q',
            function (gpNgHttpClient, gpConfig, $q) {
                return serviceFactory(gpNgHttpClient, svcClass, gpConfig.ualUrl, $q);
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
                    return serviceFactory(gpNgHttpClient, svcClass, url || gpConfig.ualUrl, $q);
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