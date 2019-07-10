import { __extends } from 'tslib';
import { resolve } from 'q';
import { HttpRequest, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { GPHttpClient } from '@geoplatform/client';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NG2HttpClient = /** @class */ (function (_super) {
    __extends(NG2HttpClient, _super);
    function NG2HttpClient(http, options) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        return _this;
    }
    /**
     *
     */
    /**
     *
     * @param {?} options
     * @return {?}
     */
    NG2HttpClient.prototype.createRequestOpts = /**
     *
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var opts = {};
        if (options["options"] && options["options"].responseType) {
            opts.responseType = options["options"].responseType;
        }
        else
            opts.responseType = 'json'; //default response type
        if (options["params"]) {
            opts.params = new HttpParams({ fromObject: options["params"] });
        }
        if (options["data"]) {
            opts.body = options["data"];
        }
        opts.headers = new HttpHeaders();
        //set authorization token if one was provided
        if (this.token) {
            /** @type {?} */
            var token = this.token();
            if (token) {
                opts.headers.set('Authorization', 'Bearer ' + token);
            }
        }
        if (opts.body) {
            return new HttpRequest(options["method"], options["url"], opts.body, opts);
        }
        else {
            return new HttpRequest(options["method"], options["url"], opts);
        }
    };
    /**
     * @param request - Angular HttpRequest object
     * @return resolving the response or an error
     */
    /**
     * @param {?} request - Angular HttpRequest object
     * @return {?} resolving the response or an error
     */
    NG2HttpClient.prototype.execute = /**
     * @param {?} request - Angular HttpRequest object
     * @return {?} resolving the response or an error
     */
    function (request) {
        /** @type {?} */
        var promise = this.http.request(request)
            .map(function (event) {
            if (event instanceof HttpResponse) {
                return (/** @type {?} */ (event)).body;
            }
            return {};
        })
            .toPromise();
        return resolve(promise);
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
    };
    return NG2HttpClient;
}(GPHttpClient));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NG2HttpClient };

//# sourceMappingURL=geoplatform-client-angular.js.map