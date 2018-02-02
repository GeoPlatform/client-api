
(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["Query"], function(Query) {
            return (root.QueryFactory = factory(Query));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.QueryFactory = factory(require('Query'))
        );
    } else {
        GeoPlatform.QueryFactory = factory(GeoPlatform.Query);
    }
}(this||window, function(Query) {

    return function() {
        return new Query();
    };

}));
