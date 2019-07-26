import { map } from 'rxjs/operators';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpRequest, HttpHeaders, HttpParams, HttpResponse, HttpClient, HttpClientModule } from '@angular/common/http';
import { GPHttpClient, Config, ItemService, DatasetService, ServiceService, LayerService, MapService, GalleryService, UtilsService } from '@geoplatform/client';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NG2HttpClient extends GPHttpClient {
    /**
     * @param {?} http
     * @param {?=} options
     */
    constructor(http, options) {
        super(options);
        this.http = http;
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    setZone(zone) {
        this.zone = zone;
    }
    /**
     *
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(options) {
        /** @type {?} */
        let opts = {};
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
        let token = this.getToken();
        if (token) {
            opts.headers.set('Authorization', 'Bearer ' + token);
        }
        if (opts.body) {
            return new HttpRequest(options["method"], options["url"], opts.body, opts);
        }
        else {
            return new HttpRequest(options["method"], options["url"], opts);
        }
    }
    /**
     * @param {?} request - Angular HttpRequest object
     * @return {?} resolving the response or an error
     */
    execute(request) {
        /** @type {?} */
        let value = null;
        return new Promise((resolve, reject) => {
            this.http.request(request)
                .pipe(map((event) => {
                if (event instanceof HttpResponse) {
                    return (/** @type {?} */ (event)).body;
                }
                return {};
            }))
                .subscribe((v) => { value = v; }, (err) => { reject(err); }, () => {
                if (this.zone) {
                    this.zone.run(() => {
                        resolve(value);
                    });
                }
                else {
                    resolve(value);
                }
            });
        });
        /*
                .toPromise()
                .then( (result) => Promise.resolve(result))
                .catch( (err : any) => {
                    // console.log("NG2HttpClient.catch() - " + JSON.stringify(err));
                    if (err instanceof HttpErrorResponse) {
                        let msg = "An error occurred communicating with the GeoPlatform API";
                        if(err.error && err.error.error && err.error.error.message) {
                            msg = err.error.error.message;
                        } else if (err.error && err.error.message) {
                            msg = err.error.message;
                        } else if(err.message) {
                            msg = err.message;
                        }
                        throw new Error(msg);
                    }
                    return {};
                });
                */
    }
}

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
    let client = ng2HttpClientFactory(http);
    return new ItemService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
function datasetServiceProviderFactory(http) {
    /** @type {?} */
    let client = ng2HttpClientFactory(http);
    return new DatasetService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
function serviceServiceProviderFactory(http) {
    /** @type {?} */
    let client = ng2HttpClientFactory(http);
    return new ServiceService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
function layerServiceProviderFactory(http) {
    /** @type {?} */
    let client = ng2HttpClientFactory(http);
    return new LayerService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
function mapServiceProviderFactory(http) {
    /** @type {?} */
    let client = ng2HttpClientFactory(http);
    return new MapService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
function galleryServiceProviderFactory(http) {
    /** @type {?} */
    let client = ng2HttpClientFactory(http);
    return new GalleryService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
function utilsServiceProviderFactory(http) {
    /** @type {?} */
    let client = ng2HttpClientFactory(http);
    return new UtilsService(Config["ualUrl"], client);
}
class GeoPlatformClientModule {
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
                    }
                ]
            },] }
];

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

export { GeoPlatformClientModule, NG2HttpClient, ng2HttpClientFactory, itemServiceProviderFactory, datasetServiceProviderFactory, serviceServiceProviderFactory, layerServiceProviderFactory, mapServiceProviderFactory, galleryServiceProviderFactory, utilsServiceProviderFactory };

//# sourceMappingURL=geoplatform-client-angular.js.map