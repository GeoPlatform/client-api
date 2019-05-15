/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from 'q';
import axios from 'axios';
import GPError from '../shared/error';
import GPHttpClient from './client';
class XHRHttpClient extends GPHttpClient {
    /**
     * @param {?=} options
     */
    constructor(options) {
        super(options);
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
            let token = this.token();
            if (token) {
                opts["headers"] = opts["headers"] || {};
                opts["headers"].Authorization = 'Bearer ' + token;
                opts["withCredentials"] = true;
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
        if (typeof (axios) === 'undefined') {
            throw new Error("Axios not found, check that you have included " +
                "it as a dependency of the application or use a different " +
                "HttpClient implementation");
        }
        /** @type {?} */
        let promise = axios(opts)
            .then(response => { return response.data; })
            .catch(error => {
            /** @type {?} */
            let err = new GPError(error.message);
            if (error.response) {
                err = new GPError(error.response.data);
            }
            return Q.reject(err);
        });
        return Q.resolve(promise);
    }
}
export default XHRHttpClient;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbImh0dHAveGhyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztBQUN2QixPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxPQUFPLE1BQU0saUJBQWlCLENBQUM7QUFDdEMsT0FBTyxZQUFZLE1BQU0sVUFBVSxDQUFDO0FBR3BDLG1CQUFvQixTQUFRLFlBQVk7Ozs7SUFNcEMsWUFBWSxPQUFpQztRQUN6QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDbEI7Ozs7O0lBR0QsaUJBQWlCLENBQUMsT0FBZ0M7O1FBRTlDLElBQUksSUFBSSxHQUE0QjtZQUNoQyxNQUFNLEVBQUUsT0FBTyxVQUFPO1lBQ3RCLEdBQUcsRUFBRSxPQUFPLE9BQUk7WUFDaEIsT0FBTyxFQUFFLE9BQU8sZUFBWSxJQUFJLENBQUMsT0FBTztTQUMzQyxDQUFDO1FBRUYsSUFBRyxPQUFPLGFBQVUsSUFBSTtZQUNwQixJQUFJLG1CQUFnQixNQUFNLENBQUM7UUFFL0IsSUFBRyxPQUFPLFlBQVM7WUFDZixJQUFJLGFBQVUsT0FBTyxVQUFPLENBQUM7U0FDaEM7UUFFRCxJQUFHLE9BQU8sVUFBTztZQUNiLElBQUksV0FBUSxPQUFPLFFBQUssQ0FBQztZQUN6QixJQUFJLGtCQUFlLGtCQUFrQixDQUFDO1NBQ3pDOztRQUdELElBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTs7WUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekIsSUFBRyxLQUFLLEVBQUU7Z0JBQ04sSUFBSSxjQUFXLElBQUksZUFBWSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksWUFBUyxhQUFhLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDL0MsSUFBSSxzQkFBbUIsSUFBSSxDQUFDO2FBQy9CO1NBQ0o7O1FBR0QsSUFBRyxPQUFPLGFBQVU7WUFDaEIsS0FBSSxJQUFJLENBQUMsSUFBSSxPQUFPLGFBQVU7Z0JBQzFCLElBQUcsT0FBTyxZQUFTLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sWUFBUyxDQUFDLENBQUMsQ0FBQztpQkFDaEM7YUFDSjtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7S0FDZjs7Ozs7SUFHRCxPQUFPLENBQUMsSUFBVTtRQUVkLElBQUcsT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsRUFBRTtZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRDtnQkFDNUQsMkRBQTJEO2dCQUMzRCwyQkFBMkIsQ0FBQyxDQUFBO1NBQ25DOztRQUVELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDeEIsSUFBSSxDQUFFLFFBQVEsQ0FBQyxFQUFFLEdBQUcsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzthQUM1QyxLQUFLLENBQUUsS0FBSyxDQUFDLEVBQUU7O1lBQ1osSUFBSSxHQUFHLEdBQWEsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9DLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUM7WUFDRCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzdCO0NBRUo7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUSBmcm9tICdxJztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgR1BFcnJvciBmcm9tICcuLi9zaGFyZWQvZXJyb3InO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuL2NsaWVudCc7XG5cblxuY2xhc3MgWEhSSHR0cENsaWVudCBleHRlbmRzIEdQSHR0cENsaWVudCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50aW1lb3V0XG4gICAgICogQHBhcmFtIG9wdGlvbnMudG9rZW4gLSB0aGUgYmVhcmVyIHRva2VuIG9yIGEgZnVuY3Rpb24gdG8gcmV0cmlldmUgaXRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IHsgW2tleTpzdHJpbmddIDogYW55IH0pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxuXG5cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zIDogeyBba2V5OnN0cmluZ10gOiBhbnkgfSkgOiBhbnkge1xuXG4gICAgICAgIGxldCBvcHRzIDogeyBba2V5OnN0cmluZ10gOiBhbnkgfSA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogb3B0aW9ucy5tZXRob2QsXG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMudXJsLFxuICAgICAgICAgICAgdGltZW91dDogb3B0aW9ucy50aW1lb3V0IHx8IHRoaXMudGltZW91dFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmKG9wdGlvbnMuanNvbiA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIG9wdHMucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXG4gICAgICAgIGlmKG9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICBvcHRzLnBhcmFtcyA9IG9wdGlvbnMucGFyYW1zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICBvcHRzLmRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICAgICAgICBvcHRzLmNvbnRlbnRUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9zZXQgYXV0aG9yaXphdGlvbiBoZWFkZXIgaWYgb25lIHdhcyBwcm92aWRlZFxuICAgICAgICBpZih0aGlzLnRva2VuKSB7XG4gICAgICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLnRva2VuKCk7XG4gICAgICAgICAgICBpZih0b2tlbikge1xuICAgICAgICAgICAgICAgIG9wdHMuaGVhZGVycyA9IG9wdHMuaGVhZGVycyB8fCB7fTtcbiAgICAgICAgICAgICAgICBvcHRzLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIHRva2VuO1xuICAgICAgICAgICAgICAgIG9wdHMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29weSBvdmVyIHVzZXItc3VwcGxpZWQgb3B0aW9uc1xuICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgbyBpbiBvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMuaGFzT3duUHJvcGVydHkobykpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0c1tvXSA9IG9wdGlvbnMub3B0aW9uc1tvXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0cztcbiAgICB9XG5cblxuICAgIGV4ZWN1dGUob3B0cyA6IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgaWYodHlwZW9mKGF4aW9zKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkF4aW9zIG5vdCBmb3VuZCwgY2hlY2sgdGhhdCB5b3UgaGF2ZSBpbmNsdWRlZCBcIiArXG4gICAgICAgICAgICAgICAgXCJpdCBhcyBhIGRlcGVuZGVuY3kgb2YgdGhlIGFwcGxpY2F0aW9uIG9yIHVzZSBhIGRpZmZlcmVudCBcIiArXG4gICAgICAgICAgICAgICAgXCJIdHRwQ2xpZW50IGltcGxlbWVudGF0aW9uXCIpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvbWlzZSA9IGF4aW9zKG9wdHMpXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiB7IHJldHVybiByZXNwb25zZS5kYXRhOyB9KVxuICAgICAgICAuY2F0Y2goIGVycm9yID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgOiBHUEVycm9yID0gbmV3IEdQRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBlcnIgPSBuZXcgR1BFcnJvcihlcnJvci5yZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZShwcm9taXNlKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgWEhSSHR0cENsaWVudDtcbiJdfQ==