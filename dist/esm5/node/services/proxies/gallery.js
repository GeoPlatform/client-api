import { GalleryService } from "@geoplatform/client";
import ServiceProxy from './base';
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
};
var Routes = [
    {
        key: 'search',
        method: 'get',
        path: 'galleries',
        auth: false,
        onExecute: ɵ0
    },
    {
        key: 'get',
        method: 'get',
        path: 'galleries/:id',
        auth: false,
        onExecute: ɵ1
    },
    {
        key: 'create',
        method: 'post',
        path: 'galleries',
        auth: true,
        onExecute: ɵ2
    },
    {
        key: 'update',
        method: 'put',
        path: 'galleries/:id',
        auth: true,
        onExecute: ɵ3
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'galleries/:id',
        auth: true,
        onExecute: ɵ4,
        onResponse: ɵ5
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'galleries/:id',
        auth: true,
        onExecute: ɵ6
    },
    {
        key: 'export',
        method: 'get',
        path: 'galleries/:id/export',
        auth: false,
        onExecute: ɵ7,
        onResponse: ɵ8
    }
];
/**
 * GalleryServiceProxy
 *
 * see examples/node/item-proxy for an in-depth example
 */
function GalleryServiceProxy(options) {
    if (typeof (options) === 'undefined') {
        options = {};
    }
    ;
    var router = options.router;
    if (!options.router) {
        var express = require('express');
        if (!express) {
            throw new Error("GalleryServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("GalleryServiceProxy() - " +
            "Unable to create proxy route, missing router");
    options.serviceClass = GalleryService;
    ServiceProxy.bindRoutes(router, Routes, options);
    return router;
}
export default GalleryServiceProxy;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvbm9kZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb3hpZXMvZ2FsbGVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxZQUFZLE1BQU0sUUFBUSxDQUFDO1NBUWYsVUFBUyxHQUFvQixFQUFFLEdBQVM7SUFDL0MsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqQyxDQUFDLE9BT1UsVUFBUyxHQUFvQixFQUFFLEdBQVM7SUFDL0MsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbEMsQ0FBQyxPQU9VLFVBQVMsR0FBb0IsRUFBRSxHQUFTO0lBQy9DLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsQ0FBQyxPQU9VLFVBQVMsR0FBb0IsRUFBRSxHQUFTO0lBQy9DLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsQ0FBQyxPQU9VLFVBQVMsR0FBb0IsRUFBRSxHQUFTO0lBQy9DLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsT0FDVztBQUNSLGFBQWE7QUFDYixNQUFZLEVBQ1osR0FBUztJQUNULEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsQ0FBQyxPQU9VLFVBQVMsR0FBb0IsRUFBRSxHQUFTO0lBQy9DLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMs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LE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUVqRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQsZUFBZSxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQge0dhbGxlcnlTZXJ2aWNlfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuaW1wb3J0IFNlcnZpY2VQcm94eSBmcm9tICcuL2Jhc2UnO1xuXG5jb25zdCBSb3V0ZXMgPSBbXG4gICAge1xuICAgICAgICBrZXk6ICdzZWFyY2gnLFxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICBwYXRoOiAnZ2FsbGVyaWVzJyxcbiAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgIG9uRXhlY3V0ZTogZnVuY3Rpb24oc3ZjIDogR2FsbGVyeVNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5zZWFyY2gocmVxLnF1ZXJ5KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdnZXQnLFxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICBwYXRoOiAnZ2FsbGVyaWVzLzppZCcsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IEdhbGxlcnlTZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuZ2V0KHJlcS5wYXJhbXMuaWQpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ2NyZWF0ZScsXG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICBwYXRoOiAnZ2FsbGVyaWVzJyxcbiAgICAgICAgYXV0aDogdHJ1ZSxcbiAgICAgICAgb25FeGVjdXRlOiBmdW5jdGlvbihzdmMgOiBHYWxsZXJ5U2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLnNhdmUocmVxLmJvZHkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ3VwZGF0ZScsXG4gICAgICAgIG1ldGhvZDogJ3B1dCcsXG4gICAgICAgIHBhdGg6ICdnYWxsZXJpZXMvOmlkJyxcbiAgICAgICAgYXV0aDogdHJ1ZSxcbiAgICAgICAgb25FeGVjdXRlOiBmdW5jdGlvbihzdmMgOiBHYWxsZXJ5U2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLnNhdmUocmVxLmJvZHkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ2RlbGV0ZScsXG4gICAgICAgIG1ldGhvZDogJ2RlbGV0ZScsXG4gICAgICAgIHBhdGg6ICdnYWxsZXJpZXMvOmlkJyxcbiAgICAgICAgYXV0aDogdHJ1ZSxcbiAgICAgICAgb25FeGVjdXRlOiBmdW5jdGlvbihzdmMgOiBHYWxsZXJ5U2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLnJlbW92ZShyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25SZXNwb25zZTogZnVuY3Rpb24oXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICByZXN1bHQgOiBhbnksXG4gICAgICAgICAgICByZXMgOiBhbnkpIHtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjA0KS5lbmQoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdwYXRjaCcsXG4gICAgICAgIG1ldGhvZDogJ3BhdGNoJyxcbiAgICAgICAgcGF0aDogJ2dhbGxlcmllcy86aWQnLFxuICAgICAgICBhdXRoOiB0cnVlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IEdhbGxlcnlTZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMucGF0Y2gocmVxLnBhcmFtcy5pZCwgcmVxLmJvZHkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ2V4cG9ydCcsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHBhdGg6ICdnYWxsZXJpZXMvOmlkL2V4cG9ydCcsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IEdhbGxlcnlTZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuZXhwb3J0KHJlcS5wYXJhbXMuaWQsIHJlcS5xdWVyeS5mb3JtYXQpO1xuICAgICAgICB9LFxuICAgICAgICBvblJlc3BvbnNlOiBmdW5jdGlvbihyZXN1bHQgOiBhbnksIHJlcyA6IGFueSkge1xuICAgICAgICAgICAgbGV0IG1pbWVUeXBlID0gcmVzdWx0LmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddO1xuICAgICAgICAgICAgbGV0IGRpc3Bvc2l0aW9uID0gcmVzdWx0LmhlYWRlcnNbJ2NvbnRlbnQtZGlzcG9zaXRpb24nXTtcbiAgICAgICAgICAgIHJlcy5zZXQoXCJDb250ZW50LVR5cGVcIiwgbWltZVR5cGUpO1xuICAgICAgICAgICAgcmVzLnNldEhlYWRlcignQ29udGVudC1kaXNwb3NpdGlvbicsIGRpc3Bvc2l0aW9uKTtcbiAgICAgICAgICAgIHJlcy5zZW5kKHJlc3VsdC5ib2R5KTtcbiAgICAgICAgfVxuICAgIH1cbl07XG5cbi8qKlxuICogR2FsbGVyeVNlcnZpY2VQcm94eVxuICpcbiAqIHNlZSBleGFtcGxlcy9ub2RlL2l0ZW0tcHJveHkgZm9yIGFuIGluLWRlcHRoIGV4YW1wbGVcbiAqL1xuZnVuY3Rpb24gR2FsbGVyeVNlcnZpY2VQcm94eSggb3B0aW9ucyA/OiBhbnkgKSB7XG5cbiAgICBpZih0eXBlb2Yob3B0aW9ucykgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9O1xuXG4gICAgbGV0IHJvdXRlciA9IG9wdGlvbnMucm91dGVyO1xuICAgIGlmKCFvcHRpb25zLnJvdXRlcikge1xuICAgICAgICBsZXQgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbiAgICAgICAgaWYoIWV4cHJlc3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdhbGxlcnlTZXJ2aWNlUHJveHkoKSAtIE11c3QgcHJvdmlkZVwiICtcbiAgICAgICAgICAgICAgICBcIidvcHRpb25zLnJvdXRlcicgb3IgaW5jbHVkZSBleHByZXNzIGFzIGEgZGVwZW5kZW5jeVwiKTtcbiAgICAgICAgfVxuICAgICAgICByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuICAgIH1cblxuICAgIGlmKCFyb3V0ZXIpIHRocm93IG5ldyBFcnJvcihcIkdhbGxlcnlTZXJ2aWNlUHJveHkoKSAtIFwiICtcbiAgICAgICAgXCJVbmFibGUgdG8gY3JlYXRlIHByb3h5IHJvdXRlLCBtaXNzaW5nIHJvdXRlclwiKTtcblxuICAgIG9wdGlvbnMuc2VydmljZUNsYXNzID0gR2FsbGVyeVNlcnZpY2U7XG4gICAgU2VydmljZVByb3h5LmJpbmRSb3V0ZXMocm91dGVyLCBSb3V0ZXMsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHJvdXRlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FsbGVyeVNlcnZpY2VQcm94eTtcbiJdfQ==