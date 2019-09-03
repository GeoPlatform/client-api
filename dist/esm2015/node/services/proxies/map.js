import { MapService } from "@geoplatform/client";
import ServiceProxy from "./base";
const ɵ0 = function (svc, req) {
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
    let mimeType = result.headers['content-type'];
    let disposition = result.headers['content-disposition'];
    res.set("Content-Type", mimeType);
    res.setHeader('Content-disposition', disposition);
    res.send(result.body);
};
const Routes = [
    {
        key: 'search',
        method: 'get',
        path: 'maps',
        auth: false,
        onExecute: ɵ0
    },
    {
        key: 'get',
        method: 'get',
        path: 'maps/:id',
        auth: false,
        onExecute: ɵ1
    },
    {
        key: 'create',
        method: 'post',
        path: 'maps',
        auth: true,
        onExecute: ɵ2
    },
    {
        key: 'update',
        method: 'put',
        path: 'maps/:id',
        auth: true,
        onExecute: ɵ3
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'maps/:id',
        auth: true,
        onExecute: ɵ4,
        onResponse: ɵ5
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'maps/:id',
        auth: true,
        onExecute: ɵ6
    },
    {
        key: 'export',
        method: 'get',
        path: 'maps/:id/export',
        auth: false,
        onExecute: ɵ7,
        onResponse: ɵ8
    }
];
/**
 * MapServiceProxy
 *
 * see examples/node/item-proxy for an in-depth example
 */
