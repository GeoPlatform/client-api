/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from 'q';
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
        return Q.resolve(url)
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
            return Q.reject(err);
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
        return Q.resolve(url)
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
            return Q.reject(err);
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
        return Q.resolve(url)
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
            return Q.reject(err);
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
            return Q.reject(e);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO0FBQ3ZCLE9BQU8sTUFBTSxNQUFNLGtCQUFrQixDQUFDO0FBR3RDOzs7OztJQVNJLFlBQVksR0FBWSxFQUFFLFVBQXlCO3VCQUx4QixLQUFLOzJCQUVDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQztRQUl0RSxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sZUFBWSxLQUFLLENBQUM7S0FDMUM7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQWdCO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0tBQzFCOzs7OztJQUtELFNBQVMsQ0FBQyxNQUFZO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3hCOzs7OztJQUtELFFBQVEsQ0FBQyxDQUFnQjtRQUNyQixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEI7S0FDSjs7Ozs7SUFLRCxRQUFRLENBQUMsR0FBWTtRQUNqQixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7S0FDSjs7Ozs7OztJQVNELFlBQVksQ0FBRSxRQUFzQixFQUFFLEtBQVcsRUFB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S0FBSyxJQUFJLElBQUksT0FBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDeEMsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLCtEQUErRDtvQkFDN0UsMERBQTBELENBQUMsQ0FBQzthQUMvRDtZQUNELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QixDQUFDLENBQUM7S0FDTjtDQUVKOzs7Ozs7Ozs7Ozs7O0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uL3NoYXJlZC9jb25maWcnO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5cbmNsYXNzIFV0aWxzU2VydmljZSB7XG5cbiAgICBwcml2YXRlIGJhc2VVcmwgOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBjbGllbnQgOiBHUEh0dHBDbGllbnQ7XG4gICAgcHJpdmF0ZSB0aW1lb3V0IDogbnVtYmVyID0gMzAwMDA7XG4gICAgcHJpdmF0ZSBsb2dnZXIgOiBhbnk7XG4gICAgcHJpdmF0ZSBodHRwTWV0aG9kcyA6IHN0cmluZ1tdID0gW1wiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJdO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQpIHtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBodHRwQ2xpZW50O1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSB1cmw7XG4gICAgICAgIHRoaXMudGltZW91dCA9IENvbmZpZy50aW1lb3V0IHx8IDMwMDAwO1xuICAgIH1cblxuICAgIHNldFVybChiYXNlVXJsIDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGxvZ2dlciAtIGxvZyBzZXJ2aWNlXG4gICAgICovXG4gICAgc2V0TG9nZ2VyKGxvZ2dlciA6IGFueSkge1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZSAtIGVycm9yIHRvIGxvZyAoaWYgbG9nZ2VyIHNwZWNpZmllZClcbiAgICAgKi9cbiAgICBsb2dFcnJvcihlIDogc3RyaW5nfEVycm9yKSB7XG4gICAgICAgIGlmKHRoaXMubG9nZ2VyICYmIHRoaXMubG9nZ2VyLmVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtc2cgLSBtZXNzYWdlIHRvIGxvZyBhcyBkZWJ1Z1xuICAgICAqL1xuICAgIGxvZ0RlYnVnKG1zZyA6IHN0cmluZykge1xuICAgICAgICBpZih0aGlzLmxvZ2dlciAmJiB0aGlzLmxvZ2dlci5kZWJ1Zykge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcobXNnKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHByb3BlcnR5IC0gb3B0aW9uYWwgY2FwYSBwcm9wZXJ0eSB0byBzcGVjaWZpY2FsbHkgcmVxdWVzdFxuICAgICAqIEBwYXJhbSBxdWVyeSAtIG9wdGlvbmFsIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB3aXRoIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIGNvbmZpZyB0byBzZW5kIHdpdGggaHR0cCByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBjYXBhYmlsaXRpZXMgb2JqZWN0XG4gICAgICovXG4gICAgY2FwYWJpbGl0aWVzIChwcm9wZXJ0eSA6IHN0cmluZ3xudWxsLCBxdWVyeSA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2FwaS9jYXBhYmlsaXRpZXMnO1xuICAgICAgICBpZihwcm9wZXJ0eSlcbiAgICAgICAgICAgIHVybCArPSAnLycgKyBwcm9wZXJ0eTtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCB1cmwgKVxuICAgICAgICAudGhlbiggKHVybCkgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIHBhcmFtczpxdWVyeXx8e30sIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBnZXR0aW5nIGNhcGFiaWxpdGllczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdVdGlsc1NlcnZpY2UuY2FwYWJpbGl0aWVzKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmaWxlXG4gICAgICogQHBhcmFtIGZvcm1hdFxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICovXG4gICAgcGFyc2VGaWxlIChmaWxlIDogYW55LCBmb3JtYXQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICB2YXIgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9hcGkvdXRpbHMvcGFyc2UnO1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHVybCApXG4gICAgICAgIC50aGVuKCB1cmwgPT4ge1xuXG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsICB1cmw6dXJsLFxuICAgICAgICAgICAgICAgIGRhdGE6IHsgZm9ybWF0OiBmb3JtYXQgfSxcbiAgICAgICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgICAgIGZvcm1EYXRhOiB0cnVlLCAgIC8vTm9kZUpTIChSZXF1ZXN0SlMpXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4gcmVzcG9uc2UgKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBwYXJzaW5nIGZpbGU6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignVXRpbHNTZXJ2aWNlLnBhcnNlRmlsZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdlb2xvY2F0ZSB0aGUgc3BlY2lmaWVkIGFyZ3VtZW50IHRvIGEgc2V0IG9mIGNhbmRpZGF0ZSBsb2NhdGlvbnMuXG4gICAgICogQHBhcmFtIHZhbHVlIC0gdGV4dCBzdHJpbmcgdG8gZ2VvbG9jYXRlIChuYW1lIG9yIGxhdCxsbmcpXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBjb25maWcgdG8gc2VuZCB3aXRoIGh0dHAgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgYW4gYXJyYXkgb2YgZ2VvY29kZWQgcmVzdWx0c1xuICAgICAqL1xuICAgIGxvY2F0ZSh2YWx1ZSA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2FwaS91dGlscy9nYXpldHRlZXInO1xuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKHVybClcbiAgICAgICAgLnRoZW4oIHVybCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIHBhcmFtczogeyBsb2NhdGlvbjogdmFsdWUgfSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciByZXNvbHZpbmcgbG9jYXRpb246ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignVXRpbHNTZXJ2aWNlLmxvY2F0ZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG5cblxuXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtZXRob2QgLSBvbmUgb2YgXCJHRVRcIiwgXCJQT1NUXCIsIFwiUFVUXCIsIFwiREVMRVRFXCIsIFwiUEFUQ0hcIlxuICAgICAqIEBwYXJhbSB1cmwgLSBkZXN0aW5hdGlvbiBvZiB4aHIgcmVxdWVzdFxuICAgICAqIEBwYXJhbSBwYXJhbXMgLSBvYmplY3QgdG8gYmUgc2VudCB3aXRoIHJlcXVlc3QgYXMgcXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBkYXRhIC0gb2JqZWN0IHRvIGJlIHNlbnQgd2l0aCByZXF1ZXN0IGFzIGJvZHlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIG9iamVjdCBkZWZpbmluZyByZXF1ZXN0IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHJlcXVlc3Qgb3B0aW9ucyBmb3IgeGhyXG4gICAgICovXG4gICAgYnVpbGRSZXF1ZXN0IChvcHRpb25zIDoge1trZXk6c3RyaW5nXTphbnl9KSA6IHtba2V5OnN0cmluZ106YW55fSB7XG5cbiAgICAgICAgaWYodGhpcy5odHRwTWV0aG9kcy5pbmRleE9mKG9wdGlvbnMubWV0aG9kKTwwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBIVFRQIG1ldGhvZCAke29wdGlvbnMubWV0aG9kfWApO1xuXG4gICAgICAgIGlmKCFvcHRpb25zLnVybClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTXVzdCBzcGVjaWZ5IGEgVVJMIGZvciBIVFRQIHJlcXVlc3RzYCk7XG5cbiAgICAgICAgb3B0aW9ucy50aW1lb3V0ID0gdGhpcy50aW1lb3V0IHx8IENvbmZpZy50aW1lb3V0IHx8IDMwMDAwO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMgOiB7W2tleTpzdHJpbmddOmFueX0pIDoge1trZXk6c3RyaW5nXTphbnl9IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LmNyZWF0ZVJlcXVlc3RPcHRzKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGV4ZWN1dGUob3B0cyA6IHtba2V5OnN0cmluZ106YW55fSkgOiBRLlByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5leGVjdXRlKG9wdHMpXG4gICAgICAgIC5jYXRjaCgoIGUgOiBFcnJvciApID0+IHtcbiAgICAgICAgICAgIGlmKGUgPT09IG51bGwgfHwgdHlwZW9mKGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGUgPSBuZXcgRXJyb3IoXCJVdGlsc1NlcnZpY2UuZXhlY3V0ZSgpIC0gUmVxdWVzdCBmYWlsZWQgYnV0IGRpZG4ndCByZXR1cm4gYW4gXCIgK1xuICAgICAgICAgICAgICAgIFwiZXJyb3IuIFRoaXMgaXMgbW9zdCBsaWtlbHkgYmVjYXVzZSB0aGUgcmVxdWVzdCB0aW1lZCBvdXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBVdGlsc1NlcnZpY2U7XG4iXX0=