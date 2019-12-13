
import ItemService from './item';
import GPHttpClient from '../http/client';

/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */

class GalleryService extends ItemService {

    constructor(url : string, httpClient : GPHttpClient) {
        super(url, httpClient);
    }

    setUrl(baseUrl : string) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/galleries';
    }

    addItem (galleryId : string, itemObj : any, options ?: any) : Promise<any> {
        return this.createAndResolvePromise( true )
        .then( () => {
            let url = this.baseUrl + '/' + galleryId + '/items';
            let opts = this.buildRequest({
                method:'POST', url:url, data: itemObj, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error("Error adding item: " + e.message);
            Object.assign(err, e);
            this.logError('GalleryService.addItem() - ' + err.message);
            throw err;
        });
    }

    removeItem( galleryId : string, itemId : any, options ?: any) : Promise<any> {
        return this.createAndResolvePromise( this.baseUrl + '/' + galleryId + '/items/' + itemId )
        .then( url => {
            let opts = this.buildRequest({
                method:'DELETE', url:url, options:options
            });
            return this.execute(opts);
        })
        .then( () =>true)
        .catch(e => {
            let err = new Error("Error adding item: " + e.message);
            Object.assign(err, e);
            this.logError('GalleryService.addItem() - '+ err.message);
            throw err;
        });
    }

}

export default GalleryService;
