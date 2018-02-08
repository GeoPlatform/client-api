
const Q = require('q');
const fs = require('fs');
const request = require('request');
// require('request-debug')(request);

const ItemService = require('../item');

const METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];


class NodeItemService extends ItemService {

    constructor(url) {
        super(url);
    }

    // setUrl(baseUrl) {
    //     this.apiBase = baseUrl;
    //     this.baseUrl = baseUrl + '/api/items';
    // }
    //
    // /**
    //  * @param {string} id - identifier of item to fetch
    //  * @param {Object} options - optional set of request options to apply to xhr request
    //  * @return {Promise} resolving Item object or an error
    //  */
    // get (id, options) {
    //
    //     return Q.resolve( true )
    //     .then( () => {
    //         let opts = this.buildRequest("GET", this.baseUrl + '/' + id, null, options);
    //         return this.execute(opts);
    //     })
    //     .then( response => response.body )
    //     .catch(e => {
    //         let err = new Error(`ItemService.save() - Error fetching item: ${e.message}`);
    //         return Q.reject(err);
    //     });
    // }
    //
    // /**
    //  * @param {Object} itemObj - item to create or update
    //  * @param {Object} options - optional set of request options to apply to xhr request
    //  * @return {Promise} resolving Item object or an error
    //  */
    // save (itemObj, options) {
    //
    //     return Q.resolve( true )
    //     .then( () => {
    //
    //         let method = 'POST',
    //             url = this.baseUrl;
    //         if(itemObj.id) {
    //             method = "PUT";
    //             url += '/' + itemObj.id;
    //         }
    //
    //         let opts = this.buildRequest(method, url, itemObj, options);
    //         return this.execute(opts);
    //
    //     })
    //     .then( response => response.body )
    //     .catch(e => {
    //         let err = new Error(`ItemService.save() - Error saving item: ${e.message}`);
    //         return Q.reject(err);
    //     });
    // }
    //
    // /**
    //  * @param {string} id - identifier of item to delete
    //  * @param {Object} options - optional set of request options to apply to xhr request
    //  * @return {Promise} resolving true if successful or an error
    //  */
    // remove (id, options) {
    //
    //     return Q.resolve( true )
    //     .then( () => {
    //         let opts = this.buildRequest("DELETE", this.baseUrl + '/' + id, null, options);
    //         return this.execute(opts);
    //     })
    //     .then( response => response.body )
    //     .catch(e => {
    //         let err = new Error(`ItemService.save() - Error deleting item: ${e.message}`);
    //         return Q.reject(err);
    //     });
    // }
    //
    // /**
    //  * @param {string} id - identifier of item to patch
    //  * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
    //  * @param {Object} options - optional set of request options to apply to xhr request
    //  * @return {Promise} resolving Item object or an error
    //  */
    // patch (id, patch, options) {
    //     return Q.resolve( true )
    //     .then( () => {
    //         let opts = this.buildRequest("PATCH", this.baseUrl + '/' + id, patch, options);
    //         return this.execute(opts);
    //     })
    //     .then( response => response.body )
    //     .catch(e => {
    //         let err = new Error(`ItemService.save() - Error patching item: ${e.message}`);
    //         return Q.reject(err);
    //     });
    // }
    //
    // /**
    //  * @param {Object} arg - either JS object of query parameters or GeoPlatform.Query instance
    //  * @param {Object} options - optional set of request options to apply to xhr request
    //  * @return {Promise} resolving search results
    //  */
    // search (arg, options) {
    //
    //     return Q.resolve( arg )
    //     .then( params => {
    //
    //         if(params && typeof(params.getQuery) !== 'undefined') {
    //             //if passed a GeoPlatform.Query object,
    //             // convert to parameters object
    //             params = params.getQuery();
    //         }
    //
    //         let opts = this.buildRequest("GET", this.baseUrl, params, options);
    //         return this.execute(opts);
    //     })
    //     .then( response => response.body )
    //     .catch(e => {
    //         let err = new Error(`ItemService.search() - Error searching items: ${e.message}`);
    //         return Q.reject(err);
    //     });
    // }
    //
    //
    // /**
    //  * @return {Promise}
    //  */
    // import (arg, format, options) {
    //
    //     return Q.resolve( true )
    //     .then( () => {
    //
    //         if(typeof(arg) !== 'string' && !arg.path) {
    //             throw new Error("Must provide either a URL or a File to import");
    //         }
    //
    //         let url = this.apiBase + '/api/import';
    //
    //         let isFile = typeof(arg) !== 'string';
    //         let formData = null;
    //         if(isFile) {
    //             formData = {
    //                 file: {
    //                     value:  fs.createReadStream(arg.path),
    //                     options: {
    //                         filename: arg.originalFilename
    //                     }
    //                 },
    //                 format: format || 'iso19139'
    //             };
    //         } else {
    //             formData = { url: arg, format: format };
    //         }
    //
    //         let opts = this.buildRequest("POST", this.baseUrl, formData, options);
    //         opts.formData = formData;
    //         delete opts.body;
    //         return this.execute(opts);
    //     })
    //     .then( response => response.body )
    //     .catch( e => {
    //         let err = new Error(`ItemService.import() - Error importing item: ${e.message}`);
    //         return Q.reject(err);
    //     });
    // }
    //
    //
    //
    // /**
    //  * @param {string} id - identifier of the item to export
    //  * @param {format} format - string mime type to export
    //  * @return {Promise} resolving HTTP response object for enabling attachment downloading
    //  */
    // export (id, format, options) {
    //
    //     return Q.resolve( true )
    //     .then( () => {
    //         let url = this.baseUrl + '/' + id + '/export';
    //         let opts = this.buildRequest("GET", url, {format:format}, options);
    //         opts.json = false;
    //         return this.execute(opts)
    //     })
    //     .then( response => response.response )
    //     .catch( e => {
    //         let err = new Error(`ItemService.export() - Error exporting item: ${e.message}`);
    //         return Q.reject(err);
    //     });
    // }
    //
    //
    // /**
    //  * @param {Object} object - GP object definition to generate a URI for
    //  * @param {Object} options - optional request options
    //  * @return {Promise} resolving string URI
    //  */
    // getUri (object, options) {
    //
    //     return Q.resolve( object )
    //     .then( (obj) => {
    //         let url = this.apiBase + '/api/utils/uri';
    //         let opts = this.buildRequest("POST", url, obj, options);
    //         return this.execute(opts);
    //     })
    //     .then( response => response.body )
    //     .catch( e => {
    //         let err = new Error(`ItemService.getUri() - Error getting URI for item: ${e.message}`);
    //         return Q.reject(err);
    //     });
    //
    // }


