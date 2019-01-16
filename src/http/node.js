
import Q from 'q';
import Config from '../shared/config';

class NodeHttpClient {

    /**
     * @param {integer} options.timeout
     * @param {string} options.token - the bearer token or a function to retrieve it
     */
    constructor(options) {
        options = options || {};
        this.setTimeout(options.timeout||Config.timeout||30000);
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
        if(!request) {
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


export default NodeHttpClient;
