

import {DatasetService} from "@geoplatform/client";
import ServiceProxy from './base';


const Routes = [
    {
        key: 'search',
        method: 'get',
        path: 'datasets',
        auth: false,
        onExecute: function(svc : DatasetService, req : any) {
            return svc.search(req.query);
        }
    },
    {
        key: 'get',
        method: 'get',
        path: 'datasets/:id',
        auth: false,
        onExecute: function(svc : DatasetService, req : any) {
            return svc.get(req.params.id);
        }
    },
    {
        key: 'create',
        method: 'post',
        path: 'datasets',
        auth: true,
        onExecute: function(svc : DatasetService, req : any) {
            return svc.save(req.body);
        }
    },
    {
        key: 'update',
        method: 'put',
        path: 'datasets/:id',
        auth: true,
        onExecute: function(svc : DatasetService, req : any) {
            return svc.save(req.body);
        }
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'datasets/:id',
        auth: true,
        onExecute: function(svc : DatasetService, req : any) {
            return svc.remove(req.params.id);
        },
        onResponse: function(
            // @ts-ignore
            result : any,
            res : any) {
            res.status(204).end();
        }
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'datasets/:id',
        auth: true,
        onExecute: function(svc : DatasetService, req : any) {
            return svc.patch(req.params.id, req.body); }
    },
    {
        key: 'export',
        method: 'get',
        path: 'datasets/:id/export',
        auth: false,
        onExecute: function(svc : DatasetService, req : any) {
            return svc.export(req.params.id, req.query.format);
        },
        onResponse: function(result : any, res : any) {
            let mimeType = result.headers['content-type'];
            let disposition = result.headers['content-disposition'];
            res.set("Content-Type", mimeType);
            res.setHeader('Content-disposition', disposition);
            res.send(result.body);
        }
    }
];


/**
 * DatasetServiceProxy
 *
 * see examples/node/item-proxy for an in-depth example
 */
function DatasetServiceProxy( options ?: any ) {

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
