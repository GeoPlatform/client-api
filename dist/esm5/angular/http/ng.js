/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
                .map(function (event) {
                if (event instanceof HttpResponse) {
                    return (/** @type {?} */ (event)).body;
                }
                return {};
            })
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
export default NG2HttpClient;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXIvIiwic291cmNlcyI6WyJodHRwL25nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUNTLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUNoRCxZQUFZLEVBQ2YsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLHVCQUF1QixDQUFDO0FBRS9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUduRCxJQUFBO0lBQTRCLHlDQUFZO0lBTXBDLHVCQUFvQixJQUFnQixFQUFFLE9BQWE7UUFBbkQsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FDakI7UUFGbUIsVUFBSSxHQUFKLElBQUksQ0FBWTs7S0FFbkM7Ozs7O0lBRUQsK0JBQU87Ozs7SUFBUCxVQUFRLElBQWE7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7S0FDcEI7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gseUNBQWlCOzs7OztJQUFqQixVQUFrQixPQUEyQjs7UUFFekMsSUFBSSxJQUFJLEdBQVMsRUFBRSxDQUFDO1FBRXBCLElBQUcsT0FBTyxlQUFZLE9BQU8sWUFBUyxZQUFZLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLFlBQVMsWUFBWSxDQUFDO1NBQ3BEOztZQUFNLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1FBRWxDLElBQUcsT0FBTyxZQUFTO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxPQUFPLFVBQU8sRUFBQyxDQUFDLENBQUM7U0FDOUQ7UUFFRCxJQUFHLE9BQU8sVUFBTztZQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxRQUFLLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7O1FBR2pDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFHLEtBQUssRUFBRTtZQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDeEQ7UUFFRCxJQUFHLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVixPQUFPLElBQUksV0FBVyxDQUFNLE9BQU8sWUFBUyxPQUFPLFNBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM3RTthQUFNO1lBQ0gsT0FBTyxJQUFJLFdBQVcsQ0FBTSxPQUFPLFlBQVMsT0FBTyxTQUFNLElBQUksQ0FBQyxDQUFDO1NBQ2xFO0tBRUo7SUFFRDs7O09BR0c7Ozs7O0lBQ0gsK0JBQU87Ozs7SUFBUCxVQUFRLE9BQTBCO1FBQWxDLGlCQThDQzs7UUE1Q0csSUFBSSxLQUFLLEdBQVMsSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQU8sVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUVyQyxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7aUJBQ3pCLEdBQUcsQ0FBRSxVQUFDLEtBQXFCO2dCQUN4QixJQUFJLEtBQUssWUFBWSxZQUFZLEVBQUU7b0JBQy9CLE9BQU8sbUJBQUMsS0FBMEIsRUFBQyxDQUFDLElBQUksQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxFQUFFLENBQUM7YUFDYixDQUFDO2lCQUNELFNBQVMsQ0FBRSxVQUFDLENBQU0sSUFBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFDbEMsVUFBQyxHQUFXLElBQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFDakM7Z0JBQ0ksSUFBRyxLQUFJLENBQUMsSUFBSSxFQUFFO29CQUNWLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFFO3dCQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDbEIsQ0FBQyxDQUFDO2lCQUNOO3FCQUFNO29CQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbEI7YUFDSixDQUNKLENBQUM7U0FDTCxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBc0JOO3dCQTlHTDtFQVc0QixZQUFZLEVBcUd2QyxDQUFBOzs7Ozs7O0FBRUQsZUFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICAgIEh0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyxcbiAgICBIdHRwUmVzcG9uc2UsIEh0dHBFdmVudCAvLywgSHR0cEVycm9yUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuXG5pbXBvcnQgeyBHUEh0dHBDbGllbnQgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuXG5jbGFzcyBORzJIdHRwQ2xpZW50IGV4dGVuZHMgR1BIdHRwQ2xpZW50IHtcblxuICAgIC8vZm9yIHVzZSB0byBlbnN1cmUgZXhlY3V0ZWQgcmVxdWVzdHMgYXJlIGhhbmRsZWQgaW5zaWRlIGFuZ3VsYXIgem9uZVxuICAgIC8vIChzZWUgaXNzdWVzIHdpdGggT2JzZXJ2YWJsZS5zdWJzY3JpYmUoKSBhbmQgTmdab25lKVxuICAgIHByaXZhdGUgem9uZSA6IE5nWm9uZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICB9XG5cbiAgICBzZXRab25lKHpvbmUgOiBOZ1pvbmUpIHtcbiAgICAgICAgdGhpcy56b25lID0gem9uZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnM6IHtba2V5OnN0cmluZ106YW55fSkgOiBIdHRwUmVxdWVzdDxhbnk+IHtcblxuICAgICAgICBsZXQgb3B0cyA6IGFueSA9IHt9O1xuXG4gICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucyAmJiBvcHRpb25zLm9wdGlvbnMucmVzcG9uc2VUeXBlKSB7XG4gICAgICAgICAgICBvcHRzLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMub3B0aW9ucy5yZXNwb25zZVR5cGU7XG4gICAgICAgIH0gZWxzZSBvcHRzLnJlc3BvbnNlVHlwZSA9ICdqc29uJzsgIC8vZGVmYXVsdCByZXNwb25zZSB0eXBlXG5cbiAgICAgICAgaWYob3B0aW9ucy5wYXJhbXMpIHtcbiAgICAgICAgICAgIG9wdHMucGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoe2Zyb21PYmplY3Q6IG9wdGlvbnMucGFyYW1zfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgIG9wdHMuYm9keSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdHMuaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuXG4gICAgICAgIC8vc2V0IGF1dGhvcml6YXRpb24gdG9rZW4gaWYgb25lIHdhcyBwcm92aWRlZFxuICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLmdldFRva2VuKCk7XG4gICAgICAgIGlmKHRva2VuKSB7XG4gICAgICAgICAgICBvcHRzLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0cy5ib2R5KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBSZXF1ZXN0PGFueT4ob3B0aW9ucy5tZXRob2QsIG9wdGlvbnMudXJsLCBvcHRzLmJvZHksIG9wdHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVxdWVzdDxhbnk+KG9wdGlvbnMubWV0aG9kLCBvcHRpb25zLnVybCwgb3B0cyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSByZXF1ZXN0IC0gQW5ndWxhciBIdHRwUmVxdWVzdCBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHJlc29sdmluZyB0aGUgcmVzcG9uc2Ugb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBleGVjdXRlKHJlcXVlc3QgOiBIdHRwUmVxdWVzdDxhbnk+KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgbGV0IHZhbHVlIDogYW55ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oIChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5odHRwLnJlcXVlc3QocmVxdWVzdClcbiAgICAgICAgICAgIC5tYXAoIChldmVudDogSHR0cEV2ZW50PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChldmVudCBhcyBIdHRwUmVzcG9uc2U8YW55PikuYm9keTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoICh2OiBhbnkpID0+IHsgdmFsdWUgPSB2OyB9LFxuICAgICAgICAgICAgICAgIChlcnIgOiBFcnJvcikgPT4geyByZWplY3QoZXJyKTsgfSxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuem9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1biggKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLypcbiAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgIC50aGVuKCAocmVzdWx0KSA9PiBQcm9taXNlLnJlc29sdmUocmVzdWx0KSlcbiAgICAgICAgLmNhdGNoKCAoZXJyIDogYW55KSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk5HMkh0dHBDbGllbnQuY2F0Y2goKSAtIFwiICsgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBsZXQgbXNnID0gXCJBbiBlcnJvciBvY2N1cnJlZCBjb21tdW5pY2F0aW5nIHdpdGggdGhlIEdlb1BsYXRmb3JtIEFQSVwiO1xuICAgICAgICAgICAgICAgIGlmKGVyci5lcnJvciAmJiBlcnIuZXJyb3IuZXJyb3IgJiYgZXJyLmVycm9yLmVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbXNnID0gZXJyLmVycm9yLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlcnIuZXJyb3IgJiYgZXJyLmVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbXNnID0gZXJyLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGVyci5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1zZyA9IGVyci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfSk7XG4gICAgICAgICovXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE5HMkh0dHBDbGllbnQ7XG4iXX0=