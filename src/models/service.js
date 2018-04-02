
import ItemModel from './item';
import ItemTypes from '../shared/types';
import ItemProperties from './properties';


class ServiceModel extends ItemModel {

    constructor(data) {
        super(data);
        this.set(ItemProperties.TYPE, ItemTypes.SERVICE);
        this.default(ItemProperties.DATASETS, []);
    }

    //-----------------------------------------------------------

    href(value) { this.setHref(value); return this; }
    getHref() { return this.get(ItemProperties.HREF); }
    setHref(value) { this.set(ItemProperties.HREF, value); }

    //-----------------------------------------------------------

    serviceType(value) { this.setServiceType(value); return this; }
    getServiceType() { return this.get(ItemProperties.SERVICE_TYPE); }
    setServiceType(value) { this.set(ItemProperties.SERVICE_TYPE, value); }

    //-----------------------------------------------------------

    datasets(value) { this.setDatasets(value); return this; }
    getDatasets() { return this.get(ItemProperties.DATASETS); }
    setDatasets(value) { this.set(ItemProperties.DATASETS, value); }
    addDataset(value) { this.addTo(ItemProperties.DATASETS, value); }
    removeDataset(value) { this.removeFrom(ItemProperties.DATASETS, value); }

    //-----------------------------------------------------------


}

export default ServiceModel;
