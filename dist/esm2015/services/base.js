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
class BaseService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        this._timeout = 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        this.setUrl(url);
        this.client = httpClient;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/items';
    }
    /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    setTimeout(milliseconds) {
        this._timeout = milliseconds;
    }
    /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    timeout(milliseconds) {
        this.setTimeout(milliseconds);
        return this;
    }
    /**
     * @return {?} GPHttpClient instance or null if one was not provided
     */
    getClient() {
        return this.client;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    createPromise(arg) {
        return new Promise(arg);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createAndResolvePromise(value) {
        return Promise.resolve(value);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    createAndRejectPromise(error) {
        return Promise.reject(error);
    }
    /**
     * @param {?} logger - log service
     * @return {?}
     */
    setLogger(logger) {
        this.logger = logger;
    }
    /**
     * @param {?} e - error to log (if logger specified)
     * @return {?}
     */
    logError(e) {
        if (this.logger && this.logger.error) {
            this.logger.error(e);
        }
    }
    /**
     * @param {?} msg - message to log as debug
     * @return {?}
     */
    logDebug(msg) {
        if (this.logger && this.logger.debug) {
            this.logger.debug(msg);
        }
    }
    /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    buildRequest(options) {
        if (this.httpMethods.indexOf(options["method"]) < 0)
            throw new Error(`Unsupported HTTP method ${options["method"]}`);
        if (!options["url"])
            throw new Error(`Must specify a URL for HTTP requests`);
        options["timeout"] = this._timeout || 30000;
        /** @type {?} */
        let opts = this.createRequestOpts(options);
        return opts;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(options) {
        /** @type {?} */
        let request = this.client.createRequestOpts(options);
        this.logDebug("BaseService.createRequestOpts() - " + JSON.stringify(request));
        return request;
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    execute(opts) {
        return this.client.execute(opts)
            .catch(e => {
            if (e === null || typeof (e) === 'undefined') {
                e = new Error("Request failed but didn't return an " +
                    "error. This is most likely because the request timed out");
            }
            return this.createAndRejectPromise(e);
        });
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFXQTs7Ozs7SUFTSSxZQUFZLEdBQVksRUFBRSxVQUF5Qjt3QkFKckIsS0FBSzsyQkFFQSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUM7UUFHeEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztLQUM1Qjs7Ozs7SUFFRCxNQUFNLENBQUMsT0FBZ0I7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsWUFBWSxDQUFDO0tBQ3pDOzs7OztJQUtELFVBQVUsQ0FBQyxZQUFxQjtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztLQUNoQzs7Ozs7SUFLRCxPQUFPLENBQUMsWUFBcUI7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQztLQUNmOzs7O0lBS0QsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUN0Qjs7Ozs7SUFFRCxhQUFhLENBQUcsR0FBNkU7UUFDekYsT0FBTyxJQUFJLE9BQU8sQ0FBTyxHQUFHLENBQUUsQ0FBQztLQUNsQzs7Ozs7SUFDRCx1QkFBdUIsQ0FBRSxLQUFXO1FBQ2hDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNqQzs7Ozs7SUFDRCxzQkFBc0IsQ0FBRyxLQUFhO1FBQ2xDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNoQzs7Ozs7SUFLRCxTQUFTLENBQUMsTUFBWTtRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN4Qjs7Ozs7SUFLRCxRQUFRLENBQUMsQ0FBZ0I7UUFDckIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hCO0tBQ0o7Ozs7O0lBS0QsUUFBUSxDQUFDLEdBQVk7UUFDakIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO0tBQ0o7Ozs7O0lBYUQsWUFBWSxDQUFFLE9BQTRCO1FBRXRDLElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxXQUFRLEdBQUMsQ0FBQztZQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixPQUFPLFVBQU8sRUFBRSxDQUFDLENBQUM7UUFFakUsSUFBRyxDQUFDLE9BQU8sT0FBSTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUU1RCxPQUFPLGNBQVcsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUM7O1FBQ3pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxPQUFPLElBQUksQ0FBQztLQUNmOzs7OztJQUVELGlCQUFpQixDQUFDLE9BQTRCOztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsb0NBQW9DLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzlFLE9BQU8sT0FBTyxDQUFDO0tBQ2xCOzs7OztJQUVELE9BQU8sQ0FBQyxJQUF5QjtRQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUMvQixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDUCxJQUFHLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDeEMsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLHNDQUFzQztvQkFDcEQsMERBQTBELENBQUMsQ0FBQzthQUMvRDtZQUNELE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pDLENBQUMsQ0FBQztLQUNOO0NBRUo7Ozs7Ozs7Ozs7Ozs7OztBQUdELGVBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uL3NoYXJlZC9jb25maWcnO1xuaW1wb3J0IFF1ZXJ5IGZyb20gJy4uL3NoYXJlZC9xdWVyeSc7XG5pbXBvcnQgR1BIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvY2xpZW50JztcblxuLyoqXG4gKiBCYXNlU2VydmljZVxuICogYWJzdHJhY3Qgc2VydmljZSBmb3Igd29ya2luZyB3aXRoIHRoZSBHZW9QbGF0Zm9ybSBBUEkgdG9cbiAqIHJldHJpZXZlIGFuZCBtYW5pcHVsYXRlIGl0ZW1zLlxuICpcbiAqL1xuY2xhc3MgQmFzZVNlcnZpY2Uge1xuXG4gICAgcHJvdGVjdGVkIGFwaUJhc2UgPzogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBiYXNlVXJsID86IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgY2xpZW50IDogR1BIdHRwQ2xpZW50O1xuICAgIHByb3RlY3RlZCBfdGltZW91dCA6IG51bWJlciA9IDMwMDAwO1xuICAgIHByb3RlY3RlZCBsb2dnZXIgOiBhbnk7XG4gICAgcHJvdGVjdGVkIGh0dHBNZXRob2RzIDogc3RyaW5nW10gPSBbXCJHRVRcIiwgXCJQT1NUXCIsIFwiUFVUXCIsIFwiREVMRVRFXCIsIFwiUEFUQ0hcIl07XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQpIHtcbiAgICAgICAgdGhpcy5zZXRVcmwodXJsKTtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBodHRwQ2xpZW50O1xuICAgIH1cblxuICAgIHNldFVybChiYXNlVXJsIDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYXBpQmFzZSA9IGJhc2VVcmw7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmwgKyAnL2FwaS9pdGVtcyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1pbGxpc2Vjb25kcyAtIG92ZXJyaWRlIGVudmlyb25tZW50IHZhcmlhYmxlIHRpbWVvdXRcbiAgICAgKi9cbiAgICBzZXRUaW1lb3V0KG1pbGxpc2Vjb25kcyA6IG51bWJlcikge1xuICAgICAgICB0aGlzLl90aW1lb3V0ID0gbWlsbGlzZWNvbmRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtaWxsaXNlY29uZHMgLSBvdmVycmlkZSBlbnZpcm9ubWVudCB2YXJpYWJsZSB0aW1lb3V0XG4gICAgICovXG4gICAgdGltZW91dChtaWxsaXNlY29uZHMgOiBudW1iZXIpIDogQmFzZVNlcnZpY2Uge1xuICAgICAgICB0aGlzLnNldFRpbWVvdXQobWlsbGlzZWNvbmRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBHUEh0dHBDbGllbnQgaW5zdGFuY2Ugb3IgbnVsbCBpZiBvbmUgd2FzIG5vdCBwcm92aWRlZFxuICAgICAqL1xuICAgIGdldENsaWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50O1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBsb2dnZXIgLSBsb2cgc2VydmljZVxuICAgICAqL1xuICAgIHNldExvZ2dlcihsb2dnZXIgOiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGUgLSBlcnJvciB0byBsb2cgKGlmIGxvZ2dlciBzcGVjaWZpZWQpXG4gICAgICovXG4gICAgbG9nRXJyb3IoZSA6IHN0cmluZ3xFcnJvcikge1xuICAgICAgICBpZih0aGlzLmxvZ2dlciAmJiB0aGlzLmxvZ2dlci5lcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbXNnIC0gbWVzc2FnZSB0byBsb2cgYXMgZGVidWdcbiAgICAgKi9cbiAgICBsb2dEZWJ1Zyhtc2cgOiBzdHJpbmcpIHtcbiAgICAgICAgaWYodGhpcy5sb2dnZXIgJiYgdGhpcy5sb2dnZXIuZGVidWcpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWV0aG9kIC0gb25lIG9mIFwiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJcbiAgICAgKiBAcGFyYW0gdXJsIC0gZGVzdGluYXRpb24gb2YgeGhyIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gcGFyYW1zIC0gb2JqZWN0IHRvIGJlIHNlbnQgd2l0aCByZXF1ZXN0IGFzIHF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gZGF0YSAtIG9iamVjdCB0byBiZSBzZW50IHdpdGggcmVxdWVzdCBhcyBib2R5XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBvYmplY3QgZGVmaW5pbmcgcmVxdWVzdCBvcHRpb25zXG4gICAgICogQHJldHVybiByZXF1ZXN0IG9wdGlvbnMgZm9yIHhoclxuICAgICAqL1xuICAgIGJ1aWxkUmVxdWVzdCAob3B0aW9ucyA6IHtba2V5OnN0cmluZ106YW55fSkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuXG4gICAgICAgIGlmKHRoaXMuaHR0cE1ldGhvZHMuaW5kZXhPZihvcHRpb25zLm1ldGhvZCk8MClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgSFRUUCBtZXRob2QgJHtvcHRpb25zLm1ldGhvZH1gKTtcblxuICAgICAgICBpZighb3B0aW9ucy51cmwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE11c3Qgc3BlY2lmeSBhIFVSTCBmb3IgSFRUUCByZXF1ZXN0c2ApO1xuXG4gICAgICAgIG9wdGlvbnMudGltZW91dCA9IHRoaXMuX3RpbWVvdXQgfHwgMzAwMDA7XG4gICAgICAgIGxldCBvcHRzID0gdGhpcy5jcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHtba2V5OnN0cmluZ106YW55fSkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuICAgICAgICBsZXQgcmVxdWVzdCA9IHRoaXMuY2xpZW50LmNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmxvZ0RlYnVnKFwiQmFzZVNlcnZpY2UuY3JlYXRlUmVxdWVzdE9wdHMoKSAtIFwiICsgSlNPTi5zdHJpbmdpZnkocmVxdWVzdCkpO1xuICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICB9XG5cbiAgICBleGVjdXRlKG9wdHMgOiB7W2tleTpzdHJpbmddOmFueX0gKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5leGVjdXRlKG9wdHMpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGlmKGUgPT09IG51bGwgfHwgdHlwZW9mKGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGUgPSBuZXcgRXJyb3IoXCJSZXF1ZXN0IGZhaWxlZCBidXQgZGlkbid0IHJldHVybiBhbiBcIiArXG4gICAgICAgICAgICAgICAgXCJlcnJvci4gVGhpcyBpcyBtb3N0IGxpa2VseSBiZWNhdXNlIHRoZSByZXF1ZXN0IHRpbWVkIG91dFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlamVjdFByb21pc2UoZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VTZXJ2aWNlO1xuIl19