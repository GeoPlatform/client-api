/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { UtilsService } from "@geoplatform/client";
import ServiceProxy from "./base";
var ɵ0 = function (svc, req) {
    return svc.locate(req.query.q);
}, ɵ1 = function (svc, req) {
    return svc.parseFile(req.files.file, req.body.format);
}, ɵ2 = function (svc, req) {
    return svc.capabilities(null, req.query);
}, ɵ3 = function (svc, req) {
    return svc.capabilities(req.params.id, req.query);
};
/** @type {?} */
var Routes = [
    {
        key: 'locate',
        method: 'get',
        path: 'utils/locate',
        auth: false,
        execFn: ɵ0
    },
    {
        key: 'parseFile',
        method: 'post',
        path: 'utils/parse',
        auth: false,
        execFn: ɵ1
    },
    {
        key: 'capabilities',
        method: 'get',
        path: 'utils/capabilities',
        auth: false,
        execFn: ɵ2
    },
    {
        key: 'capabilitiesProperty',
        method: 'get',
        path: 'utils/capabilities/:id',
        auth: false,
        execFn: ɵ3
    }
];
/**
 *
 * @param {?=} options
 * @return {?}
 */
function UtilsServiceProxy(options) {
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
            throw new Error("UtilsServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }
    if (!router)
        throw new Error("UtilsServiceProxy() - " +
            "Unable to create proxy route, missing router");
    options.serviceClass = UtilsService;
    ServiceProxy.bindRoutes(router, Routes, options);
    return router;
}
export default UtilsServiceProxy;
export { ɵ0, ɵ1, ɵ2, ɵ3 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L25vZGUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9wcm94aWVzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxZQUFZLE1BQU0sUUFBUSxDQUFDO1NBU2xCLFVBQVMsR0FBa0IsRUFBRSxHQUFTO0lBQzFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2xDLE9BT08sVUFBUyxHQUFrQixFQUFFLEdBQVM7SUFDMUMsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDekQsT0FPTyxVQUFTLEdBQWtCLEVBQUUsR0FBUztJQUMxQyxPQUFPLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUM1QyxPQU9PLFVBQVMsR0FBa0IsRUFBRSxHQUFTO0lBQzFDLE9BQU8sR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDckQ7O0FBbkNULElBQU0sTUFBTSxHQUFHO0lBQ1g7UUFDSSxHQUFHLEVBQUUsUUFBUTtRQUNiLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLGNBQWM7UUFDcEIsSUFBSSxFQUFFLEtBQUs7UUFDWCxNQUFNLElBRUw7S0FDSjtJQUNEO1FBQ0ksR0FBRyxFQUFFLFdBQVc7UUFDaEIsTUFBTSxFQUFFLE1BQU07UUFDZCxJQUFJLEVBQUUsYUFBYTtRQUNuQixJQUFJLEVBQUUsS0FBSztRQUNYLE1BQU0sSUFFTDtLQUNKO0lBQ0Q7UUFDSSxHQUFHLEVBQUUsY0FBYztRQUNuQixNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsSUFBSSxFQUFFLEtBQUs7UUFDWCxNQUFNLElBRUw7S0FDSjtJQUNEO1FBQ0ksR0FBRyxFQUFFLHNCQUFzQjtRQUMzQixNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSx3QkFBd0I7UUFDOUIsSUFBSSxFQUFFLEtBQUs7UUFDWCxNQUFNLElBRUw7S0FDSjtDQUNKLENBQUM7Ozs7OztBQU9GLDJCQUE0QixPQUFjO0lBRXRDLElBQUcsT0FBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFdBQVcsRUFBRTtRQUNoQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ2hCO0lBQUEsQ0FBQzs7SUFFRixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQzVCLElBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFOztRQUNoQixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakMsSUFBRyxDQUFDLE9BQU8sRUFBRTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DO2dCQUNoRCxxREFBcUQsQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUM3QjtJQUVELElBQUcsQ0FBQyxNQUFNO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0I7WUFDaEQsOENBQThDLENBQUMsQ0FBQztJQUVwRCxPQUFPLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNwQyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFakQsT0FBTyxNQUFNLENBQUM7Q0FDakI7QUFFRCxlQUFlLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCB7VXRpbHNTZXJ2aWNlfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuaW1wb3J0IFNlcnZpY2VQcm94eSBmcm9tIFwiLi9iYXNlXCI7XG5cblxuY29uc3QgUm91dGVzID0gW1xuICAgIHtcbiAgICAgICAga2V5OiAnbG9jYXRlJyxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgcGF0aDogJ3V0aWxzL2xvY2F0ZScsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBleGVjRm46IGZ1bmN0aW9uKHN2YyA6IFV0aWxzU2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLmxvY2F0ZShyZXEucXVlcnkucSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAncGFyc2VGaWxlJyxcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgIHBhdGg6ICd1dGlscy9wYXJzZScsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBleGVjRm46IGZ1bmN0aW9uKHN2YyA6IFV0aWxzU2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLnBhcnNlRmlsZShyZXEuZmlsZXMuZmlsZSwgcmVxLmJvZHkuZm9ybWF0KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBrZXk6ICdjYXBhYmlsaXRpZXMnLFxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICBwYXRoOiAndXRpbHMvY2FwYWJpbGl0aWVzJyxcbiAgICAgICAgYXV0aDogZmFsc2UsXG4gICAgICAgIGV4ZWNGbjogZnVuY3Rpb24oc3ZjIDogVXRpbHNTZXJ2aWNlLCByZXEgOiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdmMuY2FwYWJpbGl0aWVzKG51bGwsIHJlcS5xdWVyeSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAga2V5OiAnY2FwYWJpbGl0aWVzUHJvcGVydHknLFxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICBwYXRoOiAndXRpbHMvY2FwYWJpbGl0aWVzLzppZCcsXG4gICAgICAgIGF1dGg6IGZhbHNlLFxuICAgICAgICBleGVjRm46IGZ1bmN0aW9uKHN2YyA6IFV0aWxzU2VydmljZSwgcmVxIDogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZjLmNhcGFiaWxpdGllcyhyZXEucGFyYW1zLmlkLCByZXEucXVlcnkpO1xuICAgICAgICB9XG4gICAgfVxuXTtcblxuXG5cbi8qKlxuICpcbiAqL1xuZnVuY3Rpb24gVXRpbHNTZXJ2aWNlUHJveHkoIG9wdGlvbnMgPzogYW55ICkge1xuXG4gICAgaWYodHlwZW9mKG9wdGlvbnMpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgfTtcblxuICAgIGxldCByb3V0ZXIgPSBvcHRpb25zLnJvdXRlcjtcbiAgICBpZighb3B0aW9ucy5yb3V0ZXIpIHtcbiAgICAgICAgbGV0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG4gICAgICAgIGlmKCFleHByZXNzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVdGlsc1NlcnZpY2VQcm94eSgpIC0gTXVzdCBwcm92aWRlXCIgK1xuICAgICAgICAgICAgICAgIFwiJ29wdGlvbnMucm91dGVyJyBvciBpbmNsdWRlIGV4cHJlc3MgYXMgYSBkZXBlbmRlbmN5XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG4gICAgfVxuXG4gICAgaWYoIXJvdXRlcikgdGhyb3cgbmV3IEVycm9yKFwiVXRpbHNTZXJ2aWNlUHJveHkoKSAtIFwiICtcbiAgICAgICAgXCJVbmFibGUgdG8gY3JlYXRlIHByb3h5IHJvdXRlLCBtaXNzaW5nIHJvdXRlclwiKTtcblxuICAgIG9wdGlvbnMuc2VydmljZUNsYXNzID0gVXRpbHNTZXJ2aWNlO1xuICAgIFNlcnZpY2VQcm94eS5iaW5kUm91dGVzKHJvdXRlciwgUm91dGVzLCBvcHRpb25zKTtcblxuICAgIHJldHVybiByb3V0ZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzU2VydmljZVByb3h5O1xuIl19