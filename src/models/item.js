



(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define([], function() {
            return (root.ItemModel = factory());
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.ItemModel = factory()
        );
    } else {
        GeoPlatform.ItemModel = factory();
    }
}(this||window, function() {


    class Base {
        constructor() {
            this._data = {};
        }

        set(property, value) {
            this._data[property] = value;
        }

        get(property) {
            return this._data[property];
        }

        addObject(value, arr) {
            if(!value) return;
            arr = arr || [];
            arr.push(value);
            return arr;
        }
        removeObject(value, arr) {
            if(!value || (!value.id && !value.uri)) return;
            let k = value.id ? 'id' : 'uri';
            arr = arr || [];
            let idx = -1;
            arr.each( (p,i) => {
                if(p[k] === value[k])
                    idx = i;
            });
            if(idx>=0) {
                arr.splice(idx, 1);
            }
            return arr;
        }

        addValue(value, arr) {
            if(!value) return;
            arr = arr || [];
            arr.push(value);
            return arr;
        }
        removeValue(value, arr) {
            if(!value) return;
            arr = arr || [];
            let idx = arr.indexOf(value);
            if(idx>=0) {
                arr.splice(idx, 1);
            }
            return arr;
        }
    }



    class ItemModel extends Base {

        constructor(data) {
            super();
            if(data) {
                for(let prop in data) {
                    if(data.hasOwnProperty(prop)) {
                        let value = data[prop];
                        if(!!value){
                            if(typeof(value.push) !== 'undefined')
                                this.set(prop, value.slice(0));
                            else
                                this.set(prop, value);
                        }
                    }
                }
            }

            this._data.keywords = this._data.keywords || [];
            this._data.themes = this._data.themes || [];
            this._data.contacts = this._data.contacts || [];
            this._data.publishers = this._data.publishers || [];
            this._data.identifiers = this._data.identifiers || [];
            this._data.resourceTypes = this._data.resourceTypes || [];
        }

        getId() { return this.get('id'); }
        getType() { return this.get('type'); }
        getCreated() { return this.get('_created'); }
        getModified() { return this.get('modified'); }

        //-----------------------------------------------------------

        identifiers(value) { this.setIdentifiers(value); return this; }
        getIdentifiers() { return this.get('identifiers'); }
        setIdentifiers(value) {
            if(!value) value = [];
            else if(typeof(value.push) === 'undefined')
                value = [value];
            this.set('identifiers', value);
        }
        addIdentifier(value) {
            if(!value) return;
            value = this.addValue(value, this.get('identifiers'));
            this.set('identifiers', value);
        }
        removeIdentifier(value) {
            if(!value) return;
            value = this.removeValue(value, this.get('identifiers'));
            this.set('identifiers', value);
        }

        //-----------------------------------------------------------

        createdBy(value) { this.setCreatedBy(value); return this; }
        getCreatedBy() { return this.get('createdBy'); }
        setCreatedBy(value) { this.set('createdBy', value); }

        //-----------------------------------------------------------

        label(value) { this.setLabel(value); return this; }
        getLabel() { return this.get('label'); }
        setLabel(value) { this.set('label', value); }

        //-----------------------------------------------------------

        description(value) { this.setDescription(value); return this; }
        getDescription() { return this.get('description'); }
        setDescription(value) { this.set('description', value); }

        //-----------------------------------------------------------

        keywords(value) { this.setKeywords(value); return this; }
        getKeywords() { return this.get('keywords'); }
        setKeywords(value) {
            if(!value) value = [];
            else if(typeof(value.push) === 'undefined')
                value = [value];
            this.set('keywords', value);
        }

        //-----------------------------------------------------------

        landingPage(value) { this.setLandingPage(value); return this; }
        getLandingPage() { return this.get('landingPage'); }
        setLandingPage(value) { this.set('landingPage', value); }

        //-----------------------------------------------------------

        status(value) { this.setStatus(value); return this; }
        getStatus() { return this.get('status'); }
        setStatus(value) { this.set('status', value); }

        //-----------------------------------------------------------

        visibility(value) { this.setVisibility(value); return this; }
        getVisibility() { return this.get('visibility'); }
        setVisibility(value) { this.set('visibility', value===true); }

        //-----------------------------------------------------------

        themes(value) { this.setThemes(value); return this; }
        getThemes() { return this.get('themes'); }
        setThemes(value) {
            if(!value) value = [];
            else if(typeof(value.push) === 'undefined')
                value = [value];
            this.set('themes', value);
        }
        addTheme(value) {
            value = this.addObject(value, this.get('themes'));
            this.set('themes', value);
        }
        removeTheme(value) {
            value = this.removeObject(value, this.get('themes'));
            this.set('themes', value);
        }

        //-----------------------------------------------------------

        publishers(value) { this.setPublishers(value); return this; }
        getPublishers() { return this.get('publishers'); }
        setPublishers(value) {
            if(!value) value = [];
            else if(typeof(value.push) === 'undefined')
                value = [value];
            this.set('publishers', value);
        }
        addPublisher(value) {
            value = this.addObject(value, this.set('publishers'));
            this.set('publishers', value);
        }
        removePublisher(value) {
            value = this.removeObject(value, this.get('publishers'));
            this.set('publishers', value);
        }

        //-----------------------------------------------------------

        contacts(value) { this.setContacts(value); return this; }
        getContacts() { return this.get('contacts'); }
        setContacts(value) {
            if(!value) value = [];
            else if(typeof(value.push) === 'undefined')
                value = [value];
            this.set('contacts', value);
        }
        addContact(value) {
            value = this.addObject(value, this.get('contacts'));
            this.set('contacts', value);
        }
        removeContact(value) {
            value = this.removeObject(value, this.set('contacts'));
            this.set('contacts', value);
        }

        //-----------------------------------------------------------

        resourceTypes(value) { this.setResourceTypes(value); return this; }
        getResourceTypes() { return this.get('resourceTypes'); }
        setResourceTypes(value) {
            if(!value) value = [];
            else if(typeof(value.push) === 'undefined')
                value = [value];
            this.set('resourceTypes', value);
        }
        addResourceType(value) {
            if(!value) return;
            value = this.addValue(value, this.set('resourceTypes'));
            this.set('resourceTypes', value);
        }
        removeResourceType(value) {
            if(!value) return;
            value = this.removeValue(value, this.get('resourceTypes'));
            this.set('resourceTypes', value);
        }

        //-----------------------------------------------------------

        classifiers(value) { this.setClassifiers(value); return this; }
        getClassifiers() { return this.get('classifiers'); }
        setClassifiers(value) {
            if(!value || typeof(value) !== 'object') {
                this.set('classifiers', {});
            } else {
                this.set('classifiers', value);
            }
        }

        //-----------------------------------------------------------



        //-----------------------------------------------------------


        toJson() {
            let result = {};
            for(let prop in this._data) {
                if(this.hasOwnProperty(prop) && !!this._data[prop] &&
                    typeof(this._data[prop] !== 'function')) {
                    if(typeof(this._data[prop].toJson) !== 'undefined')
                        result[prop] = this._data[prop].toJson();
                    else result[prop] = this._data[prop];
                }
            }
            return result;
        }

    }

    return ItemModel;

}));
