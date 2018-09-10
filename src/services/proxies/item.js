

import Q from 'q';
import NodeHttpClient from '../../http/node';
import ItemService from "../item";
import Config from '../../shared/config';
import ServiceProxy from './base';
/**
 *
 */
function bindRoutes(router, options) {

    //bind common endpoints
    options.pathBaseDefault = "items";
    options.serviceClass = ItemService;
    ServiceProxy.bindRoutes(router, options);


    let paths = options.paths || {};

    
    //then bind those specific to this service

    if(paths.uri !== false) {
        router.post('/' + (paths.uri||'items/uri'), (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .getUri(req.body)
            .then( response => res.json({uri: response}) )
            .catch(next);
        });
    }

    if(paths.exists !== false) {
        router.post('/' + (paths.exists||'items/exists'), (req, res, next) => {
            ServiceProxy.getService(req, false, options)
            .getUri(req.body)
            .then( uri => {
                let fields = ['serviceType','services','scheme','themes','publishers','keywords'];
                let query = new Query().uri(uri).fields(fields);
                return svc.search(query);
            })
            .then( response => res.json(response) )
            .catch(next);
        });
    }

    if(paths.import !== false) {
        router.post('/' + (paths.import||'items/import'), (req, res, next) => {
            let input = req.body.url || req.files.file;
            ServiceProxy.getService(req, false, options)
            .import(input, req.body.format)
            .then( item => { res.json(item) })
            .catch( next );
        });
    }

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
