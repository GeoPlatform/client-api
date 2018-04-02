

import Q from 'q';
import ItemService from './item';

/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate Community objects.
 *
 * @see GeoPlatform.ItemService
 */

class CommunityService extends ItemService {

    constructor(url, httpClient) {
        super(url, httpClient);
    }

    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/communities';
    }

}

export default CommunityService;
