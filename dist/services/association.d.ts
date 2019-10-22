import BaseService from './base';
import GPHttpClient from '../http/client';
/**
 * GeoPlatform Association service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate association objects.
 *
 * @see GeoPlatform.ItemService
 */
declare class AssociationService extends BaseService {
    constructor(url: string, httpClient: GPHttpClient);
    /**
     * @param itemId - identifier of item to fetch associations for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving array of associated items of the item in question
     */
    search(itemId: string, params?: any, options?: any): Promise<any>;
    /**
     * @param itemId - identifier of item
     * @param associationId - identifier of association to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving association
     */
    get(itemId: string, associationId: string, options?: any): Promise<any>;
    /**
     * @param itemId - identifier of item
     * @param associationId - identifier of association to remove
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving empty
     */
    remove(itemId: string, associationId: string, options?: any): Promise<any>;
}
export default AssociationService;
