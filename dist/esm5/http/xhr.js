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
        //set headers requested by user config
        opts.headers = {};
        if (options.headers) {
            Object.assign(opts.headers, options.headers);
        }
        //set authorization header if one was provided
        if (this.token) {
            var token = this.token();
            if (token) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbImh0dHAveGhyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxPQUFPLE1BQU0saUJBQWlCLENBQUM7QUFDdEMsT0FBTyxZQUFZLE1BQU0sVUFBVSxDQUFDO0FBR3BDO0lBQTRCLHlDQUFZO0lBRXBDOzs7T0FHRztJQUNILHVCQUFZLE9BQWlDO2VBQ3pDLGtCQUFNLE9BQU8sQ0FBQztJQUNsQixDQUFDO0lBR0QseUNBQWlCLEdBQWpCLFVBQWtCLE9BQWdDO1FBRTlDLElBQUksSUFBSSxHQUE0QjtZQUNoQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1lBQ2hCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPO1NBQzNDLENBQUM7UUFFRixJQUFHLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUUvQixJQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDaEM7UUFFRCxJQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQztTQUN6QztRQUVELHNDQUFzQztRQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDaEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoRDtRQUVELDhDQUE4QztRQUM5QyxJQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekIsSUFBRyxLQUFLLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDL0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7YUFDL0I7U0FDSjtRQUVELGlDQUFpQztRQUNqQyxJQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDaEIsS0FBSSxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO2dCQUMxQixJQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEM7YUFDSjtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUdELCtCQUFPLEdBQVAsVUFBUSxJQUFVO1FBRWQsSUFBRyxPQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxFQUFFO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdEO2dCQUM1RCwyREFBMkQ7Z0JBQzNELDJCQUEyQixDQUFDLENBQUE7U0FDbkM7UUFFRCxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ3hCLElBQUksQ0FBRSxVQUFBLFFBQVEsSUFBTSxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUMsS0FBSyxDQUFFLFVBQUEsS0FBSztZQUNULElBQUksR0FBRyxHQUFhLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hCLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFDO1lBQ0QsTUFBTSxHQUFHLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTCxvQkFBQztBQUFELENBQUMsQUEvRUQsQ0FBNEIsWUFBWSxHQStFdkM7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCBHUEVycm9yIGZyb20gJy4uL3NoYXJlZC9lcnJvcic7XG5pbXBvcnQgR1BIdHRwQ2xpZW50IGZyb20gJy4vY2xpZW50JztcblxuXG5jbGFzcyBYSFJIdHRwQ2xpZW50IGV4dGVuZHMgR1BIdHRwQ2xpZW50IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRpbWVvdXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50b2tlbiAtIHRoZSBiZWFyZXIgdG9rZW4gb3IgYSBmdW5jdGlvbiB0byByZXRyaWV2ZSBpdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPzogeyBba2V5OnN0cmluZ10gOiBhbnkgfSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICB9XG5cblxuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSA6IGFueSB7XG5cbiAgICAgICAgbGV0IG9wdHMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiBvcHRpb25zLm1ldGhvZCxcbiAgICAgICAgICAgIHVybDogb3B0aW9ucy51cmwsXG4gICAgICAgICAgICB0aW1lb3V0OiBvcHRpb25zLnRpbWVvdXQgfHwgdGhpcy50aW1lb3V0XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYob3B0aW9ucy5qc29uID09PSB0cnVlKVxuICAgICAgICAgICAgb3B0cy5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cbiAgICAgICAgaWYob3B0aW9ucy5wYXJhbXMpIHtcbiAgICAgICAgICAgIG9wdHMucGFyYW1zID0gb3B0aW9ucy5wYXJhbXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgIG9wdHMuZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgICAgIG9wdHMuY29udGVudFR5cGUgPSAnYXBwbGljYXRpb24vanNvbic7XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldCBoZWFkZXJzIHJlcXVlc3RlZCBieSB1c2VyIGNvbmZpZ1xuICAgICAgICBvcHRzLmhlYWRlcnMgPSB7fTtcbiAgICAgICAgaWYob3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKG9wdHMuaGVhZGVycywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vc2V0IGF1dGhvcml6YXRpb24gaGVhZGVyIGlmIG9uZSB3YXMgcHJvdmlkZWRcbiAgICAgICAgaWYodGhpcy50b2tlbikge1xuICAgICAgICAgICAgbGV0IHRva2VuID0gdGhpcy50b2tlbigpO1xuICAgICAgICAgICAgaWYodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBvcHRzLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIHRva2VuO1xuICAgICAgICAgICAgICAgIG9wdHMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29weSBvdmVyIHVzZXItc3VwcGxpZWQgb3B0aW9uc1xuICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgbyBpbiBvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMuaGFzT3duUHJvcGVydHkobykpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0c1tvXSA9IG9wdGlvbnMub3B0aW9uc1tvXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0cztcbiAgICB9XG5cblxuICAgIGV4ZWN1dGUob3B0cyA6IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGlmKHR5cGVvZihheGlvcykgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBeGlvcyBub3QgZm91bmQsIGNoZWNrIHRoYXQgeW91IGhhdmUgaW5jbHVkZWQgXCIgK1xuICAgICAgICAgICAgICAgIFwiaXQgYXMgYSBkZXBlbmRlbmN5IG9mIHRoZSBhcHBsaWNhdGlvbiBvciB1c2UgYSBkaWZmZXJlbnQgXCIgK1xuICAgICAgICAgICAgICAgIFwiSHR0cENsaWVudCBpbXBsZW1lbnRhdGlvblwiKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb21pc2UgPSBheGlvcyhvcHRzKVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4geyByZXR1cm4gcmVzcG9uc2UuZGF0YTsgfSlcbiAgICAgICAgLmNhdGNoKCBlcnJvciA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyIDogR1BFcnJvciA9IG5ldyBHUEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZXJyID0gbmV3IEdQRXJyb3IoZXJyb3IucmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgWEhSSHR0cENsaWVudDtcbiJdfQ==