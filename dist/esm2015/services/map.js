/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import ItemService from './item';
/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
class MapService extends ItemService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/maps';
    }
}
export default MapService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxXQUFXLE1BQU0sUUFBUSxDQUFDOzs7Ozs7OztBQVdqQyxnQkFBaUIsU0FBUSxXQUFXOzs7OztJQUVoQyxZQUFZLEdBQVUsRUFBRSxVQUF1QjtRQUMzQyxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQzFCOzs7OztJQUVELE1BQU0sQ0FBQyxPQUFjO1FBQ2pCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsV0FBVyxDQUFDO0tBQ3hDO0NBR0o7QUFFRCxlQUFlLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgSXRlbVNlcnZpY2UgZnJvbSAnLi9pdGVtJztcbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi4vaHR0cC9jbGllbnQnO1xuXG4vKipcbiAqIEdlb1BsYXRmb3JtIE1hcCBzZXJ2aWNlXG4gKiBzZXJ2aWNlIGZvciB3b3JraW5nIHdpdGggdGhlIEdlb1BsYXRmb3JtIEFQSSB0b1xuICogcmV0cmlldmUgYW5kIG1hbmlwdWxhdGUgbWFwIG9iamVjdHMuXG4gKlxuICogQHNlZSBHZW9QbGF0Zm9ybS5JdGVtU2VydmljZVxuICovXG5cbmNsYXNzIE1hcFNlcnZpY2UgZXh0ZW5kcyBJdGVtU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmw6c3RyaW5nLCBodHRwQ2xpZW50OkdQSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcih1cmwsIGh0dHBDbGllbnQpO1xuICAgIH1cblxuICAgIHNldFVybChiYXNlVXJsOnN0cmluZykge1xuICAgICAgICBzdXBlci5zZXRVcmwoYmFzZVVybCk7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmwgKyAnL2FwaS9tYXBzJztcbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNYXBTZXJ2aWNlO1xuIl19