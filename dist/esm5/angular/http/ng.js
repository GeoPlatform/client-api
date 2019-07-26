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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXIvIiwic291cmNlcyI6WyJodHRwL25nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUNTLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUNoRCxZQUFZLEVBQ2YsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR25ELElBQUE7SUFBNEIseUNBQVk7SUFNcEMsdUJBQW9CLElBQWdCLEVBQUUsT0FBYTtRQUFuRCxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUNqQjtRQUZtQixVQUFJLEdBQUosSUFBSSxDQUFZOztLQUVuQzs7Ozs7SUFFRCwrQkFBTzs7OztJQUFQLFVBQVEsSUFBYTtRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztLQUNwQjtJQUVEOztPQUVHOzs7Ozs7SUFDSCx5Q0FBaUI7Ozs7O0lBQWpCLFVBQWtCLE9BQTJCOztRQUV6QyxJQUFJLElBQUksR0FBUyxFQUFFLENBQUM7UUFFcEIsSUFBRyxPQUFPLGVBQVksT0FBTyxZQUFTLFlBQVksRUFBRTtZQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sWUFBUyxZQUFZLENBQUM7U0FDcEQ7O1lBQU0sSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7UUFFbEMsSUFBRyxPQUFPLFlBQVM7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE9BQU8sVUFBTyxFQUFDLENBQUMsQ0FBQztTQUM5RDtRQUVELElBQUcsT0FBTyxVQUFPO1lBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLFFBQUssQ0FBQztTQUM1QjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQzs7UUFHakMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUcsS0FBSyxFQUFFO1lBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUN4RDtRQUVELElBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNWLE9BQU8sSUFBSSxXQUFXLENBQU0sT0FBTyxZQUFTLE9BQU8sU0FBTSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzdFO2FBQU07WUFDSCxPQUFPLElBQUksV0FBVyxDQUFNLE9BQU8sWUFBUyxPQUFPLFNBQU0sSUFBSSxDQUFDLENBQUM7U0FDbEU7S0FFSjtJQUVEOzs7T0FHRzs7Ozs7SUFDSCwrQkFBTzs7OztJQUFQLFVBQVEsT0FBMEI7UUFBbEMsaUJBMkJDOztRQXpCRyxJQUFJLEtBQUssR0FBUyxJQUFJLENBQUM7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBTyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBRXJDLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztpQkFDekIsSUFBSSxDQUNELEdBQUcsQ0FBRSxVQUFDLEtBQXFCO2dCQUN2QixJQUFJLEtBQUssWUFBWSxZQUFZLEVBQUU7b0JBQy9CLE9BQU8sbUJBQUMsS0FBMEIsRUFBQyxDQUFDLElBQUksQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxFQUFFLENBQUM7YUFDYixDQUFDLENBQ0w7aUJBQ0EsU0FBUyxDQUFFLFVBQUMsQ0FBTSxJQUFPLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxFQUNsQyxVQUFDLEdBQVcsSUFBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUNqQztnQkFDSSxJQUFHLEtBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1YsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUU7d0JBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNsQixDQUFDLENBQUM7aUJBQ047cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsQjthQUNKLENBQ0osQ0FBQztTQUNMLENBQUMsQ0FBQztLQUNOO3dCQTNGTDtFQVc0QixZQUFZLEVBaUZ2QyxDQUFBOzs7Ozs7O0FBU0QsT0FBTyxFQUNILGFBQWEsRUFDaEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgSHR0cENsaWVudCwgSHR0cFJlcXVlc3QsIEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zLFxuICAgIEh0dHBSZXNwb25zZSwgSHR0cEV2ZW50IC8vLCBIdHRwRXJyb3JSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEdQSHR0cENsaWVudCB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cbmNsYXNzIE5HMkh0dHBDbGllbnQgZXh0ZW5kcyBHUEh0dHBDbGllbnQge1xuXG4gICAgLy9mb3IgdXNlIHRvIGVuc3VyZSBleGVjdXRlZCByZXF1ZXN0cyBhcmUgaGFuZGxlZCBpbnNpZGUgYW5ndWxhciB6b25lXG4gICAgLy8gKHNlZSBpc3N1ZXMgd2l0aCBPYnNlcnZhYmxlLnN1YnNjcmliZSgpIGFuZCBOZ1pvbmUpXG4gICAgcHJpdmF0ZSB6b25lIDogTmdab25lO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHNldFpvbmUoem9uZSA6IE5nWm9uZSkge1xuICAgICAgICB0aGlzLnpvbmUgPSB6b25lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9uczoge1trZXk6c3RyaW5nXTphbnl9KSA6IEh0dHBSZXF1ZXN0PGFueT4ge1xuXG4gICAgICAgIGxldCBvcHRzIDogYW55ID0ge307XG5cbiAgICAgICAgaWYob3B0aW9ucy5vcHRpb25zICYmIG9wdGlvbnMub3B0aW9ucy5yZXNwb25zZVR5cGUpIHtcbiAgICAgICAgICAgIG9wdHMucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5vcHRpb25zLnJlc3BvbnNlVHlwZTtcbiAgICAgICAgfSBlbHNlIG9wdHMucmVzcG9uc2VUeXBlID0gJ2pzb24nOyAgLy9kZWZhdWx0IHJlc3BvbnNlIHR5cGVcblxuICAgICAgICBpZihvcHRpb25zLnBhcmFtcykge1xuICAgICAgICAgICAgb3B0cy5wYXJhbXMgPSBuZXcgSHR0cFBhcmFtcyh7ZnJvbU9iamVjdDogb3B0aW9ucy5wYXJhbXN9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9wdGlvbnMuZGF0YSkge1xuICAgICAgICAgICAgb3B0cy5ib2R5ID0gb3B0aW9ucy5kYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0cy5oZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG5cbiAgICAgICAgLy9zZXQgYXV0aG9yaXphdGlvbiB0b2tlbiBpZiBvbmUgd2FzIHByb3ZpZGVkXG4gICAgICAgIGxldCB0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKTtcbiAgICAgICAgaWYodG9rZW4pIHtcbiAgICAgICAgICAgIG9wdHMuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRzLmJvZHkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFJlcXVlc3Q8YW55PihvcHRpb25zLm1ldGhvZCwgb3B0aW9ucy51cmwsIG9wdHMuYm9keSwgb3B0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBSZXF1ZXN0PGFueT4ob3B0aW9ucy5tZXRob2QsIG9wdGlvbnMudXJsLCBvcHRzKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHJlcXVlc3QgLSBBbmd1bGFyIEh0dHBSZXF1ZXN0IG9iamVjdFxuICAgICAqIEByZXR1cm4gcmVzb2x2aW5nIHRoZSByZXNwb25zZSBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGV4ZWN1dGUocmVxdWVzdCA6IEh0dHBSZXF1ZXN0PGFueT4pIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBsZXQgdmFsdWUgOiBhbnkgPSBudWxsO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PiggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmh0dHAucmVxdWVzdChyZXF1ZXN0KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKCAoZXZlbnQ6IEh0dHBFdmVudDxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChldmVudCBhcyBIdHRwUmVzcG9uc2U8YW55PikuYm9keTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoICh2OiBhbnkpID0+IHsgdmFsdWUgPSB2OyB9LFxuICAgICAgICAgICAgICAgIChlcnIgOiBFcnJvcikgPT4geyByZWplY3QoZXJyKTsgfSxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuem9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1biggKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vKlxuRG9uJ3QgdXNlICdkZWZhdWx0JyB3aGVuIGV4cG9ydGluZyBzb21ldGhpbmcgYmVpbmcgcHJvdmlkZWQgYnkgdGhlIG1vZHVsZVxub3IgZWxzZSB5b3UgbWF5IGdldCBcIkludmFsaWQgcHJvdmlkZXIgZm9yIHRoZSBtb2R1bGVcIiB3aGVuIGNvbXBpbGluZyB1c2luZyBBT1QuXG5TZWU6XG5odHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80ODE4MzU5NC9pbnZhbGlkLXByb3ZpZGVyLWZvci10aGUtbmdtb2R1bGUtd2hlbi11c2luZy1hb3RcbiAqL1xuZXhwb3J0IHtcbiAgICBORzJIdHRwQ2xpZW50XG59XG4iXX0=