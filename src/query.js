
(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["GeoPlatform"], function(GeoPlatform) {
            return (root.Query = factory(GeoPlatform));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.Query = factory(require('GeoPlatform'))
        );
    } else {
        GeoPlatform.Query = factory(GeoPlatform);
    }
}(this||window, function(GeoPlatform) {


    class Query {
        constructor() {

            //fields list sent to MDR in order to have these properties for display in search results
            this._fields = [
                'created','modified','publishers',
                'themes','description','extent'
            ];

            //facets list sent to MDR in order to get aggregation numbers
            this._facets = [
                'types','themes','publishers', 'serviceTypes',
                'schemes', 'visibility', 'createdBy'
            ];

            this.sortOptions = [
                { value:"label,asc",       label: "Name (A-Z)"              },
                { value:"label,desc",      label: "Name (Z-A)"              },
                { value:"type,asc",        label: "Type (A-Z)"              },
                { value:"type,desc",       label: "Type (Z-A)"              },
                { value:"modified,desc",   label: "Most recently modified"  },
                { value:"modified,asc",    label: "Least recently modified" },
                { value:"_score,desc",     label: "Relevance"               }
            ];

            //list of this.query variables for mapping to parameters
            this.parameters = {
                TYPES            : 'type',
                THEMES_ID        : 'theme.id',
                THEMES_LABEL     : 'theme.label',
                THEMES_URI       : 'theme.uri',
                PUBLISHERS       : 'publisher.id',
                PUBLISHERS_LABEL : 'publisher.label',
                PUBLISHERS_URI   : 'publisher.uri',
                CREATED_BY       : 'createdBy',
                CONTRIBUTED_BY   : 'contributedBy',
                CREATOR          : 'creator.id',
                SVC_TYPES        : 'serviceType.id',
                SCHEMES_ID       : 'scheme.id',
                SCHEMES_LABEL    : 'scheme.label',
                SCHEMES_URI      : 'scheme.uri',
                VISIBILITY       : 'visibility',
                QUERY            : 'q',
                KEYWORDS         : 'keyword',
                EXTENT           : 'extent',
                MODIFIED_BEFORE  : 'modified.max',
                MODIFIED_AFTER   : 'modified.min',
                BEGINS           : 'startDate.min',
                ENDS             : 'endDate.max',
                RESOURCE_TYPE    : 'resourceType'
            };


            this.query = this.defaultQuery = {
                start: 0,
                size: 10,
                total: 0,
                sort: "modified,desc",
                fields: this._fields,
                includeFacets: this._facets
            };

        }



        getQuery() {
            let result = {};
            for(let prop in this.query) {
                let value = this.query[prop];
                if(typeof(value.push) !== 'undefined') {
                    value = value.join(',');
                }
                result[prop] = value;
            }
            return result;
        }




        parameter(name, value) {
            this.setParameter(name, value);
            return this;
        }

        setParameter (name, value) {
            this.query[name] = value;
        }

        getParameter (key) {
            return this.getParameter(ke);
        }

        applyParameters (obj) { 
            for(var p in obj) {
                if(obj.hasOwnProperty(p)) {
                    this.setParameter(p, obj[p]);
                }
            }
        }




        q(text) {
            this.setQ(text);
            return this;
        }

        /**
         * @param {string} text - free text query
         */
        setQ (text) {
            this.setParameter(this.parameters.QUERY, text);
        }

        getQ() {
            return this.getParameter(this.parameters.QUERY);
        }



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
            this.setParameter(this.parameters.KEYWORDS, text);
        }

        getKeywords() {
            return this.getParameter(this.parameters.KEYWORDS);
        }



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
            this.setParameter(this.parameters.TYPES, types);
        }

        getTypes () {
            return this.getParameter(this.parameters.TYPES);
        }



        createdBy(user) {
            this.setCreatedBy(user);
            return this;
        }

        /**
         * @param {string} user - username
         * @param {boolean} fireUpdate -
         */
        setCreatedBy (user) {
            this.setParameter(this.parameters.CREATED_BY, user);
        }

        getCreatedBy () {
            return this.getParameter(this.parameters.CREATED_BY);
        }



        themes(themes, key) {
            this.setThemes(themes);
            return this;
        }

        /**
         * @param {array[string]} themes - themes to constrain by
         * @param {string} key - optional, theme property to use
         */
        setThemes (themes, key) {
            if(themes && themes.push === 'undefined')
                themes = [themes];
            let param = this.parameters.THEMES_ID;
            if(key && 'label' === key)
                param = this.parameters.THEMES_LABEL;
            else if(key && 'uri' === key)
                param = this.parameters.THEMES_URI;
            this.setParameter(param, themes);
        }

        getThemes () {
            return this.getParameter(this.parameters.THEMES);
        }




        publishers(publishers, key) {
            this.setPublishers(publishers);
            return this;
        }

        /**
         * @param {array[string]} publishers - publishing orgs to constrain by
         * @param {string} key - optional, publisher property to use
         */
        setPublishers (publishers, key) {
            if(publishers && publishers.push === 'undefined')
                publishers = [publishers];
            let param = this.parameters.PUBLISHERS_ID;
            if(key && 'label' === key)
                param = this.parameters.PUBLISHERS_LABEL;
            else if(key && 'uri' === key)
                param = this.parameters.PUBLISHERS_URI;
            this.setParameter(param, publishers);
        }

        getPublishers () {
            return this.getParameter(this.parameters.PUBLISHERS);
        }




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
            this.setParameter(this.parameters.SERVICE_TYPES, types);
        }

        getServiceTypes () {
            return this.getParameter(this.parameters.SERVICE_TYPES);
        }




        schemes(schemes, key) {
            this.setSchemes(schemes);
            return this;
        }

        /**
         * @param {array[string]} schemes - ids
         * @param {string} key - optional, scheme property to use
         */
        setSchemes (schemes, key) {
            if(schemes && schemes.push === 'undefined')
                schemes = [schemes];
            let param = this.parameters.SCHEMES_ID;
            if(key && 'label' === key)
                param = this.parameters.SCHEMES_LABEL;
            else if(key && 'uri' === key)
                param = this.parameters.SCHEMES_URI;
            this.setParameter(param, schemes);
        }

        getSchemes() {
            return this.getParameter(this.parameters.SCHEMES);
        }



        visibility(vis) {
            this.setVisibility(vis);
            return this;
        }

        /**
         * @param {string} visibility - one of 'public' or 'private'
         * @param {boolean} fireUpdate
         */
        setVisibility (visibility) {
            this.setParameter(this.parameters.VISIBILITY, visibility);
        }

        getVisibility () {
            this.getParameter(this.parameters.VISIBILITY);
        }



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
                this.setParameter(this.parameters.MODIFIED_BEFORE, null);
                this.setParameter(this.parameters.MODIFIED_AFTER, null);
                return;
            }

            let dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
            let prop = dir ? this.parameters.MODIFIED_BEFORE : this.parameters.MODIFIED_AFTER;       //property being set
            let oppProp = dir ? this.parameters.MODIFIED_AFTER : this.parameters.MODIFIED_BEFORE;    //unset opposite property
            let arg = (date && date.getTime) ? date.getTime() : date;

            this.setParameter(oppProp, null);
            this.setParameter(prop, arg);
        }

        getModified () {
            return  this.getParameter(this.parameters.MODIFIED_BEFORE) ||
                    this.getParameter(this.parameters.MODIFIED_AFTER);
        }



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
            this.setParameter(this.parameters.EXTENT, bbox);
        }

        /**
         * @return {string} bbox string or null if not set
         */
        getExtent () {
            return this.getParameter(this.parameters.EXTENT);
        }



        begins(date) {
            this.setBegins(date);
            return this;
        }

        setBeginDate (date) {
            if(date && date instanceof Date)
                date = date.getTime();
            this.setParameter(this.parameters.BEGINS, date);
        }

        getBeginDate () {
            let date = this.getParameter(this.parameter.BEGINS);
            if(date) date = new Date(date);
            return date;
        }




        ends(date) {
            this.setEnds(date);
            return this;
        }

        setEndDate (date) {
            if(date && date instanceof Date)
                date = date.getTime();
            this.setParameter(this.parameters.ENDS, date);
        }

        getEndDate () {
            let date = this.getParameter(this.parameter.ENDS);
            if(date) date = new Date(date);
            return date;
        }




        between(begin, end) {
            this.setBetween(begin, end);
            return this;
        }

        setBetween(begin, end) {
            this.begins(begin);
            this.ends(end);
        }





        resourceTypes(types) {
            this.setResourceTypes(types);
            return this;
        }

        setResourceTypes(types) {
            if(types && types.push === 'undefined')
                types = [types];
            this.setParameter(this.parameters.RESOURCE_TYPE, types);
        }

        getResourceTypes() {
            return this.getParameter(this.parameters.RESOURCE_TYPE);
        }





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




        /**
         * @param {int} start - beginning index of results to request
         */
        start (start) {
            this.setStart(start);
            return this;
        }

        setStart(start) {
            if(isNaN(start)) return;
            this.query.start = start;
        }

        getStart() {
            return this.query.start;
        }



        /**
         * @param {int} page - page of results to fetch
         */
        page (page) {
            this.setPage(page);
            return this;
        }

        setPage(page) {
            if(isNaN(page)) return;
            this.query.start = page * this.query.size;
        }

        getPage() {
            return this.query.start;
        }



        /**
         * @param {int} size - page size to request
         */
        pageSize (size) {
            this.setPageSize(size);
            return this;
        }

        setPageSize (size) {
            if(isNaN(size)) return;
            this.query.size = size;

            //find out which page in the new scheme the current first-result of current page
            // will show up in, and set start so that it shows up with the new page size
            var page = Math.floor(this.query.start*1 / this.query.size*1);
            this.query.start = page * (this.query.size*1);
        }

        getPageSize() {
            return this.query.size;
        }



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
            return this.sortOptions.slice(0);
        }


        /**
         *
         */
        clear () {
            this.query = this.defaultQuery;
        }
    }

    return Query;

}));
