

import Q from 'q';
import NodeHttpClient from '../../http/node';
import ItemService from "../item";
import Config from '../../shared/config';
import ServiceProxy from './base';

const Routes = [
    {
        key: 'search',
        method: 'get',
        path: 'items',
        auth: false,
        execFn: function(svc, req) { return svc.search(req.query); }
    },
    {
        key: 'get',
        method: 'get',
        path: 'items/:id',
        auth: false,
        execFn: function(svc, req) { return svc.get(req.params.id); }
    },
    {
        key: 'create',
        method: 'post',
        path: 'items',
        auth: true,
        execFn: function(svc, req) { return svc.save(req.body); }
    },
    {
        key: 'update',
        method: 'put',
        path: 'items/:id',
        auth: true,
        execFn: function(svc, req) { return svc.save(req.body); }
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'items/:id',
        auth: true,
        execFn: function(svc, req) { return svc.remove(req.params.id); },
        respFn: function(result, res, next) { res.status(204).end(); }
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'items/:id',
        auth: true,
        execFn: function(svc, req) { return svc.patch(req.params.id, req.body); }
    },
    {
        key: 'clone',
        method: 'clone',
        path: 'items/:id/clone',
        auth: true,
        execFn: function(svc, req) { return svc.clone(req.params.id, req.body); }
    },
    {
        key: 'export',
        method: 'get',
        path: 'items/:id/export',
        auth: false,
        execFn: function(svc, req) { return svc.export(req.params.id, req.query.format); },
        respFn: function(result, res, next) {
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
        execFn: function(svc, req) { return svc.getUri(req.body); },
        respFn: function(result, req, res) { res.json({ uri: result }); }
    },
    {
        key: 'exists',
        method: 'post',
        path: 'items/exists',
        auth: false,
        execFn: function(svc, req) {
            return svc.getUri(req.body)
            .then( uri => {
                let fields = ['serviceType','services','scheme','themes','publishers','keywords'];
                let query = new Query().uri(uri).fields(fields);
                return svc.search(query);
            });
        }
    },
    {
        key: 'import',
        method: 'post',
        path: 'items/import',
        auth: true,
        execFn: function(svc, req) {
            let input = req.body.url || req.files.file;
            return svc.import(input, req.query.format);
        }
    },
    {
        key: 'associations',
        method: 'get',
        path: 'items/:id/associations',
        auth: false,
        execFn: function(svc, req) { return svc.associations(req.params.id, req.query); }
    },
    {
        key: 'versions',
        method: 'get',
        path: 'items/:id/versions',
        auth: false,
        execFn: function(svc, req) { return svc.versions(req.params.id); }
    },
    {
        key: 'getVersion',
        method: 'get',
        path: 'items/:id/versions/:version',
        auth: false,
        execFn: function(svc, req) {
            return svc.get(req.params.id, { version: req.params.version });
        }
    }

    // TODO findMultiple
];

/**
 *
 */
function bindRoutes(router, options) {
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
function ItemServiceProxy( options ) {

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
