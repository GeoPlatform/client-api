

(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q"], function(jQuery, Q){
            return (root.JQueryHttpClient = factory(jQuery, Q));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.JQueryHttpClient = factory(
                require("jquery"),
                require('q')
            )
        );
    } else {
        GeoPlatform.JQueryHttpClient = factory(jQuery, Q);
    }
}(this||window, function(jQuery, Q) {


    class JQueryHttpClient {

        constructor(timeout) {
            this.setTimeout(timeout||10000);
        }

        setTimeout(timeout) {
            this.timeout = timeout;
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
            let d = Q.defer();
            opts.success = function(data) { d.resolve(data); };
            opts.error = function(xhr, status, message) { d.reject(new Error(message)); };
            jQuery.ajax(opts);
            return d.promise;
        }

    }

    return JQueryHttpClient;

}));
