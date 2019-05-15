/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function apply() {
    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) {
                // .length of function is 2
                if (target == null) { // TypeError if undefined or null
                    // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }
                if (varArgs) { }
                /** @type {?} */
                var to = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    /** @type {?} */
                    var nextSource = arguments[index];
                    if (nextSource != null) { // Skip over if undefined or null
                        // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }
}
/**
 * @return {?}
 */
export default function () {
    apply();
}
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWZpbGxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbInNoYXJlZC9wb2x5ZmlsbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBO0lBQ0ksSUFBSSxPQUFPLE1BQU0sQ0FBQyxNQUFNLElBQUksVUFBVSxFQUFFOztRQUV0QyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUU7WUFDdEMsS0FBSyxFQUFFLGdCQUFnQixNQUFZLEVBQUUsT0FBZTs7Z0JBRWxELElBQUksTUFBTSxJQUFJLElBQUksRUFBRSxFQUFFLGlDQUFpQzs7b0JBQ3JELE1BQU0sSUFBSSxTQUFTLENBQUMsNENBQTRDLENBQUMsQ0FBQztpQkFDbkU7Z0JBRUQsSUFBRyxPQUFPLEVBQUUsR0FBRzs7Z0JBQ2YsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUV4QixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTs7b0JBQ3JELElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFbEMsSUFBSSxVQUFVLElBQUksSUFBSSxFQUFFLEVBQUUsaUNBQWlDOzt3QkFDekQsS0FBSyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUU7OzRCQUU5QixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUU7Z0NBQzdELEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7NkJBQ25DO3lCQUNGO3FCQUNGO2lCQUNGO2dCQUNELE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFDRCxRQUFRLEVBQUUsSUFBSTtZQUNkLFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztLQUNKO0NBQ0o7Ozs7QUFHRCxNQUFNLENBQUMsT0FBTztJQUNWLEtBQUssRUFBRSxDQUFDO0NBQ1g7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5mdW5jdGlvbiBhcHBseSgpIHtcbiAgICBpZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gTXVzdCBiZSB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdCwgXCJhc3NpZ25cIiwge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYXNzaWduKHRhcmdldCA6IGFueSwgdmFyQXJncyA6IGFueVtdKSB7IC8vIC5sZW5ndGggb2YgZnVuY3Rpb24gaXMgMlxuXG4gICAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKSB7IC8vIFR5cGVFcnJvciBpZiB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYodmFyQXJncykgeyB9XG4gICAgICAgICAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG5cbiAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuXG4gICAgICAgICAgICBpZiAobmV4dFNvdXJjZSAhPSBudWxsKSB7IC8vIFNraXAgb3ZlciBpZiB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgICAgICAgICBmb3IgKHZhciBuZXh0S2V5IGluIG5leHRTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAvLyBBdm9pZCBidWdzIHdoZW4gaGFzT3duUHJvcGVydHkgaXMgc2hhZG93ZWRcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5leHRTb3VyY2UsIG5leHRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0bztcbiAgICAgICAgfSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICAgIGFwcGx5KCk7XG59O1xuIl19