/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { LayerService } from "@geoplatform/client";
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
// @ts-ignore
result, res) { res.status(204).end(); }, ɵ6 = function (svc, req) {
    return svc.patch(req.params.id, req.body);
}, ɵ7 = function (svc, req) {
    return svc.export(req.params.id, req.query.format);
}, ɵ8 = function (result, res) {
    /** @type {?} */
    var mimeType = result.headers['content-type'];
    /** @type {?} */
    var disposition = result.headers['content-disposition'];
    res.set("Content-Type", mimeType);
    res.setHeader('Content-disposition', disposition);
    res.send(result.body);
}, ɵ9 = function (svc, req) {
    return svc.style(req.params.id);
}, ɵ10 = function (svc, req) {
    return svc.describe(req.params.id, req.body);
}, ɵ11 = function (svc, req) {
    return svc.validate(req.params.id, req.body);
};
/** @type {?} */
var Routes = [
    {
        key: 'search',
        method: 'get',
        path: 'layers',
        auth: false,
        execFn: ɵ0
    },
    {
        key: 'get',
        method: 'get',
        path: 'layers/:id',
        auth: false,
        execFn: ɵ1
    },
    {
        key: 'create',
        method: 'post',
        path: 'layers',
        auth: true,
        execFn: ɵ2
    },
    {
        key: 'update',
        method: 'put',
        path: 'layers/:id',
        auth: true,
        execFn: ɵ3
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'layers/:id',
        auth: true,
        execFn: ɵ4,
        respFn: ɵ5
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'layers/:id',
        auth: true,
        execFn: ɵ6
    },
    {
        key: 'export',
        method: 'get',
        path: 'layers/:id/export',
        auth: false,
        execFn: ɵ7,
        respFn: ɵ8
    },
    {
        key: 'style',
        method: 'get',
        path: 'layers/:id/style',
        auth: false,
        execFn: ɵ9
    },
    {
        key: 'describe',
        method: 'post',
        path: 'layers/:id/describe',
        auth: false,
        execFn: ɵ10
    },
    {
        key: 'validate',
        method: 'post',
        path: 'layers/:id/validate',
        auth: false,
        execFn: ɵ11
    }
];
/**
 *
 * @param {?=} options
 * @return {?}
 */
