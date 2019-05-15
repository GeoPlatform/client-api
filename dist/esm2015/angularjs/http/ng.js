/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from 'q';
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
        return Q.resolve($http)
            .then($http => {
            if (typeof ($http) === 'undefined')
                throw new Error("Angular $http not resolved");
            // console.log(opts);
            return $http(opts);
        })
            .then(response => response.data)
            .catch(response => Q.reject(response.data));
    }
}
if (false) {
    /** @type {?} */
    NGHttpClient.prototype.$http;
}
export default NGHttpClient;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImh0dHAvbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU1uRCxrQkFBbUIsU0FBUSxZQUFZOzs7O0lBU25DLFlBQVksT0FBaUM7UUFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBRyxPQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBVyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBRyxPQUFPLElBQUksT0FBTyxTQUFNO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxTQUFNLENBQUM7S0FDbEM7Ozs7O0lBRUQsaUJBQWlCLENBQUMsT0FBZ0M7O1FBRTlDLElBQUksSUFBSSxHQUE0QjtZQUNoQyxNQUFNLEVBQUUsT0FBTyxVQUFPO1lBQ3RCLEdBQUcsRUFBRSxPQUFPLE9BQUk7WUFDaEIsT0FBTyxFQUFFLE9BQU8sZUFBWSxJQUFJLENBQUMsT0FBTztTQUMzQyxDQUFDO1FBRUYsSUFBRyxPQUFPLGFBQVUsSUFBSSxJQUFJLE1BQU0sS0FBSyxPQUFPLGdCQUFhO1lBQ3ZELElBQUksZUFBWSxNQUFNLENBQUM7YUFDdEIsSUFBRyxNQUFNLEtBQUssT0FBTyxnQkFBYTtZQUNuQyxJQUFJLGVBQVksTUFBTSxDQUFDO1FBRTNCLElBQUcsT0FBTyxZQUFTO1lBQ2YsSUFBSSxhQUFVLE9BQU8sVUFBTyxDQUFDO1NBQ2hDO1FBRUQsSUFBRyxPQUFPLFVBQU87WUFDYixJQUFJLFdBQVEsT0FBTyxRQUFLLENBQUM7U0FDNUI7O1FBR0QsSUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFOztZQUNYLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN6QixJQUFHLEtBQUssRUFBRTtnQkFDTixJQUFJLGNBQVcsSUFBSSxlQUFZLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxZQUFTLGFBQWEsR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUMvQyxJQUFJLGlCQUFjLElBQUksQ0FBQzthQUMxQjtTQUNKOztRQUdELElBQUcsT0FBTyxhQUFVO1lBQ2hCLEtBQUksSUFBSSxDQUFDLElBQUksT0FBTyxhQUFVO2dCQUMxQixJQUFHLE9BQU8sWUFBUyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLFlBQVMsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDO2FBQ0o7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQVU7O1FBRWQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFFLEtBQUssQ0FBRTthQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDVixJQUFHLE9BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXO2dCQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7O1lBR2xELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCLENBQUM7YUFDRCxJQUFJLENBQUMsUUFBUSxDQUFBLEVBQUUsQ0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDO2FBQzdCLEtBQUssQ0FBQyxRQUFRLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDN0M7Q0FFSjs7Ozs7QUFFRCxlQUFlLFlBQVksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUSBmcm9tICdxJztcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSBcImFuZ3VsYXJcIjtcbmltcG9ydCB7IEdQSHR0cENsaWVudCB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cblxuLy8gY29uc3QgYW5ndWxhciA9ICh3aW5kb3cgYXMgYW55KS5hbmd1bGFyIHx8IG51bGw7XG5cblxuY2xhc3MgTkdIdHRwQ2xpZW50IGV4dGVuZHMgR1BIdHRwQ2xpZW50IHtcblxuICAgIHByaXZhdGUgJGh0dHAgOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50aW1lb3V0XG4gICAgICogQHBhcmFtIG9wdGlvbnMudG9rZW4gLSB0aGUgYmVhcmVyIHRva2VuIG9yIGEgZnVuY3Rpb24gdG8gcmV0cmlldmUgaXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy4kaHR0cCAtIGFuZ3VsYXIgJGh0dHAgc2VydmljZSBpbnN0YW5jZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPzogeyBba2V5OnN0cmluZ10gOiBhbnkgfSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgaWYodHlwZW9mKGFuZ3VsYXIpID09PSAndW5kZWZpbmVkJyB8fCBhbmd1bGFyID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbmd1bGFySlMgY291bGQgbm90IGJlIGZvdW5kIGdsb2JhbGx5XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy4kaHR0cClcbiAgICAgICAgICAgIHRoaXMuJGh0dHAgPSBvcHRpb25zLiRodHRwO1xuICAgIH1cblxuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSA6IGFueSB7XG5cbiAgICAgICAgbGV0IG9wdHMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiBvcHRpb25zLm1ldGhvZCxcbiAgICAgICAgICAgIHVybDogb3B0aW9ucy51cmwsXG4gICAgICAgICAgICB0aW1lb3V0OiBvcHRpb25zLnRpbWVvdXQgfHwgdGhpcy50aW1lb3V0XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYob3B0aW9ucy5qc29uID09PSB0cnVlIHx8ICdqc29uJyA9PT0gb3B0aW9ucy5yZXNwb25zZVR5cGUpXG4gICAgICAgICAgICBvcHRzLmRhdGFUeXBlID0gJ2pzb24nO1xuICAgICAgICBlbHNlIGlmKCd0ZXh0JyA9PT0gb3B0aW9ucy5yZXNwb25zZVR5cGUpXG4gICAgICAgICAgICBvcHRzLmRhdGFUeXBlID0gJ3RleHQnO1xuXG4gICAgICAgIGlmKG9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICBvcHRzLnBhcmFtcyA9IG9wdGlvbnMucGFyYW1zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICBvcHRzLmRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldCBhdXRob3JpemF0aW9uIHRva2VuIGlmIG9uZSB3YXMgcHJvdmlkZWRcbiAgICAgICAgaWYodGhpcy50b2tlbikge1xuICAgICAgICAgICAgbGV0IHRva2VuID0gdGhpcy50b2tlbigpO1xuICAgICAgICAgICAgaWYodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBvcHRzLmhlYWRlcnMgPSBvcHRzLmhlYWRlcnMgfHwge307XG4gICAgICAgICAgICAgICAgb3B0cy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyB0b2tlbjtcbiAgICAgICAgICAgICAgICBvcHRzLnVzZVhEb21haW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9jb3B5IG92ZXIgdXNlci1zdXBwbGllZCBvcHRpb25zXG4gICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgZm9yKGxldCBvIGluIG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzW29dID0gb3B0aW9ucy5vcHRpb25zW29dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRzO1xuICAgIH1cblxuICAgIGV4ZWN1dGUob3B0cyA6IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgbGV0ICRodHRwID0gdGhpcy4kaHR0cCB8fCBhbmd1bGFyLmluamVjdG9yKFsnbmcnXSkuZ2V0KCckaHR0cCcpO1xuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCAkaHR0cCApXG4gICAgICAgIC50aGVuKCRodHRwID0+IHtcbiAgICAgICAgICAgIGlmKHR5cGVvZigkaHR0cCkgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuZ3VsYXIgJGh0dHAgbm90IHJlc29sdmVkXCIpO1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhvcHRzKTtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cChvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2U9PnJlc3BvbnNlLmRhdGEpXG4gICAgICAgIC5jYXRjaChyZXNwb25zZT0+US5yZWplY3QocmVzcG9uc2UuZGF0YSkpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBOR0h0dHBDbGllbnQ7XG4iXX0=