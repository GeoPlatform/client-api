
import Parameters from './parameters';

const Fields = {
    LABEL           : 'label',
    DESCRIPTION     : 'description',
    CREATED         : 'created',
    MODIFIED        : 'modified',
    CREATED_BY      : 'createdBy',
    LAST_MODIFIED_BY: 'lastModifiedBy',
    KEYWORDS        : 'keywords',
    THEMES          : 'themes',
    PUBLISHERS      : 'publishers',
    STATUS          : 'status',
    VISIBILITY      : 'visibility',
    EXTENT          : 'extent',
    TEMPORAL        : 'temporal',
    IDENTIFIERS     : 'identifiers',
    RESOURCE_TYPES  : 'resourceTypes',
    SERVICES        : 'services',
    CONTACTS        : 'contacts',
    DISTRIBUTIONS   : 'distributions',
    ACCESS_RIGHTS   : 'rights',
    USED_BY         : 'usedBy',
    STATISTICS      : 'statistics',

    SERVICE_TYPE    : 'serviceType',
    HREF            : 'href',
    DATASETS        : 'datasets',

    LAYER_TYPE      : 'layerType',
    LAYER_NAME      : 'layerName',
    LEGEND          : 'legend',
    SUB_LAYERS      : 'subLayers',
    PARENT_LAYER    : 'parentLayer',

    LAYERS          : 'layers',
    ANNOTATIONS     : 'annotations',
    THUMBNAIL       : 'thumbnail',

    GALLERY_ITEMS   : 'items',

    CONCEPT_SCHEME  : 'scheme'

};

const Facets = {
    TYPES           : 'types',
    THEMES          : 'themes',
    PUBLISHERS      : 'publishers',
    SERVICE_TYPES   : 'serviceTypes',
    CONCEPT_SCHEMES : 'schemes',
    VISIBILITY      : 'visibility',
    CREATED_BY      : 'createdBy',
    USED_BY         : 'usedBy.id'
};


const FIELDS_DEFAULT = [
    Fields.CREATED, Fields.MODIFIED, Fields.CREATED_BY,
    Fields.PUBLISHERS, Fields.THEMES, Fields.DESCRIPTION
];

const FACETS_DEFAULT = [
    Facets.TYPES,
    Facets.PUBLISHERS,
    Facets.SERVICE_TYPES,
    Facets.CONCEPT_SCHEMES,
    Facets.VISIBILITY,
    Facets.CREATED_BY
];

const SORT_OPTIONS_DEFAULT = [
    { value:"label,asc",       label: "Name (A-Z)"              },
    { value:"label,desc",      label: "Name (Z-A)"              },
    { value:"type,asc",        label: "Type (A-Z)"              },
    { value:"type,desc",       label: "Type (Z-A)"              },
    { value:"modified,desc",   label: "Most recently modified"  },
    { value:"modified,asc",    label: "Least recently modified" },
    { value:"_score,desc",     label: "Relevance"               }
];


class Query {

