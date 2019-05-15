import * as Q from 'q';
import ItemService from './item';
import GPHttpClient from '../http/client';
/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
declare class LayerService extends ItemService {
    constructor(url: string, httpClient: GPHttpClient);
    setUrl(baseUrl: string): void;
    /**
     * @param id - GeoPlatform Layer identifier
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving style JSON object
     */
    style(id: string, options?: any): Q.Promise<any>;
    /**
     * @param id - GeoPlatform Layer identifier
     * @param req identifying extent, x, y
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving feature JSON object
     */
    describe(id: string, req: any, options?: any): Q.Promise<any>;
    /**
     * @param id - GeoPlatform Layer identifier
     * @param params describing layer request to validate
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving empty if successful or a message if failed
     */
    validate(id: string, params: any, options?: any): Q.Promise<any>;
}
export default LayerService;
