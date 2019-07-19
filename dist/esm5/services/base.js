/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * BaseService
 * abstract service for working with the GeoPlatform API to
 * retrieve and manipulate items.
 *
 */
var /**
 * BaseService
 * abstract service for working with the GeoPlatform API to
 * retrieve and manipulate items.
 *
 */
BaseService = /** @class */ (function () {
    function BaseService(url, httpClient) {
        this._timeout = 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        this.setUrl(url);
        this.client = httpClient;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    BaseService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/items';
    };
    /**
     * @param milliseconds - override environment variable timeout
     */
    /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    BaseService.prototype.setTimeout = /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    function (milliseconds) {
        this._timeout = milliseconds;
    };
    /**
     * @param milliseconds - override environment variable timeout
     */
    /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    BaseService.prototype.timeout = /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    function (milliseconds) {
        this.setTimeout(milliseconds);
        return this;
    };
    /**
     * @return GPHttpClient instance or null if one was not provided
     */
    /**
     * @return {?} GPHttpClient instance or null if one was not provided
     */
    BaseService.prototype.getClient = /**
     * @return {?} GPHttpClient instance or null if one was not provided
     */
    function () {
        return this.client;
    };
    /**
     * @param {?} arg
     * @return {?}
     */
    BaseService.prototype.createPromise = /**
     * @param {?} arg
     * @return {?}
     */
    function (arg) {
        return new Promise(arg);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    BaseService.prototype.createAndResolvePromise = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return Promise.resolve(value);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    BaseService.prototype.createAndRejectPromise = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        return Promise.reject(error);
    };
    /**
     * @param logger - log service
     */
    /**
     * @param {?} logger - log service
     * @return {?}
     */
    BaseService.prototype.setLogger = /**
     * @param {?} logger - log service
     * @return {?}
     */
    function (logger) {
        this.logger = logger;
    };
    /**
     * @param e - error to log (if logger specified)
     */
    /**
     * @param {?} e - error to log (if logger specified)
     * @return {?}
     */
    BaseService.prototype.logError = /**
     * @param {?} e - error to log (if logger specified)
     * @return {?}
     */
    function (e) {
        if (this.logger && this.logger.error) {
            this.logger.error(e);
        }
    };
    /**
     * @param msg - message to log as debug
     */
    /**
     * @param {?} msg - message to log as debug
     * @return {?}
     */
    BaseService.prototype.logDebug = /**
     * @param {?} msg - message to log as debug
     * @return {?}
     */
    function (msg) {
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
    /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    BaseService.prototype.buildRequest = /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    function (options) {
        if (this.httpMethods.indexOf(options["method"]) < 0)
            throw new Error("Unsupported HTTP method " + options["method"]);
        if (!options["url"])
            throw new Error("Must specify a URL for HTTP requests");
        options["timeout"] = this._timeout || 30000;
        /** @type {?} */
        var opts = this.createRequestOpts(options);
        return opts;
    };
    /**
     * @param {?} options
     * @return {?}
     */
    BaseService.prototype.createRequestOpts = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var request = this.client.createRequestOpts(options);
        this.logDebug("BaseService.createRequestOpts() - " + JSON.stringify(request));
        return request;
    };
    /**
     * @param {?} opts
     * @return {?}
     */
    BaseService.prototype.execute = /**
     * @param {?} opts
     * @return {?}
     */
    function (opts) {
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
if (false) {
    /** @type {?} */
    BaseService.prototype.apiBase;
    /** @type {?} */
    BaseService.prototype.baseUrl;
    /** @type {?} */
    BaseService.prototype.client;
    /** @type {?} */
    BaseService.prototype._timeout;
    /** @type {?} */
    BaseService.prototype.logger;
    /** @type {?} */
    BaseService.prototype.httpMethods;
}
export default BaseService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFXQTs7Ozs7O0FBQUE7SUFTSSxxQkFBWSxHQUFZLEVBQUUsVUFBeUI7d0JBSnJCLEtBQUs7MkJBRUEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO1FBR3hFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7S0FDNUI7Ozs7O0lBRUQsNEJBQU07Ozs7SUFBTixVQUFPLE9BQWdCO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxHQUFHLFlBQVksQ0FBQztLQUN6QztJQUVEOztPQUVHOzs7OztJQUNILGdDQUFVOzs7O0lBQVYsVUFBVyxZQUFxQjtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztLQUNoQztJQUVEOztPQUVHOzs7OztJQUNILDZCQUFPOzs7O0lBQVAsVUFBUSxZQUFxQjtRQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRDs7T0FFRzs7OztJQUNILCtCQUFTOzs7SUFBVDtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUN0Qjs7Ozs7SUFFRCxtQ0FBYTs7OztJQUFiLFVBQWdCLEdBQTZFO1FBQ3pGLE9BQU8sSUFBSSxPQUFPLENBQU8sR0FBRyxDQUFFLENBQUM7S0FDbEM7Ozs7O0lBQ0QsNkNBQXVCOzs7O0lBQXZCLFVBQXlCLEtBQVc7UUFDaEMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDOzs7OztJQUNELDRDQUFzQjs7OztJQUF0QixVQUF5QixLQUFhO1FBQ2xDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNoQztJQUVEOztPQUVHOzs7OztJQUNILCtCQUFTOzs7O0lBQVQsVUFBVSxNQUFZO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3hCO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsOEJBQVE7Ozs7SUFBUixVQUFTLENBQWdCO1FBQ3JCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4QjtLQUNKO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsOEJBQVE7Ozs7SUFBUixVQUFTLEdBQVk7UUFDakIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO0tBQ0o7SUFLRDs7Ozs7OztPQU9HOzs7OztJQUNILGtDQUFZOzs7O0lBQVosVUFBYyxPQUE0QjtRQUV0QyxJQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sV0FBUSxHQUFDLENBQUM7WUFDekMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBMkIsT0FBTyxVQUFTLENBQUMsQ0FBQztRQUVqRSxJQUFHLENBQUMsT0FBTyxPQUFJO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBRTVELE9BQU8sY0FBVyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQzs7UUFDekMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7Ozs7O0lBRUQsdUNBQWlCOzs7O0lBQWpCLFVBQWtCLE9BQTRCOztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsb0NBQW9DLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzlFLE9BQU8sT0FBTyxDQUFDO0tBQ2xCOzs7OztJQUVELDZCQUFPOzs7O0lBQVAsVUFBUSxJQUF5QjtRQUFqQyxpQkFTQztRQVJHLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQy9CLEtBQUssQ0FBQyxVQUFBLENBQUM7WUFDSixJQUFHLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDeEMsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLHNDQUFzQztvQkFDcEQsMERBQTBELENBQUMsQ0FBQzthQUMvRDtZQUNELE9BQU8sS0FBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pDLENBQUMsQ0FBQztLQUNOO3NCQTlITDtJQWdJQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFHRCxlQUFlLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCBRdWVyeSBmcm9tICcuLi9zaGFyZWQvcXVlcnknO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5cbi8qKlxuICogQmFzZVNlcnZpY2VcbiAqIGFic3RyYWN0IHNlcnZpY2UgZm9yIHdvcmtpbmcgd2l0aCB0aGUgR2VvUGxhdGZvcm0gQVBJIHRvXG4gKiByZXRyaWV2ZSBhbmQgbWFuaXB1bGF0ZSBpdGVtcy5cbiAqXG4gKi9cbmNsYXNzIEJhc2VTZXJ2aWNlIHtcblxuICAgIHByb3RlY3RlZCBhcGlCYXNlID86IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgYmFzZVVybCA/OiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIGNsaWVudCA6IEdQSHR0cENsaWVudDtcbiAgICBwcm90ZWN0ZWQgX3RpbWVvdXQgOiBudW1iZXIgPSAzMDAwMDtcbiAgICBwcm90ZWN0ZWQgbG9nZ2VyIDogYW55O1xuICAgIHByb3RlY3RlZCBodHRwTWV0aG9kcyA6IHN0cmluZ1tdID0gW1wiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJdO1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuc2V0VXJsKHVybCk7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gaHR0cENsaWVudDtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybCA6IHN0cmluZykge1xuICAgICAgICB0aGlzLmFwaUJhc2UgPSBiYXNlVXJsO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvaXRlbXMnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtaWxsaXNlY29uZHMgLSBvdmVycmlkZSBlbnZpcm9ubWVudCB2YXJpYWJsZSB0aW1lb3V0XG4gICAgICovXG4gICAgc2V0VGltZW91dChtaWxsaXNlY29uZHMgOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdGltZW91dCA9IG1pbGxpc2Vjb25kcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWlsbGlzZWNvbmRzIC0gb3ZlcnJpZGUgZW52aXJvbm1lbnQgdmFyaWFibGUgdGltZW91dFxuICAgICAqL1xuICAgIHRpbWVvdXQobWlsbGlzZWNvbmRzIDogbnVtYmVyKSA6IEJhc2VTZXJ2aWNlIHtcbiAgICAgICAgdGhpcy5zZXRUaW1lb3V0KG1pbGxpc2Vjb25kcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gR1BIdHRwQ2xpZW50IGluc3RhbmNlIG9yIG51bGwgaWYgb25lIHdhcyBub3QgcHJvdmlkZWRcbiAgICAgKi9cbiAgICBnZXRDbGllbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudDtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9taXNlICggYXJnOiAocmVzb2x2ZTogKHZhbHVlPzogYW55KSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQpID0+IHZvaWQgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KCBhcmcgKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHZhbHVlIDogYW55ICkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVqZWN0UHJvbWlzZSAoIGVycm9yIDogRXJyb3IgKSA6IFByb21pc2U8YW55PntcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbG9nZ2VyIC0gbG9nIHNlcnZpY2VcbiAgICAgKi9cbiAgICBzZXRMb2dnZXIobG9nZ2VyIDogYW55KSB7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBlIC0gZXJyb3IgdG8gbG9nIChpZiBsb2dnZXIgc3BlY2lmaWVkKVxuICAgICAqL1xuICAgIGxvZ0Vycm9yKGUgOiBzdHJpbmd8RXJyb3IpIHtcbiAgICAgICAgaWYodGhpcy5sb2dnZXIgJiYgdGhpcy5sb2dnZXIuZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1zZyAtIG1lc3NhZ2UgdG8gbG9nIGFzIGRlYnVnXG4gICAgICovXG4gICAgbG9nRGVidWcobXNnIDogc3RyaW5nKSB7XG4gICAgICAgIGlmKHRoaXMubG9nZ2VyICYmIHRoaXMubG9nZ2VyLmRlYnVnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1Zyhtc2cpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1ldGhvZCAtIG9uZSBvZiBcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIiwgXCJQQVRDSFwiXG4gICAgICogQHBhcmFtIHVybCAtIGRlc3RpbmF0aW9uIG9mIHhociByZXF1ZXN0XG4gICAgICogQHBhcmFtIHBhcmFtcyAtIG9iamVjdCB0byBiZSBzZW50IHdpdGggcmVxdWVzdCBhcyBxdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIGRhdGEgLSBvYmplY3QgdG8gYmUgc2VudCB3aXRoIHJlcXVlc3QgYXMgYm9keVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgb2JqZWN0IGRlZmluaW5nIHJlcXVlc3Qgb3B0aW9uc1xuICAgICAqIEByZXR1cm4gcmVxdWVzdCBvcHRpb25zIGZvciB4aHJcbiAgICAgKi9cbiAgICBidWlsZFJlcXVlc3QgKG9wdGlvbnMgOiB7W2tleTpzdHJpbmddOmFueX0pIDoge1trZXk6c3RyaW5nXTphbnl9IHtcblxuICAgICAgICBpZih0aGlzLmh0dHBNZXRob2RzLmluZGV4T2Yob3B0aW9ucy5tZXRob2QpPDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIEhUVFAgbWV0aG9kICR7b3B0aW9ucy5tZXRob2R9YCk7XG5cbiAgICAgICAgaWYoIW9wdGlvbnMudXJsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdXN0IHNwZWNpZnkgYSBVUkwgZm9yIEhUVFAgcmVxdWVzdHNgKTtcblxuICAgICAgICBvcHRpb25zLnRpbWVvdXQgPSB0aGlzLl90aW1lb3V0IHx8IDMwMDAwO1xuICAgICAgICBsZXQgb3B0cyA9IHRoaXMuY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBvcHRzO1xuICAgIH1cblxuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMgOiB7W2tleTpzdHJpbmddOmFueX0pIDoge1trZXk6c3RyaW5nXTphbnl9IHtcbiAgICAgICAgbGV0IHJlcXVlc3QgPSB0aGlzLmNsaWVudC5jcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zKTtcbiAgICAgICAgdGhpcy5sb2dEZWJ1ZyhcIkJhc2VTZXJ2aWNlLmNyZWF0ZVJlcXVlc3RPcHRzKCkgLSBcIiArIEpTT04uc3RyaW5naWZ5KHJlcXVlc3QpKTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShvcHRzIDoge1trZXk6c3RyaW5nXTphbnl9ICkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuZXhlY3V0ZShvcHRzKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBpZihlID09PSBudWxsIHx8IHR5cGVvZihlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBlID0gbmV3IEVycm9yKFwiUmVxdWVzdCBmYWlsZWQgYnV0IGRpZG4ndCByZXR1cm4gYW4gXCIgK1xuICAgICAgICAgICAgICAgIFwiZXJyb3IuIFRoaXMgaXMgbW9zdCBsaWtlbHkgYmVjYXVzZSB0aGUgcmVxdWVzdCB0aW1lZCBvdXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZWplY3RQcm9taXNlKGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBCYXNlU2VydmljZTtcbiJdfQ==