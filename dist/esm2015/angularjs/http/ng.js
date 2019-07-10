/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as angular from "angular";
import { GPHttpClient } from "@geoplatform/client";
class NGHttpClient extends GPHttpClient {
    /**
     * @param {?=} options
     */
    constructor(options) {
        super(options);
        if (typeof (angular) === 'undefined' || angular === null) {
            throw new Error("AngularJS could not be found globally");
        }
        if (options && options["$http"])
            this.$http = options["$http"];
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(options) {
        /** @type {?} */
        let opts = {
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
            let token = this.token();
            if (token) {
                opts["headers"] = opts["headers"] || {};
                opts["headers"].Authorization = 'Bearer ' + token;
                opts["useXDomain"] = true;
            }
        }
        //copy over user-supplied options
        if (options["options"]) {
            for (let o in options["options"]) {
                if (options["options"].hasOwnProperty(o)) {
                    opts[o] = options["options"][o];
                }
            }
        }
        return opts;
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    execute(opts) {
        /** @type {?} */
        let $http = this.$http || angular.injector(['ng']).get('$http');
        return Promise.resolve($http)
            .then($http => {
            if (typeof ($http) === 'undefined')
                throw new Error("Angular $http not resolved");
            // console.log(opts);
            return $http(opts);
        })
            .then(response => response.data)
            .catch(response => { throw new Error(response.data); });
    }
}
if (false) {
    /** @type {?} */
    NGHttpClient.prototype.$http;
}
export default NGHttpClient;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImh0dHAvbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUluRCxrQkFBbUIsU0FBUSxZQUFZOzs7O0lBU25DLFlBQVksT0FBaUM7UUFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBRyxPQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBVyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBRyxPQUFPLElBQUksT0FBTyxTQUFNO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxTQUFNLENBQUM7S0FDbEM7Ozs7O0lBRUQsaUJBQWlCLENBQUMsT0FBZ0M7O1FBRTlDLElBQUksSUFBSSxHQUE0QjtZQUNoQyxNQUFNLEVBQUUsT0FBTyxVQUFPO1lBQ3RCLEdBQUcsRUFBRSxPQUFPLE9BQUk7WUFDaEIsT0FBTyxFQUFFLE9BQU8sZUFBWSxJQUFJLENBQUMsT0FBTztTQUMzQyxDQUFDO1FBRUYsSUFBRyxPQUFPLGFBQVUsSUFBSSxJQUFJLE1BQU0sS0FBSyxPQUFPLGdCQUFhO1lBQ3ZELElBQUksZUFBWSxNQUFNLENBQUM7YUFDdEIsSUFBRyxNQUFNLEtBQUssT0FBTyxnQkFBYTtZQUNuQyxJQUFJLGVBQVksTUFBTSxDQUFDO1FBRTNCLElBQUcsT0FBTyxZQUFTO1lBQ2YsSUFBSSxhQUFVLE9BQU8sVUFBTyxDQUFDO1NBQ2hDO1FBRUQsSUFBRyxPQUFPLFVBQU87WUFDYixJQUFJLFdBQVEsT0FBTyxRQUFLLENBQUM7U0FDNUI7O1FBR0QsSUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFOztZQUNYLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN6QixJQUFHLEtBQUssRUFBRTtnQkFDTixJQUFJLGNBQVcsSUFBSSxlQUFZLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxZQUFTLGFBQWEsR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUMvQyxJQUFJLGlCQUFjLElBQUksQ0FBQzthQUMxQjtTQUNKOztRQUdELElBQUcsT0FBTyxhQUFVO1lBQ2hCLEtBQUksSUFBSSxDQUFDLElBQUksT0FBTyxhQUFVO2dCQUMxQixJQUFHLE9BQU8sWUFBUyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLFlBQVMsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDO2FBQ0o7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQVU7O1FBRWQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFFLEtBQUssQ0FBRTthQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDVixJQUFHLE9BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXO2dCQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7O1lBR2xELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCLENBQUM7YUFDRCxJQUFJLENBQUMsUUFBUSxDQUFBLEVBQUUsQ0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDO2FBQzdCLEtBQUssQ0FBQyxRQUFRLENBQUEsRUFBRSxHQUFHLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzFEO0NBRUo7Ozs7O0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSBcImFuZ3VsYXJcIjtcbmltcG9ydCB7IEdQSHR0cENsaWVudCB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cblxuXG5jbGFzcyBOR0h0dHBDbGllbnQgZXh0ZW5kcyBHUEh0dHBDbGllbnQge1xuXG4gICAgcHJpdmF0ZSAkaHR0cCA6IGFueTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRpbWVvdXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50b2tlbiAtIHRoZSBiZWFyZXIgdG9rZW4gb3IgYSBmdW5jdGlvbiB0byByZXRyaWV2ZSBpdFxuICAgICAqIEBwYXJhbSBvcHRpb25zLiRodHRwIC0gYW5ndWxhciAkaHR0cCBzZXJ2aWNlIGluc3RhbmNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA/OiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICBpZih0eXBlb2YoYW5ndWxhcikgPT09ICd1bmRlZmluZWQnIHx8IGFuZ3VsYXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuZ3VsYXJKUyBjb3VsZCBub3QgYmUgZm91bmQgZ2xvYmFsbHlcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLiRodHRwKVxuICAgICAgICAgICAgdGhpcy4kaHR0cCA9IG9wdGlvbnMuJGh0dHA7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0pIDogYW55IHtcblxuICAgICAgICBsZXQgb3B0cyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0gPSB7XG4gICAgICAgICAgICBtZXRob2Q6IG9wdGlvbnMubWV0aG9kLFxuICAgICAgICAgICAgdXJsOiBvcHRpb25zLnVybCxcbiAgICAgICAgICAgIHRpbWVvdXQ6IG9wdGlvbnMudGltZW91dCB8fCB0aGlzLnRpbWVvdXRcbiAgICAgICAgfTtcblxuICAgICAgICBpZihvcHRpb25zLmpzb24gPT09IHRydWUgfHwgJ2pzb24nID09PSBvcHRpb25zLnJlc3BvbnNlVHlwZSlcbiAgICAgICAgICAgIG9wdHMuZGF0YVR5cGUgPSAnanNvbic7XG4gICAgICAgIGVsc2UgaWYoJ3RleHQnID09PSBvcHRpb25zLnJlc3BvbnNlVHlwZSlcbiAgICAgICAgICAgIG9wdHMuZGF0YVR5cGUgPSAndGV4dCc7XG5cbiAgICAgICAgaWYob3B0aW9ucy5wYXJhbXMpIHtcbiAgICAgICAgICAgIG9wdHMucGFyYW1zID0gb3B0aW9ucy5wYXJhbXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgIG9wdHMuZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vc2V0IGF1dGhvcml6YXRpb24gdG9rZW4gaWYgb25lIHdhcyBwcm92aWRlZFxuICAgICAgICBpZih0aGlzLnRva2VuKSB7XG4gICAgICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLnRva2VuKCk7XG4gICAgICAgICAgICBpZih0b2tlbikge1xuICAgICAgICAgICAgICAgIG9wdHMuaGVhZGVycyA9IG9wdHMuaGVhZGVycyB8fCB7fTtcbiAgICAgICAgICAgICAgICBvcHRzLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIHRva2VuO1xuICAgICAgICAgICAgICAgIG9wdHMudXNlWERvbWFpbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL2NvcHkgb3ZlciB1c2VyLXN1cHBsaWVkIG9wdGlvbnNcbiAgICAgICAgaWYob3B0aW9ucy5vcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IobGV0IG8gaW4gb3B0aW9ucy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYob3B0aW9ucy5vcHRpb25zLmhhc093blByb3BlcnR5KG8pKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHNbb10gPSBvcHRpb25zLm9wdGlvbnNbb107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShvcHRzIDogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgbGV0ICRodHRwID0gdGhpcy4kaHR0cCB8fCBhbmd1bGFyLmluamVjdG9yKFsnbmcnXSkuZ2V0KCckaHR0cCcpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCAkaHR0cCApXG4gICAgICAgIC50aGVuKCRodHRwID0+IHtcbiAgICAgICAgICAgIGlmKHR5cGVvZigkaHR0cCkgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuZ3VsYXIgJGh0dHAgbm90IHJlc29sdmVkXCIpO1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhvcHRzKTtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cChvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2U9PnJlc3BvbnNlLmRhdGEpXG4gICAgICAgIC5jYXRjaChyZXNwb25zZT0+IHsgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLmRhdGEpOyB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTkdIdHRwQ2xpZW50O1xuIl19