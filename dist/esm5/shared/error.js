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
    GPError.prototype.setError = function (value) { this.error = value; };
    GPError.prototype.setStatus = function (value) { this.status = this.statusCode = value; };
    return GPError;
}(Error));
export default GPError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL2Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQUFzQixtQ0FBSztJQUl2QixpQkFBWSxPQUFnQjtRQUE1QixZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUVqQjtRQUxNLFlBQU0sR0FBVyxHQUFHLENBQUM7UUFDckIsZ0JBQVUsR0FBWSxHQUFHLENBQUM7UUFHN0IsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7O0lBQ3RCLENBQUM7SUFDTSwwQkFBUSxHQUFmLFVBQWdCLEtBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDOUMsMkJBQVMsR0FBaEIsVUFBaUIsS0FBWSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdFLGNBQUM7QUFBRCxDQUFDLEFBVkQsQ0FBc0IsS0FBSyxHQVUxQjtBQUVELGVBQWUsT0FBTyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5jbGFzcyBHUEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIHB1YmxpYyBlcnJvciA6IHN0cmluZ3xudWxsO1xuICAgIHB1YmxpYyBzdGF0dXM6IG51bWJlciA9IDUwMDtcbiAgICBwdWJsaWMgc3RhdHVzQ29kZSA6IG51bWJlciA9IDUwMDtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlIDogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmVycm9yID0gbnVsbDtcbiAgICB9XG4gICAgcHVibGljIHNldEVycm9yKHZhbHVlOnN0cmluZykgeyB0aGlzLmVycm9yID0gdmFsdWU7IH1cbiAgICBwdWJsaWMgc2V0U3RhdHVzKHZhbHVlOm51bWJlcikgeyB0aGlzLnN0YXR1cyA9IHRoaXMuc3RhdHVzQ29kZSA9IHZhbHVlOyB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdQRXJyb3I7XG4iXX0=