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
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving array of available versions of the item
     */
    versions(id, options) {
        return Q.resolve(id)
            .then(id => {
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/versions';
            /** @type {?} */
            let opts = this.buildRequest({ method: "GET", url: url, options: options });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCdkI7Ozs7O0lBU0ksWUFBWSxHQUFZLEVBQUUsVUFBeUI7d0JBSnJCLEtBQUs7MkJBRUEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO1FBR3hFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7S0FDNUI7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQWdCO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxHQUFHLFlBQVksQ0FBQztLQUN6Qzs7Ozs7SUFLRCxVQUFVLENBQUMsWUFBcUI7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7S0FDaEM7Ozs7O0lBS0QsT0FBTyxDQUFDLFlBQXFCO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUM7S0FDZjs7Ozs7SUFLRCxTQUFTLENBQUMsTUFBWTtRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN4Qjs7Ozs7SUFLRCxRQUFRLENBQUMsQ0FBZ0I7UUFDckIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hCO0tBQ0o7Ozs7O0lBS0QsUUFBUSxDQUFDLEdBQVk7UUFDakIsSUFB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LENBQUM7S0FDbEI7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQXlCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQy9CLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNQLElBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxPQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO2dCQUN4QyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsOERBQThEO29CQUM1RSwwREFBMEQsQ0FBQyxDQUFDO2FBQy9EO1lBQ0QsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RCLENBQUMsQ0FBQztLQUNOO0NBRUo7Ozs7Ozs7Ozs7Ozs7OztBQUVELGVBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBRIGZyb20gJ3EnO1xuaW1wb3J0IHsgSXRlbSwgU2VhcmNoUmVzdWx0cyB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMnO1xuaW1wb3J0IFF1ZXJ5IGZyb20gJy4uL3NoYXJlZC9xdWVyeSc7XG5pbXBvcnQgR1BIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvY2xpZW50JztcblxuLyoqXG4gKiBJdGVtU2VydmljZVxuICogc2VydmljZSBmb3Igd29ya2luZyB3aXRoIHRoZSBHZW9QbGF0Zm9ybSBBUEkgdG9cbiAqIHJldHJpZXZlIGFuZCBtYW5pcHVsYXRlIGl0ZW1zLlxuICpcbiAqIEV4IFNlYXJjaGluZyBJdGVtc1xuICogICAgICBsZXQgcGFyYW1zID0geyBxOiAndGVzdCcgfTtcbiAqICAgICAgaXRlbVNlcnZpY2Uuc2VhcmNoKHBhcmFtcykudGhlbihyZXNwb25zZT0+e1xuICogICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UucmVzdWx0cy5sZW5ndGggKyBcIiBvZiBcIiArIHJlc3BvbnNlLnRvdGFsUmVzdWx0cyk7XG4gKiAgICAgIH0pLmNhdGNoKGU9PnsuLi59KTtcbiAqXG4gKiBFeCBGZXRjaCBJdGVtOlxuICogICAgICBpdGVtU2VydmljZS5nZXQoaXRlbUlkKS50aGVuKGl0ZW09PnsuLi59KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICogRXggU2F2aW5nIEl0ZW06XG4gKiAgICAgIGl0ZW1TZXJ2aWNlLnNhdmUoaXRlbSkudGhlbihpdGVtPT57Li4ufSkuY2F0Y2goZT0+ey4uLn0pO1xuICpcbiAqIEV4IERlbGV0aW5nIEl0ZW06XG4gKiAgICAgIGl0ZW1TZXJ2aWNlLnJlbW92ZShpdGVtSWQpLnRoZW4oKCk9PnsuLi59KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICogRXggUGF0Y2hpbmcgSXRlbTpcbiAqICAgICAgaXRlbVNlcnZpY2UucGF0Y2goaXRlbUlkLHBhdGNoKS50aGVuKGl0ZW09PnsuLi59KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICovXG5jbGFzcyBJdGVtU2VydmljZSB7XG5cbiAgICBwcm90ZWN0ZWQgYXBpQmFzZSA/OiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIGJhc2VVcmwgPzogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBjbGllbnQgOiBHUEh0dHBDbGllbnQ7XG4gICAgcHJvdGVjdGVkIF90aW1lb3V0IDogbnVtYmVyID0gMzAwMDA7XG4gICAgcHJvdGVjdGVkIGxvZ2dlciA6IGFueTtcbiAgICBwcm90ZWN0ZWQgaHR0cE1ldGhvZHMgOiBzdHJpbmdbXSA9IFtcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIiwgXCJQQVRDSFwiXTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLnNldFVybCh1cmwpO1xuICAgICAgICB0aGlzLmNsaWVudCA9IGh0dHBDbGllbnQ7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmwgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hcGlCYXNlID0gYmFzZVVybDtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybCArICcvYXBpL2l0ZW1zJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWlsbGlzZWNvbmRzIC0gb3ZlcnJpZGUgZW52aXJvbm1lbnQgdmFyaWFibGUgdGltZW91dFxuICAgICAqL1xuICAgIHNldFRpbWVvdXQobWlsbGlzZWNvbmRzIDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSBtaWxsaXNlY29uZHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1pbGxpc2Vjb25kcyAtIG92ZXJyaWRlIGVudmlyb25tZW50IHZhcmlhYmxlIHRpbWVvdXRcbiAgICAgKi9cbiAgICB0aW1lb3V0KG1pbGxpc2Vjb25kcyA6IG51bWJlcikgOiBJdGVtU2VydmljZSB7XG4gICAgICAgIHRoaXMuc2V0VGltZW91dChtaWxsaXNlY29uZHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbG9nZ2VyIC0gbG9nIHNlcnZpY2VcbiAgICAgKi9cbiAgICBzZXRMb2dnZXIobG9nZ2VyIDogYW55KSB7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBlIC0gZXJyb3IgdG8gbG9nIChpZiBsb2dnZXIgc3BlY2lmaWVkKVxuICAgICAqL1xuICAgIGxvZ0Vycm9yKGUgOiBzdHJpbmd8RXJyb3IpIHtcbiAgICAgICAgaWYodGhpcy5sb2dnZXIgJiYgdGhpcy5sb2dnZXIuZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1zZyAtIG1lc3NhZ2UgdG8gbG9nIGFzIGRlYnVnXG4gICAgICovXG4gICAgbG9nRGVidWcobXNnIDogc3RyaW5nKSB7XG4gICAgICAgIGlmKHRoaXMubG9nZ2VyICYmIHRoaXMubG9nZ2VyLmRlYnVnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1Zyhtc2cpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBpdGVtIHRvIGZldGNoXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGdldCAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkO1xuICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMudmVyc2lvbikge1xuICAgICAgICAgICAgdXJsICs9ICcvdmVyc2lvbnMvJyArIG9wdGlvbnMudmVyc2lvbjtcbiAgICAgICAgICAgIC8vIHRoaXMubG9nRGVidWcoXCJDbGllbnQuZ2V0IHJlcXVlc3RpbmcgdmVyc2lvbjogXCIgKyBvcHRpb25zLnZlcnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHVybCApXG4gICAgICAgIC50aGVuKCB1cmwgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7IG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnMgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmdldCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaXRlbU9iaiAtIGl0ZW0gdG8gY3JlYXRlIG9yIHVwZGF0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBzYXZlIChpdGVtT2JqIDogSXRlbSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBpdGVtT2JqIClcbiAgICAgICAgLnRoZW4oIGl0ZW0gPT4ge1xuXG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuYmFzZVVybDtcbiAgICAgICAgICAgIGlmKGl0ZW0uaWQpIHtcbiAgICAgICAgICAgICAgICBtZXRob2QgPSBcIlBVVFwiO1xuICAgICAgICAgICAgICAgIHVybCArPSAnLycgKyBpdGVtLmlkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2lmIGl0ZW0gaXMgYmVpbmcgY3JlYXRlZCBhbmQgaGFzIG5vIFVSSSBhbHJlYWR5IGRlZmluZWRcbiAgICAgICAgICAgICAgICAvLyBhdHRlbXB0IHRvIGNyZWF0ZSBvbmUgdXNpbmcgdGhlIEFQSSdzIG1ldGhvZCBmb3IgZG9pbmcgc29cbiAgICAgICAgICAgICAgICAvLyBhbmQgdGhlbiBhdHRlbXB0IHRoZSBhY3R1YWwgaXRlbSBjcmVhdGlvblxuICAgICAgICAgICAgICAgIGlmKCFpdGVtLnVyaSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVcmkoaXRlbSwgb3B0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oIHVyaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnVyaSA9IHVyaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIGRhdGE6aXRlbSwgb3B0aW9uczpvcHRpb25zfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIGRhdGE6aXRlbSwgb3B0aW9uczpvcHRpb25zfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHNhdmluZyBpdGVtOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLnNhdmUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBpdGVtIHRvIGRlbGV0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgdHJ1ZSBpZiBzdWNjZXNzZnVsIG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgcmVtb3ZlIChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGJvb2xlYW4+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCApXG4gICAgICAgIC50aGVuKCB1cmwgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiREVMRVRFXCIsIHVybDogdXJsLCBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCAoKSA9PiB0cnVlKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBkZWxldGluZyBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLnJlbW92ZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gcGF0Y2hcbiAgICAgKiBAcGFyYW0gcGF0Y2ggLSBIVFRQLVBBVENIIGNvbXBsaWFudCBzZXQgb2YgcHJvcGVydGllcyB0byBwYXRjaFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBwYXRjaCAoaWQgOiBzdHJpbmcsIHBhdGNoIDogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHRoaXMuYmFzZVVybCArICcvJyArIGlkIClcbiAgICAgICAgLnRoZW4oIHVybCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIiwgdXJsOiB1cmwsIGRhdGE6IHBhdGNoLCBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHBhdGNoaW5nIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UucGF0Y2goKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZyAtIGVpdGhlciBKUyBvYmplY3Qgb2YgcXVlcnkgcGFyYW1ldGVycyBvciBHZW9QbGF0Zm9ybS5RdWVyeSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VhcmNoIHJlc3VsdHNcbiAgICAgKi9cbiAgICBzZWFyY2ggKGFyZyA/OiBRdWVyeSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPFNlYXJjaFJlc3VsdHM+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBhcmcgKVxuICAgICAgICAudGhlbiggcGFyYW1zID0+IHtcbiAgICAgICAgICAgIGxldCBwcyA9IHBhcmFtcyA/IHBhcmFtcy5nZXRRdWVyeSgpIDoge307XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOiB0aGlzLmJhc2VVcmwsIHBhcmFtczogcHMsIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igc2VhcmNoaW5nIGl0ZW1zOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLnNlYXJjaCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGFyZyAtIFVSTCB0byBtZXRhZGF0YSBkb2N1bWVudCBvciBGaWxlIHRvIHVwbG9hZFxuICAgICAqIEBwYXJhbSBmb3JtYXQgLSBtZXRhZGF0YSBmb3JtYXQgb2Ygc3BlY2lmaWVkIGRvY3VtZW50XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBHZW9QbGF0Zm9ybSBJdGVtXG4gICAgICovXG4gICAgaW1wb3J0IChhcmcgOiBhbnksIGZvcm1hdCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCB0cnVlIClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIGlmKGFyZz09PW51bGwgfHwgYXJnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgYSB2YWxpZCBVUkwgb3IgRmlsZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBpc0ZpbGUgPSB0eXBlb2YoYXJnKSAhPT0gJ3N0cmluZyc7XG4gICAgICAgICAgICBsZXQgcm8gOiB7IFtrZXk6c3RyaW5nXTphbnkgfSA9IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmFwaUJhc2UgKyAnL2FwaS9pbXBvcnQnLFxuICAgICAgICAgICAgICAgIHByb2Nlc3NEYXRhOiB0cnVlLCAgLy9mb3IgalF1ZXJ5XG4gICAgICAgICAgICAgICAgZm9ybURhdGE6IHRydWUsICAgICAvL2ZvciBOb2RlIChSZXF1ZXN0SlMpXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKGlzRmlsZSkge1xuICAgICAgICAgICAgICAgIHJvLmZpbGUgPSBhcmc7XG4gICAgICAgICAgICAgICAgcm8uZGF0YSA9IHsgZm9ybWF0OiBmb3JtYXQgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm8uZm9ybURhdGEgPSBmYWxzZTsgICAgLy9tdXN0IGJlIGZhbHNlIGZvciBkYXRhIHRvIG5vdCBiZSBtdWx0aS1wYXJ0IGZvcm1kYXRhXG4gICAgICAgICAgICAgICAgcm8uZGF0YSA9IHsgdXJsOiBhcmcsIGZvcm1hdDogZm9ybWF0IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMub3ZlcndyaXRlKSB7XG4gICAgICAgICAgICAgICAgcm8uZGF0YS5vdmVyd3JpdGUgPSAoISFvcHRpb25zLm92ZXJ3cml0ZSkrJyc7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMub3ZlcndyaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdChybyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgaW1wb3J0aW5nIGl0ZW06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgaWYoZS5zdGF0dXMgPT09IDQwOSB8fCB+ZS5tZXNzYWdlLmluZGV4T2YoJ0l0ZW0gYWxyZWFkeSBleGlzdHMnKSlcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwge3N0YXR1czogNDA5fSk7XG4gICAgICAgICAgICBpZihlLml0ZW0pXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIHsgaXRlbSA6IGUuaXRlbSB9KTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmltcG9ydCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiB0aGUgaXRlbSB0byBleHBvcnRcbiAgICAgKiBAcGFyYW0gZm9ybWF0IC0gc3RyaW5nIG1pbWUgdHlwZSB0byBleHBvcnRcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEhUVFAgcmVzcG9uc2Ugb2JqZWN0IGZvciBlbmFibGluZyBhdHRhY2htZW50IGRvd25sb2FkaW5nXG4gICAgICovXG4gICAgZXhwb3J0IChpZCA6IHN0cmluZywgZm9ybWF0IDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggdHJ1ZSApXG4gICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL2V4cG9ydCc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge2Zvcm1hdDpmb3JtYXR9LFxuICAgICAgICAgICAgICAgIGpzb246IGZhbHNlLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCBlID0+IHtcbiAgICAgICAgICAgIGxldCBtc2cgPSBlLm1lc3NhZ2U7XG4gICAgICAgICAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9HZW9QbGF0Zm9ybS9jbGllbnQtYXBpL2lzc3Vlcy8xXG4gICAgICAgICAgICBpZihlLnN0YXR1c0NvZGUgJiYgZS5zdGF0dXNDb2RlPT09NDA2IHx8IGUuc3RhdHVzQ29kZT09PSc0MDYnKSB7XG4gICAgICAgICAgICAgICAgbXNnID0gYFVuc3VwcG9ydGVkIGV4cG9ydCBmb3JtYXQgc3BlY2lmaWVkICcke2Zvcm1hdH0nYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGV4cG9ydGluZyBpdGVtOiAke21zZ31gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmV4cG9ydCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYmplY3QgLSBHUCBvYmplY3QgZGVmaW5pdGlvbiB0byBnZW5lcmF0ZSBhIFVSSSBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHJlcXVlc3Qgb3B0aW9uc1xuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc3RyaW5nIFVSSVxuICAgICAqL1xuICAgIGdldFVyaSAob2JqZWN0IDogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggb2JqZWN0IClcbiAgICAgICAgLnRoZW4oIG9iaiA9PiB7XG4gICAgICAgICAgICBpZighb2JqIHx8ICFvYmoudHlwZSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgYW4gb2JqZWN0IHdpdGggYSB0eXBlIHByb3BlcnR5XCIpO1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYXBpQmFzZSArICcvYXBpL3V0aWxzL3VyaSc7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgICAgIG9wdGlvbnMucmVzcG9uc2VUeXBlID0gJ3RleHQnOyAgLy90byBlbnN1cmUgcGxhaW50ZXh0IGlzIGV4cGVjdGVkXG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLCB1cmw6IHVybCwgZGF0YTogb2JqLCBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCggZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBnZXR0aW5nIFVSSSBmb3IgaXRlbTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5nZXRVcmkoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZHMgLSBsaXN0IG9mIGlkZW50aWZpZXJzIHRvIGZldGNoIG9iamVjdHMgZm9yXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBsaXN0IG9mIG1hdGNoaW5nIGl0ZW1zIG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZ2V0TXVsdGlwbGUgKGlkcyA6IHN0cmluZ1tdLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggaWRzIClcbiAgICAgICAgLnRoZW4oIGlkZW50aWZpZXJzID0+IHtcblxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLmFwaUJhc2UgKyAnL2FwaS9mZXRjaCc7XG5cbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIGRhdGE6aWRlbnRpZmllcnMsIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcblxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyBpdGVtczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5nZXRNdWx0aXBsZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB1cmlzIC0gbGlzdCBvZiBVUklzIHRvIHJldHJpZXZlIG9iamVjdHMgZm9yXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBsaXN0IGNvbnRhaW5pbmcgdXJpLWl0ZW0gYXNzb2NpYXRpb24gd2hlcmUgZXhpc3RzXG4gICAgICovXG4gICAgZXhpc3RzKHVyaXMgOiBzdHJpbmdbXSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKHVyaXMpXG4gICAgICAgIC50aGVuKCB1cmlzID0+IHtcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSAnUE9TVCcsIHVybCA9IHRoaXMuYXBpQmFzZSArICcvYXBpL3V0aWxzL2V4aXN0cyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHttZXRob2Q6bWV0aG9kLCB1cmw6dXJsLCBkYXRhOnVyaXMsIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgcmVzb2x2aW5nIGl0ZW1zOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmV4aXN0cygpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGxpa2UoaXRlbSA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKGl0ZW0uaWQpXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gJ1BVVCcsIHVybCA9IHRoaXMuYXBpQmFzZSArICcvYXBpL2l0ZW1zLycgKyBpZCArICcvbGlrZXMnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBsaWtpbmcgaXRlbSAke2l0ZW0uaWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmxpa2UoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmlldyhpdGVtIDogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoaXRlbS5pZClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSAnUFVUJywgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvaXRlbXMvJyArIGlkICsgJy92aWV3cyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHttZXRob2Q6bWV0aG9kLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGluY3JlbWVudGluZyB2aWV3cyBmb3IgaXRlbSAke2l0ZW0uaWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmxpa2UoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gZmV0Y2ggYXNzb2NpYXRpb25zIGZvclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgYXJyYXkgb2YgYXNzb2NpYXRlZCBpdGVtcyBvZiB0aGUgaXRlbSBpbiBxdWVzdGlvblxuICAgICAqL1xuICAgIGFzc29jaWF0aW9ucyAoaWQgOiBzdHJpbmcsIHBhcmFtcyA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGlkIClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvYXNzb2NpYXRpb25zJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgICAgICAgICAgICAgIHVybDp1cmwsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMgfHwge30sXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyBhc3NvY2lhdGlvbnMgZm9yIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuYXNzb2NpYXRpb25zKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgaXRlbSB0byBmZXRjaCB2ZXJzaW9uIGluZm8gZm9yXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBhcnJheSBvZiBhdmFpbGFibGUgdmVyc2lvbnMgb2YgdGhlIGl0ZW1cbiAgICAgKi9cbiAgICB2ZXJzaW9ucyAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL3ZlcnNpb25zJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3QoeyBtZXRob2Q6XCJHRVRcIiwgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZmV0Y2hpbmcgdmVyc2lvbnMgZm9yIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UudmVyc2lvbnMoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWV0aG9kIC0gb25lIG9mIFwiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJcbiAgICAgKiBAcGFyYW0gdXJsIC0gZGVzdGluYXRpb24gb2YgeGhyIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gcGFyYW1zIC0gb2JqZWN0IHRvIGJlIHNlbnQgd2l0aCByZXF1ZXN0IGFzIHF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gZGF0YSAtIG9iamVjdCB0byBiZSBzZW50IHdpdGggcmVxdWVzdCBhcyBib2R5XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBvYmplY3QgZGVmaW5pbmcgcmVxdWVzdCBvcHRpb25zXG4gICAgICogQHJldHVybiByZXF1ZXN0IG9wdGlvbnMgZm9yIHhoclxuICAgICAqL1xuICAgIGJ1aWxkUmVxdWVzdCAob3B0aW9ucyA6IHtba2V5OnN0cmluZ106YW55fSkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuXG4gICAgICAgIGlmKHRoaXMuaHR0cE1ldGhvZHMuaW5kZXhPZihvcHRpb25zLm1ldGhvZCk8MClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgSFRUUCBtZXRob2QgJHtvcHRpb25zLm1ldGhvZH1gKTtcblxuICAgICAgICBpZighb3B0aW9ucy51cmwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE11c3Qgc3BlY2lmeSBhIFVSTCBmb3IgSFRUUCByZXF1ZXN0c2ApO1xuXG4gICAgICAgIG9wdGlvbnMudGltZW91dCA9IHRoaXMuX3RpbWVvdXQgfHwgMzAwMDA7XG4gICAgICAgIGxldCBvcHRzID0gdGhpcy5jcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHtba2V5OnN0cmluZ106YW55fSkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuICAgICAgICBsZXQgcmVxdWVzdCA9IHRoaXMuY2xpZW50LmNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmxvZ0RlYnVnKFwiSXRlbVNlcnZpY2UuY3JlYXRlUmVxdWVzdE9wdHMoKSAtIFwiICsgSlNPTi5zdHJpbmdpZnkocmVxdWVzdCkpO1xuICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICB9XG5cbiAgICBleGVjdXRlKG9wdHMgOiB7W2tleTpzdHJpbmddOmFueX0gKSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LmV4ZWN1dGUob3B0cylcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgaWYoZSA9PT0gbnVsbCB8fCB0eXBlb2YoZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgZSA9IG5ldyBFcnJvcihcIkl0ZW1TZXJ2aWNlLmV4ZWN1dGUoKSAtIFJlcXVlc3QgZmFpbGVkIGJ1dCBkaWRuJ3QgcmV0dXJuIGFuIFwiICtcbiAgICAgICAgICAgICAgICBcImVycm9yLiBUaGlzIGlzIG1vc3QgbGlrZWx5IGJlY2F1c2UgdGhlIHJlcXVlc3QgdGltZWQgb3V0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSXRlbVNlcnZpY2U7XG4iXX0=