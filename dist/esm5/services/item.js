/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import BaseService from './base';
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
var /**
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
ItemService = /** @class */ (function (_super) {
    tslib_1.__extends(ItemService, _super);
    function ItemService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    /**
     * @param id - identifier of item to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    /**
     * @param {?} id - identifier of item to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    ItemService.prototype.get = /**
     * @param {?} id - identifier of item to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    function (id, options) {
        var _this = this;
        /** @type {?} */
        var url = this.baseUrl + '/' + id;
        if (options && options.version) {
            url += '/versions/' + options.version;
            // this.logDebug("Client.get requesting version: " + options.version);
        }
        return this.createAndResolvePromise(url)
            .then(function (url) {
            /** @type {?} */
            var opts = _this.buildRequest({ method: "GET", url: url, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error fetching item " + id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.get() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param itemObj - item to create or update
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    /**
     * @param {?} itemObj - item to create or update
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    ItemService.prototype.save = /**
     * @param {?} itemObj - item to create or update
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    function (itemObj, options) {
        var _this = this;
        return this.createAndResolvePromise(itemObj)
            .then(function (item) {
            /** @type {?} */
            var method = 'POST';
            /** @type {?} */
            var url = _this.baseUrl;
            if (item.id) {
                method = "PUT";
                url += '/' + item.id;
            }
            else {
                //if item is being created and has no URI already defined
                // attempt to create one using the API's method for doing so
                // and then attempt the actual item creation
                if (!item.uri) {
                    return _this.getUri(item, options)
                        .then(function (uri) {
                        item.uri = uri;
                        /** @type {?} */
                        var opts = _this.buildRequest({ method: method, url: url, data: item, options: options });
                        return _this.execute(opts);
                    });
                }
            }
            /** @type {?} */
            var opts = _this.buildRequest({ method: method, url: url, data: item, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error saving item: " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.save() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of item to delete
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving true if successful or an error
     */
    /**
     * @param {?} id - identifier of item to delete
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving true if successful or an error
     */
    ItemService.prototype.remove = /**
     * @param {?} id - identifier of item to delete
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving true if successful or an error
     */
    function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(this.baseUrl + '/' + id)
            .then(function (url) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "DELETE", url: url, options: options
            });
            return _this.execute(opts);
        })
            .then(function () { return true; })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error deleting item " + id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.remove() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of item to patch
     * @param patch - HTTP-PATCH compliant set of properties to patch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    /**
     * @param {?} id - identifier of item to patch
     * @param {?} patch - HTTP-PATCH compliant set of properties to patch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    ItemService.prototype.patch = /**
     * @param {?} id - identifier of item to patch
     * @param {?} patch - HTTP-PATCH compliant set of properties to patch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    function (id, patch, options) {
        var _this = this;
        return this.createAndResolvePromise(this.baseUrl + '/' + id)
            .then(function (url) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "PATCH", url: url, data: patch, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error patching item " + id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.patch() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of item to clone
     * @param overrides - KVP of property-value overrides to apply to cloned instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving clone of Item or an error
     */
    /**
     * @param {?} id - identifier of item to clone
     * @param {?} overrides - KVP of property-value overrides to apply to cloned instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving clone of Item or an error
     */
    ItemService.prototype.clone = /**
     * @param {?} id - identifier of item to clone
     * @param {?} overrides - KVP of property-value overrides to apply to cloned instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving clone of Item or an error
     */
    function (id, overrides, options) {
        var _this = this;
        return this.createAndResolvePromise(this.baseUrl + '/' + id + '/clone')
            .then(function (url) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "POST", url: url, data: overrides, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error cloning item " + id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.clone() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param arg - either JS object of query parameters or Query instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    /**
     * @param {?=} arg - either JS object of query parameters or Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    ItemService.prototype.search = /**
     * @param {?=} arg - either JS object of query parameters or Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    function (arg, options) {
        var _this = this;
        return this.createAndResolvePromise(arg)
            .then(function (params) {
            /** @type {?} */
            var ps = {};
            if (params && typeof (params.getQuery) === 'function')
                ps = params.getQuery();
            else if (typeof (params) === 'object')
                ps = params;
            else
                ps = {};
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET",
                url: _this.baseUrl,
                params: ps,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error searching items: " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.search() - ' + err.message);
            throw err;
        });
    };
    /**
     *
     * @param arg - URL to metadata document or File to upload
     * @param format - metadata format of specified document
     * @return Promise resolving GeoPlatform Item
     */
    /**
     *
     * @param {?} arg - URL to metadata document or File to upload
     * @param {?} format - metadata format of specified document
     * @param {?=} options
     * @return {?} Promise resolving GeoPlatform Item
     */
    ItemService.prototype.import = /**
     *
     * @param {?} arg - URL to metadata document or File to upload
     * @param {?} format - metadata format of specified document
     * @param {?=} options
     * @return {?} Promise resolving GeoPlatform Item
     */
    function (arg, format, options) {
        var _this = this;
        return this.createAndResolvePromise(true)
            .then(function () {
            if (arg === null || arg === undefined) {
                throw new Error("Must provide a valid URL or File");
            }
            /** @type {?} */
            var isFile = typeof (arg) !== 'string';
            /** @type {?} */
            var ro = {
                method: "POST",
                url: _this.apiBase + '/api/import',
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
            var opts = _this.buildRequest(ro);
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error importing item: " + e.message);
            Object.assign(err, e);
            if (e.status === 409 || ~e.message.indexOf('Item already exists'))
                Object.assign(err, { status: 409 });
            if (e.item)
                Object.assign(err, { item: e.item });
            _this.logError('ItemService.import() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of the item to export
     * @param format - string mime type to export
     * @return Promise resolving HTTP response object for enabling attachment downloading
     */
    /**
     * @param {?} id - identifier of the item to export
     * @param {?} format - string mime type to export
     * @param {?=} options
     * @return {?} Promise resolving HTTP response object for enabling attachment downloading
     */
    ItemService.prototype.export = /**
     * @param {?} id - identifier of the item to export
     * @param {?} format - string mime type to export
     * @param {?=} options
     * @return {?} Promise resolving HTTP response object for enabling attachment downloading
     */
    function (id, format, options) {
        var _this = this;
        return this.createAndResolvePromise(true)
            .then(function () {
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/export';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: url,
                params: { format: format },
                json: false,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var msg = e.message;
            //https://github.com/GeoPlatform/client-api/issues/1
            if (e.statusCode && e.statusCode === 406 || e.statusCode === '406') {
                msg = "Unsupported export format specified '" + format + "'";
            }
            /** @type {?} */
            var err = new Error("Error exporting item: " + msg);
            Object.assign(err, e);
            _this.logError('ItemService.export() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param object - GP object definition to generate a URI for
     * @param options - optional request options
     * @return Promise resolving string URI
     */
    /**
     * @param {?} object - GP object definition to generate a URI for
     * @param {?=} options - optional request options
     * @return {?} Promise resolving string URI
     */
    ItemService.prototype.getUri = /**
     * @param {?} object - GP object definition to generate a URI for
     * @param {?=} options - optional request options
     * @return {?} Promise resolving string URI
     */
    function (object, options) {
        var _this = this;
        return this.createAndResolvePromise(object)
            .then(function (obj) {
            if (!obj || !obj.type)
                throw new Error("Must provide an object with a type property");
            /** @type {?} */
            var url = _this.apiBase + '/api/utils/uri';
            options = options || {};
            options.responseType = 'text';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "POST", url: url, data: obj, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error getting URI for item: " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.getUri() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param ids - list of identifiers to fetch objects for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving list of matching items or an error
     */
    /**
     * @param {?} ids - list of identifiers to fetch objects for
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving list of matching items or an error
     */
    ItemService.prototype.getMultiple = /**
     * @param {?} ids - list of identifiers to fetch objects for
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving list of matching items or an error
     */
    function (ids, options) {
        var _this = this;
        return this.createAndResolvePromise(ids)
            .then(function (identifiers) {
            /** @type {?} */
            var method = 'POST';
            /** @type {?} */
            var url = _this.apiBase + '/api/fetch';
            /** @type {?} */
            var opts = _this.buildRequest({ method: method, url: url, data: identifiers, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error fetching items: " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.getMultiple() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param uris - list of URIs to retrieve objects for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving list containing uri-item association where exists
     */
    /**
     * @param {?} uris - list of URIs to retrieve objects for
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving list containing uri-item association where exists
     */
    ItemService.prototype.exists = /**
     * @param {?} uris - list of URIs to retrieve objects for
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving list containing uri-item association where exists
     */
    function (uris, options) {
        var _this = this;
        return this.createAndResolvePromise(uris)
            .then(function (uris) {
            /** @type {?} */
            var method = 'POST';
            /** @type {?} */
            var url = _this.apiBase + '/api/utils/exists';
            /** @type {?} */
            var opts = _this.buildRequest({ method: method, url: url, data: uris, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error resolving items: " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.exists() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param {?} item
     * @param {?=} options
     * @return {?}
     */
    ItemService.prototype.like = /**
     * @param {?} item
     * @param {?=} options
     * @return {?}
     */
    function (item, options) {
        var _this = this;
        return this.createAndResolvePromise(item.id)
            .then(function (id) {
            /** @type {?} */
            var method = 'PUT';
            /** @type {?} */
            var url = _this.apiBase + '/api/items/' + id + '/likes';
            /** @type {?} */
            var opts = _this.buildRequest({ method: method, url: url, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error liking item " + item.id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.like() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param {?} item
     * @param {?=} options
     * @return {?}
     */
    ItemService.prototype.view = /**
     * @param {?} item
     * @param {?=} options
     * @return {?}
     */
    function (item, options) {
        var _this = this;
        return this.createAndResolvePromise(item.id)
            .then(function (id) {
            /** @type {?} */
            var method = 'PUT';
            /** @type {?} */
            var url = _this.apiBase + '/api/items/' + id + '/views';
            /** @type {?} */
            var opts = _this.buildRequest({ method: method, url: url, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error incrementing views for item " + item.id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.like() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of item to fetch associations for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving array of associated items of the item in question
     */
    /**
     * @param {?} id - identifier of item to fetch associations for
     * @param {?} params
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving array of associated items of the item in question
     */
    ItemService.prototype.associations = /**
     * @param {?} id - identifier of item to fetch associations for
     * @param {?} params
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving array of associated items of the item in question
     */
    function (id, params, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/associations';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET",
                url: url,
                params: params || {},
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error fetching associations for item " + id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.associations() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of item to fetch version info for
     * @param params - optional set of query parameters to constrain list of versions
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving array of available versions of the item
     */
    /**
     * @param {?} id - identifier of item to fetch version info for
     * @param {?=} params - optional set of query parameters to constrain list of versions
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving array of available versions of the item
     */
    ItemService.prototype.versions = /**
     * @param {?} id - identifier of item to fetch version info for
     * @param {?=} params - optional set of query parameters to constrain list of versions
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving array of available versions of the item
     */
    function (id, params, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/versions';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error fetching versions for item " + id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.versions() - ' + err.message);
            throw err;
        });
    };
    return ItemService;
}(BaseService));
export default ItemService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0EsT0FBTyxXQUFXLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBMEIsdUNBQVc7SUFFakMscUJBQVksR0FBWSxFQUFFLFVBQXlCO2VBQy9DLGtCQUFNLEdBQUcsRUFBRSxVQUFVLENBQUM7S0FDekI7SUFHRDs7OztPQUlHOzs7Ozs7SUFDSCx5QkFBRzs7Ozs7SUFBSCxVQUFLLEVBQVcsRUFBRSxPQUFjO1FBQWhDLGlCQWtCQzs7UUFoQkcsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLElBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDM0IsR0FBRyxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDOztTQUV6QztRQUNELE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFFLEdBQUcsQ0FBRTthQUN6QyxJQUFJLENBQUUsVUFBQSxHQUFHOztZQUNOLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxNQUFNLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDekUsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxDQUFDOztZQUNKLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLHlCQUF1QixFQUFFLFVBQUssQ0FBQyxDQUFDLE9BQVMsQ0FBQyxDQUFDO1lBQy9ELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxF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QUssRUFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFDLE9BQU87YUFDekQsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxDQUFDOztZQUNKLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLHNDQUFvQyxFQUFFLFVBQUssQ0FBQyxDQUFDLE9BQVMsQ0FBQyxDQUFDO1lBQzVFLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELE1BQU0sR0FBRyxDQUFDO1NBQ2IsQ0FBQyxDQUFDO0tBQ047c0JBeGJMO0VBK0IwQixXQUFXLEVBMlpwQyxDQUFBO0FBRUQsZUFBZSxXQUFXLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IEl0ZW0sIFNlYXJjaFJlc3VsdHMgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzJztcbmltcG9ydCBRdWVyeSBmcm9tICcuLi9zaGFyZWQvcXVlcnknO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5cbmltcG9ydCBCYXNlU2VydmljZSBmcm9tICcuL2Jhc2UnO1xuXG4vKipcbiAqIEl0ZW1TZXJ2aWNlXG4gKiBzZXJ2aWNlIGZvciB3b3JraW5nIHdpdGggdGhlIEdlb1BsYXRmb3JtIEFQSSB0b1xuICogcmV0cmlldmUgYW5kIG1hbmlwdWxhdGUgaXRlbXMuXG4gKlxuICogRXggU2VhcmNoaW5nIEl0ZW1zXG4gKiAgICAgIGxldCBwYXJhbXMgPSB7IHE6ICd0ZXN0JyB9O1xuICogICAgICBpdGVtU2VydmljZS5zZWFyY2gocGFyYW1zKS50aGVuKHJlc3BvbnNlPT57XG4gKiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5yZXN1bHRzLmxlbmd0aCArIFwiIG9mIFwiICsgcmVzcG9uc2UudG90YWxSZXN1bHRzKTtcbiAqICAgICAgfSkuY2F0Y2goZT0+ey4uLn0pO1xuICpcbiAqIEV4IEZldGNoIEl0ZW06XG4gKiAgICAgIGl0ZW1TZXJ2aWNlLmdldChpdGVtSWQpLnRoZW4oaXRlbT0+ey4uLn0pLmNhdGNoKGU9PnsuLi59KTtcbiAqXG4gKiBFeCBTYXZpbmcgSXRlbTpcbiAqICAgICAgaXRlbVNlcnZpY2Uuc2F2ZShpdGVtKS50aGVuKGl0ZW09PnsuLi59KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICogRXggRGVsZXRpbmcgSXRlbTpcbiAqICAgICAgaXRlbVNlcnZpY2UucmVtb3ZlKGl0ZW1JZCkudGhlbigoKT0+ey4uLn0pLmNhdGNoKGU9PnsuLi59KTtcbiAqXG4gKiBFeCBQYXRjaGluZyBJdGVtOlxuICogICAgICBpdGVtU2VydmljZS5wYXRjaChpdGVtSWQscGF0Y2gpLnRoZW4oaXRlbT0+ey4uLn0pLmNhdGNoKGU9PnsuLi59KTtcbiAqXG4gKi9cbmNsYXNzIEl0ZW1TZXJ2aWNlIGV4dGVuZHMgQmFzZVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gZmV0Y2hcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEl0ZW0gb2JqZWN0IG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZ2V0IChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkO1xuICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMudmVyc2lvbikge1xuICAgICAgICAgICAgdXJsICs9ICcvdmVyc2lvbnMvJyArIG9wdGlvbnMudmVyc2lvbjtcbiAgICAgICAgICAgIC8vIHRoaXMubG9nRGVidWcoXCJDbGllbnQuZ2V0IHJlcXVlc3RpbmcgdmVyc2lvbjogXCIgKyBvcHRpb25zLnZlcnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCB1cmwgKVxuICAgICAgICAudGhlbiggdXJsID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3QoeyBtZXRob2Q6XCJHRVRcIiwgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZmV0Y2hpbmcgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5nZXQoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpdGVtT2JqIC0gaXRlbSB0byBjcmVhdGUgb3IgdXBkYXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIHNhdmUgKGl0ZW1PYmogOiBJdGVtLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggaXRlbU9iaiApXG4gICAgICAgIC50aGVuKCBpdGVtID0+IHtcblxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLmJhc2VVcmw7XG4gICAgICAgICAgICBpZihpdGVtLmlkKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gXCJQVVRcIjtcbiAgICAgICAgICAgICAgICB1cmwgKz0gJy8nICsgaXRlbS5pZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9pZiBpdGVtIGlzIGJlaW5nIGNyZWF0ZWQgYW5kIGhhcyBubyBVUkkgYWxyZWFkeSBkZWZpbmVkXG4gICAgICAgICAgICAgICAgLy8gYXR0ZW1wdCB0byBjcmVhdGUgb25lIHVzaW5nIHRoZSBBUEkncyBtZXRob2QgZm9yIGRvaW5nIHNvXG4gICAgICAgICAgICAgICAgLy8gYW5kIHRoZW4gYXR0ZW1wdCB0aGUgYWN0dWFsIGl0ZW0gY3JlYXRpb25cbiAgICAgICAgICAgICAgICBpZighaXRlbS51cmkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXJpKGl0ZW0sIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCB1cmkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS51cmkgPSB1cmk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHttZXRob2Q6bWV0aG9kLCB1cmw6dXJsLCBkYXRhOml0ZW0sIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHttZXRob2Q6bWV0aG9kLCB1cmw6dXJsLCBkYXRhOml0ZW0sIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcblxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBzYXZpbmcgaXRlbTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5zYXZlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gZGVsZXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyB0cnVlIGlmIHN1Y2Nlc3NmdWwgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICByZW1vdmUgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGJvb2xlYW4+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKVxuICAgICAgICAudGhlbiggdXJsID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkRFTEVURVwiLCB1cmw6IHVybCwgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbiggKCkgPT4gdHJ1ZSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZGVsZXRpbmcgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5yZW1vdmUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgaXRlbSB0byBwYXRjaFxuICAgICAqIEBwYXJhbSBwYXRjaCAtIEhUVFAtUEFUQ0ggY29tcGxpYW50IHNldCBvZiBwcm9wZXJ0aWVzIHRvIHBhdGNoXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIHBhdGNoIChpZCA6IHN0cmluZywgcGF0Y2ggOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCApXG4gICAgICAgIC50aGVuKCB1cmwgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBBVENIXCIsIHVybDogdXJsLCBkYXRhOiBwYXRjaCwgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBwYXRjaGluZyBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLnBhdGNoKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgaXRlbSB0byBjbG9uZVxuICAgICAqIEBwYXJhbSBvdmVycmlkZXMgLSBLVlAgb2YgcHJvcGVydHktdmFsdWUgb3ZlcnJpZGVzIHRvIGFwcGx5IHRvIGNsb25lZCBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgY2xvbmUgb2YgSXRlbSBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGNsb25lIChpZCA6IHN0cmluZywgb3ZlcnJpZGVzIDogYW55LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL2Nsb25lJyApXG4gICAgICAgIC50aGVuKCB1cmwgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIiwgdXJsOiB1cmwsIGRhdGE6IG92ZXJyaWRlcywgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBjbG9uaW5nIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuY2xvbmUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBlaXRoZXIgSlMgb2JqZWN0IG9mIHF1ZXJ5IHBhcmFtZXRlcnMgb3IgUXVlcnkgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgc2VhcmNoIChhcmcgPzogYW55LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPFNlYXJjaFJlc3VsdHM+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggYXJnIClcbiAgICAgICAgLnRoZW4oIHBhcmFtcyA9PiB7XG4gICAgICAgICAgICBsZXQgcHMgPSB7fTtcbiAgICAgICAgICAgIGlmKHBhcmFtcyAmJiB0eXBlb2YocGFyYW1zLmdldFF1ZXJ5KSA9PT0gJ2Z1bmN0aW9uJykgcHMgPSBwYXJhbXMuZ2V0UXVlcnkoKTtcbiAgICAgICAgICAgIGVsc2UgaWYodHlwZW9mKHBhcmFtcykgPT09ICdvYmplY3QnKSBwcyA9IHBhcmFtcztcbiAgICAgICAgICAgIGVsc2UgcHMgPSB7fTtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgICAgICAgICAgICAgIHVybDogdGhpcy5iYXNlVXJsLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcHMsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBzZWFyY2hpbmcgaXRlbXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2Uuc2VhcmNoKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGFyZyAtIFVSTCB0byBtZXRhZGF0YSBkb2N1bWVudCBvciBGaWxlIHRvIHVwbG9hZFxuICAgICAqIEBwYXJhbSBmb3JtYXQgLSBtZXRhZGF0YSBmb3JtYXQgb2Ygc3BlY2lmaWVkIGRvY3VtZW50XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBHZW9QbGF0Zm9ybSBJdGVtXG4gICAgICovXG4gICAgaW1wb3J0IChhcmcgOiBhbnksIGZvcm1hdCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHRydWUgKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgaWYoYXJnPT09bnVsbCB8fCBhcmcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBhIHZhbGlkIFVSTCBvciBGaWxlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGlzRmlsZSA9IHR5cGVvZihhcmcpICE9PSAnc3RyaW5nJztcbiAgICAgICAgICAgIGxldCBybyA6IHsgW2tleTpzdHJpbmddOmFueSB9ID0ge1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYXBpQmFzZSArICcvYXBpL2ltcG9ydCcsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IHRydWUsICAvL2ZvciBqUXVlcnlcbiAgICAgICAgICAgICAgICBmb3JtRGF0YTogdHJ1ZSwgICAgIC8vZm9yIE5vZGUgKFJlcXVlc3RKUylcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYoaXNGaWxlKSB7XG4gICAgICAgICAgICAgICAgcm8uZmlsZSA9IGFyZztcbiAgICAgICAgICAgICAgICByby5kYXRhID0geyBmb3JtYXQ6IGZvcm1hdCB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByby5mb3JtRGF0YSA9IGZhbHNlOyAgICAvL211c3QgYmUgZmFsc2UgZm9yIGRhdGEgdG8gbm90IGJlIG11bHRpLXBhcnQgZm9ybWRhdGFcbiAgICAgICAgICAgICAgICByby5kYXRhID0geyB1cmw6IGFyZywgZm9ybWF0OiBmb3JtYXQgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5vdmVyd3JpdGUpIHtcbiAgICAgICAgICAgICAgICByby5kYXRhLm92ZXJ3cml0ZSA9ICghIW9wdGlvbnMub3ZlcndyaXRlKSsnJztcbiAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5vdmVyd3JpdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHJvKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCggZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBpbXBvcnRpbmcgaXRlbTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICBpZihlLnN0YXR1cyA9PT0gNDA5IHx8IH5lLm1lc3NhZ2UuaW5kZXhPZignSXRlbSBhbHJlYWR5IGV4aXN0cycpKVxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCB7c3RhdHVzOiA0MDl9KTtcbiAgICAgICAgICAgIGlmKGUuaXRlbSlcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgeyBpdGVtIDogZS5pdGVtIH0pO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuaW1wb3J0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiB0aGUgaXRlbSB0byBleHBvcnRcbiAgICAgKiBAcGFyYW0gZm9ybWF0IC0gc3RyaW5nIG1pbWUgdHlwZSB0byBleHBvcnRcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEhUVFAgcmVzcG9uc2Ugb2JqZWN0IGZvciBlbmFibGluZyBhdHRhY2htZW50IGRvd25sb2FkaW5nXG4gICAgICovXG4gICAgZXhwb3J0IChpZCA6IHN0cmluZywgZm9ybWF0IDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCB0cnVlIClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvZXhwb3J0JztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIiwgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7Zm9ybWF0OmZvcm1hdH0sXG4gICAgICAgICAgICAgICAganNvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICAgICAgbGV0IG1zZyA9IGUubWVzc2FnZTtcbiAgICAgICAgICAgIC8vaHR0cHM6Ly9naXRodWIuY29tL0dlb1BsYXRmb3JtL2NsaWVudC1hcGkvaXNzdWVzLzFcbiAgICAgICAgICAgIGlmKGUuc3RhdHVzQ29kZSAmJiBlLnN0YXR1c0NvZGU9PT00MDYgfHwgZS5zdGF0dXNDb2RlPT09JzQwNicpIHtcbiAgICAgICAgICAgICAgICBtc2cgPSBgVW5zdXBwb3J0ZWQgZXhwb3J0IGZvcm1hdCBzcGVjaWZpZWQgJyR7Zm9ybWF0fSdgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZXhwb3J0aW5nIGl0ZW06ICR7bXNnfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZXhwb3J0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYmplY3QgLSBHUCBvYmplY3QgZGVmaW5pdGlvbiB0byBnZW5lcmF0ZSBhIFVSSSBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHJlcXVlc3Qgb3B0aW9uc1xuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc3RyaW5nIFVSSVxuICAgICAqL1xuICAgIGdldFVyaSAob2JqZWN0IDogYW55LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBvYmplY3QgKVxuICAgICAgICAudGhlbiggb2JqID0+IHtcbiAgICAgICAgICAgIGlmKCFvYmogfHwgIW9iai50eXBlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBhbiBvYmplY3Qgd2l0aCBhIHR5cGUgcHJvcGVydHlcIik7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvdXRpbHMvdXJpJztcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICAgICAgb3B0aW9ucy5yZXNwb25zZVR5cGUgPSAndGV4dCc7ICAvL3RvIGVuc3VyZSBwbGFpbnRleHQgaXMgZXhwZWN0ZWRcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsIHVybDogdXJsLCBkYXRhOiBvYmosIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCBlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGdldHRpbmcgVVJJIGZvciBpdGVtOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmdldFVyaSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZHMgLSBsaXN0IG9mIGlkZW50aWZpZXJzIHRvIGZldGNoIG9iamVjdHMgZm9yXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBsaXN0IG9mIG1hdGNoaW5nIGl0ZW1zIG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZ2V0TXVsdGlwbGUgKGlkcyA6IHN0cmluZ1tdLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBpZHMgKVxuICAgICAgICAudGhlbiggaWRlbnRpZmllcnMgPT4ge1xuXG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuYXBpQmFzZSArICcvYXBpL2ZldGNoJztcblxuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgZGF0YTppZGVudGlmaWVycywgb3B0aW9uczpvcHRpb25zfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIGl0ZW1zOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmdldE11bHRpcGxlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB1cmlzIC0gbGlzdCBvZiBVUklzIHRvIHJldHJpZXZlIG9iamVjdHMgZm9yXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBsaXN0IGNvbnRhaW5pbmcgdXJpLWl0ZW0gYXNzb2NpYXRpb24gd2hlcmUgZXhpc3RzXG4gICAgICovXG4gICAgZXhpc3RzKHVyaXMgOiBzdHJpbmdbXSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UodXJpcylcbiAgICAgICAgLnRoZW4oIHVyaXMgPT4ge1xuICAgICAgICAgICAgbGV0IG1ldGhvZCA9ICdQT1NUJywgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvdXRpbHMvZXhpc3RzJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIGRhdGE6dXJpcywgb3B0aW9uczpvcHRpb25zfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciByZXNvbHZpbmcgaXRlbXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZXhpc3RzKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGxpa2UoaXRlbSA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoaXRlbS5pZClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSAnUFVUJywgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvaXRlbXMvJyArIGlkICsgJy9saWtlcyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHttZXRob2Q6bWV0aG9kLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGxpa2luZyBpdGVtICR7aXRlbS5pZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UubGlrZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmlldyhpdGVtIDogYW55LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZShpdGVtLmlkKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IG1ldGhvZCA9ICdQVVQnLCB1cmwgPSB0aGlzLmFwaUJhc2UgKyAnL2FwaS9pdGVtcy8nICsgaWQgKyAnL3ZpZXdzJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgaW5jcmVtZW50aW5nIHZpZXdzIGZvciBpdGVtICR7aXRlbS5pZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UubGlrZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gZmV0Y2ggYXNzb2NpYXRpb25zIGZvclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgYXJyYXkgb2YgYXNzb2NpYXRlZCBpdGVtcyBvZiB0aGUgaXRlbSBpbiBxdWVzdGlvblxuICAgICAqL1xuICAgIGFzc29jaWF0aW9ucyAoaWQgOiBzdHJpbmcsIHBhcmFtcyA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggaWQgKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy9hc3NvY2lhdGlvbnMnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOnVybCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyB8fCB7fSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIGFzc29jaWF0aW9ucyBmb3IgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5hc3NvY2lhdGlvbnMoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgaXRlbSB0byBmZXRjaCB2ZXJzaW9uIGluZm8gZm9yXG4gICAgICogQHBhcmFtIHBhcmFtcyAtIG9wdGlvbmFsIHNldCBvZiBxdWVyeSBwYXJhbWV0ZXJzIHRvIGNvbnN0cmFpbiBsaXN0IG9mIHZlcnNpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBhcnJheSBvZiBhdmFpbGFibGUgdmVyc2lvbnMgb2YgdGhlIGl0ZW1cbiAgICAgKi9cbiAgICB2ZXJzaW9ucyAoaWQgOiBzdHJpbmcsIHBhcmFtcyA/OiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIGlkIClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvdmVyc2lvbnMnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIHBhcmFtczogcGFyYW1zLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZmV0Y2hpbmcgdmVyc2lvbnMgZm9yIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UudmVyc2lvbnMoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBJdGVtU2VydmljZTtcbiJdfQ==