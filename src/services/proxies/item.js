

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


    // let paths = options.paths || {};


    //then bind those specific to this service

    // if(paths.uri !== false) {
    //     router.post('/' + ( paths.uri|| DEFAULT_PATHS.uri ), (req, res, next) => {
    //         ServiceProxy.getService(req, false, options)
    //         .getUri(req.body)
    //         .then( response => res.json({uri: response}) )
    //         .catch( (err) => {
    //             if(options.onError)
    //                 options.onError('uri', err);
    //             next(err);
    //         })
    //         .finally( () => {
    //             if(options.onFinish)
    //                 options.onFinish('uri', req, res);
    //         });
    //     });
    // }

    // if(paths.exists !== false) {
    //     router.post('/' + ( paths.exists || DEFAULT_PATHS.exists ), (req, res, next) => {
    //         ServiceProxy.getService(req, false, options)
    //         .getUri(req.body)
    //         .then( uri => {
    //             let fields = ['serviceType','services','scheme','themes','publishers','keywords'];
    //             let query = new Query().uri(uri).fields(fields);
    //             return svc.search(query);
    //         })
    //         .then( response => res.json(response) )
    //         .catch( (err) => {
    //             if(options.onError)
    //                 options.onError('exists', err);
    //             next(err);
    //         })
    //         .finally( () => {
    //             if(options.onFinish)
    //                 options.onFinish('exists', req, res);
    //         });
    //     });
    // }

    // if(paths.import !== false) {
    //     router.post('/' + ( paths.import || DEFAULT_PATHS.import ), (req, res, next) => {
    //         let input = req.body.url || req.files.file;
    //         ServiceProxy.getService(req, false, options)
    //         .import(input, req.body.format)
    //         .then( item => { res.json(item) })
    //         .catch( (err) => {
    //             if(options.onError)
    //                 options.onError('import', err);
    //             next(err);
    //         })
    //         .finally( () => {
    //             if(options.onFinish)
    //                 options.onFinish('import', req, res);
    //         });
    //     });
    // }

    //TODO findMultiple


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
