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
            opts["data"] = options["params"];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbImh0dHAveGhyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7QUFDdkIsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sT0FBTyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sWUFBWSxNQUFNLFVBQVUsQ0FBQztBQUdwQyxJQUFBO0lBQTRCLHlDQUFZO0lBRXBDOzs7T0FHRztJQUNILHVCQUFZLE9BQWlDO2VBQ3pDLGtCQUFNLE9BQU8sQ0FBQztLQUNqQjs7Ozs7SUFHRCx5Q0FBaUI7Ozs7SUFBakIsVUFBa0IsT0FBZ0M7O1FBRTlDLElBQUksSUFBSSxHQUE0QjtZQUNoQyxNQUFNLEVBQUUsT0FBTyxVQUFPO1lBQ3RCLEdBQUcsRUFBRSxPQUFPLE9BQUk7WUFDaEIsT0FBTyxFQUFFLE9BQU8sZUFBWSxJQUFJLENBQUMsT0FBTztTQUMzQyxDQUFDO1FBRUYsSUFBRyxPQUFPLGFBQVUsSUFBSTtZQUNwQixJQUFJLG1CQUFnQixNQUFNLENBQUM7UUFFL0IsSUFBRyxPQUFPLFlBQVM7WUFDZixJQUFJLFdBQVEsT0FBTyxVQUFPLENBQUM7U0FDOUI7UUFFRCxJQUFHLE9BQU8sVUFBTztZQUNiLElBQUksV0FBUSxPQUFPLFFBQUssQ0FBQztZQUN6QixJQUFJLGtCQUFlLGtCQUFrQixDQUFDO1NBQ3pDOztRQUdELElBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTs7WUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekIsSUFBRyxLQUFLLEVBQUU7Z0JBQ04sSUFBSSxjQUFXLElBQUksZUFBWSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksWUFBUyxhQUFhLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDL0MsSUFBSSxzQkFBbUIsSUFBSSxDQUFDO2FBQy9CO1NBQ0o7O1FBR0QsSUFBRyxPQUFPLGFBQVU7WUFDaEIsS0FBSSxJQUFJLENBQUMsSUFBSSxPQUFPLGFBQVU7Z0JBQzFCLElBQUcsT0FBTyxZQUFTLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sWUFBUyxDQUFDLENBQUMsQ0FBQztpQkFDaEM7YUFDSjtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7S0FDZjs7Ozs7SUFHRCwrQkFBTzs7OztJQUFQLFVBQVEsSUFBVTs7UUFDZCxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ3hCLElBQUksQ0FBRSxVQUFBLFFBQVEsSUFBTSxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2FBQzVDLEtBQUssQ0FBRSxVQUFBLEtBQUs7O1lBQ1QsSUFBSSxHQUFHLEdBQWEsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9DLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUM7WUFDRCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzdCO3dCQXhFTDtFQU80QixZQUFZLEVBbUV2QyxDQUFBO0FBRUQsZUFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IEdQRXJyb3IgZnJvbSAnLi4vc2hhcmVkL2Vycm9yJztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi9jbGllbnQnO1xuXG5cbmNsYXNzIFhIUkh0dHBDbGllbnQgZXh0ZW5kcyBHUEh0dHBDbGllbnQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvbnMudGltZW91dFxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRva2VuIC0gdGhlIGJlYXJlciB0b2tlbiBvciBhIGZ1bmN0aW9uIHRvIHJldHJpZXZlIGl0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA/OiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIH1cblxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0pIDogYW55IHtcblxuICAgICAgICBsZXQgb3B0cyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0gPSB7XG4gICAgICAgICAgICBtZXRob2Q6IG9wdGlvbnMubWV0aG9kLFxuICAgICAgICAgICAgdXJsOiBvcHRpb25zLnVybCxcbiAgICAgICAgICAgIHRpbWVvdXQ6IG9wdGlvbnMudGltZW91dCB8fCB0aGlzLnRpbWVvdXRcbiAgICAgICAgfTtcblxuICAgICAgICBpZihvcHRpb25zLmpzb24gPT09IHRydWUpXG4gICAgICAgICAgICBvcHRzLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblxuICAgICAgICBpZihvcHRpb25zLnBhcmFtcykge1xuICAgICAgICAgICAgb3B0cy5kYXRhID0gb3B0aW9ucy5wYXJhbXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgIG9wdHMuZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgICAgIG9wdHMuY29udGVudFR5cGUgPSAnYXBwbGljYXRpb24vanNvbic7XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldCBhdXRob3JpemF0aW9uIGhlYWRlciBpZiBvbmUgd2FzIHByb3ZpZGVkXG4gICAgICAgIGlmKHRoaXMudG9rZW4pIHtcbiAgICAgICAgICAgIGxldCB0b2tlbiA9IHRoaXMudG9rZW4oKTtcbiAgICAgICAgICAgIGlmKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5oZWFkZXJzID0gb3B0cy5oZWFkZXJzIHx8IHt9O1xuICAgICAgICAgICAgICAgIG9wdHMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgdG9rZW47XG4gICAgICAgICAgICAgICAgb3B0cy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9jb3B5IG92ZXIgdXNlci1zdXBwbGllZCBvcHRpb25zXG4gICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgZm9yKGxldCBvIGluIG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzW29dID0gb3B0aW9ucy5vcHRpb25zW29dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRzO1xuICAgIH1cblxuXG4gICAgZXhlY3V0ZShvcHRzIDogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHByb21pc2UgPSBheGlvcyhvcHRzKVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4geyByZXR1cm4gcmVzcG9uc2UuZGF0YTsgfSlcbiAgICAgICAgLmNhdGNoKCBlcnJvciA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyIDogR1BFcnJvciA9IG5ldyBHUEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZXJyID0gbmV3IEdQRXJyb3IoZXJyb3IucmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBRLnJlc29sdmUocHJvbWlzZSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFhIUkh0dHBDbGllbnQ7XG4iXX0=