
import * as Q from 'q';
import Config from '../shared/config';
import KGQuery from '../shared/kg-query';
import GPHttpClient from '../http/client';

class KGService {

    // @ts-ignore
    private apiBase : string;
    // @ts-ignore
    private baseUrl : string;
    private client : GPHttpClient;
    private timeout : number = 30000;
    private httpMethods : string[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];

    constructor(url : string, httpClient : GPHttpClient) {
        this.setUrl(url);
        this.client = httpClient;
    }

    setUrl(baseUrl : string) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/recommender';
    }

    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving recommended concepts as search results
     */
    suggest (query : KGQuery, options ?: any) : Q.Promise<any> {
        let url = this.baseUrl + '/suggest';
        return this._search(url, query, options)
        .catch(e => {
            let err = new Error(`KGService.suggest() - Error suggesting concepts: ${e.message}`);
            Object.assign(err, e);
            return Q.reject(err);
        });
    }


    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving concept types as search results
     */
    types (query : KGQuery, options ?: any) : Q.Promise<any> {
        let url = this.baseUrl + '/types';
        return this._search(url, query, options)
        .catch(e => {
            let err = new Error(`KGService.types() - Error searching types: ${e.message}`);
            Object.assign(err, e);
            return Q.reject(err);
        });
    }



    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving concept sources as search results
     */
    sources (query : KGQuery, options ?: any) : Q.Promise<any> {
        let url = this.baseUrl + '/sources';
        return this._search(url, query, options)
        .catch(e => {
            let err = new Error(`KGService.sources() - Error searching sources: ${e.message}`);
            Object.assign(err, e);
            return Q.reject(err);
        });
    }





    /* ----------------------------------------------------------- */


    /**
     * internal method used by exposed methods
     */
    _search (url : string, query : KGQuery, options ?: any) : Q.Promise<any> {
        return Q.resolve( true )
        .then( () => {
            let q : { [key:string]:any } = query.getQuery();
            let opts = this.buildRequest({
                method:"GET", url:url, params:q, options:options
            });
            return this.execute(opts);
        });
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

        options.timeout = this.timeout || Config.timeout || 30000;

        return this.createRequestOpts(options);
    }

    createRequestOpts(options : {[key:string]:any}) : {[key:string]:any} {
        return this.client.createRequestOpts(options);
    }

    execute(opts : {[key:string]:any}) : Q.Promise<any> {
        return this.client.execute(opts)
        .catch(e => {
            if(e === null || typeof(e) === 'undefined') {
                e = new Error("KGService.execute() - Request failed but didn't return an " +
                "error. This is most likely because the request timed out");
            }
            return Q.reject(e);
        });
    }

}

export default KGService;