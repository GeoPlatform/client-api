



(function (root, factory) {
    if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.KGClassifiers = factory()
        );
    } else if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('KGClassifiers', function() {
            return (root.KGClassifiers = factory());
        });
    } else {
        GeoPlatform.KGClassifiers = factory();
    }
}(this||window, function() {

    const classifiers = {
        PURPOSE             : 'purposes',
        FUNCTION            : 'functions',
        TOPIC_PRIMARY       : 'primaryTopics',
        TOPIC_SECONDARY     : 'secondaryTopics',
        SUBJECT_PRIMARY     : 'primarySubjects',
        SUBJECT_SECONDARY   : 'secondarySubjects',
        COMMUNITY           : 'communities',
        AUDIENCE            : 'audiences',
        PLACE               : 'places',
        CATEGORY            : 'categories'
    };

    return classifiers;

}));
