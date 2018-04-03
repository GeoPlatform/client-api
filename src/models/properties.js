
import ItemTypes from '../shared/types';


const ItemProperties = {

    //all Items have the following properties
    ID              : { key: 'id',            forType:'Item' },
    URI             : { key: 'uri',           forType:'Item' },
    TYPE            : { key: 'type',          forType:'Item' },
    CREATED         : { key: '_created',      forType:'Item' },
    MODIFIED        : { key: 'modified',      forType:'Item' },
    LAST_MODIFIED_BY: { key: 'lastModifiedBy', forType:'Item' },
    IDENTIFIERS     : { key: 'identifiers',   forType:'Item', multi: true },
    CREATED_BY      : { key: 'createdBy',     forType:'Item' },
    LABEL           : { key: 'label',         forType:'Item' },
    RESOURCE_TYPES  : { key: 'resourceTypes', forType:'Item',   multi: true, type: 'object'  },

    //all Assets have the following properties
    TITLE           : { key: 'title'                                      },
    DESCRIPTION     : { key: 'description'                                },
    ALTERNATE_TITLES: { key: 'alternateTitles',               multi: true },
    KEYWORDS        : { key: 'keywords',                      multi: true },
    GEOGRAPHIC_EXTENT: { key: 'extent',       type: "object"              },
    TEMPORAL_EXTENT : { key: 'temporal',      type: "object"              },
    STATISTICS      : { key: 'statistics',    type: 'object'              },
    LANDING_PAGE    : { key: 'landingPage'                                },
    STATUS          : { key: 'status'                                     },
    VISIBILITY      : { key: 'visibility'                                 },
    THEMES          : { key: 'themes',        type: 'item',   multi: true },
    PUBLISHERS      : { key: 'publishers',    type: 'item',   multi: true },
    CONTACTS        : { key: 'contacts',      type: 'item',   multi: true },
    CONTRIBUTORS    : { key: 'contributors',  type: 'item',   multi: true },
    DISTRIBUTIONS   : { key: 'distributions', type: 'object', multi: true },
    CLASSIFIERS     : { key: 'classifiers',   type: 'object'              },
    ACCESS_RIGHTS   : { key: 'accessRights',  type: 'object', multi: true },
    RELATED_RESOURCES : { key: 'related',     type: 'object', multi: true },
    USED_BY         : { key: 'usedBy',        type: 'item',   multi: true },
    PURPOSE         : { key: 'purpose'                                    },

    //Services also have these
    HREF            : { key: 'href' },
    SERVICE_TYPE    : { key: 'serviceType',     type: 'object' },
    DATASETS        : { key: 'datasets',        type: 'item', multi: true },

    //Layers also have these
    LAYER_TYPE      : { key: 'layerType' },
    LAYER_NAME      : { key: 'layerName' },
    LEGEND          : { key: 'legend',      type: 'object'               },
    SERVICES        : { key: 'services',    type: 'item', multi: true    },
    SUPPORTED_FORMATS: { key: 'supportedFormats',         multi: true    },
    MIN_SCALE       : { key: 'minScale'                                  },
    MAX_SCALE       : { key: 'maxScale'                                  },
    LEGEND          : { key: 'legend',      type: 'object'               },

    //Maps also have these
    BASE_LAYER      : { key: 'baseLayer',   type: 'item'                 },
    MAP_LAYERS      : { key: 'layers',      type: 'object', multi: true  },
    THUMBNAIL       : { key: 'thumbnail',   type: "object"               },
    ANNOTATIONS     : { key: 'annotations', type: 'object'               },

    //Galleries have these
    GALLERY_ITEMS   : { key: 'items',       type: 'object',  multi: true },

    //Concepts have these
    CONCEPT_SCHEME  : { key: 'scheme', type: 'item'                      },

    //Contacts have these
    FULL_NAME       : { key: 'fullName'     },
    ORGANIZATION_NAME : { key: 'orgName'    },
    POSITION_TITLE  : { key: 'positionTitle' },
    EMAIL           : { key: 'email'        },
    TELEPHONE       : { key: 'tel'          },
    ADDRESS         : { key: 'address', type: 'object'  },

    //Organizations have these
    NAME                : { key: 'name' },
    PARENT_ORGANIZATION : { key: 'subOrganizationOf', type: 'item' }

};





