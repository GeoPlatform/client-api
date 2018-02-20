



(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['ItemModel','ItemTypes'], function(ItemModel, ItemTypes) {
            return (root.GalleryModel = factory(ItemModel, ItemTypes));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.GalleryModel = factory(
                require('./item'),
                require('../shared/types')
            )
        );
    } else {
        GeoPlatform.GalleryModel = factory(GeoPlatform.ItemModel,
            GeoPlatform.ItemTypes);
    }
}(this||window, function(ItemModel, ItemTypes) {


    class GalleryModel extends ItemModel {

        constructor(data) {
            super(data);
            this.type = ItemTypes.GALLERY;
        }

        //-----------------------------------------------------------

        items(value) { this.setItems(value); return this; }
        getItems() { return this.items; }
        setItems(value) {
            if(value && typeof(value.push) === 'undefined')
                value = [value];
            this.items = value;
        }
        addItem(value) {
            if(!value || !value.id) return;
            this.items = this.addObject(value, this.items);
        }
        removeItem(value) {
            if(!value || !value.id) return;
            this.items = this.removeObject(value, this.items);
        }
        reorderItem(value, newPosition) {
            let idx = -1;
            let idx = -1;
            this.items.each( (p,i) => {
                if(p.id === value.id)
                    idx = i;
            });
            if(idx < 0) return;
            this.items.splice(idx, 1);
            this.items.splice(idx, 0, value);
        }

        //-----------------------------------------------------------



        //-----------------------------------------------------------


    }

    return GalleryModel;

}));
