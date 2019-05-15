/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from 'q';
import Config from '../shared/config';
var KGService = /** @class */ (function () {
    function KGService(url, httpClient) {
        this.timeout = 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        this.setUrl(url);
        this.client = httpClient;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    KGService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/recommender';
    };
    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving recommended concepts as search results
     */
    /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving recommended concepts as search results
     */
    KGService.prototype.suggest = /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving recommended concepts as search results
     */
    function (query, options) {
        /** @type {?} */
        var url = this.baseUrl + '/suggest';
        return this._search(url, query, options)
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("KGService.suggest() - Error suggesting concepts: " + e.message);
            Object.assign(err, e);
            return Q.reject(err);
        });
    };
    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving concept types as search results
     */
    /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving concept types as search results
     */
    KGService.prototype.types = /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving concept types as search results
     */
    function (query, options) {
        /** @type {?} */
        var url = this.baseUrl + '/types';
        return this._search(url, query, options)
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("KGService.types() - Error searching types: " + e.message);
            Object.assign(err, e);
            return Q.reject(err);
        });
    };
    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving concept sources as search results
     */
    /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving concept sources as search results
     */
    KGService.prototype.sources = /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving concept sources as search results
     */
    function (query, options) {
        /** @type {?} */
        var url = this.baseUrl + '/sources';
        return this._search(url, query, options)
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("KGService.sources() - Error searching sources: " + e.message);
            Object.assign(err, e);
            return Q.reject(err);
        });
    };
    /* ----------------------------------------------------------- */
    /**
     * internal method used by exposed methods
     */
    /**
     * internal method used by exposed methods
     * @param {?} url
     * @param {?} query
     * @param {?=} options
     * @return {?}
     */
    KGService.prototype._search = /**
     * internal method used by exposed methods
     * @param {?} url
     * @param {?} query
     * @param {?=} options
     * @return {?}
     */
    function (url, query, options) {
        var _this = this;
        return Q.resolve(true)
            .then(function () {
            /** @type {?} */
            var q = query.getQuery();
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: url, params: q, options: options
            });
            return _this.execute(opts);
        });
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
    KGService.prototype.buildRequest = /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    function (options) {
        if (this.httpMethods.indexOf(options["method"]) < 0)
            throw new Error("Unsupported HTTP method " + options["method"]);
        if (!options["url"])
            throw new Error("Must specify a URL for HTTP requests");
        options["timeout"] = this.timeout || Config["timeout"] || 30000;
        return this.createRequestOpts(options);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    KGService.prototype.createRequestOpts = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return this.client.createRequestOpts(options);
    };
    /**
     * @param {?} opts
     * @return {?}
     */
    KGService.prototype.execute = /**
     * @param {?} opts
     * @return {?}
     */
    function (opts) {
        return this.client.execute(opts)
            .catch(function (e) {
            if (e === null || typeof (e) === 'undefined') {
                e = new Error("KGService.execute() - Request failed but didn't return an " +
                    "error. This is most likely because the request timed out");
            }
            return Q.reject(e);
        });
    };
    return KGService;
}());
if (false) {
    /** @type {?} */
    KGService.prototype.apiBase;
    /** @type {?} */
    KGService.prototype.baseUrl;
    /** @type {?} */
    KGService.prototype.client;
    /** @type {?} */
    KGService.prototype.timeout;
    /** @type {?} */
    KGService.prototype.httpMethods;
}
export default KGService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMva2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO0FBQ3ZCLE9BQU8sTUFBTSxNQUFNLGtCQUFrQixDQUFDO0FBSXRDLElBQUE7SUFVSSxtQkFBWSxHQUFZLEVBQUUsVUFBeUI7dUJBSHhCLEtBQUs7MkJBQ0MsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO1FBR3RFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7S0FDNUI7Ozs7O0lBRUQsMEJBQU07Ozs7SUFBTixVQUFPLE9BQWdCO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxHQUFHLGtCQUFrQixDQUFDO0tBQy9DO0lBRUQ7Ozs7T0FJRzs7Ozs7O0lBQ0gsMkJBQU87Ozs7O0lBQVAsVUFBUyxLQUFlLEVBQUUsT0FBYzs7UUFDcEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDcEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO2FBQ3ZDLEtBQUssQ0FBQyxVQUFBLENBQUM7O1lBQ0osSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsc0RBQW9ELENBQUMsQ0FBQyxPQUFTLENBQUMsQ0FBQztZQUNyRixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEIsQ0FBQyxDQUFDO0tBQ047SUFHRDs7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R0FBRyxJQUFJLEtBQUssQ0FBQyw0REFBNEQ7b0JBQzFFLDBEQUEwRCxDQUFDLENBQUM7YUFDL0Q7WUFDRCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEIsQ0FBQyxDQUFDO0tBQ047b0JBbklMO0lBcUlDLENBQUE7Ozs7Ozs7Ozs7Ozs7QUFFRCxlQUFlLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUSBmcm9tICdxJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vc2hhcmVkL2NvbmZpZyc7XG5pbXBvcnQgS0dRdWVyeSBmcm9tICcuLi9zaGFyZWQva2ctcXVlcnknO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5cbmNsYXNzIEtHU2VydmljZSB7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBhcGlCYXNlIDogc3RyaW5nO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIGJhc2VVcmwgOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBjbGllbnQgOiBHUEh0dHBDbGllbnQ7XG4gICAgcHJpdmF0ZSB0aW1lb3V0IDogbnVtYmVyID0gMzAwMDA7XG4gICAgcHJpdmF0ZSBodHRwTWV0aG9kcyA6IHN0cmluZ1tdID0gW1wiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJdO1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuc2V0VXJsKHVybCk7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gaHR0cENsaWVudDtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybCA6IHN0cmluZykge1xuICAgICAgICB0aGlzLmFwaUJhc2UgPSBiYXNlVXJsO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvcmVjb21tZW5kZXInO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBxdWVyeSAtIG9wdGlvbmFsIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB3aXRoIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIGNvbmZpZyB0byBzZW5kIHdpdGggaHR0cCByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyByZWNvbW1lbmRlZCBjb25jZXB0cyBhcyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHN1Z2dlc3QgKHF1ZXJ5IDogS0dRdWVyeSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9zdWdnZXN0JztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaCh1cmwsIHF1ZXJ5LCBvcHRpb25zKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBLR1NlcnZpY2Uuc3VnZ2VzdCgpIC0gRXJyb3Igc3VnZ2VzdGluZyBjb25jZXB0czogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcXVlcnkgLSBvcHRpb25hbCBxdWVyeSBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgd2l0aCByZXF1ZXN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBjb25maWcgdG8gc2VuZCB3aXRoIGh0dHAgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgY29uY2VwdCB0eXBlcyBhcyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHR5cGVzIChxdWVyeSA6IEtHUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvdHlwZXMnO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VhcmNoKHVybCwgcXVlcnksIG9wdGlvbnMpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEtHU2VydmljZS50eXBlcygpIC0gRXJyb3Igc2VhcmNoaW5nIHR5cGVzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHF1ZXJ5IC0gb3B0aW9uYWwgcXVlcnkgcGFyYW1ldGVycyB0byBpbmNsdWRlIHdpdGggcmVxdWVzdFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgY29uZmlnIHRvIHNlbmQgd2l0aCBodHRwIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGNvbmNlcHQgc291cmNlcyBhcyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHNvdXJjZXMgKHF1ZXJ5IDogS0dRdWVyeSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9zb3VyY2VzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaCh1cmwsIHF1ZXJ5LCBvcHRpb25zKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBLR1NlcnZpY2Uuc291cmNlcygpIC0gRXJyb3Igc2VhcmNoaW5nIHNvdXJjZXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gICAgLyoqXG4gICAgICogaW50ZXJuYWwgbWV0aG9kIHVzZWQgYnkgZXhwb3NlZCBtZXRob2RzXG4gICAgICovXG4gICAgX3NlYXJjaCAodXJsIDogc3RyaW5nLCBxdWVyeSA6IEtHUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggdHJ1ZSApXG4gICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcSA6IHsgW2tleTpzdHJpbmddOmFueSB9ID0gcXVlcnkuZ2V0UXVlcnkoKTtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBwYXJhbXM6cSwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWV0aG9kIC0gb25lIG9mIFwiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJcbiAgICAgKiBAcGFyYW0gdXJsIC0gZGVzdGluYXRpb24gb2YgeGhyIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gcGFyYW1zIC0gb2JqZWN0IHRvIGJlIHNlbnQgd2l0aCByZXF1ZXN0IGFzIHF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gZGF0YSAtIG9iamVjdCB0byBiZSBzZW50IHdpdGggcmVxdWVzdCBhcyBib2R5XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBvYmplY3QgZGVmaW5pbmcgcmVxdWVzdCBvcHRpb25zXG4gICAgICogQHJldHVybiByZXF1ZXN0IG9wdGlvbnMgZm9yIHhoclxuICAgICAqL1xuICAgIGJ1aWxkUmVxdWVzdCAob3B0aW9ucyA6IHtba2V5OnN0cmluZ106YW55fSkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuXG4gICAgICAgIGlmKHRoaXMuaHR0cE1ldGhvZHMuaW5kZXhPZihvcHRpb25zLm1ldGhvZCk8MClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgSFRUUCBtZXRob2QgJHtvcHRpb25zLm1ldGhvZH1gKTtcblxuICAgICAgICBpZighb3B0aW9ucy51cmwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE11c3Qgc3BlY2lmeSBhIFVSTCBmb3IgSFRUUCByZXF1ZXN0c2ApO1xuXG4gICAgICAgIG9wdGlvbnMudGltZW91dCA9IHRoaXMudGltZW91dCB8fCBDb25maWcudGltZW91dCB8fCAzMDAwMDtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zIDoge1trZXk6c3RyaW5nXTphbnl9KSA6IHtba2V5OnN0cmluZ106YW55fSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5jcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICBleGVjdXRlKG9wdHMgOiB7W2tleTpzdHJpbmddOmFueX0pIDogUS5Qcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuZXhlY3V0ZShvcHRzKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBpZihlID09PSBudWxsIHx8IHR5cGVvZihlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBlID0gbmV3IEVycm9yKFwiS0dTZXJ2aWNlLmV4ZWN1dGUoKSAtIFJlcXVlc3QgZmFpbGVkIGJ1dCBkaWRuJ3QgcmV0dXJuIGFuIFwiICtcbiAgICAgICAgICAgICAgICBcImVycm9yLiBUaGlzIGlzIG1vc3QgbGlrZWx5IGJlY2F1c2UgdGhlIHJlcXVlc3QgdGltZWQgb3V0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgS0dTZXJ2aWNlO1xuIl19