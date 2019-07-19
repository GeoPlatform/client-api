/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ItemService, UtilsService, DatasetService, ServiceService, LayerService, MapService, GalleryService } from "@geoplatform/client";
/**
 * Angular-aware instance of ItemService
 */
class NGItemService extends ItemService {
    /**
     * @param {?} url
     * @param {?} httpClient
     * @param {?} $q
     */
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    createPromise(arg) {
        return this.$q(arg);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
if (false) {
    /** @type {?} */
    NGItemService.prototype.$q;
}
/**
 * Angular-aware instance of DatasetService
 */
class NGDatasetService extends DatasetService {
    /**
     * @param {?} url
     * @param {?} httpClient
     * @param {?} $q
     */
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    createPromise(arg) {
        return this.$q(arg);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
if (false) {
    /** @type {?} */
    NGDatasetService.prototype.$q;
}
/**
 * Angular-aware instance of GalleryService
 */
class NGGalleryService extends GalleryService {
    /**
     * @param {?} url
     * @param {?} httpClient
     * @param {?} $q
     */
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    createPromise(arg) {
        return this.$q(arg);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
if (false) {
    /** @type {?} */
    NGGalleryService.prototype.$q;
}
/**
 * Angular-aware instance of LayerService
 */
class NGLayerService extends LayerService {
    /**
     * @param {?} url
     * @param {?} httpClient
     * @param {?} $q
     */
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    createPromise(arg) {
        return this.$q(arg);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
if (false) {
    /** @type {?} */
    NGLayerService.prototype.$q;
}
/**
 * Angular-aware instance of MapService
 */
class NGMapService extends MapService {
    /**
     * @param {?} url
     * @param {?} httpClient
     * @param {?} $q
     */
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    createPromise(arg) {
        return this.$q(arg);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
if (false) {
    /** @type {?} */
    NGMapService.prototype.$q;
}
/**
 * Angular-aware instance of ServiceService
 */
class NGServiceService extends ServiceService {
    /**
     * @param {?} url
     * @param {?} httpClient
     * @param {?} $q
     */
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    createPromise(arg) {
        return this.$q(arg);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
if (false) {
    /** @type {?} */
    NGServiceService.prototype.$q;
}
/**
 * Angular-aware instance of UtilsService
 */
class NGUtilsService extends UtilsService {
    /**
     * @param {?} url
     * @param {?} httpClient
     * @param {?} $q
     */
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    createPromise(arg) {
        return this.$q(arg);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
if (false) {
    /** @type {?} */
    NGUtilsService.prototype.$q;
}
export { NGItemService, NGDatasetService, NGServiceService, NGLayerService, NGMapService, NGGalleryService, NGUtilsService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBRUgsV0FBVyxFQUFFLFlBQVksRUFDekIsY0FBYyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFDM0UsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQXdCN0IsbUJBQW9CLFNBQVEsV0FBVzs7Ozs7O0lBSW5DLFlBQVksR0FBWSxFQUFFLFVBQXlCLEVBQUUsRUFBUTtRQUN6RCxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0tBQ2hCOzs7OztJQUVELGFBQWEsQ0FBRyxHQUE2RTtRQUN6RixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUUsR0FBRyxDQUFFLENBQUM7S0FDekI7Ozs7O0lBQ0QsdUJBQXVCLENBQUUsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDOzs7OztJQUNELHNCQUFzQixDQUFHLEtBQWE7UUFDbEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNoQztDQUVKOzs7Ozs7OztBQUlELHNCQUF1QixTQUFRLGNBQWM7Ozs7OztJQUl6QyxZQUFZLEdBQVksRUFBRSxVQUF5QixFQUFFLEVBQVE7UUFDekQsS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztLQUNoQjs7Ozs7SUFFRCxhQUFhLENBQUcsR0FBNkU7UUFDekYsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFFLEdBQUcsQ0FBRSxDQUFDO0tBQ3pCOzs7OztJQUNELHVCQUF1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QUFDO0tBQ2hDO0NBRUo7Ozs7Ozs7O0FBSUQsb0JBQXFCLFNBQVEsWUFBWTs7Ozs7O0lBSXJDLFlBQVksR0FBWSxFQUFFLFVBQXlCLEVBQUUsRUFBUTtRQUN6RCxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0tBQ2hCOzs7OztJQUVELGFBQWEsQ0FBRyxHQUE2RTtRQUN6RixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUUsR0FBRyxDQUFFLENBQUM7S0FDekI7Ozs7O0lBQ0QsdUJBQXVCLENBQUUsS0FBVztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDOzs7OztJQUNELHNCQUFzQixDQUFHLEtBQWE7UUFDbEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNoQztDQUVKOzs7OztBQUdELE9BQU8sRUFDSCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixjQUFjLEVBQ2pCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSBcImFuZ3VsYXJcIjtcbmltcG9ydCB7XG4gICAgQ29uZmlnLCBRdWVyeSwgUXVlcnlGYWN0b3J5LCBJdGVtLCBTZWFyY2hSZXN1bHRzLCBHUEh0dHBDbGllbnQsXG4gICAgSXRlbVNlcnZpY2UsIFV0aWxzU2VydmljZSwgVHJhY2tpbmdTZXJ2aWNlLFxuICAgIERhdGFzZXRTZXJ2aWNlLCBTZXJ2aWNlU2VydmljZSwgTGF5ZXJTZXJ2aWNlLCBNYXBTZXJ2aWNlLCBHYWxsZXJ5U2VydmljZVxufSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5pbXBvcnQgTkdIdHRwQ2xpZW50IGZyb20gJy4uL2h0dHAvbmcnO1xuXG5cblxuXG4vKlxuICogTk9USUNFOlxuICpcbiAqIFRoZXNlIHNlcnZpY2VzIGFyZSBhbmd1bGFyIGF3YXJlICh1c2luZyBhbmd1bGFyJ3MgJHEgd3JhcHBlcilcbiAqIHRvIGVuc3VyZSB0aGF0IGFueSBQcm9taXNlcyByZXR1cm5lZCBhcmUgdWx0aW1hdGVseSBnYXRlZFxuICogdGhyb3VnaCBhICRxIGluc3RhbmNlIGFuZCB0aGVyZWZvcmUgd2lsbCB0cmlnZ2VyIGEgZGlnZXN0XG4gKiB1cG9uIGNvbXBsZXRpb24uXG4gKlxuICogSWYgeW91IG1hbnVhbGx5IGNyZWF0ZSBhbiBpbnN0YW5jZSB0aGF0IGlzIG5vdCBhbmd1bGFyIGF3YXJlLFxuICogeW91IHdpbGwgbmVlZCB0byB3cmFwIGFueSByZXNwb25zZSBoYW5kbGVyJ3MgbWFuaXB1bGF0aW9uIG9mIGRhdGFcbiAqIHdpdGggJHNjb3BlLiRhcHBseSwgJHRpbWVvdXQsIG9yIGFuIGVxdWl2YWxlbnQgdG8gdHJpZ2dlciBhIGRpZ2VzdFxuICovXG5cblxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIEl0ZW1TZXJ2aWNlICovXG5jbGFzcyBOR0l0ZW1TZXJ2aWNlIGV4dGVuZHMgSXRlbVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIERhdGFzZXRTZXJ2aWNlICovXG5jbGFzcyBOR0RhdGFzZXRTZXJ2aWNlIGV4dGVuZHMgRGF0YXNldFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIEdhbGxlcnlTZXJ2aWNlICovXG5jbGFzcyBOR0dhbGxlcnlTZXJ2aWNlIGV4dGVuZHMgR2FsbGVyeVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIExheWVyU2VydmljZSAqL1xuY2xhc3MgTkdMYXllclNlcnZpY2UgZXh0ZW5kcyBMYXllclNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIE1hcFNlcnZpY2UgKi9cbmNsYXNzIE5HTWFwU2VydmljZSBleHRlbmRzIE1hcFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIFNlcnZpY2VTZXJ2aWNlICovXG5jbGFzcyBOR1NlcnZpY2VTZXJ2aWNlIGV4dGVuZHMgU2VydmljZVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIFV0aWxzU2VydmljZSAqL1xuY2xhc3MgTkdVdGlsc1NlcnZpY2UgZXh0ZW5kcyBVdGlsc1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCB7XG4gICAgTkdJdGVtU2VydmljZSxcbiAgICBOR0RhdGFzZXRTZXJ2aWNlLFxuICAgIE5HU2VydmljZVNlcnZpY2UsXG4gICAgTkdMYXllclNlcnZpY2UsXG4gICAgTkdNYXBTZXJ2aWNlLFxuICAgIE5HR2FsbGVyeVNlcnZpY2UsXG4gICAgTkdVdGlsc1NlcnZpY2Vcbn1cbiJdfQ==