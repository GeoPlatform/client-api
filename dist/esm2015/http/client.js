/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from 'q';
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
        return Q.reject(new Error("Must overrdie 'execute' in a sub-class"));
    }
}
if (false) {
    /** @type {?} */
    GPHttpClient.prototype.token;
    /** @type {?} */
    GPHttpClient.prototype.timeout;
}
export default GPHttpClient;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbImh0dHAvY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztBQUd2Qjs7OztJQVNJLFlBQVksT0FBaUM7dUJBTmhCLElBQUk7UUFPN0IsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLGVBQVUsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLFVBQU8sQ0FBQztLQUNwQzs7Ozs7SUFFRCxVQUFVLENBQUMsT0FBZ0I7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDMUI7Ozs7O0lBS0QsWUFBWSxDQUFDLEdBQXFCO1FBQzlCLElBQUcsR0FBRyxJQUFJLE9BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYSxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUM7YUFDdkMsSUFBRyxHQUFHLElBQUksT0FBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFVBQVU7WUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7O0tBRXhCOzs7OztJQUVELGlCQUFpQjs7SUFFYixBQURBLGFBQWE7SUFDYixPQUFnQztRQUVoQyxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7S0FDeEU7Ozs7O0lBRUQsT0FBTzs7SUFFSCxBQURBLGFBQWE7SUFDYixJQUFVO1FBRVYsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQztLQUN4RTtDQUVKOzs7Ozs7O0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0ICogYXMgUSBmcm9tICdxJztcblxuXG5jbGFzcyBHUEh0dHBDbGllbnQge1xuXG4gICAgcHJvdGVjdGVkIHRva2VuIDogYW55O1xuICAgIHByb3RlY3RlZCB0aW1lb3V0IDogbnVtYmVyID0gNTAwMDtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRpbWVvdXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50b2tlbiAtIHRoZSBiZWFyZXIgdG9rZW4gb3IgYSBmdW5jdGlvbiB0byByZXRyaWV2ZSBpdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPzogeyBba2V5OnN0cmluZ10gOiBhbnkgfSkge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5zZXRUaW1lb3V0KG9wdGlvbnMudGltZW91dHx8MzAwMDApO1xuICAgICAgICB0aGlzLnNldEF1dGhUb2tlbihvcHRpb25zLnRva2VuKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KHRpbWVvdXQgOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnIC0gc3BlY2lmeSB0aGUgYmVhcmVyIHRva2VuIG9yIGEgZnVuY3Rpb24gdG8gcmV0cmlldmUgaXRcbiAgICAgKi9cbiAgICBzZXRBdXRoVG9rZW4oYXJnIDogc3RyaW5nfEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmKGFyZyAmJiB0eXBlb2YoYXJnKSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICB0aGlzLnRva2VuID0gZnVuY3Rpb24oKSB7IHJldHVybiBhcmc7IH07XG4gICAgICAgIGVsc2UgaWYoYXJnICYmIHR5cGVvZihhcmcpID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgdGhpcy50b2tlbiA9IGFyZztcbiAgICAgICAgLy9lbHNlIGRvIG5vdGhpbmdcbiAgICB9XG5cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBvcHRpb25zIDogeyBba2V5OnN0cmluZ10gOiBhbnkgfVxuICAgICkgOiBhbnkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IGltcGxlbWVudCAnY3JlYXRlUmVxdWVzdE9wdHMnIGluIGEgc3ViLWNsYXNzXCIpO1xuICAgIH1cblxuICAgIGV4ZWN1dGUoXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgb3B0cyA6IGFueVxuICAgICkgOiBRLlByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBRLnJlamVjdChuZXcgRXJyb3IoXCJNdXN0IG92ZXJyZGllICdleGVjdXRlJyBpbiBhIHN1Yi1jbGFzc1wiKSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdQSHR0cENsaWVudDtcbiJdfQ==