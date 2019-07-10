import KGQuery from '../shared/kg-query';
import GPHttpClient from '../http/client';
declare class KGService {
    private apiBase;
    private baseUrl;
    private client;
    private timeout;
    private httpMethods;
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
    /**
     * @param method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
     * @param url - destination of xhr request
     * @param params - object to be sent with request as query parameters
     * @param data - object to be sent with request as body
     * @param options - optional object defining request options
     * @return request options for xhr
     */
    buildRequest(options: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
    createRequestOpts(options: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
    execute(opts: {
        [key: string]: any;
    }): Promise<any>;
}
export default KGService;
