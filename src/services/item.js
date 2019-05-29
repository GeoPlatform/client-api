
import Q from 'q';
import Config from '../shared/config';

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
        this.timeout = Config.timeout || 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    }

    setUrl(baseUrl) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/items';
    }

    /**
     * @param {number} milliseconds - override environment variable timeout
     */
    setTimeout(milliseconds) {
        this.timeout = milliseconds;
    }

    /**
     * @param {number} milliseconds - override environment variable timeout
     */
    timeout(milliseconds) {
        this.setTimeout(milliseconds);
        return this;
    }

    /**
     * @param {Logger} logger - log service
     */
    setLogger(logger) {
        this.logger = logger;
    }

    /**
     * @param {Error} e - error to log (if logger specified)
     */
    logError(e) {
        if(this.logger && this.logger.error) {
            this.logger.error(e);
        }
    }

    /**
     * @param {string} msg - message to log as debug
     */
    logDebug(msg) {
        if(this.logger && this.logger.debug) {
            this.logger.debug(msg);
        }
    }




    /**
     * @param {string} id - identifier of item to fetch
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving Item object or an error
     */
    get (id, options) {

        let url = this.baseUrl + '/' + id;
        if(options && options.version) {
            url += '/versions/' + options.version;
            // this.logDebug("Client.get requesting version: " + options.version);
        }
        return Q.resolve( url )
        .then( url => {
            let opts = this.buildRequest({ method:"GET", url:url, options:options });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error fetching item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.get() - ' + err.message);
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
            let err = new Error(`Error saving item: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.save() - ' + err.message);
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
            let err = new Error(`Error deleting item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.remove() - ' + err.message);
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
            let err = new Error(`Error patching item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.patch() - ' + err.message);
            return Q.reject(err);
        });
    }

    /**
     * @param {string} id - identifier of item to patch
     * @param {Object} overrides - object specifying changes to apply to the clone
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving Item object or an error
     */
    clone (id, overrides, options) {

        return Q.resolve( this.baseUrl + '/' + id + '/clone' )
        .then( url => {
            let opts = this.buildRequest({
                method: "POST", url: url, data: overrides, options: options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error cloning item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.clone() - ' + err.message);
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
            let err = new Error(`Error searching items: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.search() - ' + err.message);
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
            if(options && options.overwrite) {
                ro.data.overwrite = (!!options.overwrite)+'';
                delete options.overwrite;
            }
            let opts = this.buildRequest(ro);
            return this.execute(opts);
        })
        .catch( e => {
            let err = new Error(`Error importing item: ${e.message}`);
            Object.assign(err, e);
            if(e.status === 409 || ~e.message.indexOf('Item already exists')) err.status = 409;
            if(e.item) err.item = e.item;
            this.logError('ItemService.import() - ' + err.message);
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
            let msg = e.message;
            //https://github.com/GeoPlatform/client-api/issues/1
            if(e.statusCode && e.statusCode===406 || e.statusCode==='406') {
                msg = `Unsupported export format specified '${format}'`;
            }
            let err = new Error(`Error exporting item: ${msg}`);
            Object.assign(err, e);
            this.logError('ItemService.export() - ' + err.message);
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
            options = options || {};
            options.responseType = 'text';  //to ensure plaintext is expected
            let opts = this.buildRequest({
                method: "POST", url: url, data: obj, options: options
            });
            return this.execute(opts);
        })
        .catch( e => {
            let err = new Error(`Error getting URI for item: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.getUri() - ' + err.message);
            return Q.reject(err);
        });

    }


    /**
     * @param {Array} ids - list of identifiers to fetch objects for
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving list of matching items or an error
     */
    getMultiple (ids, options) {

        return Q.resolve( ids )
        .then( identifiers => {

            let method = 'POST',
                url = this.apiBase + '/api/fetch';

            let opts = this.buildRequest({method:method, url:url, data:identifiers, options:options});
            return this.execute(opts);

        })
        .catch(e => {
            let err = new Error(`Error fetching items: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.getMultiple() - ' + err.message);
            return Q.reject(err);
        });
    }


    /**
     * @param {Array} uris - list of URIs to retrieve objects for
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving list containing uri-item association where exists
     */
    exists(uris, options) {
        return Q.resolve(uris)
        .then( uris => {
            let method = 'POST', url = this.apiBase + '/api/utils/exists';
            let opts = this.buildRequest({method:method, url:url, data:uris, options:options});
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error resolving items: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.exists() - ' + err.message);
            return Q.reject(err);
        });
    }


    like(item, options) {
        return Q.resolve(item.id)
        .then( id => {
            let method = 'PUT', url = this.apiBase + '/api/items/' + id + '/likes';
            let opts = this.buildRequest({method:method, url:url, options:options});
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error liking item ${item.id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.like() - ' + err.message);
            return Q.reject(err);
        });
    }

    view(item, options) {
        return Q.resolve(item.id)
        .then( id => {
            let method = 'PUT', url = this.apiBase + '/api/items/' + id + '/views';
            let opts = this.buildRequest({method:method, url:url, options:options});
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error incrementing views for item ${item.id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.like() - ' + err.message);
            return Q.reject(err);
        });
    }


    /**
     * @param {string} id - identifier of item to fetch associations for
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving array of associated items of the item in question
     */
    associations (id, params, options) {

        return Q.resolve( id )
        .then( id => {
            let url = this.baseUrl + '/' + id + '/associations';
            let opts = this.buildRequest({
                method:"GET",
                url:url,
                params: params || {},
                options: options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error fetching associations for item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.associations() - ' + err.message);
            return Q.reject(err);
        });
    }

    /**
     * @param {string} id - identifier of item to fetch version info for
     * @param {object} params - optional set of query parameters to constrain list of versions
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving array of available versions of the item
     */
    versions (id, params, options) {

        return Q.resolve( id )
        .then( id => {
            let url = this.baseUrl + '/' + id + '/versions';
            let opts = this.buildRequest({ 
                method:"GET",
                url:url,
                params: params,
                options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error fetching versions for item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.versions() - ' + err.message);
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

        options.timeout = this.timeout || Config.timeout || 30000;

        let opts = this.createRequestOpts(options);

        return opts;
    }

    createRequestOpts(options) {
        let request = this.client.createRequestOpts(options);
        this.logDebug("ItemService.createRequestOpts() - " + JSON.stringify(request));
        return request;
    }

    execute(opts) {
        return this.client.execute(opts)
        .catch(e => {
            if(e === null || typeof(e) === 'undefined') {
                e = new Error("ItemService.execute() - Request failed but didn't return an " +
                "error. This is most likely because the request timed out");
            }
            return Q.reject(e);
        });
    }

}

export default ItemService;
