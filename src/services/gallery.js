
import Q from 'q';
import ItemService from './item';

/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */

class GalleryService extends ItemService {

    constructor(url, httpClient) {
        super(url, httpClient);
    }

    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/galleries';
    }

    addItem (galleryId, itemObj, options) {
        return Q.resolve( true )
        .then( () => {
            let url = this.baseUrl + '/' + galleryId + '/items';
            let opts = this.buildRequest({
                method:'POST', url:url, data: itemObj, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error("GalleryService.addItem() - Error adding item: " + e.message);
            return Q.reject(err);
        });
    }

    removeItem( galleryId, itemId, options) {
        return Q.resolve( this.baseUrl + '/' + galleryId + '/items/' + itemId )
        .then( url => {
            let opts = this.buildRequest({
                method:'DELETE', url:url, options:options
            });
            return this.execute(opts);
        })
        .then(response=>true)
        .catch(e => {
            let err = new Error("GalleryService.addItem() - Error adding item: " + e.message);
            return Q.reject(err);
        });
    }

}

export default GalleryService;
