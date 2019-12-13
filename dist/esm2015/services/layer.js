import ItemService from './item';
/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
class LayerService extends ItemService {
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/layers';
    }
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
    style(id, ...args) {
        return this.createAndResolvePromise(id)
            .then((id) => {
            let options = { params: null };
            let url = this.baseUrl + '/' + id + '/style';
            if (args[0] && typeof (args[0]) === 'string') { //style id parameter
                url += 's/' + args[0]; //
                if (args[1])
                    options.params = args[1]; // ... plus options parameter
            }
            else if (args[0] && typeof (args[0]) === 'object') { //options parameter
                options.params = args[0];
            }
            let opts = this.buildRequest({ method: "GET", url: url, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error fetching style: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.style() - ' + err.message);
            throw err;
        });
    }
    /**
     * Fetch the list of styles associated with a given GeoPlatform Layer asset
     * @param id - GeoPlatform Layer identifier
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving style JSON object
     */
    styles(id, options) {
        return this.createAndResolvePromise(id)
            .then((id) => {
            let url = this.baseUrl + '/' + id + '/styles';
            let opts = this.buildRequest({ method: "GET", url: url, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error fetching style: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.style() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - GeoPlatform Layer identifier
     * @param req identifying extent, x, y
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving feature JSON object
     */
    describe(id, req, options) {
        return this.createAndResolvePromise(req)
            .then((req) => {
            if (!req) {
                throw new Error("Must provide describe parameters to use");
            }
            let keys = ['bbox', 'height', 'width', 'x', 'y'];
            let missing = keys.find(key => !req[key]);
            if (missing) {
                throw new Error(`Must specify ${missing} in describe req`);
            }
            let params = {
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
            let url = this.baseUrl + '/' + id + '/describe';
            let opts = this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error describing layer feature: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.describe() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - GeoPlatform Layer identifier
     * @param params describing layer request to validate
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving empty if successful or a message if failed
     */
    validate(id, params, options) {
        return this.createAndResolvePromise(params)
            .then(params => {
            if (!params) {
                throw new Error("Must provide parameters to use in layer validation");
            }
            let url = this.baseUrl + '/' + id + '/validate';
            let opts = this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error validating layer request: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.describe() - ' + err.message);
            throw err;
        });
    }
}
export default LayerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxXQUFXLE1BQU0sUUFBUSxDQUFDO0FBR2pDOzs7Ozs7R0FNRztBQUVILE1BQU0sWUFBYSxTQUFRLFdBQVc7SUFFbEMsWUFBWSxHQUFZLEVBQUUsVUFBeUI7UUFDL0MsS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQWdCO1FBQ25CLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsYUFBYSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsS0FBSyxDQUFFLEVBQVcsRUFBRSxHQUFHLElBQUk7UUFDdkIsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUUsRUFBRSxDQUFFO2FBQ3hDLElBQUksQ0FBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBRVYsSUFBSSxPQUFPLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDL0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLFFBQVEsQ0FBQztZQUU3QyxJQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFLEVBQUUsb0JBQW9CO2dCQUM5RCxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFvQixFQUFFO2dCQUM1QyxJQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQUUsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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LENBQUMsTUFBTSxFQUFFO2dCQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQzthQUN6RTtZQUVELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxXQUFXLENBQUM7WUFDaEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLE9BQU87YUFDeEQsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNQLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLDRCQUE0QixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRCxNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUVKO0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IEl0ZW1TZXJ2aWNlIGZyb20gJy4vaXRlbSc7XG5pbXBvcnQgR1BIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvY2xpZW50JztcblxuLyoqXG4gKiBHZW9QbGF0Zm9ybSBNYXAgc2VydmljZVxuICogc2VydmljZSBmb3Igd29ya2luZyB3aXRoIHRoZSBHZW9QbGF0Zm9ybSBBUEkgdG9cbiAqIHJldHJpZXZlIGFuZCBtYW5pcHVsYXRlIG1hcCBvYmplY3RzLlxuICpcbiAqIEBzZWUgR2VvUGxhdGZvcm0uSXRlbVNlcnZpY2VcbiAqL1xuXG5jbGFzcyBMYXllclNlcnZpY2UgZXh0ZW5kcyBJdGVtU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybCA6IHN0cmluZykge1xuICAgICAgICBzdXBlci5zZXRVcmwoYmFzZVVybCk7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmwgKyAnL2FwaS9sYXllcnMnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZldGNoIGEgc3R5bGUgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4gR2VvUGxhdGZvcm0gTGF5ZXIgYXNzZXQuIFRoaXMgbWF5XG4gICAgICogYmUgdGhlIHN0eWxlIGZvciBhbiBFc3JpIEZlYXR1cmVTZXJ2ZXIgbGF5ZXIgdXNpbmcgdGhlIGZvbGxvd2luZzpcbiAgICAgKlxuICAgICAqICAgLnN0eWxlKCBsYXllcklkLCBvcHRpb25zKTtcbiAgICAgKlxuICAgICAqIG9yIGEgc3BlY2lmaWMgc3R5bGUgZGVmaW5pdGlvbiBmb3IgYSBub24tRXNyaSBsYXllciB1c2luZyB0aGUgZm9sbG93aW5nIGNhbGw6XG4gICAgICpcbiAgICAgKiAgIC5zdHlsZSggbGF5ZXJJZCwgc3R5bGVJZCwgb3B0aW9ucyk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgLSBHZW9QbGF0Zm9ybSBMYXllciBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzdHlsZSBKU09OIG9iamVjdFxuICAgICAqL1xuICAgIHN0eWxlIChpZCA6IHN0cmluZywgLi4uYXJncykgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggaWQgKVxuICAgICAgICAudGhlbiggKGlkKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBvcHRpb25zID0geyBwYXJhbXM6IG51bGwgfTtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvc3R5bGUnO1xuXG4gICAgICAgICAgICBpZihhcmdzWzBdICYmIHR5cGVvZihhcmdzWzBdKSA9PT0gJ3N0cmluZycpIHsgLy9zdHlsZSBpZCBwYXJhbWV0ZXJcbiAgICAgICAgICAgICAgICB1cmwgKz0gJ3MvJyArIGFyZ3NbMF07ICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIGlmKGFyZ3NbMV0pIG9wdGlvbnMucGFyYW1zID0gYXJnc1sxXTsgICAgICAgICAgICAvLyAuLi4gcGx1cyBvcHRpb25zIHBhcmFtZXRlclxuXG4gICAgICAgICAgICB9IGVsc2UgaWYoYXJnc1swXSAmJiB0eXBlb2YoYXJnc1swXSkgPT09ICdvYmplY3QnKSB7IC8vb3B0aW9ucyBwYXJhbWV0ZXJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnBhcmFtcyA9IGFyZ3NbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3QoeyBtZXRob2Q6XCJHRVRcIiwgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3R5bGU6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignTGF5ZXJTZXJ2aWNlLnN0eWxlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaCB0aGUgbGlzdCBvZiBzdHlsZXMgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4gR2VvUGxhdGZvcm0gTGF5ZXIgYXNzZXRcbiAgICAgKiBAcGFyYW0gaWQgLSBHZW9QbGF0Zm9ybSBMYXllciBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzdHlsZSBKU09OIG9iamVjdFxuICAgICAqL1xuICAgIHN0eWxlcyAoIGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSApIDogUHJvbWlzZTxhbnlbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggaWQgKVxuICAgICAgICAudGhlbiggKGlkKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL3N0eWxlcyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHsgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9ucyB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIHN0eWxlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0xheWVyU2VydmljZS5zdHlsZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBHZW9QbGF0Zm9ybSBMYXllciBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIHJlcSBpZGVudGlmeWluZyBleHRlbnQsIHgsIHlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGZlYXR1cmUgSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBkZXNjcmliZSggaWQgOiBzdHJpbmcsIHJlcSA6IGFueSwgb3B0aW9ucyA/OiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHJlcSApXG4gICAgICAgIC50aGVuKCAocmVxKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKCFyZXEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgZGVzY3JpYmUgcGFyYW1ldGVycyB0byB1c2VcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBrZXlzID0gWydiYm94JywgJ2hlaWdodCcsICd3aWR0aCcsICd4JywgJ3knXTtcbiAgICAgICAgICAgIGxldCBtaXNzaW5nID0ga2V5cy5maW5kKGtleSA9PiAhcmVxW2tleV0pO1xuICAgICAgICAgICAgaWYobWlzc2luZykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTXVzdCBzcGVjaWZ5ICR7bWlzc2luZ30gaW4gZGVzY3JpYmUgcmVxYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgc3JzICAgICAgICAgOiAnRVBTRzo0MzI2JyxcbiAgICAgICAgICAgICAgICBiYm94ICAgICAgICA6IHJlcS5iYm94LFxuICAgICAgICAgICAgICAgIGhlaWdodCAgICAgIDogcmVxLmhlaWdodCxcbiAgICAgICAgICAgICAgICB3aWR0aCAgICAgICA6IHJlcS53aWR0aCxcbiAgICAgICAgICAgICAgICBpbmZvX2Zvcm1hdCA6ICd0ZXh0L3htbCcsXG4gICAgICAgICAgICAgICAgeCAgICAgICAgICAgOiByZXEueCxcbiAgICAgICAgICAgICAgICB5ICAgICAgICAgICA6IHJlcS55LFxuICAgICAgICAgICAgICAgIGkgICAgICAgICAgIDogcmVxLngsIC8vV01TIDEuMy4wXG4gICAgICAgICAgICAgICAgaiAgICAgICAgICAgOiByZXEueSAgLy9XTVMgMS4zLjBcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvZGVzY3JpYmUnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIHBhcmFtczpwYXJhbXMsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBkZXNjcmliaW5nIGxheWVyIGZlYXR1cmU6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignTGF5ZXJTZXJ2aWNlLmRlc2NyaWJlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBHZW9QbGF0Zm9ybSBMYXllciBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIHBhcmFtcyBkZXNjcmliaW5nIGxheWVyIHJlcXVlc3QgdG8gdmFsaWRhdGVcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGVtcHR5IGlmIHN1Y2Nlc3NmdWwgb3IgYSBtZXNzYWdlIGlmIGZhaWxlZFxuICAgICAqL1xuICAgIHZhbGlkYXRlKGlkIDogc3RyaW5nLCBwYXJhbXMgOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHBhcmFtcyApXG4gICAgICAgIC50aGVuKCBwYXJhbXMgPT4ge1xuXG4gICAgICAgICAgICBpZighcGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIHBhcmFtZXRlcnMgdG8gdXNlIGluIGxheWVyIHZhbGlkYXRpb25cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvdmFsaWRhdGUnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIHBhcmFtczpwYXJhbXMsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciB2YWxpZGF0aW5nIGxheWVyIHJlcXVlc3Q6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignTGF5ZXJTZXJ2aWNlLmRlc2NyaWJlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJTZXJ2aWNlO1xuIl19