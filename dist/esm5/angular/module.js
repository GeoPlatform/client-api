/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Config, ItemService, DatasetService, ServiceService, LayerService, MapService, GalleryService, UtilsService } from '@geoplatform/client';
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
                        }
                    ]
                },] }
    ];
    return GeoPlatformClientModule;
}());
export { GeoPlatformClientModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC9hbmd1bGFyLyIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFtQyxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBFLE9BQU8sRUFDSCxNQUFNLEVBQ04sV0FBVyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQzNDLFlBQVksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFDekQsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7OztBQUcxQyxNQUFNLCtCQUFnQyxJQUFpQjtJQUNuRCxPQUFPLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ2xDOzs7OztBQUNELE1BQU0scUNBQXNDLElBQWlCOztJQUN6RCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxPQUFPLElBQUksV0FBVyxDQUFDLE1BQU0sWUFBUyxNQUFNLENBQUMsQ0FBQztDQUNqRDs7Ozs7QUFDRCxNQUFNLHdDQUF5QyxJQUFpQjs7SUFDNUQsSUFBSSxNQUFNLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsT0FBTyxJQUFJLGNBQWMsQ0FBQyxNQUFNLFlBQVMsTUFBTSxDQUFDLENBQUM7Q0FDcEQ7Ozs7O0FBQ0QsTUFBTSx3Q0FBeUMsSUFBaUI7O0lBQzVELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxZQUFTLE1BQU0sQ0FBQyxDQUFDO0NBQ3BEOzs7OztBQUNELE1BQU0sc0NBQXVDLElBQWlCOztJQUMxRCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxPQUFPLElBQUksWUFBWSxDQUFDLE1BQU0sWUFBUyxNQUFNLENBQUMsQ0FBQztDQUNsRDs7Ozs7QUFDRCxNQUFNLG9DQUFxQyxJQUFpQjs7SUFDeEQsSUFBSSxNQUFNLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxNQUFNLFlBQVMsTUFBTSxDQUFDLENBQUM7Q0FDaEQ7Ozs7O0FBQ0QsTUFBTSx3Q0FBeUMsSUFBaUI7O0lBQzVELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxZQUFTLE1BQU0sQ0FBQyxDQUFDO0NBQ3BEOzs7OztBQUNELE1BQU0sc0NBQXVDLElBQWlCOztJQUMxRCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxPQUFPLElBQUksWUFBWSxDQUFDLE1BQU0sWUFBUyxNQUFNLENBQUMsQ0FBQztDQUNsRDs7Ozs7Z0JBR0EsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLGdCQUFnQjtxQkFDbkI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNQOzRCQUNJLE9BQU8sRUFBSyxhQUFhOzRCQUN6QixVQUFVLEVBQUUsb0JBQW9COzRCQUNoQyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7eUJBQzdCO3dCQUNEOzRCQUNJLE9BQU8sRUFBSyxXQUFXOzRCQUN2QixVQUFVLEVBQUUsMEJBQTBCOzRCQUN0QyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7eUJBQzdCO3dCQUNEOzRCQUNJLE9BQU8sRUFBSyxjQUFjOzRCQUMxQixVQUFVLEVBQUUsNkJBQTZCOzRCQUN6QyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7eUJBQzdCO3dCQUNEOzRCQUNJLE9BQU8sRUFBSyxjQUFjOzRCQUMxQixVQUFVLEVBQUUsNkJBQTZCOzRCQUN6QyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7eUJBQzdCO3dCQUNEOzRCQUNJLE9BQU8sRUFBSyxZQUFZOzRCQUN4QixVQUFVLEVBQUUsMkJBQTJCOzRCQUN2QyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7eUJBQzdCO3dCQUNEOzRCQUNJLE9BQU8sRUFBSyxVQUFVOzRCQUN0QixVQUFVLEVBQUUseUJBQXlCOzRCQUNyQyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7eUJBQzdCO3dCQUNEOzRCQUNJLE9BQU8sRUFBSyxjQUFjOzRCQUMxQixVQUFVLEVBQUUsNkJBQTZCOzRCQUN6QyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7eUJBQzdCO3dCQUNEOzRCQUNJLE9BQU8sRUFBSyxZQUFZOzRCQUN4QixVQUFVLEVBQUUsMkJBQTJCOzRCQUN2QyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7eUJBQzdCO3FCQUNKO2lCQUNKOztrQ0E3RkQ7O1NBOEZhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHtcbiAgICBDb25maWcsIEdQSHR0cENsaWVudCxcbiAgICBJdGVtU2VydmljZSwgRGF0YXNldFNlcnZpY2UsIFNlcnZpY2VTZXJ2aWNlLFxuICAgIExheWVyU2VydmljZSwgTWFwU2VydmljZSwgR2FsbGVyeVNlcnZpY2UsIFV0aWxzU2VydmljZVxufSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuaW1wb3J0IHsgTkcySHR0cENsaWVudCB9IGZyb20gJy4vaHR0cC9uZyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG5nMkh0dHBDbGllbnRGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICByZXR1cm4gbmV3IE5HMkh0dHBDbGllbnQoaHR0cCk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXRlbVNlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IEl0ZW1TZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGF0YXNldFNlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IERhdGFzZXRTZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2VydmljZVNlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IFNlcnZpY2VTZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICBsZXQgY2xpZW50ID0gbmcySHR0cENsaWVudEZhY3RvcnkoaHR0cCk7XG4gICAgcmV0dXJuIG5ldyBMYXllclNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBtYXBTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICBsZXQgY2xpZW50ID0gbmcySHR0cENsaWVudEZhY3RvcnkoaHR0cCk7XG4gICAgcmV0dXJuIG5ldyBNYXBTZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2FsbGVyeVNlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IEdhbGxlcnlTZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24gdXRpbHNTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICBsZXQgY2xpZW50ID0gbmcySHR0cENsaWVudEZhY3RvcnkoaHR0cCk7XG4gICAgcmV0dXJuIG5ldyBVdGlsc1NlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgTkcySHR0cENsaWVudCxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IG5nMkh0dHBDbGllbnRGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgSXRlbVNlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBpdGVtU2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIERhdGFzZXRTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogZGF0YXNldFNlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBTZXJ2aWNlU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IHNlcnZpY2VTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgTGF5ZXJTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogbGF5ZXJTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgTWFwU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IG1hcFNlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBHYWxsZXJ5U2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGdhbGxlcnlTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogdXRpbHNTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgR2VvUGxhdGZvcm1DbGllbnRNb2R1bGUgeyB9XG4iXX0=