//all Items have the following properties
const ItemProps = [
    ItemProperties.ID,
    ItemProperties.URI,
    ItemProperties.TYPE,
    ItemProperties.CREATED,
    ItemProperties.MODIFIED,
    ItemProperties.LAST_MODIFIED_BY,
    ItemProperties.IDENTIFIERS,
    ItemProperties.CREATED_BY,
    ItemProperties.LABEL,
    ItemProperties.RESOURCE_TYPES
];

//all Assets have the following properties
const AssetProps = ItemProps.concat([
    ItemProperties.TITLE,
    ItemProperties.DESCRIPTION,
    ItemProperties.ALTERNATE_TITLES,
    ItemProperties.KEYWORDS,
    ItemProperties.GEOGRAPHIC_EXTENT,
    ItemProperties.TEMPORAL_EXTENT,
    ItemProperties.STATISTICS,
    ItemProperties.LANDING_PAGE,
    ItemProperties.STATUS,
    ItemProperties.VISIBILITY,
    ItemProperties.THEMES,
    ItemProperties.PUBLISHERS,
    ItemProperties.CONTACTS,
    ItemProperties.CONTRIBUTORS,
    ItemProperties.DISTRIBUTIONS,
    ItemProperties.CLASSIFIERS,
    ItemProperties.ACCESS_RIGHTS,
    ItemProperties.RELATED_RESOURCES,
    ItemProperties.USED_BY,
    ItemProperties.PURPOSE
]);



const ServiceProps = AssetProps.concat([
    ItemProperties.HREF,
    ItemProperties.SERVICE_TYPE,
    ItemProperties.DATASETS
]);


const LayerProps = AssetProps.concat([
    ItemProperties.LAYER_TYPE,
    ItemProperties.LAYER_NAME,
    ItemProperties.LEGEND,
    ItemProperties.SERVICES,
    ItemProperties.SUPPORTED_FORMATS,
    ItemProperties.MIN_SCALE,
    ItemProperties.MAX_SCALE
]);

const MapProps = AssetProps.concat([
    ItemProperties.BASE_LAYER,
    ItemProperties.MAP_LAYERS,
    ItemProperties.THUMBNAIL,
    ItemProperties.ANNOTATIONS
]);


const GalleryProps = AssetProps.concat([
    ItemProperties.GALLERY_ITEMS
]);


const ConceptProps = ItemProps.concat([
    ItemProperties.CONCEPT_SCHEME
]);

const ContactProps = ItemProps.concat([
    ItemProperties.FULL_NAME,
    ItemProperties.ORGANIZATION_NAME,
    ItemProperties.POSITION_TITLE,
    ItemProperties.EMAIL,
    ItemProperties.TELEPHONE,
    ItemProperties.ADDRESS
]);

const OrgProps = ItemProps.concat([
    ItemProperties.NAME,
    ItemProperties.PARENT_ORGANIZATION
]);



let props = {};
props[ItemTypes.DATASET] = AssetProps;
props[ItemTypes.SERVICE] = ServiceProps;
props[ItemTypes.LAYER]   = LayerProps;
props[ItemTypes.MAP]     = MapProps;
props[ItemTypes.GALLERY] = GalleryProps;
props[ItemTypes.COMMUNITY] = AssetProps;
props[ItemTypes.CONCEPT] = ConceptProps;
props[ItemTypes.CONCEPT_SCHEME] = ItemProps;
props[ItemTypes.CONTACT] = ContactProps;
props[ItemTypes.ORGANIZATION] = OrgProps;

function PropertiesFor(type) {
    if(props[type]) return props[type].slice(0);
    else return ItemProps.slice(0);
}




export {
    ItemProperties as default,
    ItemProperties,
    PropertiesFor
}
