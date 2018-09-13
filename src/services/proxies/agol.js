

import Q from 'q';
import NodeHttpClient from '../../http/node';
import AgolService from "../agol";
import Config from '../../shared/config';
import ServiceProxy from './base';


const Routes = [
    {
        key: 'searchItems',
        method: 'get',
        path: 'agol/items',
        auth: false,
        execFn: function(svc, req) { return svc.searchItems(req.query); }
    },
    {
        key: 'searchGroups',
        method: 'get',
        path: 'agol/groups',
        auth: false,
        execFn: function(svc, req) { return svc.searchGroups(req.query); }
    },
    {
        key: 'searchOrgs',
        method: 'get',
        path: 'agol/orgs',
        auth: false,
        execFn: function(svc, req) { return svc.searchOrgs(req.query); }
    },
    {
        key: 'getItem',
        method: 'get',
        path: 'agol/items/:id',
        auth: false,
        execFn: function(svc, req) { return svc.getItem(req.params.id); }
    },
    {
        key: 'getGroup',
        method: 'get',
        path: 'agol/groups/:id',
        auth: false,
        execFn: function(svc, req) { return svc.getGroup(req.params.id); }
    },
    {
        key: 'getOrg',
        method: 'get',
        path: 'agol/orgs/:id',
        auth: false,
        execFn: function(svc, req) { return svc.getOrg(req.params.id); }
    }
];



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

    options.serviceClass = AgolService;
    ServiceProxy.bindRoutes(router, Routes, options);

    return router;
}

export default AgolServiceProxy;
