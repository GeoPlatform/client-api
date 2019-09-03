import * as tslib_1 from "tslib";
import { ItemService, UtilsService, DatasetService, ServiceService, LayerService, MapService, GalleryService } from "@geoplatform/client";
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
export { NGItemService, NGDatasetService, NGServiceService, NGLayerService, NGMapService, NGGalleryService, NGUtilsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBRUgsV0FBVyxFQUFFLFlBQVksRUFDekIsY0FBYyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFDM0UsTUFBTSxxQkFBcUIsQ0FBQztBQU83Qjs7Ozs7Ozs7Ozs7R0FXRztBQUtILDRDQUE0QztBQUM1QztJQUE0Qix5Q0FBVztJQUluQyx1QkFBWSxHQUFZLEVBQUUsVUFBeUIsRUFBRSxFQUFRO1FBQTdELFlBQ0ksa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUV6QjtRQURHLEtBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDOztJQUNqQixDQUFDO0lBRUQscUNBQWEsR0FBYixVQUFnQixHQUE2RTtRQUN6RixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUUsR0FBRyxDQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNELCtDQUF1QixHQUF2QixVQUF5QixLQUFXO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNELDhDQUFzQixHQUF0QixVQUF5QixLQUFhO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVMLG9CQUFDO0FBQUQsQ0FBQyxBQW5CRCxDQUE0QixXQUFXLEdBbUJ0QztBQUdELCtDQUErQztBQUMvQztJQUErQiw0Q0FBYztJQUl6QywwQkFBWSxHQUFZLEVBQUUsVUFBeUIsRUFBRSxFQUFRO1FBQTdELFlBQ0ksa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUV6QjtRQURHLEtBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDOztJQUNqQixDQUFD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QW5CRCxDQUE2QixZQUFZLEdBbUJ4QztBQUdELE9BQU8sRUFDSCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixjQUFjLEVBQ2pCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSBcImFuZ3VsYXJcIjtcbmltcG9ydCB7XG4gICAgQ29uZmlnLCBRdWVyeSwgUXVlcnlGYWN0b3J5LCBJdGVtLCBTZWFyY2hSZXN1bHRzLCBHUEh0dHBDbGllbnQsXG4gICAgSXRlbVNlcnZpY2UsIFV0aWxzU2VydmljZSwgVHJhY2tpbmdTZXJ2aWNlLFxuICAgIERhdGFzZXRTZXJ2aWNlLCBTZXJ2aWNlU2VydmljZSwgTGF5ZXJTZXJ2aWNlLCBNYXBTZXJ2aWNlLCBHYWxsZXJ5U2VydmljZVxufSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5pbXBvcnQgTkdIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvbmcnO1xuXG5cblxuXG4vKlxuICogTk9USUNFOlxuICpcbiAqIFRoZXNlIHNlcnZpY2VzIGFyZSBhbmd1bGFyIGF3YXJlICh1c2luZyBhbmd1bGFyJ3MgJHEgd3JhcHBlcilcbiAqIHRvIGVuc3VyZSB0aGF0IGFueSBQcm9taXNlcyByZXR1cm5lZCBhcmUgdWx0aW1hdGVseSBnYXRlZFxuICogdGhyb3VnaCBhICRxIGluc3RhbmNlIGFuZCB0aGVyZWZvcmUgd2lsbCB0cmlnZ2VyIGEgZGlnZXN0XG4gKiB1cG9uIGNvbXBsZXRpb24uXG4gKlxuICogSWYgeW91IG1hbnVhbGx5IGNyZWF0ZSBhbiBpbnN0YW5jZSB0aGF0IGlzIG5vdCBhbmd1bGFyIGF3YXJlLFxuICogeW91IHdpbGwgbmVlZCB0byB3cmFwIGFueSByZXNwb25zZSBoYW5kbGVyJ3MgbWFuaXB1bGF0aW9uIG9mIGRhdGFcbiAqIHdpdGggJHNjb3BlLiRhcHBseSwgJHRpbWVvdXQsIG9yIGFuIGVxdWl2YWxlbnQgdG8gdHJpZ2dlciBhIGRpZ2VzdFxuICovXG5cblxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIEl0ZW1TZXJ2aWNlICovXG5jbGFzcyBOR0l0ZW1TZXJ2aWNlIGV4dGVuZHMgSXRlbVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIERhdGFzZXRTZXJ2aWNlICovXG5jbGFzcyBOR0RhdGFzZXRTZXJ2aWNlIGV4dGVuZHMgRGF0YXNldFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIEdhbGxlcnlTZXJ2aWNlICovXG5jbGFzcyBOR0dhbGxlcnlTZXJ2aWNlIGV4dGVuZHMgR2FsbGVyeVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIExheWVyU2VydmljZSAqL1xuY2xhc3MgTkdMYXllclNlcnZpY2UgZXh0ZW5kcyBMYXllclNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIE1hcFNlcnZpY2UgKi9cbmNsYXNzIE5HTWFwU2VydmljZSBleHRlbmRzIE1hcFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIFNlcnZpY2VTZXJ2aWNlICovXG5jbGFzcyBOR1NlcnZpY2VTZXJ2aWNlIGV4dGVuZHMgU2VydmljZVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIFV0aWxzU2VydmljZSAqL1xuY2xhc3MgTkdVdGlsc1NlcnZpY2UgZXh0ZW5kcyBVdGlsc1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCB7XG4gICAgTkdJdGVtU2VydmljZSxcbiAgICBOR0RhdGFzZXRTZXJ2aWNlLFxuICAgIE5HU2VydmljZVNlcnZpY2UsXG4gICAgTkdMYXllclNlcnZpY2UsXG4gICAgTkdNYXBTZXJ2aWNlLFxuICAgIE5HR2FsbGVyeVNlcnZpY2UsXG4gICAgTkdVdGlsc1NlcnZpY2Vcbn1cbiJdfQ==