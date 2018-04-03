
import ItemTypes        from '../shared/types';
import ItemProperties   from './properties';
import BaseModel        from './base';
import DatasetModel     from './dataset';
import ServiceModel     from './service';
import LayerModel       from './layer';
import MapModel         from './map';
import GalleryModel     from './gallery';
import CommunityModel   from './community';
import ContactModel     from './contact';
import OrganizationModel from './organization';
import ConceptModel     from './concept';
import ConceptSchemeModel from './concept-scheme';


function itemFactory(type, options) {
    let item = null;

    // console.log(" ");
    // console.log(`ItemFactory() - Creating ${type} Item`);
    // console.log(" using... " + JSON.stringify(options));
    // console.log("-------------------------------");

    try {

        switch(type) {
            case ItemTypes.DATASET:         item = new DatasetModel(options); break;
            case ItemTypes.SERVICE:         item = new ServiceModel(options); break;
            case ItemTypes.LAYER:           item = new LayerModel(options); break;
            case ItemTypes.MAP:             item = new MapModel(options); break;
            case ItemTypes.GALLERY:         item = new GalleryModel(options); break;
            case ItemTypes.COMMUNITY:       item = new CommunityModel(options); break;
            case ItemTypes.CONTACT:         item = new ContactModel(options); break;
            case ItemTypes.ORGANIZATION:    item = new OrganizationModel(options); break;
            case ItemTypes.CONCEPT:         item = new ConceptModel(options); break;
            case ItemTypes.CONCEPT_SCHEME:  item = new ConceptSchemeModel(options); break;
            default: throw new Error(`Unsupported item type '${type}'`);
        }

    } catch(e) {
        console.log("ItemFactory.parse() - Error creating " + type +
            " using " + JSON.stringify(options) +
            " : " + e.message);
        throw new Error("ItemFactory.parse() - Error creating " + type +
            " using " + JSON.stringify(options) +
            " : " + e.message);
    }

    // console.log(`ItemFactory - done with ${item.getType()}`);
    // console.log(" ");
    return item;
}




export default function factory(arg) {

    // console.log("ItemFactory() - " + JSON.stringify(arg));

    let type = null, options = null;
    if(arg && typeof(arg) === 'string')
        type = arg;
    else if(arg && typeof(arg) === 'object') {

        if(typeof(arg.toJson) !== 'undefined') {
            // console.log(arg.getType() + " is already an Item");
            return arg; //already an Item instance
        }

        if(arg.type)
            type = arg.type;
        else {
            // console.log('*******************');
            // console.log(JSON.stringify(arg));
            // console.log('----');
            throw new Error("ItemFactory() - Must specify 'type' in parameter object");
        }

        options = arg;
    } else {
        throw new Error("Illegal argument; must be string type or object definition");
    }

    return itemFactory(type, options);

}
