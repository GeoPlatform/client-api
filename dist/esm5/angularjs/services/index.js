import * as tslib_1 from "tslib";
import { ItemService, UtilsService, AssociationService, DatasetService, ServiceService, LayerService, MapService, GalleryService } from "@geoplatform/client";
/*
 * NOTICE:
 *
 * These services are angular aware (using angular's $q wrapper)
 * to ensure that any Promises returned are ultimately gated
 * through a $q instance and therefore will trigger a digest
 * upon completion.
 *
 * If you manually create an instance that is not angular aware,
 * you will need to wrap any response handler's manipulation of data
 * with $scope.$apply, $timeout, or an equivalent to trigger a digest
 */
/** Angular-aware instance of ItemService */
var NGItemService = /** @class */ (function (_super) {
    tslib_1.__extends(NGItemService, _super);
    function NGItemService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    NGItemService.prototype.createPromise = function (arg) {
        return this.$q(arg);
    };
    NGItemService.prototype.createAndResolvePromise = function (value) {
        return this.$q.resolve(value);
    };
    NGItemService.prototype.createAndRejectPromise = function (error) {
        return this.$q.reject(error);
    };
    return NGItemService;
}(ItemService));
/** Angular-aware instance of DatasetService */
var NGDatasetService = /** @class */ (function (_super) {
    tslib_1.__extends(NGDatasetService, _super);
    function NGDatasetService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    NGDatasetService.prototype.createPromise = function (arg) {
        return this.$q(arg);
    };
    NGDatasetService.prototype.createAndResolvePromise = function (value) {
        return this.$q.resolve(value);
    };
    NGDatasetService.prototype.createAndRejectPromise = function (error) {
        return this.$q.reject(error);
    };
    return NGDatasetService;
}(DatasetService));
/** Angular-aware instance of GalleryService */
var NGGalleryService = /** @class */ (function (_super) {
    tslib_1.__extends(NGGalleryService, _super);
    function NGGalleryService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    NGGalleryService.prototype.createPromise = function (arg) {
        return this.$q(arg);
    };
    NGGalleryService.prototype.createAndResolvePromise = function (value) {
        return this.$q.resolve(value);
    };
    NGGalleryService.prototype.createAndRejectPromise = function (error) {
        return this.$q.reject(error);
    };
    return NGGalleryService;
}(GalleryService));
/** Angular-aware instance of LayerService */
var NGLayerService = /** @class */ (function (_super) {
    tslib_1.__extends(NGLayerService, _super);
    function NGLayerService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    NGLayerService.prototype.createPromise = function (arg) {
        return this.$q(arg);
    };
    NGLayerService.prototype.createAndResolvePromise = function (value) {
        return this.$q.resolve(value);
    };
    NGLayerService.prototype.createAndRejectPromise = function (error) {
        return this.$q.reject(error);
    };
    return NGLayerService;
}(LayerService));
/** Angular-aware instance of MapService */
var NGMapService = /** @class */ (function (_super) {
    tslib_1.__extends(NGMapService, _super);
    function NGMapService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    NGMapService.prototype.createPromise = function (arg) {
        return this.$q(arg);
    };
    NGMapService.prototype.createAndResolvePromise = function (value) {
        return this.$q.resolve(value);
    };
    NGMapService.prototype.createAndRejectPromise = function (error) {
        return this.$q.reject(error);
    };
    return NGMapService;
}(MapService));
/** Angular-aware instance of ServiceService */
var NGServiceService = /** @class */ (function (_super) {
    tslib_1.__extends(NGServiceService, _super);
    function NGServiceService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    NGServiceService.prototype.createPromise = function (arg) {
        return this.$q(arg);
    };
    NGServiceService.prototype.createAndResolvePromise = function (value) {
        return this.$q.resolve(value);
    };
    NGServiceService.prototype.createAndRejectPromise = function (error) {
        return this.$q.reject(error);
    };
    return NGServiceService;
}(ServiceService));
/** Angular-aware instance of UtilsService */
var NGUtilsService = /** @class */ (function (_super) {
    tslib_1.__extends(NGUtilsService, _super);
    function NGUtilsService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    NGUtilsService.prototype.createPromise = function (arg) {
        return this.$q(arg);
    };
    NGUtilsService.prototype.createAndResolvePromise = function (value) {
        return this.$q.resolve(value);
    };
    NGUtilsService.prototype.createAndRejectPromise = function (error) {
        return this.$q.reject(error);
    };
    return NGUtilsService;
}(UtilsService));
/** Angular-aware instance of AssociationService */
var NGAssociationService = /** @class */ (function (_super) {
    tslib_1.__extends(NGAssociationService, _super);
    function NGAssociationService(url, httpClient, $q) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.$q = $q;
        return _this;
    }
    NGAssociationService.prototype.createPromise = function (arg) {
        return this.$q(arg);
    };
    NGAssociationService.prototype.createAndResolvePromise = function (value) {
        return this.$q.resolve(value);
    };
    NGAssociationService.prototype.createAndRejectPromise = function (error) {
        return this.$q.reject(error);
    };
    return NGAssociationService;
}(AssociationService));
export { NGItemService, NGDatasetService, NGServiceService, NGLayerService, NGMapService, NGGalleryService, NGUtilsService, NGAssociationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBRUgsV0FBVyxFQUFFLFlBQVksRUFBbUIsa0JBQWtCLEVBQzlELGNBQWMsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQzNFLE1BQU0scUJBQXFCLENBQUM7QUFPN0I7Ozs7Ozs7Ozs7O0dBV0c7QUFJSCw0Q0FBNEM7QUFDNUM7SUFBNEIseUNBQVc7SUFJbkMsdUJBQVksR0FBWSxFQUFFLFVBQXlCLEVBQUUsRUFBUTtRQUE3RCxZQUNJLGtCQUFNLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FFekI7UUFERyxLQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQzs7SUFDakIsQ0FBQztJQUVELHFDQUFhLEdBQWIsVUFBZ0IsR0FBNkU7UUFDekYsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCwrQ0FBdUIsR0FBdkIsVUFBeUIsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCw4Q0FBc0IsR0FBdEIsVUFBeUIsS0FBYTtRQUNsQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTCxvQkFBQztBQUFELENBQUMsQUFuQkQsQ0FBNEIsV0FBVyxHQW1CdEM7QUFHRCwrQ0FBK0M7QUFDL0M7SUFBK0IsNENBQWM7SUFJekMsMEJBQVksR0FBWSxFQUFFLFVBQXlCLEVBQUUsRUFBUTtRQUE3RCxZQUNJLGtCQUFNLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FFekI7UUFERyxLQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQzs7SUFDakIsQ0FBQztJQUVELHdDQUFhLEdBQWIsVUFBZ0IsR0FBNkU7UUFDekYsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCxrREFBdUIsR0FBdkIsVUFBeUIsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxpREFBc0IsR0FBdEIsVUFBeUIsS0FBYTtRQUNsQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTCx1QkFBQztBQUFELENBQUMsQUFuQkQsQ0FBK0IsY0FBYyxHQW1CNUM7QUFHRCwrQ0FBK0M7QUFDL0M7SUFBK0IsNENBQWM7SUFJekMsMEJBQVksR0FBWSxFQUFFLFVBQXlCLEVBQUUsRUFBUTtRQUE3RCxZQUNJLGtCQUFNLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FFekI7UUFERyxLQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQzs7SUFDakIsQ0FBQztJQUVELHdDQUFhLEdBQWIsVUFBZ0IsR0FBNkU7UUFDekYsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCxrREFBdUIsR0FBdkIsVUFBeUIsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxpREFBc0IsR0FBdEIsVUFBeUIsS0FBYTtRQUNsQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTCx1QkFBQztBQUFELENBQUMsQUFuQkQsQ0FBK0IsY0FBYyxHQW1CNUM7QUFHRCw2Q0FBNkM7QUFDN0M7SUFBNkIsMENBQVk7SUFJckMsd0JBQVksR0FBWSxFQUFFLFVBQXlCLEVBQUUsRUFBUTtRQUE3RCxZQUNJLGtCQUFNLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FFekI7UUFERyxLQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQzs7SUFDakIsQ0FBQztJQUVELHNDQUFhLEdBQWIsVUFBZ0IsR0FBNkU7UUFDekYsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCxnREFBdUIsR0FBdkIsVUFBeUIsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCwrQ0FBc0IsR0FBdEIsVUFBeUIsS0FBYTtRQUNsQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUFuQkQsQ0FBNkIsWUFBWSxHQW1CeEM7QUFHRCwyQ0FBMkM7QUFDM0M7SUFBMkIsd0NBQVU7SUFJakMsc0JBQVksR0FBWSxFQUFFLFVBQXlCLEVBQUUsRUFBUTtRQUE3RCxZQUNJLGtCQUFNLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FFekI7UUFERyxLQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQzs7SUFDakIsQ0FBQztJQUVELG9DQUFhLEdBQWIsVUFBZ0IsR0FBNkU7UUFDekYsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCw4Q0FBdUIsR0FBdkIsVUFBeUIsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCw2Q0FBc0IsR0FBdEIsVUFBeUIsS0FBYTtRQUNsQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTCxtQkFBQztBQUFELENBQUMsQUFuQkQsQ0FBMkIsVUFBVSxHQW1CcEM7QUFHRCwrQ0FBK0M7QUFDL0M7SUFBK0IsNENBQWM7SUFJekMsMEJBQVksR0FBWSxFQUFFLFVBQXlCLEVBQUUsRUFBUTtRQUE3RCxZQUNJLGtCQUFNLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FFekI7UUFERyxLQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQzs7SUFDakIsQ0FBQztJQUVELHdDQUFhLEdBQWIsVUFBZ0IsR0FBNkU7UUFDekYsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCxrREFBdUIsR0FBdkIsVUFBeUIsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxpREFBc0IsR0FBdEIsVUFBeUIsS0FBYTtRQUNsQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTCx1QkFBQztBQUFELENBQUMsQUFuQkQsQ0FBK0IsY0FBYyxHQW1CNUM7QUFHRCw2Q0FBNkM7QUFDN0M7SUFBNkIsMENBQVk7SUFJckMsd0JBQVksR0FBWSxFQUFFLFVBQXlCLEVBQUUsRUFBUTtRQUE3RCxZQUNJLGtCQUFNLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FFekI7UUFERyxLQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQzs7SUFDakIsQ0FBQztJQUVELHNDQUFhLEdBQWIsVUFBZ0IsR0FBNkU7UUFDekYsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCxnREFBdUIsR0FBdkIsVUFBeUIsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCwrQ0FBc0IsR0FBdEIsVUFBeUIsS0FBYTtRQUNsQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUFuQkQsQ0FBNkIsWUFBWSxHQW1CeEM7QUFFRCxtREFBbUQ7QUFDbkQ7SUFBbUMsZ0RBQWtCO0lBSWpELDhCQUFZLEdBQVksRUFBRSxVQUF5QixFQUFFLEVBQVE7UUFBN0QsWUFDSSxrQkFBTSxHQUFHLEVBQUUsVUFBVSxDQUFDLFNBRXpCO1FBREcsS0FBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7O0lBQ2pCLENBQUM7SUFFRCw0Q0FBYSxHQUFiLFVBQWdCLEdBQTZFO1FBQ3pGLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBRSxHQUFHLENBQUUsQ0FBQztJQUMxQixDQUFDO0lBQ0Qsc0RBQXVCLEdBQXZCLFVBQXlCLEtBQVc7UUFDaEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ0QscURBQXNCLEdBQXRCLFVBQXlCLEtBQWE7UUFDbEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUwsMkJBQUM7QUFBRCxDQUFDLEFBbkJELENBQW1DLGtCQUFrQixHQW1CcEQ7QUFJRCxPQUFPLEVBQ0gsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLG9CQUFvQixFQUN2QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gXCJhbmd1bGFyXCI7XG5pbXBvcnQge1xuICAgIENvbmZpZywgUXVlcnksIFF1ZXJ5RmFjdG9yeSwgSXRlbSwgU2VhcmNoUmVzdWx0cywgR1BIdHRwQ2xpZW50LFxuICAgIEl0ZW1TZXJ2aWNlLCBVdGlsc1NlcnZpY2UsIFRyYWNraW5nU2VydmljZSwgQXNzb2NpYXRpb25TZXJ2aWNlLFxuICAgIERhdGFzZXRTZXJ2aWNlLCBTZXJ2aWNlU2VydmljZSwgTGF5ZXJTZXJ2aWNlLCBNYXBTZXJ2aWNlLCBHYWxsZXJ5U2VydmljZVxufSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5pbXBvcnQgTkdIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvbmcnO1xuXG5cblxuXG4vKlxuICogTk9USUNFOlxuICpcbiAqIFRoZXNlIHNlcnZpY2VzIGFyZSBhbmd1bGFyIGF3YXJlICh1c2luZyBhbmd1bGFyJ3MgJHEgd3JhcHBlcilcbiAqIHRvIGVuc3VyZSB0aGF0IGFueSBQcm9taXNlcyByZXR1cm5lZCBhcmUgdWx0aW1hdGVseSBnYXRlZFxuICogdGhyb3VnaCBhICRxIGluc3RhbmNlIGFuZCB0aGVyZWZvcmUgd2lsbCB0cmlnZ2VyIGEgZGlnZXN0XG4gKiB1cG9uIGNvbXBsZXRpb24uXG4gKlxuICogSWYgeW91IG1hbnVhbGx5IGNyZWF0ZSBhbiBpbnN0YW5jZSB0aGF0IGlzIG5vdCBhbmd1bGFyIGF3YXJlLFxuICogeW91IHdpbGwgbmVlZCB0byB3cmFwIGFueSByZXNwb25zZSBoYW5kbGVyJ3MgbWFuaXB1bGF0aW9uIG9mIGRhdGFcbiAqIHdpdGggJHNjb3BlLiRhcHBseSwgJHRpbWVvdXQsIG9yIGFuIGVxdWl2YWxlbnQgdG8gdHJpZ2dlciBhIGRpZ2VzdFxuICovXG5cblxuXG4vKiogQW5ndWxhci1hd2FyZSBpbnN0YW5jZSBvZiBJdGVtU2VydmljZSAqL1xuY2xhc3MgTkdJdGVtU2VydmljZSBleHRlbmRzIEl0ZW1TZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgJHEgOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQsICRxIDogYW55KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9taXNlICggYXJnOiAocmVzb2x2ZTogKHZhbHVlPzogYW55KSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQpID0+IHZvaWQgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxKCBhcmcgKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHZhbHVlIDogYW55ICkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZXNvbHZlKHZhbHVlKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVqZWN0UHJvbWlzZSAoIGVycm9yIDogRXJyb3IgKSA6IFByb21pc2U8YW55PntcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbn1cblxuXG4vKiogQW5ndWxhci1hd2FyZSBpbnN0YW5jZSBvZiBEYXRhc2V0U2VydmljZSAqL1xuY2xhc3MgTkdEYXRhc2V0U2VydmljZSBleHRlbmRzIERhdGFzZXRTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgJHEgOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQsICRxIDogYW55KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9taXNlICggYXJnOiAocmVzb2x2ZTogKHZhbHVlPzogYW55KSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQpID0+IHZvaWQgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxKCBhcmcgKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHZhbHVlIDogYW55ICkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZXNvbHZlKHZhbHVlKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVqZWN0UHJvbWlzZSAoIGVycm9yIDogRXJyb3IgKSA6IFByb21pc2U8YW55PntcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbn1cblxuXG4vKiogQW5ndWxhci1hd2FyZSBpbnN0YW5jZSBvZiBHYWxsZXJ5U2VydmljZSAqL1xuY2xhc3MgTkdHYWxsZXJ5U2VydmljZSBleHRlbmRzIEdhbGxlcnlTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgJHEgOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQsICRxIDogYW55KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9taXNlICggYXJnOiAocmVzb2x2ZTogKHZhbHVlPzogYW55KSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQpID0+IHZvaWQgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxKCBhcmcgKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHZhbHVlIDogYW55ICkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZXNvbHZlKHZhbHVlKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVqZWN0UHJvbWlzZSAoIGVycm9yIDogRXJyb3IgKSA6IFByb21pc2U8YW55PntcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbn1cblxuXG4vKiogQW5ndWxhci1hd2FyZSBpbnN0YW5jZSBvZiBMYXllclNlcnZpY2UgKi9cbmNsYXNzIE5HTGF5ZXJTZXJ2aWNlIGV4dGVuZHMgTGF5ZXJTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgJHEgOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQsICRxIDogYW55KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9taXNlICggYXJnOiAocmVzb2x2ZTogKHZhbHVlPzogYW55KSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQpID0+IHZvaWQgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxKCBhcmcgKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHZhbHVlIDogYW55ICkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZXNvbHZlKHZhbHVlKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVqZWN0UHJvbWlzZSAoIGVycm9yIDogRXJyb3IgKSA6IFByb21pc2U8YW55PntcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbn1cblxuXG4vKiogQW5ndWxhci1hd2FyZSBpbnN0YW5jZSBvZiBNYXBTZXJ2aWNlICovXG5jbGFzcyBOR01hcFNlcnZpY2UgZXh0ZW5kcyBNYXBTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgJHEgOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQsICRxIDogYW55KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9taXNlICggYXJnOiAocmVzb2x2ZTogKHZhbHVlPzogYW55KSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQpID0+IHZvaWQgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxKCBhcmcgKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHZhbHVlIDogYW55ICkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZXNvbHZlKHZhbHVlKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVqZWN0UHJvbWlzZSAoIGVycm9yIDogRXJyb3IgKSA6IFByb21pc2U8YW55PntcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbn1cblxuXG4vKiogQW5ndWxhci1hd2FyZSBpbnN0YW5jZSBvZiBTZXJ2aWNlU2VydmljZSAqL1xuY2xhc3MgTkdTZXJ2aWNlU2VydmljZSBleHRlbmRzIFNlcnZpY2VTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgJHEgOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQsICRxIDogYW55KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9taXNlICggYXJnOiAocmVzb2x2ZTogKHZhbHVlPzogYW55KSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQpID0+IHZvaWQgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxKCBhcmcgKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHZhbHVlIDogYW55ICkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZXNvbHZlKHZhbHVlKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVqZWN0UHJvbWlzZSAoIGVycm9yIDogRXJyb3IgKSA6IFByb21pc2U8YW55PntcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbn1cblxuXG4vKiogQW5ndWxhci1hd2FyZSBpbnN0YW5jZSBvZiBVdGlsc1NlcnZpY2UgKi9cbmNsYXNzIE5HVXRpbHNTZXJ2aWNlIGV4dGVuZHMgVXRpbHNTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgJHEgOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQsICRxIDogYW55KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9taXNlICggYXJnOiAocmVzb2x2ZTogKHZhbHVlPzogYW55KSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQpID0+IHZvaWQgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxKCBhcmcgKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHZhbHVlIDogYW55ICkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZXNvbHZlKHZhbHVlKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVqZWN0UHJvbWlzZSAoIGVycm9yIDogRXJyb3IgKSA6IFByb21pc2U8YW55PntcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbn1cblxuLyoqIEFuZ3VsYXItYXdhcmUgaW5zdGFuY2Ugb2YgQXNzb2NpYXRpb25TZXJ2aWNlICovXG5jbGFzcyBOR0Fzc29jaWF0aW9uU2VydmljZSBleHRlbmRzIEFzc29jaWF0aW9uU2VydmljZSB7XG5cbiAgICBwcml2YXRlICRxIDogYW55O1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBodHRwQ2xpZW50IDogR1BIdHRwQ2xpZW50LCAkcSA6IGFueSkge1xuICAgICAgICBzdXBlcih1cmwsIGh0dHBDbGllbnQpO1xuICAgICAgICB0aGlzLiRxID0gJHE7XG4gICAgfVxuXG4gICAgY3JlYXRlUHJvbWlzZSAoIGFyZzogKHJlc29sdmU6ICh2YWx1ZT86IGFueSkgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkKSA9PiB2b2lkICkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcSggYXJnICk7XG4gICAgfVxuICAgIGNyZWF0ZUFuZFJlc29sdmVQcm9taXNlKCB2YWx1ZSA6IGFueSApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEucmVzb2x2ZSh2YWx1ZSk7XG4gICAgfVxuICAgIGNyZWF0ZUFuZFJlamVjdFByb21pc2UgKCBlcnJvciA6IEVycm9yICkgOiBQcm9taXNlPGFueT57XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG59XG5cblxuXG5leHBvcnQge1xuICAgIE5HSXRlbVNlcnZpY2UsXG4gICAgTkdEYXRhc2V0U2VydmljZSxcbiAgICBOR1NlcnZpY2VTZXJ2aWNlLFxuICAgIE5HTGF5ZXJTZXJ2aWNlLFxuICAgIE5HTWFwU2VydmljZSxcbiAgICBOR0dhbGxlcnlTZXJ2aWNlLFxuICAgIE5HVXRpbHNTZXJ2aWNlLFxuICAgIE5HQXNzb2NpYXRpb25TZXJ2aWNlXG59XG4iXX0=