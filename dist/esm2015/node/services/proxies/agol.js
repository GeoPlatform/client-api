/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { AgolService } from "@geoplatform/client";
import ServiceProxy from './base';
const ɵ0 = function (svc, req) {
    return svc.searchItems(req.query);
}, ɵ1 = function (svc, req) {
    return svc.searchGroups(req.query);
}, ɵ2 = function (svc, req) {
    return svc.searchOrgs(req.query);
}, ɵ3 = function (svc, req) {
    return svc.getItem(req.params.id);
}, ɵ4 = function (svc, req) {
    return svc.getGroup(req.params.id);
}, ɵ5 = function (svc, req) {
    return svc.getOrg(req.params.id);
};
/** @type {?} */
const Routes = [
    {
        key: 'searchItems',
        method: 'get',
        path: 'agol/items',
        auth: false,
        execFn: ɵ0
    },
    {
        key: 'searchGroups',
        method: 'get',
        path: 'agol/groups',
        auth: false,
        execFn: ɵ1
    },
    {
        key: 'searchOrgs',
        method: 'get',
        path: 'agol/orgs',
        auth: false,
        execFn: ɵ2
    },
    {
        key: 'getItem',
        method: 'get',
        path: 'agol/items/:id',
        auth: false,
        execFn: ɵ3
    },
    {
        key: 'getGroup',
        method: 'get',
        path: 'agol/groups/:id',
        auth: false,
        execFn: ɵ4
    },
    {
        key: 'getOrg',
        method: 'get',
        path: 'agol/orgs/:id',
        auth: false,
        execFn: ɵ5
    }
];
/**
 *
 * @param {?=} options
 * @return {?}
 */
