
const Q = require('Q');
const fs = require('fs');
const request = require('request');
// require('request-debug')(request);

const NodeItemService = require('./item');

const METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];


class NodeUtilsService extends NodeItemService {

    constructor(url) {
        super(url);
    }

    setUrl(baseUrl) {
        this.baseUrl = baseUrl;
    }


    /**
     * @param {string} property - optional capa property to specifically request
     * @param {Object} query - optional query parameters to include with request
     * @param {Object} options - optional config to send with http request
     * @return {Promise} resolving capabilities object
     */
    capabilities (property, query, options) {

        let url = this.baseUrl + '/api/capabilities';
        if(property)
            url += '/' + property;

        return Q.resolve( url )
        .then( (url) => {
            let opts = this.buildRequest("GET", url, query||{}, options);
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`NodeUtilsService.capabilities() - Error getting capabilities: ${e.message}`);
            return Q.reject(err);
        });
    }

    /**
     * @param {File} file
     * @param {string} format
     * @param {Object} options
     * @return {Promise}
     */
    parseFile (file, format, options) {

        var url = this.baseUrl + '/api/utils/parse';

        return Q.resolve( url )
        .then( url => {

            var formData = {
                file: {
                    value:  fs.createReadStream(file.path),
                    options: { filename: file.originalFilename }
                },
                format: format || 'iso19139'
            };

            let opts = this.buildRequest("POST", url, formData, options);
            opts.formData = formData;
            delete opts.body;
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`NodeUtilsService.parseFile() - Error parsing file: ${e.message}`);
            return Q.reject(err);
        });

    }






    get () { return Q.reject(new Error("Not supported on NodeUtilsService")) }

    save () { return Q.reject(new Error("Not supported on NodeUtilsService")) }

    remove () { return Q.reject(new Error("Not supported on NodeUtilsService")) }

    patch () { return Q.reject(new Error("Not supported on NodeUtilsService")) }

    search () { return Q.reject(new Error("Not supported on NodeUtilsService")) }

    import () { return Q.reject(new Error("Not supported on NodeUtilsService")) }

    exportItem () { return Q.reject(new Error("Not supported on NodeUtilsService")) }

    getUri () { return Q.reject(new Error("Not supported on NodeUtilsService")) }

}


module.exports = NodeUtilsService;
