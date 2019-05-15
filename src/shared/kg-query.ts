
import QueryParameters from './parameters';

interface KVP<U> { [ key : string ] : U }


const SORT_OPTIONS_DEFAULT : { value:string; label:string; }[] = [
    { value:"label,asc",       label: "Name (A-Z)"              },
    { value:"label,desc",      label: "Name (Z-A)"              },
    { value:"type,asc",        label: "Type (A-Z)"              },
    { value:"type,desc",       label: "Type (Z-A)"              },
    { value:"modified,desc",   label: "Most recently modified"  },
    { value:"modified,asc",    label: "Least recently modified" },
    { value:"_score,desc",     label: "Relevance"               }
];


class KGQuery {

    public query : KVP<any>;
    private defaultQuery : KVP<any>;

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


    getQuery() : KVP<any> {
        let result : KVP<any> = {};
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


    parameter(name : string, value: any) : KGQuery {
        this.setParameter(name, value);
        return this;
    }

    setParameter (name : string, value : any) {
        if(value === null || value === undefined)
            delete this.query[name];
        else
            this.query[name] = value;
    }

    getParameter (key : string) : any {
        return this.query[key];
    }

    applyParameters (obj : KVP<any> ) { 
        for(var p in obj) {
            if(obj.hasOwnProperty(p)) {
                this.setParameter(p, obj[p]);
            }
        }
    }


    // -----------------------------------------------------------


    q(text : string) : KGQuery {
        this.setQ(text);
        return this;
    }

    /**
     * @param text - free text query
     */
    setQ (text : string) {
        this.setParameter(QueryParameters.QUERY, text);
    }

    getQ() : string|null {
        return this.getParameter(QueryParameters.QUERY);
    }


    // -----------------------------------------------------------


    /**
     * @param types - KG classifiers for which concepts should be returned
     */
    classifiers(types : string|string[]) : KGQuery {
        this.setClassifiers(types);
        return this;
    }

    /**
     * @param types - KG classifiers for which concepts should be returned
     */
    setClassifiers (types : string|string[]) {
        if(!types) return;
        if(typeof(types) === 'string') types = types = [types];
        this.setParameter(QueryParameters.TYPES, types);
    }

    /**
     * @return KG classifiers for which concepts should be returned
     */
    getClassifiers () : string[] {
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
    types(objTypes : string|string[]) : KGQuery {
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
    setTypes (objTypes : string|string[]) {
        if(!objTypes) return;
        if(typeof(objTypes) === 'string') objTypes = [objTypes];
        this.setParameter(QueryParameters.FOR_TYPES, objTypes);
    }

    /**
     * Get the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.getTypes()
     * query parameter (they map to different HTTP request parameters).
     * @return Item object type names
     */
    getTypes () : string[] {
        return this.getParameter(QueryParameters.FOR_TYPES);
    }


    // -----------------------------------------------------------


    /**
     * @param page - page of results to fetch
     */
    page (page : number) : KGQuery {
        this.setPage(page);
        return this;
    }

    setPage(page : number) {
        if(isNaN(page) || page*1<0) return;
        this.query.page = page*1;
    }

    getPage() : number {
        return this.query.page;
    }

    nextPage() : void {
        this.setPage(this.query.page+1);
    }

    previousPage() : void {
        this.setPage(this.query.page-1);
    }


    // -----------------------------------------------------------


    /**
     * @param size - page size to request
     */
    pageSize (size: number) : KGQuery {
        this.setPageSize(size);
        return this;
    }

    setPageSize (size : number) {
        if(isNaN(size) || size*1<0) return;
        this.query.size = size*1;
    }

    getPageSize() : number {
        return this.query.size;
    }


    // -----------------------------------------------------------


    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    sort (sort : string, order ?: string) : KGQuery {
        this.setSort(sort, order);
        return this;
    }

    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
     setSort(sort : string, order ?:string) {
         order = order || 'desc';
         if(sort && sort.indexOf(',')<0)
            sort = sort + ',' + order;
         this.query.sort = sort;
    }

    getSort() : string | null {
        return this.query.sort;
    }

    getSortField() : string | null {
        return this.query.sort.split(',')[0];
    }

    getSortOrder() : boolean {
        return this.query.sort.split(',')[1] === 'asc';
    }

    /**
     * @return list of key-value pairs of sort options
     */
    getSortOptions() : { value: string, label: string; }[] {
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
