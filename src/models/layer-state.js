



(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['BaseModel','ItemProperties'],
        function(BaseModel, ItemProperties) {
            return (root.LayerStateModel = factory(BaseModel, ItemProperties));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.LayerStateModel = factory(
                require('./item'),
                require('../shared/types'),
                require('./properties')
            )
        );
    } else {
        GeoPlatform.LayerStateModel = factory(
            GeoPlatform.BaseModel,
            GeoPlatform.ItemProperties
        );
    }
}(this||window, function(BaseModel, ItemProperties) {


    const Properties = {
        LAYER_ID    : { key: "layer_id"              },
        LAYER       : { key: "layer",   type: 'item' },
        OPACITY     : { key: "opacity"               },
        VISIBILITY  : { key: "visibility"            }
    };


    class LayerStateModel extends BaseModel {

        constructor(data) {
            super();

            if(data) {
                for(let p in Properties) {
                    let property = Properties[p];
                    let key = property.key;
                    let value = data[key];
                    if(value !== null && value !== undefined) {
                        this.set(property, value);

                        if(property === Properties.LAYER) {
                            let layer = this.getLayer();
                            this.set(Properties.LAYER_ID, layer.getId());
                        }
                    }
                }
            }
        }

        //-----------------------------------------------------------

        opacity(value) { this.setOpacity(value); return this; }
        getOpacity() { return this.get(Properties.OPACITY); }
        setOpacity(value) { this.set(Properties.OPACITY, value); }

        //-----------------------------------------------------------

        visibility(value) { this.setVisibility(value); return this; }
        getVisibility() { return this.get(Properties.VISIBILITY); }
        setVisibility(value) { this.set(Properties.VISIBILITY, value); }

        //-----------------------------------------------------------

        layer(value) { this.setLayer(value); return this; }
        getLayer() { return this.get(Properties.LAYER); }
        setLayer(value) {
            if(!value) {
                this.set(Properties.LAYER, null);
                this.set(Properties.LAYER_ID, null);

            } else {
                value = this.toItem(value);
                this.set(Properties.LAYER, value);
                this.set(Properties.LAYER_ID, value.getId());
            }
        }

        getLayerId() { return this.get(Properties.LAYER_ID); }


        //-----------------------------------------------------------

        isValid() {
            return this.getLayer() && this.getLayerId();
        }

        //-----------------------------------------------------------


        toJson() {
            let result = {};
            for(let p in Properties) {
                let property = Properties[p];
                let value = this.get(property);
                this.propertyToJson(property, value, result);
            }
            return result;
        }


    }

    return LayerStateModel;

}));
