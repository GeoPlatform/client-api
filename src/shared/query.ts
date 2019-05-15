
import Parameters from './parameters';

interface KVP<U> { [ key : string ] : U }

const Fields : KVP<string> = {
    ACCESS_RIGHTS       : 'rights',
    ALTERNATE_TITLES    : 'alternateTitles',
    ANNOTATIONS         : 'annotations',
    CLASSIFIERS         : 'classifiers',
    CONCEPT_SCHEME      : 'scheme',
    CONTACTS            : 'contacts',
    CREATED             : 'created',
    CREATED_BY          : 'createdBy',
    DATASETS            : 'datasets',
    DESCRIPTION         : 'description',
    DISTRIBUTIONS       : 'distributions',
    EXTENT              : 'extent',
    GALLERY_ITEMS       : 'items',
    HREF                : 'href',
    IDENTIFIERS         : 'identifiers',
    KEYWORDS            : 'keywords',
    LABEL               : 'label',
    LAST_MODIFIED_BY    : 'lastModifiedBy',
    LAYERS              : 'layers',
    LAYER_TYPE          : 'layerType',
    LAYER_NAME          : 'layerName',
    LEGEND              : 'legend',
    MODIFIED            : 'modified',
    PARENT_LAYER        : 'parentLayer',
    PUBLISHERS          : 'publishers',
    RESOURCE_TYPES      : 'resourceTypes',
    SERVICE_TYPE        : 'serviceType',
    SERVICES            : 'services',
    SPATIAL             : 'spatial',
    STATISTICS          : 'statistics',
    STATUS              : 'status',
    SUB_LAYERS          : 'subLayers',
    TEMPORAL            : 'temporal',
    THEMES              : 'themes',
    THUMBNAIL           : 'thumbnail',
    USED_BY             : 'usedBy',
    VISIBILITY          : 'visibility',
    LANDING_PAGE        : 'landingPage'
};

const FIELDS_DEFAULT : string[] = [
    Fields.CREATED, Fields.MODIFIED, Fields.CREATED_BY,
    Fields.PUBLISHERS, Fields.THEMES, Fields.DESCRIPTION
];

/* --------------------------------------------------------- */

const Facets : KVP<string> = {
    ALTERNATE_TITLES    : 'alternateTitles',
    CONCEPT_SCHEMES     : 'schemes',
    CREATED_BY          : 'createdBy',
    HREF                : 'href',
    IDENTIFIERS         : "identifiers",
    LAYER_TYPE          : 'layerType',
    LAYER_NAME          : 'layerName',
    LIKES               : 'likes',
    ONLINE              : 'online',
    PUBLISHERS          : 'publishers',
    CONTACTS            : 'contacts',
    RELIABILITY         : 'reliability',
    SERVICE_TYPES       : 'serviceTypes',
    SPEED               : 'speed',
    STATUS              : 'status',
    THEMES              : 'themes',
    TYPES               : 'type',   //TODO change to 'types'
    USED_BY             : 'usedBy',
    VIEWS               : 'views',
    VISIBILITY          : 'visibility'
};

const FACETS_DEFAULT : string[] = [
    Facets.TYPES,
    Facets.PUBLISHERS,
    Facets.SERVICE_TYPES,
    Facets.CONCEPT_SCHEMES,
    Facets.VISIBILITY,
    Facets.CREATED_BY
];


/*
    Map facet keys to parameters so clients can set
    query params using faceted results

    //TODO remove these and their function below
 */
const FacetToParam : KVP<string> = {};
FacetToParam[Facets.TYPES]           = Parameters.TYPES;
FacetToParam[Facets.THEMES]          = Parameters.THEMES_ID;
FacetToParam[Facets.PUBLISHERS]      = Parameters.PUBLISHERS_ID;
FacetToParam[Facets.CONTACTS]        = Parameters.CONTACTS_ID;
FacetToParam[Facets.CONCEPT_SCHEMES] = Parameters.SCHEMES_ID;
FacetToParam[Facets.USED_BY]         = Parameters.USED_BY_ID;



/* --------------------------------------------------------- */


const SORT_OPTIONS_DEFAULT : { value: string; label: string; }[] = [
    { value:"label,asc",       label: "Name (A-Z)"              },
    { value:"label,desc",      label: "Name (Z-A)"              },
    { value:"type,asc",        label: "Type (A-Z)"              },
    { value:"type,desc",       label: "Type (Z-A)"              },
    { value:"modified,desc",   label: "Most recently modified"  },
    { value:"modified,asc",    label: "Least recently modified" },
    { value:"_score,desc",     label: "Relevance"               }
];


