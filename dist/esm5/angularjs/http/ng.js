/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as Q from 'q';
import * as angular from "angular";
import { GPHttpClient } from "@geoplatform/client";
var NGHttpClient = /** @class */ (function (_super) {
    tslib_1.__extends(NGHttpClient, _super);
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     * @param options.$http - angular $http service instance
     */
    function NGHttpClient(options) {
        var _this = _super.call(this, options) || this;
        if (typeof (angular) === 'undefined' || angular === null) {
            throw new Error("AngularJS could not be found globally");
        }
        if (options && options["$http"])
            _this.$http = options["$http"];
        return _this;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    NGHttpClient.prototype.createRequestOpts = /**
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
        if (options["json"] === true || 'json' === options["responseType"])
            opts["dataType"] = 'json';
        else if ('text' === options["responseType"])
            opts["dataType"] = 'text';
        if (options["params"]) {
            opts["params"] = options["params"];
        }
        if (options["data"]) {
            opts["data"] = options["data"];
        }
        //set authorization token if one was provided
        if (this.token) {
            /** @type {?} */
            var token = this.token();
            if (token) {
                opts["headers"] = opts["headers"] || {};
                opts["headers"].Authorization = 'Bearer ' + token;
                opts["useXDomain"] = true;
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
    NGHttpClient.prototype.execute = /**
     * @param {?} opts
     * @return {?}
     */
    function (opts) {
        /** @type {?} */
        var $http = this.$http || angular.injector(['ng']).get('$http');
        return Q.resolve($http)
            .then(function ($http) {
            if (typeof ($http) === 'undefined')
                throw new Error("Angular $http not resolved");
            // console.log(opts);
            return $http(opts);
        })
            .then(function (response) { return response.data; })
            .catch(function (response) { return Q.reject(response.data); });
    };
    return NGHttpClient;
}(GPHttpClient));
if (false) {
    /** @type {?} */
    NGHttpClient.prototype.$http;
}
export default NGHttpClient;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImh0dHAvbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztBQUN2QixPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFJbkQsSUFBQTtJQUEyQix3Q0FBWTtJQUluQzs7OztPQUlHO0lBQ0gsc0JBQVksT0FBaUM7UUFBN0MsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FNakI7UUFMRyxJQUFHLE9BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFHLE9BQU8sSUFBSSxPQUFPLFNBQU07WUFDdkIsS0FBSSxDQUFDLEtBQUssR0FBRyxPQUFPLFNBQU0sQ0FBQzs7S0FDbEM7Ozs7O0lBRUQsd0NBQWlCOzs7O0lBQWpCLFVBQWtCLE9BQWdDOztRQUU5QyxJQUFJLElBQUksR0FBNEI7WUFDaEMsTUFBTSxFQUFFLE9BQU8sVUFBTztZQUN0QixHQUFHLEVBQUUsT0FBTyxPQUFJO1lBQ2hCLE9BQU8sRUFBRSxPQUFPLGVBQVksSUFBSSxDQUFDLE9BQU87U0FDM0MsQ0FBQztRQUVGLElBQUcsT0FBTyxhQUFVLElBQUksSUFBSSxNQUFNLEtBQUssT0FBTyxnQkFBYTtZQUN2RCxJQUFJLGVBQVksTUFBTSxDQUFDO2FBQ3RCLElBQUcsTUFBTSxLQUFLLE9BQU8sZ0JBQWE7WUFDbkMsSUFBSSxlQUFZLE1BQU0sQ0FBQztRQUUzQixJQUFHLE9BQU8sWUFBUztZQUNmLElBQUksYUFBVSxPQUFPLFVBQU8sQ0FBQztTQUNoQztRQUVELElBQUcsT0FBTyxVQUFPO1lBQ2IsSUFBSSxXQUFRLE9BQU8sUUFBSyxDQUFDO1NBQzVCOztRQUdELElBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTs7WUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekIsSUFBRyxLQUFLLEVBQUU7Z0JBQ04sSUFBSSxjQUFXLElBQUksZUFBWSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksWUFBUyxhQUFhLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDL0MsSUFBSSxpQkFBYyxJQUFJLENBQUM7YUFDMUI7U0FDSjs7UUFHRCxJQUFHLE9BQU8sYUFBVTtZQUNoQixLQUFJLElBQUksQ0FBQyxJQUFJLE9BQU8sYUFBVTtnQkFDMUIsSUFBRyxPQUFPLFlBQVMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxZQUFTLENBQUMsQ0FBQyxDQUFDO2lCQUNoQzthQUNKO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztLQUNmOzs7OztJQUVELDhCQUFPOzs7O0lBQVAsVUFBUSxJQUFVOztRQUVkLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBRSxLQUFLLENBQUU7YUFDeEIsSUFBSSxDQUFDLFVBQUEsS0FBSztZQUNQLElBQUcsT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVc7Z0JBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQzs7WUFHbEQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEIsQ0FBQzthQUNELElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBRSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQWIsQ0FBYSxDQUFDO2FBQzdCLEtBQUssQ0FBQyxVQUFBLFFBQVEsSUFBRSxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUF2QixDQUF1QixDQUFDLENBQUM7S0FDN0M7dUJBakZMO0VBTzJCLFlBQVksRUE0RXRDLENBQUE7Ozs7O0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gXCJhbmd1bGFyXCI7XG5pbXBvcnQgeyBHUEh0dHBDbGllbnQgfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5cblxuY2xhc3MgTkdIdHRwQ2xpZW50IGV4dGVuZHMgR1BIdHRwQ2xpZW50IHtcblxuICAgIHByaXZhdGUgJGh0dHAgOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50aW1lb3V0XG4gICAgICogQHBhcmFtIG9wdGlvbnMudG9rZW4gLSB0aGUgYmVhcmVyIHRva2VuIG9yIGEgZnVuY3Rpb24gdG8gcmV0cmlldmUgaXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy4kaHR0cCAtIGFuZ3VsYXIgJGh0dHAgc2VydmljZSBpbnN0YW5jZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPzogeyBba2V5OnN0cmluZ10gOiBhbnkgfSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgaWYodHlwZW9mKGFuZ3VsYXIpID09PSAndW5kZWZpbmVkJyB8fCBhbmd1bGFyID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbmd1bGFySlMgY291bGQgbm90IGJlIGZvdW5kIGdsb2JhbGx5XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy4kaHR0cClcbiAgICAgICAgICAgIHRoaXMuJGh0dHAgPSBvcHRpb25zLiRodHRwO1xuICAgIH1cblxuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSA6IGFueSB7XG5cbiAgICAgICAgbGV0IG9wdHMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiBvcHRpb25zLm1ldGhvZCxcbiAgICAgICAgICAgIHVybDogb3B0aW9ucy51cmwsXG4gICAgICAgICAgICB0aW1lb3V0OiBvcHRpb25zLnRpbWVvdXQgfHwgdGhpcy50aW1lb3V0XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYob3B0aW9ucy5qc29uID09PSB0cnVlIHx8ICdqc29uJyA9PT0gb3B0aW9ucy5yZXNwb25zZVR5cGUpXG4gICAgICAgICAgICBvcHRzLmRhdGFUeXBlID0gJ2pzb24nO1xuICAgICAgICBlbHNlIGlmKCd0ZXh0JyA9PT0gb3B0aW9ucy5yZXNwb25zZVR5cGUpXG4gICAgICAgICAgICBvcHRzLmRhdGFUeXBlID0gJ3RleHQnO1xuXG4gICAgICAgIGlmKG9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICBvcHRzLnBhcmFtcyA9IG9wdGlvbnMucGFyYW1zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICBvcHRzLmRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldCBhdXRob3JpemF0aW9uIHRva2VuIGlmIG9uZSB3YXMgcHJvdmlkZWRcbiAgICAgICAgaWYodGhpcy50b2tlbikge1xuICAgICAgICAgICAgbGV0IHRva2VuID0gdGhpcy50b2tlbigpO1xuICAgICAgICAgICAgaWYodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBvcHRzLmhlYWRlcnMgPSBvcHRzLmhlYWRlcnMgfHwge307XG4gICAgICAgICAgICAgICAgb3B0cy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyB0b2tlbjtcbiAgICAgICAgICAgICAgICBvcHRzLnVzZVhEb21haW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9jb3B5IG92ZXIgdXNlci1zdXBwbGllZCBvcHRpb25zXG4gICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgZm9yKGxldCBvIGluIG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzW29dID0gb3B0aW9ucy5vcHRpb25zW29dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRzO1xuICAgIH1cblxuICAgIGV4ZWN1dGUob3B0cyA6IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgbGV0ICRodHRwID0gdGhpcy4kaHR0cCB8fCBhbmd1bGFyLmluamVjdG9yKFsnbmcnXSkuZ2V0KCckaHR0cCcpO1xuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCAkaHR0cCApXG4gICAgICAgIC50aGVuKCRodHRwID0+IHtcbiAgICAgICAgICAgIGlmKHR5cGVvZigkaHR0cCkgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuZ3VsYXIgJGh0dHAgbm90IHJlc29sdmVkXCIpO1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhvcHRzKTtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cChvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2U9PnJlc3BvbnNlLmRhdGEpXG4gICAgICAgIC5jYXRjaChyZXNwb25zZT0+US5yZWplY3QocmVzcG9uc2UuZGF0YSkpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBOR0h0dHBDbGllbnQ7XG4iXX0=