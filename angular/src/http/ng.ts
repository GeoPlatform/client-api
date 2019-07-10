
import * as Q from 'q';

import {
    HttpClient, HttpRequest, HttpHeaders, HttpParams,
    HttpResponse, HttpEvent //, HttpErrorResponse
} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { GPHttpClient } from '@geoplatform/client';


class NG2HttpClient extends GPHttpClient {

    constructor(private http: HttpClient, options?: any) {
        super(options);
    }

    /**
     *
     */
    createRequestOpts(options: {[key:string]:any}) : HttpRequest<any> {

        let opts : any = {};

        if(options.options && options.options.responseType) {
            opts.responseType = options.options.responseType;
        } else opts.responseType = 'json';  //default response type

        if(options.params) {
            opts.params = new HttpParams({fromObject: options.params});
        }

        if(options.data) {
            opts.body = options.data;
        }

        opts.headers = new HttpHeaders();

        //set authorization token if one was provided
        if(this.token) {
            let token = this.token();
            if(token) {
                opts.headers.set('Authorization', 'Bearer ' + token);
            }
        }

        if(opts.body) {
            return new HttpRequest<any>(options.method, options.url, opts.body, opts);
        } else {
            return new HttpRequest<any>(options.method, options.url, opts);
        }

    }

    /**
     * @param request - Angular HttpRequest object
     * @return resolving the response or an error
     */
    execute(request : HttpRequest<any>) : Q.Promise<any> {

        let value : any = null;
        // let deferred = Q.defer();

        let promise = this.http.request(request)
        .map( (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                return (event as HttpResponse<any>).body;
            }
            return {};
        })
        .toPromise();

        return Q.resolve(promise);

        // .subscribe( (v: any) => { value = v; },
        //     (err : Error) => { deferred.reject(err); },
        //     () => { deferred.resolve(value); }
        // );
        // return deferred.promise;

        /*
        .toPromise()
        .then( (result) => Q.resolve(result))
        .catch( (err : any) => {
            // console.log("NG2HttpClient.catch() - " + JSON.stringify(err));
            if (err instanceof HttpErrorResponse) {
                let msg = "An error occurred communicating with the GeoPlatform API";
                if(err.error && err.error.error && err.error.error.message) {
                    msg = err.error.error.message;
                } else if (err.error && err.error.message) {
                    msg = err.error.message;
                } else if(err.message) {
                    msg = err.message;
                }
                throw new Error(msg);
            }
            return {};
        });
        */
    }

}

export default NG2HttpClient;