const BBOX_REGEX = /^\-?\d+(\.\d*)?,\-?\d+(\.\d*)?,\-?\d+(\.\d*)?,\-?\d+(\.\d*)?$/;


function toArray(value : any) : any | null {
    let result = value;
    //if given a non-array value, wrap in array
    if(result !== null && typeof(result.push) === 'undefined') result = [result];
    //if array value is empty, nullify the result
    if(result !== null && !result.length) result = null;
    return result;
}



/**
 * Query
 *
 * Specify the "default" query constraints to use by passing in 'options.defaults = {...}';
 *
 */
class Query {

    public query : KVP<any>;
    private defaultQuery : KVP<any>;

    /**
     * @param options - set of initial constraints
     */
    constructor(options ?: KVP<any>) {
        this.defaultQuery = { };
        this.defaultQuery[Parameters.PAGE.toString()] = 0;
        this.defaultQuery[Parameters.PAGE_SIZE.toString()] = 10;
        this.defaultQuery[Parameters.SORT.toString()] = "modified,desc";
        this.defaultQuery[Parameters.FIELDS.toString()] = FIELDS_DEFAULT.slice(0);
        this.defaultQuery[Parameters.FACETS.toString()] = FACETS_DEFAULT.slice(0);
        if(options && options.defaults) {
            Object.assign(this.defaultQuery, options.defaults);
            delete options.defaults;
        }
        this.query = JSON.parse(JSON.stringify(this.defaultQuery));
        if(options) {
            this.applyParameters(options);
        }
    }


    /**
     * @return containing request-ready parameters/values
     */
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

    /**
     * @return Query
     */
    clone() : Query {
        let result = new Query();
        let json = JSON.parse(JSON.stringify(this.query));
        result.applyParameters(json);
        return result;
    }


    // -----------------------------------------------------------

    /**
     * @param name
     * @param value
     * @return Query this
     */
    parameter(name : string, value : any) : Query {
        this.setParameter(name, value);
        return this;
    }

    /**
     * @param name
     * @param value
     */
    setParameter (name : string, value: any) : void {
        if(value === null || value === undefined || //if no value was provide
            (typeof(value.push) !== 'undefined' && !value.length)) //or empty array
            delete this.query[name];
        else
            this.query[name] = value;
    }

    /**
     * @param key - name of parameter
     * @return value of parameter
     */
    getParameter (key : string) : any {
        return this.query[key];
    }

    /**
     * @param obj - set of parameter/values to apply to this query
     */
    applyParameters (obj : KVP<any>) : void { 
        for(let p in obj) {
            if(obj.hasOwnProperty(p)) {
                this.setParameter(p as string, obj[p] as any);
            }
        }
    }

    /**
     * @param facet - name of facet to set the value for as a parameter
     * @param value - value of the facet to use as the parameter's value
     */
     //TODO remove this function
    setFacetParameter (facet: string, value: string) : void {
        let param : string = FacetToParam[facet];
        if(!param) {
            console.log("WARN : Query.applyFacetParameter() - " +
                "unable to map facet to known parameter '" + facet + "', using " +
                "as direct parameter which may not operate as intended");
        }
        this.setParameter(param||facet, value);
    }


    // -----------------------------------------------------------

    /**
     * @param text
     * @return Query this
     */
    q(text : string) : Query { this.setQ(text); return this; }

    /** @param text - free text query */
    setQ (text : string) : void { this.setParameter(Parameters.QUERY, text); }
    /** @return */
    getQ() : string { return this.getParameter(Parameters.QUERY) as string; }


    // -----------------------------------------------------------


    keywords(text : string|string[]) : Query {
        this.setKeywords(text);
        return this;
    }

    /**
     * @param text - free text query
     */
    setKeywords (text : string|string[]) : void {
        this.setParameter(Parameters.KEYWORDS, toArray(text));
    }

    getKeywords() : string[] {
        return this.getParameter(Parameters.KEYWORDS);
    }


    // -----------------------------------------------------------


    uri (uri : string) : Query {
        this.setUri(uri);
        return this;
    }

    setUri(uri : string) {
        this.setParameter(Parameters.URI, uri);
    }

    getUri() : any {
        return this.getParameter(Parameters.URI);
    }


    // -----------------------------------------------------------


    types(types : string|string[]) : Query {
        this.setTypes(types);
        return this;
    }

