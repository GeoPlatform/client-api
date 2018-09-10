

import Q from 'q';
import NodeHttpClient from '../../http/node';
import GalleryService from "../item";
import Config from '../../shared/config';
import ServiceProxy from './base';



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

    options.pathBaseDefault = "galleries";
    options.serviceClass = GalleryService;
    ServiceProxy.bindRoutes(router, options);

    return router;
}

export default GalleryServiceProxy;
