/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as Q from 'q';
import { HttpRequest, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
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
        var deferred = Q.defer();
        this.http.request(request)
            .map(function (event) {
            if (event instanceof HttpResponse) {
                return (/** @type {?} */ (event)).body;
            }
            return {};
        })
            .subscribe(function (v) { value = v; }, function (err) { deferred.reject(err); }, function () { deferred.resolve(value); });
        return deferred.promise;
        // .toPromise()
        // .then( (result) => Q.resolve(result))
        // .catch( (err : any) => {
        //     // console.log("NG2HttpClient.catch() - " + JSON.stringify(err));
        //     if (err instanceof HttpErrorResponse) {
        //         let msg = "An error occurred communicating with the GeoPlatform API";
        //         if(err.error && err.error.error && err.error.error.message) {
        //             msg = err.error.error.message;
        //         } else if (err.error && err.error.message) {
        //             msg = err.error.message;
        //         } else if(err.message) {
        //             msg = err.message;
        //         }
        //         throw new Error(msg);
        //     }
        //     return {};
        // });
    };
    return NG2HttpClient;
}(GPHttpClient));
if (false) {
    /** @type {?} */
    NG2HttpClient.prototype.http;
}
export default NG2HttpClient;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXIvIiwic291cmNlcyI6WyJodHRwL25nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7QUFFdkIsT0FBTyxFQUNTLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUNoRCxZQUFZLEVBQ2YsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLHVCQUF1QixDQUFDO0FBRS9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUduRCxJQUFBO0lBQTRCLHlDQUFZO0lBRXBDLHVCQUFvQixJQUFnQixFQUFFLE9BQWE7UUFBbkQsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FDakI7UUFGbUIsVUFBSSxHQUFKLElBQUksQ0FBWTs7S0FFbkM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gseUNBQWlCOzs7OztJQUFqQixVQUFrQixPQUEyQjs7UUFFekMsSUFBSSxJQUFJLEdBQVMsRUFBRSxDQUFDO1FBRXBCLElBQUcsT0FBTyxlQUFZLE9BQU8sWUFBUyxZQUFZLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLFlBQVMsWUFBWSxDQUFDO1NBQ3BEOztZQUFNLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1FBRWxDLElBQUcsT0FBTyxZQUFTO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxPQUFPLFVBQU8sRUFBQyxDQUFDLENBQUM7U0FDOUQ7UUFFRCxJQUFHLE9BQU8sVUFBTztZQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxRQUFLLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7O1FBR2pDLElBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTs7WUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekIsSUFBRyxLQUFLLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQzthQUN4RDtTQUNKO1FBRUQsSUFBRyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1YsT0FBTyxJQUFJLFdBQVcsQ0FBTSxPQUFPLFlBQVMsT0FBTyxTQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDN0U7YUFBTTtZQUNILE9BQU8sSUFBSSxXQUFXLENBQU0sT0FBTyxZQUFTLE9BQU8sU0FBTSxJQUFJLENBQUMsQ0FBQztTQUNsRTtLQUVKO0lBRUQ7OztPQUdHOzs7OztJQUNILCtCQUFPOzs7O0lBQVAsVUFBUSxPQUEwQjs7UUFFOUIsSUFBSSxLQUFLLEdBQVMsSUFBSSxDQUFDOztRQUN2QixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFekIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2FBQ3pCLEdBQUcsQ0FBRSxVQUFDLEtBQXFCO1lBQ3hCLElBQUksS0FBSyxZQUFZLFlBQVksRUFBRTtnQkFDL0IsT0FBTyxtQkFBQyxLQUEwQixFQUFDLENBQUMsSUFBSSxDQUFDO2FBQzVDO1lBQ0QsT0FBTyxFQUFFLENBQUM7U0FDYixDQUFDO2FBQ0QsU0FBUyxDQUFFLFVBQUMsQ0FBTSxJQUFPLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxFQUNsQyxVQUFDLEdBQVcsSUFBTyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFDMUMsY0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FDckMsQ0FBQztRQUVGLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUIzQjt3QkEvRkw7RUFZNEIsWUFBWSxFQXFGdkMsQ0FBQTs7Ozs7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUSBmcm9tICdxJztcblxuaW1wb3J0IHtcbiAgICBIdHRwQ2xpZW50LCBIdHRwUmVxdWVzdCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsXG4gICAgSHR0cFJlc3BvbnNlLCBIdHRwRXZlbnQgLy8sIEh0dHBFcnJvclJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcblxuaW1wb3J0IHsgR1BIdHRwQ2xpZW50IH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuY2xhc3MgTkcySHR0cENsaWVudCBleHRlbmRzIEdQSHR0cENsaWVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zOiB7W2tleTpzdHJpbmddOmFueX0pIDogSHR0cFJlcXVlc3Q8YW55PiB7XG5cbiAgICAgICAgbGV0IG9wdHMgOiBhbnkgPSB7fTtcblxuICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMgJiYgb3B0aW9ucy5vcHRpb25zLnJlc3BvbnNlVHlwZSkge1xuICAgICAgICAgICAgb3B0cy5yZXNwb25zZVR5cGUgPSBvcHRpb25zLm9wdGlvbnMucmVzcG9uc2VUeXBlO1xuICAgICAgICB9IGVsc2Ugb3B0cy5yZXNwb25zZVR5cGUgPSAnanNvbic7ICAvL2RlZmF1bHQgcmVzcG9uc2UgdHlwZVxuXG4gICAgICAgIGlmKG9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICBvcHRzLnBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKHtmcm9tT2JqZWN0OiBvcHRpb25zLnBhcmFtc30pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICBvcHRzLmJvZHkgPSBvcHRpb25zLmRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcblxuICAgICAgICAvL3NldCBhdXRob3JpemF0aW9uIHRva2VuIGlmIG9uZSB3YXMgcHJvdmlkZWRcbiAgICAgICAgaWYodGhpcy50b2tlbikge1xuICAgICAgICAgICAgbGV0IHRva2VuID0gdGhpcy50b2tlbigpO1xuICAgICAgICAgICAgaWYodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBvcHRzLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0cy5ib2R5KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBSZXF1ZXN0PGFueT4ob3B0aW9ucy5tZXRob2QsIG9wdGlvbnMudXJsLCBvcHRzLmJvZHksIG9wdHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVxdWVzdDxhbnk+KG9wdGlvbnMubWV0aG9kLCBvcHRpb25zLnVybCwgb3B0cyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSByZXF1ZXN0IC0gQW5ndWxhciBIdHRwUmVxdWVzdCBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHJlc29sdmluZyB0aGUgcmVzcG9uc2Ugb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBleGVjdXRlKHJlcXVlc3QgOiBIdHRwUmVxdWVzdDxhbnk+KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBsZXQgdmFsdWUgOiBhbnkgPSBudWxsO1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XG5cbiAgICAgICAgdGhpcy5odHRwLnJlcXVlc3QocmVxdWVzdClcbiAgICAgICAgLm1hcCggKGV2ZW50OiBIdHRwRXZlbnQ8YW55PikgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChldmVudCBhcyBIdHRwUmVzcG9uc2U8YW55PikuYm9keTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfSlcbiAgICAgICAgLnN1YnNjcmliZSggKHY6IGFueSkgPT4geyB2YWx1ZSA9IHY7IH0sXG4gICAgICAgICAgICAoZXJyIDogRXJyb3IpID0+IHsgZGVmZXJyZWQucmVqZWN0KGVycik7IH0sXG4gICAgICAgICAgICAoKSA9PiB7IGRlZmVycmVkLnJlc29sdmUodmFsdWUpOyB9XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cbiAgICAgICAgLy8gLnRvUHJvbWlzZSgpXG4gICAgICAgIC8vIC50aGVuKCAocmVzdWx0KSA9PiBRLnJlc29sdmUocmVzdWx0KSlcbiAgICAgICAgLy8gLmNhdGNoKCAoZXJyIDogYW55KSA9PiB7XG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhcIk5HMkh0dHBDbGllbnQuY2F0Y2goKSAtIFwiICsgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgICAgIC8vICAgICBpZiAoZXJyIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICAgICAgLy8gICAgICAgICBsZXQgbXNnID0gXCJBbiBlcnJvciBvY2N1cnJlZCBjb21tdW5pY2F0aW5nIHdpdGggdGhlIEdlb1BsYXRmb3JtIEFQSVwiO1xuICAgICAgICAvLyAgICAgICAgIGlmKGVyci5lcnJvciAmJiBlcnIuZXJyb3IuZXJyb3IgJiYgZXJyLmVycm9yLmVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgbXNnID0gZXJyLmVycm9yLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgIC8vICAgICAgICAgfSBlbHNlIGlmIChlcnIuZXJyb3IgJiYgZXJyLmVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgbXNnID0gZXJyLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgIC8vICAgICAgICAgfSBlbHNlIGlmKGVyci5tZXNzYWdlKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIG1zZyA9IGVyci5tZXNzYWdlO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIHJldHVybiB7fTtcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE5HMkh0dHBDbGllbnQ7XG4iXX0=