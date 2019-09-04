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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXIvIiwic291cmNlcyI6WyJodHRwL25nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQ1MsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQ2hELFlBQVksRUFDZixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHbkQ7SUFBNEIseUNBQVk7SUFNcEMsdUJBQW9CLElBQWdCLEVBQUUsT0FBYTtRQUFuRCxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUNqQjtRQUZtQixVQUFJLEdBQUosSUFBSSxDQUFZOztJQUVwQyxDQUFDO0lBRUQsK0JBQU8sR0FBUCxVQUFRLElBQWE7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0gseUNBQWlCLEdBQWpCLFVBQWtCLE9BQTJCO1FBRXpDLElBQUksSUFBSSxHQUFTLEVBQUUsQ0FBQztRQUVwQixJQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztTQUNwRDthQUFNLElBQUcsT0FBTyxDQUFDLFlBQVksRUFBRTtZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7U0FDNUM7YUFBTTtZQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLENBQUUsdUJBQXVCO1NBQ3ZEO1FBRUQsSUFBRyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztTQUM5RDtRQUVELElBQUcsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztTQUM1QjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztRQUV0RCw2Q0FBNkM7UUFDN0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUcsS0FBSyxFQUFFO1lBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO1NBQ3ZFO1FBRUQsSUFBRyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1YsT0FBTyxJQUFJLFdBQVcsQ0FBTSxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM3RTthQUFNO1lBQ0gsT0FBTyxJQUFJLFdBQVcsQ0FBTSxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbEU7SUFFTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsK0JBQU8sR0FBUCxVQUFRLE9BQTBCO1FBQWxDLGlCQTJCQztRQXpCRyxJQUFJLEtBQUssR0FBUyxJQUFJLENBQUM7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBTyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBRXJDLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztpQkFDekIsSUFBSSxDQUNELEdBQUcsQ0FBRSxVQUFDLEtBQXFCO2dCQUN2QixJQUFJLEtBQUssWUFBWSxZQUFZLEVBQUU7b0JBQy9CLE9BQVEsS0FBMkIsQ0FBQyxJQUFJLENBQUM7aUJBQzVDO2dCQUNELE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQ0w7aUJBQ0EsU0FBUyxDQUFFLFVBQUMsQ0FBTSxJQUFPLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2xDLFVBQUMsR0FBVyxJQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakM7Z0JBQ0ksSUFBRyxLQUFJLENBQUMsSUFBSSxFQUFFO29CQUNWLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFFO3dCQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbkIsQ0FBQyxDQUFDLENBQUM7aUJBQ047cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsQjtZQUNMLENBQUMsQ0FDSixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBckZELENBQTRCLFlBQVksR0FxRnZDO0FBR0Q7Ozs7O0dBS0c7QUFDSCxPQUFPLEVBQ0gsYUFBYSxFQUNoQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBIdHRwQ2xpZW50LCBIdHRwUmVxdWVzdCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsXG4gICAgSHR0cFJlc3BvbnNlLCBIdHRwRXZlbnQgLy8sIEh0dHBFcnJvclJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgR1BIdHRwQ2xpZW50IH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuY2xhc3MgTkcySHR0cENsaWVudCBleHRlbmRzIEdQSHR0cENsaWVudCB7XG5cbiAgICAvL2ZvciB1c2UgdG8gZW5zdXJlIGV4ZWN1dGVkIHJlcXVlc3RzIGFyZSBoYW5kbGVkIGluc2lkZSBhbmd1bGFyIHpvbmVcbiAgICAvLyAoc2VlIGlzc3VlcyB3aXRoIE9ic2VydmFibGUuc3Vic2NyaWJlKCkgYW5kIE5nWm9uZSlcbiAgICBwcml2YXRlIHpvbmUgOiBOZ1pvbmU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgc2V0Wm9uZSh6b25lIDogTmdab25lKSB7XG4gICAgICAgIHRoaXMuem9uZSA9IHpvbmU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zOiB7W2tleTpzdHJpbmddOmFueX0pIDogSHR0cFJlcXVlc3Q8YW55PiB7XG5cbiAgICAgICAgbGV0IG9wdHMgOiBhbnkgPSB7fTtcblxuICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMgJiYgb3B0aW9ucy5vcHRpb25zLnJlc3BvbnNlVHlwZSkge1xuICAgICAgICAgICAgb3B0cy5yZXNwb25zZVR5cGUgPSBvcHRpb25zLm9wdGlvbnMucmVzcG9uc2VUeXBlO1xuICAgICAgICB9IGVsc2UgaWYob3B0aW9ucy5yZXNwb25zZVR5cGUpIHtcbiAgICAgICAgICAgIG9wdHMucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5yZXNwb25zZVR5cGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRzLnJlc3BvbnNlVHlwZSA9ICdqc29uJzsgIC8vZGVmYXVsdCByZXNwb25zZSB0eXBlXG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRpb25zLnBhcmFtcykge1xuICAgICAgICAgICAgb3B0cy5wYXJhbXMgPSBuZXcgSHR0cFBhcmFtcyh7ZnJvbU9iamVjdDogb3B0aW9ucy5wYXJhbXN9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9wdGlvbnMuZGF0YSkge1xuICAgICAgICAgICAgb3B0cy5ib2R5ID0gb3B0aW9ucy5kYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0cy5oZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyB8fCB7fSk7XG5cbiAgICAgICAgLy9zZXQgYXV0aG9yaXphdGlvbiB0b2tlbiBpZiBvbmUgd2FzIHByb3ZpZGVkXG4gICAgICAgIGxldCB0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKTtcbiAgICAgICAgaWYodG9rZW4pIHtcbiAgICAgICAgICAgIG9wdHMuaGVhZGVycyA9IG9wdHMuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRzLmJvZHkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFJlcXVlc3Q8YW55PihvcHRpb25zLm1ldGhvZCwgb3B0aW9ucy51cmwsIG9wdHMuYm9keSwgb3B0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBSZXF1ZXN0PGFueT4ob3B0aW9ucy5tZXRob2QsIG9wdGlvbnMudXJsLCBvcHRzKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHJlcXVlc3QgLSBBbmd1bGFyIEh0dHBSZXF1ZXN0IG9iamVjdFxuICAgICAqIEByZXR1cm4gcmVzb2x2aW5nIHRoZSByZXNwb25zZSBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGV4ZWN1dGUocmVxdWVzdCA6IEh0dHBSZXF1ZXN0PGFueT4pIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBsZXQgdmFsdWUgOiBhbnkgPSBudWxsO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PiggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmh0dHAucmVxdWVzdChyZXF1ZXN0KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKCAoZXZlbnQ6IEh0dHBFdmVudDxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChldmVudCBhcyBIdHRwUmVzcG9uc2U8YW55PikuYm9keTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoICh2OiBhbnkpID0+IHsgdmFsdWUgPSB2OyB9LFxuICAgICAgICAgICAgICAgIChlcnIgOiBFcnJvcikgPT4geyByZWplY3QoZXJyKTsgfSxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuem9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1biggKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vKlxuRG9uJ3QgdXNlICdkZWZhdWx0JyB3aGVuIGV4cG9ydGluZyBzb21ldGhpbmcgYmVpbmcgcHJvdmlkZWQgYnkgdGhlIG1vZHVsZVxub3IgZWxzZSB5b3UgbWF5IGdldCBcIkludmFsaWQgcHJvdmlkZXIgZm9yIHRoZSBtb2R1bGVcIiB3aGVuIGNvbXBpbGluZyB1c2luZyBBT1QuXG5TZWU6XG5odHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80ODE4MzU5NC9pbnZhbGlkLXByb3ZpZGVyLWZvci10aGUtbmdtb2R1bGUtd2hlbi11c2luZy1hb3RcbiAqL1xuZXhwb3J0IHtcbiAgICBORzJIdHRwQ2xpZW50XG59XG4iXX0=