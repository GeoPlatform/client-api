import ItemService from './item';
import GPHttpClient from '../http/client';
/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
declare class MapService extends ItemService {
    constructor(url: string, httpClient: GPHttpClient);
    setUrl(baseUrl: string): void;
}
export default MapService;
