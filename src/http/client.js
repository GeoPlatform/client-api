

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
