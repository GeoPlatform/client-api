import BaseService from './base';
/**
 * GeoPlatform Association service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate association objects.
 *
 * @see GeoPlatform.ItemService
 */
class AssociationService extends BaseService {
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    /**
     * @param itemId - identifier of item to fetch associations for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving array of associated items of the item in question
     */
    search(itemId, params, options) {
        return this.createAndResolvePromise(itemId)
            .then(id => {
            if (!id)
                throw new Error("Must specify a GeoPlatform resource for which to search associations");
            let url = this.baseUrl + '/' + id + '/associations';
            let opts = this.buildRequest({
                method: "GET",
                url: url,
                params: params || {},
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error fetching associations for item ${itemId}: ${e.message}`);
            Object.assign(err, e);
            this.logError(`AssociationService.search(${itemId}) - ${err.message}`);
            throw err;
        });
    }
    /**
     * @param itemId - identifier of item
     * @param associationId - identifier of association to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving association
     */
    get(itemId, associationId, options) {
        return this.createAndResolvePromise(itemId)
            .then(itemId => {
            if (!itemId || !associationId)
                throw new Error("Must specify both the GeoPlatform resource id and its association's id");
            let url = this.baseUrl + '/' + itemId + '/associations/' + associationId;
            let opts = this.buildRequest({ method: "GET", url: url, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error fetching association for item ${itemId}: ${e.message}`);
            Object.assign(err, e);
            this.logError(`AssociationService.get(${itemId},${associationId}) - ${err.message}`);
            throw err;
        });
    }
    /**
     * @param itemId - identifier of item
     * @param associationId - identifier of association to remove
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving empty
     */
    remove(itemId, associationId, options) {
        return this.createAndResolvePromise(itemId)
            .then(itemId => {
            if (!itemId || !associationId)
                throw new Error("Must specify both the GeoPlatform resource id and its association's id");
            let url = this.baseUrl + '/' + itemId + '/associations/' + associationId;
            let opts = this.buildRequest({ method: "DELETE", url: url, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error removing association for item ${itemId}: ${e.message}`);
            Object.assign(err, e);
            this.logError(`AssociationService.remove(${itemId},${associationId}) - ${err.message}`);
            throw err;
        });
    }
}
export default AssociationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzb2NpYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvYXNzb2NpYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxXQUFXLE1BQU0sUUFBUSxDQUFDO0FBR2pDOzs7Ozs7R0FNRztBQUVILE1BQU0sa0JBQW1CLFNBQVEsV0FBVztJQUV4QyxZQUFZLEdBQVUsRUFBRSxVQUF1QjtRQUMzQyxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFHRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFFLE1BQWUsRUFBRSxNQUFhLEVBQUUsT0FBYztRQUVsRCxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBRSxNQUFNLENBQUU7YUFDNUMsSUFBSSxDQUFFLEVBQUUsQ0FBQyxFQUFFO1lBRVIsSUFBRyxDQUFDLEVBQUU7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO1lBRWhHLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxlQUFlLENBQUM7WUFDcEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTSxFQUFDLEtBQUs7Z0JBQ1osR0FBRyxFQUFDLEdBQUc7Z0JBQ1AsTUFBTSxFQUFFLE1BQU0sSUFBSSxFQUFFO2dCQUNwQixPQUFPLEVBQUUsT0FBTzthQUNuQixDQUFDLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1AsSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsd0NBQXdDLE1BQU0sS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNwRixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLDZCQUE2QixNQUFNLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDdkUsTUFBTSxHQUFHLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEdBQUcsQ0FBRSxNQUFlLEVBQUUsYUFBc0IsRUFBRSxPQUFjO1FBRXhELE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFFLE1BQU0sQ0FBRTthQUM1QyxJQUFJLENBQUUsTUFBTSxDQUFDLEVBQUU7WUFFWixJQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYTtnQkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO1lBRTlGLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxnQkFBZ0IsR0FBRyxhQUFhLENBQUM7WUFDekUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLE1BQU0sRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUMxRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1AsSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsdUNBQXVDLE1BQU0sS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNuRixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLDBCQUEwQixNQUFNLElBQUksYUFBYSxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ3JGLE1BQU0sR0FBRyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUUsTUFBZSxFQUFFLGFBQXNCLEVBQUUsT0FBYztRQUUzRCxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBRSxNQUFNLENBQUU7YUFDNUMsSUFBSSxDQUFFLE1BQU0sQ0FBQyxFQUFFO1lBRVosSUFBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLGFBQWE7Z0JBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0VBQXdFLENBQUMsQ0FBQztZQUU5RixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsZ0JBQWdCLEdBQUcsYUFBYSxDQUFDO1lBQ3pFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxNQUFNLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDN0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNQLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLHVDQUF1QyxNQUFNLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbkYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyw2QkFBNkIsTUFBTSxJQUFJLGFBQWEsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN4RixNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUVKO0FBRUQsZUFBZSxrQkFBa0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgQmFzZVNlcnZpY2UgZnJvbSAnLi9iYXNlJztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuXG4vKipcbiAqIEdlb1BsYXRmb3JtIEFzc29jaWF0aW9uIHNlcnZpY2VcbiAqIHNlcnZpY2UgZm9yIHdvcmtpbmcgd2l0aCB0aGUgR2VvUGxhdGZvcm0gQVBJIHRvXG4gKiByZXRyaWV2ZSBhbmQgbWFuaXB1bGF0ZSBhc3NvY2lhdGlvbiBvYmplY3RzLlxuICpcbiAqIEBzZWUgR2VvUGxhdGZvcm0uSXRlbVNlcnZpY2VcbiAqL1xuXG5jbGFzcyBBc3NvY2lhdGlvblNlcnZpY2UgZXh0ZW5kcyBCYXNlU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmw6c3RyaW5nLCBodHRwQ2xpZW50OkdQSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcih1cmwsIGh0dHBDbGllbnQpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGl0ZW1JZCAtIGlkZW50aWZpZXIgb2YgaXRlbSB0byBmZXRjaCBhc3NvY2lhdGlvbnMgZm9yXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBhcnJheSBvZiBhc3NvY2lhdGVkIGl0ZW1zIG9mIHRoZSBpdGVtIGluIHF1ZXN0aW9uXG4gICAgICovXG4gICAgc2VhcmNoIChpdGVtSWQgOiBzdHJpbmcsIHBhcmFtcyA/OiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIGl0ZW1JZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG5cbiAgICAgICAgICAgIGlmKCFpZCkgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBzcGVjaWZ5IGEgR2VvUGxhdGZvcm0gcmVzb3VyY2UgZm9yIHdoaWNoIHRvIHNlYXJjaCBhc3NvY2lhdGlvbnNcIik7XG5cbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvYXNzb2NpYXRpb25zJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgICAgICAgICAgICAgIHVybDp1cmwsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMgfHwge30sXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyBhc3NvY2lhdGlvbnMgZm9yIGl0ZW0gJHtpdGVtSWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoYEFzc29jaWF0aW9uU2VydmljZS5zZWFyY2goJHtpdGVtSWR9KSAtICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpdGVtSWQgLSBpZGVudGlmaWVyIG9mIGl0ZW1cbiAgICAgKiBAcGFyYW0gYXNzb2NpYXRpb25JZCAtIGlkZW50aWZpZXIgb2YgYXNzb2NpYXRpb24gdG8gZmV0Y2hcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGFzc29jaWF0aW9uXG4gICAgICovXG4gICAgZ2V0IChpdGVtSWQgOiBzdHJpbmcsIGFzc29jaWF0aW9uSWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIGl0ZW1JZCApXG4gICAgICAgIC50aGVuKCBpdGVtSWQgPT4ge1xuXG4gICAgICAgICAgICBpZighaXRlbUlkIHx8ICFhc3NvY2lhdGlvbklkKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3Qgc3BlY2lmeSBib3RoIHRoZSBHZW9QbGF0Zm9ybSByZXNvdXJjZSBpZCBhbmQgaXRzIGFzc29jaWF0aW9uJ3MgaWRcIik7XG5cbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpdGVtSWQgKyAnL2Fzc29jaWF0aW9ucy8nICsgYXNzb2NpYXRpb25JZDtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3QoeyBtZXRob2Q6XCJHRVRcIiwgdXJsOnVybCwgb3B0aW9uczogb3B0aW9ucyB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIGFzc29jaWF0aW9uIGZvciBpdGVtICR7aXRlbUlkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKGBBc3NvY2lhdGlvblNlcnZpY2UuZ2V0KCR7aXRlbUlkfSwke2Fzc29jaWF0aW9uSWR9KSAtICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpdGVtSWQgLSBpZGVudGlmaWVyIG9mIGl0ZW1cbiAgICAgKiBAcGFyYW0gYXNzb2NpYXRpb25JZCAtIGlkZW50aWZpZXIgb2YgYXNzb2NpYXRpb24gdG8gcmVtb3ZlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBlbXB0eVxuICAgICAqL1xuICAgIHJlbW92ZSAoaXRlbUlkIDogc3RyaW5nLCBhc3NvY2lhdGlvbklkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBpdGVtSWQgKVxuICAgICAgICAudGhlbiggaXRlbUlkID0+IHtcblxuICAgICAgICAgICAgaWYoIWl0ZW1JZCB8fCAhYXNzb2NpYXRpb25JZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHNwZWNpZnkgYm90aCB0aGUgR2VvUGxhdGZvcm0gcmVzb3VyY2UgaWQgYW5kIGl0cyBhc3NvY2lhdGlvbidzIGlkXCIpO1xuXG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaXRlbUlkICsgJy9hc3NvY2lhdGlvbnMvJyArIGFzc29jaWF0aW9uSWQ7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHsgbWV0aG9kOlwiREVMRVRFXCIsIHVybDp1cmwsIG9wdGlvbnM6IG9wdGlvbnMgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciByZW1vdmluZyBhc3NvY2lhdGlvbiBmb3IgaXRlbSAke2l0ZW1JZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcihgQXNzb2NpYXRpb25TZXJ2aWNlLnJlbW92ZSgke2l0ZW1JZH0sJHthc3NvY2lhdGlvbklkfSkgLSAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXNzb2NpYXRpb25TZXJ2aWNlO1xuIl19