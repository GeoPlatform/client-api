/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
            throw err;
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
            throw err;
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
            throw err;
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
        return Promise.resolve(true)
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
            throw e;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMva2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sTUFBTSxNQUFNLGtCQUFrQixDQUFDO0FBSXRDOzs7OztJQVVJLFlBQVksR0FBWSxFQUFFLFVBQXlCO3VCQUh4QixLQUFLOzJCQUNDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQztRQUd0RSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO0tBQzVCOzs7OztJQUVELE1BQU0sQ0FBQyxPQUFnQjtRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztLQUMvQzs7Ozs7O0lBT0QsT0FBTyxDQUFFLEtBQWUsRUFBRSxPQUFjOztRQUNwQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7YUFDdkMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFOztZQUNQLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNyRixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLEdBQUcsQ0FBQztTQUNiLENBQUMsQ0FBQztLQUNOOzs7Ozs7SUFRRCxLQUFLLENBQUUsS0FBZSxFQUFFLE9BQWM7O1FBQ2xDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQzthQUN2QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1lBQ1AsSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQy9FLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sR0FBRyxDQUFDO1NBQ2IsQ0FBQyxDQUFDO0tBQ047Ozs7OztJQVNELE9BQU8sQ0FBRSxLQUFlLEVBQUUsT0FBYzs7UUFDcEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDcEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO2FBQ3ZDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTs7WUFDUCxJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbkYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxHQUFHLENBQUM7U0FDYixDQUFDLENBQUM7S0FDTjs7Ozs7Ozs7SUFZRCxPQUFPLENBQUUsR0FBWSxFQUFFLEtBQWUsRUFBRSxPQUFjO1FBQ2xELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBRSxJQUFJLENBQUU7YUFDN0IsSUFBSSxDQUFFLEdBQUcsRUFBRTs7WUFDUixJQUFJLENBQUMsR0FBMEIsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDOztZQUNoRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN6QixNQUFNLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUMsT0FBTzthQUNuRCxDQUFDLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0IsQ0FBQyxDQUFDO0tBQ047Ozs7O0lBWUQsWUFBWSxDQUFFLE9BQTRCO1FBRXRDLElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxXQUFRLEdBQUMsQ0FBQztZQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixPQUFPLFVBQU8sRUFBRSxDQUFDLENBQUM7UUFFakUsSUFBRyxDQUFDLE9BQU8sT0FBSTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUU1RCxPQUFPLGNBQVcsSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNLFdBQVEsSUFBSSxLQUFLLENBQUM7UUFFMUQsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDMUM7Ozs7O0lBRUQsaUJBQWlCLENBQUMsT0FBNEI7UUFDMUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2pEOzs7OztJQUVELE9BQU8sQ0FBQyxJQUF5QjtRQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUMvQixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDUCxJQUFHLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDeEMsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLDREQUE0RDtvQkFDMUUsMERBQTBELENBQUMsQ0FBQzthQUMvRDtZQUNELE1BQU0sQ0FBQyxDQUFDO1NBQ1gsQ0FBQyxDQUFDO0tBQ047Q0FFSjs7Ozs7Ozs7Ozs7OztBQUVELGVBQWUsU0FBUyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uL3NoYXJlZC9jb25maWcnO1xuaW1wb3J0IEtHUXVlcnkgZnJvbSAnLi4vc2hhcmVkL2tnLXF1ZXJ5JztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuXG5jbGFzcyBLR1NlcnZpY2Uge1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHByaXZhdGUgYXBpQmFzZSA6IHN0cmluZztcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBiYXNlVXJsIDogc3RyaW5nO1xuICAgIHByaXZhdGUgY2xpZW50IDogR1BIdHRwQ2xpZW50O1xuICAgIHByaXZhdGUgdGltZW91dCA6IG51bWJlciA9IDMwMDAwO1xuICAgIHByaXZhdGUgaHR0cE1ldGhvZHMgOiBzdHJpbmdbXSA9IFtcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIiwgXCJQQVRDSFwiXTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLnNldFVybCh1cmwpO1xuICAgICAgICB0aGlzLmNsaWVudCA9IGh0dHBDbGllbnQ7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmwgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hcGlCYXNlID0gYmFzZVVybDtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybCArICcvYXBpL3JlY29tbWVuZGVyJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcXVlcnkgLSBvcHRpb25hbCBxdWVyeSBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgd2l0aCByZXF1ZXN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBjb25maWcgdG8gc2VuZCB3aXRoIGh0dHAgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgcmVjb21tZW5kZWQgY29uY2VwdHMgYXMgc2VhcmNoIHJlc3VsdHNcbiAgICAgKi9cbiAgICBzdWdnZXN0IChxdWVyeSA6IEtHUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL3N1Z2dlc3QnO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VhcmNoKHVybCwgcXVlcnksIG9wdGlvbnMpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEtHU2VydmljZS5zdWdnZXN0KCkgLSBFcnJvciBzdWdnZXN0aW5nIGNvbmNlcHRzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcXVlcnkgLSBvcHRpb25hbCBxdWVyeSBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgd2l0aCByZXF1ZXN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBjb25maWcgdG8gc2VuZCB3aXRoIGh0dHAgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgY29uY2VwdCB0eXBlcyBhcyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHR5cGVzIChxdWVyeSA6IEtHUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL3R5cGVzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaCh1cmwsIHF1ZXJ5LCBvcHRpb25zKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBLR1NlcnZpY2UudHlwZXMoKSAtIEVycm9yIHNlYXJjaGluZyB0eXBlczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcXVlcnkgLSBvcHRpb25hbCBxdWVyeSBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgd2l0aCByZXF1ZXN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBjb25maWcgdG8gc2VuZCB3aXRoIGh0dHAgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgY29uY2VwdCBzb3VyY2VzIGFzIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgc291cmNlcyAocXVlcnkgOiBLR1F1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9zb3VyY2VzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaCh1cmwsIHF1ZXJ5LCBvcHRpb25zKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBLR1NlcnZpY2Uuc291cmNlcygpIC0gRXJyb3Igc2VhcmNoaW5nIHNvdXJjZXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG5cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAgIC8qKlxuICAgICAqIGludGVybmFsIG1ldGhvZCB1c2VkIGJ5IGV4cG9zZWQgbWV0aG9kc1xuICAgICAqL1xuICAgIF9zZWFyY2ggKHVybCA6IHN0cmluZywgcXVlcnkgOiBLR1F1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB0cnVlIClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIGxldCBxIDogeyBba2V5OnN0cmluZ106YW55IH0gPSBxdWVyeS5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIHBhcmFtczpxLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtZXRob2QgLSBvbmUgb2YgXCJHRVRcIiwgXCJQT1NUXCIsIFwiUFVUXCIsIFwiREVMRVRFXCIsIFwiUEFUQ0hcIlxuICAgICAqIEBwYXJhbSB1cmwgLSBkZXN0aW5hdGlvbiBvZiB4aHIgcmVxdWVzdFxuICAgICAqIEBwYXJhbSBwYXJhbXMgLSBvYmplY3QgdG8gYmUgc2VudCB3aXRoIHJlcXVlc3QgYXMgcXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBkYXRhIC0gb2JqZWN0IHRvIGJlIHNlbnQgd2l0aCByZXF1ZXN0IGFzIGJvZHlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIG9iamVjdCBkZWZpbmluZyByZXF1ZXN0IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHJlcXVlc3Qgb3B0aW9ucyBmb3IgeGhyXG4gICAgICovXG4gICAgYnVpbGRSZXF1ZXN0IChvcHRpb25zIDoge1trZXk6c3RyaW5nXTphbnl9KSA6IHtba2V5OnN0cmluZ106YW55fSB7XG5cbiAgICAgICAgaWYodGhpcy5odHRwTWV0aG9kcy5pbmRleE9mKG9wdGlvbnMubWV0aG9kKTwwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBIVFRQIG1ldGhvZCAke29wdGlvbnMubWV0aG9kfWApO1xuXG4gICAgICAgIGlmKCFvcHRpb25zLnVybClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTXVzdCBzcGVjaWZ5IGEgVVJMIGZvciBIVFRQIHJlcXVlc3RzYCk7XG5cbiAgICAgICAgb3B0aW9ucy50aW1lb3V0ID0gdGhpcy50aW1lb3V0IHx8IENvbmZpZy50aW1lb3V0IHx8IDMwMDAwO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMgOiB7W2tleTpzdHJpbmddOmFueX0pIDoge1trZXk6c3RyaW5nXTphbnl9IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LmNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGV4ZWN1dGUob3B0cyA6IHtba2V5OnN0cmluZ106YW55fSkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuZXhlY3V0ZShvcHRzKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBpZihlID09PSBudWxsIHx8IHR5cGVvZihlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBlID0gbmV3IEVycm9yKFwiS0dTZXJ2aWNlLmV4ZWN1dGUoKSAtIFJlcXVlc3QgZmFpbGVkIGJ1dCBkaWRuJ3QgcmV0dXJuIGFuIFwiICtcbiAgICAgICAgICAgICAgICBcImVycm9yLiBUaGlzIGlzIG1vc3QgbGlrZWx5IGJlY2F1c2UgdGhlIHJlcXVlc3QgdGltZWQgb3V0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEtHU2VydmljZTtcbiJdfQ==