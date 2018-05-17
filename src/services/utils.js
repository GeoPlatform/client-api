

import Q from 'q';

class UtilsService {

    constructor(url, httpClient) {
        this.setUrl(url);
        this.client = httpClient;
        this.timeout = 10000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    }

    setUrl(baseUrl) {
        this.baseUrl = baseUrl;
    }


    /**
     * @param {string} property - optional capa property to specifically request
     * @param {Object} query - optional query parameters to include with request
     * @param {Object} options - optional config to send with http request
     * @return {Promise} resolving capabilities object
     */
    capabilities (property, query, options) {

        let url = this.baseUrl + '/api/capabilities';
        if(property)
            url += '/' + property;

        return Q.resolve( url )
        .then( (url) => {
            let opts = this.buildRequest({
                method:"GET", url:url, params:query||{}, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`UtilsService.capabilities() - Error getting capabilities: ${e.message}`);
            return Q.reject(err);
        });
    }

    /**
     * @param {File} file
     * @param {string} format
     * @param {Object} options
     * @return {Promise}
     */
    parseFile (file, format, options) {

        var url = this.baseUrl + '/api/utils/parse';

        return Q.resolve( url )
        .then( url => {

            let opts = this.buildRequest({
                method:"POST",  url:url,
                data: { format: format },
                file: file,
                formData: true,   //NodeJS (RequestJS)
                options: options
            });
            return this.execute(opts);
        })
        .then( response => response )
        .catch(e => {
            let err = new Error(`UtilsService.parseFile() - Error parsing file: ${e.message}`);
            return Q.reject(err);
        });
    }


    /**
     * Geolocate the specified argument to a set of candidate locations.
     * @param {Object} value - text string to geolocate (name or lat,lng)
     * @param {Object} options - optional config to send with http request
     * @return {Promise} resolving an array of geocoded results
     */
    locate(value, options) {

        var url = this.baseUrl + '/api/utils/gazetteer';
        return Q.resolve(url)
        .then( url => {
            let opts = this.buildRequest({
                method: 'GET',
                url: url,
                params: { location: value }
            });
            return this.execute(opts);
        })
        .then(response => response)
        .catch(e => {
            let err = new Error(`UtilsService.locate() - Error resolving location: ${e.message}`);
            return Q.reject(err);
        });
    }






    /* ----------------------------------------------------------- */

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

        options.timeout = this.timeout;

        return this.createRequestOpts(options);
    }

    createRequestOpts(options) {
        return this.client.createRequestOpts(options);
    }

    execute(opts) {
        return this.client.execute(opts);
    }

}

export default UtilsService;
