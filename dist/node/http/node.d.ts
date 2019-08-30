import { GPHttpClient } from '@geoplatform/client';
declare class NodeHttpClient extends GPHttpClient {
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    constructor(options?: {
        [key: string]: any;
    });
    /**
     * @param options - request configuration
     * @return request object
     */
    createRequestOpts(options: {
        [key: string]: any;
    }): any;
    /**
     *
     */
    execute(options: any): Promise<any>;
    /**
     *
     */
    checkAndHandleError(error: any, response: any): Promise<any>;
}
export default NodeHttpClient;
