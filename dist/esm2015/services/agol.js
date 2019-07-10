/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
        return Promise.resolve(id)
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
            throw err;
        });
    }
    /**
     * @param {?} arg - either JS object of query parameters or Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    searchOrgs(arg, options) {
        return Promise.resolve(arg)
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
            throw err;
        });
    }
    /**
     * @param {?} id - identifier of AGOL group to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    getGroup(id, options) {
        return Promise.resolve(id)
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
            throw err;
        });
    }
    /**
     * @param {?} arg - either JS object of query parameters or AgolQuery instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    searchGroups(arg, options) {
        return Promise.resolve(arg)
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
            throw err;
        });
    }
    /**
     * @param {?} id - identifier of AGOL item to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    getItem(id, options) {
        return Promise.resolve(id)
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
            throw err;
        });
    }
    /**
     * @param {?} arg - either JS object of query parameters or AgolQuery instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    searchItems(arg, options) {
        return Promise.resolve(arg)
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
            throw err;
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
        return new Promise((resolve, reject) => {
            this.client.execute(opts)
                .then(result => resolve(result))
                .catch(e => {
                if (e === null || typeof (e) === 'undefined') {
                    e = new Error("AGOLService.execute() - Request failed but didn't return an " +
                        "error. This is most likely because the request timed out");
                }
                reject(e);
            });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9hZ29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QyxPQUFPLE1BQU0sTUFBTSxrQkFBa0IsQ0FBQztBQUl0QztJQUlJO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNWLElBQUksRUFBRSxDQUFDO1lBQ1AsSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO0tBQ0w7Ozs7SUFFRCxRQUFROztRQUNKLElBQUksTUFBTSxHQUEwQixFQUFFLENBQUM7UUFDdkMsS0FBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFOztZQUN6QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDckQsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0I7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxNQUFNLENBQUM7S0FDakI7Ozs7O0lBSUQsQ0FBQyxDQUFDLEtBQWMsSUFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUU7Ozs7O0lBQ2hFLElBQUksQ0FBQyxLQUFjLElBQUksSUFBSSxDQUFDLE1BQU0sUUFBSyxLQUFLLENBQUMsRUFBRTs7OztJQUMvQyxJQUFJLEtBQWMsT0FBTyxJQUFJLENBQUMsTUFBTSxNQUFHLEVBQUU7Ozs7O0lBSXpDLEtBQUssQ0FBQyxLQUF1QjtRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUss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QUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7aUJBQ3hCLElBQUksQ0FBRSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBRTtpQkFDakMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNQLElBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxPQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO29CQUN4QyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsOERBQThEO3dCQUM1RSwwREFBMEQsQ0FBQyxDQUFDO2lCQUMvRDtnQkFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDYixDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7S0FDTjtDQUVKOzs7Ozs7Ozs7OztBQUVELE9BQU8sRUFDSCxXQUFXLElBQUksT0FBTyxFQUN0QixXQUFXLEVBQ1gsU0FBUyxFQUNaLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IEl0ZW1UeXBlcyBmcm9tICcuLi9zaGFyZWQvdHlwZXMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuXG5cbmNsYXNzIEFnb2xRdWVyeSB7XG5cbiAgICBwcml2YXRlIF9xdWVyeSA6IHsgW2tleTpzdHJpbmddOmFueSB9O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3F1ZXJ5ID0ge1xuICAgICAgICAgICAgcGFnZTogMCxcbiAgICAgICAgICAgIHNpemU6IDEwXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0UXVlcnkoKSA6IHsgW2tleTpzdHJpbmddOmFueSB9IHtcbiAgICAgICAgbGV0IHJlc3VsdCA6IHsgW2tleTpzdHJpbmddOmFueSB9ID0ge307XG4gICAgICAgIGZvcihsZXQgcHJvcCBpbiB0aGlzLl9xdWVyeSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5fcXVlcnlbcHJvcF07XG4gICAgICAgICAgICBpZih2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YodmFsdWUucHVzaCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5qb2luKCcsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgcSh2YWx1ZSA6IHN0cmluZykgOiBBZ29sUXVlcnkgeyB0aGlzLnNldFEodmFsdWUpOyByZXR1cm4gdGhpczsgfVxuICAgIHNldFEodmFsdWUgOiBzdHJpbmcpIHsgdGhpcy5fcXVlcnkucSA9IHZhbHVlOyB9XG4gICAgZ2V0USgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3F1ZXJ5LnE7IH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgdHlwZXModmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIDogQWdvbFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRUeXBlcyh2YWx1ZSk7IHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUeXBlcyh2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICBsZXQgdmFsIDogc3RyaW5nO1xuICAgICAgICBpZih2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgICAgICAgIHZhbCA9ICh2YWx1ZSBhcyBBcnJheTxzdHJpbmc+KS5qb2luKCcsJyk7XG4gICAgICAgIGVsc2UgdmFsID0gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICB0aGlzLl9xdWVyeS50eXBlcyA9IHZhbDtcbiAgICB9XG4gICAgZ2V0VHlwZXMoKSA6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuX3F1ZXJ5LnR5cGVzOyB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGdyb3Vwcyh2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkgOiBBZ29sUXVlcnkge1xuICAgICAgICB0aGlzLnNldEdyb3Vwcyh2YWx1ZSk7IHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRHcm91cHModmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgbGV0IHZhbCA6IHN0cmluZztcbiAgICAgICAgaWYodmFsdWUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgICAgICB2YWwgPSAodmFsdWUgYXMgQXJyYXk8c3RyaW5nPikuam9pbignLCcpO1xuICAgICAgICBlbHNlIHZhbCA9IHZhbHVlIGFzIHN0cmluZztcbiAgICAgICAgdGhpcy5fcXVlcnkuZ3JvdXBzID0gdmFsO1xuICAgIH1cbiAgICBnZXRHcm91cHMoKSA6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuX3F1ZXJ5Lmdyb3VwczsgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBvcmdzKHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSA6IEFnb2xRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0T3Jncyh2YWx1ZSk7IHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRPcmdzKHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIGxldCB2YWwgOiBzdHJpbmc7XG4gICAgICAgIGlmKHZhbHVlICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICAgICAgdmFsID0gKHZhbHVlIGFzIEFycmF5PHN0cmluZz4pLmpvaW4oJywnKTtcbiAgICAgICAgZWxzZSB2YWwgPSB2YWx1ZSBhcyBzdHJpbmc7XG4gICAgICAgIHRoaXMuX3F1ZXJ5Lm9yZ3MgPSB2YWw7XG4gICAgfVxuICAgIGdldE9yZ3MoKSA6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuX3F1ZXJ5Lm9yZ3M7IH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgZXh0ZW50KHZhbHVlIDogYW55KSA6IEFnb2xRdWVyeSB7IHRoaXMuc2V0RXh0ZW50KHZhbHVlKTsgcmV0dXJuIHRoaXM7IH1cbiAgICBzZXRFeHRlbnQodmFsdWUgOiBhbnkpIHsgdGhpcy5fcXVlcnkuYmJveCA9IHZhbHVlOyB9XG4gICAgZ2V0RXh0ZW50KCkgOiBhbnkgeyByZXR1cm4gdGhpcy5fcXVlcnkuYmJveDsgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc29ydCAtIGZvcm0gb2YgPGZpZWxkPiw8ZGlyPiBvciBqdXN0IGZpZWxkIG5hbWVcbiAgICAgKiBAcGFyYW0gb3JkZXIgLSBvcHRpb25hbCwgZWl0aGVyICdhc2MnIG9yICdkZXNjJ1xuICAgICAqL1xuICAgIHNvcnQgKHNvcnQgOiBzdHJpbmcsIG9yZGVyIDogc3RyaW5nKSA6IEFnb2xRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0U29ydChzb3J0LCBvcmRlcik7IHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc29ydCAtIGZvcm0gb2YgPGZpZWxkPiw8ZGlyPiBvciBqdXN0IGZpZWxkIG5hbWVcbiAgICAgKiBAcGFyYW0gb3JkZXIgLSBvcHRpb25hbCwgZWl0aGVyICdhc2MnIG9yICdkZXNjJ1xuICAgICAqL1xuICAgICBzZXRTb3J0KHNvcnQgOiBzdHJpbmcsIG9yZGVyIDogc3RyaW5nKSB7XG4gICAgICAgICBvcmRlciA9IG9yZGVyIHx8ICdkZXNjJztcbiAgICAgICAgIGlmKHNvcnQgJiYgc29ydC5pbmRleE9mKCcsJyk8MClcbiAgICAgICAgICAgIHNvcnQgPSBzb3J0ICsgJywnICsgb3JkZXI7XG4gICAgICAgICB0aGlzLl9xdWVyeS5zb3J0ID0gc29ydDtcbiAgICB9XG4gICAgZ2V0U29ydCgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3F1ZXJ5LnNvcnQ7IH1cbiAgICBnZXRTb3J0RmllbGQoKSA6IHN0cmluZyB7IHJldHVybiB0aGlzLl9xdWVyeS5zb3J0LnNwbGl0KCcsJylbMF07IH1cbiAgICBnZXRTb3J0T3JkZXIoKSA6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcXVlcnkuc29ydC5zcGxpdCgnLCcpWzFdID09PSAnYXNjJzsgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGFnZSAtIHBhZ2Ugb2YgcmVzdWx0cyB0byBmZXRjaFxuICAgICAqL1xuICAgIHBhZ2UgKHBhZ2UgOiBudW1iZXIpIDogQWdvbFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHBhZ2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYWdlKHBhZ2UgOiBudW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4ocGFnZSkgfHwgcGFnZSoxPDApIHJldHVybjtcbiAgICAgICAgdGhpcy5fcXVlcnkucGFnZSA9IHBhZ2UqMTtcbiAgICB9XG5cbiAgICBnZXRQYWdlKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlcnkucGFnZTtcbiAgICB9XG5cbiAgICBuZXh0UGFnZSgpIHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuX3F1ZXJ5LnBhZ2UrMSk7XG4gICAgfVxuXG4gICAgcHJldmlvdXNQYWdlKCkge1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5fcXVlcnkucGFnZS0xKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzaXplIC0gcGFnZSBzaXplIHRvIHJlcXVlc3RcbiAgICAgKi9cbiAgICBwYWdlU2l6ZSAoc2l6ZSA6IG51bWJlcikgOiBBZ29sUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhZ2VTaXplKHNpemUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYWdlU2l6ZSAoc2l6ZSA6IG51bWJlcikge1xuICAgICAgICBpZihpc05hTihzaXplKSB8fCBzaXplKjE8MCkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9xdWVyeS5zaXplID0gc2l6ZSoxO1xuICAgIH1cblxuICAgIGdldFBhZ2VTaXplKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlcnkuc2l6ZTtcbiAgICB9XG5cbn1cblxuXG5cblxuY2xhc3MgQWdvbFNlcnZpY2Uge1xuXG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBiYXNlVXJsIDogc3RyaW5nO1xuICAgIHByaXZhdGUgY2xpZW50IDogR1BIdHRwQ2xpZW50O1xuICAgIHByaXZhdGUgdGltZW91dCA6IG51bWJlciA9IDMwMDAwO1xuICAgIHByaXZhdGUgaHR0cE1ldGhvZHMgOiBzdHJpbmdbXSA9IFtcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIiwgXCJQQVRDSFwiXTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLnNldFVybCh1cmwpO1xuICAgICAgICB0aGlzLmNsaWVudCA9IGh0dHBDbGllbnQ7XG4gICAgICAgIHRoaXMudGltZW91dCA9IDMwMDAwO1xuICAgIH1cblxuICAgIHNldFVybChiYXNlVXJsIDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmwgKyAnL2FwaS9hZ29sJztcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFHT0wgT1JHUyBNRVRIT0RTXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgQUdPTCBvcmdhbml6YXRpb24gdG8gZmV0Y2hcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEl0ZW0gb2JqZWN0IG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZ2V0T3JnIChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnRoaXMuYmFzZVVybCArICcvb3Jncy8nICsgaWQsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5nZXRPcmcoKSAtIEVycm9yIGZldGNoaW5nIG9yZyAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBlaXRoZXIgSlMgb2JqZWN0IG9mIHF1ZXJ5IHBhcmFtZXRlcnMgb3IgUXVlcnkgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgc2VhcmNoT3JncyAoYXJnIDogQWdvbFF1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIGFyZyApXG4gICAgICAgIC50aGVuKCBwYXJhbXMgPT4ge1xuXG4gICAgICAgICAgICBsZXQgcHMgPSBwYXJhbXMuZ2V0UXVlcnkoKTtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgICAgICAgICAgICAgIHVybDogdGhpcy5iYXNlVXJsICsgJy9vcmdzJyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBzLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgQWdvbFNlcnZpY2Uuc2VhcmNoT3JncygpIC0gRXJyb3Igc2VhcmNoaW5nIG9yZ3M6ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFHT0wgR1JPVVBTIE1FVEhPRFNcblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBBR09MIGdyb3VwIHRvIGZldGNoXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGdldEdyb3VwIChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnRoaXMuYmFzZVVybCArICcvZ3JvdXBzLycgKyBpZCwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEFnb2xTZXJ2aWNlLmdldEdyb3VwKCkgLSBFcnJvciBmZXRjaGluZyBncm91cCAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZyAtIGVpdGhlciBKUyBvYmplY3Qgb2YgcXVlcnkgcGFyYW1ldGVycyBvciBBZ29sUXVlcnkgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgc2VhcmNoR3JvdXBzIChhcmcgOiBBZ29sUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggYXJnIClcbiAgICAgICAgLnRoZW4oIHBhcmFtcyA9PiB7XG5cbiAgICAgICAgICAgIGxldCBwcyA9IHBhcmFtcy5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmJhc2VVcmwgKyAnL2dyb3VwcycsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwcyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEFnb2xTZXJ2aWNlLnNlYXJjaEdyb3VwcygpIC0gRXJyb3Igc2VhcmNoaW5nIGdyb3VwczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQUdPTCBJVEVNUyBNRVRIT0RTXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEFHT0wgaXRlbSB0byBmZXRjaFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBnZXRJdGVtIChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBpZCApXG4gICAgICAgIC50aGVuKCAoaWQgOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLFxuICAgICAgICAgICAgICAgIHVybDp0aGlzLmJhc2VVcmwgKyAnL2l0ZW1zLycgKyBpZCxcbiAgICAgICAgICAgICAgICBvcHRpb25zOm9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgQWdvbFNlcnZpY2UuZ2V0SXRlbSgpIC0gRXJyb3IgZmV0Y2hpbmcgaXRlbSAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZyAtIGVpdGhlciBKUyBvYmplY3Qgb2YgcXVlcnkgcGFyYW1ldGVycyBvciBBZ29sUXVlcnkgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgc2VhcmNoSXRlbXMgKGFyZyA6IEFnb2xRdWVyeSwgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBhcmcgKVxuICAgICAgICAudGhlbiggcGFyYW1zID0+IHtcblxuICAgICAgICAgICAgbGV0IHBzID0gcGFyYW1zLmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYmFzZVVybCArICcvaXRlbXMnLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcHMsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5zZWFyY2hJdGVtcygpIC0gRXJyb3Igc2VhcmNoaW5nIGl0ZW1zOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgZ2V0QWdvbElkIChvYmogOiBhbnkpIDogc3RyaW5nfG51bGwge1xuICAgICAgICBpZighb2JqKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZighb2JqLnR5cGUpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmKEl0ZW1UeXBlcy5PUkdBTklaQVRJT04gPT09IG9iai50eXBlIHx8ICdHcm91cCcgPT09IG9iai50eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqLmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIW9iai5pZGVudGlmaWVycyB8fCAhb2JqLmlkZW50aWZpZXJzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGxldCBpZHMgPSBvYmouaWRlbnRpZmllcnMuZmlsdGVyKCAoaWQ6c3RyaW5nKSA9PiB+aWQuaW5kZXhPZignYWdvbDonKSk7XG4gICAgICAgIGlmKCFpZHMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIGlkc1swXS5yZXBsYWNlKCdhZ29sOicsJycpO1xuICAgIH1cblxuXG5cblxuXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtZXRob2QgLSBvbmUgb2YgXCJHRVRcIiwgXCJQT1NUXCIsIFwiUFVUXCIsIFwiREVMRVRFXCIsIFwiUEFUQ0hcIlxuICAgICAqIEBwYXJhbSB1cmwgLSBkZXN0aW5hdGlvbiBvZiB4aHIgcmVxdWVzdFxuICAgICAqIEBwYXJhbSBwYXJhbXMgLSBvYmplY3QgdG8gYmUgc2VudCB3aXRoIHJlcXVlc3QgYXMgcXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBkYXRhIC0gb2JqZWN0IHRvIGJlIHNlbnQgd2l0aCByZXF1ZXN0IGFzIGJvZHlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIG9iamVjdCBkZWZpbmluZyByZXF1ZXN0IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHJlcXVlc3Qgb3B0aW9ucyBmb3IgeGhyXG4gICAgICovXG4gICAgYnVpbGRSZXF1ZXN0IChvcHRpb25zIDoge1trZXk6c3RyaW5nXTphbnl9ICkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuXG4gICAgICAgIGlmKHRoaXMuaHR0cE1ldGhvZHMuaW5kZXhPZihvcHRpb25zLm1ldGhvZCk8MClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgSFRUUCBtZXRob2QgJHtvcHRpb25zLm1ldGhvZH1gKTtcblxuICAgICAgICBpZighb3B0aW9ucy51cmwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE11c3Qgc3BlY2lmeSBhIFVSTCBmb3IgSFRUUCByZXF1ZXN0c2ApO1xuXG4gICAgICAgIG9wdGlvbnMudGltZW91dCA9IHRoaXMudGltZW91dCB8fCBDb25maWcudGltZW91dCB8fCAzMDAwMCA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyA6IHtba2V5OnN0cmluZ106YW55fSkgOiB7W2tleTpzdHJpbmddOmFueX0ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuY3JlYXRlUmVxdWVzdE9wdHMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShvcHRzIDoge1trZXk6c3RyaW5nXTphbnl9KSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsaWVudC5leGVjdXRlKG9wdHMpXG4gICAgICAgICAgICAudGhlbiggcmVzdWx0ID0+IHJlc29sdmUocmVzdWx0KSApXG4gICAgICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZSA9PT0gbnVsbCB8fCB0eXBlb2YoZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGUgPSBuZXcgRXJyb3IoXCJBR09MU2VydmljZS5leGVjdXRlKCkgLSBSZXF1ZXN0IGZhaWxlZCBidXQgZGlkbid0IHJldHVybiBhbiBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiZXJyb3IuIFRoaXMgaXMgbW9zdCBsaWtlbHkgYmVjYXVzZSB0aGUgcmVxdWVzdCB0aW1lZCBvdXRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IHtcbiAgICBBZ29sU2VydmljZSBhcyBkZWZhdWx0LFxuICAgIEFnb2xTZXJ2aWNlLFxuICAgIEFnb2xRdWVyeVxufTtcbiJdfQ==