    export(id, format, options) {
        options = options || {};
        options.returnResponse = true;
        return super.export(id, format, options);
    }





    createRequestOpts(method, url, data) {
        let opts = super.createRequestOpts(method, url, data);
        opts.json = url.indexOf('/export')<0;   //only expect JSON on non-export calls
        if(data) {
            if("POST" === method || "PUT" === method || "PATCH" === method) {
                if(~url.indexOf('/api/import'))
                    opts.formData = data;
                else
                    opts.body = data;

            } else {
                opts.qs = data;
            }
        }
        return opts;
    }


    //
    // /**
    //  * @param {string} method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
    //  * @param {string} url - destination of xhr request
    //  * @param {Object} data - object to be sent with request
    //  * @param {Object} options - optional object defining request options
    //  * @return {Object} request options for xhr
    //  */
    // buildRequest (method, url, data, options) {
    //
    //     if(METHODS.indexOf(method)<0)
    //         throw new Error(`Unsupported HTTP method ${method}`);
    //
    //     if(!url)
    //         throw new Error(`Must specify a URL for HTTP requests`);
    //
    //     //define default options
    //     let opts = {
    //         method: method,
    //         url: url,
    //         json: true,
    //         timeout: this.timeout
    //     };
    //     if(data) {
    //         if("POST" === method || "PUT" === method || "PATCH" === method) {
    //             opts.body = data;
    //         } else {
    //             opts.qs = data;
    //         }
    //     }
    //
    //     //copy over user-supplied options
    //     if(options && typeof(options) === 'object') {
    //         for(let o in options) {
    //             if(options.hasOwnProperty(o)) {
    //                 opts[o] = options[o];
    //             }
    //         }
    //     }
    //
    //     return opts;
    // }


    /**
     *
     */
    execute(options) {
        let deferred = Q.defer();
        request(options, (error, response, body) => {
            this.checkAndHandleError(error, response)
            .then( () =>  {
                if(options.returnResponse)
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


module.exports = NodeItemService;
