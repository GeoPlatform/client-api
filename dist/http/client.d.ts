import * as Q from 'q';
declare class GPHttpClient {
    protected token: any;
    protected timeout: number;
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    constructor(options?: {
        [key: string]: any;
    });
    setTimeout(timeout: number): void;
    /**
     * @param arg - specify the bearer token or a function to retrieve it
     */
    setAuthToken(arg: string | Function): void;
    createRequestOpts(options: {
        [key: string]: any;
    }): any;
    execute(opts: any): Q.Promise<any>;
}
export default GPHttpClient;