import * as Q from 'q';
import { GPHttpClient } from "@geoplatform/client";
declare class NGHttpClient extends GPHttpClient {
    private $http;
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     * @param options.$http - angular $http service instance
     */
    constructor(options?: {
        [key: string]: any;
    });
    createRequestOpts(options: {
        [key: string]: any;
    }): any;
    execute(opts: any): Q.Promise<any>;
}
export default NGHttpClient;
