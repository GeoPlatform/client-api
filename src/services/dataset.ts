
import ItemService from './item';
import GPHttpClient from '../http/client';

/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */

class DatasetService extends ItemService {

    constructor(url : string, httpClient : GPHttpClient) {
        super(url, httpClient);
    }

    setUrl(baseUrl : string) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/datasets';
    }

}

export default DatasetService;
