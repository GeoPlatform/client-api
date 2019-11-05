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
        let cookie = this.getCookie();
        if (cookie)
            opts.headers.Cookie = this.authCookieName + '=' + cookie;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImh0dHAvbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSW5ELE1BQU0sWUFBYSxTQUFRLFlBQVk7SUFLbkM7Ozs7T0FJRztJQUNILFlBQVksT0FBaUM7UUFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBRyxPQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBVyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBRyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUs7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsT0FBZ0M7UUFFOUMsSUFBSSxJQUFJLEdBQTRCO1lBQ2hDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7WUFDaEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU87U0FDM0MsQ0FBQztRQUVGLElBQUcsT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLE9BQU8sQ0FBQyxZQUFZO1lBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO2FBQ3RCLElBQUcsTUFBTSxLQUFLLE9BQU8sQ0FBQyxZQUFZO1lBQ25DLElBQUksQ0FB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QXVDLENBQUMsQ0FBQzthQUM1RDtZQUNELFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQSxJQUFJLENBQWlCLENBQUM7UUFFM0Qsa0NBQWtDO1FBQ2xDLG1CQUFtQjtRQUNuQix3Q0FBd0M7UUFDeEMseURBQXlEO1FBQ3pELEVBQUU7UUFDRiw0QkFBNEI7UUFDNUIsMEJBQTBCO1FBQzFCLEtBQUs7UUFDTCwyQkFBMkI7UUFDM0Isb0RBQW9EO1FBQ3BELEtBQUs7UUFDTCwwREFBMEQ7SUFDOUQsQ0FBQztDQUVKO0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSBcImFuZ3VsYXJcIjtcbmltcG9ydCB7IEdQSHR0cENsaWVudCB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cblxuXG5jbGFzcyBOR0h0dHBDbGllbnQgZXh0ZW5kcyBHUEh0dHBDbGllbnQge1xuXG4gICAgcHJpdmF0ZSAkaHR0cCA6IGFueTtcbiAgICBwcml2YXRlICRxIDogYW55O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvbnMudGltZW91dFxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRva2VuIC0gdGhlIGJlYXJlciB0b2tlbiBvciBhIGZ1bmN0aW9uIHRvIHJldHJpZXZlIGl0XG4gICAgICogQHBhcmFtIG9wdGlvbnMuJGh0dHAgLSBhbmd1bGFyICRodHRwIHNlcnZpY2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IHsgW2tleTpzdHJpbmddIDogYW55IH0pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIGlmKHR5cGVvZihhbmd1bGFyKSA9PT0gJ3VuZGVmaW5lZCcgfHwgYW5ndWxhciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW5ndWxhckpTIGNvdWxkIG5vdCBiZSBmb3VuZCBnbG9iYWxseVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMuJGh0dHApXG4gICAgICAgICAgICB0aGlzLiRodHRwID0gb3B0aW9ucy4kaHR0cDtcbiAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLiRxKVxuICAgICAgICAgICAgdGhpcy4kcSA9IG9wdGlvbnMuJHE7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0pIDogYW55IHtcblxuICAgICAgICBsZXQgb3B0cyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0gPSB7XG4gICAgICAgICAgICBtZXRob2Q6IG9wdGlvbnMubWV0aG9kLFxuICAgICAgICAgICAgdXJsOiBvcHRpb25zLnVybCxcbiAgICAgICAgICAgIHRpbWVvdXQ6IG9wdGlvbnMudGltZW91dCB8fCB0aGlzLnRpbWVvdXRcbiAgICAgICAgfTtcblxuICAgICAgICBpZihvcHRpb25zLmpzb24gPT09IHRydWUgfHwgJ2pzb24nID09PSBvcHRpb25zLnJlc3BvbnNlVHlwZSlcbiAgICAgICAgICAgIG9wdHMuZGF0YVR5cGUgPSAnanNvbic7XG4gICAgICAgIGVsc2UgaWYoJ3RleHQnID09PSBvcHRpb25zLnJlc3BvbnNlVHlwZSlcbiAgICAgICAgICAgIG9wdHMuZGF0YVR5cGUgPSAndGV4dCc7XG5cbiAgICAgICAgaWYob3B0aW9ucy5wYXJhbXMpIHtcbiAgICAgICAgICAgIG9wdHMucGFyYW1zID0gb3B0aW9ucy5wYXJhbXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgIG9wdHMuZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vc2V0IGhlYWRlcnMgcmVxdWVzdGVkIGJ5IHVzZXIgY29uZmlnXG4gICAgICAgIG9wdHMuaGVhZGVycyA9IHt9O1xuICAgICAgICBpZihvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3B0cy5oZWFkZXJzLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9zZXQgYXV0aG9yaXphdGlvbiB0b2tlbiBpZiBvbmUgd2FzIHByb3ZpZGVkXG4gICAgICAgIGlmKHRoaXMudG9rZW4pIHtcbiAgICAgICAgICAgIGxldCB0b2tlbiA9IHRoaXMudG9rZW4oKTtcbiAgICAgICAgICAgIGlmKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyB0b2tlbjtcbiAgICAgICAgICAgICAgICBvcHRzLnVzZVhEb21haW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBjb29raWUgPSB0aGlzLmdldENvb2tpZSgpO1xuICAgICAgICBpZihjb29raWUpIG9wdHMuaGVhZGVycy5Db29raWUgPSB0aGlzLmF1dGhDb29raWVOYW1lICsgJz0nICsgY29va2llO1xuXG4gICAgICAgIC8vY29weSBvdmVyIHVzZXItc3VwcGxpZWQgb3B0aW9uc1xuICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgbyBpbiBvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMuaGFzT3duUHJvcGVydHkobykpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0c1tvXSA9IG9wdGlvbnMub3B0aW9uc1tvXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0cztcbiAgICB9XG5cbiAgICBleGVjdXRlKG9wdHMgOiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBsZXQgJGluamVjdG9yID0gYW5ndWxhci5pbmplY3RvcihbJ25nJ10pO1xuICAgICAgICBsZXQgJHEgPSB0aGlzLiRxIHx8ICRpbmplY3Rvci5nZXQoJyRxJyk7XG4gICAgICAgIGxldCAkaHR0cCA9IHRoaXMuJGh0dHAgfHwgJGluamVjdG9yLmdldCgnJGh0dHAnKTtcblxuICAgICAgICBsZXQgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAkaHR0cChvcHRzKVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlc3BvbnNlID0+IHsgICAgLy9odHRwIHJlc3BvbnNlXG4gICAgICAgICAgICBsZXQgZXJyID0gbnVsbCwgYXJnID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIGlmKHR5cGVvZihhcmcpID09PSAnb2JqZWN0JyAmJiBhcmcubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIC8vd3JhcHBpbmcganNvbiBlcnJvciBvYmplY3RcbiAgICAgICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoYXJnLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGVyci5zdGF0dXMgPSBhcmcuc3RhdHVzQ29kZSB8fCA1MDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mKGFyZykgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgLy9qdXN0IGNvbnRhaW5pbmcgc3RyaW5nIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoYXJnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyID0gbmV3IEVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWQgaXNzdWluZyB0aGUgcmVxdWVzdFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UudGhlbigoZGF0YSk9PmRhdGEpIGFzIFByb21pc2U8YW55PjtcblxuICAgICAgICAvLyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCAkaHR0cCApXG4gICAgICAgIC8vIC50aGVuKCRodHRwID0+IHtcbiAgICAgICAgLy8gICAgIGlmKHR5cGVvZigkaHR0cCkgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAvLyAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuZ3VsYXIgJGh0dHAgbm90IHJlc29sdmVkXCIpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2cob3B0cyk7XG4gICAgICAgIC8vICAgICByZXR1cm4gJGh0dHAob3B0cyk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC50aGVuKHJlc3BvbnNlPT4gKCkgPT4ge1xuICAgICAgICAvLyAgICAgcmV0dXJuICR0aW1lb3V0KCgpPT57cmV0dXJuIHJlc3BvbnNlLmRhdGE7fSk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC5jYXRjaChyZXNwb25zZT0+IHsgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLmRhdGEpOyB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTkdIdHRwQ2xpZW50O1xuIl19