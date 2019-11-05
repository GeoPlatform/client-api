import * as tslib_1 from "tslib";
import { HttpRequest, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GPHttpClient } from '@geoplatform/client';
var NG2HttpClient = /** @class */ (function (_super) {
    tslib_1.__extends(NG2HttpClient, _super);
    function NG2HttpClient(http, options) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        return _this;
    }
    NG2HttpClient.prototype.setZone = function (zone) {
        this.zone = zone;
    };
    /**
     *
     */
    NG2HttpClient.prototype.createRequestOpts = function (options) {
        var opts = {};
        if (options.options && options.options.responseType) {
            opts.responseType = options.options.responseType;
        }
        else if (options.responseType) {
            opts.responseType = options.responseType;
        }
        else {
            opts.responseType = 'json'; //default response type
        }
        if (options.params) {
            opts.params = new HttpParams({ fromObject: options.params });
        }
        if (options.data) {
            opts.body = options.data;
        }
        opts.headers = new HttpHeaders(options.headers || {});
        //set authorization token if one was provided
        var token = this.getToken();
        if (token) {
            opts.headers = opts.headers.set('Authorization', 'Bearer ' + token);
        }
        var cookie = this.getCookie();
        if (cookie) {
            opts.headers = opts.headers.set('Cookie', this.authCookieName + '=' + cookie);
        }
        if (opts.body) {
            return new HttpRequest(options.method, options.url, opts.body, opts);
        }
        else {
            return new HttpRequest(options.method, options.url, opts);
        }
    };
    /**
     * @param request - Angular HttpRequest object
     * @return resolving the response or an error
     */
    NG2HttpClient.prototype.execute = function (request) {
        var _this = this;
        var value = null;
        return new Promise(function (resolve, reject) {
            _this.http.request(request)
                .pipe(map(function (event) {
                if (event instanceof HttpResponse) {
                    return event.body;
                }
                return {};
            }))
                .subscribe(function (v) {
                value = v;
            }, function (err) {
                if (err instanceof HttpErrorResponse) {
                    reject(err.error);
                }
                else {
                    reject(err);
                }
            }, function () {
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
    };
    return NG2HttpClient;
}(GPHttpClient));
/*
Don't use 'default' when exporting something being provided by the module
or else you may get "Invalid provider for the module" when compiling using AOT.
See:
https://stackoverflow.com/questions/48183594/invalid-provider-for-the-ngmodule-when-using-aot
 */
export { NG2HttpClient };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXIvIiwic291cmNlcyI6WyJodHRwL25nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQ1MsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQ2hELFlBQVksRUFBYSxpQkFBaUIsRUFDN0MsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR25EO0lBQTRCLHlDQUFZO0lBTXBDLHVCQUFvQixJQUFnQixFQUFFLE9BQWE7UUFBbkQsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FDakI7UUFGbUIsVUFBSSxHQUFKLElBQUksQ0FBWTs7SUFFcEMsQ0FBQztJQUVELCtCQUFPLEdBQVAsVUFBUSxJQUFhO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNILHlDQUFpQixHQUFqQixVQUFrQixPQUEyQjtRQUV6QyxJQUFJLElBQUksR0FBUyxFQUFFLENBQUM7UUFFcEIsSUFBRyxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQ2hELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7U0FDcEQ7YUFBTSxJQUFHLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1NBQzVDO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxDQUFFLHVCQUF1QjtTQUN2RDtRQUVELElBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7U0FDOUQ7UUFFRCxJQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7UUFFdEQsNkNBQTZDO1FBQzdDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFHLEtBQUssRUFBRTtZQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUN2RTtRQUNELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixJQUFHLE1BQU0sRUFBRTtZQUNQLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1NBQ2pGO1FBRUQsSUFBRyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1YsT0FBTyxJQUFJLFdBQVcsQ0FBTSxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM3RTthQUFNO1lBQ0gsT0FBTyxJQUFJLFdBQVcsQ0FBTSxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbEU7SUFFTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsK0JBQU8sR0FBUCxVQUFRLE9BQTBCO1FBQWxDLGlCQW9DQztRQWxDRyxJQUFJLEtBQUssR0FBUyxJQUFJLENBQUM7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBTyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBRXJDLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztpQkFDekIsSUFBSSxDQUNELEdBQUcsQ0FBRSxVQUFDLEtBQXFCO2dCQUN2QixJQUFJLEtBQUssWUFBWSxZQUFZLEVBQUU7b0JBQy9CLE9BQVEsS0FBMkIsQ0FBQyxJQUFJLENBQUM7aUJBQzVDO2dCQUNELE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQ0w7aUJBQ0EsU0FBUyxDQUNOLFVBQUMsQ0FBTTtnQkFDSCxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxFQUNELFVBQUMsR0FBVztnQkFDUixJQUFJLEdBQUcsWUFBWSxpQkFBaUIsRUFBRTtvQkFDbEMsTUFBTSxDQUFHLEdBQXlCLENBQUMsS0FBSyxDQUFFLENBQUM7aUJBQzlDO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDZjtZQUNMLENBQUMsRUFDRDtnQkFDSSxJQUFHLEtBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1YsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUU7d0JBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuQixDQUFDLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtvQkFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2xCO1lBQ0wsQ0FBQyxDQUNKLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUFsR0QsQ0FBNEIsWUFBWSxHQWtHdkM7QUFHRDs7Ozs7R0FLRztBQUNILE9BQU8sRUFDSCxhQUFhLEVBQ2hCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICAgIEh0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyxcbiAgICBIdHRwUmVzcG9uc2UsIEh0dHBFdmVudCwgSHR0cEVycm9yUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBHUEh0dHBDbGllbnQgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuXG5jbGFzcyBORzJIdHRwQ2xpZW50IGV4dGVuZHMgR1BIdHRwQ2xpZW50IHtcblxuICAgIC8vZm9yIHVzZSB0byBlbnN1cmUgZXhlY3V0ZWQgcmVxdWVzdHMgYXJlIGhhbmRsZWQgaW5zaWRlIGFuZ3VsYXIgem9uZVxuICAgIC8vIChzZWUgaXNzdWVzIHdpdGggT2JzZXJ2YWJsZS5zdWJzY3JpYmUoKSBhbmQgTmdab25lKVxuICAgIHByaXZhdGUgem9uZSA6IE5nWm9uZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICB9XG5cbiAgICBzZXRab25lKHpvbmUgOiBOZ1pvbmUpIHtcbiAgICAgICAgdGhpcy56b25lID0gem9uZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnM6IHtba2V5OnN0cmluZ106YW55fSkgOiBIdHRwUmVxdWVzdDxhbnk+IHtcblxuICAgICAgICBsZXQgb3B0cyA6IGFueSA9IHt9O1xuXG4gICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucyAmJiBvcHRpb25zLm9wdGlvbnMucmVzcG9uc2VUeXBlKSB7XG4gICAgICAgICAgICBvcHRzLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMub3B0aW9ucy5yZXNwb25zZVR5cGU7XG4gICAgICAgIH0gZWxzZSBpZihvcHRpb25zLnJlc3BvbnNlVHlwZSkge1xuICAgICAgICAgICAgb3B0cy5yZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdHMucmVzcG9uc2VUeXBlID0gJ2pzb24nOyAgLy9kZWZhdWx0IHJlc3BvbnNlIHR5cGVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICBvcHRzLnBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKHtmcm9tT2JqZWN0OiBvcHRpb25zLnBhcmFtc30pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICBvcHRzLmJvZHkgPSBvcHRpb25zLmRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzIHx8IHt9KTtcblxuICAgICAgICAvL3NldCBhdXRob3JpemF0aW9uIHRva2VuIGlmIG9uZSB3YXMgcHJvdmlkZWRcbiAgICAgICAgbGV0IHRva2VuID0gdGhpcy5nZXRUb2tlbigpO1xuICAgICAgICBpZih0b2tlbikge1xuICAgICAgICAgICAgb3B0cy5oZWFkZXJzID0gb3B0cy5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29va2llID0gdGhpcy5nZXRDb29raWUoKTtcbiAgICAgICAgaWYoY29va2llKSB7XG4gICAgICAgICAgICBvcHRzLmhlYWRlcnMgPSBvcHRzLmhlYWRlcnMuc2V0KCdDb29raWUnLCB0aGlzLmF1dGhDb29raWVOYW1lICsgJz0nICsgY29va2llKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9wdHMuYm9keSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVxdWVzdDxhbnk+KG9wdGlvbnMubWV0aG9kLCBvcHRpb25zLnVybCwgb3B0cy5ib2R5LCBvcHRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFJlcXVlc3Q8YW55PihvcHRpb25zLm1ldGhvZCwgb3B0aW9ucy51cmwsIG9wdHMpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcmVxdWVzdCAtIEFuZ3VsYXIgSHR0cFJlcXVlc3Qgb2JqZWN0XG4gICAgICogQHJldHVybiByZXNvbHZpbmcgdGhlIHJlc3BvbnNlIG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZXhlY3V0ZShyZXF1ZXN0IDogSHR0cFJlcXVlc3Q8YW55PikgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGxldCB2YWx1ZSA6IGFueSA9IG51bGw7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuaHR0cC5yZXF1ZXN0KHJlcXVlc3QpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoIChldmVudDogSHR0cEV2ZW50PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGV2ZW50IGFzIEh0dHBSZXNwb25zZTxhbnk+KS5ib2R5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnIgOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCggKGVyciBhcyBIdHRwRXJyb3JSZXNwb25zZSkuZXJyb3IgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuem9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1biggKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vKlxuRG9uJ3QgdXNlICdkZWZhdWx0JyB3aGVuIGV4cG9ydGluZyBzb21ldGhpbmcgYmVpbmcgcHJvdmlkZWQgYnkgdGhlIG1vZHVsZVxub3IgZWxzZSB5b3UgbWF5IGdldCBcIkludmFsaWQgcHJvdmlkZXIgZm9yIHRoZSBtb2R1bGVcIiB3aGVuIGNvbXBpbGluZyB1c2luZyBBT1QuXG5TZWU6XG5odHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80ODE4MzU5NC9pbnZhbGlkLXByb3ZpZGVyLWZvci10aGUtbmdtb2R1bGUtd2hlbi11c2luZy1hb3RcbiAqL1xuZXhwb3J0IHtcbiAgICBORzJIdHRwQ2xpZW50XG59XG4iXX0=