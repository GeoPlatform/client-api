



(function (root, factory) {
    if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.ItemModel = factory(
                require('./base'),
                require('./properties')
            )
        );
    } else if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('ItemModel', ['./base', './properties'], function(BaseModel, ItemProperties) {
            return (root.ItemModel = factory(BaseModel, ItemProperties));
        });
    } else {
        GeoPlatform.ItemModel = factory(
            GeoPlatform.BaseModel,
            GeoPlatform.ItemProperties);
    }
}(this||window, function(BaseModel, ItemProperties) {



    /**
     * Item
     * base class for GeoPlatform objects
     */
    class ItemModel extends BaseModel {

        constructor(data) {
            super();

            if(data) {

                // console.log(' ');
                // console.log('-------------------------------');
                // console.log('Item() - initializing using ' + JSON.stringify(data));

                for(let p in ItemProperties) {
                    let property = ItemProperties[p];
                    let key = property.key;
                    let value = data[key];
                    if(value !== null && value !== undefined) {
                        this.set(property, value);
                    }
                }
                // console.log('-------------------------------');
                // console.log(' ');
            }

            this.default(ItemProperties.KEYWORDS, []);
            this.default(ItemProperties.IDENTIFIERS, []);
            this.default(ItemProperties.ALTERNATE_TITLES, []);
            this.default(ItemProperties.THEMES, []);
            this.default(ItemProperties.CONTACTS, []);
            this.default(ItemProperties.PUBLISHERS, []);
            this.default(ItemProperties.CONTRIBUTORS, []);
            this.default(ItemProperties.RESOURCE_TYPES, []);
        }

        getId() { return this.get(ItemProperties.ID); }
        getType() { return this.get(ItemProperties.TYPE); }
        getCreated() { return this.get(ItemProperties.CREATED); }
        getModified() { return this.get(ItemProperties.MODIFIED); }
        getLastModifiedBy() { return this.get(ItemProperties.LAST_MODIFIED_BY); }

        //-----------------------------------------------------------

        uri(value) {  this.setUri(value);  return this; }
        getUri() { return this.get(ItemProperties.URI); }
        setUri(value) { this.set(ItemProperties.URI, value); }

        //-----------------------------------------------------------

        identifiers(value) { this.setIdentifiers(value); return this; }
        getIdentifiers() { return this.get(ItemProperties.IDENTIFIERS); }
        setIdentifiers(value) { this.set(ItemProperties.IDENTIFIERS, value); }
        addIdentifier(value) { this.addTo(ItemProperties.IDENTIFIERS, value); }
        removeIdentifier(value) { this.removeFrom(ItemProperties.IDENTIFIERS, value); }

        //-----------------------------------------------------------

        alternateTitles(value) { this.setAlternateTitles(value); return this; }
        getAlternateTitles() { return this.get(ItemProperties.ALTERNATE_TITLES); }
        setAlternateTitles(value) { this.set(ItemProperties.ALTERNATE_TITLES, value); }
        addAlternateTitle(value) { this.addTo(ItemProperties.ALTERNATE_TITLES, value); }
        removeAlternateTitle(value) { this.removeFrom(ItemProperties.ALTERNATE_TITLES, value); }

        //-----------------------------------------------------------

        createdBy(value) { this.setCreatedBy(value); return this; }
        getCreatedBy() { return this.get(ItemProperties.CREATED_BY); }
        setCreatedBy(value) { this.set(ItemProperties.CREATED_BY, value); }

        //-----------------------------------------------------------

        label(value) { this.setLabel(value); return this; }
        getLabel() { return this.get(ItemProperties.LABEL); }
        setLabel(value) { this.set(ItemProperties.LABEL, value); }

        //-----------------------------------------------------------

        description(value) { this.setDescription(value); return this; }
        getDescription() { return this.get(ItemProperties.DESCRIPTION); }
        setDescription(value) { this.set(ItemProperties.DESCRIPTION, value); }

        //-----------------------------------------------------------

        keywords(value) { this.setKeywords(value); return this; }
        getKeywords() { return this.get(ItemProperties.KEYWORDS); }
        setKeywords(value) { this.set(ItemProperties.KEYWORDS, value); }

        //-----------------------------------------------------------

        landingPage(value) { this.setLandingPage(value); return this; }
        getLandingPage() { return this.get(ItemProperties.LANDING_PAGE); }
        setLandingPage(value) { this.set(ItemProperties.LANDING_PAGE, value); }

        //-----------------------------------------------------------

        status(value) { this.setStatus(value); return this; }
        getStatus() { return this.get(ItemProperties.STATUS); }
        setStatus(value) { this.set(ItemProperties.STATUS, value); }

        //-----------------------------------------------------------

        visibility(value) { this.setVisibility(value); return this; }
        getVisibility() { return this.get(ItemProperties.VISIBILITY); }
        setVisibility(value) { this.set(ItemProperties.VISIBILITY, value===true); }

        //-----------------------------------------------------------

        themes(value) { this.setThemes(value); return this; }
        getThemes() { return this.get(ItemProperties.THEMES); }
        setThemes(value) { this.set(ItemProperties.THEMES, value); }
        addTheme(value) { this.addTo(ItemProperties.THEMES, value); }
        removeTheme(value) { this.removeFrom(ItemProperties.THEMES, value); }

        //-----------------------------------------------------------

        publishers(value) { this.setPublishers(value); return this; }
        getPublishers() { return this.get(ItemProperties.PUBLISHERS); }
        setPublishers(value) { this.set(ItemProperties.PUBLISHERS, value); }
        addPublisher(value) { this.addTo(ItemProperties.PUBLISHERS, value); }
        removePublisher(value) { this.removeFrom(ItemProperties.PUBLISHERS, value); }

        //-----------------------------------------------------------

        contacts(value) { this.setContacts(value); return this; }
        getContacts() { return this.get(ItemProperties.CONTACTS); }
        setContacts(value) { this.set(ItemProperties.CONTACTS, value); }
        addContact(value) { this.addTo(ItemProperties.CONTACTS, value); }
        removeContact(value) { this.removeFrom(ItemProperties.CONTACTS, value); }

        //-----------------------------------------------------------

        contributors(value) { this.setContributors(value); return this; }
        getContributors() { return this.get(ItemProperties.CONTRIBUTORS); }
        setContributors(value) { this.set(ItemProperties.CONTRIBUTORS, value); }
        addContributor(value) { this.addTo(ItemProperties.CONTRIBUTORS, value); }
        removeContributor(value) { this.removeFrom(ItemProperties.CONTRIBUTORS, value); }

        //-----------------------------------------------------------

        resourceTypes(value) { this.setResourceTypes(value); return this; }
        getResourceTypes() { return this.get(ItemProperties.RESOURCE_TYPES); }
        setResourceTypes(value) { this.set(ItemProperties.RESOURCE_TYPES, value); }
        addResourceType(value) { this.addTo(ItemProperties.RESOURCE_TYPES, value); }
        removeResourceType(value) { this.removeFrom(ItemProperties.RESOURCE_TYPES, value); }

        //-----------------------------------------------------------

        distributions(value) { this.setDistributions(value); return this; }
        getDistributions() { return this.get(ItemProperties.DISTRIBUTIONS); }
        setDistributions(value) { this.set(ItemProperties.DISTRIBUTIONS, value); }
        addDistribution(value) { this.addTo(ItemProperties.DISTRIBUTIONS, value); }
        removeDistribution(value) { this.removeFrom(ItemProperties.DISTRIBUTIONS, value); }

        //-----------------------------------------------------------

        classifiers(value) { this.setClassifiers(value); return this; }
        getClassifiers() { return this.get(ItemProperties.CLASSIFIERS); }
        setClassifiers(value) {
            if(!value || typeof(value) !== 'object') {
                this.set(ItemProperties.CLASSIFIERS, {});
            } else {
                this.set(ItemProperties.CLASSIFIERS, value);
            }
        }

        //-----------------------------------------------------------

        /**
         * @return {boolean} true if the required fields are provided
         */
        isValid() {
            return this.getType() && this.getLabel();
        }

        //-----------------------------------------------------------


        toJson() {
            let result = {};
            for(let p in ItemProperties) {
                let property = ItemProperties[p];
                let value = this.get(property);
                this.propertyToJson(property, value, result);
            }
            return result;
        }

    }

    return ItemModel;

}));
