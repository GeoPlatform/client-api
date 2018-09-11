

import Q from 'q';
import NodeHttpClient from '../../http/node';
import AgolService from "../agol";
import Config from '../../shared/config';
import ServiceProxy from './base';

const DEFAULT_PATHS = {
    searchItems: "agol/items",
    searchGroups: "agol/groups",
    searchOrgs: "agol/orgs",
    getItem: 'agol/items/:id',
    getGroup: 'agol/groups/:id',
    getOrg: 'agol/orgs/:id'
}

/**
 *
 */
function bindRoutes(router, options) {

    let paths = options.paths || {};

    options.serviceClass = AgolService;

    if(paths.searchItems !== false) {
        let path = '/' + ( paths.searchItems || DEFAULT_PATHS.searchItems );
        router.get(path, (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .searchItems(req.query)
            .then( response => res.json(response) )
            .catch(next);
        });
    }

    if(paths.searchGroups !== false) {
        let path = '/' + ( paths.searchGroups || DEFAULT_PATHS.searchGroups );
        router.get(path, (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .searchGroups(req.query)
            .then( response => res.json(response) )
            .catch(next);
        });
    }

    if(paths.searchOrgs !== false) {
        let path = '/' + ( paths.searchOrgs || DEFAULT_PATHS.searchOrgs );
        router.get(path, (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .searchOrgs(req.query)
            .then( response => res.json(response) )
            .catch(next);
        });
    }

    if(paths.getItem !== false) {
        let path = '/' + ( paths.getItem || DEFAULT_PATHS.getItem );
        router.get(path, (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .getItem(req.params.id)
            .then( item => res.json(item) )
            .catch(next);
        });
    }

    if(paths.getGroup !== false) {
        let path = '/' + ( paths.getGroup || DEFAULT_PATHS.getGroup );
        router.get(path, (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .getGroup(input)
            .then( item => res.json(item) )
            .catch(next);
        });
    }

    if(paths.getOrg !== false) {
        let path = '/' + ( paths.getOrg || DEFAULT_PATHS.getOrg );
        router.get(path, (req, res, next) => {
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
