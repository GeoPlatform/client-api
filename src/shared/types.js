

const ItemTypes = {
    DATASET         : "dcat:Dataset",
    SERVICE         : "regp:Service",
    LAYER           : "Layer",
    MAP             : "Map",
    GALLERY         : "Gallery",
    COMMUNITY       : 'Community',
    APPLICATION     : 'Application',
    TOPIC           : 'Topic',
    WEBSITE         : 'WebSite',
    IMAGE_PRODUCT   : 'eo:Product',
    ORGANIZATION    : "org:Organization",
    CONTACT         : "vcard:VCard",
    CONCEPT         : "skos:Concept",
    CONCEPT_SCHEME  : "skos:ConceptScheme",
    STANDARD        : 'dct:Standard',
    RIGHTS_STATEMENT: 'dct:RightsStatement'
};

const ItemTypeLabels = {
    DATASET         : "Dataset",
    SERVICE         : "Service",
    LAYER           : "Layer",
    MAP             : "Map",
    GALLERY         : "Gallery",
    COMMUNITY       : 'Community',
    APPLICATION     : 'Application',
    TOPIC           : 'Topic',
    WEBSITE         : 'WebSite',
    IMAGE_PRODUCT   : "Image Product",
    ORGANIZATION    : "Organization",
    CONTACT         : "Contact",
    CONCEPT         : "Concept",
    CONCEPT_SCHEME  : "Concept Scheme",
    STANDARD        : 'Standard',
    RIGHTS_STATEMENT: 'Rights Statement'
};


export {
    ItemTypes as default,
    ItemTypes,
    ItemTypeLabels
};
