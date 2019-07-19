/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        if (options && options["$q"])
            _this.$q = options["$q"];
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
        var $injector = angular.injector(['ng']);
        /** @type {?} */
        var $q = this.$q || $injector.get('$q');
        /** @type {?} */
        var $http = this.$http || $injector.get('$http');
        /** @type {?} */
        var deferred = $q.defer();
        $http(opts)
            .then(function (response) { deferred.resolve(response.data); })
            .catch(function (response) { deferred.reject(new Error(response.data)); });
        return /** @type {?} */ (deferred.promise.then(function (data) { return data; }));
        // return Promise.resolve( $http )
        // .then($http => {
        //     if(typeof($http) === 'undefined')
        //         throw new Error("Angular $http not resolved");
        //
        //     // console.log(opts);
        //     return $http(opts);
        // })
        // .then(response=> () => {
        //     return $timeout(()=>{return response.data;});
        // })
        // .catch(response=> { throw new Error(response.data); });
    };
    return NGHttpClient;
}(GPHttpClient));
if (false) {
    /** @type {?} */
    NGHttpClient.prototype.$http;
    /** @type {?} */
    NGHttpClient.prototype.$q;
}
export default NGHttpClient;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImh0dHAvbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFJbkQsSUFBQTtJQUEyQix3Q0FBWTtJQUtuQzs7OztPQUlHO0lBQ0gsc0JBQVksT0FBaUM7UUFBN0MsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FRakI7UUFQRyxJQUFHLE9BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFHLE9BQU8sSUFBSSxPQUFPLFNBQU07WUFDdkIsS0FBSSxDQUFDLEtBQUssR0FBRyxPQUFPLFNBQU0sQ0FBQztRQUMvQixJQUFHLE9BQU8sSUFBSSxPQUFPLE1BQUc7WUFDcEIsS0FBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLE1BQUcsQ0FBQzs7S0FDNUI7Ozs7O0lBRUQsd0NBQWlCOzs7O0lBQWpCLFVBQWtCLE9BQWdDOztRQUU5QyxJQUFJLElBQUksR0FBNEI7WUFDaEMsTUFBTSxFQUFFLE9BQU8sVUFBTztZQUN0QixHQUFHLEVBQUUsT0FBTyxPQUFJO1lBQ2hCLE9BQU8sRUFBRSxPQUFPLGVBQVksSUFBSSxDQUFDLE9BQU87U0FDM0MsQ0FBQztRQUVGLElBQUcsT0FBTyxhQUFVLElBQUksSUFBSSxNQUFNLEtBQUssT0FBTyxnQkFBYTtZQUN2RCxJQUFJLGVBQVksTUFBTSxDQUFDO2FBQ3RCLElBQUcsTUFBTSxLQUFLLE9BQU8sZ0JBQWE7WUFDbkMsSUFBSSxlQUFZLE1BQU0sQ0FBQztRQUUzQixJQUFHLE9BQU8sWUFBUztZQUNmLElBQUksYUFBVSxPQUFPLFVBQU8sQ0FBQztTQUNoQztRQUVELElBQUcsT0FBTyxVQUFPO1lBQ2IsSUFBSSxXQUFRLE9BQU8sUUFBSyxDQUFDO1NBQzVCOztRQUdELElBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTs7WUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekIsSUFBRyxLQUFLLEVBQUU7Z0JBQ04sSUFBSSxjQUFXLElBQUksZUFBWSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksWUFBUyxhQUFhLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDL0MsSUFBSSxpQkFBYyxJQUFJLENBQUM7YUFDMUI7U0FDSjs7UUFHRCxJQUFHLE9BQU8sYUFBVTtZQUNoQixLQUFJLElBQUksQ0FBQyxJQUFJLE9BQU8sYUFBVTtnQkFDMUIsSUFBRyxPQUFPLFlBQVMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxZQUFTLENBQUMsQ0FBQyxDQUFDO2lCQUNoQzthQUNKO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztLQUNmOzs7OztJQUVELDhCQUFPOzs7O0lBQVAsVUFBUSxJQUFVOztRQUVkLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztRQUN6QyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBQ3hDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7UUFFakQsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzFCLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDVixJQUFJLENBQUUsVUFBQSxRQUFRLElBQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ3ZELEtBQUssQ0FBQyxVQUFBLFFBQVEsSUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLHlCQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSSxJQUFHLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBaUIsRUFBQzs7Ozs7Ozs7Ozs7OztLQWM5RDt1QkE5Rkw7RUFNMkIsWUFBWSxFQTBGdEMsQ0FBQTs7Ozs7OztBQUVELGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gXCJhbmd1bGFyXCI7XG5pbXBvcnQgeyBHUEh0dHBDbGllbnQgfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5cblxuY2xhc3MgTkdIdHRwQ2xpZW50IGV4dGVuZHMgR1BIdHRwQ2xpZW50IHtcblxuICAgIHByaXZhdGUgJGh0dHAgOiBhbnk7XG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRpbWVvdXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50b2tlbiAtIHRoZSBiZWFyZXIgdG9rZW4gb3IgYSBmdW5jdGlvbiB0byByZXRyaWV2ZSBpdFxuICAgICAqIEBwYXJhbSBvcHRpb25zLiRodHRwIC0gYW5ndWxhciAkaHR0cCBzZXJ2aWNlIGluc3RhbmNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA/OiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICBpZih0eXBlb2YoYW5ndWxhcikgPT09ICd1bmRlZmluZWQnIHx8IGFuZ3VsYXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuZ3VsYXJKUyBjb3VsZCBub3QgYmUgZm91bmQgZ2xvYmFsbHlcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLiRodHRwKVxuICAgICAgICAgICAgdGhpcy4kaHR0cCA9IG9wdGlvbnMuJGh0dHA7XG4gICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy4kcSlcbiAgICAgICAgICAgIHRoaXMuJHEgPSBvcHRpb25zLiRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSA6IGFueSB7XG5cbiAgICAgICAgbGV0IG9wdHMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiBvcHRpb25zLm1ldGhvZCxcbiAgICAgICAgICAgIHVybDogb3B0aW9ucy51cmwsXG4gICAgICAgICAgICB0aW1lb3V0OiBvcHRpb25zLnRpbWVvdXQgfHwgdGhpcy50aW1lb3V0XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYob3B0aW9ucy5qc29uID09PSB0cnVlIHx8ICdqc29uJyA9PT0gb3B0aW9ucy5yZXNwb25zZVR5cGUpXG4gICAgICAgICAgICBvcHRzLmRhdGFUeXBlID0gJ2pzb24nO1xuICAgICAgICBlbHNlIGlmKCd0ZXh0JyA9PT0gb3B0aW9ucy5yZXNwb25zZVR5cGUpXG4gICAgICAgICAgICBvcHRzLmRhdGFUeXBlID0gJ3RleHQnO1xuXG4gICAgICAgIGlmKG9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICBvcHRzLnBhcmFtcyA9IG9wdGlvbnMucGFyYW1zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICBvcHRzLmRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldCBhdXRob3JpemF0aW9uIHRva2VuIGlmIG9uZSB3YXMgcHJvdmlkZWRcbiAgICAgICAgaWYodGhpcy50b2tlbikge1xuICAgICAgICAgICAgbGV0IHRva2VuID0gdGhpcy50b2tlbigpO1xuICAgICAgICAgICAgaWYodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBvcHRzLmhlYWRlcnMgPSBvcHRzLmhlYWRlcnMgfHwge307XG4gICAgICAgICAgICAgICAgb3B0cy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyB0b2tlbjtcbiAgICAgICAgICAgICAgICBvcHRzLnVzZVhEb21haW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9jb3B5IG92ZXIgdXNlci1zdXBwbGllZCBvcHRpb25zXG4gICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgZm9yKGxldCBvIGluIG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzW29dID0gb3B0aW9ucy5vcHRpb25zW29dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRzO1xuICAgIH1cblxuICAgIGV4ZWN1dGUob3B0cyA6IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGxldCAkaW5qZWN0b3IgPSBhbmd1bGFyLmluamVjdG9yKFsnbmcnXSk7XG4gICAgICAgIGxldCAkcSA9IHRoaXMuJHEgfHwgJGluamVjdG9yLmdldCgnJHEnKTtcbiAgICAgICAgbGV0ICRodHRwID0gdGhpcy4kaHR0cCB8fCAkaW5qZWN0b3IuZ2V0KCckaHR0cCcpO1xuXG4gICAgICAgIGxldCBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICRodHRwKG9wdHMpXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiB7IGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UuZGF0YSk7IH0pXG4gICAgICAgIC5jYXRjaChyZXNwb25zZSA9PiB7IGRlZmVycmVkLnJlamVjdChuZXcgRXJyb3IocmVzcG9uc2UuZGF0YSkpOyB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UudGhlbigoZGF0YSk9PmRhdGEpIGFzIFByb21pc2U8YW55PjtcblxuICAgICAgICAvLyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCAkaHR0cCApXG4gICAgICAgIC8vIC50aGVuKCRodHRwID0+IHtcbiAgICAgICAgLy8gICAgIGlmKHR5cGVvZigkaHR0cCkgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAvLyAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuZ3VsYXIgJGh0dHAgbm90IHJlc29sdmVkXCIpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2cob3B0cyk7XG4gICAgICAgIC8vICAgICByZXR1cm4gJGh0dHAob3B0cyk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC50aGVuKHJlc3BvbnNlPT4gKCkgPT4ge1xuICAgICAgICAvLyAgICAgcmV0dXJuICR0aW1lb3V0KCgpPT57cmV0dXJuIHJlc3BvbnNlLmRhdGE7fSk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC5jYXRjaChyZXNwb25zZT0+IHsgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLmRhdGEpOyB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTkdIdHRwQ2xpZW50O1xuIl19