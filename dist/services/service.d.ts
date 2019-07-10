import ItemService from './item';
import GPHttpClient from '../http/client';
/**
 * GeoPlatform Service service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate service objects.
 *
 * @see ItemService
 */
declare class ServiceService extends ItemService {
    constructor(url: string, httpClient: GPHttpClient);
    setUrl(baseUrl: string): void;
    /**
     * Fetch metadata from the specified GeoPlatform Service's
     * web-accessible implementation using either GetCapabilities
     * or ESRI documentInfo.
     * @param service - GeoPlatform Service object
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving service metadata
     */
    about(service: any, options?: any): Promise<any>;
    /**
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service types
     */
    types(options?: any): Promise<any>;
    /**
     * @param service - GP Service definition
     * @param options - optional set of request options to apply to request
     * @return Promise resolving imported service
     */
    import(service: any, options?: any): Promise<any>;
    /**
     * @param id - identifier of GP service to harvest layers for
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service layers
     */
    harvest(id: string, options?: any): Promise<any>;
    /**
     * @param id - identifier of GP service to live test
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service statistics
     */
    liveTest(id: string, options?: any): Promise<any>;
    /**
     * @param id - identifier of GP service to fetch statistics about
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service statistics
     */
    statistics(id: string, options?: any): Promise<any>;
}
export default ServiceService;
