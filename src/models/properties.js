
import ItemTypes from '../shared/types';

const ItemProperties = {
    ID              : { key: 'id' },
    URI             : { key: 'uri' },
    TYPE            : { key: 'type' },
    CREATED         : { key: '_created' },
    MODIFIED        : { key: 'modified' },
    LAST_MODIFIED_BY: { key: 'lastModifiedBy' },
    IDENTIFIERS     : { key: 'identifiers',     multi: true },
    ALTERNATE_TITLES: { key: 'alternateTitles', multi: true },
    CREATED_BY      : { key: 'createdBy' },
    LABEL           : { key: 'label' },
    TITLE           : { key: 'title' },
    DESCRIPTION     : { key: 'description' },
    KEYWORDS        : { key: 'keywords',        multi: true },
    LANDING_PAGE    : { key: 'landingPage' },
    STATUS          : { key: 'status' },
    VISIBILITY      : { key: 'visibility' },
    THEMES          : { key: 'themes',          multi: true,    type: 'item'    },
    PUBLISHERS      : { key: 'publishers',      multi: true,    type: 'item'    },
    CONTACTS        : { key: 'contacts',        multi: true,    type: 'item'    },
    CONTRIBUTORS    : { key: 'contributors',    multi: true,    type: 'item'    },
    DISTRIBUTIONS   : { key: 'distributions',   multi: true,    type: 'object'  },
    RESOURCE_TYPES  : { key: 'resourceTypes',   multi: true,    type: 'object'  },
    CLASSIFIERS     : { key: 'classifiers',     type: 'object'  },

    HREF            : { key: 'href' },
    SERVICE_TYPE    : { key: 'serviceType',     type: 'object' },
    DATASETS        : { key: 'datasets',        multi: true, type: 'item' },

    LAYER_TYPE      : { key: 'layerType' },
    LAYER_NAME      : { key: 'layerName' },
    LEGEND          : { key: 'legend',          type: 'object'  },
    SERVICES        : { key: 'services',        multi: true,    type: 'item'    },

    BASE_LAYER      : { key: 'baseLayer',       type: 'item'    },
    MAP_LAYERS      : { key: 'layers',          multi: true,    type: 'object'  },
    THUMBNAIL       : { key: 'thumbnail',       type: "object"  },
    ANNOTATIONS     : { key: 'annotations',     type: 'object'  },

    GALLERY_ITEMS   : { key: 'items',           multi: true,    type: 'object'  },

    CONCEPT_SCHEME  : { key: 'scheme',          type: 'item'    },

    FULL_NAME       : { key: 'fullName'                 },
    ORGANIZATION_NAME : { key: 'orgName'                },
    POSITION_TITLE  : { key: 'positionTitle'            },
    EMAIL           : { key: 'email'                    },
    TELEPHONE       : { key: 'tel'                      },
    ADDRESS         : { key: 'address', type: 'object'  },

    NAME                : { key: 'name' },
    PARENT_ORGANIZATION : { key: 'subOrganizationOf', type: 'item' }

};

export default ItemProperties;
