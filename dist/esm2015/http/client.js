class GPHttpClient {
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    constructor(options) {
        this.timeout = 5000;
        options = options || {};
        this.setTimeout(options.timeout || 30000);
        this.setAuthToken(options.token);
    }
    setTimeout(timeout) {
        this.timeout = timeout;
    }
    /**
     * @param arg - specify the bearer token or a function to retrieve it
     */
    setAuthToken(arg) {
        if (arg && typeof (arg) === 'string')
            this.token = function () { return arg; };
        else if (arg && typeof (arg) === 'function')
            this.token = arg;
        //else do nothing
    }
    getToken() {
        if (this.token && typeof (this.token) === 'function')
            return this.token();
        else
            return this.token || null;
    }
    createRequestOpts(
    // @ts-ignore
    options) {
        throw new Error("Must implement 'createRequestOpts' in a sub-class");
    }
    execute(
    // @ts-ignore
    opts) {
        return Promise.reject(new Error("Must overrdie 'execute' in a sub-class"));
    }
}
export default GPHttpClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbImh0dHAvY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sWUFBWTtJQUtkOzs7T0FHRztJQUNILFlBQVksT0FBaUM7UUFObkMsWUFBTyxHQUFZLElBQUksQ0FBQztRQU85QixPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUFnQjtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZLENBQUMsR0FBcUI7UUFDOUIsSUFBRyxHQUFHLElBQUksT0FBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFhLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZDLElBQUcsR0FBRyxJQUFJLE9BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxVQUFVO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLGlCQUFpQjtJQUNyQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVU7WUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7WUFDbkUsT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQsaUJBQWlCO0lBQ2IsYUFBYTtJQUNiLE9BQWdDO1FBRWhDLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsT0FBTztJQUNILGFBQWE7SUFDYixJQUFVO1FBRVYsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQztJQUMvRSxDQUFDO0NBRUo7QUFFRCxlQUFlLFlBQVksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5jbGFzcyBHUEh0dHBDbGllbnQge1xuXG4gICAgcHJvdGVjdGVkIHRva2VuIDogYW55O1xuICAgIHByb3RlY3RlZCB0aW1lb3V0IDogbnVtYmVyID0gNTAwMDtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRpbWVvdXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50b2tlbiAtIHRoZSBiZWFyZXIgdG9rZW4gb3IgYSBmdW5jdGlvbiB0byByZXRyaWV2ZSBpdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPzogeyBba2V5OnN0cmluZ10gOiBhbnkgfSkge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5zZXRUaW1lb3V0KG9wdGlvbnMudGltZW91dHx8MzAwMDApO1xuICAgICAgICB0aGlzLnNldEF1dGhUb2tlbihvcHRpb25zLnRva2VuKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KHRpbWVvdXQgOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnIC0gc3BlY2lmeSB0aGUgYmVhcmVyIHRva2VuIG9yIGEgZnVuY3Rpb24gdG8gcmV0cmlldmUgaXRcbiAgICAgKi9cbiAgICBzZXRBdXRoVG9rZW4oYXJnIDogc3RyaW5nfEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmKGFyZyAmJiB0eXBlb2YoYXJnKSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICB0aGlzLnRva2VuID0gZnVuY3Rpb24oKSB7IHJldHVybiBhcmc7IH07XG4gICAgICAgIGVsc2UgaWYoYXJnICYmIHR5cGVvZihhcmcpID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgdGhpcy50b2tlbiA9IGFyZztcbiAgICAgICAgLy9lbHNlIGRvIG5vdGhpbmdcbiAgICB9XG5cbiAgICBnZXRUb2tlbigpIDogc3RyaW5nIHtcbiAgICAgICAgaWYodGhpcy50b2tlbiAmJiB0eXBlb2YodGhpcy50b2tlbikgPT09ICdmdW5jdGlvbicpIHJldHVybiB0aGlzLnRva2VuKCk7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMudG9rZW4gfHwgbnVsbDtcbiAgICB9XG5cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBvcHRpb25zIDogeyBba2V5OnN0cmluZ10gOiBhbnkgfVxuICAgICkgOiBhbnkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IGltcGxlbWVudCAnY3JlYXRlUmVxdWVzdE9wdHMnIGluIGEgc3ViLWNsYXNzXCIpO1xuICAgIH1cblxuICAgIGV4ZWN1dGUoXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgb3B0cyA6IGFueVxuICAgICkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTXVzdCBvdmVycmRpZSAnZXhlY3V0ZScgaW4gYSBzdWItY2xhc3NcIikpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHUEh0dHBDbGllbnQ7XG4iXX0=