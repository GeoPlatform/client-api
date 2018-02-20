



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
        addObject(value, arr) {
            if(!value || !value.id) return;
            arr = arr || [];
            arr.push(value);
            return arr;
        }
        removeObject(value, arr) {
            if(!value || !value.id) return;
            arr = arr || [];
            let idx = -1;
            arr.each( (p,i) => {
                if(p.id === value.id)
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
            if(data) {
                for(let prop in data) {
                    if(data.hasOwnProperty(prop)) {
                        this[prop] = data[prop];
                    }
                }
            }
        }

        getId() { return this.id; }
        getType() { return this.type; }
        getCreated() { return this._created; }
        getModified() { return this.modified; }

        //-----------------------------------------------------------

        identifiers(value) { this.setIdentifiers(value); return this; }
        getIdentifiers() { return this.identifiers; }
        setIdentifiers(value) {
            if(value && typeof(value.push) === 'undefined')
                value = [value];
            this.identifiers = value;
        }
        addIdentifier(value) {
            if(!value) return;
            this.identifiers = this.addValue(value, this.identifiers);
        }
        removeIdentifier(value) {
            if(!value) return;
            this.identifiers = this.removeValue(value, this.identifiers);
        }

        //-----------------------------------------------------------

        createdBy(value) { this.setCreatedBy(value); return this; }
        getCreatedBy() { return this.createdBy; }
        setCreatedBy(value) { this.createdBy = value; }

        //-----------------------------------------------------------

        label(value) { this.setLabel(value); return this; }
        getLabel() { return this.label; }
        setLabel(value) { this.label = value; }

        //-----------------------------------------------------------

        description(value) { this.setDescription(value); return this; }
        getDescription() { return this.description; }
        setDescription(value) { this.description = value; }

        //-----------------------------------------------------------

        keywords(value) { this.setKeywords(value); return this; }
        getKeywords() { return this.keywords; }
        setKeywords(value) {
            if(value && typeof(value.push) === 'undefined')
                value = [value];
            this.keywords = value;
        }

        //-----------------------------------------------------------

        status(value) { this.setStatus(value); return this; }
        getStatus() { return this.status; }
        setStatus(value) { this.status = value; }

        //-----------------------------------------------------------

        visibility(value) { this.setVisibility(value); return this; }
        getVisibility() { return this.visibility; }
        setVisibility(value) { this.visibility = value; }

        //-----------------------------------------------------------

        themes(value) { this.setThemes(value); return this; }
        getThemes() { return this.themes; }
        setThemes(value) {
            if(value && typeof(value.push) === 'undefined')
                value = [value];
            this.themes = value;
        }
        addTheme(value) {
            if(!value || !value.id) return;
            this.themes = this.addObject(value, this.themes);
        }
        removeTheme(value) {
            if(!value || !value.id) return;
            this.themes = this.removeObject(value, this.themes);
        }

        //-----------------------------------------------------------

        publishers(value) { this.setPublishers(value); return this; }
        getPublishers() { return this.publishers; }
        setPublishers(value) {
            if(value && typeof(value.push) === 'undefined')
                value = [value];
            this.publishers = value;
        }
        addPublisher(value) {
            if(!value || !value.id) return;
            this.publishers = this.addObject(value, this.publishers);
        }
        removePublisher(value) {
            if(!value || !value.id) return;
            this.publishers = this.removeObject(value, this.publishers);
        }

        //-----------------------------------------------------------

        contacts(value) { this.setContacts(value); return this; }
        getContacts() { return this.contacts; }
        setContacts(value) {
            if(value && typeof(value.push) === 'undefined')
                value = [value];
            this.contacts = value;
        }
        addContact(value) {
            if(!value || !value.id) return;
            this.contacts = this.addObject(value, this.contacts);
        }
        removeContact(value) {
            if(!value || !value.id) return;
            this.contacts = this.removeObject(value, this.contacts);
        }

        //-----------------------------------------------------------

        resourceTypes(value) { this.setResourceTypes(value); return this; }
        getResourceTypes() { return this.resourceTypes; }
        setResourceTypes(value) {
            if(value && typeof(value.push) === 'undefined')
                value = [value];
            this.resourceTypes = value;
        }
        addResourceType(value) {
            if(!value) return;
            this.resourceTypes = this.addValue(value, this.resourceTypes);
        }
        removeResourceType(value) {
            if(!value) return;
            this.resourceTypes = this.removeValue(value, this.resourceTypes);
        }

        //-----------------------------------------------------------

        classifiers(value) { this.setClassifiers(value); return this; }
        getClassifiers() { return this.classifiers; }
        setClassifiers(value) {
            if(!value || typeof(value) !== 'object') {
                this.classifiers = {};
            } else {
                this.classifiers = value;
            }
        }

        //-----------------------------------------------------------



        //-----------------------------------------------------------


        toJson() {
            let result = {};
            for(let prop in this) {
                if(this.hasOwnProperty(prop) && !!this[prop] &&
                    typeof(this[prop] !== 'function')) {
                    if(typeof(this[prop].toJson) !== 'undefined')
                        result[prop] = this[prop].toJson();
                    else result[prop] = this[prop];
                }
            }
            return result;
        }

    }

    return ItemModel;

}));
