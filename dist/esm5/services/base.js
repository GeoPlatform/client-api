/**
 * BaseService
 * abstract service for working with the GeoPlatform API to
 * retrieve and manipulate items.
 *
 */
var BaseService = /** @class */ (function () {
    function BaseService(url, httpClient) {
        this._timeout = 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        this.setUrl(url);
        this.client = httpClient;
    }
    BaseService.prototype.setUrl = function (baseUrl) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/items';
    };
    /**
     * @param milliseconds - override environment variable timeout
     */
    BaseService.prototype.setTimeout = function (milliseconds) {
        this._timeout = milliseconds;
    };
    /**
     * @param milliseconds - override environment variable timeout
     */
    BaseService.prototype.timeout = function (milliseconds) {
        this.setTimeout(milliseconds);
        return this;
    };
    /**
     * @return GPHttpClient instance or null if one was not provided
     */
    BaseService.prototype.getClient = function () {
        return this.client;
    };
    BaseService.prototype.createPromise = function (arg) {
        return new Promise(arg);
    };
    BaseService.prototype.createAndResolvePromise = function (value) {
        return Promise.resolve(value);
    };
    BaseService.prototype.createAndRejectPromise = function (error) {
        return Promise.reject(error);
    };
    /**
     * @param logger - log service
     */
    BaseService.prototype.setLogger = function (logger) {
        this.logger = logger;
    };
    /**
     * @param e - error to log (if logger specified)
     */
    BaseService.prototype.logError = function (e) {
        if (this.logger && this.logger.error) {
            this.logger.error(e);
        }
    };
    /**
     * @param msg - message to log as debug
     */
    BaseService.prototype.logDebug = function (msg) {
        if (this.logger && this.logger.debug) {
            this.logger.debug(msg);
        }
    };
    /**
     * @param method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
     * @param url - destination of xhr request
     * @param params - object to be sent with request as query parameters
     * @param data - object to be sent with request as body
     * @param options - optional object defining request options
     * @return request options for xhr
     */
    BaseService.prototype.buildRequest = function (options) {
        if (this.httpMethods.indexOf(options.method) < 0)
            throw new Error("Unsupported HTTP method " + options.method);
        if (!options.url)
            throw new Error("Must specify a URL for HTTP requests");
        options.timeout = this._timeout || 30000;
        var opts = this.createRequestOpts(options);
        return opts;
    };
    BaseService.prototype.createRequestOpts = function (options) {
        if (typeof (options.options) === 'object') {
            var req_1 = options.options; //user supplied configuration
            delete options.options;
            if (req_1.params && options.params) { //merge user params with ones needed by API calls
                //Note: any user-supplied parameter of the same name as one used
                // by the GP API call will be overwritten
                Object.keys(options.params).forEach(function (param) {
                    req_1.params[param] = options.params[param];
                });
                delete options.params;
            }
            Object.assign(req_1, options);
            options = req_1;
        }
        var request = this.client.createRequestOpts(options);
        this.logDebug("BaseService.createRequestOpts() - " + JSON.stringify(request));
        return request;
    };
    BaseService.prototype.execute = function (opts) {
        var _this = this;
        return this.client.execute(opts)
            .catch(function (e) {
            if (e === null || typeof (e) === 'undefined') {
                e = new Error("Request failed but didn't return an " +
                    "error. This is most likely because the request timed out");
            }
            return _this.createAndRejectPromise(e);
        });
    };
    return BaseService;
}());
export default BaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBOzs7OztHQUtHO0FBQ0g7SUFTSSxxQkFBWSxHQUFZLEVBQUUsVUFBeUI7UUFKekMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixnQkFBVyxHQUFjLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBR3pFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7SUFDN0IsQ0FBQztJQUVELDRCQUFNLEdBQU4sVUFBTyxPQUFnQjtRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxZQUFZLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0NBQVUsR0FBVixVQUFXLFlBQXFCO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUNILDZCQUFPLEdBQVAsVUFBUSxZQUFxQjtRQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNILCtCQUFTLEdBQVQ7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELG1DQUFhLEdBQWIsVUFBZ0IsR0FBNkU7UUFDekYsT0FBTyxJQUFJLE9BQU8sQ0FBTyxHQUFHLENBQUUsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsNkNBQXVCLEdBQXZCLFVBQXlCLEtBQVc7UUFDaEMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFD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SyxXQUFXLEVBQUU7Z0JBQ3hDLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxzQ0FBc0M7b0JBQ3BELDBEQUEwRCxDQUFDLENBQUM7YUFDL0Q7WUFDRCxPQUFPLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTCxrQkFBQztBQUFELENBQUMsQUF2SUQsSUF1SUM7QUFHRCxlQUFlLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCBRdWVyeSBmcm9tICcuLi9zaGFyZWQvcXVlcnknO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5cbi8qKlxuICogQmFzZVNlcnZpY2VcbiAqIGFic3RyYWN0IHNlcnZpY2UgZm9yIHdvcmtpbmcgd2l0aCB0aGUgR2VvUGxhdGZvcm0gQVBJIHRvXG4gKiByZXRyaWV2ZSBhbmQgbWFuaXB1bGF0ZSBpdGVtcy5cbiAqXG4gKi9cbmNsYXNzIEJhc2VTZXJ2aWNlIHtcblxuICAgIHByb3RlY3RlZCBhcGlCYXNlID86IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgYmFzZVVybCA/OiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIGNsaWVudCA6IEdQSHR0cENsaWVudDtcbiAgICBwcm90ZWN0ZWQgX3RpbWVvdXQgOiBudW1iZXIgPSAzMDAwMDtcbiAgICBwcm90ZWN0ZWQgbG9nZ2VyIDogYW55O1xuICAgIHByb3RlY3RlZCBodHRwTWV0aG9kcyA6IHN0cmluZ1tdID0gW1wiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJdO1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuc2V0VXJsKHVybCk7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gaHR0cENsaWVudDtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybCA6IHN0cmluZykge1xuICAgICAgICB0aGlzLmFwaUJhc2UgPSBiYXNlVXJsO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvaXRlbXMnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtaWxsaXNlY29uZHMgLSBvdmVycmlkZSBlbnZpcm9ubWVudCB2YXJpYWJsZSB0aW1lb3V0XG4gICAgICovXG4gICAgc2V0VGltZW91dChtaWxsaXNlY29uZHMgOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdGltZW91dCA9IG1pbGxpc2Vjb25kcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWlsbGlzZWNvbmRzIC0gb3ZlcnJpZGUgZW52aXJvbm1lbnQgdmFyaWFibGUgdGltZW91dFxuICAgICAqL1xuICAgIHRpbWVvdXQobWlsbGlzZWNvbmRzIDogbnVtYmVyKSA6IEJhc2VTZXJ2aWNlIHtcbiAgICAgICAgdGhpcy5zZXRUaW1lb3V0KG1pbGxpc2Vjb25kcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gR1BIdHRwQ2xpZW50IGluc3RhbmNlIG9yIG51bGwgaWYgb25lIHdhcyBub3QgcHJvdmlkZWRcbiAgICAgKi9cbiAgICBnZXRDbGllbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudDtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9taXNlICggYXJnOiAocmVzb2x2ZTogKHZhbHVlPzogYW55KSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQpID0+IHZvaWQgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KCBhcmcgKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHZhbHVlIDogYW55ICkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVqZWN0UHJvbWlzZSAoIGVycm9yIDogRXJyb3IgKSA6IFByb21pc2U8YW55PntcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbG9nZ2VyIC0gbG9nIHNlcnZpY2VcbiAgICAgKi9cbiAgICBzZXRMb2dnZXIobG9nZ2VyIDogYW55KSB7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBlIC0gZXJyb3IgdG8gbG9nIChpZiBsb2dnZXIgc3BlY2lmaWVkKVxuICAgICAqL1xuICAgIGxvZ0Vycm9yKGUgOiBzdHJpbmd8RXJyb3IpIHtcbiAgICAgICAgaWYodGhpcy5sb2dnZXIgJiYgdGhpcy5sb2dnZXIuZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1zZyAtIG1lc3NhZ2UgdG8gbG9nIGFzIGRlYnVnXG4gICAgICovXG4gICAgbG9nRGVidWcobXNnIDogc3RyaW5nKSB7XG4gICAgICAgIGlmKHRoaXMubG9nZ2VyICYmIHRoaXMubG9nZ2VyLmRlYnVnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1Zyhtc2cpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1ldGhvZCAtIG9uZSBvZiBcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIiwgXCJQQVRDSFwiXG4gICAgICogQHBhcmFtIHVybCAtIGRlc3RpbmF0aW9uIG9mIHhociByZXF1ZXN0XG4gICAgICogQHBhcmFtIHBhcmFtcyAtIG9iamVjdCB0byBiZSBzZW50IHdpdGggcmVxdWVzdCBhcyBxdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIGRhdGEgLSBvYmplY3QgdG8gYmUgc2VudCB3aXRoIHJlcXVlc3QgYXMgYm9keVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgb2JqZWN0IGRlZmluaW5nIHJlcXVlc3Qgb3B0aW9uc1xuICAgICAqIEByZXR1cm4gcmVxdWVzdCBvcHRpb25zIGZvciB4aHJcbiAgICAgKi9cbiAgICBidWlsZFJlcXVlc3QgKG9wdGlvbnMgOiB7W2tleTpzdHJpbmddOmFueX0pIDoge1trZXk6c3RyaW5nXTphbnl9IHtcblxuICAgICAgICBpZih0aGlzLmh0dHBNZXRob2RzLmluZGV4T2Yob3B0aW9ucy5tZXRob2QpPDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIEhUVFAgbWV0aG9kICR7b3B0aW9ucy5tZXRob2R9YCk7XG5cbiAgICAgICAgaWYoIW9wdGlvbnMudXJsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdXN0IHNwZWNpZnkgYSBVUkwgZm9yIEhUVFAgcmVxdWVzdHNgKTtcblxuICAgICAgICBvcHRpb25zLnRpbWVvdXQgPSB0aGlzLl90aW1lb3V0IHx8IDMwMDAwO1xuICAgICAgICBsZXQgb3B0cyA9IHRoaXMuY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBvcHRzO1xuICAgIH1cblxuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMgOiB7W2tleTpzdHJpbmddOmFueX0pIDoge1trZXk6c3RyaW5nXTphbnl9IHtcblxuICAgICAgICBpZih0eXBlb2Yob3B0aW9ucy5vcHRpb25zKT09PSdvYmplY3QnKSB7XG4gICAgICAgICAgICBsZXQgcmVxID0gb3B0aW9ucy5vcHRpb25zOyAgLy91c2VyIHN1cHBsaWVkIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLm9wdGlvbnM7XG5cbiAgICAgICAgICAgIGlmKHJlcS5wYXJhbXMgJiYgb3B0aW9ucy5wYXJhbXMpIHsgICAgLy9tZXJnZSB1c2VyIHBhcmFtcyB3aXRoIG9uZXMgbmVlZGVkIGJ5IEFQSSBjYWxsc1xuICAgICAgICAgICAgICAgIC8vTm90ZTogYW55IHVzZXItc3VwcGxpZWQgcGFyYW1ldGVyIG9mIHRoZSBzYW1lIG5hbWUgYXMgb25lIHVzZWRcbiAgICAgICAgICAgICAgICAvLyBieSB0aGUgR1AgQVBJIGNhbGwgd2lsbCBiZSBvdmVyd3JpdHRlblxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMucGFyYW1zKS5mb3JFYWNoKCBwYXJhbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcS5wYXJhbXNbcGFyYW1dID0gb3B0aW9ucy5wYXJhbXNbcGFyYW1dO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLnBhcmFtcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXEsIG9wdGlvbnMpO1xuICAgICAgICAgICAgb3B0aW9ucyA9IHJlcTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXF1ZXN0ID0gdGhpcy5jbGllbnQuY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMubG9nRGVidWcoXCJCYXNlU2VydmljZS5jcmVhdGVSZXF1ZXN0T3B0cygpIC0gXCIgKyBKU09OLnN0cmluZ2lmeShyZXF1ZXN0KSk7XG4gICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgIH1cblxuICAgIGV4ZWN1dGUob3B0cyA6IHtba2V5OnN0cmluZ106YW55fSApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LmV4ZWN1dGUob3B0cylcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgaWYoZSA9PT0gbnVsbCB8fCB0eXBlb2YoZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgZSA9IG5ldyBFcnJvcihcIlJlcXVlc3QgZmFpbGVkIGJ1dCBkaWRuJ3QgcmV0dXJuIGFuIFwiICtcbiAgICAgICAgICAgICAgICBcImVycm9yLiBUaGlzIGlzIG1vc3QgbGlrZWx5IGJlY2F1c2UgdGhlIHJlcXVlc3QgdGltZWQgb3V0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVqZWN0UHJvbWlzZShlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVNlcnZpY2U7XG4iXX0=