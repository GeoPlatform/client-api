

import {ServiceService} from "@geoplatform/client";
import ServiceProxy from "./base";


const Routes = [
    {
        key: 'search',
        method: 'get',
        path: 'services',
        auth: false,
        execFn: function(svc: ServiceService, req : any) {
            return svc.search(req.query);
        }
    },
    {
        key: 'get',
        method: 'get',
        path: 'services/:id',
        auth: false,
        execFn: function(svc : ServiceService, req : any ) {
            return svc.get(req.params.id);
        }
    },
    {
        key: 'create',
        method: 'post',
        path: 'services',
        auth: true,
        execFn: function(svc : ServiceService, req : any ) {
            return svc.save(req.body);
        }
    },
    {
        key: 'update',
        method: 'put',
        path: 'services/:id',
        auth: true,
        execFn: function(svc : ServiceService, req : any ) {
            return svc.save(req.body);
        }
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'services/:id',
        auth: true,
        execFn: function(svc : ServiceService, req : any ) {
            return svc.remove(req.params.id);
        },
        respFn: function(
            // @ts-ignore
            result : any,
            res : any) {
            res.status(204).end();
        }
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'services/:id',
        auth: true,
        execFn: function(svc : ServiceService, req : any ) {
            return svc.patch(req.params.id, req.body);
        }
    },
    {
        key: 'export',
        method: 'get',
        path: 'services/:id/export',
        auth: false,
        execFn: function(svc : ServiceService, req : any ) {
            return svc.export(req.params.id, req.query.format);
        },
        respFn: function(result : any, res : any) {
            let mimeType = result.headers['content-type'];
            let disposition = result.headers['content-disposition'];
            res.set("Content-Type", mimeType);
            res.setHeader('Content-disposition', disposition);
            res.send(result.body);
        }
    },
    {
        key: 'types',
        method: 'get',
        path: 'serviceTypes',
        auth: false,
        execFn: function(svc : ServiceService) {
            return svc.types();
        }
    },
    {
        key: 'import',
        method: 'post',
        path: 'services/import',
        auth: true,
        execFn: function(svc : ServiceService, req : any ) {
            return svc.import(req.body);
        }
    },
    {
        key: 'about',
        method: 'get',
        path: 'services/:id/about',
        auth: false,
        execFn: function(svc : ServiceService, req : any ) {
            return svc.about(req.params.id);
        }
    },
    {
        key: 'harvest',
        method: 'get',
        path: 'services/:id/harvest',
        auth: false,
        execFn: function(svc : ServiceService, req : any ) {
            return svc.harvest(req.params.id);
        }
    },
    {
        key: 'test',
        method: 'get',
        path: 'services/:id/test',
        auth: false,
        execFn: function(svc : ServiceService, req : any ) {
            return svc.liveTest(req.params.id);
        }
    },
    {
        key: 'statistics',
        method: 'get',
        path: 'services/:id/statistics',
        auth: false,
        execFn: function(svc : ServiceService, req : any ) {
            return svc.statistics(req.params.id);
        }
    }
];




/**
 *
 */
function ServiceServiceProxy( options ?: any ) {

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

    options.serviceClass = ServiceService;
    ServiceProxy.bindRoutes(router, Routes, options);

    return router;
}

export default ServiceServiceProxy;
