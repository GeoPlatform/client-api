

import Q from 'q';
import NodeHttpClient from '../../http/node';
import ServiceService from "../service";
import Config from '../../shared/config';
import ServiceProxy from "./base";

/**
 *
 */
function bindRoutes(router, options) {

    let paths = options.paths || {};

    options.pathBaseDefault = "services";
    options.serviceClass = ServiceService;
    ServiceProxy.bindRoutes(router, options);


    if(paths.types !== false) {
        router.get('/' + (paths.types||"serviceTypes"), (req, res, next) => {
            console.log("Service Types");
            ServiceProxy.getService(req, false, options)
            .types()
            .then( result => { res.json(result) })
            .catch( next );
        });
    }

    if(paths.import !== false) {
        router.post('/' + (paths.import||"services/import"), (req, res, next) => {
            ServiceProxy.getService(req, true, options)
            .import(req.body)
            .then( result => res.json(result) )
            .catch(next);
        });
    }

    if(paths.about !== false) {
        router.get('/' + (paths.about||"services/:id/about"), (req, res, next) => {
            let svc = ServiceProxy.getService(req, false, options);
            svc.get(req.params.id)
            .then( service => svc.about(service) )
            .then( result => res.json(result) )
            .catch(next);
        });
    }

    if(paths.harvest !== false) {
        router.get('/' + (paths.harvest||"services/:id/harvest"), (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .harvest(req.params.id)
            .then( result => res.json(result) )
            .catch(next);
        });
    }

    if(paths.test !== false) {
        router.get('/' + (paths.test||"services/:id/test"), (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .liveTest(req.params.id)
            .then( result => { res.json(result) })
            .catch(next);
        });
    }

    if(paths.statistics !== false) {
        router.get('/' + (paths.statistics||"services/:id/statistics"), (req, res, next) => {
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
