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
        if (options && options.$http)
            _this.$http = options.$http;
        if (options && options.$q)
            _this.$q = options.$q;
        return _this;
    }
    NGHttpClient.prototype.createRequestOpts = function (options) {
        var opts = {
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
        //set authorization token if one was provided
        if (this.token) {
            var token = this.token();
            if (token) {
                opts.headers = opts.headers || {};
                opts.headers.Authorization = 'Bearer ' + token;
                opts.useXDomain = true;
            }
        }
        //copy over user-supplied options
        if (options.options) {
            for (var o in options.options) {
                if (options.options.hasOwnProperty(o)) {
                    opts[o] = options.options[o];
                }
            }
        }
        return opts;
    };
    NGHttpClient.prototype.execute = function (opts) {
        var $injector = angular.injector(['ng']);
        var $q = this.$q || $injector.get('$q');
        var $http = this.$http || $injector.get('$http');
        var deferred = $q.defer();
        $http(opts)
            .then(function (response) { deferred.resolve(response.data); })
            .catch(function (response) { deferred.reject(new Error(response.data)); });
        return deferred.promise.then(function (data) { return data; });
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
export default NGHttpClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImh0dHAvbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sS0FBSyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUluRDtJQUEyQix3Q0FBWTtJQUtuQzs7OztPQUlHO0lBQ0gsc0JBQVksT0FBaUM7UUFBN0MsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FRakI7UUFQRyxJQUFHLE9BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSztZQUN2QixLQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBRyxPQUFPLElBQUksT0FBTyxDQUFDLEVBQUU7WUFDcEIsS0FBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztJQUM3QixDQUFDO0lBRUQsd0NBQWlCLEdBQWpCLFVBQWtCLE9BQWdDO1FBRTlDLElBQUksSUFBSSxHQUE0QjtZQUNoQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1lBQ2hCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPO1NBQzNDLENBQUM7UUFFRixJQUFHLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLE1BQU0sS0FBSyxPQUFPLENBQUMsWUFBWTtZQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQzthQUN0QixJQUFHLE1BQU0sS0FBSyxPQUFPLENBQUMsWUFBWTtZQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUUzQixJQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDaEM7UUFFRCxJQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDNUI7UUFFRCw2Q0FBNkM7UUFDN0MsSUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1gsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pCLElBQUcsS0FBSyxFQUFFO2dCQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2FBQzFCO1NBQ0o7UUFFRCxpQ0FBaUM7UUFDakMsSUFBRyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2hCLEtBQUksSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDMUIsSUFBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDO2FBQ0o7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCw4QkFBTyxHQUFQLFVBQVEsSUFBVTtRQUVkLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFakQsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzFCLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDVixJQUFJLENBQUUsVUFBQSxRQUFRLElBQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkQsS0FBSyxDQUFDLFVBQUEsUUFBUSxJQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRSxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSSxJQUFHLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBaUIsQ0FBQztRQUUzRCxrQ0FBa0M7UUFDbEMsbUJBQW1CO1FBQ25CLHdDQUF3QztRQUN4Qyx5REFBeUQ7UUFDekQsRUFBRTtRQUNGLDRCQUE0QjtRQUM1QiwwQkFBMEI7UUFDMUIsS0FBSztRQUNMLDJCQUEyQjtRQUMzQixvREFBb0Q7UUFDcEQsS0FBSztRQUNMLDBEQUEwRDtJQUM5RCxDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQUFDLEFBMUZELENBQTJCLFlBQVksR0EwRnRDO0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSBcImFuZ3VsYXJcIjtcbmltcG9ydCB7IEdQSHR0cENsaWVudCB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cblxuXG5jbGFzcyBOR0h0dHBDbGllbnQgZXh0ZW5kcyBHUEh0dHBDbGllbnQge1xuXG4gICAgcHJpdmF0ZSAkaHR0cCA6IGFueTtcbiAgICBwcml2YXRlICRxIDogYW55O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvbnMudGltZW91dFxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRva2VuIC0gdGhlIGJlYXJlciB0b2tlbiBvciBhIGZ1bmN0aW9uIHRvIHJldHJpZXZlIGl0XG4gICAgICogQHBhcmFtIG9wdGlvbnMuJGh0dHAgLSBhbmd1bGFyICRodHRwIHNlcnZpY2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IHsgW2tleTpzdHJpbmddIDogYW55IH0pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIGlmKHR5cGVvZihhbmd1bGFyKSA9PT0gJ3VuZGVmaW5lZCcgfHwgYW5ndWxhciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW5ndWxhckpTIGNvdWxkIG5vdCBiZSBmb3VuZCBnbG9iYWxseVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMuJGh0dHApXG4gICAgICAgICAgICB0aGlzLiRodHRwID0gb3B0aW9ucy4kaHR0cDtcbiAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLiRxKVxuICAgICAgICAgICAgdGhpcy4kcSA9IG9wdGlvbnMuJHE7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0pIDogYW55IHtcblxuICAgICAgICBsZXQgb3B0cyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0gPSB7XG4gICAgICAgICAgICBtZXRob2Q6IG9wdGlvbnMubWV0aG9kLFxuICAgICAgICAgICAgdXJsOiBvcHRpb25zLnVybCxcbiAgICAgICAgICAgIHRpbWVvdXQ6IG9wdGlvbnMudGltZW91dCB8fCB0aGlzLnRpbWVvdXRcbiAgICAgICAgfTtcblxuICAgICAgICBpZihvcHRpb25zLmpzb24gPT09IHRydWUgfHwgJ2pzb24nID09PSBvcHRpb25zLnJlc3BvbnNlVHlwZSlcbiAgICAgICAgICAgIG9wdHMuZGF0YVR5cGUgPSAnanNvbic7XG4gICAgICAgIGVsc2UgaWYoJ3RleHQnID09PSBvcHRpb25zLnJlc3BvbnNlVHlwZSlcbiAgICAgICAgICAgIG9wdHMuZGF0YVR5cGUgPSAndGV4dCc7XG5cbiAgICAgICAgaWYob3B0aW9ucy5wYXJhbXMpIHtcbiAgICAgICAgICAgIG9wdHMucGFyYW1zID0gb3B0aW9ucy5wYXJhbXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgIG9wdHMuZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vc2V0IGF1dGhvcml6YXRpb24gdG9rZW4gaWYgb25lIHdhcyBwcm92aWRlZFxuICAgICAgICBpZih0aGlzLnRva2VuKSB7XG4gICAgICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLnRva2VuKCk7XG4gICAgICAgICAgICBpZih0b2tlbikge1xuICAgICAgICAgICAgICAgIG9wdHMuaGVhZGVycyA9IG9wdHMuaGVhZGVycyB8fCB7fTtcbiAgICAgICAgICAgICAgICBvcHRzLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIHRva2VuO1xuICAgICAgICAgICAgICAgIG9wdHMudXNlWERvbWFpbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL2NvcHkgb3ZlciB1c2VyLXN1cHBsaWVkIG9wdGlvbnNcbiAgICAgICAgaWYob3B0aW9ucy5vcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IobGV0IG8gaW4gb3B0aW9ucy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYob3B0aW9ucy5vcHRpb25zLmhhc093blByb3BlcnR5KG8pKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHNbb10gPSBvcHRpb25zLm9wdGlvbnNbb107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShvcHRzIDogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgbGV0ICRpbmplY3RvciA9IGFuZ3VsYXIuaW5qZWN0b3IoWyduZyddKTtcbiAgICAgICAgbGV0ICRxID0gdGhpcy4kcSB8fCAkaW5qZWN0b3IuZ2V0KCckcScpO1xuICAgICAgICBsZXQgJGh0dHAgPSB0aGlzLiRodHRwIHx8ICRpbmplY3Rvci5nZXQoJyRodHRwJyk7XG5cbiAgICAgICAgbGV0IGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgJGh0dHAob3B0cylcbiAgICAgICAgLnRoZW4oIHJlc3BvbnNlID0+IHsgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZS5kYXRhKTsgfSlcbiAgICAgICAgLmNhdGNoKHJlc3BvbnNlID0+IHsgZGVmZXJyZWQucmVqZWN0KG5ldyBFcnJvcihyZXNwb25zZS5kYXRhKSk7IH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZS50aGVuKChkYXRhKT0+ZGF0YSkgYXMgUHJvbWlzZTxhbnk+O1xuXG4gICAgICAgIC8vIHJldHVybiBQcm9taXNlLnJlc29sdmUoICRodHRwIClcbiAgICAgICAgLy8gLnRoZW4oJGh0dHAgPT4ge1xuICAgICAgICAvLyAgICAgaWYodHlwZW9mKCRodHRwKSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIC8vICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW5ndWxhciAkaHR0cCBub3QgcmVzb2x2ZWRcIik7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhvcHRzKTtcbiAgICAgICAgLy8gICAgIHJldHVybiAkaHR0cChvcHRzKTtcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gLnRoZW4ocmVzcG9uc2U9PiAoKSA9PiB7XG4gICAgICAgIC8vICAgICByZXR1cm4gJHRpbWVvdXQoKCk9PntyZXR1cm4gcmVzcG9uc2UuZGF0YTt9KTtcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gLmNhdGNoKHJlc3BvbnNlPT4geyB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuZGF0YSk7IH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBOR0h0dHBDbGllbnQ7XG4iXX0=