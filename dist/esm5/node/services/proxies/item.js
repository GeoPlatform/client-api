import { Query, ItemService } from "@geoplatform/client";
import ServiceProxy from './base';
var ɵ0 = function (svc, req) {
    var query = new Query(req.query);
    return svc.search(query);
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
}, ɵ7 = function (svc, req) { return svc.clone(req.params.id, req.body); }, ɵ8 = function (svc, req) { return svc.clone(req.params.id, req.body); }, ɵ9 = function (svc, req) {
    return svc.export(req.params.id, req.query.format);
}, ɵ10 = function (result, res) {
    var mimeType = result.headers['content-type'];
    var disposition = result.headers['content-disposition'];
    res.set("Content-Type", mimeType);
    res.setHeader('Content-disposition', disposition);
    res.send(result.body);
}, ɵ11 = function (svc, req) {
    return svc.getUri(req.body);
}, ɵ12 = function (result, res) {
    res.json({ uri: result });
}, ɵ13 = function (svc, req) {
    return svc.exists(req.body);
}, ɵ14 = function (svc, req) {
    var input = req.body.url || req.files.file;
    var format = req.body.format || req.query.format;
    return svc.import(input, format);
}, ɵ15 = function (svc, req) {
    return svc.associations(req.params.id, req.query);
}, ɵ16 = function (svc, req) {
    return svc.versions(req.params.id, req.query);
}, ɵ17 = function (svc, req) {
    return svc.get(req.params.id, { version: req.params.version });
};
var Routes = [
    {
        key: 'search',
        method: 'get',
        path: 'items',
        auth: false,
        onExecute: ɵ0
    },
    {
        key: 'get',
        method: 'get',
        path: 'items/:id',
        auth: false,
        onExecute: ɵ1
    },
    {
        key: 'create',
        method: 'post',
        path: 'items',
        auth: true,
        onExecute: ɵ2
    },
    {
        key: 'update',
        method: 'put',
        path: 'items/:id',
        auth: true,
        onExecute: ɵ3
    },
    {
        key: 'delete',
        method: 'delete',
        path: 'items/:id',
        auth: true,
        onExecute: ɵ4,
        onResponse: ɵ5
    },
    {
        key: 'patch',
        method: 'patch',
        path: 'items/:id',
        auth: true,
        onExecute: ɵ6
    },
    {
        key: 'clone',
        method: 'post',
        path: 'items/:id/clone',
        auth: true,
        onExecute: ɵ7
    },
    {
        key: 'clone',
        method: 'post',
        path: 'items/:id/clone',
        auth: true,
        execFn: ɵ8
    },
    {
        key: 'export',
        method: 'get',
        path: 'items/:id/export',
        auth: false,
        onExecute: ɵ9,
        onResponse: ɵ10
    },
    {
        key: 'uri',
        method: 'post',
        path: 'utils/uri',
        auth: false,
        onExecute: ɵ11,
        onResponse: ɵ12
    },
    {
        key: 'exists',
        method: 'post',
        path: 'utils/exists',
        auth: false,
        onExecute: ɵ13
    },
    {
        key: 'import',
        method: 'post',
        path: 'items/import',
        auth: true,
        onExecute: ɵ14
    },
    {
        key: 'associations',
        method: 'get',
        path: 'items/:id/associations',
        auth: false,
        onExecute: ɵ15
    },
    {
        key: 'versions',
        method: 'get',
        path: 'items/:id/versions',
        auth: false,
        onExecute: ɵ16
    },
    {
        key: 'getVersion',
        method: 'get',
        path: 'items/:id/versions/:version',
        auth: false,
        onExecute: ɵ17
    }
    // TODO findMultiple
];
/**
 *
 */
function bindRoutes(router, options) {
    //bind common endpoints
    options.pathBaseDefault = "items";
    options.serviceClass = ItemService;
    ServiceProxy.bindRoutes(router, Routes, options);
}
/**
 * ItemServiceProxy
 *
 * see examples/node/item-proxy for an in-depth example
 */
