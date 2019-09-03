import * as tslib_1 from "tslib";
import ItemService from './item';
/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
var MapService = /** @class */ (function (_super) {
    tslib_1.__extends(MapService, _super);
    function MapService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    MapService.prototype.setUrl = function (baseUrl) {
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl + '/api/maps';
    };
    return MapService;
}(ItemService));
export default MapService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxXQUFXLE1BQU0sUUFBUSxDQUFDO0FBR2pDOzs7Ozs7R0FNRztBQUVIO0lBQXlCLHNDQUFXO0lBRWhDLG9CQUFZLEdBQVUsRUFBRSxVQUF1QjtlQUMzQyxrQkFBTSxHQUFHLEVBQUUsVUFBVSxDQUFDO0lBQzFCLENBQUM7SUFFRCwyQkFBTSxHQUFOLFVBQU8sT0FBYztRQUNqQixpQkFBTSxNQUFNLFlBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsV0FBVyxDQUFDO0lBQ3pDLENBQUM7SUFHTCxpQkFBQztBQUFELENBQUMsQUFaRCxDQUF5QixXQUFXLEdBWW5DO0FBRUQsZUFBZSxVQUFVLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IEl0ZW1TZXJ2aWNlIGZyb20gJy4vaXRlbSc7XG5pbXBvcnQgR1BIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvY2xpZW50JztcblxuLyoqXG4gKiBHZW9QbGF0Zm9ybSBNYXAgc2VydmljZVxuICogc2VydmljZSBmb3Igd29ya2luZyB3aXRoIHRoZSBHZW9QbGF0Zm9ybSBBUEkgdG9cbiAqIHJldHJpZXZlIGFuZCBtYW5pcHVsYXRlIG1hcCBvYmplY3RzLlxuICpcbiAqIEBzZWUgR2VvUGxhdGZvcm0uSXRlbVNlcnZpY2VcbiAqL1xuXG5jbGFzcyBNYXBTZXJ2aWNlIGV4dGVuZHMgSXRlbVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IodXJsOnN0cmluZywgaHR0cENsaWVudDpHUEh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybDpzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIuc2V0VXJsKGJhc2VVcmwpO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvbWFwcyc7XG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFwU2VydmljZTtcbiJdfQ==