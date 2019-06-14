

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
    ORGANIZATION    : "org:Organization",
    CONTACT         : "vcard:VCard",
    PERSON          : "foaf:Person",
    CONCEPT         : "skos:Concept",
    CONCEPT_SCHEME  : "skos:ConceptScheme",
    STANDARD        : 'dct:Standard',
    RIGHTS_STATEMENT: 'dct:RightsStatement'
};

const ItemTypeLabels = {};
ItemTypeLabels[ItemTypes.DATASET]          = "Dataset";
ItemTypeLabels[ItemTypes.SERVICE]          = "Service";
ItemTypeLabels[ItemTypes.LAYER]            = "Layer";
ItemTypeLabels[ItemTypes.MAP]              = "Map";
ItemTypeLabels[ItemTypes.GALLERY]          = "Gallery";
ItemTypeLabels[ItemTypes.COMMUNITY]        = 'Community';
ItemTypeLabels[ItemTypes.APPLICATION]      = 'Application';
ItemTypeLabels[ItemTypes.TOPIC]            = 'Topic';
ItemTypeLabels[ItemTypes.WEBSITE]          = 'WebSite';
ItemTypeLabels[ItemTypes.ORGANIZATION]     = "Organization";
ItemTypeLabels[ItemTypes.CONTACT]          = "Contact";
ItemTypeLabels[ItemTypes.PERSON]           = "Person";
ItemTypeLabels[ItemTypes.CONCEPT]          = "Concept";
ItemTypeLabels[ItemTypes.CONCEPT_SCHEME]   = "Concept Scheme";
ItemTypeLabels[ItemTypes.STANDARD]         = 'Standard';
ItemTypeLabels[ItemTypes.RIGHTS_STATEMENT] = 'Rights Statement';



export {
    ItemTypes as default,
    ItemTypes,
    ItemTypeLabels
};
