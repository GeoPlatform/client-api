import { __extends } from 'tslib';
import * as angular from 'angular';
import { injector, module } from 'angular';
import { GPHttpClient, ItemService, DatasetService, GalleryService, LayerService, MapService, ServiceService, UtilsService, AssociationService, Config, QueryFactory, TrackingService } from '@geoplatform/client';

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
        var $injector = injector(['ng']);
        var $q = this.$q || $injector.get('$q');
        var $http = this.$http || $injector.get('$http');
        var deferred = $q.defer();
        $http(opts)
            .then(function (response) {
            deferred.resolve(response.data);
        })
            .catch(function (response) {
            var err = null, arg = response.data;
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
}(GPHttpClient));

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
}(ItemService));
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
}(DatasetService));
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
}(GalleryService));
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
}(LayerService));
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
}(MapService));
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
}(ServiceService));
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
}(UtilsService));
/** Angular-aware instance of AssociationService */
var NGAssociationService = /** @class */ (function (_super) {
    __extends(NGAssociationService, _super);
    function NGAssociationService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    NGAssociationService.prototype.createPromise = function (arg) {
        return this.$q(arg);
    };
    NGAssociationService.prototype.createAndResolvePromise = function (value) {
        return this.$q.resolve(value);
    };
    NGAssociationService.prototype.createAndRejectPromise = function (error) {
        return this.$q.reject(error);
    };
    return NGAssociationService;
}(AssociationService));

if (angular && typeof (module) !== 'undefined') {
    var serviceFactory_1 = function (gpNgHttpClient, svcClass, url, $q) {
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
    var serviceClasses_1 = {
        'gpItemService': NGItemService,
        'gpUtilsService': NGUtilsService,
        'gpDatasetService': NGDatasetService,
        'gpServiceService': NGServiceService,
        'gpLayerService': NGLayerService,
        'gpMapService': NGMapService,
        'gpGalleryService': NGGalleryService,
        'gpAssociationService': NGAssociationService
    };
    Object.keys(serviceClasses_1).forEach(function (name) {
        var svcClass = serviceClasses_1[name];
        module('gpClient')
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
 * Generated bundle index. Do not edit.
 */

export { NGHttpClient };
//# sourceMappingURL=geoplatform-client-angularjs.js.map
