import * as Q from 'q';
import GPHttpClient from './client';
declare class XHRHttpClient extends GPHttpClient {
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    constructor(options?: {
        [key: string]: any;
    });
    createRequestOpts(options: {
        [key: string]: any;
    }): any;
    execute(opts: any): Q.Promise<any>;
}
export default XHRHttpClient;
