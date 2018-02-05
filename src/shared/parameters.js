


(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define([], function() {
            return (root.QueryParameters = factory());
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.QueryParameters = factory()
        );
    } else {
        GeoPlatform.QueryParameters = factory();
    }
}(this||window, function() {

    const Parameters = {
        TYPES            : 'type',
        QUERY            : 'q',
        KEYWORDS         : 'keyword',
        CREATED_BY       : 'createdBy',
        CONTRIBUTED_BY   : 'contributedBy',
        CREATOR          : 'creator.id',
        SVC_TYPES        : 'serviceType.id',
        THEMES_ID        : 'theme.id',
        THEMES_LABEL     : 'theme.label',
        THEMES_URI       : 'theme.uri',
        PUBLISHERS       : 'publisher.id',
        PUBLISHERS_LABEL : 'publisher.label',
        PUBLISHERS_URI   : 'publisher.uri',
        SCHEMES_ID       : 'scheme.id',
        SCHEMES_LABEL    : 'scheme.label',
        SCHEMES_URI      : 'scheme.uri',
        VISIBILITY       : 'visibility',
        EXTENT           : 'extent',
        MODIFIED_BEFORE  : 'modified.max',
        MODIFIED_AFTER   : 'modified.min',
        BEGINS           : 'startDate.min',
        ENDS             : 'endDate.max',
        RESOURCE_TYPE    : 'resourceType'
    }

    return Parameters;

}));
