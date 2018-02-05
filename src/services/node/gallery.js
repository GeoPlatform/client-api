
const Q = require('Q');
const NodeItemService = require('./item');


class NodeGalleryService extends NodeItemService {

    constructor(url) {
        super( url );
    }

    setUrl(baseUrl) {
        this.baseUrl = baseUrl + '/api/galleries';
    }

}

module.exports = NodeGalleryService;
