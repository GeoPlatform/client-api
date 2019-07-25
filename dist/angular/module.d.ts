import { HttpClient } from '@angular/common/http';
import { ItemService, DatasetService, ServiceService, LayerService, MapService, GalleryService, UtilsService } from '@geoplatform/client';
import NG2HttpClient from './http/ng';
export declare function ng2HttpClientFactory(http: HttpClient): NG2HttpClient;
export declare function itemServiceProviderFactory(http: HttpClient): ItemService;
export declare function datasetServiceProviderFactory(http: HttpClient): DatasetService;
export declare function serviceServiceProviderFactory(http: HttpClient): ServiceService;
export declare function layerServiceProviderFactory(http: HttpClient): LayerService;
export declare function mapServiceProviderFactory(http: HttpClient): MapService;
export declare function galleryServiceProviderFactory(http: HttpClient): GalleryService;
export declare function utilsServiceProviderFactory(http: HttpClient): UtilsService;
export declare class GeoPlatformClientModule {
}
