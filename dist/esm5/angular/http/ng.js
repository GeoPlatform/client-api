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
        else
            opts.responseType = 'json'; //default response type
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXIvIiwic291cmNlcyI6WyJodHRwL25nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQ1MsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQ2hELFlBQVksRUFDZixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHbkQ7SUFBNEIseUNBQVk7SUFNcEMsdUJBQW9CLElBQWdCLEVBQUUsT0FBYTtRQUFuRCxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUNqQjtRQUZtQixVQUFJLEdBQUosSUFBSSxDQUFZOztJQUVwQyxDQUFDO0lBRUQsK0JBQU8sR0FBUCxVQUFRLElBQWE7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0gseUNBQWlCLEdBQWpCLFVBQWtCLE9BQTJCO1FBRXpDLElBQUksSUFBSSxHQUFTLEVBQUUsQ0FBQztRQUVwQixJQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztTQUNwRDs7WUFBTSxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxDQUFFLHVCQUF1QjtRQUUzRCxJQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1NBQzlEO1FBRUQsSUFBRyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQzVCO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXRELDZDQUE2QztRQUM3QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBRyxLQUFLLEVBQUU7WUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDdkU7UUFFRCxJQUFHLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVixPQUFPLElBQUksV0FBVyxDQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzdFO2FBQU07WUFDSCxPQUFPLElBQUksV0FBVyxDQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNsRTtJQUVMLENBQUM7SUFFRDs7O09BR0c7SUFDSCwrQkFBTyxHQUFQLFVBQVEsT0FBMEI7UUFBbEMsaUJBMkJDO1FBekJHLElBQUksS0FBSyxHQUFTLElBQUksQ0FBQztRQUN2QixPQUFPLElBQUksT0FBTyxDQUFPLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFFckMsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2lCQUN6QixJQUFJLENBQ0QsR0FBRyxDQUFFLFVBQUMsS0FBcUI7Z0JBQ3ZCLElBQUksS0FBSyxZQUFZLFlBQVksRUFBRTtvQkFDL0IsT0FBUSxLQUEyQixDQUFDLElBQUksQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FDTDtpQkFDQSxTQUFTLENBQUUsVUFBQyxDQUFNLElBQU8sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDbEMsVUFBQyxHQUFXLElBQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNqQztnQkFDSSxJQUFHLEtBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1YsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUU7d0JBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuQixDQUFDLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtvQkFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2xCO1lBQ0wsQ0FBQyxDQUNKLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUFqRkQsQ0FBNEIsWUFBWSxHQWlGdkM7QUFHRDs7Ozs7R0FLRztBQUNILE9BQU8sRUFDSCxhQUFhLEVBQ2hCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICAgIEh0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyxcbiAgICBIdHRwUmVzcG9uc2UsIEh0dHBFdmVudCAvLywgSHR0cEVycm9yUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBHUEh0dHBDbGllbnQgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuXG5jbGFzcyBORzJIdHRwQ2xpZW50IGV4dGVuZHMgR1BIdHRwQ2xpZW50IHtcblxuICAgIC8vZm9yIHVzZSB0byBlbnN1cmUgZXhlY3V0ZWQgcmVxdWVzdHMgYXJlIGhhbmRsZWQgaW5zaWRlIGFuZ3VsYXIgem9uZVxuICAgIC8vIChzZWUgaXNzdWVzIHdpdGggT2JzZXJ2YWJsZS5zdWJzY3JpYmUoKSBhbmQgTmdab25lKVxuICAgIHByaXZhdGUgem9uZSA6IE5nWm9uZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICB9XG5cbiAgICBzZXRab25lKHpvbmUgOiBOZ1pvbmUpIHtcbiAgICAgICAgdGhpcy56b25lID0gem9uZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnM6IHtba2V5OnN0cmluZ106YW55fSkgOiBIdHRwUmVxdWVzdDxhbnk+IHtcblxuICAgICAgICBsZXQgb3B0cyA6IGFueSA9IHt9O1xuXG4gICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucyAmJiBvcHRpb25zLm9wdGlvbnMucmVzcG9uc2VUeXBlKSB7XG4gICAgICAgICAgICBvcHRzLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMub3B0aW9ucy5yZXNwb25zZVR5cGU7XG4gICAgICAgIH0gZWxzZSBvcHRzLnJlc3BvbnNlVHlwZSA9ICdqc29uJzsgIC8vZGVmYXVsdCByZXNwb25zZSB0eXBlXG5cbiAgICAgICAgaWYob3B0aW9ucy5wYXJhbXMpIHtcbiAgICAgICAgICAgIG9wdHMucGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoe2Zyb21PYmplY3Q6IG9wdGlvbnMucGFyYW1zfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgIG9wdHMuYm9keSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdHMuaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyhvcHRpb25zLmhlYWRlcnMgfHwge30pO1xuXG4gICAgICAgIC8vc2V0IGF1dGhvcml6YXRpb24gdG9rZW4gaWYgb25lIHdhcyBwcm92aWRlZFxuICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLmdldFRva2VuKCk7XG4gICAgICAgIGlmKHRva2VuKSB7XG4gICAgICAgICAgICBvcHRzLmhlYWRlcnMgPSBvcHRzLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0cy5ib2R5KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBSZXF1ZXN0PGFueT4ob3B0aW9ucy5tZXRob2QsIG9wdGlvbnMudXJsLCBvcHRzLmJvZHksIG9wdHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVxdWVzdDxhbnk+KG9wdGlvbnMubWV0aG9kLCBvcHRpb25zLnVybCwgb3B0cyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSByZXF1ZXN0IC0gQW5ndWxhciBIdHRwUmVxdWVzdCBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHJlc29sdmluZyB0aGUgcmVzcG9uc2Ugb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBleGVjdXRlKHJlcXVlc3QgOiBIdHRwUmVxdWVzdDxhbnk+KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgbGV0IHZhbHVlIDogYW55ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oIChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5odHRwLnJlcXVlc3QocmVxdWVzdClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCggKGV2ZW50OiBIdHRwRXZlbnQ8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZXZlbnQgYXMgSHR0cFJlc3BvbnNlPGFueT4pLmJvZHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCAodjogYW55KSA9PiB7IHZhbHVlID0gdjsgfSxcbiAgICAgICAgICAgICAgICAoZXJyIDogRXJyb3IpID0+IHsgcmVqZWN0KGVycik7IH0sXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnpvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLypcbkRvbid0IHVzZSAnZGVmYXVsdCcgd2hlbiBleHBvcnRpbmcgc29tZXRoaW5nIGJlaW5nIHByb3ZpZGVkIGJ5IHRoZSBtb2R1bGVcbm9yIGVsc2UgeW91IG1heSBnZXQgXCJJbnZhbGlkIHByb3ZpZGVyIGZvciB0aGUgbW9kdWxlXCIgd2hlbiBjb21waWxpbmcgdXNpbmcgQU9ULlxuU2VlOlxuaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDgxODM1OTQvaW52YWxpZC1wcm92aWRlci1mb3ItdGhlLW5nbW9kdWxlLXdoZW4tdXNpbmctYW90XG4gKi9cbmV4cG9ydCB7XG4gICAgTkcySHR0cENsaWVudFxufVxuIl19