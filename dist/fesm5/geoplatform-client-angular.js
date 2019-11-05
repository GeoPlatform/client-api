import { __extends, __decorate } from 'tslib';
import { HttpParams, HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse, HttpClientModule, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GPHttpClient, ItemService, Config, DatasetService, ServiceService, LayerService, MapService, GalleryService, UtilsService, KGService } from '@geoplatform/client';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var NG2HttpClient = /** @class */ (function (_super) {
    __extends(NG2HttpClient, _super);
    function NG2HttpClient(http, options) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        return _this;
    }
    NG2HttpClient.prototype.setZone = function (zone) {
        this.zone = zone;
    };
    /**
     *
     */
    NG2HttpClient.prototype.createRequestOpts = function (options) {
        var opts = {};
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
        var token = this.getToken();
        if (token) {
            opts.headers = opts.headers.set('Authorization', 'Bearer ' + token);
        }
        var cookie = this.getCookie();
        if (cookie) {
            opts.headers = opts.headers.set('Cookie', this.authCookieName + '=' + cookie);
        }
        if (opts.body) {
            return new HttpRequest(options.method, options.url, opts.body, opts);
        }
        else {
            return new HttpRequest(options.method, options.url, opts);
        }
    };
    /**
     * @param request - Angular HttpRequest object
     * @return resolving the response or an error
     */
    NG2HttpClient.prototype.execute = function (request) {
        var _this = this;
        var value = null;
        return new Promise(function (resolve, reject) {
            _this.http.request(request)
                .pipe(map(function (event) {
                if (event instanceof HttpResponse) {
                    return event.body;
                }
                return {};
            }))
                .subscribe(function (v) {
                value = v;
            }, function (err) {
                if (err instanceof HttpErrorResponse) {
                    reject(err.error);
                }
                else {
                    reject(err);
                }
            }, function () {
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

function ng2HttpClientFactory(http) {
    return new NG2HttpClient(http);
}
function itemServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new ItemService(Config.ualUrl, client);
}
function datasetServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new DatasetService(Config.ualUrl, client);
}
function serviceServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new ServiceService(Config.ualUrl, client);
}
function layerServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new LayerService(Config.ualUrl, client);
}
function mapServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new MapService(Config.ualUrl, client);
}
function galleryServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new GalleryService(Config.ualUrl, client);
}
function utilsServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new UtilsService(Config.ualUrl, client);
}
function kgServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new KGService(Config.ualUrl, client);
}
var GeoPlatformClientModule = /** @class */ (function () {
    function GeoPlatformClientModule() {
    }
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
    return GeoPlatformClientModule;
}());

// export * from './http/index';

/**
 * Generated bundle index. Do not edit.
 */

export { GeoPlatformClientModule, NG2HttpClient, datasetServiceProviderFactory, galleryServiceProviderFactory, itemServiceProviderFactory, layerServiceProviderFactory, mapServiceProviderFactory, ng2HttpClientFactory, serviceServiceProviderFactory, utilsServiceProviderFactory, kgServiceProviderFactory as ɵa };
//# sourceMappingURL=geoplatform-client-angular.js.map
