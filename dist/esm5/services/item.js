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
        return Q.resolve(this.baseUrl + '/' + id + '/clone')
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBU0kscUJBQVksR0FBWSxFQUFFLFVBQXlCO3dCQUpyQixLQUFLOzJCQUVBLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQztRQUd4RSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO0tBQzVCOzs7OztJQUVELDRCQUFNOzs7O0lBQU4sVUFBTyxPQUFnQjtRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxZQUFZLENBQUM7S0FDekM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxnQ0FBVTs7OztJQUFWLFVBQVcsWUFBcUI7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7S0FDaEM7SUFFRDs7T0FFRzs7Ozs7SUFDSCw2QkFBTzs7OztJQUFQLFVBQVEsWUFBcUI7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsK0JBQVM7Ozs7SUFBVCxVQUFVLE1BQVk7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDeEI7SUFFRDs7T0FFRzs7Ozs7SUFDSCw4QkFBUTs7OztJQUFSLFVBQVMsQ0FBZ0I7UUFDckIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxN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OztJQUVELHVDQUFpQjs7OztJQUFqQixVQUFrQixPQUE0Qjs7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLG9DQUFvQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM5RSxPQUFPLE9BQU8sQ0FBQztLQUNsQjs7Ozs7SUFFRCw2QkFBTzs7OztJQUFQLFVBQVEsSUFBeUI7UUFDN0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDL0IsS0FBSyxDQUFDLFVBQUEsQ0FBQztZQUNKLElBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxPQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO2dCQUN4QyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsOERBQThEO29CQUM1RSwwREFBMEQsQ0FBQyxDQUFDO2FBQy9EO1lBQ0QsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RCLENBQUMsQ0FBQztLQUNOO3NCQS9nQkw7SUFpaEJDLENBQUE7Ozs7Ozs7Ozs7Ozs7OztBQUVELGVBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBRIGZyb20gJ3EnO1xuaW1wb3J0IHsgSXRlbSwgU2VhcmNoUmVzdWx0cyB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMnO1xuaW1wb3J0IFF1ZXJ5IGZyb20gJy4uL3NoYXJlZC9xdWVyeSc7XG5pbXBvcnQgR1BIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvY2xpZW50JztcblxuLyoqXG4gKiBJdGVtU2VydmljZVxuICogc2VydmljZSBmb3Igd29ya2luZyB3aXRoIHRoZSBHZW9QbGF0Zm9ybSBBUEkgdG9cbiAqIHJldHJpZXZlIGFuZCBtYW5pcHVsYXRlIGl0ZW1zLlxuICpcbiAqIEV4IFNlYXJjaGluZyBJdGVtc1xuICogICAgICBsZXQgcGFyYW1zID0geyBxOiAndGVzdCcgfTtcbiAqICAgICAgaXRlbVNlcnZpY2Uuc2VhcmNoKHBhcmFtcykudGhlbihyZXNwb25zZT0+e1xuICogICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UucmVzdWx0cy5sZW5ndGggKyBcIiBvZiBcIiArIHJlc3BvbnNlLnRvdGFsUmVzdWx0cyk7XG4gKiAgICAgIH0pLmNhdGNoKGU9PnsuLi59KTtcbiAqXG4gKiBFeCBGZXRjaCBJdGVtOlxuICogICAgICBpdGVtU2VydmljZS5nZXQoaXRlbUlkKS50aGVuKGl0ZW09PnsuLi59KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICogRXggU2F2aW5nIEl0ZW06XG4gKiAgICAgIGl0ZW1TZXJ2aWNlLnNhdmUoaXRlbSkudGhlbihpdGVtPT57Li4ufSkuY2F0Y2goZT0+ey4uLn0pO1xuICpcbiAqIEV4IERlbGV0aW5nIEl0ZW06XG4gKiAgICAgIGl0ZW1TZXJ2aWNlLnJlbW92ZShpdGVtSWQpLnRoZW4oKCk9PnsuLi59KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICogRXggUGF0Y2hpbmcgSXRlbTpcbiAqICAgICAgaXRlbVNlcnZpY2UucGF0Y2goaXRlbUlkLHBhdGNoKS50aGVuKGl0ZW09PnsuLi59KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICovXG5jbGFzcyBJdGVtU2VydmljZSB7XG5cbiAgICBwcm90ZWN0ZWQgYXBpQmFzZSA/OiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIGJhc2VVcmwgPzogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBjbGllbnQgOiBHUEh0dHBDbGllbnQ7XG4gICAgcHJvdGVjdGVkIF90aW1lb3V0IDogbnVtYmVyID0gMzAwMDA7XG4gICAgcHJvdGVjdGVkIGxvZ2dlciA6IGFueTtcbiAgICBwcm90ZWN0ZWQgaHR0cE1ldGhvZHMgOiBzdHJpbmdbXSA9IFtcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIiwgXCJQQVRDSFwiXTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLnNldFVybCh1cmwpO1xuICAgICAgICB0aGlzLmNsaWVudCA9IGh0dHBDbGllbnQ7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmwgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hcGlCYXNlID0gYmFzZVVybDtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybCArICcvYXBpL2l0ZW1zJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWlsbGlzZWNvbmRzIC0gb3ZlcnJpZGUgZW52aXJvbm1lbnQgdmFyaWFibGUgdGltZW91dFxuICAgICAqL1xuICAgIHNldFRpbWVvdXQobWlsbGlzZWNvbmRzIDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSBtaWxsaXNlY29uZHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1pbGxpc2Vjb25kcyAtIG92ZXJyaWRlIGVudmlyb25tZW50IHZhcmlhYmxlIHRpbWVvdXRcbiAgICAgKi9cbiAgICB0aW1lb3V0KG1pbGxpc2Vjb25kcyA6IG51bWJlcikgOiBJdGVtU2VydmljZSB7XG4gICAgICAgIHRoaXMuc2V0VGltZW91dChtaWxsaXNlY29uZHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbG9nZ2VyIC0gbG9nIHNlcnZpY2VcbiAgICAgKi9cbiAgICBzZXRMb2dnZXIobG9nZ2VyIDogYW55KSB7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBlIC0gZXJyb3IgdG8gbG9nIChpZiBsb2dnZXIgc3BlY2lmaWVkKVxuICAgICAqL1xuICAgIGxvZ0Vycm9yKGUgOiBzdHJpbmd8RXJyb3IpIHtcbiAgICAgICAgaWYodGhpcy5sb2dnZXIgJiYgdGhpcy5sb2dnZXIuZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1zZyAtIG1lc3NhZ2UgdG8gbG9nIGFzIGRlYnVnXG4gICAgICovXG4gICAgbG9nRGVidWcobXNnIDogc3RyaW5nKSB7XG4gICAgICAgIGlmKHRoaXMubG9nZ2VyICYmIHRoaXMubG9nZ2VyLmRlYnVnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1Zyhtc2cpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBpdGVtIHRvIGZldGNoXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGdldCAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkO1xuICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMudmVyc2lvbikge1xuICAgICAgICAgICAgdXJsICs9ICcvdmVyc2lvbnMvJyArIG9wdGlvbnMudmVyc2lvbjtcbiAgICAgICAgICAgIC8vIHRoaXMubG9nRGVidWcoXCJDbGllbnQuZ2V0IHJlcXVlc3RpbmcgdmVyc2lvbjogXCIgKyBvcHRpb25zLnZlcnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHVybCApXG4gICAgICAgIC50aGVuKCB1cmwgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7IG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnMgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmdldCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaXRlbU9iaiAtIGl0ZW0gdG8gY3JlYXRlIG9yIHVwZGF0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBzYXZlIChpdGVtT2JqIDogSXRlbSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBpdGVtT2JqIClcbiAgICAgICAgLnRoZW4oIGl0ZW0gPT4ge1xuXG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuYmFzZVVybDtcbiAgICAgICAgICAgIGlmKGl0ZW0uaWQpIHtcbiAgICAgICAgICAgICAgICBtZXRob2QgPSBcIlBVVFwiO1xuICAgICAgICAgICAgICAgIHVybCArPSAnLycgKyBpdGVtLmlkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2lmIGl0ZW0gaXMgYmVpbmcgY3JlYXRlZCBhbmQgaGFzIG5vIFVSSSBhbHJlYWR5IGRlZmluZWRcbiAgICAgICAgICAgICAgICAvLyBhdHRlbXB0IHRvIGNyZWF0ZSBvbmUgdXNpbmcgdGhlIEFQSSdzIG1ldGhvZCBmb3IgZG9pbmcgc29cbiAgICAgICAgICAgICAgICAvLyBhbmQgdGhlbiBhdHRlbXB0IHRoZSBhY3R1YWwgaXRlbSBjcmVhdGlvblxuICAgICAgICAgICAgICAgIGlmKCFpdGVtLnVyaSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVcmkoaXRlbSwgb3B0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oIHVyaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnVyaSA9IHVyaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIGRhdGE6aXRlbSwgb3B0aW9uczpvcHRpb25zfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIGRhdGE6aXRlbSwgb3B0aW9uczpvcHRpb25zfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHNhdmluZyBpdGVtOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLnNhdmUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBpdGVtIHRvIGRlbGV0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgdHJ1ZSBpZiBzdWNjZXNzZnVsIG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgcmVtb3ZlIChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGJvb2xlYW4+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCApXG4gICAgICAgIC50aGVuKCB1cmwgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiREVMRVRFXCIsIHVybDogdXJsLCBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCAoKSA9PiB0cnVlKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBkZWxldGluZyBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLnJlbW92ZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gcGF0Y2hcbiAgICAgKiBAcGFyYW0gcGF0Y2ggLSBIVFRQLVBBVENIIGNvbXBsaWFudCBzZXQgb2YgcHJvcGVydGllcyB0byBwYXRjaFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBwYXRjaCAoaWQgOiBzdHJpbmcsIHBhdGNoIDogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHRoaXMuYmFzZVVybCArICcvJyArIGlkIClcbiAgICAgICAgLnRoZW4oIHVybCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIiwgdXJsOiB1cmwsIGRhdGE6IHBhdGNoLCBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHBhdGNoaW5nIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UucGF0Y2goKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gY2xvbmVcbiAgICAgKiBAcGFyYW0gb3ZlcnJpZGVzIC0gS1ZQIG9mIHByb3BlcnR5LXZhbHVlIG92ZXJyaWRlcyB0byBhcHBseSB0byBjbG9uZWQgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGNsb25lIG9mIEl0ZW0gb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBjbG9uZSAoaWQgOiBzdHJpbmcsIG92ZXJyaWRlcyA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvY2xvbmUnIClcbiAgICAgICAgLnRoZW4oIHVybCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLCB1cmw6IHVybCwgZGF0YTogb3ZlcnJpZGVzLCBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGNsb25pbmcgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5jbG9uZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnIC0gZWl0aGVyIEpTIG9iamVjdCBvZiBxdWVyeSBwYXJhbWV0ZXJzIG9yIEdlb1BsYXRmb3JtLlF1ZXJ5IGluc3RhbmNlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHNlYXJjaCAoYXJnID86IFF1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8U2VhcmNoUmVzdWx0cz4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGFyZyApXG4gICAgICAgIC50aGVuKCBwYXJhbXMgPT4ge1xuICAgICAgICAgICAgbGV0IHBzID0gcGFyYW1zID8gcGFyYW1zLmdldFF1ZXJ5KCkgOiB7fTtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLCB1cmw6IHRoaXMuYmFzZVVybCwgcGFyYW1zOiBwcywgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBzZWFyY2hpbmcgaXRlbXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2Uuc2VhcmNoKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYXJnIC0gVVJMIHRvIG1ldGFkYXRhIGRvY3VtZW50IG9yIEZpbGUgdG8gdXBsb2FkXG4gICAgICogQHBhcmFtIGZvcm1hdCAtIG1ldGFkYXRhIGZvcm1hdCBvZiBzcGVjaWZpZWQgZG9jdW1lbnRcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEdlb1BsYXRmb3JtIEl0ZW1cbiAgICAgKi9cbiAgICBpbXBvcnQgKGFyZyA6IGFueSwgZm9ybWF0IDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHRydWUgKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgaWYoYXJnPT09bnVsbCB8fCBhcmcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBhIHZhbGlkIFVSTCBvciBGaWxlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGlzRmlsZSA9IHR5cGVvZihhcmcpICE9PSAnc3RyaW5nJztcbiAgICAgICAgICAgIGxldCBybyA6IHsgW2tleTpzdHJpbmddOmFueSB9ID0ge1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYXBpQmFzZSArICcvYXBpL2ltcG9ydCcsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IHRydWUsICAvL2ZvciBqUXVlcnlcbiAgICAgICAgICAgICAgICBmb3JtRGF0YTogdHJ1ZSwgICAgIC8vZm9yIE5vZGUgKFJlcXVlc3RKUylcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYoaXNGaWxlKSB7XG4gICAgICAgICAgICAgICAgcm8uZmlsZSA9IGFyZztcbiAgICAgICAgICAgICAgICByby5kYXRhID0geyBmb3JtYXQ6IGZvcm1hdCB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByby5mb3JtRGF0YSA9IGZhbHNlOyAgICAvL211c3QgYmUgZmFsc2UgZm9yIGRhdGEgdG8gbm90IGJlIG11bHRpLXBhcnQgZm9ybWRhdGFcbiAgICAgICAgICAgICAgICByby5kYXRhID0geyB1cmw6IGFyZywgZm9ybWF0OiBmb3JtYXQgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5vdmVyd3JpdGUpIHtcbiAgICAgICAgICAgICAgICByby5kYXRhLm92ZXJ3cml0ZSA9ICghIW9wdGlvbnMub3ZlcndyaXRlKSsnJztcbiAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5vdmVyd3JpdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHJvKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCggZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBpbXBvcnRpbmcgaXRlbTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICBpZihlLnN0YXR1cyA9PT0gNDA5IHx8IH5lLm1lc3NhZ2UuaW5kZXhPZignSXRlbSBhbHJlYWR5IGV4aXN0cycpKVxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCB7c3RhdHVzOiA0MDl9KTtcbiAgICAgICAgICAgIGlmKGUuaXRlbSlcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgeyBpdGVtIDogZS5pdGVtIH0pO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuaW1wb3J0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIHRoZSBpdGVtIHRvIGV4cG9ydFxuICAgICAqIEBwYXJhbSBmb3JtYXQgLSBzdHJpbmcgbWltZSB0eXBlIHRvIGV4cG9ydFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSFRUUCByZXNwb25zZSBvYmplY3QgZm9yIGVuYWJsaW5nIGF0dGFjaG1lbnQgZG93bmxvYWRpbmdcbiAgICAgKi9cbiAgICBleHBvcnQgKGlkIDogc3RyaW5nLCBmb3JtYXQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCB0cnVlIClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvZXhwb3J0JztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIiwgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7Zm9ybWF0OmZvcm1hdH0sXG4gICAgICAgICAgICAgICAganNvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICAgICAgbGV0IG1zZyA9IGUubWVzc2FnZTtcbiAgICAgICAgICAgIC8vaHR0cHM6Ly9naXRodWIuY29tL0dlb1BsYXRmb3JtL2NsaWVudC1hcGkvaXNzdWVzLzFcbiAgICAgICAgICAgIGlmKGUuc3RhdHVzQ29kZSAmJiBlLnN0YXR1c0NvZGU9PT00MDYgfHwgZS5zdGF0dXNDb2RlPT09JzQwNicpIHtcbiAgICAgICAgICAgICAgICBtc2cgPSBgVW5zdXBwb3J0ZWQgZXhwb3J0IGZvcm1hdCBzcGVjaWZpZWQgJyR7Zm9ybWF0fSdgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZXhwb3J0aW5nIGl0ZW06ICR7bXNnfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZXhwb3J0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9iamVjdCAtIEdQIG9iamVjdCBkZWZpbml0aW9uIHRvIGdlbmVyYXRlIGEgVVJJIGZvclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgcmVxdWVzdCBvcHRpb25zXG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzdHJpbmcgVVJJXG4gICAgICovXG4gICAgZ2V0VXJpIChvYmplY3QgOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBvYmplY3QgKVxuICAgICAgICAudGhlbiggb2JqID0+IHtcbiAgICAgICAgICAgIGlmKCFvYmogfHwgIW9iai50eXBlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBhbiBvYmplY3Qgd2l0aCBhIHR5cGUgcHJvcGVydHlcIik7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvdXRpbHMvdXJpJztcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICAgICAgb3B0aW9ucy5yZXNwb25zZVR5cGUgPSAndGV4dCc7ICAvL3RvIGVuc3VyZSBwbGFpbnRleHQgaXMgZXhwZWN0ZWRcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsIHVybDogdXJsLCBkYXRhOiBvYmosIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCBlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGdldHRpbmcgVVJJIGZvciBpdGVtOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmdldFVyaSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkcyAtIGxpc3Qgb2YgaWRlbnRpZmllcnMgdG8gZmV0Y2ggb2JqZWN0cyBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGxpc3Qgb2YgbWF0Y2hpbmcgaXRlbXMgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBnZXRNdWx0aXBsZSAoaWRzIDogc3RyaW5nW10sIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBpZHMgKVxuICAgICAgICAudGhlbiggaWRlbnRpZmllcnMgPT4ge1xuXG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuYXBpQmFzZSArICcvYXBpL2ZldGNoJztcblxuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgZGF0YTppZGVudGlmaWVycywgb3B0aW9uczpvcHRpb25zfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIGl0ZW1zOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmdldE11bHRpcGxlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHVyaXMgLSBsaXN0IG9mIFVSSXMgdG8gcmV0cmlldmUgb2JqZWN0cyBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGxpc3QgY29udGFpbmluZyB1cmktaXRlbSBhc3NvY2lhdGlvbiB3aGVyZSBleGlzdHNcbiAgICAgKi9cbiAgICBleGlzdHModXJpcyA6IHN0cmluZ1tdLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBRLnJlc29sdmUodXJpcylcbiAgICAgICAgLnRoZW4oIHVyaXMgPT4ge1xuICAgICAgICAgICAgbGV0IG1ldGhvZCA9ICdQT1NUJywgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvdXRpbHMvZXhpc3RzJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIGRhdGE6dXJpcywgb3B0aW9uczpvcHRpb25zfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciByZXNvbHZpbmcgaXRlbXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZXhpc3RzKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgbGlrZShpdGVtIDogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoaXRlbS5pZClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSAnUFVUJywgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvaXRlbXMvJyArIGlkICsgJy9saWtlcyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHttZXRob2Q6bWV0aG9kLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGxpa2luZyBpdGVtICR7aXRlbS5pZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UubGlrZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2aWV3KGl0ZW0gOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZShpdGVtLmlkKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IG1ldGhvZCA9ICdQVVQnLCB1cmwgPSB0aGlzLmFwaUJhc2UgKyAnL2FwaS9pdGVtcy8nICsgaWQgKyAnL3ZpZXdzJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgaW5jcmVtZW50aW5nIHZpZXdzIGZvciBpdGVtICR7aXRlbS5pZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UubGlrZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgaXRlbSB0byBmZXRjaCBhc3NvY2lhdGlvbnMgZm9yXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBhcnJheSBvZiBhc3NvY2lhdGVkIGl0ZW1zIG9mIHRoZSBpdGVtIGluIHF1ZXN0aW9uXG4gICAgICovXG4gICAgYXNzb2NpYXRpb25zIChpZCA6IHN0cmluZywgcGFyYW1zIDogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggaWQgKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy9hc3NvY2lhdGlvbnMnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOnVybCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyB8fCB7fSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIGFzc29jaWF0aW9ucyBmb3IgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5hc3NvY2lhdGlvbnMoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBpdGVtIHRvIGZldGNoIHZlcnNpb24gaW5mbyBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGFycmF5IG9mIGF2YWlsYWJsZSB2ZXJzaW9ucyBvZiB0aGUgaXRlbVxuICAgICAqL1xuICAgIHZlcnNpb25zIChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGlkIClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvdmVyc2lvbnMnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7IG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnMgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyB2ZXJzaW9ucyBmb3IgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS52ZXJzaW9ucygpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtZXRob2QgLSBvbmUgb2YgXCJHRVRcIiwgXCJQT1NUXCIsIFwiUFVUXCIsIFwiREVMRVRFXCIsIFwiUEFUQ0hcIlxuICAgICAqIEBwYXJhbSB1cmwgLSBkZXN0aW5hdGlvbiBvZiB4aHIgcmVxdWVzdFxuICAgICAqIEBwYXJhbSBwYXJhbXMgLSBvYmplY3QgdG8gYmUgc2VudCB3aXRoIHJlcXVlc3QgYXMgcXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBkYXRhIC0gb2JqZWN0IHRvIGJlIHNlbnQgd2l0aCByZXF1ZXN0IGFzIGJvZHlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIG9iamVjdCBkZWZpbmluZyByZXF1ZXN0IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHJlcXVlc3Qgb3B0aW9ucyBmb3IgeGhyXG4gICAgICovXG4gICAgYnVpbGRSZXF1ZXN0IChvcHRpb25zIDoge1trZXk6c3RyaW5nXTphbnl9KSA6IHtba2V5OnN0cmluZ106YW55fSB7XG5cbiAgICAgICAgaWYodGhpcy5odHRwTWV0aG9kcy5pbmRleE9mKG9wdGlvbnMubWV0aG9kKTwwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBIVFRQIG1ldGhvZCAke29wdGlvbnMubWV0aG9kfWApO1xuXG4gICAgICAgIGlmKCFvcHRpb25zLnVybClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTXVzdCBzcGVjaWZ5IGEgVVJMIGZvciBIVFRQIHJlcXVlc3RzYCk7XG5cbiAgICAgICAgb3B0aW9ucy50aW1lb3V0ID0gdGhpcy5fdGltZW91dCB8fCAzMDAwMDtcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gb3B0cztcbiAgICB9XG5cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zIDoge1trZXk6c3RyaW5nXTphbnl9KSA6IHtba2V5OnN0cmluZ106YW55fSB7XG4gICAgICAgIGxldCByZXF1ZXN0ID0gdGhpcy5jbGllbnQuY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMubG9nRGVidWcoXCJJdGVtU2VydmljZS5jcmVhdGVSZXF1ZXN0T3B0cygpIC0gXCIgKyBKU09OLnN0cmluZ2lmeShyZXF1ZXN0KSk7XG4gICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgIH1cblxuICAgIGV4ZWN1dGUob3B0cyA6IHtba2V5OnN0cmluZ106YW55fSApIDogUS5Qcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuZXhlY3V0ZShvcHRzKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBpZihlID09PSBudWxsIHx8IHR5cGVvZihlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBlID0gbmV3IEVycm9yKFwiSXRlbVNlcnZpY2UuZXhlY3V0ZSgpIC0gUmVxdWVzdCBmYWlsZWQgYnV0IGRpZG4ndCByZXR1cm4gYW4gXCIgK1xuICAgICAgICAgICAgICAgIFwiZXJyb3IuIFRoaXMgaXMgbW9zdCBsaWtlbHkgYmVjYXVzZSB0aGUgcmVxdWVzdCB0aW1lZCBvdXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBJdGVtU2VydmljZTtcbiJdfQ==