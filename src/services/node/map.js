
const Q = require('Q');
const NodeItemService = require('./item');


class NodeMapService extends NodeItemService {

    constructor(url) {
        super( url );
    }

    setUrl(baseUrl) {
        this.baseUrl = baseUrl + '/api/maps';
    }

}

module.exports = NodeMapService;
