interface KVP<U> {
    [key: string]: U;
}
declare const Fields: KVP<string>;
declare const Facets: KVP<string>;
/**
 * Query
 *
 * Specify the "default" query constraints to use by passing in 'options.defaults = {...}';
 *
 */
declare class Query {
    query: KVP<any>;
    private defaultQuery;
    /**
     * @param options - set of initial constraints
     */
    constructor(options?: KVP<any>);
    /**
     * @return containing request-ready parameters/values
     */
    getQuery(): KVP<any>;
    /**
     * @return Query
     */
    clone(): Query;
    /**
     * @param name
     * @param value
     * @return Query this
     */
    parameter(name: string, value: any): Query;
    /**
     * @param name
     * @param value
     */
    setParameter(name: string, value: any): void;
    /**
     * @param key - name of parameter
     * @return value of parameter
     */
    getParameter(key: string): any;
    /**
     * @param obj - set of parameter/values to apply to this query
     */
    applyParameters(obj: KVP<any>): void;
    /**
     * @param facet - name of facet to set the value for as a parameter
     * @param value - value of the facet to use as the parameter's value
     */
    setFacetParameter(facet: string, value: string): void;
    /**
     * @param text
     * @return Query this
     */
    q(text: string): Query;
    /** @param text - free text query */
    setQ(text: string): void;
    /** @return */
    getQ(): string;
    keywords(text: string | string[]): Query;
    /**
     * @param text - free text query
     */
    setKeywords(text: string | string[]): void;
    getKeywords(): string[];
    uri(uri: string): Query;
    setUri(uri: string): void;
    getUri(): any;
    types(types: string | string[]): Query;
    /**
     * @param types - name of class(es) to request
     */
    setTypes(types: string | string[]): void;
    getTypes(): string[];
    createdBy(user: string): Query;
    /** @param user - username */
    setCreatedBy(user: string): void;
    /** @return username */
    getCreatedBy(): any;
    lastModifiedBy(user: string): Query;
    /** @param user - username */
    setLastModifiedBy(user: string): void;
    /** @return username */
    getLastModifiedBy(): any;
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
    themes(themes: string | string[], parameter?: string): Query;
    /**
     * Specify a Theme or set of Themes to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.THEMES_LABEL or Parameters.THEMES_URI
     * respectively.
     * @param themes - theme or themes to constrain by
     */
    setThemes(themes: string | string[], parameter?: string): void;
    getThemes(): string[];
    /**
     * Specify a Publisher or set of Publishers to constrain results. By
     * default, values are assumed to be identifiers. If using labels or uris,
     * specify the optional second parameter to be either
     * Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI respectively.
     * @param parameter - optional, to indicate the parameter to use
     * @return Query
     */
    publishers(publishers: string | string[], parameter?: string): Query;
    /**
     * Specify a Publisher or set of Publishers to constrain results. By
     * default, values are assumed to be identifiers. If using labels or uris,
     * specify the optional second parameter to be either
     * Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI respectively.
     * @param publishers - publishing orgs to constrain by
     */
    setPublishers(publishers: string | string[], parameter?: string): void;
    getPublishers(): string[];
    /**
     * Specify a Point of Contact or set of Contacts to constrain results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter to be either
     * Parameters.CONTACTS_LABEL or Parameters.CONTACTS_URI respectively.
     * @param parameter - optional, to indicate the parameter to use
     * @return Query
     */
    contacts(contacts: string | string[], parameter?: string): Query;
    /**
     * Specify a Contact or set of Contacts to constrain results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter to be either
     * Parameters.CONTACTS_LABEL or Parameters.CONTACTS_URI respectively.
     * @param contacts - publishing orgs to constrain by
     */
    setContacts(contacts: string | string[], parameter?: string): void;
    getContacts(): string[];
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
    usedBy(ids: string | string[], parameter?: string): Query;
    /**
     * Specify the identifier of an Agent (Community, Group, etc) that
     * uses items you wish to find in search results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter
     * to be either Parameters.USED_BY_LABEL or Parameters.USED_BY_URI
     * respectively.
     * @param ids - publishing orgs to constrain by
     */
    setUsedBy(ids: string | string[], parameter?: string): void;
    getUsedBy(): string[];
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
    schemes(schemes: string | string[], parameter?: string): Query;
    /**
     * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.SCHEMES_LABEL or Parameters.SCHEMES_URI
     * respectively.
     * @param schemes - schemes to constrain by
     * @param parameter - optional, to indicate the parameter to use
     */
    setSchemes(schemes: string | string[], parameter?: string): void;
    getSchemes(): string[];
    /**
     *
     */
    serviceTypes(types: string | string[]): Query;
    /**
     * @param types - ids
     */
    setServiceTypes(types: string | string[]): void;
    getServiceTypes(): string[];
    visibility(vis: "public" | "private"): Query;
    /**
     * @param visibility - one of 'public' or 'private'
     */
    setVisibility(visibility: "public" | "private"): void;
    getVisibility(): any;
    status(value: string): Query;
    /**
     * @param status - current status of Item
     */
    setStatus(value: string): void;
    getStatus(): any;
    extent(bbox: any): Query;
    /**
     * @param bbox - string form of "minx,miny,maxx,maxy", or L.LatLngBounds, or Array
     */
    setExtent(bbox: any): void;
    /**
     * @return bbox string or null if not set
     */
    getExtent(): any;
    modified(date: number | Date, beforeOrAfter: boolean): Query;
    /**
     * @param date - date to compare against
     * @param beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     */
    setModified(date: number | Date, beforeOrAfter: boolean): void;
    getModified(): Date;
    created(date: number | Date, beforeOrAfter: boolean): Query;
    /**
     * @param date - date to compare against
     * @param beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     */
    setCreated(date: number | Date, beforeOrAfter: boolean): void;
    getCreated(): Date;
    begins(date: number | Date): Query;
    setBeginDate(date: number | Date): void;
    getBeginDate(): Date;
    ends(date: number | Date): Query;
    setEndDate(date: number | Date): void;
    getEndDate(): Date;
    between(begin: number | Date, end: number | Date): Query;
    setBetween(begin: number | Date, end: number | Date): void;
    resourceTypes(types: string | string[]): Query;
    setResourceTypes(types: string | string[]): void;
    getResourceTypes(): string[];
    facets(names: string | string[]): Query;
    setFacets(names: string | string[]): void;
    getFacets(): string[];
    /**
     * @param name - name of facet to add
     */
    addFacet(name: string): void;
    /**
     * @param name - name of facet to remove
     */
    removeFacet(name: string): void;
    fields(fields: string | string[]): Query;
    /**
     * @param fields - list of field names to request for each search result
     */
    setFields(fields: string | string[]): void;
    getFields(): string[];
    /**
     * @param field - name of field to remove
     */
    addField(field: string): void;
    /**
     * @param field - name of field to remove
     */
    removeField(field: string): void;
    /**
     * @param page - page of results to fetch
     */
    page(page: number): Query;
    setPage(page: number): void;
    getPage(): number;
    nextPage(): void;
    previousPage(): void;
    /**
     * @param size - page size to request
     */
    pageSize(size: number): Query;
    setPageSize(size: number): void;
    getPageSize(): number;
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    sort(sort: string, order?: string): Query;
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    setSort(sort: string, order?: string): void;
    getSort(): string;
    getSortField(): string | null;
    getSortOrder(): string | null;
    /**
     * @return list of key-value pairs of sort options
     */
    getSortOptions(): {
        value: string;
        label: string;
    }[];
    /**
     *
     */
    clear(): void;
}
export { Query as default, Query, Fields, Facets };
