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
ItemService = /** @class */ (function () {
    function ItemService(url, httpClient) {
        this._timeout = 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        this.setUrl(url);
        this.client = httpClient;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    ItemService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/items';
    };
    /**
     * @param milliseconds - override environment variable timeout
     */
    /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    ItemService.prototype.setTimeout = /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    function (milliseconds) {
        this._timeout = milliseconds;
    };
    /**
     * @param milliseconds - override environment variable timeout
     */
    /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    ItemService.prototype.timeout = /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    function (milliseconds) {
        this.setTimeout(milliseconds);
        return this;
    };
    /**
     * @param logger - log service
     */
    /**
     * @param {?} logger - log service
     * @return {?}
     */
    ItemService.prototype.setLogger = /**
     * @param {?} logger - log service
     * @return {?}
     */
    function (logger) {
        this.logger = logger;
    };
    /**
     * @param e - error to log (if logger specified)
     */
    /**
     * @param {?} e - error to log (if logger specified)
     * @return {?}
     */
    ItemService.prototype.logError = /**
     * @param {?} e - error to log (if logger specified)
     * @return {?}
     */
    function (e) {
        if (this.logger && this.logger.error) {
            this.logger.error(e);
        }
    };
    /**
     * @param msg - message to log as debug
     */
    /**
     * @param {?} msg - message to log as debug
     * @return {?}
     */
    ItemService.prototype.logDebug = /**
     * @param {?} msg - message to log as debug
     * @return {?}
     */
    function (msg) {
        if (this.logger && this.logger.debug) {
            this.logger.debug(msg);
        }
    };
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
        return Q.resolve(url)
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
            return Q.reject(err);
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
        return Q.resolve(itemObj)
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
            return Q.reject(err);
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
        return Q.resolve(this.baseUrl + '/' + id)
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
            return Q.reject(err);
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
        return Q.resolve(this.baseUrl + '/' + id)
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
            return Q.reject(err);
        });
    };
    /**
     * @param arg - either JS object of query parameters or GeoPlatform.Query instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    /**
     * @param {?=} arg - either JS object of query parameters or GeoPlatform.Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    ItemService.prototype.search = /**
     * @param {?=} arg - either JS object of query parameters or GeoPlatform.Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    function (arg, options) {
        var _this = this;
        return Q.resolve(arg)
            .then(function (params) {
            /** @type {?} */
            var ps = params ? params.getQuery() : {};
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: _this.baseUrl, params: ps, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error searching items: " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.search() - ' + err.message);
            return Q.reject(err);
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
        return Q.resolve(true)
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
            return Q.reject(err);
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
        return Q.resolve(true)
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
            return Q.reject(err);
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
        return Q.resolve(object)
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
            return Q.reject(err);
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
        return Q.resolve(ids)
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
            return Q.reject(err);
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
        return Q.resolve(uris)
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
            return Q.reject(err);
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
        return Q.resolve(item.id)
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
            return Q.reject(err);
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
        return Q.resolve(item.id)
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
            return Q.reject(err);
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
        return Q.resolve(id)
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
            return Q.reject(err);
        });
    };
    /**
     * @param id - identifier of item to fetch version info for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving array of available versions of the item
     */
    /**
     * @param {?} id - identifier of item to fetch version info for
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving array of available versions of the item
     */
    ItemService.prototype.versions = /**
     * @param {?} id - identifier of item to fetch version info for
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving array of available versions of the item
     */
    function (id, options) {
        var _this = this;
        return Q.resolve(id)
            .then(function (id) {
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/versions';
            /** @type {?} */
            var opts = _this.buildRequest({ method: "GET", url: url, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error fetching versions for item " + id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.versions() - ' + err.message);
            return Q.reject(err);
        });
    };
    /* ----------------------------------------------------------- */
    /**
     * @param method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
     * @param url - destination of xhr request
     * @param params - object to be sent with request as query parameters
     * @param data - object to be sent with request as body
     * @param options - optional object defining request options
     * @return request options for xhr
     */
    /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    ItemService.prototype.buildRequest = /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    function (options) {
        if (this.httpMethods.indexOf(options["method"]) < 0)
            throw new Error("Unsupported HTTP method " + options["method"]);
        if (!options["url"])
            throw new Error("Must specify a URL for HTTP requests");
        options["timeout"] = this._timeout || 30000;
        /** @type {?} */
        var opts = this.createRequestOpts(options);
        return opts;
    };
    /**
     * @param {?} options
     * @return {?}
     */
    ItemService.prototype.createRequestOpts = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var request = this.client.createRequestOpts(options);
        this.logDebug("ItemService.createRequestOpts() - " + JSON.stringify(request));
        return request;
    };
    /**
     * @param {?} opts
     * @return {?}
     */
    ItemService.prototype.execute = /**
     * @param {?} opts
     * @return {?}
     */
    function (opts) {
        return this.client.execute(opts)
            .catch(function (e) {
            if (e === null || typeof (e) === 'undefined') {
                e = new Error("ItemService.execute() - Request failed but didn't return an " +
                    "error. This is most likely because the request timed out");
            }
            return Q.reject(e);
        });
    };
    return ItemService;
}());
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBU0kscUJBQVksR0FBWSxFQUFFLFVBQXlCO3dCQUpyQixLQUFLOzJCQUVBLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQztRQUd4RSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO0tBQzVCOzs7OztJQUVELDRCQUFNOzs7O0lBQU4sVUFBTyxPQUFnQjtRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxZQUFZLENBQUM7S0FDekM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxnQ0FBVTs7OztJQUFWLFVBQVcsWUFBcUI7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7S0FDaEM7SUFFRDs7T0FFRzs7Ozs7SUFDSCw2QkFBTzs7OztJQUFQLFVBQVEsWUFBcUI7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsK0JBQVM7Ozs7SUFBVCxVQUFVLE1BQVk7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDeEI7SUFFRDs7T0FFRzs7Ozs7SUFDSCw4QkFBUTs7OztJQUFSLFVBQVMsQ0FBZ0I7UUFDckIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxN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QUFDLDZCQUEyQixPQUFPLFVBQVMsQ0FBQyxDQUFDO1FBRWpFLElBQUcsQ0FBQyxPQUFPLE9BQUk7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFFNUQsT0FBTyxjQUFXLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDOztRQUN6QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsT0FBTyxJQUFJLENBQUM7S0FDZjs7Ozs7SUFFRCx1Q0FBaUI7Ozs7SUFBakIsVUFBa0IsT0FBNEI7O1FBQzFDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQ0FBb0MsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDOUUsT0FBTyxPQUFPLENBQUM7S0FDbEI7Ozs7O0lBRUQsNkJBQU87Ozs7SUFBUCxVQUFRLElBQXlCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQy9CLEtBQUssQ0FBQyxVQUFBLENBQUM7WUFDSixJQUFHLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDeEMsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLDhEQUE4RDtvQkFDNUUsMERBQTBELENBQUMsQ0FBQzthQUMvRDtZQUNELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QixDQUFDLENBQUM7S0FDTjtzQkF2Zkw7SUF5ZkMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsZUFBZSxXQUFXLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XG5pbXBvcnQgeyBJdGVtLCBTZWFyY2hSZXN1bHRzIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscyc7XG5pbXBvcnQgUXVlcnkgZnJvbSAnLi4vc2hhcmVkL3F1ZXJ5JztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuXG4vKipcbiAqIEl0ZW1TZXJ2aWNlXG4gKiBzZXJ2aWNlIGZvciB3b3JraW5nIHdpdGggdGhlIEdlb1BsYXRmb3JtIEFQSSB0b1xuICogcmV0cmlldmUgYW5kIG1hbmlwdWxhdGUgaXRlbXMuXG4gKlxuICogRXggU2VhcmNoaW5nIEl0ZW1zXG4gKiAgICAgIGxldCBwYXJhbXMgPSB7IHE6ICd0ZXN0JyB9O1xuICogICAgICBpdGVtU2VydmljZS5zZWFyY2gocGFyYW1zKS50aGVuKHJlc3BvbnNlPT57XG4gKiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5yZXN1bHRzLmxlbmd0aCArIFwiIG9mIFwiICsgcmVzcG9uc2UudG90YWxSZXN1bHRzKTtcbiAqICAgICAgfSkuY2F0Y2goZT0+ey4uLn0pO1xuICpcbiAqIEV4IEZldGNoIEl0ZW06XG4gKiAgICAgIGl0ZW1TZXJ2aWNlLmdldChpdGVtSWQpLnRoZW4oaXRlbT0+ey4uLn0pLmNhdGNoKGU9PnsuLi59KTtcbiAqXG4gKiBFeCBTYXZpbmcgSXRlbTpcbiAqICAgICAgaXRlbVNlcnZpY2Uuc2F2ZShpdGVtKS50aGVuKGl0ZW09PnsuLi59KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICogRXggRGVsZXRpbmcgSXRlbTpcbiAqICAgICAgaXRlbVNlcnZpY2UucmVtb3ZlKGl0ZW1JZCkudGhlbigoKT0+ey4uLn0pLmNhdGNoKGU9PnsuLi59KTtcbiAqXG4gKiBFeCBQYXRjaGluZyBJdGVtOlxuICogICAgICBpdGVtU2VydmljZS5wYXRjaChpdGVtSWQscGF0Y2gpLnRoZW4oaXRlbT0+ey4uLn0pLmNhdGNoKGU9PnsuLi59KTtcbiAqXG4gKi9cbmNsYXNzIEl0ZW1TZXJ2aWNlIHtcblxuICAgIHByb3RlY3RlZCBhcGlCYXNlID86IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgYmFzZVVybCA/OiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIGNsaWVudCA6IEdQSHR0cENsaWVudDtcbiAgICBwcm90ZWN0ZWQgX3RpbWVvdXQgOiBudW1iZXIgPSAzMDAwMDtcbiAgICBwcm90ZWN0ZWQgbG9nZ2VyIDogYW55O1xuICAgIHByb3RlY3RlZCBodHRwTWV0aG9kcyA6IHN0cmluZ1tdID0gW1wiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJdO1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuc2V0VXJsKHVybCk7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gaHR0cENsaWVudDtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybCA6IHN0cmluZykge1xuICAgICAgICB0aGlzLmFwaUJhc2UgPSBiYXNlVXJsO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvaXRlbXMnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtaWxsaXNlY29uZHMgLSBvdmVycmlkZSBlbnZpcm9ubWVudCB2YXJpYWJsZSB0aW1lb3V0XG4gICAgICovXG4gICAgc2V0VGltZW91dChtaWxsaXNlY29uZHMgOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdGltZW91dCA9IG1pbGxpc2Vjb25kcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWlsbGlzZWNvbmRzIC0gb3ZlcnJpZGUgZW52aXJvbm1lbnQgdmFyaWFibGUgdGltZW91dFxuICAgICAqL1xuICAgIHRpbWVvdXQobWlsbGlzZWNvbmRzIDogbnVtYmVyKSA6IEl0ZW1TZXJ2aWNlIHtcbiAgICAgICAgdGhpcy5zZXRUaW1lb3V0KG1pbGxpc2Vjb25kcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBsb2dnZXIgLSBsb2cgc2VydmljZVxuICAgICAqL1xuICAgIHNldExvZ2dlcihsb2dnZXIgOiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGUgLSBlcnJvciB0byBsb2cgKGlmIGxvZ2dlciBzcGVjaWZpZWQpXG4gICAgICovXG4gICAgbG9nRXJyb3IoZSA6IHN0cmluZ3xFcnJvcikge1xuICAgICAgICBpZih0aGlzLmxvZ2dlciAmJiB0aGlzLmxvZ2dlci5lcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbXNnIC0gbWVzc2FnZSB0byBsb2cgYXMgZGVidWdcbiAgICAgKi9cbiAgICBsb2dEZWJ1Zyhtc2cgOiBzdHJpbmcpIHtcbiAgICAgICAgaWYodGhpcy5sb2dnZXIgJiYgdGhpcy5sb2dnZXIuZGVidWcpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gZmV0Y2hcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEl0ZW0gb2JqZWN0IG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZ2V0IChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQ7XG4gICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy52ZXJzaW9uKSB7XG4gICAgICAgICAgICB1cmwgKz0gJy92ZXJzaW9ucy8nICsgb3B0aW9ucy52ZXJzaW9uO1xuICAgICAgICAgICAgLy8gdGhpcy5sb2dEZWJ1ZyhcIkNsaWVudC5nZXQgcmVxdWVzdGluZyB2ZXJzaW9uOiBcIiArIG9wdGlvbnMudmVyc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggdXJsIClcbiAgICAgICAgLnRoZW4oIHVybCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHsgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9ucyB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZ2V0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpdGVtT2JqIC0gaXRlbSB0byBjcmVhdGUgb3IgdXBkYXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIHNhdmUgKGl0ZW1PYmogOiBJdGVtLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGl0ZW1PYmogKVxuICAgICAgICAudGhlbiggaXRlbSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBtZXRob2QgPSAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5iYXNlVXJsO1xuICAgICAgICAgICAgaWYoaXRlbS5pZCkge1xuICAgICAgICAgICAgICAgIG1ldGhvZCA9IFwiUFVUXCI7XG4gICAgICAgICAgICAgICAgdXJsICs9ICcvJyArIGl0ZW0uaWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vaWYgaXRlbSBpcyBiZWluZyBjcmVhdGVkIGFuZCBoYXMgbm8gVVJJIGFscmVhZHkgZGVmaW5lZFxuICAgICAgICAgICAgICAgIC8vIGF0dGVtcHQgdG8gY3JlYXRlIG9uZSB1c2luZyB0aGUgQVBJJ3MgbWV0aG9kIGZvciBkb2luZyBzb1xuICAgICAgICAgICAgICAgIC8vIGFuZCB0aGVuIGF0dGVtcHQgdGhlIGFjdHVhbCBpdGVtIGNyZWF0aW9uXG4gICAgICAgICAgICAgICAgaWYoIWl0ZW0udXJpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFVyaShpdGVtLCBvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAudGhlbiggdXJpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udXJpID0gdXJpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgZGF0YTppdGVtLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgZGF0YTppdGVtLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG5cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igc2F2aW5nIGl0ZW06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2Uuc2F2ZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gZGVsZXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyB0cnVlIGlmIHN1Y2Nlc3NmdWwgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICByZW1vdmUgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8Ym9vbGVhbj4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHRoaXMuYmFzZVVybCArICcvJyArIGlkIClcbiAgICAgICAgLnRoZW4oIHVybCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJERUxFVEVcIiwgdXJsOiB1cmwsIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oICgpID0+IHRydWUpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGRlbGV0aW5nIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UucmVtb3ZlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgaXRlbSB0byBwYXRjaFxuICAgICAqIEBwYXJhbSBwYXRjaCAtIEhUVFAtUEFUQ0ggY29tcGxpYW50IHNldCBvZiBwcm9wZXJ0aWVzIHRvIHBhdGNoXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIHBhdGNoIChpZCA6IHN0cmluZywgcGF0Y2ggOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKVxuICAgICAgICAudGhlbiggdXJsID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQQVRDSFwiLCB1cmw6IHVybCwgZGF0YTogcGF0Y2gsIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgcGF0Y2hpbmcgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5wYXRjaCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnIC0gZWl0aGVyIEpTIG9iamVjdCBvZiBxdWVyeSBwYXJhbWV0ZXJzIG9yIEdlb1BsYXRmb3JtLlF1ZXJ5IGluc3RhbmNlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHNlYXJjaCAoYXJnID86IFF1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8U2VhcmNoUmVzdWx0cz4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGFyZyApXG4gICAgICAgIC50aGVuKCBwYXJhbXMgPT4ge1xuICAgICAgICAgICAgbGV0IHBzID0gcGFyYW1zID8gcGFyYW1zLmdldFF1ZXJ5KCkgOiB7fTtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLCB1cmw6IHRoaXMuYmFzZVVybCwgcGFyYW1zOiBwcywgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBzZWFyY2hpbmcgaXRlbXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2Uuc2VhcmNoKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYXJnIC0gVVJMIHRvIG1ldGFkYXRhIGRvY3VtZW50IG9yIEZpbGUgdG8gdXBsb2FkXG4gICAgICogQHBhcmFtIGZvcm1hdCAtIG1ldGFkYXRhIGZvcm1hdCBvZiBzcGVjaWZpZWQgZG9jdW1lbnRcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEdlb1BsYXRmb3JtIEl0ZW1cbiAgICAgKi9cbiAgICBpbXBvcnQgKGFyZyA6IGFueSwgZm9ybWF0IDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHRydWUgKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgaWYoYXJnPT09bnVsbCB8fCBhcmcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBhIHZhbGlkIFVSTCBvciBGaWxlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGlzRmlsZSA9IHR5cGVvZihhcmcpICE9PSAnc3RyaW5nJztcbiAgICAgICAgICAgIGxldCBybyA6IHsgW2tleTpzdHJpbmddOmFueSB9ID0ge1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYXBpQmFzZSArICcvYXBpL2ltcG9ydCcsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IHRydWUsICAvL2ZvciBqUXVlcnlcbiAgICAgICAgICAgICAgICBmb3JtRGF0YTogdHJ1ZSwgICAgIC8vZm9yIE5vZGUgKFJlcXVlc3RKUylcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYoaXNGaWxlKSB7XG4gICAgICAgICAgICAgICAgcm8uZmlsZSA9IGFyZztcbiAgICAgICAgICAgICAgICByby5kYXRhID0geyBmb3JtYXQ6IGZvcm1hdCB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByby5mb3JtRGF0YSA9IGZhbHNlOyAgICAvL211c3QgYmUgZmFsc2UgZm9yIGRhdGEgdG8gbm90IGJlIG11bHRpLXBhcnQgZm9ybWRhdGFcbiAgICAgICAgICAgICAgICByby5kYXRhID0geyB1cmw6IGFyZywgZm9ybWF0OiBmb3JtYXQgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5vdmVyd3JpdGUpIHtcbiAgICAgICAgICAgICAgICByby5kYXRhLm92ZXJ3cml0ZSA9ICghIW9wdGlvbnMub3ZlcndyaXRlKSsnJztcbiAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5vdmVyd3JpdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHJvKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCggZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBpbXBvcnRpbmcgaXRlbTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICBpZihlLnN0YXR1cyA9PT0gNDA5IHx8IH5lLm1lc3NhZ2UuaW5kZXhPZignSXRlbSBhbHJlYWR5IGV4aXN0cycpKVxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCB7c3RhdHVzOiA0MDl9KTtcbiAgICAgICAgICAgIGlmKGUuaXRlbSlcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgeyBpdGVtIDogZS5pdGVtIH0pO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuaW1wb3J0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIHRoZSBpdGVtIHRvIGV4cG9ydFxuICAgICAqIEBwYXJhbSBmb3JtYXQgLSBzdHJpbmcgbWltZSB0eXBlIHRvIGV4cG9ydFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSFRUUCByZXNwb25zZSBvYmplY3QgZm9yIGVuYWJsaW5nIGF0dGFjaG1lbnQgZG93bmxvYWRpbmdcbiAgICAgKi9cbiAgICBleHBvcnQgKGlkIDogc3RyaW5nLCBmb3JtYXQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCB0cnVlIClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvZXhwb3J0JztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIiwgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7Zm9ybWF0OmZvcm1hdH0sXG4gICAgICAgICAgICAgICAganNvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICAgICAgbGV0IG1zZyA9IGUubWVzc2FnZTtcbiAgICAgICAgICAgIC8vaHR0cHM6Ly9naXRodWIuY29tL0dlb1BsYXRmb3JtL2NsaWVudC1hcGkvaXNzdWVzLzFcbiAgICAgICAgICAgIGlmKGUuc3RhdHVzQ29kZSAmJiBlLnN0YXR1c0NvZGU9PT00MDYgfHwgZS5zdGF0dXNDb2RlPT09JzQwNicpIHtcbiAgICAgICAgICAgICAgICBtc2cgPSBgVW5zdXBwb3J0ZWQgZXhwb3J0IGZvcm1hdCBzcGVjaWZpZWQgJyR7Zm9ybWF0fSdgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZXhwb3J0aW5nIGl0ZW06ICR7bXNnfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZXhwb3J0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9iamVjdCAtIEdQIG9iamVjdCBkZWZpbml0aW9uIHRvIGdlbmVyYXRlIGEgVVJJIGZvclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgcmVxdWVzdCBvcHRpb25zXG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzdHJpbmcgVVJJXG4gICAgICovXG4gICAgZ2V0VXJpIChvYmplY3QgOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBvYmplY3QgKVxuICAgICAgICAudGhlbiggb2JqID0+IHtcbiAgICAgICAgICAgIGlmKCFvYmogfHwgIW9iai50eXBlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBhbiBvYmplY3Qgd2l0aCBhIHR5cGUgcHJvcGVydHlcIik7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvdXRpbHMvdXJpJztcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICAgICAgb3B0aW9ucy5yZXNwb25zZVR5cGUgPSAndGV4dCc7ICAvL3RvIGVuc3VyZSBwbGFpbnRleHQgaXMgZXhwZWN0ZWRcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsIHVybDogdXJsLCBkYXRhOiBvYmosIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCBlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGdldHRpbmcgVVJJIGZvciBpdGVtOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmdldFVyaSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkcyAtIGxpc3Qgb2YgaWRlbnRpZmllcnMgdG8gZmV0Y2ggb2JqZWN0cyBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGxpc3Qgb2YgbWF0Y2hpbmcgaXRlbXMgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBnZXRNdWx0aXBsZSAoaWRzIDogc3RyaW5nW10sIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBpZHMgKVxuICAgICAgICAudGhlbiggaWRlbnRpZmllcnMgPT4ge1xuXG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuYXBpQmFzZSArICcvYXBpL2ZldGNoJztcblxuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgZGF0YTppZGVudGlmaWVycywgb3B0aW9uczpvcHRpb25zfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIGl0ZW1zOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmdldE11bHRpcGxlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHVyaXMgLSBsaXN0IG9mIFVSSXMgdG8gcmV0cmlldmUgb2JqZWN0cyBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGxpc3QgY29udGFpbmluZyB1cmktaXRlbSBhc3NvY2lhdGlvbiB3aGVyZSBleGlzdHNcbiAgICAgKi9cbiAgICBleGlzdHModXJpcyA6IHN0cmluZ1tdLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBRLnJlc29sdmUodXJpcylcbiAgICAgICAgLnRoZW4oIHVyaXMgPT4ge1xuICAgICAgICAgICAgbGV0IG1ldGhvZCA9ICdQT1NUJywgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvdXRpbHMvZXhpc3RzJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIGRhdGE6dXJpcywgb3B0aW9uczpvcHRpb25zfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciByZXNvbHZpbmcgaXRlbXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZXhpc3RzKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgbGlrZShpdGVtIDogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoaXRlbS5pZClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSAnUFVUJywgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvaXRlbXMvJyArIGlkICsgJy9saWtlcyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHttZXRob2Q6bWV0aG9kLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGxpa2luZyBpdGVtICR7aXRlbS5pZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UubGlrZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2aWV3KGl0ZW0gOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZShpdGVtLmlkKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IG1ldGhvZCA9ICdQVVQnLCB1cmwgPSB0aGlzLmFwaUJhc2UgKyAnL2FwaS9pdGVtcy8nICsgaWQgKyAnL3ZpZXdzJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgaW5jcmVtZW50aW5nIHZpZXdzIGZvciBpdGVtICR7aXRlbS5pZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UubGlrZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgaXRlbSB0byBmZXRjaCBhc3NvY2lhdGlvbnMgZm9yXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBhcnJheSBvZiBhc3NvY2lhdGVkIGl0ZW1zIG9mIHRoZSBpdGVtIGluIHF1ZXN0aW9uXG4gICAgICovXG4gICAgYXNzb2NpYXRpb25zIChpZCA6IHN0cmluZywgcGFyYW1zIDogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggaWQgKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy9hc3NvY2lhdGlvbnMnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOnVybCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyB8fCB7fSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIGFzc29jaWF0aW9ucyBmb3IgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5hc3NvY2lhdGlvbnMoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBpdGVtIHRvIGZldGNoIHZlcnNpb24gaW5mbyBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGFycmF5IG9mIGF2YWlsYWJsZSB2ZXJzaW9ucyBvZiB0aGUgaXRlbVxuICAgICAqL1xuICAgIHZlcnNpb25zIChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGlkIClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvdmVyc2lvbnMnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7IG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnMgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyB2ZXJzaW9ucyBmb3IgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS52ZXJzaW9ucygpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtZXRob2QgLSBvbmUgb2YgXCJHRVRcIiwgXCJQT1NUXCIsIFwiUFVUXCIsIFwiREVMRVRFXCIsIFwiUEFUQ0hcIlxuICAgICAqIEBwYXJhbSB1cmwgLSBkZXN0aW5hdGlvbiBvZiB4aHIgcmVxdWVzdFxuICAgICAqIEBwYXJhbSBwYXJhbXMgLSBvYmplY3QgdG8gYmUgc2VudCB3aXRoIHJlcXVlc3QgYXMgcXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBkYXRhIC0gb2JqZWN0IHRvIGJlIHNlbnQgd2l0aCByZXF1ZXN0IGFzIGJvZHlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIG9iamVjdCBkZWZpbmluZyByZXF1ZXN0IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHJlcXVlc3Qgb3B0aW9ucyBmb3IgeGhyXG4gICAgICovXG4gICAgYnVpbGRSZXF1ZXN0IChvcHRpb25zIDoge1trZXk6c3RyaW5nXTphbnl9KSA6IHtba2V5OnN0cmluZ106YW55fSB7XG5cbiAgICAgICAgaWYodGhpcy5odHRwTWV0aG9kcy5pbmRleE9mKG9wdGlvbnMubWV0aG9kKTwwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBIVFRQIG1ldGhvZCAke29wdGlvbnMubWV0aG9kfWApO1xuXG4gICAgICAgIGlmKCFvcHRpb25zLnVybClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTXVzdCBzcGVjaWZ5IGEgVVJMIGZvciBIVFRQIHJlcXVlc3RzYCk7XG5cbiAgICAgICAgb3B0aW9ucy50aW1lb3V0ID0gdGhpcy5fdGltZW91dCB8fCAzMDAwMDtcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gb3B0cztcbiAgICB9XG5cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zIDoge1trZXk6c3RyaW5nXTphbnl9KSA6IHtba2V5OnN0cmluZ106YW55fSB7XG4gICAgICAgIGxldCByZXF1ZXN0ID0gdGhpcy5jbGllbnQuY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMubG9nRGVidWcoXCJJdGVtU2VydmljZS5jcmVhdGVSZXF1ZXN0T3B0cygpIC0gXCIgKyBKU09OLnN0cmluZ2lmeShyZXF1ZXN0KSk7XG4gICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgIH1cblxuICAgIGV4ZWN1dGUob3B0cyA6IHtba2V5OnN0cmluZ106YW55fSApIDogUS5Qcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuZXhlY3V0ZShvcHRzKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBpZihlID09PSBudWxsIHx8IHR5cGVvZihlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBlID0gbmV3IEVycm9yKFwiSXRlbVNlcnZpY2UuZXhlY3V0ZSgpIC0gUmVxdWVzdCBmYWlsZWQgYnV0IGRpZG4ndCByZXR1cm4gYW4gXCIgK1xuICAgICAgICAgICAgICAgIFwiZXJyb3IuIFRoaXMgaXMgbW9zdCBsaWtlbHkgYmVjYXVzZSB0aGUgcmVxdWVzdCB0aW1lZCBvdXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBJdGVtU2VydmljZTtcbiJdfQ==