

import Q from 'q';
import NodeHttpClient from '../../http/node';
import DatasetService from "../dataset";
import Config from '../../shared/config';
import ServiceProxy from './base';


const Routes = [
    {
        key: 'search',
        method: 'get',
        path: 'datasets',
        auth: false,
        execFn: function(svc, req) { return svc.search(req.query); }
    },
    {
        key: 'get',
        method: 'get',
        path: 'datasets/:id',
        auth: false,
        execFn: function(svc, req) { return svc.get(req.params.id); }
    },
    {
        key: 'create',
        method: 'post',
        path: 'datasets',
        auth: true,
        execFn: function(svc, req) { return svc.save(req.body); }
    },
    {
        key: 'update',
        method: 'put',
        path: 'datasets/:id',
        auth: true,
        execFn: function(svc, req) { return svc.save(req.body); }
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'datasets/:id',
        auth: true,
        execFn: function(svc, req) { return svc.remove(req.params.id); },
        respFn: function(result, res, next) { res.status(204).end(); }
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'datasets/:id',
        auth: true,
        execFn: function(svc, req) { return svc.patch(req.params.id, req.body); }
    },
    {
        key: 'export',
        method: 'get',
        path: 'datasets/:id/export',
        auth: false,
        execFn: function(svc, req) { return svc.export(req.params.id, req.query.format); },
        respFn: function(result, res, next) {
            let mimeType = result.headers['content-type'];
            let disposition = result.headers['content-disposition'];
            res.set("Content-Type", mimeType);
            res.setHeader('Content-disposition', disposition);
            res.send(response.body);
        }
    }
];


/**
 * DatasetServiceProxy
 *
 * see examples/node/item-proxy for an in-depth example
 */
function DatasetServiceProxy( options ) {

    if(typeof(options) === 'undefined') {
        options = {};
    };

    let router = options.router;
    if(!options.router) {
        let express = require('express');
        if(!express) {
            throw new Error("DatasetServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }

    if(!router) throw new Error("DatasetServiceProxy() - " +
        "Unable to create proxy route, missing router");

    options.serviceClass = DatasetService;
    ServiceProxy.bindRoutes(router, Routes, options);

    return router;
}

export default DatasetServiceProxy;
