/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import BaseService from './base';
var UtilsService = /** @class */ (function (_super) {
    tslib_1.__extends(UtilsService, _super);
    function UtilsService(url, httpClient) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.setTimeout(30000);
        return _this;
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
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl;
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
        return this.createAndResolvePromise(url)
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
            throw err;
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
        return this.createAndResolvePromise(url)
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
            throw err;
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
        return this.createAndResolvePromise(url)
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
            throw err;
        });
    };
    return UtilsService;
}(BaseService));
export default UtilsService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxPQUFPLFdBQVcsTUFBTSxRQUFRLENBQUM7QUFHakMsSUFBQTtJQUEyQix3Q0FBVztJQUVsQyxzQkFBWSxHQUFZLEVBQUUsVUFBeUI7UUFBbkQsWUFDSSxrQkFBTSxHQUFHLEVBQUUsVUFBVSxDQUFDLFNBRXpCO1FBREcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7S0FDMUI7Ozs7O0lBRUQsNkJBQU07Ozs7SUFBTixVQUFPLE9BQWdCO1FBQ25CLGlCQUFNLE1BQU0sWUFBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztLQUMxQjtJQUVEOzs7OztPQUtHOzs7Ozs7O0lBQ0gsbUNBQVk7Ozs7OztJQUFaLFVBQWMsUUFBc0IsRUFBRSxLQUFXLEVBQUUsT0FBYztRQUFqRSxpQkFtQkM7O1FBakJHLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDN0MsSUFBRyxRQUFRO1lBQ1AsR0FBRyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUM7UUFFMUIsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUUsR0FBRyxDQUFFO2FBQ3pDLElBQUksQ0FBRSxVQUFDLEdBQUc7O1lBQ1AsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBQyxLQUFLLElBQUUsRUFBRSxFQUFFLE9BQU8sRUFBQyxPQUFPO2FBQzNELENBQUMsQ0FBQztZQUNILE9BQU8sS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QixDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEs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Q29uZmlnIGZyb20gJy4uL3NoYXJlZC9jb25maWcnO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5pbXBvcnQgQmFzZVNlcnZpY2UgZnJvbSAnLi9iYXNlJztcblxuXG5jbGFzcyBVdGlsc1NlcnZpY2UgZXh0ZW5kcyBCYXNlU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy5zZXRUaW1lb3V0KDMwMDAwKTtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybCA6IHN0cmluZykge1xuICAgICAgICBzdXBlci5zZXRVcmwoYmFzZVVybCk7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHByb3BlcnR5IC0gb3B0aW9uYWwgY2FwYSBwcm9wZXJ0eSB0byBzcGVjaWZpY2FsbHkgcmVxdWVzdFxuICAgICAqIEBwYXJhbSBxdWVyeSAtIG9wdGlvbmFsIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB3aXRoIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIGNvbmZpZyB0byBzZW5kIHdpdGggaHR0cCByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBjYXBhYmlsaXRpZXMgb2JqZWN0XG4gICAgICovXG4gICAgY2FwYWJpbGl0aWVzIChwcm9wZXJ0eSA6IHN0cmluZ3xudWxsLCBxdWVyeSA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9hcGkvY2FwYWJpbGl0aWVzJztcbiAgICAgICAgaWYocHJvcGVydHkpXG4gICAgICAgICAgICB1cmwgKz0gJy8nICsgcHJvcGVydHk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHVybCApXG4gICAgICAgIC50aGVuKCAodXJsKSA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnVybCwgcGFyYW1zOnF1ZXJ5fHx7fSwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGdldHRpbmcgY2FwYWJpbGl0aWVzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1V0aWxzU2VydmljZS5jYXBhYmlsaXRpZXMoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmaWxlXG4gICAgICogQHBhcmFtIGZvcm1hdFxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICovXG4gICAgcGFyc2VGaWxlIChmaWxlIDogYW55LCBmb3JtYXQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgdmFyIHVybCA9IHRoaXMuYmFzZVVybCArICcvYXBpL3V0aWxzL3BhcnNlJztcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdXJsIClcbiAgICAgICAgLnRoZW4oIHVybCA9PiB7XG5cbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIiwgIHVybDp1cmwsXG4gICAgICAgICAgICAgICAgZGF0YTogeyBmb3JtYXQ6IGZvcm1hdCB9LFxuICAgICAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICAgICAgZm9ybURhdGE6IHRydWUsICAgLy9Ob2RlSlMgKFJlcXVlc3RKUylcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiByZXNwb25zZSApXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHBhcnNpbmcgZmlsZTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdVdGlsc1NlcnZpY2UucGFyc2VGaWxlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdlb2xvY2F0ZSB0aGUgc3BlY2lmaWVkIGFyZ3VtZW50IHRvIGEgc2V0IG9mIGNhbmRpZGF0ZSBsb2NhdGlvbnMuXG4gICAgICogQHBhcmFtIHZhbHVlIC0gdGV4dCBzdHJpbmcgdG8gZ2VvbG9jYXRlIChuYW1lIG9yIGxhdCxsbmcpXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBjb25maWcgdG8gc2VuZCB3aXRoIGh0dHAgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgYW4gYXJyYXkgb2YgZ2VvY29kZWQgcmVzdWx0c1xuICAgICAqL1xuICAgIGxvY2F0ZSh2YWx1ZSA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICB2YXIgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9hcGkvdXRpbHMvZ2F6ZXR0ZWVyJztcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UodXJsKVxuICAgICAgICAudGhlbiggdXJsID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7IGxvY2F0aW9uOiB2YWx1ZSB9LFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHJlc29sdmluZyBsb2NhdGlvbjogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdVdGlsc1NlcnZpY2UubG9jYXRlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVXRpbHNTZXJ2aWNlO1xuIl19