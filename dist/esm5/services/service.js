import * as tslib_1 from "tslib";
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
var ServiceService = /** @class */ (function (_super) {
    tslib_1.__extends(ServiceService, _super);
    function ServiceService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    ServiceService.prototype.setUrl = function (baseUrl) {
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
    ServiceService.prototype.about = function (service, options) {
        var _this = this;
        return this.createAndResolvePromise(service)
            .then(function (svc) {
            if (!svc)
                throw new Error("Must provide service to get metadata about");
            var opts = _this.buildRequest({
                method: 'POST', url: _this.baseUrl + '/about', data: svc, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error describing service: " + e.message);
            Object.assign(err, e);
            _this.logError('ServiceService.about() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of the parent service to fetch layers from
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results containing Layers
     */
    ServiceService.prototype.layers = function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (svcId) {
            if (!svcId)
                throw new Error("Must provide service identifier");
            var opts = _this.buildRequest({
                method: 'GET',
                url: _this.baseUrl + '/' + svcId + '/layers',
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error fetching service layers: " + e.message);
            Object.assign(err, e);
            _this.logError('ServiceService.layers() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service types
     */
    ServiceService.prototype.types = function (options) {
        var _this = this;
        var query = new Query()
            .types(ItemTypes.STANDARD)
            .resourceTypes('ServiceType')
            .pageSize(50)
            .getQuery();
        return this.createAndResolvePromise(query)
            .then(function (params) {
            var url = _this.apiBase + '/api/items';
            var opts = _this.buildRequest({
                method: 'GET', url: url, params: params, options: options
            });
            return _this.execute(opts);
        })
            .then(function (response) { return response.results; })
            .catch(function (e) {
            var err = new Error("Error fetching service types: " + e.message);
            Object.assign(err, e);
            _this.logError('ServiceService.types() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param service - GP Service definition
     * @param options - optional set of request options to apply to request
     * @return Promise resolving imported service
     */
    ServiceService.prototype.import = function (service, options) {
        var _this = this;
        return this.createAndResolvePromise(service)
            .then(function (svc) {
            var url = _this.baseUrl + '/import';
            var opts = _this.buildRequest({
                method: 'POST', url: url, data: svc, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error importing service: " + e.message);
            Object.assign(err, e);
            _this.logError('ServiceService.import() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of GP service to harvest layers for
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service layers
     */
    ServiceService.prototype.harvest = function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            var url = _this.baseUrl + '/' + id + '/harvest';
            var opts = _this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error harvesting layers from service: " + e.message);
            Object.assign(err, e);
            _this.logError('ServiceService.harvest() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of GP service to live test
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service statistics
     */
    ServiceService.prototype.liveTest = function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            var url = _this.baseUrl + '/' + id + '/test';
            var opts = _this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error testing service: " + e.message);
            Object.assign(err, e);
            _this.logError('ServiceService.liveTest() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of GP service to fetch statistics about
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service statistics
     */
    ServiceService.prototype.statistics = function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            var url = _this.baseUrl + '/' + id + '/statistics';
            var opts = _this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error getting service statistics: " + e.message);
            Object.assign(err, e);
            _this.logError('ServiceService.statistics() - ' + err.message);
            throw err;
        });
    };
    return ServiceService;
}(ItemService));
export default ServiceService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLFNBQVMsTUFBYyxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLFdBQVcsTUFBWSxRQUFRLENBQUM7QUFDdkMsT0FBTyxLQUFLLE1BQWtCLGlCQUFpQixDQUFDO0FBSWhEOzs7Ozs7R0FNRztBQUVIO0lBQTZCLDBDQUFXO0lBRXBDLHdCQUFZLEdBQVUsRUFBRSxVQUF1QjtlQUMzQyxrQkFBTSxHQUFHLEVBQUUsVUFBVSxDQUFDO0lBQzFCLENBQUM7SUFFRCwrQkFBTSxHQUFOLFVBQU8sT0FBYztRQUNqQixpQkFBTSxNQUFNLFlBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsZUFBZSxDQUFDO0lBQzdDLENBQUM7SUFHRDs7Ozs7OztPQU9HO0lBQ0gsOEJBQUssR0FBTCxVQUFPLE9BQWEsRUFBRSxPQUFjO1FBQXBDLGlCQWlCQztRQWZHLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFFLE9BQU8sQ0FBRTthQUM3QyxJQUFJLENBQUUsVUFBQSxHQUFHO1lBQ04sSUFBRyxDQUFDLEdBQUc7Z0JBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3pCLE1BQU0sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLEtBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxFQUFFLElBQUksRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFDLE9BQU87YUFDeEUsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLENBQUM7WUFDSixJ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QzdELE1BQU0sR0FBRyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILG1DQUFVLEdBQVYsVUFBWSxFQUFXLEVBQUUsT0FBYztRQUF2QyxpQkFlQztRQWRHLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFFLEVBQUUsQ0FBRTthQUN4QyxJQUFJLENBQUUsVUFBQSxFQUFFO1lBQ0wsSUFBSSxHQUFHLEdBQUcsS0FBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLGFBQWEsQ0FBQztZQUNsRCxJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN6QixNQUFNLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFDLE9BQU87YUFDekMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLENBQUM7WUFDSixJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyx1Q0FBcUMsQ0FBQyxDQUFDLE9BQVMsQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxRQUFRLENBQUMsZ0NBQWdDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlELE1BQU0sR0FBRyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUwscUJBQUM7QUFBRCxDQUFDLEFBaE1ELENBQTZCLFdBQVcsR0FnTXZDO0FBRUQsZUFBZSxjQUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IEl0ZW1UeXBlcyAgICAgICAgIGZyb20gJy4uL3NoYXJlZC90eXBlcyc7XG5pbXBvcnQgSXRlbVNlcnZpY2UgICAgICAgZnJvbSAnLi9pdGVtJztcbmltcG9ydCBRdWVyeSAgICAgICAgICAgICBmcm9tICcuLi9zaGFyZWQvcXVlcnknO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0cyB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMnO1xuaW1wb3J0IEdQSHR0cENsaWVudCAgICAgIGZyb20gJy4uL2h0dHAvY2xpZW50JztcblxuLyoqXG4gKiBHZW9QbGF0Zm9ybSBTZXJ2aWNlIHNlcnZpY2VcbiAqIHNlcnZpY2UgZm9yIHdvcmtpbmcgd2l0aCB0aGUgR2VvUGxhdGZvcm0gQVBJIHRvXG4gKiByZXRyaWV2ZSBhbmQgbWFuaXB1bGF0ZSBzZXJ2aWNlIG9iamVjdHMuXG4gKlxuICogQHNlZSBJdGVtU2VydmljZVxuICovXG5cbmNsYXNzIFNlcnZpY2VTZXJ2aWNlIGV4dGVuZHMgSXRlbVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IodXJsOnN0cmluZywgaHR0cENsaWVudDpHUEh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybDpzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIuc2V0VXJsKGJhc2VVcmwpO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvc2VydmljZXMnO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRmV0Y2ggbWV0YWRhdGEgZnJvbSB0aGUgc3BlY2lmaWVkIEdlb1BsYXRmb3JtIFNlcnZpY2Unc1xuICAgICAqIHdlYi1hY2Nlc3NpYmxlIGltcGxlbWVudGF0aW9uIHVzaW5nIGVpdGhlciBHZXRDYXBhYmlsaXRpZXNcbiAgICAgKiBvciBFU1JJIGRvY3VtZW50SW5mby5cbiAgICAgKiBAcGFyYW0gc2VydmljZSAtIEdlb1BsYXRmb3JtIFNlcnZpY2Ugb2JqZWN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzZXJ2aWNlIG1ldGFkYXRhXG4gICAgICovXG4gICAgYWJvdXQoIHNlcnZpY2UgOiBhbnksIG9wdGlvbnMgPzogYW55ICkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBzZXJ2aWNlIClcbiAgICAgICAgLnRoZW4oIHN2YyA9PiB7XG4gICAgICAgICAgICBpZighc3ZjKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBzZXJ2aWNlIHRvIGdldCBtZXRhZGF0YSBhYm91dFwiKTtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsIHVybDp0aGlzLmJhc2VVcmwgKyAnL2Fib3V0JywgZGF0YTpzdmMsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBkZXNjcmliaW5nIHNlcnZpY2U6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignU2VydmljZVNlcnZpY2UuYWJvdXQoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIHRoZSBwYXJlbnQgc2VydmljZSB0byBmZXRjaCBsYXllcnMgZnJvbVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VhcmNoIHJlc3VsdHMgY29udGFpbmluZyBMYXllcnNcbiAgICAgKi9cbiAgICBsYXllcnMoIGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSApIDogUHJvbWlzZTxTZWFyY2hSZXN1bHRzPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoaWQpXG4gICAgICAgIC50aGVuKCBzdmNJZCA9PiB7XG4gICAgICAgICAgICBpZighc3ZjSWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIHNlcnZpY2UgaWRlbnRpZmllclwiKTtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6dGhpcy5iYXNlVXJsICsgJy8nICsgc3ZjSWQgKyAnL2xheWVycycsXG4gICAgICAgICAgICAgICAgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIHNlcnZpY2UgbGF5ZXJzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1NlcnZpY2VTZXJ2aWNlLmxheWVycygpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzZXJ2aWNlIHR5cGVzXG4gICAgICovXG4gICAgdHlwZXMgKG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgbGV0IHF1ZXJ5ID0gbmV3IFF1ZXJ5KClcbiAgICAgICAgLnR5cGVzKEl0ZW1UeXBlcy5TVEFOREFSRClcbiAgICAgICAgLnJlc291cmNlVHlwZXMoJ1NlcnZpY2VUeXBlJylcbiAgICAgICAgLnBhZ2VTaXplKDUwKVxuICAgICAgICAuZ2V0UXVlcnkoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggcXVlcnkgKVxuICAgICAgICAudGhlbiggKHBhcmFtcykgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYXBpQmFzZSArICcvYXBpL2l0ZW1zJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJywgdXJsOnVybCwgcGFyYW1zOnBhcmFtcywgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnJlc3VsdHMpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIHNlcnZpY2UgdHlwZXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignU2VydmljZVNlcnZpY2UudHlwZXMoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNlcnZpY2UgLSBHUCBTZXJ2aWNlIGRlZmluaXRpb25cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8gcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgaW1wb3J0ZWQgc2VydmljZVxuICAgICAqL1xuICAgIGltcG9ydCAoc2VydmljZSA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggc2VydmljZSApXG4gICAgICAgIC50aGVuKCBzdmMgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvaW1wb3J0JztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsIHVybDp1cmwsIGRhdGE6c3ZjLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgaW1wb3J0aW5nIHNlcnZpY2U6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignU2VydmljZVNlcnZpY2UuaW1wb3J0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgR1Agc2VydmljZSB0byBoYXJ2ZXN0IGxheWVycyBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8gcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VydmljZSBsYXllcnNcbiAgICAgKi9cbiAgICBoYXJ2ZXN0IChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggaWQgKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy9oYXJ2ZXN0JztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJywgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGhhcnZlc3RpbmcgbGF5ZXJzIGZyb20gc2VydmljZTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdTZXJ2aWNlU2VydmljZS5oYXJ2ZXN0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgR1Agc2VydmljZSB0byBsaXZlIHRlc3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8gcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VydmljZSBzdGF0aXN0aWNzXG4gICAgICovXG4gICAgbGl2ZVRlc3QgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL3Rlc3QnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgdGVzdGluZyBzZXJ2aWNlOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ1NlcnZpY2VTZXJ2aWNlLmxpdmVUZXN0KCkgLSAnICArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBHUCBzZXJ2aWNlIHRvIGZldGNoIHN0YXRpc3RpY3MgYWJvdXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8gcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VydmljZSBzdGF0aXN0aWNzXG4gICAgICovXG4gICAgc3RhdGlzdGljcyAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL3N0YXRpc3RpY3MnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZ2V0dGluZyBzZXJ2aWNlIHN0YXRpc3RpY3M6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignU2VydmljZVNlcnZpY2Uuc3RhdGlzdGljcygpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZpY2VTZXJ2aWNlO1xuIl19