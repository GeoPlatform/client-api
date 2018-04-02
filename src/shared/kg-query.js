
import QueryParameters from './parameters';

const SORT_OPTIONS_DEFAULT = [
    { value:"label,asc",       label: "Name (A-Z)"              },
    { value:"label,desc",      label: "Name (Z-A)"              },
    { value:"type,asc",        label: "Type (A-Z)"              },
    { value:"type,desc",       label: "Type (Z-A)"              },
    { value:"modified,desc",   label: "Most recently modified"  },
    { value:"modified,asc",    label: "Least recently modified" },
    { value:"_score,desc",     label: "Relevance"               }
];


class KGQuery {

    constructor() {

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



    getQuery() {
        let result = {};
        for(let prop in this.query) {
            let value = this.query[prop];
            if(value !== null && typeof(value.push) !== 'undefined') {
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

    setParameter (name, value) {
        if(value === null || value === undefined)
            delete this.query[name];
        else
            this.query[name] = value;
    }

    getParameter (key) {
        return this.getParameter(key);
    }

    applyParameters (obj) { 
        for(var p in obj) {
            if(obj.hasOwnProperty(p)) {
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
     * @param {string} text - free text query
     */
    setQ (text) {
        this.setParameter(QueryParameters.QUERY, text);
    }

    getQ() {
        return this.getParameter(QueryParameters.QUERY);
    }


    // -----------------------------------------------------------


    /**
     * @param {array[string]} types - KG classifiers for which concepts should be returned
     */
    classifiers(types) {
        this.setClassifiers(types);
        return this;
    }

    /**
     * @param {array[string]} types - KG classifiers for which concepts should be returned
     */
    setClassifiers (types) {
        if(types && types.push === 'undefined')
            types = [types];
        this.setParameter(QueryParameters.TYPES, types);
    }

    /**
     * @return {array[string]} KG classifiers for which concepts should be returned
     */
    getClassifiers () {
        return this.getParameter(QueryParameters.TYPES);
    }


    // -----------------------------------------------------------


    /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.types()
     * query parameter (they map to different HTTP request parameters).
     * @param {array[string]} objTypes - Item object type names
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
     * @param {array[string]} objTypes - Item object type names
     */
    setTypes (objTypes) {
        if(objTypes && objTypes.push === 'undefined')
            objTypes = [objTypes];
        this.setParameter(QueryParameters.FOR_TYPES, objTypes);
    }

    /**
     * Get the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.getTypes()
     * query parameter (they map to different HTTP request parameters).
     * @return {array[string]} Item object type names
     */
    getTypes () {
        return this.getParameter(QueryParameters.FOR_TYPES);
    }


    // -----------------------------------------------------------


    /**
     * @param {int} page - page of results to fetch
     */
    page (page) {
        this.setPage(page);
        return this;
    }

    setPage(page) {
        if(isNaN(page) || page*1<0) return;
        this.query.page = page*1;
    }

    getPage() {
        return this.query.page;
    }

    nextPage() {
        this.setPage(this.query.page+1);
    }

    previousPage() {
        this.setPage(this.query.page-1);
    }


    // -----------------------------------------------------------


    /**
     * @param {int} size - page size to request
     */
    pageSize (size) {
        this.setPageSize(size);
        return this;
    }

    setPageSize (size) {
        if(isNaN(size) || size*1<0) return;
        this.query.size = size*1;
    }

    getPageSize() {
        return this.query.size;
    }


    // -----------------------------------------------------------


    /**
     * @param {string} sort - form of <field>,<dir> or just field name
     * @param {string} order - optional, either 'asc' or 'desc'
     */
    sort (sort, order) {
        this.setSort(sort, order);
        return this;
    }

    /**
     * @param {string} sort - form of <field>,<dir> or just field name
     * @param {string} order - optional, either 'asc' or 'desc'
     */
     setSort(sort, order) {
         order = (order && (order !== 'asc' || order !== 'desc')) ? 'desc' : order;
         if(sort && sort.indexOf(',')<0)
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
     * @return {array} list of key-value pairs of sort options
     */
    getSortOptions() {
        return SORT_OPTIONS_DEFAULT.slice(0);
    }


    // -----------------------------------------------------------


    /**
     *
     */
    clear () {
        this.query = this.defaultQuery;
    }
}

export default KGQuery;
