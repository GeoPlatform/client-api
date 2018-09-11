

import Q from 'q';
import NodeHttpClient from '../../http/node';
import UtilsService from "../utils";
import Config from '../../shared/config';
import ServiceProxy from "./base";

/**
 *
 */
function bindRoutes(router, options) {

    let paths = options.paths || {};

    options.serviceClass = UtilsService;

    if(paths.locate !== false) {
        router.get('/' + (paths.locate||"utils/locate"), (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .locate(req.query.q)
            .then( response => res.json(response) )
            .catch(next);
        });
    }

    if(paths.parseFile !== false) {
        router.post('/' + (paths.parseFile||"utils/parse"), (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .parseFile(req.files.file, req.body.format)
            .then( result => res.json(result) )
            .catch(next);
        });
    }

    if(paths.capabilities !== false) {
        router.get('/' + (paths.capabilities||"utils/capabilities"), (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .capabilities(null, req.query)
            .then( result => res.json(result) )
            .catch(next);
        });
        router.get('/' + (paths.capabilities||"utils/capabilities/:id"), (req, res, next) => {
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
