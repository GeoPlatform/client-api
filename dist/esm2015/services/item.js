/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from 'q';
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
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        this._timeout = 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        this.setUrl(url);
        this.client = httpClient;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/items';
    }
    /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    setTimeout(milliseconds) {
        this._timeout = milliseconds;
    }
    /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    timeout(milliseconds) {
        this.setTimeout(milliseconds);
        return this;
    }
    /**
     * @return {?} GPHttpClient instance or null if one was not provided
     */
    getClient() {
        return this.client;
    }
    /**
     * @param {?} logger - log service
     * @return {?}
     */
    setLogger(logger) {
        this.logger = logger;
    }
    /**
     * @param {?} e - error to log (if logger specified)
     * @return {?}
     */
    logError(e) {
        if (this.logger && this.logger.error) {
            this.logger.error(e);
        }
    }
    /**
     * @param {?} msg - message to log as debug
     * @return {?}
     */
    logDebug(msg) {
        if (this.logger && this.logger.debug) {
            this.logger.debug(msg);
        }
    }
    /**
     * @param {?} id - identifier of item to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    get(id, options) {
        /** @type {?} */
        let url = this.baseUrl + '/' + id;
        if (options && options.version) {
            url += '/versions/' + options.version;
            // this.logDebug("Client.get requesting version: " + options.version);
        }
        return Q.resolve(url)
            .then(url => {
            /** @type {?} */
            let opts = this.buildRequest({ method: "GET", url: url, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error fetching item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.get() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} itemObj - item to create or update
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    save(itemObj, options) {
        return Q.resolve(itemObj)
            .then(item => {
            /** @type {?} */
            let method = 'POST';
            /** @type {?} */
            let url = this.baseUrl;
            if (item.id) {
                method = "PUT";
                url += '/' + item.id;
            }
            else {
                //if item is being created and has no URI already defined
                // attempt to create one using the API's method for doing so
                // and then attempt the actual item creation
                if (!item.uri) {
                    return this.getUri(item, options)
                        .then(uri => {
                        item.uri = uri;
                        /** @type {?} */
                        let opts = this.buildRequest({ method: method, url: url, data: item, options: options });
                        return this.execute(opts);
                    });
                }
            }
            /** @type {?} */
            let opts = this.buildRequest({ method: method, url: url, data: item, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error saving item: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.save() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} id - identifier of item to delete
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving true if successful or an error
     */
    remove(id, options) {
        return Q.resolve(this.baseUrl + '/' + id)
            .then(url => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "DELETE", url: url, options: options
            });
            return this.execute(opts);
        })
            .then(() => true)
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error deleting item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.remove() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} id - identifier of item to patch
     * @param {?} patch - HTTP-PATCH compliant set of properties to patch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    patch(id, patch, options) {
        return Q.resolve(this.baseUrl + '/' + id)
            .then(url => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "PATCH", url: url, data: patch, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error patching item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.patch() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} id - identifier of item to clone
     * @param {?} overrides - KVP of property-value overrides to apply to cloned instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving clone of Item or an error
     */
    clone(id, overrides, options) {
        return Q.resolve(this.baseUrl + '/' + id + '/clone')
            .then(url => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "POST", url: url, data: overrides, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error cloning item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.clone() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?=} arg - either JS object of query parameters or Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    search(arg, options) {
        return Q.resolve(arg)
            .then(params => {
            /** @type {?} */
            let ps = {};
            if (params && typeof (params.getQuery) === 'function')
                ps = params.getQuery();
            else if (typeof (params) === 'object')
                ps = params;
            else
                ps = {};
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl,
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error searching items: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.search() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     *
     * @param {?} arg - URL to metadata document or File to upload
     * @param {?} format - metadata format of specified document
     * @param {?=} options
     * @return {?} Promise resolving GeoPlatform Item
     */
    import(arg, format, options) {
        return Q.resolve(true)
            .then(() => {
            if (arg === null || arg === undefined) {
                throw new Error("Must provide a valid URL or File");
            }
            /** @type {?} */
            let isFile = typeof (arg) !== 'string';
            /** @type {?} */
            let ro = {
                method: "POST",
                url: this.apiBase + '/api/import',
                processData: true,
                //for jQuery
                formData: true,
                //for Node (RequestJS)
                options: options
            };
            if (isFile) {
                ro["file"] = arg;
                ro["data"] = { format: format };
            }
            else {
                ro["formData"] = false; //must be false for data to not be multi-part formdata
                ro["data"] = { url: arg, format: format };
            }
            if (options && options.overwrite) {
                ro["data"].overwrite = (!!options.overwrite) + '';
                delete options.overwrite;
            }
            /** @type {?} */
            let opts = this.buildRequest(ro);
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error importing item: ${e.message}`);
            Object.assign(err, e);
            if (e.status === 409 || ~e.message.indexOf('Item already exists'))
                Object.assign(err, { status: 409 });
            if (e.item)
                Object.assign(err, { item: e.item });
            this.logError('ItemService.import() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} id - identifier of the item to export
     * @param {?} format - string mime type to export
     * @param {?=} options
     * @return {?} Promise resolving HTTP response object for enabling attachment downloading
     */
    export(id, format, options) {
        return Q.resolve(true)
            .then(() => {
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/export';
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: url,
                params: { format: format },
                json: false,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let msg = e.message;
            //https://github.com/GeoPlatform/client-api/issues/1
            if (e.statusCode && e.statusCode === 406 || e.statusCode === '406') {
                msg = `Unsupported export format specified '${format}'`;
            }
            /** @type {?} */
            let err = new Error(`Error exporting item: ${msg}`);
            Object.assign(err, e);
            this.logError('ItemService.export() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} object - GP object definition to generate a URI for
     * @param {?=} options - optional request options
     * @return {?} Promise resolving string URI
     */
    getUri(object, options) {
        return Q.resolve(object)
            .then(obj => {
            if (!obj || !obj.type)
                throw new Error("Must provide an object with a type property");
            /** @type {?} */
            let url = this.apiBase + '/api/utils/uri';
            options = options || {};
            options.responseType = 'text';
            /** @type {?} */
            let opts = this.buildRequest({
                method: "POST", url: url, data: obj, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error getting URI for item: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.getUri() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} ids - list of identifiers to fetch objects for
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving list of matching items or an error
     */
    getMultiple(ids, options) {
        return Q.resolve(ids)
            .then(identifiers => {
            /** @type {?} */
            let method = 'POST';
            /** @type {?} */
            let url = this.apiBase + '/api/fetch';
            /** @type {?} */
            let opts = this.buildRequest({ method: method, url: url, data: identifiers, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error fetching items: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.getMultiple() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} uris - list of URIs to retrieve objects for
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving list containing uri-item association where exists
     */
    exists(uris, options) {
        return Q.resolve(uris)
            .then(uris => {
            /** @type {?} */
            let method = 'POST';
            /** @type {?} */
            let url = this.apiBase + '/api/utils/exists';
            /** @type {?} */
            let opts = this.buildRequest({ method: method, url: url, data: uris, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error resolving items: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.exists() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} item
     * @param {?=} options
     * @return {?}
     */
    like(item, options) {
        return Q.resolve(item.id)
            .then(id => {
            /** @type {?} */
            let method = 'PUT';
            /** @type {?} */
            let url = this.apiBase + '/api/items/' + id + '/likes';
            /** @type {?} */
            let opts = this.buildRequest({ method: method, url: url, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error liking item ${item.id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.like() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} item
     * @param {?=} options
     * @return {?}
     */
    view(item, options) {
        return Q.resolve(item.id)
            .then(id => {
            /** @type {?} */
            let method = 'PUT';
            /** @type {?} */
            let url = this.apiBase + '/api/items/' + id + '/views';
            /** @type {?} */
            let opts = this.buildRequest({ method: method, url: url, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error incrementing views for item ${item.id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.like() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} id - identifier of item to fetch associations for
     * @param {?} params
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving array of associated items of the item in question
     */
    associations(id, params, options) {
        return Q.resolve(id)
            .then(id => {
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/associations';
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET",
                url: url,
                params: params || {},
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error fetching associations for item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.associations() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} id - identifier of item to fetch version info for
     * @param {?=} params - optional set of query parameters to constrain list of versions
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving array of available versions of the item
     */
    versions(id, params, options) {
        return Q.resolve(id)
            .then(id => {
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/versions';
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error fetching versions for item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.versions() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    buildRequest(options) {
        if (this.httpMethods.indexOf(options["method"]) < 0)
            throw new Error(`Unsupported HTTP method ${options["method"]}`);
        if (!options["url"])
            throw new Error(`Must specify a URL for HTTP requests`);
        options["timeout"] = this._timeout || 30000;
        /** @type {?} */
        let opts = this.createRequestOpts(options);
        return opts;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(options) {
        /** @type {?} */
        let request = this.client.createRequestOpts(options);
        this.logDebug("ItemService.createRequestOpts() - " + JSON.stringify(request));
        return request;
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    execute(opts) {
        return this.client.execute(opts)
            .catch(e => {
            if (e === null || typeof (e) === 'undefined') {
                e = new Error("ItemService.execute() - Request failed but didn't return an " +
                    "error. This is most likely because the request timed out");
            }
            return Q.reject(e);
        });
    }
}
if (false) {
    /** @type {?} */
    ItemService.prototype.apiBase;
    /** @type {?} */
    ItemService.prototype.baseUrl;
    /** @type {?} */
    ItemService.prototype.client;
    /** @type {?} */
    ItemService.prototype._timeout;
    /** @type {?} */
    ItemService.prototype.logger;
    /** @type {?} */
    ItemService.prototype.httpMethods;
}
export default ItemService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCdkI7Ozs7O0lBU0ksWUFBWSxHQUFZLEVBQUUsVUFBeUI7d0JBSnJCLEtBQUs7MkJBRUEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO1FBR3hFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7S0FDNUI7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQWdCO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxHQUFHLFlBQVksQ0FBQztLQUN6Qzs7Ozs7SUFLRCxVQUFVLENBQUMsWUFBcUI7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7S0FDaEM7Ozs7O0lBS0QsT0FBTyxDQUFDLFlBQXFCO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUM7S0FDZjs7OztJQUtELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDdEI7Ozs7O0lBS0QsU0FBUyxDQUFDLE1BQVk7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDeEI7Ozs7O0lBS0QsUUFBUSxDQUFDLENBQWdCO1FBQ3JCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMs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Q0FBQyxJQUF5QjtRQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUMvQixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDUCxJQUFHLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDeEMsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLDhEQUE4RDtvQkFDNUUsMERBQTBELENBQUMsQ0FBQzthQUMvRDtZQUNELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QixDQUFDLENBQUM7S0FDTjtDQUVKOzs7Ozs7Ozs7Ozs7Ozs7QUFFRCxlQUFlLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUSBmcm9tICdxJztcbmltcG9ydCB7IEl0ZW0sIFNlYXJjaFJlc3VsdHMgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzJztcbmltcG9ydCBRdWVyeSBmcm9tICcuLi9zaGFyZWQvcXVlcnknO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5cbi8qKlxuICogSXRlbVNlcnZpY2VcbiAqIHNlcnZpY2UgZm9yIHdvcmtpbmcgd2l0aCB0aGUgR2VvUGxhdGZvcm0gQVBJIHRvXG4gKiByZXRyaWV2ZSBhbmQgbWFuaXB1bGF0ZSBpdGVtcy5cbiAqXG4gKiBFeCBTZWFyY2hpbmcgSXRlbXNcbiAqICAgICAgbGV0IHBhcmFtcyA9IHsgcTogJ3Rlc3QnIH07XG4gKiAgICAgIGl0ZW1TZXJ2aWNlLnNlYXJjaChwYXJhbXMpLnRoZW4ocmVzcG9uc2U9PntcbiAqICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLnJlc3VsdHMubGVuZ3RoICsgXCIgb2YgXCIgKyByZXNwb25zZS50b3RhbFJlc3VsdHMpO1xuICogICAgICB9KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICogRXggRmV0Y2ggSXRlbTpcbiAqICAgICAgaXRlbVNlcnZpY2UuZ2V0KGl0ZW1JZCkudGhlbihpdGVtPT57Li4ufSkuY2F0Y2goZT0+ey4uLn0pO1xuICpcbiAqIEV4IFNhdmluZyBJdGVtOlxuICogICAgICBpdGVtU2VydmljZS5zYXZlKGl0ZW0pLnRoZW4oaXRlbT0+ey4uLn0pLmNhdGNoKGU9PnsuLi59KTtcbiAqXG4gKiBFeCBEZWxldGluZyBJdGVtOlxuICogICAgICBpdGVtU2VydmljZS5yZW1vdmUoaXRlbUlkKS50aGVuKCgpPT57Li4ufSkuY2F0Y2goZT0+ey4uLn0pO1xuICpcbiAqIEV4IFBhdGNoaW5nIEl0ZW06XG4gKiAgICAgIGl0ZW1TZXJ2aWNlLnBhdGNoKGl0ZW1JZCxwYXRjaCkudGhlbihpdGVtPT57Li4ufSkuY2F0Y2goZT0+ey4uLn0pO1xuICpcbiAqL1xuY2xhc3MgSXRlbVNlcnZpY2Uge1xuXG4gICAgcHJvdGVjdGVkIGFwaUJhc2UgPzogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBiYXNlVXJsID86IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgY2xpZW50IDogR1BIdHRwQ2xpZW50O1xuICAgIHByb3RlY3RlZCBfdGltZW91dCA6IG51bWJlciA9IDMwMDAwO1xuICAgIHByb3RlY3RlZCBsb2dnZXIgOiBhbnk7XG4gICAgcHJvdGVjdGVkIGh0dHBNZXRob2RzIDogc3RyaW5nW10gPSBbXCJHRVRcIiwgXCJQT1NUXCIsIFwiUFVUXCIsIFwiREVMRVRFXCIsIFwiUEFUQ0hcIl07XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQpIHtcbiAgICAgICAgdGhpcy5zZXRVcmwodXJsKTtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBodHRwQ2xpZW50O1xuICAgIH1cblxuICAgIHNldFVybChiYXNlVXJsIDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYXBpQmFzZSA9IGJhc2VVcmw7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmwgKyAnL2FwaS9pdGVtcyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1pbGxpc2Vjb25kcyAtIG92ZXJyaWRlIGVudmlyb25tZW50IHZhcmlhYmxlIHRpbWVvdXRcbiAgICAgKi9cbiAgICBzZXRUaW1lb3V0KG1pbGxpc2Vjb25kcyA6IG51bWJlcikge1xuICAgICAgICB0aGlzLl90aW1lb3V0ID0gbWlsbGlzZWNvbmRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtaWxsaXNlY29uZHMgLSBvdmVycmlkZSBlbnZpcm9ubWVudCB2YXJpYWJsZSB0aW1lb3V0XG4gICAgICovXG4gICAgdGltZW91dChtaWxsaXNlY29uZHMgOiBudW1iZXIpIDogSXRlbVNlcnZpY2Uge1xuICAgICAgICB0aGlzLnNldFRpbWVvdXQobWlsbGlzZWNvbmRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBHUEh0dHBDbGllbnQgaW5zdGFuY2Ugb3IgbnVsbCBpZiBvbmUgd2FzIG5vdCBwcm92aWRlZFxuICAgICAqL1xuICAgIGdldENsaWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBsb2dnZXIgLSBsb2cgc2VydmljZVxuICAgICAqL1xuICAgIHNldExvZ2dlcihsb2dnZXIgOiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGUgLSBlcnJvciB0byBsb2cgKGlmIGxvZ2dlciBzcGVjaWZpZWQpXG4gICAgICovXG4gICAgbG9nRXJyb3IoZSA6IHN0cmluZ3xFcnJvcikge1xuICAgICAgICBpZih0aGlzLmxvZ2dlciAmJiB0aGlzLmxvZ2dlci5lcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbXNnIC0gbWVzc2FnZSB0byBsb2cgYXMgZGVidWdcbiAgICAgKi9cbiAgICBsb2dEZWJ1Zyhtc2cgOiBzdHJpbmcpIHtcbiAgICAgICAgaWYodGhpcy5sb2dnZXIgJiYgdGhpcy5sb2dnZXIuZGVidWcpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gZmV0Y2hcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEl0ZW0gb2JqZWN0IG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZ2V0IChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQ7XG4gICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy52ZXJzaW9uKSB7XG4gICAgICAgICAgICB1cmwgKz0gJy92ZXJzaW9ucy8nICsgb3B0aW9ucy52ZXJzaW9uO1xuICAgICAgICAgICAgLy8gdGhpcy5sb2dEZWJ1ZyhcIkNsaWVudC5nZXQgcmVxdWVzdGluZyB2ZXJzaW9uOiBcIiArIG9wdGlvbnMudmVyc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggdXJsIClcbiAgICAgICAgLnRoZW4oIHVybCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHsgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9ucyB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZ2V0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpdGVtT2JqIC0gaXRlbSB0byBjcmVhdGUgb3IgdXBkYXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIHNhdmUgKGl0ZW1PYmogOiBJdGVtLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGl0ZW1PYmogKVxuICAgICAgICAudGhlbiggaXRlbSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBtZXRob2QgPSAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5iYXNlVXJsO1xuICAgICAgICAgICAgaWYoaXRlbS5pZCkge1xuICAgICAgICAgICAgICAgIG1ldGhvZCA9IFwiUFVUXCI7XG4gICAgICAgICAgICAgICAgdXJsICs9ICcvJyArIGl0ZW0uaWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vaWYgaXRlbSBpcyBiZWluZyBjcmVhdGVkIGFuZCBoYXMgbm8gVVJJIGFscmVhZHkgZGVmaW5lZFxuICAgICAgICAgICAgICAgIC8vIGF0dGVtcHQgdG8gY3JlYXRlIG9uZSB1c2luZyB0aGUgQVBJJ3MgbWV0aG9kIGZvciBkb2luZyBzb1xuICAgICAgICAgICAgICAgIC8vIGFuZCB0aGVuIGF0dGVtcHQgdGhlIGFjdHVhbCBpdGVtIGNyZWF0aW9uXG4gICAgICAgICAgICAgICAgaWYoIWl0ZW0udXJpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFVyaShpdGVtLCBvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAudGhlbiggdXJpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udXJpID0gdXJpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgZGF0YTppdGVtLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgZGF0YTppdGVtLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG5cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igc2F2aW5nIGl0ZW06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2Uuc2F2ZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gZGVsZXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyB0cnVlIGlmIHN1Y2Nlc3NmdWwgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICByZW1vdmUgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8Ym9vbGVhbj4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHRoaXMuYmFzZVVybCArICcvJyArIGlkIClcbiAgICAgICAgLnRoZW4oIHVybCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJERUxFVEVcIiwgdXJsOiB1cmwsIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oICgpID0+IHRydWUpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGRlbGV0aW5nIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UucmVtb3ZlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgaXRlbSB0byBwYXRjaFxuICAgICAqIEBwYXJhbSBwYXRjaCAtIEhUVFAtUEFUQ0ggY29tcGxpYW50IHNldCBvZiBwcm9wZXJ0aWVzIHRvIHBhdGNoXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIHBhdGNoIChpZCA6IHN0cmluZywgcGF0Y2ggOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKVxuICAgICAgICAudGhlbiggdXJsID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQQVRDSFwiLCB1cmw6IHVybCwgZGF0YTogcGF0Y2gsIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgcGF0Y2hpbmcgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5wYXRjaCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgaXRlbSB0byBjbG9uZVxuICAgICAqIEBwYXJhbSBvdmVycmlkZXMgLSBLVlAgb2YgcHJvcGVydHktdmFsdWUgb3ZlcnJpZGVzIHRvIGFwcGx5IHRvIGNsb25lZCBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgY2xvbmUgb2YgSXRlbSBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGNsb25lIChpZCA6IHN0cmluZywgb3ZlcnJpZGVzIDogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy9jbG9uZScgKVxuICAgICAgICAudGhlbiggdXJsID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsIHVybDogdXJsLCBkYXRhOiBvdmVycmlkZXMsIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgY2xvbmluZyBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmNsb25lKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBlaXRoZXIgSlMgb2JqZWN0IG9mIHF1ZXJ5IHBhcmFtZXRlcnMgb3IgUXVlcnkgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgc2VhcmNoIChhcmcgPzogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8U2VhcmNoUmVzdWx0cz4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGFyZyApXG4gICAgICAgIC50aGVuKCBwYXJhbXMgPT4ge1xuICAgICAgICAgICAgbGV0IHBzID0ge307XG4gICAgICAgICAgICBpZihwYXJhbXMgJiYgdHlwZW9mKHBhcmFtcy5nZXRRdWVyeSkgPT09ICdmdW5jdGlvbicpIHBzID0gcGFyYW1zLmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICBlbHNlIGlmKHR5cGVvZihwYXJhbXMpID09PSAnb2JqZWN0JykgcHMgPSBwYXJhbXM7XG4gICAgICAgICAgICBlbHNlIHBzID0ge307XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYmFzZVVybCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBzLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igc2VhcmNoaW5nIGl0ZW1zOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLnNlYXJjaCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGFyZyAtIFVSTCB0byBtZXRhZGF0YSBkb2N1bWVudCBvciBGaWxlIHRvIHVwbG9hZFxuICAgICAqIEBwYXJhbSBmb3JtYXQgLSBtZXRhZGF0YSBmb3JtYXQgb2Ygc3BlY2lmaWVkIGRvY3VtZW50XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBHZW9QbGF0Zm9ybSBJdGVtXG4gICAgICovXG4gICAgaW1wb3J0IChhcmcgOiBhbnksIGZvcm1hdCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCB0cnVlIClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIGlmKGFyZz09PW51bGwgfHwgYXJnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgYSB2YWxpZCBVUkwgb3IgRmlsZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBpc0ZpbGUgPSB0eXBlb2YoYXJnKSAhPT0gJ3N0cmluZyc7XG4gICAgICAgICAgICBsZXQgcm8gOiB7IFtrZXk6c3RyaW5nXTphbnkgfSA9IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmFwaUJhc2UgKyAnL2FwaS9pbXBvcnQnLFxuICAgICAgICAgICAgICAgIHByb2Nlc3NEYXRhOiB0cnVlLCAgLy9mb3IgalF1ZXJ5XG4gICAgICAgICAgICAgICAgZm9ybURhdGE6IHRydWUsICAgICAvL2ZvciBOb2RlIChSZXF1ZXN0SlMpXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKGlzRmlsZSkge1xuICAgICAgICAgICAgICAgIHJvLmZpbGUgPSBhcmc7XG4gICAgICAgICAgICAgICAgcm8uZGF0YSA9IHsgZm9ybWF0OiBmb3JtYXQgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm8uZm9ybURhdGEgPSBmYWxzZTsgICAgLy9tdXN0IGJlIGZhbHNlIGZvciBkYXRhIHRvIG5vdCBiZSBtdWx0aS1wYXJ0IGZvcm1kYXRhXG4gICAgICAgICAgICAgICAgcm8uZGF0YSA9IHsgdXJsOiBhcmcsIGZvcm1hdDogZm9ybWF0IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMub3ZlcndyaXRlKSB7XG4gICAgICAgICAgICAgICAgcm8uZGF0YS5vdmVyd3JpdGUgPSAoISFvcHRpb25zLm92ZXJ3cml0ZSkrJyc7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMub3ZlcndyaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdChybyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgaW1wb3J0aW5nIGl0ZW06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgaWYoZS5zdGF0dXMgPT09IDQwOSB8fCB+ZS5tZXNzYWdlLmluZGV4T2YoJ0l0ZW0gYWxyZWFkeSBleGlzdHMnKSlcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwge3N0YXR1czogNDA5fSk7XG4gICAgICAgICAgICBpZihlLml0ZW0pXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIHsgaXRlbSA6IGUuaXRlbSB9KTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmltcG9ydCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiB0aGUgaXRlbSB0byBleHBvcnRcbiAgICAgKiBAcGFyYW0gZm9ybWF0IC0gc3RyaW5nIG1pbWUgdHlwZSB0byBleHBvcnRcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEhUVFAgcmVzcG9uc2Ugb2JqZWN0IGZvciBlbmFibGluZyBhdHRhY2htZW50IGRvd25sb2FkaW5nXG4gICAgICovXG4gICAgZXhwb3J0IChpZCA6IHN0cmluZywgZm9ybWF0IDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggdHJ1ZSApXG4gICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL2V4cG9ydCc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge2Zvcm1hdDpmb3JtYXR9LFxuICAgICAgICAgICAgICAgIGpzb246IGZhbHNlLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCBlID0+IHtcbiAgICAgICAgICAgIGxldCBtc2cgPSBlLm1lc3NhZ2U7XG4gICAgICAgICAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9HZW9QbGF0Zm9ybS9jbGllbnQtYXBpL2lzc3Vlcy8xXG4gICAgICAgICAgICBpZihlLnN0YXR1c0NvZGUgJiYgZS5zdGF0dXNDb2RlPT09NDA2IHx8IGUuc3RhdHVzQ29kZT09PSc0MDYnKSB7XG4gICAgICAgICAgICAgICAgbXNnID0gYFVuc3VwcG9ydGVkIGV4cG9ydCBmb3JtYXQgc3BlY2lmaWVkICcke2Zvcm1hdH0nYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGV4cG9ydGluZyBpdGVtOiAke21zZ31gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmV4cG9ydCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYmplY3QgLSBHUCBvYmplY3QgZGVmaW5pdGlvbiB0byBnZW5lcmF0ZSBhIFVSSSBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHJlcXVlc3Qgb3B0aW9uc1xuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc3RyaW5nIFVSSVxuICAgICAqL1xuICAgIGdldFVyaSAob2JqZWN0IDogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggb2JqZWN0IClcbiAgICAgICAgLnRoZW4oIG9iaiA9PiB7XG4gICAgICAgICAgICBpZighb2JqIHx8ICFvYmoudHlwZSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgYW4gb2JqZWN0IHdpdGggYSB0eXBlIHByb3BlcnR5XCIpO1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYXBpQmFzZSArICcvYXBpL3V0aWxzL3VyaSc7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgICAgIG9wdGlvbnMucmVzcG9uc2VUeXBlID0gJ3RleHQnOyAgLy90byBlbnN1cmUgcGxhaW50ZXh0IGlzIGV4cGVjdGVkXG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLCB1cmw6IHVybCwgZGF0YTogb2JqLCBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCggZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBnZXR0aW5nIFVSSSBmb3IgaXRlbTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5nZXRVcmkoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZHMgLSBsaXN0IG9mIGlkZW50aWZpZXJzIHRvIGZldGNoIG9iamVjdHMgZm9yXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBsaXN0IG9mIG1hdGNoaW5nIGl0ZW1zIG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZ2V0TXVsdGlwbGUgKGlkcyA6IHN0cmluZ1tdLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggaWRzIClcbiAgICAgICAgLnRoZW4oIGlkZW50aWZpZXJzID0+IHtcblxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLmFwaUJhc2UgKyAnL2FwaS9mZXRjaCc7XG5cbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIGRhdGE6aWRlbnRpZmllcnMsIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcblxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyBpdGVtczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5nZXRNdWx0aXBsZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB1cmlzIC0gbGlzdCBvZiBVUklzIHRvIHJldHJpZXZlIG9iamVjdHMgZm9yXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBsaXN0IGNvbnRhaW5pbmcgdXJpLWl0ZW0gYXNzb2NpYXRpb24gd2hlcmUgZXhpc3RzXG4gICAgICovXG4gICAgZXhpc3RzKHVyaXMgOiBzdHJpbmdbXSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKHVyaXMpXG4gICAgICAgIC50aGVuKCB1cmlzID0+IHtcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSAnUE9TVCcsIHVybCA9IHRoaXMuYXBpQmFzZSArICcvYXBpL3V0aWxzL2V4aXN0cyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHttZXRob2Q6bWV0aG9kLCB1cmw6dXJsLCBkYXRhOnVyaXMsIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgcmVzb2x2aW5nIGl0ZW1zOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmV4aXN0cygpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGxpa2UoaXRlbSA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKGl0ZW0uaWQpXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gJ1BVVCcsIHVybCA9IHRoaXMuYXBpQmFzZSArICcvYXBpL2l0ZW1zLycgKyBpZCArICcvbGlrZXMnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBsaWtpbmcgaXRlbSAke2l0ZW0uaWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmxpa2UoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmlldyhpdGVtIDogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoaXRlbS5pZClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSAnUFVUJywgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvaXRlbXMvJyArIGlkICsgJy92aWV3cyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHttZXRob2Q6bWV0aG9kLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGluY3JlbWVudGluZyB2aWV3cyBmb3IgaXRlbSAke2l0ZW0uaWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmxpa2UoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gZmV0Y2ggYXNzb2NpYXRpb25zIGZvclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgYXJyYXkgb2YgYXNzb2NpYXRlZCBpdGVtcyBvZiB0aGUgaXRlbSBpbiBxdWVzdGlvblxuICAgICAqL1xuICAgIGFzc29jaWF0aW9ucyAoaWQgOiBzdHJpbmcsIHBhcmFtcyA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGlkIClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvYXNzb2NpYXRpb25zJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgICAgICAgICAgICAgIHVybDp1cmwsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMgfHwge30sXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyBhc3NvY2lhdGlvbnMgZm9yIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuYXNzb2NpYXRpb25zKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgaXRlbSB0byBmZXRjaCB2ZXJzaW9uIGluZm8gZm9yXG4gICAgICogQHBhcmFtIHBhcmFtcyAtIG9wdGlvbmFsIHNldCBvZiBxdWVyeSBwYXJhbWV0ZXJzIHRvIGNvbnN0cmFpbiBsaXN0IG9mIHZlcnNpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBhcnJheSBvZiBhdmFpbGFibGUgdmVyc2lvbnMgb2YgdGhlIGl0ZW1cbiAgICAgKi9cbiAgICB2ZXJzaW9ucyAoaWQgOiBzdHJpbmcsIHBhcmFtcyA/OiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL3ZlcnNpb25zJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBwYXJhbXM6IHBhcmFtcywgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIHZlcnNpb25zIGZvciBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLnZlcnNpb25zKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1ldGhvZCAtIG9uZSBvZiBcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIiwgXCJQQVRDSFwiXG4gICAgICogQHBhcmFtIHVybCAtIGRlc3RpbmF0aW9uIG9mIHhociByZXF1ZXN0XG4gICAgICogQHBhcmFtIHBhcmFtcyAtIG9iamVjdCB0byBiZSBzZW50IHdpdGggcmVxdWVzdCBhcyBxdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIGRhdGEgLSBvYmplY3QgdG8gYmUgc2VudCB3aXRoIHJlcXVlc3QgYXMgYm9keVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgb2JqZWN0IGRlZmluaW5nIHJlcXVlc3Qgb3B0aW9uc1xuICAgICAqIEByZXR1cm4gcmVxdWVzdCBvcHRpb25zIGZvciB4aHJcbiAgICAgKi9cbiAgICBidWlsZFJlcXVlc3QgKG9wdGlvbnMgOiB7W2tleTpzdHJpbmddOmFueX0pIDoge1trZXk6c3RyaW5nXTphbnl9IHtcblxuICAgICAgICBpZih0aGlzLmh0dHBNZXRob2RzLmluZGV4T2Yob3B0aW9ucy5tZXRob2QpPDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIEhUVFAgbWV0aG9kICR7b3B0aW9ucy5tZXRob2R9YCk7XG5cbiAgICAgICAgaWYoIW9wdGlvbnMudXJsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdXN0IHNwZWNpZnkgYSBVUkwgZm9yIEhUVFAgcmVxdWVzdHNgKTtcblxuICAgICAgICBvcHRpb25zLnRpbWVvdXQgPSB0aGlzLl90aW1lb3V0IHx8IDMwMDAwO1xuICAgICAgICBsZXQgb3B0cyA9IHRoaXMuY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBvcHRzO1xuICAgIH1cblxuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMgOiB7W2tleTpzdHJpbmddOmFueX0pIDoge1trZXk6c3RyaW5nXTphbnl9IHtcbiAgICAgICAgbGV0IHJlcXVlc3QgPSB0aGlzLmNsaWVudC5jcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zKTtcbiAgICAgICAgdGhpcy5sb2dEZWJ1ZyhcIkl0ZW1TZXJ2aWNlLmNyZWF0ZVJlcXVlc3RPcHRzKCkgLSBcIiArIEpTT04uc3RyaW5naWZ5KHJlcXVlc3QpKTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShvcHRzIDoge1trZXk6c3RyaW5nXTphbnl9ICkgOiBRLlByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5leGVjdXRlKG9wdHMpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGlmKGUgPT09IG51bGwgfHwgdHlwZW9mKGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGUgPSBuZXcgRXJyb3IoXCJJdGVtU2VydmljZS5leGVjdXRlKCkgLSBSZXF1ZXN0IGZhaWxlZCBidXQgZGlkbid0IHJldHVybiBhbiBcIiArXG4gICAgICAgICAgICAgICAgXCJlcnJvci4gVGhpcyBpcyBtb3N0IGxpa2VseSBiZWNhdXNlIHRoZSByZXF1ZXN0IHRpbWVkIG91dFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEl0ZW1TZXJ2aWNlO1xuIl19