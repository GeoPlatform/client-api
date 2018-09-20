

import Q from 'q';
import NodeHttpClient from '../../http/node';
import GalleryService from "../gallery";
import Config from '../../shared/config';
import ServiceProxy from './base';

const Routes = [
    {
        key: 'search',
        method: 'get',
        path: 'galleries',
        auth: false,
        execFn: function(svc, req) { return svc.search(req.query); }
    },
    {
        key: 'get',
        method: 'get',
        path: 'galleries/:id',
        auth: false,
        execFn: function(svc, req) { return svc.get(req.params.id); }
    },
    {
        key: 'create',
        method: 'post',
        path: 'galleries',
        auth: true,
        execFn: function(svc, req) { return svc.save(req.body); }
    },
    {
        key: 'update',
        method: 'put',
        path: 'galleries/:id',
        auth: true,
        execFn: function(svc, req) { return svc.save(req.body); }
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'galleries/:id',
        auth: true,
        execFn: function(svc, req) { return svc.remove(req.params.id); },
        respFn: function(result, res, next) { res.status(204).end(); }
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'galleries/:id',
        auth: true,
        execFn: function(svc, req) { return svc.patch(req.params.id, req.body); }
    },
    {
        key: 'export',
        method: 'get',
        path: 'galleries/:id/export',
        auth: false,
        execFn: function(svc, req) { return svc.export(req.params.id, req.query.format); },
        respFn: function(result, res, next) {
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
function GalleryServiceProxy( options ) {

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
