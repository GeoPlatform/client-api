

import Q from 'q';
import NodeHttpClient from '../../http/node';
import ServiceService from "../service";
import Config from '../../shared/config';
import ServiceProxy from "./base";

const DEFAULT_PATHS = {
    types: "serviceTypes",
    import: "services/import",
    about: "services/:id/about",
    harvest: "services/:id/harvest",
    test: "services/:id/test",
    statistics: "services/:id/statistics"
};

/**
 *
 */
function bindRoutes(router, options) {

    let paths = options.paths || {};

    options.pathBaseDefault = "services";
    options.serviceClass = ServiceService;
    ServiceProxy.bindRoutes(router, options);


    if(paths.types !== false) {
        let path = '/' + ( paths.types || DEFAULT_PATHS.types );
        router.get(path, (req, res, next) => {
            console.log("Service Types");
            ServiceProxy.getService(req, false, options)
            .types()
            .then( result => { res.json(result) })
            .catch( next );
        });
    }

    if(paths.import !== false) {
        let path = '/' + ( paths.import || DEFAULT_PATHS.import );
        router.post(path, (req, res, next) => {
            ServiceProxy.getService(req, true, options)
            .import(req.body)
            .then( result => res.json(result) )
            .catch(next);
        });
    }

    if(paths.about !== false) {
        let path = '/' + ( paths.about || DEFAULT_PATHS.about );
        router.get(path, (req, res, next) => {
            let svc = ServiceProxy.getService(req, false, options);
            svc.get(req.params.id)
            .then( service => svc.about(service) )
            .then( result => res.json(result) )
            .catch(next);
        });
    }

    if(paths.harvest !== false) {
        let path = '/' + ( paths.harvest || DEFAULT_PATHS.harvest );
        router.get(path, (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .harvest(req.params.id)
            .then( result => res.json(result) )
            .catch(next);
        });
    }

    if(paths.test !== false) {
        let path = '/' + ( paths.test || DEFAULT_PATHS.test );
        router.get(path, (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .liveTest(req.params.id)
            .then( result => { res.json(result) })
            .catch(next);
        });
    }

    if(paths.statistics !== false) {
        let path = '/' + ( paths.statistics || DEFAULT_PATHS.statistics );
        router.get(path, (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .statistics(req.params.id)
            .then( result => { res.json(result) })
            .catch( next );
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
 *   router.use('/api', ServiceServiceProxy({
 *     logger: Logger,
 *     debug: true,
 *     //optionally, provide router instance
 *     router: require('express').Router()
 *   }));
 *
 */
function ServiceServiceProxy( options ) {

    if(typeof(options) === 'undefined') {
        options = {};
    };

    let router = options.router;
    if(!options.router) {
        let express = require('express');
        if(!express) {
            throw new Error("ServiceServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }

    if(!router) throw new Error("ServiceServiceProxy() - " +
        "Unable to create proxy route, missing router");

    bindRoutes(router, options);

    return router;
}

export default ServiceServiceProxy;