function AgolServiceProxy(options) {
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
            throw new Error("AgolServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("AgolServiceProxy() - " +
            "Unable to create proxy route, missing router");
    options.serviceClass = AgolService;
    ServiceProxy.bindRoutes(router, Routes, options);
    return router;
}
export default AgolServiceProxy;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jbGllbnQvbm9kZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb3hpZXMvYWdvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sWUFBWSxNQUFNLFFBQVEsQ0FBQztXQVNsQixVQUFTLEdBQWlCLEVBQUUsR0FBUztJQUN6QyxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3JDLE9BT08sVUFBUyxHQUFpQixFQUFFLEdBQVM7SUFDekMsT0FBTyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN0QyxPQU9PLFVBQVMsR0FBaUIsRUFBRSxHQUFTO0lBQ3pDLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDcEMsT0FPTyxVQUFTLEdBQWlCLEVBQUUsR0FBUztJQUN6QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNyQyxPQU9PLFVBQVMsR0FBaUIsRUFBRSxHQUFTO0lBQ3pDLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ3RDLE9BT08sVUFBUyxHQUFpQixFQUFFLEdBQVM7SUFDekMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDcEM7O0FBckRULE1BQU0sTUFBTSxHQUFHO0lBQ1g7UUFDSSxHQUFHLEVBQUUsYUFBYTtRQUNsQixNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxZQUFZO1FBQ2xCLElBQUksRUFBRSxLQUFLO1FBQ1gsTUFBTSxJQUVMO0tBQ0o7SUFDRDtRQUNJLEdBQUcsRUFBRSxjQUFjO1FBQ25CLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLGFBQWE7UUFDbkIsSUFBSSxFQUFFLEtBQUs7UUFDWCxNQUFNLElBRUw7S0FDSjtJQUNEO1FBQ0ksR0FBRyxFQUFFLFlBQVk7UUFDakIsTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsV0FBVztRQUNqQixJQUFJLEVBQUUsS0FBSztRQUNYLE1BQU0sSUFFTDtLQUNKO0lBQ0Q7UUFDSSxHQUFHLEVBQUUsU0FBUztRQUNkLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixJQUFJLEVBQUUsS0FBSztRQUNYLE1BQU0sSUFFTDtLQUNKO0lBQ0Q7UUFDSSxHQUFHLEVBQUUsVUFBVTtRQUNmLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixJQUFJLEVBQUUsS0FBSztRQUNYLE1BQU0sSUFFTDtLQUNKO0lBQ0Q7UUFDSSxHQUFHLEVBQUUsUUFBUTtRQUNiLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLGVBQWU7UUFDckIsSUFBSSxFQUFFLEtBQUs7UUFDWCxNQUFNLElBRUw7S0FDSjtDQUNKLENBQUM7Ozs7OztBQU9GLDBCQUEyQixPQUFjO0lBRXJDLElBQUcsT0FBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFdBQVcsRUFBRTtRQUNoQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ2hCO0lBQUEsQ0FBQzs7SUFFRixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQzVCLElBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFOztRQUNoQixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakMsSUFBRyxDQUFDLE9BQU8sRUFBRTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DO2dCQUMvQyxxREFBcUQsQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUM3QjtJQUVELElBQUcsQ0FBQyxNQUFNO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUI7WUFDL0MsOENBQThDLENBQUMsQ0FBQztJQUVwRCxPQUFPLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztJQUNuQyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFakQsT0FBTyxNQUFNLENBQUM7Q0FDakI7QUFFRCxlQUFlLGdCQUFnQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCB7IEFnb2xTZXJ2aWNlIH0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcbmltcG9ydCBTZXJ2aWNlUHJveHkgZnJvbSAnLi9iYXNlJztcblxuXG5jb25zdCBSb3V0ZXMgPSBbXG4gICAge1xuICAgICAgICBrZXk6ICdzZWFyY2hJdGVtcycsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHBhdGg6ICdhZ29sL2l0ZW1zJyxcbiAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgIGV4ZWNGbjogZnVuY3Rpb24oc3ZjIDogQWdvbFNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5zZWFyY2hJdGVtcyhyZXEucXVlcnkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ3NlYXJjaEdyb3VwcycsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHBhdGg6ICdhZ29sL2dyb3VwcycsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBleGVjRm46IGZ1bmN0aW9uKHN2YyA6IEFnb2xTZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuc2VhcmNoR3JvdXBzKHJlcS5xdWVyeSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAnc2VhcmNoT3JncycsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHBhdGg6ICdhZ29sL29yZ3MnLFxuICAgICAgICBhdXRoOiBmYWxzZSxcbiAgICAgICAgZXhlY0ZuOiBmdW5jdGlvbihzdmMgOiBBZ29sU2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLnNlYXJjaE9yZ3MocmVxLnF1ZXJ5KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdnZXRJdGVtJyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgcGF0aDogJ2Fnb2wvaXRlbXMvOmlkJyxcbiAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgIGV4ZWNGbjogZnVuY3Rpb24oc3ZjIDogQWdvbFNlcnZpY2UsIHJlcSA6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Yy5nZXRJdGVtKHJlcS5wYXJhbXMuaWQpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGtleTogJ2dldEdyb3VwJyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgcGF0aDogJ2Fnb2wvZ3JvdXBzLzppZCcsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBleGVjRm46IGZ1bmN0aW9uKHN2YyA6IEFnb2xTZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuZ2V0R3JvdXAocmVxLnBhcmFtcy5pZCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAnZ2V0T3JnJyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgcGF0aDogJ2Fnb2wvb3Jncy86aWQnLFxuICAgICAgICBhdXRoOiBmYWxzZSxcbiAgICAgICAgZXhlY0ZuOiBmdW5jdGlvbihzdmMgOiBBZ29sU2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLmdldE9yZyhyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgfVxuICAgIH1cbl07XG5cblxuXG4vKipcbiAqXG4gKi9cbmZ1bmN0aW9uIEFnb2xTZXJ2aWNlUHJveHkoIG9wdGlvbnMgPzogYW55ICkge1xuXG4gICAgaWYodHlwZW9mKG9wdGlvbnMpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgfTtcblxuICAgIGxldCByb3V0ZXIgPSBvcHRpb25zLnJvdXRlcjtcbiAgICBpZighb3B0aW9ucy5yb3V0ZXIpIHtcbiAgICAgICAgbGV0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG4gICAgICAgIGlmKCFleHByZXNzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBZ29sU2VydmljZVByb3h5KCkgLSBNdXN0IHByb3ZpZGVcIiArXG4gICAgICAgICAgICAgICAgXCInb3B0aW9ucy5yb3V0ZXInIG9yIGluY2x1ZGUgZXhwcmVzcyBhcyBhIGRlcGVuZGVuY3lcIik7XG4gICAgICAgIH1cbiAgICAgICAgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcbiAgICB9XG5cbiAgICBpZighcm91dGVyKSB0aHJvdyBuZXcgRXJyb3IoXCJBZ29sU2VydmljZVByb3h5KCkgLSBcIiArXG4gICAgICAgIFwiVW5hYmxlIHRvIGNyZWF0ZSBwcm94eSByb3V0ZSwgbWlzc2luZyByb3V0ZXJcIik7XG5cbiAgICBvcHRpb25zLnNlcnZpY2VDbGFzcyA9IEFnb2xTZXJ2aWNlO1xuICAgIFNlcnZpY2VQcm94eS5iaW5kUm91dGVzKHJvdXRlciwgUm91dGVzLCBvcHRpb25zKTtcblxuICAgIHJldHVybiByb3V0ZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFnb2xTZXJ2aWNlUHJveHk7XG4iXX0=