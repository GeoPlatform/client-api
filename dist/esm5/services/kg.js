/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
            throw err;
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
            throw err;
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
            throw err;
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
        return Promise.resolve(true)
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
            throw e;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMva2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sTUFBTSxNQUFNLGtCQUFrQixDQUFDO0FBSXRDLElBQUE7SUFVSSxtQkFBWSxHQUFZLEVBQUUsVUFBeUI7dUJBSHhCLEtBQUs7MkJBQ0MsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO1FBR3RFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7S0FDNUI7Ozs7O0lBRUQsMEJBQU07Ozs7SUFBTixVQUFPLE9BQWdCO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxHQUFHLGtCQUFrQixDQUFDO0tBQy9DO0lBRUQ7Ozs7T0FJRzs7Ozs7O0lBQ0gsMkJBQU87Ozs7O0lBQVAsVUFBUyxLQUFlLEVBQUUsT0FBYzs7UUFDcEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDcEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO2FBQ3ZDLEtBQUssQ0FBQyxVQUFBLENBQUM7O1lBQ0osSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsc0RBQW9ELENBQUMsQ0FBQyxPQUFTLENBQUMsQ0FBQztZQUNyRixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLEdBQUcsQ0FBQztTQUNiLENBQUMsQ0FBQztLQUNOO0lBR0Q7Ozs7T0FJRzs7Ozs7O0lBQ0gseUJBQUs7Ozs7O0lBQUwsVUFBTyxLQUFlLEVBQUUsT0FBYzs7UUFDbEMsSUFB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Ozs7Ozs7Ozs7Ozs7O0FBRUQsZUFBZSxTQUFTLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vc2hhcmVkL2NvbmZpZyc7XG5pbXBvcnQgS0dRdWVyeSBmcm9tICcuLi9zaGFyZWQva2ctcXVlcnknO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5cbmNsYXNzIEtHU2VydmljZSB7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBhcGlCYXNlIDogc3RyaW5nO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIGJhc2VVcmwgOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBjbGllbnQgOiBHUEh0dHBDbGllbnQ7XG4gICAgcHJpdmF0ZSB0aW1lb3V0IDogbnVtYmVyID0gMzAwMDA7XG4gICAgcHJpdmF0ZSBodHRwTWV0aG9kcyA6IHN0cmluZ1tdID0gW1wiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJdO1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuc2V0VXJsKHVybCk7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gaHR0cENsaWVudDtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybCA6IHN0cmluZykge1xuICAgICAgICB0aGlzLmFwaUJhc2UgPSBiYXNlVXJsO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvcmVjb21tZW5kZXInO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBxdWVyeSAtIG9wdGlvbmFsIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB3aXRoIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIGNvbmZpZyB0byBzZW5kIHdpdGggaHR0cCByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyByZWNvbW1lbmRlZCBjb25jZXB0cyBhcyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHN1Z2dlc3QgKHF1ZXJ5IDogS0dRdWVyeSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvc3VnZ2VzdCc7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWFyY2godXJsLCBxdWVyeSwgb3B0aW9ucylcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgS0dTZXJ2aWNlLnN1Z2dlc3QoKSAtIEVycm9yIHN1Z2dlc3RpbmcgY29uY2VwdHM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBxdWVyeSAtIG9wdGlvbmFsIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB3aXRoIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIGNvbmZpZyB0byBzZW5kIHdpdGggaHR0cCByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBjb25jZXB0IHR5cGVzIGFzIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgdHlwZXMgKHF1ZXJ5IDogS0dRdWVyeSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvdHlwZXMnO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VhcmNoKHVybCwgcXVlcnksIG9wdGlvbnMpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEtHU2VydmljZS50eXBlcygpIC0gRXJyb3Igc2VhcmNoaW5nIHR5cGVzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBxdWVyeSAtIG9wdGlvbmFsIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB3aXRoIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIGNvbmZpZyB0byBzZW5kIHdpdGggaHR0cCByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBjb25jZXB0IHNvdXJjZXMgYXMgc2VhcmNoIHJlc3VsdHNcbiAgICAgKi9cbiAgICBzb3VyY2VzIChxdWVyeSA6IEtHUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL3NvdXJjZXMnO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VhcmNoKHVybCwgcXVlcnksIG9wdGlvbnMpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEtHU2VydmljZS5zb3VyY2VzKCkgLSBFcnJvciBzZWFyY2hpbmcgc291cmNlczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gICAgLyoqXG4gICAgICogaW50ZXJuYWwgbWV0aG9kIHVzZWQgYnkgZXhwb3NlZCBtZXRob2RzXG4gICAgICovXG4gICAgX3NlYXJjaCAodXJsIDogc3RyaW5nLCBxdWVyeSA6IEtHUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHRydWUgKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHEgOiB7IFtrZXk6c3RyaW5nXTphbnkgfSA9IHF1ZXJ5LmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnVybCwgcGFyYW1zOnEsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1ldGhvZCAtIG9uZSBvZiBcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIiwgXCJQQVRDSFwiXG4gICAgICogQHBhcmFtIHVybCAtIGRlc3RpbmF0aW9uIG9mIHhociByZXF1ZXN0XG4gICAgICogQHBhcmFtIHBhcmFtcyAtIG9iamVjdCB0byBiZSBzZW50IHdpdGggcmVxdWVzdCBhcyBxdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIGRhdGEgLSBvYmplY3QgdG8gYmUgc2VudCB3aXRoIHJlcXVlc3QgYXMgYm9keVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgb2JqZWN0IGRlZmluaW5nIHJlcXVlc3Qgb3B0aW9uc1xuICAgICAqIEByZXR1cm4gcmVxdWVzdCBvcHRpb25zIGZvciB4aHJcbiAgICAgKi9cbiAgICBidWlsZFJlcXVlc3QgKG9wdGlvbnMgOiB7W2tleTpzdHJpbmddOmFueX0pIDoge1trZXk6c3RyaW5nXTphbnl9IHtcblxuICAgICAgICBpZih0aGlzLmh0dHBNZXRob2RzLmluZGV4T2Yob3B0aW9ucy5tZXRob2QpPDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIEhUVFAgbWV0aG9kICR7b3B0aW9ucy5tZXRob2R9YCk7XG5cbiAgICAgICAgaWYoIW9wdGlvbnMudXJsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdXN0IHNwZWNpZnkgYSBVUkwgZm9yIEhUVFAgcmVxdWVzdHNgKTtcblxuICAgICAgICBvcHRpb25zLnRpbWVvdXQgPSB0aGlzLnRpbWVvdXQgfHwgQ29uZmlnLnRpbWVvdXQgfHwgMzAwMDA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHtba2V5OnN0cmluZ106YW55fSkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShvcHRzIDoge1trZXk6c3RyaW5nXTphbnl9KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5leGVjdXRlKG9wdHMpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGlmKGUgPT09IG51bGwgfHwgdHlwZW9mKGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGUgPSBuZXcgRXJyb3IoXCJLR1NlcnZpY2UuZXhlY3V0ZSgpIC0gUmVxdWVzdCBmYWlsZWQgYnV0IGRpZG4ndCByZXR1cm4gYW4gXCIgK1xuICAgICAgICAgICAgICAgIFwiZXJyb3IuIFRoaXMgaXMgbW9zdCBsaWtlbHkgYmVjYXVzZSB0aGUgcmVxdWVzdCB0aW1lZCBvdXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgS0dTZXJ2aWNlO1xuIl19