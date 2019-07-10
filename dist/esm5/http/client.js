/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GPHttpClient = /** @class */ (function () {
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    function GPHttpClient(options) {
        this.timeout = 5000;
        options = options || {};
        this.setTimeout(options["timeout"] || 30000);
        this.setAuthToken(options["token"]);
    }
    /**
     * @param {?} timeout
     * @return {?}
     */
    GPHttpClient.prototype.setTimeout = /**
     * @param {?} timeout
     * @return {?}
     */
    function (timeout) {
        this.timeout = timeout;
    };
    /**
     * @param arg - specify the bearer token or a function to retrieve it
     */
    /**
     * @param {?} arg - specify the bearer token or a function to retrieve it
     * @return {?}
     */
    GPHttpClient.prototype.setAuthToken = /**
     * @param {?} arg - specify the bearer token or a function to retrieve it
     * @return {?}
     */
    function (arg) {
        if (arg && typeof (arg) === 'string')
            this.token = function () { return arg; };
        else if (arg && typeof (arg) === 'function')
            this.token = arg;
        //else do nothing
    };
    /**
     * @param {?} options
     * @return {?}
     */
    GPHttpClient.prototype.createRequestOpts = /**
     * @param {?} options
     * @return {?}
     */
    function (
    // @ts-ignore
    // @ts-ignore
    options) {
        throw new Error("Must implement 'createRequestOpts' in a sub-class");
    };
    /**
     * @param {?} opts
     * @return {?}
     */
    GPHttpClient.prototype.execute = /**
     * @param {?} opts
     * @return {?}
     */
    function (
    // @ts-ignore
    // @ts-ignore
    opts) {
        return Promise.reject(new Error("Must overrdie 'execute' in a sub-class"));
    };
    return GPHttpClient;
}());
if (false) {
    /** @type {?} */
    GPHttpClient.prototype.token;
    /** @type {?} */
    GPHttpClient.prototype.timeout;
}
export default GPHttpClient;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbImh0dHAvY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxJQUFBO0lBS0k7OztPQUdHO0lBQ0gsc0JBQVksT0FBaUM7dUJBTmhCLElBQUk7UUFPN0IsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLGVBQVUsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLFVBQU8sQ0FBQztLQUNwQzs7Ozs7SUFFRCxpQ0FBVTs7OztJQUFWLFVBQVcsT0FBZ0I7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDMUI7SUFFRDs7T0FFRzs7Ozs7SUFDSCxtQ0FBWTs7OztJQUFaLFVBQWEsR0FBcUI7UUFDOUIsSUFBRyxHQUFHLElBQUksT0FBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFhLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQzthQUN2QyxJQUFHLEdBQUcsSUFBSSxPQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVTtZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQzs7S0FFeEI7Ozs7O0lBRUQsd0NBQWlCOzs7O0lBQWpCOztJQUVJLEFBREEsYUFBYTtJQUNiLE9BQWdDO1FBRWhDLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztLQUN4RTs7Ozs7SUFFRCw4QkFBTzs7OztJQUFQOztJQUVJLEFBREEsYUFBYTtJQUNiLElBQVU7UUFFVixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxDQUFDO0tBQzlFO3VCQTVDTDtJQThDQyxDQUFBOzs7Ozs7O0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuY2xhc3MgR1BIdHRwQ2xpZW50IHtcblxuICAgIHByb3RlY3RlZCB0b2tlbiA6IGFueTtcbiAgICBwcm90ZWN0ZWQgdGltZW91dCA6IG51bWJlciA9IDUwMDA7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50aW1lb3V0XG4gICAgICogQHBhcmFtIG9wdGlvbnMudG9rZW4gLSB0aGUgYmVhcmVyIHRva2VuIG9yIGEgZnVuY3Rpb24gdG8gcmV0cmlldmUgaXRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IHsgW2tleTpzdHJpbmddIDogYW55IH0pIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMuc2V0VGltZW91dChvcHRpb25zLnRpbWVvdXR8fDMwMDAwKTtcbiAgICAgICAgdGhpcy5zZXRBdXRoVG9rZW4ob3B0aW9ucy50b2tlbik7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dCh0aW1lb3V0IDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZyAtIHNwZWNpZnkgdGhlIGJlYXJlciB0b2tlbiBvciBhIGZ1bmN0aW9uIHRvIHJldHJpZXZlIGl0XG4gICAgICovXG4gICAgc2V0QXV0aFRva2VuKGFyZyA6IHN0cmluZ3xGdW5jdGlvbikge1xuICAgICAgICBpZihhcmcgJiYgdHlwZW9mKGFyZykgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgdGhpcy50b2tlbiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnOyB9O1xuICAgICAgICBlbHNlIGlmKGFyZyAmJiB0eXBlb2YoYXJnKSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHRoaXMudG9rZW4gPSBhcmc7XG4gICAgICAgIC8vZWxzZSBkbyBub3RoaW5nXG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMoXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgb3B0aW9ucyA6IHsgW2tleTpzdHJpbmddIDogYW55IH1cbiAgICApIDogYW55IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBpbXBsZW1lbnQgJ2NyZWF0ZVJlcXVlc3RPcHRzJyBpbiBhIHN1Yi1jbGFzc1wiKTtcbiAgICB9XG5cbiAgICBleGVjdXRlKFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIG9wdHMgOiBhbnlcbiAgICApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk11c3Qgb3ZlcnJkaWUgJ2V4ZWN1dGUnIGluIGEgc3ViLWNsYXNzXCIpKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgR1BIdHRwQ2xpZW50O1xuIl19