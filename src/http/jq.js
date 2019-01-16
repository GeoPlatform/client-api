
import Q from 'q';
import Config from '../shared/config';

class JQueryHttpClient {

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

export default JQueryHttpClient;
