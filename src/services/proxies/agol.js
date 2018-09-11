

import Q from 'q';
import NodeHttpClient from '../../http/node';
import AgolService from "../item";
import Config from '../../shared/config';
import ServiceProxy from './base';

/**
 *
 */
function bindRoutes(router, options) {

    let paths = options.paths || {};

    options.serviceClass = AgolService;

    if(paths.searchItems !== false) {
        router.get('/' + (paths.searchItems||"agol/items"), (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .searchItems(req.query)
            .then( response => res.json(response) )
            .catch(next);
        });
    }

    if(paths.searchGroups !== false) {
        router.get('/' + (paths.searchGroups||"agol/groups"), (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .searchGroups(req.query)
            .then( response => res.json(response) )
            .catch(next);
        });
    }

    if(paths.searchOrgs !== false) {
        router.get('/' + (paths.searchOrgs||"agol/orgs"), (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .searchOrgs(req.query)
            .then( response => res.json(response) )
            .catch(next);
        });
    }

    if(paths.getItem !== false) {
        router.get('/' + (paths.getItem||"agol/items/:id"), (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .getItem(req.params.id)
            .then( item => res.json(item) )
            .catch(next);
        });
    }

    if(paths.getGroup !== false) {
        router.get('/' + (paths.getGroup||"agol/groups/:id"), (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .getGroup(input)
            .then( item => res.json(item) )
            .catch(next);
        });
    }

    if(paths.getOrg !== false) {
        router.get('/' + (paths.getOrg||"agol/orgs/:id"), (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .getOrg(req.params.id)
            .then( item => res.status(204).end() )
            .catch(next);
        });
    }

}



/**
 *
 */
function AgolServiceProxy( options ) {

    if(typeof(options) === 'undefined') {
        options = {};
    };

    let router = options.router;
    if(!options.router) {
        let express = require('express');
        if(!express) {
            throw new Error("AgolServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }

    if(!router) throw new Error("AgolServiceProxy() - " +
        "Unable to create proxy route, missing router");

    bindRoutes(router, options);

    return router;
}

export default AgolServiceProxy;
