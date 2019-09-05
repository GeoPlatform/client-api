import * as angular from "angular";
import { GPHttpClient } from "@geoplatform/client";
class NGHttpClient extends GPHttpClient {
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     * @param options.$http - angular $http service instance
     */
    constructor(options) {
        super(options);
        if (typeof (angular) === 'undefined' || angular === null) {
            throw new Error("AngularJS could not be found globally");
        }
        if (options && options.$http)
            this.$http = options.$http;
        if (options && options.$q)
            this.$q = options.$q;
    }
    createRequestOpts(options) {
        let opts = {
            method: options.method,
            url: options.url,
            timeout: options.timeout || this.timeout
        };
        if (options.json === true || 'json' === options.responseType)
            opts.dataType = 'json';
        else if ('text' === options.responseType)
            opts.dataType = 'text';
        if (options.params) {
            opts.params = options.params;
        }
        if (options.data) {
            opts.data = options.data;
        }
        //set headers requested by user config
        opts.headers = {};
        if (options.headers) {
            Object.assign(opts.headers, options.headers);
        }
        //set authorization token if one was provided
        if (this.token) {
            let token = this.token();
            if (token) {
                opts.headers.Authorization = 'Bearer ' + token;
                opts.useXDomain = true;
            }
        }
        //copy over user-supplied options
        if (options.options) {
            for (let o in options.options) {
                if (options.options.hasOwnProperty(o)) {
                    opts[o] = options.options[o];
                }
            }
        }
        return opts;
    }
    execute(opts) {
        let $injector = angular.injector(['ng']);
        let $q = this.$q || $injector.get('$q');
        let $http = this.$http || $injector.get('$http');
        let deferred = $q.defer();
        $http(opts)
            .then(response => {
            deferred.resolve(response.data);
        })
            .catch(response => {
            let err = null, arg = response.data;
            if (typeof (arg) === 'object' && arg.message) {
                //wrapping json error object
                err = new Error(arg.message);
                err.status = arg.statusCode || 500;
            }
            else if (typeof (arg) === 'string') {
                //just containing string message
                err = new Error(arg);
            }
            else {
                err = new Error("An error occurred issuing the request");
            }
            deferred.reject(err);
        });
        return deferred.promise.then((data) => data);
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
export default NGHttpClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImh0dHAvbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSW5ELE1BQU0sWUFBYSxTQUFRLFlBQVk7SUFLbkM7Ozs7T0FJRztJQUNILFlBQVksT0FBaUM7UUFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBRyxPQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBVyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBRyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUs7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsT0FBZ0M7UUFFOUMsSUFBSSxJQUFJLEdBQTRCO1lBQ2hDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7WUFDaEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU87U0FDM0MsQ0FBQztRQUVGLElBQUcsT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLE9BQU8sQ0FBQyxZQUFZO1lBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO2FBQ3RCLElBQUcsTUFBTSxLQUFLLE9BQU8sQ0FBQyxZQUFZO1lBQ25DLElBQUksQ0FB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QUFFLENBQUEsSUFBSSxDQUFpQixDQUFDO1FBRTNELGtDQUFrQztRQUNsQyxtQkFBbUI7UUFDbkIsd0NBQXdDO1FBQ3hDLHlEQUF5RDtRQUN6RCxFQUFFO1FBQ0YsNEJBQTRCO1FBQzVCLDBCQUEwQjtRQUMxQixLQUFLO1FBQ0wsMkJBQTJCO1FBQzNCLG9EQUFvRDtRQUNwRCxLQUFLO1FBQ0wsMERBQTBEO0lBQzlELENBQUM7Q0FFSjtBQUVELGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gXCJhbmd1bGFyXCI7XG5pbXBvcnQgeyBHUEh0dHBDbGllbnQgfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5cblxuY2xhc3MgTkdIdHRwQ2xpZW50IGV4dGVuZHMgR1BIdHRwQ2xpZW50IHtcblxuICAgIHByaXZhdGUgJGh0dHAgOiBhbnk7XG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRpbWVvdXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50b2tlbiAtIHRoZSBiZWFyZXIgdG9rZW4gb3IgYSBmdW5jdGlvbiB0byByZXRyaWV2ZSBpdFxuICAgICAqIEBwYXJhbSBvcHRpb25zLiRodHRwIC0gYW5ndWxhciAkaHR0cCBzZXJ2aWNlIGluc3RhbmNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA/OiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICBpZih0eXBlb2YoYW5ndWxhcikgPT09ICd1bmRlZmluZWQnIHx8IGFuZ3VsYXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuZ3VsYXJKUyBjb3VsZCBub3QgYmUgZm91bmQgZ2xvYmFsbHlcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLiRodHRwKVxuICAgICAgICAgICAgdGhpcy4kaHR0cCA9IG9wdGlvbnMuJGh0dHA7XG4gICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy4kcSlcbiAgICAgICAgICAgIHRoaXMuJHEgPSBvcHRpb25zLiRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSA6IGFueSB7XG5cbiAgICAgICAgbGV0IG9wdHMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiBvcHRpb25zLm1ldGhvZCxcbiAgICAgICAgICAgIHVybDogb3B0aW9ucy51cmwsXG4gICAgICAgICAgICB0aW1lb3V0OiBvcHRpb25zLnRpbWVvdXQgfHwgdGhpcy50aW1lb3V0XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYob3B0aW9ucy5qc29uID09PSB0cnVlIHx8ICdqc29uJyA9PT0gb3B0aW9ucy5yZXNwb25zZVR5cGUpXG4gICAgICAgICAgICBvcHRzLmRhdGFUeXBlID0gJ2pzb24nO1xuICAgICAgICBlbHNlIGlmKCd0ZXh0JyA9PT0gb3B0aW9ucy5yZXNwb25zZVR5cGUpXG4gICAgICAgICAgICBvcHRzLmRhdGFUeXBlID0gJ3RleHQnO1xuXG4gICAgICAgIGlmKG9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICBvcHRzLnBhcmFtcyA9IG9wdGlvbnMucGFyYW1zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICBvcHRzLmRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldCBoZWFkZXJzIHJlcXVlc3RlZCBieSB1c2VyIGNvbmZpZ1xuICAgICAgICBvcHRzLmhlYWRlcnMgPSB7fTtcbiAgICAgICAgaWYob3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKG9wdHMuaGVhZGVycywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vc2V0IGF1dGhvcml6YXRpb24gdG9rZW4gaWYgb25lIHdhcyBwcm92aWRlZFxuICAgICAgICBpZih0aGlzLnRva2VuKSB7XG4gICAgICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLnRva2VuKCk7XG4gICAgICAgICAgICBpZih0b2tlbikge1xuICAgICAgICAgICAgICAgIG9wdHMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgdG9rZW47XG4gICAgICAgICAgICAgICAgb3B0cy51c2VYRG9tYWluID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29weSBvdmVyIHVzZXItc3VwcGxpZWQgb3B0aW9uc1xuICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgbyBpbiBvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMuaGFzT3duUHJvcGVydHkobykpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0c1tvXSA9IG9wdGlvbnMub3B0aW9uc1tvXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0cztcbiAgICB9XG5cbiAgICBleGVjdXRlKG9wdHMgOiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBsZXQgJGluamVjdG9yID0gYW5ndWxhci5pbmplY3RvcihbJ25nJ10pO1xuICAgICAgICBsZXQgJHEgPSB0aGlzLiRxIHx8ICRpbmplY3Rvci5nZXQoJyRxJyk7XG4gICAgICAgIGxldCAkaHR0cCA9IHRoaXMuJGh0dHAgfHwgJGluamVjdG9yLmdldCgnJGh0dHAnKTtcblxuICAgICAgICBsZXQgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAkaHR0cChvcHRzKVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlc3BvbnNlID0+IHsgICAgLy9odHRwIHJlc3BvbnNlXG4gICAgICAgICAgICBsZXQgZXJyID0gbnVsbCwgYXJnID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIGlmKHR5cGVvZihhcmcpID09PSAnb2JqZWN0JyAmJiBhcmcubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIC8vd3JhcHBpbmcganNvbiBlcnJvciBvYmplY3RcbiAgICAgICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoYXJnLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGVyci5zdGF0dXMgPSBhcmcuc3RhdHVzQ29kZSB8fCA1MDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mKGFyZykgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgLy9qdXN0IGNvbnRhaW5pbmcgc3RyaW5nIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoYXJnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyID0gbmV3IEVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWQgaXNzdWluZyB0aGUgcmVxdWVzdFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UudGhlbigoZGF0YSk9PmRhdGEpIGFzIFByb21pc2U8YW55PjtcblxuICAgICAgICAvLyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCAkaHR0cCApXG4gICAgICAgIC8vIC50aGVuKCRodHRwID0+IHtcbiAgICAgICAgLy8gICAgIGlmKHR5cGVvZigkaHR0cCkgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAvLyAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuZ3VsYXIgJGh0dHAgbm90IHJlc29sdmVkXCIpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2cob3B0cyk7XG4gICAgICAgIC8vICAgICByZXR1cm4gJGh0dHAob3B0cyk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC50aGVuKHJlc3BvbnNlPT4gKCkgPT4ge1xuICAgICAgICAvLyAgICAgcmV0dXJuICR0aW1lb3V0KCgpPT57cmV0dXJuIHJlc3BvbnNlLmRhdGE7fSk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC5jYXRjaChyZXNwb25zZT0+IHsgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLmRhdGEpOyB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTkdIdHRwQ2xpZW50O1xuIl19