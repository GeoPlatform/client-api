/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
     * @return GPHttpClient instance or null if one was not provided
     */
    /**
     * @return {?} GPHttpClient instance or null if one was not provided
     */
    ItemService.prototype.getClient = /**
     * @return {?} GPHttpClient instance or null if one was not provided
     */
    function () {
        return this.client;
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
        return Promise.resolve(url)
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
        return Promise.resolve(itemObj)
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
        return Promise.resolve(this.baseUrl + '/' + id)
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
        return Promise.resolve(this.baseUrl + '/' + id)
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
        return Promise.resolve(this.baseUrl + '/' + id + '/clone')
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
        return Promise.resolve(arg)
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
        return Promise.resolve(true)
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
        return Promise.resolve(true)
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
        return Promise.resolve(object)
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
        return Promise.resolve(ids)
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
        return Promise.resolve(uris)
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
        return Promise.resolve(item.id)
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
        return Promise.resolve(item.id)
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
        return Promise.resolve(id)
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
        return Promise.resolve(id)
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
            return Promise.reject(e);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBU0kscUJBQVksR0FBWSxFQUFFLFVBQXlCO3dCQUpyQixLQUFLOzJCQUVBLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQztRQUd4RSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO0tBQzVCOzs7OztJQUVELDRCQUFNOzs7O0lBQU4sVUFBTyxPQUFnQjtRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxZQUFZLENBQUM7S0FDekM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxnQ0FBVTs7OztJQUFWLFVBQVcsWUFBcUI7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7S0FDaEM7SUFFRDs7T0FFRzs7Ozs7SUFDSCw2QkFBTzs7OztJQUFQLFVBQVEsWUFBcUI7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQ7O09BRUc7Ozs7SUFDSCwrQkFBUzs7O0lBQVQ7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDdEI7SUFFRDs7T0FFRzs7Ozs7SUFDSCwrQkFBUzs7OztJQUFULFVBQVUsTUFBWTtRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN4QjtJQUVEOztPQUVHOzs7OztJQUNILDhCQUFROzs7O0lBQVIsVUFBUyxDQUFnQjtRQUNyQixJQUFH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LENBQUM7UUFDOUUsT0FBTyxPQUFPLENBQUM7S0FDbEI7Ozs7O0lBRUQsNkJBQU87Ozs7SUFBUCxVQUFRLElBQXlCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQy9CLEtBQUssQ0FBQyxVQUFBLENBQUM7WUFDSixJQUFHLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDeEMsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLDhEQUE4RDtvQkFDNUUsMERBQTBELENBQUMsQ0FBQzthQUMvRDtZQUNELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QixDQUFDLENBQUM7S0FDTjtzQkE5aEJMO0lBZ2lCQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFFRCxlQUFlLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSXRlbSwgU2VhcmNoUmVzdWx0cyB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMnO1xuaW1wb3J0IFF1ZXJ5IGZyb20gJy4uL3NoYXJlZC9xdWVyeSc7XG5pbXBvcnQgR1BIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvY2xpZW50JztcblxuLyoqXG4gKiBJdGVtU2VydmljZVxuICogc2VydmljZSBmb3Igd29ya2luZyB3aXRoIHRoZSBHZW9QbGF0Zm9ybSBBUEkgdG9cbiAqIHJldHJpZXZlIGFuZCBtYW5pcHVsYXRlIGl0ZW1zLlxuICpcbiAqIEV4IFNlYXJjaGluZyBJdGVtc1xuICogICAgICBsZXQgcGFyYW1zID0geyBxOiAndGVzdCcgfTtcbiAqICAgICAgaXRlbVNlcnZpY2Uuc2VhcmNoKHBhcmFtcykudGhlbihyZXNwb25zZT0+e1xuICogICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UucmVzdWx0cy5sZW5ndGggKyBcIiBvZiBcIiArIHJlc3BvbnNlLnRvdGFsUmVzdWx0cyk7XG4gKiAgICAgIH0pLmNhdGNoKGU9PnsuLi59KTtcbiAqXG4gKiBFeCBGZXRjaCBJdGVtOlxuICogICAgICBpdGVtU2VydmljZS5nZXQoaXRlbUlkKS50aGVuKGl0ZW09PnsuLi59KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICogRXggU2F2aW5nIEl0ZW06XG4gKiAgICAgIGl0ZW1TZXJ2aWNlLnNhdmUoaXRlbSkudGhlbihpdGVtPT57Li4ufSkuY2F0Y2goZT0+ey4uLn0pO1xuICpcbiAqIEV4IERlbGV0aW5nIEl0ZW06XG4gKiAgICAgIGl0ZW1TZXJ2aWNlLnJlbW92ZShpdGVtSWQpLnRoZW4oKCk9PnsuLi59KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICogRXggUGF0Y2hpbmcgSXRlbTpcbiAqICAgICAgaXRlbVNlcnZpY2UucGF0Y2goaXRlbUlkLHBhdGNoKS50aGVuKGl0ZW09PnsuLi59KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICovXG5jbGFzcyBJdGVtU2VydmljZSB7XG5cbiAgICBwcm90ZWN0ZWQgYXBpQmFzZSA/OiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIGJhc2VVcmwgPzogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBjbGllbnQgOiBHUEh0dHBDbGllbnQ7XG4gICAgcHJvdGVjdGVkIF90aW1lb3V0IDogbnVtYmVyID0gMzAwMDA7XG4gICAgcHJvdGVjdGVkIGxvZ2dlciA6IGFueTtcbiAgICBwcm90ZWN0ZWQgaHR0cE1ldGhvZHMgOiBzdHJpbmdbXSA9IFtcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIiwgXCJQQVRDSFwiXTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLnNldFVybCh1cmwpO1xuICAgICAgICB0aGlzLmNsaWVudCA9IGh0dHBDbGllbnQ7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmwgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hcGlCYXNlID0gYmFzZVVybDtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybCArICcvYXBpL2l0ZW1zJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWlsbGlzZWNvbmRzIC0gb3ZlcnJpZGUgZW52aXJvbm1lbnQgdmFyaWFibGUgdGltZW91dFxuICAgICAqL1xuICAgIHNldFRpbWVvdXQobWlsbGlzZWNvbmRzIDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSBtaWxsaXNlY29uZHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1pbGxpc2Vjb25kcyAtIG92ZXJyaWRlIGVudmlyb25tZW50IHZhcmlhYmxlIHRpbWVvdXRcbiAgICAgKi9cbiAgICB0aW1lb3V0KG1pbGxpc2Vjb25kcyA6IG51bWJlcikgOiBJdGVtU2VydmljZSB7XG4gICAgICAgIHRoaXMuc2V0VGltZW91dChtaWxsaXNlY29uZHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIEdQSHR0cENsaWVudCBpbnN0YW5jZSBvciBudWxsIGlmIG9uZSB3YXMgbm90IHByb3ZpZGVkXG4gICAgICovXG4gICAgZ2V0Q2xpZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGxvZ2dlciAtIGxvZyBzZXJ2aWNlXG4gICAgICovXG4gICAgc2V0TG9nZ2VyKGxvZ2dlciA6IGFueSkge1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZSAtIGVycm9yIHRvIGxvZyAoaWYgbG9nZ2VyIHNwZWNpZmllZClcbiAgICAgKi9cbiAgICBsb2dFcnJvcihlIDogc3RyaW5nfEVycm9yKSB7XG4gICAgICAgIGlmKHRoaXMubG9nZ2VyICYmIHRoaXMubG9nZ2VyLmVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtc2cgLSBtZXNzYWdlIHRvIGxvZyBhcyBkZWJ1Z1xuICAgICAqL1xuICAgIGxvZ0RlYnVnKG1zZyA6IHN0cmluZykge1xuICAgICAgICBpZih0aGlzLmxvZ2dlciAmJiB0aGlzLmxvZ2dlci5kZWJ1Zykge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcobXNnKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgaXRlbSB0byBmZXRjaFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBnZXQgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQ7XG4gICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy52ZXJzaW9uKSB7XG4gICAgICAgICAgICB1cmwgKz0gJy92ZXJzaW9ucy8nICsgb3B0aW9ucy52ZXJzaW9uO1xuICAgICAgICAgICAgLy8gdGhpcy5sb2dEZWJ1ZyhcIkNsaWVudC5nZXQgcmVxdWVzdGluZyB2ZXJzaW9uOiBcIiArIG9wdGlvbnMudmVyc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggdXJsIClcbiAgICAgICAgLnRoZW4oIHVybCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHsgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9ucyB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZ2V0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaXRlbU9iaiAtIGl0ZW0gdG8gY3JlYXRlIG9yIHVwZGF0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBzYXZlIChpdGVtT2JqIDogSXRlbSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggaXRlbU9iaiApXG4gICAgICAgIC50aGVuKCBpdGVtID0+IHtcblxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLmJhc2VVcmw7XG4gICAgICAgICAgICBpZihpdGVtLmlkKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gXCJQVVRcIjtcbiAgICAgICAgICAgICAgICB1cmwgKz0gJy8nICsgaXRlbS5pZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9pZiBpdGVtIGlzIGJlaW5nIGNyZWF0ZWQgYW5kIGhhcyBubyBVUkkgYWxyZWFkeSBkZWZpbmVkXG4gICAgICAgICAgICAgICAgLy8gYXR0ZW1wdCB0byBjcmVhdGUgb25lIHVzaW5nIHRoZSBBUEkncyBtZXRob2QgZm9yIGRvaW5nIHNvXG4gICAgICAgICAgICAgICAgLy8gYW5kIHRoZW4gYXR0ZW1wdCB0aGUgYWN0dWFsIGl0ZW0gY3JlYXRpb25cbiAgICAgICAgICAgICAgICBpZighaXRlbS51cmkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXJpKGl0ZW0sIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCB1cmkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS51cmkgPSB1cmk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHttZXRob2Q6bWV0aG9kLCB1cmw6dXJsLCBkYXRhOml0ZW0sIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHttZXRob2Q6bWV0aG9kLCB1cmw6dXJsLCBkYXRhOml0ZW0sIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcblxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBzYXZpbmcgaXRlbTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5zYXZlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gZGVsZXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyB0cnVlIGlmIHN1Y2Nlc3NmdWwgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICByZW1vdmUgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGJvb2xlYW4+IHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCApXG4gICAgICAgIC50aGVuKCB1cmwgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiREVMRVRFXCIsIHVybDogdXJsLCBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCAoKSA9PiB0cnVlKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBkZWxldGluZyBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLnJlbW92ZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBpdGVtIHRvIHBhdGNoXG4gICAgICogQHBhcmFtIHBhdGNoIC0gSFRUUC1QQVRDSCBjb21wbGlhbnQgc2V0IG9mIHByb3BlcnRpZXMgdG8gcGF0Y2hcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEl0ZW0gb2JqZWN0IG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgcGF0Y2ggKGlkIDogc3RyaW5nLCBwYXRjaCA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKVxuICAgICAgICAudGhlbiggdXJsID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQQVRDSFwiLCB1cmw6IHVybCwgZGF0YTogcGF0Y2gsIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgcGF0Y2hpbmcgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5wYXRjaCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gY2xvbmVcbiAgICAgKiBAcGFyYW0gb3ZlcnJpZGVzIC0gS1ZQIG9mIHByb3BlcnR5LXZhbHVlIG92ZXJyaWRlcyB0byBhcHBseSB0byBjbG9uZWQgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGNsb25lIG9mIEl0ZW0gb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBjbG9uZSAoaWQgOiBzdHJpbmcsIG92ZXJyaWRlcyA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL2Nsb25lJyApXG4gICAgICAgIC50aGVuKCB1cmwgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIiwgdXJsOiB1cmwsIGRhdGE6IG92ZXJyaWRlcywgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBjbG9uaW5nIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuY2xvbmUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBlaXRoZXIgSlMgb2JqZWN0IG9mIHF1ZXJ5IHBhcmFtZXRlcnMgb3IgUXVlcnkgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgc2VhcmNoIChhcmcgPzogYW55LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPFNlYXJjaFJlc3VsdHM+IHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBhcmcgKVxuICAgICAgICAudGhlbiggcGFyYW1zID0+IHtcbiAgICAgICAgICAgIGxldCBwcyA9IHt9O1xuICAgICAgICAgICAgaWYocGFyYW1zICYmIHR5cGVvZihwYXJhbXMuZ2V0UXVlcnkpID09PSAnZnVuY3Rpb24nKSBwcyA9IHBhcmFtcy5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgZWxzZSBpZih0eXBlb2YocGFyYW1zKSA9PT0gJ29iamVjdCcpIHBzID0gcGFyYW1zO1xuICAgICAgICAgICAgZWxzZSBwcyA9IHt9O1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmJhc2VVcmwsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwcyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHNlYXJjaGluZyBpdGVtczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5zZWFyY2goKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYXJnIC0gVVJMIHRvIG1ldGFkYXRhIGRvY3VtZW50IG9yIEZpbGUgdG8gdXBsb2FkXG4gICAgICogQHBhcmFtIGZvcm1hdCAtIG1ldGFkYXRhIGZvcm1hdCBvZiBzcGVjaWZpZWQgZG9jdW1lbnRcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEdlb1BsYXRmb3JtIEl0ZW1cbiAgICAgKi9cbiAgICBpbXBvcnQgKGFyZyA6IGFueSwgZm9ybWF0IDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB0cnVlIClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIGlmKGFyZz09PW51bGwgfHwgYXJnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgYSB2YWxpZCBVUkwgb3IgRmlsZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBpc0ZpbGUgPSB0eXBlb2YoYXJnKSAhPT0gJ3N0cmluZyc7XG4gICAgICAgICAgICBsZXQgcm8gOiB7IFtrZXk6c3RyaW5nXTphbnkgfSA9IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmFwaUJhc2UgKyAnL2FwaS9pbXBvcnQnLFxuICAgICAgICAgICAgICAgIHByb2Nlc3NEYXRhOiB0cnVlLCAgLy9mb3IgalF1ZXJ5XG4gICAgICAgICAgICAgICAgZm9ybURhdGE6IHRydWUsICAgICAvL2ZvciBOb2RlIChSZXF1ZXN0SlMpXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKGlzRmlsZSkge1xuICAgICAgICAgICAgICAgIHJvLmZpbGUgPSBhcmc7XG4gICAgICAgICAgICAgICAgcm8uZGF0YSA9IHsgZm9ybWF0OiBmb3JtYXQgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm8uZm9ybURhdGEgPSBmYWxzZTsgICAgLy9tdXN0IGJlIGZhbHNlIGZvciBkYXRhIHRvIG5vdCBiZSBtdWx0aS1wYXJ0IGZvcm1kYXRhXG4gICAgICAgICAgICAgICAgcm8uZGF0YSA9IHsgdXJsOiBhcmcsIGZvcm1hdDogZm9ybWF0IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMub3ZlcndyaXRlKSB7XG4gICAgICAgICAgICAgICAgcm8uZGF0YS5vdmVyd3JpdGUgPSAoISFvcHRpb25zLm92ZXJ3cml0ZSkrJyc7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMub3ZlcndyaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdChybyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgaW1wb3J0aW5nIGl0ZW06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgaWYoZS5zdGF0dXMgPT09IDQwOSB8fCB+ZS5tZXNzYWdlLmluZGV4T2YoJ0l0ZW0gYWxyZWFkeSBleGlzdHMnKSlcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwge3N0YXR1czogNDA5fSk7XG4gICAgICAgICAgICBpZihlLml0ZW0pXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIHsgaXRlbSA6IGUuaXRlbSB9KTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmltcG9ydCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgdGhlIGl0ZW0gdG8gZXhwb3J0XG4gICAgICogQHBhcmFtIGZvcm1hdCAtIHN0cmluZyBtaW1lIHR5cGUgdG8gZXhwb3J0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBIVFRQIHJlc3BvbnNlIG9iamVjdCBmb3IgZW5hYmxpbmcgYXR0YWNobWVudCBkb3dubG9hZGluZ1xuICAgICAqL1xuICAgIGV4cG9ydCAoaWQgOiBzdHJpbmcsIGZvcm1hdCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB0cnVlIClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvZXhwb3J0JztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIiwgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7Zm9ybWF0OmZvcm1hdH0sXG4gICAgICAgICAgICAgICAganNvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICAgICAgbGV0IG1zZyA9IGUubWVzc2FnZTtcbiAgICAgICAgICAgIC8vaHR0cHM6Ly9naXRodWIuY29tL0dlb1BsYXRmb3JtL2NsaWVudC1hcGkvaXNzdWVzLzFcbiAgICAgICAgICAgIGlmKGUuc3RhdHVzQ29kZSAmJiBlLnN0YXR1c0NvZGU9PT00MDYgfHwgZS5zdGF0dXNDb2RlPT09JzQwNicpIHtcbiAgICAgICAgICAgICAgICBtc2cgPSBgVW5zdXBwb3J0ZWQgZXhwb3J0IGZvcm1hdCBzcGVjaWZpZWQgJyR7Zm9ybWF0fSdgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZXhwb3J0aW5nIGl0ZW06ICR7bXNnfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZXhwb3J0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYmplY3QgLSBHUCBvYmplY3QgZGVmaW5pdGlvbiB0byBnZW5lcmF0ZSBhIFVSSSBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHJlcXVlc3Qgb3B0aW9uc1xuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc3RyaW5nIFVSSVxuICAgICAqL1xuICAgIGdldFVyaSAob2JqZWN0IDogYW55LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIG9iamVjdCApXG4gICAgICAgIC50aGVuKCBvYmogPT4ge1xuICAgICAgICAgICAgaWYoIW9iaiB8fCAhb2JqLnR5cGUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGFuIG9iamVjdCB3aXRoIGEgdHlwZSBwcm9wZXJ0eVwiKTtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmFwaUJhc2UgKyAnL2FwaS91dGlscy91cmknO1xuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgICAgICBvcHRpb25zLnJlc3BvbnNlVHlwZSA9ICd0ZXh0JzsgIC8vdG8gZW5zdXJlIHBsYWludGV4dCBpcyBleHBlY3RlZFxuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIiwgdXJsOiB1cmwsIGRhdGE6IG9iaiwgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZ2V0dGluZyBVUkkgZm9yIGl0ZW06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZ2V0VXJpKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkcyAtIGxpc3Qgb2YgaWRlbnRpZmllcnMgdG8gZmV0Y2ggb2JqZWN0cyBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGxpc3Qgb2YgbWF0Y2hpbmcgaXRlbXMgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBnZXRNdWx0aXBsZSAoaWRzIDogc3RyaW5nW10sIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggaWRzIClcbiAgICAgICAgLnRoZW4oIGlkZW50aWZpZXJzID0+IHtcblxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLmFwaUJhc2UgKyAnL2FwaS9mZXRjaCc7XG5cbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIGRhdGE6aWRlbnRpZmllcnMsIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcblxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyBpdGVtczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5nZXRNdWx0aXBsZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdXJpcyAtIGxpc3Qgb2YgVVJJcyB0byByZXRyaWV2ZSBvYmplY3RzIGZvclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgbGlzdCBjb250YWluaW5nIHVyaS1pdGVtIGFzc29jaWF0aW9uIHdoZXJlIGV4aXN0c1xuICAgICAqL1xuICAgIGV4aXN0cyh1cmlzIDogc3RyaW5nW10sIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodXJpcylcbiAgICAgICAgLnRoZW4oIHVyaXMgPT4ge1xuICAgICAgICAgICAgbGV0IG1ldGhvZCA9ICdQT1NUJywgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvdXRpbHMvZXhpc3RzJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIGRhdGE6dXJpcywgb3B0aW9uczpvcHRpb25zfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciByZXNvbHZpbmcgaXRlbXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZXhpc3RzKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGxpa2UoaXRlbSA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpdGVtLmlkKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IG1ldGhvZCA9ICdQVVQnLCB1cmwgPSB0aGlzLmFwaUJhc2UgKyAnL2FwaS9pdGVtcy8nICsgaWQgKyAnL2xpa2VzJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgbGlraW5nIGl0ZW0gJHtpdGVtLmlkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5saWtlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2aWV3KGl0ZW0gOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaXRlbS5pZClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSAnUFVUJywgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvaXRlbXMvJyArIGlkICsgJy92aWV3cyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHttZXRob2Q6bWV0aG9kLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGluY3JlbWVudGluZyB2aWV3cyBmb3IgaXRlbSAke2l0ZW0uaWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmxpa2UoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBpdGVtIHRvIGZldGNoIGFzc29jaWF0aW9ucyBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGFycmF5IG9mIGFzc29jaWF0ZWQgaXRlbXMgb2YgdGhlIGl0ZW0gaW4gcXVlc3Rpb25cbiAgICAgKi9cbiAgICBhc3NvY2lhdGlvbnMgKGlkIDogc3RyaW5nLCBwYXJhbXMgOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggaWQgKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy9hc3NvY2lhdGlvbnMnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOnVybCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyB8fCB7fSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIGFzc29jaWF0aW9ucyBmb3IgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5hc3NvY2lhdGlvbnMoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgaXRlbSB0byBmZXRjaCB2ZXJzaW9uIGluZm8gZm9yXG4gICAgICogQHBhcmFtIHBhcmFtcyAtIG9wdGlvbmFsIHNldCBvZiBxdWVyeSBwYXJhbWV0ZXJzIHRvIGNvbnN0cmFpbiBsaXN0IG9mIHZlcnNpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBhcnJheSBvZiBhdmFpbGFibGUgdmVyc2lvbnMgb2YgdGhlIGl0ZW1cbiAgICAgKi9cbiAgICB2ZXJzaW9ucyAoaWQgOiBzdHJpbmcsIHBhcmFtcyA/OiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggaWQgKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy92ZXJzaW9ucyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnVybCwgcGFyYW1zOiBwYXJhbXMsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyB2ZXJzaW9ucyBmb3IgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS52ZXJzaW9ucygpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWV0aG9kIC0gb25lIG9mIFwiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJcbiAgICAgKiBAcGFyYW0gdXJsIC0gZGVzdGluYXRpb24gb2YgeGhyIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gcGFyYW1zIC0gb2JqZWN0IHRvIGJlIHNlbnQgd2l0aCByZXF1ZXN0IGFzIHF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gZGF0YSAtIG9iamVjdCB0byBiZSBzZW50IHdpdGggcmVxdWVzdCBhcyBib2R5XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBvYmplY3QgZGVmaW5pbmcgcmVxdWVzdCBvcHRpb25zXG4gICAgICogQHJldHVybiByZXF1ZXN0IG9wdGlvbnMgZm9yIHhoclxuICAgICAqL1xuICAgIGJ1aWxkUmVxdWVzdCAob3B0aW9ucyA6IHtba2V5OnN0cmluZ106YW55fSkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuXG4gICAgICAgIGlmKHRoaXMuaHR0cE1ldGhvZHMuaW5kZXhPZihvcHRpb25zLm1ldGhvZCk8MClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgSFRUUCBtZXRob2QgJHtvcHRpb25zLm1ldGhvZH1gKTtcblxuICAgICAgICBpZighb3B0aW9ucy51cmwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE11c3Qgc3BlY2lmeSBhIFVSTCBmb3IgSFRUUCByZXF1ZXN0c2ApO1xuXG4gICAgICAgIG9wdGlvbnMudGltZW91dCA9IHRoaXMuX3RpbWVvdXQgfHwgMzAwMDA7XG4gICAgICAgIGxldCBvcHRzID0gdGhpcy5jcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHtba2V5OnN0cmluZ106YW55fSkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuICAgICAgICBsZXQgcmVxdWVzdCA9IHRoaXMuY2xpZW50LmNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmxvZ0RlYnVnKFwiSXRlbVNlcnZpY2UuY3JlYXRlUmVxdWVzdE9wdHMoKSAtIFwiICsgSlNPTi5zdHJpbmdpZnkocmVxdWVzdCkpO1xuICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICB9XG5cbiAgICBleGVjdXRlKG9wdHMgOiB7W2tleTpzdHJpbmddOmFueX0gKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5leGVjdXRlKG9wdHMpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGlmKGUgPT09IG51bGwgfHwgdHlwZW9mKGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGUgPSBuZXcgRXJyb3IoXCJJdGVtU2VydmljZS5leGVjdXRlKCkgLSBSZXF1ZXN0IGZhaWxlZCBidXQgZGlkbid0IHJldHVybiBhbiBcIiArXG4gICAgICAgICAgICAgICAgXCJlcnJvci4gVGhpcyBpcyBtb3N0IGxpa2VseSBiZWNhdXNlIHRoZSByZXF1ZXN0IHRpbWVkIG91dFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEl0ZW1TZXJ2aWNlO1xuIl19