
import ItemModel from './item';
import ItemTypes from '../shared/types';
import ItemProperties from './properties';


class LayerModel extends ItemModel {

    constructor(data) {
        super(data);
        this.set(ItemProperties.TYPE, ItemTypes.LAYER);
        this.default(ItemProperties.SERVICES, []);
    }

    //-----------------------------------------------------------

    layerType(value) { this.setLayerType(value); return this; }
    getLayerType() { return this.get(ItemProperties.LAYER_TYPE); }
    setLayerType(value) { this.set(ItemProperties.LAYER_TYPE, value); }

    //-----------------------------------------------------------

    layerName(value) { this.setLayerName(value); return this; }
    getLayerName() { return this.get(ItemProperties.LAYER_NAME); }
    setLayerName(value) { this.set(ItemProperties.LAYER_NAME, value); }

    //-----------------------------------------------------------

    legend(value) { this.setLegend(value); return this; }
    getLegend() { return this.get(ItemProperties.LEGEND); }
    setLegend(value) { this.set(ItemProperties.LEGEND, value); }

    //-----------------------------------------------------------

    services(value) { this.setServices(value); return this; }
    getServices() { return this.get(ItemProperties.SERVICES); }
    setServices(value) { this.set(ItemProperties.SERVICES, value); }
    addService(value) { this.addTo(ItemProperties.SERVICES, value); }
    removeService(value) { this.removeFrom(ItemProperties.SERVICES, value); }

    //-----------------------------------------------------------

}

export default LayerModel;
