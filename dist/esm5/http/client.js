var GPHttpClient = /** @class */ (function () {
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    function GPHttpClient(options) {
        this.timeout = 5000;
        this.authCookieName = 'gpoauth-a';
        options = options || {};
        this.setTimeout(options.timeout || 30000);
        this.setAuthToken(options.token);
        this.setCookie(options.cookie);
    }
    GPHttpClient.prototype.setTimeout = function (timeout) {
        this.timeout = timeout;
    };
    /**
     * @param arg - specify the bearer token or a function to retrieve it
     */
    GPHttpClient.prototype.setAuthToken = function (arg) {
        if (arg && typeof (arg) === 'string')
            this.token = function () { return arg; };
        else if (arg && typeof (arg) === 'function')
            this.token = arg;
        //else do nothing
    };
    GPHttpClient.prototype.getToken = function () {
        if (this.token && typeof (this.token) === 'function')
            return this.token();
        else
            return this.token || null;
    };
    GPHttpClient.prototype.setCookie = function (cookie) {
        this.cookie = cookie;
    };
    GPHttpClient.prototype.getCookie = function () {
        return this.cookie;
    };
    GPHttpClient.prototype.createRequestOpts = function (
    // @ts-ignore
    options) {
        throw new Error("Must implement 'createRequestOpts' in a sub-class");
    };
    GPHttpClient.prototype.execute = function (
    // @ts-ignore
    opts) {
        return Promise.reject(new Error("Must overrdie 'execute' in a sub-class"));
    };
    return GPHttpClient;
}());
export default GPHttpClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbImh0dHAvY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0lBUUk7OztPQUdHO0lBQ0gsc0JBQVksT0FBaUM7UUFSbkMsWUFBTyxHQUFZLElBQUksQ0FBQztRQUV4QixtQkFBYyxHQUFHLFdBQVcsQ0FBQztRQU9uQyxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELGlDQUFVLEdBQVYsVUFBVyxPQUFnQjtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQ0FBWSxHQUFaLFVBQWEsR0FBcUI7UUFDOUIsSUFBRyxHQUFHLElBQUksT0FBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFhLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZDLElBQUcsR0FBRyxJQUFJLE9BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxVQUFVO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLGlCQUFpQjtJQUNyQixDQUFDO0lBRUQsK0JBQVEsR0FBUjtRQUNJLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVU7WUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7WUFDbkUsT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQsZ0NBQVMsR0FBVCxVQUFVLE1BQU07UUFDWixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsd0NBQWlCLEdBQWpCO0lBQ0ksYUFBYTtJQUNiLE9BQWdDO1FBRWhDLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsOEJBQU8sR0FBUDtJQUNJLGFBQWE7SUFDYixJQUFVO1FBRVYsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQUFDLEFBN0RELElBNkRDO0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuY2xhc3MgR1BIdHRwQ2xpZW50IHtcblxuICAgIHByb3RlY3RlZCB0b2tlbiA6IGFueTtcbiAgICBwcm90ZWN0ZWQgY29va2llIDogYW55O1xuICAgIHByb3RlY3RlZCB0aW1lb3V0IDogbnVtYmVyID0gNTAwMDtcblxuICAgIHByb3RlY3RlZCBhdXRoQ29va2llTmFtZSA9ICdncG9hdXRoLWEnO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvbnMudGltZW91dFxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRva2VuIC0gdGhlIGJlYXJlciB0b2tlbiBvciBhIGZ1bmN0aW9uIHRvIHJldHJpZXZlIGl0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA/OiB7IFtrZXk6c3RyaW5nXSA6IGFueSB9KSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLnNldFRpbWVvdXQob3B0aW9ucy50aW1lb3V0fHwzMDAwMCk7XG4gICAgICAgIHRoaXMuc2V0QXV0aFRva2VuKG9wdGlvbnMudG9rZW4pO1xuICAgICAgICB0aGlzLnNldENvb2tpZShvcHRpb25zLmNvb2tpZSk7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dCh0aW1lb3V0IDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZyAtIHNwZWNpZnkgdGhlIGJlYXJlciB0b2tlbiBvciBhIGZ1bmN0aW9uIHRvIHJldHJpZXZlIGl0XG4gICAgICovXG4gICAgc2V0QXV0aFRva2VuKGFyZyA6IHN0cmluZ3xGdW5jdGlvbikge1xuICAgICAgICBpZihhcmcgJiYgdHlwZW9mKGFyZykgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgdGhpcy50b2tlbiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnOyB9O1xuICAgICAgICBlbHNlIGlmKGFyZyAmJiB0eXBlb2YoYXJnKSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHRoaXMudG9rZW4gPSBhcmc7XG4gICAgICAgIC8vZWxzZSBkbyBub3RoaW5nXG4gICAgfVxuXG4gICAgZ2V0VG9rZW4oKSA6IHN0cmluZyB7XG4gICAgICAgIGlmKHRoaXMudG9rZW4gJiYgdHlwZW9mKHRoaXMudG9rZW4pID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdGhpcy50b2tlbigpO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLnRva2VuIHx8IG51bGw7XG4gICAgfVxuXG4gICAgc2V0Q29va2llKGNvb2tpZSkge1xuICAgICAgICB0aGlzLmNvb2tpZSA9IGNvb2tpZTtcbiAgICB9XG5cbiAgICBnZXRDb29raWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvb2tpZTtcbiAgICB9XG5cbiAgICBjcmVhdGVSZXF1ZXN0T3B0cyhcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBvcHRpb25zIDogeyBba2V5OnN0cmluZ10gOiBhbnkgfVxuICAgICkgOiBhbnkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IGltcGxlbWVudCAnY3JlYXRlUmVxdWVzdE9wdHMnIGluIGEgc3ViLWNsYXNzXCIpO1xuICAgIH1cblxuICAgIGV4ZWN1dGUoXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgb3B0cyA6IGFueVxuICAgICkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTXVzdCBvdmVycmRpZSAnZXhlY3V0ZScgaW4gYSBzdWItY2xhc3NcIikpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHUEh0dHBDbGllbnQ7XG4iXX0=