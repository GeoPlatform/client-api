
const Q = require('q');
const NodeItemService = require('./item');


class NodeDatasetService extends NodeItemService {

    constructor(url) {
        super( url );
    }

    setUrl(baseUrl) {
        this.baseUrl = baseUrl + '/api/datasets';
    }

}

module.exports = NodeDatasetService;
