

(function (root, factory) {
    if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.HttpClientBase = factory()
        );
    } else if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('HttpClientBase', function(){
            return (root.HttpClientBase = factory());
        });
    } else {
        GeoPlatform.HttpClientBase = factory();
    }
}(this||window, function() {


    class HttpClientBase {

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
            throw new Error("HttpClientBase.createRequestOpts() - Function must be overridden by a sub-class");
        }


        execute(opts) {
            throw new Error("HttpClientBase.execute() - Function must be overridden by a sub-class");
        }

    }

    return HttpClientBase;

}));
