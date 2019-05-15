

import {GalleryService} from "@geoplatform/client";
import ServiceProxy from './base';

const Routes = [
    {
        key: 'search',
        method: 'get',
        path: 'galleries',
        auth: false,
        execFn: function(svc : GalleryService, req : any) {
            return svc.search(req.query);
        }
    },
    {
        key: 'get',
        method: 'get',
        path: 'galleries/:id',
        auth: false,
        execFn: function(svc : GalleryService, req : any) {
            return svc.get(req.params.id);
        }
    },
    {
        key: 'create',
        method: 'post',
        path: 'galleries',
        auth: true,
        execFn: function(svc : GalleryService, req : any) {
            return svc.save(req.body);
        }
    },
    {
        key: 'update',
        method: 'put',
        path: 'galleries/:id',
        auth: true,
        execFn: function(svc : GalleryService, req : any) {
            return svc.save(req.body);
        }
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'galleries/:id',
        auth: true,
        execFn: function(svc : GalleryService, req : any) {
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
        path: 'galleries/:id',
        auth: true,
        execFn: function(svc : GalleryService, req : any) {
            return svc.patch(req.params.id, req.body);
        }
    },
    {
        key: 'export',
        method: 'get',
        path: 'galleries/:id/export',
        auth: false,
        execFn: function(svc : GalleryService, req : any) {
            return svc.export(req.params.id, req.query.format);
        },
        respFn: function(result : any, res : any) {
            let mimeType = result.headers['content-type'];
            let disposition = result.headers['content-disposition'];
            res.set("Content-Type", mimeType);
            res.setHeader('Content-disposition', disposition);
            res.send(result.body);
        }
    }
];

/**
 * GalleryServiceProxy
 *
 * see examples/node/item-proxy for an in-depth example
 */
function GalleryServiceProxy( options ?: any ) {

    if(typeof(options) === 'undefined') {
        options = {};
    };

    let router = options.router;
    if(!options.router) {
        let express = require('express');
        if(!express) {
            throw new Error("GalleryServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }

    if(!router) throw new Error("GalleryServiceProxy() - " +
        "Unable to create proxy route, missing router");

    options.serviceClass = GalleryService;
    ServiceProxy.bindRoutes(router, Routes, options);

    return router;
}

export default GalleryServiceProxy;
