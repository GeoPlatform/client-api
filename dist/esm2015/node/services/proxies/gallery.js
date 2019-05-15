/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { GalleryService } from "@geoplatform/client";
import ServiceProxy from './base';
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
// @ts-ignore
result, res) {
    res.status(204).end();
}, ɵ6 = function (svc, req) {
    return svc.patch(req.params.id, req.body);
}, ɵ7 = function (svc, req) {
    return svc.export(req.params.id, req.query.format);
}, ɵ8 = function (result, res) {
    /** @type {?} */
    let mimeType = result.headers['content-type'];
    /** @type {?} */
    let disposition = result.headers['content-disposition'];
    res.set("Content-Type", mimeType);
    res.setHeader('Content-disposition', disposition);
    res.send(result.body);
};
/** @type {?} */
const Routes = [
    {
        key: 'search',
        method: 'get',
        path: 'galleries',
        auth: false,
        execFn: ɵ0
    },
    {
        key: 'get',
        method: 'get',
        path: 'galleries/:id',
        auth: false,
        execFn: ɵ1
    },
    {
        key: 'create',
        method: 'post',
        path: 'galleries',
        auth: true,
        execFn: ɵ2
    },
    {
        key: 'update',
        method: 'put',
        path: 'galleries/:id',
        auth: true,
        execFn: ɵ3
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'galleries/:id',
        auth: true,
        execFn: ɵ4,
        respFn: ɵ5
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'galleries/:id',
        auth: true,
        execFn: ɵ6
    },
    {
        key: 'export',
        method: 'get',
        path: 'galleries/:id/export',
        auth: false,
        execFn: ɵ7,
        respFn: ɵ8
    }
];
/**
 * GalleryServiceProxy
 *
 * see examples/node/item-proxy for an in-depth example
 * @param {?=} options
 * @return {?}
 */
