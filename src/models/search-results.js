


class SearchResults {

    constructor(data) {
        this._data = {
            totalResults: 0,
            results: []
        };
        if(data) {
            this._data.totalResults = data.totalResults || 0;
            this._data.results = data.results || [];
        }
    }

    getTotalResults() { return this._data.totalResults; }

    getItems() { return this._data.results; }

}

export default SearchResults;
