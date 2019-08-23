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
        //set authorization token if one was provided
        if (this.token) {
            let token = this.token();
            if (token) {
                opts.headers = opts.headers || {};
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
            .then(response => { deferred.resolve(response.data); })
            .catch(response => { deferred.reject(new Error(response.data)); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImh0dHAvbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSW5ELE1BQU0sWUFBYSxTQUFRLFlBQVk7SUFLbkM7Ozs7T0FJRztJQUNILFlBQVksT0FBaUM7UUFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBRyxPQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBVyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBRyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUs7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsT0FBZ0M7UUFFOUMsSUFBSSxJQUFJLEdBQTRCO1lBQ2hDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7WUFDaEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU87U0FDM0MsQ0FBQztRQUVGLElBQUcsT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLE9BQU8sQ0FBQyxZQUFZO1lBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO2FBQ3RCLElBQUcsTUFBTSxLQUFLLE9BQU8sQ0FBQyxZQUFZO1lBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBRTNCLElBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNoQztRQUVELElBQUcsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztTQUM1QjtRQUVELDZDQUE2QztRQUM3QyxJQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekIsSUFBRyxLQUFLLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7YUFDMUI7U0FDSjtRQUVELGlDQUFpQztRQUNqQyxJQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDaEIsS0FBSSxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO2dCQUMxQixJQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEM7YUFDSjtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFVO1FBRWQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqRCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNWLElBQUksQ0FBRSxRQUFRLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZELEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRSxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQSxJQUFJLENBQWlCLENBQUM7UUFFM0Qsa0NBQWtDO1FBQ2xDLG1CQUFtQjtRQUNuQix3Q0FBd0M7UUFDeEMseURBQXlEO1FBQ3pELEVBQUU7UUFDRiw0QkFBNEI7UUFDNUIsMEJBQTBCO1FBQzFCLEtBQUs7UUFDTCwyQkFBMkI7UUFDM0Isb0RBQW9EO1FBQ3BELEtBQUs7UUFDTCwwREFBMEQ7SUFDOUQsQ0FBQztDQUVKO0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSBcImFuZ3VsYXJcIjtcbmltcG9ydCB7IEdQSHR0cENsaWVudCB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cblxuXG5jbGFzcyBOR0h0dHBDbGllbnQgZXh0ZW5kcyBHUEh0dHBDbGllbnQge1xuXG4gICAgcHJpdmF0ZSAkaHR0cCA6IGFueTtcbiAgICBwcml2YXRlICRxIDogYW55O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvbnMudGltZW91dFxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRva2VuIC0gdGhlIGJlYXJlciB0b2tlbiBvciBhIGZ1bmN0aW9uIHRvIHJldHJpZXZlIGl0XG4gICAgICogQHBhcmFtIG9wdGlvbnMuJGh0dHAgLSBhbmd1bGFyICRodHRwIHNlcnZpY2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IHsgW2tleTpzdHJpbmddIDogYW55IH0pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIGlmKHR5cGVvZihhbmd1bGFyKSA9PT0gJ3VuZGVmaW5lZCcgfHwgYW5ndWxhciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW5ndWxhckpTIGNvdWxkIG5vdCBiZSBmb3VuZCBnbG9iYWxseVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMuJGh0dHApXG4gICAgICAgICAgICB0aGlzLiRodHRwID0gb3B0aW9ucy4kaHR0cDtcbiAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLiRxKVxuICAgICAgICAgICAgdGhpcy4kcSA9IG9wdGlvbnMuJHE7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0pIDogYW55IHtcblxuICAgICAgICBsZXQgb3B0cyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0gPSB7XG4gICAgICAgICAgICBtZXRob2Q6IG9wdGlvbnMubWV0aG9kLFxuICAgICAgICAgICAgdXJsOiBvcHRpb25zLnVybCxcbiAgICAgICAgICAgIHRpbWVvdXQ6IG9wdGlvbnMudGltZW91dCB8fCB0aGlzLnRpbWVvdXRcbiAgICAgICAgfTtcblxuICAgICAgICBpZihvcHRpb25zLmpzb24gPT09IHRydWUgfHwgJ2pzb24nID09PSBvcHRpb25zLnJlc3BvbnNlVHlwZSlcbiAgICAgICAgICAgIG9wdHMuZGF0YVR5cGUgPSAnanNvbic7XG4gICAgICAgIGVsc2UgaWYoJ3RleHQnID09PSBvcHRpb25zLnJlc3BvbnNlVHlwZSlcbiAgICAgICAgICAgIG9wdHMuZGF0YVR5cGUgPSAndGV4dCc7XG5cbiAgICAgICAgaWYob3B0aW9ucy5wYXJhbXMpIHtcbiAgICAgICAgICAgIG9wdHMucGFyYW1zID0gb3B0aW9ucy5wYXJhbXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgIG9wdHMuZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vc2V0IGF1dGhvcml6YXRpb24gdG9rZW4gaWYgb25lIHdhcyBwcm92aWRlZFxuICAgICAgICBpZih0aGlzLnRva2VuKSB7XG4gICAgICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLnRva2VuKCk7XG4gICAgICAgICAgICBpZih0b2tlbikge1xuICAgICAgICAgICAgICAgIG9wdHMuaGVhZGVycyA9IG9wdHMuaGVhZGVycyB8fCB7fTtcbiAgICAgICAgICAgICAgICBvcHRzLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIHRva2VuO1xuICAgICAgICAgICAgICAgIG9wdHMudXNlWERvbWFpbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL2NvcHkgb3ZlciB1c2VyLXN1cHBsaWVkIG9wdGlvbnNcbiAgICAgICAgaWYob3B0aW9ucy5vcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IobGV0IG8gaW4gb3B0aW9ucy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYob3B0aW9ucy5vcHRpb25zLmhhc093blByb3BlcnR5KG8pKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHNbb10gPSBvcHRpb25zLm9wdGlvbnNbb107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShvcHRzIDogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgbGV0ICRpbmplY3RvciA9IGFuZ3VsYXIuaW5qZWN0b3IoWyduZyddKTtcbiAgICAgICAgbGV0ICRxID0gdGhpcy4kcSB8fCAkaW5qZWN0b3IuZ2V0KCckcScpO1xuICAgICAgICBsZXQgJGh0dHAgPSB0aGlzLiRodHRwIHx8ICRpbmplY3Rvci5nZXQoJyRodHRwJyk7XG5cbiAgICAgICAgbGV0IGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgJGh0dHAob3B0cylcbiAgICAgICAgLnRoZW4oIHJlc3BvbnNlID0+IHsgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZS5kYXRhKTsgfSlcbiAgICAgICAgLmNhdGNoKHJlc3BvbnNlID0+IHsgZGVmZXJyZWQucmVqZWN0KG5ldyBFcnJvcihyZXNwb25zZS5kYXRhKSk7IH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZS50aGVuKChkYXRhKT0+ZGF0YSkgYXMgUHJvbWlzZTxhbnk+O1xuXG4gICAgICAgIC8vIHJldHVybiBQcm9taXNlLnJlc29sdmUoICRodHRwIClcbiAgICAgICAgLy8gLnRoZW4oJGh0dHAgPT4ge1xuICAgICAgICAvLyAgICAgaWYodHlwZW9mKCRodHRwKSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIC8vICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQW5ndWxhciAkaHR0cCBub3QgcmVzb2x2ZWRcIik7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhvcHRzKTtcbiAgICAgICAgLy8gICAgIHJldHVybiAkaHR0cChvcHRzKTtcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gLnRoZW4ocmVzcG9uc2U9PiAoKSA9PiB7XG4gICAgICAgIC8vICAgICByZXR1cm4gJHRpbWVvdXQoKCk9PntyZXR1cm4gcmVzcG9uc2UuZGF0YTt9KTtcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gLmNhdGNoKHJlc3BvbnNlPT4geyB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuZGF0YSk7IH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBOR0h0dHBDbGllbnQ7XG4iXX0=