/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
DatasetService = /** @class */ (function (_super) {
    tslib_1.__extends(DatasetService, _super);
    function DatasetService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    DatasetService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl + '/api/datasets';
    };
    return DatasetService;
}(ItemService));
export default DatasetService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9kYXRhc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxXQUFXLE1BQU0sUUFBUSxDQUFDOzs7Ozs7OztBQVdqQzs7Ozs7OztBQUFBO0lBQTZCLDBDQUFXO0lBRXBDLHdCQUFZLEdBQVksRUFBRSxVQUF5QjtlQUMvQyxrQkFBTSxHQUFHLEVBQUUsVUFBVSxDQUFDO0tBQ3pCOzs7OztJQUVELCtCQUFNOzs7O0lBQU4sVUFBTyxPQUFnQjtRQUNuQixpQkFBTSxNQUFNLFlBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsZUFBZSxDQUFDO0tBQzVDO3lCQXJCTDtFQVk2QixXQUFXLEVBV3ZDLENBQUE7QUFFRCxlQUFlLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IEl0ZW1TZXJ2aWNlIGZyb20gJy4vaXRlbSc7XG5pbXBvcnQgR1BIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvY2xpZW50JztcblxuLyoqXG4gKiBHZW9QbGF0Zm9ybSBNYXAgc2VydmljZVxuICogc2VydmljZSBmb3Igd29ya2luZyB3aXRoIHRoZSBHZW9QbGF0Zm9ybSBBUEkgdG9cbiAqIHJldHJpZXZlIGFuZCBtYW5pcHVsYXRlIG1hcCBvYmplY3RzLlxuICpcbiAqIEBzZWUgR2VvUGxhdGZvcm0uSXRlbVNlcnZpY2VcbiAqL1xuXG5jbGFzcyBEYXRhc2V0U2VydmljZSBleHRlbmRzIEl0ZW1TZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcih1cmwsIGh0dHBDbGllbnQpO1xuICAgIH1cblxuICAgIHNldFVybChiYXNlVXJsIDogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyLnNldFVybChiYXNlVXJsKTtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybCArICcvYXBpL2RhdGFzZXRzJztcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YXNldFNlcnZpY2U7XG4iXX0=