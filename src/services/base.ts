
import Config from '../shared/config';
import Query from '../shared/query';
import GPHttpClient from '../http/client';

/**
 * BaseService
 * abstract service for working with the GeoPlatform API to
 * retrieve and manipulate items.
 *
 */
class BaseService {

    protected apiBase ?: string;
    protected baseUrl ?: string;
    protected client : GPHttpClient;
    protected _timeout : number = 30000;
    protected logger : any;
    protected httpMethods : string[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];

    constructor(url : string, httpClient : GPHttpClient) {
        this.setUrl(url);
        this.client = httpClient;
    }

    setUrl(baseUrl : string) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/items';
    }

    /**
     * @param milliseconds - override environment variable timeout
     */
    setTimeout(milliseconds : number) {
        this._timeout = milliseconds;
    }

    /**
     * @param milliseconds - override environment variable timeout
     */
    timeout(milliseconds : number) : BaseService {
        this.setTimeout(milliseconds);
        return this;
    }

    /**
     * @return GPHttpClient instance or null if one was not provided
     */
    getClient() {
        return this.client;
    }

    createPromise ( arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void ) : Promise<any> {
        return new Promise<any>( arg );
    }
    createAndResolvePromise( value : any ) : Promise<any> {
        return Promise.resolve(value);
    }
    createAndRejectPromise ( error : Error ) : Promise<any>{
        return Promise.reject(error);
    }

    /**
     * @param logger - log service
     */
    setLogger(logger : any) {
        this.logger = logger;
    }

    /**
     * @param e - error to log (if logger specified)
     */
    logError(e : string|Error) {
        if(this.logger && this.logger.error) {
            this.logger.error(e);
        }
    }

    /**
     * @param msg - message to log as debug
     */
    logDebug(msg : string) {
        if(this.logger && this.logger.debug) {
            this.logger.debug(msg);
        }
    }




    /**
     * @param method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
     * @param url - destination of xhr request
     * @param params - object to be sent with request as query parameters
     * @param data - object to be sent with request as body
     * @param options - optional object defining request options
     * @return request options for xhr
     */
    buildRequest (options : {[key:string]:any}) : {[key:string]:any} {

        if(this.httpMethods.indexOf(options.method)<0)
            throw new Error(`Unsupported HTTP method ${options.method}`);

        if(!options.url)
            throw new Error(`Must specify a URL for HTTP requests`);

        options.timeout = this._timeout || 30000;
        let opts = this.createRequestOpts(options);
        return opts;
    }

    createRequestOpts(options : {[key:string]:any}) : {[key:string]:any} {
        let request = this.client.createRequestOpts(options);
        this.logDebug("BaseService.createRequestOpts() - " + JSON.stringify(request));
        return request;
    }

    execute(opts : {[key:string]:any} ) : Promise<any> {
        return this.client.execute(opts)
        .catch(e => {
            if(e === null || typeof(e) === 'undefined') {
                e = new Error("Request failed but didn't return an " +
                "error. This is most likely because the request timed out");
            }
            return this.createAndRejectPromise(e);
        });
    }

}


export default BaseService;
