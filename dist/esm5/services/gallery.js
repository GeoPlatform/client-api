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
GalleryService = /** @class */ (function (_super) {
    tslib_1.__extends(GalleryService, _super);
    function GalleryService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    GalleryService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl + '/api/galleries';
    };
    /**
     * @param {?} galleryId
     * @param {?} itemObj
     * @param {?=} options
     * @return {?}
     */
    GalleryService.prototype.addItem = /**
     * @param {?} galleryId
     * @param {?} itemObj
     * @param {?=} options
     * @return {?}
     */
    function (galleryId, itemObj, options) {
        var _this = this;
        return Q.resolve(true)
            .then(function () {
            /** @type {?} */
            var url = _this.baseUrl + '/' + galleryId + '/items';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'POST', url: url, data: itemObj, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error adding item: " + e.message);
            Object.assign(err, e);
            _this.logError('GalleryService.addItem() - ' + err.message);
            return Q.reject(err);
        });
    };
    /**
     * @param {?} galleryId
     * @param {?} itemId
     * @param {?=} options
     * @return {?}
     */
    GalleryService.prototype.removeItem = /**
     * @param {?} galleryId
     * @param {?} itemId
     * @param {?=} options
     * @return {?}
     */
    function (galleryId, itemId, options) {
        var _this = this;
        return Q.resolve(this.baseUrl + '/' + galleryId + '/items/' + itemId)
            .then(function (url) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'DELETE', url: url, options: options
            });
            return _this.execute(opts);
        })
            .then(function () { return true; })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error adding item: " + e.message);
            Object.assign(err, e);
            _this.logError('GalleryService.addItem() - ' + err.message);
            return Q.reject(err);
        });
    };
    return GalleryService;
}(ItemService));
export default GalleryService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9nYWxsZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7QUFDdkIsT0FBTyxXQUFXLE1BQU0sUUFBUSxDQUFDOzs7Ozs7OztBQVdqQzs7Ozs7OztBQUFBO0lBQTZCLDBDQUFXO0lBRXBDLHdCQUFZLEdBQVksRUFBRSxVQUF5QjtlQUMvQyxrQkFBTSxHQUFHLEVBQUUsVUFBVSxDQUFDO0tBQ3pCOzs7OztJQUVELCtCQUFNOzs7O0lBQU4sVUFBTyxPQUFnQjtRQUNuQixpQkFBTSxNQUFNLFlBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7S0FDN0M7Ozs7Ozs7SUFFRCxnQ0FBTzs7Ozs7O0lBQVAsVUFBUyxTQUFrQixFQUFFLE9BQWEsRUFBRSxPQUFjO1FBQTFELGlCQWVDO1FBZEcsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFFLElBQUksQ0FBRTthQUN2QixJQUFJLENBQUU7O1lBQ0gsSUFBSSxHQUFHLEdBQUcsS0FBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQzs7WUFDcEQsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTSxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFDLE9BQU87YUFDekQsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxDQUFDOztZQUNKLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixLQUFJLENBQUMsUUFBUSxDQUFDLDZCQUE2QixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzRCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEIsQ0FBQyxDQUFDO0tBQ047Ozs7Ozs7SUFFRCxtQ0FBVTs7Ozs7O0lBQVYsVUFBWSxTQUFrQixFQUFFLE1BQVksRUFBRSxPQUFjO1FBQTVELGlCQWVDO1FBZEcsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBRyxTQUFTLEdBQUcsTUFBTSxDQUFFO2FBQ3RFLElBQUksQ0FBRSxVQUFBLEdBQUc7O1lBQ04sSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBQyxPQUFPO2FBQzVDLENBQUMsQ0FBQztZQUNILE9BQU8sS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QixDQUFDO2FBQ0QsSUFBSSxDQUFFLGNBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO2FBQ2hCLEtBQUssQ0FBQyxVQUFBLENBQUM7O1lBQ0osSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxRQUFRLENBQUMsNkJBQTZCLEdBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QixDQUFDLENBQUM7S0FDTjt5QkF4REw7RUFhNkIsV0FBVyxFQTZDdkMsQ0FBQTtBQUVELGVBQWUsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBRIGZyb20gJ3EnO1xuaW1wb3J0IEl0ZW1TZXJ2aWNlIGZyb20gJy4vaXRlbSc7XG5pbXBvcnQgR1BIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvY2xpZW50JztcblxuLyoqXG4gKiBHZW9QbGF0Zm9ybSBNYXAgc2VydmljZVxuICogc2VydmljZSBmb3Igd29ya2luZyB3aXRoIHRoZSBHZW9QbGF0Zm9ybSBBUEkgdG9cbiAqIHJldHJpZXZlIGFuZCBtYW5pcHVsYXRlIG1hcCBvYmplY3RzLlxuICpcbiAqIEBzZWUgR2VvUGxhdGZvcm0uSXRlbVNlcnZpY2VcbiAqL1xuXG5jbGFzcyBHYWxsZXJ5U2VydmljZSBleHRlbmRzIEl0ZW1TZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcih1cmwsIGh0dHBDbGllbnQpO1xuICAgIH1cblxuICAgIHNldFVybChiYXNlVXJsIDogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyLnNldFVybChiYXNlVXJsKTtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybCArICcvYXBpL2dhbGxlcmllcyc7XG4gICAgfVxuXG4gICAgYWRkSXRlbSAoZ2FsbGVyeUlkIDogc3RyaW5nLCBpdGVtT2JqIDogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHRydWUgKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGdhbGxlcnlJZCArICcvaXRlbXMnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJywgdXJsOnVybCwgZGF0YTogaXRlbU9iaiwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoXCJFcnJvciBhZGRpbmcgaXRlbTogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignR2FsbGVyeVNlcnZpY2UuYWRkSXRlbSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVJdGVtKCBnYWxsZXJ5SWQgOiBzdHJpbmcsIGl0ZW1JZCA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCB0aGlzLmJhc2VVcmwgKyAnLycgKyBnYWxsZXJ5SWQgKyAnL2l0ZW1zLycgKyBpdGVtSWQgKVxuICAgICAgICAudGhlbiggdXJsID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDonREVMRVRFJywgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCAoKSA9PnRydWUpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoXCJFcnJvciBhZGRpbmcgaXRlbTogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignR2FsbGVyeVNlcnZpY2UuYWRkSXRlbSgpIC0gJysgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHYWxsZXJ5U2VydmljZTtcbiJdfQ==