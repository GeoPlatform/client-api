import * as angular from 'angular';
import { injector, module } from 'angular';
import { GPHttpClient, ItemService, DatasetService, GalleryService, LayerService, MapService, ServiceService, UtilsService, AssociationService, Config, QueryFactory, TrackingService } from '@geoplatform/client';

class NGHttpClient extends GPHttpClient {
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     * @param options.$http - angular $http service instance
     */
    constructor(options) {
        super(options);
        if (typeof (angular) === 'undefined' || angular === null) {
            throw new Error("AngularJS could not be found globally");
        }
        if (options && options.$http)
            this.$http = options.$http;
        if (options && options.$q)
            this.$q = options.$q;
    }
    createRequestOpts(options) {
        let opts = {
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
            let token = this.token();
            if (token) {
                opts.headers.Authorization = 'Bearer ' + token;
                opts.useXDomain = true;
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
        return opts;
    }
    execute(opts) {
        let $injector = injector(['ng']);
        let $q = this.$q || $injector.get('$q');
        let $http = this.$http || $injector.get('$http');
        let deferred = $q.defer();
        $http(opts)
            .then(response => {
            deferred.resolve(response.data);
        })
            .catch(response => {
            let err = null, arg = response.data;
            if (typeof (arg) === 'object' && arg.message) {
                //wrapping json error object
                err = new Error(arg.message);
                err.status = arg.statusCode || 500;
            }
            else if (typeof (arg) === 'string') {
                //just containing string message
                err = new Error(arg);
            }
            else {
                err = new Error("An error occurred issuing the request");
            }
            deferred.reject(err);
        });
        return deferred.promise.then((data) => data);
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
class NGItemService extends ItemService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/** Angular-aware instance of DatasetService */
class NGDatasetService extends DatasetService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/** Angular-aware instance of GalleryService */
class NGGalleryService extends GalleryService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/** Angular-aware instance of LayerService */
class NGLayerService extends LayerService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/** Angular-aware instance of MapService */
class NGMapService extends MapService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/** Angular-aware instance of ServiceService */
class NGServiceService extends ServiceService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/** Angular-aware instance of UtilsService */
class NGUtilsService extends UtilsService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/** Angular-aware instance of AssociationService */
class NGAssociationService extends AssociationService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}

if (angular && typeof (module) !== 'undefined') {
    let serviceFactory = function (gpNgHttpClient, svcClass, url, $q) {
        if (NGItemService === svcClass || NGDatasetService === svcClass ||
            NGServiceService === svcClass || NGLayerService === svcClass ||
            NGMapService === svcClass || NGGalleryService === svcClass ||
            NGUtilsService === svcClass || NGAssociationService === svcClass) {
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
    module('gpClient', [])
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
    /*
     * Expose Service instances in the 'gpClient' module
     * These services are angular aware using angular's $q wrapper
     */
    const serviceClasses = {
        'gpItemService': NGItemService,
        'gpUtilsService': NGUtilsService,
        'gpDatasetService': NGDatasetService,
        'gpServiceService': NGServiceService,
        'gpLayerService': NGLayerService,
        'gpMapService': NGMapService,
        'gpGalleryService': NGGalleryService,
        'gpAssociationService': NGAssociationService
    };
    Object.keys(serviceClasses).forEach((name) => {
        let svcClass = serviceClasses[name];
        module('gpClient')
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
 * Generated bundle index. Do not edit.
 */

export { NGHttpClient };
//# sourceMappingURL=geoplatform-client-angularjs.js.map
