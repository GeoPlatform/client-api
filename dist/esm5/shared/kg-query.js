/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import QueryParameters from './parameters';
/**
 * @record
 * @template U
 */
function KVP() { }
/** @type {?} */
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
    function KGQuery() {
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
    }
    /**
     * @return {?}
     */
    KGQuery.prototype.getQuery = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = {};
        for (var prop in this.query) {
            /** @type {?} */
            var value = this.query[prop];
            if (value !== null && typeof (value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    };
    // -----------------------------------------------------------
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    KGQuery.prototype.parameter = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        this.setParameter(name, value);
        return this;
    };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    KGQuery.prototype.setParameter = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        if (value === null || value === undefined)
            delete this.query[name];
        else
            this.query[name] = value;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    KGQuery.prototype.getParameter = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.query[key];
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    KGQuery.prototype.applyParameters = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                this.setParameter(p, obj[p]);
            }
        }
    };
    // -----------------------------------------------------------
    /**
     * @param {?} text
     * @return {?}
     */
    KGQuery.prototype.q = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        this.setQ(text);
        return this;
    };
    /**
     * @param text - free text query
     */
    /**
     * @param {?} text - free text query
     * @return {?}
     */
    KGQuery.prototype.setQ = /**
     * @param {?} text - free text query
     * @return {?}
     */
    function (text) {
        this.setParameter(QueryParameters.QUERY, text);
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.getQ = /**
     * @return {?}
     */
    function () {
        return this.getParameter(QueryParameters.QUERY);
    };
    // -----------------------------------------------------------
    /**
     * @param types - KG classifiers for which concepts should be returned
     */
    /**
     * @param {?} types - KG classifiers for which concepts should be returned
     * @return {?}
     */
    KGQuery.prototype.classifiers = /**
     * @param {?} types - KG classifiers for which concepts should be returned
     * @return {?}
     */
    function (types) {
        this.setClassifiers(types);
        return this;
    };
    /**
     * @param types - KG classifiers for which concepts should be returned
     */
    /**
     * @param {?} types - KG classifiers for which concepts should be returned
     * @return {?}
     */
    KGQuery.prototype.setClassifiers = /**
     * @param {?} types - KG classifiers for which concepts should be returned
     * @return {?}
     */
    function (types) {
        if (!types)
            return;
        if (typeof (types) === 'string')
            types = types = [types];
        this.setParameter(QueryParameters.TYPES, types);
    };
    /**
     * @return KG classifiers for which concepts should be returned
     */
    /**
     * @return {?} KG classifiers for which concepts should be returned
     */
    KGQuery.prototype.getClassifiers = /**
     * @return {?} KG classifiers for which concepts should be returned
     */
    function () {
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
    /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.types()
     * query parameter (they map to different HTTP request parameters).
     * @param {?} objTypes - Item object type names
     * @return {?}
     */
    KGQuery.prototype.types = /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.types()
     * query parameter (they map to different HTTP request parameters).
     * @param {?} objTypes - Item object type names
     * @return {?}
     */
    function (objTypes) {
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
    /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.setTypes()
     * query parameter (they map to different HTTP request parameters).
     * @param {?} objTypes - Item object type names
     * @return {?}
     */
    KGQuery.prototype.setTypes = /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.setTypes()
     * query parameter (they map to different HTTP request parameters).
     * @param {?} objTypes - Item object type names
     * @return {?}
     */
    function (objTypes) {
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
    /**
     * Get the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.getTypes()
     * query parameter (they map to different HTTP request parameters).
     * @return {?} Item object type names
     */
    KGQuery.prototype.getTypes = /**
     * Get the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.getTypes()
     * query parameter (they map to different HTTP request parameters).
     * @return {?} Item object type names
     */
    function () {
        return this.getParameter(QueryParameters.FOR_TYPES);
    };
    // -----------------------------------------------------------
    /**
     * @param page - page of results to fetch
     */
    /**
     * @param {?} page - page of results to fetch
     * @return {?}
     */
    KGQuery.prototype.page = /**
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
    KGQuery.prototype.setPage = /**
     * @param {?} page
     * @return {?}
     */
    function (page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this.query["page"] = page * 1;
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.getPage = /**
     * @return {?}
     */
    function () {
        return this.query["page"];
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.nextPage = /**
     * @return {?}
     */
    function () {
        this.setPage(this.query["page"] + 1);
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.previousPage = /**
     * @return {?}
     */
    function () {
        this.setPage(this.query["page"] - 1);
    };
    // -----------------------------------------------------------
    /**
     * @param size - page size to request
     */
    /**
     * @param {?} size - page size to request
     * @return {?}
     */
    KGQuery.prototype.pageSize = /**
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
    KGQuery.prototype.setPageSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this.query["size"] = size * 1;
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.getPageSize = /**
     * @return {?}
     */
    function () {
        return this.query["size"];
    };
    // -----------------------------------------------------------
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?=} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    KGQuery.prototype.sort = /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?=} order - optional, either 'asc' or 'desc'
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
     * @param {?=} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    KGQuery.prototype.setSort = /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?=} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    function (sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this.query["sort"] = sort;
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.getSort = /**
     * @return {?}
     */
    function () {
        return this.query["sort"];
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.getSortField = /**
     * @return {?}
     */
    function () {
        return this.query["sort"].split(',')[0];
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.getSortOrder = /**
     * @return {?}
     */
    function () {
        return this.query["sort"].split(',')[1] === 'asc';
    };
    /**
     * @return list of key-value pairs of sort options
     */
    /**
     * @return {?} list of key-value pairs of sort options
     */
    KGQuery.prototype.getSortOptions = /**
     * @return {?} list of key-value pairs of sort options
     */
    function () {
        return SORT_OPTIONS_DEFAULT.slice(0);
    };
    // -----------------------------------------------------------
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    KGQuery.prototype.clear = /**
     *
     * @return {?}
     */
    function () {
        this.query = this.defaultQuery;
    };
    return KGQuery;
}());
if (false) {
    /** @type {?} */
    KGQuery.prototype.query;
    /** @type {?} */
    KGQuery.prototype.defaultQuery;
}
export default KGQuery;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2ctcXVlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL2tnLXF1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLGVBQWUsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7QUFLM0MsSUFBTSxvQkFBb0IsR0FBdUM7SUFDN0QsRUFBRSxLQUFLLEVBQUMsV0FBVyxFQUFRLEtBQUssRUFBRSxZQUFZLEVBQWU7SUFDN0QsRUFBRSxLQUFLLEVBQUMsWUFBWSxFQUFPLEtBQUssRUFBRSxZQUFZLEVBQWU7SUFDN0QsRUFBRSxLQUFLLEVBQUMsVUFBVSxFQUFTLEtBQUssRUFBRSxZQUFZLEVBQWU7SUFDN0QsRUFBRSxLQUFLLEVBQUMsV0FBVyxFQUFRLEtBQUssRUFBRSxZQUFZLEVBQWU7SUFDN0QsRUFBRSxLQUFLLEVBQUMsZUFBZSxFQUFJLEtBQUssRUFBRSx3QkFBd0IsRUFBRztJQUM3RCxFQUFFLEtBQUssRUFBQyxjQUFjLEVBQUssS0FBSyxFQUFFLHlCQUF5QixFQUFFO0lBQzdELEVBQUUsS0FBSyxFQUFDLGFBQWEsRUFBTSxLQUFLLEVBQUUsV0FBVyxFQUFnQjtDQUNoRSxDQUFDO0FBR0YsSUFBQTtJQUtJO1FBRUksSUFBSSxDQUFDLFlBQVksR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQztZQUNQLElBQUksRUFBRSxFQUFFO1lBQ1IsSUFBSSxFQUFFLGVBQWU7U0FDeEIsQ0FBQztRQUVGLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxJQUFJLEVBQUUsQ0FBQztZQUNQLElBQUksRUFBRSxFQUFFO1lBQ1IsSUFBSSxFQUFFLGVBQWU7U0FDeEIsQ0FBQztLQUVMOzs7O0lBR0QsMEJBQVE7OztJQUFSOztRQUNJLElBQUksTUFBTSxHQUFjLEVBQUUsQ0FBQztRQUMzQixLQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7O1lBQ3hCLElBQUksS0FBSyxHQUFH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Yzs7O0lBQWQ7UUFDSSxPQUFPLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QztJQUdELDhEQUE4RDtJQUc5RDs7T0FFRzs7Ozs7SUFDSCx1QkFBSzs7OztJQUFMO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQ2xDO2tCQTdRTDtJQThRQyxDQUFBOzs7Ozs7O0FBRUQsZUFBZSxPQUFPLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBRdWVyeVBhcmFtZXRlcnMgZnJvbSAnLi9wYXJhbWV0ZXJzJztcblxuaW50ZXJmYWNlIEtWUDxVPiB7IFsga2V5IDogc3RyaW5nIF0gOiBVIH1cblxuXG5jb25zdCBTT1JUX09QVElPTlNfREVGQVVMVCA6IHsgdmFsdWU6c3RyaW5nOyBsYWJlbDpzdHJpbmc7IH1bXSA9IFtcbiAgICB7IHZhbHVlOlwibGFiZWwsYXNjXCIsICAgICAgIGxhYmVsOiBcIk5hbWUgKEEtWilcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwibGFiZWwsZGVzY1wiLCAgICAgIGxhYmVsOiBcIk5hbWUgKFotQSlcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwidHlwZSxhc2NcIiwgICAgICAgIGxhYmVsOiBcIlR5cGUgKEEtWilcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwidHlwZSxkZXNjXCIsICAgICAgIGxhYmVsOiBcIlR5cGUgKFotQSlcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwibW9kaWZpZWQsZGVzY1wiLCAgIGxhYmVsOiBcIk1vc3QgcmVjZW50bHkgbW9kaWZpZWRcIiAgfSxcbiAgICB7IHZhbHVlOlwibW9kaWZpZWQsYXNjXCIsICAgIGxhYmVsOiBcIkxlYXN0IHJlY2VudGx5IG1vZGlmaWVkXCIgfSxcbiAgICB7IHZhbHVlOlwiX3Njb3JlLGRlc2NcIiwgICAgIGxhYmVsOiBcIlJlbGV2YW5jZVwiICAgICAgICAgICAgICAgfVxuXTtcblxuXG5jbGFzcyBLR1F1ZXJ5IHtcblxuICAgIHB1YmxpYyBxdWVyeSA6IEtWUDxhbnk+O1xuICAgIHByaXZhdGUgZGVmYXVsdFF1ZXJ5IDogS1ZQPGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeSA9IHtcbiAgICAgICAgICAgIHBhZ2U6IDAsXG4gICAgICAgICAgICBzaXplOiAxMCxcbiAgICAgICAgICAgIHNvcnQ6IFwibW9kaWZpZWQsZGVzY1wiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5xdWVyeSA9IHtcbiAgICAgICAgICAgIHBhZ2U6IDAsXG4gICAgICAgICAgICBzaXplOiAxMCxcbiAgICAgICAgICAgIHNvcnQ6IFwibW9kaWZpZWQsZGVzY1wiXG4gICAgICAgIH07XG5cbiAgICB9XG5cblxuICAgIGdldFF1ZXJ5KCkgOiBLVlA8YW55PiB7XG4gICAgICAgIGxldCByZXN1bHQgOiBLVlA8YW55PiA9IHt9O1xuICAgICAgICBmb3IobGV0IHByb3AgaW4gdGhpcy5xdWVyeSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5xdWVyeVtwcm9wXTtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZih2YWx1ZS5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4oJywnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBwYXJhbWV0ZXIobmFtZSA6IHN0cmluZywgdmFsdWU6IGFueSkgOiBLR1F1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIobmFtZSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYXJhbWV0ZXIgKG5hbWUgOiBzdHJpbmcsIHZhbHVlIDogYW55KSB7XG4gICAgICAgIGlmKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5xdWVyeVtuYW1lXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5xdWVyeVtuYW1lXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldFBhcmFtZXRlciAoa2V5IDogc3RyaW5nKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5W2tleV07XG4gICAgfVxuXG4gICAgYXBwbHlQYXJhbWV0ZXJzIChvYmogOiBLVlA8YW55PiApIHvCoFxuICAgICAgICBmb3IodmFyIHAgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZihvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwLCBvYmpbcF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBxKHRleHQgOiBzdHJpbmcpIDogS0dRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0USh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHRleHQgLSBmcmVlIHRleHQgcXVlcnlcbiAgICAgKi9cbiAgICBzZXRRICh0ZXh0IDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFF1ZXJ5UGFyYW1ldGVycy5RVUVSWSwgdGV4dCk7XG4gICAgfVxuXG4gICAgZ2V0USgpIDogc3RyaW5nfG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUXVlcnlQYXJhbWV0ZXJzLlFVRVJZKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0eXBlcyAtIEtHIGNsYXNzaWZpZXJzIGZvciB3aGljaCBjb25jZXB0cyBzaG91bGQgYmUgcmV0dXJuZWRcbiAgICAgKi9cbiAgICBjbGFzc2lmaWVycyh0eXBlcyA6IHN0cmluZ3xzdHJpbmdbXSkgOiBLR1F1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRDbGFzc2lmaWVycyh0eXBlcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0eXBlcyAtIEtHIGNsYXNzaWZpZXJzIGZvciB3aGljaCBjb25jZXB0cyBzaG91bGQgYmUgcmV0dXJuZWRcbiAgICAgKi9cbiAgICBzZXRDbGFzc2lmaWVycyAodHlwZXMgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgaWYoIXR5cGVzKSByZXR1cm47XG4gICAgICAgIGlmKHR5cGVvZih0eXBlcykgPT09ICdzdHJpbmcnKSB0eXBlcyA9IHR5cGVzID0gW3R5cGVzXTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUXVlcnlQYXJhbWV0ZXJzLlRZUEVTLCB0eXBlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBLRyBjbGFzc2lmaWVycyBmb3Igd2hpY2ggY29uY2VwdHMgc2hvdWxkIGJlIHJldHVybmVkXG4gICAgICovXG4gICAgZ2V0Q2xhc3NpZmllcnMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihRdWVyeVBhcmFtZXRlcnMuVFlQRVMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgSXRlbSBvYmplY3QgbW9kZWwgdHlwZSBuYW1lKHMpIGZvciB3aGljaFxuICAgICAqIHJlY29tbWVuZGVkIGNvbmNlcHRzIHNob3VsZCBiZSByZXR1cm5lZC4gTm90ZTogdGhpc1xuICAgICAqIHF1ZXJ5IHBhcmFtZXRlciBpcyBub3QgdGhlIHNhbWUgYXMgdGhlIEdlb1BsYXRmb3JtLlF1ZXJ5LnR5cGVzKClcbiAgICAgKiBxdWVyeSBwYXJhbWV0ZXIgKHRoZXkgbWFwIHRvIGRpZmZlcmVudCBIVFRQIHJlcXVlc3QgcGFyYW1ldGVycykuXG4gICAgICogQHBhcmFtIG9ialR5cGVzIC0gSXRlbSBvYmplY3QgdHlwZSBuYW1lc1xuICAgICAqL1xuICAgIHR5cGVzKG9ialR5cGVzIDogc3RyaW5nfHN0cmluZ1tdKSA6IEtHUXVlcnkge1xuICAgICAgICB0aGlzLnNldFR5cGVzKG9ialR5cGVzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgSXRlbSBvYmplY3QgbW9kZWwgdHlwZSBuYW1lKHMpIGZvciB3aGljaFxuICAgICAqIHJlY29tbWVuZGVkIGNvbmNlcHRzIHNob3VsZCBiZSByZXR1cm5lZC4gTm90ZTogdGhpc1xuICAgICAqIHF1ZXJ5IHBhcmFtZXRlciBpcyBub3QgdGhlIHNhbWUgYXMgdGhlIEdlb1BsYXRmb3JtLlF1ZXJ5LnNldFR5cGVzKClcbiAgICAgKiBxdWVyeSBwYXJhbWV0ZXIgKHRoZXkgbWFwIHRvIGRpZmZlcmVudCBIVFRQIHJlcXVlc3QgcGFyYW1ldGVycykuXG4gICAgICogQHBhcmFtIG9ialR5cGVzIC0gSXRlbSBvYmplY3QgdHlwZSBuYW1lc1xuICAgICAqL1xuICAgIHNldFR5cGVzIChvYmpUeXBlcyA6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICBpZighb2JqVHlwZXMpIHJldHVybjtcbiAgICAgICAgaWYodHlwZW9mKG9ialR5cGVzKSA9PT0gJ3N0cmluZycpIG9ialR5cGVzID0gW29ialR5cGVzXTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUXVlcnlQYXJhbWV0ZXJzLkZPUl9UWVBFUywgb2JqVHlwZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgSXRlbSBvYmplY3QgbW9kZWwgdHlwZSBuYW1lKHMpIGZvciB3aGljaFxuICAgICAqIHJlY29tbWVuZGVkIGNvbmNlcHRzIHNob3VsZCBiZSByZXR1cm5lZC4gTm90ZTogdGhpc1xuICAgICAqIHF1ZXJ5IHBhcmFtZXRlciBpcyBub3QgdGhlIHNhbWUgYXMgdGhlIEdlb1BsYXRmb3JtLlF1ZXJ5LmdldFR5cGVzKClcbiAgICAgKiBxdWVyeSBwYXJhbWV0ZXIgKHRoZXkgbWFwIHRvIGRpZmZlcmVudCBIVFRQIHJlcXVlc3QgcGFyYW1ldGVycykuXG4gICAgICogQHJldHVybiBJdGVtIG9iamVjdCB0eXBlIG5hbWVzXG4gICAgICovXG4gICAgZ2V0VHlwZXMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihRdWVyeVBhcmFtZXRlcnMuRk9SX1RZUEVTKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYWdlIC0gcGFnZSBvZiByZXN1bHRzIHRvIGZldGNoXG4gICAgICovXG4gICAgcGFnZSAocGFnZSA6IG51bWJlcikgOiBLR1F1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHBhZ2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYWdlKHBhZ2UgOiBudW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4ocGFnZSkgfHwgcGFnZSoxPDApIHJldHVybjtcbiAgICAgICAgdGhpcy5xdWVyeS5wYWdlID0gcGFnZSoxO1xuICAgIH1cblxuICAgIGdldFBhZ2UoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5LnBhZ2U7XG4gICAgfVxuXG4gICAgbmV4dFBhZ2UoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5xdWVyeS5wYWdlKzEpO1xuICAgIH1cblxuICAgIHByZXZpb3VzUGFnZSgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLnF1ZXJ5LnBhZ2UtMSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc2l6ZSAtIHBhZ2Ugc2l6ZSB0byByZXF1ZXN0XG4gICAgICovXG4gICAgcGFnZVNpemUgKHNpemU6IG51bWJlcikgOiBLR1F1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYWdlU2l6ZShzaXplKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0UGFnZVNpemUgKHNpemUgOiBudW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4oc2l6ZSkgfHwgc2l6ZSoxPDApIHJldHVybjtcbiAgICAgICAgdGhpcy5xdWVyeS5zaXplID0gc2l6ZSoxO1xuICAgIH1cblxuICAgIGdldFBhZ2VTaXplKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeS5zaXplO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNvcnQgLSBmb3JtIG9mIDxmaWVsZD4sPGRpcj4gb3IganVzdCBmaWVsZCBuYW1lXG4gICAgICogQHBhcmFtIG9yZGVyIC0gb3B0aW9uYWwsIGVpdGhlciAnYXNjJyBvciAnZGVzYydcbiAgICAgKi9cbiAgICBzb3J0IChzb3J0IDogc3RyaW5nLCBvcmRlciA/OiBzdHJpbmcpIDogS0dRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0U29ydChzb3J0LCBvcmRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzb3J0IC0gZm9ybSBvZiA8ZmllbGQ+LDxkaXI+IG9yIGp1c3QgZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSBvcmRlciAtIG9wdGlvbmFsLCBlaXRoZXIgJ2FzYycgb3IgJ2Rlc2MnXG4gICAgICovXG4gICAgIHNldFNvcnQoc29ydCA6IHN0cmluZywgb3JkZXIgPzpzdHJpbmcpIHtcbiAgICAgICAgIG9yZGVyID0gb3JkZXIgfHwgJ2Rlc2MnO1xuICAgICAgICAgaWYoc29ydCAmJiBzb3J0LmluZGV4T2YoJywnKTwwKVxuICAgICAgICAgICAgc29ydCA9IHNvcnQgKyAnLCcgKyBvcmRlcjtcbiAgICAgICAgIHRoaXMucXVlcnkuc29ydCA9IHNvcnQ7XG4gICAgfVxuXG4gICAgZ2V0U29ydCgpIDogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5LnNvcnQ7XG4gICAgfVxuXG4gICAgZ2V0U29ydEZpZWxkKCkgOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkuc29ydC5zcGxpdCgnLCcpWzBdO1xuICAgIH1cblxuICAgIGdldFNvcnRPcmRlcigpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5LnNvcnQuc3BsaXQoJywnKVsxXSA9PT0gJ2FzYyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBsaXN0IG9mIGtleS12YWx1ZSBwYWlycyBvZiBzb3J0IG9wdGlvbnNcbiAgICAgKi9cbiAgICBnZXRTb3J0T3B0aW9ucygpIDogeyB2YWx1ZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nOyB9W10ge1xuICAgICAgICByZXR1cm4gU09SVF9PUFRJT05TX0RFRkFVTFQuc2xpY2UoMCk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMuZGVmYXVsdFF1ZXJ5O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgS0dRdWVyeTtcbiJdfQ==