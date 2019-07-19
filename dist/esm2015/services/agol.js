/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import ItemTypes from '../shared/types';
import BaseService from "./base";
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
class AgolService extends BaseService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        super(url, httpClient);
        this.setTimeout(30000);
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/agol';
    }
    /**
     * @param {?} id - identifier of AGOL organization to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    getOrg(id, options) {
        return this.createAndResolvePromise(id)
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
        return this.createAndResolvePromise(arg)
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
        return this.createAndResolvePromise(id)
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
        return this.createAndResolvePromise(arg)
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
        return this.createAndResolvePromise(id)
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
        return this.createAndResolvePromise(arg)
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
}
export { AgolService as default, AgolService, AgolQuery };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9hZ29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUd4QyxPQUFPLFdBQVcsTUFBTSxRQUFRLENBQUM7QUFFakM7SUFJSTtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDVixJQUFJLEVBQUUsQ0FBQztZQUNQLElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztLQUNMOzs7O0lBRUQsUUFBUTs7UUFDSixJQUFJLE1BQU0sR0FBMEIsRUFBRSxDQUFDO1FBQ3ZDLEtBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTs7WUFDekIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixJQUFHLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxXQUFXLEVBQUU7Z0JBQ3JELEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUN4QjtRQUNELE9BQU8sTUFBTSxDQUFDO0tBQ2pCOzs7OztJQUlELENBQUMsQ0FBQyxLQUFjLElBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFOzs7OztJQUNoRSxJQUFJLENBQUMsS0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLFFBQUssS0FBSyxDQUFDLEVBQUU7Ozs7SUFDL0MsSUFBSSxLQUFjLE9BQU8sSUFBSSxDQUFDLE1BQU0sTUFBRyxFQUFFOzs7OztJQUl6QyxLQUFLLENBQUMsS0FBdUI7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENB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SyxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQzVELE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQztTQUNqQjtRQUVELElBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNO1lBQUUsT0FBTyxJQUFJLENBQUM7O1FBQzVELElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFFLENBQUMsRUFBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFHLENBQUMsR0FBRyxDQUFDLE1BQU07WUFBRSxPQUFPLElBQUksQ0FBQztRQUM1QixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3JDO0NBRUo7QUFFRCxPQUFPLEVBQ0gsV0FBVyxJQUFJLE9BQU8sRUFDdEIsV0FBVyxFQUNYLFNBQVMsRUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBJdGVtLCBTZWFyY2hSZXN1bHRzIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscyc7XG5pbXBvcnQgSXRlbVR5cGVzIGZyb20gJy4uL3NoYXJlZC90eXBlcyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uL3NoYXJlZC9jb25maWcnO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5pbXBvcnQgQmFzZVNlcnZpY2UgZnJvbSBcIi4vYmFzZVwiO1xuXG5jbGFzcyBBZ29sUXVlcnkge1xuXG4gICAgcHJpdmF0ZSBfcXVlcnkgOiB7IFtrZXk6c3RyaW5nXTphbnkgfTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9xdWVyeSA9IHtcbiAgICAgICAgICAgIHBhZ2U6IDAsXG4gICAgICAgICAgICBzaXplOiAxMFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldFF1ZXJ5KCkgOiB7IFtrZXk6c3RyaW5nXTphbnkgfSB7XG4gICAgICAgIGxldCByZXN1bHQgOiB7IFtrZXk6c3RyaW5nXTphbnkgfSA9IHt9O1xuICAgICAgICBmb3IobGV0IHByb3AgaW4gdGhpcy5fcXVlcnkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX3F1ZXJ5W3Byb3BdO1xuICAgICAgICAgICAgaWYodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mKHZhbHVlLnB1c2gpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuam9pbignLCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHEodmFsdWUgOiBzdHJpbmcpIDogQWdvbFF1ZXJ5IHsgdGhpcy5zZXRRKHZhbHVlKTsgcmV0dXJuIHRoaXM7IH1cbiAgICBzZXRRKHZhbHVlIDogc3RyaW5nKSB7IHRoaXMuX3F1ZXJ5LnEgPSB2YWx1ZTsgfVxuICAgIGdldFEoKSA6IHN0cmluZyB7IHJldHVybiB0aGlzLl9xdWVyeS5xOyB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHR5cGVzKHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSA6IEFnb2xRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0VHlwZXModmFsdWUpOyByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VHlwZXModmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgbGV0IHZhbCA6IHN0cmluZztcbiAgICAgICAgaWYodmFsdWUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgICAgICB2YWwgPSAodmFsdWUgYXMgQXJyYXk8c3RyaW5nPikuam9pbignLCcpO1xuICAgICAgICBlbHNlIHZhbCA9IHZhbHVlIGFzIHN0cmluZztcbiAgICAgICAgdGhpcy5fcXVlcnkudHlwZXMgPSB2YWw7XG4gICAgfVxuICAgIGdldFR5cGVzKCkgOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLl9xdWVyeS50eXBlczsgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBncm91cHModmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIDogQWdvbFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRHcm91cHModmFsdWUpOyByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0R3JvdXBzKHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIGxldCB2YWwgOiBzdHJpbmc7XG4gICAgICAgIGlmKHZhbHVlICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICAgICAgdmFsID0gKHZhbHVlIGFzIEFycmF5PHN0cmluZz4pLmpvaW4oJywnKTtcbiAgICAgICAgZWxzZSB2YWwgPSB2YWx1ZSBhcyBzdHJpbmc7XG4gICAgICAgIHRoaXMuX3F1ZXJ5Lmdyb3VwcyA9IHZhbDtcbiAgICB9XG4gICAgZ2V0R3JvdXBzKCkgOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLl9xdWVyeS5ncm91cHM7IH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgb3Jncyh2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkgOiBBZ29sUXVlcnkge1xuICAgICAgICB0aGlzLnNldE9yZ3ModmFsdWUpOyByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0T3Jncyh2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICBsZXQgdmFsIDogc3RyaW5nO1xuICAgICAgICBpZih2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgICAgICAgIHZhbCA9ICh2YWx1ZSBhcyBBcnJheTxzdHJpbmc+KS5qb2luKCcsJyk7XG4gICAgICAgIGVsc2UgdmFsID0gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICB0aGlzLl9xdWVyeS5vcmdzID0gdmFsO1xuICAgIH1cbiAgICBnZXRPcmdzKCkgOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLl9xdWVyeS5vcmdzOyB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGV4dGVudCh2YWx1ZSA6IGFueSkgOiBBZ29sUXVlcnkgeyB0aGlzLnNldEV4dGVudCh2YWx1ZSk7IHJldHVybiB0aGlzOyB9XG4gICAgc2V0RXh0ZW50KHZhbHVlIDogYW55KSB7IHRoaXMuX3F1ZXJ5LmJib3ggPSB2YWx1ZTsgfVxuICAgIGdldEV4dGVudCgpIDogYW55IHsgcmV0dXJuIHRoaXMuX3F1ZXJ5LmJib3g7IH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNvcnQgLSBmb3JtIG9mIDxmaWVsZD4sPGRpcj4gb3IganVzdCBmaWVsZCBuYW1lXG4gICAgICogQHBhcmFtIG9yZGVyIC0gb3B0aW9uYWwsIGVpdGhlciAnYXNjJyBvciAnZGVzYydcbiAgICAgKi9cbiAgICBzb3J0IChzb3J0IDogc3RyaW5nLCBvcmRlciA6IHN0cmluZykgOiBBZ29sUXVlcnkge1xuICAgICAgICB0aGlzLnNldFNvcnQoc29ydCwgb3JkZXIpOyByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNvcnQgLSBmb3JtIG9mIDxmaWVsZD4sPGRpcj4gb3IganVzdCBmaWVsZCBuYW1lXG4gICAgICogQHBhcmFtIG9yZGVyIC0gb3B0aW9uYWwsIGVpdGhlciAnYXNjJyBvciAnZGVzYydcbiAgICAgKi9cbiAgICAgc2V0U29ydChzb3J0IDogc3RyaW5nLCBvcmRlciA6IHN0cmluZykge1xuICAgICAgICAgb3JkZXIgPSBvcmRlciB8fCAnZGVzYyc7XG4gICAgICAgICBpZihzb3J0ICYmIHNvcnQuaW5kZXhPZignLCcpPDApXG4gICAgICAgICAgICBzb3J0ID0gc29ydCArICcsJyArIG9yZGVyO1xuICAgICAgICAgdGhpcy5fcXVlcnkuc29ydCA9IHNvcnQ7XG4gICAgfVxuICAgIGdldFNvcnQoKSA6IHN0cmluZyB7IHJldHVybiB0aGlzLl9xdWVyeS5zb3J0OyB9XG4gICAgZ2V0U29ydEZpZWxkKCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fcXVlcnkuc29ydC5zcGxpdCgnLCcpWzBdOyB9XG4gICAgZ2V0U29ydE9yZGVyKCkgOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3F1ZXJ5LnNvcnQuc3BsaXQoJywnKVsxXSA9PT0gJ2FzYyc7IH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHBhZ2UgLSBwYWdlIG9mIHJlc3VsdHMgdG8gZmV0Y2hcbiAgICAgKi9cbiAgICBwYWdlIChwYWdlIDogbnVtYmVyKSA6IEFnb2xRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZShwYWdlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0UGFnZShwYWdlIDogbnVtYmVyKSB7XG4gICAgICAgIGlmKGlzTmFOKHBhZ2UpIHx8IHBhZ2UqMTwwKSByZXR1cm47XG4gICAgICAgIHRoaXMuX3F1ZXJ5LnBhZ2UgPSBwYWdlKjE7XG4gICAgfVxuXG4gICAgZ2V0UGFnZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXJ5LnBhZ2U7XG4gICAgfVxuXG4gICAgbmV4dFBhZ2UoKSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLl9xdWVyeS5wYWdlKzEpO1xuICAgIH1cblxuICAgIHByZXZpb3VzUGFnZSgpIHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuX3F1ZXJ5LnBhZ2UtMSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc2l6ZSAtIHBhZ2Ugc2l6ZSB0byByZXF1ZXN0XG4gICAgICovXG4gICAgcGFnZVNpemUgKHNpemUgOiBudW1iZXIpIDogQWdvbFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYWdlU2l6ZShzaXplKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0UGFnZVNpemUgKHNpemUgOiBudW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4oc2l6ZSkgfHwgc2l6ZSoxPDApIHJldHVybjtcbiAgICAgICAgdGhpcy5fcXVlcnkuc2l6ZSA9IHNpemUqMTtcbiAgICB9XG5cbiAgICBnZXRQYWdlU2l6ZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXJ5LnNpemU7XG4gICAgfVxuXG59XG5cblxuY2xhc3MgQWdvbFNlcnZpY2UgZXh0ZW5kcyBCYXNlU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy5zZXRUaW1lb3V0KDMwMDAwKTtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybCA6IHN0cmluZykge1xuICAgICAgICBzdXBlci5zZXRVcmwoYmFzZVVybCk7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmwgKyAnL2FwaS9hZ29sJztcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFHT0wgT1JHUyBNRVRIT0RTXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgQUdPTCBvcmdhbml6YXRpb24gdG8gZmV0Y2hcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEl0ZW0gb2JqZWN0IG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZ2V0T3JnIChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIGlkIClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLCB1cmw6dGhpcy5iYXNlVXJsICsgJy9vcmdzLycgKyBpZCwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEFnb2xTZXJ2aWNlLmdldE9yZygpIC0gRXJyb3IgZmV0Y2hpbmcgb3JnICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZyAtIGVpdGhlciBKUyBvYmplY3Qgb2YgcXVlcnkgcGFyYW1ldGVycyBvciBRdWVyeSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VhcmNoIHJlc3VsdHNcbiAgICAgKi9cbiAgICBzZWFyY2hPcmdzIChhcmcgOiBBZ29sUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8U2VhcmNoUmVzdWx0cz4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBhcmcgKVxuICAgICAgICAudGhlbiggcGFyYW1zID0+IHtcblxuICAgICAgICAgICAgbGV0IHBzID0gcGFyYW1zLmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYmFzZVVybCArICcvb3JncycsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwcyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEFnb2xTZXJ2aWNlLnNlYXJjaE9yZ3MoKSAtIEVycm9yIHNlYXJjaGluZyBvcmdzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBR09MIEdST1VQUyBNRVRIT0RTXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgQUdPTCBncm91cCB0byBmZXRjaFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBnZXRHcm91cCAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnRoaXMuYmFzZVVybCArICcvZ3JvdXBzLycgKyBpZCwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEFnb2xTZXJ2aWNlLmdldEdyb3VwKCkgLSBFcnJvciBmZXRjaGluZyBncm91cCAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZyAtIGVpdGhlciBKUyBvYmplY3Qgb2YgcXVlcnkgcGFyYW1ldGVycyBvciBBZ29sUXVlcnkgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgc2VhcmNoR3JvdXBzIChhcmcgOiBBZ29sUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8U2VhcmNoUmVzdWx0cz4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBhcmcgKVxuICAgICAgICAudGhlbiggcGFyYW1zID0+IHtcblxuICAgICAgICAgICAgbGV0IHBzID0gcGFyYW1zLmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYmFzZVVybCArICcvZ3JvdXBzJyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBzLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgQWdvbFNlcnZpY2Uuc2VhcmNoR3JvdXBzKCkgLSBFcnJvciBzZWFyY2hpbmcgZ3JvdXBzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBR09MIElURU1TIE1FVEhPRFNcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgQUdPTCBpdGVtIHRvIGZldGNoXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGdldEl0ZW0gKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggaWQgKVxuICAgICAgICAudGhlbiggKGlkIDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6dGhpcy5iYXNlVXJsICsgJy9pdGVtcy8nICsgaWQsXG4gICAgICAgICAgICAgICAgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEFnb2xTZXJ2aWNlLmdldEl0ZW0oKSAtIEVycm9yIGZldGNoaW5nIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBlaXRoZXIgSlMgb2JqZWN0IG9mIHF1ZXJ5IHBhcmFtZXRlcnMgb3IgQWdvbFF1ZXJ5IGluc3RhbmNlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHNlYXJjaEl0ZW1zIChhcmcgOiBBZ29sUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8U2VhcmNoUmVzdWx0cz4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBhcmcgKVxuICAgICAgICAudGhlbiggcGFyYW1zID0+IHtcblxuICAgICAgICAgICAgbGV0IHBzID0gcGFyYW1zLmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYmFzZVVybCArICcvaXRlbXMnLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcHMsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5zZWFyY2hJdGVtcygpIC0gRXJyb3Igc2VhcmNoaW5nIGl0ZW1zOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgZ2V0QWdvbElkIChvYmogOiBhbnkpIDogc3RyaW5nfG51bGwge1xuICAgICAgICBpZighb2JqKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZighb2JqLnR5cGUpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmKEl0ZW1UeXBlcy5PUkdBTklaQVRJT04gPT09IG9iai50eXBlIHx8ICdHcm91cCcgPT09IG9iai50eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqLmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIW9iai5pZGVudGlmaWVycyB8fCAhb2JqLmlkZW50aWZpZXJzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGxldCBpZHMgPSBvYmouaWRlbnRpZmllcnMuZmlsdGVyKCAoaWQ6c3RyaW5nKSA9PiB+aWQuaW5kZXhPZignYWdvbDonKSk7XG4gICAgICAgIGlmKCFpZHMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIGlkc1swXS5yZXBsYWNlKCdhZ29sOicsJycpO1xuICAgIH1cblxufVxuXG5leHBvcnQge1xuICAgIEFnb2xTZXJ2aWNlIGFzIGRlZmF1bHQsXG4gICAgQWdvbFNlcnZpY2UsXG4gICAgQWdvbFF1ZXJ5XG59O1xuIl19