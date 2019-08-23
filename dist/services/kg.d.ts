import KGQuery from '../shared/kg-query';
import GPHttpClient from '../http/client';
import BaseService from './base';
declare class KGService extends BaseService {
    constructor(url: string, httpClient: GPHttpClient);
    setUrl(baseUrl: string): void;
    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving recommended concepts as search results
     */
    suggest(query: KGQuery, options?: any): Promise<any>;
    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving concept types as search results
     */
    types(query: KGQuery, options?: any): Promise<any>;
    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving concept sources as search results
     */
    sources(query: KGQuery, options?: any): Promise<any>;
    /**
     * internal method used by exposed methods
     */
    _search(url: string, query: KGQuery, options?: any): Promise<any>;
}
export default KGService;
