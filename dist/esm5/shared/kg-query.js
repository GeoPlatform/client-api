import QueryParameters from './parameters';
var SORT_OPTIONS_DEFAULT = [
    { value: "label,asc", label: "Name (A-Z)" },
    { value: "label,desc", label: "Name (Z-A)" },
    { value: "type,asc", label: "Type (A-Z)" },
    { value: "type,desc", label: "Type (Z-A)" },
    { value: "modified,desc", label: "Most recently modified" },
    { value: "modified,asc", label: "Least recently modified" },
    { value: "_score,desc", label: "Relevance" }
];
var KGQuery = /** @class */ (function () {
    function KGQuery(options) {
        this.defaultQuery = {
            page: 0,
            size: 10,
            sort: "modified,desc"
        };
        this.query = {
            page: 0,
            size: 10,
            sort: "modified,desc"
        };
        if (options) {
            this.applyParameters(options);
        }
    }
    KGQuery.prototype.getQuery = function () {
        var result = {};
        for (var prop in this.query) {
            var value = this.query[prop];
            if (value !== null && typeof (value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    };
    // -----------------------------------------------------------
    KGQuery.prototype.parameter = function (name, value) {
        this.setParameter(name, value);
        return this;
    };
    KGQuery.prototype.setParameter = function (name, value) {
        if (value === null || value === undefined)
            delete this.query[name];
        else
            this.query[name] = value;
    };
    KGQuery.prototype.getParameter = function (key) {
        return this.query[key];
    };
    KGQuery.prototype.applyParameters = function (obj) {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                this.setParameter(p, obj[p]);
            }
        }
    };
    // -----------------------------------------------------------
    KGQuery.prototype.q = function (text) {
        this.setQ(text);
        return this;
    };
    /**
     * @param text - free text query
     */
    KGQuery.prototype.setQ = function (text) {
        this.setParameter(QueryParameters.QUERY, text);
    };
    KGQuery.prototype.getQ = function () {
        return this.getParameter(QueryParameters.QUERY);
    };
    // -----------------------------------------------------------
    /**
     * @param types - KG classifiers for which concepts should be returned
     */
    KGQuery.prototype.classifiers = function (types) {
        this.setClassifiers(types);
        return this;
    };
    /**
     * @param types - KG classifiers for which concepts should be returned
     */
    KGQuery.prototype.setClassifiers = function (types) {
        if (!types)
            return;
        if (typeof (types) === 'string')
            types = types = [types];
        this.setParameter(QueryParameters.TYPES, types);
    };
    /**
     * @return KG classifiers for which concepts should be returned
     */
    KGQuery.prototype.getClassifiers = function () {
        return this.getParameter(QueryParameters.TYPES);
    };
    // -----------------------------------------------------------
    /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.types()
     * query parameter (they map to different HTTP request parameters).
     * @param objTypes - Item object type names
     */
    KGQuery.prototype.types = function (objTypes) {
        this.setTypes(objTypes);
        return this;
    };
    /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.setTypes()
     * query parameter (they map to different HTTP request parameters).
     * @param objTypes - Item object type names
     */
    KGQuery.prototype.setTypes = function (objTypes) {
        if (!objTypes)
            return;
        if (typeof (objTypes) === 'string')
            objTypes = [objTypes];
        this.setParameter(QueryParameters.FOR_TYPES, objTypes);
    };
    /**
     * Get the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.getTypes()
     * query parameter (they map to different HTTP request parameters).
     * @return Item object type names
     */
    KGQuery.prototype.getTypes = function () {
        return this.getParameter(QueryParameters.FOR_TYPES);
    };
    // -----------------------------------------------------------
    /**
     * @param page - page of results to fetch
     */
    KGQuery.prototype.page = function (page) {
        this.setPage(page);
        return this;
    };
    KGQuery.prototype.setPage = function (page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this.query.page = page * 1;
    };
    KGQuery.prototype.getPage = function () {
        return this.query.page;
    };
    KGQuery.prototype.nextPage = function () {
        this.setPage(this.query.page + 1);
    };
    KGQuery.prototype.previousPage = function () {
        this.setPage(this.query.page - 1);
    };
    // -----------------------------------------------------------
    /**
     * @param size - page size to request
     */
    KGQuery.prototype.pageSize = function (size) {
        this.setPageSize(size);
        return this;
    };
    KGQuery.prototype.setPageSize = function (size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this.query.size = size * 1;
    };
    KGQuery.prototype.getPageSize = function () {
        return this.query.size;
    };
    // -----------------------------------------------------------
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    KGQuery.prototype.sort = function (sort, order) {
        this.setSort(sort, order);
        return this;
    };
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    KGQuery.prototype.setSort = function (sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this.query.sort = sort;
    };
    KGQuery.prototype.getSort = function () {
        return this.query.sort;
    };
    KGQuery.prototype.getSortField = function () {
        return this.query.sort.split(',')[0];
    };
    KGQuery.prototype.getSortOrder = function () {
        return this.query.sort.split(',')[1] === 'asc';
    };
    /**
     * @return list of key-value pairs of sort options
     */
    KGQuery.prototype.getSortOptions = function () {
        return SORT_OPTIONS_DEFAULT.slice(0);
    };
    // -----------------------------------------------------------
    /**
     *
     */
    KGQuery.prototype.clear = function () {
        this.query = this.defaultQuery;
    };
    return KGQuery;
}());
export default KGQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2ctcXVlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL2tnLXF1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sZUFBZSxNQUFNLGNBQWMsQ0FBQztBQUszQyxJQUFNLG9CQUFvQixHQUF1QztJQUM3RCxFQUFFLEtBQUssRUFBQyxXQUFXLEVBQVEsS0FBSyxFQUFFLFlBQVksRUFBZTtJQUM3RCxFQUFFLEtBQUssRUFBQyxZQUFZLEVBQU8sS0FBSyxFQUFFLFlBQVksRUFBZTtJQUM3RCxFQUFFLEtBQUssRUFBQyxVQUFVLEVBQVMsS0FBSyxFQUFFLFlBQVksRUFBZTtJQUM3RCxFQUFFLEtBQUssRUFBQyxXQUFXLEVBQVEsS0FBSyxFQUFFLFlBQVksRUFBZTtJQUM3RCxFQUFFLEtBQUssRUFBQyxlQUFlLEVBQUksS0FBSyxFQUFFLHdCQUF3QixFQUFHO0lBQzdELEVBQUUsS0FBSyxFQUFDLGNBQWMsRUFBSyxLQUFLLEVBQUUseUJBQXlCLEVBQUU7SUFDN0QsRUFBRSxLQUFLLEVBQUMsYUFBYSxFQUFNLEtBQUssRUFBRSxXQUFXLEVBQWdCO0NBQ2hFLENBQUM7QUFHRjtJQUtJLGlCQUFhLE9BQW1CO1FBRTVCLElBQUksQ0FBQyxZQUFZLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxlQUFlO1NBQ3hCLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxlQUFlO1NBQ3hCLENBQUM7UUFFRixJQUFHLE9BQU8sRUFBRTtZQUNSLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBR0QsMEJBQVEsR0FBUjtRQUNJLElBQUksTUFBTSxHQUFjLEVBQUUsQ0FBQztRQUMz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LENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7T0FFRztJQUNILGdDQUFjLEdBQWQ7UUFDSSxPQUFPLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBR0QsOERBQThEO0lBRzlEOztPQUVHO0lBQ0gsdUJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUNuQyxDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQUFoUUQsSUFnUUM7QUFFRCxlQUFlLE9BQU8sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFF1ZXJ5UGFyYW1ldGVycyBmcm9tICcuL3BhcmFtZXRlcnMnO1xuXG5pbnRlcmZhY2UgS1ZQPFU+IHsgWyBrZXkgOiBzdHJpbmcgXSA6IFUgfVxuXG5cbmNvbnN0IFNPUlRfT1BUSU9OU19ERUZBVUxUIDogeyB2YWx1ZTpzdHJpbmc7IGxhYmVsOnN0cmluZzsgfVtdID0gW1xuICAgIHsgdmFsdWU6XCJsYWJlbCxhc2NcIiwgICAgICAgbGFiZWw6IFwiTmFtZSAoQS1aKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJsYWJlbCxkZXNjXCIsICAgICAgbGFiZWw6IFwiTmFtZSAoWi1BKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJ0eXBlLGFzY1wiLCAgICAgICAgbGFiZWw6IFwiVHlwZSAoQS1aKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJ0eXBlLGRlc2NcIiwgICAgICAgbGFiZWw6IFwiVHlwZSAoWi1BKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJtb2RpZmllZCxkZXNjXCIsICAgbGFiZWw6IFwiTW9zdCByZWNlbnRseSBtb2RpZmllZFwiICB9LFxuICAgIHsgdmFsdWU6XCJtb2RpZmllZCxhc2NcIiwgICAgbGFiZWw6IFwiTGVhc3QgcmVjZW50bHkgbW9kaWZpZWRcIiB9LFxuICAgIHsgdmFsdWU6XCJfc2NvcmUsZGVzY1wiLCAgICAgbGFiZWw6IFwiUmVsZXZhbmNlXCIgICAgICAgICAgICAgICB9XG5dO1xuXG5cbmNsYXNzIEtHUXVlcnkge1xuXG4gICAgcHVibGljIHF1ZXJ5IDogS1ZQPGFueT47XG4gICAgcHJpdmF0ZSBkZWZhdWx0UXVlcnkgOiBLVlA8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKCBvcHRpb25zID86IEtWUDxhbnk+ICkge1xuXG4gICAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5ID0ge1xuICAgICAgICAgICAgcGFnZTogMCxcbiAgICAgICAgICAgIHNpemU6IDEwLFxuICAgICAgICAgICAgc29ydDogXCJtb2RpZmllZCxkZXNjXCJcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnF1ZXJ5ID0ge1xuICAgICAgICAgICAgcGFnZTogMCxcbiAgICAgICAgICAgIHNpemU6IDEwLFxuICAgICAgICAgICAgc29ydDogXCJtb2RpZmllZCxkZXNjXCJcbiAgICAgICAgfTtcblxuICAgICAgICBpZihvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5UGFyYW1ldGVycyhvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZ2V0UXVlcnkoKSA6IEtWUDxhbnk+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA6IEtWUDxhbnk+ID0ge307XG4gICAgICAgIGZvcihsZXQgcHJvcCBpbiB0aGlzLnF1ZXJ5KSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnF1ZXJ5W3Byb3BdO1xuICAgICAgICAgICAgaWYodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mKHZhbHVlLnB1c2gpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuam9pbignLCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHBhcmFtZXRlcihuYW1lIDogc3RyaW5nLCB2YWx1ZTogYW55KSA6IEtHUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihuYW1lLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFBhcmFtZXRlciAobmFtZSA6IHN0cmluZywgdmFsdWUgOiBhbnkpIHtcbiAgICAgICAgaWYodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnF1ZXJ5W25hbWVdO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5W25hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0UGFyYW1ldGVyIChrZXkgOiBzdHJpbmcpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlba2V5XTtcbiAgICB9XG5cbiAgICBhcHBseVBhcmFtZXRlcnMgKG9iaiA6IEtWUDxhbnk+ICkge8KgXG4gICAgICAgIGZvcih2YXIgcCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHAsIG9ialtwXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHEodGV4dCA6IHN0cmluZykgOiBLR1F1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRRKHRleHQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdGV4dCAtIGZyZWUgdGV4dCBxdWVyeVxuICAgICAqL1xuICAgIHNldFEgKHRleHQgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUXVlcnlQYXJhbWV0ZXJzLlFVRVJZLCB0ZXh0KTtcbiAgICB9XG5cbiAgICBnZXRRKCkgOiBzdHJpbmd8bnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihRdWVyeVBhcmFtZXRlcnMuUVVFUlkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHR5cGVzIC0gS0cgY2xhc3NpZmllcnMgZm9yIHdoaWNoIGNvbmNlcHRzIHNob3VsZCBiZSByZXR1cm5lZFxuICAgICAqL1xuICAgIGNsYXNzaWZpZXJzKHR5cGVzIDogc3RyaW5nfHN0cmluZ1tdKSA6IEtHUXVlcnkge1xuICAgICAgICB0aGlzLnNldENsYXNzaWZpZXJzKHR5cGVzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHR5cGVzIC0gS0cgY2xhc3NpZmllcnMgZm9yIHdoaWNoIGNvbmNlcHRzIHNob3VsZCBiZSByZXR1cm5lZFxuICAgICAqL1xuICAgIHNldENsYXNzaWZpZXJzICh0eXBlcyA6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICBpZighdHlwZXMpIHJldHVybjtcbiAgICAgICAgaWYodHlwZW9mKHR5cGVzKSA9PT0gJ3N0cmluZycpIHR5cGVzID0gdHlwZXMgPSBbdHlwZXNdO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihRdWVyeVBhcmFtZXRlcnMuVFlQRVMsIHR5cGVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIEtHIGNsYXNzaWZpZXJzIGZvciB3aGljaCBjb25jZXB0cyBzaG91bGQgYmUgcmV0dXJuZWRcbiAgICAgKi9cbiAgICBnZXRDbGFzc2lmaWVycyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFF1ZXJ5UGFyYW1ldGVycy5UWVBFUyk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSBJdGVtIG9iamVjdCBtb2RlbCB0eXBlIG5hbWUocykgZm9yIHdoaWNoXG4gICAgICogcmVjb21tZW5kZWQgY29uY2VwdHMgc2hvdWxkIGJlIHJldHVybmVkLiBOb3RlOiB0aGlzXG4gICAgICogcXVlcnkgcGFyYW1ldGVyIGlzIG5vdCB0aGUgc2FtZSBhcyB0aGUgR2VvUGxhdGZvcm0uUXVlcnkudHlwZXMoKVxuICAgICAqIHF1ZXJ5IHBhcmFtZXRlciAodGhleSBtYXAgdG8gZGlmZmVyZW50IEhUVFAgcmVxdWVzdCBwYXJhbWV0ZXJzKS5cbiAgICAgKiBAcGFyYW0gb2JqVHlwZXMgLSBJdGVtIG9iamVjdCB0eXBlIG5hbWVzXG4gICAgICovXG4gICAgdHlwZXMob2JqVHlwZXMgOiBzdHJpbmd8c3RyaW5nW10pIDogS0dRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0VHlwZXMob2JqVHlwZXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSBJdGVtIG9iamVjdCBtb2RlbCB0eXBlIG5hbWUocykgZm9yIHdoaWNoXG4gICAgICogcmVjb21tZW5kZWQgY29uY2VwdHMgc2hvdWxkIGJlIHJldHVybmVkLiBOb3RlOiB0aGlzXG4gICAgICogcXVlcnkgcGFyYW1ldGVyIGlzIG5vdCB0aGUgc2FtZSBhcyB0aGUgR2VvUGxhdGZvcm0uUXVlcnkuc2V0VHlwZXMoKVxuICAgICAqIHF1ZXJ5IHBhcmFtZXRlciAodGhleSBtYXAgdG8gZGlmZmVyZW50IEhUVFAgcmVxdWVzdCBwYXJhbWV0ZXJzKS5cbiAgICAgKiBAcGFyYW0gb2JqVHlwZXMgLSBJdGVtIG9iamVjdCB0eXBlIG5hbWVzXG4gICAgICovXG4gICAgc2V0VHlwZXMgKG9ialR5cGVzIDogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIGlmKCFvYmpUeXBlcykgcmV0dXJuO1xuICAgICAgICBpZih0eXBlb2Yob2JqVHlwZXMpID09PSAnc3RyaW5nJykgb2JqVHlwZXMgPSBbb2JqVHlwZXNdO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihRdWVyeVBhcmFtZXRlcnMuRk9SX1RZUEVTLCBvYmpUeXBlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBJdGVtIG9iamVjdCBtb2RlbCB0eXBlIG5hbWUocykgZm9yIHdoaWNoXG4gICAgICogcmVjb21tZW5kZWQgY29uY2VwdHMgc2hvdWxkIGJlIHJldHVybmVkLiBOb3RlOiB0aGlzXG4gICAgICogcXVlcnkgcGFyYW1ldGVyIGlzIG5vdCB0aGUgc2FtZSBhcyB0aGUgR2VvUGxhdGZvcm0uUXVlcnkuZ2V0VHlwZXMoKVxuICAgICAqIHF1ZXJ5IHBhcmFtZXRlciAodGhleSBtYXAgdG8gZGlmZmVyZW50IEhUVFAgcmVxdWVzdCBwYXJhbWV0ZXJzKS5cbiAgICAgKiBAcmV0dXJuIEl0ZW0gb2JqZWN0IHR5cGUgbmFtZXNcbiAgICAgKi9cbiAgICBnZXRUeXBlcyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFF1ZXJ5UGFyYW1ldGVycy5GT1JfVFlQRVMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHBhZ2UgLSBwYWdlIG9mIHJlc3VsdHMgdG8gZmV0Y2hcbiAgICAgKi9cbiAgICBwYWdlIChwYWdlIDogbnVtYmVyKSA6IEtHUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhZ2UocGFnZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFBhZ2UocGFnZSA6IG51bWJlcikge1xuICAgICAgICBpZihpc05hTihwYWdlKSB8fCBwYWdlKjE8MCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnF1ZXJ5LnBhZ2UgPSBwYWdlKjE7XG4gICAgfVxuXG4gICAgZ2V0UGFnZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkucGFnZTtcbiAgICB9XG5cbiAgICBuZXh0UGFnZSgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLnF1ZXJ5LnBhZ2UrMSk7XG4gICAgfVxuXG4gICAgcHJldmlvdXNQYWdlKCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMucXVlcnkucGFnZS0xKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzaXplIC0gcGFnZSBzaXplIHRvIHJlcXVlc3RcbiAgICAgKi9cbiAgICBwYWdlU2l6ZSAoc2l6ZTogbnVtYmVyKSA6IEtHUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhZ2VTaXplKHNpemUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYWdlU2l6ZSAoc2l6ZSA6IG51bWJlcikge1xuICAgICAgICBpZihpc05hTihzaXplKSB8fCBzaXplKjE8MCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnF1ZXJ5LnNpemUgPSBzaXplKjE7XG4gICAgfVxuXG4gICAgZ2V0UGFnZVNpemUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5LnNpemU7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc29ydCAtIGZvcm0gb2YgPGZpZWxkPiw8ZGlyPiBvciBqdXN0IGZpZWxkIG5hbWVcbiAgICAgKiBAcGFyYW0gb3JkZXIgLSBvcHRpb25hbCwgZWl0aGVyICdhc2MnIG9yICdkZXNjJ1xuICAgICAqL1xuICAgIHNvcnQgKHNvcnQgOiBzdHJpbmcsIG9yZGVyID86IHN0cmluZykgOiBLR1F1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTb3J0KHNvcnQsIG9yZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNvcnQgLSBmb3JtIG9mIDxmaWVsZD4sPGRpcj4gb3IganVzdCBmaWVsZCBuYW1lXG4gICAgICogQHBhcmFtIG9yZGVyIC0gb3B0aW9uYWwsIGVpdGhlciAnYXNjJyBvciAnZGVzYydcbiAgICAgKi9cbiAgICAgc2V0U29ydChzb3J0IDogc3RyaW5nLCBvcmRlciA/OnN0cmluZykge1xuICAgICAgICAgb3JkZXIgPSBvcmRlciB8fCAnZGVzYyc7XG4gICAgICAgICBpZihzb3J0ICYmIHNvcnQuaW5kZXhPZignLCcpPDApXG4gICAgICAgICAgICBzb3J0ID0gc29ydCArICcsJyArIG9yZGVyO1xuICAgICAgICAgdGhpcy5xdWVyeS5zb3J0ID0gc29ydDtcbiAgICB9XG5cbiAgICBnZXRTb3J0KCkgOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkuc29ydDtcbiAgICB9XG5cbiAgICBnZXRTb3J0RmllbGQoKSA6IHN0cmluZyB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeS5zb3J0LnNwbGl0KCcsJylbMF07XG4gICAgfVxuXG4gICAgZ2V0U29ydE9yZGVyKCkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkuc29ydC5zcGxpdCgnLCcpWzFdID09PSAnYXNjJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIGxpc3Qgb2Yga2V5LXZhbHVlIHBhaXJzIG9mIHNvcnQgb3B0aW9uc1xuICAgICAqL1xuICAgIGdldFNvcnRPcHRpb25zKCkgOiB7IHZhbHVlOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmc7IH1bXSB7XG4gICAgICAgIHJldHVybiBTT1JUX09QVElPTlNfREVGQVVMVC5zbGljZSgwKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgY2xlYXIgKCkge1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5kZWZhdWx0UXVlcnk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBLR1F1ZXJ5O1xuIl19