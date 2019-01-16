
import Q from 'q';
import Config from '../shared/config';

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
        this.setTimeout(options.timeout||Config.timeout||30000);
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

        if(options.json === true || 'json' === options.responseType)
            opts.dataType = 'json';
        else if('text' === options.responseType)
            opts.dataType = 'text';

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

export default NGHttpClient;
