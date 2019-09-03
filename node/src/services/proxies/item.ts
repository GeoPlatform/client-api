
import { Query, ItemService } from "@geoplatform/client";
import ServiceProxy from './base';

const Routes = [
    {
        key: 'search',
        method: 'get',
        path: 'items',
        auth: false,
        onExecute: function(svc : ItemService, req : any) {
            let query = new Query(req.query);
            return svc.search(query);
        }
    },
    {
        key: 'get',
        method: 'get',
        path: 'items/:id',
        auth: false,
        onExecute: function(svc : ItemService, req : any) {
            return svc.get(req.params.id);
        }
    },
    {
        key: 'create',
        method: 'post',
        path: 'items',
        auth: true,
        onExecute: function(svc : ItemService, req : any) {
            return svc.save(req.body);
        }
    },
    {
        key: 'update',
        method: 'put',
        path: 'items/:id',
        auth: true,
        onExecute: function(svc : ItemService, req : any) {
            return svc.save(req.body);
        }
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'items/:id',
        auth: true,
        onExecute: function(svc : ItemService, req : any) {
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
        path: 'items/:id',
        auth: true,
        onExecute: function(svc : ItemService, req : any) {
            return svc.patch(req.params.id, req.body);
        }
    },
    {
        key: 'clone',
        method: 'post',
        path: 'items/:id/clone',
        auth: true,
        onExecute: function(svc, req) { return svc.clone(req.params.id, req.body); }
    },
    {
        key: 'clone',
        method: 'post',
        path: 'items/:id/clone',
        auth: true,
        execFn: function(svc, req) { return svc.clone(req.params.id, req.body); }
    },
    {
        key: 'export',
        method: 'get',
        path: 'items/:id/export',
        auth: false,
        onExecute: function(svc : ItemService, req : any) {
            return svc.export(req.params.id, req.query.format); },
        onResponse: function(result : any, res : any) {
            let mimeType = result.headers['content-type'];
            let disposition = result.headers['content-disposition'];
            res.set("Content-Type", mimeType);
            res.setHeader('Content-disposition', disposition);
            res.send(result.body);
        }
    },
    {
        key: 'uri',
        method: 'post',
        path: 'items/uri',
        auth: false,
        onExecute: function(svc : ItemService, req : any) {
            return svc.getUri(req.body);
        },
        onResponse: function(result : any, res : any) {
            res.json({ uri: result });
        }
    },
    {
        key: 'exists',
        method: 'post',
        path: 'items/exists',
        auth: false,
        onExecute: function(svc : ItemService, req : any) {
            return svc.getUri(req.body)
            .then( uri => {
                let fields = ['serviceType','services','scheme','themes','publishers','keywords'];
                let query : Query = new Query().uri(uri).fields(fields);
                return svc.search(query);
            });
        }
    },
    {
        key: 'import',
        method: 'post',
        path: 'items/import',
        auth: true,
        onExecute: function(svc : ItemService, req : any) {
            let input = req.body.url || req.files.file;
            return svc.import(input, req.query.format);
        }
    },
    {
        key: 'associations',
        method: 'get',
        path: 'items/:id/associations',
        auth: false,
        onExecute: function(svc : ItemService, req : any) {
            return svc.associations(req.params.id, req.query); }
    },
    {
        key: 'versions',
        method: 'get',
        path: 'items/:id/versions',
        auth: false,
        onExecute: function(svc : ItemService, req : any) {
            return svc.versions(req.params.id, req.query); }
    },
    {
        key: 'getVersion',
        method: 'get',
        path: 'items/:id/versions/:version',
        auth: false,
        onExecute: function(svc : ItemService, req : any) {
            return svc.get(req.params.id, { version: req.params.version });
        }
    }

    // TODO findMultiple
];

/**
 *
 */
function bindRoutes(router : any, options ?: any) {
    //bind common endpoints
    options.pathBaseDefault = "items";
    options.serviceClass = ItemService;
    ServiceProxy.bindRoutes(router, Routes, options);
}




/**
 * ItemServiceProxy
 *
 * see examples/node/item-proxy for an in-depth example
 */
function ItemServiceProxy( options ?: any ) {

    if(typeof(options) === 'undefined') {
        options = {};
    };

    let router = options.router;
    if(!options.router) {
        let express = require('express');
        if(!express) {
            throw new Error("ItemServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }

    if(!router) throw new Error("ItemServiceProxy() - " +
        "Unable to create proxy route, missing router");

    bindRoutes(router, options);

    return router;
}

export default ItemServiceProxy;
