
import Q from 'q';
import Config from '../shared/config';
import QueryParameters from '../shared/parameters';


class KGService {

    constructor(url, httpClient) {
        this.setUrl(url);
        this.client = httpClient;
        this.timeout = Config.timeout || 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    }

    setUrl(baseUrl) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/recommender';
    }

    /**
     * @param {Object} query - optional query parameters to include with request
     * @param {Object} options - optional config to send with http request
     * @return {Promise} resolving recommended concepts as search results
     */
    suggest (query, options) {
        let url = this.baseUrl + '/suggest';
        return this._search(url, query, options)
        .catch(e => {
            let err = new Error(`KGService.suggest() - Error suggesting concepts: ${e.message}`);
            return Q.reject(err);
        });
    }


    /**
     * @param {Object} query - optional query parameters to include with request
     * @param {Object} options - optional config to send with http request
     * @return {Promise} resolving concept types as search results
     */
    types (query, options) {
        let url = this.baseUrl + '/types';
        return this._search(url, query, options)
        .catch(e => {
            let err = new Error(`KGService.types() - Error searching types: ${e.message}`);
            return Q.reject(err);
        });
    }



    /**
     * @param {Object} query - optional query parameters to include with request
     * @param {Object} options - optional config to send with http request
     * @return {Promise} resolving concept sources as search results
     */
    sources (query, options) {
        let url = this.baseUrl + '/sources';
        return this._search(url, query, options)
        .catch(e => {
            let err = new Error(`KGService.sources() - Error searching sources: ${e.message}`);
            return Q.reject(err);
        });
    }





    /* ----------------------------------------------------------- */


    /**
     * internal method used by exposed methods
     */
    _search (url, query, options) {
        return Q.resolve( true )
        .then( () => {

            if(query && typeof(query.getQuery) !== 'undefined') {
                //if passed a GeoPlatform.Query object,
                // convert to parameters object
                query = query.getQuery();
            }

            let opts = this.buildRequest({
                method:"GET", url:url, params:query, options:options
            });
            return this.execute(opts);
        });
    }



    /**
     * @param {string} method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
     * @param {string} url - destination of xhr request
     * @param {Object} params - object to be sent with request as query parameters
     * @param {Object} data - object to be sent with request as body
     * @param {Object} options - optional object defining request options
     * @return {Object} request options for xhr
     */
    buildRequest (options) {

        if(this.httpMethods.indexOf(options.method)<0)
            throw new Error(`Unsupported HTTP method ${options.method}`);

        if(!options.url)
            throw new Error(`Must specify a URL for HTTP requests`);

        options.timeout = this.timeout || Config.timeout || 30000;

        return this.createRequestOpts(options);
    }

    createRequestOpts(options) {
        return this.client.createRequestOpts(options);
    }

    execute(opts) {
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
