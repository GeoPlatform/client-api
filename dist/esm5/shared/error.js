/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
var GPError = /** @class */ (function (_super) {
    tslib_1.__extends(GPError, _super);
    function GPError(message) {
        var _this = _super.call(this, message) || this;
        _this.status = 500;
        _this.statusCode = 500;
        _this.error = null;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    GPError.prototype.setError = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this.error = value; };
    /**
     * @param {?} value
     * @return {?}
     */
    GPError.prototype.setStatus = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this.status = this.statusCode = value; };
    return GPError;
}(Error));
if (false) {
    /** @type {?} */
    GPError.prototype.error;
    /** @type {?} */
    GPError.prototype.status;
    /** @type {?} */
    GPError.prototype.statusCode;
}
export default GPError;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL2Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsSUFBQTtJQUFzQixtQ0FBSztJQUl2QixpQkFBWSxPQUFnQjtRQUE1QixZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUVqQjt1QkFMdUIsR0FBRzsyQkFDRSxHQUFHO1FBRzVCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDOztLQUNyQjs7Ozs7SUFDTSwwQkFBUTs7OztjQUFDLEtBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7Ozs7SUFDNUMsMkJBQVM7Ozs7Y0FBQyxLQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztrQkFWM0U7RUFDc0IsS0FBSyxFQVUxQixDQUFBOzs7Ozs7Ozs7QUFFRCxlQUFlLE9BQU8sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuY2xhc3MgR1BFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBwdWJsaWMgZXJyb3IgOiBzdHJpbmd8bnVsbDtcbiAgICBwdWJsaWMgc3RhdHVzOiBudW1iZXIgPSA1MDA7XG4gICAgcHVibGljIHN0YXR1c0NvZGUgOiBudW1iZXIgPSA1MDA7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSA6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5lcnJvciA9IG51bGw7XG4gICAgfVxuICAgIHB1YmxpYyBzZXRFcnJvcih2YWx1ZTpzdHJpbmcpIHsgdGhpcy5lcnJvciA9IHZhbHVlOyB9XG4gICAgcHVibGljIHNldFN0YXR1cyh2YWx1ZTpudW1iZXIpIHsgdGhpcy5zdGF0dXMgPSB0aGlzLnN0YXR1c0NvZGUgPSB2YWx1ZTsgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHUEVycm9yO1xuIl19