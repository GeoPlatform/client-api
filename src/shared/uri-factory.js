
import ItemTypes from './types';



const URI_BASE = 'http://www.geoplatform.gov';

const ESRI_TYPES = [
    "http://www.geoplatform.gov/spec/esri-feature-rest",
    "http://www.geoplatform.gov/spec/esri-image-rest",
    "http://www.geoplatform.gov/spec/esri-map-rest",
    "http://www.geoplatform.gov/spec/esri-tile-rest"
];




function formatReference(ref) {
    if(ref === null) return '';
    if(typeof(ref) === 'string')
        return ref.toLowerCase().replace(/\s/g,'');
    else if(typeof(ref) === 'object') {
        var result = '';
        for(var prop in ref) {
            if(ref.hasOwnProperty(prop)) {
                var value = ref[prop];
                if(value !== null && typeof(value) !== 'undefined') {
                    //TODO catch non-string-able values
                    result += (value+'').toLowerCase().replace(/\s/g,'');
                }
            }
        }
        return result;
    }
    return '';
}

/**
 * Adjusts service access url to ignore certain patterns that can affect
 * how URI uniqueness is.
 * @param {object} service - GP Service instance
 * @return {string} access url adjusted for URI generation needs
 */
function fixServiceHref(service) {
    Utils.stripLayerFromServiceHref(service);
    let url = service.accessURL || service.href;
    if(!url || !url.length) return null;

    //ensure case sensitivity is not an issue
    // and that any surrounding whitespace is ignored
    url = (url + '').trim().toLowerCase();

    url = url.replace(/http(s)?:\/\//,'');    //ignore protocol for URI purposes

    url = url.replace(/&?request=[A-Za-z]+/i,'')
             .replace(/&?service=(WMS|WFS|WCS|CSW)/i,'')
             .replace(/&?version=[0-9\.]*/i,'')
             .replace(/&?layers=[A-Za-z0-9\-\:_,]*/i, '')
             .replace(/&?srs=[A-Za-z0-9\:]*/i, '')
             .replace(/&?crs=[A-Za-z0-9\:]*/i, '')
             .replace(/&?format=[A-Za-z\/]*/i, '')
             .replace(/&?bbox=[0-9,\.]*/i, '');

    let lastChar = url[url.length-1];
    if( '/' === lastChar || '?' === lastChar) { //ignore empty querystring or trailing slashes
        url = url.substring(0, url.length-1);
    }
    return url;
}


/**
 * ESRI services sometimes have layer information baked into their URL
 * which needs to be removed before the service can be used.
 * @param service - GP Service object
 */
function stripLayerFromServiceHref(service) {

    if(!service) return;
    let type = service.serviceType || service.conformsTo;
    if(!type) return;

    //if ESRI service, make sure it doesn't have a layer id on the href
    if( ESRI_TYPES.indexOf(type.uri) >= 0 ) {

        let href = service.href || service.accessURL;
        let matches = href.match(/(Map|Feature|Image)(Server\/\d+)/i);
        if(matches && matches.length > 2) {
            // 0 < full string match (ie, 'MapServer/1')
            // 1 < server type match (ie, 'Map' or 'Feature')
            // 2 < bit we care about (ie, 'Server/1')
            href = href.replace(matches[2], 'Server/');

            if(service.href) service.href = href;
            if(service.accessURL) service.accessURL = href;
        }
    }
}




/**
 * @see https://geoplatform.atlassian.net/wiki/display/DT/Common+Object+Identifier+Scheme
 */
const URIFactory = {

    factories : {},

    register : function (type, factory) {
        this.factories[type] = factory;
    },

    create : function(object, md5Fn) {
        if(!object || !object.type) return null;
        if( typeof(md5Fn) !== 'function' ) {
            throw new Error("Must specify a MD5 function when using URIFactory");
        }
        let factory = this.factories[object.type];
        return factory(object, md5Fn);
    }
};




URIFactory.register(ItemTypes.DATASET, function(dataset, md5) {
    let pubName = (dataset.publisher||dataset.publishers||[])
        .map( pub => { return pub.label||""; }).join('');
    let ref = formatReference({
        title: dataset.title,
        pub: pubName
    });
    return URI_BASE + '/id/dataset/' + md5(ref);
});

URIFactory.register(ItemTypes.SERVICE, function(service, md5) {
    let url = fixServiceHref(service);
    let ref = formatReference(url);
    return URI_BASE + '/id/service/' + md5(ref);
});

URIFactory.register(ItemTypes.LAYER, function(layer, md5) {

    let svcUrl = '';
    let services = layer.servicedBy || layer.services;
    if(services && services.length)
        svcUrl = services[0].accessURL || services[0].href || '';
    let lyrUrl = layer.accessURL || layer.href || '';
    let lyrName = layer.layerName || '';

    //not recommended based upon following example:
    //  http://services.nationalmap.gov/.../MapServer/WMSServer?request=GetCapabilities&service=WMS/layer/1
    // return url + '/layer/' + layer.layerName;

    let args = svcUrl + lyrName + lyrUrl;
    if(!args.length) return null;   //nothing was provided

    //ALTERNATE URI PATTERN
    let ref = formatReference(args);
    return URI_BASE + '/id/layer/' + md5(ref);

});

/**
 * Uses the map title, createdBy, and all third-party identifiers associated with the map
 * @param {object} map - GP Map object
 * @return {string} uri unique to this object
 */
URIFactory.register(ItemTypes.MAP, function(map, md5) {
    let author = map.createdBy || map._createdBy || "";
    let identifiers = (map.identifiers || map.identifier || []).join('');
    let ref = formatReference({title: map.title, author: author, identifiers: identifiers});
    return URI_BASE + '/id/map/' + md5(ref);
});

URIFactory.register(ItemTypes.GALLERY, function(gallery, md5) {
    let author = gallery.createdBy || gallery._createdBy || "";
    let ref = formatReference({title: gallery.title, author: author});
    return URI_BASE + '/id/gallery/' + md5(ref);
});

URIFactory.register(ItemTypes.COMMUNITY, function(community, md5) {
    let ref = formatReference({title: community.title});
    return URI_BASE + '/id/community/' + md5(ref);
});

URIFactory.register(ItemTypes.ORGANIZATION, function(org, md5) {
    let ref = formatReference(org.label || org.name);
    return URI_BASE + '/id/organization/' + md5(ref);
});

URIFactory.register(ItemTypes.PERSON, function(person, md5) {
    let ref = formatReference(person.name);
    return URI_BASE + '/id/person/' + md5(ref);
});

URIFactory.register(ItemTypes.VCARD, function(vcard, md5) {
    let ref = {};
    if(vcard.email || vcard.hasEmail)
        ref.email = vcard.email || vcard.hasEmail; //email
    if(vcard.tel)
        ref.tel = vcard.tel; //tel
    if(vcard.orgName || vcard['organization-name'])
        ref.orgName = vcard.orgName || vcard['organization-name']; //orgName
    if(vcard.positionTitle)
        ref.positionTitle = vcard.positionTitle; //positionTitle
    ref = formatReference(ref);
    return URI_BASE + '/id/contact/' + md5(ref);
});

URIFactory.register(ItemTypes.CONCEPT, function(object, md5) {
    let scheme = object.inScheme || object.scheme;
    let schemeLabel = scheme ? (scheme.label || scheme.prefLabel) : '';
    let schemeRef = formatReference(schemeLabel);
    let ref = formatReference( object.label || object.prefLabel );
    return URI_BASE + '/id/metadata-codelists/' + md5(schemeRef) + '/' + md5(ref);
});

URIFactory.register(ItemTypes.CONCEPT_SCHEME, function(object, md5) {
    let ref = formatReference(object.label || object.prefLabel);
    return URI_BASE + '/id/metadata-codelists/' + md5(ref);
});


URIFactory.register(ItemTypes.APPLICATION, function(object, md5) {
    if(!object || !object.title) return null;
    let author = object.createdBy || object._createdBy || "";
    let ref = formatReference({title: object.title, author: author});
    return URI_BASE + '/id/application/' + md5(ref);
});

URIFactory.register(ItemTypes.TOPIC, function(object, md5) {
    if(!object || !object.title) return null;
    let author = object.createdBy || object._createdBy || "";
    let ref = formatReference({title: object.title, author: author});
    return URI_BASE + '/id/topic/' + md5(ref);
});

URIFactory.register(ItemTypes.WEBSITE, function(item, md5) {
    if(!item || !item.landingPage) return null;
    let ref = formatReference(item.landingPage);
    return URI_BASE + '/id/website/' + md5(ref);
});

URIFactory.register(ItemTypes.IMAGE_PRODUCT, function(item, md5) {
    if(!item.productId) return null;
    let ref = formatReference(item.productId);
    return URI_BASE + '/id/product/' + md5(ref);
});

URIFactory.register(ItemTypes.DOCUMENT, function() { return null; });


function factoryFn(md5Fn) {
    if( typeof(md5Fn) !== 'function' ) {
        throw new Error("Must specify a MD5 function when using URIFactory");
    }
    return function(object) {
        return URIFactory.create(object, md5Fn);
    };
}



export {
    factoryFn as default,
    factoryFn as URIFactory
};
