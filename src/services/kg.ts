
import Config from '../shared/config';
import KGQuery from '../shared/kg-query';
import GPHttpClient from '../http/client';

import BaseService from './base';



class KGService extends BaseService {

    // @ts-ignore
    // private apiBase : string;
    // @ts-ignore
    // private baseUrl : string;
    // private client : GPHttpClient;
    // private timeout : number = 30000;
    // private httpMethods : string[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];

    constructor(url : string, httpClient : GPHttpClient) {
        super(url, httpClient);
    }

    setUrl(baseUrl : string) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/recommender';
    }

    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving recommended concepts as search results
     */
    suggest (query : KGQuery, options ?: any) : Promise<any> {

        let url = this.baseUrl + '/suggest';
        return this._search(url, query, options)
        .catch(e => {
            this.logError('KGService.suggest() - ' + e.message);
            let err = new Error(`Error suggesting concepts: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }


    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving concept types as search results
     */
    types (query : KGQuery, options ?: any) : Promise<any> {
        let url = this.baseUrl + '/types';
        return this._search(url, query, options)
        .catch(e => {
            this.logError('KGService.types() - ' + e.message);
            let err = new Error(`Error searching types: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }



    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving concept sources as search results
     */
    sources (query : KGQuery, options ?: any) : Promise<any> {
        let url = this.baseUrl + '/sources';
        return this._search(url, query, options)
        .catch(e => {
            this.logError('KGService.sources() - ' + e.message);
            let err = new Error(`Error searching sources: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }





    /* ----------------------------------------------------------- */


    /**
     * internal method used by exposed methods
     */
    _search (url : string, query : KGQuery, options ?: any) : Promise<any> {
        return this.createAndResolvePromise( url )
        .then( (url) => {
            let q : { [key:string]:any } = query.getQuery();
            let opts = this.buildRequest({
                method:"GET", url:url, params:q, options:options
            });
            return this.execute(opts);
        });
    }



    // /**
    //  * @param method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
    //  * @param url - destination of xhr request
    //  * @param params - object to be sent with request as query parameters
    //  * @param data - object to be sent with request as body
    //  * @param options - optional object defining request options
    //  * @return request options for xhr
    //  */
    // buildRequest (options : {[key:string]:any}) : {[key:string]:any} {
    //
    //     if(this.httpMethods.indexOf(options.method)<0)
    //         throw new Error(`Unsupported HTTP method ${options.method}`);
    //
    //     if(!options.url)
    //         throw new Error(`Must specify a URL for HTTP requests`);
    //
    //     options.timeout = this.timeout || Config.timeout || 30000;
    //
    //     return this.createRequestOpts(options);
    // }
    //
    // createRequestOpts(options : {[key:string]:any}) : {[key:string]:any} {
    //     return this.client.createRequestOpts(options);
    // }
    //
    // execute(opts : {[key:string]:any}) : Promise<any> {
    //     return this.client.execute(opts)
    //     .catch(e => {
    //         if(e === null || typeof(e) === 'undefined') {
    //             e = new Error("KGService.execute() - Request failed but didn't return an " +
    //             "error. This is most likely because the request timed out");
    //         }
    //         throw e;
    //     });
    // }

}

export default KGService;
