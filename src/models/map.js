



(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['ItemModel','ItemTypes', 'ItemProperties'],
        function(ItemModel, ItemTypes, ItemProperties) {
            return (root.MapModel = factory(ItemModel, ItemTypes, ItemProperties));
        });
    } else if(typeof module === "object" && module.exports) {
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
    } else {
        GeoPlatform.MapModel = factory(GeoPlatform.ItemModel,
            GeoPlatform.ItemTypes, GeoPlatform.ItemProperties);
    }
}(this||window, function(ItemModel, ItemTypes, ItemProperties) {


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
            if(value && value.length) {
                for(let i=0; i<value.length; ++i) {

                    //adding layer state wrapping a layer
                    if(value[i].layer) {
                        value[i].layer = this.toItem(value[i].layer);

                    } else {
                        //adding layer, needs to be wrapped in state
                        value[i] = {
                            layer_id: value[i].id,
                            layer: this.toItem(value[i]),
                            opacity: 1.0,
                            visibility: true
                        };
                    }

                }
            }
            this.set(ItemProperties.MAP_LAYERS, value);
        }
        addLayer(value) {
            if(!value) return;
            if(value.layer) {
                //adding layer already wrapped by state
                value.layer = this.toItem(value.layer);
            } else {
                //adding layer, needs to be wrapped in state
                value = {
                    layer_id: value.id,
                    layer: this.toItem(value),
                    opacity: 1.0,
                    visibility: true
                };
            }
            this.addTo(ItemProperties.MAP_LAYERS, value);
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
            if(property === ItemProperties.MAP_LAYERS &&
                value && value.length) {

                let json = value.map(v => {
                    return {
                        layer_id: v.layer.getId(),
                        layer: v.layer.toJson(),
                        opacity: v.opacity,
                        visibility: v.visibility
                    };
                });
                parentJson[property.key] = json;

            } else {
                super.propertyToJson(property, value, parentJson);
            }
        }


    }

    return MapModel;

}));
