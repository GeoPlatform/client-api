



(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['ItemModel','ItemTypes', 'ItemProperties'],
        function(ItemModel, ItemTypes, ItemProperties) {
            return (root.GalleryModel = factory(ItemModel, ItemTypes, ItemProperties));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.GalleryModel = factory(
                require('./item'),
                require('../shared/types'),
                require('./properties')
            )
        );
    } else {
        GeoPlatform.GalleryModel = factory(GeoPlatform.ItemModel,
            GeoPlatform.ItemTypes, GeoPlatform.ItemProperties);
    }
}(this||window, function(ItemModel, ItemTypes, ItemProperties) {


    const GalleryItemProperties = {
        ASSET_ID    : { key: "assetId"   },
        ASSET       : { key: "asset"     },
        ASSET_TYPE  : { key: "assetType" }
    };


    /**
     * Gallery
     */
    class GalleryModel extends ItemModel {

        constructor(data) {
            super(data);

            //manually re-set the overlays because each objectc
            // has a nested Item (layer) which needs to be item-ized
            // and the initializer used in the constructor isn't tied
            // to any specific instance's logic.
            let items = this.getItems();
            if(items) {
                this.setItems(items);
            }

            this.set(ItemProperties.TYPE, ItemTypes.GALLERY);
            this.default(ItemProperties.GALLERY_ITEMS, []);
        }

        //-----------------------------------------------------------

        items(value) { this.setItems(value); return this; }
        getItems() { return this.get(ItemProperties.GALLERY_ITEMS); }
        setItems(value) {
            let items = [];
            //ensure that items being set contain Item-ized assets
            if(value) {
                if(typeof(value.push) === 'undefined') {
                    value = [value];
                }
                items = value.map(v=>this.toGalleryItem(v));
            }
            this.set(ItemProperties.GALLERY_ITEMS, items);
        }
        addItem(value) {
            if(!value) return;
            let item = this.toGalleryItem(value);
            this.addTo(ItemProperties.GALLERY_ITEMS, item);
        }
        removeItem(value) {
            if(!value || typeof(value.toJson) === 'undefined') return;
            let items = this.getItems().filter(i=>i.assetId !== value.getId());
            this.setItems(items);
        }
        reorderItem(value, newPosition) {
            let idx = -1;
            let arr = this.getItems();
            arr.each( (p,i) => {
                if(p.id === value.id)
                    idx = i;
            });
            if(idx < 0) return;
            arr.splice(idx, 1);
            arr.splice(idx, 0, value);
            this.setItems(arr);
        }

        //-----------------------------------------------------------

        /*
         * In order to properly handle Items nested within plain PoJSos
         * @override ItemModel.propertyToJson
         */
        propertyToJson(property, value, parentJson) {
            if(property === ItemProperties.GALLERY_ITEMS && value && value.length) {
                let json = value.map(v => this.fromGalleryItem(v) ).filter(v=>v!==null);
                parentJson[property.key] = json;
            } else {
                super.propertyToJson(property, value, parentJson);
            }
        }




        toGalleryItem(object) {
            if(!object) return null;

            let result = {};

            if(object.asset) {
                // console.log("GalleryModel.toGalleryItem() - input was already an item");
                let asset = this.toItem(object.asset);
                if(!asset) return null;
                result[GalleryItemProperties.ASSET.key] = asset;
                result[GalleryItemProperties.ASSET_ID.key] =
                    asset.getId() || object[GalleryItemProperties.ASSET_ID.key];
                result[GalleryItemProperties.ASSET_TYPE.key] =
                    asset.getType() || object[GalleryItemProperties.ASSET_TYPE.key];


            } else {
                // console.log("GalleryModel.toGalleryItem() - input was an asset");
                let asset = this.toItem(object);
                if(!asset) return null;
                result[GalleryItemProperties.ASSET.key] = asset;
                result[GalleryItemProperties.ASSET_ID.key] = asset.getId();
                result[GalleryItemProperties.ASSET_TYPE.key] = asset.getType();

            }

            return result;
        }

        fromGalleryItem(item) {
            let result = {};
            for(let p in item) {
                let value = item[p];
                if(GalleryItemProperties.ASSET.key === p) {
                    value = value.toJson();
                }
                result[p] = value;
            }
            return result;
        }

    }

    return GalleryModel;

}));