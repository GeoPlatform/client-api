



(function (root, factory) {
    if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.MapModel = factory(
                require('./item'),
                require('../shared/types'),
                require('./properties')
            )
        );
    } else if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('MapModel', ['./item','../shared/types', './properties'],
        function(ItemModel, ItemTypes, ItemProperties) {
            return (root.MapModel = factory(ItemModel, ItemTypes, ItemProperties));
        });
    } else {
        GeoPlatform.MapModel = factory(GeoPlatform.ItemModel,
            GeoPlatform.ItemTypes, GeoPlatform.ItemProperties);
    }
}(this||window, function(ItemModel, ItemTypes, ItemProperties) {


    const LayerStateProperties = {
        LAYER_ID    : { key: "layer_id"     },
        LAYER       : { key: "layer"        },
        OPACITY     : { key: "opacity"      },
        VISIBILITY  : { key: "visibility"   }
    };


    class MapModel extends ItemModel {

        constructor(data) {
            super(data);

            //manually re-set the overlays because each objectc
            // has a nested Item (layer) which needs to be item-ized
            // and the initializer used in the constructor isn't tied
            // to any specific instance's logic.
            let layers = this.getLayers();
            if(layers) {
                this.setLayers(layers);
            }

            this.set(ItemProperties.TYPE, ItemTypes.MAP);
            this.default(ItemProperties.MAP_LAYERS, []);
        }

        //-----------------------------------------------------------

        thumbnail(value) { this.setThumbnail(value); return this; }
        getThumbnail() { return this.get(ItemProperties.THUMBNAIL); }
        setThumbnail(value) { this.set(ItemProperties.THUMBNAIL, value); }

        //-----------------------------------------------------------

        baseLayer(value) { this.setBaseLayer(value); return this; }
        getBaseLayer() { return this.get(ItemProperties.BASE_LAYER); }
        setBaseLayer(value) { this.set(ItemProperties.BASE_LAYER, value); }

        //-----------------------------------------------------------

        layers(value) { this.setLayers(value); return this; }
        getLayers() { return this.get(ItemProperties.MAP_LAYERS); }
        setLayers(value) {
            let states = [];
            if(value) {
                if(typeof(value.push) === 'undefined') {
                    value = [value];
                }
                states = value.map( v => this.toLayerState(v) );
            }
            this.set(ItemProperties.MAP_LAYERS, states);
        }
        addLayer(value) {
            if(!value) return;
            let state = this.toLayerState(value);
            this.addTo(ItemProperties.MAP_LAYERS, state);
        }
        removeLayer(value) {
            if(!value) return;
            //get id of layer to be removed
            let layerId = value.id;
            if(!layerId && value.layer) {
                layerId = value.layer.id;
            }
            if(!layerId) return;    //can't remove unpersisted layers
            //filter out selected layer from current layers and update
            let layers = this.getLayers().filter(ls => ls.layer.id !== layerId );
            this.set(ItemProperties.MAP_LAYERS, layers);
        }

        //-----------------------------------------------------------

        annotations(value) { this.setAnnotations(value); return this; }
        getAnnotations() { return this.get(ItemProperties.ANNOTATIONS); }
        setAnnotations(value) { this.set(ItemProperties.ANNOTATIONS, value); }

        //-----------------------------------------------------------


        /*
         * In order to properly handle Layers nested within plain PoJSos
         * @override ItemModel.propertyToJson
         */
        propertyToJson(property, value, parentJson) {
            if(property === ItemProperties.MAP_LAYERS && value && value.length) {
                let json = value.map(v => this.fromLayerState(v) );
                parentJson[property.key] = json;
            } else {
                super.propertyToJson(property, value, parentJson);
            }
        }

        /**
         * @param {Object} object
         * @return {Object} layer state representation of the input
         */
        toLayerState(object) {
            if(!object) {
                // console.log("MapModel.toLayerState() - input was null");
                return null;
            }

            let result = {};

            if(object.layer) {
                // console.log("MapModel.toLayerState() - input was already a state");
                let layer = this.toItem(object.layer);
                if(!layer) return null;
                result[LayerStateProperties.LAYER.key] = layer;
                result[LayerStateProperties.LAYER_ID.key] = layer.getId() || object.layer_id;
                result[LayerStateProperties.OPACITY.key] = object.opacity || 1.0;
                result[LayerStateProperties.VISIBILITY.key] =
                    object.visibility !== undefined ? object.visibility : true;

            } else if(!object.layer) {
                // console.log("MapModel.toLayerState() - input was a layer");
                let layer = this.toItem(object);
                if(!layer) return null;
                result[LayerStateProperties.LAYER.key] = layer;
                result[LayerStateProperties.LAYER_ID.key] = layer.getId();
                result[LayerStateProperties.OPACITY.key] = 1.0;
                result[LayerStateProperties.VISIBILITY.key] = true;
            }

            return result;
        }

        /**
         * @param {Object} state -
         * @return {Object} JSON representation
         */
        fromLayerState(state) {
            let result = {};
            for(let p in state) {
                let value = state[p];
                if(LayerStateProperties.LAYER.key === p) {
                    value = value.toJson();
                }
                result[p] = value;
            }
            return result;
        }

    }

    return MapModel;

}));
