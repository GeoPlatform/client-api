/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from 'q';
import { GPHttpClient } from '@geoplatform/client';
class NodeHttpClient extends GPHttpClient {
    /**
     * @param {?=} options
     */
    constructor(options) {
        super(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(options) {
        /** @type {?} */
        let opts = {
            method: options["method"],
            url: options["url"],
            json: false !== options["json"],
            timeout: options["timeout"] || this.timeout
        };
        if (options["params"]) {
            opts["qs"] = options["params"];
        }
        if (options["file"]) {
            /** @type {?} */
            const fs = require('fs');
            if (!fs)
                throw new Error("Module 'fs' not available");
            opts["formData"] = {
                file: {
                    value: fs.createReadStream(options["file"].path),
                    options: {
                        filename: options["file"].originalFilename
                    }
                }
            };
            Object.assign(opts["formData"], options["data"] || {});
        }
        else if (options["data"]) {
            if (options["formData"]) {
                opts["formData"] = options["data"];
            }
            else {
                opts["body"] = options["data"];
            }
        }
        //set authorization header if one was provided
        if (this.token) {
            /** @type {?} */
            let token = this.token();
            if (token) {
                opts["auth"] = { 'bearer': token };
            }
        }
        //copy over user-supplied options
        if (options["options"]) {
            for (let o in options["options"]) {
                if (options["options"].hasOwnProperty(o)) {
                    opts[o] = options["options"][o];
                }
            }
        }
        // console.log(JSON.stringify(opts));
        return opts;
    }
    /**
     *
     * @param {?} options
     * @return {?}
     */
    execute(options) {
        /** @type {?} */
        let deferred = Q.defer();
        /** @type {?} */
        const request = require('request');
        if (!request) {
            throw new Error("Module 'request' not available");
        }
        // require('request-debug')(request);
        request(options, (error, response, body) => {
            this.checkAndHandleError(error, response)
                .then(() => {
                if (options.json === false)
                    deferred.resolve(response);
                else
                    deferred.resolve(body);
            })
                .catch(e => deferred.reject(e));
        });
        return deferred.promise;
    }
    /**
     *
     * @param {?} error
     * @param {?} response
     * @return {?}
     */
    checkAndHandleError(error, response) {
        /** @type {?} */
        let props = {
            message: null,
            error: null,
            //error type
            status: 200
        };
        if (error) {
            // Logger.debug("Error generated by request library: " + error.code);
            if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {
                props["status"] = 500;
                props["error"] = "Connection Timeout";
                props["message"] = "The response from the service took too long to read";
                if (error.connect === true) {
                    props["message"] = "Unable to establish a connection to the service";
                }
            }
            else {
                return Q.reject(error);
            }
        }
        else if (response.statusCode < 200 || response.statusCode > 204) {
            // Logger.debug('Error returned by remote endpoint (' + response.statusCode + ')');
            // Logger.debug(JSON.stringify(response));
            props["status"] = response.statusCode;
            if (response.body && typeof (response.body) === 'object') {
                props = response.body;
                props["status"] = props["status"] || response.statusCode;
                props["message"] = props["message"] || "An error occurred communicating with service";
                if (response.statusCode === 409) {
                    /** @type {?} */
                    let sidx = response.body.message.indexOf(" ");
                    /** @type {?} */
                    let eidx = response.body.message.indexOf(' already exists');
                    if (sidx >= 0 && eidx > sidx) {
                        props["item"] = response.body.message.substring(sidx + 1, eidx);
                    }
                }
            }
            else {
                switch (response.statusCode) {
                    case 404:
                        props["error"] = "Not Found";
                        props["message"] = response.request.uri.pathname + " cannot be found";
                        break;
                    case 401:
                        props["error"] = "Unauthenticated";
                        props["message"] = "You are not authenticated";
                        break;
                    case 403:
                        props["error"] = "Unauthorized";
                        props["message"] = "You are not authorized to access " + response.request.uri.pathname;
                        break;
                    case 409:
                        props["error"] = "Conflict";
                        props["message"] = "Item already exists";
                        // pattern received is: { ..., message: 'Resource <identifier> already exists', ... }
                        try {
                            /** @type {?} */
                            let json = JSON.parse(response.body);
                            /** @type {?} */
                            let sidx = json.message.indexOf(" ");
                            /** @type {?} */
                            let eidx = json.message.indexOf(' already exists');
                            if (sidx >= 0 && eidx > sidx) {
                                props["item"] = json.message.substring(sidx + 1, eidx);
                            }
                        }
                        catch (e) {
                            props["message"] += '.  Unable to extract existing identifier from service response';
                        }
                        break;
                    default:
                        try {
                            /** @type {?} */
                            let json = JSON.parse(response.body);
                            props = json;
                            props["status"] = response.statusCode;
                            // Logger.debug("PARSED ERROR: " + JSON.stringify(props));
                        }
                        catch (e) {
                            props["error"] = "Server Error";
                            props["message"] = response.body;
                            // Logger.debug("DEFAULTED ERROR: " + JSON.stringify(props));
                        }
                }
            }
        }
        if (props["status"] < 200 || props["status"] > 204) {
            props["error"] = props["error"] || "Server Error";
            props["status"] = props["status"] || response.statusCode;
            props["message"] = props["message"] || "An error occurred communicating with service";
            /** @type {?} */
            let err = new Error(props["message"]);
            Object.assign(err, props);
            // Logger.debug("UTILS.checkAndHandleError : " + err);
            // Logger.debug("UTILS.checkAndHandleError : " + JSON.stringify(err));
            // Logger.debug("UTILS.checkAndHandleError : " + err.message);
            return Q.reject(err);
        }
        return Q.resolve(null);
    }
}
export default NodeHttpClient;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvbm9kZS8iLCJzb3VyY2VzIjpbImh0dHAvbm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR25ELG9CQUFxQixTQUFRLFlBQVk7Ozs7SUFNckMsWUFBWSxPQUFpQztRQUN6QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDbEI7Ozs7O0lBRUQsaUJBQWlCLENBQUMsT0FBZ0M7O1FBRTlDLElBQUksSUFBSSxHQUF5QjtZQUM3QixNQUFNLEVBQUUsT0FBTyxVQUFPO1lBQ3RCLEdBQUcsRUFBRSxPQUFPLE9BQUk7WUFDaEIsSUFBSSxFQUFFLEtBQUssS0FBSyxPQUFPLFFBQUs7WUFDNUIsT0FBTyxFQUFFLE9BQU8sZUFBWSxJQUFJLENBQUMsT0FBTztTQUMzQyxDQUFDO1FBRUYsSUFBRyxPQUFPLFlBQVM7WUFDZixJQUFJLFNBQU0sT0FBTyxVQUFPLENBQUM7U0FDNUI7UUFFRCxJQUFHLE9BQU8sVUFBTzs7WUFDYixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsSUFBRyxDQUFDLEVBQUU7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3JELElBQUksZUFBWTtnQkFDWixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLFNBQU0sSUFBSSxDQUFDO29CQUM5QyxPQUFPLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLE9BQU8sU0FBTSxnQkFBZ0I7cUJBQzFDO2lCQUNKO2FBQ0osQ0FBQztZQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxjQUFXLE9BQU8sWUFBTyxFQUFFLENBQUMsQ0FBQztTQUVsRDthQUFNLElB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QyxDQUFDOzs7O1lBSzFCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjtRQUVELE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQjtDQUVKO0FBR0QsZUFBZSxjQUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XG5pbXBvcnQgeyBHUEh0dHBDbGllbnQgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuXG5jbGFzcyBOb2RlSHR0cENsaWVudCBleHRlbmRzIEdQSHR0cENsaWVudCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50aW1lb3V0XG4gICAgICogQHBhcmFtIG9wdGlvbnMudG9rZW4gLSB0aGUgYmVhcmVyIHRva2VuIG9yIGEgZnVuY3Rpb24gdG8gcmV0cmlldmUgaXRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IHsgW2tleTpzdHJpbmddIDogYW55IH0pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHsgW2tleTpzdHJpbmddIDogYW55IH0pIDogYW55IHtcblxuICAgICAgICBsZXQgb3B0cyA6IHtba2V5OnN0cmluZ106IGFueX0gPSB7XG4gICAgICAgICAgICBtZXRob2Q6IG9wdGlvbnMubWV0aG9kLFxuICAgICAgICAgICAgdXJsOiBvcHRpb25zLnVybCxcbiAgICAgICAgICAgIGpzb246IGZhbHNlICE9PSBvcHRpb25zLmpzb24sXG4gICAgICAgICAgICB0aW1lb3V0OiBvcHRpb25zLnRpbWVvdXQgfHwgdGhpcy50aW1lb3V0XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYob3B0aW9ucy5wYXJhbXMpIHtcbiAgICAgICAgICAgIG9wdHMucXMgPSBvcHRpb25zLnBhcmFtcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9wdGlvbnMuZmlsZSkge1xuICAgICAgICAgICAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuICAgICAgICAgICAgaWYoIWZzKSB0aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGUgJ2ZzJyBub3QgYXZhaWxhYmxlXCIpO1xuICAgICAgICAgICAgb3B0cy5mb3JtRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBmaWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAgZnMuY3JlYXRlUmVhZFN0cmVhbShvcHRpb25zLmZpbGUucGF0aCksXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBvcHRpb25zLmZpbGUub3JpZ2luYWxGaWxlbmFtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3B0cy5mb3JtRGF0YSwgb3B0aW9ucy5kYXRhfHx7fSk7XG5cbiAgICAgICAgfSBlbHNlIGlmKG9wdGlvbnMuZGF0YSkge1xuICAgICAgICAgICAgaWYob3B0aW9ucy5mb3JtRGF0YSkge1xuICAgICAgICAgICAgICAgIG9wdHMuZm9ybURhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdHMuYm9keSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vc2V0IGF1dGhvcml6YXRpb24gaGVhZGVyIGlmIG9uZSB3YXMgcHJvdmlkZWRcbiAgICAgICAgaWYodGhpcy50b2tlbikge1xuICAgICAgICAgICAgbGV0IHRva2VuID0gdGhpcy50b2tlbigpO1xuICAgICAgICAgICAgaWYodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBvcHRzLmF1dGggPSB7ICdiZWFyZXInOiB0b2tlbiB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9jb3B5IG92ZXIgdXNlci1zdXBwbGllZCBvcHRpb25zXG4gICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgZm9yKGxldCBvIGluIG9wdGlvbnMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzW29dID0gb3B0aW9ucy5vcHRpb25zW29dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG9wdHMpKTtcblxuICAgICAgICByZXR1cm4gb3B0cztcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBleGVjdXRlKG9wdGlvbnMgOiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XG5cbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IHJlcXVpcmUoJ3JlcXVlc3QnKTtcbiAgICAgICAgaWYoIXJlcXVlc3QpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1vZHVsZSAncmVxdWVzdCcgbm90IGF2YWlsYWJsZVwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXF1aXJlKCdyZXF1ZXN0LWRlYnVnJykocmVxdWVzdCk7XG5cbiAgICAgICAgcmVxdWVzdChvcHRpb25zLCAoZXJyb3IgOiBhbnksIHJlc3BvbnNlIDogYW55LCBib2R5IDogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrQW5kSGFuZGxlRXJyb3IoZXJyb3IsIHJlc3BvbnNlKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+ICB7XG4gICAgICAgICAgICAgICAgaWYob3B0aW9ucy5qc29uID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSggcmVzcG9uc2UgKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoIGJvZHkgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goIGUgPT4gZGVmZXJyZWQucmVqZWN0KGUpICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgY2hlY2tBbmRIYW5kbGVFcnJvciAoZXJyb3IgOiBhbnksIHJlc3BvbnNlIDogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBsZXQgcHJvcHMgOiB7IFtrZXk6c3RyaW5nXTogYW55IH0gPSB7XG4gICAgICAgICAgICBtZXNzYWdlOiBudWxsLFxuICAgICAgICAgICAgZXJyb3I6IG51bGwsICAgIC8vZXJyb3IgdHlwZVxuICAgICAgICAgICAgc3RhdHVzOiAyMDBcbiAgICAgICAgfTtcblxuICAgICAgICBpZihlcnJvcikge1xuICAgICAgICAgICAgLy8gTG9nZ2VyLmRlYnVnKFwiRXJyb3IgZ2VuZXJhdGVkIGJ5IHJlcXVlc3QgbGlicmFyeTogXCIgKyBlcnJvci5jb2RlKTtcblxuICAgICAgICAgICAgaWYoZXJyb3IuY29kZSA9PT0gJ0VUSU1FRE9VVCcgfHwgZXJyb3IuY29kZSA9PT0gJ0VTT0NLRVRUSU1FRE9VVCcpIHtcblxuICAgICAgICAgICAgICAgIHByb3BzLnN0YXR1cyA9IDUwMDtcbiAgICAgICAgICAgICAgICBwcm9wcy5lcnJvciA9IFwiQ29ubmVjdGlvbiBUaW1lb3V0XCI7XG4gICAgICAgICAgICAgICAgcHJvcHMubWVzc2FnZSA9IFwiVGhlIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZpY2UgdG9vayB0b28gbG9uZyB0byByZWFkXCI7XG5cbiAgICAgICAgICAgICAgICBpZihlcnJvci5jb25uZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzLm1lc3NhZ2UgPSBcIlVuYWJsZSB0byBlc3RhYmxpc2ggYSBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2aWNlXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPCAyMDAgfHwgcmVzcG9uc2Uuc3RhdHVzQ29kZSA+IDIwNCkge1xuXG4gICAgICAgICAgICAvLyBMb2dnZXIuZGVidWcoJ0Vycm9yIHJldHVybmVkIGJ5IHJlbW90ZSBlbmRwb2ludCAoJyArIHJlc3BvbnNlLnN0YXR1c0NvZGUgKyAnKScpO1xuICAgICAgICAgICAgLy8gTG9nZ2VyLmRlYnVnKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG5cbiAgICAgICAgICAgIHByb3BzLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1c0NvZGU7XG5cbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLmJvZHkgJiYgdHlwZW9mKHJlc3BvbnNlLmJvZHkpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHByb3BzID0gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICBwcm9wcy5zdGF0dXMgPSBwcm9wcy5zdGF0dXMgfHwgcmVzcG9uc2Uuc3RhdHVzQ29kZTtcbiAgICAgICAgICAgICAgICBwcm9wcy5tZXNzYWdlID0gcHJvcHMubWVzc2FnZSB8fCBcIkFuIGVycm9yIG9jY3VycmVkIGNvbW11bmljYXRpbmcgd2l0aCBzZXJ2aWNlXCI7XG5cbiAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09PSA0MDkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpZHggPSByZXNwb25zZS5ib2R5Lm1lc3NhZ2UuaW5kZXhPZihcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlaWR4ID0gcmVzcG9uc2UuYm9keS5tZXNzYWdlLmluZGV4T2YoJyBhbHJlYWR5IGV4aXN0cycpO1xuICAgICAgICAgICAgICAgICAgICBpZihzaWR4ID49IDAgJiYgZWlkeCA+IHNpZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0gPSByZXNwb25zZS5ib2R5Lm1lc3NhZ2Uuc3Vic3RyaW5nKHNpZHgrMSwgZWlkeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2gocmVzcG9uc2Uuc3RhdHVzQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQwNCA6XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5lcnJvciA9IFwiTm90IEZvdW5kXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5tZXNzYWdlID0gcmVzcG9uc2UucmVxdWVzdC51cmkucGF0aG5hbWUgKyBcIiBjYW5ub3QgYmUgZm91bmRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQwMSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5lcnJvciA9IFwiVW5hdXRoZW50aWNhdGVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5tZXNzYWdlID0gXCJZb3UgYXJlIG5vdCBhdXRoZW50aWNhdGVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuZXJyb3IgPSBcIlVuYXV0aG9yaXplZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMubWVzc2FnZSA9IFwiWW91IGFyZSBub3QgYXV0aG9yaXplZCB0byBhY2Nlc3MgXCIgKyByZXNwb25zZS5yZXF1ZXN0LnVyaS5wYXRobmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQwOSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5lcnJvciA9IFwiQ29uZmxpY3RcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLm1lc3NhZ2UgPSBcIkl0ZW0gYWxyZWFkeSBleGlzdHNcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGF0dGVybiByZWNlaXZlZCBpczogeyAuLi4sIG1lc3NhZ2U6ICdSZXNvdXJjZSA8aWRlbnRpZmllcj4gYWxyZWFkeSBleGlzdHMnLCAuLi4gfVxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQganNvbiA9IEpTT04ucGFyc2UocmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNpZHggPSBqc29uLm1lc3NhZ2UuaW5kZXhPZihcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVpZHggPSBqc29uLm1lc3NhZ2UuaW5kZXhPZignIGFscmVhZHkgZXhpc3RzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2lkeCA+PSAwICYmIGVpZHggPiBzaWR4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0gPSBqc29uLm1lc3NhZ2Uuc3Vic3RyaW5nKHNpZHgrMSwgZWlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCggZSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5tZXNzYWdlICs9ICcuICBVbmFibGUgdG8gZXh0cmFjdCBleGlzdGluZyBpZGVudGlmaWVyIGZyb20gc2VydmljZSByZXNwb25zZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqc29uID0gSlNPTi5wYXJzZShyZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcyA9IGpzb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzQ29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMb2dnZXIuZGVidWcoXCJQQVJTRUQgRVJST1I6IFwiICsgSlNPTi5zdHJpbmdpZnkocHJvcHMpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLmVycm9yID0gXCJTZXJ2ZXIgRXJyb3JcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5tZXNzYWdlID0gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMb2dnZXIuZGVidWcoXCJERUZBVUxURUQgRVJST1I6IFwiICsgSlNPTi5zdHJpbmdpZnkocHJvcHMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHByb3BzLnN0YXR1cyA8IDIwMCB8fCBwcm9wcy5zdGF0dXMgPiAyMDQgKSB7XG5cbiAgICAgICAgICAgIHByb3BzLmVycm9yID0gcHJvcHMuZXJyb3IgfHwgXCJTZXJ2ZXIgRXJyb3JcIjtcbiAgICAgICAgICAgIHByb3BzLnN0YXR1cyA9IHByb3BzLnN0YXR1cyB8fCByZXNwb25zZS5zdGF0dXNDb2RlO1xuICAgICAgICAgICAgcHJvcHMubWVzc2FnZSA9IHByb3BzLm1lc3NhZ2UgfHwgXCJBbiBlcnJvciBvY2N1cnJlZCBjb21tdW5pY2F0aW5nIHdpdGggc2VydmljZVwiO1xuXG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKHByb3BzLm1lc3NhZ2UpO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIHByb3BzKTtcblxuICAgICAgICAgICAgLy8gTG9nZ2VyLmRlYnVnKFwiVVRJTFMuY2hlY2tBbmRIYW5kbGVFcnJvciA6IFwiICsgZXJyKTtcbiAgICAgICAgICAgIC8vIExvZ2dlci5kZWJ1ZyhcIlVUSUxTLmNoZWNrQW5kSGFuZGxlRXJyb3IgOiBcIiArIEpTT04uc3RyaW5naWZ5KGVycikpO1xuICAgICAgICAgICAgLy8gTG9nZ2VyLmRlYnVnKFwiVVRJTFMuY2hlY2tBbmRIYW5kbGVFcnJvciA6IFwiICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKG51bGwpO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE5vZGVIdHRwQ2xpZW50O1xuIl19