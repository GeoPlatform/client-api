
const Q = require('q');
const NodeItemService = require('./item');


class NodeLayerService extends NodeItemService {

    constructor(url) {
        super( url );
    }

    setUrl(baseUrl) {
        this.baseUrl = baseUrl + '/api/layers';
    }

    /**
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving style JSON object
     */
    style (options) {
        return Q.resolve( true )
        .then( () => {

            let url = this.baseUrl + '/' + id + '/style';
            let opts = this.buildRequest("GET", url, null, options);
            return this.execute(opts);
        })
        .then( response => response.body )
        .catch(e => {
            let err = new Error(`NodeLayerService.save() - Error deleting item: ${e.message}`);
            return Q.reject(err);
        });
    }

    /**
     * @param {Object} req identifying extent, x, y
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving feature JSON object
     */
    describe( req, options ) {

        return Q.resolve( true )
        .then( () => {

            if(!req) {
                throw new Error("Must provide describe req");
            }

            let keys = ['bbox', 'height', 'width', 'x', 'y'];
            let missing = keys.find(key => !req[key]);
            if(missing) {
                throw new Error(`Must specify ${missing} in describe req`);
            }

            let params = {
                srs         : 'EPSG:4326',
                bbox        : req.bbox,
                height      : req.height,
                width       : req.width,
                info_format : 'text/xml',
                x           : req.x,
                y           : req.y,
                i           : req.x, //WMS 1.3.0
                j           : req.y  //WMS 1.3.0
            };

            let url = this.baseUrl + '/' + id + '/describe';
            let opts = this.buildRequest("GET", url, params, options);
            return this.execute(opts);
        })
        .then( response => response.body )
        .catch(e => {
            let err = new Error(`NodeLayerService.describe() -
                Error describing layer feature: ${e.message}`);
            return Q.reject(err);
        });
    }

}

module.exports = NodeLayerService;
