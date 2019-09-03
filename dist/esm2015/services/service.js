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
        return Promise.resolve(service)
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
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service types
     */
    types(options) {
        let query = new Query()
            .types(ItemTypes.STANDARD)
            .resourceTypes('ServiceType')
            .pageSize(50)
            .getQuery();
        return Promise.resolve(query)
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
        return Promise.resolve(service)
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
        return Promise.resolve(id)
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
        return Promise.resolve(id)
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
        return Promise.resolve(id)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hDLE9BQU8sV0FBVyxNQUFNLFFBQVEsQ0FBQztBQUNqQyxPQUFPLEtBQUssTUFBTSxpQkFBaUIsQ0FBQztBQUdwQzs7Ozs7O0dBTUc7QUFFSCxNQUFNLGNBQWUsU0FBUSxXQUFXO0lBRXBDLFlBQVksR0FBVSxFQUFFLFVBQXVCO1FBQzNDLEtBQUssQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFjO1FBQ2pCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsZUFBZSxDQUFDO0lBQzdDLENBQUM7SUFHRDs7Ozs7OztPQU9HO0lBQ0gsS0FBSyxDQUFFLE9BQWEsRUFBRSxPQUFjO1FBRWhDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBRSxPQUFPLENBQUU7YUFDaEMsSUFBSSxDQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ1QsSUFBRyxDQUFDLEdBQUc7Z0JBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3pCLE1BQU0sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxFQUFFLElBQUksRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFDLE9BQU87YUFDeEUsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNQ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LGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgSXRlbVR5cGVzIGZyb20gJy4uL3NoYXJlZC90eXBlcyc7XG5pbXBvcnQgSXRlbVNlcnZpY2UgZnJvbSAnLi9pdGVtJztcbmltcG9ydCBRdWVyeSBmcm9tICcuLi9zaGFyZWQvcXVlcnknO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5cbi8qKlxuICogR2VvUGxhdGZvcm0gU2VydmljZSBzZXJ2aWNlXG4gKiBzZXJ2aWNlIGZvciB3b3JraW5nIHdpdGggdGhlIEdlb1BsYXRmb3JtIEFQSSB0b1xuICogcmV0cmlldmUgYW5kIG1hbmlwdWxhdGUgc2VydmljZSBvYmplY3RzLlxuICpcbiAqIEBzZWUgSXRlbVNlcnZpY2VcbiAqL1xuXG5jbGFzcyBTZXJ2aWNlU2VydmljZSBleHRlbmRzIEl0ZW1TZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHVybDpzdHJpbmcsIGh0dHBDbGllbnQ6R1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmw6c3RyaW5nKSB7XG4gICAgICAgIHN1cGVyLnNldFVybChiYXNlVXJsKTtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybCArICcvYXBpL3NlcnZpY2VzJztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEZldGNoIG1ldGFkYXRhIGZyb20gdGhlIHNwZWNpZmllZCBHZW9QbGF0Zm9ybSBTZXJ2aWNlJ3NcbiAgICAgKiB3ZWItYWNjZXNzaWJsZSBpbXBsZW1lbnRhdGlvbiB1c2luZyBlaXRoZXIgR2V0Q2FwYWJpbGl0aWVzXG4gICAgICogb3IgRVNSSSBkb2N1bWVudEluZm8uXG4gICAgICogQHBhcmFtIHNlcnZpY2UgLSBHZW9QbGF0Zm9ybSBTZXJ2aWNlIG9iamVjdFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VydmljZSBtZXRhZGF0YVxuICAgICAqL1xuICAgIGFib3V0KCBzZXJ2aWNlIDogYW55LCBvcHRpb25zID86IGFueSApIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBzZXJ2aWNlIClcbiAgICAgICAgLnRoZW4oIHN2YyA9PiB7XG4gICAgICAgICAgICBpZighc3ZjKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBzZXJ2aWNlIHRvIGdldCBtZXRhZGF0YSBhYm91dFwiKTtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsIHVybDp0aGlzLmJhc2VVcmwgKyAnL2Fib3V0JywgZGF0YTpzdmMsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBkZXNjcmliaW5nIHNlcnZpY2U6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignU2VydmljZVNlcnZpY2UuYWJvdXQoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8gcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VydmljZSB0eXBlc1xuICAgICAqL1xuICAgIHR5cGVzIChvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGxldCBxdWVyeSA9IG5ldyBRdWVyeSgpXG4gICAgICAgIC50eXBlcyhJdGVtVHlwZXMuU1RBTkRBUkQpXG4gICAgICAgIC5yZXNvdXJjZVR5cGVzKCdTZXJ2aWNlVHlwZScpXG4gICAgICAgIC5wYWdlU2l6ZSg1MClcbiAgICAgICAgLmdldFF1ZXJ5KCk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggcXVlcnkgKVxuICAgICAgICAudGhlbiggKHBhcmFtcykgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYXBpQmFzZSArICcvYXBpL2l0ZW1zJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJywgdXJsOnVybCwgcGFyYW1zOnBhcmFtcywgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnJlc3VsdHMpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIHNlcnZpY2UgdHlwZXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignU2VydmljZVNlcnZpY2UudHlwZXMoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNlcnZpY2UgLSBHUCBTZXJ2aWNlIGRlZmluaXRpb25cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8gcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgaW1wb3J0ZWQgc2VydmljZVxuICAgICAqL1xuICAgIGltcG9ydCAoc2VydmljZSA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBzZXJ2aWNlIClcbiAgICAgICAgLnRoZW4oIHN2YyA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9pbXBvcnQnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJywgdXJsOnVybCwgZGF0YTpzdmMsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBpbXBvcnRpbmcgc2VydmljZTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdTZXJ2aWNlU2VydmljZS5pbXBvcnQoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBHUCBzZXJ2aWNlIHRvIGhhcnZlc3QgbGF5ZXJzIGZvclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzZXJ2aWNlIGxheWVyc1xuICAgICAqL1xuICAgIGhhcnZlc3QgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIGlkIClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvaGFydmVzdCc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBoYXJ2ZXN0aW5nIGxheWVycyBmcm9tIHNlcnZpY2U6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignU2VydmljZVNlcnZpY2UuaGFydmVzdCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEdQIHNlcnZpY2UgdG8gbGl2ZSB0ZXN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlcnZpY2Ugc3RhdGlzdGljc1xuICAgICAqL1xuICAgIGxpdmVUZXN0IChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL3Rlc3QnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgdGVzdGluZyBzZXJ2aWNlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1NlcnZpY2VTZXJ2aWNlLmxpdmVUZXN0KCkgLSAnICArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBHUCBzZXJ2aWNlIHRvIGZldGNoIHN0YXRpc3RpY3MgYWJvdXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8gcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VydmljZSBzdGF0aXN0aWNzXG4gICAgICovXG4gICAgc3RhdGlzdGljcyAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIGlkIClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvc3RhdGlzdGljcyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBnZXR0aW5nIHNlcnZpY2Ugc3RhdGlzdGljczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdTZXJ2aWNlU2VydmljZS5zdGF0aXN0aWNzKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VydmljZVNlcnZpY2U7XG4iXX0=