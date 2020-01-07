import * as tslib_1 from "tslib";
import ItemTypes from '../shared/types';
import BaseService from "./base";
var AgolQuery = /** @class */ (function () {
    function AgolQuery(options) {
        this._query = {
            page: 0,
            size: 10
        };
        if (options) {
            this.applyParameters(options);
        }
    }
    AgolQuery.prototype.getQuery = function () {
        var result = {};
        for (var prop in this._query) {
            var value = this._query[prop];
            if (value !== null && typeof (value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    };
    /**
     * @param obj - set of parameter/values to apply to this query
     */
    AgolQuery.prototype.applyParameters = function (obj) {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                this._query[p] = obj[p];
            }
        }
    };
    // ---------------------------------------
    AgolQuery.prototype.q = function (value) { this.setQ(value); return this; };
    AgolQuery.prototype.setQ = function (value) { this._query.q = value; };
    AgolQuery.prototype.getQ = function () { return this._query.q; };
    // ---------------------------------------
    AgolQuery.prototype.types = function (value) {
        this.setTypes(value);
        return this;
    };
    AgolQuery.prototype.setTypes = function (value) {
        var val;
        if (value && Array.isArray(value))
            val = value.join(',');
        else
            val = value;
        this._query.types = val;
    };
    AgolQuery.prototype.getTypes = function () { return this._query.types; };
    // ---------------------------------------
    AgolQuery.prototype.groups = function (value) {
        this.setGroups(value);
        return this;
    };
    AgolQuery.prototype.setGroups = function (value) {
        var val;
        if (value && Array.isArray(value))
            val = value.join(',');
        else
            val = value;
        this._query.groups = val;
    };
    AgolQuery.prototype.getGroups = function () { return this._query.groups; };
    // ---------------------------------------
    AgolQuery.prototype.orgs = function (value) {
        this.setOrgs(value);
        return this;
    };
    AgolQuery.prototype.setOrgs = function (value) {
        var val;
        if (value && Array.isArray(value))
            val = value.join(',');
        else
            val = value;
        this._query.orgs = val;
    };
    AgolQuery.prototype.getOrgs = function () { return this._query.orgs; };
    // ---------------------------------------
    AgolQuery.prototype.extent = function (value) { this.setExtent(value); return this; };
    AgolQuery.prototype.setExtent = function (value) { this._query.bbox = value; };
    AgolQuery.prototype.getExtent = function () { return this._query.bbox; };
    // ---------------------------------------
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    AgolQuery.prototype.sort = function (sort, order) {
        this.setSort(sort, order);
        return this;
    };
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    AgolQuery.prototype.setSort = function (sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this._query.sort = sort;
    };
    AgolQuery.prototype.getSort = function () { return this._query.sort; };
    AgolQuery.prototype.getSortField = function () { return this._query.sort.split(',')[0]; };
    AgolQuery.prototype.getSortOrder = function () { return this._query.sort.split(',')[1] === 'asc'; };
    // -----------------------------------------------------------
    /**
     * @param page - page of results to fetch
     */
    AgolQuery.prototype.page = function (page) {
        this.setPage(page);
        return this;
    };
    AgolQuery.prototype.setPage = function (page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this._query.page = page * 1;
    };
    AgolQuery.prototype.getPage = function () {
        return this._query.page;
    };
    AgolQuery.prototype.nextPage = function () {
        this.setPage(this._query.page + 1);
    };
    AgolQuery.prototype.previousPage = function () {
        this.setPage(this._query.page - 1);
    };
    // -----------------------------------------------------------
    /**
     * @param size - page size to request
     */
    AgolQuery.prototype.pageSize = function (size) {
        this.setPageSize(size);
        return this;
    };
    AgolQuery.prototype.setPageSize = function (size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this._query.size = size * 1;
    };
    AgolQuery.prototype.getPageSize = function () {
        return this._query.size;
    };
    return AgolQuery;
}());
var AgolService = /** @class */ (function (_super) {
    tslib_1.__extends(AgolService, _super);
    function AgolService(url, httpClient) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.setTimeout(30000);
        return _this;
    }
    AgolService.prototype.setUrl = function (baseUrl) {
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
    AgolService.prototype.getOrg = function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            var opts = _this.buildRequest({
                method: "GET", url: _this.baseUrl + '/orgs/' + id, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
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
    AgolService.prototype.searchOrgs = function (arg, options) {
        var _this = this;
        return this.createAndResolvePromise(arg)
            .then(function (params) {
            var ps = params.getQuery();
            var opts = _this.buildRequest({
                method: "GET",
                url: _this.baseUrl + '/orgs',
                params: ps,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
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
    AgolService.prototype.getGroup = function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            var opts = _this.buildRequest({
                method: "GET", url: _this.baseUrl + '/groups/' + id, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
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
    AgolService.prototype.searchGroups = function (arg, options) {
        var _this = this;
        return this.createAndResolvePromise(arg)
            .then(function (params) {
            var ps = params.getQuery();
            var opts = _this.buildRequest({
                method: "GET",
                url: _this.baseUrl + '/groups',
                params: ps,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
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
    AgolService.prototype.getItem = function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            var opts = _this.buildRequest({
                method: "GET",
                url: _this.baseUrl + '/items/' + id,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
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
    AgolService.prototype.searchItems = function (arg, options) {
        var _this = this;
        return this.createAndResolvePromise(arg)
            .then(function (params) {
            var ps = params.getQuery();
            var opts = _this.buildRequest({
                method: "GET",
                url: _this.baseUrl + '/items',
                params: ps,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            var err = new Error("AgolService.searchItems() - Error searching items: " + e.message);
            Object.assign(err, e);
            throw err;
        });
    };
    /* --------------------------- */
    AgolService.prototype.getAgolId = function (obj) {
        if (!obj)
            return null;
        if (!obj.type)
            return null;
        if (ItemTypes.ORGANIZATION === obj.type || 'Group' === obj.type) {
            return obj.id;
        }
        if (!obj.identifiers || !obj.identifiers.length)
            return null;
        var ids = obj.identifiers.filter(function (id) { return ~id.indexOf('agol:'); });
        if (!ids.length)
            return null;
        return ids[0].replace('agol:', '');
    };
    return AgolService;
}(BaseService));
export { AgolService as default, AgolService, AgolQuery };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9hZ29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUd4QyxPQUFPLFdBQVcsTUFBTSxRQUFRLENBQUM7QUFFakM7SUFJSSxtQkFBWSxPQUErQjtRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUUsRUFBRTtTQUNYLENBQUM7UUFFRixJQUFHLE9BQU8sRUFBRTtZQUNSLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBRUQsNEJBQVEsR0FBUjtRQUNJLElBQUksTUFBTSxHQUEwQixFQUFFLENBQUM7UUFDdkMsS0FBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsSUFBRyxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxFQUFFO2dCQUNyRCxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzQjtZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDeEI7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQ0FBZSxHQUFmLFVBQWlCLEdBQTBCO1FBQ3ZDLEtBQUksSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFO1lBQ2QsSUFBRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFFLENBQVcsQ0FBRSxHQUFHLEdBQUcsQ0FBQyxDQUFD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QVcsR0FBUztRQUNoQixJQUFHLENBQUMsR0FBRztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXJCLElBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRTFCLElBQUcsU0FBUyxDQUFDLFlBQVksS0FBSyxHQUFHLENBQUMsSUFBSSxJQUFJLE9BQU8sS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQzVELE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQztTQUNqQjtRQUVELElBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDNUQsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUUsVUFBQyxFQUFTLElBQUssT0FBQSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQztRQUN2RSxJQUFHLENBQUMsR0FBRyxDQUFDLE1BQU07WUFBRSxPQUFPLElBQUksQ0FBQztRQUM1QixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTCxrQkFBQztBQUFELENBQUMsQUFqTUQsQ0FBMEIsV0FBVyxHQWlNcEM7QUFFRCxPQUFPLEVBQ0gsV0FBVyxJQUFJLE9BQU8sRUFDdEIsV0FBVyxFQUNYLFNBQVMsRUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBJdGVtLCBTZWFyY2hSZXN1bHRzIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscyc7XG5pbXBvcnQgSXRlbVR5cGVzIGZyb20gJy4uL3NoYXJlZC90eXBlcyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uL3NoYXJlZC9jb25maWcnO1xuaW1wb3J0IEdQSHR0cENsaWVudCBmcm9tICcuLi9odHRwL2NsaWVudCc7XG5pbXBvcnQgQmFzZVNlcnZpY2UgZnJvbSBcIi4vYmFzZVwiO1xuXG5jbGFzcyBBZ29sUXVlcnkge1xuXG4gICAgcHJpdmF0ZSBfcXVlcnkgOiB7IFtrZXk6c3RyaW5nXTphbnkgfTtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPzogeyBba2V5OnN0cmluZ106YW55IH0pIHtcbiAgICAgICAgdGhpcy5fcXVlcnkgPSB7XG4gICAgICAgICAgICBwYWdlOiAwLFxuICAgICAgICAgICAgc2l6ZTogMTBcbiAgICAgICAgfTtcblxuICAgICAgICBpZihvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5UGFyYW1ldGVycyhvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFF1ZXJ5KCkgOiB7IFtrZXk6c3RyaW5nXTphbnkgfSB7XG4gICAgICAgIGxldCByZXN1bHQgOiB7IFtrZXk6c3RyaW5nXTphbnkgfSA9IHt9O1xuICAgICAgICBmb3IobGV0IHByb3AgaW4gdGhpcy5fcXVlcnkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX3F1ZXJ5W3Byb3BdO1xuICAgICAgICAgICAgaWYodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mKHZhbHVlLnB1c2gpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuam9pbignLCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb2JqIC0gc2V0IG9mIHBhcmFtZXRlci92YWx1ZXMgdG8gYXBwbHkgdG8gdGhpcyBxdWVyeVxuICAgICAqL1xuICAgIGFwcGx5UGFyYW1ldGVycyAob2JqIDogeyBba2V5OnN0cmluZ106YW55IH0gKSA6IHZvaWQge8KgXG4gICAgICAgIGZvcihsZXQgcCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXJ5WyBwIGFzIHN0cmluZyBdID0gb2JqW3BdIGFzIGFueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBxKHZhbHVlIDogc3RyaW5nKSA6IEFnb2xRdWVyeSB7IHRoaXMuc2V0USh2YWx1ZSk7IHJldHVybiB0aGlzOyB9XG4gICAgc2V0USh2YWx1ZSA6IHN0cmluZykgeyB0aGlzLl9xdWVyeS5xID0gdmFsdWU7IH1cbiAgICBnZXRRKCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fcXVlcnkucTsgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICB0eXBlcyh2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkgOiBBZ29sUXVlcnkge1xuICAgICAgICB0aGlzLnNldFR5cGVzKHZhbHVlKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFR5cGVzKHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIGxldCB2YWwgOiBzdHJpbmc7XG4gICAgICAgIGlmKHZhbHVlICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICAgICAgdmFsID0gKHZhbHVlIGFzIEFycmF5PHN0cmluZz4pLmpvaW4oJywnKTtcbiAgICAgICAgZWxzZSB2YWwgPSB2YWx1ZSBhcyBzdHJpbmc7XG4gICAgICAgIHRoaXMuX3F1ZXJ5LnR5cGVzID0gdmFsO1xuICAgIH1cbiAgICBnZXRUeXBlcygpIDogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fcXVlcnkudHlwZXM7IH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgZ3JvdXBzKHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSA6IEFnb2xRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0R3JvdXBzKHZhbHVlKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEdyb3Vwcyh2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICBsZXQgdmFsIDogc3RyaW5nO1xuICAgICAgICBpZih2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgICAgICAgIHZhbCA9ICh2YWx1ZSBhcyBBcnJheTxzdHJpbmc+KS5qb2luKCcsJyk7XG4gICAgICAgIGVsc2UgdmFsID0gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICB0aGlzLl9xdWVyeS5ncm91cHMgPSB2YWw7XG4gICAgfVxuICAgIGdldEdyb3VwcygpIDogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fcXVlcnkuZ3JvdXBzOyB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIG9yZ3ModmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIDogQWdvbFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRPcmdzKHZhbHVlKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldE9yZ3ModmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgbGV0IHZhbCA6IHN0cmluZztcbiAgICAgICAgaWYodmFsdWUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgICAgICB2YWwgPSAodmFsdWUgYXMgQXJyYXk8c3RyaW5nPikuam9pbignLCcpO1xuICAgICAgICBlbHNlIHZhbCA9IHZhbHVlIGFzIHN0cmluZztcbiAgICAgICAgdGhpcy5fcXVlcnkub3JncyA9IHZhbDtcbiAgICB9XG4gICAgZ2V0T3JncygpIDogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fcXVlcnkub3JnczsgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBleHRlbnQodmFsdWUgOiBhbnkpIDogQWdvbFF1ZXJ5IHsgdGhpcy5zZXRFeHRlbnQodmFsdWUpOyByZXR1cm4gdGhpczsgfVxuICAgIHNldEV4dGVudCh2YWx1ZSA6IGFueSkgeyB0aGlzLl9xdWVyeS5iYm94ID0gdmFsdWU7IH1cbiAgICBnZXRFeHRlbnQoKSA6IGFueSB7IHJldHVybiB0aGlzLl9xdWVyeS5iYm94OyB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzb3J0IC0gZm9ybSBvZiA8ZmllbGQ+LDxkaXI+IG9yIGp1c3QgZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSBvcmRlciAtIG9wdGlvbmFsLCBlaXRoZXIgJ2FzYycgb3IgJ2Rlc2MnXG4gICAgICovXG4gICAgc29ydCAoc29ydCA6IHN0cmluZywgb3JkZXIgOiBzdHJpbmcpIDogQWdvbFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTb3J0KHNvcnQsIG9yZGVyKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzb3J0IC0gZm9ybSBvZiA8ZmllbGQ+LDxkaXI+IG9yIGp1c3QgZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSBvcmRlciAtIG9wdGlvbmFsLCBlaXRoZXIgJ2FzYycgb3IgJ2Rlc2MnXG4gICAgICovXG4gICAgIHNldFNvcnQoc29ydCA6IHN0cmluZywgb3JkZXIgOiBzdHJpbmcpIHtcbiAgICAgICAgIG9yZGVyID0gb3JkZXIgfHwgJ2Rlc2MnO1xuICAgICAgICAgaWYoc29ydCAmJiBzb3J0LmluZGV4T2YoJywnKTwwKVxuICAgICAgICAgICAgc29ydCA9IHNvcnQgKyAnLCcgKyBvcmRlcjtcbiAgICAgICAgIHRoaXMuX3F1ZXJ5LnNvcnQgPSBzb3J0O1xuICAgIH1cbiAgICBnZXRTb3J0KCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fcXVlcnkuc29ydDsgfVxuICAgIGdldFNvcnRGaWVsZCgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3F1ZXJ5LnNvcnQuc3BsaXQoJywnKVswXTsgfVxuICAgIGdldFNvcnRPcmRlcigpIDogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9xdWVyeS5zb3J0LnNwbGl0KCcsJylbMV0gPT09ICdhc2MnOyB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYWdlIC0gcGFnZSBvZiByZXN1bHRzIHRvIGZldGNoXG4gICAgICovXG4gICAgcGFnZSAocGFnZSA6IG51bWJlcikgOiBBZ29sUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhZ2UocGFnZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFBhZ2UocGFnZSA6IG51bWJlcikge1xuICAgICAgICBpZihpc05hTihwYWdlKSB8fCBwYWdlKjE8MCkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9xdWVyeS5wYWdlID0gcGFnZSoxO1xuICAgIH1cblxuICAgIGdldFBhZ2UoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeS5wYWdlO1xuICAgIH1cblxuICAgIG5leHRQYWdlKCkge1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5fcXVlcnkucGFnZSsxKTtcbiAgICB9XG5cbiAgICBwcmV2aW91c1BhZ2UoKSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLl9xdWVyeS5wYWdlLTEpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNpemUgLSBwYWdlIHNpemUgdG8gcmVxdWVzdFxuICAgICAqL1xuICAgIHBhZ2VTaXplIChzaXplIDogbnVtYmVyKSA6IEFnb2xRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZVNpemUoc2l6ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFBhZ2VTaXplIChzaXplIDogbnVtYmVyKSB7XG4gICAgICAgIGlmKGlzTmFOKHNpemUpIHx8IHNpemUqMTwwKSByZXR1cm47XG4gICAgICAgIHRoaXMuX3F1ZXJ5LnNpemUgPSBzaXplKjE7XG4gICAgfVxuXG4gICAgZ2V0UGFnZVNpemUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeS5zaXplO1xuICAgIH1cblxufVxuXG5cbmNsYXNzIEFnb2xTZXJ2aWNlIGV4dGVuZHMgQmFzZVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgICAgIHRoaXMuc2V0VGltZW91dCgzMDAwMCk7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmwgOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIuc2V0VXJsKGJhc2VVcmwpO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvYWdvbCc7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBR09MIE9SR1MgTUVUSE9EU1xuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEFHT0wgb3JnYW5pemF0aW9uIHRvIGZldGNoXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGdldE9yZyAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnRoaXMuYmFzZVVybCArICcvb3Jncy8nICsgaWQsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5nZXRPcmcoKSAtIEVycm9yIGZldGNoaW5nIG9yZyAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBlaXRoZXIgSlMgb2JqZWN0IG9mIHF1ZXJ5IHBhcmFtZXRlcnMgb3IgUXVlcnkgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgc2VhcmNoT3JncyAoYXJnIDogQWdvbFF1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPFNlYXJjaFJlc3VsdHM+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggYXJnIClcbiAgICAgICAgLnRoZW4oIHBhcmFtcyA9PiB7XG5cbiAgICAgICAgICAgIGxldCBwcyA9IHBhcmFtcy5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmJhc2VVcmwgKyAnL29yZ3MnLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcHMsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5zZWFyY2hPcmdzKCkgLSBFcnJvciBzZWFyY2hpbmcgb3JnczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQUdPTCBHUk9VUFMgTUVUSE9EU1xuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEFHT0wgZ3JvdXAgdG8gZmV0Y2hcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEl0ZW0gb2JqZWN0IG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZ2V0R3JvdXAgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggaWQgKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp0aGlzLmJhc2VVcmwgKyAnL2dyb3Vwcy8nICsgaWQsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5nZXRHcm91cCgpIC0gRXJyb3IgZmV0Y2hpbmcgZ3JvdXAgJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBlaXRoZXIgSlMgb2JqZWN0IG9mIHF1ZXJ5IHBhcmFtZXRlcnMgb3IgQWdvbFF1ZXJ5IGluc3RhbmNlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHNlYXJjaEdyb3VwcyAoYXJnIDogQWdvbFF1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPFNlYXJjaFJlc3VsdHM+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggYXJnIClcbiAgICAgICAgLnRoZW4oIHBhcmFtcyA9PiB7XG5cbiAgICAgICAgICAgIGxldCBwcyA9IHBhcmFtcy5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmJhc2VVcmwgKyAnL2dyb3VwcycsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwcyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEFnb2xTZXJ2aWNlLnNlYXJjaEdyb3VwcygpIC0gRXJyb3Igc2VhcmNoaW5nIGdyb3VwczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQUdPTCBJVEVNUyBNRVRIT0RTXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEFHT0wgaXRlbSB0byBmZXRjaFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBnZXRJdGVtIChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIGlkIClcbiAgICAgICAgLnRoZW4oIChpZCA6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOnRoaXMuYmFzZVVybCArICcvaXRlbXMvJyArIGlkLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5nZXRJdGVtKCkgLSBFcnJvciBmZXRjaGluZyBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnIC0gZWl0aGVyIEpTIG9iamVjdCBvZiBxdWVyeSBwYXJhbWV0ZXJzIG9yIEFnb2xRdWVyeSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VhcmNoIHJlc3VsdHNcbiAgICAgKi9cbiAgICBzZWFyY2hJdGVtcyAoYXJnIDogQWdvbFF1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPFNlYXJjaFJlc3VsdHM+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggYXJnIClcbiAgICAgICAgLnRoZW4oIHBhcmFtcyA9PiB7XG5cbiAgICAgICAgICAgIGxldCBwcyA9IHBhcmFtcy5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmJhc2VVcmwgKyAnL2l0ZW1zJyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBzLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgQWdvbFNlcnZpY2Uuc2VhcmNoSXRlbXMoKSAtIEVycm9yIHNlYXJjaGluZyBpdGVtczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIGdldEFnb2xJZCAob2JqIDogYW55KSA6IHN0cmluZ3xudWxsIHtcbiAgICAgICAgaWYoIW9iaikgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYoIW9iai50eXBlKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZihJdGVtVHlwZXMuT1JHQU5JWkFUSU9OID09PSBvYmoudHlwZSB8fCAnR3JvdXAnID09PSBvYmoudHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIG9iai5pZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFvYmouaWRlbnRpZmllcnMgfHwgIW9iai5pZGVudGlmaWVycy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgaWRzID0gb2JqLmlkZW50aWZpZXJzLmZpbHRlciggKGlkOnN0cmluZykgPT4gfmlkLmluZGV4T2YoJ2Fnb2w6JykpO1xuICAgICAgICBpZighaWRzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBpZHNbMF0ucmVwbGFjZSgnYWdvbDonLCcnKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IHtcbiAgICBBZ29sU2VydmljZSBhcyBkZWZhdWx0LFxuICAgIEFnb2xTZXJ2aWNlLFxuICAgIEFnb2xRdWVyeVxufTtcbiJdfQ==