    /**
     * @param types - name of class(es) to request
     */
    setTypes (types : string|string[]) {
        this.setParameter(Parameters.TYPES, toArray(types));
    }

    getTypes () : string[] {
        return this.getParameter(Parameters.TYPES);
    }


    // -----------------------------------------------------------


    createdBy(user : string) : Query {
        this.setCreatedBy(user);
        return this;
    }

    /** @param user - username */
    setCreatedBy (user : string) {
        this.setParameter(Parameters.CREATED_BY, user);
    }

    /** @return username */
    getCreatedBy () : any {
        return this.getParameter(Parameters.CREATED_BY);
    }


    // -----------------------------------------------------------


    lastModifiedBy(user : string) : Query {
        this.setLastModifiedBy(user);
        return this;
    }

    /** @param user - username */
    setLastModifiedBy (user: string) {
        this.setParameter(Parameters.LAST_MODIFIED_BY, user);
    }

    /** @return username */
    getLastModifiedBy () : any {
        return this.getParameter(Parameters.LAST_MODIFIED_BY);
    }


    // -----------------------------------------------------------


    /**
     * Specify a Theme or set of Themes to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.THEMES_LABEL or Parameters.THEMES_URI
     * respectively.
     * @param themes - string or array of strings containing theme constraint
     * @param parameter - optional, to indicate the parameter to use
     * @return Query
     */
    themes(themes: string|string[], parameter?:string) : Query {
        this.setThemes(themes, parameter);
        return this;
    }


    /**
     * Specify a Theme or set of Themes to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.THEMES_LABEL or Parameters.THEMES_URI
     * respectively.
     * @param themes - theme or themes to constrain by
     */
    setThemes (themes:string|string[], parameter?:string) {

        //clear existing
        this.setParameter(Parameters.THEMES_ID, null);
        this.setParameter(Parameters.THEMES_LABEL, null);
        this.setParameter(Parameters.THEMES_URI, null);

        let param = parameter || Parameters.THEMES_ID;
        this.setParameter(param, toArray(themes));
    }

    getThemes () : string[] {
        return this.getParameter(Parameters.THEMES_ID) ||
            this.getParameter(Parameters.THEMES_LABEL) ||
            this.getParameter(Parameters.THEMES_URI);
    }


    // -----------------------------------------------------------


    /**
     * Specify a Publisher or set of Publishers to constrain results. By
     * default, values are assumed to be identifiers. If using labels or uris,
     * specify the optional second parameter to be either
     * Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI respectively.
     * @param parameter - optional, to indicate the parameter to use
     * @return Query
     */
    publishers(publishers:string|string[], parameter?:string) : Query {
        this.setPublishers(publishers, parameter);
        return this;
    }

    /**
     * Specify a Publisher or set of Publishers to constrain results. By
     * default, values are assumed to be identifiers. If using labels or uris,
     * specify the optional second parameter to be either
     * Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI respectively.
     * @param publishers - publishing orgs to constrain by
     */
    setPublishers (publishers:string|string[], parameter?:string) {

        //clear existing
        this.setParameter(Parameters.PUBLISHERS_ID, null);
        this.setParameter(Parameters.PUBLISHERS_LABEL, null);
        this.setParameter(Parameters.PUBLISHERS_URI, null);

        let param = parameter || Parameters.PUBLISHERS_ID;
        this.setParameter(param, toArray(publishers));
    }

    getPublishers () : string[] {
        return this.getParameter(Parameters.PUBLISHERS_ID) ||
            this.getParameter(Parameters.PUBLISHERS_LABEL) ||
            this.getParameter(Parameters.PUBLISHERS_URI);
    }


    // -----------------------------------------------------------


    /**
     * Specify a Point of Contact or set of Contacts to constrain results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter to be either
     * Parameters.CONTACTS_LABEL or Parameters.CONTACTS_URI respectively.
     * @param parameter - optional, to indicate the parameter to use
     * @return Query
     */
    contacts(contacts:string|string[], parameter?:string) : Query {
        this.setContacts(contacts, parameter);
        return this;
    }

    /**
     * Specify a Contact or set of Contacts to constrain results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter to be either
     * Parameters.CONTACTS_LABEL or Parameters.CONTACTS_URI respectively.
     * @param contacts - publishing orgs to constrain by
     */
    setContacts (contacts:string|string[], parameter?:string) {

        //clear existing
        this.setParameter(Parameters.CONTACTS_ID, null);
        this.setParameter(Parameters.CONTACTS_LABEL, null);
        this.setParameter(Parameters.CONTACTS_URI, null);

        let param = parameter || Parameters.CONTACTS_ID;
        this.setParameter(param, toArray(contacts));
    }

