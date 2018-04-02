
import ItemModel from './item';
import ItemTypes from '../shared/types';
import ItemProperties from './properties';


class ConceptSchemeModel extends ItemModel {

    constructor(data) {
        super(data);
        this.set(ItemProperties.TYPE, ItemTypes.CONCEPT_SCHEME);
    }

    //-----------------------------------------------------------



    //-----------------------------------------------------------


}

export default ConceptSchemeModel;