    constructor() {

        this.defaultQuery = {
            page: 0,
            size: 10,
            total: 0,
            sort: "modified,desc",
            fields: FIELDS_DEFAULT.slice(0),
            includeFacets: FACETS_DEFAULT.slice(0)
        };

        this.query = {
            page: 0,
            size: 10,
            total: 0,
            sort: "modified,desc",
            fields: FIELDS_DEFAULT.slice(0),
            includeFacets: FACETS_DEFAULT.slice(0)
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

    clone() {
        let result = new Query();
        let json = JSON.parse(JSON.stringify(this.query));
        result.applyParameters(json);
        return result;
    }


    // -----------------------------------------------------------


    parameter(name, value) {
        this.setParameter(name, value);
        return this;
    }

    setParameter (name, value) {
        if(value === null || value === undefined || //if no value was provide
            (typeof(value.push) !== 'undefined' && !value.length)) //or empty array
            delete this.query[name];
        else
            this.query[name] = value;
    }

    getParameter (key) {
        return this.query[key];
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
        this.setParameter(Parameters.QUERY, text);
    }

    getQ() {
        return this.getParameter(Parameters.QUERY);
    }


    // -----------------------------------------------------------


    keywords(text) {
        this.setKeywords(text);
        return this;
    }

    /**
     * @param {string} text - free text query
     */
    setKeywords (text) {
        if(text && typeof(text.push) === 'undefined')
            text = [text];
        this.setParameter(Parameters.KEYWORDS, text);
    }

    getKeywords() {
        return this.getParameter(Parameters.KEYWORDS);
    }


    // -----------------------------------------------------------


    uri (uri) {
        this.setUri(uri);
        return this;
    }

    setUri(uri) {
        this.setParameter(Parameters.URI, uri);
    }

    getUri() {
        return this.getParameter(Parameters.URI);
    }


    // -----------------------------------------------------------


    types(types) {
        this.setTypes(types);
        return this;
    }

    /**
     * @param {array[string]} types - name of class(es) to request
     */
    setTypes (types) {
        if(types && typeof(types.push) === 'undefined')
            types = [types];
        this.setParameter(Parameters.TYPES, types);
    }

    getTypes () {
        return this.getParameter(Parameters.TYPES);
    }


    // -----------------------------------------------------------


    createdBy(user) {
        this.setCreatedBy(user);
        return this;
    }

    /** @param {string} user - username */
    setCreatedBy (user) {
        this.setParameter(Parameters.CREATED_BY, user);
    }

    /** @return {string} username */
    getCreatedBy () {
        return this.getParameter(Parameters.CREATED_BY);
    }


    // -----------------------------------------------------------


    lastModifiedBy(user) {
        this.setLastModifiedBy(user);
        return this;
    }

    /** @param {string} user - username */
    setLastModifiedBy (user) {
        this.setParameter(Parameters.LAST_MODIFIED_BY, user);
    }

    /** @return {string} username */
    getLastModifiedBy () {
        return this.getParameter(Parameters.LAST_MODIFIED_BY);
    }


    // -----------------------------------------------------------


    /**
     * Specify a Theme or set of Themes to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.THEMES_LABEL or Parameters.THEMES_URI
     * respectively.
     * @param {array[string]} themes - string or array of strings containing theme constraint
     * @param {string} parameter - optional, to indicate the parameter to use
     * @return {Query}
     */
    themes(themes, parameter) {
        this.setThemes(themes, parameter);
        return this;
    }


    /**
     * Specify a Theme or set of Themes to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.THEMES_LABEL or Parameters.THEMES_URI
     * respectively.
     * @param {array[string]} themes - theme or themes to constrain by
     */
    setThemes (themes, parameter) {
        if(themes && typeof(themes.push) === 'undefined')
            themes = [themes];

        //clear existing
        this.setParameter(Parameters.THEMES_ID, null);
        this.setParameter(Parameters.THEMES_LABEL, null);
        this.setParameter(Parameters.THEMES_URI, null);

        let param = parameter || Parameters.THEMES_ID;
        this.setParameter(param, themes);
    }

    getThemes () {
        return this.getParameter(Parameters.THEMES_ID) ||
            this.getParameter(Parameters.THEMES_LABEL) ||
            this.getParameter(Parameters.THEMES_URI);
    }


    // -----------------------------------------------------------


    /**
     * Specify a Publisher or set of Publishers to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI
     * respectively.
     * @param {string} parameter - optional, to indicate the parameter to use
     * @return {Query}
     */
    publishers(publishers, parameter) {
        this.setPublishers(publishers, parameter);
        return this;
    }

    /**
     * Specify a Publisher or set of Publishers to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI
     * respectively.
     * @param {array[string]} publishers - publishing orgs to constrain by
     */
    setPublishers (publishers, parameter) {
        if(publishers && typeof(publishers.push) === 'undefined')
            publishers = [publishers];

        //clear existing
        this.setParameter(Parameters.PUBLISHERS_ID, null);
        this.setParameter(Parameters.PUBLISHERS_LABEL, null);
        this.setParameter(Parameters.PUBLISHERS_URI, null);

        let param = parameter || Parameters.PUBLISHERS_ID;
        this.setParameter(param, publishers);
    }

    getPublishers () {
        return this.getParameter(Parameters.PUBLISHERS_ID) ||
            this.getParameter(Parameters.PUBLISHERS_LABEL) ||
            this.getParameter(Parameters.PUBLISHERS_URI);
    }


    // -----------------------------------------------------------


    /**
     * Specify the identifier of an Agent (Community, Group, etc) that
     * uses items you wish to find in search results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.USED_BY_LABEL or Parameters.USED_BY_URI
     * respectively.
     * @param {string} parameter - optional, to indicate the parameter to use
     * @return {Query}
     */
    usedBy(ids, parameter) {
        this.setUsedBy(ids, parameter);
        return this;
    }

    /**
     * Specify the identifier of an Agent (Community, Group, etc) that
     * uses items you wish to find in search results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.USED_BY_LABEL or Parameters.USED_BY_URI
     * respectively.
     * @param {array[string]} ids - publishing orgs to constrain by
     */
    setUsedBy (ids, parameter) {
        if(ids && typeof(ids.push) === 'undefined')
            ids = [ids];

        //clear existing
        this.setParameter(Parameters.USED_BY_ID, null);
        this.setParameter(Parameters.USED_BY_LABEL, null);
        this.setParameter(Parameters.USED_BY_URI, null);

        let param = parameter || Parameters.USED_BY_ID;
        this.setParameter(param, ids);
    }

    getUsedBy () {
        return this.getParameter(Parameters.USED_BY_ID) ||
            this.getParameter(Parameters.USED_BY_LABEL) ||
            this.getParameter(Parameters.USED_BY_URI);
    }


    // -----------------------------------------------------------


    /**
     * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.SCHEMES_LABEL or Parameters.SCHEMES_URI
     * respectively.
     * @param {array[string]} schemes - schemes to constrain by
     * @param {string} parameter - optional, to indicate the parameter to use
     * @return {Query}
     */
    schemes(schemes, parameter) {
        this.setSchemes(schemes, parameter);
        return this;
    }

    /**
     * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.SCHEMES_LABEL or Parameters.SCHEMES_URI
     * respectively.
     * @param {array[string]} schemes - schemes to constrain by
     * @param {string} parameter - optional, to indicate the parameter to use
     */
    setSchemes (schemes, parameter) {
        if(schemes && typeof(schemes.push) === 'undefined')
            schemes = [schemes];

        //clear existing
        this.setParameter(Parameters.SCHEMES_ID, null);
        this.setParameter(Parameters.SCHEMES_LABEL, null);
        this.setParameter(Parameters.SCHEMES_URI, null);

        let param = parameter || Parameters.SCHEMES_ID;
        this.setParameter(param, schemes);
    }

    getSchemes() {
        return this.getParameter(Parameters.SCHEMES_ID) ||
            this.getParameter(Parameters.SCHEMES_LABEL) ||
            this.getParameter(Parameters.SCHEMES_URI);
    }


    // -----------------------------------------------------------

    /**
     *
     */
    serviceTypes(types) {
        this.setServiceTypes(types);
        return this;
    }

    /**
     * @param {array[string]} types - ids
     */
    setServiceTypes (types) {
        if(types && typeof(types.push) === 'undefined')
            types = [types];
        this.setParameter(Parameters.SERVICE_TYPES, types);
    }

    getServiceTypes () {
        return this.getParameter(Parameters.SERVICE_TYPES);
    }


    // -----------------------------------------------------------


    visibility(vis) {
        this.setVisibility(vis);
        return this;
    }

    /**
     * @param {string} visibility - one of 'public' or 'private'
     */
    setVisibility (visibility) {
        this.setParameter(Parameters.VISIBILITY, visibility);
    }

    getVisibility () {
        return this.getParameter(Parameters.VISIBILITY);
    }


    // -----------------------------------------------------------


    modified(date, beforeOrAfter) {
        this.setModified(date, beforeOrAfter);
        return this;
    }

    /**
     * @param {Date} date - date to compare against
     * @param {boolean} beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     */
    setModified (date, beforeOrAfter) {

        //if no date was supplied, consider it "unset" for both properties
        if(!date) {
            this.setParameter(Parameters.MODIFIED_BEFORE, null);
            this.setParameter(Parameters.MODIFIED_AFTER, null);
            return;
        }

        let dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
        let prop = dir ? Parameters.MODIFIED_BEFORE : Parameters.MODIFIED_AFTER;       //property being set
        let oppProp = dir ? Parameters.MODIFIED_AFTER : Parameters.MODIFIED_BEFORE;    //unset opposite property
        let arg = (date && date.getTime) ? date.getTime() : date;

        this.setParameter(oppProp, null);
        this.setParameter(prop, arg);
    }

    getModified () {
        return  this.getParameter(Parameters.MODIFIED_BEFORE) ||
                this.getParameter(Parameters.MODIFIED_AFTER);
    }


    // -----------------------------------------------------------


    created(date, beforeOrAfter) {
        this.setCreated(date, beforeOrAfter);
        return this;
    }

    /**
     * @param {Date} date - date to compare against
     * @param {boolean} beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     */
    setCreated (date, beforeOrAfter) {

        //if no date was supplied, consider it "unset" for both properties
        if(!date) {
            this.setParameter(Parameters.CREATED_BEFORE, null);
            this.setParameter(Parameters.CREATED_AFTER, null);
            return;
        }

        let dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
        let prop = dir ? Parameters.CREATED_BEFORE : Parameters.CREATED_AFTER;       //property being set
        let oppProp = dir ? Parameters.CREATED_AFTER : Parameters.CREATED_BEFORE;    //unset opposite property
        let arg = (date && date.getTime) ? date.getTime() : date;

        this.setParameter(oppProp, null);
        this.setParameter(prop, arg);
    }

    getCreated () {
        return  this.getParameter(Parameters.CREATED_BEFORE) ||
                this.getParameter(Parameters.CREATED_AFTER);
    }


    // -----------------------------------------------------------


    extent(bbox) {
        this.setExtent(bbox);
        return this;
    }

    /**
     * @param {string} bboxStr - form of "minx,miny,maxx,maxy"
     */
    setExtent (bbox) {
        if(bbox && typeof(bbox.toBboxString) !== 'undefined')
            bbox = bbox.toBboxString();
        this.setParameter(Parameters.EXTENT, bbox);
    }

    /**
     * @return {string} bbox string or null if not set
     */
    getExtent () {
        return this.getParameter(Parameters.EXTENT);
    }


    // -----------------------------------------------------------


    begins(date) {
        this.setBeginDate(date);
        return this;
    }

    setBeginDate (date) {
        if(date && date instanceof Date)
            date = date.getTime();
        this.setParameter(Parameters.BEGINS, date);
    }

    getBeginDate () {
        let date = this.getParameter(this.parameter.BEGINS);
        if(date) date = new Date(date);
        return date;
    }


    // -----------------------------------------------------------


    ends(date) {
        this.setEndDate(date);
        return this;
    }

    setEndDate (date) {
        if(date && date instanceof Date)
            date = date.getTime();
        this.setParameter(Parameters.ENDS, date);
    }

    getEndDate () {
        let date = this.getParameter(this.parameter.ENDS);
        if(date) date = new Date(date);
        return date;
    }


    // -----------------------------------------------------------


    between(begin, end) {
        this.setBetween(begin, end);
        return this;
    }

    setBetween(begin, end) {
        this.begins(begin);
        this.ends(end);
    }


    // -----------------------------------------------------------


    resourceTypes(types) {
        this.setResourceTypes(types);
        return this;
    }

    setResourceTypes(types) {
        if(types && typeof(types.push) === 'undefined')
            types = [types];
        this.setParameter(Parameters.RESOURCE_TYPE, types);
    }

    getResourceTypes() {
        return this.getParameter(Parameters.RESOURCE_TYPE);
    }


    // -----------------------------------------------------------


    facets(names) {
        this.setFacets(names);
        return this;
    }

    /*
     * @param {array[string]} names - names of facets
     */
    setFacets (names) {
        if(names && typeof(names.push) === 'undefined')
            names = [names];
        this.setParameter(Parameters.FACETS, names);
    }

    getFacets() {
        return this.getParameter(Parameters.FACETS);
    }

    /**
     * @param {string} name - name of facet to add
     */
    addFacet(name) {
        let facets = this.getFacets() || [];
        facets.push(name);
        this.setFacets(facets);
    }

    /**
     * @param {string} name - name of facet to remove
     */
    removeFacet(name) {
        let facets = this.getFacets() || [];
        let idx = facets.indexOf(name);
        if(idx>=0) {
            facets.splice(idx, 1);
            this.setFacets(facets);
        }
    }


    // -----------------------------------------------------------


    fields(fields) {
        this.setFields(fields);
        return this;
    }

    /**
     * @param {array[string]} fields - list of field names to request for each search result
     */
    setFields (fields) {
        if(fields && typeof(fields.push) === 'undefined')
            fields = [fields];
        this.setParameter(Parameters.FIELDS, fields);
    }

    getFields() {
        return this.getParameter(Parameters.FIELDS);
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

export {
    Query as default,
    Query,
    Fields,
    Facets
};
