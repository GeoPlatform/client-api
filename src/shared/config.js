
(function (root, factory) {
    if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.GeoPlatform = factory()
        );
    } else if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('GeoPlatform', function() {
            return (root.GeoPlatform = factory());
        });
    } else {
        root.GeoPlatform = factory();
    }
}(this||window, function() {

    return {
        //ualUrl: '...',
        //appId: '...',
        configure: function(options) {
            Object.assign(this, options);
        }
    };

}));
