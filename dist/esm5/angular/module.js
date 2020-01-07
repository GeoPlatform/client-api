import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Config, ItemService, DatasetService, ServiceService, LayerService, MapService, GalleryService, UtilsService, KGService, AgolService } from '@geoplatform/client';
import { NG2HttpClient } from './http/ng';
export function ng2HttpClientFactory(http) {
    return new NG2HttpClient(http);
}
export function itemServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new ItemService(Config.ualUrl, client);
}
export function datasetServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new DatasetService(Config.ualUrl, client);
}
export function serviceServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new ServiceService(Config.ualUrl, client);
}
export function layerServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new LayerService(Config.ualUrl, client);
}
export function mapServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new MapService(Config.ualUrl, client);
}
export function galleryServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new GalleryService(Config.ualUrl, client);
}
export function utilsServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new UtilsService(Config.ualUrl, client);
}
export function kgServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new KGService(Config.ualUrl, client);
}
export function agolServiceProviderFactory(http) {
    var client = ng2HttpClientFactory(http);
    return new AgolService(Config.ualUrl, client);
}
var GeoPlatformClientModule = /** @class */ (function () {
    function GeoPlatformClientModule() {
    }
    GeoPlatformClientModule = tslib_1.__decorate([
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
                },
                {
                    provide: AgolService,
                    useFactory: agolServiceProviderFactory,
                    deps: [HttpClient]
                }
            ]
        })
    ], GeoPlatformClientModule);
    return GeoPlatformClientModule;
}());
export { GeoPlatformClientModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC9hbmd1bGFyLyIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFtQyxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBFLE9BQU8sRUFDSCxNQUFNLEVBQ04sV0FBVyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUN6RCxVQUFVLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUNuRSxNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHMUMsTUFBTSxVQUFVLG9CQUFvQixDQUFFLElBQWlCO0lBQ25ELE9BQU8sSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUNELE1BQU0sVUFBVSwwQkFBMEIsQ0FBRSxJQUFpQjtJQUN6RCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxPQUFPLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUNELE1BQU0sVUFBVSw2QkFBNkIsQ0FBRSxJQUFpQjtJQUM1RCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUNELE1BQU0sVUFBVSw2QkFBNkIsQ0FBRSxJQUFpQjtJQUM1RCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FB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b0JBQ3ZDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtpQkFDN0I7Z0JBQ0Q7b0JBQ0ksT0FBTyxFQUFLLFNBQVM7b0JBQ3JCLFVBQVUsRUFBRSx3QkFBd0I7b0JBQ3BDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtpQkFDN0I7Z0JBQ0Q7b0JBQ0ksT0FBTyxFQUFLLFdBQVc7b0JBQ3ZCLFVBQVUsRUFBRSwwQkFBMEI7b0JBQ3RDLElBQUksRUFBUSxDQUFFLFVBQVUsQ0FBRTtpQkFDN0I7YUFDSjtTQUNKLENBQUM7T0FDVyx1QkFBdUIsQ0FBSTtJQUFELDhCQUFDO0NBQUEsQUFBeEMsSUFBd0M7U0FBM0IsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQge1xuICAgIENvbmZpZywgR1BIdHRwQ2xpZW50LFxuICAgIEl0ZW1TZXJ2aWNlLCBEYXRhc2V0U2VydmljZSwgU2VydmljZVNlcnZpY2UsIExheWVyU2VydmljZSxcbiAgICBNYXBTZXJ2aWNlLCBHYWxsZXJ5U2VydmljZSwgVXRpbHNTZXJ2aWNlLCBLR1NlcnZpY2UsIEFnb2xTZXJ2aWNlXG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5pbXBvcnQgeyBORzJIdHRwQ2xpZW50IH0gZnJvbSAnLi9odHRwL25nJztcblxuXG5leHBvcnQgZnVuY3Rpb24gbmcySHR0cENsaWVudEZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIHJldHVybiBuZXcgTkcySHR0cENsaWVudChodHRwKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpdGVtU2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgSXRlbVNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkYXRhc2V0U2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgRGF0YXNldFNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXJ2aWNlU2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgU2VydmljZVNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsYXllclNlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IExheWVyU2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG1hcFNlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IE1hcFNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnYWxsZXJ5U2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgR2FsbGVyeVNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1dGlsc1NlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IFV0aWxzU2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGtnU2VydmljZVByb3ZpZGVyRmFjdG9yeSggaHR0cCA6IEh0dHBDbGllbnQgKSB7XG4gICAgbGV0IGNsaWVudCA9IG5nMkh0dHBDbGllbnRGYWN0b3J5KGh0dHApO1xuICAgIHJldHVybiBuZXcgS0dTZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24gYWdvbFNlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IEFnb2xTZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIE5HMkh0dHBDbGllbnQsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBuZzJIdHRwQ2xpZW50RmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIEl0ZW1TZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogaXRlbVNlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBEYXRhc2V0U2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGRhdGFzZXRTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgU2VydmljZVNlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBzZXJ2aWNlU2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIExheWVyU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGxheWVyU2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIE1hcFNlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBtYXBTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgR2FsbGVyeVNlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBnYWxsZXJ5U2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIFV0aWxzU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IHV0aWxzU2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIEtHU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGtnU2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIEFnb2xTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogYWdvbFNlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW9QbGF0Zm9ybUNsaWVudE1vZHVsZSB7IH1cbiJdfQ==