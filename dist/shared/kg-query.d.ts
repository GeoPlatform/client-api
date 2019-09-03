interface KVP<U> {
    [key: string]: U;
}
declare class KGQuery {
    query: KVP<any>;
    private defaultQuery;
    constructor(options?: KVP<any>);
    getQuery(): KVP<any>;
    parameter(name: string, value: any): KGQuery;
    setParameter(name: string, value: any): void;
    getParameter(key: string): any;
    applyParameters(obj: KVP<any>): void;
    q(text: string): KGQuery;
    /**
     * @param text - free text query
     */
    setQ(text: string): void;
    getQ(): string | null;
    /**
     * @param types - KG classifiers for which concepts should be returned
     */
    classifiers(types: string | string[]): KGQuery;
    /**
     * @param types - KG classifiers for which concepts should be returned
     */
    setClassifiers(types: string | string[]): void;
    /**
     * @return KG classifiers for which concepts should be returned
     */
    getClassifiers(): string[];
    /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.types()
     * query parameter (they map to different HTTP request parameters).
     * @param objTypes - Item object type names
     */
    types(objTypes: string | string[]): KGQuery;
    /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.setTypes()
     * query parameter (they map to different HTTP request parameters).
     * @param objTypes - Item object type names
     */
    setTypes(objTypes: string | string[]): void;
    /**
     * Get the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.getTypes()
     * query parameter (they map to different HTTP request parameters).
     * @return Item object type names
     */
    getTypes(): string[];
    /**
     * @param page - page of results to fetch
     */
    page(page: number): KGQuery;
    setPage(page: number): void;
    getPage(): number;
    nextPage(): void;
    previousPage(): void;
    /**
     * @param size - page size to request
     */
    pageSize(size: number): KGQuery;
    setPageSize(size: number): void;
    getPageSize(): number;
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    sort(sort: string, order?: string): KGQuery;
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    setSort(sort: string, order?: string): void;
    getSort(): string | null;
    getSortField(): string | null;
    getSortOrder(): boolean;
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
export default KGQuery;
