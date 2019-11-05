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
        //set headers requested by user config
        opts.headers = {};
        if (options.headers) {
            Object.assign(opts.headers, options.headers);
        }
        //set authorization token if one was provided
        if (this.token) {
            var token = this.token();
            if (token) {
                opts.headers.Authorization = 'Bearer ' + token;
                opts.useXDomain = true;
            }
        }
        var cookie = this.getCookie();
        if (cookie)
            opts.headers.Cookie = this.authCookieName + '=' + cookie;
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
            .then(function (response) {
            deferred.resolve(response.data);
        })
            .catch(function (response) {
            var err = null, arg = response.data;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImh0dHAvbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sS0FBSyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUluRDtJQUEyQix3Q0FBWTtJQUtuQzs7OztPQUlHO0lBQ0gsc0JBQVksT0FBaUM7UUFBN0MsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FRakI7UUFQRyxJQUFHLE9BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSztZQUN2QixLQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBRyxPQUFPLElBQUksT0FBTyxDQUFDLEVBQUU7WUFDcEIsS0FBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztJQUM3QixDQUFDO0lBRUQsd0NBQWlCLEdBQWpCLFVBQWtCLE9BQWdDO1FBRTlDLElBQUksSUFBSSxHQUE0QjtZQUNoQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1lBQ2hCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPO1NBQzNDLENBQUM7UUFFRixJQUFHLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLE1BQU0sS0FBSyxPQUFPLENBQUMsWUFBWTtZQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQzthQUN0QixJQUFHLE1BQU0sS0FBSyxPQUFPLENBQUMsWUFBWTtZQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUUzQixJQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDaEM7UUFFRCxJQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDNUI7UUFFRCxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBRyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEQ7UUFFRCw2Q0FBNkM7UUFDN0MsSUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1gsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pCLElBQUcsS0FBSyxFQUFFO2dCQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2FBQzFCO1NBQ0o7UUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUIsSUFBRyxNQUFNO1lBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBRXBFLGlDQUFpQztRQUNqQyxJQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDaEIsS0FBSSxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO2dCQUMxQixJQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEM7YUFDSjtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDhCQUFPLEdBQVAsVUFBUSxJQUFVO1FBRWQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqRCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNWLElBQUksQ0FBRSxVQUFBLFFBQVE7WUFDWCxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxRQUFRO1lBQ1gsSUFBSSxHQUFHLEdBQUcsSUFBSSxFQUFFLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ3BDLElBQUcsT0FBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUN4Qyw0QkFBNEI7Z0JBQzVCLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzdCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUM7YUFDdEM7aUJBQU0sSUFBRyxPQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxnQ0FBZ0M7Z0JBQ2hDLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4QjtpQkFBTTtnQkFDSCxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQzthQUM1RDtZQUNELFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSSxJQUFHLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBaUIsQ0FBQztRQUUzRCxrQ0FBa0M7UUFDbEMsbUJBQW1CO1FBQ25CLHdDQUF3QztRQUN4Qyx5REFBeUQ7UUFDekQsRUFBRTtRQUNGLDRCQUE0QjtRQUM1QiwwQkFBMEI7UUFDMUIsS0FBSztRQUNMLDJCQUEyQjtRQUMzQixvREFBb0Q7UUFDcEQsS0FBSztRQUNMLDBEQUEwRDtJQUM5RCxDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQUFDLEFBaEhELENBQTJCLFlBQVksR0FnSHRDO0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSBcImFuZ3VsYXJcIjtcbmltcG9ydCB7IEdQSHR0cENsaWVudCB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cblxuXG5jbGFzcyBOR0h0dHBDbGllbnQgZXh0ZW5kcyBHUEh0dHBDbGllbnQge1xuXG4gICAgcHJpdmF0ZSAkaHR0cCA6IGFueTtcbiAgICBwcml2YXRlICRxIDogYW55O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvbnMudGltZW91dFxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRva2VuIC0gdGhlIGJlYXJlciB0b2tlbiBvciBhIGZ1bmN0aW9uIHRvIHJldHJpZXZlIGl0XG4gICAgICogQHBhcmFtIG9wdGlvbnMuJGh0dHAgLSBhbmd1bGFyICRodHRwIHNlcnZpY2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IHsgW2tleTpzdHJpbmddIDogYW55IH0pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIGlmKHR5cGVvZihhbmd1bGFyKSA9PT0gJ3VuZGVmaW5lZCcgfHwgYW5ndWxhciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW5ndWxhckpTIGNvdWxkIG5vdCBiZSBmb3VuZCBnbG9iYWxseVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMuJGh0dHApXG4gICAgICAgICAgICB0aGlzLiRodHRwID0gb3B0aW9ucy4kaHR0cDtcbiAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLiRxKVxuICAgICAgICAgICAgdGhpcy4kcSA9IG9wdGlvbnMuJHE7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0pIDogYW55IHtcblxuICAgICAgICBsZXQgb3B0cyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0gPSB7XG4gICAgICAgICAgICBtZXRob2Q6IG9wdGlvbnMubWV0aG9kLFxuICAgICAgICAgICAgdXJsOiBvcHRpb25zLnVybCxcbiAgICAgICAgICAgIHRpbWVvdXQ6IG9wdGlvbnMudGltZW91dCB8fCB0aGlzLnRpbWVvdXRcbiAgICAgICAgfTtcblxuICAgICAgICBpZihvcHRpb25zLmpzb24gPT09IHRydWUgfHwgJ2pzb24nID09PSBvcHRpb25zLnJlc3BvbnNlVHlwZSlcbiAgICAgICAgICAgIG9wdHMuZGF0YVR5cGUgPSAnanNvbic7XG4gICAgICAgIGVsc2UgaWYoJ3RleHQnID09PSBvcHRpb25zLnJlc3BvbnNlVHlwZSlcbiAgICAgICAgICAgIG9wdHMuZGF0YVR5cGUgPSAndGV4dCc7XG5cbiAgICAgICAgaWYob3B0aW9ucy5wYXJhbXMpIHtcbiAgICAgICAgICAgIG9wdHMucGFyYW1zID0gb3B0aW9ucy5wYXJhbXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgIG9wdHMuZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vc2V0IGhlYWRlcnMgcmVxdWVzdGVkIGJ5IHVzZXIgY29uZmlnXG4gICAgICAgIG9wdHMuaGVhZGVycyA9IHt9O1xuICAgICAgICBpZihvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3B0cy5oZWFkZXJzLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9zZXQgYXV0aG9yaXphdGlvbiB0b2tlbiBpZiBvbmUgd2FzIHByb3ZpZGVkXG4gICAgICAgIGlmKHRoaXMudG9rZW4pIHtcbiAgICAgICAgICAgIGxldCB0b2tlbiA9IHRoaXMudG9rZW4oKTtcbiAgICAgICAgICAgIGlmKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyB0b2tlbjtcbiAgICAgICAgICAgICAgICBvcHRzLnVzZVhEb21haW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBjb29raWUgPSB0aGlzLmdldENvb2tpZSgpO1xuICAgICAgICBpZihjb29raWUpIG9wdHMuaGVhZGVycy5Db29raWUgPSB0aGlzLmF1dGhDb29raWVOYW1lICsgJz0nICsgY29va2llO1xuXG4gICAgICAgIC8vY29weSBvdmVyIHVzZXItc3VwcGxpZWQgb3B0aW9uc1xuICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgbyBpbiBvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMuaGFzT3duUHJvcGVydHkobykpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0c1tvXSA9IG9wdGlvbnMub3B0aW9uc1tvXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0cztcbiAgICB9XG5cbiAgICBleGVjdXRlKG9wdHMgOiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBsZXQgJGluamVjdG9yID0gYW5ndWxhci5pbmplY3RvcihbJ25nJ10pO1xuICAgICAgICBsZXQgJHEgPSB0aGlzLiRxIHx8ICRpbmplY3Rvci5nZXQoJyRxJyk7XG4gICAgICAgIGxldCAkaHR0cCA9IHRoaXMuJGh0dHAgfHwgJGluamVjdG9yLmdldCgnJGh0dHAnKTtcblxuICAgICAgICBsZXQgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAkaHR0cChvcHRzKVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlc3BvbnNlID0+IHsgICAgLy9odHRwIHJlc3BvbnNlXG4gICAgICAgICAgICBsZXQgZXJyID0gbnVsbCwgYXJnID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIGlmKHR5cGVvZihhcmcpID09PSAnb2JqZWN0JyAmJiBhcmcubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIC8vd3JhcHBpbmcganNvbiBlcnJvciBvYmplY3RcbiAgICAgICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoYXJnLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGVyci5zdGF0dXMgPSBhcmcuc3RhdHVzQ29kZSB8fCA1MDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mKGFyZykgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgLy9qdXN0IGNvbnRhaW5pbmcgc3RyaW5nIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoYXJnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyID0gbmV3IEVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWQgaXNzdWluZyB0aGUgcmVxdWVzdFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UudGhlbigoZGF0YSk9PmRhdGEpIGFzIFByb21pc2U8YW55PjtcblxuICAgICAgICAvLyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCAkaHR0cCApXG4gICAgICAgIC8vIC50aGVuKCRodHRwID0+IHtcbiAgICAgICAgLy8gICAgIGlmKHR5cGVvZigkaHR0cCkgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAvLyAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuZ3VsYXIgJGh0dHAgbm90IHJlc29sdmVkXCIpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2cob3B0cyk7XG4gICAgICAgIC8vICAgICByZXR1cm4gJGh0dHAob3B0cyk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC50aGVuKHJlc3BvbnNlPT4gKCkgPT4ge1xuICAgICAgICAvLyAgICAgcmV0dXJuICR0aW1lb3V0KCgpPT57cmV0dXJuIHJlc3BvbnNlLmRhdGE7fSk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC5jYXRjaChyZXNwb25zZT0+IHsgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLmRhdGEpOyB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTkdIdHRwQ2xpZW50O1xuIl19