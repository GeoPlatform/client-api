
import Config from '../shared/config';
import GPHttpClient from '../http/client';
import BaseService from './base';


class UtilsService extends BaseService {

    constructor(url : string, httpClient : GPHttpClient) {
        super(url, httpClient);
        this.setTimeout(30000);
    }

    setUrl(baseUrl : string) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl;
    }

    /**
     * @param property - optional capa property to specifically request
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving capabilities object
     */
    capabilities (property : string|null, query : any, options ?: any) : Promise<any> {

        let url = this.baseUrl + '/api/capabilities';
        if(property)
            url += '/' + property;

        return this.createAndResolvePromise( url )
        .then( (url) => {
            let opts = this.buildRequest({
                method:"GET", url:url, params:query||{}, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error getting capabilities: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.capabilities() - ' + err.message);
            throw err;
        });
    }

    /**
     * @param file
     * @param format
     * @param options
     * @return Promise
     */
    parseFile (file : any, format : string, options ?: any) : Promise<any> {

        var url = this.baseUrl + '/api/utils/parse';

        return this.createAndResolvePromise( url )
        .then( url => {

            let opts = this.buildRequest({
                method:"POST",  url:url,
                data: { format: format },
                file: file,
                formData: true,   //NodeJS (RequestJS)
                options: options
            });
            return this.execute(opts);
        })
        .then( response => response )
        .catch(e => {
            let err = new Error(`Error parsing file: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.parseFile() - ' + err.message);
            throw err;
        });
    }


    /**
     * Geolocate the specified argument to a set of candidate locations.
     * @param value - text string to geolocate (name or lat,lng)
     * @param options - optional config to send with http request
     * @return Promise resolving an array of geocoded results
     */
    locate(value : any, options ?: any) : Promise<any> {

        var url = this.baseUrl + '/api/utils/gazetteer';
        return this.createAndResolvePromise(url)
        .then( url => {
            let opts = this.buildRequest({
                method: 'GET',
                url: url,
                params: { location: value },
                options: options
            });
            return this.execute(opts);
        })
        .then(response => response)
        .catch(e => {
            let err = new Error(`Error resolving location: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.locate() - ' + err.message);
            throw err;
        });
    }


    /**
     * Upload a file to store within the GeoPlatform for association with
     * one or more portfolio Assets.
     *
     * @param file File to store
     * @param format string media type of the file being stored
     * @param options optional
     * @return Promise resolving metadata for stored content
     */
    store (file : any, format : string, options ?: any) : Promise<any> {

        var url = this.baseUrl + '/api/store';

        return this.createAndResolvePromise( url )
        .then( url => {

            let opts = this.buildRequest({
                method:"POST",
                url:url,
                data: { format: format },
                file: file,
                formData: true,   //NodeJS (RequestJS)
                options: options
            });
            return this.execute(opts);
        })
        .then( response => response )
        .catch(e => {
            let err = new Error(`Error uploading file for storage: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.store() - ' + err.message);
            throw err;
        });
    }

}

export default UtilsService;
