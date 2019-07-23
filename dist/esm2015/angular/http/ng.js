/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HttpRequest, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
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
                .pipe(map((event) => {
                if (event instanceof HttpResponse) {
                    return (/** @type {?} */ (event)).body;
                }
                return {};
            }))
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXIvIiwic291cmNlcyI6WyJodHRwL25nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQ1MsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQ2hELFlBQVksRUFDZixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHbkQsbUJBQW9CLFNBQVEsWUFBWTs7Ozs7SUFNcEMsWUFBb0IsSUFBZ0IsRUFBRSxPQUFhO1FBQy9DLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURDLFNBQUksR0FBSixJQUFJLENBQVk7S0FFbkM7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQWE7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7S0FDcEI7Ozs7OztJQUtELGlCQUFpQixDQUFDLE9BQTJCOztRQUV6QyxJQUFJLElBQUksR0FBUyxFQUFFLENBQUM7UUFFcEIsSUFBRyxPQUFPLGVBQVksT0FBTyxZQUFTLFlBQVksRUFBRTtZQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sWUFBUyxZQUFZLENBQUM7U0FDcEQ7O1lBQU0sSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7UUFFbEMsSUFBRyxPQUFPLFlBQVM7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE9BQU8sVUFBTyxFQUFDLENBQUMsQ0FBQztTQUM5RDtRQUVELElBQUcsT0FBTyxVQUFPO1lBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLFFBQUssQ0FBQztTQUM1QjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQzs7UUFHakMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUcsS0FBSyxFQUFFO1lBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUN4RDtRQUVELElBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNWLE9BQU8sSUFBSSxXQUFXLENBQU0sT0FBTyxZQUFTLE9BQU8sU0FBTSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzdFO2FBQU07WUFDSCxPQUFPLElBQUksV0FBVyxDQUFNLE9BQU8sWUFBUyxPQUFPLFNBQU0sSUFBSSxDQUFDLENBQUM7U0FDbEU7S0FFSjs7Ozs7SUFNRCxPQUFPLENBQUMsT0FBMEI7O1FBRTlCLElBQUksS0FBSyxHQUFTLElBQUksQ0FBQztRQUN2QixPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBRXpDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztpQkFDekIsSUFBSSxDQUNELEdBQUcsQ0FBRSxDQUFDLEtBQXFCLEVBQUUsRUFBRTtnQkFDM0IsSUFBSSxLQUFLLFlBQVksWUFBWSxFQUFFO29CQUMvQixPQUFPLG1CQUFDLEtBQTBCLEVBQUMsQ0FBQyxJQUFJLENBQUM7aUJBQzVDO2dCQUNELE9BQU8sRUFBRSxDQUFDO2FBQ2IsQ0FBQyxDQUNMO2lCQUNBLFNBQVMsQ0FBRSxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQ2xDLENBQUMsR0FBVyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUNqQyxHQUFHLEVBQUU7Z0JBQ0QsSUFBRyxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsRUFBRTt3QkFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNsQixDQUFDLENBQUM7aUJBQ047cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsQjthQUNKLENBQ0osQ0FBQztTQUNMLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FzQk47Q0FFSjs7Ozs7OztBQUVELGVBQWUsYUFBYSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBIdHRwQ2xpZW50LCBIdHRwUmVxdWVzdCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsXG4gICAgSHR0cFJlc3BvbnNlLCBIdHRwRXZlbnQgLy8sIEh0dHBFcnJvclJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgR1BIdHRwQ2xpZW50IH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuY2xhc3MgTkcySHR0cENsaWVudCBleHRlbmRzIEdQSHR0cENsaWVudCB7XG5cbiAgICAvL2ZvciB1c2UgdG8gZW5zdXJlIGV4ZWN1dGVkIHJlcXVlc3RzIGFyZSBoYW5kbGVkIGluc2lkZSBhbmd1bGFyIHpvbmVcbiAgICAvLyAoc2VlIGlzc3VlcyB3aXRoIE9ic2VydmFibGUuc3Vic2NyaWJlKCkgYW5kIE5nWm9uZSlcbiAgICBwcml2YXRlIHpvbmUgOiBOZ1pvbmU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgc2V0Wm9uZSh6b25lIDogTmdab25lKSB7XG4gICAgICAgIHRoaXMuem9uZSA9IHpvbmU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zOiB7W2tleTpzdHJpbmddOmFueX0pIDogSHR0cFJlcXVlc3Q8YW55PiB7XG5cbiAgICAgICAgbGV0IG9wdHMgOiBhbnkgPSB7fTtcblxuICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMgJiYgb3B0aW9ucy5vcHRpb25zLnJlc3BvbnNlVHlwZSkge1xuICAgICAgICAgICAgb3B0cy5yZXNwb25zZVR5cGUgPSBvcHRpb25zLm9wdGlvbnMucmVzcG9uc2VUeXBlO1xuICAgICAgICB9IGVsc2Ugb3B0cy5yZXNwb25zZVR5cGUgPSAnanNvbic7ICAvL2RlZmF1bHQgcmVzcG9uc2UgdHlwZVxuXG4gICAgICAgIGlmKG9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICBvcHRzLnBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKHtmcm9tT2JqZWN0OiBvcHRpb25zLnBhcmFtc30pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICBvcHRzLmJvZHkgPSBvcHRpb25zLmRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcblxuICAgICAgICAvL3NldCBhdXRob3JpemF0aW9uIHRva2VuIGlmIG9uZSB3YXMgcHJvdmlkZWRcbiAgICAgICAgbGV0IHRva2VuID0gdGhpcy5nZXRUb2tlbigpO1xuICAgICAgICBpZih0b2tlbikge1xuICAgICAgICAgICAgb3B0cy5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9wdHMuYm9keSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVxdWVzdDxhbnk+KG9wdGlvbnMubWV0aG9kLCBvcHRpb25zLnVybCwgb3B0cy5ib2R5LCBvcHRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFJlcXVlc3Q8YW55PihvcHRpb25zLm1ldGhvZCwgb3B0aW9ucy51cmwsIG9wdHMpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcmVxdWVzdCAtIEFuZ3VsYXIgSHR0cFJlcXVlc3Qgb2JqZWN0XG4gICAgICogQHJldHVybiByZXNvbHZpbmcgdGhlIHJlc3BvbnNlIG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZXhlY3V0ZShyZXF1ZXN0IDogSHR0cFJlcXVlc3Q8YW55PikgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGxldCB2YWx1ZSA6IGFueSA9IG51bGw7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuaHR0cC5yZXF1ZXN0KHJlcXVlc3QpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoIChldmVudDogSHR0cEV2ZW50PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGV2ZW50IGFzIEh0dHBSZXNwb25zZTxhbnk+KS5ib2R5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSggKHY6IGFueSkgPT4geyB2YWx1ZSA9IHY7IH0sXG4gICAgICAgICAgICAgICAgKGVyciA6IEVycm9yKSA9PiB7IHJlamVjdChlcnIpOyB9LFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy56b25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvKlxuICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgLnRoZW4oIChyZXN1bHQpID0+IFByb21pc2UucmVzb2x2ZShyZXN1bHQpKVxuICAgICAgICAuY2F0Y2goIChlcnIgOiBhbnkpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTkcySHR0cENsaWVudC5jYXRjaCgpIC0gXCIgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGxldCBtc2cgPSBcIkFuIGVycm9yIG9jY3VycmVkIGNvbW11bmljYXRpbmcgd2l0aCB0aGUgR2VvUGxhdGZvcm0gQVBJXCI7XG4gICAgICAgICAgICAgICAgaWYoZXJyLmVycm9yICYmIGVyci5lcnJvci5lcnJvciAmJiBlcnIuZXJyb3IuZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICBtc2cgPSBlcnIuZXJyb3IuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVyci5lcnJvciAmJiBlcnIuZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICBtc2cgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZXJyLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbXNnID0gZXJyLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9KTtcbiAgICAgICAgKi9cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTkcySHR0cENsaWVudDtcbiJdfQ==