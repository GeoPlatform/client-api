import { HttpParams, HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse, HttpClientModule, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GPHttpClient, ItemService, Config, DatasetService, ServiceService, LayerService, MapService, GalleryService, UtilsService, KGService } from '@geoplatform/client';
import { __decorate } from 'tslib';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class NG2HttpClient extends GPHttpClient {
    constructor(http, options) {
        super(options);
        this.http = http;
    }
    setZone(zone) {
        this.zone = zone;
    }
    /**
     *
     */
    createRequestOpts(options) {
        let opts = {};
        if (options.options && options.options.responseType) {
            opts.responseType = options.options.responseType;
        }
        else if (options.responseType) {
            opts.responseType = options.responseType;
        }
        else {
            opts.responseType = 'json'; //default response type
        }
        if (options.params) {
            opts.params = new HttpParams({ fromObject: options.params });
        }
        if (options.data) {
            opts.body = options.data;
        }
        opts.headers = new HttpHeaders(options.headers || {});
        //set authorization token if one was provided
        let token = this.getToken();
        if (token) {
            opts.headers = opts.headers.set('Authorization', 'Bearer ' + token);
        }
        if (opts.body) {
            return new HttpRequest(options.method, options.url, opts.body, opts);
        }
        else {
            return new HttpRequest(options.method, options.url, opts);
        }
    }
    /**
     * @param request - Angular HttpRequest object
     * @return resolving the response or an error
     */
    execute(request) {
        let value = null;
        return new Promise((resolve, reject) => {
            this.http.request(request)
                .pipe(map((event) => {
                if (event instanceof HttpResponse) {
                    return event.body;
                }
                return {};
            }))
                .subscribe((v) => {
                value = v;
            }, (err) => {
                if (err instanceof HttpErrorResponse) {
                    reject(err.error);
                }
                else {
                    reject(err);
                }
            }, () => {
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
    }
}

function ng2HttpClientFactory(http) {
    return new NG2HttpClient(http);
}
function itemServiceProviderFactory(http) {
    let client = ng2HttpClientFactory(http);
    return new ItemService(Config.ualUrl, client);
}
function datasetServiceProviderFactory(http) {
    let client = ng2HttpClientFactory(http);
    return new DatasetService(Config.ualUrl, client);
}
function serviceServiceProviderFactory(http) {
    let client = ng2HttpClientFactory(http);
    return new ServiceService(Config.ualUrl, client);
}
function layerServiceProviderFactory(http) {
    let client = ng2HttpClientFactory(http);
    return new LayerService(Config.ualUrl, client);
}
function mapServiceProviderFactory(http) {
    let client = ng2HttpClientFactory(http);
    return new MapService(Config.ualUrl, client);
}
function galleryServiceProviderFactory(http) {
    let client = ng2HttpClientFactory(http);
    return new GalleryService(Config.ualUrl, client);
}
function utilsServiceProviderFactory(http) {
    let client = ng2HttpClientFactory(http);
    return new UtilsService(Config.ualUrl, client);
}
function kgServiceProviderFactory(http) {
    let client = ng2HttpClientFactory(http);
    return new KGService(Config.ualUrl, client);
}
let GeoPlatformClientModule = class GeoPlatformClientModule {
};
GeoPlatformClientModule = __decorate([
    NgModule({
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
    })
], GeoPlatformClientModule);

// export * from './http/index';

/**
 * Generated bundle index. Do not edit.
 */

export { GeoPlatformClientModule, NG2HttpClient, datasetServiceProviderFactory, galleryServiceProviderFactory, itemServiceProviderFactory, layerServiceProviderFactory, mapServiceProviderFactory, ng2HttpClientFactory, serviceServiceProviderFactory, utilsServiceProviderFactory, kgServiceProviderFactory as ɵa };
//# sourceMappingURL=geoplatform-client-angular.js.map
