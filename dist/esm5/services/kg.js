import * as tslib_1 from "tslib";
import BaseService from './base';
var KGService = /** @class */ (function (_super) {
    tslib_1.__extends(KGService, _super);
    // @ts-ignore
    // private apiBase : string;
    // @ts-ignore
    // private baseUrl : string;
    // private client : GPHttpClient;
    // private timeout : number = 30000;
    // private httpMethods : string[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    function KGService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    KGService.prototype.setUrl = function (baseUrl) {
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl + '/api/recommender';
    };
    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving recommended concepts as search results
     */
    KGService.prototype.suggest = function (query, options) {
        var _this = this;
        var url = this.baseUrl + '/suggest';
        return this._search(url, query, options)
            .catch(function (e) {
            _this.logError('KGService.suggest() - ' + e.message);
            var err = new Error("Error suggesting concepts: " + e.message);
            Object.assign(err, e);
            throw err;
        });
    };
    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving concept types as search results
     */
    KGService.prototype.types = function (query, options) {
        var _this = this;
        var url = this.baseUrl + '/types';
        return this._search(url, query, options)
            .catch(function (e) {
            _this.logError('KGService.types() - ' + e.message);
            var err = new Error("Error searching types: " + e.message);
            Object.assign(err, e);
            throw err;
        });
    };
    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving concept sources as search results
     */
    KGService.prototype.sources = function (query, options) {
        var _this = this;
        var url = this.baseUrl + '/sources';
        return this._search(url, query, options)
            .catch(function (e) {
            _this.logError('KGService.sources() - ' + e.message);
            var err = new Error("Error searching sources: " + e.message);
            Object.assign(err, e);
            throw err;
        });
    };
    /* ----------------------------------------------------------- */
    /**
     * internal method used by exposed methods
     */
    KGService.prototype._search = function (url, query, options) {
        var _this = this;
        return this.createAndResolvePromise(url)
            .then(function (url) {
            var q = query.getQuery();
            var opts = _this.buildRequest({
                method: "GET", url: url, params: q, options: options
            });
            return _this.execute(opts);
        });
    };
    return KGService;
}(BaseService));
export default KGService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMva2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLE9BQU8sV0FBVyxNQUFNLFFBQVEsQ0FBQztBQUlqQztJQUF3QixxQ0FBVztJQUUvQixhQUFhO0lBQ2IsNEJBQTRCO0lBQzVCLGFBQWE7SUFDYiw0QkFBNEI7SUFDNUIsaUNBQWlDO0lBQ2pDLG9DQUFvQztJQUNwQyw4RUFBOEU7SUFFOUUsbUJBQVksR0FBWSxFQUFFLFVBQXlCO2VBQy9DLGtCQUFNLEdBQUcsRUFBRSxVQUFVLENBQUM7SUFDMUIsQ0FBQztJQUVELDBCQUFNLEdBQU4sVUFBTyxPQUFnQjtRQUNuQixpQkFBTSxNQUFNLFlBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwyQkFBTyxHQUFQLFVBQVMsS0FBZSxFQUFFLE9BQWM7UUFBeEMsaUJBVUM7UUFSRyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7YUFDdkMsS0FBSyxDQUFDLFVBQUEsQ0FBQztZQUNKLEtBQUksQ0FBQyxRQUFRLENBQUMsd0JBQXdCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BELElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLGdDQUE4QixDQUFDLENBQUMsT0FBUyxDQUFDLENBQUM7WUFDL0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxHQUFHLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRDs7OztPQUlHO0lBQ0gseUJBQUssR0FBTCxVQUFPLEtBQWUsRUFBRSxPQUFjO1FBQXRDLGlCQVNDO1FBUkcsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO2FBQ3ZDLEtBQUssQ0FBQyxVQUFBLENBQUM7WUFDSixLQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsRCxJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyw0QkFBMEIsQ0FBQyxDQUFDLE9BQVMsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sR0FBRyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBSUQ7Ozs7T0FJRztJQUNILDJCQUFPLEdBQVAsVUFBUyxLQUFlLEVBQUUsT0FBYztRQUF4QyxpQkFTQztRQVJHLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQzthQUN2QyxLQUFLLENBQUMsVUFBQSxDQUFDO1lBQ0osS0FBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEQsSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsOEJBQTRCLENBQUMsQ0FBQyxPQUFTLENBQUMsQ0FBQztZQUM3RCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQU1ELGlFQUFpRTtJQUdqRTs7T0FFRztJQUNILDJCQUFPLEdBQVAsVUFBUyxHQUFZLEVBQUUsS0FBZSxFQUFFLE9BQWM7UUFBdEQsaUJBU0M7UUFSRyxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBRSxHQUFHLENBQUU7YUFDekMsSUFBSSxDQUFFLFVBQUMsR0FBRztZQUNQLElBQUksQ0FBQyxHQUEwQixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEQsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFDLE9BQU87YUFDbkQsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXdDTCxnQkFBQztBQUFELENBQUMsQUFsSUQsQ0FBd0IsV0FBVyxHQWtJbEM7QUFFRCxlQUFlLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCBLR1F1ZXJ5IGZyb20gJy4uL3NoYXJlZC9rZy1xdWVyeSc7XG5pbXBvcnQgR1BIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvY2xpZW50JztcblxuaW1wb3J0IEJhc2VTZXJ2aWNlIGZyb20gJy4vYmFzZSc7XG5cblxuXG5jbGFzcyBLR1NlcnZpY2UgZXh0ZW5kcyBCYXNlU2VydmljZSB7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgLy8gcHJpdmF0ZSBhcGlCYXNlIDogc3RyaW5nO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICAvLyBwcml2YXRlIGJhc2VVcmwgOiBzdHJpbmc7XG4gICAgLy8gcHJpdmF0ZSBjbGllbnQgOiBHUEh0dHBDbGllbnQ7XG4gICAgLy8gcHJpdmF0ZSB0aW1lb3V0IDogbnVtYmVyID0gMzAwMDA7XG4gICAgLy8gcHJpdmF0ZSBodHRwTWV0aG9kcyA6IHN0cmluZ1tdID0gW1wiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJdO1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmwgOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIuc2V0VXJsKGJhc2VVcmwpO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvcmVjb21tZW5kZXInO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBxdWVyeSAtIG9wdGlvbmFsIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB3aXRoIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIGNvbmZpZyB0byBzZW5kIHdpdGggaHR0cCByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyByZWNvbW1lbmRlZCBjb25jZXB0cyBhcyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHN1Z2dlc3QgKHF1ZXJ5IDogS0dRdWVyeSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9zdWdnZXN0JztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaCh1cmwsIHF1ZXJ5LCBvcHRpb25zKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdLR1NlcnZpY2Uuc3VnZ2VzdCgpIC0gJyArIGUubWVzc2FnZSk7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBzdWdnZXN0aW5nIGNvbmNlcHRzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcXVlcnkgLSBvcHRpb25hbCBxdWVyeSBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgd2l0aCByZXF1ZXN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBjb25maWcgdG8gc2VuZCB3aXRoIGh0dHAgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgY29uY2VwdCB0eXBlcyBhcyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHR5cGVzIChxdWVyeSA6IEtHUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL3R5cGVzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaCh1cmwsIHF1ZXJ5LCBvcHRpb25zKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdLR1NlcnZpY2UudHlwZXMoKSAtICcgKyBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igc2VhcmNoaW5nIHR5cGVzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBxdWVyeSAtIG9wdGlvbmFsIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB3aXRoIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIGNvbmZpZyB0byBzZW5kIHdpdGggaHR0cCByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBjb25jZXB0IHNvdXJjZXMgYXMgc2VhcmNoIHJlc3VsdHNcbiAgICAgKi9cbiAgICBzb3VyY2VzIChxdWVyeSA6IEtHUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL3NvdXJjZXMnO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VhcmNoKHVybCwgcXVlcnksIG9wdGlvbnMpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0tHU2VydmljZS5zb3VyY2VzKCkgLSAnICsgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHNlYXJjaGluZyBzb3VyY2VzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuXG5cbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgICAvKipcbiAgICAgKiBpbnRlcm5hbCBtZXRob2QgdXNlZCBieSBleHBvc2VkIG1ldGhvZHNcbiAgICAgKi9cbiAgICBfc2VhcmNoICh1cmwgOiBzdHJpbmcsIHF1ZXJ5IDogS0dRdWVyeSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHVybCApXG4gICAgICAgIC50aGVuKCAodXJsKSA9PiB7XG4gICAgICAgICAgICBsZXQgcSA6IHsgW2tleTpzdHJpbmddOmFueSB9ID0gcXVlcnkuZ2V0UXVlcnkoKTtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBwYXJhbXM6cSwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiBAcGFyYW0gbWV0aG9kIC0gb25lIG9mIFwiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJcbiAgICAvLyAgKiBAcGFyYW0gdXJsIC0gZGVzdGluYXRpb24gb2YgeGhyIHJlcXVlc3RcbiAgICAvLyAgKiBAcGFyYW0gcGFyYW1zIC0gb2JqZWN0IHRvIGJlIHNlbnQgd2l0aCByZXF1ZXN0IGFzIHF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAvLyAgKiBAcGFyYW0gZGF0YSAtIG9iamVjdCB0byBiZSBzZW50IHdpdGggcmVxdWVzdCBhcyBib2R5XG4gICAgLy8gICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBvYmplY3QgZGVmaW5pbmcgcmVxdWVzdCBvcHRpb25zXG4gICAgLy8gICogQHJldHVybiByZXF1ZXN0IG9wdGlvbnMgZm9yIHhoclxuICAgIC8vICAqL1xuICAgIC8vIGJ1aWxkUmVxdWVzdCAob3B0aW9ucyA6IHtba2V5OnN0cmluZ106YW55fSkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuICAgIC8vXG4gICAgLy8gICAgIGlmKHRoaXMuaHR0cE1ldGhvZHMuaW5kZXhPZihvcHRpb25zLm1ldGhvZCk8MClcbiAgICAvLyAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgSFRUUCBtZXRob2QgJHtvcHRpb25zLm1ldGhvZH1gKTtcbiAgICAvL1xuICAgIC8vICAgICBpZighb3B0aW9ucy51cmwpXG4gICAgLy8gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE11c3Qgc3BlY2lmeSBhIFVSTCBmb3IgSFRUUCByZXF1ZXN0c2ApO1xuICAgIC8vXG4gICAgLy8gICAgIG9wdGlvbnMudGltZW91dCA9IHRoaXMudGltZW91dCB8fCBDb25maWcudGltZW91dCB8fCAzMDAwMDtcbiAgICAvL1xuICAgIC8vICAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zKTtcbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyBjcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zIDoge1trZXk6c3RyaW5nXTphbnl9KSA6IHtba2V5OnN0cmluZ106YW55fSB7XG4gICAgLy8gICAgIHJldHVybiB0aGlzLmNsaWVudC5jcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zKTtcbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyBleGVjdXRlKG9wdHMgOiB7W2tleTpzdHJpbmddOmFueX0pIDogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuY2xpZW50LmV4ZWN1dGUob3B0cylcbiAgICAvLyAgICAgLmNhdGNoKGUgPT4ge1xuICAgIC8vICAgICAgICAgaWYoZSA9PT0gbnVsbCB8fCB0eXBlb2YoZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gICAgICAgICAgICAgZSA9IG5ldyBFcnJvcihcIktHU2VydmljZS5leGVjdXRlKCkgLSBSZXF1ZXN0IGZhaWxlZCBidXQgZGlkbid0IHJldHVybiBhbiBcIiArXG4gICAgLy8gICAgICAgICAgICAgXCJlcnJvci4gVGhpcyBpcyBtb3N0IGxpa2VseSBiZWNhdXNlIHRoZSByZXF1ZXN0IHRpbWVkIG91dFwiKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIHRocm93IGU7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBLR1NlcnZpY2U7XG4iXX0=