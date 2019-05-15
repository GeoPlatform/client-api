/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GPError extends Error {
    /**
     * @param {?} message
     */
    constructor(message) {
        super(message);
        this.status = 500;
        this.statusCode = 500;
        this.error = null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setError(value) { this.error = value; }
    /**
     * @param {?} value
     * @return {?}
     */
    setStatus(value) { this.status = this.statusCode = value; }
}
if (false) {
    /** @type {?} */
    GPError.prototype.error;
    /** @type {?} */
    GPError.prototype.status;
    /** @type {?} */
    GPError.prototype.statusCode;
}
export default GPError;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL2Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxhQUFjLFNBQVEsS0FBSzs7OztJQUl2QixZQUFZLE9BQWdCO1FBQ3hCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztzQkFISyxHQUFHOzBCQUNFLEdBQUc7UUFHNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDckI7Ozs7O0lBQ00sUUFBUSxDQUFDLEtBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7Ozs7SUFDNUMsU0FBUyxDQUFDLEtBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0NBQzFFOzs7Ozs7Ozs7QUFFRCxlQUFlLE9BQU8sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuY2xhc3MgR1BFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBwdWJsaWMgZXJyb3IgOiBzdHJpbmd8bnVsbDtcbiAgICBwdWJsaWMgc3RhdHVzOiBudW1iZXIgPSA1MDA7XG4gICAgcHVibGljIHN0YXR1c0NvZGUgOiBudW1iZXIgPSA1MDA7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSA6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5lcnJvciA9IG51bGw7XG4gICAgfVxuICAgIHB1YmxpYyBzZXRFcnJvcih2YWx1ZTpzdHJpbmcpIHsgdGhpcy5lcnJvciA9IHZhbHVlOyB9XG4gICAgcHVibGljIHNldFN0YXR1cyh2YWx1ZTpudW1iZXIpIHsgdGhpcy5zdGF0dXMgPSB0aGlzLnN0YXR1c0NvZGUgPSB2YWx1ZTsgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHUEVycm9yO1xuIl19