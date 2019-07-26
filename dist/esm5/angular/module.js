/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Config, ItemService, DatasetService, ServiceService, LayerService, MapService, GalleryService, UtilsService, KGService } from '@geoplatform/client';
import { NG2HttpClient } from './http/ng';
/**
 * @param {?} http
 * @return {?}
 */
export function ng2HttpClientFactory(http) {
    return new NG2HttpClient(http);
}
/**
 * @param {?} http
 * @return {?}
 */
export function itemServiceProviderFactory(http) {
    /** @type {?} */
    var client = ng2HttpClientFactory(http);
    return new ItemService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
export function datasetServiceProviderFactory(http) {
    /** @type {?} */
    var client = ng2HttpClientFactory(http);
    return new DatasetService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
export function serviceServiceProviderFactory(http) {
    /** @type {?} */
    var client = ng2HttpClientFactory(http);
    return new ServiceService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
export function layerServiceProviderFactory(http) {
    /** @type {?} */
    var client = ng2HttpClientFactory(http);
    return new LayerService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
export function mapServiceProviderFactory(http) {
    /** @type {?} */
    var client = ng2HttpClientFactory(http);
    return new MapService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
export function galleryServiceProviderFactory(http) {
    /** @type {?} */
    var client = ng2HttpClientFactory(http);
    return new GalleryService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
export function utilsServiceProviderFactory(http) {
    /** @type {?} */
    var client = ng2HttpClientFactory(http);
    return new UtilsService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
export function kgServiceProviderFactory(http) {
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
export { GeoPlatformClientModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC9hbmd1bGFyLyIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFtQyxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBFLE9BQU8sRUFDSCxNQUFNLEVBQ04sV0FBVyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUN6RCxVQUFVLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQ3RELE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7QUFHMUMsTUFBTSwrQkFBZ0MsSUFBaUI7SUFDbkQsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNsQzs7Ozs7QUFDRCxNQUFNLHFDQUFzQyxJQUFpQjs7SUFDekQsSUFBSSxNQUFNLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxNQUFNLFlBQVMsTUFBTSxDQUFDLENBQUM7Q0FDakQ7Ozs7O0FBQ0QsTUFBTSx3Q0FBeUMsSUFBaUI7O0lBQzVELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxZQUFTLE1BQU0sQ0FBQyxDQUFDO0NBQ3BEOzs7OztBQUNELE1BQU0sd0NBQXlDLElBQWlCOztJQUM1RCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sWUFBUyxNQUFNLENBQUMsQ0FBQztDQUNwRDs7Ozs7QUFDRCxNQUFNLHNDQUF1QyxJQUFpQjs7SUFDMUQsSUFBSSxNQUFNLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsT0FBTyxJQUFJLFlBQVksQ0FBQyxNQUFNLFlBQVMsTUFBTSxDQUFDLENBQUM7Q0FDbEQ7Ozs7O0FBQ0QsTUFBTSxvQ0FBcUMsSUFBaUI7O0lBQ3hELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxVQUFVLENBQUMsTUFBTSxZQUFTLE1BQU0sQ0FBQyxDQUFDO0NBQ2hEOzs7OztBQUNELE1BQU0sd0NBQXlDLElBQWlCOztJQUM1RCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sWUFBUyxNQUFNLENBQUMsQ0FBQztDQUNwRDs7Ozs7QUFDRCxNQUFNLHNDQUF1QyxJQUFpQjs7SUFDMUQsSUFBSSxNQUFNLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsT0FBTyxJQUFJLFlBQVksQ0FBQyxNQUFNLFlBQVMsTUFBTSxDQUFDLENBQUM7Q0FDbEQ7Ozs7O0FBQ0QsTUFBTSxtQ0FBb0MsSUFBaUI7O0lBQ3ZELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxTQUFTLENBQUMsTUFBTSxZQUFTLE1BQU0sQ0FBQyxDQUFDO0NBQy9DOzs7OztnQkFHQSxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osZ0JBQWdCO3FCQUNuQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1A7NEJBQ0ksT0FBTyxFQUFLLGFBQWE7NEJBQ3pCLFVBQVUsRUFBRSxvQkFBb0I7NEJBQ2hDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTt5QkFDN0I7d0JBQ0Q7NEJBQ0ksT0FBTyxFQUFLLFdBQVc7NEJBQ3ZCLFVBQVUsRUFBRSwwQkFBMEI7NEJBQ3RDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTt5QkFDN0I7d0JBQ0Q7NEJBQ0ksT0FBTyxFQUFLLGNBQWM7NEJBQzFCLFVBQVUsRUFBRSw2QkFBNkI7NEJBQ3pDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTt5QkFDN0I7d0JBQ0Q7NEJBQ0ksT0FBTyxFQUFLLGNBQWM7NEJBQzFCLFVBQVUsRUFBRSw2QkFBNkI7NEJBQ3pDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTt5QkFDN0I7d0JBQ0Q7NEJBQ0ksT0FBTyxFQUFLLFlBQVk7NEJBQ3hCLFVBQVUsRUFBRSwyQkFBMkI7NEJBQ3ZDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTt5QkFDN0I7d0JBQ0Q7NEJBQ0ksT0FBTyxFQUFLLFVBQVU7NEJBQ3RCLFVBQVUsRUFBRSx5QkFBeUI7NEJBQ3JDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTt5QkFDN0I7d0JBQ0Q7NEJBQ0ksT0FBTyxFQUFLLGNBQWM7NEJBQzFCLFVBQVUsRUFBRSw2QkFBNkI7NEJBQ3pDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTt5QkFDN0I7d0JBQ0Q7NEJBQ0ksT0FBTyxFQUFLLFlBQVk7NEJBQ3hCLFVBQVUsRUFBRSwyQkFBMkI7NEJBQ3ZDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTt5QkFDN0I7d0JBQ0Q7NEJBQ0ksT0FBTyxFQUFLLFNBQVM7NEJBQ3JCLFVBQVUsRUFBRSx3QkFBd0I7NEJBQ3BDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTt5QkFDN0I7cUJBQ0o7aUJBQ0o7O2tDQXRHRDs7U0F1R2EsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQge1xuICAgIENvbmZpZywgR1BIdHRwQ2xpZW50LFxuICAgIEl0ZW1TZXJ2aWNlLCBEYXRhc2V0U2VydmljZSwgU2VydmljZVNlcnZpY2UsIExheWVyU2VydmljZSxcbiAgICBNYXBTZXJ2aWNlLCBHYWxsZXJ5U2VydmljZSwgVXRpbHNTZXJ2aWNlLCBLR1NlcnZpY2Vcbn0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cbmltcG9ydCB7IE5HMkh0dHBDbGllbnQgfSBmcm9tICcuL2h0dHAvbmcnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBuZzJIdHRwQ2xpZW50RmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgcmV0dXJuIG5ldyBORzJIdHRwQ2xpZW50KGh0dHApO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGl0ZW1TZXJ2aWNlUHJvdmlkZXJGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICBsZXQgY2xpZW50ID0gbmcySHR0cENsaWVudEZhY3RvcnkoaHR0cCk7XG4gICAgcmV0dXJuIG5ldyBJdGVtU2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRhdGFzZXRTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICBsZXQgY2xpZW50ID0gbmcySHR0cENsaWVudEZhY3RvcnkoaHR0cCk7XG4gICAgcmV0dXJuIG5ldyBEYXRhc2V0U2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNlcnZpY2VTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICBsZXQgY2xpZW50ID0gbmcySHR0cENsaWVudEZhY3RvcnkoaHR0cCk7XG4gICAgcmV0dXJuIG5ldyBTZXJ2aWNlU2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxheWVyU2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgTGF5ZXJTZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbWFwU2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgTWFwU2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdhbGxlcnlTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICBsZXQgY2xpZW50ID0gbmcySHR0cENsaWVudEZhY3RvcnkoaHR0cCk7XG4gICAgcmV0dXJuIG5ldyBHYWxsZXJ5U2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHV0aWxzU2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgVXRpbHNTZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24ga2dTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICBsZXQgY2xpZW50ID0gbmcySHR0cENsaWVudEZhY3RvcnkoaHR0cCk7XG4gICAgcmV0dXJuIG5ldyBLR1NlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgTkcySHR0cENsaWVudCxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IG5nMkh0dHBDbGllbnRGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgSXRlbVNlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBpdGVtU2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIERhdGFzZXRTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogZGF0YXNldFNlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBTZXJ2aWNlU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IHNlcnZpY2VTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgTGF5ZXJTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogbGF5ZXJTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgTWFwU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IG1hcFNlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBHYWxsZXJ5U2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGdhbGxlcnlTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogdXRpbHNTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgS0dTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeToga2dTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgR2VvUGxhdGZvcm1DbGllbnRNb2R1bGUgeyB9XG4iXX0=