function ItemServiceProxy(options) {
    if (typeof (options) === 'undefined') {
        options = {};
    }
    ;
    //if not configured to bind or avoid bind additional routes...
    if (typeof (options.addl) === 'undefined')
        options.addl = true; //auto bind addl routes
    var router = options.router;
    if (!options.router) {
        var express = require('express');
        if (!express) {
            throw new Error("ItemServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("ItemServiceProxy() - " +
            "Unable to create proxy route, missing router");
    bindRoutes(router, options);
    return router;
}
export default ItemServiceProxy;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10, ɵ11, ɵ12, ɵ13, ɵ14, ɵ15, ɵ16, ɵ17 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvbm9kZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb3hpZXMvaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLFFBQVEsQ0FBQztTQVFmLFVBQVMsR0FBaUIsRUFBRSxHQUFTO0lBQzVDLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0IsQ0FBQyxPQU9VLFVBQVMsR0FBaUIsRUFBRSxHQUFTO0lBQzVDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsT0FPVSxVQUFTLEdBQWlCLEVBQUUsR0FBUztJQUM1QyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLENBQUMsT0FPVSxVQUFTLEdBQWlCLEVBQUUsR0FBUztJQUM1QyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLENBQUMsT0FPVSxVQUFTLEdBQWlCLEVBQUUsR0FBUztJQUM1QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNyQyxDQUFDLE9BQ1c7QUFDUixhQUFhO0FBQ2IsTUFBWSxFQUNaLEdBQVM7SUFDVCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLENBQUMsT0FPVSxVQUFTLEdBQWlCLEVBQUUsR0FBUztJQUM1QyxPQUFPLEdBQUcs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QUM7QUFLRDs7OztHQUlHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBRSxPQUFjO0lBRXJDLElBQUcsT0FBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFdBQVcsRUFBRTtRQUNoQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ2hCO0lBQUEsQ0FBQztJQUVGLDhEQUE4RDtJQUM5RCxJQUFJLE9BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVztRQUNwQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFJLHVCQUF1QjtJQUVuRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQzVCLElBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQ2hCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqQyxJQUFHLENBQUMsT0FBTyxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUM7Z0JBQy9DLHFEQUFxRCxDQUFDLENBQUM7U0FDOUQ7UUFDRCxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQzdCO0lBRUQsSUFBRyxDQUFDLE1BQU07UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QjtZQUMvQyw4Q0FBOEMsQ0FBQyxDQUFDO0lBRXBELFVBQVUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFNUIsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELGVBQWUsZ0JBQWdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IFF1ZXJ5LCBJdGVtU2VydmljZSB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5pbXBvcnQgU2VydmljZVByb3h5IGZyb20gJy4vYmFzZSc7XG5cbmNvbnN0IFJvdXRlcyA9IFtcbiAgICB7XG4gICAgICAgIGtleTogJ3NlYXJjaCcsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHBhdGg6ICdpdGVtcycsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IEl0ZW1TZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIGxldCBxdWVyeSA9IG5ldyBRdWVyeShyZXEucXVlcnkpO1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5zZWFyY2gocXVlcnkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ2dldCcsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHBhdGg6ICdpdGVtcy86aWQnLFxuICAgICAgICBhdXRoOiBmYWxzZSxcbiAgICAgICAgb25FeGVjdXRlOiBmdW5jdGlvbihzdmMgOiBJdGVtU2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLmdldChyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdjcmVhdGUnLFxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgcGF0aDogJ2l0ZW1zJyxcbiAgICAgICAgYXV0aDogdHJ1ZSxcbiAgICAgICAgb25FeGVjdXRlOiBmdW5jdGlvbihzdmMgOiBJdGVtU2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLnNhdmUocmVxLmJvZHkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ3VwZGF0ZScsXG4gICAgICAgIG1ldGhvZDogJ3B1dCcsXG4gICAgICAgIHBhdGg6ICdpdGVtcy86aWQnLFxuICAgICAgICBhdXRoOiB0cnVlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IEl0ZW1TZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuc2F2ZShyZXEuYm9keSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAnZGVsZXRlJyxcbiAgICAgICAgbWV0aG9kOiAnZGVsZXRlJyxcbiAgICAgICAgcGF0aDogJ2l0ZW1zLzppZCcsXG4gICAgICAgIGF1dGg6IHRydWUsXG4gICAgICAgIG9uRXhlY3V0ZTogZnVuY3Rpb24oc3ZjIDogSXRlbVNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5yZW1vdmUocmVxLnBhcmFtcy5pZCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVzcG9uc2U6IGZ1bmN0aW9uKFxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgcmVzdWx0IDogYW55LFxuICAgICAgICAgICAgcmVzIDogYW55KSB7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwNCkuZW5kKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAncGF0Y2gnLFxuICAgICAgICBtZXRob2Q6ICdwYXRjaCcsXG4gICAgICAgIHBhdGg6ICdpdGVtcy86aWQnLFxuICAgICAgICBhdXRoOiB0cnVlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IEl0ZW1TZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMucGF0Y2gocmVxLnBhcmFtcy5pZCwgcmVxLmJvZHkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ2Nsb25lJyxcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgIHBhdGg6ICdpdGVtcy86aWQvY2xvbmUnLFxuICAgICAgICBhdXRoOiB0cnVlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YywgcmVxKSB7IHJldHVybiBzdmMuY2xvbmUocmVxLnBhcmFtcy5pZCwgcmVxLmJvZHkpOyB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ2Nsb25lJyxcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgIHBhdGg6ICdpdGVtcy86aWQvY2xvbmUnLFxuICAgICAgICBhdXRoOiB0cnVlLFxuICAgICAgICBleGVjRm46IGZ1bmN0aW9uKHN2YywgcmVxKSB7IHJldHVybiBzdmMuY2xvbmUocmVxLnBhcmFtcy5pZCwgcmVxLmJvZHkpOyB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ2V4cG9ydCcsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHBhdGg6ICdpdGVtcy86aWQvZXhwb3J0JyxcbiAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgIG9uRXhlY3V0ZTogZnVuY3Rpb24oc3ZjIDogSXRlbVNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5leHBvcnQocmVxLnBhcmFtcy5pZCwgcmVxLnF1ZXJ5LmZvcm1hdCk7IH0sXG4gICAgICAgIG9uUmVzcG9uc2U6IGZ1bmN0aW9uKHJlc3VsdCA6IGFueSwgcmVzIDogYW55KSB7XG4gICAgICAgICAgICBsZXQgbWltZVR5cGUgPSByZXN1bHQuaGVhZGVyc1snY29udGVudC10eXBlJ107XG4gICAgICAgICAgICBsZXQgZGlzcG9zaXRpb24gPSByZXN1bHQuaGVhZGVyc1snY29udGVudC1kaXNwb3NpdGlvbiddO1xuICAgICAgICAgICAgcmVzLnNldChcIkNvbnRlbnQtVHlwZVwiLCBtaW1lVHlwZSk7XG4gICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LWRpc3Bvc2l0aW9uJywgZGlzcG9zaXRpb24pO1xuICAgICAgICAgICAgcmVzLnNlbmQocmVzdWx0LmJvZHkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ3VyaScsXG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICBwYXRoOiAndXRpbHMvdXJpJyxcbiAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgIG9uRXhlY3V0ZTogZnVuY3Rpb24oc3ZjIDogSXRlbVNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5nZXRVcmkocmVxLmJvZHkpO1xuICAgICAgICB9LFxuICAgICAgICBvblJlc3BvbnNlOiBmdW5jdGlvbihyZXN1bHQgOiBhbnksIHJlcyA6IGFueSkge1xuICAgICAgICAgICAgcmVzLmpzb24oeyB1cmk6IHJlc3VsdCB9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdleGlzdHMnLFxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgcGF0aDogJ3V0aWxzL2V4aXN0cycsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IEl0ZW1TZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuZXhpc3RzKHJlcS5ib2R5KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdpbXBvcnQnLFxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgcGF0aDogJ2l0ZW1zL2ltcG9ydCcsXG4gICAgICAgIGF1dGg6IHRydWUsXG4gICAgICAgIG9uRXhlY3V0ZTogZnVuY3Rpb24oc3ZjIDogSXRlbVNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgbGV0IGlucHV0ID0gcmVxLmJvZHkudXJsIHx8IHJlcS5maWxlcy5maWxlO1xuICAgICAgICAgICAgbGV0IGZvcm1hdCA9IHJlcS5ib2R5LmZvcm1hdCB8fCByZXEucXVlcnkuZm9ybWF0O1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5pbXBvcnQoaW5wdXQsIGZvcm1hdCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAnYXNzb2NpYXRpb25zJyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgcGF0aDogJ2l0ZW1zLzppZC9hc3NvY2lhdGlvbnMnLFxuICAgICAgICBhdXRoOiBmYWxzZSxcbiAgICAgICAgb25FeGVjdXRlOiBmdW5jdGlvbihzdmMgOiBJdGVtU2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLmFzc29jaWF0aW9ucyhyZXEucGFyYW1zLmlkLCByZXEucXVlcnkpOyB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ3ZlcnNpb25zJyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgcGF0aDogJ2l0ZW1zLzppZC92ZXJzaW9ucycsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IEl0ZW1TZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMudmVyc2lvbnMocmVxLnBhcmFtcy5pZCwgcmVxLnF1ZXJ5KTsgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdnZXRWZXJzaW9uJyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgcGF0aDogJ2l0ZW1zLzppZC92ZXJzaW9ucy86dmVyc2lvbicsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBvbkV4ZWN1dGU6IGZ1bmN0aW9uKHN2YyA6IEl0ZW1TZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuZ2V0KHJlcS5wYXJhbXMuaWQsIHsgdmVyc2lvbjogcmVxLnBhcmFtcy52ZXJzaW9uIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETyBmaW5kTXVsdGlwbGVcbl07XG5cbi8qKlxuICpcbiAqL1xuZnVuY3Rpb24gYmluZFJvdXRlcyhyb3V0ZXIgOiBhbnksIG9wdGlvbnMgPzogYW55KSB7XG4gICAgLy9iaW5kIGNvbW1vbiBlbmRwb2ludHNcbiAgICBvcHRpb25zLnBhdGhCYXNlRGVmYXVsdCA9IFwiaXRlbXNcIjtcbiAgICBvcHRpb25zLnNlcnZpY2VDbGFzcyA9IEl0ZW1TZXJ2aWNlO1xuICAgIFNlcnZpY2VQcm94eS5iaW5kUm91dGVzKHJvdXRlciwgUm91dGVzLCBvcHRpb25zKTtcbn1cblxuXG5cblxuLyoqXG4gKiBJdGVtU2VydmljZVByb3h5XG4gKlxuICogc2VlIGV4YW1wbGVzL25vZGUvaXRlbS1wcm94eSBmb3IgYW4gaW4tZGVwdGggZXhhbXBsZVxuICovXG5mdW5jdGlvbiBJdGVtU2VydmljZVByb3h5KCBvcHRpb25zID86IGFueSApIHtcblxuICAgIGlmKHR5cGVvZihvcHRpb25zKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH07XG5cbiAgICAvL2lmIG5vdCBjb25maWd1cmVkIHRvIGJpbmQgb3IgYXZvaWQgYmluZCBhZGRpdGlvbmFsIHJvdXRlcy4uLlxuICAgIGlmKCB0eXBlb2Yob3B0aW9ucy5hZGRsKSA9PT0gJ3VuZGVmaW5lZCcgKVxuICAgICAgICBvcHRpb25zLmFkZGwgPSB0cnVlOyAgICAvL2F1dG8gYmluZCBhZGRsIHJvdXRlc1xuXG4gICAgbGV0IHJvdXRlciA9IG9wdGlvbnMucm91dGVyO1xuICAgIGlmKCFvcHRpb25zLnJvdXRlcikge1xuICAgICAgICBsZXQgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbiAgICAgICAgaWYoIWV4cHJlc3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkl0ZW1TZXJ2aWNlUHJveHkoKSAtIE11c3QgcHJvdmlkZVwiICtcbiAgICAgICAgICAgICAgICBcIidvcHRpb25zLnJvdXRlcicgb3IgaW5jbHVkZSBleHByZXNzIGFzIGEgZGVwZW5kZW5jeVwiKTtcbiAgICAgICAgfVxuICAgICAgICByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuICAgIH1cblxuICAgIGlmKCFyb3V0ZXIpIHRocm93IG5ldyBFcnJvcihcIkl0ZW1TZXJ2aWNlUHJveHkoKSAtIFwiICtcbiAgICAgICAgXCJVbmFibGUgdG8gY3JlYXRlIHByb3h5IHJvdXRlLCBtaXNzaW5nIHJvdXRlclwiKTtcblxuICAgIGJpbmRSb3V0ZXMocm91dGVyLCBvcHRpb25zKTtcblxuICAgIHJldHVybiByb3V0ZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEl0ZW1TZXJ2aWNlUHJveHk7XG4iXX0=