function GalleryServiceProxy(options) {
    if (typeof (options) === 'undefined') {
        options = {};
    }
    ;
    /** @type {?} */
    let router = options.router;
    if (!options.router) {
        /** @type {?} */
        let express = require('express');
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvbm9kZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb3hpZXMvZ2FsbGVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sWUFBWSxNQUFNLFFBQVEsQ0FBQztXQVFsQixVQUFTLEdBQW9CLEVBQUUsR0FBUztJQUM1QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2hDLE9BT08sVUFBUyxHQUFvQixFQUFFLEdBQVM7SUFDNUMsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDakMsT0FPTyxVQUFTLEdBQW9CLEVBQUUsR0FBUztJQUM1QyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzdCLE9BT08sVUFBUyxHQUFvQixFQUFFLEdBQVM7SUFDNUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUM3QixPQU9PLFVBQVMsR0FBb0IsRUFBRSxHQUFTO0lBQzVDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ3BDLE9BQ087O0FBRUosQUFEQSxhQUFhO0FBQ2IsTUFBWSxFQUNaLEdBQVM7SUFDVCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0NBQ3pCLE9BT08sVUFBUyxHQUFvQixFQUFFLEdBQVM7SUFDNUMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUM3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QztDQUNqQjtBQUVELGVBQWUsbUJBQW1CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IHtHYWxsZXJ5U2VydmljZX0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcbmltcG9ydCBTZXJ2aWNlUHJveHkgZnJvbSAnLi9iYXNlJztcblxuY29uc3QgUm91dGVzID0gW1xuICAgIHtcbiAgICAgICAga2V5OiAnc2VhcmNoJyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgcGF0aDogJ2dhbGxlcmllcycsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBleGVjRm46IGZ1bmN0aW9uKHN2YyA6IEdhbGxlcnlTZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuc2VhcmNoKHJlcS5xdWVyeSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAnZ2V0JyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgcGF0aDogJ2dhbGxlcmllcy86aWQnLFxuICAgICAgICBhdXRoOiBmYWxzZSxcbiAgICAgICAgZXhlY0ZuOiBmdW5jdGlvbihzdmMgOiBHYWxsZXJ5U2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLmdldChyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdjcmVhdGUnLFxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgcGF0aDogJ2dhbGxlcmllcycsXG4gICAgICAgIGF1dGg6IHRydWUsXG4gICAgICAgIGV4ZWNGbjogZnVuY3Rpb24oc3ZjIDogR2FsbGVyeVNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5zYXZlKHJlcS5ib2R5KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICd1cGRhdGUnLFxuICAgICAgICBtZXRob2Q6ICdwdXQnLFxuICAgICAgICBwYXRoOiAnZ2FsbGVyaWVzLzppZCcsXG4gICAgICAgIGF1dGg6IHRydWUsXG4gICAgICAgIGV4ZWNGbjogZnVuY3Rpb24oc3ZjIDogR2FsbGVyeVNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5zYXZlKHJlcS5ib2R5KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdkZWxldGUnLFxuICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgICBwYXRoOiAnZ2FsbGVyaWVzLzppZCcsXG4gICAgICAgIGF1dGg6IHRydWUsXG4gICAgICAgIGV4ZWNGbjogZnVuY3Rpb24oc3ZjIDogR2FsbGVyeVNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5yZW1vdmUocmVxLnBhcmFtcy5pZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BGbjogZnVuY3Rpb24oXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICByZXN1bHQgOiBhbnksXG4gICAgICAgICAgICByZXMgOiBhbnkpIHtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjA0KS5lbmQoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdwYXRjaCcsXG4gICAgICAgIG1ldGhvZDogJ3BhdGNoJyxcbiAgICAgICAgcGF0aDogJ2dhbGxlcmllcy86aWQnLFxuICAgICAgICBhdXRoOiB0cnVlLFxuICAgICAgICBleGVjRm46IGZ1bmN0aW9uKHN2YyA6IEdhbGxlcnlTZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMucGF0Y2gocmVxLnBhcmFtcy5pZCwgcmVxLmJvZHkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ2V4cG9ydCcsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHBhdGg6ICdnYWxsZXJpZXMvOmlkL2V4cG9ydCcsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBleGVjRm46IGZ1bmN0aW9uKHN2YyA6IEdhbGxlcnlTZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuZXhwb3J0KHJlcS5wYXJhbXMuaWQsIHJlcS5xdWVyeS5mb3JtYXQpO1xuICAgICAgICB9LFxuICAgICAgICByZXNwRm46IGZ1bmN0aW9uKHJlc3VsdCA6IGFueSwgcmVzIDogYW55KSB7XG4gICAgICAgICAgICBsZXQgbWltZVR5cGUgPSByZXN1bHQuaGVhZGVyc1snY29udGVudC10eXBlJ107XG4gICAgICAgICAgICBsZXQgZGlzcG9zaXRpb24gPSByZXN1bHQuaGVhZGVyc1snY29udGVudC1kaXNwb3NpdGlvbiddO1xuICAgICAgICAgICAgcmVzLnNldChcIkNvbnRlbnQtVHlwZVwiLCBtaW1lVHlwZSk7XG4gICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LWRpc3Bvc2l0aW9uJywgZGlzcG9zaXRpb24pO1xuICAgICAgICAgICAgcmVzLnNlbmQocmVzdWx0LmJvZHkpO1xuICAgICAgICB9XG4gICAgfVxuXTtcblxuLyoqXG4gKiBHYWxsZXJ5U2VydmljZVByb3h5XG4gKlxuICogc2VlIGV4YW1wbGVzL25vZGUvaXRlbS1wcm94eSBmb3IgYW4gaW4tZGVwdGggZXhhbXBsZVxuICovXG5mdW5jdGlvbiBHYWxsZXJ5U2VydmljZVByb3h5KCBvcHRpb25zID86IGFueSApIHtcblxuICAgIGlmKHR5cGVvZihvcHRpb25zKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH07XG5cbiAgICBsZXQgcm91dGVyID0gb3B0aW9ucy5yb3V0ZXI7XG4gICAgaWYoIW9wdGlvbnMucm91dGVyKSB7XG4gICAgICAgIGxldCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuICAgICAgICBpZighZXhwcmVzcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2FsbGVyeVNlcnZpY2VQcm94eSgpIC0gTXVzdCBwcm92aWRlXCIgK1xuICAgICAgICAgICAgICAgIFwiJ29wdGlvbnMucm91dGVyJyBvciBpbmNsdWRlIGV4cHJlc3MgYXMgYSBkZXBlbmRlbmN5XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG4gICAgfVxuXG4gICAgaWYoIXJvdXRlcikgdGhyb3cgbmV3IEVycm9yKFwiR2FsbGVyeVNlcnZpY2VQcm94eSgpIC0gXCIgK1xuICAgICAgICBcIlVuYWJsZSB0byBjcmVhdGUgcHJveHkgcm91dGUsIG1pc3Npbmcgcm91dGVyXCIpO1xuXG4gICAgb3B0aW9ucy5zZXJ2aWNlQ2xhc3MgPSBHYWxsZXJ5U2VydmljZTtcbiAgICBTZXJ2aWNlUHJveHkuYmluZFJvdXRlcyhyb3V0ZXIsIFJvdXRlcywgb3B0aW9ucyk7XG5cbiAgICByZXR1cm4gcm91dGVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBHYWxsZXJ5U2VydmljZVByb3h5O1xuIl19