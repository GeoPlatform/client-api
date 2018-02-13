

(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["angular", "q"], function(jQuery, Q){
            return (root.NGHttpClient = factory(angular, Q));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.NGHttpClient = factory(
                require("angular"),
                require('q')
            )
        );
    } else {
        GeoPlatform.NGHttpClient = factory(angular, Q);
    }
}(this||window, function(angular, Q) {


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
            this.setToken(options.token);

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
            let $http = this.$http || angular.injector(['ng']).get('$http');
            return Q.resolve( $http )
            .then($http => {
                if(typeof($http) === 'undefined')
                    throw new Error("Angular $http not resolved");

                // console.log(opts);
                return $http(opts);
            })
            .then(response=>response.data);
        }

    }

    return NGHttpClient;

}));
