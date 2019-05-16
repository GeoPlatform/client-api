

export interface Item {
    id : string;
    type : string;
    uri ?: string;
    title : string;
    label ?: string;
    description ?: string;
    createdBy ?: string;
    lastModifiedBy ?: string;
    created ?: number;
    modified ?: number;
    _modified ?: number;
    resourceTypes ?: string[];

    [propName: string]: any;
}

export interface Asset extends Item {
    themes ?: Concept[];
    publishers ?: Organization[];
    contributors ?: Organization[];
    contacts ?: Contact[];
    assets ?: Asset[];
    classifiers ?: any;
    href ?: string;
    landingPage ?: string;
    thumbnail ?: {
        url ?: string;
        contentData ?: string;
        width ?: string|number;
        height ?: string|number;
        mimeType ?: string;
    };
}


export interface Dataset extends Asset {
    distributions ?: any[];
}
export interface Service extends Asset {
    serviceType : ServiceTypeStandard;
    serviceTypeVersions ?: string[];
    href : string;
}
export interface Layer extends Asset {
    layerName ?: string;
    layerType ?: string;
    distributions ?: any[];
    minScale ?: number;
    maxScale ?: number;
    supportedCRS ?: string[];
    supportedFormats ?: string[];
}
export interface Map extends Asset {
    baseLayer ?: Layer;
    layers ?: {
        layer : Layer;
        visibility ?: boolean;
        opacity ?: number;
    }[];
    annotations ?: any;
}
export interface Gallery extends Asset {
    items ?: {
        asset : Item;
        assetId : string;
        assetType : string;
    }[];
}

export interface Community extends Asset {
    members ?: any[];
}

export interface Topic extends Asset {
    subTopicOf ?: Topic;
}

export interface Application extends Asset {

}

export interface WebSite extends Asset {

}

export interface Organization extends Item {
    orgName : string;
    subOrganizationOf: Organization;
}
export interface Contact extends Item {
    fullName ?: string;
    orgName ?: string;
    positionTitle ?: string;
    tel ?: number|string;
    email ?: string;
    fax ?: number|string;
    address: any;
}
export interface ConceptScheme extends Item { }
export interface Concept extends Item {
    scheme ?: ConceptScheme;
    prefLabel ?: string;
}



export interface SearchResults {
    totalResults : number;
    results : Item[];
    facets ?: any[];
}


export interface ServiceTypeStandard {
    uri : string;
    label : string;
    resourceType : any;
    availableVersions ?: string[];
}
