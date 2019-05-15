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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImh0dHAvbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztBQUN2QixPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFNbkQsSUFBQTtJQUEyQix3Q0FBWTtJQUluQzs7OztPQUlHO0lBQ0gsc0JBQVksT0FBaUM7UUFBN0MsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FNakI7UUFMRyxJQUFHLE9BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFHLE9BQU8sSUFBSSxPQUFPLFNBQU07WUFDdkIsS0FBSSxDQUFDLEtBQUssR0FBRyxPQUFPLFNBQU0sQ0FBQzs7S0FDbEM7Ozs7O0lBRUQsd0NBQWlCOzs7O0lBQWpCLFVBQWtCLE9BQWdDOztRQUU5QyxJQUFJLElBQUksR0FBNEI7WUFDaEMsTUFBTSxFQUFFLE9BQU8sVUFBTztZQUN0QixHQUFHLEVBQUUsT0FBTyxPQUFJO1lBQ2hCLE9BQU8sRUFBRSxPQUFPLGVBQVksSUFBSSxDQUFDLE9BQU87U0FDM0MsQ0FBQztRQUVGLElBQUcsT0FBTyxhQUFVLElBQUksSUFBSSxNQUFNLEtBQUssT0FBTyxnQkFBYTtZQUN2RCxJQUFJLGVBQVksTUFBTSxDQUFDO2FBQ3RCLElBQUcsTUFBTSxLQUFLLE9BQU8sZ0JBQWE7WUFDbkMsSUFBSSxlQUFZLE1BQU0sQ0FBQztRQUUzQixJQUFHLE9BQU8sWUFBUztZQUNmLElBQUksYUFBVSxPQUFPLFVBQU8sQ0FBQztTQUNoQztRQUVELElBQUcsT0FBTyxVQUFPO1lBQ2IsSUFBSSxXQUFRLE9BQU8sUUFBSyxDQUFDO1NBQzVCOztRQUdELElBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTs7WUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekIsSUFBRyxLQUFLLEVBQUU7Z0JBQ04sSUFBSSxjQUFXLElBQUksZUFBWSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksWUFBUyxhQUFhLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDL0MsSUFBSSxpQkFBYyxJQUFJLENBQUM7YUFDMUI7U0FDSjs7UUFHRCxJQUFHLE9BQU8sYUFBVTtZQUNoQixLQUFJLElBQUksQ0FBQyxJQUFJLE9BQU8sYUFBVTtnQkFDMUIsSUFBRyxPQUFPLFlBQVMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxZQUFTLENBQUMsQ0FBQyxDQUFDO2lCQUNoQzthQUNKO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztLQUNmOzs7OztJQUVELDhCQUFPOzs7O0lBQVAsVUFBUSxJQUFVOztRQUVkLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBRSxLQUFLLENBQUU7YUFDeEIsSUFBSSxDQUFDLFVBQUEsS0FBSztZQUNQLElBQUcsT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVc7Z0JBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQzs7WUFHbEQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEIsQ0FBQzthQUNELElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBRSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQWIsQ0FBYSxDQUFDO2FBQzdCLEtBQUssQ0FBQyxVQUFBLFFBQVEsSUFBRSxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUF2QixDQUF1QixDQUFDLENBQUM7S0FDN0M7dUJBbkZMO0VBUzJCLFlBQVksRUE0RXRDLENBQUE7Ozs7O0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gXCJhbmd1bGFyXCI7XG5pbXBvcnQgeyBHUEh0dHBDbGllbnQgfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5cbi8vIGNvbnN0IGFuZ3VsYXIgPSAod2luZG93IGFzIGFueSkuYW5ndWxhciB8fCBudWxsO1xuXG5cbmNsYXNzIE5HSHR0cENsaWVudCBleHRlbmRzIEdQSHR0cENsaWVudCB7XG5cbiAgICBwcml2YXRlICRodHRwIDogYW55O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvbnMudGltZW91dFxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRva2VuIC0gdGhlIGJlYXJlciB0b2tlbiBvciBhIGZ1bmN0aW9uIHRvIHJldHJpZXZlIGl0XG4gICAgICogQHBhcmFtIG9wdGlvbnMuJGh0dHAgLSBhbmd1bGFyICRodHRwIHNlcnZpY2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IHsgW2tleTpzdHJpbmddIDogYW55IH0pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIGlmKHR5cGVvZihhbmd1bGFyKSA9PT0gJ3VuZGVmaW5lZCcgfHwgYW5ndWxhciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW5ndWxhckpTIGNvdWxkIG5vdCBiZSBmb3VuZCBnbG9iYWxseVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMuJGh0dHApXG4gICAgICAgICAgICB0aGlzLiRodHRwID0gb3B0aW9ucy4kaHR0cDtcbiAgICB9XG5cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zIDogeyBba2V5OnN0cmluZ10gOiBhbnkgfSkgOiBhbnkge1xuXG4gICAgICAgIGxldCBvcHRzIDogeyBba2V5OnN0cmluZ10gOiBhbnkgfSA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogb3B0aW9ucy5tZXRob2QsXG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMudXJsLFxuICAgICAgICAgICAgdGltZW91dDogb3B0aW9ucy50aW1lb3V0IHx8IHRoaXMudGltZW91dFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmKG9wdGlvbnMuanNvbiA9PT0gdHJ1ZSB8fCAnanNvbicgPT09IG9wdGlvbnMucmVzcG9uc2VUeXBlKVxuICAgICAgICAgICAgb3B0cy5kYXRhVHlwZSA9ICdqc29uJztcbiAgICAgICAgZWxzZSBpZigndGV4dCcgPT09IG9wdGlvbnMucmVzcG9uc2VUeXBlKVxuICAgICAgICAgICAgb3B0cy5kYXRhVHlwZSA9ICd0ZXh0JztcblxuICAgICAgICBpZihvcHRpb25zLnBhcmFtcykge1xuICAgICAgICAgICAgb3B0cy5wYXJhbXMgPSBvcHRpb25zLnBhcmFtcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9wdGlvbnMuZGF0YSkge1xuICAgICAgICAgICAgb3B0cy5kYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9zZXQgYXV0aG9yaXphdGlvbiB0b2tlbiBpZiBvbmUgd2FzIHByb3ZpZGVkXG4gICAgICAgIGlmKHRoaXMudG9rZW4pIHtcbiAgICAgICAgICAgIGxldCB0b2tlbiA9IHRoaXMudG9rZW4oKTtcbiAgICAgICAgICAgIGlmKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5oZWFkZXJzID0gb3B0cy5oZWFkZXJzIHx8IHt9O1xuICAgICAgICAgICAgICAgIG9wdHMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgdG9rZW47XG4gICAgICAgICAgICAgICAgb3B0cy51c2VYRG9tYWluID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29weSBvdmVyIHVzZXItc3VwcGxpZWQgb3B0aW9uc1xuICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgbyBpbiBvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMuaGFzT3duUHJvcGVydHkobykpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0c1tvXSA9IG9wdGlvbnMub3B0aW9uc1tvXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0cztcbiAgICB9XG5cbiAgICBleGVjdXRlKG9wdHMgOiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGxldCAkaHR0cCA9IHRoaXMuJGh0dHAgfHwgYW5ndWxhci5pbmplY3RvcihbJ25nJ10pLmdldCgnJGh0dHAnKTtcbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggJGh0dHAgKVxuICAgICAgICAudGhlbigkaHR0cCA9PiB7XG4gICAgICAgICAgICBpZih0eXBlb2YoJGh0dHApID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbmd1bGFyICRodHRwIG5vdCByZXNvbHZlZFwiKTtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cob3B0cyk7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlPT5yZXNwb25zZS5kYXRhKVxuICAgICAgICAuY2F0Y2gocmVzcG9uc2U9PlEucmVqZWN0KHJlc3BvbnNlLmRhdGEpKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTkdIdHRwQ2xpZW50O1xuIl19