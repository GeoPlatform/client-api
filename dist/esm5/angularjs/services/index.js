/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ItemService, UtilsService, DatasetService, ServiceService, LayerService, MapService, GalleryService } from "@geoplatform/client";
/**
 * Angular-aware instance of ItemService
 */
var /**
 * Angular-aware instance of ItemService
 */
NGItemService = /** @class */ (function (_super) {
    tslib_1.__extends(NGItemService, _super);
    function NGItemService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    NGItemService.prototype.createPromise = /**
     * @param {?} arg
     * @return {?}
     */
    function (arg) {
        return this.$q(arg);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NGItemService.prototype.createAndResolvePromise = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.$q.resolve(value);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    NGItemService.prototype.createAndRejectPromise = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        return this.$q.reject(error);
    };
    return NGItemService;
}(ItemService));
if (false) {
    /** @type {?} */
    NGItemService.prototype.$q;
}
/**
 * Angular-aware instance of DatasetService
 */
var /**
 * Angular-aware instance of DatasetService
 */
NGDatasetService = /** @class */ (function (_super) {
    tslib_1.__extends(NGDatasetService, _super);
    function NGDatasetService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    NGDatasetService.prototype.createPromise = /**
     * @param {?} arg
     * @return {?}
     */
    function (arg) {
        return this.$q(arg);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NGDatasetService.prototype.createAndResolvePromise = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.$q.resolve(value);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    NGDatasetService.prototype.createAndRejectPromise = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        return this.$q.reject(error);
    };
    return NGDatasetService;
}(DatasetService));
if (false) {
    /** @type {?} */
    NGDatasetService.prototype.$q;
}
/**
 * Angular-aware instance of GalleryService
 */
var /**
 * Angular-aware instance of GalleryService
 */
NGGalleryService = /** @class */ (function (_super) {
    tslib_1.__extends(NGGalleryService, _super);
    function NGGalleryService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    NGGalleryService.prototype.createPromise = /**
     * @param {?} arg
     * @return {?}
     */
    function (arg) {
        return this.$q(arg);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NGGalleryService.prototype.createAndResolvePromise = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.$q.resolve(value);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    NGGalleryService.prototype.createAndRejectPromise = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        return this.$q.reject(error);
    };
    return NGGalleryService;
}(GalleryService));
if (false) {
    /** @type {?} */
    NGGalleryService.prototype.$q;
}
/**
 * Angular-aware instance of LayerService
 */
var /**
 * Angular-aware instance of LayerService
 */
NGLayerService = /** @class */ (function (_super) {
    tslib_1.__extends(NGLayerService, _super);
    function NGLayerService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    NGLayerService.prototype.createPromise = /**
     * @param {?} arg
     * @return {?}
     */
    function (arg) {
        return this.$q(arg);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NGLayerService.prototype.createAndResolvePromise = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.$q.resolve(value);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    NGLayerService.prototype.createAndRejectPromise = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        return this.$q.reject(error);
    };
    return NGLayerService;
}(LayerService));
if (false) {
    /** @type {?} */
    NGLayerService.prototype.$q;
}
/**
 * Angular-aware instance of MapService
 */
var /**
 * Angular-aware instance of MapService
 */
NGMapService = /** @class */ (function (_super) {
    tslib_1.__extends(NGMapService, _super);
    function NGMapService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    NGMapService.prototype.createPromise = /**
     * @param {?} arg
     * @return {?}
     */
    function (arg) {
        return this.$q(arg);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NGMapService.prototype.createAndResolvePromise = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.$q.resolve(value);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    NGMapService.prototype.createAndRejectPromise = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        return this.$q.reject(error);
    };
    return NGMapService;
}(MapService));
if (false) {
    /** @type {?} */
    NGMapService.prototype.$q;
}
/**
 * Angular-aware instance of ServiceService
 */
var /**
 * Angular-aware instance of ServiceService
 */
NGServiceService = /** @class */ (function (_super) {
    tslib_1.__extends(NGServiceService, _super);
    function NGServiceService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    NGServiceService.prototype.createPromise = /**
     * @param {?} arg
     * @return {?}
     */
    function (arg) {
        return this.$q(arg);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NGServiceService.prototype.createAndResolvePromise = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.$q.resolve(value);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    NGServiceService.prototype.createAndRejectPromise = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        return this.$q.reject(error);
    };
    return NGServiceService;
}(ServiceService));
if (false) {
    /** @type {?} */
    NGServiceService.prototype.$q;
}
/**
 * Angular-aware instance of UtilsService
 */
var /**
 * Angular-aware instance of UtilsService
 */
