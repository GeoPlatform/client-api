/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { HttpRequest, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GPHttpClient } from '@geoplatform/client';
var NG2HttpClient = /** @class */ (function (_super) {
    tslib_1.__extends(NG2HttpClient, _super);
    function NG2HttpClient(http, options) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        return _this;
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    NG2HttpClient.prototype.setZone = /**
     * @param {?} zone
     * @return {?}
     */
    function (zone) {
        this.zone = zone;
    };
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
        /** @type {?} */
        var token = this.getToken();
        if (token) {
            opts.headers.set('Authorization', 'Bearer ' + token);
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
        var _this = this;
        /** @type {?} */
        var value = null;
        return new Promise(function (resolve, reject) {
            _this.http.request(request)
                .pipe(map(function (event) {
                if (event instanceof HttpResponse) {
                    return (/** @type {?} */ (event)).body;
                }
                return {};
            }))
                .subscribe(function (v) { value = v; }, function (err) { reject(err); }, function () {
                if (_this.zone) {
                    _this.zone.run(function () {
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
    };
    return NG2HttpClient;
}(GPHttpClient));
if (false) {
    /** @type {?} */
    NG2HttpClient.prototype.zone;
    /** @type {?} */
    NG2HttpClient.prototype.http;
}
export { NG2HttpClient };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXIvIiwic291cmNlcyI6WyJodHRwL25nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUNTLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUNoRCxZQUFZLEVBQ2YsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR25ELElBQUE7SUFBNEIseUNBQVk7SUFNcEMsdUJBQW9CLElBQWdCLEVBQUUsT0FBYTtRQUFuRCxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUNqQjtRQUZtQixVQUFJLEdBQUosSUFBSSxDQUFZOztLQUVuQzs7Ozs7SUFFRCwrQkFBTzs7OztJQUFQLFVBQVEsSUFBYTtRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztLQUNwQjtJQUVEOztPQUVHOzs7Ozs7SUFDSCx5Q0FBaUI7Ozs7O0lBQWpCLFVBQWtCLE9BQTJCOztRQUV6QyxJQUFJLElBQUksR0FBUyxFQUFFLENBQUM7UUFFcEIsSUFBRyxPQUFPLGVBQVksT0FBTyxZQUFTLFlBQVksRUFBRTtZQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sWUFBUyxZQUFZLENBQUM7U0FDcEQ7O1lBQU0sSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7UUFFbEMsSUFBRyxPQUFPLFlBQVM7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE9BQU8sVUFBTyxFQUFDLENBQUMsQ0FBQztTQUM5RDtRQUVELElBQUcsT0FBTyxVQUFPO1lBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLFFBQUssQ0FBQztTQUM1QjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQzs7UUFHakMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUcsS0FBSyxFQUFFO1lBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUN4RDtRQUVELElBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNWLE9BQU8sSUFBSSxXQUFXLENBQU0sT0FBTyxZQUFTLE9BQU8sU0FBTSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzdFO2FBQU07WUFDSCxPQUFPLElBQUksV0FBVyxDQUFNLE9BQU8sWUFBUyxPQUFPLFNBQU0sSUFBSSxDQUFDLENBQUM7U0FDbEU7S0FFSjtJQUVEOzs7T0FHRzs7Ozs7SUFDSCwrQkFBTzs7OztJQUFQLFVBQVEsT0FBMEI7UUFBbEMsaUJBZ0RDOztRQTlDRyxJQUFJLEtBQUssR0FBUyxJQUFJLENBQUM7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBTyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBRXJDLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztpQkFDekIsSUFBSSxDQUNELEdBQUcsQ0FBRSxVQUFDLEtBQXFCO2dCQUN2QixJQUFJLEtBQUssWUFBWSxZQUFZLEVBQUU7b0JBQy9CLE9BQU8sbUJBQUMsS0FBMEIsRUFBQyxDQUFDLElBQUksQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxFQUFFLENBQUM7YUFDYixDQUFDLENBQ0w7aUJBQ0EsU0FBUyxDQUFFLFVBQUMsQ0FBTSxJQUFPLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxFQUNsQyxVQUFDLEdBQVcsSUFBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUNqQztnQkFDSSxJQUFHLEtBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1YsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUU7d0JBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNsQixDQUFDLENBQUM7aUJBQ047cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsQjthQUNKLENBQ0osQ0FBQztTQUNMLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FzQk47d0JBaEhMO0VBVzRCLFlBQVksRUF1R3ZDLENBQUE7Ozs7Ozs7QUFFRCxPQUFPLEVBQ0gsYUFBYSxFQUNoQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBIdHRwQ2xpZW50LCBIdHRwUmVxdWVzdCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsXG4gICAgSHR0cFJlc3BvbnNlLCBIdHRwRXZlbnQgLy8sIEh0dHBFcnJvclJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgR1BIdHRwQ2xpZW50IH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuY2xhc3MgTkcySHR0cENsaWVudCBleHRlbmRzIEdQSHR0cENsaWVudCB7XG5cbiAgICAvL2ZvciB1c2UgdG8gZW5zdXJlIGV4ZWN1dGVkIHJlcXVlc3RzIGFyZSBoYW5kbGVkIGluc2lkZSBhbmd1bGFyIHpvbmVcbiAgICAvLyAoc2VlIGlzc3VlcyB3aXRoIE9ic2VydmFibGUuc3Vic2NyaWJlKCkgYW5kIE5nWm9uZSlcbiAgICBwcml2YXRlIHpvbmUgOiBOZ1pvbmU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgc2V0Wm9uZSh6b25lIDogTmdab25lKSB7XG4gICAgICAgIHRoaXMuem9uZSA9IHpvbmU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zOiB7W2tleTpzdHJpbmddOmFueX0pIDogSHR0cFJlcXVlc3Q8YW55PiB7XG5cbiAgICAgICAgbGV0IG9wdHMgOiBhbnkgPSB7fTtcblxuICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMgJiYgb3B0aW9ucy5vcHRpb25zLnJlc3BvbnNlVHlwZSkge1xuICAgICAgICAgICAgb3B0cy5yZXNwb25zZVR5cGUgPSBvcHRpb25zLm9wdGlvbnMucmVzcG9uc2VUeXBlO1xuICAgICAgICB9IGVsc2Ugb3B0cy5yZXNwb25zZVR5cGUgPSAnanNvbic7ICAvL2RlZmF1bHQgcmVzcG9uc2UgdHlwZVxuXG4gICAgICAgIGlmKG9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICBvcHRzLnBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKHtmcm9tT2JqZWN0OiBvcHRpb25zLnBhcmFtc30pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICBvcHRzLmJvZHkgPSBvcHRpb25zLmRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcblxuICAgICAgICAvL3NldCBhdXRob3JpemF0aW9uIHRva2VuIGlmIG9uZSB3YXMgcHJvdmlkZWRcbiAgICAgICAgbGV0IHRva2VuID0gdGhpcy5nZXRUb2tlbigpO1xuICAgICAgICBpZih0b2tlbikge1xuICAgICAgICAgICAgb3B0cy5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9wdHMuYm9keSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVxdWVzdDxhbnk+KG9wdGlvbnMubWV0aG9kLCBvcHRpb25zLnVybCwgb3B0cy5ib2R5LCBvcHRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFJlcXVlc3Q8YW55PihvcHRpb25zLm1ldGhvZCwgb3B0aW9ucy51cmwsIG9wdHMpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcmVxdWVzdCAtIEFuZ3VsYXIgSHR0cFJlcXVlc3Qgb2JqZWN0XG4gICAgICogQHJldHVybiByZXNvbHZpbmcgdGhlIHJlc3BvbnNlIG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZXhlY3V0ZShyZXF1ZXN0IDogSHR0cFJlcXVlc3Q8YW55PikgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGxldCB2YWx1ZSA6IGFueSA9IG51bGw7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuaHR0cC5yZXF1ZXN0KHJlcXVlc3QpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoIChldmVudDogSHR0cEV2ZW50PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGV2ZW50IGFzIEh0dHBSZXNwb25zZTxhbnk+KS5ib2R5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSggKHY6IGFueSkgPT4geyB2YWx1ZSA9IHY7IH0sXG4gICAgICAgICAgICAgICAgKGVyciA6IEVycm9yKSA9PiB7IHJlamVjdChlcnIpOyB9LFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy56b25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvKlxuICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgLnRoZW4oIChyZXN1bHQpID0+IFByb21pc2UucmVzb2x2ZShyZXN1bHQpKVxuICAgICAgICAuY2F0Y2goIChlcnIgOiBhbnkpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTkcySHR0cENsaWVudC5jYXRjaCgpIC0gXCIgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGxldCBtc2cgPSBcIkFuIGVycm9yIG9jY3VycmVkIGNvbW11bmljYXRpbmcgd2l0aCB0aGUgR2VvUGxhdGZvcm0gQVBJXCI7XG4gICAgICAgICAgICAgICAgaWYoZXJyLmVycm9yICYmIGVyci5lcnJvci5lcnJvciAmJiBlcnIuZXJyb3IuZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICBtc2cgPSBlcnIuZXJyb3IuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVyci5lcnJvciAmJiBlcnIuZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICBtc2cgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZXJyLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbXNnID0gZXJyLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9KTtcbiAgICAgICAgKi9cbiAgICB9XG5cbn1cblxuZXhwb3J0IHtcbiAgICBORzJIdHRwQ2xpZW50XG59XG4iXX0=