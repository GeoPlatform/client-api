



(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['BaseModel','ItemProperties'],
        function(BaseModel, ItemProperties) {
            return (root.GalleryItemModel = factory(BaseModel, ItemProperties));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.GalleryItemModel = factory(
                require('./item'),
                require('../shared/types'),
                require('./properties')
            )
        );
    } else {
        GeoPlatform.GalleryItemModel = factory(
            GeoPlatform.BaseModel,
            GeoPlatform.ItemProperties
        );
    }
}(this||window, function(BaseModel, ItemProperties) {


    const Properties = {
        ASSET_ID    : { key: "assetId"              },
        ASSET       : { key: "asset",   type: 'item' },
        ASSET_TYPE  : { key: "assetType" }
    };


    class GalleryItemModel extends BaseModel {

        constructor(data) {
            super();

            if(data) {
                for(let p in Properties) {
                    let property = Properties[p];
                    let key = property.key;
                    let value = data[key];
                    if(value !== null && value !== undefined) {
                        this.set(property, value);

                        if(property === Properties.ASSET) {
                            let layer = this.getLayer();
                            this.set(Properties.ASSET_ID, layer.getId());
                            this.set(Properties.ASSET_TYPE, layer.getType());
                        }
                    }
                }
            }
        }


        //-----------------------------------------------------------

        asset(value) { this.setAsset(value); return this; }
        getAsset() { return this.get(Properties.ASSET); }
        setAsset(value) {
            if(!value) {
                this.set(Properties.ASSET, null);
                this.set(Properties.ASSET_ID, null);

            } else {
                value = this.toItem(value);
                this.set(Properties.ASSET, value);
                this.set(Properties.ASSET_ID, value.getId());
                this.set(Properties.ASSET_TYPE, value.getType());
            }
        }

        getAssetId() { return this.get(Properties.ASSET_ID); }
        getAssetType() { return this.get(Properties.ASSET_TYPE); }


        //-----------------------------------------------------------

        isValid() {
            return this.getAsset();
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

    return GalleryItemModel;

}));
