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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbImh0dHAveGhyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxPQUFPLE1BQU0saUJBQWlCLENBQUM7QUFDdEMsT0FBTyxZQUFZLE1BQU0sVUFBVSxDQUFDO0FBR3BDO0lBQTRCLHlDQUFZO0lBRXBDOzs7T0FHRztJQUNILHVCQUFZLE9BQWlDO2VBQ3pDLGtCQUFNLE9BQU8sQ0FBQztJQUNsQixDQUFDO0lBR0QseUNBQWlCLEdBQWpCLFVBQWtCLE9BQWdDO1FBRTlDLElBQUksSUFBSSxHQUE0QjtZQUNoQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1lBQ2hCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPO1NBQzNDLENBQUM7UUFFRixJQUFHLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUUvQixJQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDaEM7UUFFRCxJQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQztTQUN6QztRQUVELHNDQUFzQztRQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDaEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoRDtRQUVELDhDQUE4QztRQUM5QyxJQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekIsSUFBRyxLQUFLLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDL0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7YUFDL0I7U0FDSjtRQUNELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixJQUFHLE1BQU07WUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7UUFFcEUsaUNBQWlDO1FBQ2pDLElBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNoQixLQUFJLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQzFCLElBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNoQzthQUNKO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBR0QsK0JBQU8sR0FBUCxVQUFRLElBQVU7UUFFZCxJQUFHLE9BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLEVBQUU7WUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0Q7Z0JBQzVELDJEQUEyRDtnQkFDM0QsMkJBQTJCLENBQUMsQ0FBQTtTQUNuQztRQUVELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDeEIsSUFBSSxDQUFFLFVBQUEsUUFBUSxJQUFNLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM1QyxLQUFLLENBQUUsVUFBQSxLQUFLO1lBQ1QsSUFBSSxHQUFHLEdBQWEsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9DLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUM7WUFDRCxNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVMLG9CQUFDO0FBQUQsQ0FBQyxBQWpGRCxDQUE0QixZQUFZLEdBaUZ2QztBQUVELGVBQWUsYUFBYSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IEdQRXJyb3IgZnJvbSAnLi4vc2hhcmVkL2Vycm9yJztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi9jbGllbnQnO1xuXG5cbmNsYXNzIFhIUkh0dHBDbGllbnQgZXh0ZW5kcyBHUEh0dHBDbGllbnQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvbnMudGltZW91dFxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRva2VuIC0gdGhlIGJlYXJlciB0b2tlbiBvciBhIGZ1bmN0aW9uIHRvIHJldHJpZXZlIGl0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA/OiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIH1cblxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0pIDogYW55IHtcblxuICAgICAgICBsZXQgb3B0cyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0gPSB7XG4gICAgICAgICAgICBtZXRob2Q6IG9wdGlvbnMubWV0aG9kLFxuICAgICAgICAgICAgdXJsOiBvcHRpb25zLnVybCxcbiAgICAgICAgICAgIHRpbWVvdXQ6IG9wdGlvbnMudGltZW91dCB8fCB0aGlzLnRpbWVvdXRcbiAgICAgICAgfTtcblxuICAgICAgICBpZihvcHRpb25zLmpzb24gPT09IHRydWUpXG4gICAgICAgICAgICBvcHRzLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblxuICAgICAgICBpZihvcHRpb25zLnBhcmFtcykge1xuICAgICAgICAgICAgb3B0cy5wYXJhbXMgPSBvcHRpb25zLnBhcmFtcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9wdGlvbnMuZGF0YSkge1xuICAgICAgICAgICAgb3B0cy5kYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgICAgICAgICAgb3B0cy5jb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vc2V0IGhlYWRlcnMgcmVxdWVzdGVkIGJ5IHVzZXIgY29uZmlnXG4gICAgICAgIG9wdHMuaGVhZGVycyA9IHt9O1xuICAgICAgICBpZihvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3B0cy5oZWFkZXJzLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9zZXQgYXV0aG9yaXphdGlvbiBoZWFkZXIgaWYgb25lIHdhcyBwcm92aWRlZFxuICAgICAgICBpZih0aGlzLnRva2VuKSB7XG4gICAgICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLnRva2VuKCk7XG4gICAgICAgICAgICBpZih0b2tlbikge1xuICAgICAgICAgICAgICAgIG9wdHMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgdG9rZW47XG4gICAgICAgICAgICAgICAgb3B0cy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBjb29raWUgPSB0aGlzLmdldENvb2tpZSgpO1xuICAgICAgICBpZihjb29raWUpIG9wdHMuaGVhZGVycy5Db29raWUgPSB0aGlzLmF1dGhDb29raWVOYW1lICsgJz0nICsgY29va2llO1xuXG4gICAgICAgIC8vY29weSBvdmVyIHVzZXItc3VwcGxpZWQgb3B0aW9uc1xuICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgbyBpbiBvcHRpb25zLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZihvcHRpb25zLm9wdGlvbnMuaGFzT3duUHJvcGVydHkobykpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0c1tvXSA9IG9wdGlvbnMub3B0aW9uc1tvXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0cztcbiAgICB9XG5cblxuICAgIGV4ZWN1dGUob3B0cyA6IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGlmKHR5cGVvZihheGlvcykgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBeGlvcyBub3QgZm91bmQsIGNoZWNrIHRoYXQgeW91IGhhdmUgaW5jbHVkZWQgXCIgK1xuICAgICAgICAgICAgICAgIFwiaXQgYXMgYSBkZXBlbmRlbmN5IG9mIHRoZSBhcHBsaWNhdGlvbiBvciB1c2UgYSBkaWZmZXJlbnQgXCIgK1xuICAgICAgICAgICAgICAgIFwiSHR0cENsaWVudCBpbXBsZW1lbnRhdGlvblwiKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb21pc2UgPSBheGlvcyhvcHRzKVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4geyByZXR1cm4gcmVzcG9uc2UuZGF0YTsgfSlcbiAgICAgICAgLmNhdGNoKCBlcnJvciA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyIDogR1BFcnJvciA9IG5ldyBHUEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZXJyID0gbmV3IEdQRXJyb3IoZXJyb3IucmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgWEhSSHR0cENsaWVudDtcbiJdfQ==