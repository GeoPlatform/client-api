/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from 'q';
import { HttpRequest, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GPHttpClient } from '@geoplatform/client';
class NG2HttpClient extends GPHttpClient {
    /**
     * @param {?} http
     * @param {?=} options
     */
    constructor(http, options) {
        super(options);
        this.http = http;
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    setZone(zone) {
        this.zone = zone;
    }
    /**
     *
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(options) {
        /** @type {?} */
        let opts = {};
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
            let token = this.token();
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
    }
    /**
     * @param {?} request - Angular HttpRequest object
     * @return {?} resolving the response or an error
     */
    execute(request) {
        /** @type {?} */
        let value = null;
        /** @type {?} */
        let deferred = Q.defer();
        /** @type {?} */
        let promise = this.http.request(request)
            .map((event) => {
            if (event instanceof HttpResponse) {
                return (/** @type {?} */ (event)).body;
            }
            return {};
        })
            .subscribe((v) => { value = v; }, (err) => { deferred.reject(err); }, () => {
            if (this.zone) {
                this.zone.run(() => { deferred.resolve(value); });
            }
            else {
                deferred.resolve(value);
            }
        });
        return deferred.promise;
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
if (false) {
    /** @type {?} */
    NG2HttpClient.prototype.zone;
    /** @type {?} */
    NG2HttpClient.prototype.http;
}
export default NG2HttpClient;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXIvIiwic291cmNlcyI6WyJodHRwL25nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztBQUd2QixPQUFPLEVBQ1MsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQ2hELFlBQVksRUFDZixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sdUJBQXVCLENBQUM7QUFHL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR25ELG1CQUFvQixTQUFRLFlBQVk7Ozs7O0lBTXBDLFlBQW9CLElBQWdCLEVBQUUsT0FBYTtRQUMvQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFEQyxTQUFJLEdBQUosSUFBSSxDQUFZO0tBRW5DOzs7OztJQUVELE9BQU8sQ0FBQyxJQUFhO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ3BCOzs7Ozs7SUFLRCxpQkFBaUIsQ0FBQyxPQUEyQjs7UUFFekMsSUFBSSxJQUFJLEdBQVMsRUFBRSxDQUFDO1FBRXBCLElBQUcsT0FBTyxlQUFZLE9BQU8sWUFBUyxZQUFZLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLFlBQVMsWUFBWSxDQUFDO1NBQ3BEOztZQUFNLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1FBRWxDLElBQUcsT0FBTyxZQUFTO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxPQUFPLFVBQU8sRUFBQyxDQUFDLENBQUM7U0FDOUQ7UUFFRCxJQUFHLE9BQU8sVUFBTztZQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxRQUFLLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7O1FBR2pDLElBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTs7WUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekIsSUFBRyxLQUFLLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQzthQUN4RDtTQUNKO1FBRUQsSUFBRyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1YsT0FBTyxJQUFJLFdBQVcsQ0FBTSxPQUFPLFlBQVMsT0FBTyxTQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDN0U7YUFBTTtZQUNILE9BQU8sSUFBSSxXQUFXLENBQU0sT0FBTyxZQUFTLE9BQU8sU0FBTSxJQUFJLENBQUMsQ0FBQztTQUNsRTtLQUVKOzs7OztJQU1ELE9BQU8sQ0FBQyxPQUEwQjs7UUFFOUIsSUFBSSxLQUFLLEdBQVMsSUFBSSxDQUFDOztRQUN2QixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7O1FBRXpCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUN2QyxHQUFHLENBQUUsQ0FBQyxLQUFxQixFQUFFLEVBQUU7WUFDNUIsSUFBSSxLQUFLLFlBQVksWUFBWSxFQUFFO2dCQUMvQixPQUFPLG1CQUFDLEtBQTBCLEVBQUMsQ0FBQyxJQUFJLENBQUM7YUFDNUM7WUFDRCxPQUFPLEVBQUUsQ0FBQztTQUNiLENBQUM7YUFDRCxTQUFTLENBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxFQUNsQyxDQUFDLEdBQVcsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQzFDLEdBQUcsRUFBRTtZQUNELElBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRSxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3REO2lCQUFNO2dCQUNILFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0I7U0FDSixDQUNKLENBQUM7UUFDRixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBcUIzQjtDQUVKOzs7Ozs7O0FBRUQsZUFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XG5cbmltcG9ydCB7IE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICAgIEh0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyxcbiAgICBIdHRwUmVzcG9uc2UsIEh0dHBFdmVudCAvLywgSHR0cEVycm9yUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuLy8gaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xuXG5pbXBvcnQgeyBHUEh0dHBDbGllbnQgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuXG5jbGFzcyBORzJIdHRwQ2xpZW50IGV4dGVuZHMgR1BIdHRwQ2xpZW50IHtcblxuICAgIC8vZm9yIHVzZSB0byBlbnN1cmUgZXhlY3V0ZWQgcmVxdWVzdHMgYXJlIGhhbmRsZWQgaW5zaWRlIGFuZ3VsYXIgem9uZVxuICAgIC8vIChzZWUgaXNzdWVzIHdpdGggT2JzZXJ2YWJsZS5zdWJzY3JpYmUoKSBhbmQgTmdab25lKVxuICAgIHByaXZhdGUgem9uZSA6IE5nWm9uZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICB9XG5cbiAgICBzZXRab25lKHpvbmUgOiBOZ1pvbmUpIHtcbiAgICAgICAgdGhpcy56b25lID0gem9uZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnM6IHtba2V5OnN0cmluZ106YW55fSkgOiBIdHRwUmVxdWVzdDxhbnk+IHtcblxuICAgICAgICBsZXQgb3B0cyA6IGFueSA9IHt9O1xuXG4gICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucyAmJiBvcHRpb25zLm9wdGlvbnMucmVzcG9uc2VUeXBlKSB7XG4gICAgICAgICAgICBvcHRzLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMub3B0aW9ucy5yZXNwb25zZVR5cGU7XG4gICAgICAgIH0gZWxzZSBvcHRzLnJlc3BvbnNlVHlwZSA9ICdqc29uJzsgIC8vZGVmYXVsdCByZXNwb25zZSB0eXBlXG5cbiAgICAgICAgaWYob3B0aW9ucy5wYXJhbXMpIHtcbiAgICAgICAgICAgIG9wdHMucGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoe2Zyb21PYmplY3Q6IG9wdGlvbnMucGFyYW1zfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgIG9wdHMuYm9keSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdHMuaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuXG4gICAgICAgIC8vc2V0IGF1dGhvcml6YXRpb24gdG9rZW4gaWYgb25lIHdhcyBwcm92aWRlZFxuICAgICAgICBpZih0aGlzLnRva2VuKSB7XG4gICAgICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLnRva2VuKCk7XG4gICAgICAgICAgICBpZih0b2tlbikge1xuICAgICAgICAgICAgICAgIG9wdHMuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRzLmJvZHkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFJlcXVlc3Q8YW55PihvcHRpb25zLm1ldGhvZCwgb3B0aW9ucy51cmwsIG9wdHMuYm9keSwgb3B0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBSZXF1ZXN0PGFueT4ob3B0aW9ucy5tZXRob2QsIG9wdGlvbnMudXJsLCBvcHRzKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHJlcXVlc3QgLSBBbmd1bGFyIEh0dHBSZXF1ZXN0IG9iamVjdFxuICAgICAqIEByZXR1cm4gcmVzb2x2aW5nIHRoZSByZXNwb25zZSBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGV4ZWN1dGUocmVxdWVzdCA6IEh0dHBSZXF1ZXN0PGFueT4pIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGxldCB2YWx1ZSA6IGFueSA9IG51bGw7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcblxuICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMuaHR0cC5yZXF1ZXN0KHJlcXVlc3QpXG4gICAgICAgIC5tYXAoIChldmVudDogSHR0cEV2ZW50PGFueT4pID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZXZlbnQgYXMgSHR0cFJlc3BvbnNlPGFueT4pLmJvZHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH0pXG4gICAgICAgIC5zdWJzY3JpYmUoICh2OiBhbnkpID0+IHsgdmFsdWUgPSB2OyB9LFxuICAgICAgICAgICAgKGVyciA6IEVycm9yKSA9PiB7IGRlZmVycmVkLnJlamVjdChlcnIpOyB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuem9uZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCAoKSA9PiB7IGRlZmVycmVkLnJlc29sdmUodmFsdWUpOyB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXG4gICAgICAgIC8qXG4gICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAudGhlbiggKHJlc3VsdCkgPT4gUS5yZXNvbHZlKHJlc3VsdCkpXG4gICAgICAgIC5jYXRjaCggKGVyciA6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJORzJIdHRwQ2xpZW50LmNhdGNoKCkgLSBcIiArIEpTT04uc3RyaW5naWZ5KGVycikpO1xuICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1zZyA9IFwiQW4gZXJyb3Igb2NjdXJyZWQgY29tbXVuaWNhdGluZyB3aXRoIHRoZSBHZW9QbGF0Zm9ybSBBUElcIjtcbiAgICAgICAgICAgICAgICBpZihlcnIuZXJyb3IgJiYgZXJyLmVycm9yLmVycm9yICYmIGVyci5lcnJvci5lcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1zZyA9IGVyci5lcnJvci5lcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyLmVycm9yICYmIGVyci5lcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1zZyA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihlcnIubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICBtc2cgPSBlcnIubWVzc2FnZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH0pO1xuICAgICAgICAqL1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBORzJIdHRwQ2xpZW50O1xuIl19