function MapServiceProxy(options) {
    if (typeof (options) === 'undefined') {
        options = {};
    }
    ;
    let router = options.router;
    if (!options.router) {
        let express = require('express');
        if (!express) {
            throw new Error("MapServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("MapServiceProxy() - " +
            "Unable to create proxy route, missing router");
    options.serviceClass = MapService;
    ServiceProxy.bindRoutes(router, Routes, options);
    return router;
}
export default MapServiceProxy;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC9ub2RlLyIsInNvdXJjZXMiOlsic2VydmljZXMvcHJveGllcy9tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQy9DLE9BQU8sWUFBWSxNQUFNLFFBQVEsQ0FBQztXQVFmLFVBQVMsR0FBZ0IsRUFBRSxHQUFTO0lBQzNDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMsQ0FBQyxPQU9VLFVBQVMsR0FBZ0IsRUFBRSxHQUFTO0lBQzNDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsT0FPVSxVQUFTLEdBQWdCLEVBQUUsR0FBUztJQUMzQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLENBQUMsT0FPVSxVQUFTLEdBQWdCLEVBQUUsR0FBUztJQUMzQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLENBQUMsT0FPVSxVQUFTLEdBQWdCLEVBQUUsR0FBUztJQUMzQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUFDLENBQUMsT0FFM0I7QUFDUixhQUFhO0FBQ2IsTUFBWSxFQUNaLEdBQVM7SUFDVCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLENBQUMsT0FPVSxVQUFTLEdBQWdCLEVBQUUsR0FBUztJQUMzQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FB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QUUsT0FBTyxDQUFDLENBQUM7SUFFakQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELGVBQWUsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCB7TWFwU2VydmljZX0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcbmltcG9ydCBTZXJ2aWNlUHJveHkgZnJvbSBcIi4vYmFzZVwiO1xuXG5jb25zdCBSb3V0ZXMgPSBbXG4gICAge1xuICAgICAgICBrZXk6ICdzZWFyY2gnLFxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICBwYXRoOiAnbWFwcycsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IE1hcFNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5zZWFyY2gocmVxLnF1ZXJ5KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdnZXQnLFxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICBwYXRoOiAnbWFwcy86aWQnLFxuICAgICAgICBhdXRoOiBmYWxzZSxcbiAgICAgICAgb25FeGVjdXRlOiBmdW5jdGlvbihzdmMgOiBNYXBTZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuZ2V0KHJlcS5wYXJhbXMuaWQpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ2NyZWF0ZScsXG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICBwYXRoOiAnbWFwcycsXG4gICAgICAgIGF1dGg6IHRydWUsXG4gICAgICAgIG9uRXhlY3V0ZTogZnVuY3Rpb24oc3ZjIDogTWFwU2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLnNhdmUocmVxLmJvZHkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ3VwZGF0ZScsXG4gICAgICAgIG1ldGhvZDogJ3B1dCcsXG4gICAgICAgIHBhdGg6ICdtYXBzLzppZCcsXG4gICAgICAgIGF1dGg6IHRydWUsXG4gICAgICAgIG9uRXhlY3V0ZTogZnVuY3Rpb24oc3ZjIDogTWFwU2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLnNhdmUocmVxLmJvZHkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ2RlbGV0ZScsXG4gICAgICAgIG1ldGhvZDogJ2RlbGV0ZScsXG4gICAgICAgIHBhdGg6ICdtYXBzLzppZCcsXG4gICAgICAgIGF1dGg6IHRydWUsXG4gICAgICAgIG9uRXhlY3V0ZTogZnVuY3Rpb24oc3ZjIDogTWFwU2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLnJlbW92ZShyZXEucGFyYW1zLmlkKTsgfVxuICAgICAgICAgICAgLFxuICAgICAgICBvblJlc3BvbnNlOiBmdW5jdGlvbihcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHJlc3VsdCA6IGFueSxcbiAgICAgICAgICAgIHJlcyA6IGFueSkge1xuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDQpLmVuZCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ3BhdGNoJyxcbiAgICAgICAgbWV0aG9kOiAncGF0Y2gnLFxuICAgICAgICBwYXRoOiAnbWFwcy86aWQnLFxuICAgICAgICBhdXRoOiB0cnVlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IE1hcFNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5wYXRjaChyZXEucGFyYW1zLmlkLCByZXEuYm9keSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAnZXhwb3J0JyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgcGF0aDogJ21hcHMvOmlkL2V4cG9ydCcsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IE1hcFNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5leHBvcnQocmVxLnBhcmFtcy5pZCwgcmVxLnF1ZXJ5LmZvcm1hdCk7IH1cbiAgICAgICAgICAgICxcbiAgICAgICAgb25SZXNwb25zZTogZnVuY3Rpb24ocmVzdWx0IDogYW55LCByZXMgOiBhbnkpIHtcbiAgICAgICAgICAgIGxldCBtaW1lVHlwZSA9IHJlc3VsdC5oZWFkZXJzWydjb250ZW50LXR5cGUnXTtcbiAgICAgICAgICAgIGxldCBkaXNwb3NpdGlvbiA9IHJlc3VsdC5oZWFkZXJzWydjb250ZW50LWRpc3Bvc2l0aW9uJ107XG4gICAgICAgICAgICByZXMuc2V0KFwiQ29udGVudC1UeXBlXCIsIG1pbWVUeXBlKTtcbiAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtZGlzcG9zaXRpb24nLCBkaXNwb3NpdGlvbik7XG4gICAgICAgICAgICByZXMuc2VuZChyZXN1bHQuYm9keSk7XG4gICAgICAgIH1cbiAgICB9XG5dO1xuXG4vKipcbiAqIE1hcFNlcnZpY2VQcm94eVxuICpcbiAqIHNlZSBleGFtcGxlcy9ub2RlL2l0ZW0tcHJveHkgZm9yIGFuIGluLWRlcHRoIGV4YW1wbGVcbiAqL1xuZnVuY3Rpb24gTWFwU2VydmljZVByb3h5KCBvcHRpb25zID86IGFueSApIHtcblxuICAgIGlmKHR5cGVvZihvcHRpb25zKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH07XG5cbiAgICBsZXQgcm91dGVyID0gb3B0aW9ucy5yb3V0ZXI7XG4gICAgaWYoIW9wdGlvbnMucm91dGVyKSB7XG4gICAgICAgIGxldCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuICAgICAgICBpZighZXhwcmVzcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWFwU2VydmljZVByb3h5KCkgLSBNdXN0IHByb3ZpZGVcIiArXG4gICAgICAgICAgICAgICAgXCInb3B0aW9ucy5yb3V0ZXInIG9yIGluY2x1ZGUgZXhwcmVzcyBhcyBhIGRlcGVuZGVuY3lcIik7XG4gICAgICAgIH1cbiAgICAgICAgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcbiAgICB9XG5cbiAgICBpZighcm91dGVyKSB0aHJvdyBuZXcgRXJyb3IoXCJNYXBTZXJ2aWNlUHJveHkoKSAtIFwiICtcbiAgICAgICAgXCJVbmFibGUgdG8gY3JlYXRlIHByb3h5IHJvdXRlLCBtaXNzaW5nIHJvdXRlclwiKTtcblxuICAgIG9wdGlvbnMuc2VydmljZUNsYXNzID0gTWFwU2VydmljZTtcbiAgICBTZXJ2aWNlUHJveHkuYmluZFJvdXRlcyhyb3V0ZXIsIFJvdXRlcywgb3B0aW9ucyk7XG5cbiAgICByZXR1cm4gcm91dGVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNYXBTZXJ2aWNlUHJveHk7XG4iXX0=