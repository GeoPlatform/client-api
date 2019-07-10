import GPHttpClient from '../http/client';
declare class UtilsService {
    private baseUrl;
    private client;
    private timeout;
    private logger;
    private httpMethods;
    constructor(url: string, httpClient: GPHttpClient);
    setUrl(baseUrl: string): void;
    /**
     * @param logger - log service
     */
    setLogger(logger: any): void;
    /**
     * @param e - error to log (if logger specified)
     */
    logError(e: string | Error): void;
    /**
     * @param msg - message to log as debug
     */
    logDebug(msg: string): void;
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
export default UtilsService;
