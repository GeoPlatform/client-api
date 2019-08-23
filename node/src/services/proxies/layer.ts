

import {LayerService} from "@geoplatform/client";
import ServiceProxy from "./base";



const Routes = [
    {
        key   : 'search',
        method: 'get',
        path  : 'layers',
        auth  : false,
        onExecute: function(svc : LayerService, req : any) {
            return svc.search(req.query);
        }
    },
    {
        key   : 'get',
        method: 'get',
        path  : 'layers/:id',
        auth  : false,
        onExecute: function(svc : LayerService, req : any) {
            return svc.get(req.params.id);
        }
    },
    {
        key   : 'create',
        method: 'post',
        path  : 'layers',
        auth  : true,
        onExecute: function(svc : LayerService, req : any) {
            return svc.save(req.body);
        }
    },
    {
        key   : 'update',
        method: 'put',
        path  : 'layers/:id',
        auth  : true,
        onExecute: function(svc : LayerService, req : any) {
            return svc.save(req.body);
        }
    },
    {
        key   : 'delete',
        method: 'delete',
        path  : 'layers/:id',
        auth  : true,
        onExecute: function(svc : LayerService, req : any) {
            return svc.remove(req.params.id);
        },
        onResponse: function(
            // @ts-ignore
            result : any,
            res : any) { res.status(204).end(); }
    },
    {
        key   : 'patch',
        method: 'patch',
        path  : 'layers/:id',
        auth  : true,
        onExecute: function(svc : LayerService, req : any) {
            return svc.patch(req.params.id, req.body);
        }
    },
    {
        key   : 'export',
        method: 'get',
        path  : 'layers/:id/export',
        auth  : false,
        onExecute: function(svc : LayerService, req : any) {
            return svc.export(req.params.id, req.query.format); }
            ,
        onResponse: function(result : any, res : any) {
            let mimeType = result.headers['content-type'];
            let disposition = result.headers['content-disposition'];
            res.set("Content-Type", mimeType);
            res.setHeader('Content-disposition', disposition);
            res.send(result.body);
        }
    },
    {
        key   : 'style',
        method: 'get',
        path  : 'layers/:id/style',
        auth  : false,
        onExecute: function(svc : LayerService, req : any) {
            return svc.style(req.params.id);
        }
    },
    {
        key   : 'styleById',
        method: 'get',
        path  : 'layers/:id/styles/:styleId',
        auth  : false,
        onExecute: function(svc : LayerService, req : any) {
            return svc.style(req.params.id, req.params.styleId);
        }
    },
    {
        key   : 'styles',
        method: 'get',
        path  : 'layers/:id/styles',
        auth  : false,
        onExecute: function(svc : LayerService, req : any) {
            return svc.styles(req.params.id);
        }
    },
    {
        key   : 'describe',
        method: 'post',
        path  : 'layers/:id/describe',
        auth  : false,
        onExecute: function(svc : LayerService, req : any) {
            return svc.describe(req.params.id, req.body);
        }
    },
    {
        key   : 'validate',
        method: 'post',
        path  : 'layers/:id/validate',
        auth  : false,
        onExecute: function(svc : LayerService, req : any) {
            return svc.validate(req.params.id, req.body);
        }
    }
];



/**
 *
 */
function LayerServiceProxy( options ?: any ) {

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
    ServiceProxy.bindRoutes(router, Routes, options);

    return router;
}

export default LayerServiceProxy;
