import * as tslib_1 from "tslib";
import BaseService from './base';
var UtilsService = /** @class */ (function (_super) {
    tslib_1.__extends(UtilsService, _super);
    function UtilsService(url, httpClient) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.setTimeout(30000);
        return _this;
    }
    UtilsService.prototype.setUrl = function (baseUrl) {
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl;
    };
    /**
     * @param property - optional capa property to specifically request
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving capabilities object
     */
    UtilsService.prototype.capabilities = function (property, query, options) {
        var _this = this;
        var url = this.baseUrl + '/api/capabilities';
        if (property)
            url += '/' + property;
        return this.createAndResolvePromise(url)
            .then(function (url) {
            var opts = _this.buildRequest({
                method: "GET", url: url, params: query || {}, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
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
    UtilsService.prototype.parseFile = function (file, format, options) {
        var _this = this;
        var url = this.baseUrl + '/api/utils/parse';
        return this.createAndResolvePromise(url)
            .then(function (url) {
            var opts = _this.buildRequest({
                method: "POST", url: url,
                data: { format: format },
                file: file,
                formData: true,
                options: options
            });
            return _this.execute(opts);
        })
            .then(function (response) { return response; })
            .catch(function (e) {
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
    UtilsService.prototype.locate = function (value, options) {
        var _this = this;
        var url = this.baseUrl + '/api/utils/gazetteer';
        return this.createAndResolvePromise(url)
            .then(function (url) {
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
            var err = new Error("Error resolving location: " + e.message);
            Object.assign(err, e);
            _this.logError('UtilsService.locate() - ' + err.message);
            throw err;
        });
    };
    /**
     * Upload a file to store within the GeoPlatform for association with
     * one or more portfolio Assets.
     *
     * @param file File to store
     * @param format string media type of the file being stored
     * @param options optional
     * @return Promise resolving metadata for stored content
     */
    UtilsService.prototype.store = function (file, format, options) {
        var _this = this;
        var url = this.baseUrl + '/api/store';
        return this.createAndResolvePromise(url)
            .then(function (url) {
            var opts = _this.buildRequest({
                method: "POST",
                url: url,
                data: { format: format },
                file: file,
                formData: true,
                options: options
            });
            return _this.execute(opts);
        })
            .then(function (response) { return response; })
            .catch(function (e) {
            var err = new Error("Error uploading file for storage: " + e.message);
            Object.assign(err, e);
            _this.logError('UtilsService.store() - ' + err.message);
            throw err;
        });
    };
    return UtilsService;
}(BaseService));
export default UtilsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE9BQU8sV0FBVyxNQUFNLFFBQVEsQ0FBQztBQUdqQztJQUEyQix3Q0FBVztJQUVsQyxzQkFBWSxHQUFZLEVBQUUsVUFBeUI7UUFBbkQsWUFDSSxrQkFBTSxHQUFHLEVBQUUsVUFBVSxDQUFDLFNBRXpCO1FBREcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7SUFDM0IsQ0FBQztJQUVELDZCQUFNLEdBQU4sVUFBTyxPQUFnQjtRQUNuQixpQkFBTSxNQUFNLFlBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsbUNBQVksR0FBWixVQUFjLFFBQXNCLEVBQUUsS0FBVyxFQUFFLE9BQWM7UUFBakUsaUJBbUJDO1FBakJHLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDN0MsSUFBRyxRQUFRO1lBQ1AsR0FBRyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUM7UUFFMUIsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUUsR0FBRyxDQUFFO2FBQ3pDLElBQUksQ0FBRSxVQUFDLEdBQUc7WUFDUCxJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN6QixNQUFNLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFDLEtBQUssSUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFDLE9BQU87YUFDM0QsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLENBQUM7WUFDSixJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxpQ0FBK0IsQ0FBQyxDQUFDLE9BQVMsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxRQUFRLENBQUMsZ0NBQWdDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlELE1BQU0sR0FBRyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxnQ0FBUyxHQUFULFVBQVcsSUFBVSxFQUFFLE1BQWUsRUFBRSxPQUFjO1FBQXRELGlCQXVCQztRQXJCRyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBRTVDLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFFLEdBQUcsQ0FBRTthQUN6QyxJQUFJLENBQUUsVUFBQSxHQUFHO1lBRU4sSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTSxFQUFDLE1BQU0sRUFBRyxHQUFHLEVBQUMsR0FBRztnQkFDdkIsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtnQkFDeEIsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLE9BQU87YUFDbkIsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQzthQUNELElBQUksQ0FBRSxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsRUFBUixDQUFRLENBQUU7YUFDNUIsS0FBSyxDQUFDLFVBQUEsQ0FBQztZQUNKLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLHlCQUF1QixDQUFDLENBQUMsT0FBUyxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyw2QkFBNkIsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0QsTUFBTSxHQUFHLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRDs7Ozs7T0FLRztJQUNILDZCQUFNLEdBQU4sVUFBTyxLQUFXLEVBQUUsT0FBYztRQUFsQyxpQkFvQkM7UUFsQkcsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUM7YUFDdkMsSUFBSSxDQUFFLFVBQUEsR0FBRztZQUNOLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3pCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLEdBQUcsRUFBRSxHQUFHO2dCQUNSLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7Z0JBQzNCLE9BQU8sRUFBRSxPQUFPO2FBQ25CLENBQUMsQ0FBQztZQUNILE9BQU8sS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLEVBQVIsQ0FBUSxDQUFDO2FBQzFCLEtBQUssQ0FBQyxVQUFBLENBQUM7WUFDSixJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQywrQkFBNkIsQ0FBQyxDQUFDLE9BQVMsQ0FBQyxDQUFDO1lBQzlELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hELE1BQU0sR0FBRyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0Q7Ozs7Ozs7O09BUUc7SUFDSCw0QkFBSyxHQUFMLFVBQU8sSUFBVSxFQUFFLE1BQWUsRUFBRSxPQUFjO1FBQWxELGlCQXdCQztRQXRCRyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUV0QyxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBRSxHQUFHLENBQUU7YUFDekMsSUFBSSxDQUFFLFVBQUEsR0FBRztZQUVOLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3pCLE1BQU0sRUFBQyxNQUFNO2dCQUNiLEdBQUcsRUFBQyxHQUFHO2dCQUNQLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7Z0JBQ3hCLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxPQUFPO2FBQ25CLENBQUMsQ0FBQztZQUNILE9BQU8sS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUM7YUFDRCxJQUFJLENBQUUsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLEVBQVIsQ0FBUSxDQUFFO2FBQzVCLEtBQUssQ0FBQyxVQUFBLENBQUM7WUFDSixJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyx1Q0FBcUMsQ0FBQyxDQUFDLE9BQVMsQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxRQUFRLENBQUMseUJBQXlCLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sR0FBRyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQUFDLEFBdklELENBQTJCLFdBQVcsR0F1SXJDO0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vc2hhcmVkL2NvbmZpZyc7XG5pbXBvcnQgR1BIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvY2xpZW50JztcbmltcG9ydCBCYXNlU2VydmljZSBmcm9tICcuL2Jhc2UnO1xuXG5cbmNsYXNzIFV0aWxzU2VydmljZSBleHRlbmRzIEJhc2VTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcih1cmwsIGh0dHBDbGllbnQpO1xuICAgICAgICB0aGlzLnNldFRpbWVvdXQoMzAwMDApO1xuICAgIH1cblxuICAgIHNldFVybChiYXNlVXJsIDogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyLnNldFVybChiYXNlVXJsKTtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgLSBvcHRpb25hbCBjYXBhIHByb3BlcnR5IHRvIHNwZWNpZmljYWxseSByZXF1ZXN0XG4gICAgICogQHBhcmFtIHF1ZXJ5IC0gb3B0aW9uYWwgcXVlcnkgcGFyYW1ldGVycyB0byBpbmNsdWRlIHdpdGggcmVxdWVzdFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgY29uZmlnIHRvIHNlbmQgd2l0aCBodHRwIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGNhcGFiaWxpdGllcyBvYmplY3RcbiAgICAgKi9cbiAgICBjYXBhYmlsaXRpZXMgKHByb3BlcnR5IDogc3RyaW5nfG51bGwsIHF1ZXJ5IDogYW55LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2FwaS9jYXBhYmlsaXRpZXMnO1xuICAgICAgICBpZihwcm9wZXJ0eSlcbiAgICAgICAgICAgIHVybCArPSAnLycgKyBwcm9wZXJ0eTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdXJsIClcbiAgICAgICAgLnRoZW4oICh1cmwpID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBwYXJhbXM6cXVlcnl8fHt9LCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZ2V0dGluZyBjYXBhYmlsaXRpZXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignVXRpbHNTZXJ2aWNlLmNhcGFiaWxpdGllcygpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGZpbGVcbiAgICAgKiBAcGFyYW0gZm9ybWF0XG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKi9cbiAgICBwYXJzZUZpbGUgKGZpbGUgOiBhbnksIGZvcm1hdCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICB2YXIgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9hcGkvdXRpbHMvcGFyc2UnO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCB1cmwgKVxuICAgICAgICAudGhlbiggdXJsID0+IHtcblxuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiUE9TVFwiLCAgdXJsOnVybCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7IGZvcm1hdDogZm9ybWF0IH0sXG4gICAgICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgICAgICBmb3JtRGF0YTogdHJ1ZSwgICAvL05vZGVKUyAoUmVxdWVzdEpTKVxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oIHJlc3BvbnNlID0+IHJlc3BvbnNlIClcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgcGFyc2luZyBmaWxlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1V0aWxzU2VydmljZS5wYXJzZUZpbGUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2VvbG9jYXRlIHRoZSBzcGVjaWZpZWQgYXJndW1lbnQgdG8gYSBzZXQgb2YgY2FuZGlkYXRlIGxvY2F0aW9ucy5cbiAgICAgKiBAcGFyYW0gdmFsdWUgLSB0ZXh0IHN0cmluZyB0byBnZW9sb2NhdGUgKG5hbWUgb3IgbGF0LGxuZylcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIGNvbmZpZyB0byBzZW5kIHdpdGggaHR0cCByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBhbiBhcnJheSBvZiBnZW9jb2RlZCByZXN1bHRzXG4gICAgICovXG4gICAgbG9jYXRlKHZhbHVlIDogYW55LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2FwaS91dGlscy9nYXpldHRlZXInO1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSh1cmwpXG4gICAgICAgIC50aGVuKCB1cmwgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHsgbG9jYXRpb246IHZhbHVlIH0sXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgcmVzb2x2aW5nIGxvY2F0aW9uOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1V0aWxzU2VydmljZS5sb2NhdGUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVXBsb2FkIGEgZmlsZSB0byBzdG9yZSB3aXRoaW4gdGhlIEdlb1BsYXRmb3JtIGZvciBhc3NvY2lhdGlvbiB3aXRoXG4gICAgICogb25lIG9yIG1vcmUgcG9ydGZvbGlvIEFzc2V0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmaWxlIEZpbGUgdG8gc3RvcmVcbiAgICAgKiBAcGFyYW0gZm9ybWF0IHN0cmluZyBtZWRpYSB0eXBlIG9mIHRoZSBmaWxlIGJlaW5nIHN0b3JlZFxuICAgICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbmFsXG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBtZXRhZGF0YSBmb3Igc3RvcmVkIGNvbnRlbnRcbiAgICAgKi9cbiAgICBzdG9yZSAoZmlsZSA6IGFueSwgZm9ybWF0IDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2FwaS9zdG9yZSc7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHVybCApXG4gICAgICAgIC50aGVuKCB1cmwgPT4ge1xuXG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgdXJsOnVybCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7IGZvcm1hdDogZm9ybWF0IH0sXG4gICAgICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgICAgICBmb3JtRGF0YTogdHJ1ZSwgICAvL05vZGVKUyAoUmVxdWVzdEpTKVxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oIHJlc3BvbnNlID0+IHJlc3BvbnNlIClcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgdXBsb2FkaW5nIGZpbGUgZm9yIHN0b3JhZ2U6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignVXRpbHNTZXJ2aWNlLnN0b3JlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVXRpbHNTZXJ2aWNlO1xuIl19