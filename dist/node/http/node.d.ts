import * as Q from 'q';
import { GPHttpClient } from '@geoplatform/client';
declare class NodeHttpClient extends GPHttpClient {
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
    /**
     *
     */
    execute(options: any): Q.Promise<any>;
    /**
     *
     */
    checkAndHandleError(error: any, response: any): Q.Promise<any>;
}
export default NodeHttpClient;
