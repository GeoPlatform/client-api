import GPHttpClient from '../http/client';
/**
 * BaseService
 * abstract service for working with the GeoPlatform API to
 * retrieve and manipulate items.
 *
 */
declare class BaseService {
    protected apiBase?: string;
    protected baseUrl?: string;
    protected client: GPHttpClient;
    protected _timeout: number;
    protected logger: any;
    protected httpMethods: string[];
    constructor(url: string, httpClient: GPHttpClient);
    setUrl(baseUrl: string): void;
    /**
     * @param milliseconds - override environment variable timeout
     */
    setTimeout(milliseconds: number): void;
    /**
     * @param milliseconds - override environment variable timeout
     */
    timeout(milliseconds: number): BaseService;
    /**
     * @return GPHttpClient instance or null if one was not provided
     */
    getClient(): GPHttpClient;
    createPromise(arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void): Promise<any>;
    createAndResolvePromise(value: any): Promise<any>;
    createAndRejectPromise(error: Error): Promise<any>;
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
export default BaseService;
