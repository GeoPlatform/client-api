import { GPHttpClient, ItemService, UtilsService, DatasetService, ServiceService, LayerService, MapService, GalleryService } from "@geoplatform/client";
/** Angular-aware instance of ItemService */
declare class NGItemService extends ItemService {
    private $q;
    constructor(url: string, httpClient: GPHttpClient, $q: any);
    createPromise(arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void): Promise<any>;
    createAndResolvePromise(value: any): Promise<any>;
    createAndRejectPromise(error: Error): Promise<any>;
}
/** Angular-aware instance of DatasetService */
declare class NGDatasetService extends DatasetService {
    private $q;
    constructor(url: string, httpClient: GPHttpClient, $q: any);
    createPromise(arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void): Promise<any>;
    createAndResolvePromise(value: any): Promise<any>;
    createAndRejectPromise(error: Error): Promise<any>;
}
/** Angular-aware instance of GalleryService */
declare class NGGalleryService extends GalleryService {
    private $q;
    constructor(url: string, httpClient: GPHttpClient, $q: any);
    createPromise(arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void): Promise<any>;
    createAndResolvePromise(value: any): Promise<any>;
    createAndRejectPromise(error: Error): Promise<any>;
}
/** Angular-aware instance of LayerService */
declare class NGLayerService extends LayerService {
    private $q;
    constructor(url: string, httpClient: GPHttpClient, $q: any);
    createPromise(arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void): Promise<any>;
    createAndResolvePromise(value: any): Promise<any>;
    createAndRejectPromise(error: Error): Promise<any>;
}
/** Angular-aware instance of MapService */
declare class NGMapService extends MapService {
    private $q;
    constructor(url: string, httpClient: GPHttpClient, $q: any);
    createPromise(arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void): Promise<any>;
    createAndResolvePromise(value: any): Promise<any>;
    createAndRejectPromise(error: Error): Promise<any>;
}
/** Angular-aware instance of ServiceService */
declare class NGServiceService extends ServiceService {
    private $q;
    constructor(url: string, httpClient: GPHttpClient, $q: any);
    createPromise(arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void): Promise<any>;
    createAndResolvePromise(value: any): Promise<any>;
    createAndRejectPromise(error: Error): Promise<any>;
}
/** Angular-aware instance of UtilsService */
declare class NGUtilsService extends UtilsService {
    private $q;
    constructor(url: string, httpClient: GPHttpClient, $q: any);
    createPromise(arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void): Promise<any>;
    createAndResolvePromise(value: any): Promise<any>;
    createAndRejectPromise(error: Error): Promise<any>;
}
export { NGItemService, NGDatasetService, NGServiceService, NGLayerService, NGMapService, NGGalleryService, NGUtilsService };
