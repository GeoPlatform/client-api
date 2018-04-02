

import ItemModel from './item';
import ItemTypes from '../shared/types';
import ItemProperties from './properties';

class ConceptModel extends ItemModel {

    constructor(data) {
        super(data);
        this.set(ItemProperties.TYPE, ItemTypes.CONCEPT);
    }

    //-----------------------------------------------------------

    scheme(value) { this.setScheme(value); return this; }
    getScheme() { return this.get(ItemProperties.CONCEPT_SCHEME); }
    setScheme(value) { this.set(ItemProperties.CONCEPT_SCHEME, value); }

    //-----------------------------------------------------------


}

export default ConceptModel;