NGUtilsService = /** @class */ (function (_super) {
    tslib_1.__extends(NGUtilsService, _super);
    function NGUtilsService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    NGUtilsService.prototype.createPromise = /**
     * @param {?} arg
     * @return {?}
     */
    function (arg) {
        return this.$q(arg);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NGUtilsService.prototype.createAndResolvePromise = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.$q.resolve(value);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    NGUtilsService.prototype.createAndRejectPromise = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        return this.$q.reject(error);
    };
    return NGUtilsService;
}(UtilsService));
if (false) {
    /** @type {?} */
    NGUtilsService.prototype.$q;
}
export { NGItemService, NGDatasetService, NGServiceService, NGLayerService, NGMapService, NGGalleryService, NGUtilsService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUVILFdBQVcsRUFBRSxZQUFZLEVBQ3pCLGNBQWMsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQzNFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUF3QjdCOzs7QUFBQTtJQUE0Qix5Q0FBVztJQUluQyx1QkFBWSxHQUFZLEVBQUUsVUFBeUIsRUFBRSxFQUFRO1FBQTdELFlBQ0ksa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUV6QjtRQURHLEtBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDOztLQUNoQjs7Ozs7SUFFRCxxQ0FBYTs7OztJQUFiLFVBQWdCLEdBQTZFO1FBQ3pGLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBRSxHQUFHLENBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFDRCwrQ0FBdUI7Ozs7SUFBdkIsVUFBeUIsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDOzs7OztJQUNELDhDQUFzQjs7OztJQUF0QixVQUF5QixLQUFhO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEM7d0JBL0NMO0VBOEI0QixXQUFXLEVBbUJ0QyxDQUFBOzs7Ozs7OztBQUlEOzs7QUFBQTtJQUErQiw0Q0FBYztJQUl6QywwQkFBWSxHQUFZLEVBQUUsVUFBeUIsRUFBRSxFQUFRO1FBQTdELFlBQ0ksa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUV6QjtRQURHLEtBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDOztLQUNoQjs7Ozs7SUFFRCx3Q0FBYTs7OztJQUFiLFVBQWdCLEdBQTZFO1FBQ3pGLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBRSxHQUFHLENBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFDRCxrREFBdUI7Ozs7SUFBdkIsVUFBeUIsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDOzs7OztJQUNELGlEQUFzQjs7OztJQUF0QixVQUF5QixLQUFhO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEM7MkJBdEVMO0VBcUQrQixjQUFjLEVBbUI1QyxDQUFBOzs7Ozs7OztBQUlEOzs7QUFBQTtJQUErQiw0Q0FBYztJQUl6QywwQkFBWSxHQUFZLEVBQUUsVUFBeUIsRUFBRSxFQUFRO1FBQTdELFlBQ0ksa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUV6QjtRQURHLEtBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDOztLQUNoQjs7Ozs7SUFFRCx3Q0FBYTs7OztJQUFiLFVBQWdCLEdBQTZFO1FBQ3pGLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBRSxHQUFHLENBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFDRCxrREFBdUI7Ozs7SUFBdkIsVUFBeUIsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDOzs7OztJQUNELGlEQUFzQjs7OztJQUF0QixVQUF5QixLQUFhO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEM7MkJBN0ZMO0VBNEUrQixjQUFjLEVBbUI1QyxDQUFBOzs7Ozs7OztBQUlEOzs7QUFBQTtJQUE2QiwwQ0FBWTtJQUlyQyx3QkFBWSxHQUFZLEVBQUUsVUFBeUIsRUFBRSxFQUFRO1FBQTdELFlBQ0ksa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUV6QjtRQURHLEtBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDOztLQUNoQjs7Ozs7SUFFRCxzQ0FBYTs7OztJQUFiLFVBQWdCLEdBQTZFO1FBQ3pGLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBRSxHQUFHLENBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFDRCxnREFBdUI7Ozs7SUFBdkIsVUFBeUIsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDOzs7OztJQUNELCtDQUFzQjs7OztJQUF0QixVQUF5QixLQUFhO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEM7eUJBcEhMO0VBbUc2QixZQUFZLEVBbUJ4QyxDQUFBOzs7Ozs7OztBQUlEOzs7QUFBQTtJQUEyQix3Q0FBVTtJQUlqQyxzQkFBWSxHQUFZLEVBQUUsVUFBeUIsRUFBRSxFQUFRO1FBQTdELFlBQ0ksa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUV6QjtRQURHLEtBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDOztLQUNoQjs7Ozs7SUFFRCxvQ0FBYTs7OztJQUFiLFVBQWdCLEdBQTZFO1FBQ3pGLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBRSxHQUFHLENBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFDRCw4Q0FBdUI7Ozs7SUFBdkIsVUFBeUIsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDOzs7OztJQUNELDZDQUFzQjs7OztJQUF0QixVQUF5QixLQUFhO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEM7dUJBM0lMO0VBMEgyQixVQUFVLEVBbUJwQyxDQUFBOzs7Ozs7OztBQUlEOzs7QUFBQTtJQUErQiw0Q0FBYztJQUl6QywwQkFBWSxHQUFZLEVBQUUsVUFBeUIsRUFBRSxFQUFRO1FBQTdELFlBQ0ksa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUV6QjtRQURHLEtBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDOztLQUNoQjs7Ozs7SUFFRCx3Q0FBYTs7OztJQUFiLFVBQWdCLEdBQTZFO1FBQ3pGLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBRSxHQUFHLENBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFDRCxrREFBdUI7Ozs7SUFBdkIsVUFBeUIsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDOzs7OztJQUNELGlEQUFzQjs7OztJQUF0QixVQUF5QixLQUFhO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEM7MkJBbEtMO0VBaUorQixjQUFjLEVBbUI1QyxDQUFBOzs7Ozs7OztBQUlEOzs7QUFBQTtJQUE2QiwwQ0FBWTtJQUlyQyx3QkFBWSxHQUFZLEVBQUUsVUFBeUIsRUFBRSxFQUFRO1FBQTdELFlBQ0ksa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUV6QjtRQURHLEtBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDOztLQUNoQjs7Ozs7SUFFRCxzQ0FBYTs7OztJQUFiLFVBQWdCLEdBQTZFO1FBQ3pGLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBRSxHQUFHLENBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFDRCxnREFBdUI7Ozs7SUFBdkIsVUFBeUIsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDOzs7OztJQUNELCtDQUFzQjs7OztJQUF0QixVQUF5QixLQUFhO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEM7eUJBekxMO0VBd0s2QixZQUFZLEVBbUJ4QyxDQUFBOzs7OztBQUdELE9BQU8sRUFDSCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixjQUFjLEVBQ2pCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSBcImFuZ3VsYXJcIjtcbmltcG9ydCB7XG4gICAgQ29uZmlnLCBRdWVyeSwgUXVlcnlGYWN0b3J5LCBJdGVtLCBTZWFyY2hSZXN1bHRzLCBHUEh0dHBDbGllbnQsXG4gICAgSXRlbVNlcnZpY2UsIFV0aWxzU2VydmljZSwgVHJhY2tpbmdTZXJ2aWNlLFxuICAgIERhdGFzZXRTZXJ2aWNlLCBTZXJ2aWNlU2VydmljZSwgTGF5ZXJTZXJ2aWNlLCBNYXBTZXJ2aWNlLCBHYWxsZXJ5U2VydmljZVxufSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5pbXBvcnQgTkdIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvbmcnO1xuXG5cblxuXG4vKlxuICogTk9USUNFOlxuICpcbiAqIFRoZXNlIHNlcnZpY2VzIGFyZSBhbmd1bGFyIGF3YXJlICh1c2luZyBhbmd1bGFyJ3MgJHEgd3JhcHBlcilcbiAqIHRvIGVuc3VyZSB0aGF0IGFueSBQcm9taXNlcyByZXR1cm5lZCBhcmUgdWx0aW1hdGVseSBnYXRlZFxuICogdGhyb3VnaCBhICRxIGluc3RhbmNlIGFuZCB0aGVyZWZvcmUgd2lsbCB0cmlnZ2VyIGEgZGlnZXN0XG4gKiB1cG9uIGNvbXBsZXRpb24uXG4gKlxuICogSWYgeW91IG1hbnVhbGx5IGNyZWF0ZSBhbiBpbnN0YW5jZSB0aGF0IGlzIG5vdCBhbmd1bGFyIGF3YXJlLFxuICogeW91IHdpbGwgbmVlZCB0byB3cmFwIGFueSByZXNwb25zZSBoYW5kbGVyJ3MgbWFuaXB1bGF0aW9uIG9mIGRhdGFcbiAqIHdpdGggJHNjb3BlLiRhcHBseSwgJHRpbWVvdXQsIG9yIGFuIGVxdWl2YWxlbnQgdG8gdHJpZ2dlciBhIGRpZ2VzdFxuICovXG5cblxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIEl0ZW1TZXJ2aWNlICovXG5jbGFzcyBOR0l0ZW1TZXJ2aWNlIGV4dGVuZHMgSXRlbVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIERhdGFzZXRTZXJ2aWNlICovXG5jbGFzcyBOR0RhdGFzZXRTZXJ2aWNlIGV4dGVuZHMgRGF0YXNldFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIEdhbGxlcnlTZXJ2aWNlICovXG5jbGFzcyBOR0dhbGxlcnlTZXJ2aWNlIGV4dGVuZHMgR2FsbGVyeVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIExheWVyU2VydmljZSAqL1xuY2xhc3MgTkdMYXllclNlcnZpY2UgZXh0ZW5kcyBMYXllclNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIE1hcFNlcnZpY2UgKi9cbmNsYXNzIE5HTWFwU2VydmljZSBleHRlbmRzIE1hcFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIFNlcnZpY2VTZXJ2aWNlICovXG5jbGFzcyBOR1NlcnZpY2VTZXJ2aWNlIGV4dGVuZHMgU2VydmljZVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIFV0aWxzU2VydmljZSAqL1xuY2xhc3MgTkdVdGlsc1NlcnZpY2UgZXh0ZW5kcyBVdGlsc1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCB7XG4gICAgTkdJdGVtU2VydmljZSxcbiAgICBOR0RhdGFzZXRTZXJ2aWNlLFxuICAgIE5HU2VydmljZVNlcnZpY2UsXG4gICAgTkdMYXllclNlcnZpY2UsXG4gICAgTkdNYXBTZXJ2aWNlLFxuICAgIE5HR2FsbGVyeVNlcnZpY2UsXG4gICAgTkdVdGlsc1NlcnZpY2Vcbn1cbiJdfQ==