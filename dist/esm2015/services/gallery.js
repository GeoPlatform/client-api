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
class GalleryService extends ItemService {
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
        this.baseUrl = baseUrl + '/api/galleries';
    }
    /**
     * @param {?} galleryId
     * @param {?} itemObj
     * @param {?=} options
     * @return {?}
     */
    addItem(galleryId, itemObj, options) {
        return Q.resolve(true)
            .then(() => {
            /** @type {?} */
            let url = this.baseUrl + '/' + galleryId + '/items';
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'POST', url: url, data: itemObj, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error("Error adding item: " + e.message);
            Object.assign(err, e);
            this.logError('GalleryService.addItem() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} galleryId
     * @param {?} itemId
     * @param {?=} options
     * @return {?}
     */
    removeItem(galleryId, itemId, options) {
        return Q.resolve(this.baseUrl + '/' + galleryId + '/items/' + itemId)
            .then(url => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'DELETE', url: url, options: options
            });
            return this.execute(opts);
        })
            .then(() => true)
            .catch(e => {
            /** @type {?} */
            let err = new Error("Error adding item: " + e.message);
            Object.assign(err, e);
            this.logError('GalleryService.addItem() - ' + err.message);
            return Q.reject(err);
        });
    }
}
export default GalleryService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9nYWxsZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztBQUN2QixPQUFPLFdBQVcsTUFBTSxRQUFRLENBQUM7Ozs7Ozs7O0FBV2pDLG9CQUFxQixTQUFRLFdBQVc7Ozs7O0lBRXBDLFlBQVksR0FBWSxFQUFFLFVBQXlCO1FBQy9DLEtBQUssQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDMUI7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQWdCO1FBQ25CLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7S0FDN0M7Ozs7Ozs7SUFFRCxPQUFPLENBQUUsU0FBa0IsRUFBRSxPQUFhLEVBQUUsT0FBYztRQUN0RCxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUUsSUFBSSxDQUFFO2FBQ3ZCLElBQUksQ0FBRSxHQUFHLEVBQUU7O1lBQ1IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQzs7WUFDcEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTSxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFDLE9BQU87YUFDekQsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1lBQ1AsSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsNkJBQTZCLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QixDQUFDLENBQUM7S0FDTjs7Ozs7OztJQUVELFVBQVUsQ0FBRSxTQUFrQixFQUFFLE1BQVksRUFBRSxPQUFjO1FBQ3hELE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsU0FBUyxHQUFHLE1BQU0sQ0FBRTthQUN0RSxJQUFJLENBQUUsR0FBRyxDQUFDLEVBQUU7O1lBQ1QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBQyxPQUFPO2FBQzVDLENBQUMsQ0FBQztZQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QixDQUFDO2FBQ0QsSUFBSSxDQUFFLEdBQUcsRUFBRSxDQUFBLElBQUksQ0FBQzthQUNoQixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1lBQ1AsSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsNkJBQTZCLEdBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QixDQUFDLENBQUM7S0FDTjtDQUVKO0FBRUQsZUFBZSxjQUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XG5pbXBvcnQgSXRlbVNlcnZpY2UgZnJvbSAnLi9pdGVtJztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuXG4vKipcbiAqIEdlb1BsYXRmb3JtIE1hcCBzZXJ2aWNlXG4gKiBzZXJ2aWNlIGZvciB3b3JraW5nIHdpdGggdGhlIEdlb1BsYXRmb3JtIEFQSSB0b1xuICogcmV0cmlldmUgYW5kIG1hbmlwdWxhdGUgbWFwIG9iamVjdHMuXG4gKlxuICogQHNlZSBHZW9QbGF0Zm9ybS5JdGVtU2VydmljZVxuICovXG5cbmNsYXNzIEdhbGxlcnlTZXJ2aWNlIGV4dGVuZHMgSXRlbVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmwgOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIuc2V0VXJsKGJhc2VVcmwpO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvZ2FsbGVyaWVzJztcbiAgICB9XG5cbiAgICBhZGRJdGVtIChnYWxsZXJ5SWQgOiBzdHJpbmcsIGl0ZW1PYmogOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggdHJ1ZSApXG4gICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgZ2FsbGVyeUlkICsgJy9pdGVtcyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLCB1cmw6dXJsLCBkYXRhOiBpdGVtT2JqLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihcIkVycm9yIGFkZGluZyBpdGVtOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdHYWxsZXJ5U2VydmljZS5hZGRJdGVtKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbW92ZUl0ZW0oIGdhbGxlcnlJZCA6IHN0cmluZywgaXRlbUlkIDogYW55LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHRoaXMuYmFzZVVybCArICcvJyArIGdhbGxlcnlJZCArICcvaXRlbXMvJyArIGl0ZW1JZCApXG4gICAgICAgIC50aGVuKCB1cmwgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOidERUxFVEUnLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oICgpID0+dHJ1ZSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihcIkVycm9yIGFkZGluZyBpdGVtOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdHYWxsZXJ5U2VydmljZS5hZGRJdGVtKCkgLSAnKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbGxlcnlTZXJ2aWNlO1xuIl19