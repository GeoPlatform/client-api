
const Q = require('Q');
const NodeItemService = require('./item');


class NodeGalleryService extends NodeItemService {

    constructor(url) {
        super( url );
    }

    setUrl(baseUrl) {
        this.baseUrl = baseUrl + '/api/galleries';
    }

    addItem (galleryId, itemObj, options) {
        return Q.resolve( true )
        .then( () => {
            let url = this.baseUrl + '/' + galleryId + '/items';
            let opts = this.buildRequest('POST', url, itemObj, options);
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error("NodeGalleryService.addItem() - Error adding item: " + e.message);
            return Q.reject(err);
        })
    }

    removeItem( galleryId, itemId, options) {
        return Q.resolve( this.baseUrl + '/' + galleryId + '/items/' + itemId )
        .then( url => {
            let opts = this.buildRequest('DELETE', url, null, options);
            return this.execute(opts);
        })
        .then(response=>true)
        .catch(e => {
            let err = new Error("NodeGalleryService.addItem() - Error adding item: " + e.message);
            return Q.reject(err);
        })
    }

}

module.exports = NodeGalleryService;
