import GPHttpClient from '../http/client';
import BaseService from './base';
declare class UtilsService extends BaseService {
    constructor(url: string, httpClient: GPHttpClient);
    setUrl(baseUrl: string): void;
    /**
     * @param property - optional capa property to specifically request
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving capabilities object
     */
    capabilities(property: string | null, query: any, options?: any): Promise<any>;
    /**
     * @param file
     * @param format
     * @param options
     * @return Promise
     */
    parseFile(file: any, format: string, options?: any): Promise<any>;
    /**
     * Geolocate the specified argument to a set of candidate locations.
     * @param value - text string to geolocate (name or lat,lng)
     * @param options - optional config to send with http request
     * @return Promise resolving an array of geocoded results
     */
    locate(value: any, options?: any): Promise<any>;
    /**
     * Upload a file to store within the GeoPlatform for association with
     * one or more portfolio Assets.
     *
     * @param file File to store
     * @param format string media type of the file being stored
     * @param options optional
     * @return Promise resolving metadata for stored content
     */
    store(file: any, format: string, options?: any): Promise<any>;
}
export default UtilsService;
