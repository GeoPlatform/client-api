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
export { NG2HttpClient };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXIvIiwic291cmNlcyI6WyJodHRwL25nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQ1MsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQ2hELFlBQVksRUFDZixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHbkQsbUJBQW9CLFNBQVEsWUFBWTs7Ozs7SUFNcEMsWUFBb0IsSUFBZ0IsRUFBRSxPQUFhO1FBQy9DLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURDLFNBQUksR0FBSixJQUFJLENBQVk7S0FFbkM7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQWE7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7S0FDcEI7Ozs7OztJQUtELGlCQUFpQixDQUFDLE9BQTJCOztRQUV6QyxJQUFJLElBQUksR0FBUyxFQUFFLENBQUM7UUFFcEIsSUFBRyxPQUFPLGVBQVksT0FBTyxZQUFTLFlBQVksRUFBRTtZQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sWUFBUyxZQUFZLENBQUM7U0FDcEQ7O1lBQU0sSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7UUFFbEMsSUFBRyxPQUFPLFlBQVM7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE9BQU8sVUFBTyxFQUFDLENBQUMsQ0FBQztTQUM5RDtRQUVELElBQUcsT0FBTyxVQUFPO1lBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLFFBQUssQ0FBQztTQUM1QjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQzs7UUFHakMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUcsS0FBSyxFQUFFO1lBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUN4RDtRQUVELElBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNWLE9BQU8sSUFBSSxXQUFXLENBQU0sT0FBTyxZQUFTLE9BQU8sU0FBTSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzdFO2FBQU07WUFDSCxPQUFPLElBQUksV0FBVyxDQUFNLE9BQU8sWUFBUyxPQUFPLFNBQU0sSUFBSSxDQUFDLENBQUM7U0FDbEU7S0FFSjs7Ozs7SUFNRCxPQUFPLENBQUMsT0FBMEI7O1FBRTlCLElBQUksS0FBSyxHQUFTLElBQUksQ0FBQztRQUN2QixPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBRXpDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztpQkFDekIsSUFBSSxDQUNELEdBQUcsQ0FBRSxDQUFDLEtBQXFCLEVBQUUsRUFBRTtnQkFDM0IsSUFBSSxLQUFLLFlBQVksWUFBWSxFQUFFO29CQUMvQixPQUFPLG1CQUFDLEtBQTBCLEVBQUMsQ0FBQyxJQUFJLENBQUM7aUJBQzVDO2dCQUNELE9BQU8sRUFBRSxDQUFDO2FBQ2IsQ0FBQyxDQUNMO2lCQUNBLFNBQVMsQ0FBRSxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQ2xDLENBQUMsR0FBVyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUNqQyxHQUFHLEVBQUU7Z0JBQ0QsSUFBRyxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsRUFBRTt3QkFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNsQixDQUFDLENBQUM7aUJBQ047cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsQjthQUNKLENBQ0osQ0FBQztTQUNMLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FzQk47Q0FFSjs7Ozs7OztBQUVELE9BQU8sRUFDSCxhQUFhLEVBQ2hCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICAgIEh0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyxcbiAgICBIdHRwUmVzcG9uc2UsIEh0dHBFdmVudCAvLywgSHR0cEVycm9yUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBHUEh0dHBDbGllbnQgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuXG5jbGFzcyBORzJIdHRwQ2xpZW50IGV4dGVuZHMgR1BIdHRwQ2xpZW50IHtcblxuICAgIC8vZm9yIHVzZSB0byBlbnN1cmUgZXhlY3V0ZWQgcmVxdWVzdHMgYXJlIGhhbmRsZWQgaW5zaWRlIGFuZ3VsYXIgem9uZVxuICAgIC8vIChzZWUgaXNzdWVzIHdpdGggT2JzZXJ2YWJsZS5zdWJzY3JpYmUoKSBhbmQgTmdab25lKVxuICAgIHByaXZhdGUgem9uZSA6IE5nWm9uZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICB9XG5cbiAgICBzZXRab25lKHpvbmUgOiBOZ1pvbmUpIHtcbiAgICAgICAgdGhpcy56b25lID0gem9uZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnM6IHtba2V5OnN0cmluZ106YW55fSkgOiBIdHRwUmVxdWVzdDxhbnk+IHtcblxuICAgICAgICBsZXQgb3B0cyA6IGFueSA9IHt9O1xuXG4gICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucyAmJiBvcHRpb25zLm9wdGlvbnMucmVzcG9uc2VUeXBlKSB7XG4gICAgICAgICAgICBvcHRzLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMub3B0aW9ucy5yZXNwb25zZVR5cGU7XG4gICAgICAgIH0gZWxzZSBvcHRzLnJlc3BvbnNlVHlwZSA9ICdqc29uJzsgIC8vZGVmYXVsdCByZXNwb25zZSB0eXBlXG5cbiAgICAgICAgaWYob3B0aW9ucy5wYXJhbXMpIHtcbiAgICAgICAgICAgIG9wdHMucGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoe2Zyb21PYmplY3Q6IG9wdGlvbnMucGFyYW1zfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgIG9wdHMuYm9keSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdHMuaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuXG4gICAgICAgIC8vc2V0IGF1dGhvcml6YXRpb24gdG9rZW4gaWYgb25lIHdhcyBwcm92aWRlZFxuICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLmdldFRva2VuKCk7XG4gICAgICAgIGlmKHRva2VuKSB7XG4gICAgICAgICAgICBvcHRzLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0cy5ib2R5KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBSZXF1ZXN0PGFueT4ob3B0aW9ucy5tZXRob2QsIG9wdGlvbnMudXJsLCBvcHRzLmJvZHksIG9wdHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVxdWVzdDxhbnk+KG9wdGlvbnMubWV0aG9kLCBvcHRpb25zLnVybCwgb3B0cyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSByZXF1ZXN0IC0gQW5ndWxhciBIdHRwUmVxdWVzdCBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHJlc29sdmluZyB0aGUgcmVzcG9uc2Ugb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBleGVjdXRlKHJlcXVlc3QgOiBIdHRwUmVxdWVzdDxhbnk+KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgbGV0IHZhbHVlIDogYW55ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oIChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5odHRwLnJlcXVlc3QocmVxdWVzdClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCggKGV2ZW50OiBIdHRwRXZlbnQ8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZXZlbnQgYXMgSHR0cFJlc3BvbnNlPGFueT4pLmJvZHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCAodjogYW55KSA9PiB7IHZhbHVlID0gdjsgfSxcbiAgICAgICAgICAgICAgICAoZXJyIDogRXJyb3IpID0+IHsgcmVqZWN0KGVycik7IH0sXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnpvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8qXG4gICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAudGhlbiggKHJlc3VsdCkgPT4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkpXG4gICAgICAgIC5jYXRjaCggKGVyciA6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJORzJIdHRwQ2xpZW50LmNhdGNoKCkgLSBcIiArIEpTT04uc3RyaW5naWZ5KGVycikpO1xuICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1zZyA9IFwiQW4gZXJyb3Igb2NjdXJyZWQgY29tbXVuaWNhdGluZyB3aXRoIHRoZSBHZW9QbGF0Zm9ybSBBUElcIjtcbiAgICAgICAgICAgICAgICBpZihlcnIuZXJyb3IgJiYgZXJyLmVycm9yLmVycm9yICYmIGVyci5lcnJvci5lcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1zZyA9IGVyci5lcnJvci5lcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyLmVycm9yICYmIGVyci5lcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1zZyA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihlcnIubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICBtc2cgPSBlcnIubWVzc2FnZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH0pO1xuICAgICAgICAqL1xuICAgIH1cblxufVxuXG5leHBvcnQge1xuICAgIE5HMkh0dHBDbGllbnRcbn1cbiJdfQ==