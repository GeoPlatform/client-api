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
     * @param {?=} arg - either JS object of query parameters or GeoPlatform.Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    search(arg, options) {
        return Q.resolve(arg)
            .then(params => {
            /** @type {?} */
            let ps = params ? params.getQuery() : {};
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: this.baseUrl, params: ps, options: options
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCdkI7Ozs7O0lBU0ksWUFBWSxHQUFZLEVBQUUsVUFBeUI7d0JBSnJCLEtBQUs7MkJBRUEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO1FBR3hFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7S0FDNUI7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQWdCO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxHQUFHLFlBQVksQ0FBQztLQUN6Qzs7Ozs7SUFLRCxVQUFVLENBQUMsWUFBcUI7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7S0FDaEM7Ozs7O0lBS0QsT0FBTyxDQUFDLFlBQXFCO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUM7S0FDZjs7Ozs7SUFLRCxTQUFTLENBQUMsTUFBWTtRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN4Qjs7Ozs7SUFLRCxRQUFRLENBQUMsQ0FBZ0I7UUFDckIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hCO0tBQ0o7Ozs7O0lBS0QsUUFBUSxDQUFDLEdBQVk7UUFDakIsSUFB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OEQ7b0JBQzVFLDBEQUEwRCxDQUFDLENBQUM7YUFDL0Q7WUFDRCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEIsQ0FBQyxDQUFDO0tBQ047Q0FFSjs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsZUFBZSxXQUFXLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XG5pbXBvcnQgeyBJdGVtLCBTZWFyY2hSZXN1bHRzIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscyc7XG5pbXBvcnQgUXVlcnkgZnJvbSAnLi4vc2hhcmVkL3F1ZXJ5JztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuXG4vKipcbiAqIEl0ZW1TZXJ2aWNlXG4gKiBzZXJ2aWNlIGZvciB3b3JraW5nIHdpdGggdGhlIEdlb1BsYXRmb3JtIEFQSSB0b1xuICogcmV0cmlldmUgYW5kIG1hbmlwdWxhdGUgaXRlbXMuXG4gKlxuICogRXggU2VhcmNoaW5nIEl0ZW1zXG4gKiAgICAgIGxldCBwYXJhbXMgPSB7IHE6ICd0ZXN0JyB9O1xuICogICAgICBpdGVtU2VydmljZS5zZWFyY2gocGFyYW1zKS50aGVuKHJlc3BvbnNlPT57XG4gKiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5yZXN1bHRzLmxlbmd0aCArIFwiIG9mIFwiICsgcmVzcG9uc2UudG90YWxSZXN1bHRzKTtcbiAqICAgICAgfSkuY2F0Y2goZT0+ey4uLn0pO1xuICpcbiAqIEV4IEZldGNoIEl0ZW06XG4gKiAgICAgIGl0ZW1TZXJ2aWNlLmdldChpdGVtSWQpLnRoZW4oaXRlbT0+ey4uLn0pLmNhdGNoKGU9PnsuLi59KTtcbiAqXG4gKiBFeCBTYXZpbmcgSXRlbTpcbiAqICAgICAgaXRlbVNlcnZpY2Uuc2F2ZShpdGVtKS50aGVuKGl0ZW09PnsuLi59KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICogRXggRGVsZXRpbmcgSXRlbTpcbiAqICAgICAgaXRlbVNlcnZpY2UucmVtb3ZlKGl0ZW1JZCkudGhlbigoKT0+ey4uLn0pLmNhdGNoKGU9PnsuLi59KTtcbiAqXG4gKiBFeCBQYXRjaGluZyBJdGVtOlxuICogICAgICBpdGVtU2VydmljZS5wYXRjaChpdGVtSWQscGF0Y2gpLnRoZW4oaXRlbT0+ey4uLn0pLmNhdGNoKGU9PnsuLi59KTtcbiAqXG4gKi9cbmNsYXNzIEl0ZW1TZXJ2aWNlIHtcblxuICAgIHByb3RlY3RlZCBhcGlCYXNlID86IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgYmFzZVVybCA/OiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIGNsaWVudCA6IEdQSHR0cENsaWVudDtcbiAgICBwcm90ZWN0ZWQgX3RpbWVvdXQgOiBudW1iZXIgPSAzMDAwMDtcbiAgICBwcm90ZWN0ZWQgbG9nZ2VyIDogYW55O1xuICAgIHByb3RlY3RlZCBodHRwTWV0aG9kcyA6IHN0cmluZ1tdID0gW1wiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJdO1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuc2V0VXJsKHVybCk7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gaHR0cENsaWVudDtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybCA6IHN0cmluZykge1xuICAgICAgICB0aGlzLmFwaUJhc2UgPSBiYXNlVXJsO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvaXRlbXMnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtaWxsaXNlY29uZHMgLSBvdmVycmlkZSBlbnZpcm9ubWVudCB2YXJpYWJsZSB0aW1lb3V0XG4gICAgICovXG4gICAgc2V0VGltZW91dChtaWxsaXNlY29uZHMgOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdGltZW91dCA9IG1pbGxpc2Vjb25kcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWlsbGlzZWNvbmRzIC0gb3ZlcnJpZGUgZW52aXJvbm1lbnQgdmFyaWFibGUgdGltZW91dFxuICAgICAqL1xuICAgIHRpbWVvdXQobWlsbGlzZWNvbmRzIDogbnVtYmVyKSA6IEl0ZW1TZXJ2aWNlIHtcbiAgICAgICAgdGhpcy5zZXRUaW1lb3V0KG1pbGxpc2Vjb25kcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBsb2dnZXIgLSBsb2cgc2VydmljZVxuICAgICAqL1xuICAgIHNldExvZ2dlcihsb2dnZXIgOiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGUgLSBlcnJvciB0byBsb2cgKGlmIGxvZ2dlciBzcGVjaWZpZWQpXG4gICAgICovXG4gICAgbG9nRXJyb3IoZSA6IHN0cmluZ3xFcnJvcikge1xuICAgICAgICBpZih0aGlzLmxvZ2dlciAmJiB0aGlzLmxvZ2dlci5lcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbXNnIC0gbWVzc2FnZSB0byBsb2cgYXMgZGVidWdcbiAgICAgKi9cbiAgICBsb2dEZWJ1Zyhtc2cgOiBzdHJpbmcpIHtcbiAgICAgICAgaWYodGhpcy5sb2dnZXIgJiYgdGhpcy5sb2dnZXIuZGVidWcpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gZmV0Y2hcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEl0ZW0gb2JqZWN0IG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZ2V0IChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQ7XG4gICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy52ZXJzaW9uKSB7XG4gICAgICAgICAgICB1cmwgKz0gJy92ZXJzaW9ucy8nICsgb3B0aW9ucy52ZXJzaW9uO1xuICAgICAgICAgICAgLy8gdGhpcy5sb2dEZWJ1ZyhcIkNsaWVudC5nZXQgcmVxdWVzdGluZyB2ZXJzaW9uOiBcIiArIG9wdGlvbnMudmVyc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggdXJsIClcbiAgICAgICAgLnRoZW4oIHVybCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHsgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9ucyB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZ2V0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpdGVtT2JqIC0gaXRlbSB0byBjcmVhdGUgb3IgdXBkYXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIHNhdmUgKGl0ZW1PYmogOiBJdGVtLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGl0ZW1PYmogKVxuICAgICAgICAudGhlbiggaXRlbSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBtZXRob2QgPSAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5iYXNlVXJsO1xuICAgICAgICAgICAgaWYoaXRlbS5pZCkge1xuICAgICAgICAgICAgICAgIG1ldGhvZCA9IFwiUFVUXCI7XG4gICAgICAgICAgICAgICAgdXJsICs9ICcvJyArIGl0ZW0uaWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vaWYgaXRlbSBpcyBiZWluZyBjcmVhdGVkIGFuZCBoYXMgbm8gVVJJIGFscmVhZHkgZGVmaW5lZFxuICAgICAgICAgICAgICAgIC8vIGF0dGVtcHQgdG8gY3JlYXRlIG9uZSB1c2luZyB0aGUgQVBJJ3MgbWV0aG9kIGZvciBkb2luZyBzb1xuICAgICAgICAgICAgICAgIC8vIGFuZCB0aGVuIGF0dGVtcHQgdGhlIGFjdHVhbCBpdGVtIGNyZWF0aW9uXG4gICAgICAgICAgICAgICAgaWYoIWl0ZW0udXJpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFVyaShpdGVtLCBvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAudGhlbiggdXJpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udXJpID0gdXJpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgZGF0YTppdGVtLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgZGF0YTppdGVtLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG5cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igc2F2aW5nIGl0ZW06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2Uuc2F2ZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gZGVsZXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyB0cnVlIGlmIHN1Y2Nlc3NmdWwgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICByZW1vdmUgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8Ym9vbGVhbj4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHRoaXMuYmFzZVVybCArICcvJyArIGlkIClcbiAgICAgICAgLnRoZW4oIHVybCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJERUxFVEVcIiwgdXJsOiB1cmwsIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oICgpID0+IHRydWUpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGRlbGV0aW5nIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UucmVtb3ZlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgaXRlbSB0byBwYXRjaFxuICAgICAqIEBwYXJhbSBwYXRjaCAtIEhUVFAtUEFUQ0ggY29tcGxpYW50IHNldCBvZiBwcm9wZXJ0aWVzIHRvIHBhdGNoXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIHBhdGNoIChpZCA6IHN0cmluZywgcGF0Y2ggOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKVxuICAgICAgICAudGhlbiggdXJsID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQQVRDSFwiLCB1cmw6IHVybCwgZGF0YTogcGF0Y2gsIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgcGF0Y2hpbmcgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5wYXRjaCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgaXRlbSB0byBjbG9uZVxuICAgICAqIEBwYXJhbSBvdmVycmlkZXMgLSBLVlAgb2YgcHJvcGVydHktdmFsdWUgb3ZlcnJpZGVzIHRvIGFwcGx5IHRvIGNsb25lZCBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgY2xvbmUgb2YgSXRlbSBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGNsb25lIChpZCA6IHN0cmluZywgb3ZlcnJpZGVzIDogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy9jbG9uZScgKVxuICAgICAgICAudGhlbiggdXJsID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsIHVybDogdXJsLCBkYXRhOiBvdmVycmlkZXMsIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgY2xvbmluZyBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmNsb25lKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBlaXRoZXIgSlMgb2JqZWN0IG9mIHF1ZXJ5IHBhcmFtZXRlcnMgb3IgR2VvUGxhdGZvcm0uUXVlcnkgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgc2VhcmNoIChhcmcgPzogUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxTZWFyY2hSZXN1bHRzPiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggYXJnIClcbiAgICAgICAgLnRoZW4oIHBhcmFtcyA9PiB7XG4gICAgICAgICAgICBsZXQgcHMgPSBwYXJhbXMgPyBwYXJhbXMuZ2V0UXVlcnkoKSA6IHt9O1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDogdGhpcy5iYXNlVXJsLCBwYXJhbXM6IHBzLCBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHNlYXJjaGluZyBpdGVtczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5zZWFyY2goKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhcmcgLSBVUkwgdG8gbWV0YWRhdGEgZG9jdW1lbnQgb3IgRmlsZSB0byB1cGxvYWRcbiAgICAgKiBAcGFyYW0gZm9ybWF0IC0gbWV0YWRhdGEgZm9ybWF0IG9mIHNwZWNpZmllZCBkb2N1bWVudFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgR2VvUGxhdGZvcm0gSXRlbVxuICAgICAqL1xuICAgIGltcG9ydCAoYXJnIDogYW55LCBmb3JtYXQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggdHJ1ZSApXG4gICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICBpZihhcmc9PT1udWxsIHx8IGFyZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGEgdmFsaWQgVVJMIG9yIEZpbGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgaXNGaWxlID0gdHlwZW9mKGFyZykgIT09ICdzdHJpbmcnO1xuICAgICAgICAgICAgbGV0IHJvIDogeyBba2V5OnN0cmluZ106YW55IH0gPSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIHVybDogdGhpcy5hcGlCYXNlICsgJy9hcGkvaW1wb3J0JyxcbiAgICAgICAgICAgICAgICBwcm9jZXNzRGF0YTogdHJ1ZSwgIC8vZm9yIGpRdWVyeVxuICAgICAgICAgICAgICAgIGZvcm1EYXRhOiB0cnVlLCAgICAgLy9mb3IgTm9kZSAoUmVxdWVzdEpTKVxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZihpc0ZpbGUpIHtcbiAgICAgICAgICAgICAgICByby5maWxlID0gYXJnO1xuICAgICAgICAgICAgICAgIHJvLmRhdGEgPSB7IGZvcm1hdDogZm9ybWF0IH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvLmZvcm1EYXRhID0gZmFsc2U7ICAgIC8vbXVzdCBiZSBmYWxzZSBmb3IgZGF0YSB0byBub3QgYmUgbXVsdGktcGFydCBmb3JtZGF0YVxuICAgICAgICAgICAgICAgIHJvLmRhdGEgPSB7IHVybDogYXJnLCBmb3JtYXQ6IGZvcm1hdCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLm92ZXJ3cml0ZSkge1xuICAgICAgICAgICAgICAgIHJvLmRhdGEub3ZlcndyaXRlID0gKCEhb3B0aW9ucy5vdmVyd3JpdGUpKycnO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLm92ZXJ3cml0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qocm8pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCBlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGltcG9ydGluZyBpdGVtOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIGlmKGUuc3RhdHVzID09PSA0MDkgfHwgfmUubWVzc2FnZS5pbmRleE9mKCdJdGVtIGFscmVhZHkgZXhpc3RzJykpXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIHtzdGF0dXM6IDQwOX0pO1xuICAgICAgICAgICAgaWYoZS5pdGVtKVxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCB7IGl0ZW0gOiBlLml0ZW0gfSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5pbXBvcnQoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgdGhlIGl0ZW0gdG8gZXhwb3J0XG4gICAgICogQHBhcmFtIGZvcm1hdCAtIHN0cmluZyBtaW1lIHR5cGUgdG8gZXhwb3J0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBIVFRQIHJlc3BvbnNlIG9iamVjdCBmb3IgZW5hYmxpbmcgYXR0YWNobWVudCBkb3dubG9hZGluZ1xuICAgICAqL1xuICAgIGV4cG9ydCAoaWQgOiBzdHJpbmcsIGZvcm1hdCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHRydWUgKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy9leHBvcnQnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLCB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtmb3JtYXQ6Zm9ybWF0fSxcbiAgICAgICAgICAgICAgICBqc29uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCggZSA9PiB7XG4gICAgICAgICAgICBsZXQgbXNnID0gZS5tZXNzYWdlO1xuICAgICAgICAgICAgLy9odHRwczovL2dpdGh1Yi5jb20vR2VvUGxhdGZvcm0vY2xpZW50LWFwaS9pc3N1ZXMvMVxuICAgICAgICAgICAgaWYoZS5zdGF0dXNDb2RlICYmIGUuc3RhdHVzQ29kZT09PTQwNiB8fCBlLnN0YXR1c0NvZGU9PT0nNDA2Jykge1xuICAgICAgICAgICAgICAgIG1zZyA9IGBVbnN1cHBvcnRlZCBleHBvcnQgZm9ybWF0IHNwZWNpZmllZCAnJHtmb3JtYXR9J2A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBleHBvcnRpbmcgaXRlbTogJHttc2d9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5leHBvcnQoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb2JqZWN0IC0gR1Agb2JqZWN0IGRlZmluaXRpb24gdG8gZ2VuZXJhdGUgYSBVUkkgZm9yXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCByZXF1ZXN0IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHN0cmluZyBVUklcbiAgICAgKi9cbiAgICBnZXRVcmkgKG9iamVjdCA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIG9iamVjdCApXG4gICAgICAgIC50aGVuKCBvYmogPT4ge1xuICAgICAgICAgICAgaWYoIW9iaiB8fCAhb2JqLnR5cGUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGFuIG9iamVjdCB3aXRoIGEgdHlwZSBwcm9wZXJ0eVwiKTtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmFwaUJhc2UgKyAnL2FwaS91dGlscy91cmknO1xuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgICAgICBvcHRpb25zLnJlc3BvbnNlVHlwZSA9ICd0ZXh0JzsgIC8vdG8gZW5zdXJlIHBsYWludGV4dCBpcyBleHBlY3RlZFxuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIiwgdXJsOiB1cmwsIGRhdGE6IG9iaiwgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZ2V0dGluZyBVUkkgZm9yIGl0ZW06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZ2V0VXJpKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWRzIC0gbGlzdCBvZiBpZGVudGlmaWVycyB0byBmZXRjaCBvYmplY3RzIGZvclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgbGlzdCBvZiBtYXRjaGluZyBpdGVtcyBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGdldE11bHRpcGxlIChpZHMgOiBzdHJpbmdbXSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGlkcyApXG4gICAgICAgIC50aGVuKCBpZGVudGlmaWVycyA9PiB7XG5cbiAgICAgICAgICAgIGxldCBtZXRob2QgPSAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvZmV0Y2gnO1xuXG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHttZXRob2Q6bWV0aG9kLCB1cmw6dXJsLCBkYXRhOmlkZW50aWZpZXJzLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG5cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZmV0Y2hpbmcgaXRlbXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZ2V0TXVsdGlwbGUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdXJpcyAtIGxpc3Qgb2YgVVJJcyB0byByZXRyaWV2ZSBvYmplY3RzIGZvclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgbGlzdCBjb250YWluaW5nIHVyaS1pdGVtIGFzc29jaWF0aW9uIHdoZXJlIGV4aXN0c1xuICAgICAqL1xuICAgIGV4aXN0cyh1cmlzIDogc3RyaW5nW10sIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSh1cmlzKVxuICAgICAgICAudGhlbiggdXJpcyA9PiB7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gJ1BPU1QnLCB1cmwgPSB0aGlzLmFwaUJhc2UgKyAnL2FwaS91dGlscy9leGlzdHMnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgZGF0YTp1cmlzLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHJlc29sdmluZyBpdGVtczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5leGlzdHMoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBsaWtlKGl0ZW0gOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZShpdGVtLmlkKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IG1ldGhvZCA9ICdQVVQnLCB1cmwgPSB0aGlzLmFwaUJhc2UgKyAnL2FwaS9pdGVtcy8nICsgaWQgKyAnL2xpa2VzJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgbGlraW5nIGl0ZW0gJHtpdGVtLmlkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5saWtlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpZXcoaXRlbSA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKGl0ZW0uaWQpXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gJ1BVVCcsIHVybCA9IHRoaXMuYXBpQmFzZSArICcvYXBpL2l0ZW1zLycgKyBpZCArICcvdmlld3MnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBpbmNyZW1lbnRpbmcgdmlld3MgZm9yIGl0ZW0gJHtpdGVtLmlkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5saWtlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBpdGVtIHRvIGZldGNoIGFzc29jaWF0aW9ucyBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGFycmF5IG9mIGFzc29jaWF0ZWQgaXRlbXMgb2YgdGhlIGl0ZW0gaW4gcXVlc3Rpb25cbiAgICAgKi9cbiAgICBhc3NvY2lhdGlvbnMgKGlkIDogc3RyaW5nLCBwYXJhbXMgOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL2Fzc29jaWF0aW9ucyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6dXJsLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zIHx8IHt9LFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZmV0Y2hpbmcgYXNzb2NpYXRpb25zIGZvciBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmFzc29jaWF0aW9ucygpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gZmV0Y2ggdmVyc2lvbiBpbmZvIGZvclxuICAgICAqIEBwYXJhbSBwYXJhbXMgLSBvcHRpb25hbCBzZXQgb2YgcXVlcnkgcGFyYW1ldGVycyB0byBjb25zdHJhaW4gbGlzdCBvZiB2ZXJzaW9uc1xuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgYXJyYXkgb2YgYXZhaWxhYmxlIHZlcnNpb25zIG9mIHRoZSBpdGVtXG4gICAgICovXG4gICAgdmVyc2lvbnMgKGlkIDogc3RyaW5nLCBwYXJhbXMgPzogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggaWQgKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy92ZXJzaW9ucyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnVybCwgcGFyYW1zOiBwYXJhbXMsIG9wdGlvbnM6b3B0aW9ucyBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZmV0Y2hpbmcgdmVyc2lvbnMgZm9yIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UudmVyc2lvbnMoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWV0aG9kIC0gb25lIG9mIFwiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJcbiAgICAgKiBAcGFyYW0gdXJsIC0gZGVzdGluYXRpb24gb2YgeGhyIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gcGFyYW1zIC0gb2JqZWN0IHRvIGJlIHNlbnQgd2l0aCByZXF1ZXN0IGFzIHF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gZGF0YSAtIG9iamVjdCB0byBiZSBzZW50IHdpdGggcmVxdWVzdCBhcyBib2R5XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBvYmplY3QgZGVmaW5pbmcgcmVxdWVzdCBvcHRpb25zXG4gICAgICogQHJldHVybiByZXF1ZXN0IG9wdGlvbnMgZm9yIHhoclxuICAgICAqL1xuICAgIGJ1aWxkUmVxdWVzdCAob3B0aW9ucyA6IHtba2V5OnN0cmluZ106YW55fSkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuXG4gICAgICAgIGlmKHRoaXMuaHR0cE1ldGhvZHMuaW5kZXhPZihvcHRpb25zLm1ldGhvZCk8MClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgSFRUUCBtZXRob2QgJHtvcHRpb25zLm1ldGhvZH1gKTtcblxuICAgICAgICBpZighb3B0aW9ucy51cmwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE11c3Qgc3BlY2lmeSBhIFVSTCBmb3IgSFRUUCByZXF1ZXN0c2ApO1xuXG4gICAgICAgIG9wdGlvbnMudGltZW91dCA9IHRoaXMuX3RpbWVvdXQgfHwgMzAwMDA7XG4gICAgICAgIGxldCBvcHRzID0gdGhpcy5jcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHtba2V5OnN0cmluZ106YW55fSkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuICAgICAgICBsZXQgcmVxdWVzdCA9IHRoaXMuY2xpZW50LmNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmxvZ0RlYnVnKFwiSXRlbVNlcnZpY2UuY3JlYXRlUmVxdWVzdE9wdHMoKSAtIFwiICsgSlNPTi5zdHJpbmdpZnkocmVxdWVzdCkpO1xuICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICB9XG5cbiAgICBleGVjdXRlKG9wdHMgOiB7W2tleTpzdHJpbmddOmFueX0gKSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LmV4ZWN1dGUob3B0cylcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgaWYoZSA9PT0gbnVsbCB8fCB0eXBlb2YoZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgZSA9IG5ldyBFcnJvcihcIkl0ZW1TZXJ2aWNlLmV4ZWN1dGUoKSAtIFJlcXVlc3QgZmFpbGVkIGJ1dCBkaWRuJ3QgcmV0dXJuIGFuIFwiICtcbiAgICAgICAgICAgICAgICBcImVycm9yLiBUaGlzIGlzIG1vc3QgbGlrZWx5IGJlY2F1c2UgdGhlIHJlcXVlc3QgdGltZWQgb3V0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSXRlbVNlcnZpY2U7XG4iXX0=