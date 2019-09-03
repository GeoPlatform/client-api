
import { KGService, KGQuery } from "@geoplatform/client";
import ServiceProxy from "./base";


const Routes = [
    {
        key   : 'suggest',
        method: 'get',
        path  : 'recommender/suggest',
        auth  : false,
        onExecute: function(svc : KGService, req : any) {
            let query = new KGQuery(req.query);
            return svc.suggest(query);
        }
    },
    {
        key   : 'types',
        method: 'get',
        path  : 'recommender/types',
        auth  : false,
        onExecute: function(svc : KGService, req : any) {
            let query = new KGQuery(req.query);
            return svc.types(query);
        }
    },
    {
        key   : 'sources',
        method: 'get',
        path  : 'recommender/sources',
        auth  : false,
        onExecute: function(svc : KGService, req : any) {
            let query = new KGQuery(req.query);
            return svc.sources(query);
        }
    }
];



/**
 *
 */
function KGServiceProxy( options ?: any ) {

    if(typeof(options) === 'undefined') {
        options = {};
    };

    let router = options.router;
    if(!options.router) {
        let express = require('express');
        if(!express) {
            throw new Error("KGServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }

    if(!router) throw new Error("KGServiceProxy() - " +
        "Unable to create proxy route, missing router");

    options.serviceClass = KGService;
    ServiceProxy.bindRoutes(router, Routes, options);

    return router;
}

export default KGServiceProxy;
