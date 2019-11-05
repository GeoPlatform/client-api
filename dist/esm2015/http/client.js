class GPHttpClient {
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    constructor(options) {
        this.timeout = 5000;
        this.authCookieName = 'gpoauth-a';
        options = options || {};
        this.setTimeout(options.timeout || 30000);
        this.setAuthToken(options.token);
        this.setCookie(options.cookie);
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
    setCookie(cookie) {
        this.cookie = cookie;
    }
    getCookie() {
        return this.cookie;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbImh0dHAvY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sWUFBWTtJQVFkOzs7T0FHRztJQUNILFlBQVksT0FBaUM7UUFSbkMsWUFBTyxHQUFZLElBQUksQ0FBQztRQUV4QixtQkFBYyxHQUFHLFdBQVcsQ0FBQztRQU9uQyxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUFnQjtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZLENBQUMsR0FBcUI7UUFDOUIsSUFBRyxHQUFHLElBQUksT0FBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFhLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZDLElBQUcsR0FBRyxJQUFJLE9BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxVQUFVO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLGlCQUFpQjtJQUNyQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVU7WUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7WUFDbkUsT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQU07UUFDWixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsaUJBQWlCO0lBQ2IsYUFBYTtJQUNiLE9BQWdDO1FBRWhDLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsT0FBTztJQUNILGFBQWE7SUFDYixJQUFVO1FBRVYsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQztJQUMvRSxDQUFDO0NBRUo7QUFFRCxlQUFlLFlBQVksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5jbGFzcyBHUEh0dHBDbGllbnQge1xuXG4gICAgcHJvdGVjdGVkIHRva2VuIDogYW55O1xuICAgIHByb3RlY3RlZCBjb29raWUgOiBhbnk7XG4gICAgcHJvdGVjdGVkIHRpbWVvdXQgOiBudW1iZXIgPSA1MDAwO1xuXG4gICAgcHJvdGVjdGVkIGF1dGhDb29raWVOYW1lID0gJ2dwb2F1dGgtYSc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50aW1lb3V0XG4gICAgICogQHBhcmFtIG9wdGlvbnMudG9rZW4gLSB0aGUgYmVhcmVyIHRva2VuIG9yIGEgZnVuY3Rpb24gdG8gcmV0cmlldmUgaXRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IHsgW2tleTpzdHJpbmddIDogYW55IH0pIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMuc2V0VGltZW91dChvcHRpb25zLnRpbWVvdXR8fDMwMDAwKTtcbiAgICAgICAgdGhpcy5zZXRBdXRoVG9rZW4ob3B0aW9ucy50b2tlbik7XG4gICAgICAgIHRoaXMuc2V0Q29va2llKG9wdGlvbnMuY29va2llKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KHRpbWVvdXQgOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnIC0gc3BlY2lmeSB0aGUgYmVhcmVyIHRva2VuIG9yIGEgZnVuY3Rpb24gdG8gcmV0cmlldmUgaXRcbiAgICAgKi9cbiAgICBzZXRBdXRoVG9rZW4oYXJnIDogc3RyaW5nfEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmKGFyZyAmJiB0eXBlb2YoYXJnKSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICB0aGlzLnRva2VuID0gZnVuY3Rpb24oKSB7IHJldHVybiBhcmc7IH07XG4gICAgICAgIGVsc2UgaWYoYXJnICYmIHR5cGVvZihhcmcpID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgdGhpcy50b2tlbiA9IGFyZztcbiAgICAgICAgLy9lbHNlIGRvIG5vdGhpbmdcbiAgICB9XG5cbiAgICBnZXRUb2tlbigpIDogc3RyaW5nIHtcbiAgICAgICAgaWYodGhpcy50b2tlbiAmJiB0eXBlb2YodGhpcy50b2tlbikgPT09ICdmdW5jdGlvbicpIHJldHVybiB0aGlzLnRva2VuKCk7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMudG9rZW4gfHwgbnVsbDtcbiAgICB9XG5cbiAgICBzZXRDb29raWUoY29va2llKSB7XG4gICAgICAgIHRoaXMuY29va2llID0gY29va2llO1xuICAgIH1cblxuICAgIGdldENvb2tpZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29va2llO1xuICAgIH1cblxuICAgIGNyZWF0ZVJlcXVlc3RPcHRzKFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIG9wdGlvbnMgOiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9XG4gICAgKSA6IGFueSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgaW1wbGVtZW50ICdjcmVhdGVSZXF1ZXN0T3B0cycgaW4gYSBzdWItY2xhc3NcIik7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBvcHRzIDogYW55XG4gICAgKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJNdXN0IG92ZXJyZGllICdleGVjdXRlJyBpbiBhIHN1Yi1jbGFzc1wiKSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdQSHR0cENsaWVudDtcbiJdfQ==