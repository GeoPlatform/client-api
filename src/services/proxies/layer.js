

import Q from 'q';
import NodeHttpClient from '../../http/node';
import LayerService from "../layer";
import Config from '../../shared/config';
import ServiceProxy from "./base";

/**
 *
 */
function bindRoutes(router, options) {

    let paths = options.paths || {};

    options.pathBaseDefault = "layers";
    ServiceProxy.bindRoutes(router, options);

    if(paths.style !== false) {
        router.get('/' + (paths.style||"layers/:id/style"), (req, res, next) => {
            ServiceProxy.getService(req, true, options)
            .style(req.params.id)
            .then( result => res.json(result) )
            .catch(next);
        });
    }

    if(paths.describe !== false) {
        router.post('/' + (paths.describe||"layers/:id/describe"), (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .describe(req.params.id, req.body)
            .then( result => res.json(result) )
            .catch(next);
        });
    }

    if(paths.validate !== false) {
        router.post('/' + (paths.validate||"layers/:id/validate"), (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .validate(req.params.id, req.body)
            .then( result => res.json(result) )
            .catch(next);
        });
    }

}


/**
 *
 * Example:
 *
 *   const Logger = require('./logger');
 *
 *   //define GP API Client config options before creating proxy
 *   const Config = require('geoplatform.client');
 *   Config.configure( {
 *     timeout: 20000,
 *     ualUrl: 'https://ual.geoplatform.gov'
 *   });
 *
 *   //optionally, define parent router
 *   router = require('express').Router();
 *   router.use('/api', LayerServiceProxy({
 *     logger: Logger,
 *     debug: true,
 *     //optionally, provide router instance
 *     router: require('express').Router()
 *   }));
 *
 */
function LayerServiceProxy( options ) {

    if(typeof(options) === 'undefined') {
        options = {};
    };

    let router = options.router;
    if(!options.router) {
        let express = require('express');
        if(!express) {
            throw new Error("LayerServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }

    if(!router) throw new Error("LayerServiceProxy() - " +
        "Unable to create proxy route, missing router");

    options.serviceClass = LayerService;
    bindRoutes(router, options);

    return router;
}

export default LayerServiceProxy;
