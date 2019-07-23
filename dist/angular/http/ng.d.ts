import { NgZone } from "@angular/core";
import { HttpClient, HttpRequest } from '@angular/common/http';
import { GPHttpClient } from '@geoplatform/client';
declare class NG2HttpClient extends GPHttpClient {
    private http;
    private zone;
    constructor(http: HttpClient, options?: any);
    setZone(zone: NgZone): void;
    /**
     *
     */
    createRequestOpts(options: {
        [key: string]: any;
    }): HttpRequest<any>;
    /**
     * @param request - Angular HttpRequest object
     * @return resolving the response or an error
     */
    execute(request: HttpRequest<any>): Promise<any>;
}
export default NG2HttpClient;
