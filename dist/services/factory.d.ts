import GPHttpClient from '../http/client';
/**
 * @param arg - string type or object with type property
 * @param baseUrl - base endpoint of GeoPlatform API
 * @return ItemService
 */
declare const ServiceFactory: (arg: any, baseUrl: string, httpClient: GPHttpClient) => any;
export default ServiceFactory;
