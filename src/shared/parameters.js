

export default {
    ALTERNATE_TITLE  : 'alternateTitles',
    BEGINS           : 'startDate.min',
    CREATED          : 'created',
    CREATED_BEFORE   : 'created.max',
    CREATED_AFTER    : 'created.min',
    CREATED_BY       : 'createdBy',
    CREATOR          : 'creator.id',
    CONTRIBUTED_BY   : 'contributedBy',
    ENDS             : 'endDate.max',
    EXTENT           : 'extent',
    IDENTIFIERS      : 'identifiers',
    KEYWORDS         : 'keywords',
    LAST_MODIFIED_BY : 'lastModifiedBy',
    MODIFIED         : 'modified',
    MODIFIED_BEFORE  : 'modified.max',
    MODIFIED_AFTER   : 'modified.min',
    PUBLISHERS_ID    : 'publisher.id',
    PUBLISHERS_LABEL : 'publisher.label',
    PUBLISHERS_URI   : 'publisher.uri',
    CONTACTS_ID      : 'contacts.id',
    CONTACTS_LABEL   : 'contacts.label',
    CONTACTS_URI     : 'contacts.uri',
    QUERY            : 'q',
    SCHEMES_ID       : 'scheme.id',
    SCHEMES_LABEL    : 'scheme.label',
    SCHEMES_URI      : 'scheme.uri',
    STATUS           : 'status',
    SERVICE_TYPES    : 'serviceType.id',
    THEMES_ID        : 'theme.id',
    THEMES_LABEL     : 'theme.label',
    THEMES_URI       : 'theme.uri',
    TYPES            : 'type',      //TODO change to 'types'
    URI              : 'uri',
    USED_BY_ID       : 'usedBy.id',
    USED_BY_LABEL    : 'usedBy.label',
    USED_BY_URI      : 'usedBy.uri',
    VISIBILITY       : 'visibility',
    RESOURCE_TYPE    : 'resourceType',
    DATASET          : 'dataset',
    LANDING_PAGE     : 'landingPage',
    PURPOSE          : 'purpose',

    //statistics parameters
    RELIABILITY      : 'reliability',
    RELIABILITY_MIN  : 'reliability.min',
    RELIABILITY_MAX  : 'reliability.max',
    ONLINE           : 'online',
    COMPLIANT        : 'compliant',
    SPEED            : 'speed',
    SPEED_MIN        : 'speed.min',
    SPEED_MAX        : 'speed.max',
    LIKES            : 'likes',
    LIKES_MIN        : 'likes.min',
    LIKES_MAX        : 'likes.max',
    VIEWS            : 'views',
    VIEWS_MIN        : 'views.min',
    VIEWS_MAX        : 'views.max',

    //type-specific parameters
    HREF             : 'href',           //service-specific
    LAYER_TYPE       : 'layerType',     //layer-specific
    LAYER_NAME       : 'layerName',     //...
    PARENT_LAYER     : 'parentLayer',   //...
    SUB_LAYER        : 'subLayer',      //...
    SERVICE          : 'service',       //...
    MAP_LAYER        : 'mapLayer',      //map-specific
    GALLERY_ITEM     : 'galleryItem',   //gallery-specific

    //meta-parameters
    FACETS           : 'includeFacets',  //TODO change to 'facets'
    FIELDS           : 'fields',
    SORT             : 'sort',
    PAGE             : 'page',
    PAGE_SIZE        : 'size',

    //recommender service-specific
    FOR_TYPES        : 'for'
};
