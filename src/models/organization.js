

import ItemModel from './item';
import ItemTypes from '../shared/types';
import ItemProperties from './properties';


class OrganizationModel extends ItemModel {

    constructor(data) {
        super(data);
        this.set(ItemProperties.TYPE, ItemTypes.ORGANIZATION);
    }

    //-----------------------------------------------------------

    name(value) { this.setName(value); return this; }
    getName() { return this.get(ItemProperties.NAME); }
    setName(value) { this.set(ItemProperties.NAME, value); }

    //-----------------------------------------------------------

    parentOrg(value) { this.setParentOrganization(value); return this; }
    getParentOrganization() { return this.get(ItemProperties.PARENT_ORGANIZATION); }
    setParentOrganization(value) { this.set(ItemProperties.PARENT_ORGANIZATION, value); }

    //-----------------------------------------------------------


}

export default OrganizationModel;
