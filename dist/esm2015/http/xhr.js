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
        //set authorization header if one was provided
        if (this.token) {
            let token = this.token();
            if (token) {
                opts.headers = opts.headers || {};
                opts.headers.Authorization = 'Bearer ' + token;
                opts.withCredentials = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbImh0dHAveGhyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLFlBQVksTUFBTSxVQUFVLENBQUM7QUFHcEMsTUFBTSxhQUFjLFNBQVEsWUFBWTtJQUVwQzs7O09BR0c7SUFDSCxZQUFZLE9BQWlDO1FBQ3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBR0QsaUJBQWlCLENBQUMsT0FBZ0M7UUFFOUMsSUFBSSxJQUFJLEdBQTRCO1lBQ2hDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7WUFDaEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU87U0FDM0MsQ0FBQztRQUVGLElBQUcsT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1FBRS9CLElBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNoQztRQUVELElBQUcsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDO1NBQ3pDO1FBRUQsOENBQThDO1FBQzlDLElBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNYLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN6QixJQUFHLEtBQUssRUFBRTtnQkFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzthQUMvQjtTQUNKO1FBRUQsaUNBQWlDO1FBQ2pDLElBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNoQixLQUFJLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQzFCLElBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNoQzthQUNKO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBR0QsT0FBTyxDQUFDLElBQVU7UUFFZCxJQUFHLE9BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLEVBQUU7WUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0Q7Z0JBQzVELDJEQUEyRDtnQkFDM0QsMkJBQTJCLENBQUMsQ0FBQTtTQUNuQztRQUVELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDeEIsSUFBSSxDQUFFLFFBQVEsQ0FBQyxFQUFFLEdBQUcsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVDLEtBQUssQ0FBRSxLQUFLLENBQUMsRUFBRTtZQUNaLElBQUksR0FBRyxHQUFhLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hCLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFDO1lBQ0QsTUFBTSxHQUFHLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7Q0FFSjtBQUVELGVBQWUsYUFBYSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IEdQRXJyb3IgZnJvbSAnLi4vc2hhcmVkL2Vycm9yJztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi9jbGllbnQnO1xuXG5cbmNsYXNzIFhIUkh0dHBDbGllbnQgZXh0ZW5kcyBHUEh0dHBDbGllbnQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvbnMudGltZW91dFxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRva2VuIC0gdGhlIGJlYXJlciB0b2tlbiBvciBhIGZ1bmN0aW9uIHRvIHJldHJpZXZlIGl0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA/OiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIH1cblxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0pIDogYW55IHtcblxuICAgICAgICBsZXQgb3B0cyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0gPSB7XG4gICAgICAgICAgICBtZXRob2Q6IG9wdGlvbnMubWV0aG9kLFxuICAgICAgICAgICAgdXJsOiBvcHRpb25zLnVybCxcbiAgICAgICAgICAgIHRpbWVvdXQ6IG9wdGlvbnMudGltZW91dCB8fCB0aGlzLnRpbWVvdXRcbiAgICAgICAgfTtcblxuICAgICAgICBpZihvcHRpb25zLmpzb24gPT09IHRydWUpXG4gICAgICAgICAgICBvcHRzLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblxuICAgICAgICBpZihvcHRpb25zLnBhcmFtcykge1xuICAgICAgICAgICAgb3B0cy5wYXJhbXMgPSBvcHRpb25zLnBhcmFtcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9wdGlvbnMuZGF0YSkge1xuICAgICAgICAgICAgb3B0cy5kYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgICAgICAgICAgb3B0cy5jb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vc2V0IGF1dGhvcml6YXRpb24gaGVhZGVyIGlmIG9uZSB3YXMgcHJvdmlkZWRcbiAgICAgICAgaWYodGhpcy50b2tlbikge1xuICAgICAgICAgICAgbGV0IHRva2VuID0gdGhpcy50b2tlbigpO1xuICAgICAgICAgICAgaWYodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBvcHRzLmhlYWRlcnMgPSBvcHRzLmhlYWRlcnMgfHwge307XG4gICAgICAgICAgICAgICAgb3B0cy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyB0b2tlbjtcbiAgICAgICAgICAgICAgICBvcHRzLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL2NvcHkgb3ZlciB1c2VyLXN1cHBsaWVkIG9wdGlvbnNcbiAgICAgICAgaWYob3B0aW9ucy5vcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IobGV0IG8gaW4gb3B0aW9ucy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYob3B0aW9ucy5vcHRpb25zLmhhc093blByb3BlcnR5KG8pKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdHNbb10gPSBvcHRpb25zLm9wdGlvbnNbb107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgfVxuXG5cbiAgICBleGVjdXRlKG9wdHMgOiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBpZih0eXBlb2YoYXhpb3MpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXhpb3Mgbm90IGZvdW5kLCBjaGVjayB0aGF0IHlvdSBoYXZlIGluY2x1ZGVkIFwiICtcbiAgICAgICAgICAgICAgICBcIml0IGFzIGEgZGVwZW5kZW5jeSBvZiB0aGUgYXBwbGljYXRpb24gb3IgdXNlIGEgZGlmZmVyZW50IFwiICtcbiAgICAgICAgICAgICAgICBcIkh0dHBDbGllbnQgaW1wbGVtZW50YXRpb25cIilcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9taXNlID0gYXhpb3Mob3B0cylcbiAgICAgICAgLnRoZW4oIHJlc3BvbnNlID0+IHsgcmV0dXJuIHJlc3BvbnNlLmRhdGE7IH0pXG4gICAgICAgIC5jYXRjaCggZXJyb3IgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA6IEdQRXJyb3IgPSBuZXcgR1BFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIGlmIChlcnJvci5yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGVyciA9IG5ldyBHUEVycm9yKGVycm9yLnJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFhIUkh0dHBDbGllbnQ7XG4iXX0=