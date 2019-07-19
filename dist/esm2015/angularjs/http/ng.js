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
        if (options && options["$q"])
            this.$q = options["$q"];
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
        let $injector = angular.injector(['ng']);
        /** @type {?} */
        let $q = this.$q || $injector.get('$q');
        /** @type {?} */
        let $http = this.$http || $injector.get('$http');
        /** @type {?} */
        let deferred = $q.defer();
        $http(opts)
            .then(response => { deferred.resolve(response.data); })
            .catch(response => { deferred.reject(new Error(response.data)); });
        return /** @type {?} */ (deferred.promise.then((data) => data));
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
    }
}
if (false) {
    /** @type {?} */
    NGHttpClient.prototype.$http;
    /** @type {?} */
    NGHttpClient.prototype.$q;
}
export default NGHttpClient;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImh0dHAvbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUluRCxrQkFBbUIsU0FBUSxZQUFZOzs7O0lBVW5DLFlBQVksT0FBaUM7UUFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBRyxPQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBVyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBRyxPQUFPLElBQUksT0FBTyxTQUFNO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxTQUFNLENBQUM7UUFDL0IsSUFBRyxPQUFPLElBQUksT0FBTyxNQUFHO1lBQ3BCLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxNQUFHLENBQUM7S0FDNUI7Ozs7O0lBRUQsaUJBQWlCLENBQUMsT0FBZ0M7O1FBRTlDLElBQUksSUFBSSxHQUE0QjtZQUNoQyxNQUFNLEVBQUUsT0FBTyxVQUFPO1lBQ3RCLEdBQUcsRUFBRSxPQUFPLE9BQUk7WUFDaEIsT0FBTyxFQUFFLE9BQU8sZUFBWSxJQUFJLENBQUMsT0FBTztTQUMzQyxDQUFDO1FBRUYsSUFBRyxPQUFPLGFBQVUsSUFBSSxJQUFJLE1BQU0sS0FBSyxPQUFPLGdCQUFhO1lBQ3ZELElBQUksZUFBWSxNQUFNLENBQUM7YUFDdEIsSUFBRyxNQUFNLEtBQUssT0FBTyxnQkFBYTtZQUNuQyxJQUFJLGVBQVksTUFBTSxDQUFDO1FBRTNCLElBQUcsT0FBTyxZQUFTO1lBQ2YsSUFBSSxhQUFVLE9BQU8sVUFBTyxDQUFDO1NBQ2hDO1FBRUQsSUFBRyxPQUFPLFVBQU87WUFDYixJQUFJLFdBQVEsT0FBTyxRQUFLLENBQUM7U0FDNUI7O1FBR0QsSUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFOztZQUNYLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN6QixJQUFHLEtBQUssRUFBRTtnQkFDTixJQUFJLGNBQVcsSUFBSSxlQUFZLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxZQUFTLGFBQWEsR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUMvQyxJQUFJLGlCQUFjLElBQUksQ0FBQzthQUMxQjtTQUNKOztRQUdELElBQUcsT0FBTyxhQUFVO1lBQ2hCLEtBQUksSUFBSSxDQUFDLElBQUksT0FBTyxhQUFVO2dCQUMxQixJQUFHLE9BQU8sWUFBUyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLFlBQVMsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDO2FBQ0o7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQVU7O1FBRWQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1FBQ3pDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFDeEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUVqRCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNWLElBQUksQ0FBRSxRQUFRLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUN2RCxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLHlCQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQSxJQUFJLENBQWlCLEVBQUM7Ozs7Ozs7Ozs7Ozs7S0FjOUQ7Q0FFSjs7Ozs7OztBQUVELGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gXCJhbmd1bGFyXCI7XG5pbXBvcnQgeyBHUEh0dHBDbGllbnQgfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5cblxuY2xhc3MgTkdIdHRwQ2xpZW50IGV4dGVuZHMgR1BIdHRwQ2xpZW50IHtcblxuICAgIHByaXZhdGUgJGh0dHAgOiBhbnk7XG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRpbWVvdXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50b2tlbiAtIHRoZSBiZWFyZXIgdG9rZW4gb3IgYSBmdW5jdGlvbiB0byByZXRyaWV2ZSBpdFxuICAgICAqIEBwYXJhbSBvcHRpb25zLiRodHRwIC0gYW5ndWxhciAkaHR0cCBzZXJ2aWNlIGluc3RhbmNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA/OiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICBpZih0eXBlb2YoYW5ndWxhcikgPT09ICd1bmRlZmluZWQnIHx8IGFuZ3VsYXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuZ3VsYXJKUyBjb3VsZCBub3QgYmUgZm91bmQgZ2xvYmFsbHlcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLiRodHRwKVxuICAgICAgICAgICAgdGhpcy4kaHR0cCA9IG9wdGlvbnMuJGh0dHA7XG4gICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy4kcSlcbiAgICAgICAgICAgIHRoaXMuJHEgPSBvcHRpb25zLiRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSA6IGFueSB7XG5cbiAgICAgICAgbGV0IG9wdHMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiBvcHRpb25zLm1ldGhvZCxcbiAgICAgICAgICAgIHVybDogb3B0aW9ucy51cmwsXG4gICAgICAgICAgICB0aW1lb3V0OiBvcHRpb25zLnRpbWVvdXQgfHwgdGhpcy50aW1lb3V0XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYob3B0aW9ucy5qc29uID09PSB0cnVlIHx8ICdqc29uJyA9PT0gb3B0aW9ucy5yZXNwb25zZVR5cGUpXG4gICAgICAgICAgICBvcHRzLmRhdGFUeXBlID0gJ2pzb24nO1xuICAgICAgICBlbHNlIGlmKCd0ZXh0JyA9PT0gb3B0aW9ucy5yZXNwb25zZVR5cGUpXG4gICAgICAgICAgICBvcHRzLmRhdGFUeXBlID0gJ3RleHQnO1xuXG4gICAgICAgIGlmKG9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICBvcHRzLnBhcmFtcyA9IG9wdGlvbnMucGFyYW1zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICBvcHRzLmRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldCBhdXRob3JpemF0aW9uIHRva2VuIGlmIG9uZSB3YXMgcHJvdmlkZWRcbiAgICAgICAgaWYodGhpcy50b2tlbikge1xuICAgICAgICAgICAgbGV0IHRva2VuID0gdGhpcy50b2tlbigpO1xuICAgICAgICAgICAgaWYodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBvcHRzLmhlYWRlcnMgPSBvcHRzLmhlYWRlcnMgfHwge307XG4gICAgICAgICAgICAgICAgb3B0cy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyB0b2tlbjtcbiAgICAgICAgICAgICAgICBvcHRzLnVzZVhEb21haW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9jb3B5IG92ZXIgdXNlci1zdXBwbGllZCBvcHRpb25zXG4gICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgZm9yKGxldCBvIGluIG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzW29dID0gb3B0aW9ucy5vcHRpb25zW29dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRzO1xuICAgIH1cblxuICAgIGV4ZWN1dGUob3B0cyA6IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGxldCAkaW5qZWN0b3IgPSBhbmd1bGFyLmluamVjdG9yKFsnbmcnXSk7XG4gICAgICAgIGxldCAkcSA9IHRoaXMuJHEgfHwgJGluamVjdG9yLmdldCgnJHEnKTtcbiAgICAgICAgbGV0ICRodHRwID0gdGhpcy4kaHR0cCB8fCAkaW5qZWN0b3IuZ2V0KCckaHR0cCcpO1xuXG4gICAgICAgIGxldCBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICRodHRwKG9wdHMpXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiB7IGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UuZGF0YSk7IH0pXG4gICAgICAgIC5jYXRjaChyZXNwb25zZSA9PiB7IGRlZmVycmVkLnJlamVjdChuZXcgRXJyb3IocmVzcG9uc2UuZGF0YSkpOyB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UudGhlbigoZGF0YSk9PmRhdGEpIGFzIFByb21pc2U8YW55PjtcblxuICAgICAgICAvLyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCAkaHR0cCApXG4gICAgICAgIC8vIC50aGVuKCRodHRwID0+IHtcbiAgICAgICAgLy8gICAgIGlmKHR5cGVvZigkaHR0cCkgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAvLyAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuZ3VsYXIgJGh0dHAgbm90IHJlc29sdmVkXCIpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2cob3B0cyk7XG4gICAgICAgIC8vICAgICByZXR1cm4gJGh0dHAob3B0cyk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC50aGVuKHJlc3BvbnNlPT4gKCkgPT4ge1xuICAgICAgICAvLyAgICAgcmV0dXJuICR0aW1lb3V0KCgpPT57cmV0dXJuIHJlc3BvbnNlLmRhdGE7fSk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC5jYXRjaChyZXNwb25zZT0+IHsgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLmRhdGEpOyB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTkdIdHRwQ2xpZW50O1xuIl19