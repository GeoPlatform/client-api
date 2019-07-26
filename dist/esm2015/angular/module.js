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
    let client = ng2HttpClientFactory(http);
    return new ItemService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
export function datasetServiceProviderFactory(http) {
    /** @type {?} */
    let client = ng2HttpClientFactory(http);
    return new DatasetService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
export function serviceServiceProviderFactory(http) {
    /** @type {?} */
    let client = ng2HttpClientFactory(http);
    return new ServiceService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
export function layerServiceProviderFactory(http) {
    /** @type {?} */
    let client = ng2HttpClientFactory(http);
    return new LayerService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
export function mapServiceProviderFactory(http) {
    /** @type {?} */
    let client = ng2HttpClientFactory(http);
    return new MapService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
export function galleryServiceProviderFactory(http) {
    /** @type {?} */
    let client = ng2HttpClientFactory(http);
    return new GalleryService(Config["ualUrl"], client);
}
/**
 * @param {?} http
 * @return {?}
 */
export function utilsServiceProviderFactory(http) {
    /** @type {?} */
    let client = ng2HttpClientFactory(http);
    return new UtilsService(Config["ualUrl"], client);
}
export class GeoPlatformClientModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC9hbmd1bGFyLyIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFtQyxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBFLE9BQU8sRUFDSCxNQUFNLEVBQ04sV0FBVyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQzNDLFlBQVksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFDekQsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7OztBQUcxQyxNQUFNLCtCQUFnQyxJQUFpQjtJQUNuRCxPQUFPLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ2xDOzs7OztBQUNELE1BQU0scUNBQXNDLElBQWlCOztJQUN6RCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxPQUFPLElBQUksV0FBVyxDQUFDLE1BQU0sWUFBUyxNQUFNLENBQUMsQ0FBQztDQUNqRDs7Ozs7QUFDRCxNQUFNLHdDQUF5QyxJQUFpQjs7SUFDNUQsSUFBSSxNQUFNLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsT0FBTyxJQUFJLGNBQWMsQ0FBQyxNQUFNLFlBQVMsTUFBTSxDQUFDLENBQUM7Q0FDcEQ7Ozs7O0FBQ0QsTUFBTSx3Q0FBeUMsSUFBaUI7O0lBQzVELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxZQUFTLE1BQU0sQ0FBQyxDQUFDO0NBQ3BEOzs7OztBQUNELE1BQU0sc0NBQXVDLElBQWlCOztJQUMxRCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxPQUFPLElBQUksWUFBWSxDQUFDLE1BQU0sWUFBUyxNQUFNLENBQUMsQ0FBQztDQUNsRDs7Ozs7QUFDRCxNQUFNLG9DQUFxQyxJQUFpQjs7SUFDeEQsSUFBSSxNQUFNLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxNQUFNLFlBQVMsTUFBTSxDQUFDLENBQUM7Q0FDaEQ7Ozs7O0FBQ0QsTUFBTSx3Q0FBeUMsSUFBaUI7O0lBQzVELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxZQUFTLE1BQU0sQ0FBQyxDQUFDO0NBQ3BEOzs7OztBQUNELE1BQU0sc0NBQXVDLElBQWlCOztJQUMxRCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxPQUFPLElBQUksWUFBWSxDQUFDLE1BQU0sWUFBUyxNQUFNLENBQUMsQ0FBQztDQUNsRDtBQW1ERCxNQUFNOzs7WUFoREwsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLGdCQUFnQjtpQkFDbkI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQO3dCQUNJLE9BQU8sRUFBSyxhQUFhO3dCQUN6QixVQUFVLEVBQUUsb0JBQW9CO3dCQUNoQyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7cUJBQzdCO29CQUNEO3dCQUNJLE9BQU8sRUFBSyxXQUFXO3dCQUN2QixVQUFVLEVBQUUsMEJBQTBCO3dCQUN0QyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7cUJBQzdCO29CQUNEO3dCQUNJLE9BQU8sRUFBSyxjQUFjO3dCQUMxQixVQUFVLEVBQUUsNkJBQTZCO3dCQUN6QyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7cUJBQzdCO29CQUNEO3dCQUNJLE9BQU8sRUFBSyxjQUFjO3dCQUMxQixVQUFVLEVBQUUsNkJBQTZCO3dCQUN6QyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7cUJBQzdCO29CQUNEO3dCQUNJLE9BQU8sRUFBSyxZQUFZO3dCQUN4QixVQUFVLEVBQUUsMkJBQTJCO3dCQUN2QyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7cUJBQzdCO29CQUNEO3dCQUNJLE9BQU8sRUFBSyxVQUFVO3dCQUN0QixVQUFVLEVBQUUseUJBQXlCO3dCQUNyQyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7cUJBQzdCO29CQUNEO3dCQUNJLE9BQU8sRUFBSyxjQUFjO3dCQUMxQixVQUFVLEVBQUUsNkJBQTZCO3dCQUN6QyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7cUJBQzdCO29CQUNEO3dCQUNJLE9BQU8sRUFBSyxZQUFZO3dCQUN4QixVQUFVLEVBQUUsMkJBQTJCO3dCQUN2QyxJQUFJLEVBQVEsQ0FBRSxVQUFVLENBQUU7cUJBQzdCO2lCQUNKO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7XG4gICAgQ29uZmlnLCBHUEh0dHBDbGllbnQsXG4gICAgSXRlbVNlcnZpY2UsIERhdGFzZXRTZXJ2aWNlLCBTZXJ2aWNlU2VydmljZSxcbiAgICBMYXllclNlcnZpY2UsIE1hcFNlcnZpY2UsIEdhbGxlcnlTZXJ2aWNlLCBVdGlsc1NlcnZpY2Vcbn0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cbmltcG9ydCB7IE5HMkh0dHBDbGllbnQgfSBmcm9tICcuL2h0dHAvbmcnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBuZzJIdHRwQ2xpZW50RmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgcmV0dXJuIG5ldyBORzJIdHRwQ2xpZW50KGh0dHApO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGl0ZW1TZXJ2aWNlUHJvdmlkZXJGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICBsZXQgY2xpZW50ID0gbmcySHR0cENsaWVudEZhY3RvcnkoaHR0cCk7XG4gICAgcmV0dXJuIG5ldyBJdGVtU2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRhdGFzZXRTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICBsZXQgY2xpZW50ID0gbmcySHR0cENsaWVudEZhY3RvcnkoaHR0cCk7XG4gICAgcmV0dXJuIG5ldyBEYXRhc2V0U2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNlcnZpY2VTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICBsZXQgY2xpZW50ID0gbmcySHR0cENsaWVudEZhY3RvcnkoaHR0cCk7XG4gICAgcmV0dXJuIG5ldyBTZXJ2aWNlU2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxheWVyU2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgTGF5ZXJTZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbWFwU2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgTWFwU2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdhbGxlcnlTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICBsZXQgY2xpZW50ID0gbmcySHR0cENsaWVudEZhY3RvcnkoaHR0cCk7XG4gICAgcmV0dXJuIG5ldyBHYWxsZXJ5U2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHV0aWxzU2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgVXRpbHNTZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIE5HMkh0dHBDbGllbnQsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBuZzJIdHRwQ2xpZW50RmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIEl0ZW1TZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogaXRlbVNlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBEYXRhc2V0U2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGRhdGFzZXRTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgU2VydmljZVNlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBzZXJ2aWNlU2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIExheWVyU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGxheWVyU2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIE1hcFNlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBtYXBTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgR2FsbGVyeVNlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBnYWxsZXJ5U2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIFV0aWxzU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IHV0aWxzU2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEdlb1BsYXRmb3JtQ2xpZW50TW9kdWxlIHsgfVxuIl19