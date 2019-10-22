import * as tslib_1 from "tslib";
import BaseService from './base';
/**
 * GeoPlatform Association service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate association objects.
 *
 * @see GeoPlatform.ItemService
 */
var AssociationService = /** @class */ (function (_super) {
    tslib_1.__extends(AssociationService, _super);
    function AssociationService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    /**
     * @param itemId - identifier of item to fetch associations for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving array of associated items of the item in question
     */
    AssociationService.prototype.search = function (itemId, params, options) {
        var _this = this;
        return this.createAndResolvePromise(itemId)
            .then(function (id) {
            if (!id)
                throw new Error("Must specify a GeoPlatform resource for which to search associations");
            var url = _this.baseUrl + '/' + id + '/associations';
            var opts = _this.buildRequest({
                method: "GET",
                url: url,
                params: params || {},
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error fetching associations for item " + itemId + ": " + e.message);
            Object.assign(err, e);
            _this.logError("AssociationService.search(" + itemId + ") - " + err.message);
            throw err;
        });
    };
    /**
     * @param itemId - identifier of item
     * @param associationId - identifier of association to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving association
     */
    AssociationService.prototype.get = function (itemId, associationId, options) {
        var _this = this;
        return this.createAndResolvePromise(itemId)
            .then(function (itemId) {
            if (!itemId || !associationId)
                throw new Error("Must specify both the GeoPlatform resource id and its association's id");
            var url = _this.baseUrl + '/' + itemId + '/associations/' + associationId;
            var opts = _this.buildRequest({ method: "GET", url: url, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error fetching association for item " + itemId + ": " + e.message);
            Object.assign(err, e);
            _this.logError("AssociationService.get(" + itemId + "," + associationId + ") - " + err.message);
            throw err;
        });
    };
    /**
     * @param itemId - identifier of item
     * @param associationId - identifier of association to remove
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving empty
     */
    AssociationService.prototype.remove = function (itemId, associationId, options) {
        var _this = this;
        return this.createAndResolvePromise(itemId)
            .then(function (itemId) {
            if (!itemId || !associationId)
                throw new Error("Must specify both the GeoPlatform resource id and its association's id");
            var url = _this.baseUrl + '/' + itemId + '/associations/' + associationId;
            var opts = _this.buildRequest({ method: "DELETE", url: url, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error removing association for item " + itemId + ": " + e.message);
            Object.assign(err, e);
            _this.logError("AssociationService.remove(" + itemId + "," + associationId + ") - " + err.message);
            throw err;
        });
    };
    return AssociationService;
}(BaseService));
export default AssociationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzb2NpYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvYXNzb2NpYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE9BQU8sV0FBVyxNQUFNLFFBQVEsQ0FBQztBQUdqQzs7Ozs7O0dBTUc7QUFFSDtJQUFpQyw4Q0FBVztJQUV4Qyw0QkFBWSxHQUFVLEVBQUUsVUFBdUI7ZUFDM0Msa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQztJQUMxQixDQUFDO0lBR0Q7Ozs7T0FJRztJQUNILG1DQUFNLEdBQU4sVUFBUSxNQUFlLEVBQUUsTUFBYSxFQUFFLE9BQWM7UUFBdEQsaUJBc0JDO1FBcEJHLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFFLE1BQU0sQ0FBRTthQUM1QyxJQUFJLENBQUUsVUFBQSxFQUFFO1lBRUwsSUFBRyxDQUFDLEVBQUU7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO1lBRWhHLElBQUksR0FBRyxHQUFHLEtBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxlQUFlLENBQUM7WUFDcEQsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTSxFQUFDLEtBQUs7Z0JBQ1osR0FBRyxFQUFDLEdBQUc7Z0JBQ1AsTUFBTSxFQUFFLE1BQU0sSUFBSSxFQUFFO2dCQUNwQixPQUFPLEVBQUUsT0FBTzthQUNuQixDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsQ0FBQztZQUNKLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLDBDQUF3QyxNQUFNLFVBQUssQ0FBQyxDQUFDLE9BQVMsQ0FBQyxDQUFDO1lBQ3BGLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFF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SHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5cbi8qKlxuICogR2VvUGxhdGZvcm0gQXNzb2NpYXRpb24gc2VydmljZVxuICogc2VydmljZSBmb3Igd29ya2luZyB3aXRoIHRoZSBHZW9QbGF0Zm9ybSBBUEkgdG9cbiAqIHJldHJpZXZlIGFuZCBtYW5pcHVsYXRlIGFzc29jaWF0aW9uIG9iamVjdHMuXG4gKlxuICogQHNlZSBHZW9QbGF0Zm9ybS5JdGVtU2VydmljZVxuICovXG5cbmNsYXNzIEFzc29jaWF0aW9uU2VydmljZSBleHRlbmRzIEJhc2VTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHVybDpzdHJpbmcsIGh0dHBDbGllbnQ6R1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaXRlbUlkIC0gaWRlbnRpZmllciBvZiBpdGVtIHRvIGZldGNoIGFzc29jaWF0aW9ucyBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGFycmF5IG9mIGFzc29jaWF0ZWQgaXRlbXMgb2YgdGhlIGl0ZW0gaW4gcXVlc3Rpb25cbiAgICAgKi9cbiAgICBzZWFyY2ggKGl0ZW1JZCA6IHN0cmluZywgcGFyYW1zID86IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggaXRlbUlkIClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcblxuICAgICAgICAgICAgaWYoIWlkKSB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHNwZWNpZnkgYSBHZW9QbGF0Zm9ybSByZXNvdXJjZSBmb3Igd2hpY2ggdG8gc2VhcmNoIGFzc29jaWF0aW9uc1wiKTtcblxuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy9hc3NvY2lhdGlvbnMnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOnVybCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyB8fCB7fSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIGFzc29jaWF0aW9ucyBmb3IgaXRlbSAke2l0ZW1JZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcihgQXNzb2NpYXRpb25TZXJ2aWNlLnNlYXJjaCgke2l0ZW1JZH0pIC0gJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGl0ZW1JZCAtIGlkZW50aWZpZXIgb2YgaXRlbVxuICAgICAqIEBwYXJhbSBhc3NvY2lhdGlvbklkIC0gaWRlbnRpZmllciBvZiBhc3NvY2lhdGlvbiB0byBmZXRjaFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgYXNzb2NpYXRpb25cbiAgICAgKi9cbiAgICBnZXQgKGl0ZW1JZCA6IHN0cmluZywgYXNzb2NpYXRpb25JZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggaXRlbUlkIClcbiAgICAgICAgLnRoZW4oIGl0ZW1JZCA9PiB7XG5cbiAgICAgICAgICAgIGlmKCFpdGVtSWQgfHwgIWFzc29jaWF0aW9uSWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBzcGVjaWZ5IGJvdGggdGhlIEdlb1BsYXRmb3JtIHJlc291cmNlIGlkIGFuZCBpdHMgYXNzb2NpYXRpb24ncyBpZFwiKTtcblxuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGl0ZW1JZCArICcvYXNzb2NpYXRpb25zLycgKyBhc3NvY2lhdGlvbklkO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7IG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBvcHRpb25zOiBvcHRpb25zIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZmV0Y2hpbmcgYXNzb2NpYXRpb24gZm9yIGl0ZW0gJHtpdGVtSWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoYEFzc29jaWF0aW9uU2VydmljZS5nZXQoJHtpdGVtSWR9LCR7YXNzb2NpYXRpb25JZH0pIC0gJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGl0ZW1JZCAtIGlkZW50aWZpZXIgb2YgaXRlbVxuICAgICAqIEBwYXJhbSBhc3NvY2lhdGlvbklkIC0gaWRlbnRpZmllciBvZiBhc3NvY2lhdGlvbiB0byByZW1vdmVcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGVtcHR5XG4gICAgICovXG4gICAgcmVtb3ZlIChpdGVtSWQgOiBzdHJpbmcsIGFzc29jaWF0aW9uSWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIGl0ZW1JZCApXG4gICAgICAgIC50aGVuKCBpdGVtSWQgPT4ge1xuXG4gICAgICAgICAgICBpZighaXRlbUlkIHx8ICFhc3NvY2lhdGlvbklkKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3Qgc3BlY2lmeSBib3RoIHRoZSBHZW9QbGF0Zm9ybSByZXNvdXJjZSBpZCBhbmQgaXRzIGFzc29jaWF0aW9uJ3MgaWRcIik7XG5cbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpdGVtSWQgKyAnL2Fzc29jaWF0aW9ucy8nICsgYXNzb2NpYXRpb25JZDtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3QoeyBtZXRob2Q6XCJERUxFVEVcIiwgdXJsOnVybCwgb3B0aW9uczogb3B0aW9ucyB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHJlbW92aW5nIGFzc29jaWF0aW9uIGZvciBpdGVtICR7aXRlbUlkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKGBBc3NvY2lhdGlvblNlcnZpY2UucmVtb3ZlKCR7aXRlbUlkfSwke2Fzc29jaWF0aW9uSWR9KSAtICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBc3NvY2lhdGlvblNlcnZpY2U7XG4iXX0=