

import ItemModel from './item';
import ItemTypes from '../shared/types';
import ItemProperties from './properties';


class CommunityModel extends ItemModel {

    constructor(data) {
        super(data);
        this.set(ItemProperties.TYPE, ItemTypes.COMMUNITY);
    }

    //-----------------------------------------------------------



    //-----------------------------------------------------------


}

export default CommunityModel;
