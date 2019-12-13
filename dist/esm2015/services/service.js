import ItemTypes from '../shared/types';
import ItemService from './item';
import Query from '../shared/query';
/**
 * GeoPlatform Service service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate service objects.
 *
 * @see ItemService
 */
class ServiceService extends ItemService {
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/services';
    }
    /**
     * Fetch metadata from the specified GeoPlatform Service's
     * web-accessible implementation using either GetCapabilities
     * or ESRI documentInfo.
     * @param service - GeoPlatform Service object
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving service metadata
     */
    about(service, options) {
        return this.createAndResolvePromise(service)
            .then(svc => {
            if (!svc)
                throw new Error("Must provide service to get metadata about");
            let opts = this.buildRequest({
                method: 'POST', url: this.baseUrl + '/about', data: svc, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error describing service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.about() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - identifier of the parent service to fetch layers from
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results containing Layers
     */
    layers(id, options) {
        return this.createAndResolvePromise(id)
            .then(svcId => {
            if (!svcId)
                throw new Error("Must provide service identifier");
            let opts = this.buildRequest({
                method: 'GET',
                url: this.baseUrl + '/' + svcId + '/layers',
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error fetching service layers: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.layers() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service types
     */
    types(options) {
        let query = new Query()
            .types(ItemTypes.STANDARD)
            .resourceTypes('ServiceType')
            .pageSize(50)
            .getQuery();
        return this.createAndResolvePromise(query)
            .then((params) => {
            let url = this.apiBase + '/api/items';
            let opts = this.buildRequest({
                method: 'GET', url: url, params: params, options: options
            });
            return this.execute(opts);
        })
            .then(response => response.results)
            .catch(e => {
            let err = new Error(`Error fetching service types: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.types() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param service - GP Service definition
     * @param options - optional set of request options to apply to request
     * @return Promise resolving imported service
     */
    import(service, options) {
        return this.createAndResolvePromise(service)
            .then(svc => {
            let url = this.baseUrl + '/import';
            let opts = this.buildRequest({
                method: 'POST', url: url, data: svc, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error importing service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.import() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - identifier of GP service to harvest layers for
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service layers
     */
    harvest(id, options) {
        return this.createAndResolvePromise(id)
            .then(id => {
            let url = this.baseUrl + '/' + id + '/harvest';
            let opts = this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error harvesting layers from service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.harvest() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - identifier of GP service to live test
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service statistics
     */
    liveTest(id, options) {
        return this.createAndResolvePromise(id)
            .then(id => {
            let url = this.baseUrl + '/' + id + '/test';
            let opts = this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error testing service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.liveTest() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - identifier of GP service to fetch statistics about
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service statistics
     */
    statistics(id, options) {
        return this.createAndResolvePromise(id)
            .then(id => {
            let url = this.baseUrl + '/' + id + '/statistics';
            let opts = this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error getting service statistics: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.statistics() - ' + err.message);
            throw err;
        });
    }
}
export default ServiceService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sU0FBUyxNQUFjLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sV0FBVyxNQUFZLFFBQVEsQ0FBQztBQUN2QyxPQUFPLEtBQUssTUFBa0IsaUJBQWlCLENBQUM7QUFJaEQ7Ozs7OztHQU1HO0FBRUgsTUFBTSxjQUFlLFNBQVEsV0FBVztJQUVwQyxZQUFZLEdBQVUsRUFBRSxVQUF1QjtRQUMzQyxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBYztRQUNqQixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxHQUFHLGVBQWUsQ0FBQztJQUM3QyxDQUFDO0lBR0Q7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBRSxPQUFhLEVBQUUsT0FBYztRQUVoQyxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBRSxPQUFPLENBQUU7YUFDN0MsSUFBSSxDQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ1QsSUFBRyxDQUFDLEdBQUc7Z0JBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3pCLE1BQU0sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxFQUFFLElBQUksRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFDLE9BQU87YUFDeEUsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZ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Q0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxVQUFVLENBQUUsRUFBVyxFQUFFLE9BQWM7UUFDbkMsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUUsRUFBRSxDQUFFO2FBQ3hDLElBQUksQ0FBRSxFQUFFLENBQUMsRUFBRTtZQUNSLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxhQUFhLENBQUM7WUFDbEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBQyxPQUFPO2FBQ3pDLENBQUMsQ0FBQztZQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDUCxJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDdEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQ0FBZ0MsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUQsTUFBTSxHQUFHLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FFSjtBQUVELGVBQWUsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCBJdGVtVHlwZXMgICAgICAgICBmcm9tICcuLi9zaGFyZWQvdHlwZXMnO1xuaW1wb3J0IEl0ZW1TZXJ2aWNlICAgICAgIGZyb20gJy4vaXRlbSc7XG5pbXBvcnQgUXVlcnkgICAgICAgICAgICAgZnJvbSAnLi4vc2hhcmVkL3F1ZXJ5JztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdHMgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzJztcbmltcG9ydCBHUEh0dHBDbGllbnQgICAgICBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5cbi8qKlxuICogR2VvUGxhdGZvcm0gU2VydmljZSBzZXJ2aWNlXG4gKiBzZXJ2aWNlIGZvciB3b3JraW5nIHdpdGggdGhlIEdlb1BsYXRmb3JtIEFQSSB0b1xuICogcmV0cmlldmUgYW5kIG1hbmlwdWxhdGUgc2VydmljZSBvYmplY3RzLlxuICpcbiAqIEBzZWUgSXRlbVNlcnZpY2VcbiAqL1xuXG5jbGFzcyBTZXJ2aWNlU2VydmljZSBleHRlbmRzIEl0ZW1TZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHVybDpzdHJpbmcsIGh0dHBDbGllbnQ6R1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmw6c3RyaW5nKSB7XG4gICAgICAgIHN1cGVyLnNldFVybChiYXNlVXJsKTtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybCArICcvYXBpL3NlcnZpY2VzJztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEZldGNoIG1ldGFkYXRhIGZyb20gdGhlIHNwZWNpZmllZCBHZW9QbGF0Zm9ybSBTZXJ2aWNlJ3NcbiAgICAgKiB3ZWItYWNjZXNzaWJsZSBpbXBsZW1lbnRhdGlvbiB1c2luZyBlaXRoZXIgR2V0Q2FwYWJpbGl0aWVzXG4gICAgICogb3IgRVNSSSBkb2N1bWVudEluZm8uXG4gICAgICogQHBhcmFtIHNlcnZpY2UgLSBHZW9QbGF0Zm9ybSBTZXJ2aWNlIG9iamVjdFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VydmljZSBtZXRhZGF0YVxuICAgICAqL1xuICAgIGFib3V0KCBzZXJ2aWNlIDogYW55LCBvcHRpb25zID86IGFueSApIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggc2VydmljZSApXG4gICAgICAgIC50aGVuKCBzdmMgPT4ge1xuICAgICAgICAgICAgaWYoIXN2YylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgc2VydmljZSB0byBnZXQgbWV0YWRhdGEgYWJvdXRcIik7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLCB1cmw6dGhpcy5iYXNlVXJsICsgJy9hYm91dCcsIGRhdGE6c3ZjLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZGVzY3JpYmluZyBzZXJ2aWNlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1NlcnZpY2VTZXJ2aWNlLmFib3V0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiB0aGUgcGFyZW50IHNlcnZpY2UgdG8gZmV0Y2ggbGF5ZXJzIGZyb21cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlYXJjaCByZXN1bHRzIGNvbnRhaW5pbmcgTGF5ZXJzXG4gICAgICovXG4gICAgbGF5ZXJzKCBpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkgKSA6IFByb21pc2U8U2VhcmNoUmVzdWx0cz4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKGlkKVxuICAgICAgICAudGhlbiggc3ZjSWQgPT4ge1xuICAgICAgICAgICAgaWYoIXN2Y0lkKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBzZXJ2aWNlIGlkZW50aWZpZXJcIik7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXG4gICAgICAgICAgICAgICAgdXJsOnRoaXMuYmFzZVVybCArICcvJyArIHN2Y0lkICsgJy9sYXllcnMnLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyBzZXJ2aWNlIGxheWVyczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdTZXJ2aWNlU2VydmljZS5sYXllcnMoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8gcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VydmljZSB0eXBlc1xuICAgICAqL1xuICAgIHR5cGVzIChvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGxldCBxdWVyeSA9IG5ldyBRdWVyeSgpXG4gICAgICAgIC50eXBlcyhJdGVtVHlwZXMuU1RBTkRBUkQpXG4gICAgICAgIC5yZXNvdXJjZVR5cGVzKCdTZXJ2aWNlVHlwZScpXG4gICAgICAgIC5wYWdlU2l6ZSg1MClcbiAgICAgICAgLmdldFF1ZXJ5KCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHF1ZXJ5IClcbiAgICAgICAgLnRoZW4oIChwYXJhbXMpID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmFwaUJhc2UgKyAnL2FwaS9pdGVtcyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsIHVybDp1cmwsIHBhcmFtczpwYXJhbXMsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5yZXN1bHRzKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyBzZXJ2aWNlIHR5cGVzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1NlcnZpY2VTZXJ2aWNlLnR5cGVzKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzZXJ2aWNlIC0gR1AgU2VydmljZSBkZWZpbml0aW9uXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGltcG9ydGVkIHNlcnZpY2VcbiAgICAgKi9cbiAgICBpbXBvcnQgKHNlcnZpY2UgOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHNlcnZpY2UgKVxuICAgICAgICAudGhlbiggc3ZjID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2ltcG9ydCc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLCB1cmw6dXJsLCBkYXRhOnN2Yywgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGltcG9ydGluZyBzZXJ2aWNlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1NlcnZpY2VTZXJ2aWNlLmltcG9ydCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEdQIHNlcnZpY2UgdG8gaGFydmVzdCBsYXllcnMgZm9yXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlcnZpY2UgbGF5ZXJzXG4gICAgICovXG4gICAgaGFydmVzdCAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIGlkIClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvaGFydmVzdCc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBoYXJ2ZXN0aW5nIGxheWVycyBmcm9tIHNlcnZpY2U6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignU2VydmljZVNlcnZpY2UuaGFydmVzdCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEdQIHNlcnZpY2UgdG8gbGl2ZSB0ZXN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlcnZpY2Ugc3RhdGlzdGljc1xuICAgICAqL1xuICAgIGxpdmVUZXN0IChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggaWQgKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy90ZXN0JztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJywgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHRlc3Rpbmcgc2VydmljZTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdTZXJ2aWNlU2VydmljZS5saXZlVGVzdCgpIC0gJyAgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgR1Agc2VydmljZSB0byBmZXRjaCBzdGF0aXN0aWNzIGFib3V0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlcnZpY2Ugc3RhdGlzdGljc1xuICAgICAqL1xuICAgIHN0YXRpc3RpY3MgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggaWQgKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy9zdGF0aXN0aWNzJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJywgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGdldHRpbmcgc2VydmljZSBzdGF0aXN0aWNzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1NlcnZpY2VTZXJ2aWNlLnN0YXRpc3RpY3MoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTZXJ2aWNlU2VydmljZTtcbiJdfQ==