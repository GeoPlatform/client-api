
(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['QueryParameters','QueryFacets'], function(QueryParameters, QueryFacets) {
            return (root.Query = factory(QueryParameters, QueryFacets));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.Query = factory(
                require('./parameters'),
                require('./facets')
            )
        );
    } else {
        GeoPlatform.Query = factory(GeoPlatform.QueryParameters, GeoPlatform.QueryFacets);
    }
}(this||window, function(QueryParameters, QueryFacets) {

    const FIELDS_DEFAULT = [
        'created','modified','createdBy','publishers','themes','description'
    ];

    const FACETS_DEFAULT = [
        QueryFacets.TYPES,
        QueryFacets.PUBLISHERS,
        QueryFacets.SERVICE_TYPES,
        QueryFacets.CONCEPT_SCHEMES,
        QueryFacets.VISIBILITY,
        QueryFacets.CREATED_BY
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


        keywords(text) {
            this.setQ(text);
            return this;
        }

        /**
         * @param {string} text - free text query
         */
        setKeywords (text) {
            if(text && typeof(text.push) !== 'undefined')
                text = text.join(',');
            this.setParameter(QueryParameters.KEYWORDS, text);
        }

        getKeywords() {
            return this.getParameter(QueryParameters.KEYWORDS);
        }


        // -----------------------------------------------------------


        uri (uri) {
            this.setUri(uri);
            return this;
        }

        setUri(uri) {
            this.setParameter(QueryParameters.URI, uri);
        }

        getUri() {
            return this.getParameter(QueryParameters.URI);
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
            if(types && types.push === 'undefined')
                types = [types];
            this.setParameter(QueryParameters.TYPES, types);
        }

        getTypes () {
            return this.getParameter(QueryParameters.TYPES);
        }


        // -----------------------------------------------------------


        createdBy(user) {
            this.setCreatedBy(user);
            return this;
        }

        /**
         * @param {string} user - username
         * @param {boolean} fireUpdate -
         */
        setCreatedBy (user) {
            this.setParameter(QueryParameters.CREATED_BY, user);
        }

        getCreatedBy () {
            return this.getParameter(QueryParameters.CREATED_BY);
        }


        // -----------------------------------------------------------


        /**
         * Specify a Theme or set of Themes to constrain results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either QueryParameters.THEMES_LABEL or QueryParameters.THEMES_URI
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
         * to be either QueryParameters.THEMES_LABEL or QueryParameters.THEMES_URI
         * respectively.
         * @param {array[string]} themes - theme or themes to constrain by
         */
        setThemes (themes, parameter) {
            if(themes && themes.push === 'undefined')
                themes = [themes];

            //clear existing
            this.setParameter(QueryParameters.THEMES_ID, null);
            this.setParameter(QueryParameters.THEMES_LABEL, null);
            this.setParameter(QueryParameters.THEMES_URI, null);

            let param = parameter || QueryParameters.THEMES_ID;
            this.setParameter(param, themes);
        }

        getThemes () {
            return this.getParameter(QueryParameters.THEMES_ID) ||
                this.getParameter(QueryParameters.THEMES_LABEL) ||
                this.getParameter(QueryParameters.THEMES_URI);
        }


        // -----------------------------------------------------------


        /**
         * Specify a Publisher or set of Publishers to constrain results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either QueryParameters.PUBLISHERS_LABEL or QueryParameters.PUBLISHERS_URI
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
         * to be either QueryParameters.PUBLISHERS_LABEL or QueryParameters.PUBLISHERS_URI
         * respectively.
         * @param {array[string]} publishers - publishing orgs to constrain by
         */
        setPublishers (publishers, parameter) {
            if(publishers && publishers.push === 'undefined')
                publishers = [publishers];

            //clear existing
            this.setParameter(QueryParameters.PUBLISHERS_ID, null);
            this.setParameter(QueryParameters.PUBLISHERS_LABEL, null);
            this.setParameter(QueryParameters.PUBLISHERS_URI, null);

            let param = parameter || QueryParameters.PUBLISHERS_ID;
            this.setParameter(param, publishers);
        }

        getPublishers () {
            return this.getParameter(QueryParameters.PUBLISHERS_ID) ||
                this.getParameter(QueryParameters.PUBLISHERS_LABEL) ||
                this.getParameter(QueryParameters.PUBLISHERS_URI);
        }


        // -----------------------------------------------------------


        /**
         * Specify the identifier of an Agent (Community, Group, etc) that
         * uses items you wish to find in search results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either QueryParameters.USED_BY_LABEL or QueryParameters.USED_BY_URI
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
         * to be either QueryParameters.USED_BY_LABEL or QueryParameters.USED_BY_URI
         * respectively.
         * @param {array[string]} ids - publishing orgs to constrain by
         */
        setUsedBy (ids, parameter) {
            if(ids && ids.push === 'undefined')
                ids = [ids];

            //clear existing
            this.setParameter(QueryParameters.USED_BY_ID, null);
            this.setParameter(QueryParameters.USED_BY_LABEL, null);
            this.setParameter(QueryParameters.USED_BY_URI, null);

            let param = parameter || QueryParameters.USED_BY_ID;
            this.setParameter(param, ids);
        }

        getUsedBy () {
            return this.getParameter(QueryParameters.USED_BY_ID) ||
                this.getParameter(QueryParameters.USED_BY_LABEL) ||
                this.getParameter(QueryParameters.USED_BY_URI);
        }


        // -----------------------------------------------------------


        /**
         * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either QueryParameters.SCHEMES_LABEL or QueryParameters.SCHEMES_URI
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
         * to be either QueryParameters.SCHEMES_LABEL or QueryParameters.SCHEMES_URI
         * respectively.
         * @param {array[string]} schemes - schemes to constrain by
         * @param {string} parameter - optional, to indicate the parameter to use
         */
        setSchemes (schemes, parameter) {
            if(schemes && schemes.push === 'undefined')
                schemes = [schemes];

            //clear existing
            this.setParameter(QueryParameters.SCHEMES_ID, null);
            this.setParameter(QueryParameters.SCHEMES_LABEL, null);
            this.setParameter(QueryParameters.SCHEMES_URI, null);

            let param = parameter || QueryParameters.SCHEMES_ID;
            this.setParameter(param, schemes);
        }

        getSchemes() {
            return this.getParameter(QueryParameters.SCHEMES) ||
                this.getParameter(QueryParameters.SCHEMES_LABEL) ||
                this.getParameter(QueryParameters.SCHEMES_URI);
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
            if(types && types.push === 'undefined')
                types = [types];
            this.setParameter(QueryParameters.SERVICE_TYPES, types);
        }

        getServiceTypes () {
            return this.getParameter(QueryParameters.SERVICE_TYPES);
        }


        // -----------------------------------------------------------


        visibility(vis) {
            this.setVisibility(vis);
            return this;
        }

        /**
         * @param {string} visibility - one of 'public' or 'private'
         * @param {boolean} fireUpdate
         */
        setVisibility (visibility) {
            this.setParameter(QueryParameters.VISIBILITY, visibility);
        }

        getVisibility () {
            this.getParameter(QueryParameters.VISIBILITY);
        }


        // -----------------------------------------------------------


        modified(date, beforeOrAfter) {
            this.setModified(date, beforeOrAfter);
            return this;
        }

        /**
         * @param {Date} date - date to compare against
         * @param {boolean} beforeOrAfter - flag specifying which boundary condition (true = before, false = after)
         * @param {boolean} fireUpdate - flag specifying whether to trigger update automatically
         */
        setModified (date, beforeOrAfter) {

            //if no date was supplied, consider it "unset" for both properties
            if(!date) {
                this.setParameter(QueryParameters.MODIFIED_BEFORE, null);
                this.setParameter(QueryParameters.MODIFIED_AFTER, null);
                return;
            }

            let dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
            let prop = dir ? QueryParameters.MODIFIED_BEFORE : QueryParameters.MODIFIED_AFTER;       //property being set
            let oppProp = dir ? QueryParameters.MODIFIED_AFTER : QueryParameters.MODIFIED_BEFORE;    //unset opposite property
            let arg = (date && date.getTime) ? date.getTime() : date;

            this.setParameter(oppProp, null);
            this.setParameter(prop, arg);
        }

        getModified () {
            return  this.getParameter(QueryParameters.MODIFIED_BEFORE) ||
                    this.getParameter(QueryParameters.MODIFIED_AFTER);
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
            this.setParameter(QueryParameters.EXTENT, bbox);
        }

        /**
         * @return {string} bbox string or null if not set
         */
        getExtent () {
            return this.getParameter(QueryParameters.EXTENT);
        }


        // -----------------------------------------------------------


        begins(date) {
            this.setBeginDate(date);
            return this;
        }

        setBeginDate (date) {
            if(date && date instanceof Date)
                date = date.getTime();
            this.setParameter(QueryParameters.BEGINS, date);
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
            this.setParameter(QueryParameters.ENDS, date);
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
            if(types && types.push === 'undefined')
                types = [types];
            this.setParameter(QueryParameters.RESOURCE_TYPE, types);
        }

        getResourceTypes() {
            return this.getParameter(QueryParameters.RESOURCE_TYPE);
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
            this.query.includeFacets = names;
        }

        getFacets() {
            return this.query.includeFacets;
        }

        /**
         * @param {string} name - name of facet to add
         */
        addFacet(name) {
            let facets = (this.getFacets()||[]).push(name);
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
            this.query.fields = fields;
        }

        getFields() {
            return this.query.fields;
        }


        // // -----------------------------------------------------------
        //
        //
        // /**
        //  * @param {int} start - beginning index of results to request
        //  */
        // start (start) {
        //     this.setStart(start);
        //     return this;
        // }
        //
        // setStart(start) {
        //     if(isNaN(start)) return;
        //     this.query.start = start*1;
        // }
        //
        // getStart() {
        //     return this.query.start;
        // }


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

    return Query;

}));
