/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from 'q';
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
        this.baseUrl = baseUrl + '/api/services';
    }
    /**
     * Fetch metadata from the specified GeoPlatform Service's
     * web-accessible implementation using either GetCapabilities
     * or ESRI documentInfo.
     * @param {?} service - GeoPlatform Service object
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving service metadata
     */
    about(service, options) {
        return Q.resolve(service)
            .then(svc => {
            if (!svc)
                throw new Error("Must provide service to get metadata about");
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'POST', url: this.baseUrl + '/about', data: svc, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error describing service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.about() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service types
     */
    types(options) {
        /** @type {?} */
        let query = new Query()
            .types(ItemTypes.STANDARD)
            .resourceTypes('ServiceType')
            .pageSize(50)
            .getQuery();
        return Q.resolve(query)
            .then((params) => {
            /** @type {?} */
            let url = this.apiBase + '/api/items';
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'GET', url: url, params: params, options: options
            });
            return this.execute(opts);
        })
            .then(response => response.results)
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error fetching service types: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.types() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} service - GP Service definition
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving imported service
     */
    import(service, options) {
        return Q.resolve(service)
            .then(svc => {
            /** @type {?} */
            let url = this.baseUrl + '/import';
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'POST', url: url, data: svc, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error importing service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.import() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} id - identifier of GP service to harvest layers for
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service layers
     */
    harvest(id, options) {
        return Q.resolve(id)
            .then(id => {
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/harvest';
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error harvesting layers from service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.harvest() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} id - identifier of GP service to live test
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service statistics
     */
    liveTest(id, options) {
        return Q.resolve(id)
            .then(id => {
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/test';
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error testing service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.liveTest() - ' + err.message);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} id - identifier of GP service to fetch statistics about
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service statistics
     */
    statistics(id, options) {
        return Q.resolve(id)
            .then(id => {
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/statistics';
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error getting service statistics: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.statistics() - ' + err.message);
            return Q.reject(err);
        });
    }
}
export default ServiceService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztBQUN2QixPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QyxPQUFPLFdBQVcsTUFBTSxRQUFRLENBQUM7QUFDakMsT0FBTyxLQUFLLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7O0FBV3BDLG9CQUFxQixTQUFRLFdBQVc7Ozs7O0lBRXBDLFlBQVksR0FBVSxFQUFFLFVBQXVCO1FBQzNDLEtBQUssQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDMUI7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQWM7UUFDakIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxlQUFlLENBQUM7S0FDNUM7Ozs7Ozs7OztJQVdELEtBQUssQ0FBRSxPQUFhLEVBQUUsT0FBYztRQUVoQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUUsT0FBTyxDQUFFO2FBQzFCLElBQUksQ0FBRSxHQUFHLENBQUMsRUFBRTtZQUNULElBQUcsQ0FBQyxHQUFHO2dCQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQzs7WUFDbEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTSxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLEVBQUUsSUFBSSxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUMsT0FBTzthQUN4RSxDQUFDLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0IsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFD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QUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCLENBQUMsQ0FBQztLQUNOO0NBRUo7QUFFRCxlQUFlLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgKiBhcyBRIGZyb20gJ3EnO1xuaW1wb3J0IEl0ZW1UeXBlcyBmcm9tICcuLi9zaGFyZWQvdHlwZXMnO1xuaW1wb3J0IEl0ZW1TZXJ2aWNlIGZyb20gJy4vaXRlbSc7XG5pbXBvcnQgUXVlcnkgZnJvbSAnLi4vc2hhcmVkL3F1ZXJ5JztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuXG4vKipcbiAqIEdlb1BsYXRmb3JtIFNlcnZpY2Ugc2VydmljZVxuICogc2VydmljZSBmb3Igd29ya2luZyB3aXRoIHRoZSBHZW9QbGF0Zm9ybSBBUEkgdG9cbiAqIHJldHJpZXZlIGFuZCBtYW5pcHVsYXRlIHNlcnZpY2Ugb2JqZWN0cy5cbiAqXG4gKiBAc2VlIEl0ZW1TZXJ2aWNlXG4gKi9cblxuY2xhc3MgU2VydmljZVNlcnZpY2UgZXh0ZW5kcyBJdGVtU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmw6c3RyaW5nLCBodHRwQ2xpZW50OkdQSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcih1cmwsIGh0dHBDbGllbnQpO1xuICAgIH1cblxuICAgIHNldFVybChiYXNlVXJsOnN0cmluZykge1xuICAgICAgICBzdXBlci5zZXRVcmwoYmFzZVVybCk7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmwgKyAnL2FwaS9zZXJ2aWNlcyc7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBGZXRjaCBtZXRhZGF0YSBmcm9tIHRoZSBzcGVjaWZpZWQgR2VvUGxhdGZvcm0gU2VydmljZSdzXG4gICAgICogd2ViLWFjY2Vzc2libGUgaW1wbGVtZW50YXRpb24gdXNpbmcgZWl0aGVyIEdldENhcGFiaWxpdGllc1xuICAgICAqIG9yIEVTUkkgZG9jdW1lbnRJbmZvLlxuICAgICAqIEBwYXJhbSBzZXJ2aWNlIC0gR2VvUGxhdGZvcm0gU2VydmljZSBvYmplY3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlcnZpY2UgbWV0YWRhdGFcbiAgICAgKi9cbiAgICBhYm91dCggc2VydmljZSA6IGFueSwgb3B0aW9ucyA/OiBhbnkgKSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBzZXJ2aWNlIClcbiAgICAgICAgLnRoZW4oIHN2YyA9PiB7XG4gICAgICAgICAgICBpZighc3ZjKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBzZXJ2aWNlIHRvIGdldCBtZXRhZGF0YSBhYm91dFwiKTtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsIHVybDp0aGlzLmJhc2VVcmwgKyAnL2Fib3V0JywgZGF0YTpzdmMsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBkZXNjcmliaW5nIHNlcnZpY2U6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignU2VydmljZVNlcnZpY2UuYWJvdXQoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzZXJ2aWNlIHR5cGVzXG4gICAgICovXG4gICAgdHlwZXMgKG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBsZXQgcXVlcnkgPSBuZXcgUXVlcnkoKVxuICAgICAgICAudHlwZXMoSXRlbVR5cGVzLlNUQU5EQVJEKVxuICAgICAgICAucmVzb3VyY2VUeXBlcygnU2VydmljZVR5cGUnKVxuICAgICAgICAucGFnZVNpemUoNTApXG4gICAgICAgIC5nZXRRdWVyeSgpO1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHF1ZXJ5IClcbiAgICAgICAgLnRoZW4oIChwYXJhbXMpID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmFwaUJhc2UgKyAnL2FwaS9pdGVtcyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsIHVybDp1cmwsIHBhcmFtczpwYXJhbXMsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5yZXN1bHRzKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyBzZXJ2aWNlIHR5cGVzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1NlcnZpY2VTZXJ2aWNlLnR5cGVzKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNlcnZpY2UgLSBHUCBTZXJ2aWNlIGRlZmluaXRpb25cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8gcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgaW1wb3J0ZWQgc2VydmljZVxuICAgICAqL1xuICAgIGltcG9ydCAoc2VydmljZSA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIHNlcnZpY2UgKVxuICAgICAgICAudGhlbiggc3ZjID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL2ltcG9ydCc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLCB1cmw6dXJsLCBkYXRhOnN2Yywgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGltcG9ydGluZyBzZXJ2aWNlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1NlcnZpY2VTZXJ2aWNlLmltcG9ydCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgR1Agc2VydmljZSB0byBoYXJ2ZXN0IGxheWVycyBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8gcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VydmljZSBsYXllcnNcbiAgICAgKi9cbiAgICBoYXJ2ZXN0IChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGlkIClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvaGFydmVzdCc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBoYXJ2ZXN0aW5nIGxheWVycyBmcm9tIHNlcnZpY2U6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignU2VydmljZVNlcnZpY2UuaGFydmVzdCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgR1Agc2VydmljZSB0byBsaXZlIHRlc3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8gcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VydmljZSBzdGF0aXN0aWNzXG4gICAgICovXG4gICAgbGl2ZVRlc3QgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggaWQgKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy90ZXN0JztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJywgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHRlc3Rpbmcgc2VydmljZTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdTZXJ2aWNlU2VydmljZS5saXZlVGVzdCgpIC0gJyAgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBHUCBzZXJ2aWNlIHRvIGZldGNoIHN0YXRpc3RpY3MgYWJvdXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8gcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VydmljZSBzdGF0aXN0aWNzXG4gICAgICovXG4gICAgc3RhdGlzdGljcyAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggaWQgKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy9zdGF0aXN0aWNzJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJywgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGdldHRpbmcgc2VydmljZSBzdGF0aXN0aWNzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1NlcnZpY2VTZXJ2aWNlLnN0YXRpc3RpY3MoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZpY2VTZXJ2aWNlO1xuIl19