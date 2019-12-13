import * as tslib_1 from "tslib";
import ItemService from './item';
/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
var GalleryService = /** @class */ (function (_super) {
    tslib_1.__extends(GalleryService, _super);
    function GalleryService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    GalleryService.prototype.setUrl = function (baseUrl) {
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl + '/api/galleries';
    };
    GalleryService.prototype.addItem = function (galleryId, itemObj, options) {
        var _this = this;
        return this.createAndResolvePromise(true)
            .then(function () {
            var url = _this.baseUrl + '/' + galleryId + '/items';
            var opts = _this.buildRequest({
                method: 'POST', url: url, data: itemObj, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error adding item: " + e.message);
            Object.assign(err, e);
            _this.logError('GalleryService.addItem() - ' + err.message);
            throw err;
        });
    };
    GalleryService.prototype.removeItem = function (galleryId, itemId, options) {
        var _this = this;
        return this.createAndResolvePromise(this.baseUrl + '/' + galleryId + '/items/' + itemId)
            .then(function (url) {
            var opts = _this.buildRequest({
                method: 'DELETE', url: url, options: options
            });
            return _this.execute(opts);
        })
            .then(function () { return true; })
            .catch(function (e) {
            var err = new Error("Error adding item: " + e.message);
            Object.assign(err, e);
            _this.logError('GalleryService.addItem() - ' + err.message);
            throw err;
        });
    };
    return GalleryService;
}(ItemService));
export default GalleryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9nYWxsZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLFdBQVcsTUFBTSxRQUFRLENBQUM7QUFHakM7Ozs7OztHQU1HO0FBRUg7SUFBNkIsMENBQVc7SUFFcEMsd0JBQVksR0FBWSxFQUFFLFVBQXlCO2VBQy9DLGtCQUFNLEdBQUcsRUFBRSxVQUFVLENBQUM7SUFDMUIsQ0FBQztJQUVELCtCQUFNLEdBQU4sVUFBTyxPQUFnQjtRQUNuQixpQkFBTSxNQUFNLFlBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7SUFDOUMsQ0FBQztJQUVELGdDQUFPLEdBQVAsVUFBUyxTQUFrQixFQUFFLE9BQWEsRUFBRSxPQUFjO1FBQTFELGlCQWVDO1FBZEcsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUUsSUFBSSxDQUFFO2FBQzFDLElBQUksQ0FBRTtZQUNILElBQUksR0FBRyxHQUFHLEtBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDcEQsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTSxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFDLE9BQU87YUFDekQsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLENBQUM7WUFDSixJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyw2QkFBNkIsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0QsTUFBTSxHQUFHLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtQ0FBVSxHQUFWLFVBQVksU0FBa0IsRUFBRSxNQUFZLEVBQUUsT0FBYztRQUE1RCxpQkFlQztRQWRHLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBRyxTQUFTLEdBQUcsTUFBTSxDQUFFO2FBQ3pGLElBQUksQ0FBRSxVQUFBLEdBQUc7WUFDTixJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN6QixNQUFNLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFDLE9BQU87YUFDNUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQzthQUNELElBQUksQ0FBRSxjQUFLLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQzthQUNoQixLQUFLLENBQUMsVUFBQSxDQUFDO1lBQ0osSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxRQUFRLENBQUMsNkJBQTZCLEdBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFELE1BQU0sR0FBRyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUwscUJBQUM7QUFBRCxDQUFDLEFBN0NELENBQTZCLFdBQVcsR0E2Q3ZDO0FBRUQsZUFBZSxjQUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBJdGVtU2VydmljZSBmcm9tICcuL2l0ZW0nO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5cbi8qKlxuICogR2VvUGxhdGZvcm0gTWFwIHNlcnZpY2VcbiAqIHNlcnZpY2UgZm9yIHdvcmtpbmcgd2l0aCB0aGUgR2VvUGxhdGZvcm0gQVBJIHRvXG4gKiByZXRyaWV2ZSBhbmQgbWFuaXB1bGF0ZSBtYXAgb2JqZWN0cy5cbiAqXG4gKiBAc2VlIEdlb1BsYXRmb3JtLkl0ZW1TZXJ2aWNlXG4gKi9cblxuY2xhc3MgR2FsbGVyeVNlcnZpY2UgZXh0ZW5kcyBJdGVtU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybCA6IHN0cmluZykge1xuICAgICAgICBzdXBlci5zZXRVcmwoYmFzZVVybCk7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmwgKyAnL2FwaS9nYWxsZXJpZXMnO1xuICAgIH1cblxuICAgIGFkZEl0ZW0gKGdhbGxlcnlJZCA6IHN0cmluZywgaXRlbU9iaiA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHRydWUgKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGdhbGxlcnlJZCArICcvaXRlbXMnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJywgdXJsOnVybCwgZGF0YTogaXRlbU9iaiwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoXCJFcnJvciBhZGRpbmcgaXRlbTogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignR2FsbGVyeVNlcnZpY2UuYWRkSXRlbSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlSXRlbSggZ2FsbGVyeUlkIDogc3RyaW5nLCBpdGVtSWQgOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCB0aGlzLmJhc2VVcmwgKyAnLycgKyBnYWxsZXJ5SWQgKyAnL2l0ZW1zLycgKyBpdGVtSWQgKVxuICAgICAgICAudGhlbiggdXJsID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDonREVMRVRFJywgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCAoKSA9PnRydWUpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoXCJFcnJvciBhZGRpbmcgaXRlbTogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignR2FsbGVyeVNlcnZpY2UuYWRkSXRlbSgpIC0gJysgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FsbGVyeVNlcnZpY2U7XG4iXX0=