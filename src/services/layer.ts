

import ItemService from './item';
import GPHttpClient from '../http/client';

/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */

class LayerService extends ItemService {

    constructor(url : string, httpClient : GPHttpClient) {
        super(url, httpClient);
    }

    setUrl(baseUrl : string) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/layers';
    }

    /**
     * @param id - GeoPlatform Layer identifier
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving style JSON object
     */
    style (id : string, options ?: any) : Promise<any> {
        return Promise.resolve( id )
        .then( (id) => {

            let url = this.baseUrl + '/' + id + '/style';
            let opts = this.buildRequest({
                method:"GET", url:url, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error fetching style: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.style() - ' + err.message);
            return Promise.reject(err);
        });
    }

    /**
     * @param id - GeoPlatform Layer identifier
     * @param req identifying extent, x, y
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving feature JSON object
     */
    describe( id : string, req : any, options ?: any ) : Promise<any> {

        return Promise.resolve( req )
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
            let err = new Error(`Error describing layer feature: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.describe() - ' + err.message);
            return Promise.reject(err);
        });
    }

    /**
     * @param id - GeoPlatform Layer identifier
     * @param params describing layer request to validate
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving empty if successful or a message if failed
     */
    validate(id : string, params : any, options ?: any) : Promise<any> {

        return Promise.resolve( params )
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
            let err = new Error(`Error validating layer request: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.describe() - ' + err.message);
            return Promise.reject(err);
        });
    }

}

export default LayerService;