    getContacts () : string[] {
        return this.getParameter(Parameters.CONTACTS_ID) ||
            this.getParameter(Parameters.CONTACTS_LABEL) ||
            this.getParameter(Parameters.CONTACTS_URI);
    }


    // -----------------------------------------------------------


    /**
     * Specify the identifier of an Agent (Community, Group, etc) that
     * uses items you wish to find in search results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter
     * to be either Parameters.USED_BY_LABEL or Parameters.USED_BY_URI
     * respectively.
     * @param parameter - optional, to indicate the parameter to use
     * @return Query
     */
    usedBy(ids:string|string[], parameter?:string) : Query {
        this.setUsedBy(ids, parameter);
        return this;
    }

    /**
     * Specify the identifier of an Agent (Community, Group, etc) that
     * uses items you wish to find in search results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter
     * to be either Parameters.USED_BY_LABEL or Parameters.USED_BY_URI
     * respectively.
     * @param ids - publishing orgs to constrain by
     */
    setUsedBy (ids:string|string[], parameter?:string) {

        //clear existing
        this.setParameter(Parameters.USED_BY_ID, null);
        this.setParameter(Parameters.USED_BY_LABEL, null);
        this.setParameter(Parameters.USED_BY_URI, null);

        let param = parameter || Parameters.USED_BY_ID;
        this.setParameter(param, toArray(ids));
    }

    getUsedBy () : string[] {
        return this.getParameter(Parameters.USED_BY_ID) ||
            this.getParameter(Parameters.USED_BY_LABEL) ||
            this.getParameter(Parameters.USED_BY_URI);
    }


    // -----------------------------------------------------------


    /**
     * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter
     * to be either Parameters.SCHEMES_LABEL or Parameters.SCHEMES_URI
     * respectively.
     * @param schemes - schemes to constrain by
     * @param parameter - optional, to indicate the parameter to use
     * @return Query
     */
    schemes(schemes:string|string[], parameter?:string) : Query {
        this.setSchemes(schemes, parameter);
        return this;
    }

    /**
     * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.SCHEMES_LABEL or Parameters.SCHEMES_URI
     * respectively.
     * @param schemes - schemes to constrain by
     * @param parameter - optional, to indicate the parameter to use
     */
    setSchemes (schemes:string|string[], parameter?:string) {

        //clear existing
        this.setParameter(Parameters.SCHEMES_ID, null);
        this.setParameter(Parameters.SCHEMES_LABEL, null);
        this.setParameter(Parameters.SCHEMES_URI, null);

        let param = parameter || Parameters.SCHEMES_ID;
        this.setParameter(param, toArray(schemes));
    }

    getSchemes() : string[] {
        return this.getParameter(Parameters.SCHEMES_ID) ||
            this.getParameter(Parameters.SCHEMES_LABEL) ||
            this.getParameter(Parameters.SCHEMES_URI);
    }


    // -----------------------------------------------------------

    /**
     *
     */
    serviceTypes(types:string|string[]) : Query {
        this.setServiceTypes(types);
        return this;
    }

    /**
     * @param types - ids
     */
    setServiceTypes (types:string|string[]) {
        this.setParameter(Parameters.SERVICE_TYPES, toArray(types));
    }

    getServiceTypes () : string[] {
        return this.getParameter(Parameters.SERVICE_TYPES);
    }


    // -----------------------------------------------------------


    visibility(vis:"public"|"private") : Query {
        this.setVisibility(vis);
        return this;
    }

    /**
     * @param visibility - one of 'public' or 'private'
     */
    setVisibility (visibility : "public"|"private") {
        this.setParameter(Parameters.VISIBILITY, visibility);
    }

    getVisibility () : any {
        return this.getParameter(Parameters.VISIBILITY);
    }


    // -----------------------------------------------------------


    status(value : string) : Query {
        this.setStatus(value);
        return this;
    }

    /**
     * @param status - current status of Item
     */
    setStatus (value : string) {
        this.setParameter(Parameters.STATUS, value);
    }

    getStatus () : any {
        return this.getParameter(Parameters.STATUS);
    }


    // -----------------------------------------------------------


    extent(bbox : any) : Query {
        this.setExtent(bbox);
        return this;
    }

