

/**
 * Search Results
 *
 * Class describing a set of search results, containing zero or more Item results
 * and zero or more faceted results.
 *
 * Usage:
 *   service.search(query).then( results => {
 *      if(results.getTotalResults() > 0) {
 *          results.getItems().map(item=>item.getLabel()).join(", ");
 *      }
 *      let facet = results.getFacet(QueryFacets.THEMES);
 *   });
 */
class SearchResults {

    constructor(data) {
        this._data = {
            totalResults: 0,
            results: [],
            facets: []
        };
        if(data) {
            this._data.totalResults = data.totalResults || 0;
            if(data.results)
                this._data.results = data.results;
            if(data.facets)
                this._data.facets = data.facets;
        }
    }

    getTotalResults() { return this._data.totalResults; }

    getItems() { return this._data.results; }

    /**
     * @param {number} index - position of the search result item to retrieve
     * @return {Item} in results or null if position is out of bounds
     */
    getItemAt(index) {
        if(this._data.results && this._data.results.length >= index)
            return this._data.results[index];
        return null;
    }

    getFacets() { return this._data.facets; }

    /**
     * @param {string} name - Name of the facet to retrieve
     * @return {Object} defining the facet or null if not present
     */
    getFacet(name) {
        if(this._data.facets && this._data.facets.length) {
            let facets = this._data.facets.filter(f=>f.name===name);
            if(facets && facets.length)
                return facets[0];
        }
        return null;
    }

}

export default SearchResults;
