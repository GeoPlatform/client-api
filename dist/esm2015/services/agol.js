import ItemTypes from '../shared/types';
import BaseService from "./base";
class AgolQuery {
    constructor() {
        this._query = {
            page: 0,
            size: 10
        };
    }
    getQuery() {
        let result = {};
        for (let prop in this._query) {
            let value = this._query[prop];
            if (value !== null && typeof (value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    }
    // ---------------------------------------
    q(value) { this.setQ(value); return this; }
    setQ(value) { this._query.q = value; }
    getQ() { return this._query.q; }
    // ---------------------------------------
    types(value) {
        this.setTypes(value);
        return this;
    }
    setTypes(value) {
        let val;
        if (value && Array.isArray(value))
            val = value.join(',');
        else
            val = value;
        this._query.types = val;
    }
    getTypes() { return this._query.types; }
    // ---------------------------------------
    groups(value) {
        this.setGroups(value);
        return this;
    }
    setGroups(value) {
        let val;
        if (value && Array.isArray(value))
            val = value.join(',');
        else
            val = value;
        this._query.groups = val;
    }
    getGroups() { return this._query.groups; }
    // ---------------------------------------
    orgs(value) {
        this.setOrgs(value);
        return this;
    }
    setOrgs(value) {
        let val;
        if (value && Array.isArray(value))
            val = value.join(',');
        else
            val = value;
        this._query.orgs = val;
    }
    getOrgs() { return this._query.orgs; }
    // ---------------------------------------
    extent(value) { this.setExtent(value); return this; }
    setExtent(value) { this._query.bbox = value; }
    getExtent() { return this._query.bbox; }
    // ---------------------------------------
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    sort(sort, order) {
        this.setSort(sort, order);
        return this;
    }
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    setSort(sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this._query.sort = sort;
    }
    getSort() { return this._query.sort; }
    getSortField() { return this._query.sort.split(',')[0]; }
    getSortOrder() { return this._query.sort.split(',')[1] === 'asc'; }
    // -----------------------------------------------------------
    /**
     * @param page - page of results to fetch
     */
    page(page) {
        this.setPage(page);
        return this;
    }
    setPage(page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this._query.page = page * 1;
    }
    getPage() {
        return this._query.page;
    }
    nextPage() {
        this.setPage(this._query.page + 1);
    }
    previousPage() {
        this.setPage(this._query.page - 1);
    }
    // -----------------------------------------------------------
    /**
     * @param size - page size to request
     */
    pageSize(size) {
        this.setPageSize(size);
        return this;
    }
    setPageSize(size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this._query.size = size * 1;
    }
    getPageSize() {
        return this._query.size;
    }
}
class AgolService extends BaseService {
    constructor(url, httpClient) {
        super(url, httpClient);
        this.setTimeout(30000);
    }
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/agol';
    }
    // -----------------------------------------------------------------------
    // AGOL ORGS METHODS
    /**
     * @param id - identifier of AGOL organization to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    getOrg(id, options) {
        return this.createAndResolvePromise(id)
            .then(id => {
            let opts = this.buildRequest({
                method: "GET", url: this.baseUrl + '/orgs/' + id, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`AgolService.getOrg() - Error fetching org ${id}: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param arg - either JS object of query parameters or Query instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    searchOrgs(arg, options) {
        return this.createAndResolvePromise(arg)
            .then(params => {
            let ps = params.getQuery();
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/orgs',
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`AgolService.searchOrgs() - Error searching orgs: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    // -----------------------------------------------------------------------
    // AGOL GROUPS METHODS
    /**
     * @param id - identifier of AGOL group to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    getGroup(id, options) {
        return this.createAndResolvePromise(id)
            .then(id => {
            let opts = this.buildRequest({
                method: "GET", url: this.baseUrl + '/groups/' + id, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`AgolService.getGroup() - Error fetching group ${id}: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param arg - either JS object of query parameters or AgolQuery instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    searchGroups(arg, options) {
        return this.createAndResolvePromise(arg)
            .then(params => {
            let ps = params.getQuery();
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/groups',
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`AgolService.searchGroups() - Error searching groups: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    // -----------------------------------------------------------------------
    // AGOL ITEMS METHODS
    /**
     * @param id - identifier of AGOL item to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    getItem(id, options) {
        return this.createAndResolvePromise(id)
            .then((id) => {
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/items/' + id,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`AgolService.getItem() - Error fetching item ${id}: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param arg - either JS object of query parameters or AgolQuery instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    searchItems(arg, options) {
        return this.createAndResolvePromise(arg)
            .then(params => {
            let ps = params.getQuery();
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/items',
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`AgolService.searchItems() - Error searching items: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /* --------------------------- */
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
        let ids = obj.identifiers.filter((id) => ~id.indexOf('agol:'));
        if (!ids.length)
            return null;
        return ids[0].replace('agol:', '');
    }
}
export { AgolService as default, AgolService, AgolQuery };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9hZ29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDO0FBR3hDLE9BQU8sV0FBVyxNQUFNLFFBQVEsQ0FBQztBQUVqQyxNQUFNLFNBQVM7SUFJWDtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDVixJQUFJLEVBQUUsQ0FBQztZQUNQLElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztJQUNOLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxNQUFNLEdBQTBCLEVBQUUsQ0FBQztRQUN2QyxLQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDekIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixJQUFHLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxXQUFXLEVBQUU7Z0JBQ3JELEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUN4QjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCwwQ0FBMEM7SUFFMUMsQ0FBQyxDQUFDLEtBQWMsSUFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRSxJQUFJLENBQUMsS0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDL0MsSUFBSSxLQUFjLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXpDLDBDQUEw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Q0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUVKO0FBRUQsT0FBTyxFQUNILFdBQVcsSUFBSSxPQUFPLEVBQ3RCLFdBQVcsRUFDWCxTQUFTLEVBQ1osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSXRlbSwgU2VhcmNoUmVzdWx0cyB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMnO1xuaW1wb3J0IEl0ZW1UeXBlcyBmcm9tICcuLi9zaGFyZWQvdHlwZXMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuaW1wb3J0IEJhc2VTZXJ2aWNlIGZyb20gXCIuL2Jhc2VcIjtcblxuY2xhc3MgQWdvbFF1ZXJ5IHtcblxuICAgIHByaXZhdGUgX3F1ZXJ5IDogeyBba2V5OnN0cmluZ106YW55IH07XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fcXVlcnkgPSB7XG4gICAgICAgICAgICBwYWdlOiAwLFxuICAgICAgICAgICAgc2l6ZTogMTBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRRdWVyeSgpIDogeyBba2V5OnN0cmluZ106YW55IH0ge1xuICAgICAgICBsZXQgcmVzdWx0IDogeyBba2V5OnN0cmluZ106YW55IH0gPSB7fTtcbiAgICAgICAgZm9yKGxldCBwcm9wIGluIHRoaXMuX3F1ZXJ5KSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9xdWVyeVtwcm9wXTtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZih2YWx1ZS5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4oJywnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBxKHZhbHVlIDogc3RyaW5nKSA6IEFnb2xRdWVyeSB7IHRoaXMuc2V0USh2YWx1ZSk7IHJldHVybiB0aGlzOyB9XG4gICAgc2V0USh2YWx1ZSA6IHN0cmluZykgeyB0aGlzLl9xdWVyeS5xID0gdmFsdWU7IH1cbiAgICBnZXRRKCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fcXVlcnkucTsgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICB0eXBlcyh2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkgOiBBZ29sUXVlcnkge1xuICAgICAgICB0aGlzLnNldFR5cGVzKHZhbHVlKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFR5cGVzKHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIGxldCB2YWwgOiBzdHJpbmc7XG4gICAgICAgIGlmKHZhbHVlICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICAgICAgdmFsID0gKHZhbHVlIGFzIEFycmF5PHN0cmluZz4pLmpvaW4oJywnKTtcbiAgICAgICAgZWxzZSB2YWwgPSB2YWx1ZSBhcyBzdHJpbmc7XG4gICAgICAgIHRoaXMuX3F1ZXJ5LnR5cGVzID0gdmFsO1xuICAgIH1cbiAgICBnZXRUeXBlcygpIDogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fcXVlcnkudHlwZXM7IH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgZ3JvdXBzKHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSA6IEFnb2xRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0R3JvdXBzKHZhbHVlKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEdyb3Vwcyh2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICBsZXQgdmFsIDogc3RyaW5nO1xuICAgICAgICBpZih2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgICAgICAgIHZhbCA9ICh2YWx1ZSBhcyBBcnJheTxzdHJpbmc+KS5qb2luKCcsJyk7XG4gICAgICAgIGVsc2UgdmFsID0gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICB0aGlzLl9xdWVyeS5ncm91cHMgPSB2YWw7XG4gICAgfVxuICAgIGdldEdyb3VwcygpIDogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fcXVlcnkuZ3JvdXBzOyB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIG9yZ3ModmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIDogQWdvbFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRPcmdzKHZhbHVlKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldE9yZ3ModmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgbGV0IHZhbCA6IHN0cmluZztcbiAgICAgICAgaWYodmFsdWUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgICAgICB2YWwgPSAodmFsdWUgYXMgQXJyYXk8c3RyaW5nPikuam9pbignLCcpO1xuICAgICAgICBlbHNlIHZhbCA9IHZhbHVlIGFzIHN0cmluZztcbiAgICAgICAgdGhpcy5fcXVlcnkub3JncyA9IHZhbDtcbiAgICB9XG4gICAgZ2V0T3JncygpIDogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fcXVlcnkub3JnczsgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBleHRlbnQodmFsdWUgOiBhbnkpIDogQWdvbFF1ZXJ5IHsgdGhpcy5zZXRFeHRlbnQodmFsdWUpOyByZXR1cm4gdGhpczsgfVxuICAgIHNldEV4dGVudCh2YWx1ZSA6IGFueSkgeyB0aGlzLl9xdWVyeS5iYm94ID0gdmFsdWU7IH1cbiAgICBnZXRFeHRlbnQoKSA6IGFueSB7IHJldHVybiB0aGlzLl9xdWVyeS5iYm94OyB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzb3J0IC0gZm9ybSBvZiA8ZmllbGQ+LDxkaXI+IG9yIGp1c3QgZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSBvcmRlciAtIG9wdGlvbmFsLCBlaXRoZXIgJ2FzYycgb3IgJ2Rlc2MnXG4gICAgICovXG4gICAgc29ydCAoc29ydCA6IHN0cmluZywgb3JkZXIgOiBzdHJpbmcpIDogQWdvbFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTb3J0KHNvcnQsIG9yZGVyKTsgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzb3J0IC0gZm9ybSBvZiA8ZmllbGQ+LDxkaXI+IG9yIGp1c3QgZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSBvcmRlciAtIG9wdGlvbmFsLCBlaXRoZXIgJ2FzYycgb3IgJ2Rlc2MnXG4gICAgICovXG4gICAgIHNldFNvcnQoc29ydCA6IHN0cmluZywgb3JkZXIgOiBzdHJpbmcpIHtcbiAgICAgICAgIG9yZGVyID0gb3JkZXIgfHwgJ2Rlc2MnO1xuICAgICAgICAgaWYoc29ydCAmJiBzb3J0LmluZGV4T2YoJywnKTwwKVxuICAgICAgICAgICAgc29ydCA9IHNvcnQgKyAnLCcgKyBvcmRlcjtcbiAgICAgICAgIHRoaXMuX3F1ZXJ5LnNvcnQgPSBzb3J0O1xuICAgIH1cbiAgICBnZXRTb3J0KCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fcXVlcnkuc29ydDsgfVxuICAgIGdldFNvcnRGaWVsZCgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3F1ZXJ5LnNvcnQuc3BsaXQoJywnKVswXTsgfVxuICAgIGdldFNvcnRPcmRlcigpIDogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9xdWVyeS5zb3J0LnNwbGl0KCcsJylbMV0gPT09ICdhc2MnOyB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYWdlIC0gcGFnZSBvZiByZXN1bHRzIHRvIGZldGNoXG4gICAgICovXG4gICAgcGFnZSAocGFnZSA6IG51bWJlcikgOiBBZ29sUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhZ2UocGFnZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFBhZ2UocGFnZSA6IG51bWJlcikge1xuICAgICAgICBpZihpc05hTihwYWdlKSB8fCBwYWdlKjE8MCkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9xdWVyeS5wYWdlID0gcGFnZSoxO1xuICAgIH1cblxuICAgIGdldFBhZ2UoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeS5wYWdlO1xuICAgIH1cblxuICAgIG5leHRQYWdlKCkge1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5fcXVlcnkucGFnZSsxKTtcbiAgICB9XG5cbiAgICBwcmV2aW91c1BhZ2UoKSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLl9xdWVyeS5wYWdlLTEpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNpemUgLSBwYWdlIHNpemUgdG8gcmVxdWVzdFxuICAgICAqL1xuICAgIHBhZ2VTaXplIChzaXplIDogbnVtYmVyKSA6IEFnb2xRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZVNpemUoc2l6ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFBhZ2VTaXplIChzaXplIDogbnVtYmVyKSB7XG4gICAgICAgIGlmKGlzTmFOKHNpemUpIHx8IHNpemUqMTwwKSByZXR1cm47XG4gICAgICAgIHRoaXMuX3F1ZXJ5LnNpemUgPSBzaXplKjE7XG4gICAgfVxuXG4gICAgZ2V0UGFnZVNpemUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeS5zaXplO1xuICAgIH1cblxufVxuXG5cbmNsYXNzIEFnb2xTZXJ2aWNlIGV4dGVuZHMgQmFzZVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgICAgIHRoaXMuc2V0VGltZW91dCgzMDAwMCk7XG4gICAgfVxuXG4gICAgc2V0VXJsKGJhc2VVcmwgOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIuc2V0VXJsKGJhc2VVcmwpO1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsICsgJy9hcGkvYWdvbCc7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBR09MIE9SR1MgTUVUSE9EU1xuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEFHT0wgb3JnYW5pemF0aW9uIHRvIGZldGNoXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBJdGVtIG9iamVjdCBvciBhbiBlcnJvclxuICAgICAqL1xuICAgIGdldE9yZyAoaWQgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSA6IFByb21pc2U8SXRlbT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCBpZCApXG4gICAgICAgIC50aGVuKCBpZCA9PiB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuYnVpbGRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJHRVRcIiwgdXJsOnRoaXMuYmFzZVVybCArICcvb3Jncy8nICsgaWQsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5nZXRPcmcoKSAtIEVycm9yIGZldGNoaW5nIG9yZyAke2lkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBlaXRoZXIgSlMgb2JqZWN0IG9mIHF1ZXJ5IHBhcmFtZXRlcnMgb3IgUXVlcnkgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgc2VhcmNoT3JncyAoYXJnIDogQWdvbFF1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPFNlYXJjaFJlc3VsdHM+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggYXJnIClcbiAgICAgICAgLnRoZW4oIHBhcmFtcyA9PiB7XG5cbiAgICAgICAgICAgIGxldCBwcyA9IHBhcmFtcy5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmJhc2VVcmwgKyAnL29yZ3MnLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcHMsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5zZWFyY2hPcmdzKCkgLSBFcnJvciBzZWFyY2hpbmcgb3JnczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQUdPTCBHUk9VUFMgTUVUSE9EU1xuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEFHT0wgZ3JvdXAgdG8gZmV0Y2hcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHNldCBvZiByZXF1ZXN0IG9wdGlvbnMgdG8gYXBwbHkgdG8geGhyIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIEl0ZW0gb2JqZWN0IG9yIGFuIGVycm9yXG4gICAgICovXG4gICAgZ2V0R3JvdXAgKGlkIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPEl0ZW0+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggaWQgKVxuICAgICAgICAudGhlbiggaWQgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsIHVybDp0aGlzLmJhc2VVcmwgKyAnL2dyb3Vwcy8nICsgaWQsIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5nZXRHcm91cCgpIC0gRXJyb3IgZmV0Y2hpbmcgZ3JvdXAgJHtpZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlcnIsIGUpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBlaXRoZXIgSlMgb2JqZWN0IG9mIHF1ZXJ5IHBhcmFtZXRlcnMgb3IgQWdvbFF1ZXJ5IGluc3RhbmNlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBzZXQgb2YgcmVxdWVzdCBvcHRpb25zIHRvIGFwcGx5IHRvIHhociByZXF1ZXN0XG4gICAgICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzZWFyY2ggcmVzdWx0c1xuICAgICAqL1xuICAgIHNlYXJjaEdyb3VwcyAoYXJnIDogQWdvbFF1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPFNlYXJjaFJlc3VsdHM+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggYXJnIClcbiAgICAgICAgLnRoZW4oIHBhcmFtcyA9PiB7XG5cbiAgICAgICAgICAgIGxldCBwcyA9IHBhcmFtcy5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmJhc2VVcmwgKyAnL2dyb3VwcycsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwcyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUob3B0cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYEFnb2xTZXJ2aWNlLnNlYXJjaEdyb3VwcygpIC0gRXJyb3Igc2VhcmNoaW5nIGdyb3VwczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQUdPTCBJVEVNUyBNRVRIT0RTXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIEFHT0wgaXRlbSB0byBmZXRjaFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgSXRlbSBvYmplY3Qgb3IgYW4gZXJyb3JcbiAgICAgKi9cbiAgICBnZXRJdGVtIChpZCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIDogUHJvbWlzZTxJdGVtPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIGlkIClcbiAgICAgICAgLnRoZW4oIChpZCA6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOnRoaXMuYmFzZVVybCArICcvaXRlbXMvJyArIGlkLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6b3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBBZ29sU2VydmljZS5nZXRJdGVtKCkgLSBFcnJvciBmZXRjaGluZyBpdGVtICR7aWR9OiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXJyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnIC0gZWl0aGVyIEpTIG9iamVjdCBvZiBxdWVyeSBwYXJhbWV0ZXJzIG9yIEFnb2xRdWVyeSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgc2V0IG9mIHJlcXVlc3Qgb3B0aW9ucyB0byBhcHBseSB0byB4aHIgcmVxdWVzdFxuICAgICAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc2VhcmNoIHJlc3VsdHNcbiAgICAgKi9cbiAgICBzZWFyY2hJdGVtcyAoYXJnIDogQWdvbFF1ZXJ5LCBvcHRpb25zID86IGFueSkgOiBQcm9taXNlPFNlYXJjaFJlc3VsdHM+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggYXJnIClcbiAgICAgICAgLnRoZW4oIHBhcmFtcyA9PiB7XG5cbiAgICAgICAgICAgIGxldCBwcyA9IHBhcmFtcy5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmJ1aWxkUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmJhc2VVcmwgKyAnL2l0ZW1zJyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBzLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShvcHRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihgQWdvbFNlcnZpY2Uuc2VhcmNoSXRlbXMoKSAtIEVycm9yIHNlYXJjaGluZyBpdGVtczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVyciwgZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIGdldEFnb2xJZCAob2JqIDogYW55KSA6IHN0cmluZ3xudWxsIHtcbiAgICAgICAgaWYoIW9iaikgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYoIW9iai50eXBlKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZihJdGVtVHlwZXMuT1JHQU5JWkFUSU9OID09PSBvYmoudHlwZSB8fCAnR3JvdXAnID09PSBvYmoudHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIG9iai5pZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFvYmouaWRlbnRpZmllcnMgfHwgIW9iai5pZGVudGlmaWVycy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgaWRzID0gb2JqLmlkZW50aWZpZXJzLmZpbHRlciggKGlkOnN0cmluZykgPT4gfmlkLmluZGV4T2YoJ2Fnb2w6JykpO1xuICAgICAgICBpZighaWRzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBpZHNbMF0ucmVwbGFjZSgnYWdvbDonLCcnKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IHtcbiAgICBBZ29sU2VydmljZSBhcyBkZWZhdWx0LFxuICAgIEFnb2xTZXJ2aWNlLFxuICAgIEFnb2xRdWVyeVxufTtcbiJdfQ==