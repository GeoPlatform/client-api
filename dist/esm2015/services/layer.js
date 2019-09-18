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
        return Promise.resolve(id)
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
        return Promise.resolve(id)
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
        return Promise.resolve(req)
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
        return Promise.resolve(params)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxXQUFXLE1BQU0sUUFBUSxDQUFDO0FBR2pDOzs7Ozs7R0FNRztBQUVILE1BQU0sWUFBYSxTQUFRLFdBQVc7SUFFbEMsWUFBWSxHQUFZLEVBQUUsVUFBeUI7UUFDL0MsS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQWdCO1FBQ25CLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsYUFBYSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsS0FBSyxDQUFFLEVBQVcsRUFBRSxHQUFHLElBQUk7UUFDdkIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFFLEVBQUUsQ0FBRTthQUMzQixJQUFJLENBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUVWLElBQUksT0FBTyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQy9CLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUM7WUFFN0MsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRSxFQUFFLG9CQUFvQjtnQkFDOUQsR0FBRyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBb0IsRUFBRTtnQkFDNUMsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQVks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QU0sRUFBRTtnQkFDUixNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7YUFDekU7WUFFRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsV0FBVyxDQUFDO1lBQ2hELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3pCLE1BQU0sRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxPQUFPO2FBQ3hELENBQUMsQ0FBQztZQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDUCxJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUQsTUFBTSxHQUFHLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FFSjtBQUVELGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCBJdGVtU2VydmljZSBmcm9tICcuL2l0ZW0nO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5cbi8qKlxuICogR2VvUGxhdGZvcm0gTWFwIHNlcnZpY2VcbiAqIHNlcnZpY2UgZm9yIHdvcmtpbmcgd2l0aCB0aGUgR2VvUGxhdGZvcm0gQVBJIHRvXG4gKiByZXRyaWV2ZSBhbmQgbWFuaXB1bGF0ZSBtYXAgb2JqZWN0cy5cbiAqXG4gKiBAc2VlIEdlb1BsYXRmb3JtLkl0ZW1TZXJ2aWNlXG4gKi9cblxuY2xhc3MgTGF5ZXJTZXJ2aWNlIGV4dGVuZHMgSXRlbVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmwgOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIuc2V0VXJsKGJhc2VVcmwpO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvbGF5ZXJzJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaCBhIHN0eWxlIGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIEdlb1BsYXRmb3JtIExheWVyIGFzc2V0LiBUaGlzIG1heVxuICAgICAqIGJlIHRoZSBzdHlsZSBmb3IgYW4gRXNyaSBGZWF0dXJlU2VydmVyIGxheWVyIHVzaW5nIHRoZSBmb2xsb3dpbmc6XG4gICAgICpcbiAgICAgKiAgIC5zdHlsZSggbGF5ZXJJZCwgb3B0aW9ucyk7XG4gICAgICpcbiAgICAgKiBvciBhIHNwZWNpZmljIHN0eWxlIGRlZmluaXRpb24gZm9yIGEgbm9uLUVzcmkgbGF5ZXIgdXNpbmcgdGhlIGZvbGxvd2luZyBjYWxsOlxuICAgICAqXG4gICAgICogICAuc3R5bGUoIGxheWVySWQsIHN0eWxlSWQsIG9wdGlvbnMpO1xuICAgICAqXG4gICAgICogQHBhcmFtIGlkIC0gR2VvUGxhdGZvcm0gTGF5ZXIgaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc3R5bGUgSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBzdHlsZSAoaWQgOiBzdHJpbmcsIC4uLmFyZ3MpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggaWQgKVxuICAgICAgICAudGhlbiggKGlkKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBvcHRpb25zID0geyBwYXJhbXM6IG51bGwgfTtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvc3R5bGUnO1xuXG4gICAgICAgICAgICBpZihhcmdzWzBdICYmIHR5cGVvZihhcmdzWzBdKSA9PT0gJ3N0cmluZycpIHsgLy9zdHlsZSBpZCBwYXJhbWV0ZXJcbiAgICAgICAgICAgICAgICB1cmwgKz0gJ3MvJyArIGFyZ3NbMF07ICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIGlmKGFyZ3NbMV0pIG9wdGlvbnMucGFyYW1zID0gYXJnc1sxXTsgICAgICAgICAgICAvLyAuLi4gcGx1cyBvcHRpb25zIHBhcmFtZXRlclxuXG4gICAgICAgICAgICB9IGVsc2UgaWYoYXJnc1swXSAmJiB0eXBlb2YoYXJnc1swXSkgPT09ICdvYmplY3QnKSB7IC8vb3B0aW9ucyBwYXJhbWV0ZXJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnBhcmFtcyA9IGFyZ3NbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3QoeyBtZXRob2Q6XCJHRVRcIiwgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3R5bGU6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignTGF5ZXJTZXJ2aWNlLnN0eWxlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaCB0aGUgbGlzdCBvZiBzdHlsZXMgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4gR2VvUGxhdGZvcm0gTGF5ZXIgYXNzZXRcbiAgICAgKiBAcGFyYW0gaWQgLSBHZW9QbGF0Zm9ybSBMYXllciBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzdHlsZSBKU09OIG9iamVjdFxuICAgICAqL1xuICAgIHN0eWxlcyAoIGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSApIDogUHJvbWlzZTxhbnlbXT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBpZCApXG4gICAgICAgIC50aGVuKCAoaWQpID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvc3R5bGVzJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3QoeyBtZXRob2Q6XCJHRVRcIiwgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3R5bGU6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignTGF5ZXJTZXJ2aWNlLnN0eWxlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIEdlb1BsYXRmb3JtIExheWVyIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0gcmVxIGlkZW50aWZ5aW5nIGV4dGVudCwgeCwgeVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgZmVhdHVyZSBKU09OIG9iamVjdFxuICAgICAqL1xuICAgIGRlc2NyaWJlKCBpZCA6IHN0cmluZywgcmVxIDogYW55LCBvcHRpb25zID86IGFueSApIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCByZXEgKVxuICAgICAgICAudGhlbiggKHJlcSkgPT4ge1xuXG4gICAgICAgICAgICBpZighcmVxKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGRlc2NyaWJlIHBhcmFtZXRlcnMgdG8gdXNlXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQga2V5cyA9IFsnYmJveCcsICdoZWlnaHQnLCAnd2lkdGgnLCAneCcsICd5J107XG4gICAgICAgICAgICBsZXQgbWlzc2luZyA9IGtleXMuZmluZChrZXkgPT4gIXJlcVtrZXldKTtcbiAgICAgICAgICAgIGlmKG1pc3NpbmcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE11c3Qgc3BlY2lmeSAke21pc3Npbmd9IGluIGRlc2NyaWJlIHJlcWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIHNycyAgICAgICAgIDogJ0VQU0c6NDMyNicsXG4gICAgICAgICAgICAgICAgYmJveCAgICAgICAgOiByZXEuYmJveCxcbiAgICAgICAgICAgICAgICBoZWlnaHQgICAgICA6IHJlcS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgd2lkdGggICAgICAgOiByZXEud2lkdGgsXG4gICAgICAgICAgICAgICAgaW5mb19mb3JtYXQgOiAndGV4dC94bWwnLFxuICAgICAgICAgICAgICAgIHggICAgICAgICAgIDogcmVxLngsXG4gICAgICAgICAgICAgICAgeSAgICAgICAgICAgOiByZXEueSxcbiAgICAgICAgICAgICAgICBpICAgICAgICAgICA6IHJlcS54LCAvL1dNUyAxLjMuMFxuICAgICAgICAgICAgICAgIGogICAgICAgICAgIDogcmVxLnkgIC8vV01TIDEuMy4wXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL2Rlc2NyaWJlJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBwYXJhbXM6cGFyYW1zLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZGVzY3JpYmluZyBsYXllciBmZWF0dXJlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0xheWVyU2VydmljZS5kZXNjcmliZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gR2VvUGxhdGZvcm0gTGF5ZXIgaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSBwYXJhbXMgZGVzY3JpYmluZyBsYXllciByZXF1ZXN0IHRvIHZhbGlkYXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBlbXB0eSBpZiBzdWNjZXNzZnVsIG9yIGEgbWVzc2FnZSBpZiBmYWlsZWRcbiAgICAgKi9cbiAgICB2YWxpZGF0ZShpZCA6IHN0cmluZywgcGFyYW1zIDogYW55LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHBhcmFtcyApXG4gICAgICAgIC50aGVuKCBwYXJhbXMgPT4ge1xuXG4gICAgICAgICAgICBpZighcGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIHBhcmFtZXRlcnMgdG8gdXNlIGluIGxheWVyIHZhbGlkYXRpb25cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvdmFsaWRhdGUnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIHBhcmFtczpwYXJhbXMsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciB2YWxpZGF0aW5nIGxheWVyIHJlcXVlc3Q6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignTGF5ZXJTZXJ2aWNlLmRlc2NyaWJlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJTZXJ2aWNlO1xuIl19