function LayerServiceProxy(options) {
    if (typeof (options) === 'undefined') {
        options = {};
    }
    ;
    /** @type {?} */
    var router = options.router;
    if (!options.router) {
        /** @type {?} */
        var express = require('express');
        if (!express) {
            throw new Error("LayerServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("LayerServiceProxy() - " +
            "Unable to create proxy route, missing router");
    options.serviceClass = LayerService;
    ServiceProxy.bindRoutes(router, Routes, options);
    return router;
}
export default LayerServiceProxy;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10, ɵ11 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L25vZGUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9wcm94aWVzL2xheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxZQUFZLE1BQU0sUUFBUSxDQUFDO1NBVWxCLFVBQVMsR0FBa0IsRUFBRSxHQUFTO0lBQzFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDaEMsT0FPTyxVQUFTLEdBQWtCLEVBQUUsR0FBUztJQUMxQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNqQyxPQU9PLFVBQVMsR0FBa0IsRUFBRSxHQUFTO0lBQzFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDN0IsT0FPTyxVQUFTLEdBQWtCLEVBQUUsR0FBUztJQUMxQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzdCLE9BT08sVUFBUyxHQUFrQixFQUFFLEdBQVM7SUFDMUMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FBRSxPQUUvQjs7QUFFSixBQURBLGFBQWE7QUFDYixNQUFZLEVBQ1osR0FBUyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxPQU9qQyxVQUFTLEdBQWtCLEVBQUUsR0FBUztJQUMxQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzdDLE9B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QUFVO1FBQ2YsTUFBTSxFQUFFLE1BQU07UUFDZCxJQUFJLEVBQUUscUJBQXFCO1FBQzNCLElBQUksRUFBRSxLQUFLO1FBQ1gsTUFBTSxLQUVMO0tBQ0o7Q0FDSixDQUFDOzs7Ozs7QUFPRiwyQkFBNEIsT0FBYztJQUV0QyxJQUFHLE9BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLEVBQUU7UUFDaEMsT0FBTyxHQUFHLEVBQUUsQ0FBQztLQUNoQjtJQUFBLENBQUM7O0lBRUYsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUM1QixJQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTs7UUFDaEIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLElBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQztnQkFDaEQscURBQXFELENBQUMsQ0FBQztTQUM5RDtRQUNELE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDN0I7SUFFRCxJQUFHLENBQUMsTUFBTTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCO1lBQ2hELDhDQUE4QyxDQUFDLENBQUM7SUFFcEQsT0FBTyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDcEMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRWpELE9BQU8sTUFBTSxDQUFDO0NBQ2pCO0FBRUQsZUFBZSxpQkFBaUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQge0xheWVyU2VydmljZX0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcbmltcG9ydCBTZXJ2aWNlUHJveHkgZnJvbSBcIi4vYmFzZVwiO1xuXG5cblxuY29uc3QgUm91dGVzID0gW1xuICAgIHtcbiAgICAgICAga2V5OiAnc2VhcmNoJyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgcGF0aDogJ2xheWVycycsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBleGVjRm46IGZ1bmN0aW9uKHN2YyA6IExheWVyU2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLnNlYXJjaChyZXEucXVlcnkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ2dldCcsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHBhdGg6ICdsYXllcnMvOmlkJyxcbiAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgIGV4ZWNGbjogZnVuY3Rpb24oc3ZjIDogTGF5ZXJTZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuZ2V0KHJlcS5wYXJhbXMuaWQpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ2NyZWF0ZScsXG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICBwYXRoOiAnbGF5ZXJzJyxcbiAgICAgICAgYXV0aDogdHJ1ZSxcbiAgICAgICAgZXhlY0ZuOiBmdW5jdGlvbihzdmMgOiBMYXllclNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5zYXZlKHJlcS5ib2R5KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICd1cGRhdGUnLFxuICAgICAgICBtZXRob2Q6ICdwdXQnLFxuICAgICAgICBwYXRoOiAnbGF5ZXJzLzppZCcsXG4gICAgICAgIGF1dGg6IHRydWUsXG4gICAgICAgIGV4ZWNGbjogZnVuY3Rpb24oc3ZjIDogTGF5ZXJTZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuc2F2ZShyZXEuYm9keSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAnZGVsZXRlJyxcbiAgICAgICAgbWV0aG9kOiAnZGVsZXRlJyxcbiAgICAgICAgcGF0aDogJ2xheWVycy86aWQnLFxuICAgICAgICBhdXRoOiB0cnVlLFxuICAgICAgICBleGVjRm46IGZ1bmN0aW9uKHN2YyA6IExheWVyU2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLnJlbW92ZShyZXEucGFyYW1zLmlkKTsgfVxuICAgICAgICAgICAgLFxuICAgICAgICByZXNwRm46IGZ1bmN0aW9uKFxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgcmVzdWx0IDogYW55LFxuICAgICAgICAgICAgcmVzIDogYW55KSB7IHJlcy5zdGF0dXMoMjA0KS5lbmQoKTsgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdwYXRjaCcsXG4gICAgICAgIG1ldGhvZDogJ3BhdGNoJyxcbiAgICAgICAgcGF0aDogJ2xheWVycy86aWQnLFxuICAgICAgICBhdXRoOiB0cnVlLFxuICAgICAgICBleGVjRm46IGZ1bmN0aW9uKHN2YyA6IExheWVyU2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLnBhdGNoKHJlcS5wYXJhbXMuaWQsIHJlcS5ib2R5KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdleHBvcnQnLFxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICBwYXRoOiAnbGF5ZXJzLzppZC9leHBvcnQnLFxuICAgICAgICBhdXRoOiBmYWxzZSxcbiAgICAgICAgZXhlY0ZuOiBmdW5jdGlvbihzdmMgOiBMYXllclNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5leHBvcnQocmVxLnBhcmFtcy5pZCwgcmVxLnF1ZXJ5LmZvcm1hdCk7IH1cbiAgICAgICAgICAgICxcbiAgICAgICAgcmVzcEZuOiBmdW5jdGlvbihyZXN1bHQgOiBhbnksIHJlcyA6IGFueSkge1xuICAgICAgICAgICAgbGV0IG1pbWVUeXBlID0gcmVzdWx0LmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddO1xuICAgICAgICAgICAgbGV0IGRpc3Bvc2l0aW9uID0gcmVzdWx0LmhlYWRlcnNbJ2NvbnRlbnQtZGlzcG9zaXRpb24nXTtcbiAgICAgICAgICAgIHJlcy5zZXQoXCJDb250ZW50LVR5cGVcIiwgbWltZVR5cGUpO1xuICAgICAgICAgICAgcmVzLnNldEhlYWRlcignQ29udGVudC1kaXNwb3NpdGlvbicsIGRpc3Bvc2l0aW9uKTtcbiAgICAgICAgICAgIHJlcy5zZW5kKHJlc3VsdC5ib2R5KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdzdHlsZScsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHBhdGg6ICdsYXllcnMvOmlkL3N0eWxlJyxcbiAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgIGV4ZWNGbjogZnVuY3Rpb24oc3ZjIDogTGF5ZXJTZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuc3R5bGUocmVxLnBhcmFtcy5pZCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAnZGVzY3JpYmUnLFxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgcGF0aDogJ2xheWVycy86aWQvZGVzY3JpYmUnLFxuICAgICAgICBhdXRoOiBmYWxzZSxcbiAgICAgICAgZXhlY0ZuOiBmdW5jdGlvbihzdmMgOiBMYXllclNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5kZXNjcmliZShyZXEucGFyYW1zLmlkLCByZXEuYm9keSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAndmFsaWRhdGUnLFxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgcGF0aDogJ2xheWVycy86aWQvdmFsaWRhdGUnLFxuICAgICAgICBhdXRoOiBmYWxzZSxcbiAgICAgICAgZXhlY0ZuOiBmdW5jdGlvbihzdmMgOiBMYXllclNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy52YWxpZGF0ZShyZXEucGFyYW1zLmlkLCByZXEuYm9keSk7XG4gICAgICAgIH1cbiAgICB9XG5dO1xuXG5cblxuLyoqXG4gKlxuICovXG5mdW5jdGlvbiBMYXllclNlcnZpY2VQcm94eSggb3B0aW9ucyA/OiBhbnkgKSB7XG5cbiAgICBpZih0eXBlb2Yob3B0aW9ucykgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9O1xuXG4gICAgbGV0IHJvdXRlciA9IG9wdGlvbnMucm91dGVyO1xuICAgIGlmKCFvcHRpb25zLnJvdXRlcikge1xuICAgICAgICBsZXQgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbiAgICAgICAgaWYoIWV4cHJlc3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxheWVyU2VydmljZVByb3h5KCkgLSBNdXN0IHByb3ZpZGVcIiArXG4gICAgICAgICAgICAgICAgXCInb3B0aW9ucy5yb3V0ZXInIG9yIGluY2x1ZGUgZXhwcmVzcyBhcyBhIGRlcGVuZGVuY3lcIik7XG4gICAgICAgIH1cbiAgICAgICAgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcbiAgICB9XG5cbiAgICBpZighcm91dGVyKSB0aHJvdyBuZXcgRXJyb3IoXCJMYXllclNlcnZpY2VQcm94eSgpIC0gXCIgK1xuICAgICAgICBcIlVuYWJsZSB0byBjcmVhdGUgcHJveHkgcm91dGUsIG1pc3Npbmcgcm91dGVyXCIpO1xuXG4gICAgb3B0aW9ucy5zZXJ2aWNlQ2xhc3MgPSBMYXllclNlcnZpY2U7XG4gICAgU2VydmljZVByb3h5LmJpbmRSb3V0ZXMocm91dGVyLCBSb3V0ZXMsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHJvdXRlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJTZXJ2aWNlUHJveHk7XG4iXX0=