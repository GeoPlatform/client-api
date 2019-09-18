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
            var options = { params: null };
            var url = _this.baseUrl + '/' + id + '/style';
            if (args[0] && typeof (args[0]) === 'string') { //style id parameter
                url += 's/' + args[0]; //
                if (args[1])
                    options.params = args[1]; // ... plus options parameter
            }
            else if (args[0] && typeof (args[0]) === 'object') { //options parameter
                options.params = args[0];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE9BQU8sV0FBVyxNQUFNLFFBQVEsQ0FBQztBQUdqQzs7Ozs7O0dBTUc7QUFFSDtJQUEyQix3Q0FBVztJQUVsQyxzQkFBWSxHQUFZLEVBQUUsVUFBeUI7ZUFDL0Msa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQztJQUMxQixDQUFDO0lBRUQsNkJBQU0sR0FBTixVQUFPLE9BQWdCO1FBQ25CLGlCQUFNLE1BQU0sWUFBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxhQUFhLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCw0QkFBSyxHQUFMLFVBQU8sRUFBVztRQUFsQixpQkF3QkM7UUF4Qm1CLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAsNkJBQU87O1FBQ3ZCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBRSxFQUFFLENBQUU7YUFDM0IsSUFBSSxDQUFFLFVBQUMsRUFBRTtZQUVOLElBQUksT0FBTyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQy9CLElBQUksR0FBRyxHQUFHLEtBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUM7WUFFN0MsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRSxFQUFFLG9CQUFvQjtnQkFDOUQsR0FBRyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBb0IsRUFBRTtnQkFDNUMsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUFFLE9BQU8sQ0FBQyxNQUFN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QUU7YUFDL0IsSUFBSSxDQUFFLFVBQUEsTUFBTTtZQUVULElBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ1IsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO2FBQ3pFO1lBRUQsSUFBSSxHQUFHLEdBQUcsS0FBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLFdBQVcsQ0FBQztZQUNoRCxJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN6QixNQUFNLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsT0FBTzthQUN4RCxDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsQ0FBQztZQUNKLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLHFDQUFtQyxDQUFDLENBQUMsT0FBUyxDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUQsTUFBTSxHQUFHLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTCxtQkFBQztBQUFELENBQUMsQUFySkQsQ0FBMkIsV0FBVyxHQXFKckM7QUFFRCxlQUFlLFlBQVksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgSXRlbVNlcnZpY2UgZnJvbSAnLi9pdGVtJztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuXG4vKipcbiAqIEdlb1BsYXRmb3JtIE1hcCBzZXJ2aWNlXG4gKiBzZXJ2aWNlIGZvciB3b3JraW5nIHdpdGggdGhlIEdlb1BsYXRmb3JtIEFQSSB0b1xuICogcmV0cmlldmUgYW5kIG1hbmlwdWxhdGUgbWFwIG9iamVjdHMuXG4gKlxuICogQHNlZSBHZW9QbGF0Zm9ybS5JdGVtU2VydmljZVxuICovXG5cbmNsYXNzIExheWVyU2VydmljZSBleHRlbmRzIEl0ZW1TZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcih1cmwsIGh0dHBDbGllbnQpO1xuICAgIH1cblxuICAgIHNldFVybChiYXNlVXJsIDogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyLnNldFVybChiYXNlVXJsKTtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybCArICcvYXBpL2xheWVycyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmV0Y2ggYSBzdHlsZSBhc3NvY2lhdGVkIHdpdGggYSBnaXZlbiBHZW9QbGF0Zm9ybSBMYXllciBhc3NldC4gVGhpcyBtYXlcbiAgICAgKiBiZSB0aGUgc3R5bGUgZm9yIGFuIEVzcmkgRmVhdHVyZVNlcnZlciBsYXllciB1c2luZyB0aGUgZm9sbG93aW5nOlxuICAgICAqXG4gICAgICogICAuc3R5bGUoIGxheWVySWQsIG9wdGlvbnMpO1xuICAgICAqXG4gICAgICogb3IgYSBzcGVjaWZpYyBzdHlsZSBkZWZpbml0aW9uIGZvciBhIG5vbi1Fc3JpIGxheWVyIHVzaW5nIHRoZSBmb2xsb3dpbmcgY2FsbDpcbiAgICAgKlxuICAgICAqICAgLnN0eWxlKCBsYXllcklkLCBzdHlsZUlkLCBvcHRpb25zKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAtIEdlb1BsYXRmb3JtIExheWVyIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHN0eWxlIEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgc3R5bGUgKGlkIDogc3RyaW5nLCAuLi5hcmdzKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIGlkIClcbiAgICAgICAgLnRoZW4oIChpZCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHsgcGFyYW1zOiBudWxsIH07XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL3N0eWxlJztcblxuICAgICAgICAgICAgaWYoYXJnc1swXSAmJiB0eXBlb2YoYXJnc1swXSkgPT09ICdzdHJpbmcnKSB7IC8vc3R5bGUgaWQgcGFyYW1ldGVyXG4gICAgICAgICAgICAgICAgdXJsICs9ICdzLycgKyBhcmdzWzBdOyAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICBpZihhcmdzWzFdKSBvcHRpb25zLnBhcmFtcyA9IGFyZ3NbMV07ICAgICAgICAgICAgLy8gLi4uIHBsdXMgb3B0aW9ucyBwYXJhbWV0ZXJcblxuICAgICAgICAgICAgfSBlbHNlIGlmKGFyZ3NbMF0gJiYgdHlwZW9mKGFyZ3NbMF0pID09PSAnb2JqZWN0JykgeyAvL29wdGlvbnMgcGFyYW1ldGVyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wYXJhbXMgPSBhcmdzWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHsgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9ucyB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIHN0eWxlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0xheWVyU2VydmljZS5zdHlsZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmV0Y2ggdGhlIGxpc3Qgb2Ygc3R5bGVzIGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIEdlb1BsYXRmb3JtIExheWVyIGFzc2V0XG4gICAgICogQHBhcmFtIGlkIC0gR2VvUGxhdGZvcm0gTGF5ZXIgaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc3R5bGUgSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBzdHlsZXMgKCBpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkgKSA6IFByb21pc2U8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggaWQgKVxuICAgICAgICAudGhlbiggKGlkKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL3N0eWxlcyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHsgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9ucyB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIHN0eWxlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0xheWVyU2VydmljZS5zdHlsZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBHZW9QbGF0Zm9ybSBMYXllciBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIHJlcSBpZGVudGlmeWluZyBleHRlbnQsIHgsIHlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGZlYXR1cmUgSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBkZXNjcmliZSggaWQgOiBzdHJpbmcsIHJlcSA6IGFueSwgb3B0aW9ucyA/OiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggcmVxIClcbiAgICAgICAgLnRoZW4oIChyZXEpID0+IHtcblxuICAgICAgICAgICAgaWYoIXJlcSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBkZXNjcmliZSBwYXJhbWV0ZXJzIHRvIHVzZVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGtleXMgPSBbJ2Jib3gnLCAnaGVpZ2h0JywgJ3dpZHRoJywgJ3gnLCAneSddO1xuICAgICAgICAgICAgbGV0IG1pc3NpbmcgPSBrZXlzLmZpbmQoa2V5ID0+ICFyZXFba2V5XSk7XG4gICAgICAgICAgICBpZihtaXNzaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdXN0IHNwZWNpZnkgJHttaXNzaW5nfSBpbiBkZXNjcmliZSByZXFgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBzcnMgICAgICAgICA6ICdFUFNHOjQzMjYnLFxuICAgICAgICAgICAgICAgIGJib3ggICAgICAgIDogcmVxLmJib3gsXG4gICAgICAgICAgICAgICAgaGVpZ2h0ICAgICAgOiByZXEuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHdpZHRoICAgICAgIDogcmVxLndpZHRoLFxuICAgICAgICAgICAgICAgIGluZm9fZm9ybWF0IDogJ3RleHQveG1sJyxcbiAgICAgICAgICAgICAgICB4ICAgICAgICAgICA6IHJlcS54LFxuICAgICAgICAgICAgICAgIHkgICAgICAgICAgIDogcmVxLnksXG4gICAgICAgICAgICAgICAgaSAgICAgICAgICAgOiByZXEueCwgLy9XTVMgMS4zLjBcbiAgICAgICAgICAgICAgICBqICAgICAgICAgICA6IHJlcS55ICAvL1dNUyAxLjMuMFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy9kZXNjcmliZSc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnVybCwgcGFyYW1zOnBhcmFtcywgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGRlc2NyaWJpbmcgbGF5ZXIgZmVhdHVyZTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdMYXllclNlcnZpY2UuZGVzY3JpYmUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIEdlb1BsYXRmb3JtIExheWVyIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIGRlc2NyaWJpbmcgbGF5ZXIgcmVxdWVzdCB0byB2YWxpZGF0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgZW1wdHkgaWYgc3VjY2Vzc2Z1bCBvciBhIG1lc3NhZ2UgaWYgZmFpbGVkXG4gICAgICovXG4gICAgdmFsaWRhdGUoaWQgOiBzdHJpbmcsIHBhcmFtcyA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBwYXJhbXMgKVxuICAgICAgICAudGhlbiggcGFyYW1zID0+IHtcblxuICAgICAgICAgICAgaWYoIXBhcmFtcykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBwYXJhbWV0ZXJzIHRvIHVzZSBpbiBsYXllciB2YWxpZGF0aW9uXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL3ZhbGlkYXRlJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBwYXJhbXM6cGFyYW1zLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgdmFsaWRhdGluZyBsYXllciByZXF1ZXN0OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0xheWVyU2VydmljZS5kZXNjcmliZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExheWVyU2VydmljZTtcbiJdfQ==