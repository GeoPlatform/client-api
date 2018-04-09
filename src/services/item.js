
import Q from 'q';


/**
 * ItemService
 * service for working with the GeoPlatform API to
 * retrieve and manipulate items.
 *
 * Ex Searching Items
 *      let params = { q: 'test' };
 *      itemService.search(params).then(response=>{
 *          console.log(response.results.length + " of " + response.totalResults);
 *      }).catch(e=>{...});
 *
 * Ex Fetch Item:
 *      itemService.get(itemId).then(item=>{...}).catch(e=>{...});
 *
 * Ex Saving Item:
 *      itemService.save(item).then(item=>{...}).catch(e=>{...});
 *
 * Ex Deleting Item:
 *      itemService.remove(itemId).then(()=>{...}).catch(e=>{...});
 *
 * Ex Patching Item:
 *      itemService.patch(itemId,patch).then(item=>{...}).catch(e=>{...});
 *
 */
class ItemService {

    constructor(url, httpClient) {
        this.setUrl(url);
        this.client = httpClient;
        this.timeout = 10000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    }

    setUrl(baseUrl) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/items';
    }


    /**
     * @param {string} id - identifier of item to fetch
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving Item object or an error
     */
    get (id, options) {

        return Q.resolve( id )
        .then( id => {
            let opts = this.buildRequest({
                method:"GET", url:this.baseUrl + '/' + id, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`ItemService.get() - Error fetching item ${id}: ${e.message}`);
            return Q.reject(err);
        });
    }

    /**
     * @param {Object} itemObj - item to create or update
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving Item object or an error
     */
    save (itemObj, options) {

        return Q.resolve( itemObj )
        .then( item => {

            let method = 'POST',
                url = this.baseUrl;
            if(item.id) {
                method = "PUT";
                url += '/' + item.id;
            } else {
                //if item is being created and has no URI already defined
                // attempt to create one using the API's method for doing so
                // and then attempt the actual item creation
                if(!item.uri) {
                    return this.getUri(item, options)
                    .then( uri => {
                        item.uri = uri;
                        let opts = this.buildRequest({method:method, url:url, data:item, options:options});
                        return this.execute(opts);
                    });
                }
            }

            let opts = this.buildRequest({method:method, url:url, data:item, options:options});
            return this.execute(opts);

        })
        .catch(e => {
            let err = new Error(`ItemService.save() - Error saving item: ${e.message}`);
            return Q.reject(err);
        });
    }

    /**
     * @param {string} id - identifier of item to delete
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving true if successful or an error
     */
    remove (id, options) {

        return Q.resolve( this.baseUrl + '/' + id )
        .then( url => {
            let opts = this.buildRequest({
                method:"DELETE", url: url, options: options
            });
            return this.execute(opts);
        })
        .then(response => true)
        .catch(e => {
            let err = new Error(`ItemService.remove() - Error deleting item ${id}: ${e.message}`);
            return Q.reject(err);
        });
    }

    /**
     * @param {string} id - identifier of item to patch
     * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving Item object or an error
     */
    patch (id, patch, options) {

        return Q.resolve( this.baseUrl + '/' + id )
        .then( url => {
            let opts = this.buildRequest({
                method: "PATCH", url: url, data: patch, options: options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`ItemService.patch() - Error patching item ${id}: ${e.message}`);
            return Q.reject(err);
        });
    }

    /**
     * @param {Object} arg - either JS object of query parameters or GeoPlatform.Query instance
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving search results
     */
    search (arg, options) {

        return Q.resolve( arg )
        .then( params => {

            if(params && typeof(params.getQuery) !== 'undefined') {
                //if passed a GeoPlatform.Query object,
                // convert to parameters object
                params = params.getQuery();
            }
            let opts = this.buildRequest({
                method:"GET", url: this.baseUrl, params: params, options: options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`ItemService.search() - Error searching items: ${e.message}`);
            return Q.reject(err);
        });
    }


    /**
     *
     * @param {string} arg - URL to metadata document or File to upload
     * @param {string} format - metadata format of specified document
     * @return {Promise} resolving GeoPlatform Item
     */
    import (arg, format, options) {

        return Q.resolve( true )
        .then( () => {
            if(arg===null || arg === undefined) {
                throw new Error("Must provide a valid URL or File");
            }
            let isFile = typeof(arg) !== 'string';
            let ro = {
                method:"POST",
                url: this.apiBase + '/api/import',
                processData: true,  //for jQuery
                formData: true,     //for Node (RequestJS)
                options: options
            };
            if(isFile) {
                ro.file = arg;
                ro.data = { format: format };
            } else {
                ro.formData = false;    //must be false for data to not be multi-part formdata
                ro.data = { url: arg, format: format };
            }
            let opts = this.buildRequest(ro);
            return this.execute(opts);
        })
        .catch( e => {
            let err = new Error(`ItemService.import() - Error importing item: ${e.message}`);
            if(e.status === 409 || ~e.message.indexOf('Item already exists')) err.status = 409;
            if(e.item) err.item = e.item;
            return Q.reject(err);
        });
    }



    /**
     * @param {string} id - identifier of the item to export
     * @param {format} format - string mime type to export
     * @return {Promise} resolving HTTP response object for enabling attachment downloading
     */
    export (id, format, options) {

        return Q.resolve( true )
        .then( () => {
            let url = this.baseUrl + '/' + id + '/export';
            let opts = this.buildRequest({
                method: "GET", url: url,
                params: {format:format},
                json: false,
                options: options
            });
            return this.execute(opts);
        })
        .catch( e => {
            let err = new Error(`ItemService.export() - Error exporting item: ${e.message}`);
            return Q.reject(err);
        });
    }


    /**
     * @param {Object} object - GP object definition to generate a URI for
     * @param {Object} options - optional request options
     * @return {Promise} resolving string URI
     */
    getUri (object, options) {

        return Q.resolve( object )
        .then( obj => {
            if(!obj || !obj.type)
                throw new Error("Must provide an object with a type property");
            let url = this.apiBase + '/api/utils/uri';
            let opts = this.buildRequest({
                method: "POST", url: url, data: obj, options: options
            });
            return this.execute(opts);
        })
        .catch( e => {
            let err = new Error(`ItemService.getUri() - Error getting URI for item: ${e.message}`);
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

        let opts = this.createRequestOpts(options);

        return opts;
    }

    createRequestOpts(options) {
        return this.client.createRequestOpts(options);
    }

    execute(opts) {
        return this.client.execute(opts);
    }

}

export default ItemService;
