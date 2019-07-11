/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GPHttpClient {
    /**
     * @param {?=} options
     */
    constructor(options) {
        this.timeout = 5000;
        options = options || {};
        this.setTimeout(options["timeout"] || 30000);
        this.setAuthToken(options["token"]);
    }
    /**
     * @param {?} timeout
     * @return {?}
     */
    setTimeout(timeout) {
        this.timeout = timeout;
    }
    /**
     * @param {?} arg - specify the bearer token or a function to retrieve it
     * @return {?}
     */
    setAuthToken(arg) {
        if (arg && typeof (arg) === 'string')
            this.token = function () { return arg; };
        else if (arg && typeof (arg) === 'function')
            this.token = arg;
        //else do nothing
    }
    /**
     * @return {?}
     */
    getToken() {
        if (this.token && typeof (this.token) === 'function')
            return this.token();
        else
            return this.token || null;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(
    // @ts-ignore
    // @ts-ignore
    options) {
        throw new Error("Must implement 'createRequestOpts' in a sub-class");
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    execute(
    // @ts-ignore
    // @ts-ignore
    opts) {
        return Promise.reject(new Error("Must overrdie 'execute' in a sub-class"));
    }
}
if (false) {
    /** @type {?} */
    GPHttpClient.prototype.token;
    /** @type {?} */
    GPHttpClient.prototype.timeout;
}
export default GPHttpClient;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbImh0dHAvY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTs7OztJQVNJLFlBQVksT0FBaUM7dUJBTmhCLElBQUk7UUFPN0IsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLGVBQVUsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLFVBQU8sQ0FBQztLQUNwQzs7Ozs7SUFFRCxVQUFVLENBQUMsT0FBZ0I7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDMUI7Ozs7O0lBS0QsWUFBWSxDQUFDLEdBQXFCO1FBQzlCLElBQUcsR0FBRyxJQUFJLE9BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYSxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUM7YUFDdkMsSUFBRyxHQUFHLElBQUksT0FBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFVBQVU7WUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7O0tBRXhCOzs7O0lBRUQsUUFBUTtRQUNKLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVU7WUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7WUFDbkUsT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztLQUNsQzs7Ozs7SUFFRCxpQkFBaUI7O0lBRWIsQUFEQSxhQUFhO0lBQ2IsT0FBZ0M7UUFFaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO0tBQ3hFOzs7OztJQUVELE9BQU87O0lBRUgsQUFEQSxhQUFhO0lBQ2IsSUFBVTtRQUVWLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLENBQUM7S0FDOUU7Q0FFSjs7Ozs7OztBQUVELGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmNsYXNzIEdQSHR0cENsaWVudCB7XG5cbiAgICBwcm90ZWN0ZWQgdG9rZW4gOiBhbnk7XG4gICAgcHJvdGVjdGVkIHRpbWVvdXQgOiBudW1iZXIgPSA1MDAwO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvbnMudGltZW91dFxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRva2VuIC0gdGhlIGJlYXJlciB0b2tlbiBvciBhIGZ1bmN0aW9uIHRvIHJldHJpZXZlIGl0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA/OiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLnNldFRpbWVvdXQob3B0aW9ucy50aW1lb3V0fHwzMDAwMCk7XG4gICAgICAgIHRoaXMuc2V0QXV0aFRva2VuKG9wdGlvbnMudG9rZW4pO1xuICAgIH1cblxuICAgIHNldFRpbWVvdXQodGltZW91dCA6IG51bWJlcikge1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBzcGVjaWZ5IHRoZSBiZWFyZXIgdG9rZW4gb3IgYSBmdW5jdGlvbiB0byByZXRyaWV2ZSBpdFxuICAgICAqL1xuICAgIHNldEF1dGhUb2tlbihhcmcgOiBzdHJpbmd8RnVuY3Rpb24pIHtcbiAgICAgICAgaWYoYXJnICYmIHR5cGVvZihhcmcpID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHRoaXMudG9rZW4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZzsgfTtcbiAgICAgICAgZWxzZSBpZihhcmcgJiYgdHlwZW9mKGFyZykgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICB0aGlzLnRva2VuID0gYXJnO1xuICAgICAgICAvL2Vsc2UgZG8gbm90aGluZ1xuICAgIH1cblxuICAgIGdldFRva2VuKCkgOiBzdHJpbmcge1xuICAgICAgICBpZih0aGlzLnRva2VuICYmIHR5cGVvZih0aGlzLnRva2VuKSA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHRoaXMudG9rZW4oKTtcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy50b2tlbiB8fCBudWxsO1xuICAgIH1cblxuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIG9wdGlvbnMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9XG4gICAgKSA6IGFueSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgaW1wbGVtZW50ICdjcmVhdGVSZXF1ZXN0T3B0cycgaW4gYSBzdWItY2xhc3NcIik7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBvcHRzIDogYW55XG4gICAgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJNdXN0IG92ZXJyZGllICdleGVjdXRlJyBpbiBhIHN1Yi1jbGFzc1wiKSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdQSHR0cENsaWVudDtcbiJdfQ==