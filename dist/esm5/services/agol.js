/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import ItemTypes from '../shared/types';
import BaseService from "./base";
var AgolQuery = /** @class */ (function () {
    function AgolQuery() {
        this._query = {
            page: 0,
            size: 10
        };
    }
    /**
     * @return {?}
     */
    AgolQuery.prototype.getQuery = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = {};
        for (var prop in this._query) {
            /** @type {?} */
            var value = this._query[prop];
            if (value !== null && typeof (value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    };
    // ---------------------------------------
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.q = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this.setQ(value); return this; };
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.setQ = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this._query["q"] = value; };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getQ = /**
     * @return {?}
     */
    function () { return this._query["q"]; };
    // ---------------------------------------
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.types = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.setTypes(value);
        return this;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.setTypes = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var val;
        if (value && Array.isArray(value))
            val = (/** @type {?} */ (value)).join(',');
        else
            val = /** @type {?} */ (value);
        this._query["types"] = val;
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getTypes = /**
     * @return {?}
     */
    function () { return this._query["types"]; };
    // ---------------------------------------
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.groups = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.setGroups(value);
        return this;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.setGroups = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var val;
        if (value && Array.isArray(value))
            val = (/** @type {?} */ (value)).join(',');
        else
            val = /** @type {?} */ (value);
        this._query["groups"] = val;
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getGroups = /**
     * @return {?}
     */
    function () { return this._query["groups"]; };
    // ---------------------------------------
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.orgs = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.setOrgs(value);
        return this;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.setOrgs = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var val;
        if (value && Array.isArray(value))
            val = (/** @type {?} */ (value)).join(',');
        else
            val = /** @type {?} */ (value);
        this._query["orgs"] = val;
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getOrgs = /**
     * @return {?}
     */
    function () { return this._query["orgs"]; };
    // ---------------------------------------
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.extent = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this.setExtent(value); return this; };
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.setExtent = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this._query["bbox"] = value; };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getExtent = /**
     * @return {?}
     */
    function () { return this._query["bbox"]; };
    // ---------------------------------------
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    AgolQuery.prototype.sort = /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    function (sort, order) {
        this.setSort(sort, order);
        return this;
    };
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    AgolQuery.prototype.setSort = /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    function (sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this._query["sort"] = sort;
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getSort = /**
     * @return {?}
     */
    function () { return this._query["sort"]; };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getSortField = /**
     * @return {?}
     */
    function () { return this._query["sort"].split(',')[0]; };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getSortOrder = /**
     * @return {?}
     */
    function () { return this._query["sort"].split(',')[1] === 'asc'; };
    // -----------------------------------------------------------
    /**
     * @param page - page of results to fetch
     */
    /**
     * @param {?} page - page of results to fetch
     * @return {?}
     */
    AgolQuery.prototype.page = /**
     * @param {?} page - page of results to fetch
     * @return {?}
     */
    function (page) {
        this.setPage(page);
        return this;
    };
    /**
     * @param {?} page
     * @return {?}
     */
    AgolQuery.prototype.setPage = /**
     * @param {?} page
     * @return {?}
     */
    function (page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this._query["page"] = page * 1;
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getPage = /**
     * @return {?}
     */
    function () {
        return this._query["page"];
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.nextPage = /**
     * @return {?}
     */
    function () {
        this.setPage(this._query["page"] + 1);
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.previousPage = /**
     * @return {?}
     */
    function () {
        this.setPage(this._query["page"] - 1);
    };
    // -----------------------------------------------------------
    /**
     * @param size - page size to request
     */
    /**
     * @param {?} size - page size to request
     * @return {?}
     */
    AgolQuery.prototype.pageSize = /**
     * @param {?} size - page size to request
     * @return {?}
     */
    function (size) {
        this.setPageSize(size);
        return this;
    };
    /**
     * @param {?} size
     * @return {?}
     */
    AgolQuery.prototype.setPageSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this._query["size"] = size * 1;
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getPageSize = /**
     * @return {?}
     */
    function () {
        return this._query["size"];
    };
    return AgolQuery;
}());
if (false) {
    /** @type {?} */
    AgolQuery.prototype._query;
}
var AgolService = /** @class */ (function (_super) {
    tslib_1.__extends(AgolService, _super);
    function AgolService(url, httpClient) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.setTimeout(30000);
        return _this;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    AgolService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl + '/api/agol';
    };
    // -----------------------------------------------------------------------
    // AGOL ORGS METHODS
    /**
     * @param id - identifier of AGOL organization to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    /**
     * @param {?} id - identifier of AGOL organization to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    AgolService.prototype.getOrg = /**
     * @param {?} id - identifier of AGOL organization to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: _this.baseUrl + '/orgs/' + id, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("AgolService.getOrg() - Error fetching org " + id + ": " + e.message);
            Object.assign(err, e);
            throw err;
        });
    };
    /**
     * @param arg - either JS object of query parameters or Query instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    /**
     * @param {?} arg - either JS object of query parameters or Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    AgolService.prototype.searchOrgs = /**
     * @param {?} arg - either JS object of query parameters or Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    function (arg, options) {
        var _this = this;
        return this.createAndResolvePromise(arg)
            .then(function (params) {
            /** @type {?} */
            var ps = params.getQuery();
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET",
                url: _this.baseUrl + '/orgs',
                params: ps,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("AgolService.searchOrgs() - Error searching orgs: " + e.message);
            Object.assign(err, e);
            throw err;
        });
    };
    // -----------------------------------------------------------------------
    // AGOL GROUPS METHODS
    /**
     * @param id - identifier of AGOL group to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    /**
     * @param {?} id - identifier of AGOL group to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    AgolService.prototype.getGroup = /**
     * @param {?} id - identifier of AGOL group to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: _this.baseUrl + '/groups/' + id, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("AgolService.getGroup() - Error fetching group " + id + ": " + e.message);
            Object.assign(err, e);
            throw err;
        });
    };
    /**
     * @param arg - either JS object of query parameters or AgolQuery instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    /**
     * @param {?} arg - either JS object of query parameters or AgolQuery instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    AgolService.prototype.searchGroups = /**
     * @param {?} arg - either JS object of query parameters or AgolQuery instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    function (arg, options) {
        var _this = this;
        return this.createAndResolvePromise(arg)
            .then(function (params) {
            /** @type {?} */
            var ps = params.getQuery();
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET",
                url: _this.baseUrl + '/groups',
                params: ps,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("AgolService.searchGroups() - Error searching groups: " + e.message);
            Object.assign(err, e);
            throw err;
        });
    };
    // -----------------------------------------------------------------------
    // AGOL ITEMS METHODS
    /**
     * @param id - identifier of AGOL item to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    /**
     * @param {?} id - identifier of AGOL item to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    AgolService.prototype.getItem = /**
     * @param {?} id - identifier of AGOL item to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET",
                url: _this.baseUrl + '/items/' + id,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("AgolService.getItem() - Error fetching item " + id + ": " + e.message);
            Object.assign(err, e);
            throw err;
        });
    };
    /**
     * @param arg - either JS object of query parameters or AgolQuery instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    /**
     * @param {?} arg - either JS object of query parameters or AgolQuery instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    AgolService.prototype.searchItems = /**
     * @param {?} arg - either JS object of query parameters or AgolQuery instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    function (arg, options) {
        var _this = this;
        return this.createAndResolvePromise(arg)
            .then(function (params) {
            /** @type {?} */
            var ps = params.getQuery();
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET",
                url: _this.baseUrl + '/items',
                params: ps,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("AgolService.searchItems() - Error searching items: " + e.message);
            Object.assign(err, e);
            throw err;
        });
    };
    /* --------------------------- */
    /**
     * @param {?} obj
     * @return {?}
     */
    AgolService.prototype.getAgolId = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
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
        var ids = obj.identifiers.filter(function (id) { return ~id.indexOf('agol:'); });
        if (!ids.length)
            return null;
        return ids[0].replace('agol:', '');
    };
    return AgolService;
}(BaseService));
export { AgolService as default, AgolService, AgolQuery };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9hZ29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFHeEMsT0FBTyxXQUFXLE1BQU0sUUFBUSxDQUFDO0FBRWpDLElBQUE7SUFJSTtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDVixJQUFJLEVBQUUsQ0FBQztZQUNQLElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztLQUNMOzs7O0lBRUQsNEJBQVE7OztJQUFSOztRQUNJLElBQUksTUFBTSxHQUEwQixFQUFFLENBQUM7UUFDdkMsS0FBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFOztZQUN6QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDckQsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0I7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxNQUFNLENBQUM7S0FDakI7SUFFRCwwQ0FBMEM7Ozs7O0lBRTFDLHFCQUFDOzs7O0lBQUQsVUFBRSxLQUFjLElBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFOzs7OztJQUNoRSx3QkFBSTs7OztJQUFKLFVBQUssS0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLFFBQUssS0FBSyxDQUFDLEVBQUU7Ozs7SUFDL0Msd0JBQUk7OztJQUFKLGNBQWtCLE9BQU8sSUFBSSxDQUFDLE1BQU0sTUFBRyxFQUFFO0lBRXpD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Q0FBb0IsQ0FBQyxDQUFDO1FBQ3ZFLElBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQzVCLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUMsRUFBRSxDQUFDLENBQUM7S0FDckM7c0JBL1ZMO0VBZ0swQixXQUFXLEVBaU1wQyxDQUFBO0FBRUQsT0FBTyxFQUNILFdBQVcsSUFBSSxPQUFPLEVBQ3RCLFdBQVcsRUFDWCxTQUFTLEVBQ1osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSXRlbSwgU2VhcmNoUmVzdWx0cyB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMnO1xuaW1wb3J0IEl0ZW1UeXBlcyBmcm9tICcuLi9zaGFyZWQvdHlwZXMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuaW1wb3J0IEJhc2VTZXJ2aWNlIGZyb20gXCIuL2Jhc2VcIjtcblxuY2xhc3MgQWdvbFF1ZXJ5IHtcblxuICAgIHByaXZhdGUgX3F1ZXJ5IDogeyBba2V5OnN0cmluZ106YW55IH07XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fcXVlcnkgPSB7XG4gICAgICAgICAgICBwYWdlOiAwLFxuICAgICAgICAgICAgc2l6ZTogMTBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRRdWVyeSgpIDogeyBba2V5OnN0cmluZ106YW55IH0ge1xuICAgICAgICBsZXQgcmVzdWx0IDogeyBba2V5OnN0cmluZ106YW55IH0gPSB7fTtcbiAgICAgICAgZm9yKGxldCBwcm9wIGluIHRoaXMuX3F1ZXJ5KSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9xdWVyeVtwcm9wXTtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZih2YWx1ZS5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4oJywnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBxKHZhbHVlIDogc3RyaW5nKSA6IEFnb2xRdWVyeSB7IHRoaXMuc2V0USh2YWx1ZSk7IHJldHVybiB0aGlzOyB9XG4gICAgc2V0USh2YWx1ZSA6IHN0cmluZykgeyB0aGlzLl9xdWVyeS5xID0gdmFsdWU7IH1cbiAgICBnZXRRKCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fcXVlcnkucTsgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICB0eXBlcyh2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkgOiBBZ29sUXVlcnkge1xuICAgICAgICB0aGlzLnNldFR5cGVzKHZhbHVlKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFR5cGVzKHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIGxldCB2YWwgOiBzdHJpbmc7XG4gICAgICAgIGlmKHZhbHVlICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICAgICAgdmFsID0gKHZhbHVlIGFzIEFycmF5PHN0cmluZz4pLmpvaW4oJywnKTtcbiAgICAgICAgZWxzZSB2YWwgPSB2YWx1ZSBhcyBzdHJpbmc7XG4gICAgICAgIHRoaXMuX3F1ZXJ5LnR5cGVzID0gdmFsO1xuICAgIH1cbiAgICBnZXRUeXBlcygpIDogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fcXVlcnkudHlwZXM7IH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgZ3JvdXBzKHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSA6IEFnb2xRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0R3JvdXBzKHZhbHVlKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEdyb3Vwcyh2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICBsZXQgdmFsIDogc3RyaW5nO1xuICAgICAgICBpZih2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgICAgICAgIHZhbCA9ICh2YWx1ZSBhcyBBcnJheTxzdHJpbmc+KS5qb2luKCcsJyk7XG4gICAgICAgIGVsc2UgdmFsID0gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICB0aGlzLl9xdWVyeS5ncm91cHMgPSB2YWw7XG4gICAgfVxuICAgIGdldEdyb3VwcygpIDogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fcXVlcnkuZ3JvdXBzOyB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIG9yZ3ModmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIDogQWdvbFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRPcmdzKHZhbHVlKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldE9yZ3ModmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgbGV0IHZhbCA6IHN0cmluZztcbiAgICAgICAgaWYodmFsdWUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgICAgICB2YWwgPSAodmFsdWUgYXMgQXJyYXk8c3RyaW5nPikuam9pbignLCcpO1xuICAgICAgICBlbHNlIHZhbCA9IHZhbHVlIGFzIHN0cmluZztcbiAgICAgICAgdGhpcy5fcXVlcnkub3JncyA9IHZhbDtcbiAgICB9XG4gICAgZ2V0T3JncygpIDogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fcXVlcnkub3JnczsgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBleHRlbnQodmFsdWUgOiBhbnkpIDogQWdvbFF1ZXJ5IHsgdGhpcy5zZXRFeHRlbnQodmFsdWUpOyByZXR1cm4gdGhpczsgfVxuICAgIHNldEV4dGVudCh2YWx1ZSA6IGFueSkgeyB0aGlzLl9xdWVyeS5iYm94ID0gdmFsdWU7IH1cbiAgICBnZXRFeHRlbnQoKSA6IGFueSB7IHJldHVybiB0aGlzLl9xdWVyeS5iYm94OyB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzb3J0IC0gZm9ybSBvZiA8ZmllbGQ+LDxkaXI+IG9yIGp1c3QgZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSBvcmRlciAtIG9wdGlvbmFsLCBlaXRoZXIgJ2FzYycgb3IgJ2Rlc2MnXG4gICAgICovXG4gICAgc29ydCAoc29ydCA6IHN0cmluZywgb3JkZXIgOiBzdHJpbmcpIDogQWdvbFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTb3J0KHNvcnQsIG9yZGVyKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzb3J0IC0gZm9ybSBvZiA8ZmllbGQ+LDxkaXI+IG9yIGp1c3QgZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSBvcmRlciAtIG9wdGlvbmFsLCBlaXRoZXIgJ2FzYycgb3IgJ2Rlc2MnXG4gICAgICovXG4gICAgIHNldFNvcnQoc29ydCA6IHN0cmluZywgb3JkZXIgOiBzdHJpbmcpIHtcbiAgICAgICAgIG9yZGVyID0gb3JkZXIgfHwgJ2Rlc2MnO1xuICAgICAgICAgaWYoc29ydCAmJiBzb3J0LmluZGV4T2YoJywnKTwwKVxuICAgICAgICAgICAgc29ydCA9IHNvcnQgKyAnLCcgKyBvcmRlcjtcbiAgICAgICAgIHRoaXMuX3F1ZXJ5LnNvcnQgPSBzb3J0O1xuICAgIH1cbiAgICBnZXRTb3J0KCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fcXVlcnkuc29ydDsgfVxuICAgIGdldFNvcnRGaWVsZCgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3F1ZXJ5LnNvcnQuc3BsaXQoJywnKVswXTsgfVxuICAgIGdldFNvcnRPcmRlcigpIDogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9xdWVyeS5zb3J0LnNwbGl0KCcsJylbMV0gPT09ICdhc2MnOyB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYWdlIC0gcGFnZSBvZiByZXN1bHRzIHRvIGZldGNoXG4gICAgICovXG4gICAgcGFnZSAocGFnZSA6IG51bWJlcikgOiBBZ29sUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhZ2UocGFnZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFBhZ2UocGFnZSA6IG51bWJlcikge1xuICAgICAgICBpZihpc05hTihwYWdlKSB8fCBwYWdlKjE8MCkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9xdWVyeS5wYWdlID0gcGFnZSoxO1xuICAgIH1cblxuICAgIGdldFBhZ2UoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeS5wYWdlO1xuICAgIH1cblxuICAgIG5leHRQYWdlKCkge1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5fcXVlcnkucGFnZSsxKTtcbiAgICB9XG5cbiAgICBwcmV2aW91c1BhZ2UoKSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLl9xdWVyeS5wYWdlLTEpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNpemUgLSBwYWdlIHNpemUgdG8gcmVxdWVzdFxuICAgICAqL1xuICAgIHBhZ2VTaXplIChzaXplIDogbnVtYmVyKSA6IEFnb2xRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZVNpemUoc2l6ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFBhZ2VTaXplIChzaXplIDogbnVtYmVyKSB7XG4gICAgICAgIGlmKGlzTmFOKHNpemUpIHx8IHNpemUqMTwwKSByZXR1cm47XG4gICAgICAgIHRoaXMuX3F1ZXJ5LnNpemUgPSBzaXplKjE7XG4gICAgfVxuXG4gICAgZ2V0UGFnZVNpemUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeS5zaXplO1xuICAgIH1cblxufVxuXG5cbmNsYXNzIEFnb2xTZXJ2aWNlIGV4dGVuZHMgQmFzZVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgICAgIHRoaXMuc2V0VGltZW91dCgzMDAwMCk7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmwgOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIuc2V0VXJsKGJhc2VVcmwpO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvYWdvbCc7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBR09MIE9SR1MgTUVUSE9EU1xuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEFHT0wgb3JnYW5pemF0aW9uIHRvIGZldGNoXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGdldE9yZyAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnRoaXMuYmFzZVVybCArICcvb3Jncy8nICsgaWQsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5nZXRPcmcoKSAtIEVycm9yIGZldGNoaW5nIG9yZyAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBlaXRoZXIgSlMgb2JqZWN0IG9mIHF1ZXJ5IHBhcmFtZXRlcnMgb3IgUXVlcnkgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgc2VhcmNoT3JncyAoYXJnIDogQWdvbFF1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPFNlYXJjaFJlc3VsdHM+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggYXJnIClcbiAgICAgICAgLnRoZW4oIHBhcmFtcyA9PiB7XG5cbiAgICAgICAgICAgIGxldCBwcyA9IHBhcmFtcy5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmJhc2VVcmwgKyAnL29yZ3MnLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcHMsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5zZWFyY2hPcmdzKCkgLSBFcnJvciBzZWFyY2hpbmcgb3JnczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQUdPTCBHUk9VUFMgTUVUSE9EU1xuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEFHT0wgZ3JvdXAgdG8gZmV0Y2hcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEl0ZW0gb2JqZWN0IG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZ2V0R3JvdXAgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggaWQgKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp0aGlzLmJhc2VVcmwgKyAnL2dyb3Vwcy8nICsgaWQsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5nZXRHcm91cCgpIC0gRXJyb3IgZmV0Y2hpbmcgZ3JvdXAgJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBlaXRoZXIgSlMgb2JqZWN0IG9mIHF1ZXJ5IHBhcmFtZXRlcnMgb3IgQWdvbFF1ZXJ5IGluc3RhbmNlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHNlYXJjaEdyb3VwcyAoYXJnIDogQWdvbFF1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPFNlYXJjaFJlc3VsdHM+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggYXJnIClcbiAgICAgICAgLnRoZW4oIHBhcmFtcyA9PiB7XG5cbiAgICAgICAgICAgIGxldCBwcyA9IHBhcmFtcy5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmJhc2VVcmwgKyAnL2dyb3VwcycsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwcyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEFnb2xTZXJ2aWNlLnNlYXJjaEdyb3VwcygpIC0gRXJyb3Igc2VhcmNoaW5nIGdyb3VwczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQUdPTCBJVEVNUyBNRVRIT0RTXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEFHT0wgaXRlbSB0byBmZXRjaFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBnZXRJdGVtIChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIGlkIClcbiAgICAgICAgLnRoZW4oIChpZCA6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOnRoaXMuYmFzZVVybCArICcvaXRlbXMvJyArIGlkLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5nZXRJdGVtKCkgLSBFcnJvciBmZXRjaGluZyBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnIC0gZWl0aGVyIEpTIG9iamVjdCBvZiBxdWVyeSBwYXJhbWV0ZXJzIG9yIEFnb2xRdWVyeSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VhcmNoIHJlc3VsdHNcbiAgICAgKi9cbiAgICBzZWFyY2hJdGVtcyAoYXJnIDogQWdvbFF1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPFNlYXJjaFJlc3VsdHM+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggYXJnIClcbiAgICAgICAgLnRoZW4oIHBhcmFtcyA9PiB7XG5cbiAgICAgICAgICAgIGxldCBwcyA9IHBhcmFtcy5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmJhc2VVcmwgKyAnL2l0ZW1zJyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBzLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgQWdvbFNlcnZpY2Uuc2VhcmNoSXRlbXMoKSAtIEVycm9yIHNlYXJjaGluZyBpdGVtczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIGdldEFnb2xJZCAob2JqIDogYW55KSA6IHN0cmluZ3xudWxsIHtcbiAgICAgICAgaWYoIW9iaikgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYoIW9iai50eXBlKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZihJdGVtVHlwZXMuT1JHQU5JWkFUSU9OID09PSBvYmoudHlwZSB8fCAnR3JvdXAnID09PSBvYmoudHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIG9iai5pZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFvYmouaWRlbnRpZmllcnMgfHwgIW9iai5pZGVudGlmaWVycy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgaWRzID0gb2JqLmlkZW50aWZpZXJzLmZpbHRlciggKGlkOnN0cmluZykgPT4gfmlkLmluZGV4T2YoJ2Fnb2w6JykpO1xuICAgICAgICBpZighaWRzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBpZHNbMF0ucmVwbGFjZSgnYWdvbDonLCcnKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IHtcbiAgICBBZ29sU2VydmljZSBhcyBkZWZhdWx0LFxuICAgIEFnb2xTZXJ2aWNlLFxuICAgIEFnb2xRdWVyeVxufTtcbiJdfQ==