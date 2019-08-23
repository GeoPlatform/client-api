import * as tslib_1 from "tslib";
import axios from 'axios';
import GPError from '../shared/error';
import GPHttpClient from './client';
var XHRHttpClient = /** @class */ (function (_super) {
    tslib_1.__extends(XHRHttpClient, _super);
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    function XHRHttpClient(options) {
        return _super.call(this, options) || this;
    }
    XHRHttpClient.prototype.createRequestOpts = function (options) {
        var opts = {
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
        //set authorization header if one was provided
        if (this.token) {
            var token = this.token();
            if (token) {
                opts.headers = opts.headers || {};
                opts.headers.Authorization = 'Bearer ' + token;
                opts.withCredentials = true;
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
    XHRHttpClient.prototype.execute = function (opts) {
        if (typeof (axios) === 'undefined') {
            throw new Error("Axios not found, check that you have included " +
                "it as a dependency of the application or use a different " +
                "HttpClient implementation");
        }
        var promise = axios(opts)
            .then(function (response) { return response.data; })
            .catch(function (error) {
            var err = new GPError(error.message);
            if (error.response) {
                err = new GPError(error.response.data);
            }
            throw err;
        });
        return promise;
    };
    return XHRHttpClient;
}(GPHttpClient));
export default XHRHttpClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbImh0dHAveGhyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxPQUFPLE1BQU0saUJBQWlCLENBQUM7QUFDdEMsT0FBTyxZQUFZLE1BQU0sVUFBVSxDQUFDO0FBR3BDO0lBQTRCLHlDQUFZO0lBRXBDOzs7T0FHRztJQUNILHVCQUFZLE9BQWlDO2VBQ3pDLGtCQUFNLE9BQU8sQ0FBQztJQUNsQixDQUFDO0lBR0QseUNBQWlCLEdBQWpCLFVBQWtCLE9BQWdDO1FBRTlDLElBQUksSUFBSSxHQUE0QjtZQUNoQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1lBQ2hCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPO1NBQzNDLENBQUM7UUFFRixJQUFHLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUUvQixJQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDaEM7UUFFRCxJQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQztTQUN6QztRQUVELDhDQUE4QztRQUM5QyxJQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekIsSUFBRyxLQUFLLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDL0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7YUFDL0I7U0FDSjtRQUVELGlDQUFpQztRQUNqQyxJQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDaEIsS0FBSSxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO2dCQUMxQixJQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEM7YUFDSjtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUdELCtCQUFPLEdBQVAsVUFBUSxJQUFVO1FBRWQsSUFBRyxPQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxFQUFFO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdEO2dCQUM1RCwyREFBMkQ7Z0JBQzNELDJCQUEyQixDQUFDLENBQUE7U0FDbkM7UUFFRCxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ3hCLElBQUksQ0FBRSxVQUFBLFFBQVEsSUFBTSxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUMsS0FBSyxDQUFFLFVBQUEsS0FBSztZQUNULElBQUksR0FBRyxHQUFhLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hCLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFDO1lBQ0QsTUFBTSxHQUFHLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTCxvQkFBQztBQUFELENBQUMsQUExRUQsQ0FBNEIsWUFBWSxHQTBFdkM7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCBHUEVycm9yIGZyb20gJy4uL3NoYXJlZC9lcnJvcic7XG5pbXBvcnQgR1BIdHRwQ2xpZW50IGZyb20gJy4vY2xpZW50JztcblxuXG5jbGFzcyBYSFJIdHRwQ2xpZW50IGV4dGVuZHMgR1BIdHRwQ2xpZW50IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRpbWVvdXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50b2tlbiAtIHRoZSBiZWFyZXIgdG9rZW4gb3IgYSBmdW5jdGlvbiB0byByZXRyaWV2ZSBpdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPzogeyBba2V5OnN0cmluZ10gOiBhbnkgfSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICB9XG5cblxuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSA6IGFueSB7XG5cbiAgICAgICAgbGV0IG9wdHMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiBvcHRpb25zLm1ldGhvZCxcbiAgICAgICAgICAgIHVybDogb3B0aW9ucy51cmwsXG4gICAgICAgICAgICB0aW1lb3V0OiBvcHRpb25zLnRpbWVvdXQgfHwgdGhpcy50aW1lb3V0XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYob3B0aW9ucy5qc29uID09PSB0cnVlKVxuICAgICAgICAgICAgb3B0cy5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cbiAgICAgICAgaWYob3B0aW9ucy5wYXJhbXMpIHtcbiAgICAgICAgICAgIG9wdHMucGFyYW1zID0gb3B0aW9ucy5wYXJhbXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgIG9wdHMuZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgICAgIG9wdHMuY29udGVudFR5cGUgPSAnYXBwbGljYXRpb24vanNvbic7XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldCBhdXRob3JpemF0aW9uIGhlYWRlciBpZiBvbmUgd2FzIHByb3ZpZGVkXG4gICAgICAgIGlmKHRoaXMudG9rZW4pIHtcbiAgICAgICAgICAgIGxldCB0b2tlbiA9IHRoaXMudG9rZW4oKTtcbiAgICAgICAgICAgIGlmKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5oZWFkZXJzID0gb3B0cy5oZWFkZXJzIHx8IHt9O1xuICAgICAgICAgICAgICAgIG9wdHMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgdG9rZW47XG4gICAgICAgICAgICAgICAgb3B0cy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9jb3B5IG92ZXIgdXNlci1zdXBwbGllZCBvcHRpb25zXG4gICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgZm9yKGxldCBvIGluIG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzW29dID0gb3B0aW9ucy5vcHRpb25zW29dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRzO1xuICAgIH1cblxuXG4gICAgZXhlY3V0ZShvcHRzIDogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgaWYodHlwZW9mKGF4aW9zKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkF4aW9zIG5vdCBmb3VuZCwgY2hlY2sgdGhhdCB5b3UgaGF2ZSBpbmNsdWRlZCBcIiArXG4gICAgICAgICAgICAgICAgXCJpdCBhcyBhIGRlcGVuZGVuY3kgb2YgdGhlIGFwcGxpY2F0aW9uIG9yIHVzZSBhIGRpZmZlcmVudCBcIiArXG4gICAgICAgICAgICAgICAgXCJIdHRwQ2xpZW50IGltcGxlbWVudGF0aW9uXCIpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvbWlzZSA9IGF4aW9zKG9wdHMpXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiB7IHJldHVybiByZXNwb25zZS5kYXRhOyB9KVxuICAgICAgICAuY2F0Y2goIGVycm9yID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgOiBHUEVycm9yID0gbmV3IEdQRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBlcnIgPSBuZXcgR1BFcnJvcihlcnJvci5yZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBYSFJIdHRwQ2xpZW50O1xuIl19