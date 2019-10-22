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
class NGItemService extends ItemService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/** Angular-aware instance of DatasetService */
class NGDatasetService extends DatasetService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/** Angular-aware instance of GalleryService */
class NGGalleryService extends GalleryService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/** Angular-aware instance of LayerService */
class NGLayerService extends LayerService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/** Angular-aware instance of MapService */
class NGMapService extends MapService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/** Angular-aware instance of ServiceService */
class NGServiceService extends ServiceService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/** Angular-aware instance of UtilsService */
class NGUtilsService extends UtilsService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
/** Angular-aware instance of AssociationService */
class NGAssociationService extends AssociationService {
    constructor(url, httpClient, $q) {
        super(url, httpClient);
        this.$q = $q;
    }
    createPromise(arg) {
        return this.$q(arg);
    }
    createAndResolvePromise(value) {
        return this.$q.resolve(value);
    }
    createAndRejectPromise(error) {
        return this.$q.reject(error);
    }
}
export { NGItemService, NGDatasetService, NGServiceService, NGLayerService, NGMapService, NGGalleryService, NGUtilsService, NGAssociationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFFSCxXQUFXLEVBQUUsWUFBWSxFQUFtQixrQkFBa0IsRUFDOUQsY0FBYyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFDM0UsTUFBTSxxQkFBcUIsQ0FBQztBQU83Qjs7Ozs7Ozs7Ozs7R0FXRztBQUlILDRDQUE0QztBQUM1QyxNQUFNLGFBQWMsU0FBUSxXQUFXO0lBSW5DLFlBQVksR0FBWSxFQUFFLFVBQXlCLEVBQUUsRUFBUTtRQUN6RCxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxhQUFhLENBQUcsR0FBNkU7UUFDekYsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCx1QkFBdUIsQ0FBRSxLQUFXO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNELHNCQUFzQixDQUFHLEtBQWE7UUFDbEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0NBRUo7QUFHRCwrQ0FBK0M7QUFDL0MsTUFBTSxnQkFBaUIsU0FBUSxjQUFjO0lBSXpDLFlBQVksR0FBWSxFQUFFLFVBQXlCLEVBQUUsRUFBUTtRQUN6RCxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxhQUFhLENBQUcsR0FBNkU7UUFDekYsT0FBTyxJQUFJ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S0FBYTtRQUNsQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Q0FFSjtBQUlELE9BQU8sRUFDSCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3ZCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSBcImFuZ3VsYXJcIjtcbmltcG9ydCB7XG4gICAgQ29uZmlnLCBRdWVyeSwgUXVlcnlGYWN0b3J5LCBJdGVtLCBTZWFyY2hSZXN1bHRzLCBHUEh0dHBDbGllbnQsXG4gICAgSXRlbVNlcnZpY2UsIFV0aWxzU2VydmljZSwgVHJhY2tpbmdTZXJ2aWNlLCBBc3NvY2lhdGlvblNlcnZpY2UsXG4gICAgRGF0YXNldFNlcnZpY2UsIFNlcnZpY2VTZXJ2aWNlLCBMYXllclNlcnZpY2UsIE1hcFNlcnZpY2UsIEdhbGxlcnlTZXJ2aWNlXG59IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cbmltcG9ydCBOR0h0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9uZyc7XG5cblxuXG5cbi8qXG4gKiBOT1RJQ0U6XG4gKlxuICogVGhlc2Ugc2VydmljZXMgYXJlIGFuZ3VsYXIgYXdhcmUgKHVzaW5nIGFuZ3VsYXIncyAkcSB3cmFwcGVyKVxuICogdG8gZW5zdXJlIHRoYXQgYW55IFByb21pc2VzIHJldHVybmVkIGFyZSB1bHRpbWF0ZWx5IGdhdGVkXG4gKiB0aHJvdWdoIGEgJHEgaW5zdGFuY2UgYW5kIHRoZXJlZm9yZSB3aWxsIHRyaWdnZXIgYSBkaWdlc3RcbiAqIHVwb24gY29tcGxldGlvbi5cbiAqXG4gKiBJZiB5b3UgbWFudWFsbHkgY3JlYXRlIGFuIGluc3RhbmNlIHRoYXQgaXMgbm90IGFuZ3VsYXIgYXdhcmUsXG4gKiB5b3Ugd2lsbCBuZWVkIHRvIHdyYXAgYW55IHJlc3BvbnNlIGhhbmRsZXIncyBtYW5pcHVsYXRpb24gb2YgZGF0YVxuICogd2l0aCAkc2NvcGUuJGFwcGx5LCAkdGltZW91dCwgb3IgYW4gZXF1aXZhbGVudCB0byB0cmlnZ2VyIGEgZGlnZXN0XG4gKi9cblxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIEl0ZW1TZXJ2aWNlICovXG5jbGFzcyBOR0l0ZW1TZXJ2aWNlIGV4dGVuZHMgSXRlbVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIERhdGFzZXRTZXJ2aWNlICovXG5jbGFzcyBOR0RhdGFzZXRTZXJ2aWNlIGV4dGVuZHMgRGF0YXNldFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIEdhbGxlcnlTZXJ2aWNlICovXG5jbGFzcyBOR0dhbGxlcnlTZXJ2aWNlIGV4dGVuZHMgR2FsbGVyeVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIExheWVyU2VydmljZSAqL1xuY2xhc3MgTkdMYXllclNlcnZpY2UgZXh0ZW5kcyBMYXllclNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIE1hcFNlcnZpY2UgKi9cbmNsYXNzIE5HTWFwU2VydmljZSBleHRlbmRzIE1hcFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIFNlcnZpY2VTZXJ2aWNlICovXG5jbGFzcyBOR1NlcnZpY2VTZXJ2aWNlIGV4dGVuZHMgU2VydmljZVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG5cbi8qKiBBbmd1bGFyLWF3YXJlIGluc3RhbmNlIG9mIFV0aWxzU2VydmljZSAqL1xuY2xhc3MgTkdVdGlsc1NlcnZpY2UgZXh0ZW5kcyBVdGlsc1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSAkcSA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgaHR0cENsaWVudCA6IEdQSHR0cENsaWVudCwgJHEgOiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBodHRwQ2xpZW50KTtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb21pc2UgKCBhcmc6IChyZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gdm9pZCApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEoIGFyZyApO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZXNvbHZlUHJvbWlzZSggdmFsdWUgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjcmVhdGVBbmRSZWplY3RQcm9taXNlICggZXJyb3IgOiBFcnJvciApIDogUHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxufVxuXG4vKiogQW5ndWxhci1hd2FyZSBpbnN0YW5jZSBvZiBBc3NvY2lhdGlvblNlcnZpY2UgKi9cbmNsYXNzIE5HQXNzb2NpYXRpb25TZXJ2aWNlIGV4dGVuZHMgQXNzb2NpYXRpb25TZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgJHEgOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIGh0dHBDbGllbnQgOiBHUEh0dHBDbGllbnQsICRxIDogYW55KSB7XG4gICAgICAgIHN1cGVyKHVybCwgaHR0cENsaWVudCk7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9taXNlICggYXJnOiAocmVzb2x2ZTogKHZhbHVlPzogYW55KSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQpID0+IHZvaWQgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxKCBhcmcgKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVzb2x2ZVByb21pc2UoIHZhbHVlIDogYW55ICkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcS5yZXNvbHZlKHZhbHVlKTtcbiAgICB9XG4gICAgY3JlYXRlQW5kUmVqZWN0UHJvbWlzZSAoIGVycm9yIDogRXJyb3IgKSA6IFByb21pc2U8YW55PntcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbn1cblxuXG5cbmV4cG9ydCB7XG4gICAgTkdJdGVtU2VydmljZSxcbiAgICBOR0RhdGFzZXRTZXJ2aWNlLFxuICAgIE5HU2VydmljZVNlcnZpY2UsXG4gICAgTkdMYXllclNlcnZpY2UsXG4gICAgTkdNYXBTZXJ2aWNlLFxuICAgIE5HR2FsbGVyeVNlcnZpY2UsXG4gICAgTkdVdGlsc1NlcnZpY2UsXG4gICAgTkdBc3NvY2lhdGlvblNlcnZpY2Vcbn1cbiJdfQ==