

import ItemModel from './item';
import ItemTypes from '../shared/types';
import ItemProperties from './properties';


class DatasetModel extends ItemModel {

    constructor(data) {
        super(data);
        this.set(ItemProperties.TYPE, ItemTypes.DATASET);
        this.default(ItemProperties.SERVICES, []);
    }

    //-----------------------------------------------------------

    services(value) { this.setServices(value); return this; }
    getServices() { return this.get(ItemProperties.SERVICES); }
    setServices(value) { this.set(ItemProperties.SERVICES, value); }
    addService(value) { this.addTo(ItemProperties.SERVICES, value); }
    removeService(value) { this.removeFrom(ItemProperties.SERVICES, value); }

    //-----------------------------------------------------------


}

export default DatasetModel;
