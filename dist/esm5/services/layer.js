import * as tslib_1 from "tslib";
import ItemService from './item';
/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
var LayerService = /** @class */ (function (_super) {
    tslib_1.__extends(LayerService, _super);
    function LayerService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    LayerService.prototype.setUrl = function (baseUrl) {
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl + '/api/layers';
    };
    /**
     * Fetch a style associated with a given GeoPlatform Layer asset. This may
     * be the style for an Esri FeatureServer layer using the following:
     *
     *   .style( layerId, options);
     *
     * or a specific style definition for a non-Esri layer using the following call:
     *
     *   .style( layerId, styleId, options);
     *
     * @param id - GeoPlatform Layer identifier
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving style JSON object
     */
    LayerService.prototype.style = function (id) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return Promise.resolve(id)
            .then(function (id) {
            var options = null;
            var url = _this.baseUrl + '/' + id + '/style';
            if (args[0] && typeof (args[0]) === 'string') { //style id parameter
                url += 's/' + args[0]; //
                if (args[1])
                    options = args[1]; // ... plus options parameter
            }
            else if (args[0] && typeof (args[0]) === 'object') { //options parameter
                options = args[0];
            }
            var opts = _this.buildRequest({ method: "GET", url: url, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error fetching style: " + e.message);
            Object.assign(err, e);
            _this.logError('LayerService.style() - ' + err.message);
            throw err;
        });
    };
    /**
     * Fetch the list of styles associated with a given GeoPlatform Layer asset
     * @param id - GeoPlatform Layer identifier
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving style JSON object
     */
    LayerService.prototype.styles = function (id, options) {
        var _this = this;
        return Promise.resolve(id)
            .then(function (id) {
            var url = _this.baseUrl + '/' + id + '/styles';
            var opts = _this.buildRequest({ method: "GET", url: url, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error fetching style: " + e.message);
            Object.assign(err, e);
            _this.logError('LayerService.style() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - GeoPlatform Layer identifier
     * @param req identifying extent, x, y
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving feature JSON object
     */
    LayerService.prototype.describe = function (id, req, options) {
        var _this = this;
        return Promise.resolve(req)
            .then(function (req) {
            if (!req) {
                throw new Error("Must provide describe parameters to use");
            }
            var keys = ['bbox', 'height', 'width', 'x', 'y'];
            var missing = keys.find(function (key) { return !req[key]; });
            if (missing) {
                throw new Error("Must specify " + missing + " in describe req");
            }
            var params = {
                srs: 'EPSG:4326',
                bbox: req.bbox,
                height: req.height,
                width: req.width,
                info_format: 'text/xml',
                x: req.x,
                y: req.y,
                i: req.x,
                j: req.y //WMS 1.3.0
            };
            var url = _this.baseUrl + '/' + id + '/describe';
            var opts = _this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error describing layer feature: " + e.message);
            Object.assign(err, e);
            _this.logError('LayerService.describe() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - GeoPlatform Layer identifier
     * @param params describing layer request to validate
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving empty if successful or a message if failed
     */
    LayerService.prototype.validate = function (id, params, options) {
        var _this = this;
        return Promise.resolve(params)
            .then(function (params) {
            if (!params) {
                throw new Error("Must provide parameters to use in layer validation");
            }
            var url = _this.baseUrl + '/' + id + '/validate';
            var opts = _this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error validating layer request: " + e.message);
            Object.assign(err, e);
            _this.logError('LayerService.describe() - ' + err.message);
            throw err;
        });
    };
    return LayerService;
}(ItemService));
export default LayerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE9BQU8sV0FBVyxNQUFNLFFBQVEsQ0FBQztBQUdqQzs7Ozs7O0dBTUc7QUFFSDtJQUEyQix3Q0FBVztJQUVsQyxzQkFBWSxHQUFZLEVBQUUsVUFBeUI7ZUFDL0Msa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQztJQUMxQixDQUFDO0lBRUQsNkJBQU0sR0FBTixVQUFPLE9BQWdCO1FBQ25CLGlCQUFNLE1BQU0sWUFBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxhQUFhLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCw0QkFBSyxHQUFMLFVBQU8sRUFBVztRQUFsQixpQkF3QkM7UUF4Qm1CLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAsNkJBQU87O1FBQ3ZCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBRSxFQUFFLENBQUU7YUFDM0IsSUFBSSxDQUFFLFVBQUMsRUFBRTtZQUVOLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLEdBQUcsR0FBRyxLQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFDO1lBRTdDLElBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUUsRUFBRSxvQkFBb0I7Z0JBQzlELEdBQUcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQW9CLEVBQUU7Z0JBQzVDLElBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFD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QUFDLE1BQU0sRUFBRTtnQkFDUixNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7YUFDekU7WUFFRCxJQUFJLEdBQUcsR0FBRyxLQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsV0FBVyxDQUFDO1lBQ2hELElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3pCLE1BQU0sRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxPQUFPO2FBQ3hELENBQUMsQ0FBQztZQUNILE9BQU8sS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxDQUFDO1lBQ0osSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMscUNBQW1DLENBQUMsQ0FBQyxPQUFTLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixLQUFJLENBQUMsUUFBUSxDQUFDLDRCQUE0QixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRCxNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVMLG1CQUFDO0FBQUQsQ0FBQyxBQXJKRCxDQUEyQixXQUFXLEdBcUpyQztBQUVELGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCBJdGVtU2VydmljZSBmcm9tICcuL2l0ZW0nO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5cbi8qKlxuICogR2VvUGxhdGZvcm0gTWFwIHNlcnZpY2VcbiAqIHNlcnZpY2UgZm9yIHdvcmtpbmcgd2l0aCB0aGUgR2VvUGxhdGZvcm0gQVBJIHRvXG4gKiByZXRyaWV2ZSBhbmQgbWFuaXB1bGF0ZSBtYXAgb2JqZWN0cy5cbiAqXG4gKiBAc2VlIEdlb1BsYXRmb3JtLkl0ZW1TZXJ2aWNlXG4gKi9cblxuY2xhc3MgTGF5ZXJTZXJ2aWNlIGV4dGVuZHMgSXRlbVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmwgOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIuc2V0VXJsKGJhc2VVcmwpO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvbGF5ZXJzJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaCBhIHN0eWxlIGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIEdlb1BsYXRmb3JtIExheWVyIGFzc2V0LiBUaGlzIG1heVxuICAgICAqIGJlIHRoZSBzdHlsZSBmb3IgYW4gRXNyaSBGZWF0dXJlU2VydmVyIGxheWVyIHVzaW5nIHRoZSBmb2xsb3dpbmc6XG4gICAgICpcbiAgICAgKiAgIC5zdHlsZSggbGF5ZXJJZCwgb3B0aW9ucyk7XG4gICAgICpcbiAgICAgKiBvciBhIHNwZWNpZmljIHN0eWxlIGRlZmluaXRpb24gZm9yIGEgbm9uLUVzcmkgbGF5ZXIgdXNpbmcgdGhlIGZvbGxvd2luZyBjYWxsOlxuICAgICAqXG4gICAgICogICAuc3R5bGUoIGxheWVySWQsIHN0eWxlSWQsIG9wdGlvbnMpO1xuICAgICAqXG4gICAgICogQHBhcmFtIGlkIC0gR2VvUGxhdGZvcm0gTGF5ZXIgaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc3R5bGUgSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBzdHlsZSAoaWQgOiBzdHJpbmcsIC4uLmFyZ3MpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggaWQgKVxuICAgICAgICAudGhlbiggKGlkKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBvcHRpb25zID0gbnVsbDtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvc3R5bGUnO1xuXG4gICAgICAgICAgICBpZihhcmdzWzBdICYmIHR5cGVvZihhcmdzWzBdKSA9PT0gJ3N0cmluZycpIHsgLy9zdHlsZSBpZCBwYXJhbWV0ZXJcbiAgICAgICAgICAgICAgICB1cmwgKz0gJ3MvJyArIGFyZ3NbMF07ICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIGlmKGFyZ3NbMV0pIG9wdGlvbnMgPSBhcmdzWzFdOyAgICAgICAgICAgIC8vIC4uLiBwbHVzIG9wdGlvbnMgcGFyYW1ldGVyXG5cbiAgICAgICAgICAgIH0gZWxzZSBpZihhcmdzWzBdICYmIHR5cGVvZihhcmdzWzBdKSA9PT0gJ29iamVjdCcpIHsgLy9vcHRpb25zIHBhcmFtZXRlclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBhcmdzWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHsgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9ucyB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIHN0eWxlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0xheWVyU2VydmljZS5zdHlsZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmV0Y2ggdGhlIGxpc3Qgb2Ygc3R5bGVzIGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIEdlb1BsYXRmb3JtIExheWVyIGFzc2V0XG4gICAgICogQHBhcmFtIGlkIC0gR2VvUGxhdGZvcm0gTGF5ZXIgaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc3R5bGUgSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBzdHlsZXMgKCBpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkgKSA6IFByb21pc2U8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggaWQgKVxuICAgICAgICAudGhlbiggKGlkKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL3N0eWxlcyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHsgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9ucyB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIHN0eWxlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0xheWVyU2VydmljZS5zdHlsZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBHZW9QbGF0Zm9ybSBMYXllciBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIHJlcSBpZGVudGlmeWluZyBleHRlbnQsIHgsIHlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGZlYXR1cmUgSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBkZXNjcmliZSggaWQgOiBzdHJpbmcsIHJlcSA6IGFueSwgb3B0aW9ucyA/OiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggcmVxIClcbiAgICAgICAgLnRoZW4oIChyZXEpID0+IHtcblxuICAgICAgICAgICAgaWYoIXJlcSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBkZXNjcmliZSBwYXJhbWV0ZXJzIHRvIHVzZVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGtleXMgPSBbJ2Jib3gnLCAnaGVpZ2h0JywgJ3dpZHRoJywgJ3gnLCAneSddO1xuICAgICAgICAgICAgbGV0IG1pc3NpbmcgPSBrZXlzLmZpbmQoa2V5ID0+ICFyZXFba2V5XSk7XG4gICAgICAgICAgICBpZihtaXNzaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdXN0IHNwZWNpZnkgJHttaXNzaW5nfSBpbiBkZXNjcmliZSByZXFgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBzcnMgICAgICAgICA6ICdFUFNHOjQzMjYnLFxuICAgICAgICAgICAgICAgIGJib3ggICAgICAgIDogcmVxLmJib3gsXG4gICAgICAgICAgICAgICAgaGVpZ2h0ICAgICAgOiByZXEuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHdpZHRoICAgICAgIDogcmVxLndpZHRoLFxuICAgICAgICAgICAgICAgIGluZm9fZm9ybWF0IDogJ3RleHQveG1sJyxcbiAgICAgICAgICAgICAgICB4ICAgICAgICAgICA6IHJlcS54LFxuICAgICAgICAgICAgICAgIHkgICAgICAgICAgIDogcmVxLnksXG4gICAgICAgICAgICAgICAgaSAgICAgICAgICAgOiByZXEueCwgLy9XTVMgMS4zLjBcbiAgICAgICAgICAgICAgICBqICAgICAgICAgICA6IHJlcS55ICAvL1dNUyAxLjMuMFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy9kZXNjcmliZSc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnVybCwgcGFyYW1zOnBhcmFtcywgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGRlc2NyaWJpbmcgbGF5ZXIgZmVhdHVyZTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdMYXllclNlcnZpY2UuZGVzY3JpYmUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIEdlb1BsYXRmb3JtIExheWVyIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIGRlc2NyaWJpbmcgbGF5ZXIgcmVxdWVzdCB0byB2YWxpZGF0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgZW1wdHkgaWYgc3VjY2Vzc2Z1bCBvciBhIG1lc3NhZ2UgaWYgZmFpbGVkXG4gICAgICovXG4gICAgdmFsaWRhdGUoaWQgOiBzdHJpbmcsIHBhcmFtcyA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBwYXJhbXMgKVxuICAgICAgICAudGhlbiggcGFyYW1zID0+IHtcblxuICAgICAgICAgICAgaWYoIXBhcmFtcykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBwYXJhbWV0ZXJzIHRvIHVzZSBpbiBsYXllciB2YWxpZGF0aW9uXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL3ZhbGlkYXRlJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBwYXJhbXM6cGFyYW1zLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgdmFsaWRhdGluZyBsYXllciByZXF1ZXN0OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0xheWVyU2VydmljZS5kZXNjcmliZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExheWVyU2VydmljZTtcbiJdfQ==