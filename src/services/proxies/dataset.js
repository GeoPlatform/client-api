

import Q from 'q';
import NodeHttpClient from '../../http/node';
import DatasetService from "../dataset";
import Config from '../../shared/config';
import ServiceProxy from './base';



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

    options.pathBaseDefault = "datasets";
    options.serviceClass = DatasetService;
    ServiceProxy.bindRoutes(router, options);

    return router;
}

export default DatasetServiceProxy;
