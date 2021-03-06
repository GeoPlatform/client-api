

import { AgolService, AgolQuery } from "@geoplatform/client";
import ServiceProxy from './base';


const Routes = [
    {
        key: 'searchItems',
        method: 'get',
        path: 'agol/items',
        auth: false,
        onExecute: function(svc : AgolService, req : any) {
            let query = new AgolQuery(req.query);
            return svc.searchItems(query);
        }
    },
    {
        key: 'searchGroups',
        method: 'get',
        path: 'agol/groups',
        auth: false,
        onExecute: function(svc : AgolService, req : any) {
            let query = new AgolQuery(req.query);
            return svc.searchGroups(query);
        }
    },
    {
        key: 'searchOrgs',
        method: 'get',
        path: 'agol/orgs',
        auth: false,
        onExecute: function(svc : AgolService, req : any) {
            let query = new AgolQuery(req.query);
            return svc.searchOrgs(query);
        }
    },
    {
        key: 'getItem',
        method: 'get',
        path: 'agol/items/:id',
        auth: false,
        onExecute: function(svc : AgolService, req : any) {
            return svc.getItem(req.params.id);
        }
    },
    {
        key: 'getGroup',
        method: 'get',
        path: 'agol/groups/:id',
        auth: false,
        onExecute: function(svc : AgolService, req : any) {
            return svc.getGroup(req.params.id);
        }
    },
    {
        key: 'getOrg',
        method: 'get',
        path: 'agol/orgs/:id',
        auth: false,
        onExecute: function(svc : AgolService, req : any) {
            return svc.getOrg(req.params.id);
        }
    }
];



/**
 *
 */
function AgolServiceProxy( options ?: any ) {

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
