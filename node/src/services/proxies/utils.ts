
import {UtilsService} from "@geoplatform/client";
import ServiceProxy from "./base";


const Routes = [
    {
        key   : 'locate',
        method: 'get',
        path  : 'utils/locate',
        auth  : false,
        onExecute: function(svc : UtilsService, req : any) {
            return svc.locate(req.query.location);
        }
    },
    {
        key   : 'parseFile',
        method: 'post',
        path  : 'utils/parse',
        auth  : false,
        onExecute: function(svc : UtilsService, req : any) {
            return svc.parseFile(req.files.file, req.body.format);
        }
    },
    {
        key   : 'capabilities',
        method: 'get',
        path  : 'utils/capabilities',
        auth  : false,
        onExecute: function(svc : UtilsService, req : any) {
            return svc.capabilities(null, req.query);
        }
    },
    {
        key   : 'capabilitiesProperty',
        method: 'get',
        path  : 'utils/capabilities/:id',
        auth  : false,
        onExecute: function(svc : UtilsService, req : any) {
            return svc.capabilities(req.params.id, req.query);
        }
    },
    {
        key   : 'store',
        method: 'post',
        path  : 'store',
        auth  : true,
        onExecute: function(svc : UtilsService, req : any) {
            return svc.store(req.files.file, req.body.format);
        }
    }
];



/**
 *
 */
function UtilsServiceProxy( options ?: any ) {

    if(typeof(options) === 'undefined') {
        options = {};
    };

    let router = options.router;
    if(!options.router) {
        let express = require('express');
        if(!express) {
            throw new Error("UtilsServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }

    if(!router) throw new Error("UtilsServiceProxy() - " +
        "Unable to create proxy route, missing router");

    options.serviceClass = UtilsService;
    ServiceProxy.bindRoutes(router, Routes, options);

    return router;
}

export default UtilsServiceProxy;
