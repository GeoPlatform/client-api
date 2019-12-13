import { ServiceService } from "@geoplatform/client";
import ServiceProxy from "./base";
var ɵ0 = function (svc, req) {
    return svc.search(req.query);
}, ɵ1 = function (svc, req) {
    return svc.get(req.params.id);
}, ɵ2 = function (svc, req) {
    return svc.save(req.body);
}, ɵ3 = function (svc, req) {
    return svc.save(req.body);
}, ɵ4 = function (svc, req) {
    return svc.remove(req.params.id);
}, ɵ5 = function (
// @ts-ignore
result, res) {
    res.status(204).end();
}, ɵ6 = function (svc, req) {
    return svc.patch(req.params.id, req.body);
}, ɵ7 = function (svc, req) {
    return svc.export(req.params.id, req.query.format);
}, ɵ8 = function (result, res) {
    var mimeType = result.headers['content-type'];
    var disposition = result.headers['content-disposition'];
    res.set("Content-Type", mimeType);
    res.setHeader('Content-disposition', disposition);
    res.send(result.body);
}, ɵ9 = function (svc) {
    return svc.types();
}, ɵ10 = function (svc, req) {
    return svc.import(req.body);
}, ɵ11 = function (svc, req) {
    return svc.about(req.params.id);
}, ɵ12 = function (svc, req) {
    return svc.harvest(req.params.id);
}, ɵ13 = function (svc, req) {
    return svc.layers(req.params.id);
}, ɵ14 = function (svc, req) {
    return svc.liveTest(req.params.id);
}, ɵ15 = function (svc, req) {
    return svc.statistics(req.params.id);
};
var Routes = [
    {
        key: 'search',
        method: 'get',
        path: 'services',
        auth: false,
        onExecute: ɵ0
    },
    {
        key: 'get',
        method: 'get',
        path: 'services/:id',
        auth: false,
        onExecute: ɵ1
    },
    {
        key: 'create',
        method: 'post',
        path: 'services',
        auth: true,
        onExecute: ɵ2
    },
    {
        key: 'update',
        method: 'put',
        path: 'services/:id',
        auth: true,
        onExecute: ɵ3
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'services/:id',
        auth: true,
        onExecute: ɵ4,
        onResponse: ɵ5
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'services/:id',
        auth: true,
        onExecute: ɵ6
    },
    {
        key: 'export',
        method: 'get',
        path: 'services/:id/export',
        auth: false,
        onExecute: ɵ7,
        onResponse: ɵ8
    },
    {
        key: 'types',
        method: 'get',
        path: 'serviceTypes',
        auth: false,
        onExecute: ɵ9
    },
    {
        key: 'import',
        method: 'post',
        path: 'services/import',
        auth: true,
        onExecute: ɵ10
    },
    {
        key: 'about',
        method: 'get',
        path: 'services/:id/about',
        auth: false,
        onExecute: ɵ11
    },
    {
        key: 'harvest',
        method: 'get',
        path: 'services/:id/harvest',
        auth: false,
        onExecute: ɵ12
    },
    {
        key: 'layers',
        method: 'get',
        path: 'services/:id/layers',
        auth: false,
        onExecute: ɵ13
    },
    {
        key: 'test',
        method: 'get',
        path: 'services/:id/test',
        auth: false,
        onExecute: ɵ14
    },
    {
        key: 'statistics',
        method: 'get',
        path: 'services/:id/statistics',
        auth: false,
        onExecute: ɵ15
    }
];
/**
 *
 */
