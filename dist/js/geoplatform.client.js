(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('q')) :
    typeof define === 'function' && define.amd ? define(['exports', 'q'], factory) :
    (factory((global.GeoPlatformClient = {}),global.Q));
}(this, (function (exports,Q) { 'use strict';

    Q = Q && Q.hasOwnProperty('default') ? Q['default'] : Q;

    class JQueryHttpClient {

        /**
         * @param {integer} options.timeout
         * @param {string} options.token - the bearer token or a function to retrieve it
         */
        constructor(options) {
            options = options || {};
            this.setTimeout(options.timeout||10000);
            this.setAuthToken(options.token);
        }

        setTimeout(timeout) {
            this.timeout = timeout;
        }

        /**
         * @param {string|Function} arg - specify the bearer token or a function to retrieve it
         */
        setAuthToken(arg) {
            if(arg && typeof(arg) === 'string')
                this.token = function() { return arg; };
            else if(arg && typeof(arg) === 'function')
                this.token = arg;
            //else do nothing
        }

        createRequestOpts(options) {

            let opts = {
                method: options.method,
                url: options.url,
                timeout: options.timeout || this.timeout
            };

            if(options.json === true)
                opts.dataType = 'json';

            if(options.params) {
                opts.data = options.params;
                opts.processData = true;
            }

            if(options.data) {
                opts.data = options.data;
                opts.processData = options.processData || false;
                opts.contentType = 'application/json';
            }

            //set authorization header if one was provided
            if(this.token) {
                let token = this.token();
                if(token) {
                    opts.headers = opts.headers || {};
                    opts.headers.Authorization = 'Bearer ' + token;
                }
            }

            //copy over user-supplied options
            if(options.options) {
                for(let o in options.options) {
                    if(options.options.hasOwnProperty(o)) {
                        opts[o] = options.options[o];
                    }
                }
            }

            return opts;
        }


        execute(opts) {

            if(typeof(jQuery) === 'undefined') {
                throw new Error("jQuery is not available. Ensure it is included in your application");
            }
            let d = Q.defer();
            opts.success = function(data) { d.resolve(data); };
            opts.error = function(xhr, status, message) { d.reject(new Error(message)); };
            jQuery.ajax(opts);
            return d.promise;
        }

    }

    class NGHttpClient {

        /**
         * @param {integer} options.timeout
         * @param {string} options.token - the bearer token or a function to retrieve it
         * @param {Object} options.$http - angular $http service instance
         */
        constructor(options) {
            if(typeof(angular) === 'undefined')
                throw new Error("Angular not defined");

            options = options || {};
            this.setTimeout(options.timeout||10000);
            this.setAuthToken(options.token);

            if(options.$http)
                this.$http = options.$http;

        }

        setTimeout(timeout) {
            this.timeout = timeout;
        }

        /**
         * @param {string|Function} arg - specify the bearer token or a function to retrieve it
         */
        setAuthToken(arg) {
            if(arg && typeof(arg) === 'string')
                this.token = function() { return arg; };
            else if(arg && typeof(arg) === 'function')
                this.token = arg;
            //else do nothing
        }

        createRequestOpts(options) {

            let opts = {
                method: options.method,
                url: options.url,
                timeout: options.timeout || this.timeout
            };

            if(options.json === true)
                opts.dataType = 'json';

            if(options.params) {
                opts.params = options.params;
            }

            if(options.data) {
                opts.data = options.data;
            }

            //set authorization token if one was provided
            if(this.token) {
                let token = this.token();
                if(token) {
                    opts.headers = opts.headers || {};
                    opts.headers.Authorization = 'Bearer ' + token;
                    opts.useXDomain = true;
                }
            }

            //copy over user-supplied options
            if(options.options) {
                for(let o in options.options) {
                    if(options.options.hasOwnProperty(o)) {
                        opts[o] = options.options[o];
                    }
                }
            }

            return opts;
        }

        execute(opts) {

            if(typeof(angular) === 'undefined')
                throw new Error("Angular is not defined, ensure you have included it as a dependency in your application");

            let $http = this.$http || angular.injector(['ng']).get('$http');
            return Q.resolve( $http )
            .then($http => {
                if(typeof($http) === 'undefined')
                    throw new Error("Angular $http not resolved");

                // console.log(opts);
                return $http(opts);
            })
            .then(response=>response.data)
            .catch(response=>Q.reject(response.data));
        }

    }

    class NodeHttpClient {

        /**
         * @param {integer} options.timeout
         * @param {string} options.token - the bearer token or a function to retrieve it
         */
        constructor(options) {
            options = options || {};
            this.setTimeout(options.timeout||10000);
            this.setAuthToken(options.token);
        }

        setTimeout(timeout) {
            this.timeout = timeout;
        }

        /**
         * @param {string|Function} arg - specify the bearer token or a function to retrieve it
         */
        setAuthToken(arg) {
            if(arg && typeof(arg) === 'string')
                this.token = function() { return arg; };
            else if(arg && typeof(arg) === 'function')
                this.token = arg;
            //else do nothing
        }

        createRequestOpts(options) {

            let opts = {
                method: options.method,
                url: options.url,
                json: false !== options.json,
                timeout: options.timeout || this.timeout
            };

            if(options.params) {
                opts.qs = options.params;
            }

            if(options.file) {
                const fs = require('fs');
                if(!fs) throw new Error("Module 'fs' not available");
                opts.formData = {
                    file: {
                        value:  fs.createReadStream(options.file.path),
                        options: {
                            filename: options.file.originalFilename
                        }
                    }
                };
                Object.assign(opts.formData, options.data||{});

            } else if(options.data) {
                if(options.formData) {
                    opts.formData = options.data;
                } else {
                    opts.body = options.data;
                }
            }

            //set authorization header if one was provided
            if(this.token) {
                let token = this.token();
                if(token) {
                    opts.auth = { 'bearer': token };
                }
            }

            //copy over user-supplied options
            if(options.options) {
                for(let o in options.options) {
                    if(options.options.hasOwnProperty(o)) {
                        opts[o] = options.options[o];
                    }
                }
            }

            // console.log(JSON.stringify(opts));

            return opts;
        }



        /**
         *
         */
        execute(options) {
            let deferred = Q.defer();

            const request = require('request');
            if(!!request) {
                throw new Error("Module 'request' not available");
            }
            // require('request-debug')(request);

            request(options, (error, response, body) => {
                this.checkAndHandleError(error, response)
                .then( () =>  {
                    if(options.json === false)
                        deferred.resolve( response );
                    else
                        deferred.resolve( body );
                })
                .catch( e => deferred.reject(e) );
            });
            return deferred.promise;
        }


        /**
         *
         */
        checkAndHandleError (error, response) {

            let props = {
                message: null,
                error: null,    //error type
                status: 200
            };

            if(error) {
                // Logger.debug("Error generated by request library: " + error.code);

                if(error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {

                    props.status = 500;
                    props.error = "Connection Timeout";
                    props.message = "The response from the service took too long to read";

                    if(error.connect === true) {
                        props.message = "Unable to establish a connection to the service";
                    }

                } else {
                    return Q.reject(error);
                }

            } else if(response.statusCode < 200 || response.statusCode > 204) {

                // Logger.debug('Error returned by remote endpoint (' + response.statusCode + ')');
                // Logger.debug(JSON.stringify(response));

                props.status = response.statusCode;

                if(response.body && typeof(response.body) === 'object') {
                    props = response.body;
                    props.status = props.status || response.statusCode;
                    props.message = props.message || "An error occurred communicating with service";

                    if(response.statusCode === 409) {
                        let sidx = response.body.message.indexOf(" ");
                        let eidx = response.body.message.indexOf(' already exists');
                        if(sidx >= 0 && eidx > sidx) {
                            props.item = response.body.message.substring(sidx+1, eidx);
                        }
                    }

                } else {

                    switch(response.statusCode) {
                        case 404 :
                            props.error = "Not Found";
                            props.message = response.request.uri.pathname + " cannot be found";
                            break;
                        case 401 :
                            props.error = "Unauthenticated";
                            props.message = "You are not authenticated";
                            break;
                        case 403 :
                            props.error = "Unauthorized";
                            props.message = "You are not authorized to access " + response.request.uri.pathname;
                            break;
                        case 409 :
                            props.error = "Conflict";
                            props.message = "Item already exists";

                            // pattern received is: { ..., message: 'Resource <identifier> already exists', ... }
                            try {
                                let json = JSON.parse(response.body);
                                let sidx = json.message.indexOf(" ");
                                let eidx = json.message.indexOf(' already exists');
                                if(sidx >= 0 && eidx > sidx) {
                                    props.item = json.message.substring(sidx+1, eidx);
                                }
                            } catch( e ) {
                                message += '.  Unable to extract existing identifier from service response';
                            }
                            break;

                        default:

                            try {
                                let json = JSON.parse(response.body);
                                props = json;
                                props.status = response.statusCode;
                                // Logger.debug("PARSED ERROR: " + JSON.stringify(props));

                            } catch (e) {
                                props.error = "Server Error";
                                props.message = response.body;
                                // Logger.debug("DEFAULTED ERROR: " + JSON.stringify(props));
                            }
                    }

                }

            }

            if( props.status < 200 || props.status > 204 ) {

                props.error = props.error || "Server Error";
                props.status = props.status || response.statusCode;
                props.message = props.message || "An error occurred communicating with service";

                let err = new Error(props.message);
                Object.assign(err, props);

                // Logger.debug("UTILS.checkAndHandleError : " + err);
                // Logger.debug("UTILS.checkAndHandleError : " + JSON.stringify(err));
                // Logger.debug("UTILS.checkAndHandleError : " + err.message);
                return Q.reject(err);
            }

            return Q.resolve();
        }

    }

    var ItemTypes = {
        DATASET         : "dcat:Dataset",
        SERVICE         : "regp:Service",
        LAYER           : "Layer",
        MAP             : "Map",
        GALLERY         : "Gallery",
        ORGANIZATION    : "org:Organization",
        COMMUNITY       : 'Community',
        CONCEPT         : "skos:Concept",
        CONCEPT_SCHEME  : "skos:ConceptScheme",
        STANDARD        : 'dct:Standard'
    };

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

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */

    class DatasetService extends ItemService {

        constructor(url, httpClient) {
            super(url, httpClient);
        }

        setUrl(baseUrl) {
            super.setUrl(baseUrl);
            this.baseUrl = baseUrl + '/api/datasets';
        }


    }

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */

    class MapService extends ItemService {

        constructor(url, httpClient) {
            super(url, httpClient);
        }

        setUrl(baseUrl) {
            super.setUrl(baseUrl);
            this.baseUrl = baseUrl + '/api/maps';
        }


    }

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */

    class LayerService extends ItemService {

        constructor(url, httpClient) {
            super(url, httpClient);
        }

        setUrl(baseUrl) {
            super.setUrl(baseUrl);
            this.baseUrl = baseUrl + '/api/layers';
        }

        /**
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving style JSON object
         */
        style (options) {
            return Q.resolve( true )
            .then( () => {

                let url = this.baseUrl + '/' + id + '/style';
                let opts = this.buildRequest({
                    method:"GET", url:url, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error(`LayerService.style() - Error fetching style: ${e.message}`);
                return Q.reject(err);
            });
        }

        /**
         * @param {string} id - GeoPlatform Layer identifier
         * @param {Object} req identifying extent, x, y
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving feature JSON object
         */
        describe( id, req, options ) {

            return Q.resolve( req )
            .then( (req) => {

                if(!req) {
                    throw new Error("Must provide describe parameters to use");
                }

                let keys = ['bbox', 'height', 'width', 'x', 'y'];
                let missing = keys.find(key => !req[key]);
                if(missing) {
                    throw new Error(`Must specify ${missing} in describe req`);
                }

                let params = {
                    srs         : 'EPSG:4326',
                    bbox        : req.bbox,
                    height      : req.height,
                    width       : req.width,
                    info_format : 'text/xml',
                    x           : req.x,
                    y           : req.y,
                    i           : req.x, //WMS 1.3.0
                    j           : req.y  //WMS 1.3.0
                };

                let url = this.baseUrl + '/' + id + '/describe';
                let opts = this.buildRequest({
                    method:"GET", url:url, params:params, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error(`LayerService.describe() -
                Error describing layer feature: ${e.message}`);
                return Q.reject(err);
            });
        }

        /**
         * @param {string} id - GeoPlatform Layer identifier
         * @param {Object} params describing layer request to validate
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving empty if successful or a message if failed
         */
        validate(id, params, options) {

            return Q.resolve( params )
            .then( params => {

                if(!params) {
                    throw new Error("Must provide parameters to use in layer validation");
                }

                let url = this.baseUrl + '/' + id + '/validate';
                let opts = this.buildRequest({
                    method:"GET", url:url, params:params, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error(`LayerService.describe() -
                Error describing layer feature: ${e.message}`);
                return Q.reject(err);
            });
        }

    }

    /**
     * GeoPlatform Service service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate service objects.
     *
     * @see ItemService
     */

    class ServiceService extends ItemService {

        constructor(url, httpClient) {
            super(url, httpClient);
        }

        setUrl(baseUrl) {
            super.setUrl(baseUrl);
            this.baseUrl = baseUrl + '/api/services';
        }


        /**
         * Fetch metadata from the specified GeoPlatform Service's
         * web-accessible implementation using either GetCapabilities
         * or ESRI documentInfo.
         * @param {Object} service - GeoPlatform Service object
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving service metadata
         */
        about( service, options ) {

            return Q.resolve( service )
            .then( svc => {
                if(!svc)
                    throw new Error("Must provide service to get metadata about");
                let opts = this.buildRequest({
                    method:'POST', url:this.baseUrl + '/about', data:svc, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error(`ServiceService.about() -
                Error describing service: ${e.message}`);
                return Q.reject(err);
            });
        }



        /**
         * @param {Object} options - optional set of request options to apply to request
         * @return {Promise} resolving service types
         */
        types (options) {

            let query = new Query()
            .types(ItemTypes.STANDARD)
            .resourceTypes('ServiceType')
            .pageSize(50)
            .getQuery();

            return Q.resolve( query )
            .then( (params) => {
                let url = this.apiBase + '/api/items';
                let opts = this.buildRequest({
                    method:'GET', url:url, params:params, options:options
                });
                return this.execute(opts);
            })
            .then(response => response.results)
            .catch(e => {
                let err = new Error(`ServiceService.types() -
                Error fetching service types: ${e.message}`);
                return Q.reject(err);
            });
        }


        /**
         * @param {Object} service - GP Service definition
         * @param {Object} options - optional set of request options to apply to request
         * @return {Promise} resolving imported service
         */
        import (service, options) {

            return Q.resolve( service )
            .then( svc => {
                let url = this.baseUrl + '/import';
                let opts = this.buildRequest({
                    method:'POST', url:url, data:svc, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error(`ServiceService.import() -
                Error importing service: ${e.message}`);
                return Q.reject(err);
            });
        }


        /**
         * @param {string} id - identifier of GP service to harvest layers for
         * @param {Object} options - optional set of request options to apply to request
         * @return {Promise} resolving service layers
         */
        harvest (id, options) {

            return Q.resolve( id )
            .then( id => {
                let url = this.baseUrl + '/' + id + '/harvest';
                let opts = this.buildRequest({
                    method:'GET', url:url, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error(`ServiceService.harvest() -
                Error harvesting layers from service: ${e.message}`);
                return Q.reject(err);
            });

        }

        /**
         * @param {string} id - identifier of GP service to live test
         * @param {Object} options - optional set of request options to apply to request
         * @return {Promise} resolving service statistics
         */
        liveTest (id, options) {

            return Q.resolve( id )
            .then( id => {
                let url = this.baseUrl + '/' + id + '/test';
                let opts = this.buildRequest({
                    method:'GET', url:url, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error(`ServiceService.liveTest() -
                Error testing service: ${e.message}`);
                return Q.reject(err);
            });
        }

        /**
         * @param {string} id - identifier of GP service to fetch statistics about
         * @param {Object} options - optional set of request options to apply to request
         * @return {Promise} resolving service statistics
         */
        statistics (id, options) {
            return Q.resolve( id )
            .then( id => {
                let url = this.baseUrl + '/' + id + '/statistics';
                let opts = this.buildRequest({
                    method:'GET', url:url, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error(`ServiceService.statistics() -
                Error getting service statistics: ${e.message}`);
                return Q.reject(err);
            });
        }

    }

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */

    class GalleryService extends ItemService {

        constructor(url, httpClient) {
            super(url, httpClient);
        }

        setUrl(baseUrl) {
            super.setUrl(baseUrl);
            this.baseUrl = baseUrl + '/api/galleries';
        }

        addItem (galleryId, itemObj, options) {
            return Q.resolve( true )
            .then( () => {
                let url = this.baseUrl + '/' + galleryId + '/items';
                let opts = this.buildRequest({
                    method:'POST', url:url, data: itemObj, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error("GalleryService.addItem() - Error adding item: " + e.message);
                return Q.reject(err);
            });
        }

        removeItem( galleryId, itemId, options) {
            return Q.resolve( this.baseUrl + '/' + galleryId + '/items/' + itemId )
            .then( url => {
                let opts = this.buildRequest({
                    method:'DELETE', url:url, options:options
                });
                return this.execute(opts);
            })
            .then(response=>true)
            .catch(e => {
                let err = new Error("GalleryService.addItem() - Error adding item: " + e.message);
                return Q.reject(err);
            });
        }

    }

    class UtilsService {

        constructor(url, httpClient) {
            this.setUrl(url);
            this.client = httpClient;
            this.timeout = 10000;
            this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        }

        setUrl(baseUrl) {
            this.baseUrl = baseUrl;
        }


        /**
         * @param {string} property - optional capa property to specifically request
         * @param {Object} query - optional query parameters to include with request
         * @param {Object} options - optional config to send with http request
         * @return {Promise} resolving capabilities object
         */
        capabilities (property, query, options) {

            let url = this.baseUrl + '/api/capabilities';
            if(property)
                url += '/' + property;

            return Q.resolve( url )
            .then( (url) => {
                let opts = this.buildRequest({
                    method:"GET", url:url, params:query||{}, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error(`UtilsService.capabilities() - Error getting capabilities: ${e.message}`);
                return Q.reject(err);
            });
        }

        /**
         * @param {File} file
         * @param {string} format
         * @param {Object} options
         * @return {Promise}
         */
        parseFile (file, format, options) {

            var url = this.baseUrl + '/api/utils/parse';

            return Q.resolve( url )
            .then( url => {

                let opts = this.buildRequest({
                    method:"POST",  url:url,
                    data: { format: format },
                    file: file,
                    formData: true,   //NodeJS (RequestJS)
                    options: options
                });
                return this.execute(opts);
            })
            .then( response => response )
            .catch(e => {
                let err = new Error(`UtilsService.parseFile() - Error parsing file: ${e.message}`);
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

            return this.createRequestOpts(options);
        }

        createRequestOpts(options) {
            return this.client.createRequestOpts(options);
        }

        execute(opts) {
            return this.client.execute(opts);
        }

    }

    var QueryParameters = {
        TYPES            : 'type',
        QUERY            : 'q',
        KEYWORDS         : 'keyword',
        URI              : 'uri',
        CREATED_BY       : 'createdBy',
        CONTRIBUTED_BY   : 'contributedBy',
        CREATOR          : 'creator.id',
        SVC_TYPES        : 'serviceType.id',
        THEMES_ID        : 'theme.id',
        THEMES_LABEL     : 'theme.label',
        THEMES_URI       : 'theme.uri',
        PUBLISHERS       : 'publisher.id',
        PUBLISHERS_LABEL : 'publisher.label',
        PUBLISHERS_URI   : 'publisher.uri',
        USED_BY_ID       : 'usedBy.id',
        USED_BY_LABEL    : 'usedBy.label',
        USED_BY_URI      : 'usedBy.uri',
        SCHEMES_ID       : 'scheme.id',
        SCHEMES_LABEL    : 'scheme.label',
        SCHEMES_URI      : 'scheme.uri',
        VISIBILITY       : 'visibility',
        EXTENT           : 'extent',
        MODIFIED_BEFORE  : 'modified.max',
        MODIFIED_AFTER   : 'modified.min',
        BEGINS           : 'startDate.min',
        ENDS             : 'endDate.max',
        RESOURCE_TYPE    : 'resourceType',

        //recommender service-specific
        FOR_TYPES        : 'for'
    };

    const SORT_OPTIONS_DEFAULT = [
        { value:"label,asc",       label: "Name (A-Z)"              },
        { value:"label,desc",      label: "Name (Z-A)"              },
        { value:"type,asc",        label: "Type (A-Z)"              },
        { value:"type,desc",       label: "Type (Z-A)"              },
        { value:"modified,desc",   label: "Most recently modified"  },
        { value:"modified,asc",    label: "Least recently modified" },
        { value:"_score,desc",     label: "Relevance"               }
    ];


    class KGQuery {

        constructor() {

            this.defaultQuery = {
                page: 0,
                size: 10,
                sort: "modified,desc"
            };

            this.query = {
                page: 0,
                size: 10,
                sort: "modified,desc"
            };

        }



        getQuery() {
            let result = {};
            for(let prop in this.query) {
                let value = this.query[prop];
                if(value !== null && typeof(value.push) !== 'undefined') {
                    value = value.join(',');
                }
                result[prop] = value;
            }
            return result;
        }


        // -----------------------------------------------------------


        parameter(name, value) {
            this.setParameter(name, value);
            return this;
        }

        setParameter (name, value) {
            if(value === null || value === undefined)
                delete this.query[name];
            else
                this.query[name] = value;
        }

        getParameter (key) {
            return this.getParameter(key);
        }

        applyParameters (obj) { 
            for(var p in obj) {
                if(obj.hasOwnProperty(p)) {
                    this.setParameter(p, obj[p]);
                }
            }
        }


        // -----------------------------------------------------------


        q(text) {
            this.setQ(text);
            return this;
        }

        /**
         * @param {string} text - free text query
         */
        setQ (text) {
            this.setParameter(QueryParameters.QUERY, text);
        }

        getQ() {
            return this.getParameter(QueryParameters.QUERY);
        }


        // -----------------------------------------------------------


        /**
         * @param {array[string]} types - KG classifiers for which concepts should be returned
         */
        classifiers(types) {
            this.setClassifiers(types);
            return this;
        }

        /**
         * @param {array[string]} types - KG classifiers for which concepts should be returned
         */
        setClassifiers (types) {
            if(types && types.push === 'undefined')
                types = [types];
            this.setParameter(QueryParameters.TYPES, types);
        }

        /**
         * @return {array[string]} KG classifiers for which concepts should be returned
         */
        getClassifiers () {
            return this.getParameter(QueryParameters.TYPES);
        }


        // -----------------------------------------------------------


        /**
         * Specify the Item object model type name(s) for which
         * recommended concepts should be returned. Note: this
         * query parameter is not the same as the GeoPlatform.Query.types()
         * query parameter (they map to different HTTP request parameters).
         * @param {array[string]} objTypes - Item object type names
         */
        types(objTypes) {
            this.setTypes(objTypes);
            return this;
        }

        /**
         * Specify the Item object model type name(s) for which
         * recommended concepts should be returned. Note: this
         * query parameter is not the same as the GeoPlatform.Query.setTypes()
         * query parameter (they map to different HTTP request parameters).
         * @param {array[string]} objTypes - Item object type names
         */
        setTypes (objTypes) {
            if(objTypes && objTypes.push === 'undefined')
                objTypes = [objTypes];
            this.setParameter(QueryParameters.FOR_TYPES, objTypes);
        }

        /**
         * Get the Item object model type name(s) for which
         * recommended concepts should be returned. Note: this
         * query parameter is not the same as the GeoPlatform.Query.getTypes()
         * query parameter (they map to different HTTP request parameters).
         * @return {array[string]} Item object type names
         */
        getTypes () {
            return this.getParameter(QueryParameters.FOR_TYPES);
        }


        // -----------------------------------------------------------


        /**
         * @param {int} page - page of results to fetch
         */
        page (page) {
            this.setPage(page);
            return this;
        }

        setPage(page) {
            if(isNaN(page) || page*1<0) return;
            this.query.page = page*1;
        }

        getPage() {
            return this.query.page;
        }

        nextPage() {
            this.setPage(this.query.page+1);
        }

        previousPage() {
            this.setPage(this.query.page-1);
        }


        // -----------------------------------------------------------


        /**
         * @param {int} size - page size to request
         */
        pageSize (size) {
            this.setPageSize(size);
            return this;
        }

        setPageSize (size) {
            if(isNaN(size) || size*1<0) return;
            this.query.size = size*1;
        }

        getPageSize() {
            return this.query.size;
        }


        // -----------------------------------------------------------


        /**
         * @param {string} sort - form of <field>,<dir> or just field name
         * @param {string} order - optional, either 'asc' or 'desc'
         */
        sort (sort, order) {
            this.setSort(sort, order);
            return this;
        }

        /**
         * @param {string} sort - form of <field>,<dir> or just field name
         * @param {string} order - optional, either 'asc' or 'desc'
         */
         setSort(sort, order) {
             order = (order && (order !== 'asc' || order !== 'desc')) ? 'desc' : order;
             if(sort && sort.indexOf(',')<0)
                sort = sort + ',' + order;
             this.query.sort = sort;
        }

        getSort() {
            return this.query.sort;
        }

        getSortField() {
            return this.query.sort.split(',')[0];
        }

        getSortOrder() {
            return this.query.sort.split(',')[1] === 'asc';
        }

        /**
         * @return {array} list of key-value pairs of sort options
         */
        getSortOptions() {
            return SORT_OPTIONS_DEFAULT.slice(0);
        }


        // -----------------------------------------------------------


        /**
         *
         */
        clear () {
            this.query = this.defaultQuery;
        }
    }

    class KGService {

        constructor(url, httpClient) {
            this.setUrl(url);
            this.client = httpClient;
            this.timeout = 10000;
            this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        }

        setUrl(baseUrl) {
            this.apiBase = baseUrl;
            this.baseUrl = baseUrl + '/api/recommender';
        }

        /**
         * @param {Object} query - optional query parameters to include with request
         * @param {Object} options - optional config to send with http request
         * @return {Promise} resolving recommended concepts as search results
         */
        suggest (query, options) {
            let url = this.baseUrl + '/suggest';
            return this._search(url, query, options)
            .catch(e => {
                let err = new Error(`KGService.suggest() - Error suggesting concepts: ${e.message}`);
                return Q.reject(err);
            });
        }


        /**
         * @param {Object} query - optional query parameters to include with request
         * @param {Object} options - optional config to send with http request
         * @return {Promise} resolving concept types as search results
         */
        types (query, options) {
            let url = this.baseUrl + '/types';
            return this._search(url, query, options)
            .catch(e => {
                let err = new Error(`KGService.types() - Error searching types: ${e.message}`);
                return Q.reject(err);
            });
        }



        /**
         * @param {Object} query - optional query parameters to include with request
         * @param {Object} options - optional config to send with http request
         * @return {Promise} resolving concept sources as search results
         */
        sources (query, options) {
            let url = this.baseUrl + '/sources';
            return this._search(url, query, options)
            .catch(e => {
                let err = new Error(`KGService.sources() - Error searching sources: ${e.message}`);
                return Q.reject(err);
            });
        }





        /* ----------------------------------------------------------- */


        /**
         * internal method used by exposed methods
         */
        _search (url, query, options) {
            return Q.resolve( true )
            .then( () => {

                if(query && typeof(query.getQuery) !== 'undefined') {
                    //if passed a GeoPlatform.Query object,
                    // convert to parameters object
                    query = query.getQuery();
                }

                let opts = this.buildRequest({
                    method:"GET", url:url, params:query, options:options
                });
                return this.execute(opts);
            });
        }



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

            return this.createRequestOpts(options);
        }

        createRequestOpts(options) {
            return this.client.createRequestOpts(options);
        }

        execute(opts) {
            return this.client.execute(opts);
        }

    }

    var classifiers = {
        PURPOSE             : 'purposes',
        FUNCTION            : 'functions',
        TOPIC_PRIMARY       : 'primaryTopics',
        TOPIC_SECONDARY     : 'secondaryTopics',
        SUBJECT_PRIMARY     : 'primarySubjects',
        SUBJECT_SECONDARY   : 'secondarySubjects',
        COMMUNITY           : 'communities',
        AUDIENCE            : 'audiences',
        PLACE               : 'places',
        CATEGORY            : 'categories'
    };

    var QueryFacets = {
        TYPES           : 'types',
        THEMES          : 'themes',
        PUBLISHERS      : 'publishers',
        SERVICE_TYPES   : 'serviceTypes',
        CONCEPT_SCHEMES : 'schemes',
        VISIBILITY      : 'visibility',
        CREATED_BY      : 'createdBy',
        USED_BY         : 'usedBy.id'
    };

    const FIELDS_DEFAULT = [
        'created','modified','createdBy','publishers','themes','description'
    ];

    const FACETS_DEFAULT = [
        QueryFacets.TYPES,
        QueryFacets.PUBLISHERS,
        QueryFacets.SERVICE_TYPES,
        QueryFacets.CONCEPT_SCHEMES,
        QueryFacets.VISIBILITY,
        QueryFacets.CREATED_BY
    ];

    const SORT_OPTIONS_DEFAULT$1 = [
        { value:"label,asc",       label: "Name (A-Z)"              },
        { value:"label,desc",      label: "Name (Z-A)"              },
        { value:"type,asc",        label: "Type (A-Z)"              },
        { value:"type,desc",       label: "Type (Z-A)"              },
        { value:"modified,desc",   label: "Most recently modified"  },
        { value:"modified,asc",    label: "Least recently modified" },
        { value:"_score,desc",     label: "Relevance"               }
    ];


    class Query$1 {

        constructor() {

            this.defaultQuery = {
                page: 0,
                size: 10,
                total: 0,
                sort: "modified,desc",
                fields: FIELDS_DEFAULT.slice(0),
                includeFacets: FACETS_DEFAULT.slice(0)
            };

            this.query = {
                page: 0,
                size: 10,
                total: 0,
                sort: "modified,desc",
                fields: FIELDS_DEFAULT.slice(0),
                includeFacets: FACETS_DEFAULT.slice(0)
            };

        }



        getQuery() {
            let result = {};
            for(let prop in this.query) {
                let value = this.query[prop];
                if(value !== null && typeof(value.push) !== 'undefined') {
                    value = value.join(',');
                }
                result[prop] = value;
            }
            return result;
        }


        // -----------------------------------------------------------


        parameter(name, value) {
            this.setParameter(name, value);
            return this;
        }

        setParameter (name, value) {
            if(value === null || value === undefined)
                delete this.query[name];
            else
                this.query[name] = value;
        }

        getParameter (key) {
            return this.getParameter(key);
        }

        applyParameters (obj) { 
            for(var p in obj) {
                if(obj.hasOwnProperty(p)) {
                    this.setParameter(p, obj[p]);
                }
            }
        }


        // -----------------------------------------------------------


        q(text) {
            this.setQ(text);
            return this;
        }

        /**
         * @param {string} text - free text query
         */
        setQ (text) {
            this.setParameter(QueryParameters.QUERY, text);
        }

        getQ() {
            return this.getParameter(QueryParameters.QUERY);
        }


        // -----------------------------------------------------------


        keywords(text) {
            this.setQ(text);
            return this;
        }

        /**
         * @param {string} text - free text query
         */
        setKeywords (text) {
            if(text && typeof(text.push) !== 'undefined')
                text = text.join(',');
            this.setParameter(QueryParameters.KEYWORDS, text);
        }

        getKeywords() {
            return this.getParameter(QueryParameters.KEYWORDS);
        }


        // -----------------------------------------------------------


        uri (uri) {
            this.setUri(uri);
            return this;
        }

        setUri(uri) {
            this.setParameter(QueryParameters.URI, uri);
        }

        getUri() {
            return this.getParameter(QueryParameters.URI);
        }


        // -----------------------------------------------------------


        types(types) {
            this.setTypes(types);
            return this;
        }

        /**
         * @param {array[string]} types - name of class(es) to request
         */
        setTypes (types) {
            if(types && types.push === 'undefined')
                types = [types];
            this.setParameter(QueryParameters.TYPES, types);
        }

        getTypes () {
            return this.getParameter(QueryParameters.TYPES);
        }


        // -----------------------------------------------------------


        createdBy(user) {
            this.setCreatedBy(user);
            return this;
        }

        /**
         * @param {string} user - username
         * @param {boolean} fireUpdate -
         */
        setCreatedBy (user) {
            this.setParameter(QueryParameters.CREATED_BY, user);
        }

        getCreatedBy () {
            return this.getParameter(QueryParameters.CREATED_BY);
        }


        // -----------------------------------------------------------


        /**
         * Specify a Theme or set of Themes to constrain results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either QueryParameters.THEMES_LABEL or QueryParameters.THEMES_URI
         * respectively.
         * @param {array[string]} themes - string or array of strings containing theme constraint
         * @param {string} parameter - optional, to indicate the parameter to use
         * @return {Query}
         */
        themes(themes, parameter) {
            this.setThemes(themes, parameter);
            return this;
        }


        /**
         * Specify a Theme or set of Themes to constrain results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either QueryParameters.THEMES_LABEL or QueryParameters.THEMES_URI
         * respectively.
         * @param {array[string]} themes - theme or themes to constrain by
         */
        setThemes (themes, parameter) {
            if(themes && themes.push === 'undefined')
                themes = [themes];

            //clear existing
            this.setParameter(QueryParameters.THEMES_ID, null);
            this.setParameter(QueryParameters.THEMES_LABEL, null);
            this.setParameter(QueryParameters.THEMES_URI, null);

            let param = parameter || QueryParameters.THEMES_ID;
            this.setParameter(param, themes);
        }

        getThemes () {
            return this.getParameter(QueryParameters.THEMES_ID) ||
                this.getParameter(QueryParameters.THEMES_LABEL) ||
                this.getParameter(QueryParameters.THEMES_URI);
        }


        // -----------------------------------------------------------


        /**
         * Specify a Publisher or set of Publishers to constrain results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either QueryParameters.PUBLISHERS_LABEL or QueryParameters.PUBLISHERS_URI
         * respectively.
         * @param {string} parameter - optional, to indicate the parameter to use
         * @return {Query}
         */
        publishers(publishers, parameter) {
            this.setPublishers(publishers, parameter);
            return this;
        }

        /**
         * Specify a Publisher or set of Publishers to constrain results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either QueryParameters.PUBLISHERS_LABEL or QueryParameters.PUBLISHERS_URI
         * respectively.
         * @param {array[string]} publishers - publishing orgs to constrain by
         */
        setPublishers (publishers, parameter) {
            if(publishers && publishers.push === 'undefined')
                publishers = [publishers];

            //clear existing
            this.setParameter(QueryParameters.PUBLISHERS_ID, null);
            this.setParameter(QueryParameters.PUBLISHERS_LABEL, null);
            this.setParameter(QueryParameters.PUBLISHERS_URI, null);

            let param = parameter || QueryParameters.PUBLISHERS_ID;
            this.setParameter(param, publishers);
        }

        getPublishers () {
            return this.getParameter(QueryParameters.PUBLISHERS_ID) ||
                this.getParameter(QueryParameters.PUBLISHERS_LABEL) ||
                this.getParameter(QueryParameters.PUBLISHERS_URI);
        }


        // -----------------------------------------------------------


        /**
         * Specify the identifier of an Agent (Community, Group, etc) that
         * uses items you wish to find in search results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either QueryParameters.USED_BY_LABEL or QueryParameters.USED_BY_URI
         * respectively.
         * @param {string} parameter - optional, to indicate the parameter to use
         * @return {Query}
         */
        usedBy(ids, parameter) {
            this.setUsedBy(ids, parameter);
            return this;
        }

        /**
         * Specify the identifier of an Agent (Community, Group, etc) that
         * uses items you wish to find in search results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either QueryParameters.USED_BY_LABEL or QueryParameters.USED_BY_URI
         * respectively.
         * @param {array[string]} ids - publishing orgs to constrain by
         */
        setUsedBy (ids, parameter) {
            if(ids && ids.push === 'undefined')
                ids = [ids];

            //clear existing
            this.setParameter(QueryParameters.USED_BY_ID, null);
            this.setParameter(QueryParameters.USED_BY_LABEL, null);
            this.setParameter(QueryParameters.USED_BY_URI, null);

            let param = parameter || QueryParameters.USED_BY_ID;
            this.setParameter(param, ids);
        }

        getUsedBy () {
            return this.getParameter(QueryParameters.USED_BY_ID) ||
                this.getParameter(QueryParameters.USED_BY_LABEL) ||
                this.getParameter(QueryParameters.USED_BY_URI);
        }


        // -----------------------------------------------------------


        /**
         * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either QueryParameters.SCHEMES_LABEL or QueryParameters.SCHEMES_URI
         * respectively.
         * @param {array[string]} schemes - schemes to constrain by
         * @param {string} parameter - optional, to indicate the parameter to use
         * @return {Query}
         */
        schemes(schemes, parameter) {
            this.setSchemes(schemes, parameter);
            return this;
        }

        /**
         * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either QueryParameters.SCHEMES_LABEL or QueryParameters.SCHEMES_URI
         * respectively.
         * @param {array[string]} schemes - schemes to constrain by
         * @param {string} parameter - optional, to indicate the parameter to use
         */
        setSchemes (schemes, parameter) {
            if(schemes && schemes.push === 'undefined')
                schemes = [schemes];

            //clear existing
            this.setParameter(QueryParameters.SCHEMES_ID, null);
            this.setParameter(QueryParameters.SCHEMES_LABEL, null);
            this.setParameter(QueryParameters.SCHEMES_URI, null);

            let param = parameter || QueryParameters.SCHEMES_ID;
            this.setParameter(param, schemes);
        }

        getSchemes() {
            return this.getParameter(QueryParameters.SCHEMES) ||
                this.getParameter(QueryParameters.SCHEMES_LABEL) ||
                this.getParameter(QueryParameters.SCHEMES_URI);
        }


        // -----------------------------------------------------------

        /**
         *
         */
        serviceTypes(types) {
            this.setServiceTypes(types);
            return this;
        }

        /**
         * @param {array[string]} types - ids
         */
        setServiceTypes (types) {
            if(types && types.push === 'undefined')
                types = [types];
            this.setParameter(QueryParameters.SERVICE_TYPES, types);
        }

        getServiceTypes () {
            return this.getParameter(QueryParameters.SERVICE_TYPES);
        }


        // -----------------------------------------------------------


        visibility(vis) {
            this.setVisibility(vis);
            return this;
        }

        /**
         * @param {string} visibility - one of 'public' or 'private'
         * @param {boolean} fireUpdate
         */
        setVisibility (visibility) {
            this.setParameter(QueryParameters.VISIBILITY, visibility);
        }

        getVisibility () {
            this.getParameter(QueryParameters.VISIBILITY);
        }


        // -----------------------------------------------------------


        modified(date, beforeOrAfter) {
            this.setModified(date, beforeOrAfter);
            return this;
        }

        /**
         * @param {Date} date - date to compare against
         * @param {boolean} beforeOrAfter - flag specifying which boundary condition (true = before, false = after)
         * @param {boolean} fireUpdate - flag specifying whether to trigger update automatically
         */
        setModified (date, beforeOrAfter) {

            //if no date was supplied, consider it "unset" for both properties
            if(!date) {
                this.setParameter(QueryParameters.MODIFIED_BEFORE, null);
                this.setParameter(QueryParameters.MODIFIED_AFTER, null);
                return;
            }

            let dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
            let prop = dir ? QueryParameters.MODIFIED_BEFORE : QueryParameters.MODIFIED_AFTER;       //property being set
            let oppProp = dir ? QueryParameters.MODIFIED_AFTER : QueryParameters.MODIFIED_BEFORE;    //unset opposite property
            let arg = (date && date.getTime) ? date.getTime() : date;

            this.setParameter(oppProp, null);
            this.setParameter(prop, arg);
        }

        getModified () {
            return  this.getParameter(QueryParameters.MODIFIED_BEFORE) ||
                    this.getParameter(QueryParameters.MODIFIED_AFTER);
        }


        // -----------------------------------------------------------


        extent(bbox) {
            this.setExtent(bbox);
            return this;
        }

        /**
         * @param {string} bboxStr - form of "minx,miny,maxx,maxy"
         */
        setExtent (bbox) {
            if(bbox && typeof(bbox.toBboxString) !== 'undefined')
                bbox = bbox.toBboxString();
            this.setParameter(QueryParameters.EXTENT, bbox);
        }

        /**
         * @return {string} bbox string or null if not set
         */
        getExtent () {
            return this.getParameter(QueryParameters.EXTENT);
        }


        // -----------------------------------------------------------


        begins(date) {
            this.setBeginDate(date);
            return this;
        }

        setBeginDate (date) {
            if(date && date instanceof Date)
                date = date.getTime();
            this.setParameter(QueryParameters.BEGINS, date);
        }

        getBeginDate () {
            let date = this.getParameter(this.parameter.BEGINS);
            if(date) date = new Date(date);
            return date;
        }


        // -----------------------------------------------------------


        ends(date) {
            this.setEndDate(date);
            return this;
        }

        setEndDate (date) {
            if(date && date instanceof Date)
                date = date.getTime();
            this.setParameter(QueryParameters.ENDS, date);
        }

        getEndDate () {
            let date = this.getParameter(this.parameter.ENDS);
            if(date) date = new Date(date);
            return date;
        }


        // -----------------------------------------------------------


        between(begin, end) {
            this.setBetween(begin, end);
            return this;
        }

        setBetween(begin, end) {
            this.begins(begin);
            this.ends(end);
        }


        // -----------------------------------------------------------


        resourceTypes(types) {
            this.setResourceTypes(types);
            return this;
        }

        setResourceTypes(types) {
            if(types && types.push === 'undefined')
                types = [types];
            this.setParameter(QueryParameters.RESOURCE_TYPE, types);
        }

        getResourceTypes() {
            return this.getParameter(QueryParameters.RESOURCE_TYPE);
        }


        // -----------------------------------------------------------


        facets(names) {
            this.setFacets(names);
            return this;
        }

        /*
         * @param {array[string]} names - names of facets
         */
        setFacets (names) {
            this.query.includeFacets = names;
        }

        getFacets() {
            return this.query.includeFacets;
        }

        /**
         * @param {string} name - name of facet to add
         */
        addFacet(name) {
            let facets = (this.getFacets()||[]).push(name);
            this.setFacets(facets);
        }

        /**
         * @param {string} name - name of facet to remove
         */
        removeFacet(name) {
            let facets = this.getFacets() || [];
            let idx = facets.indexOf(name);
            if(idx>=0) {
                facets.splice(idx, 1);
                this.setFacets(facets);
            }
        }


        // -----------------------------------------------------------


        fields(fields) {
            this.setFields(fields);
            return this;
        }

        /**
         * @param {array[string]} fields - list of field names to request for each search result
         */
        setFields (fields) {
            if(fields && typeof(fields.push) === 'undefined')
                fields = [fields];
            this.query.fields = fields;
        }

        getFields() {
            return this.query.fields;
        }


        // -----------------------------------------------------------


        /**
         * @param {int} page - page of results to fetch
         */
        page (page) {
            this.setPage(page);
            return this;
        }

        setPage(page) {
            if(isNaN(page) || page*1<0) return;
            this.query.page = page*1;
        }

        getPage() {
            return this.query.page;
        }

        nextPage() {
            this.setPage(this.query.page+1);
        }

        previousPage() {
            this.setPage(this.query.page-1);
        }


        // -----------------------------------------------------------


        /**
         * @param {int} size - page size to request
         */
        pageSize (size) {
            this.setPageSize(size);
            return this;
        }

        setPageSize (size) {
            if(isNaN(size) || size*1<0) return;
            this.query.size = size*1;
        }

        getPageSize() {
            return this.query.size;
        }


        // -----------------------------------------------------------


        /**
         * @param {string} sort - form of <field>,<dir> or just field name
         * @param {string} order - optional, either 'asc' or 'desc'
         */
        sort (sort, order) {
            this.setSort(sort, order);
            return this;
        }

        /**
         * @param {string} sort - form of <field>,<dir> or just field name
         * @param {string} order - optional, either 'asc' or 'desc'
         */
         setSort(sort, order) {
             order = (order && (order !== 'asc' || order !== 'desc')) ? 'desc' : order;
             if(sort && sort.indexOf(',')<0)
                sort = sort + ',' + order;
             this.query.sort = sort;
        }

        getSort() {
            return this.query.sort;
        }

        getSortField() {
            return this.query.sort.split(',')[0];
        }

        getSortOrder() {
            return this.query.sort.split(',')[1] === 'asc';
        }

        /**
         * @return {array} list of key-value pairs of sort options
         */
        getSortOptions() {
            return SORT_OPTIONS_DEFAULT$1.slice(0);
        }


        // -----------------------------------------------------------


        /**
         *
         */
        clear () {
            this.query = this.defaultQuery;
        }
    }

    function queryFactory() {
        return new Query$1();
    }

    /**
     * @param {any} arg - string type or object with type property
     * @param {string} baseUrl - base endpoint of GeoPlatform API
     * @return {ItemService}
     */
    const ServiceFactory = function(arg, baseUrl, httpClient) {
        let type = (typeof(arg) === 'string') ?
            arg : (arg && arg.type ? arg.type : null);
        if(!type) throw new Error("Must provide a type or object with a type specified");
        if(!baseUrl) throw new Error("Must provide a base url");
        if(!httpClient) throw new Error("Must provide an http client to use to make requests");
        switch(type) {
            case ItemTypes.LAYER:   return new LayerService(  baseUrl, httpClient);
            case ItemTypes.SERVICE: return new ServiceService(baseUrl, httpClient);
            case ItemTypes.MAP:     return new MapService(    baseUrl, httpClient);
            case ItemTypes.GALLERY: return new GalleryService(baseUrl, httpClient);
            case ItemTypes.DATASET: return new DatasetService(baseUrl, httpClient);
            default:                return new ItemService(   baseUrl, httpClient);
        }
    };

    var config = {

        //ualUrl: '...',
        //appId: '...',

        configure: function(options) {
            Object.assign(this, options);
        }
    };

    exports.ItemTypes = ItemTypes;
    exports.QueryParameters = QueryParameters;
    exports.QueryFacets = QueryFacets;
    exports.Query = Query$1;
    exports.QueryFactory = queryFactory;
    exports.KGQuery = KGQuery;
    exports.KGClassifiers = classifiers;
    exports.JQueryHttpClient = JQueryHttpClient;
    exports.NGHttpClient = NGHttpClient;
    exports.NodeHttpClient = NodeHttpClient;
    exports.ItemService = ItemService;
    exports.LayerService = LayerService;
    exports.ServiceService = ServiceService;
    exports.GalleryService = GalleryService;
    exports.DatasetService = DatasetService;
    exports.MapService = MapService;
    exports.UtilsService = UtilsService;
    exports.KGService = KGService;
    exports.ServiceFactory = ServiceFactory;
    exports.Config = config;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=geoplatform.client.js.map
