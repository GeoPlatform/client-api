/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from 'q';
import ItemTypes from '../shared/types';
import Config from '../shared/config';
class AgolQuery {
    constructor() {
        this._query = {
            page: 0,
            size: 10
        };
    }
    /**
     * @return {?}
     */
    getQuery() {
        /** @type {?} */
        let result = {};
        for (let prop in this._query) {
            /** @type {?} */
            let value = this._query[prop];
            if (value !== null && typeof (value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    q(value) { this.setQ(value); return this; }
    /**
     * @param {?} value
     * @return {?}
     */
    setQ(value) { this._query["q"] = value; }
    /**
     * @return {?}
     */
    getQ() { return this._query["q"]; }
    /**
     * @param {?} value
     * @return {?}
     */
    types(value) {
        this.setTypes(value);
        return this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setTypes(value) {
        /** @type {?} */
        let val;
        if (value && Array.isArray(value))
            val = (/** @type {?} */ (value)).join(',');
        else
            val = /** @type {?} */ (value);
        this._query["types"] = val;
    }
    /**
     * @return {?}
     */
    getTypes() { return this._query["types"]; }
    /**
     * @param {?} value
     * @return {?}
     */
    groups(value) {
        this.setGroups(value);
        return this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setGroups(value) {
        /** @type {?} */
        let val;
        if (value && Array.isArray(value))
            val = (/** @type {?} */ (value)).join(',');
        else
            val = /** @type {?} */ (value);
        this._query["groups"] = val;
    }
    /**
     * @return {?}
     */
    getGroups() { return this._query["groups"]; }
    /**
     * @param {?} value
     * @return {?}
     */
    orgs(value) {
        this.setOrgs(value);
        return this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setOrgs(value) {
        /** @type {?} */
        let val;
        if (value && Array.isArray(value))
            val = (/** @type {?} */ (value)).join(',');
        else
            val = /** @type {?} */ (value);
        this._query["orgs"] = val;
    }
    /**
     * @return {?}
     */
    getOrgs() { return this._query["orgs"]; }
    /**
     * @param {?} value
     * @return {?}
     */
    extent(value) { this.setExtent(value); return this; }
    /**
     * @param {?} value
     * @return {?}
     */
    setExtent(value) { this._query["bbox"] = value; }
    /**
     * @return {?}
     */
    getExtent() { return this._query["bbox"]; }
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    sort(sort, order) {
        this.setSort(sort, order);
        return this;
    }
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    setSort(sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this._query["sort"] = sort;
    }
    /**
     * @return {?}
     */
    getSort() { return this._query["sort"]; }
    /**
     * @return {?}
     */
    getSortField() { return this._query["sort"].split(',')[0]; }
    /**
     * @return {?}
     */
    getSortOrder() { return this._query["sort"].split(',')[1] === 'asc'; }
    /**
     * @param {?} page - page of results to fetch
     * @return {?}
     */
    page(page) {
        this.setPage(page);
        return this;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    setPage(page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this._query["page"] = page * 1;
    }
    /**
     * @return {?}
     */
    getPage() {
        return this._query["page"];
    }
    /**
     * @return {?}
     */
    nextPage() {
        this.setPage(this._query["page"] + 1);
    }
    /**
     * @return {?}
     */
    previousPage() {
        this.setPage(this._query["page"] - 1);
    }
    /**
     * @param {?} size - page size to request
     * @return {?}
     */
    pageSize(size) {
        this.setPageSize(size);
        return this;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    setPageSize(size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this._query["size"] = size * 1;
    }
    /**
     * @return {?}
     */
    getPageSize() {
        return this._query["size"];
    }
}
if (false) {
    /** @type {?} */
    AgolQuery.prototype._query;
}
class AgolService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        this.timeout = 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        this.setUrl(url);
        this.client = httpClient;
        this.timeout = 30000;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        this.baseUrl = baseUrl + '/api/agol';
    }
    /**
     * @param {?} id - identifier of AGOL organization to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    getOrg(id, options) {
        return Q.resolve(id)
            .then(id => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: this.baseUrl + '/orgs/' + id, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`AgolService.getOrg() - Error fetching org ${id}: ${e.message}`);
            Object.assign(err, e);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} arg - either JS object of query parameters or Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    searchOrgs(arg, options) {
        return Q.resolve(arg)
            .then(params => {
            /** @type {?} */
            let ps = params.getQuery();
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/orgs',
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`AgolService.searchOrgs() - Error searching orgs: ${e.message}`);
            Object.assign(err, e);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} id - identifier of AGOL group to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    getGroup(id, options) {
        return Q.resolve(id)
            .then(id => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: this.baseUrl + '/groups/' + id, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`AgolService.getGroup() - Error fetching group ${id}: ${e.message}`);
            Object.assign(err, e);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} arg - either JS object of query parameters or AgolQuery instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    searchGroups(arg, options) {
        return Q.resolve(arg)
            .then(params => {
            /** @type {?} */
            let ps = params.getQuery();
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/groups',
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`AgolService.searchGroups() - Error searching groups: ${e.message}`);
            Object.assign(err, e);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} id - identifier of AGOL item to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    getItem(id, options) {
        return Q.resolve(id)
            .then((id) => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/items/' + id,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`AgolService.getItem() - Error fetching item ${id}: ${e.message}`);
            Object.assign(err, e);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} arg - either JS object of query parameters or AgolQuery instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    searchItems(arg, options) {
        return Q.resolve(arg)
            .then(params => {
            /** @type {?} */
            let ps = params.getQuery();
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/items',
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`AgolService.searchItems() - Error searching items: ${e.message}`);
            Object.assign(err, e);
            return Q.reject(err);
        });
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    getAgolId(obj) {
        if (!obj)
            return null;
        if (!obj.type)
            return null;
        if (ItemTypes.ORGANIZATION === obj.type || 'Group' === obj.type) {
            return obj.id;
        }
        if (!obj.identifiers || !obj.identifiers.length)
            return null;
        /** @type {?} */
        let ids = obj.identifiers.filter((id) => ~id.indexOf('agol:'));
        if (!ids.length)
            return null;
        return ids[0].replace('agol:', '');
    }
    /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    buildRequest(options) {
        if (this.httpMethods.indexOf(options["method"]) < 0)
            throw new Error(`Unsupported HTTP method ${options["method"]}`);
        if (!options["url"])
            throw new Error(`Must specify a URL for HTTP requests`);
        options["timeout"] = this.timeout || Config["timeout"] || 30000;
        return this.createRequestOpts(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(options) {
        return this.client.createRequestOpts(options);
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    execute(opts) {
        return this.client.execute(opts)
            .catch(e => {
            if (e === null || typeof (e) === 'undefined') {
                e = new Error("AGOLService.execute() - Request failed but didn't return an " +
                    "error. This is most likely because the request timed out");
            }
            return Q.reject(e);
        });
    }
}
if (false) {
    /** @type {?} */
    AgolService.prototype.baseUrl;
    /** @type {?} */
    AgolService.prototype.client;
    /** @type {?} */
    AgolService.prototype.timeout;
    /** @type {?} */
    AgolService.prototype.httpMethods;
}
export { AgolService as default, AgolService, AgolQuery };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9hZ29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztBQUN2QixPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QyxPQUFPLE1BQU0sTUFBTSxrQkFBa0IsQ0FBQztBQUl0QztJQUlJO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNWLElBQUksRUFBRSxDQUFDO1lBQ1AsSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO0tBQ0w7Ozs7SUFFRCxRQUFROztRQUNKLElBQUksTUFBTSxHQUEwQixFQUFFLENBQUM7UUFDdkMsS0FBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFOztZQUN6QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDckQsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0I7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxNQUFNLENBQUM7S0FDakI7Ozs7O0lBSUQsQ0FBQyxDQUFDLEtBQWMsSUFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUU7Ozs7O0lBQ2hFLElBQUksQ0FBQyxLQUFjLElBQUksSUFBSSxDQUFDLE1BQU0sUUFBSyxLQUFLLENBQUMsRUFBRTs7OztJQUMvQyxJQUFJLEtBQWMsT0FBTyxJQUFJLENBQUMsTUFBTSxNQUFHLEVBQUU7Ozs7O0lBSXpDLEtBQUssQ0FBQyxL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LE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzFDOzs7OztJQUVELGlCQUFpQixDQUFDLE9BQTRCO1FBQzFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNqRDs7Ozs7SUFFRCxPQUFPLENBQUMsSUFBeUI7UUFDN0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDL0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1AsSUFBRyxDQUFDLEtBQUssSUFBSSxJQUFJLE9BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLEVBQUU7Z0JBQ3hDLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyw4REFBOEQ7b0JBQzVFLDBEQUEwRCxDQUFDLENBQUM7YUFDL0Q7WUFDRCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEIsQ0FBQyxDQUFDO0tBQ047Q0FFSjs7Ozs7Ozs7Ozs7QUFFRCxPQUFPLEVBQ0gsV0FBVyxJQUFJLE9BQU8sRUFDdEIsV0FBVyxFQUNYLFNBQVMsRUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XG5pbXBvcnQgSXRlbVR5cGVzIGZyb20gJy4uL3NoYXJlZC90eXBlcyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uL3NoYXJlZC9jb25maWcnO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5cblxuY2xhc3MgQWdvbFF1ZXJ5IHtcblxuICAgIHByaXZhdGUgX3F1ZXJ5IDogeyBba2V5OnN0cmluZ106YW55IH07XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fcXVlcnkgPSB7XG4gICAgICAgICAgICBwYWdlOiAwLFxuICAgICAgICAgICAgc2l6ZTogMTBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRRdWVyeSgpIDogeyBba2V5OnN0cmluZ106YW55IH0ge1xuICAgICAgICBsZXQgcmVzdWx0IDogeyBba2V5OnN0cmluZ106YW55IH0gPSB7fTtcbiAgICAgICAgZm9yKGxldCBwcm9wIGluIHRoaXMuX3F1ZXJ5KSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9xdWVyeVtwcm9wXTtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZih2YWx1ZS5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4oJywnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBxKHZhbHVlIDogc3RyaW5nKSA6IEFnb2xRdWVyeSB7IHRoaXMuc2V0USh2YWx1ZSk7IHJldHVybiB0aGlzOyB9XG4gICAgc2V0USh2YWx1ZSA6IHN0cmluZykgeyB0aGlzLl9xdWVyeS5xID0gdmFsdWU7IH1cbiAgICBnZXRRKCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fcXVlcnkucTsgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICB0eXBlcyh2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkgOiBBZ29sUXVlcnkge1xuICAgICAgICB0aGlzLnNldFR5cGVzKHZhbHVlKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFR5cGVzKHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIGxldCB2YWwgOiBzdHJpbmc7XG4gICAgICAgIGlmKHZhbHVlICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICAgICAgdmFsID0gKHZhbHVlIGFzIEFycmF5PHN0cmluZz4pLmpvaW4oJywnKTtcbiAgICAgICAgZWxzZSB2YWwgPSB2YWx1ZSBhcyBzdHJpbmc7XG4gICAgICAgIHRoaXMuX3F1ZXJ5LnR5cGVzID0gdmFsO1xuICAgIH1cbiAgICBnZXRUeXBlcygpIDogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fcXVlcnkudHlwZXM7IH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgZ3JvdXBzKHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSA6IEFnb2xRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0R3JvdXBzKHZhbHVlKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEdyb3Vwcyh2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICBsZXQgdmFsIDogc3RyaW5nO1xuICAgICAgICBpZih2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgICAgICAgIHZhbCA9ICh2YWx1ZSBhcyBBcnJheTxzdHJpbmc+KS5qb2luKCcsJyk7XG4gICAgICAgIGVsc2UgdmFsID0gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICB0aGlzLl9xdWVyeS5ncm91cHMgPSB2YWw7XG4gICAgfVxuICAgIGdldEdyb3VwcygpIDogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fcXVlcnkuZ3JvdXBzOyB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIG9yZ3ModmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIDogQWdvbFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRPcmdzKHZhbHVlKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldE9yZ3ModmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgbGV0IHZhbCA6IHN0cmluZztcbiAgICAgICAgaWYodmFsdWUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgICAgICB2YWwgPSAodmFsdWUgYXMgQXJyYXk8c3RyaW5nPikuam9pbignLCcpO1xuICAgICAgICBlbHNlIHZhbCA9IHZhbHVlIGFzIHN0cmluZztcbiAgICAgICAgdGhpcy5fcXVlcnkub3JncyA9IHZhbDtcbiAgICB9XG4gICAgZ2V0T3JncygpIDogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fcXVlcnkub3JnczsgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBleHRlbnQodmFsdWUgOiBhbnkpIDogQWdvbFF1ZXJ5IHsgdGhpcy5zZXRFeHRlbnQodmFsdWUpOyByZXR1cm4gdGhpczsgfVxuICAgIHNldEV4dGVudCh2YWx1ZSA6IGFueSkgeyB0aGlzLl9xdWVyeS5iYm94ID0gdmFsdWU7IH1cbiAgICBnZXRFeHRlbnQoKSA6IGFueSB7IHJldHVybiB0aGlzLl9xdWVyeS5iYm94OyB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzb3J0IC0gZm9ybSBvZiA8ZmllbGQ+LDxkaXI+IG9yIGp1c3QgZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSBvcmRlciAtIG9wdGlvbmFsLCBlaXRoZXIgJ2FzYycgb3IgJ2Rlc2MnXG4gICAgICovXG4gICAgc29ydCAoc29ydCA6IHN0cmluZywgb3JkZXIgOiBzdHJpbmcpIDogQWdvbFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTb3J0KHNvcnQsIG9yZGVyKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzb3J0IC0gZm9ybSBvZiA8ZmllbGQ+LDxkaXI+IG9yIGp1c3QgZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSBvcmRlciAtIG9wdGlvbmFsLCBlaXRoZXIgJ2FzYycgb3IgJ2Rlc2MnXG4gICAgICovXG4gICAgIHNldFNvcnQoc29ydCA6IHN0cmluZywgb3JkZXIgOiBzdHJpbmcpIHtcbiAgICAgICAgIG9yZGVyID0gb3JkZXIgfHwgJ2Rlc2MnO1xuICAgICAgICAgaWYoc29ydCAmJiBzb3J0LmluZGV4T2YoJywnKTwwKVxuICAgICAgICAgICAgc29ydCA9IHNvcnQgKyAnLCcgKyBvcmRlcjtcbiAgICAgICAgIHRoaXMuX3F1ZXJ5LnNvcnQgPSBzb3J0O1xuICAgIH1cbiAgICBnZXRTb3J0KCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fcXVlcnkuc29ydDsgfVxuICAgIGdldFNvcnRGaWVsZCgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3F1ZXJ5LnNvcnQuc3BsaXQoJywnKVswXTsgfVxuICAgIGdldFNvcnRPcmRlcigpIDogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9xdWVyeS5zb3J0LnNwbGl0KCcsJylbMV0gPT09ICdhc2MnOyB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYWdlIC0gcGFnZSBvZiByZXN1bHRzIHRvIGZldGNoXG4gICAgICovXG4gICAgcGFnZSAocGFnZSA6IG51bWJlcikgOiBBZ29sUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhZ2UocGFnZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFBhZ2UocGFnZSA6IG51bWJlcikge1xuICAgICAgICBpZihpc05hTihwYWdlKSB8fCBwYWdlKjE8MCkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9xdWVyeS5wYWdlID0gcGFnZSoxO1xuICAgIH1cblxuICAgIGdldFBhZ2UoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeS5wYWdlO1xuICAgIH1cblxuICAgIG5leHRQYWdlKCkge1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5fcXVlcnkucGFnZSsxKTtcbiAgICB9XG5cbiAgICBwcmV2aW91c1BhZ2UoKSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLl9xdWVyeS5wYWdlLTEpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNpemUgLSBwYWdlIHNpemUgdG8gcmVxdWVzdFxuICAgICAqL1xuICAgIHBhZ2VTaXplIChzaXplIDogbnVtYmVyKSA6IEFnb2xRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZVNpemUoc2l6ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFBhZ2VTaXplIChzaXplIDogbnVtYmVyKSB7XG4gICAgICAgIGlmKGlzTmFOKHNpemUpIHx8IHNpemUqMTwwKSByZXR1cm47XG4gICAgICAgIHRoaXMuX3F1ZXJ5LnNpemUgPSBzaXplKjE7XG4gICAgfVxuXG4gICAgZ2V0UGFnZVNpemUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeS5zaXplO1xuICAgIH1cblxufVxuXG5cblxuXG5jbGFzcyBBZ29sU2VydmljZSB7XG5cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIGJhc2VVcmwgOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBjbGllbnQgOiBHUEh0dHBDbGllbnQ7XG4gICAgcHJpdmF0ZSB0aW1lb3V0IDogbnVtYmVyID0gMzAwMDA7XG4gICAgcHJpdmF0ZSBodHRwTWV0aG9kcyA6IHN0cmluZ1tdID0gW1wiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiLCBcIlBBVENIXCJdO1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuc2V0VXJsKHVybCk7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gaHR0cENsaWVudDtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gMzAwMDA7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmwgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybCArICcvYXBpL2Fnb2wnO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQUdPTCBPUkdTIE1FVEhPRFNcblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBBR09MIG9yZ2FuaXphdGlvbiB0byBmZXRjaFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBnZXRPcmcgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggaWQgKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp0aGlzLmJhc2VVcmwgKyAnL29yZ3MvJyArIGlkLCBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgQWdvbFNlcnZpY2UuZ2V0T3JnKCkgLSBFcnJvciBmZXRjaGluZyBvcmcgJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBlaXRoZXIgSlMgb2JqZWN0IG9mIHF1ZXJ5IHBhcmFtZXRlcnMgb3IgUXVlcnkgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgc2VhcmNoT3JncyAoYXJnIDogQWdvbFF1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBRLlByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSggYXJnIClcbiAgICAgICAgLnRoZW4oIHBhcmFtcyA9PiB7XG5cbiAgICAgICAgICAgIGxldCBwcyA9IHBhcmFtcy5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmJhc2VVcmwgKyAnL29yZ3MnLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcHMsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5zZWFyY2hPcmdzKCkgLSBFcnJvciBzZWFyY2hpbmcgb3JnczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBR09MIEdST1VQUyBNRVRIT0RTXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgQUdPTCBncm91cCB0byBmZXRjaFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBnZXRHcm91cCAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnRoaXMuYmFzZVVybCArICcvZ3JvdXBzLycgKyBpZCwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEFnb2xTZXJ2aWNlLmdldEdyb3VwKCkgLSBFcnJvciBmZXRjaGluZyBncm91cCAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnIC0gZWl0aGVyIEpTIG9iamVjdCBvZiBxdWVyeSBwYXJhbWV0ZXJzIG9yIEFnb2xRdWVyeSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VhcmNoIHJlc3VsdHNcbiAgICAgKi9cbiAgICBzZWFyY2hHcm91cHMgKGFyZyA6IEFnb2xRdWVyeSwgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGFyZyApXG4gICAgICAgIC50aGVuKCBwYXJhbXMgPT4ge1xuXG4gICAgICAgICAgICBsZXQgcHMgPSBwYXJhbXMuZ2V0UXVlcnkoKTtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgICAgICAgICAgICAgIHVybDogdGhpcy5iYXNlVXJsICsgJy9ncm91cHMnLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcHMsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5zZWFyY2hHcm91cHMoKSAtIEVycm9yIHNlYXJjaGluZyBncm91cHM6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQUdPTCBJVEVNUyBNRVRIT0RTXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEFHT0wgaXRlbSB0byBmZXRjaFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBnZXRJdGVtIChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUS5Qcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBRLnJlc29sdmUoIGlkIClcbiAgICAgICAgLnRoZW4oIChpZCA6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOnRoaXMuYmFzZVVybCArICcvaXRlbXMvJyArIGlkLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5nZXRJdGVtKCkgLSBFcnJvciBmZXRjaGluZyBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBlaXRoZXIgSlMgb2JqZWN0IG9mIHF1ZXJ5IHBhcmFtZXRlcnMgb3IgQWdvbFF1ZXJ5IGluc3RhbmNlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHNlYXJjaEl0ZW1zIChhcmcgOiBBZ29sUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFEuUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUS5yZXNvbHZlKCBhcmcgKVxuICAgICAgICAudGhlbiggcGFyYW1zID0+IHtcblxuICAgICAgICAgICAgbGV0IHBzID0gcGFyYW1zLmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYmFzZVVybCArICcvaXRlbXMnLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcHMsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5zZWFyY2hJdGVtcygpIC0gRXJyb3Igc2VhcmNoaW5nIGl0ZW1zOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgICBnZXRBZ29sSWQgKG9iaiA6IGFueSkgOiBzdHJpbmd8bnVsbCB7XG4gICAgICAgIGlmKCFvYmopIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmKCFvYmoudHlwZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYoSXRlbVR5cGVzLk9SR0FOSVpBVElPTiA9PT0gb2JqLnR5cGUgfHwgJ0dyb3VwJyA9PT0gb2JqLnR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmouaWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZighb2JqLmlkZW50aWZpZXJzIHx8ICFvYmouaWRlbnRpZmllcnMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IGlkcyA9IG9iai5pZGVudGlmaWVycy5maWx0ZXIoIChpZDpzdHJpbmcpID0+IH5pZC5pbmRleE9mKCdhZ29sOicpKTtcbiAgICAgICAgaWYoIWlkcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gaWRzWzBdLnJlcGxhY2UoJ2Fnb2w6JywnJyk7XG4gICAgfVxuXG5cblxuXG5cbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1ldGhvZCAtIG9uZSBvZiBcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIiwgXCJQQVRDSFwiXG4gICAgICogQHBhcmFtIHVybCAtIGRlc3RpbmF0aW9uIG9mIHhociByZXF1ZXN0XG4gICAgICogQHBhcmFtIHBhcmFtcyAtIG9iamVjdCB0byBiZSBzZW50IHdpdGggcmVxdWVzdCBhcyBxdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIGRhdGEgLSBvYmplY3QgdG8gYmUgc2VudCB3aXRoIHJlcXVlc3QgYXMgYm9keVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgb2JqZWN0IGRlZmluaW5nIHJlcXVlc3Qgb3B0aW9uc1xuICAgICAqIEByZXR1cm4gcmVxdWVzdCBvcHRpb25zIGZvciB4aHJcbiAgICAgKi9cbiAgICBidWlsZFJlcXVlc3QgKG9wdGlvbnMgOiB7W2tleTpzdHJpbmddOmFueX0gKSA6IHtba2V5OnN0cmluZ106YW55fSB7XG5cbiAgICAgICAgaWYodGhpcy5odHRwTWV0aG9kcy5pbmRleE9mKG9wdGlvbnMubWV0aG9kKTwwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBIVFRQIG1ldGhvZCAke29wdGlvbnMubWV0aG9kfWApO1xuXG4gICAgICAgIGlmKCFvcHRpb25zLnVybClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTXVzdCBzcGVjaWZ5IGEgVVJMIGZvciBIVFRQIHJlcXVlc3RzYCk7XG5cbiAgICAgICAgb3B0aW9ucy50aW1lb3V0ID0gdGhpcy50aW1lb3V0IHx8IENvbmZpZy50aW1lb3V0IHx8IDMwMDAwIDtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zIDoge1trZXk6c3RyaW5nXTphbnl9KSA6IHtba2V5OnN0cmluZ106YW55fSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5jcmVhdGVSZXF1ZXN0T3B0cyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICBleGVjdXRlKG9wdHMgOiB7W2tleTpzdHJpbmddOmFueX0pIDogUS5Qcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuZXhlY3V0ZShvcHRzKVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBpZihlID09PSBudWxsIHx8IHR5cGVvZihlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBlID0gbmV3IEVycm9yKFwiQUdPTFNlcnZpY2UuZXhlY3V0ZSgpIC0gUmVxdWVzdCBmYWlsZWQgYnV0IGRpZG4ndCByZXR1cm4gYW4gXCIgK1xuICAgICAgICAgICAgICAgIFwiZXJyb3IuIFRoaXMgaXMgbW9zdCBsaWtlbHkgYmVjYXVzZSB0aGUgcmVxdWVzdCB0aW1lZCBvdXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQge1xuICAgIEFnb2xTZXJ2aWNlIGFzIGRlZmF1bHQsXG4gICAgQWdvbFNlcnZpY2UsXG4gICAgQWdvbFF1ZXJ5XG59O1xuIl19