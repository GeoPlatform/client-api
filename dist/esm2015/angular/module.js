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
/**
 * @param {?} http
 * @return {?}
 */
export function kgServiceProviderFactory(http) {
    /** @type {?} */
    let client = ng2HttpClientFactory(http);
    return new KGService(Config["ualUrl"], client);
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
                    },
                    {
                        provide: KGService,
                        useFactory: kgServiceProviderFactory,
                        deps: [HttpClient]
                    }
                ]
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC9hbmd1bGFyLyIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFtQyxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBFLE9BQU8sRUFDSCxNQUFNLEVBQ04sV0FBVyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUN6RCxVQUFVLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQ3RELE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7QUFHMUMsTUFBTSwrQkFBZ0MsSUFBaUI7SUFDbkQsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNsQzs7Ozs7QUFDRCxNQUFNLHFDQUFzQyxJQUFpQjs7SUFDekQsSUFBSSxNQUFNLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxNQUFNLFlBQVMsTUFBTSxDQUFDLENBQUM7Q0FDakQ7Ozs7O0FBQ0QsTUFBTSx3Q0FBeUMsSUFBaUI7O0lBQzVELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxZQUFTLE1BQU0sQ0FBQyxDQUFDO0NBQ3BEOzs7OztBQUNELE1BQU0sd0NBQXlDLElBQWlCOztJQUM1RCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sWUFBUyxNQUFNLENBQUMsQ0FBQztDQUNwRDs7Ozs7QUFDRCxNQUFNLHNDQUF1QyxJQUFpQjs7SUFDMUQsSUFBSSxNQUFNLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsT0FBTyxJQUFJLFlBQVksQ0FBQyxNQUFNLFlBQVMsTUFBTSxDQUFDLENBQUM7Q0FDbEQ7Ozs7O0FBQ0QsTUFBTSxvQ0FBcUMsSUFBaUI7O0lBQ3hELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxVQUFVLENBQUMsTUFBTSxZQUFTLE1BQU0sQ0FBQyxDQUFDO0NBQ2hEOzs7OztBQUNELE1BQU0sd0NBQXlDLElBQWlCOztJQUM1RCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sWUFBUyxNQUFNLENBQUMsQ0FBQztDQUNwRDs7Ozs7QUFDRCxNQUFNLHNDQUF1QyxJQUFpQjs7SUFDMUQsSUFBSSxNQUFNLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsT0FBTyxJQUFJLFlBQVksQ0FBQyxNQUFNLFlBQVMsTUFBTSxDQUFDLENBQUM7Q0FDbEQ7Ozs7O0FBQ0QsTUFBTSxtQ0FBb0MsSUFBaUI7O0lBQ3ZELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxTQUFTLENBQUMsTUFBTSxZQUFTLE1BQU0sQ0FBQyxDQUFDO0NBQy9DO0FBd0RELE1BQU07OztZQXJETCxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osZ0JBQWdCO2lCQUNuQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1A7d0JBQ0ksT0FBTyxFQUFLLGFBQWE7d0JBQ3pCLFVBQVUsRUFBRSxvQkFBb0I7d0JBQ2hDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7b0JBQ0Q7d0JBQ0ksT0FBTyxFQUFLLFdBQVc7d0JBQ3ZCLFVBQVUsRUFBRSwwQkFBMEI7d0JBQ3RDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7b0JBQ0Q7d0JBQ0ksT0FBTyxFQUFLLGNBQWM7d0JBQzFCLFVBQVUsRUFBRSw2QkFBNkI7d0JBQ3pDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7b0JBQ0Q7d0JBQ0ksT0FBTyxFQUFLLGNBQWM7d0JBQzFCLFVBQVUsRUFBRSw2QkFBNkI7d0JBQ3pDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7b0JBQ0Q7d0JBQ0ksT0FBTyxFQUFLLFlBQVk7d0JBQ3hCLFVBQVUsRUFBRSwyQkFBMkI7d0JBQ3ZDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7b0JBQ0Q7d0JBQ0ksT0FBTyxFQUFLLFVBQVU7d0JBQ3RCLFVBQVUsRUFBRSx5QkFBeUI7d0JBQ3JDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7b0JBQ0Q7d0JBQ0ksT0FBTyxFQUFLLGNBQWM7d0JBQzFCLFVBQVUsRUFBRSw2QkFBNkI7d0JBQ3pDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7b0JBQ0Q7d0JBQ0ksT0FBTyxFQUFLLFlBQVk7d0JBQ3hCLFVBQVUsRUFBRSwyQkFBMkI7d0JBQ3ZDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7b0JBQ0Q7d0JBQ0ksT0FBTyxFQUFLLFNBQVM7d0JBQ3JCLFVBQVUsRUFBRSx3QkFBd0I7d0JBQ3BDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7aUJBQ0o7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHtcbiAgICBDb25maWcsIEdQSHR0cENsaWVudCxcbiAgICBJdGVtU2VydmljZSwgRGF0YXNldFNlcnZpY2UsIFNlcnZpY2VTZXJ2aWNlLCBMYXllclNlcnZpY2UsXG4gICAgTWFwU2VydmljZSwgR2FsbGVyeVNlcnZpY2UsIFV0aWxzU2VydmljZSwgS0dTZXJ2aWNlXG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5pbXBvcnQgeyBORzJIdHRwQ2xpZW50IH0gZnJvbSAnLi9odHRwL25nJztcblxuXG5leHBvcnQgZnVuY3Rpb24gbmcySHR0cENsaWVudEZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIHJldHVybiBuZXcgTkcySHR0cENsaWVudChodHRwKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpdGVtU2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgSXRlbVNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkYXRhc2V0U2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgRGF0YXNldFNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXJ2aWNlU2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgU2VydmljZVNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsYXllclNlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IExheWVyU2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG1hcFNlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IE1hcFNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnYWxsZXJ5U2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgR2FsbGVyeVNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1dGlsc1NlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IFV0aWxzU2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGtnU2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgS0dTZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIE5HMkh0dHBDbGllbnQsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBuZzJIdHRwQ2xpZW50RmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIEl0ZW1TZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogaXRlbVNlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBEYXRhc2V0U2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGRhdGFzZXRTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgU2VydmljZVNlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBzZXJ2aWNlU2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIExheWVyU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGxheWVyU2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIE1hcFNlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBtYXBTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgR2FsbGVyeVNlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBnYWxsZXJ5U2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIFV0aWxzU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IHV0aWxzU2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIEtHU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGtnU2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEdlb1BsYXRmb3JtQ2xpZW50TW9kdWxlIHsgfVxuIl19