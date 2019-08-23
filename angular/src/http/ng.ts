
import { NgZone } from "@angular/core";
import {
    HttpClient, HttpRequest, HttpHeaders, HttpParams,
    HttpResponse, HttpEvent //, HttpErrorResponse
} from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GPHttpClient } from '@geoplatform/client';


class NG2HttpClient extends GPHttpClient {

    //for use to ensure executed requests are handled inside angular zone
    // (see issues with Observable.subscribe() and NgZone)
    private zone : NgZone;

    constructor(private http: HttpClient, options?: any) {
        super(options);
    }

    setZone(zone : NgZone) {
        this.zone = zone;
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
        let token = this.getToken();
        if(token) {
            opts.headers = opts.headers.set('Authorization', 'Bearer ' + token);
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
    execute(request : HttpRequest<any>) : Promise<any> {

        let value : any = null;
        return new Promise<any>( (resolve, reject) => {

            this.http.request(request)
            .pipe(
                map( (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        return (event as HttpResponse<any>).body;
                    }
                    return {};
                })
            )
            .subscribe( (v: any) => { value = v; },
                (err : Error) => { reject(err); },
                () => {
                    if(this.zone) {
                        this.zone.run( () => {
                            resolve(value);
                        });
                    } else {
                        resolve(value);
                    }
                }
            );
        });
    }
}


/*
Don't use 'default' when exporting something being provided by the module
or else you may get "Invalid provider for the module" when compiling using AOT.
See:
https://stackoverflow.com/questions/48183594/invalid-provider-for-the-ngmodule-when-using-aot
 */
export {
    NG2HttpClient
}
