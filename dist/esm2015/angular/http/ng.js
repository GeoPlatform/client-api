/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
        /** @type {?} */
        let token = this.getToken();
        if (token) {
            opts.headers.set('Authorization', 'Bearer ' + token);
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
        return new Promise((resolve, reject) => {
            this.http.request(request)
                .map((event) => {
                if (event instanceof HttpResponse) {
                    return (/** @type {?} */ (event)).body;
                }
                return {};
            })
                .subscribe((v) => { value = v; }, (err) => { reject(err); }, () => {
                if (this.zone) {
                    this.zone.run(() => {
                        resolve(value);
                    });
                }
                else {
                    resolve(value);
                }
            });
        });
        /*
                .toPromise()
                .then( (result) => Promise.resolve(result))
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXIvIiwic291cmNlcyI6WyJodHRwL25nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQ1MsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQ2hELFlBQVksRUFDZixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sdUJBQXVCLENBQUM7QUFFL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR25ELG1CQUFvQixTQUFRLFlBQVk7Ozs7O0lBTXBDLFlBQW9CLElBQWdCLEVBQUUsT0FBYTtRQUMvQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFEQyxTQUFJLEdBQUosSUFBSSxDQUFZO0tBRW5DOzs7OztJQUVELE9BQU8sQ0FBQyxJQUFhO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ3BCOzs7Ozs7SUFLRCxpQkFBaUIsQ0FBQyxPQUEyQjs7UUFFekMsSUFBSSxJQUFJLEdBQVMsRUFBRSxDQUFDO1FBRXBCLElBQUcsT0FBTyxlQUFZLE9BQU8sWUFBUyxZQUFZLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLFlBQVMsWUFBWSxDQUFDO1NBQ3BEOztZQUFNLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1FBRWxDLElBQUcsT0FBTyxZQUFTO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxPQUFPLFVBQU8sRUFBQyxDQUFDLENBQUM7U0FDOUQ7UUFFRCxJQUFHLE9BQU8sVUFBTztZQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxRQUFLLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7O1FBR2pDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFHLEtBQUssRUFBRTtZQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDeEQ7UUFFRCxJQUFHLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVixPQUFPLElBQUksV0FBVyxDQUFNLE9BQU8sWUFBUyxPQUFPLFNBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM3RTthQUFNO1lBQ0gsT0FBTyxJQUFJLFdBQVcsQ0FBTSxPQUFPLFlBQVMsT0FBTyxTQUFNLElBQUksQ0FBQyxDQUFDO1NBQ2xFO0tBRUo7Ozs7O0lBTUQsT0FBTyxDQUFDLE9BQTBCOztRQUU5QixJQUFJLEtBQUssR0FBUyxJQUFJLENBQUM7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUV6QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7aUJBQ3pCLEdBQUcsQ0FBRSxDQUFDLEtBQXFCLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxLQUFLLFlBQVksWUFBWSxFQUFFO29CQUMvQixPQUFPLG1CQUFDLEtBQTBCLEVBQUMsQ0FBQyxJQUFJLENBQUM7aUJBQzVDO2dCQUNELE9BQU8sRUFBRSxDQUFDO2FBQ2IsQ0FBQztpQkFDRCxTQUFTLENBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxFQUNsQyxDQUFDLEdBQVcsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFDakMsR0FBRyxFQUFFO2dCQUNELElBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRSxHQUFHLEVBQUU7d0JBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDbEIsQ0FBQyxDQUFDO2lCQUNOO3FCQUFNO29CQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbEI7YUFDSixDQUNKLENBQUM7U0FDTCxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBc0JOO0NBRUo7Ozs7Ozs7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgSHR0cENsaWVudCwgSHR0cFJlcXVlc3QsIEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zLFxuICAgIEh0dHBSZXNwb25zZSwgSHR0cEV2ZW50IC8vLCBIdHRwRXJyb3JSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5cbmltcG9ydCB7IEdQSHR0cENsaWVudCB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cbmNsYXNzIE5HMkh0dHBDbGllbnQgZXh0ZW5kcyBHUEh0dHBDbGllbnQge1xuXG4gICAgLy9mb3IgdXNlIHRvIGVuc3VyZSBleGVjdXRlZCByZXF1ZXN0cyBhcmUgaGFuZGxlZCBpbnNpZGUgYW5ndWxhciB6b25lXG4gICAgLy8gKHNlZSBpc3N1ZXMgd2l0aCBPYnNlcnZhYmxlLnN1YnNjcmliZSgpIGFuZCBOZ1pvbmUpXG4gICAgcHJpdmF0ZSB6b25lIDogTmdab25lO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHNldFpvbmUoem9uZSA6IE5nWm9uZSkge1xuICAgICAgICB0aGlzLnpvbmUgPSB6b25lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9uczoge1trZXk6c3RyaW5nXTphbnl9KSA6IEh0dHBSZXF1ZXN0PGFueT4ge1xuXG4gICAgICAgIGxldCBvcHRzIDogYW55ID0ge307XG5cbiAgICAgICAgaWYob3B0aW9ucy5vcHRpb25zICYmIG9wdGlvbnMub3B0aW9ucy5yZXNwb25zZVR5cGUpIHtcbiAgICAgICAgICAgIG9wdHMucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5vcHRpb25zLnJlc3BvbnNlVHlwZTtcbiAgICAgICAgfSBlbHNlIG9wdHMucmVzcG9uc2VUeXBlID0gJ2pzb24nOyAgLy9kZWZhdWx0IHJlc3BvbnNlIHR5cGVcblxuICAgICAgICBpZihvcHRpb25zLnBhcmFtcykge1xuICAgICAgICAgICAgb3B0cy5wYXJhbXMgPSBuZXcgSHR0cFBhcmFtcyh7ZnJvbU9iamVjdDogb3B0aW9ucy5wYXJhbXN9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9wdGlvbnMuZGF0YSkge1xuICAgICAgICAgICAgb3B0cy5ib2R5ID0gb3B0aW9ucy5kYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0cy5oZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG5cbiAgICAgICAgLy9zZXQgYXV0aG9yaXphdGlvbiB0b2tlbiBpZiBvbmUgd2FzIHByb3ZpZGVkXG4gICAgICAgIGxldCB0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKTtcbiAgICAgICAgaWYodG9rZW4pIHtcbiAgICAgICAgICAgIG9wdHMuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRzLmJvZHkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFJlcXVlc3Q8YW55PihvcHRpb25zLm1ldGhvZCwgb3B0aW9ucy51cmwsIG9wdHMuYm9keSwgb3B0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBSZXF1ZXN0PGFueT4ob3B0aW9ucy5tZXRob2QsIG9wdGlvbnMudXJsLCBvcHRzKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHJlcXVlc3QgLSBBbmd1bGFyIEh0dHBSZXF1ZXN0IG9iamVjdFxuICAgICAqIEByZXR1cm4gcmVzb2x2aW5nIHRoZSByZXNwb25zZSBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGV4ZWN1dGUocmVxdWVzdCA6IEh0dHBSZXF1ZXN0PGFueT4pIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBsZXQgdmFsdWUgOiBhbnkgPSBudWxsO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PiggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmh0dHAucmVxdWVzdChyZXF1ZXN0KVxuICAgICAgICAgICAgLm1hcCggKGV2ZW50OiBIdHRwRXZlbnQ8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGV2ZW50IGFzIEh0dHBSZXNwb25zZTxhbnk+KS5ib2R5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZSggKHY6IGFueSkgPT4geyB2YWx1ZSA9IHY7IH0sXG4gICAgICAgICAgICAgICAgKGVyciA6IEVycm9yKSA9PiB7IHJlamVjdChlcnIpOyB9LFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy56b25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvKlxuICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgLnRoZW4oIChyZXN1bHQpID0+IFByb21pc2UucmVzb2x2ZShyZXN1bHQpKVxuICAgICAgICAuY2F0Y2goIChlcnIgOiBhbnkpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTkcySHR0cENsaWVudC5jYXRjaCgpIC0gXCIgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGxldCBtc2cgPSBcIkFuIGVycm9yIG9jY3VycmVkIGNvbW11bmljYXRpbmcgd2l0aCB0aGUgR2VvUGxhdGZvcm0gQVBJXCI7XG4gICAgICAgICAgICAgICAgaWYoZXJyLmVycm9yICYmIGVyci5lcnJvci5lcnJvciAmJiBlcnIuZXJyb3IuZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICBtc2cgPSBlcnIuZXJyb3IuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVyci5lcnJvciAmJiBlcnIuZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICBtc2cgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZXJyLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbXNnID0gZXJyLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9KTtcbiAgICAgICAgKi9cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTkcySHR0cENsaWVudDtcbiJdfQ==