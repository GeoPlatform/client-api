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
            for (var p in options) {
                if (options.hasOwnProperty(p)) {
                    this._query[p] = options[p];
                }
            }
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
/**
 * AGOL Service
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9hZ29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUd4QyxPQUFPLFdBQVcsTUFBTSxRQUFRLENBQUM7QUFFakM7SUFJSSxtQkFBWSxPQUErQjtRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUUsRUFBRTtTQUNYLENBQUM7UUFFRixJQUFHLE9BQU8sRUFBRTtZQUNSLEtBQUksSUFBSSxDQUFDLElBQUksT0FBTyxFQUFFO2dCQUNsQixJQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBVyxDQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBUSxDQUFDO2lCQUNsRDthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsNEJBQVEsR0FBUjtRQUNJLElBQUksTUFBTSxHQUEwQixFQUFFLENBQUM7UUFDdkMsS0FBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsSUFBRyxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxFQUFFO2dCQUNyRCxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzQjtZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDeEI7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsMENBQTBDO0lBRTFDLHFCQUFDLEdBQUQsVUFBRSxLQUFjLElBQWdCLElBQUksQ0FBQyxJ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QUk7WUFBRSxPQUFPLElBQUksQ0FBQztRQUUxQixJQUFHLFNBQVMsQ0FBQyxZQUFZLEtBQUssR0FBRyxDQUFDLElBQUksSUFBSSxPQUFPLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRTtZQUM1RCxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUM7U0FDakI7UUFFRCxJQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQzVELElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFFLFVBQUMsRUFBUyxJQUFLLE9BQUEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFwQixDQUFvQixDQUFDLENBQUM7UUFDdkUsSUFBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDNUIsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBQyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUwsa0JBQUM7QUFBRCxDQUFDLEFBak1ELENBQTBCLFdBQVcsR0FpTXBDO0FBRUQsT0FBTyxFQUNILFdBQVcsSUFBSSxPQUFPLEVBQ3RCLFdBQVcsRUFDWCxTQUFTLEVBQ1osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSXRlbSwgU2VhcmNoUmVzdWx0cyB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMnO1xuaW1wb3J0IEl0ZW1UeXBlcyBmcm9tICcuLi9zaGFyZWQvdHlwZXMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuaW1wb3J0IEJhc2VTZXJ2aWNlIGZyb20gXCIuL2Jhc2VcIjtcblxuY2xhc3MgQWdvbFF1ZXJ5IHtcblxuICAgIHByaXZhdGUgX3F1ZXJ5IDogeyBba2V5OnN0cmluZ106YW55IH07XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IHsgW2tleTpzdHJpbmddOmFueSB9KSB7XG4gICAgICAgIHRoaXMuX3F1ZXJ5ID0ge1xuICAgICAgICAgICAgcGFnZTogMCxcbiAgICAgICAgICAgIHNpemU6IDEwXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYob3B0aW9ucykge1xuICAgICAgICAgICAgZm9yKGxldCBwIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZihvcHRpb25zLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXJ5WyBwIGFzIHN0cmluZyBdID0gb3B0aW9uc1twXSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UXVlcnkoKSA6IHsgW2tleTpzdHJpbmddOmFueSB9IHtcbiAgICAgICAgbGV0IHJlc3VsdCA6IHsgW2tleTpzdHJpbmddOmFueSB9ID0ge307XG4gICAgICAgIGZvcihsZXQgcHJvcCBpbiB0aGlzLl9xdWVyeSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5fcXVlcnlbcHJvcF07XG4gICAgICAgICAgICBpZih2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YodmFsdWUucHVzaCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5qb2luKCcsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgcSh2YWx1ZSA6IHN0cmluZykgOiBBZ29sUXVlcnkgeyB0aGlzLnNldFEodmFsdWUpOyByZXR1cm4gdGhpczsgfVxuICAgIHNldFEodmFsdWUgOiBzdHJpbmcpIHsgdGhpcy5fcXVlcnkucSA9IHZhbHVlOyB9XG4gICAgZ2V0USgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3F1ZXJ5LnE7IH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgdHlwZXModmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIDogQWdvbFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRUeXBlcyh2YWx1ZSk7IHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUeXBlcyh2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICBsZXQgdmFsIDogc3RyaW5nO1xuICAgICAgICBpZih2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgICAgICAgIHZhbCA9ICh2YWx1ZSBhcyBBcnJheTxzdHJpbmc+KS5qb2luKCcsJyk7XG4gICAgICAgIGVsc2UgdmFsID0gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICB0aGlzLl9xdWVyeS50eXBlcyA9IHZhbDtcbiAgICB9XG4gICAgZ2V0VHlwZXMoKSA6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuX3F1ZXJ5LnR5cGVzOyB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGdyb3Vwcyh2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkgOiBBZ29sUXVlcnkge1xuICAgICAgICB0aGlzLnNldEdyb3Vwcyh2YWx1ZSk7IHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRHcm91cHModmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgbGV0IHZhbCA6IHN0cmluZztcbiAgICAgICAgaWYodmFsdWUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgICAgICB2YWwgPSAodmFsdWUgYXMgQXJyYXk8c3RyaW5nPikuam9pbignLCcpO1xuICAgICAgICBlbHNlIHZhbCA9IHZhbHVlIGFzIHN0cmluZztcbiAgICAgICAgdGhpcy5fcXVlcnkuZ3JvdXBzID0gdmFsO1xuICAgIH1cbiAgICBnZXRHcm91cHMoKSA6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuX3F1ZXJ5Lmdyb3VwczsgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBvcmdzKHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSA6IEFnb2xRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0T3Jncyh2YWx1ZSk7IHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRPcmdzKHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIGxldCB2YWwgOiBzdHJpbmc7XG4gICAgICAgIGlmKHZhbHVlICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICAgICAgdmFsID0gKHZhbHVlIGFzIEFycmF5PHN0cmluZz4pLmpvaW4oJywnKTtcbiAgICAgICAgZWxzZSB2YWwgPSB2YWx1ZSBhcyBzdHJpbmc7XG4gICAgICAgIHRoaXMuX3F1ZXJ5Lm9yZ3MgPSB2YWw7XG4gICAgfVxuICAgIGdldE9yZ3MoKSA6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuX3F1ZXJ5Lm9yZ3M7IH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgZXh0ZW50KHZhbHVlIDogYW55KSA6IEFnb2xRdWVyeSB7IHRoaXMuc2V0RXh0ZW50KHZhbHVlKTsgcmV0dXJuIHRoaXM7IH1cbiAgICBzZXRFeHRlbnQodmFsdWUgOiBhbnkpIHsgdGhpcy5fcXVlcnkuYmJveCA9IHZhbHVlOyB9XG4gICAgZ2V0RXh0ZW50KCkgOiBhbnkgeyByZXR1cm4gdGhpcy5fcXVlcnkuYmJveDsgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc29ydCAtIGZvcm0gb2YgPGZpZWxkPiw8ZGlyPiBvciBqdXN0IGZpZWxkIG5hbWVcbiAgICAgKiBAcGFyYW0gb3JkZXIgLSBvcHRpb25hbCwgZWl0aGVyICdhc2MnIG9yICdkZXNjJ1xuICAgICAqL1xuICAgIHNvcnQgKHNvcnQgOiBzdHJpbmcsIG9yZGVyIDogc3RyaW5nKSA6IEFnb2xRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0U29ydChzb3J0LCBvcmRlcik7IHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc29ydCAtIGZvcm0gb2YgPGZpZWxkPiw8ZGlyPiBvciBqdXN0IGZpZWxkIG5hbWVcbiAgICAgKiBAcGFyYW0gb3JkZXIgLSBvcHRpb25hbCwgZWl0aGVyICdhc2MnIG9yICdkZXNjJ1xuICAgICAqL1xuICAgICBzZXRTb3J0KHNvcnQgOiBzdHJpbmcsIG9yZGVyIDogc3RyaW5nKSB7XG4gICAgICAgICBvcmRlciA9IG9yZGVyIHx8ICdkZXNjJztcbiAgICAgICAgIGlmKHNvcnQgJiYgc29ydC5pbmRleE9mKCcsJyk8MClcbiAgICAgICAgICAgIHNvcnQgPSBzb3J0ICsgJywnICsgb3JkZXI7XG4gICAgICAgICB0aGlzLl9xdWVyeS5zb3J0ID0gc29ydDtcbiAgICB9XG4gICAgZ2V0U29ydCgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3F1ZXJ5LnNvcnQ7IH1cbiAgICBnZXRTb3J0RmllbGQoKSA6IHN0cmluZyB7IHJldHVybiB0aGlzLl9xdWVyeS5zb3J0LnNwbGl0KCcsJylbMF07IH1cbiAgICBnZXRTb3J0T3JkZXIoKSA6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcXVlcnkuc29ydC5zcGxpdCgnLCcpWzFdID09PSAnYXNjJzsgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGFnZSAtIHBhZ2Ugb2YgcmVzdWx0cyB0byBmZXRjaFxuICAgICAqL1xuICAgIHBhZ2UgKHBhZ2UgOiBudW1iZXIpIDogQWdvbFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHBhZ2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYWdlKHBhZ2UgOiBudW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4ocGFnZSkgfHwgcGFnZSoxPDApIHJldHVybjtcbiAgICAgICAgdGhpcy5fcXVlcnkucGFnZSA9IHBhZ2UqMTtcbiAgICB9XG5cbiAgICBnZXRQYWdlKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlcnkucGFnZTtcbiAgICB9XG5cbiAgICBuZXh0UGFnZSgpIHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuX3F1ZXJ5LnBhZ2UrMSk7XG4gICAgfVxuXG4gICAgcHJldmlvdXNQYWdlKCkge1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5fcXVlcnkucGFnZS0xKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzaXplIC0gcGFnZSBzaXplIHRvIHJlcXVlc3RcbiAgICAgKi9cbiAgICBwYWdlU2l6ZSAoc2l6ZSA6IG51bWJlcikgOiBBZ29sUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhZ2VTaXplKHNpemUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYWdlU2l6ZSAoc2l6ZSA6IG51bWJlcikge1xuICAgICAgICBpZihpc05hTihzaXplKSB8fCBzaXplKjE8MCkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9xdWVyeS5zaXplID0gc2l6ZSoxO1xuICAgIH1cblxuICAgIGdldFBhZ2VTaXplKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlcnkuc2l6ZTtcbiAgICB9XG5cbn1cblxuXG5cblxuLyoqXG4gKiBBR09MIFNlcnZpY2VcbiAqL1xuY2xhc3MgQWdvbFNlcnZpY2UgZXh0ZW5kcyBCYXNlU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy5zZXRUaW1lb3V0KDMwMDAwKTtcbiAgICB9XG5cbiAgICBzZXRVcmwoYmFzZVVybCA6IHN0cmluZykge1xuICAgICAgICBzdXBlci5zZXRVcmwoYmFzZVVybCk7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmwgKyAnL2FwaS9hZ29sJztcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFHT0wgT1JHUyBNRVRIT0RTXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgQUdPTCBvcmdhbml6YXRpb24gdG8gZmV0Y2hcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEl0ZW0gb2JqZWN0IG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZ2V0T3JnIChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIGlkIClcbiAgICAgICAgLnRoZW4oIGlkID0+IHtcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5idWlsZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDpcIkdFVFwiLCB1cmw6dGhpcy5iYXNlVXJsICsgJy9vcmdzLycgKyBpZCwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEFnb2xTZXJ2aWNlLmdldE9yZygpIC0gRXJyb3IgZmV0Y2hpbmcgb3JnICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZyAtIGVpdGhlciBKUyBvYmplY3Qgb2YgcXVlcnkgcGFyYW1ldGVycyBvciBRdWVyeSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VhcmNoIHJlc3VsdHNcbiAgICAgKi9cbiAgICBzZWFyY2hPcmdzIChhcmcgOiBBZ29sUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8U2VhcmNoUmVzdWx0cz4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBhcmcgKVxuICAgICAgICAudGhlbiggcGFyYW1zID0+IHtcblxuICAgICAgICAgICAgbGV0IHBzID0gcGFyYW1zLmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYmFzZVVybCArICcvb3JncycsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwcyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEFnb2xTZXJ2aWNlLnNlYXJjaE9yZ3MoKSAtIEVycm9yIHNlYXJjaGluZyBvcmdzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBR09MIEdST1VQUyBNRVRIT0RTXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgQUdPTCBncm91cCB0byBmZXRjaFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBnZXRHcm91cCAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnRoaXMuYmFzZVVybCArICcvZ3JvdXBzLycgKyBpZCwgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEFnb2xTZXJ2aWNlLmdldEdyb3VwKCkgLSBFcnJvciBmZXRjaGluZyBncm91cCAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZyAtIGVpdGhlciBKUyBvYmplY3Qgb2YgcXVlcnkgcGFyYW1ldGVycyBvciBBZ29sUXVlcnkgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgc2VhcmNoR3JvdXBzIChhcmcgOiBBZ29sUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8U2VhcmNoUmVzdWx0cz4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBhcmcgKVxuICAgICAgICAudGhlbiggcGFyYW1zID0+IHtcblxuICAgICAgICAgICAgbGV0IHBzID0gcGFyYW1zLmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYmFzZVVybCArICcvZ3JvdXBzJyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBzLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgQWdvbFNlcnZpY2Uuc2VhcmNoR3JvdXBzKCkgLSBFcnJvciBzZWFyY2hpbmcgZ3JvdXBzOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBR09MIElURU1TIE1FVEhPRFNcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgQUdPTCBpdGVtIHRvIGZldGNoXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGdldEl0ZW0gKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggaWQgKVxuICAgICAgICAudGhlbiggKGlkIDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6dGhpcy5iYXNlVXJsICsgJy9pdGVtcy8nICsgaWQsXG4gICAgICAgICAgICAgICAgb3B0aW9uczpvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEFnb2xTZXJ2aWNlLmdldEl0ZW0oKSAtIEVycm9yIGZldGNoaW5nIGl0ZW0gJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBlaXRoZXIgSlMgb2JqZWN0IG9mIHF1ZXJ5IHBhcmFtZXRlcnMgb3IgQWdvbFF1ZXJ5IGluc3RhbmNlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHNlYXJjaEl0ZW1zIChhcmcgOiBBZ29sUXVlcnksIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8U2VhcmNoUmVzdWx0cz4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBhcmcgKVxuICAgICAgICAudGhlbiggcGFyYW1zID0+IHtcblxuICAgICAgICAgICAgbGV0IHBzID0gcGFyYW1zLmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYmFzZVVybCArICcvaXRlbXMnLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcHMsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5zZWFyY2hJdGVtcygpIC0gRXJyb3Igc2VhcmNoaW5nIGl0ZW1zOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgZ2V0QWdvbElkIChvYmogOiBhbnkpIDogc3RyaW5nfG51bGwge1xuICAgICAgICBpZighb2JqKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZighb2JqLnR5cGUpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmKEl0ZW1UeXBlcy5PUkdBTklaQVRJT04gPT09IG9iai50eXBlIHx8ICdHcm91cCcgPT09IG9iai50eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqLmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIW9iai5pZGVudGlmaWVycyB8fCAhb2JqLmlkZW50aWZpZXJzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGxldCBpZHMgPSBvYmouaWRlbnRpZmllcnMuZmlsdGVyKCAoaWQ6c3RyaW5nKSA9PiB+aWQuaW5kZXhPZignYWdvbDonKSk7XG4gICAgICAgIGlmKCFpZHMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIGlkc1swXS5yZXBsYWNlKCdhZ29sOicsJycpO1xuICAgIH1cblxufVxuXG5leHBvcnQge1xuICAgIEFnb2xTZXJ2aWNlIGFzIGRlZmF1bHQsXG4gICAgQWdvbFNlcnZpY2UsXG4gICAgQWdvbFF1ZXJ5XG59O1xuIl19