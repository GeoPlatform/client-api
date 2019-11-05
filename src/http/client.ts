

class GPHttpClient {

    protected token : any;
    protected cookie : any;
    protected timeout : number = 5000;

    protected authCookieName = 'gpoauth-a';

    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    constructor(options ?: { [key:string] : any }) {
        options = options || {};
        this.setTimeout(options.timeout||30000);
        this.setAuthToken(options.token);
        this.setCookie(options.cookie);
    }

    setTimeout(timeout : number) {
        this.timeout = timeout;
    }

    /**
     * @param arg - specify the bearer token or a function to retrieve it
     */
    setAuthToken(arg : string|Function) {
        if(arg && typeof(arg) === 'string')
            this.token = function() { return arg; };
        else if(arg && typeof(arg) === 'function')
            this.token = arg;
        //else do nothing
    }

    getToken() : string {
        if(this.token && typeof(this.token) === 'function') return this.token();
        else return this.token || null;
    }

    setCookie(cookie) {
        this.cookie = cookie;
    }

    getCookie() {
        return this.cookie;
    }

    createRequestOpts(
        // @ts-ignore
        options : { [key:string] : any }
    ) : any {
        throw new Error("Must implement 'createRequestOpts' in a sub-class");
    }

    execute(
        // @ts-ignore
        opts : any
    ) : Promise<any> {
        return Promise.reject(new Error("Must overrdie 'execute' in a sub-class"));
    }

}

export default GPHttpClient;
