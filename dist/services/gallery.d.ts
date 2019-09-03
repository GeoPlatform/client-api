import ItemService from './item';
import GPHttpClient from '../http/client';
/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
declare class GalleryService extends ItemService {
    constructor(url: string, httpClient: GPHttpClient);
    setUrl(baseUrl: string): void;
    addItem(galleryId: string, itemObj: any, options?: any): Promise<any>;
    removeItem(galleryId: string, itemId: any, options?: any): Promise<any>;
}
export default GalleryService;