    /**
     * @param bbox - string form of "minx,miny,maxx,maxy", or L.LatLngBounds, or Array
     */
    setExtent (bbox : any) {
        if(bbox) {
            if(typeof(bbox.toBboxString) !== 'undefined') {
                //Leaflet Bounds instance
                bbox = bbox.toBboxString();

            } else if(typeof(bbox.push) !== 'undefined' && bbox.length &&
                //Nested array (alternate Leaflet representation):
                // [ [minLat,minLong], [maxLat,maxLong] ]
                typeof(bbox[0].push) !== 'undefined') {
                bbox = bbox[0][1]+','+bbox[0][0]+','+bbox[1][1]+','+bbox[1][0];

            } else if(typeof(bbox) === 'string') {
                if(!BBOX_REGEX.test(bbox)) {
                    throw new Error("Invalid argument: bbox string must be " +
                        "in form of 'minx,miny,maxx,maxy'");
                }
            } else {
                throw new Error("Invalid argument: bbox must be one of " +
                    "Leaflet.Bounds, nested array, or bbox string");
            }
        }
        this.setParameter(Parameters.EXTENT, bbox);
    }

    /**
     * @return bbox string or null if not set
     */
    getExtent () : any {
        return this.getParameter(Parameters.EXTENT);
    }


    // -----------------------------------------------------------


    modified(date : number|Date, beforeOrAfter : boolean) : Query {
        this.setModified(date, beforeOrAfter);
        return this;
    }

    /**
     * @param date - date to compare against
     * @param beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     */
    setModified (date : number|Date, beforeOrAfter:boolean) {

        //if no date was supplied, consider it "unset" for both properties
        if(!date) {
            this.setParameter(Parameters.MODIFIED_BEFORE, null);
            this.setParameter(Parameters.MODIFIED_AFTER, null);
            return;
        }

        if(!(date instanceof Date))
            date = new Date(date as number);

        let dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
        let prop = dir ? Parameters.MODIFIED_BEFORE : Parameters.MODIFIED_AFTER;       //property being set
        let oppProp = dir ? Parameters.MODIFIED_AFTER : Parameters.MODIFIED_BEFORE;    //unset opposite property
        let arg = (date && date.getTime) ? date.getTime() : date;

        this.setParameter(oppProp, null);
        this.setParameter(prop, arg);
    }

    getModified () : Date {
        let value = this.getParameter(Parameters.MODIFIED_BEFORE) ||
            this.getParameter(Parameters.MODIFIED_AFTER);
        if(value && typeof(value) === 'number') {
            value = new Date(value);
        }
        return value;
    }


    // -----------------------------------------------------------


    created(date : number|Date, beforeOrAfter:boolean) : Query {
        this.setCreated(date, beforeOrAfter);
        return this;
    }

    /**
     * @param date - date to compare against
     * @param beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     */
    setCreated (date : number|Date, beforeOrAfter:boolean) {

        //if no date was supplied, consider it "unset" for both properties
        if(!date) {
            this.setParameter(Parameters.CREATED_BEFORE, null);
            this.setParameter(Parameters.CREATED_AFTER, null);
            return;
        }

        if(!(date instanceof Date))
            date = new Date(date as number);

        let dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
        let prop = dir ? Parameters.CREATED_BEFORE : Parameters.CREATED_AFTER;       //property being set
        let oppProp = dir ? Parameters.CREATED_AFTER : Parameters.CREATED_BEFORE;    //unset opposite property
        let arg = (date && date.getTime) ? date.getTime() : date;

        this.setParameter(oppProp, null);
        this.setParameter(prop, arg);
    }

    getCreated () : Date {
        let value = this.getParameter(Parameters.CREATED_BEFORE) ||
            this.getParameter(Parameters.CREATED_AFTER);
        if(value && typeof(value) === 'number') {
            value = new Date(value);
        }
        return value;
    }


    // -----------------------------------------------------------


    begins(date : number|Date) : Query {
        this.setBeginDate(date);
        return this;
    }

    setBeginDate (date : number|Date) {
        if(date && date instanceof Date)
            date = date.getTime();
        this.setParameter(Parameters.BEGINS, date);
    }

    getBeginDate () : Date {
        let date = this.getParameter(Parameters.BEGINS);
        if(date) date = new Date(date);
        return date;
    }


    // -----------------------------------------------------------


    ends(date : number|Date) : Query {
        this.setEndDate(date);
        return this;
    }

    setEndDate (date: number|Date) {
        if(date && date instanceof Date)
            date = date.getTime();
        this.setParameter(Parameters.ENDS, date);
    }

