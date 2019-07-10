/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
        return Promise.resolve(id)
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
            throw err;
        });
    }
    /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?} req identifying extent, x, y
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving feature JSON object
     */
    describe(id, req, options) {
        return Promise.resolve(req)
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
            throw err;
        });
    }
    /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?} params describing layer request to validate
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving empty if successful or a message if failed
     */
    validate(id, params, options) {
        return Promise.resolve(params)
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
            throw err;
        });
    }
}
export default LayerService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sV0FBVyxNQUFNLFFBQVEsQ0FBQzs7Ozs7Ozs7QUFXakMsa0JBQW1CLFNBQVEsV0FBVzs7Ozs7SUFFbEMsWUFBWSxHQUFZLEVBQUUsVUFBeUI7UUFDL0MsS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUMxQjs7Ozs7SUFFRCxNQUFNLENBQUMsT0FBZ0I7UUFDbkIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxhQUFhLENBQUM7S0FDMUM7Ozs7OztJQU9ELEtBQUssQ0FBRSxFQUFXLEVBQUUsT0FBYztRQUM5QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUUsRUFBRSxDQUFFO2FBQzNCLElBQUksQ0FBRSxDQUFDLEVBQUUsRUFBRSxFQUFFOztZQUVWLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUM7O1lBQzdDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3pCLE1BQU0sRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUMsT0FBTzthQUN6QyxDQUFDLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0IsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTs7WUFDUCxJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDMUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7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QUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1lBQ1AsSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsNEJBQTRCLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFELE1BQU0sR0FBRyxDQUFDO1NBQ2IsQ0FBQyxDQUFDO0tBQ047Q0FFSjtBQUVELGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCBJdGVtU2VydmljZSBmcm9tICcuL2l0ZW0nO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5cbi8qKlxuICogR2VvUGxhdGZvcm0gTWFwIHNlcnZpY2VcbiAqIHNlcnZpY2UgZm9yIHdvcmtpbmcgd2l0aCB0aGUgR2VvUGxhdGZvcm0gQVBJIHRvXG4gKiByZXRyaWV2ZSBhbmQgbWFuaXB1bGF0ZSBtYXAgb2JqZWN0cy5cbiAqXG4gKiBAc2VlIEdlb1BsYXRmb3JtLkl0ZW1TZXJ2aWNlXG4gKi9cblxuY2xhc3MgTGF5ZXJTZXJ2aWNlIGV4dGVuZHMgSXRlbVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmwgOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIuc2V0VXJsKGJhc2VVcmwpO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvbGF5ZXJzJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBHZW9QbGF0Zm9ybSBMYXllciBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzdHlsZSBKU09OIG9iamVjdFxuICAgICAqL1xuICAgIHN0eWxlIChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggaWQgKVxuICAgICAgICAudGhlbiggKGlkKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvc3R5bGUnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyBzdHlsZTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdMYXllclNlcnZpY2Uuc3R5bGUoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIEdlb1BsYXRmb3JtIExheWVyIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0gcmVxIGlkZW50aWZ5aW5nIGV4dGVudCwgeCwgeVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgZmVhdHVyZSBKU09OIG9iamVjdFxuICAgICAqL1xuICAgIGRlc2NyaWJlKCBpZCA6IHN0cmluZywgcmVxIDogYW55LCBvcHRpb25zID86IGFueSApIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCByZXEgKVxuICAgICAgICAudGhlbiggKHJlcSkgPT4ge1xuXG4gICAgICAgICAgICBpZighcmVxKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGRlc2NyaWJlIHBhcmFtZXRlcnMgdG8gdXNlXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQga2V5cyA9IFsnYmJveCcsICdoZWlnaHQnLCAnd2lkdGgnLCAneCcsICd5J107XG4gICAgICAgICAgICBsZXQgbWlzc2luZyA9IGtleXMuZmluZChrZXkgPT4gIXJlcVtrZXldKTtcbiAgICAgICAgICAgIGlmKG1pc3NpbmcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE11c3Qgc3BlY2lmeSAke21pc3Npbmd9IGluIGRlc2NyaWJlIHJlcWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIHNycyAgICAgICAgIDogJ0VQU0c6NDMyNicsXG4gICAgICAgICAgICAgICAgYmJveCAgICAgICAgOiByZXEuYmJveCxcbiAgICAgICAgICAgICAgICBoZWlnaHQgICAgICA6IHJlcS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgd2lkdGggICAgICAgOiByZXEud2lkdGgsXG4gICAgICAgICAgICAgICAgaW5mb19mb3JtYXQgOiAndGV4dC94bWwnLFxuICAgICAgICAgICAgICAgIHggICAgICAgICAgIDogcmVxLngsXG4gICAgICAgICAgICAgICAgeSAgICAgICAgICAgOiByZXEueSxcbiAgICAgICAgICAgICAgICBpICAgICAgICAgICA6IHJlcS54LCAvL1dNUyAxLjMuMFxuICAgICAgICAgICAgICAgIGogICAgICAgICAgIDogcmVxLnkgIC8vV01TIDEuMy4wXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL2Rlc2NyaWJlJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBwYXJhbXM6cGFyYW1zLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZGVzY3JpYmluZyBsYXllciBmZWF0dXJlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0xheWVyU2VydmljZS5kZXNjcmliZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gR2VvUGxhdGZvcm0gTGF5ZXIgaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSBwYXJhbXMgZGVzY3JpYmluZyBsYXllciByZXF1ZXN0IHRvIHZhbGlkYXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBlbXB0eSBpZiBzdWNjZXNzZnVsIG9yIGEgbWVzc2FnZSBpZiBmYWlsZWRcbiAgICAgKi9cbiAgICB2YWxpZGF0ZShpZCA6IHN0cmluZywgcGFyYW1zIDogYW55LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHBhcmFtcyApXG4gICAgICAgIC50aGVuKCBwYXJhbXMgPT4ge1xuXG4gICAgICAgICAgICBpZighcGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIHBhcmFtZXRlcnMgdG8gdXNlIGluIGxheWVyIHZhbGlkYXRpb25cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvdmFsaWRhdGUnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIHBhcmFtczpwYXJhbXMsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciB2YWxpZGF0aW5nIGxheWVyIHJlcXVlc3Q6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignTGF5ZXJTZXJ2aWNlLmRlc2NyaWJlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJTZXJ2aWNlO1xuIl19