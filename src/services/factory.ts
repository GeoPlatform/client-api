
import GPHttpClient from '../http/client';
import ItemTypes from '../shared/types';
import ItemService from './item';
import LayerService from './layer';
import ServiceService from './service';
import GalleryService from './gallery';
import DatasetService from './dataset';
import MapService from './map';

/**
 * @param arg - string type or object with type property
 * @param baseUrl - base endpoint of GeoPlatform API
 * @return ItemService
 */
const ServiceFactory = function(arg : any, baseUrl : string, httpClient : GPHttpClient) : any {
    let type = (typeof(arg) === 'string') ?
        arg : (arg && arg.type ? arg.type : null);
    if(!type) throw new Error("Must provide a type or object with a type specified");
    if(!baseUrl) throw new Error("Must provide a base url");
    if(!httpClient) throw new Error("Must provide an http client to use to make requests");
    switch(type) {
        case ItemTypes.LAYER:   return new LayerService(  baseUrl, httpClient);
        case ItemTypes.SERVICE: return new ServiceService(baseUrl, httpClient);
        case ItemTypes.MAP:     return new MapService(    baseUrl, httpClient);
        case ItemTypes.GALLERY: return new GalleryService(baseUrl, httpClient);
        case ItemTypes.DATASET: return new DatasetService(baseUrl, httpClient);
        default:                return new ItemService(   baseUrl, httpClient);
    }
};

export default ServiceFactory;
