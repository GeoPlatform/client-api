import * as Q from 'q';
import { HttpClient, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GPHttpClient } from '@geoplatform/client';
declare class NG2HttpClient extends GPHttpClient {
    private http;
    constructor(http: HttpClient, options?: any);
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
    execute(request: HttpRequest<any>): Q.Promise<any>;
}
export default NG2HttpClient;