function ServiceServiceProxy(options) {
    if (typeof (options) === 'undefined') {
        options = {};
    }
    ;
    var router = options.router;
    if (!options.router) {
        var express = require('express');
        if (!express) {
            throw new Error("ServiceServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("ServiceServiceProxy() - " +
            "Unable to create proxy route, missing router");
    options.serviceClass = ServiceService;
    ServiceProxy.bindRoutes(router, Routes, options);
    return router;
}
export default ServiceServiceProxy;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10, ɵ11, ɵ12, ɵ13, ɵ14, ɵ15 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvbm9kZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb3hpZXMvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxZQUFZLE1BQU0sUUFBUSxDQUFDO1NBU2YsVUFBUyxHQUFtQixFQUFFLEdBQVM7SUFDOUMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqQyxDQUFDLE9BT1UsVUFBUyxHQUFvQixFQUFFLEdBQVM7SUFDL0MsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbEMsQ0FBQyxPQU9VLFVBQVMsR0FBb0IsRUFBRSxHQUFTO0lBQy9DLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsQ0FBQyxPQU9VLFVBQVMsR0FBb0IsRUFBRSxHQUFTO0lBQy9DLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsQ0FBQyxPQU9VLFVBQVMsR0FBb0IsRUFBRSxHQUFTO0lBQy9DLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsT0FDVztBQUNSLGFBQWE7QUFDYixNQUFZLEVBQ1osR0FBUztJQUNULEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsQ0FBQyxPQU9VLFVBQVMsR0FBb0IsRUFBRSxHQUFTO0lBQy9DLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMs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OztHQUVHO0FBQ0gsU0FBUyxtQkFBbUIsQ0FBRSxPQUFjO0lBRXhDLElBQUcsT0FBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFdBQVcsRUFBRTtRQUNoQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ2hCO0lBQUEsQ0FBQztJQUVGLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDNUIsSUFBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7UUFDaEIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLElBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQztnQkFDbEQscURBQXFELENBQUMsQ0FBQztTQUM5RDtRQUNELE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDN0I7SUFFRCxJQUFHLENBQUMsTUFBTTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCO1lBQ2xELDhDQUE4QyxDQUFDLENBQUM7SUFFcEQsT0FBTyxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUM7SUFDdEMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRWpELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxlQUFlLG1CQUFtQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCB7U2VydmljZVNlcnZpY2V9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5pbXBvcnQgU2VydmljZVByb3h5IGZyb20gXCIuL2Jhc2VcIjtcblxuXG5jb25zdCBSb3V0ZXMgPSBbXG4gICAge1xuICAgICAgICBrZXk6ICdzZWFyY2gnLFxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICBwYXRoOiAnc2VydmljZXMnLFxuICAgICAgICBhdXRoOiBmYWxzZSxcbiAgICAgICAgb25FeGVjdXRlOiBmdW5jdGlvbihzdmM6IFNlcnZpY2VTZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuc2VhcmNoKHJlcS5xdWVyeSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAnZ2V0JyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgcGF0aDogJ3NlcnZpY2VzLzppZCcsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IFNlcnZpY2VTZXJ2aWNlLCByZXEgOiBhbnkgKSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLmdldChyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdjcmVhdGUnLFxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgcGF0aDogJ3NlcnZpY2VzJyxcbiAgICAgICAgYXV0aDogdHJ1ZSxcbiAgICAgICAgb25FeGVjdXRlOiBmdW5jdGlvbihzdmMgOiBTZXJ2aWNlU2VydmljZSwgcmVxIDogYW55ICkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5zYXZlKHJlcS5ib2R5KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICd1cGRhdGUnLFxuICAgICAgICBtZXRob2Q6ICdwdXQnLFxuICAgICAgICBwYXRoOiAnc2VydmljZXMvOmlkJyxcbiAgICAgICAgYXV0aDogdHJ1ZSxcbiAgICAgICAgb25FeGVjdXRlOiBmdW5jdGlvbihzdmMgOiBTZXJ2aWNlU2VydmljZSwgcmVxIDogYW55ICkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5zYXZlKHJlcS5ib2R5KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdkZWxldGUnLFxuICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgICBwYXRoOiAnc2VydmljZXMvOmlkJyxcbiAgICAgICAgYXV0aDogdHJ1ZSxcbiAgICAgICAgb25FeGVjdXRlOiBmdW5jdGlvbihzdmMgOiBTZXJ2aWNlU2VydmljZSwgcmVxIDogYW55ICkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5yZW1vdmUocmVxLnBhcmFtcy5pZCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVzcG9uc2U6IGZ1bmN0aW9uKFxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgcmVzdWx0IDogYW55LFxuICAgICAgICAgICAgcmVzIDogYW55KSB7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwNCkuZW5kKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAncGF0Y2gnLFxuICAgICAgICBtZXRob2Q6ICdwYXRjaCcsXG4gICAgICAgIHBhdGg6ICdzZXJ2aWNlcy86aWQnLFxuICAgICAgICBhdXRoOiB0cnVlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IFNlcnZpY2VTZXJ2aWNlLCByZXEgOiBhbnkgKSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLnBhdGNoKHJlcS5wYXJhbXMuaWQsIHJlcS5ib2R5KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdleHBvcnQnLFxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICBwYXRoOiAnc2VydmljZXMvOmlkL2V4cG9ydCcsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IFNlcnZpY2VTZXJ2aWNlLCByZXEgOiBhbnkgKSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLmV4cG9ydChyZXEucGFyYW1zLmlkLCByZXEucXVlcnkuZm9ybWF0KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25SZXNwb25zZTogZnVuY3Rpb24ocmVzdWx0IDogYW55LCByZXMgOiBhbnkpIHtcbiAgICAgICAgICAgIGxldCBtaW1lVHlwZSA9IHJlc3VsdC5oZWFkZXJzWydjb250ZW50LXR5cGUnXTtcbiAgICAgICAgICAgIGxldCBkaXNwb3NpdGlvbiA9IHJlc3VsdC5oZWFkZXJzWydjb250ZW50LWRpc3Bvc2l0aW9uJ107XG4gICAgICAgICAgICByZXMuc2V0KFwiQ29udGVudC1UeXBlXCIsIG1pbWVUeXBlKTtcbiAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtZGlzcG9zaXRpb24nLCBkaXNwb3NpdGlvbik7XG4gICAgICAgICAgICByZXMuc2VuZChyZXN1bHQuYm9keSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAndHlwZXMnLFxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICBwYXRoOiAnc2VydmljZVR5cGVzJyxcbiAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgIG9uRXhlY3V0ZTogZnVuY3Rpb24oc3ZjIDogU2VydmljZVNlcnZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMudHlwZXMoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdpbXBvcnQnLFxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgcGF0aDogJ3NlcnZpY2VzL2ltcG9ydCcsXG4gICAgICAgIGF1dGg6IHRydWUsXG4gICAgICAgIG9uRXhlY3V0ZTogZnVuY3Rpb24oc3ZjIDogU2VydmljZVNlcnZpY2UsIHJlcSA6IGFueSApIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuaW1wb3J0KHJlcS5ib2R5KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdhYm91dCcsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHBhdGg6ICdzZXJ2aWNlcy86aWQvYWJvdXQnLFxuICAgICAgICBhdXRoOiBmYWxzZSxcbiAgICAgICAgb25FeGVjdXRlOiBmdW5jdGlvbihzdmMgOiBTZXJ2aWNlU2VydmljZSwgcmVxIDogYW55ICkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5hYm91dChyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdoYXJ2ZXN0JyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgcGF0aDogJ3NlcnZpY2VzLzppZC9oYXJ2ZXN0JyxcbiAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgIG9uRXhlY3V0ZTogZnVuY3Rpb24oc3ZjIDogU2VydmljZVNlcnZpY2UsIHJlcSA6IGFueSApIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuaGFydmVzdChyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdsYXllcnMnLFxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICBwYXRoOiAnc2VydmljZXMvOmlkL2xheWVycycsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKCBzdmMgOiBTZXJ2aWNlU2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLmxheWVycyhyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICd0ZXN0JyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgcGF0aDogJ3NlcnZpY2VzLzppZC90ZXN0JyxcbiAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgIG9uRXhlY3V0ZTogZnVuY3Rpb24oc3ZjIDogU2VydmljZVNlcnZpY2UsIHJlcSA6IGFueSApIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMubGl2ZVRlc3QocmVxLnBhcmFtcy5pZCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAnc3RhdGlzdGljcycsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHBhdGg6ICdzZXJ2aWNlcy86aWQvc3RhdGlzdGljcycsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IFNlcnZpY2VTZXJ2aWNlLCByZXEgOiBhbnkgKSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLnN0YXRpc3RpY3MocmVxLnBhcmFtcy5pZCk7XG4gICAgICAgIH1cbiAgICB9XG5dO1xuXG5cblxuXG4vKipcbiAqXG4gKi9cbmZ1bmN0aW9uIFNlcnZpY2VTZXJ2aWNlUHJveHkoIG9wdGlvbnMgPzogYW55ICkge1xuXG4gICAgaWYodHlwZW9mKG9wdGlvbnMpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgfTtcblxuICAgIGxldCByb3V0ZXIgPSBvcHRpb25zLnJvdXRlcjtcbiAgICBpZighb3B0aW9ucy5yb3V0ZXIpIHtcbiAgICAgICAgbGV0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG4gICAgICAgIGlmKCFleHByZXNzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTZXJ2aWNlU2VydmljZVByb3h5KCkgLSBNdXN0IHByb3ZpZGVcIiArXG4gICAgICAgICAgICAgICAgXCInb3B0aW9ucy5yb3V0ZXInIG9yIGluY2x1ZGUgZXhwcmVzcyBhcyBhIGRlcGVuZGVuY3lcIik7XG4gICAgICAgIH1cbiAgICAgICAgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcbiAgICB9XG5cbiAgICBpZighcm91dGVyKSB0aHJvdyBuZXcgRXJyb3IoXCJTZXJ2aWNlU2VydmljZVByb3h5KCkgLSBcIiArXG4gICAgICAgIFwiVW5hYmxlIHRvIGNyZWF0ZSBwcm94eSByb3V0ZSwgbWlzc2luZyByb3V0ZXJcIik7XG5cbiAgICBvcHRpb25zLnNlcnZpY2VDbGFzcyA9IFNlcnZpY2VTZXJ2aWNlO1xuICAgIFNlcnZpY2VQcm94eS5iaW5kUm91dGVzKHJvdXRlciwgUm91dGVzLCBvcHRpb25zKTtcblxuICAgIHJldHVybiByb3V0ZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZpY2VTZXJ2aWNlUHJveHk7XG4iXX0=