

class GPHttpClient {

    protected token : any;
    protected timeout : number = 5000;

    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    constructor(options ?: { [key:string] : any }) {
        options = options || {};
        this.setTimeout(options.timeout||30000);
        this.setAuthToken(options.token);
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
