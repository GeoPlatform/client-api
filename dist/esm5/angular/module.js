import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Config, ItemService, DatasetService, ServiceService, LayerService, MapService, GalleryService, UtilsService, KGService } from '@geoplatform/client';
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
                }
            ]
        })
    ], GeoPlatformClientModule);
    return GeoPlatformClientModule;
}());
export { GeoPlatformClientModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC9hbmd1bGFyLyIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFtQyxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBFLE9BQU8sRUFDSCxNQUFNLEVBQ04sV0FBVyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUN6RCxVQUFVLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQ3RELE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUcxQyxNQUFNLFVBQVUsb0JBQW9CLENBQUUsSUFBaUI7SUFDbkQsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBQ0QsTUFBTSxVQUFVLDBCQUEwQixDQUFFLElBQWlCO0lBQ3pELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBQ0QsTUFBTSxVQUFVLDZCQUE2QixDQUFFLElBQWlCO0lBQzVELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBQ0QsTUFBTSxVQUFVLDZCQUE2QixDQUFFLElBQWlCO0lBQzVELElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FB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QUQsOEJBQUM7Q0FBQSxBQUF4QyxJQUF3QztTQUEzQix1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7XG4gICAgQ29uZmlnLCBHUEh0dHBDbGllbnQsXG4gICAgSXRlbVNlcnZpY2UsIERhdGFzZXRTZXJ2aWNlLCBTZXJ2aWNlU2VydmljZSwgTGF5ZXJTZXJ2aWNlLFxuICAgIE1hcFNlcnZpY2UsIEdhbGxlcnlTZXJ2aWNlLCBVdGlsc1NlcnZpY2UsIEtHU2VydmljZVxufSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuaW1wb3J0IHsgTkcySHR0cENsaWVudCB9IGZyb20gJy4vaHR0cC9uZyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG5nMkh0dHBDbGllbnRGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICByZXR1cm4gbmV3IE5HMkh0dHBDbGllbnQoaHR0cCk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXRlbVNlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IEl0ZW1TZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGF0YXNldFNlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IERhdGFzZXRTZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2VydmljZVNlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IFNlcnZpY2VTZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICBsZXQgY2xpZW50ID0gbmcySHR0cENsaWVudEZhY3RvcnkoaHR0cCk7XG4gICAgcmV0dXJuIG5ldyBMYXllclNlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBtYXBTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICBsZXQgY2xpZW50ID0gbmcySHR0cENsaWVudEZhY3RvcnkoaHR0cCk7XG4gICAgcmV0dXJuIG5ldyBNYXBTZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2FsbGVyeVNlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IEdhbGxlcnlTZXJ2aWNlKENvbmZpZy51YWxVcmwsIGNsaWVudCk7XG59XG5leHBvcnQgZnVuY3Rpb24gdXRpbHNTZXJ2aWNlUHJvdmlkZXJGYWN0b3J5KCBodHRwIDogSHR0cENsaWVudCApIHtcbiAgICBsZXQgY2xpZW50ID0gbmcySHR0cENsaWVudEZhY3RvcnkoaHR0cCk7XG4gICAgcmV0dXJuIG5ldyBVdGlsc1NlcnZpY2UoQ29uZmlnLnVhbFVybCwgY2xpZW50KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBrZ1NlcnZpY2VQcm92aWRlckZhY3RvcnkoIGh0dHAgOiBIdHRwQ2xpZW50ICkge1xuICAgIGxldCBjbGllbnQgPSBuZzJIdHRwQ2xpZW50RmFjdG9yeShodHRwKTtcbiAgICByZXR1cm4gbmV3IEtHU2VydmljZShDb25maWcudWFsVXJsLCBjbGllbnQpO1xufVxuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBORzJIdHRwQ2xpZW50LFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogbmcySHR0cENsaWVudEZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBJdGVtU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGl0ZW1TZXJ2aWNlUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogICAgICAgWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogICAgRGF0YXNldFNlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBkYXRhc2V0U2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIFNlcnZpY2VTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogc2VydmljZVNlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBMYXllclNlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBsYXllclNlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBNYXBTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogbWFwU2VydmljZVByb3ZpZGVyRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6ICAgICAgIFsgSHR0cENsaWVudCBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6ICAgIEdhbGxlcnlTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogZ2FsbGVyeVNlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBVdGlsc1NlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiB1dGlsc1NlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiAgICBLR1NlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBrZ1NlcnZpY2VQcm92aWRlckZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiAgICAgICBbIEh0dHBDbGllbnQgXVxuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW9QbGF0Zm9ybUNsaWVudE1vZHVsZSB7IH1cbiJdfQ==