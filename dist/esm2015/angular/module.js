/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Config, ItemService, DatasetService, ServiceService, LayerService, MapService, GalleryService, UtilsService } from '@geoplatform/client';
import NG2HttpClient from './http/ng';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC9hbmd1bGFyLyIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFtQyxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBFLE9BQU8sRUFDSCxNQUFNLEVBQ04sV0FBVyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQzNDLFlBQVksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFDekQsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixPQUFPLGFBQWEsTUFBTSxXQUFXLENBQUM7Ozs7O0FBR3RDLE1BQU0sK0JBQWdDLElBQWlCO0lBQ25ELE9BQU8sSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDbEM7Ozs7O0FBQ0QsTUFBTSxxQ0FBc0MsSUFBaUI7O0lBQ3pELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxXQUFXLENBQUMsTUFBTSxZQUFTLE1BQU0sQ0FBQyxDQUFDO0NBQ2pEOzs7OztBQUNELE1BQU0sd0NBQXlDLElBQWlCOztJQUM1RCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sWUFBUyxNQUFNLENBQUMsQ0FBQztDQUNwRDs7Ozs7QUFDRCxNQUFNLHdDQUF5QyxJQUFpQjs7SUFDNUQsSUFBSSxNQUFNLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsT0FBTyxJQUFJLGNBQWMsQ0FBQyxNQUFNLFlBQVMsTUFBTSxDQUFDLENBQUM7Q0FDcEQ7Ozs7O0FBQ0QsTUFBTSxzQ0FBdUMsSUFBaUI7O0lBQzFELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxZQUFZLENBQUMsTUFBTSxZQUFTLE1BQU0sQ0FBQyxDQUFDO0NBQ2xEOzs7OztBQUNELE1BQU0sb0NBQXFDLElBQWlCOztJQUN4RCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxPQUFPLElBQUksVUFBVSxDQUFDLE1BQU0sWUFBUyxNQUFNLENBQUMsQ0FBQztDQUNoRDs7Ozs7QUFDRCxNQUFNLHdDQUF5QyxJQUFpQjs7SUFDNUQsSUFBSSxNQUFNLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsT0FBTyxJQUFJLGNBQWMsQ0FBQyxNQUFNLFlBQVMsTUFBTSxDQUFDLENBQUM7Q0FDcEQ7Ozs7O0FBQ0QsTUFBTSxzQ0FBdUMsSUFBaUI7O0lBQzFELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxZQUFZLENBQUMsTUFBTSxZQUFTLE1BQU0sQ0FBQyxDQUFDO0NBQ2xEO0FBbURELE1BQU07OztZQWhETCxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osZ0JBQWdCO2lCQUNuQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1A7d0JBQ0ksT0FBTyxFQUFLLGFBQWE7d0JBQ3pCLFVBQVUsRUFBRSxvQkFBb0I7d0JBQ2hDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7b0JBQ0Q7d0JBQ0ksT0FBTyxFQUFLLFdBQVc7d0JBQ3ZCLFVBQVUsRUFBRSwwQkFBMEI7d0JBQ3RDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7b0JBQ0Q7d0JBQ0ksT0FBTyxFQUFLLGNBQWM7d0JBQzFCLFVBQVUsRUFBRSw2QkFBNkI7d0JBQ3pDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7b0JBQ0Q7d0JBQ0ksT0FBTyxFQUFLLGNBQWM7d0JBQzFCLFVBQVUsRUFBRSw2QkFBNkI7d0JBQ3pDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7b0JBQ0Q7d0JBQ0ksT0FBTyxFQUFLLFlBQVk7d0JBQ3hCLFVBQVUsRUFBRSwyQkFBMkI7d0JBQ3ZDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7b0JBQ0Q7d0JBQ0ksT0FBTyxFQUFLLFVBQVU7d0JBQ3RCLFVBQVUsRUFBRSx5QkFBeUI7d0JBQ3JDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7b0JBQ0Q7d0JBQ0ksT0FBTyxFQUFLLGNBQWM7d0JBQzFCLFVBQVUsRUFBRSw2QkFBNkI7d0JBQ3pDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7b0JBQ0Q7d0JBQ0ksT0FBTyxFQUFLLFlBQVk7d0JBQ3hCLFVBQVUsRUFBRSwyQkFBMkI7d0JBQ3ZDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtxQkFDN0I7aUJBQ0o7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHtcbiAgICBDb25maWcsIEdQSHR0cENsaWVudCxcbiAgICBJdGVtU2VydmljZSwgRGF0YXNldFNlcnZpY2UsIFNlcnZpY2VTZXJ2aWNlLFxuICAgIExheWVyU2VydmljZSwgTWFwU2VydmljZSwgR2FsbGVyeVNlcnZpY2UsIFV0aWxzU2VydmljZVxufSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuaW1wb3J0IE5HMkh0dHBDbGllbnQgZnJvbSAnLi9odHRwL25nJztcblxuXG5leHBvcnQgZnVuY3Rpb24gbmcySHR0cENsaWVudEZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIHJldHVybiBuZXcgTkcySHR0cENsaWVudChodHRwKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpdGVtU2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgSXRlbVNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkYXRhc2V0U2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgRGF0YXNldFNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXJ2aWNlU2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgU2VydmljZVNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsYXllclNlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IExheWVyU2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG1hcFNlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IE1hcFNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnYWxsZXJ5U2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgR2FsbGVyeVNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1dGlsc1NlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IFV0aWxzU2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBORzJIdHRwQ2xpZW50LFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogbmcySHR0cENsaWVudEZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBJdGVtU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGl0ZW1TZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgRGF0YXNldFNlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBkYXRhc2V0U2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIFNlcnZpY2VTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogc2VydmljZVNlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBMYXllclNlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBsYXllclNlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBNYXBTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogbWFwU2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIEdhbGxlcnlTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogZ2FsbGVyeVNlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBVdGlsc1NlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiB1dGlsc1NlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW9QbGF0Zm9ybUNsaWVudE1vZHVsZSB7IH1cbiJdfQ==