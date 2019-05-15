/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var /**
 * GeoPlatform Service service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate service objects.
 *
 * @see ItemService
 */
ServiceService = /** @class */ (function (_super) {
    tslib_1.__extends(ServiceService, _super);
    function ServiceService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    ServiceService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl + '/api/services';
    };
    /**
     * Fetch metadata from the specified GeoPlatform Service's
     * web-accessible implementation using either GetCapabilities
     * or ESRI documentInfo.
     * @param service - GeoPlatform Service object
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving service metadata
     */
    /**
     * Fetch metadata from the specified GeoPlatform Service's
     * web-accessible implementation using either GetCapabilities
     * or ESRI documentInfo.
     * @param {?} service - GeoPlatform Service object
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving service metadata
     */
    ServiceService.prototype.about = /**
     * Fetch metadata from the specified GeoPlatform Service's
     * web-accessible implementation using either GetCapabilities
     * or ESRI documentInfo.
     * @param {?} service - GeoPlatform Service object
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving service metadata
     */
    function (service, options) {
        var _this = this;
        return Q.resolve(service)
            .then(function (svc) {
            if (!svc)
                throw new Error("Must provide service to get metadata about");
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'POST', url: _this.baseUrl + '/about', data: svc, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error describing service: " + e.message);
            Object.assign(err, e);
            _this.logError('ServiceService.about() - ' + err.message);
            return Q.reject(err);
        });
    };
    /**
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service types
     */
    /**
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service types
     */
    ServiceService.prototype.types = /**
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service types
     */
    function (options) {
        var _this = this;
        /** @type {?} */
        var query = new Query()
            .types(ItemTypes.STANDARD)
            .resourceTypes('ServiceType')
            .pageSize(50)
            .getQuery();
        return Q.resolve(query)
            .then(function (params) {
            /** @type {?} */
            var url = _this.apiBase + '/api/items';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'GET', url: url, params: params, options: options
            });
            return _this.execute(opts);
        })
            .then(function (response) { return response.results; })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error fetching service types: " + e.message);
            Object.assign(err, e);
            _this.logError('ServiceService.types() - ' + err.message);
            return Q.reject(err);
        });
    };
    /**
     * @param service - GP Service definition
     * @param options - optional set of request options to apply to request
     * @return Promise resolving imported service
     */
    /**
     * @param {?} service - GP Service definition
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving imported service
     */
    ServiceService.prototype.import = /**
     * @param {?} service - GP Service definition
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving imported service
     */
    function (service, options) {
        var _this = this;
        return Q.resolve(service)
            .then(function (svc) {
            /** @type {?} */
            var url = _this.baseUrl + '/import';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'POST', url: url, data: svc, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error importing service: " + e.message);
            Object.assign(err, e);
            _this.logError('ServiceService.import() - ' + err.message);
            return Q.reject(err);
        });
    };
    /**
     * @param id - identifier of GP service to harvest layers for
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service layers
     */
    /**
     * @param {?} id - identifier of GP service to harvest layers for
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service layers
     */
    ServiceService.prototype.harvest = /**
     * @param {?} id - identifier of GP service to harvest layers for
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service layers
     */
    function (id, options) {
        var _this = this;
        return Q.resolve(id)
            .then(function (id) {
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/harvest';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error harvesting layers from service: " + e.message);
            Object.assign(err, e);
            _this.logError('ServiceService.harvest() - ' + err.message);
            return Q.reject(err);
        });
    };
    /**
     * @param id - identifier of GP service to live test
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service statistics
     */
    /**
     * @param {?} id - identifier of GP service to live test
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service statistics
     */
    ServiceService.prototype.liveTest = /**
     * @param {?} id - identifier of GP service to live test
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service statistics
     */
    function (id, options) {
        var _this = this;
        return Q.resolve(id)
            .then(function (id) {
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/test';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error testing service: " + e.message);
            Object.assign(err, e);
            _this.logError('ServiceService.liveTest() - ' + err.message);
            return Q.reject(err);
        });
    };
    /**
     * @param id - identifier of GP service to fetch statistics about
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service statistics
     */
    /**
     * @param {?} id - identifier of GP service to fetch statistics about
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service statistics
     */
    ServiceService.prototype.statistics = /**
     * @param {?} id - identifier of GP service to fetch statistics about
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service statistics
     */
    function (id, options) {
        var _this = this;
        return Q.resolve(id)
            .then(function (id) {
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/statistics';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error getting service statistics: " + e.message);
            Object.assign(err, e);
            _this.logError('ServiceService.statistics() - ' + err.message);
            return Q.reject(err);
        });
    };
    return ServiceService;
}(ItemService));
export default ServiceService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7QUFDdkIsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxXQUFXLE1BQU0sUUFBUSxDQUFDO0FBQ2pDLE9BQU8sS0FBSyxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7OztBQVdwQzs7Ozs7OztBQUFBO0lBQTZCLDBDQUFXO0lBRXBDLHdCQUFZLEdBQVUsRUFBRSxVQUF1QjtlQUMzQyxrQkFBTSxHQUFHLEVBQUUsVUFBVSxDQUFDO0tBQ3pCOzs7OztJQUVELCtCQUFNOzs7O0lBQU4sVUFBTyxPQUFjO1FBQ2pCLGlCQUFNLE1BQU0sWUFBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxlQUFlLENBQUM7S0FDNUM7SUFHRDs7Ozs7OztPQU9HOzs7Ozs7Ozs7SUFDSCw4QkFBSzs7Ozs7Ozs7SUFBTCxVQUFPLE9BQWEsRUFBRSxPQUFjO1FBQXBDLGlCQWlCQztRQWZHLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBRSxPQUFPLENBQUU7YUFDMUIsSUFBSSxDQUFFLFVBQUEsR0FBRztZQUNOLElBQUcsQ0FBQyxHQUFHO2dCQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQzs7WUFDbEUsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTSxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsS0FBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLEVBQUUsSUFBSSxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUMsT0FBTzthQUN4RSxDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFD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QUN0RSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixLQUFJLENBQUMsUUFBUSxDQUFDLGdDQUFnQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5RCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEIsQ0FBQyxDQUFDO0tBQ047eUJBbExMO0VBZ0I2QixXQUFXLEVBb0t2QyxDQUFBO0FBRUQsZUFBZSxjQUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0ICogYXMgUSBmcm9tICdxJztcbmltcG9ydCBJdGVtVHlwZXMgZnJvbSAnLi4vc2hhcmVkL3R5cGVzJztcbmltcG9ydCBJdGVtU2VydmljZSBmcm9tICcuL2l0ZW0nO1xuaW1wb3J0IFF1ZXJ5IGZyb20gJy4uL3NoYXJlZC9xdWVyeSc7XG5pbXBvcnQgR1BIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvY2xpZW50JztcblxuLyoqXG4gKiBHZW9QbGF0Zm9ybSBTZXJ2aWNlIHNlcnZpY2VcbiAqIHNlcnZpY2UgZm9yIHdvcmtpbmcgd2l0aCB0aGUgR2VvUGxhdGZvcm0gQVBJIHRvXG4gKiByZXRyaWV2ZSBhbmQgbWFuaXB1bGF0ZSBzZXJ2aWNlIG9iamVjdHMuXG4gKlxuICogQHNlZSBJdGVtU2VydmljZVxuICovXG5cbmNsYXNzIFNlcnZpY2VTZXJ2aWNlIGV4dGVuZHMgSXRlbVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IodXJsOnN0cmluZywgaHR0cENsaWVudDpHUEh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybDpzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIuc2V0VXJsKGJhc2VVcmwpO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvc2VydmljZXMnO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRmV0Y2ggbWV0YWRhdGEgZnJvbSB0aGUgc3BlY2lmaWVkIEdlb1BsYXRmb3JtIFNlcnZpY2Unc1xuICAgICAqIHdlYi1hY2Nlc3NpYmxlIGltcGxlbWVudGF0aW9uIHVzaW5nIGVpdGhlciBHZXRDYXBhYmlsaXRpZXNcbiAgICAgKiBvciBFU1JJIGRvY3VtZW50SW5mby5cbiAgICAgKiBAcGFyYW0gc2VydmljZSAtIEdlb1BsYXRmb3JtIFNlcnZpY2Ugb2JqZWN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzZXJ2aWNlIG1ldGFkYXRhXG4gICAgICovXG4gICAgYWJvdXQoIHNlcnZpY2UgOiBhbnksIG9wdGlvbnMgPzogYW55ICkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggc2VydmljZSApXG4gICAgICAgIC50aGVuKCBzdmMgPT4ge1xuICAgICAgICAgICAgaWYoIXN2YylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgc2VydmljZSB0byBnZXQgbWV0YWRhdGEgYWJvdXRcIik7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLCB1cmw6dGhpcy5iYXNlVXJsICsgJy9hYm91dCcsIGRhdGE6c3ZjLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZGVzY3JpYmluZyBzZXJ2aWNlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1NlcnZpY2VTZXJ2aWNlLmFib3V0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8gcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VydmljZSB0eXBlc1xuICAgICAqL1xuICAgIHR5cGVzIChvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgbGV0IHF1ZXJ5ID0gbmV3IFF1ZXJ5KClcbiAgICAgICAgLnR5cGVzKEl0ZW1UeXBlcy5TVEFOREFSRClcbiAgICAgICAgLnJlc291cmNlVHlwZXMoJ1NlcnZpY2VUeXBlJylcbiAgICAgICAgLnBhZ2VTaXplKDUwKVxuICAgICAgICAuZ2V0UXVlcnkoKTtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBxdWVyeSApXG4gICAgICAgIC50aGVuKCAocGFyYW1zKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvaXRlbXMnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLCB1cmw6dXJsLCBwYXJhbXM6cGFyYW1zLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UucmVzdWx0cylcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZmV0Y2hpbmcgc2VydmljZSB0eXBlczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdTZXJ2aWNlU2VydmljZS50eXBlcygpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzZXJ2aWNlIC0gR1AgU2VydmljZSBkZWZpbml0aW9uXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGltcG9ydGVkIHNlcnZpY2VcbiAgICAgKi9cbiAgICBpbXBvcnQgKHNlcnZpY2UgOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBzZXJ2aWNlIClcbiAgICAgICAgLnRoZW4oIHN2YyA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9pbXBvcnQnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJywgdXJsOnVybCwgZGF0YTpzdmMsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBpbXBvcnRpbmcgc2VydmljZTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdTZXJ2aWNlU2VydmljZS5pbXBvcnQoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEdQIHNlcnZpY2UgdG8gaGFydmVzdCBsYXllcnMgZm9yXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlcnZpY2UgbGF5ZXJzXG4gICAgICovXG4gICAgaGFydmVzdCAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL2hhcnZlc3QnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgaGFydmVzdGluZyBsYXllcnMgZnJvbSBzZXJ2aWNlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1NlcnZpY2VTZXJ2aWNlLmhhcnZlc3QoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEdQIHNlcnZpY2UgdG8gbGl2ZSB0ZXN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlcnZpY2Ugc3RhdGlzdGljc1xuICAgICAqL1xuICAgIGxpdmVUZXN0IChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGlkIClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvdGVzdCc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciB0ZXN0aW5nIHNlcnZpY2U6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignU2VydmljZVNlcnZpY2UubGl2ZVRlc3QoKSAtICcgICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgR1Agc2VydmljZSB0byBmZXRjaCBzdGF0aXN0aWNzIGFib3V0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlcnZpY2Ugc3RhdGlzdGljc1xuICAgICAqL1xuICAgIHN0YXRpc3RpY3MgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGlkIClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvc3RhdGlzdGljcyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBnZXR0aW5nIHNlcnZpY2Ugc3RhdGlzdGljczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdTZXJ2aWNlU2VydmljZS5zdGF0aXN0aWNzKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTZXJ2aWNlU2VydmljZTtcbiJdfQ==