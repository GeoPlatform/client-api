/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as Q from 'q';
import { HttpRequest, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { GPHttpClient } from '@geoplatform/client';
var NG2HttpClient = /** @class */ (function (_super) {
    tslib_1.__extends(NG2HttpClient, _super);
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
        var value = null;
        /** @type {?} */
        var promise = this.http.request(request)
            .map(function (event) {
            if (event instanceof HttpResponse) {
                return (/** @type {?} */ (event)).body;
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
    };
    return NG2HttpClient;
}(GPHttpClient));
if (false) {
    /** @type {?} */
    NG2HttpClient.prototype.http;
}
export default NG2HttpClient;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXIvIiwic291cmNlcyI6WyJodHRwL25nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7QUFFdkIsT0FBTyxFQUNTLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUNoRCxZQUFZLEVBQ2YsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sNkJBQTZCLENBQUM7QUFFckMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR25ELElBQUE7SUFBNEIseUNBQVk7SUFFcEMsdUJBQW9CLElBQWdCLEVBQUUsT0FBYTtRQUFuRCxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUNqQjtRQUZtQixVQUFJLEdBQUosSUFBSSxDQUFZOztLQUVuQztJQUVEOztPQUVHOzs7Ozs7SUFDSCx5Q0FBaUI7Ozs7O0lBQWpCLFVBQWtCLE9BQTJCOztRQUV6QyxJQUFJLElBQUksR0FBUyxFQUFFLENBQUM7UUFFcEIsSUFBRyxPQUFPLGVBQVksT0FBTyxZQUFTLFlBQVksRUFBRTtZQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sWUFBUyxZQUFZLENBQUM7U0FDcEQ7O1lBQU0sSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7UUFFbEMsSUFBRyxPQUFPLFlBQVM7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE9BQU8sVUFBTyxFQUFDLENBQUMsQ0FBQztTQUM5RDtRQUVELElBQUcsT0FBTyxVQUFPO1lBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLFFBQUssQ0FBQztTQUM1QjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQzs7UUFHakMsSUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFOztZQUNYLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN6QixJQUFHLEtBQUssRUFBRTtnQkFDTixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO2FBQ3hEO1NBQ0o7UUFFRCxJQUFHLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVixPQUFPLElBQUksV0FBVyxDQUFNLE9BQU8sWUFBUyxPQUFPLFNBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM3RTthQUFNO1lBQ0gsT0FBTyxJQUFJLFdBQVcsQ0FBTSxPQUFPLFlBQVMsT0FBTyxTQUFNLElBQUksQ0FBQyxDQUFDO1NBQ2xFO0tBRUo7SUFFRDs7O09BR0c7Ozs7O0lBQ0gsK0JBQU87Ozs7SUFBUCxVQUFRLE9BQTBCOztRQUU5QixJQUFJLEtBQUssR0FBUyxJQUFJLENBQUM7O1FBR3ZCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUN2QyxHQUFHLENBQUUsVUFBQyxLQUFxQjtZQUN4QixJQUFJLEtBQUssWUFBWSxZQUFZLEVBQUU7Z0JBQy9CLE9BQU8sbUJBQUMsS0FBMEIsRUFBQyxDQUFDLElBQUksQ0FBQzthQUM1QztZQUNELE9BQU8sRUFBRSxDQUFDO1NBQ2IsQ0FBQzthQUNELFNBQVMsRUFBRSxDQUFDO1FBRWIsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBMkI3Qjt3QkFyR0w7RUFhNEIsWUFBWSxFQTBGdkMsQ0FBQTs7Ozs7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUSBmcm9tICdxJztcblxuaW1wb3J0IHtcbiAgICBIdHRwQ2xpZW50LCBIdHRwUmVxdWVzdCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsXG4gICAgSHR0cFJlc3BvbnNlLCBIdHRwRXZlbnQgLy8sIEh0dHBFcnJvclJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcblxuaW1wb3J0IHsgR1BIdHRwQ2xpZW50IH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuY2xhc3MgTkcySHR0cENsaWVudCBleHRlbmRzIEdQSHR0cENsaWVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zOiB7W2tleTpzdHJpbmddOmFueX0pIDogSHR0cFJlcXVlc3Q8YW55PiB7XG5cbiAgICAgICAgbGV0IG9wdHMgOiBhbnkgPSB7fTtcblxuICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMgJiYgb3B0aW9ucy5vcHRpb25zLnJlc3BvbnNlVHlwZSkge1xuICAgICAgICAgICAgb3B0cy5yZXNwb25zZVR5cGUgPSBvcHRpb25zLm9wdGlvbnMucmVzcG9uc2VUeXBlO1xuICAgICAgICB9IGVsc2Ugb3B0cy5yZXNwb25zZVR5cGUgPSAnanNvbic7ICAvL2RlZmF1bHQgcmVzcG9uc2UgdHlwZVxuXG4gICAgICAgIGlmKG9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICBvcHRzLnBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKHtmcm9tT2JqZWN0OiBvcHRpb25zLnBhcmFtc30pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICBvcHRzLmJvZHkgPSBvcHRpb25zLmRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcblxuICAgICAgICAvL3NldCBhdXRob3JpemF0aW9uIHRva2VuIGlmIG9uZSB3YXMgcHJvdmlkZWRcbiAgICAgICAgaWYodGhpcy50b2tlbikge1xuICAgICAgICAgICAgbGV0IHRva2VuID0gdGhpcy50b2tlbigpO1xuICAgICAgICAgICAgaWYodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBvcHRzLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0cy5ib2R5KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBSZXF1ZXN0PGFueT4ob3B0aW9ucy5tZXRob2QsIG9wdGlvbnMudXJsLCBvcHRzLmJvZHksIG9wdHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVxdWVzdDxhbnk+KG9wdGlvbnMubWV0aG9kLCBvcHRpb25zLnVybCwgb3B0cyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSByZXF1ZXN0IC0gQW5ndWxhciBIdHRwUmVxdWVzdCBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHJlc29sdmluZyB0aGUgcmVzcG9uc2Ugb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBleGVjdXRlKHJlcXVlc3QgOiBIdHRwUmVxdWVzdDxhbnk+KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBsZXQgdmFsdWUgOiBhbnkgPSBudWxsO1xuICAgICAgICAvLyBsZXQgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XG5cbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLmh0dHAucmVxdWVzdChyZXF1ZXN0KVxuICAgICAgICAubWFwKCAoZXZlbnQ6IEh0dHBFdmVudDxhbnk+KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGV2ZW50IGFzIEh0dHBSZXNwb25zZTxhbnk+KS5ib2R5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9KVxuICAgICAgICAudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZShwcm9taXNlKTtcblxuICAgICAgICAvLyAuc3Vic2NyaWJlKCAodjogYW55KSA9PiB7IHZhbHVlID0gdjsgfSxcbiAgICAgICAgLy8gICAgIChlcnIgOiBFcnJvcikgPT4geyBkZWZlcnJlZC5yZWplY3QoZXJyKTsgfSxcbiAgICAgICAgLy8gICAgICgpID0+IHsgZGVmZXJyZWQucmVzb2x2ZSh2YWx1ZSk7IH1cbiAgICAgICAgLy8gKTtcbiAgICAgICAgLy8gcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cbiAgICAgICAgLypcbiAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgIC50aGVuKCAocmVzdWx0KSA9PiBRLnJlc29sdmUocmVzdWx0KSlcbiAgICAgICAgLmNhdGNoKCAoZXJyIDogYW55KSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk5HMkh0dHBDbGllbnQuY2F0Y2goKSAtIFwiICsgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBsZXQgbXNnID0gXCJBbiBlcnJvciBvY2N1cnJlZCBjb21tdW5pY2F0aW5nIHdpdGggdGhlIEdlb1BsYXRmb3JtIEFQSVwiO1xuICAgICAgICAgICAgICAgIGlmKGVyci5lcnJvciAmJiBlcnIuZXJyb3IuZXJyb3IgJiYgZXJyLmVycm9yLmVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbXNnID0gZXJyLmVycm9yLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlcnIuZXJyb3IgJiYgZXJyLmVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbXNnID0gZXJyLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGVyci5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1zZyA9IGVyci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfSk7XG4gICAgICAgICovXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE5HMkh0dHBDbGllbnQ7XG4iXX0=