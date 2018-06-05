

import Q from 'q';
import ItemService from './item';

/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */

class LayerService extends ItemService {

    constructor(url, httpClient) {
        super(url, httpClient);
    }

    setUrl(baseUrl) {
        super.setUrl(baseUrl);
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
            let opts = this.buildRequest({
                method:"GET", url:url, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`LayerService.style() - Error fetching style: ${e.message}`);
            this.logError(err);
            return Q.reject(err);
        });
    }

    /**
     * @param {string} id - GeoPlatform Layer identifier
     * @param {Object} req identifying extent, x, y
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving feature JSON object
     */
    describe( id, req, options ) {

        return Q.resolve( req )
        .then( (req) => {

            if(!req) {
                throw new Error("Must provide describe parameters to use");
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
            let opts = this.buildRequest({
                method:"GET", url:url, params:params, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`LayerService.describe() - Error describing layer feature: ${e.message}`);
            this.logError(err);
            return Q.reject(err);
        });
    }

    /**
     * @param {string} id - GeoPlatform Layer identifier
     * @param {Object} params describing layer request to validate
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving empty if successful or a message if failed
     */
    validate(id, params, options) {

        return Q.resolve( params )
        .then( params => {

            if(!params) {
                throw new Error("Must provide parameters to use in layer validation");
            }

            let url = this.baseUrl + '/' + id + '/validate';
            let opts = this.buildRequest({
                method:"GET", url:url, params:params, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`LayerService.describe() - Error describing layer feature: ${e.message}`);
            this.logError(err);
            return Q.reject(err);
        });
    }

}

export default LayerService;
