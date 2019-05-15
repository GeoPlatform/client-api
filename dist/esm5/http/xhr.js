/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as Q from 'q';
import axios from 'axios';
import GPError from '../shared/error';
import GPHttpClient from './client';
var XHRHttpClient = /** @class */ (function (_super) {
    tslib_1.__extends(XHRHttpClient, _super);
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    function XHRHttpClient(options) {
        return _super.call(this, options) || this;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    XHRHttpClient.prototype.createRequestOpts = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var opts = {
            method: options["method"],
            url: options["url"],
            timeout: options["timeout"] || this.timeout
        };
        if (options["json"] === true)
            opts["responseType"] = 'json';
        if (options["params"]) {
            opts["params"] = options["params"];
        }
        if (options["data"]) {
            opts["data"] = options["data"];
            opts["contentType"] = 'application/json';
        }
        //set authorization header if one was provided
        if (this.token) {
            /** @type {?} */
            var token = this.token();
            if (token) {
                opts["headers"] = opts["headers"] || {};
                opts["headers"].Authorization = 'Bearer ' + token;
                opts["withCredentials"] = true;
            }
        }
        //copy over user-supplied options
        if (options["options"]) {
            for (var o in options["options"]) {
                if (options["options"].hasOwnProperty(o)) {
                    opts[o] = options["options"][o];
                }
            }
        }
        return opts;
    };
    /**
     * @param {?} opts
     * @return {?}
     */
    XHRHttpClient.prototype.execute = /**
     * @param {?} opts
     * @return {?}
     */
    function (opts) {
        if (typeof (axios) === 'undefined') {
            throw new Error("Axios not found, check that you have included " +
                "it as a dependency of the application or use a different " +
                "HttpClient implementation");
        }
        /** @type {?} */
        var promise = axios(opts)
            .then(function (response) { return response.data; })
            .catch(function (error) {
            /** @type {?} */
            var err = new GPError(error.message);
            if (error.response) {
                err = new GPError(error.response.data);
            }
            return Q.reject(err);
        });
        return Q.resolve(promise);
    };
    return XHRHttpClient;
}(GPHttpClient));
export default XHRHttpClient;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbImh0dHAveGhyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7QUFDdkIsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sT0FBTyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sWUFBWSxNQUFNLFVBQVUsQ0FBQztBQUdwQyxJQUFBO0lBQTRCLHlDQUFZO0lBRXBDOzs7T0FHRztJQUNILHVCQUFZLE9BQWlDO2VBQ3pDLGtCQUFNLE9BQU8sQ0FBQztLQUNqQjs7Ozs7SUFHRCx5Q0FBaUI7Ozs7SUFBakIsVUFBa0IsT0FBZ0M7O1FBRTlDLElBQUksSUFBSSxHQUE0QjtZQUNoQyxNQUFNLEVBQUUsT0FBTyxVQUFPO1lBQ3RCLEdBQUcsRUFBRSxPQUFPLE9BQUk7WUFDaEIsT0FBTyxFQUFFLE9BQU8sZUFBWSxJQUFJLENBQUMsT0FBTztTQUMzQyxDQUFDO1FBRUYsSUFBRyxPQUFPLGFBQVUsSUFBSTtZQUNwQixJQUFJLG1CQUFnQixNQUFNLENBQUM7UUFFL0IsSUFBRyxPQUFPLFlBQVM7WUFDZixJQUFJLGFBQVUsT0FBTyxVQUFPLENBQUM7U0FDaEM7UUFFRCxJQUFHLE9BQU8sVUFBTztZQUNiLElBQUksV0FBUSxPQUFPLFFBQUssQ0FBQztZQUN6QixJQUFJLGtCQUFlLGtCQUFrQixDQUFDO1NBQ3pDOztRQUdELElBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTs7WUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekIsSUFBRyxLQUFLLEVBQUU7Z0JBQ04sSUFBSSxjQUFXLElBQUksZUFBWSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksWUFBUyxhQUFhLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDL0MsSUFBSSxzQkFBbUIsSUFBSSxDQUFDO2FBQy9CO1NBQ0o7O1FBR0QsSUFBRyxPQUFPLGFBQVU7WUFDaEIsS0FBSSxJQUFJLENBQUMsSUFBSSxPQUFPLGFBQVU7Z0JBQzFCLElBQUcsT0FBTyxZQUFTLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sWUFBUyxDQUFDLENBQUMsQ0FBQztpQkFDaEM7YUFDSjtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7S0FDZjs7Ozs7SUFHRCwrQkFBTzs7OztJQUFQLFVBQVEsSUFBVTtRQUVkLElBQUcsT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsRUFBRTtZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRDtnQkFDNUQsMkRBQTJEO2dCQUMzRCwyQkFBMkIsQ0FBQyxDQUFBO1NBQ25DOztRQUVELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDeEIsSUFBSSxDQUFFLFVBQUEsUUFBUSxJQUFNLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDNUMsS0FBSyxDQUFFLFVBQUEsS0FBSzs7WUFDVCxJQUFJLEdBQUcsR0FBYSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0MsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNoQixHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMxQztZQUNELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDN0I7d0JBL0VMO0VBTzRCLFlBQVksRUEwRXZDLENBQUE7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUSBmcm9tICdxJztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgR1BFcnJvciBmcm9tICcuLi9zaGFyZWQvZXJyb3InO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuL2NsaWVudCc7XG5cblxuY2xhc3MgWEhSSHR0cENsaWVudCBleHRlbmRzIEdQSHR0cENsaWVudCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50aW1lb3V0XG4gICAgICogQHBhcmFtIG9wdGlvbnMudG9rZW4gLSB0aGUgYmVhcmVyIHRva2VuIG9yIGEgZnVuY3Rpb24gdG8gcmV0cmlldmUgaXRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IHsgW2tleTpzdHJpbmddIDogYW55IH0pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxuXG5cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zIDogeyBba2V5OnN0cmluZ10gOiBhbnkgfSkgOiBhbnkge1xuXG4gICAgICAgIGxldCBvcHRzIDogeyBba2V5OnN0cmluZ10gOiBhbnkgfSA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogb3B0aW9ucy5tZXRob2QsXG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMudXJsLFxuICAgICAgICAgICAgdGltZW91dDogb3B0aW9ucy50aW1lb3V0IHx8IHRoaXMudGltZW91dFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmKG9wdGlvbnMuanNvbiA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIG9wdHMucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXG4gICAgICAgIGlmKG9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICBvcHRzLnBhcmFtcyA9IG9wdGlvbnMucGFyYW1zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICBvcHRzLmRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICAgICAgICBvcHRzLmNvbnRlbnRUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9zZXQgYXV0aG9yaXphdGlvbiBoZWFkZXIgaWYgb25lIHdhcyBwcm92aWRlZFxuICAgICAgICBpZih0aGlzLnRva2VuKSB7XG4gICAgICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLnRva2VuKCk7XG4gICAgICAgICAgICBpZih0b2tlbikge1xuICAgICAgICAgICAgICAgIG9wdHMuaGVhZGVycyA9IG9wdHMuaGVhZGVycyB8fCB7fTtcbiAgICAgICAgICAgICAgICBvcHRzLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIHRva2VuO1xuICAgICAgICAgICAgICAgIG9wdHMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29weSBvdmVyIHVzZXItc3VwcGxpZWQgb3B0aW9uc1xuICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgbyBpbiBvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMuaGFzT3duUHJvcGVydHkobykpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0c1tvXSA9IG9wdGlvbnMub3B0aW9uc1tvXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0cztcbiAgICB9XG5cblxuICAgIGV4ZWN1dGUob3B0cyA6IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgaWYodHlwZW9mKGF4aW9zKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkF4aW9zIG5vdCBmb3VuZCwgY2hlY2sgdGhhdCB5b3UgaGF2ZSBpbmNsdWRlZCBcIiArXG4gICAgICAgICAgICAgICAgXCJpdCBhcyBhIGRlcGVuZGVuY3kgb2YgdGhlIGFwcGxpY2F0aW9uIG9yIHVzZSBhIGRpZmZlcmVudCBcIiArXG4gICAgICAgICAgICAgICAgXCJIdHRwQ2xpZW50IGltcGxlbWVudGF0aW9uXCIpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvbWlzZSA9IGF4aW9zKG9wdHMpXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiB7IHJldHVybiByZXNwb25zZS5kYXRhOyB9KVxuICAgICAgICAuY2F0Y2goIGVycm9yID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgOiBHUEVycm9yID0gbmV3IEdQRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBlcnIgPSBuZXcgR1BFcnJvcihlcnJvci5yZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZShwcm9taXNlKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgWEhSSHR0cENsaWVudDtcbiJdfQ==