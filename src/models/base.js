



(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['ItemProperties'], function(ItemProperties) {
            return (root.BaseModel = factory(ItemProperties));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.BaseModel = factory(
                require('./properties')
            )
        );
    } else {
        GeoPlatform.BaseModel = factory(GeoPlatform.ItemProperties);
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
    class BaseModel {

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

        /**
         * @param {ItemProperty} property - property to be written to output JSON object
         * @param {any} value - value associated with the property
         * @param {Object} parentJson - parent object to write the property's value to
         */
        propertyToJson(property, value, parentJson) {

            if(value !== null && value !== undefined) {

                let isItem = 'item' === property.type;
                let isMulti = property.multi;
                let result = null;

                if(isMulti && isItem) {
                    result = value.map( v => v.toJson() );
                } else if(isMulti) {
                    result = value.slice(0);
                } else if(isItem) {
                    result = value.toJson();
                } else {
                    result = value;
                }

                parentJson[property.key] = result;
            }

        }
    }


    return BaseModel;

}));
