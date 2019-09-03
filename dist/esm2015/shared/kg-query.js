import QueryParameters from './parameters';
const SORT_OPTIONS_DEFAULT = [
    { value: "label,asc", label: "Name (A-Z)" },
    { value: "label,desc", label: "Name (Z-A)" },
    { value: "type,asc", label: "Type (A-Z)" },
    { value: "type,desc", label: "Type (Z-A)" },
    { value: "modified,desc", label: "Most recently modified" },
    { value: "modified,asc", label: "Least recently modified" },
    { value: "_score,desc", label: "Relevance" }
];
class KGQuery {
    constructor(options) {
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
    getQuery() {
        let result = {};
        for (let prop in this.query) {
            let value = this.query[prop];
            if (value !== null && typeof (value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    }
    // -----------------------------------------------------------
    parameter(name, value) {
        this.setParameter(name, value);
        return this;
    }
    setParameter(name, value) {
        if (value === null || value === undefined)
            delete this.query[name];
        else
            this.query[name] = value;
    }
    getParameter(key) {
        return this.query[key];
    }
    applyParameters(obj) {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                this.setParameter(p, obj[p]);
            }
        }
    }
    // -----------------------------------------------------------
    q(text) {
        this.setQ(text);
        return this;
    }
    /**
     * @param text - free text query
     */
    setQ(text) {
        this.setParameter(QueryParameters.QUERY, text);
    }
    getQ() {
        return this.getParameter(QueryParameters.QUERY);
    }
    // -----------------------------------------------------------
    /**
     * @param types - KG classifiers for which concepts should be returned
     */
    classifiers(types) {
        this.setClassifiers(types);
        return this;
    }
    /**
     * @param types - KG classifiers for which concepts should be returned
     */
    setClassifiers(types) {
        if (!types)
            return;
        if (typeof (types) === 'string')
            types = types = [types];
        this.setParameter(QueryParameters.TYPES, types);
    }
    /**
     * @return KG classifiers for which concepts should be returned
     */
    getClassifiers() {
        return this.getParameter(QueryParameters.TYPES);
    }
    // -----------------------------------------------------------
    /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.types()
     * query parameter (they map to different HTTP request parameters).
     * @param objTypes - Item object type names
     */
    types(objTypes) {
        this.setTypes(objTypes);
        return this;
    }
    /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.setTypes()
     * query parameter (they map to different HTTP request parameters).
     * @param objTypes - Item object type names
     */
    setTypes(objTypes) {
        if (!objTypes)
            return;
        if (typeof (objTypes) === 'string')
            objTypes = [objTypes];
        this.setParameter(QueryParameters.FOR_TYPES, objTypes);
    }
    /**
     * Get the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.getTypes()
     * query parameter (they map to different HTTP request parameters).
     * @return Item object type names
     */
    getTypes() {
        return this.getParameter(QueryParameters.FOR_TYPES);
    }
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
        this.query.page = page * 1;
    }
    getPage() {
        return this.query.page;
    }
    nextPage() {
        this.setPage(this.query.page + 1);
    }
    previousPage() {
        this.setPage(this.query.page - 1);
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
        this.query.size = size * 1;
    }
    getPageSize() {
        return this.query.size;
    }
    // -----------------------------------------------------------
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
        this.query.sort = sort;
    }
    getSort() {
        return this.query.sort;
    }
    getSortField() {
        return this.query.sort.split(',')[0];
    }
    getSortOrder() {
        return this.query.sort.split(',')[1] === 'asc';
    }
    /**
     * @return list of key-value pairs of sort options
     */
    getSortOptions() {
        return SORT_OPTIONS_DEFAULT.slice(0);
    }
    // -----------------------------------------------------------
    /**
     *
     */
    clear() {
        this.query = this.defaultQuery;
    }
}
export default KGQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2ctcXVlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL2tnLXF1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sZUFBZSxNQUFNLGNBQWMsQ0FBQztBQUszQyxNQUFNLG9CQUFvQixHQUF1QztJQUM3RCxFQUFFLEtBQUssRUFBQyxXQUFXLEVBQVEsS0FBSyxFQUFFLFlBQVksRUFBZTtJQUM3RCxFQUFFLEtBQUssRUFBQyxZQUFZLEVBQU8sS0FBSyxFQUFFLFlBQVksRUFBZTtJQUM3RCxFQUFFLEtBQUssRUFBQyxVQUFVLEVBQVMsS0FBSyxFQUFFLFlBQVksRUFBZTtJQUM3RCxFQUFFLEtBQUssRUFBQyxXQUFXLEVBQVEsS0FBSyxFQUFFLFlBQVksRUFBZTtJQUM3RCxFQUFFLEtBQUssRUFBQyxlQUFlLEVBQUksS0FBSyxFQUFFLHdCQUF3QixFQUFHO0lBQzdELEVBQUUsS0FBSyxFQUFDLGNBQWMsRUFBSyxLQUFLLEVBQUUseUJBQXlCLEVBQUU7SUFDN0QsRUFBRSxLQUFLLEVBQUMsYUFBYSxFQUFNLEtBQUssRUFBRSxXQUFXLEVBQWdCO0NBQ2hFLENBQUM7QUFHRixNQUFNLE9BQU87SUFLVCxZQUFhLE9BQW1CO1FBRTVCLElBQUksQ0FBQyxZQUFZLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxlQUFlO1NBQ3hCLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxlQUFlO1NBQ3hCLENBQUM7UUFFRixJQUFHLE9BQU8sRUFBRTtZQUNSLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBR0QsUUFBUTtRQUNKLElBQUksTUFBTSxHQUFjLEVBQUUsQ0FBQztR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SUFDekMsQ0FBQztJQUdELDhEQUE4RDtJQUc5RDs7T0FFRztJQUNILEtBQUs7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDbkMsQ0FBQztDQUNKO0FBRUQsZUFBZSxPQUFPLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBRdWVyeVBhcmFtZXRlcnMgZnJvbSAnLi9wYXJhbWV0ZXJzJztcblxuaW50ZXJmYWNlIEtWUDxVPiB7IFsga2V5IDogc3RyaW5nIF0gOiBVIH1cblxuXG5jb25zdCBTT1JUX09QVElPTlNfREVGQVVMVCA6IHsgdmFsdWU6c3RyaW5nOyBsYWJlbDpzdHJpbmc7IH1bXSA9IFtcbiAgICB7IHZhbHVlOlwibGFiZWwsYXNjXCIsICAgICAgIGxhYmVsOiBcIk5hbWUgKEEtWilcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwibGFiZWwsZGVzY1wiLCAgICAgIGxhYmVsOiBcIk5hbWUgKFotQSlcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwidHlwZSxhc2NcIiwgICAgICAgIGxhYmVsOiBcIlR5cGUgKEEtWilcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwidHlwZSxkZXNjXCIsICAgICAgIGxhYmVsOiBcIlR5cGUgKFotQSlcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwibW9kaWZpZWQsZGVzY1wiLCAgIGxhYmVsOiBcIk1vc3QgcmVjZW50bHkgbW9kaWZpZWRcIiAgfSxcbiAgICB7IHZhbHVlOlwibW9kaWZpZWQsYXNjXCIsICAgIGxhYmVsOiBcIkxlYXN0IHJlY2VudGx5IG1vZGlmaWVkXCIgfSxcbiAgICB7IHZhbHVlOlwiX3Njb3JlLGRlc2NcIiwgICAgIGxhYmVsOiBcIlJlbGV2YW5jZVwiICAgICAgICAgICAgICAgfVxuXTtcblxuXG5jbGFzcyBLR1F1ZXJ5IHtcblxuICAgIHB1YmxpYyBxdWVyeSA6IEtWUDxhbnk+O1xuICAgIHByaXZhdGUgZGVmYXVsdFF1ZXJ5IDogS1ZQPGFueT47XG5cbiAgICBjb25zdHJ1Y3Rvciggb3B0aW9ucyA/OiBLVlA8YW55PiApIHtcblxuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeSA9IHtcbiAgICAgICAgICAgIHBhZ2U6IDAsXG4gICAgICAgICAgICBzaXplOiAxMCxcbiAgICAgICAgICAgIHNvcnQ6IFwibW9kaWZpZWQsZGVzY1wiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5xdWVyeSA9IHtcbiAgICAgICAgICAgIHBhZ2U6IDAsXG4gICAgICAgICAgICBzaXplOiAxMCxcbiAgICAgICAgICAgIHNvcnQ6IFwibW9kaWZpZWQsZGVzY1wiXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5hcHBseVBhcmFtZXRlcnMob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGdldFF1ZXJ5KCkgOiBLVlA8YW55PiB7XG4gICAgICAgIGxldCByZXN1bHQgOiBLVlA8YW55PiA9IHt9O1xuICAgICAgICBmb3IobGV0IHByb3AgaW4gdGhpcy5xdWVyeSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5xdWVyeVtwcm9wXTtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZih2YWx1ZS5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4oJywnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBwYXJhbWV0ZXIobmFtZSA6IHN0cmluZywgdmFsdWU6IGFueSkgOiBLR1F1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIobmFtZSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYXJhbWV0ZXIgKG5hbWUgOiBzdHJpbmcsIHZhbHVlIDogYW55KSB7XG4gICAgICAgIGlmKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5xdWVyeVtuYW1lXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5xdWVyeVtuYW1lXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldFBhcmFtZXRlciAoa2V5IDogc3RyaW5nKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5W2tleV07XG4gICAgfVxuXG4gICAgYXBwbHlQYXJhbWV0ZXJzIChvYmogOiBLVlA8YW55PiApIHvCoFxuICAgICAgICBmb3IodmFyIHAgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZihvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwLCBvYmpbcF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBxKHRleHQgOiBzdHJpbmcpIDogS0dRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0USh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHRleHQgLSBmcmVlIHRleHQgcXVlcnlcbiAgICAgKi9cbiAgICBzZXRRICh0ZXh0IDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFF1ZXJ5UGFyYW1ldGVycy5RVUVSWSwgdGV4dCk7XG4gICAgfVxuXG4gICAgZ2V0USgpIDogc3RyaW5nfG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUXVlcnlQYXJhbWV0ZXJzLlFVRVJZKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0eXBlcyAtIEtHIGNsYXNzaWZpZXJzIGZvciB3aGljaCBjb25jZXB0cyBzaG91bGQgYmUgcmV0dXJuZWRcbiAgICAgKi9cbiAgICBjbGFzc2lmaWVycyh0eXBlcyA6IHN0cmluZ3xzdHJpbmdbXSkgOiBLR1F1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRDbGFzc2lmaWVycyh0eXBlcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0eXBlcyAtIEtHIGNsYXNzaWZpZXJzIGZvciB3aGljaCBjb25jZXB0cyBzaG91bGQgYmUgcmV0dXJuZWRcbiAgICAgKi9cbiAgICBzZXRDbGFzc2lmaWVycyAodHlwZXMgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgaWYoIXR5cGVzKSByZXR1cm47XG4gICAgICAgIGlmKHR5cGVvZih0eXBlcykgPT09ICdzdHJpbmcnKSB0eXBlcyA9IHR5cGVzID0gW3R5cGVzXTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUXVlcnlQYXJhbWV0ZXJzLlRZUEVTLCB0eXBlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBLRyBjbGFzc2lmaWVycyBmb3Igd2hpY2ggY29uY2VwdHMgc2hvdWxkIGJlIHJldHVybmVkXG4gICAgICovXG4gICAgZ2V0Q2xhc3NpZmllcnMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihRdWVyeVBhcmFtZXRlcnMuVFlQRVMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgSXRlbSBvYmplY3QgbW9kZWwgdHlwZSBuYW1lKHMpIGZvciB3aGljaFxuICAgICAqIHJlY29tbWVuZGVkIGNvbmNlcHRzIHNob3VsZCBiZSByZXR1cm5lZC4gTm90ZTogdGhpc1xuICAgICAqIHF1ZXJ5IHBhcmFtZXRlciBpcyBub3QgdGhlIHNhbWUgYXMgdGhlIEdlb1BsYXRmb3JtLlF1ZXJ5LnR5cGVzKClcbiAgICAgKiBxdWVyeSBwYXJhbWV0ZXIgKHRoZXkgbWFwIHRvIGRpZmZlcmVudCBIVFRQIHJlcXVlc3QgcGFyYW1ldGVycykuXG4gICAgICogQHBhcmFtIG9ialR5cGVzIC0gSXRlbSBvYmplY3QgdHlwZSBuYW1lc1xuICAgICAqL1xuICAgIHR5cGVzKG9ialR5cGVzIDogc3RyaW5nfHN0cmluZ1tdKSA6IEtHUXVlcnkge1xuICAgICAgICB0aGlzLnNldFR5cGVzKG9ialR5cGVzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgSXRlbSBvYmplY3QgbW9kZWwgdHlwZSBuYW1lKHMpIGZvciB3aGljaFxuICAgICAqIHJlY29tbWVuZGVkIGNvbmNlcHRzIHNob3VsZCBiZSByZXR1cm5lZC4gTm90ZTogdGhpc1xuICAgICAqIHF1ZXJ5IHBhcmFtZXRlciBpcyBub3QgdGhlIHNhbWUgYXMgdGhlIEdlb1BsYXRmb3JtLlF1ZXJ5LnNldFR5cGVzKClcbiAgICAgKiBxdWVyeSBwYXJhbWV0ZXIgKHRoZXkgbWFwIHRvIGRpZmZlcmVudCBIVFRQIHJlcXVlc3QgcGFyYW1ldGVycykuXG4gICAgICogQHBhcmFtIG9ialR5cGVzIC0gSXRlbSBvYmplY3QgdHlwZSBuYW1lc1xuICAgICAqL1xuICAgIHNldFR5cGVzIChvYmpUeXBlcyA6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICBpZighb2JqVHlwZXMpIHJldHVybjtcbiAgICAgICAgaWYodHlwZW9mKG9ialR5cGVzKSA9PT0gJ3N0cmluZycpIG9ialR5cGVzID0gW29ialR5cGVzXTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUXVlcnlQYXJhbWV0ZXJzLkZPUl9UWVBFUywgb2JqVHlwZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgSXRlbSBvYmplY3QgbW9kZWwgdHlwZSBuYW1lKHMpIGZvciB3aGljaFxuICAgICAqIHJlY29tbWVuZGVkIGNvbmNlcHRzIHNob3VsZCBiZSByZXR1cm5lZC4gTm90ZTogdGhpc1xuICAgICAqIHF1ZXJ5IHBhcmFtZXRlciBpcyBub3QgdGhlIHNhbWUgYXMgdGhlIEdlb1BsYXRmb3JtLlF1ZXJ5LmdldFR5cGVzKClcbiAgICAgKiBxdWVyeSBwYXJhbWV0ZXIgKHRoZXkgbWFwIHRvIGRpZmZlcmVudCBIVFRQIHJlcXVlc3QgcGFyYW1ldGVycykuXG4gICAgICogQHJldHVybiBJdGVtIG9iamVjdCB0eXBlIG5hbWVzXG4gICAgICovXG4gICAgZ2V0VHlwZXMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihRdWVyeVBhcmFtZXRlcnMuRk9SX1RZUEVTKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYWdlIC0gcGFnZSBvZiByZXN1bHRzIHRvIGZldGNoXG4gICAgICovXG4gICAgcGFnZSAocGFnZSA6IG51bWJlcikgOiBLR1F1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHBhZ2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYWdlKHBhZ2UgOiBudW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4ocGFnZSkgfHwgcGFnZSoxPDApIHJldHVybjtcbiAgICAgICAgdGhpcy5xdWVyeS5wYWdlID0gcGFnZSoxO1xuICAgIH1cblxuICAgIGdldFBhZ2UoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5LnBhZ2U7XG4gICAgfVxuXG4gICAgbmV4dFBhZ2UoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5xdWVyeS5wYWdlKzEpO1xuICAgIH1cblxuICAgIHByZXZpb3VzUGFnZSgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLnF1ZXJ5LnBhZ2UtMSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc2l6ZSAtIHBhZ2Ugc2l6ZSB0byByZXF1ZXN0XG4gICAgICovXG4gICAgcGFnZVNpemUgKHNpemU6IG51bWJlcikgOiBLR1F1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYWdlU2l6ZShzaXplKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0UGFnZVNpemUgKHNpemUgOiBudW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4oc2l6ZSkgfHwgc2l6ZSoxPDApIHJldHVybjtcbiAgICAgICAgdGhpcy5xdWVyeS5zaXplID0gc2l6ZSoxO1xuICAgIH1cblxuICAgIGdldFBhZ2VTaXplKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeS5zaXplO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNvcnQgLSBmb3JtIG9mIDxmaWVsZD4sPGRpcj4gb3IganVzdCBmaWVsZCBuYW1lXG4gICAgICogQHBhcmFtIG9yZGVyIC0gb3B0aW9uYWwsIGVpdGhlciAnYXNjJyBvciAnZGVzYydcbiAgICAgKi9cbiAgICBzb3J0IChzb3J0IDogc3RyaW5nLCBvcmRlciA/OiBzdHJpbmcpIDogS0dRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0U29ydChzb3J0LCBvcmRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzb3J0IC0gZm9ybSBvZiA8ZmllbGQ+LDxkaXI+IG9yIGp1c3QgZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSBvcmRlciAtIG9wdGlvbmFsLCBlaXRoZXIgJ2FzYycgb3IgJ2Rlc2MnXG4gICAgICovXG4gICAgIHNldFNvcnQoc29ydCA6IHN0cmluZywgb3JkZXIgPzpzdHJpbmcpIHtcbiAgICAgICAgIG9yZGVyID0gb3JkZXIgfHwgJ2Rlc2MnO1xuICAgICAgICAgaWYoc29ydCAmJiBzb3J0LmluZGV4T2YoJywnKTwwKVxuICAgICAgICAgICAgc29ydCA9IHNvcnQgKyAnLCcgKyBvcmRlcjtcbiAgICAgICAgIHRoaXMucXVlcnkuc29ydCA9IHNvcnQ7XG4gICAgfVxuXG4gICAgZ2V0U29ydCgpIDogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5LnNvcnQ7XG4gICAgfVxuXG4gICAgZ2V0U29ydEZpZWxkKCkgOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkuc29ydC5zcGxpdCgnLCcpWzBdO1xuICAgIH1cblxuICAgIGdldFNvcnRPcmRlcigpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5LnNvcnQuc3BsaXQoJywnKVsxXSA9PT0gJ2FzYyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBsaXN0IG9mIGtleS12YWx1ZSBwYWlycyBvZiBzb3J0IG9wdGlvbnNcbiAgICAgKi9cbiAgICBnZXRTb3J0T3B0aW9ucygpIDogeyB2YWx1ZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nOyB9W10ge1xuICAgICAgICByZXR1cm4gU09SVF9PUFRJT05TX0RFRkFVTFQuc2xpY2UoMCk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMuZGVmYXVsdFF1ZXJ5O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgS0dRdWVyeTtcbiJdfQ==