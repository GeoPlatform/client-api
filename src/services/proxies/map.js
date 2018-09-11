

import Q from 'q';
import NodeHttpClient from '../../http/node';
import MapService from "../map";
import Config from '../../shared/config';
import ServiceProxy from "./base";



/**
 * MapServiceProxy
 *
 * see examples/node/item-proxy for an in-depth example
 */
function MapServiceProxy( options ) {

    if(typeof(options) === 'undefined') {
        options = {};
    };

    let router = options.router;
    if(!options.router) {
        let express = require('express');
        if(!express) {
            throw new Error("MapServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }

    if(!router) throw new Error("MapServiceProxy() - " +
        "Unable to create proxy route, missing router");

    options.pathBaseDefault = "maps";
    options.serviceClass = MapService;
    ServiceProxy.bindRoutes(router, options);

    return router;
}

export default MapServiceProxy;
