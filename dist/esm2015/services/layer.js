/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from 'q';
import ItemService from './item';
/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
class LayerService extends ItemService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/layers';
    }
    /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving style JSON object
     */
    style(id, options) {
        return Q.resolve(id)
            .then((id) => {
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/style';
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: url, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error fetching style: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.style() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?} req identifying extent, x, y
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving feature JSON object
     */
    describe(id, req, options) {
        return Q.resolve(req)
            .then((req) => {
            if (!req) {
                throw new Error("Must provide describe parameters to use");
            }
            /** @type {?} */
            let keys = ['bbox', 'height', 'width', 'x', 'y'];
            /** @type {?} */
            let missing = keys.find(key => !req[key]);
            if (missing) {
                throw new Error(`Must specify ${missing} in describe req`);
            }
            /** @type {?} */
            let params = {
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
            let url = this.baseUrl + '/' + id + '/describe';
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error describing layer feature: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.describe() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?} params describing layer request to validate
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving empty if successful or a message if failed
     */
    validate(id, params, options) {
        return Q.resolve(params)
            .then(params => {
            if (!params) {
                throw new Error("Must provide parameters to use in layer validation");
            }
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/validate';
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error validating layer request: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.describe() - ' + err.message);
            return Q.reject(err);
        });
    }
}
export default LayerService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO0FBQ3ZCLE9BQU8sV0FBVyxNQUFNLFFBQVEsQ0FBQzs7Ozs7Ozs7QUFXakMsa0JBQW1CLFNBQVEsV0FBVzs7Ozs7SUFFbEMsWUFBWSxHQUFZLEVBQUUsVUFBeUI7UUFDL0MsS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUMxQjs7Ozs7SUFFRCxNQUFNLENBQUMsT0FBZ0I7UUFDbkIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxhQUFhLENBQUM7S0FDMUM7Ozs7OztJQU9ELEtBQUssQ0FBRSxFQUFXLEVBQUUsT0FBYztRQUM5QixPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUUsRUFBRSxDQUFFO2FBQ3JCLElBQUksQ0FBRSxDQUFDLEVBQUUsRUFBRSxFQUFFOztZQUVWLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUM7O1lBQzdDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3pCLE1BQU0sRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUMsT0FBTzthQUN6QyxDQUFDLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0IsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTs7WUFDUCxJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDMUQsTUFBTSxDQUFD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LEVBQUUsR0FBRyxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxPQUFPO2FBQ3hELENBQUMsQ0FBQztZQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QixDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFOztZQUNQLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLDRCQUE0QixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEIsQ0FBQyxDQUFDO0tBQ047Q0FFSjtBQUVELGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XG5pbXBvcnQgSXRlbVNlcnZpY2UgZnJvbSAnLi9pdGVtJztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuXG4vKipcbiAqIEdlb1BsYXRmb3JtIE1hcCBzZXJ2aWNlXG4gKiBzZXJ2aWNlIGZvciB3b3JraW5nIHdpdGggdGhlIEdlb1BsYXRmb3JtIEFQSSB0b1xuICogcmV0cmlldmUgYW5kIG1hbmlwdWxhdGUgbWFwIG9iamVjdHMuXG4gKlxuICogQHNlZSBHZW9QbGF0Zm9ybS5JdGVtU2VydmljZVxuICovXG5cbmNsYXNzIExheWVyU2VydmljZSBleHRlbmRzIEl0ZW1TZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcih1cmwsIGh0dHBDbGllbnQpO1xuICAgIH1cblxuICAgIHNldFVybChiYXNlVXJsIDogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyLnNldFVybChiYXNlVXJsKTtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybCArICcvYXBpL2xheWVycyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gR2VvUGxhdGZvcm0gTGF5ZXIgaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc3R5bGUgSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBzdHlsZSAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggaWQgKVxuICAgICAgICAudGhlbiggKGlkKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvc3R5bGUnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyBzdHlsZTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdMYXllclNlcnZpY2Uuc3R5bGUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gR2VvUGxhdGZvcm0gTGF5ZXIgaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSByZXEgaWRlbnRpZnlpbmcgZXh0ZW50LCB4LCB5XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBmZWF0dXJlIEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgZGVzY3JpYmUoIGlkIDogc3RyaW5nLCByZXEgOiBhbnksIG9wdGlvbnMgPzogYW55ICkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggcmVxIClcbiAgICAgICAgLnRoZW4oIChyZXEpID0+IHtcblxuICAgICAgICAgICAgaWYoIXJlcSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBkZXNjcmliZSBwYXJhbWV0ZXJzIHRvIHVzZVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGtleXMgPSBbJ2Jib3gnLCAnaGVpZ2h0JywgJ3dpZHRoJywgJ3gnLCAneSddO1xuICAgICAgICAgICAgbGV0IG1pc3NpbmcgPSBrZXlzLmZpbmQoa2V5ID0+ICFyZXFba2V5XSk7XG4gICAgICAgICAgICBpZihtaXNzaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdXN0IHNwZWNpZnkgJHttaXNzaW5nfSBpbiBkZXNjcmliZSByZXFgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBzcnMgICAgICAgICA6ICdFUFNHOjQzMjYnLFxuICAgICAgICAgICAgICAgIGJib3ggICAgICAgIDogcmVxLmJib3gsXG4gICAgICAgICAgICAgICAgaGVpZ2h0ICAgICAgOiByZXEuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHdpZHRoICAgICAgIDogcmVxLndpZHRoLFxuICAgICAgICAgICAgICAgIGluZm9fZm9ybWF0IDogJ3RleHQveG1sJyxcbiAgICAgICAgICAgICAgICB4ICAgICAgICAgICA6IHJlcS54LFxuICAgICAgICAgICAgICAgIHkgICAgICAgICAgIDogcmVxLnksXG4gICAgICAgICAgICAgICAgaSAgICAgICAgICAgOiByZXEueCwgLy9XTVMgMS4zLjBcbiAgICAgICAgICAgICAgICBqICAgICAgICAgICA6IHJlcS55ICAvL1dNUyAxLjMuMFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy9kZXNjcmliZSc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnVybCwgcGFyYW1zOnBhcmFtcywgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGRlc2NyaWJpbmcgbGF5ZXIgZmVhdHVyZTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdMYXllclNlcnZpY2UuZGVzY3JpYmUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gR2VvUGxhdGZvcm0gTGF5ZXIgaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSBwYXJhbXMgZGVzY3JpYmluZyBsYXllciByZXF1ZXN0IHRvIHZhbGlkYXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBlbXB0eSBpZiBzdWNjZXNzZnVsIG9yIGEgbWVzc2FnZSBpZiBmYWlsZWRcbiAgICAgKi9cbiAgICB2YWxpZGF0ZShpZCA6IHN0cmluZywgcGFyYW1zIDogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggcGFyYW1zIClcbiAgICAgICAgLnRoZW4oIHBhcmFtcyA9PiB7XG5cbiAgICAgICAgICAgIGlmKCFwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgcGFyYW1ldGVycyB0byB1c2UgaW4gbGF5ZXIgdmFsaWRhdGlvblwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy92YWxpZGF0ZSc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnVybCwgcGFyYW1zOnBhcmFtcywgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHZhbGlkYXRpbmcgbGF5ZXIgcmVxdWVzdDogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdMYXllclNlcnZpY2UuZGVzY3JpYmUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExheWVyU2VydmljZTtcbiJdfQ==