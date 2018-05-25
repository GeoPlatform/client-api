
import ItemModel from './item';
import ItemTypes from '../shared/types';
import ItemProperties from './properties';


const LEGEND_PROPS = {
    LABEL             : { key: "label"          },
    DESCRIPTION       : { key: "description"    },
    URL               : { key: "url"            },
    CONTENT           : { key: "contentData"    },
    MEDIA_TYPE        : { key: "mediaType"      },
    WIDTH             : { key: "width"          },
    HEIGHT            : { key: "height"         },
    VALUES            : { key: "values",      multi: true }
};

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

    services(value) { this.setServices(value); return this; }
    getServices() { return this.get(ItemProperties.SERVICES); }
    setServices(value) { this.set(ItemProperties.SERVICES, value); }
    addService(value) { this.addTo(ItemProperties.SERVICES, value); }
    removeService(value) { this.removeFrom(ItemProperties.SERVICES, value); }

    //-----------------------------------------------------------

    formats(value) { this.setFormats(value); return this; }
    getFormats() { return this.get(ItemProperties.SUPPORTED_FORMATS); }
    setFormats(value) { this.set(ItemProperties.SUPPORTED_FORMATS, value); }
    addFormat(value) {
        //TODO
    }
    removeFormat(value) {
        //TODO
    }

    //-----------------------------------------------------------

    minScale(value) { this.setMinScale(value); return this; }
    getMinScale() { return this.get(ItemProperties.MIN_SCALE); }
    setMinScale(value) { this.set(ItemProperties.MIN_SCALE, value); }

    //-----------------------------------------------------------

    maxScale(value) { this.setMaxScale(value); return this; }
    getMaxScale() { return this.get(ItemProperties.MAX_SCALE); }
    setMaxScale(value) { this.set(ItemProperties.MAX_SCALE, value); }

    //-----------------------------------------------------------

    scale(min, max) {
        this.setMinScale(min);
        this.setMinScale(max);
        return this;
    }

    //-----------------------------------------------------------

    legend(value) { this.setLegend(value); return this; }
    getLegend() { return this.get(ItemProperties.LEGEND); }
    setLegend(value) { this.set(ItemProperties.LEGEND, value); }
    /**
     * @param {object} item - defining a legend item, including label and either a URL or contentData
     */
    addLegendItem(item) {
        if( !item[LEGEND_PROPS.LABEL.key]) {
            console.log("LayerModel.addLegendItem() - legends must have a '" +
                LEGEND_PROPS.LABEL.key + "'");
            return;
        }
        if( !item[LEGEND_PROPS.URL.key] && !item[LEGEND_PROPS.CONTENT.key]) {
            console.log("LayerModel.addLegendItem() - legends must have either a '" +
            LEGEND_PROPS.URL.key + "' or '" + LEGEND_PROPS.CONTENT.key + "'");
            return;
        }
        let result = {};
        for(let p in LEGEND_PROPS) {
            let prop = LEGEND_PROPS[p];
            let key = prop.key;
            result[key] = item[key];
        }
        let legend = this.getLegend();
        if(!legend) legend = { title: this.getLabel() + " Legend", items: [] };
        else if(!legend.items) legend.items = [];
        legend.items.push(result);
        this.setLegend(legend);
    }

    //-----------------------------------------------------------

}

export default LayerModel;
