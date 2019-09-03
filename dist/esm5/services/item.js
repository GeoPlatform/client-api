import * as tslib_1 from "tslib";
import BaseService from './base';
/**
 * ItemService
 * service for working with the GeoPlatform API to
 * retrieve and manipulate items.
 *
 * Ex Searching Items
 *      let params = { q: 'test' };
 *      itemService.search(params).then(response=>{
 *          console.log(response.results.length + " of " + response.totalResults);
 *      }).catch(e=>{...});
 *
 * Ex Fetch Item:
 *      itemService.get(itemId).then(item=>{...}).catch(e=>{...});
 *
 * Ex Saving Item:
 *      itemService.save(item).then(item=>{...}).catch(e=>{...});
 *
 * Ex Deleting Item:
 *      itemService.remove(itemId).then(()=>{...}).catch(e=>{...});
 *
 * Ex Patching Item:
 *      itemService.patch(itemId,patch).then(item=>{...}).catch(e=>{...});
 *
 */
var ItemService = /** @class */ (function (_super) {
    tslib_1.__extends(ItemService, _super);
    function ItemService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    /**
     * @param id - identifier of item to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    ItemService.prototype.get = function (id, options) {
        var _this = this;
        var url = this.baseUrl + '/' + id;
        if (options && options.version) {
            url += '/versions/' + options.version;
            // this.logDebug("Client.get requesting version: " + options.version);
        }
        return this.createAndResolvePromise(url)
            .then(function (url) {
            var opts = _this.buildRequest({ method: "GET", url: url, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error fetching item " + id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.get() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param itemObj - item to create or update
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    ItemService.prototype.save = function (itemObj, options) {
        var _this = this;
        return this.createAndResolvePromise(itemObj)
            .then(function (item) {
            var method = 'POST', url = _this.baseUrl;
            if (item.id) {
                method = "PUT";
                url += '/' + item.id;
            }
            else {
                //if item is being created and has no URI already defined
                // attempt to create one using the API's method for doing so
                // and then attempt the actual item creation
                if (!item.uri) {
                    return _this.getUri(item, options)
                        .then(function (uri) {
                        item.uri = uri;
                        var opts = _this.buildRequest({ method: method, url: url, data: item, options: options });
                        return _this.execute(opts);
                    });
                }
            }
            var opts = _this.buildRequest({ method: method, url: url, data: item, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error saving item: " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.save() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of item to delete
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving true if successful or an error
     */
    ItemService.prototype.remove = function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(this.baseUrl + '/' + id)
            .then(function (url) {
            var opts = _this.buildRequest({
                method: "DELETE", url: url, options: options
            });
            return _this.execute(opts);
        })
            .then(function () { return true; })
            .catch(function (e) {
            var err = new Error("Error deleting item " + id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.remove() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of item to patch
     * @param patch - HTTP-PATCH compliant set of properties to patch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    ItemService.prototype.patch = function (id, patch, options) {
        var _this = this;
        return this.createAndResolvePromise(this.baseUrl + '/' + id)
            .then(function (url) {
            var opts = _this.buildRequest({
                method: "PATCH", url: url, data: patch, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error patching item " + id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.patch() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of item to clone
     * @param overrides - KVP of property-value overrides to apply to cloned instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving clone of Item or an error
     */
    ItemService.prototype.clone = function (id, overrides, options) {
        var _this = this;
        return this.createAndResolvePromise(this.baseUrl + '/' + id + '/clone')
            .then(function (url) {
            var opts = _this.buildRequest({
                method: "POST", url: url, data: overrides, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error cloning item " + id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.clone() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param arg - either JS object of query parameters or Query instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    ItemService.prototype.search = function (arg, options) {
        var _this = this;
        return this.createAndResolvePromise(arg)
            .then(function (params) {
            var ps = {};
            if (params && typeof (params.getQuery) === 'function')
                ps = params.getQuery();
            else if (typeof (params) === 'object')
                ps = params;
            else
                ps = {};
            var opts = _this.buildRequest({
                method: "GET",
                url: _this.baseUrl,
                params: ps,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error searching items: " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.search() - ' + err.message);
            throw err;
        });
    };
    /**
     *
     * @param arg - URL to metadata document or File to upload
     * @param format - metadata format of specified document
     * @return Promise resolving GeoPlatform Item
     */
    ItemService.prototype.import = function (arg, format, options) {
        var _this = this;
        return this.createAndResolvePromise(true)
            .then(function () {
            if (arg === null || arg === undefined) {
                throw new Error("Must provide a valid URL or File");
            }
            var isFile = typeof (arg) !== 'string';
            var ro = {
                method: "POST",
                url: _this.apiBase + '/api/import',
                processData: true,
                formData: true,
                options: options
            };
            if (isFile) {
                ro.file = arg;
                ro.data = { format: format };
            }
            else {
                ro.formData = false; //must be false for data to not be multi-part formdata
                ro.data = { url: arg, format: format };
            }
            if (options && options.overwrite) {
                ro.data.overwrite = (!!options.overwrite) + '';
                delete options.overwrite;
            }
            var opts = _this.buildRequest(ro);
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error importing item: " + e.message);
            Object.assign(err, e);
            if (e.status === 409 || ~e.message.indexOf('Item already exists'))
                Object.assign(err, { status: 409 });
            if (e.item)
                Object.assign(err, { item: e.item });
            _this.logError('ItemService.import() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of the item to export
     * @param format - string mime type to export
     * @return Promise resolving HTTP response object for enabling attachment downloading
     */
    ItemService.prototype.export = function (id, format, options) {
        var _this = this;
        return this.createAndResolvePromise(true)
            .then(function () {
            var url = _this.baseUrl + '/' + id + '/export';
            var opts = _this.buildRequest({
                method: "GET", url: url,
                params: { format: format },
                json: false,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var msg = e.message;
            //https://github.com/GeoPlatform/client-api/issues/1
            if (e.statusCode && e.statusCode === 406 || e.statusCode === '406') {
                msg = "Unsupported export format specified '" + format + "'";
            }
            var err = new Error("Error exporting item: " + msg);
            Object.assign(err, e);
            _this.logError('ItemService.export() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param object - GP object definition to generate a URI for
     * @param options - optional request options
     * @return Promise resolving string URI
     */
    ItemService.prototype.getUri = function (object, options) {
        var _this = this;
        return this.createAndResolvePromise(object)
            .then(function (obj) {
            if (!obj || !obj.type)
                throw new Error("Must provide an object with a type property");
            var url = _this.apiBase + '/api/utils/uri';
            options = options || {};
            options.responseType = 'text'; //to ensure plaintext is expected
            var opts = _this.buildRequest({
                method: "POST", url: url, data: obj, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error getting URI for item: " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.getUri() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param ids - list of identifiers to fetch objects for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving list of matching items or an error
     */
    ItemService.prototype.getMultiple = function (ids, options) {
        var _this = this;
        return this.createAndResolvePromise(ids)
            .then(function (identifiers) {
            var method = 'POST', url = _this.apiBase + '/api/fetch';
            var opts = _this.buildRequest({ method: method, url: url, data: identifiers, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error fetching items: " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.getMultiple() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param uris - list of URIs to retrieve objects for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving list containing uri-item association where exists
     */
    ItemService.prototype.exists = function (uris, options) {
        var _this = this;
        return this.createAndResolvePromise(uris)
            .then(function (uris) {
            var method = 'POST', url = _this.apiBase + '/api/utils/exists';
            var opts = _this.buildRequest({ method: method, url: url, data: uris, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error resolving items: " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.exists() - ' + err.message);
            throw err;
        });
    };
    ItemService.prototype.like = function (item, options) {
        var _this = this;
        return this.createAndResolvePromise(item.id)
            .then(function (id) {
            var method = 'PUT', url = _this.apiBase + '/api/items/' + id + '/likes';
            var opts = _this.buildRequest({ method: method, url: url, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error liking item " + item.id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.like() - ' + err.message);
            throw err;
        });
    };
    ItemService.prototype.view = function (item, options) {
        var _this = this;
        return this.createAndResolvePromise(item.id)
            .then(function (id) {
            var method = 'PUT', url = _this.apiBase + '/api/items/' + id + '/views';
            var opts = _this.buildRequest({ method: method, url: url, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error incrementing views for item " + item.id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.like() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of item to fetch associations for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving array of associated items of the item in question
     */
    ItemService.prototype.associations = function (id, params, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
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
            var err = new Error("Error fetching associations for item " + id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.associations() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of item to fetch version info for
     * @param params - optional set of query parameters to constrain list of versions
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving array of available versions of the item
     */
    ItemService.prototype.versions = function (id, params, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            var url = _this.baseUrl + '/' + id + '/versions';
            var opts = _this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("Error fetching versions for item " + id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.versions() - ' + err.message);
            throw err;
        });
    };
    return ItemService;
}(BaseService));
export default ItemService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFLQSxPQUFPLFdBQVcsTUFBTSxRQUFRLENBQUM7QUFFakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0g7SUFBMEIsdUNBQVc7SUFFakMscUJBQVksR0FBWSxFQUFFLFVBQXlCO2VBQy9DLGtCQUFNLEdBQUcsRUFBRSxVQUFVLENBQUM7SUFDMUIsQ0FBQztJQUdEOzs7O09BSUc7SUFDSCx5QkFBRyxHQUFILFVBQUssRUFBVyxFQUFFLE9BQWM7UUFBaEMsaUJBa0JDO1FBaEJHLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNsQyxJQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQzNCLEdBQUcsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUN0QyxzRUFBc0U7U0FDekU7UUFDRCxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBRSxHQUFHLENBQUU7YUFDekMsSUFBSSxDQUFFLFVBQUEsR0FBRztZQUNOLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxNQUFNLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDekUsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLENBQUM7WUFDSixJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyx5QkFBdUIsRUFBRSxVQUFLLENBQUMsQ0FBQyxPQUFTLENBQUMsQ0FBQztZQUMvRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMs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LFdBQVcsQ0FBQztZQUNoRCxJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN6QixNQUFNLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUMsT0FBTzthQUN6RCxDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsQ0FBQztZQUNKLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLHNDQUFvQyxFQUFFLFVBQUssQ0FBQyxDQUFDLE9BQVMsQ0FBQyxDQUFDO1lBQzVFLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELE1BQU0sR0FBRyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBNkNMLGtCQUFDO0FBQUQsQ0FBQyxBQXRjRCxDQUEwQixXQUFXLEdBc2NwQztBQUVELGVBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBJdGVtLCBTZWFyY2hSZXN1bHRzIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscyc7XG5pbXBvcnQgUXVlcnkgZnJvbSAnLi4vc2hhcmVkL3F1ZXJ5JztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuXG5pbXBvcnQgQmFzZVNlcnZpY2UgZnJvbSAnLi9iYXNlJztcblxuLyoqXG4gKiBJdGVtU2VydmljZVxuICogc2VydmljZSBmb3Igd29ya2luZyB3aXRoIHRoZSBHZW9QbGF0Zm9ybSBBUEkgdG9cbiAqIHJldHJpZXZlIGFuZCBtYW5pcHVsYXRlIGl0ZW1zLlxuICpcbiAqIEV4IFNlYXJjaGluZyBJdGVtc1xuICogICAgICBsZXQgcGFyYW1zID0geyBxOiAndGVzdCcgfTtcbiAqICAgICAgaXRlbVNlcnZpY2Uuc2VhcmNoKHBhcmFtcykudGhlbihyZXNwb25zZT0+e1xuICogICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UucmVzdWx0cy5sZW5ndGggKyBcIiBvZiBcIiArIHJlc3BvbnNlLnRvdGFsUmVzdWx0cyk7XG4gKiAgICAgIH0pLmNhdGNoKGU9PnsuLi59KTtcbiAqXG4gKiBFeCBGZXRjaCBJdGVtOlxuICogICAgICBpdGVtU2VydmljZS5nZXQoaXRlbUlkKS50aGVuKGl0ZW09PnsuLi59KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICogRXggU2F2aW5nIEl0ZW06XG4gKiAgICAgIGl0ZW1TZXJ2aWNlLnNhdmUoaXRlbSkudGhlbihpdGVtPT57Li4ufSkuY2F0Y2goZT0+ey4uLn0pO1xuICpcbiAqIEV4IERlbGV0aW5nIEl0ZW06XG4gKiAgICAgIGl0ZW1TZXJ2aWNlLnJlbW92ZShpdGVtSWQpLnRoZW4oKCk9PnsuLi59KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICogRXggUGF0Y2hpbmcgSXRlbTpcbiAqICAgICAgaXRlbVNlcnZpY2UucGF0Y2goaXRlbUlkLHBhdGNoKS50aGVuKGl0ZW09PnsuLi59KS5jYXRjaChlPT57Li4ufSk7XG4gKlxuICovXG5jbGFzcyBJdGVtU2VydmljZSBleHRlbmRzIEJhc2VTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcih1cmwsIGh0dHBDbGllbnQpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBpdGVtIHRvIGZldGNoXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGdldCAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZDtcbiAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLnZlcnNpb24pIHtcbiAgICAgICAgICAgIHVybCArPSAnL3ZlcnNpb25zLycgKyBvcHRpb25zLnZlcnNpb247XG4gICAgICAgICAgICAvLyB0aGlzLmxvZ0RlYnVnKFwiQ2xpZW50LmdldCByZXF1ZXN0aW5nIHZlcnNpb246IFwiICsgb3B0aW9ucy52ZXJzaW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdXJsIClcbiAgICAgICAgLnRoZW4oIHVybCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHsgbWV0aG9kOlwiR0VUXCIsIHVybDp1cmwsIG9wdGlvbnM6b3B0aW9ucyB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuZ2V0KCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaXRlbU9iaiAtIGl0ZW0gdG8gY3JlYXRlIG9yIHVwZGF0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBzYXZlIChpdGVtT2JqIDogSXRlbSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIGl0ZW1PYmogKVxuICAgICAgICAudGhlbiggaXRlbSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBtZXRob2QgPSAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5iYXNlVXJsO1xuICAgICAgICAgICAgaWYoaXRlbS5pZCkge1xuICAgICAgICAgICAgICAgIG1ldGhvZCA9IFwiUFVUXCI7XG4gICAgICAgICAgICAgICAgdXJsICs9ICcvJyArIGl0ZW0uaWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vaWYgaXRlbSBpcyBiZWluZyBjcmVhdGVkIGFuZCBoYXMgbm8gVVJJIGFscmVhZHkgZGVmaW5lZFxuICAgICAgICAgICAgICAgIC8vIGF0dGVtcHQgdG8gY3JlYXRlIG9uZSB1c2luZyB0aGUgQVBJJ3MgbWV0aG9kIGZvciBkb2luZyBzb1xuICAgICAgICAgICAgICAgIC8vIGFuZCB0aGVuIGF0dGVtcHQgdGhlIGFjdHVhbCBpdGVtIGNyZWF0aW9uXG4gICAgICAgICAgICAgICAgaWYoIWl0ZW0udXJpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFVyaShpdGVtLCBvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAudGhlbiggdXJpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udXJpID0gdXJpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgZGF0YTppdGVtLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgZGF0YTppdGVtLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG5cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igc2F2aW5nIGl0ZW06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2Uuc2F2ZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBpdGVtIHRvIGRlbGV0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgdHJ1ZSBpZiBzdWNjZXNzZnVsIG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgcmVtb3ZlIChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxib29sZWFuPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHRoaXMuYmFzZVVybCArICcvJyArIGlkIClcbiAgICAgICAgLnRoZW4oIHVybCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJERUxFVEVcIiwgdXJsOiB1cmwsIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oICgpID0+IHRydWUpXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGRlbGV0aW5nIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UucmVtb3ZlKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gcGF0Y2hcbiAgICAgKiBAcGFyYW0gcGF0Y2ggLSBIVFRQLVBBVENIIGNvbXBsaWFudCBzZXQgb2YgcHJvcGVydGllcyB0byBwYXRjaFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBwYXRjaCAoaWQgOiBzdHJpbmcsIHBhdGNoIDogYW55LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKVxuICAgICAgICAudGhlbiggdXJsID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQQVRDSFwiLCB1cmw6IHVybCwgZGF0YTogcGF0Y2gsIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgcGF0Y2hpbmcgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5wYXRjaCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gY2xvbmVcbiAgICAgKiBAcGFyYW0gb3ZlcnJpZGVzIC0gS1ZQIG9mIHByb3BlcnR5LXZhbHVlIG92ZXJyaWRlcyB0byBhcHBseSB0byBjbG9uZWQgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGNsb25lIG9mIEl0ZW0gb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBjbG9uZSAoaWQgOiBzdHJpbmcsIG92ZXJyaWRlcyA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy9jbG9uZScgKVxuICAgICAgICAudGhlbiggdXJsID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsIHVybDogdXJsLCBkYXRhOiBvdmVycmlkZXMsIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgY2xvbmluZyBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmNsb25lKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnIC0gZWl0aGVyIEpTIG9iamVjdCBvZiBxdWVyeSBwYXJhbWV0ZXJzIG9yIFF1ZXJ5IGluc3RhbmNlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHNlYXJjaCAoYXJnID86IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxTZWFyY2hSZXN1bHRzPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIGFyZyApXG4gICAgICAgIC50aGVuKCBwYXJhbXMgPT4ge1xuICAgICAgICAgICAgbGV0IHBzID0ge307XG4gICAgICAgICAgICBpZihwYXJhbXMgJiYgdHlwZW9mKHBhcmFtcy5nZXRRdWVyeSkgPT09ICdmdW5jdGlvbicpIHBzID0gcGFyYW1zLmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICBlbHNlIGlmKHR5cGVvZihwYXJhbXMpID09PSAnb2JqZWN0JykgcHMgPSBwYXJhbXM7XG4gICAgICAgICAgICBlbHNlIHBzID0ge307XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYmFzZVVybCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBzLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igc2VhcmNoaW5nIGl0ZW1zOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLnNlYXJjaCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhcmcgLSBVUkwgdG8gbWV0YWRhdGEgZG9jdW1lbnQgb3IgRmlsZSB0byB1cGxvYWRcbiAgICAgKiBAcGFyYW0gZm9ybWF0IC0gbWV0YWRhdGEgZm9ybWF0IG9mIHNwZWNpZmllZCBkb2N1bWVudFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgR2VvUGxhdGZvcm0gSXRlbVxuICAgICAqL1xuICAgIGltcG9ydCAoYXJnIDogYW55LCBmb3JtYXQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCB0cnVlIClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIGlmKGFyZz09PW51bGwgfHwgYXJnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgYSB2YWxpZCBVUkwgb3IgRmlsZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBpc0ZpbGUgPSB0eXBlb2YoYXJnKSAhPT0gJ3N0cmluZyc7XG4gICAgICAgICAgICBsZXQgcm8gOiB7IFtrZXk6c3RyaW5nXTphbnkgfSA9IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmFwaUJhc2UgKyAnL2FwaS9pbXBvcnQnLFxuICAgICAgICAgICAgICAgIHByb2Nlc3NEYXRhOiB0cnVlLCAgLy9mb3IgalF1ZXJ5XG4gICAgICAgICAgICAgICAgZm9ybURhdGE6IHRydWUsICAgICAvL2ZvciBOb2RlIChSZXF1ZXN0SlMpXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKGlzRmlsZSkge1xuICAgICAgICAgICAgICAgIHJvLmZpbGUgPSBhcmc7XG4gICAgICAgICAgICAgICAgcm8uZGF0YSA9IHsgZm9ybWF0OiBmb3JtYXQgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm8uZm9ybURhdGEgPSBmYWxzZTsgICAgLy9tdXN0IGJlIGZhbHNlIGZvciBkYXRhIHRvIG5vdCBiZSBtdWx0aS1wYXJ0IGZvcm1kYXRhXG4gICAgICAgICAgICAgICAgcm8uZGF0YSA9IHsgdXJsOiBhcmcsIGZvcm1hdDogZm9ybWF0IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMub3ZlcndyaXRlKSB7XG4gICAgICAgICAgICAgICAgcm8uZGF0YS5vdmVyd3JpdGUgPSAoISFvcHRpb25zLm92ZXJ3cml0ZSkrJyc7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMub3ZlcndyaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdChybyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgaW1wb3J0aW5nIGl0ZW06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgaWYoZS5zdGF0dXMgPT09IDQwOSB8fCB+ZS5tZXNzYWdlLmluZGV4T2YoJ0l0ZW0gYWxyZWFkeSBleGlzdHMnKSlcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwge3N0YXR1czogNDA5fSk7XG4gICAgICAgICAgICBpZihlLml0ZW0pXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIHsgaXRlbSA6IGUuaXRlbSB9KTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmltcG9ydCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgdGhlIGl0ZW0gdG8gZXhwb3J0XG4gICAgICogQHBhcmFtIGZvcm1hdCAtIHN0cmluZyBtaW1lIHR5cGUgdG8gZXhwb3J0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBIVFRQIHJlc3BvbnNlIG9iamVjdCBmb3IgZW5hYmxpbmcgYXR0YWNobWVudCBkb3dubG9hZGluZ1xuICAgICAqL1xuICAgIGV4cG9ydCAoaWQgOiBzdHJpbmcsIGZvcm1hdCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdHJ1ZSApXG4gICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL2V4cG9ydCc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge2Zvcm1hdDpmb3JtYXR9LFxuICAgICAgICAgICAgICAgIGpzb246IGZhbHNlLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCBlID0+IHtcbiAgICAgICAgICAgIGxldCBtc2cgPSBlLm1lc3NhZ2U7XG4gICAgICAgICAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9HZW9QbGF0Zm9ybS9jbGllbnQtYXBpL2lzc3Vlcy8xXG4gICAgICAgICAgICBpZihlLnN0YXR1c0NvZGUgJiYgZS5zdGF0dXNDb2RlPT09NDA2IHx8IGUuc3RhdHVzQ29kZT09PSc0MDYnKSB7XG4gICAgICAgICAgICAgICAgbXNnID0gYFVuc3VwcG9ydGVkIGV4cG9ydCBmb3JtYXQgc3BlY2lmaWVkICcke2Zvcm1hdH0nYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGV4cG9ydGluZyBpdGVtOiAke21zZ31gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmV4cG9ydCgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb2JqZWN0IC0gR1Agb2JqZWN0IGRlZmluaXRpb24gdG8gZ2VuZXJhdGUgYSBVUkkgZm9yXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCByZXF1ZXN0IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHN0cmluZyBVUklcbiAgICAgKi9cbiAgICBnZXRVcmkgKG9iamVjdCA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggb2JqZWN0IClcbiAgICAgICAgLnRoZW4oIG9iaiA9PiB7XG4gICAgICAgICAgICBpZighb2JqIHx8ICFvYmoudHlwZSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgYW4gb2JqZWN0IHdpdGggYSB0eXBlIHByb3BlcnR5XCIpO1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYXBpQmFzZSArICcvYXBpL3V0aWxzL3VyaSc7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgICAgIG9wdGlvbnMucmVzcG9uc2VUeXBlID0gJ3RleHQnOyAgLy90byBlbnN1cmUgcGxhaW50ZXh0IGlzIGV4cGVjdGVkXG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLCB1cmw6IHVybCwgZGF0YTogb2JqLCBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCggZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBnZXR0aW5nIFVSSSBmb3IgaXRlbTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5nZXRVcmkoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWRzIC0gbGlzdCBvZiBpZGVudGlmaWVycyB0byBmZXRjaCBvYmplY3RzIGZvclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgbGlzdCBvZiBtYXRjaGluZyBpdGVtcyBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGdldE11bHRpcGxlIChpZHMgOiBzdHJpbmdbXSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggaWRzIClcbiAgICAgICAgLnRoZW4oIGlkZW50aWZpZXJzID0+IHtcblxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLmFwaUJhc2UgKyAnL2FwaS9mZXRjaCc7XG5cbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe21ldGhvZDptZXRob2QsIHVybDp1cmwsIGRhdGE6aWRlbnRpZmllcnMsIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcblxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyBpdGVtczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCdJdGVtU2VydmljZS5nZXRNdWx0aXBsZSgpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdXJpcyAtIGxpc3Qgb2YgVVJJcyB0byByZXRyaWV2ZSBvYmplY3RzIGZvclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgbGlzdCBjb250YWluaW5nIHVyaS1pdGVtIGFzc29jaWF0aW9uIHdoZXJlIGV4aXN0c1xuICAgICAqL1xuICAgIGV4aXN0cyh1cmlzIDogc3RyaW5nW10sIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKHVyaXMpXG4gICAgICAgIC50aGVuKCB1cmlzID0+IHtcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSAnUE9TVCcsIHVybCA9IHRoaXMuYXBpQmFzZSArICcvYXBpL3V0aWxzL2V4aXN0cyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHttZXRob2Q6bWV0aG9kLCB1cmw6dXJsLCBkYXRhOnVyaXMsIG9wdGlvbnM6b3B0aW9uc30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgcmVzb2x2aW5nIGl0ZW1zOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmV4aXN0cygpIC0gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBsaWtlKGl0ZW0gOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKGl0ZW0uaWQpXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gJ1BVVCcsIHVybCA9IHRoaXMuYXBpQmFzZSArICcvYXBpL2l0ZW1zLycgKyBpZCArICcvbGlrZXMnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7bWV0aG9kOm1ldGhvZCwgdXJsOnVybCwgb3B0aW9uczpvcHRpb25zfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBsaWtpbmcgaXRlbSAke2l0ZW0uaWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmxpa2UoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpZXcoaXRlbSA6IGFueSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoaXRlbS5pZClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSAnUFVUJywgdXJsID0gdGhpcy5hcGlCYXNlICsgJy9hcGkvaXRlbXMvJyArIGlkICsgJy92aWV3cyc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHttZXRob2Q6bWV0aG9kLCB1cmw6dXJsLCBvcHRpb25zOm9wdGlvbnN9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGluY3JlbWVudGluZyB2aWV3cyBmb3IgaXRlbSAke2l0ZW0uaWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLmxpa2UoKSAtICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBpdGVtIHRvIGZldGNoIGFzc29jaWF0aW9ucyBmb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIGFycmF5IG9mIGFzc29jaWF0ZWQgaXRlbXMgb2YgdGhlIGl0ZW0gaW4gcXVlc3Rpb25cbiAgICAgKi9cbiAgICBhc3NvY2lhdGlvbnMgKGlkIDogc3RyaW5nLCBwYXJhbXMgOiBhbnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIGlkIClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZCArICcvYXNzb2NpYXRpb25zJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgICAgICAgICAgICAgIHVybDp1cmwsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMgfHwge30sXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBFcnJvciBmZXRjaGluZyBhc3NvY2lhdGlvbnMgZm9yIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignSXRlbVNlcnZpY2UuYXNzb2NpYXRpb25zKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGl0ZW0gdG8gZmV0Y2ggdmVyc2lvbiBpbmZvIGZvclxuICAgICAqIEBwYXJhbSBwYXJhbXMgLSBvcHRpb25hbCBzZXQgb2YgcXVlcnkgcGFyYW1ldGVycyB0byBjb25zdHJhaW4gbGlzdCBvZiB2ZXJzaW9uc1xuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgYXJyYXkgb2YgYXZhaWxhYmxlIHZlcnNpb25zIG9mIHRoZSBpdGVtXG4gICAgICovXG4gICAgdmVyc2lvbnMgKGlkIDogc3RyaW5nLCBwYXJhbXMgPzogYW55LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL3ZlcnNpb25zJztcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLCB1cmw6dXJsLCBwYXJhbXM6IHBhcmFtcywgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIHZlcnNpb25zIGZvciBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoJ0l0ZW1TZXJ2aWNlLnZlcnNpb25zKCkgLSAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKlxuICAgIGdldFRodW1ibmFpbCAoIGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHRydWUgKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkICsgJy90aHVtYm5haWwnO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLCB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBqc29uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCggZSA9PiB7XG4gICAgICAgICAgICBsZXQgbXNnID0gZS5tZXNzYWdlO1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgZ2V0dGluZyB0aHVtYm5haWwgZm9yIGl0ZW06ICR7bXNnfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcihgSXRlbVNlcnZpY2UuZ2V0VGh1bWJuYWlsKCkgLSAke21zZ31gKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlVGh1bWJuYWlsICggaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55ICkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdHJ1ZSApXG4gICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQgKyAnL3RodW1ibmFpbCc7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLCB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBqc29uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCggZSA9PiB7XG4gICAgICAgICAgICBsZXQgbXNnID0gZS5tZXNzYWdlO1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgRXJyb3IgY3JlYXRpbmcgdGh1bWJuYWlsIGZvciBpdGVtOiAke21zZ31gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3IoYEl0ZW1TZXJ2aWNlLmNyZWF0ZVRodW1ibmFpbCgpIC0gJHttc2d9YCk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAqL1xuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSXRlbVNlcnZpY2U7XG4iXX0=