



(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['ItemProperties'], function(ItemProperties) {
            return (root.ItemModel = factory(ItemProperties));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.ItemModel = factory(
                require('./properties')
            )
        );
    } else {
        GeoPlatform.ItemModel = factory(GeoPlatform.ItemProperties);
    }
}(this||window, function(ItemProperties) {

    function mapArray (arr, fn) {
        let len = arr.length, res = [];
        for(let i=0; i<len; ++i) {
            res[i] = fn(arr[i]);
        }
        return res;
    }


    /**
     *
     */
    class Base {

        constructor() {
            this._data = {};
        }

        set(property, value) {

            // console.log(' ');
            // console.log('-------------------');
            // console.log(`Item.set() - ${property.key} = ${typeof(value)}` );
            // console.log(`Item.set() - ${property.type} / ${property.multi}`);

            if(value === null || value === undefined)
                delete this._data[property.key];
            else {
                let newValue = value;
                let isItem = 'item' === property.type;
                if(property.multi) {
                    if(typeof(value.push) === 'undefined') {
                        // console.log('Item.set() - ' + key + ' has many but is singular: ' + typeof(value.push));
                        newValue = isItem ? [ this.toItem(value) ] : [ value ];
                    } else {
                        newValue = mapArray(value, v => {
                            return isItem ? this.toItem(v) : v
                        });
                    }

                } else if(isItem) {
                    newValue = this.toItem(value);
                } else {
                    newValue = JSON.parse(JSON.stringify(value));
                }

                this._data[property.key] = newValue;
            }
            // console.log('---------------------');
            // console.log(' ');

        }

        get(property) {
            return this._data[property.key];
        }

        addTo(property, value) {
            if(value === null || value === undefined) return;
            if(property.multi) {
                if(!this._data[property.key])
                    this._data[property.key] = [];

                if(typeof(value.push) !== 'undefined') {
                    if('item' === property.type) {
                        value = mapArray(value, v => this.toItem(v) );
                    } else {
                        value = value.slice(0);
                    }
                    this._data[property.key] = this._data[property.key].concat(value);

                } else {
                    if('item' === property.type) {
                        value = this.toItem(value);
                    }
                    this._data[property.key].push(value);
                }
            }
        }

        removeFrom(property, value) {
            if(value === null || value === undefined) return;
            if(property.multi) {

                let isObj = 'object' === property.type;
                let current = this.get(property);
                if(!current) return;

                if(typeof(value.push) !== 'undefined') {

                    // this._data[property.key] = current.concat(value);
                    for(let i=0; i<value.length; ++i) {
                        if(isObj) {
                            current = this.removeObject(value, current);
                        } else {
                            current = this.removeValue(value, current);
                        }
                    }
                    this._data[property.key] = current;

                } else {

                    if(isObj) {
                        current = this.removeObject(value, current);
                    } else {
                        current = this.removeValue(value, current);
                    }
                    this._data[property.key] = current;
                }
            }
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

        default(property, value) {
            let current = this.get(property);
            if(current === null || current === undefined)
                this.set(property, value);
        }

        toItem(obj) {
            // console.log(" ");
            if(!obj) {
                // console.log(`Item[${this._data.type}].toItem() - Value is null`);
                return null;
            }

            let itemFactory = this.getFactory();
            if(itemFactory) {
                // console.log(`Item[${this._data.type}].toItem() - INPUT: ${JSON.stringify(obj)}`);
                let result = itemFactory(obj);
                // console.log(`Item[${this._data.type}].toItem() - ITEMIZED: ${JSON.stringify(result)}`);
                return result;
            } else {
                console.log(`WARN: Item[${this._data.type}].toItem() - No Factory!`);
                return JSON.parse(JSON.stringify(obj));
            }
        }

        getFactory() {
            if(typeof module === "object" && module.exports) {
                return require('./factory');
            } else if(GeoPlatform.ItemFactory) {
                return GeoPlatform.ItemFactory;
            }
            //TODO: the 'define' case
            // console.log("Factory unable to be resolved");
            return null;
        }
    }




    /**
     * Item
     * base class for GeoPlatform objects
     */
    class ItemModel extends Base {

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


        arrToJson(property, value) {
            if(!value ||
                typeof(value.push) === 'undefined' ||
                !value.length) return [];

            let isItem = 'item' === property.type;
            if(isItem) {
                return value.map(v=>{
                    if(typeof(v.toJson) !== 'undefined')
                        return v.toJson();
                    else
                        console.log("Invalid item in " + key + " : " + typeof(value));
                    return null;
                }).filter(v=>v!==null);

            } else {
                return value.slice(0);
            }
        }

        propertyToJson(property, value, parentJson) {
            let key = property.key;
            let isObj = 'object' === property.type;
            let isItem = 'item' === property.type;
            let isMulti = property.multi;
            if(value !== null && value !== undefined) {

                if(isMulti) {
                    parentJson[key] = this.arrToJson(property, value);
                } else if(isItem) {
                    if(typeof(v.toJson) !== 'undefined') {
                        parentJson[key] = value.toJson();
                    } else {
                        console.log("Invalid item in " + key + " : " + typeof(value));
                    }
                } else {
                    parentJson[key] = value;
                }
            }
        }


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
