import axios from 'axios';
import GPError from '../shared/error';
import GPHttpClient from './client';
class XHRHttpClient extends GPHttpClient {
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    constructor(options) {
        super(options);
    }
    createRequestOpts(options) {
        let opts = {
            method: options.method,
            url: options.url,
            timeout: options.timeout || this.timeout
        };
        if (options.json === true)
            opts.responseType = 'json';
        if (options.params) {
            opts.params = options.params;
        }
        if (options.data) {
            opts.data = options.data;
            opts.contentType = 'application/json';
        }
        //set headers requested by user config
        opts.headers = {};
        if (options.headers) {
            Object.assign(opts.headers, options.headers);
        }
        //set authorization header if one was provided
        if (this.token) {
            let token = this.token();
            if (token) {
                opts.headers.Authorization = 'Bearer ' + token;
                opts.withCredentials = true;
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
        if (typeof (axios) === 'undefined') {
            throw new Error("Axios not found, check that you have included " +
                "it as a dependency of the application or use a different " +
                "HttpClient implementation");
        }
        let promise = axios(opts)
            .then(response => { return response.data; })
            .catch(error => {
            let err = new GPError(error.message);
            if (error.response) {
                err = new GPError(error.response.data);
            }
            throw err;
        });
        return promise;
    }
}
export default XHRHttpClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbImh0dHAveGhyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLFlBQVksTUFBTSxVQUFVLENBQUM7QUFHcEMsTUFBTSxhQUFjLFNBQVEsWUFBWTtJQUVwQzs7O09BR0c7SUFDSCxZQUFZLE9BQWlDO1FBQ3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBR0QsaUJBQWlCLENBQUMsT0FBZ0M7UUFFOUMsSUFBSSxJQUFJLEdBQTRCO1lBQ2hDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7WUFDaEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU87U0FDM0MsQ0FBQztRQUVGLElBQUcsT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1FBRS9CLElBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNoQztRQUVELElBQUcsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDO1NBQ3pDO1FBRUQsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsOENBQThDO1FBQzlDLElBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNYLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN6QixJQUFHLEtBQUssRUFBRTtnQkFDTixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzthQUMvQjtTQUNKO1FBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlCLElBQUcsTUFBTTtZQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUVwRSxpQ0FBaUM7UUFDakMsSUFBRyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2hCLEtBQUksSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDMUIsSUFBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDO2FBQ0o7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFHRCxPQUFPLENBQUMsSUFBVTtRQUVkLElBQUcsT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsRUFBRTtZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRDtnQkFDNUQsMkRBQTJEO2dCQUMzRCwyQkFBMkIsQ0FBQyxDQUFBO1NBQ25DO1FBRUQsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQzthQUN4QixJQUFJLENBQUUsUUFBUSxDQUFDLEVBQUUsR0FBRyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUMsS0FBSyxDQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ1osSUFBSSxHQUFHLEdBQWEsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9DLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUM7WUFDRCxNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztDQUVKO0FBRUQsZUFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgR1BFcnJvciBmcm9tICcuLi9zaGFyZWQvZXJyb3InO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuL2NsaWVudCc7XG5cblxuY2xhc3MgWEhSSHR0cENsaWVudCBleHRlbmRzIEdQSHR0cENsaWVudCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50aW1lb3V0XG4gICAgICogQHBhcmFtIG9wdGlvbnMudG9rZW4gLSB0aGUgYmVhcmVyIHRva2VuIG9yIGEgZnVuY3Rpb24gdG8gcmV0cmlldmUgaXRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IHsgW2tleTpzdHJpbmddIDogYW55IH0pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxuXG5cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zIDogeyBba2V5OnN0cmluZ10gOiBhbnkgfSkgOiBhbnkge1xuXG4gICAgICAgIGxldCBvcHRzIDogeyBba2V5OnN0cmluZ10gOiBhbnkgfSA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogb3B0aW9ucy5tZXRob2QsXG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMudXJsLFxuICAgICAgICAgICAgdGltZW91dDogb3B0aW9ucy50aW1lb3V0IHx8IHRoaXMudGltZW91dFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmKG9wdGlvbnMuanNvbiA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIG9wdHMucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXG4gICAgICAgIGlmKG9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICBvcHRzLnBhcmFtcyA9IG9wdGlvbnMucGFyYW1zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICBvcHRzLmRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICAgICAgICBvcHRzLmNvbnRlbnRUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9zZXQgaGVhZGVycyByZXF1ZXN0ZWQgYnkgdXNlciBjb25maWdcbiAgICAgICAgb3B0cy5oZWFkZXJzID0ge307XG4gICAgICAgIGlmKG9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvcHRzLmhlYWRlcnMsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldCBhdXRob3JpemF0aW9uIGhlYWRlciBpZiBvbmUgd2FzIHByb3ZpZGVkXG4gICAgICAgIGlmKHRoaXMudG9rZW4pIHtcbiAgICAgICAgICAgIGxldCB0b2tlbiA9IHRoaXMudG9rZW4oKTtcbiAgICAgICAgICAgIGlmKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyB0b2tlbjtcbiAgICAgICAgICAgICAgICBvcHRzLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvb2tpZSA9IHRoaXMuZ2V0Q29va2llKCk7XG4gICAgICAgIGlmKGNvb2tpZSkgb3B0cy5oZWFkZXJzLkNvb2tpZSA9IHRoaXMuYXV0aENvb2tpZU5hbWUgKyAnPScgKyBjb29raWU7XG5cbiAgICAgICAgLy9jb3B5IG92ZXIgdXNlci1zdXBwbGllZCBvcHRpb25zXG4gICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgZm9yKGxldCBvIGluIG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzW29dID0gb3B0aW9ucy5vcHRpb25zW29dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRzO1xuICAgIH1cblxuXG4gICAgZXhlY3V0ZShvcHRzIDogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgaWYodHlwZW9mKGF4aW9zKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkF4aW9zIG5vdCBmb3VuZCwgY2hlY2sgdGhhdCB5b3UgaGF2ZSBpbmNsdWRlZCBcIiArXG4gICAgICAgICAgICAgICAgXCJpdCBhcyBhIGRlcGVuZGVuY3kgb2YgdGhlIGFwcGxpY2F0aW9uIG9yIHVzZSBhIGRpZmZlcmVudCBcIiArXG4gICAgICAgICAgICAgICAgXCJIdHRwQ2xpZW50IGltcGxlbWVudGF0aW9uXCIpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvbWlzZSA9IGF4aW9zKG9wdHMpXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiB7IHJldHVybiByZXNwb25zZS5kYXRhOyB9KVxuICAgICAgICAuY2F0Y2goIGVycm9yID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgOiBHUEVycm9yID0gbmV3IEdQRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBlcnIgPSBuZXcgR1BFcnJvcihlcnJvci5yZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBYSFJIdHRwQ2xpZW50O1xuIl19