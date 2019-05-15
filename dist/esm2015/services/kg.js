/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from 'q';
import Config from '../shared/config';
class KGService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        this.timeout = 30000;
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
        this.baseUrl = baseUrl + '/api/recommender';
    }
    /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving recommended concepts as search results
     */
    suggest(query, options) {
        /** @type {?} */
        let url = this.baseUrl + '/suggest';
        return this._search(url, query, options)
            .catch(e => {
            /** @type {?} */
            let err = new Error(`KGService.suggest() - Error suggesting concepts: ${e.message}`);
            Object.assign(err, e);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving concept types as search results
     */
    types(query, options) {
        /** @type {?} */
        let url = this.baseUrl + '/types';
        return this._search(url, query, options)
            .catch(e => {
            /** @type {?} */
            let err = new Error(`KGService.types() - Error searching types: ${e.message}`);
            Object.assign(err, e);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving concept sources as search results
     */
    sources(query, options) {
        /** @type {?} */
        let url = this.baseUrl + '/sources';
        return this._search(url, query, options)
            .catch(e => {
            /** @type {?} */
            let err = new Error(`KGService.sources() - Error searching sources: ${e.message}`);
            Object.assign(err, e);
            return Q.reject(err);
        });
    }
    /**
     * internal method used by exposed methods
     * @param {?} url
     * @param {?} query
     * @param {?=} options
     * @return {?}
     */
    _search(url, query, options) {
        return Q.resolve(true)
            .then(() => {
            /** @type {?} */
            let q = query.getQuery();
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: url, params: q, options: options
            });
            return this.execute(opts);
        });
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
        options["timeout"] = this.timeout || Config["timeout"] || 30000;
        return this.createRequestOpts(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(options) {
        return this.client.createRequestOpts(options);
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    execute(opts) {
        return this.client.execute(opts)
            .catch(e => {
            if (e === null || typeof (e) === 'undefined') {
                e = new Error("KGService.execute() - Request failed but didn't return an " +
                    "error. This is most likely because the request timed out");
            }
            return Q.reject(e);
        });
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMva2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO0FBQ3ZCLE9BQU8sTUFBTSxNQUFNLGtCQUFrQixDQUFDO0FBSXRDOzs7OztJQVVJLFlBQVksR0FBWSxFQUFFLFVBQXlCO3VCQUh4QixLQUFLOzJCQUNDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQztRQUd0RSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO0tBQzVCOzs7OztJQUVELE1BQU0sQ0FBQyxPQUFnQjtRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztLQUMvQzs7Ozs7O0lBT0QsT0FBTyxDQUFFLEtBQWUsRUFBRSxPQUFjOztRQUNwQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7YUFDdkMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFOztZQUNQLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNyRixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEIsQ0FBQyxDQUFDO0tBQ047Ozs7OztJQVFELEtBQUssQ0FBRSxLQUFlLEVBQUUs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TjtDQUVKOzs7Ozs7Ozs7Ozs7O0FBRUQsZUFBZSxTQUFTLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uL3NoYXJlZC9jb25maWcnO1xuaW1wb3J0IEtHUXVlcnkgZnJvbSAnLi4vc2hhcmVkL2tnLXF1ZXJ5JztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuXG5jbGFzcyBLR1NlcnZpY2Uge1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHByaXZhdGUgYXBpQmFzZSA6IHN0cmluZztcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBiYXNlVXJsIDogc3RyaW5nO1xuICAgIHByaXZhdGUgY2xpZW50IDogR1BIdHRwQ2xpZW50O1xuICAgIHByaXZhdGUgdGltZW91dCA6IG51bWJlciA9IDMwMDAwO1xuICAgIHByaXZhdGUgaHR0cE1ldGhvZHMgOiBzdHJpbmdbXSA9IFtcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIiwgXCJQQVRDSFwiXTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLnNldFVybCh1cmwpO1xuICAgICAgICB0aGlzLmNsaWVudCA9IGh0dHBDbGllbnQ7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmwgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hcGlCYXNlID0gYmFzZVVybDtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybCArICcvYXBpL3JlY29tbWVuZGVyJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcXVlcnkgLSBvcHRpb25hbCBxdWVyeSBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgd2l0aCByZXF1ZXN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBjb25maWcgdG8gc2VuZCB3aXRoIGh0dHAgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgcmVjb21tZW5kZWQgY29uY2VwdHMgYXMgc2VhcmNoIHJlc3VsdHNcbiAgICAgKi9cbiAgICBzdWdnZXN0IChxdWVyeSA6IEtHUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvc3VnZ2VzdCc7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWFyY2godXJsLCBxdWVyeSwgb3B0aW9ucylcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgS0dTZXJ2aWNlLnN1Z2dlc3QoKSAtIEVycm9yIHN1Z2dlc3RpbmcgY29uY2VwdHM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHF1ZXJ5IC0gb3B0aW9uYWwgcXVlcnkgcGFyYW1ldGVycyB0byBpbmNsdWRlIHdpdGggcmVxdWVzdFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgY29uZmlnIHRvIHNlbmQgd2l0aCBodHRwIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGNvbmNlcHQgdHlwZXMgYXMgc2VhcmNoIHJlc3VsdHNcbiAgICAgKi9cbiAgICB0eXBlcyAocXVlcnkgOiBLR1F1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL3R5cGVzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaCh1cmwsIHF1ZXJ5LCBvcHRpb25zKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBLR1NlcnZpY2UudHlwZXMoKSAtIEVycm9yIHNlYXJjaGluZyB0eXBlczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBxdWVyeSAtIG9wdGlvbmFsIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB3aXRoIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIGNvbmZpZyB0byBzZW5kIHdpdGggaHR0cCByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBjb25jZXB0IHNvdXJjZXMgYXMgc2VhcmNoIHJlc3VsdHNcbiAgICAgKi9cbiAgICBzb3VyY2VzIChxdWVyeSA6IEtHUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvc291cmNlcyc7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWFyY2godXJsLCBxdWVyeSwgb3B0aW9ucylcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgS0dTZXJ2aWNlLnNvdXJjZXMoKSAtIEVycm9yIHNlYXJjaGluZyBzb3VyY2VzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG5cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAgIC8qKlxuICAgICAqIGludGVybmFsIG1ldGhvZCB1c2VkIGJ5IGV4cG9zZWQgbWV0aG9kc1xuICAgICAqL1xuICAgIF9zZWFyY2ggKHVybCA6IHN0cmluZywgcXVlcnkgOiBLR1F1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHRydWUgKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHEgOiB7IFtrZXk6c3RyaW5nXTphbnkgfSA9IHF1ZXJ5LmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnVybCwgcGFyYW1zOnEsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1ldGhvZCAtIG9uZSBvZiBcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIiwgXCJQQVRDSFwiXG4gICAgICogQHBhcmFtIHVybCAtIGRlc3RpbmF0aW9uIG9mIHhociByZXF1ZXN0XG4gICAgICogQHBhcmFtIHBhcmFtcyAtIG9iamVjdCB0byBiZSBzZW50IHdpdGggcmVxdWVzdCBhcyBxdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIGRhdGEgLSBvYmplY3QgdG8gYmUgc2VudCB3aXRoIHJlcXVlc3QgYXMgYm9keVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgb2JqZWN0IGRlZmluaW5nIHJlcXVlc3Qgb3B0aW9uc1xuICAgICAqIEByZXR1cm4gcmVxdWVzdCBvcHRpb25zIGZvciB4aHJcbiAgICAgKi9cbiAgICBidWlsZFJlcXVlc3QgKG9wdGlvbnMgOiB7W2tleTpzdHJpbmddOmFueX0pIDoge1trZXk6c3RyaW5nXTphbnl9IHtcblxuICAgICAgICBpZih0aGlzLmh0dHBNZXRob2RzLmluZGV4T2Yob3B0aW9ucy5tZXRob2QpPDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIEhUVFAgbWV0aG9kICR7b3B0aW9ucy5tZXRob2R9YCk7XG5cbiAgICAgICAgaWYoIW9wdGlvbnMudXJsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdXN0IHNwZWNpZnkgYSBVUkwgZm9yIEhUVFAgcmVxdWVzdHNgKTtcblxuICAgICAgICBvcHRpb25zLnRpbWVvdXQgPSB0aGlzLnRpbWVvdXQgfHwgQ29uZmlnLnRpbWVvdXQgfHwgMzAwMDA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHtba2V5OnN0cmluZ106YW55fSkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShvcHRzIDoge1trZXk6c3RyaW5nXTphbnl9KSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LmV4ZWN1dGUob3B0cylcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgaWYoZSA9PT0gbnVsbCB8fCB0eXBlb2YoZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgZSA9IG5ldyBFcnJvcihcIktHU2VydmljZS5leGVjdXRlKCkgLSBSZXF1ZXN0IGZhaWxlZCBidXQgZGlkbid0IHJldHVybiBhbiBcIiArXG4gICAgICAgICAgICAgICAgXCJlcnJvci4gVGhpcyBpcyBtb3N0IGxpa2VseSBiZWNhdXNlIHRoZSByZXF1ZXN0IHRpbWVkIG91dFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEtHU2VydmljZTtcbiJdfQ==