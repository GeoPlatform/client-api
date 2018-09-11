

import Q from 'q';
import NodeHttpClient from '../../http/node';
import UtilsService from "../utils";
import Config from '../../shared/config';
import ServiceProxy from "./base";


const DEFAULT_PATHS = {
    locate: "utils/locate",
    parseFile: "utils/parse",
    capabilities: "utils/capabilities",
    capabilitiesProperty: "utils/capabilities/:id"
}


/**
 *
 */
function bindRoutes(router, options) {

    let paths = options.paths || {};

    options.serviceClass = UtilsService;

    if(paths.locate !== false) {
        let path = '/' + ( paths.locate || DEFAULT_PATHS.locate );
        router.get(path, (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .locate(req.query.q)
            .then( response => res.json(response) )
            .catch(next);
        });
    }

    if(paths.parseFile !== false) {
        let path = '/' + ( paths.parseFile || DEFAULT_PATHS.parseFile );
        router.post(path, (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .parseFile(req.files.file, req.body.format)
            .then( result => res.json(result) )
            .catch(next);
        });
    }

    if(paths.capabilities !== false) {
        let path = '/' + ( paths.capabilities || DEFAULT_PATHS.capabilities );
        router.get(path, (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .capabilities(null, req.query)
            .then( result => res.json(result) )
            .catch(next);
        });
    }

    if(paths.capabilitiesProperty !== false) {
        let path = '/' + ( paths.capabilitiesProperty || DEFAULT_PATHS.capabilitiesProperty );
        router.get(path, (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .capabilities(req.params.id, req.query)
            .then( result => res.json(result) )
            .catch(next);
        });
    }

}


/**
 *
 */
function UtilsServiceProxy( options ) {

    if(typeof(options) === 'undefined') {
        options = {};
    };

    let router = options.router;
    if(!options.router) {
        let express = require('express');
        if(!express) {
            throw new Error("UtilsServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }

    if(!router) throw new Error("UtilsServiceProxy() - " +
        "Unable to create proxy route, missing router");

    bindRoutes(router, options);

    return router;
}

export default UtilsServiceProxy;
