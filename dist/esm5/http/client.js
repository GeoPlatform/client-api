var GPHttpClient = /** @class */ (function () {
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    function GPHttpClient(options) {
        this.timeout = 5000;
        options = options || {};
        this.setTimeout(options.timeout || 30000);
        this.setAuthToken(options.token);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbImh0dHAvY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0lBS0k7OztPQUdHO0lBQ0gsc0JBQVksT0FBaUM7UUFObkMsWUFBTyxHQUFZLElBQUksQ0FBQztRQU85QixPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELGlDQUFVLEdBQVYsVUFBVyxPQUFnQjtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQ0FBWSxHQUFaLFVBQWEsR0FBcUI7UUFDOUIsSUFBRyxHQUFHLElBQUksT0FBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFhLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZDLElBQUcsR0FBRyxJQUFJLE9BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxVQUFVO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLGlCQUFpQjtJQUNyQixDQUFDO0lBRUQsK0JBQVEsR0FBUjtRQUNJLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVU7WUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7WUFDbkUsT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQsd0NBQWlCLEdBQWpCO0lBQ0ksYUFBYTtJQUNiLE9BQWdDO1FBRWhDLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsOEJBQU8sR0FBUDtJQUNJLGFBQWE7SUFDYixJQUFVO1FBRVYsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQUFDLEFBakRELElBaURDO0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuY2xhc3MgR1BIdHRwQ2xpZW50IHtcblxuICAgIHByb3RlY3RlZCB0b2tlbiA6IGFueTtcbiAgICBwcm90ZWN0ZWQgdGltZW91dCA6IG51bWJlciA9IDUwMDA7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50aW1lb3V0XG4gICAgICogQHBhcmFtIG9wdGlvbnMudG9rZW4gLSB0aGUgYmVhcmVyIHRva2VuIG9yIGEgZnVuY3Rpb24gdG8gcmV0cmlldmUgaXRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IHsgW2tleTpzdHJpbmddIDogYW55IH0pIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMuc2V0VGltZW91dChvcHRpb25zLnRpbWVvdXR8fDMwMDAwKTtcbiAgICAgICAgdGhpcy5zZXRBdXRoVG9rZW4ob3B0aW9ucy50b2tlbik7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dCh0aW1lb3V0IDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZyAtIHNwZWNpZnkgdGhlIGJlYXJlciB0b2tlbiBvciBhIGZ1bmN0aW9uIHRvIHJldHJpZXZlIGl0XG4gICAgICovXG4gICAgc2V0QXV0aFRva2VuKGFyZyA6IHN0cmluZ3xGdW5jdGlvbikge1xuICAgICAgICBpZihhcmcgJiYgdHlwZW9mKGFyZykgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgdGhpcy50b2tlbiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnOyB9O1xuICAgICAgICBlbHNlIGlmKGFyZyAmJiB0eXBlb2YoYXJnKSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHRoaXMudG9rZW4gPSBhcmc7XG4gICAgICAgIC8vZWxzZSBkbyBub3RoaW5nXG4gICAgfVxuXG4gICAgZ2V0VG9rZW4oKSA6IHN0cmluZyB7XG4gICAgICAgIGlmKHRoaXMudG9rZW4gJiYgdHlwZW9mKHRoaXMudG9rZW4pID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdGhpcy50b2tlbigpO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLnRva2VuIHx8IG51bGw7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVxdWVzdE9wdHMoXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgb3B0aW9ucyA6IHsgW2tleTpzdHJpbmddIDogYW55IH1cbiAgICApIDogYW55IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBpbXBsZW1lbnQgJ2NyZWF0ZVJlcXVlc3RPcHRzJyBpbiBhIHN1Yi1jbGFzc1wiKTtcbiAgICB9XG5cbiAgICBleGVjdXRlKFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIG9wdHMgOiBhbnlcbiAgICApIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk11c3Qgb3ZlcnJkaWUgJ2V4ZWN1dGUnIGluIGEgc3ViLWNsYXNzXCIpKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgR1BIdHRwQ2xpZW50O1xuIl19