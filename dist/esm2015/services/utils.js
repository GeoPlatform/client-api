/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import Config from '../shared/config';
class UtilsService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        this.timeout = 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        this.client = httpClient;
        this.baseUrl = url;
        this.timeout = Config["timeout"] || 30000;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        this.baseUrl = baseUrl;
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
     * @param {?} property - optional capa property to specifically request
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving capabilities object
     */
    capabilities(property, query, options) {
        /** @type {?} */
        let url = this.baseUrl + '/api/capabilities';
        if (property)
            url += '/' + property;
        return Promise.resolve(url)
            .then((url) => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: url, params: query || {}, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error getting capabilities: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.capabilities() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} file
     * @param {?} format
     * @param {?=} options
     * @return {?} Promise
     */
    parseFile(file, format, options) {
        /** @type {?} */
        var url = this.baseUrl + '/api/utils/parse';
        return Promise.resolve(url)
            .then(url => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "POST", url: url,
                data: { format: format },
                file: file,
                formData: true,
                //NodeJS (RequestJS)
                options: options
            });
            return this.execute(opts);
        })
            .then(response => response)
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error parsing file: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.parseFile() - ' + err.message);
            throw err;
        });
    }
    /**
     * Geolocate the specified argument to a set of candidate locations.
     * @param {?} value - text string to geolocate (name or lat,lng)
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving an array of geocoded results
     */
    locate(value, options) {
        /** @type {?} */
        var url = this.baseUrl + '/api/utils/gazetteer';
        return Promise.resolve(url)
            .then(url => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'GET',
                url: url,
                params: { location: value },
                options: options
            });
            return this.execute(opts);
        })
            .then(response => response)
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error resolving location: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.locate() - ' + err.message);
            throw err;
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
            .catch((e) => {
            if (e === null || typeof (e) === 'undefined') {
                e = new Error("UtilsService.execute() - Request failed but didn't return an " +
                    "error. This is most likely because the request timed out");
            }
            return Promise.reject(e);
        });
    }
}
if (false) {
    /** @type {?} */
    UtilsService.prototype.baseUrl;
    /** @type {?} */
    UtilsService.prototype.client;
    /** @type {?} */
    UtilsService.prototype.timeout;
    /** @type {?} */
    UtilsService.prototype.logger;
    /** @type {?} */
    UtilsService.prototype.httpMethods;
}
export default UtilsService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sTUFBTSxNQUFNLGtCQUFrQixDQUFDO0FBR3RDOzs7OztJQVNJLFlBQVksR0FBWSxFQUFFLFVBQXlCO3VCQUx4QixLQUFLOzJCQUVDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQztRQUl0RSxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sZUFBWSxLQUFLLENBQUM7S0FDMUM7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQWdCO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0tBQzFCOzs7OztJQUtELFNBQVMsQ0FBQyxNQUFZO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3hCOzs7OztJQUtELFFBQVEsQ0FBQyxDQUFnQjtRQUNyQixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEI7S0FDSjs7Ozs7SUFLRCxRQUFRLENBQUMsR0FBWTtRQUNqQixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7S0FDSjs7Ozs7OztJQVNELFlBQVksQ0FBRSxRQUFzQixFQUFFLEtBQVcsRUFBRSxPQUFjOztRQUU3RCxJQUFJLEdBQUcsR0FBRyxJQUFJLENB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QUMvRDtZQUNELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QixDQUFDLENBQUM7S0FDTjtDQUVKOzs7Ozs7Ozs7Ozs7O0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vc2hhcmVkL2NvbmZpZyc7XG5pbXBvcnQgR1BIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvY2xpZW50JztcblxuY2xhc3MgVXRpbHNTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgYmFzZVVybCA6IHN0cmluZztcbiAgICBwcml2YXRlIGNsaWVudCA6IEdQSHR0cENsaWVudDtcbiAgICBwcml2YXRlIHRpbWVvdXQgOiBudW1iZXIgPSAzMDAwMDtcbiAgICBwcml2YXRlIGxvZ2dlciA6IGFueTtcbiAgICBwcml2YXRlIGh0dHBNZXRob2RzIDogc3RyaW5nW10gPSBbXCJHRVRcIiwgXCJQT1NUXCIsIFwiUFVUXCIsIFwiREVMRVRFXCIsIFwiUEFUQ0hcIl07XG5cblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLmNsaWVudCA9IGh0dHBDbGllbnQ7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IHVybDtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gQ29uZmlnLnRpbWVvdXQgfHwgMzAwMDA7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmwgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbG9nZ2VyIC0gbG9nIHNlcnZpY2VcbiAgICAgKi9cbiAgICBzZXRMb2dnZXIobG9nZ2VyIDogYW55KSB7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBlIC0gZXJyb3IgdG8gbG9nIChpZiBsb2dnZXIgc3BlY2lmaWVkKVxuICAgICAqL1xuICAgIGxvZ0Vycm9yKGUgOiBzdHJpbmd8RXJyb3IpIHtcbiAgICAgICAgaWYodGhpcy5sb2dnZXIgJiYgdGhpcy5sb2dnZXIuZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1zZyAtIG1lc3NhZ2UgdG8gbG9nIGFzIGRlYnVnXG4gICAgICovXG4gICAgbG9nRGVidWcobXNnIDogc3RyaW5nKSB7XG4gICAgICAgIGlmKHRoaXMubG9nZ2VyICYmIHRoaXMubG9nZ2VyLmRlYnVnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1Zyhtc2cpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgLSBvcHRpb25hbCBjYXBhIHByb3BlcnR5IHRvIHNwZWNpZmljYWxseSByZXF1ZXN0XG4gICAgICogQHBhcmFtIHF1ZXJ5IC0gb3B0aW9uYWwgcXVlcnkgcGFyYW1ldGVycyB0byBpbmNsdWRlIHdpdGggcmVxdWVzdFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgY29uZmlnIHRvIHNlbmQgd2l0aCBodHRwIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGNhcGFiaWxpdGllcyBvYmplY3RcbiAgICAgKi9cbiAgICBjYXBhYmlsaXRpZXMgKHByb3BlcnR5IDogc3RyaW5nfG51bGwsIHF1ZXJ5IDogYW55LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2FwaS9jYXBhYmlsaXRpZXMnO1xuICAgICAgICBpZihwcm9wZXJ0eSlcbiAgICAgICAgICAgIHVybCArPSAnLycgKyBwcm9wZXJ0eTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB1cmwgKVxuICAgICAgICAudGhlbiggKHVybCkgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIHBhcmFtczpxdWVyeXx8e30sIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBnZXR0aW5nIGNhcGFiaWxpdGllczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdVdGlsc1NlcnZpY2UuY2FwYWJpbGl0aWVzKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZmlsZVxuICAgICAqIEBwYXJhbSBmb3JtYXRcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqL1xuICAgIHBhcnNlRmlsZSAoZmlsZSA6IGFueSwgZm9ybWF0IDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2FwaS91dGlscy9wYXJzZSc7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggdXJsIClcbiAgICAgICAgLnRoZW4oIHVybCA9PiB7XG5cbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIiwgIHVybDp1cmwsXG4gICAgICAgICAgICAgICAgZGF0YTogeyBmb3JtYXQ6IGZvcm1hdCB9LFxuICAgICAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICAgICAgZm9ybURhdGE6IHRydWUsICAgLy9Ob2RlSlMgKFJlcXVlc3RKUylcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiByZXNwb25zZSApXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHBhcnNpbmcgZmlsZTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdVdGlsc1NlcnZpY2UucGFyc2VGaWxlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdlb2xvY2F0ZSB0aGUgc3BlY2lmaWVkIGFyZ3VtZW50IHRvIGEgc2V0IG9mIGNhbmRpZGF0ZSBsb2NhdGlvbnMuXG4gICAgICogQHBhcmFtIHZhbHVlIC0gdGV4dCBzdHJpbmcgdG8gZ2VvbG9jYXRlIChuYW1lIG9yIGxhdCxsbmcpXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBjb25maWcgdG8gc2VuZCB3aXRoIGh0dHAgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgYW4gYXJyYXkgb2YgZ2VvY29kZWQgcmVzdWx0c1xuICAgICAqL1xuICAgIGxvY2F0ZSh2YWx1ZSA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICB2YXIgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9hcGkvdXRpbHMvZ2F6ZXR0ZWVyJztcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1cmwpXG4gICAgICAgIC50aGVuKCB1cmwgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHsgbG9jYXRpb246IHZhbHVlIH0sXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgcmVzb2x2aW5nIGxvY2F0aW9uOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1V0aWxzU2VydmljZS5sb2NhdGUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuXG5cbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1ldGhvZCAtIG9uZSBvZiBcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIiwgXCJQQVRDSFwiXG4gICAgICogQHBhcmFtIHVybCAtIGRlc3RpbmF0aW9uIG9mIHhociByZXF1ZXN0XG4gICAgICogQHBhcmFtIHBhcmFtcyAtIG9iamVjdCB0byBiZSBzZW50IHdpdGggcmVxdWVzdCBhcyBxdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIGRhdGEgLSBvYmplY3QgdG8gYmUgc2VudCB3aXRoIHJlcXVlc3QgYXMgYm9keVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgb2JqZWN0IGRlZmluaW5nIHJlcXVlc3Qgb3B0aW9uc1xuICAgICAqIEByZXR1cm4gcmVxdWVzdCBvcHRpb25zIGZvciB4aHJcbiAgICAgKi9cbiAgICBidWlsZFJlcXVlc3QgKG9wdGlvbnMgOiB7W2tleTpzdHJpbmddOmFueX0pIDoge1trZXk6c3RyaW5nXTphbnl9IHtcblxuICAgICAgICBpZih0aGlzLmh0dHBNZXRob2RzLmluZGV4T2Yob3B0aW9ucy5tZXRob2QpPDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIEhUVFAgbWV0aG9kICR7b3B0aW9ucy5tZXRob2R9YCk7XG5cbiAgICAgICAgaWYoIW9wdGlvbnMudXJsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdXN0IHNwZWNpZnkgYSBVUkwgZm9yIEhUVFAgcmVxdWVzdHNgKTtcblxuICAgICAgICBvcHRpb25zLnRpbWVvdXQgPSB0aGlzLnRpbWVvdXQgfHwgQ29uZmlnLnRpbWVvdXQgfHwgMzAwMDA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHtba2V5OnN0cmluZ106YW55fSkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShvcHRzIDoge1trZXk6c3RyaW5nXTphbnl9KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5leGVjdXRlKG9wdHMpXG4gICAgICAgIC5jYXRjaCgoIGUgOiBFcnJvciApID0+IHtcbiAgICAgICAgICAgIGlmKGUgPT09IG51bGwgfHwgdHlwZW9mKGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGUgPSBuZXcgRXJyb3IoXCJVdGlsc1NlcnZpY2UuZXhlY3V0ZSgpIC0gUmVxdWVzdCBmYWlsZWQgYnV0IGRpZG4ndCByZXR1cm4gYW4gXCIgK1xuICAgICAgICAgICAgICAgIFwiZXJyb3IuIFRoaXMgaXMgbW9zdCBsaWtlbHkgYmVjYXVzZSB0aGUgcmVxdWVzdCB0aW1lZCBvdXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBVdGlsc1NlcnZpY2U7XG4iXX0=