    getEndDate () : Date {
        let date = this.getParameter(Parameters.ENDS);
        if(date) date = new Date(date);
        return date;
    }


    // -----------------------------------------------------------


    between(begin : number|Date, end : number|Date) : Query {
        this.setBetween(begin, end);
        return this;
    }

    setBetween(begin : number|Date, end : number|Date) {
        this.begins(begin);
        this.ends(end);
    }


    // -----------------------------------------------------------


    resourceTypes(types: string|string[]) : Query {
        this.setResourceTypes(types);
        return this;
    }

    setResourceTypes(types: string|string[]) {
        this.setParameter(Parameters.RESOURCE_TYPE, toArray(types));
    }

    getResourceTypes() : string[] {
        return this.getParameter(Parameters.RESOURCE_TYPE);
    }


    // -----------------------------------------------------------


    facets(names : string|string[]) : Query {
        this.setFacets(names);
        return this;
    }

    /*
     * @param names - names of facets
     */
    setFacets (names: string|string[]) {
        this.setParameter(Parameters.FACETS, toArray(names));
    }

    getFacets() : string[] {
        return this.getParameter(Parameters.FACETS);
    }

    /**
     * @param name - name of facet to add
     */
    addFacet(name: string) {
        let facets = this.getFacets() || [];
        facets.push(name);
        this.setFacets(facets);
    }

    /**
     * @param name - name of facet to remove
     */
    removeFacet(name: string) {
        let facets = this.getFacets() || [];
        let idx = facets.indexOf(name);
        if(idx>=0) {
            facets.splice(idx, 1);
            this.setFacets(facets);
        }
    }


    // -----------------------------------------------------------


    fields(fields: string|string[]) : Query {
        this.setFields(fields);
        return this;
    }

    /**
     * @param fields - list of field names to request for each search result
     */
    setFields (fields: string|string[]) {
        this.setParameter(Parameters.FIELDS, toArray(fields));
    }

    getFields() : string[] {
        return this.getParameter(Parameters.FIELDS);
    }

    /**
     * @param field - name of field to remove
     */
    addField(field: string) {
        let fields = this.getFields() || [];
        fields.push(field);
        this.setFields(fields);
    }

    /**
     * @param field - name of field to remove
     */
    removeField(field: string) {
        let fields = this.getFields() || [];
        let idx = fields.indexOf(field);
        if(idx>=0) {
            fields.splice(idx, 1);
            this.setFields(fields);
        }
    }



    // -----------------------------------------------------------


    /**
     * @param page - page of results to fetch
     */
    page (page: number) : Query {
        this.setPage(page);
        return this;
    }

    setPage(page: number) {
        if(isNaN(page) || page*1<0) return;
        this.setParameter(Parameters.PAGE, page*1);
    }

    getPage() : number {
        return this.getParameter(Parameters.PAGE);
    }

    nextPage() : void {
        this.setPage(this.getPage()+1);
    }

    previousPage() : void {
        this.setPage(this.getPage()-1);
    }


    // -----------------------------------------------------------


    /**
     * @param size - page size to request
     */
    pageSize (size: number) : Query {
        this.setPageSize(size);
        return this;
    }

    setPageSize (size: number) {
        if(isNaN(size) || size*1<0) return;
        this.setParameter(Parameters.PAGE_SIZE, size*1);
    }

    getPageSize() : number {
        return this.getParameter(Parameters.PAGE_SIZE);
    }


    // -----------------------------------------------------------


    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    sort (sort: string, order?:string) : Query {
        this.setSort(sort, order);
        return this;
    }

    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
     setSort(sort: string, order?:string) {
         order = order || 'desc';
         if(sort && sort.indexOf(',')<0)
            sort = sort + ',' + order;
         this.setParameter(Parameters.SORT, sort);
    }

    getSort() : string {
        return this.getParameter(Parameters.SORT);
    }

    getSortField() : string | null {
        let value = this.getSort();
        return value && value.length ? value.split(',')[0] : null;
    }

    getSortOrder() : string | null {
        let value = this.getSort();
        return value && value.length ? value.split(',')[1] : null;
    }

    /**
     * @return list of key-value pairs of sort options
     */
    getSortOptions() : { value: string; label: string; }[] {
        return SORT_OPTIONS_DEFAULT.slice(0);
    }


    // -----------------------------------------------------------


    /**
     *
     */
    clear () {
        this.query = JSON.parse(JSON.stringify(this.defaultQuery));
    }
}

export {
    Query as default,
    Query,
    Fields,
    Facets
};
