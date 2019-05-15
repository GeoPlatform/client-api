/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from 'q';
import Config from '../shared/config';
var UtilsService = /** @class */ (function () {
    function UtilsService(url, httpClient) {
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
    UtilsService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        this.baseUrl = baseUrl;
    };
    /**
     * @param logger - log service
     */
    /**
     * @param {?} logger - log service
     * @return {?}
     */
    UtilsService.prototype.setLogger = /**
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
    UtilsService.prototype.logError = /**
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
    UtilsService.prototype.logDebug = /**
     * @param {?} msg - message to log as debug
     * @return {?}
     */
    function (msg) {
        if (this.logger && this.logger.debug) {
            this.logger.debug(msg);
        }
    };
    /**
     * @param property - optional capa property to specifically request
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving capabilities object
     */
    /**
     * @param {?} property - optional capa property to specifically request
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving capabilities object
     */
    UtilsService.prototype.capabilities = /**
     * @param {?} property - optional capa property to specifically request
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving capabilities object
     */
    function (property, query, options) {
        var _this = this;
        /** @type {?} */
        var url = this.baseUrl + '/api/capabilities';
        if (property)
            url += '/' + property;
        return Q.resolve(url)
            .then(function (url) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: url, params: query || {}, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error getting capabilities: " + e.message);
            Object.assign(err, e);
            _this.logError('UtilsService.capabilities() - ' + err.message);
            return Q.reject(err);
        });
    };
    /**
     * @param file
     * @param format
     * @param options
     * @return Promise
     */
    /**
     * @param {?} file
     * @param {?} format
     * @param {?=} options
     * @return {?} Promise
     */
    UtilsService.prototype.parseFile = /**
     * @param {?} file
     * @param {?} format
     * @param {?=} options
     * @return {?} Promise
     */
    function (file, format, options) {
        var _this = this;
        /** @type {?} */
        var url = this.baseUrl + '/api/utils/parse';
        return Q.resolve(url)
            .then(function (url) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "POST", url: url,
                data: { format: format },
                file: file,
                formData: true,
                //NodeJS (RequestJS)
                options: options
            });
            return _this.execute(opts);
        })
            .then(function (response) { return response; })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error parsing file: " + e.message);
            Object.assign(err, e);
            _this.logError('UtilsService.parseFile() - ' + err.message);
            return Q.reject(err);
        });
    };
    /**
     * Geolocate the specified argument to a set of candidate locations.
     * @param value - text string to geolocate (name or lat,lng)
     * @param options - optional config to send with http request
     * @return Promise resolving an array of geocoded results
     */
    /**
     * Geolocate the specified argument to a set of candidate locations.
     * @param {?} value - text string to geolocate (name or lat,lng)
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving an array of geocoded results
     */
    UtilsService.prototype.locate = /**
     * Geolocate the specified argument to a set of candidate locations.
     * @param {?} value - text string to geolocate (name or lat,lng)
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving an array of geocoded results
     */
    function (value, options) {
        var _this = this;
        /** @type {?} */
        var url = this.baseUrl + '/api/utils/gazetteer';
        return Q.resolve(url)
            .then(function (url) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'GET',
                url: url,
                params: { location: value },
                options: options
            });
            return _this.execute(opts);
        })
            .then(function (response) { return response; })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error resolving location: " + e.message);
            Object.assign(err, e);
            _this.logError('UtilsService.locate() - ' + err.message);
            return Q.reject(err);
        });
    };
    /* ----------------------------------------------------------- */
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
    UtilsService.prototype.buildRequest = /**
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
    UtilsService.prototype.createRequestOpts = /**
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
    UtilsService.prototype.execute = /**
     * @param {?} opts
     * @return {?}
     */
    function (opts) {
        return this.client.execute(opts)
            .catch(function (e) {
            if (e === null || typeof (e) === 'undefined') {
                e = new Error("UtilsService.execute() - Request failed but didn't return an " +
                    "error. This is most likely because the request timed out");
            }
            return Q.reject(e);
        });
    };
    return UtilsService;
}());
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO0FBQ3ZCLE9BQU8sTUFBTSxNQUFNLGtCQUFrQixDQUFDO0FBR3RDLElBQUE7SUFTSSxzQkFBWSxHQUFZLEVBQUUsVUFBeUI7dUJBTHhCLEtBQUs7MkJBRUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO1FBSXRFLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxlQUFZLEtBQUssQ0FBQztLQUMxQzs7Ozs7SUFFRCw2QkFBTTs7OztJQUFOLFVBQU8sT0FBZ0I7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDMUI7SUFFRDs7T0FFRzs7Ozs7SUFDSCxnQ0FBUzs7OztJQUFULFVBQVUsTUFBWTtRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN4QjtJQUVEOztPQUVHOzs7OztJQUNILCtCQUFROzs7O0lBQVIsVUFBUyxDQUFnQjtRQUNyQixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEI7S0FDSjtJQUVEOztPQUVHOzs7OztJQUNILCtCQUFROzs7O0lBQVIsVUFBUyxHQUFZO1FBQ2pCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUss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QUE0QjtRQUMxQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDakQ7Ozs7O0lBRUQsOEJBQU87Ozs7SUFBUCxVQUFRLElBQXlCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQy9CLEtBQUssQ0FBQyxVQUFFLENBQVM7WUFDZCxJQUFHLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDeEMsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLCtEQUErRDtvQkFDN0UsMERBQTBELENBQUMsQ0FBQzthQUMvRDtZQUNELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QixDQUFDLENBQUM7S0FDTjt1QkFsTEw7SUFvTEMsQ0FBQTs7Ozs7Ozs7Ozs7OztBQUVELGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBRIGZyb20gJ3EnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuXG5jbGFzcyBVdGlsc1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBiYXNlVXJsIDogc3RyaW5nO1xuICAgIHByaXZhdGUgY2xpZW50IDogR1BIdHRwQ2xpZW50O1xuICAgIHByaXZhdGUgdGltZW91dCA6IG51bWJlciA9IDMwMDAwO1xuICAgIHByaXZhdGUgbG9nZ2VyIDogYW55O1xuICAgIHByaXZhdGUgaHR0cE1ldGhvZHMgOiBzdHJpbmdbXSA9IFtcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIiwgXCJQQVRDSFwiXTtcblxuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gaHR0cENsaWVudDtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gdXJsO1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBDb25maWcudGltZW91dCB8fCAzMDAwMDtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybCA6IHN0cmluZykge1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBsb2dnZXIgLSBsb2cgc2VydmljZVxuICAgICAqL1xuICAgIHNldExvZ2dlcihsb2dnZXIgOiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGUgLSBlcnJvciB0byBsb2cgKGlmIGxvZ2dlciBzcGVjaWZpZWQpXG4gICAgICovXG4gICAgbG9nRXJyb3IoZSA6IHN0cmluZ3xFcnJvcikge1xuICAgICAgICBpZih0aGlzLmxvZ2dlciAmJiB0aGlzLmxvZ2dlci5lcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbXNnIC0gbWVzc2FnZSB0byBsb2cgYXMgZGVidWdcbiAgICAgKi9cbiAgICBsb2dEZWJ1Zyhtc2cgOiBzdHJpbmcpIHtcbiAgICAgICAgaWYodGhpcy5sb2dnZXIgJiYgdGhpcy5sb2dnZXIuZGVidWcpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eSAtIG9wdGlvbmFsIGNhcGEgcHJvcGVydHkgdG8gc3BlY2lmaWNhbGx5IHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gcXVlcnkgLSBvcHRpb25hbCBxdWVyeSBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgd2l0aCByZXF1ZXN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBjb25maWcgdG8gc2VuZCB3aXRoIGh0dHAgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgY2FwYWJpbGl0aWVzIG9iamVjdFxuICAgICAqL1xuICAgIGNhcGFiaWxpdGllcyAocHJvcGVydHkgOiBzdHJpbmd8bnVsbCwgcXVlcnkgOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9hcGkvY2FwYWJpbGl0aWVzJztcbiAgICAgICAgaWYocHJvcGVydHkpXG4gICAgICAgICAgICB1cmwgKz0gJy8nICsgcHJvcGVydHk7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggdXJsIClcbiAgICAgICAgLnRoZW4oICh1cmwpID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBwYXJhbXM6cXVlcnl8fHt9LCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZ2V0dGluZyBjYXBhYmlsaXRpZXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignVXRpbHNTZXJ2aWNlLmNhcGFiaWxpdGllcygpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZmlsZVxuICAgICAqIEBwYXJhbSBmb3JtYXRcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqL1xuICAgIHBhcnNlRmlsZSAoZmlsZSA6IGFueSwgZm9ybWF0IDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgdmFyIHVybCA9IHRoaXMuYmFzZVVybCArICcvYXBpL3V0aWxzL3BhcnNlJztcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCB1cmwgKVxuICAgICAgICAudGhlbiggdXJsID0+IHtcblxuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiUE9TVFwiLCAgdXJsOnVybCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7IGZvcm1hdDogZm9ybWF0IH0sXG4gICAgICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgICAgICBmb3JtRGF0YTogdHJ1ZSwgICAvL05vZGVKUyAoUmVxdWVzdEpTKVxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oIHJlc3BvbnNlID0+IHJlc3BvbnNlIClcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgcGFyc2luZyBmaWxlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1V0aWxzU2VydmljZS5wYXJzZUZpbGUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZW9sb2NhdGUgdGhlIHNwZWNpZmllZCBhcmd1bWVudCB0byBhIHNldCBvZiBjYW5kaWRhdGUgbG9jYXRpb25zLlxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIHRleHQgc3RyaW5nIHRvIGdlb2xvY2F0ZSAobmFtZSBvciBsYXQsbG5nKVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgY29uZmlnIHRvIHNlbmQgd2l0aCBodHRwIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGFuIGFycmF5IG9mIGdlb2NvZGVkIHJlc3VsdHNcbiAgICAgKi9cbiAgICBsb2NhdGUodmFsdWUgOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICB2YXIgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9hcGkvdXRpbHMvZ2F6ZXR0ZWVyJztcbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSh1cmwpXG4gICAgICAgIC50aGVuKCB1cmwgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHsgbG9jYXRpb246IHZhbHVlIH0sXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgcmVzb2x2aW5nIGxvY2F0aW9uOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1V0aWxzU2VydmljZS5sb2NhdGUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuXG5cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWV0aG9kIC0gb25lIG9mIFwiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJcbiAgICAgKiBAcGFyYW0gdXJsIC0gZGVzdGluYXRpb24gb2YgeGhyIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gcGFyYW1zIC0gb2JqZWN0IHRvIGJlIHNlbnQgd2l0aCByZXF1ZXN0IGFzIHF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gZGF0YSAtIG9iamVjdCB0byBiZSBzZW50IHdpdGggcmVxdWVzdCBhcyBib2R5XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBvYmplY3QgZGVmaW5pbmcgcmVxdWVzdCBvcHRpb25zXG4gICAgICogQHJldHVybiByZXF1ZXN0IG9wdGlvbnMgZm9yIHhoclxuICAgICAqL1xuICAgIGJ1aWxkUmVxdWVzdCAob3B0aW9ucyA6IHtba2V5OnN0cmluZ106YW55fSkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuXG4gICAgICAgIGlmKHRoaXMuaHR0cE1ldGhvZHMuaW5kZXhPZihvcHRpb25zLm1ldGhvZCk8MClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgSFRUUCBtZXRob2QgJHtvcHRpb25zLm1ldGhvZH1gKTtcblxuICAgICAgICBpZighb3B0aW9ucy51cmwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE11c3Qgc3BlY2lmeSBhIFVSTCBmb3IgSFRUUCByZXF1ZXN0c2ApO1xuXG4gICAgICAgIG9wdGlvbnMudGltZW91dCA9IHRoaXMudGltZW91dCB8fCBDb25maWcudGltZW91dCB8fCAzMDAwMDtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zIDoge1trZXk6c3RyaW5nXTphbnl9KSA6IHtba2V5OnN0cmluZ106YW55fSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5jcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICBleGVjdXRlKG9wdHMgOiB7W2tleTpzdHJpbmddOmFueX0pIDogUS5Qcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuZXhlY3V0ZShvcHRzKVxuICAgICAgICAuY2F0Y2goKCBlIDogRXJyb3IgKSA9PiB7XG4gICAgICAgICAgICBpZihlID09PSBudWxsIHx8IHR5cGVvZihlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBlID0gbmV3IEVycm9yKFwiVXRpbHNTZXJ2aWNlLmV4ZWN1dGUoKSAtIFJlcXVlc3QgZmFpbGVkIGJ1dCBkaWRuJ3QgcmV0dXJuIGFuIFwiICtcbiAgICAgICAgICAgICAgICBcImVycm9yLiBUaGlzIGlzIG1vc3QgbGlrZWx5IGJlY2F1c2UgdGhlIHJlcXVlc3QgdGltZWQgb3V0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVXRpbHNTZXJ2aWNlO1xuIl19