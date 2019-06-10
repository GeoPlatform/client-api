
import * as Q from 'q';
import { Item, SearchResults } from '../shared/models';
import Query from '../shared/query';
import GPHttpClient from '../http/client';

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
    timeout(milliseconds : number) : ItemService {
        this.setTimeout(milliseconds);
        return this;
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
     * @param id - identifier of item to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    get (id : string, options ?: any) : Q.Promise<Item> {

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
     * @param itemObj - item to create or update
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    save (itemObj : Item, options ?: any) : Q.Promise<Item> {

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
     * @param id - identifier of item to delete
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving true if successful or an error
     */
    remove (id : string, options ?: any) : Q.Promise<boolean> {

        return Q.resolve( this.baseUrl + '/' + id )
        .then( url => {
            let opts = this.buildRequest({
                method:"DELETE", url: url, options: options
            });
            return this.execute(opts);
        })
        .then( () => true)
        .catch(e => {
            let err = new Error(`Error deleting item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.remove() - ' + err.message);
            return Q.reject(err);
        });
    }

    /**
     * @param id - identifier of item to patch
     * @param patch - HTTP-PATCH compliant set of properties to patch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    patch (id : string, patch : any, options ?: any) : Q.Promise<Item> {

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
     * @param id - identifier of item to clone
     * @param overrides - KVP of property-value overrides to apply to cloned instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving clone of Item or an error
     */
    clone (id : string, overrides : any, options ?: any) : Q.Promise<Item> {

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
     * @param arg - either JS object of query parameters or GeoPlatform.Query instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    search (arg ?: Query, options ?: any) : Q.Promise<SearchResults> {

        return Q.resolve( arg )
        .then( params => {
            let ps = params ? params.getQuery() : {};
            let opts = this.buildRequest({
                method:"GET", url: this.baseUrl, params: ps, options: options
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
     * @param arg - URL to metadata document or File to upload
     * @param format - metadata format of specified document
     * @return Promise resolving GeoPlatform Item
     */
    import (arg : any, format : string, options ?: any) : Q.Promise<Item> {

        return Q.resolve( true )
        .then( () => {
            if(arg===null || arg === undefined) {
                throw new Error("Must provide a valid URL or File");
            }
            let isFile = typeof(arg) !== 'string';
            let ro : { [key:string]:any } = {
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
            if(e.status === 409 || ~e.message.indexOf('Item already exists'))
                Object.assign(err, {status: 409});
            if(e.item)
                Object.assign(err, { item : e.item });
            this.logError('ItemService.import() - ' + err.message);
            return Q.reject(err);
        });
    }



    /**
     * @param id - identifier of the item to export
     * @param format - string mime type to export
     * @return Promise resolving HTTP response object for enabling attachment downloading
     */
    export (id : string, format : string, options ?: any) : Q.Promise<any> {

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
     * @param object - GP object definition to generate a URI for
     * @param options - optional request options
     * @return Promise resolving string URI
     */
    getUri (object : any, options ?: any) : Q.Promise<any> {

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
     * @param ids - list of identifiers to fetch objects for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving list of matching items or an error
     */
    getMultiple (ids : string[], options ?: any) : Q.Promise<any> {

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
     * @param uris - list of URIs to retrieve objects for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving list containing uri-item association where exists
     */
    exists(uris : string[], options ?: any) : Q.Promise<any> {
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


    like(item : any, options ?: any) : Q.Promise<any> {
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

    view(item : any, options ?: any) : Q.Promise<any> {
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
     * @param id - identifier of item to fetch associations for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving array of associated items of the item in question
     */
    associations (id : string, params : any, options ?: any) : Q.Promise<any> {

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
     * @param id - identifier of item to fetch version info for
     * @param params - optional set of query parameters to constrain list of versions
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving array of available versions of the item
     */
    versions (id : string, params ?: any, options ?: any) : Q.Promise<any> {

        return Q.resolve( id )
        .then( id => {
            let url = this.baseUrl + '/' + id + '/versions';
            let opts = this.buildRequest({
                method:"GET", url:url, params: params, options:options 
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
        this.logDebug("ItemService.createRequestOpts() - " + JSON.stringify(request));
        return request;
    }

    execute(opts : {[key:string]:any} ) : Q.Promise<any> {
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
