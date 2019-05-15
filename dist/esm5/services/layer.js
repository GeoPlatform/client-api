/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as Q from 'q';
import ItemService from './item';
/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
var /**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
LayerService = /** @class */ (function (_super) {
    tslib_1.__extends(LayerService, _super);
    function LayerService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    LayerService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl + '/api/layers';
    };
    /**
     * @param id - GeoPlatform Layer identifier
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving style JSON object
     */
    /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving style JSON object
     */
    LayerService.prototype.style = /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving style JSON object
     */
    function (id, options) {
        var _this = this;
        return Q.resolve(id)
            .then(function (id) {
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/style';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: url, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error fetching style: " + e.message);
            Object.assign(err, e);
            _this.logError('LayerService.style() - ' + err.message);
            return Q.reject(err);
        });
    };
    /**
     * @param id - GeoPlatform Layer identifier
     * @param req identifying extent, x, y
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving feature JSON object
     */
    /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?} req identifying extent, x, y
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving feature JSON object
     */
    LayerService.prototype.describe = /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?} req identifying extent, x, y
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving feature JSON object
     */
    function (id, req, options) {
        var _this = this;
        return Q.resolve(req)
            .then(function (req) {
            if (!req) {
                throw new Error("Must provide describe parameters to use");
            }
            /** @type {?} */
            var keys = ['bbox', 'height', 'width', 'x', 'y'];
            /** @type {?} */
            var missing = keys.find(function (key) { return !req[key]; });
            if (missing) {
                throw new Error("Must specify " + missing + " in describe req");
            }
            /** @type {?} */
            var params = {
                srs: 'EPSG:4326',
                bbox: req.bbox,
                height: req.height,
                width: req.width,
                info_format: 'text/xml',
                x: req.x,
                y: req.y,
                i: req.x,
                //WMS 1.3.0
                j: req.y //WMS 1.3.0
            };
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/describe';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error describing layer feature: " + e.message);
            Object.assign(err, e);
            _this.logError('LayerService.describe() - ' + err.message);
            return Q.reject(err);
        });
    };
    /**
     * @param id - GeoPlatform Layer identifier
     * @param params describing layer request to validate
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving empty if successful or a message if failed
     */
    /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?} params describing layer request to validate
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving empty if successful or a message if failed
     */
    LayerService.prototype.validate = /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?} params describing layer request to validate
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving empty if successful or a message if failed
     */
    function (id, params, options) {
        var _this = this;
        return Q.resolve(params)
            .then(function (params) {
            if (!params) {
                throw new Error("Must provide parameters to use in layer validation");
            }
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/validate';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error validating layer request: " + e.message);
            Object.assign(err, e);
            _this.logError('LayerService.describe() - ' + err.message);
            return Q.reject(err);
        });
    };
    return LayerService;
}(ItemService));
export default LayerService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztBQUN2QixPQUFPLFdBQVcsTUFBTSxRQUFRLENBQUM7Ozs7Ozs7O0FBV2pDOzs7Ozs7O0FBQUE7SUFBMkIsd0NBQVc7SUFFbEMsc0JBQVksR0FBWSxFQUFFLFVBQXlCO2VBQy9DLGtCQUFNLEdBQUcsRUFBRSxVQUFVLENBQUM7S0FDekI7Ozs7O0lBRUQsNkJBQU07Ozs7SUFBTixVQUFPLE9BQWdCO1FBQ25CLGlCQUFNLE1BQU0sWUFBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxhQUFhLENBQUM7S0FDMUM7SUFFRDs7OztPQUlHOzs7Ozs7SUFDSCw0QkFBSzs7Ozs7SUFBTCxVQUFPLEVBQVcsRUFBRSxPQUFjO1FBQWxDLGlCQWdCQztRQWZHLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBRSxFQUFFLENBQUU7YUFDckIsSUFBSSxDQUFFLFVBQUMsRUFBRTs7WUFFTixJQUFJLEdBQUcsR0FBRyxLQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFDOztZQUM3QyxJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN6QixNQUFNLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFDLE9BQU87YUFDekMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxDQUFDOztZQUNKLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLDJCQUF5QixDQUFDLENBQUMsT0FBUyxDQUFDLENBQUM7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QUcsV0FBVyxDQUFDOztZQUNoRCxJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN6QixNQUFNLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsT0FBTzthQUN4RCxDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0IsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLENBQUM7O1lBQ0osSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMscUNBQW1DLENBQUMsQ0FBQyxPQUFTLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixLQUFJLENBQUMsUUFBUSxDQUFDLDRCQUE0QixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEIsQ0FBQyxDQUFDO0tBQ047dUJBMUhMO0VBYzJCLFdBQVcsRUE4R3JDLENBQUE7QUFFRCxlQUFlLFlBQVksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgKiBhcyBRIGZyb20gJ3EnO1xuaW1wb3J0IEl0ZW1TZXJ2aWNlIGZyb20gJy4vaXRlbSc7XG5pbXBvcnQgR1BIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvY2xpZW50JztcblxuLyoqXG4gKiBHZW9QbGF0Zm9ybSBNYXAgc2VydmljZVxuICogc2VydmljZSBmb3Igd29ya2luZyB3aXRoIHRoZSBHZW9QbGF0Zm9ybSBBUEkgdG9cbiAqIHJldHJpZXZlIGFuZCBtYW5pcHVsYXRlIG1hcCBvYmplY3RzLlxuICpcbiAqIEBzZWUgR2VvUGxhdGZvcm0uSXRlbVNlcnZpY2VcbiAqL1xuXG5jbGFzcyBMYXllclNlcnZpY2UgZXh0ZW5kcyBJdGVtU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybCA6IHN0cmluZykge1xuICAgICAgICBzdXBlci5zZXRVcmwoYmFzZVVybCk7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmwgKyAnL2FwaS9sYXllcnMnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIEdlb1BsYXRmb3JtIExheWVyIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHN0eWxlIEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgc3R5bGUgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGlkIClcbiAgICAgICAgLnRoZW4oIChpZCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL3N0eWxlJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3R5bGU6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignTGF5ZXJTZXJ2aWNlLnN0eWxlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIEdlb1BsYXRmb3JtIExheWVyIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0gcmVxIGlkZW50aWZ5aW5nIGV4dGVudCwgeCwgeVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgZmVhdHVyZSBKU09OIG9iamVjdFxuICAgICAqL1xuICAgIGRlc2NyaWJlKCBpZCA6IHN0cmluZywgcmVxIDogYW55LCBvcHRpb25zID86IGFueSApIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHJlcSApXG4gICAgICAgIC50aGVuKCAocmVxKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKCFyZXEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgZGVzY3JpYmUgcGFyYW1ldGVycyB0byB1c2VcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBrZXlzID0gWydiYm94JywgJ2hlaWdodCcsICd3aWR0aCcsICd4JywgJ3knXTtcbiAgICAgICAgICAgIGxldCBtaXNzaW5nID0ga2V5cy5maW5kKGtleSA9PiAhcmVxW2tleV0pO1xuICAgICAgICAgICAgaWYobWlzc2luZykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTXVzdCBzcGVjaWZ5ICR7bWlzc2luZ30gaW4gZGVzY3JpYmUgcmVxYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgc3JzICAgICAgICAgOiAnRVBTRzo0MzI2JyxcbiAgICAgICAgICAgICAgICBiYm94ICAgICAgICA6IHJlcS5iYm94LFxuICAgICAgICAgICAgICAgIGhlaWdodCAgICAgIDogcmVxLmhlaWdodCxcbiAgICAgICAgICAgICAgICB3aWR0aCAgICAgICA6IHJlcS53aWR0aCxcbiAgICAgICAgICAgICAgICBpbmZvX2Zvcm1hdCA6ICd0ZXh0L3htbCcsXG4gICAgICAgICAgICAgICAgeCAgICAgICAgICAgOiByZXEueCxcbiAgICAgICAgICAgICAgICB5ICAgICAgICAgICA6IHJlcS55LFxuICAgICAgICAgICAgICAgIGkgICAgICAgICAgIDogcmVxLngsIC8vV01TIDEuMy4wXG4gICAgICAgICAgICAgICAgaiAgICAgICAgICAgOiByZXEueSAgLy9XTVMgMS4zLjBcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvZGVzY3JpYmUnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIHBhcmFtczpwYXJhbXMsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBkZXNjcmliaW5nIGxheWVyIGZlYXR1cmU6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignTGF5ZXJTZXJ2aWNlLmRlc2NyaWJlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIEdlb1BsYXRmb3JtIExheWVyIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIGRlc2NyaWJpbmcgbGF5ZXIgcmVxdWVzdCB0byB2YWxpZGF0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgZW1wdHkgaWYgc3VjY2Vzc2Z1bCBvciBhIG1lc3NhZ2UgaWYgZmFpbGVkXG4gICAgICovXG4gICAgdmFsaWRhdGUoaWQgOiBzdHJpbmcsIHBhcmFtcyA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHBhcmFtcyApXG4gICAgICAgIC50aGVuKCBwYXJhbXMgPT4ge1xuXG4gICAgICAgICAgICBpZighcGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIHBhcmFtZXRlcnMgdG8gdXNlIGluIGxheWVyIHZhbGlkYXRpb25cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvdmFsaWRhdGUnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIHBhcmFtczpwYXJhbXMsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciB2YWxpZGF0aW5nIGxheWVyIHJlcXVlc3Q6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignTGF5ZXJTZXJ2aWNlLmRlc2NyaWJlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBMYXllclNlcnZpY2U7XG4iXX0=