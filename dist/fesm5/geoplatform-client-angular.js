import { __extends } from 'tslib';
import { map } from 'rxjs/operators';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpRequest, HttpHeaders, HttpParams, HttpResponse, HttpClient, HttpClientModule } from '@angular/common/http';
import { GPHttpClient, Config, ItemService, DatasetService, ServiceService, LayerService, MapService, GalleryService, UtilsService, KGService } from '@geoplatform/client';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NG2HttpClient = /** @class */ (function (_super) {
    __extends(NG2HttpClient, _super);
    function NG2HttpClient(http, options) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        return _this;
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    NG2HttpClient.prototype.setZone = /**
     * @param {?} zone
     * @return {?}
     */
    function (zone) {
        this.zone = zone;
    };
    /**
     *
     */
    /**
     *
     * @param {?} options
     * @return {?}
     */
    NG2HttpClient.prototype.createRequestOpts = /**
     *
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var opts = {};
        if (options["options"] && options["options"].responseType) {
            opts.responseType = options["options"].responseType;
        }
        else
            opts.responseType = 'json'; //default response type
        if (options["params"]) {
            opts.params = new HttpParams({ fromObject: options["params"] });
        }
        if (options["data"]) {
            opts.body = options["data"];
        }
        opts.headers = new HttpHeaders();
        /** @type {?} */
        var token = this.getToken();
        if (token) {
            opts.headers.set('Authorization', 'Bearer ' + token);
        }
        if (opts.body) {
            return new HttpRequest(options["method"], options["url"], opts.body, opts);
        }
        else {
            return new HttpRequest(options["method"], options["url"], opts);
        }
    };
    /**
     * @param request - Angular HttpRequest object
     * @return resolving the response or an error
     */
    /**
     * @param {?} request - Angular HttpRequest object
     * @return {?} resolving the response or an error
     */
    NG2HttpClient.prototype.execute = /**
     * @param {?} request - Angular HttpRequest object
     * @return {?} resolving the response or an error
     */
    function (request) {
        var _this = this;
        /** @type {?} */
        var value = null;
        return new Promise(function (resolve, reject) {
            _this.http.request(request)
                .pipe(map(function (event) {
                if (event instanceof HttpResponse) {
                    return (/** @type {?} */ (event)).body;
                }
                return {};
            }))
                .subscribe(function (v) { value = v; }, function (err) { reject(err); }, function () {
                if (_this.zone) {
                    _this.zone.run(function () {
                        resolve(value);
                    });
                }
                else {
                    resolve(value);
                }
            });
        });
    };
    return NG2HttpClient;
}(GPHttpClient));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @return {?}
 */
function ng2HttpClientFactory(http) {
    return new NG2HttpClient(http);
}
/**
 * @param {?} http
 * @return {?}
 */
function itemServiceProviderFactory(http) {
    /** @type {?} */
    var client = ng2HttpClientFactory(http);
    return new ItemService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
function datasetServiceProviderFactory(http) {
    /** @type {?} */
    var client = ng2HttpClientFactory(http);
    return new DatasetService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
function serviceServiceProviderFactory(http) {
    /** @type {?} */
    var client = ng2HttpClientFactory(http);
    return new ServiceService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
function layerServiceProviderFactory(http) {
    /** @type {?} */
    var client = ng2HttpClientFactory(http);
    return new LayerService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
function mapServiceProviderFactory(http) {
    /** @type {?} */
    var client = ng2HttpClientFactory(http);
    return new MapService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
function galleryServiceProviderFactory(http) {
    /** @type {?} */
    var client = ng2HttpClientFactory(http);
    return new GalleryService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
function utilsServiceProviderFactory(http) {
    /** @type {?} */
    var client = ng2HttpClientFactory(http);
    return new UtilsService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
function kgServiceProviderFactory(http) {
    /** @type {?} */
    var client = ng2HttpClientFactory(http);
    return new KGService(Config["ualUrl"], client);
}
var GeoPlatformClientModule = /** @class */ (function () {
    function GeoPlatformClientModule() {
    }
    GeoPlatformClientModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HttpClientModule
                    ],
                    providers: [
                        {
                            provide: NG2HttpClient,
                            useFactory: ng2HttpClientFactory,
                            deps: [HttpClient]
                        },
                        {
                            provide: ItemService,
                            useFactory: itemServiceProviderFactory,
                            deps: [HttpClient]
                        },
                        {
                            provide: DatasetService,
                            useFactory: datasetServiceProviderFactory,
                            deps: [HttpClient]
                        },
                        {
                            provide: ServiceService,
                            useFactory: serviceServiceProviderFactory,
                            deps: [HttpClient]
                        },
                        {
                            provide: LayerService,
                            useFactory: layerServiceProviderFactory,
                            deps: [HttpClient]
                        },
                        {
                            provide: MapService,
                            useFactory: mapServiceProviderFactory,
                            deps: [HttpClient]
                        },
                        {
                            provide: GalleryService,
                            useFactory: galleryServiceProviderFactory,
                            deps: [HttpClient]
                        },
                        {
                            provide: UtilsService,
                            useFactory: utilsServiceProviderFactory,
                            deps: [HttpClient]
                        },
                        {
                            provide: KGService,
                            useFactory: kgServiceProviderFactory,
                            deps: [HttpClient]
                        }
                    ]
                },] }
    ];
    return GeoPlatformClientModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { GeoPlatformClientModule, NG2HttpClient, ng2HttpClientFactory, itemServiceProviderFactory, datasetServiceProviderFactory, serviceServiceProviderFactory, layerServiceProviderFactory, mapServiceProviderFactory, galleryServiceProviderFactory, utilsServiceProviderFactory, kgServiceProviderFactory as ɵa };

//# sourceMappingURL=geoplatform-client-angular.js.map