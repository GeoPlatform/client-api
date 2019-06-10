/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import ItemTypes from './types';
/** @type {?} */
const URI_BASE = 'http://www.geoplatform.gov';
/** @type {?} */
const ESRI_TYPES = [
    "http://www.geoplatform.gov/spec/esri-feature-rest",
    "http://www.geoplatform.gov/spec/esri-image-rest",
    "http://www.geoplatform.gov/spec/esri-map-rest",
    "http://www.geoplatform.gov/spec/esri-tile-rest"
];
/**
 * @param {?} ref
 * @return {?}
 */
function formatReference(ref) {
    if (ref === null)
        return '';
    if (typeof (ref) === 'string')
        return ref.toLowerCase().replace(/\s/g, '');
    else if (typeof (ref) === 'object') {
        /** @type {?} */
        var result = '';
        for (var prop in ref) {
            if (ref.hasOwnProperty(prop)) {
                /** @type {?} */
                var value = ref[prop];
                if (value !== null && typeof (value) !== 'undefined') {
                    //TODO catch non-string-able values
                    result += (value + '').toLowerCase().replace(/\s/g, '');
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
 * @param {?} service - GP Service instance
 * @return {?} access url adjusted for URI generation needs
 */
function fixServiceHref(service) {
    stripLayerFromServiceHref(service);
    /** @type {?} */
    let url = service.accessURL || service.href;
    if (!url || !url.length)
        return null;
    //ensure case sensitivity is not an issue
    // and that any surrounding whitespace is ignored
    url = (url + '').trim().toLowerCase();
    url = url.replace(/http(s)?:\/\//, ''); //ignore protocol for URI purposes
    url = url.replace(/&?request=[A-Za-z]+/i, '')
        .replace(/&?service=(WMS|WFS|WCS|CSW)/i, '')
        .replace(/&?version=[0-9\.]*/i, '')
        .replace(/&?layers=[A-Za-z0-9\-\:_,]*/i, '')
        .replace(/&?srs=[A-Za-z0-9\:]*/i, '')
        .replace(/&?crs=[A-Za-z0-9\:]*/i, '')
        .replace(/&?format=[A-Za-z\/]*/i, '')
        .replace(/&?bbox=[0-9,\.]*/i, '');
    /** @type {?} */
    let lastChar = url[url.length - 1];
    if ('/' === lastChar || '?' === lastChar) { //ignore empty querystring or trailing slashes
        //ignore empty querystring or trailing slashes
        url = url.substring(0, url.length - 1);
    }
    return url;
}
/**
 * ESRI services sometimes have layer information baked into their URL
 * which needs to be removed before the service can be used.
 * @param {?} service - GP Service object
 * @return {?}
 */
function stripLayerFromServiceHref(service) {
    if (!service)
        return;
    /** @type {?} */
    let type = service.serviceType || service.conformsTo;
    if (!type)
        return;
    //if ESRI service, make sure it doesn't have a layer id on the href
    if (ESRI_TYPES.indexOf(type.uri) >= 0) {
        /** @type {?} */
        let href = service.href || service.accessURL;
        /** @type {?} */
        let matches = href.match(/(Map|Feature|Image)(Server\/\d+)/i);
        if (matches && matches.length > 2) {
            // 0 < full string match (ie, 'MapServer/1')
            // 1 < server type match (ie, 'Map' or 'Feature')
            // 2 < bit we care about (ie, 'Server/1')
            href = href.replace(matches[2], 'Server/');
            if (service.href)
                service.href = href;
            if (service.accessURL)
                service.accessURL = href;
        }
    }
}
const ɵ0 = function (type, factory) {
    this.factories[type] = factory;
}, ɵ1 = function (object, md5Fn) {
    if (!object || !object.type)
        return null;
    if (typeof (md5Fn) !== 'function') {
        throw new Error("Must specify a MD5 function when using URIFactory");
    }
    /** @type {?} */
    let factory = this.factories[object.type];
    if (!factory)
        return null;
    return factory(object, md5Fn);
};
/** *
 * @see https://geoplatform.atlassian.net/wiki/display/DT/Common+Object+Identifier+Scheme
  @type {?} */
const URIFactory = {
    factories: {},
    register: ɵ0,
    create: ɵ1
};
URIFactory.register(ItemTypes.DATASET, function (dataset, md5) {
    /** @type {?} */
    let pubName = (dataset.publisher || dataset.publishers || [])
        .map(pub => { return pub.label || ""; }).join('');
    /** @type {?} */
    let ref = formatReference({
        title: dataset.title,
        pub: pubName
    });
    return URI_BASE + '/id/dataset/' + md5(ref);
});
URIFactory.register(ItemTypes.SERVICE, function (service, md5) {
    /** @type {?} */
    let url = fixServiceHref(service);
    /** @type {?} */
    let ref = formatReference(url);
    return URI_BASE + '/id/service/' + md5(ref);
});
URIFactory.register(ItemTypes.LAYER, function (layer, md5) {
    /** @type {?} */
    let svcUrl = '';
    /** @type {?} */
    let services = layer.servicedBy || layer.services;
    if (services && services.length)
        svcUrl = services[0].accessURL || services[0].href || '';
    /** @type {?} */
    let lyrUrl = layer.accessURL || layer.href || '';
    /** @type {?} */
    let lyrName = layer.layerName || '';
    /** @type {?} */
    let args = svcUrl + lyrName + lyrUrl;
    if (!args.length)
        return null;
    /** @type {?} */
    let ref = formatReference(args);
    return URI_BASE + '/id/layer/' + md5(ref);
});
/**
 * Uses the map title, createdBy, and all third-party identifiers associated with the map
 * @param {object} map - GP Map object
 * @return {string} uri unique to this object
 */
URIFactory.register(ItemTypes.MAP, function (map, md5) {
    /** @type {?} */
    let author = map.createdBy || map._createdBy || "";
    /** @type {?} */
    let identifiers = (map.identifiers || map.identifier || []).join('');
    /** @type {?} */
    let ref = formatReference({ title: map.title, author: author, identifiers: identifiers });
    return URI_BASE + '/id/map/' + md5(ref);
});
URIFactory.register(ItemTypes.GALLERY, function (gallery, md5) {
    /** @type {?} */
    let author = gallery.createdBy || gallery._createdBy || "";
    /** @type {?} */
    let ref = formatReference({ title: gallery.title, author: author });
    return URI_BASE + '/id/gallery/' + md5(ref);
});
URIFactory.register(ItemTypes.COMMUNITY, function (community, md5) {
    /** @type {?} */
    let ref = formatReference({ title: community.title });
    return URI_BASE + '/id/community/' + md5(ref);
});
URIFactory.register(ItemTypes.ORGANIZATION, function (org, md5) {
    /** @type {?} */
    let ref = formatReference(org.label || org.name);
    return URI_BASE + '/id/organization/' + md5(ref);
});
URIFactory.register(ItemTypes.PERSON, function (person, md5) {
    /** @type {?} */
    let ref = formatReference(person.name);
    return URI_BASE + '/id/person/' + md5(ref);
});
URIFactory.register(ItemTypes.CONTACT, function (vcard, md5) {
    /** @type {?} */
    let ref = {};
    if (vcard.email || vcard.hasEmail)
        ref.email = vcard.email || vcard.hasEmail; //email
    if (vcard.tel)
        ref.tel = vcard.tel; //tel
    if (vcard.orgName || vcard['organization-name'])
        ref.orgName = vcard.orgName || vcard['organization-name']; //orgName
    if (vcard.positionTitle)
        ref.positionTitle = vcard.positionTitle; //positionTitle
    ref = formatReference(ref);
    return URI_BASE + '/id/contact/' + md5(ref);
});
URIFactory.register(ItemTypes.CONCEPT, function (object, md5) {
    /** @type {?} */
    let scheme = object.inScheme || object.scheme;
    /** @type {?} */
    let schemeLabel = scheme ? (scheme.label || scheme.prefLabel) : '';
    /** @type {?} */
    let schemeRef = formatReference(schemeLabel);
    /** @type {?} */
    let ref = formatReference(object.label || object.prefLabel);
    return URI_BASE + '/id/metadata-codelists/' + md5(schemeRef) + '/' + md5(ref);
});
URIFactory.register(ItemTypes.CONCEPT_SCHEME, function (object, md5) {
    /** @type {?} */
    let ref = formatReference(object.label || object.prefLabel);
    return URI_BASE + '/id/metadata-codelists/' + md5(ref);
});
URIFactory.register(ItemTypes.APPLICATION, function (object, md5) {
    if (!object || !object.title)
        return null;
    /** @type {?} */
    let author = object.createdBy || object._createdBy || "";
    /** @type {?} */
    let ref = formatReference({ title: object.title, author: author });
    return URI_BASE + '/id/application/' + md5(ref);
});
URIFactory.register(ItemTypes.TOPIC, function (object, md5) {
    if (!object || !object.title)
        return null;
    /** @type {?} */
    let author = object.createdBy || object._createdBy || "";
    /** @type {?} */
    let ref = formatReference({ title: object.title, author: author });
    return URI_BASE + '/id/topic/' + md5(ref);
});
URIFactory.register(ItemTypes.WEBSITE, function (item, md5) {
    if (!item || !item.landingPage)
        return null;
    /** @type {?} */
    let ref = formatReference(item.landingPage);
    return URI_BASE + '/id/website/' + md5(ref);
});
URIFactory.register(ItemTypes.IMAGE_PRODUCT, function (item, md5) {
    if (!item.productId)
        return null;
    /** @type {?} */
    let ref = formatReference(item.productId);
    return URI_BASE + '/id/product/' + md5(ref);
});
/**
 * @param {?} md5Fn
 * @return {?}
 */
function factoryFn(md5Fn) {
    if (typeof (md5Fn) !== 'function') {
        throw new Error("Must specify a MD5 function when using URIFactory");
    }
    return function (object) {
        return URIFactory.create(object, md5Fn);
    };
}
export { factoryFn as default, factoryFn as URIFactory };
export { ɵ0, ɵ1 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJpLWZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL3VyaS1mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7O0FBSWhDLE1BQU0sUUFBUSxHQUFHLDRCQUE0QixDQUFDOztBQUU5QyxNQUFNLFVBQVUsR0FBRztJQUNmLG1EQUFtRDtJQUNuRCxpREFBaUQ7SUFDakQsK0NBQStDO0lBQy9DLGdEQUFnRDtDQUNuRCxDQUFDOzs7OztBQUtGLHlCQUEwQixHQUFTO0lBQy9CLElBQUcsR0FBRyxLQUFLLElBQUk7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUMzQixJQUFHLE9BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRO1FBQ3ZCLE9BQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLENBQUM7U0FDMUMsSUFBRyxPQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFOztRQUM5QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsS0FBSSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7WUFDakIsSUFBRyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFOztnQkFDekIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixJQUFHLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsRUFBRTs7b0JBRWhELE1BQU0sSUFBSSxDQUFDLEtBQUssR0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUN4RDthQUNKO1NBQ0o7UUFDRCxPQUFPLE1BQU0sQ0FBQztLQUNqQjtJQUNELE9BQU8sRUFBRSxDQUFDO0NBQ2I7Ozs7Ozs7QUFRRCx3QkFBd0IsT0FBYTtJQUNqQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7SUFDbkMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQzVDLElBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTTtRQUFFLE9BQU8sSUFBSSxDQUFDOzs7SUFJcEMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRXRDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBQyxFQUFFLENBQUMsQ0FBQztJQUV0QyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBQyxFQUFFLENBQUM7U0FDbEMsT0FBTyxDQUFDLDhCQUE4QixFQUFDLEVBQUUsQ0FBQztTQUMxQyxPQUFPLENBQUMscUJBQXFCLEVBQUMsRUFBRSxDQUFDO1NBQ2pDLE9BQU8sQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUM7U0FDM0MsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQztTQUNwQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDO1NBQ3BDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLENBQUM7U0FDcEMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDOztJQUUzQyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxJQUFJLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxLQUFLLFFBQVEsRUFBRSxFQUFFLDhDQUE4Qzs7UUFDdEYsR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEM7SUFDRCxPQUFPLEdBQUcsQ0FBQztDQUNkOzs7Ozs7O0FBUUQsbUNBQW1DLE9BQWE7SUFFNUMsSUFBRyxDQUFDLE9BQU87UUFBRSxPQUFPOztJQUNwQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDckQsSUFBRyxDQUFDLElBQUk7UUFBRSxPQUFPOztJQUdqQixJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRzs7UUFFcEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDOztRQUM3QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDOUQsSUFBRyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Ozs7WUFJOUIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRTNDLElBQUcsT0FBTyxDQUFDLElBQUk7Z0JBQUUsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDckMsSUFBRyxPQUFPLENBQUMsU0FBUztnQkFBRSxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUNsRDtLQUNKO0NBQ0o7V0FZYyxVQUFVLElBQWEsRUFBRSxPQUFrQjtJQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztDQUNsQyxPQUVRLFVBQVMsTUFBWSxFQUFFLEtBQWdCO0lBQzVDLElBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3hDLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVUsRUFBRztRQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7S0FDeEU7O0lBQ0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsSUFBRyxDQUFDLE9BQU87UUFBRSxPQUFPLElBQUksQ0FBQztJQUN6QixPQUFPLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDakM7Ozs7QUFoQkwsTUFBTSxVQUFVLEdBQUc7SUFFZixTQUFTLEVBQUcsRUFBRTtJQUVkLFFBQVEsSUFFUDtJQUVELE1BQU0sSUFRTDtDQUNKLENBQUM7QUFLRixVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBUyxPQUFhLEVBQUUsR0FBYzs7SUFDekUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFFLE9BQU8sQ0FBQyxVQUFVLElBQUUsRUFBRSxDQUFDO1NBQ3BELEdBQUcsQ0FBRSxHQUFHLENBQUMsRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLEtBQUssSUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztJQUNyRCxJQUFJLEdBQUcsR0FBUyxlQUFlLENBQUM7UUFDNUIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1FBQ3BCLEdBQUcsRUFBRSxPQUFPO0tBQ2YsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxRQUFRLEdBQUcsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUMvQyxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBUyxPQUFhLEVBQUUsR0FBYzs7SUFDekUsSUFBSSxHQUFHLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztJQUNsQyxJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsT0FBTyxRQUFRLEdBQUcsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUMvQyxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsVUFBUyxLQUFXLEVBQUUsR0FBYzs7SUFFckUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOztJQUNoQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDbEQsSUFBRyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU07UUFDMUIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7O0lBQzdELElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7O0lBQ2pELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDOztJQU1wQyxJQUFJLElBQUksR0FBRyxNQUFNLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUNyQyxJQUFHLENBQUMsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFPLElBQUksQ0FBQzs7SUFHN0IsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLE9BQU8sUUFBUSxHQUFHLFlBQVksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FFN0MsQ0FBQyxDQUFDOzs7Ozs7QUFPSCxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsVUFBUyxHQUFTLEVBQUUsR0FBYzs7SUFDakUsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQzs7SUFDbkQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztJQUNyRSxJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsRUFBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO0lBQ3hGLE9BQU8sUUFBUSxHQUFHLFVBQVUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDM0MsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVMsT0FBYSxFQUFFLEdBQWM7O0lBQ3pFLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7O0lBQzNELElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxFQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO0lBQ2xFLE9BQU8sUUFBUSxHQUFHLGNBQWMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDL0MsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVMsU0FBZSxFQUFFLEdBQWM7O0lBQzdFLElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxFQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUNwRCxPQUFPLFFBQVEsR0FBRyxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDakQsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLFVBQVMsR0FBUyxFQUFFLEdBQWM7O0lBQzFFLElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxPQUFPLFFBQVEsR0FBRyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDcEQsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFVBQVMsTUFBWSxFQUFFLEdBQWM7O0lBQ3ZFLElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsT0FBTyxRQUFRLEdBQUcsYUFBYSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUM5QyxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBUyxLQUFXLEVBQUUsR0FBYzs7SUFDdkUsSUFBSSxHQUFHLEdBQVMsRUFBRSxDQUFDO0lBQ25CLElBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUTtRQUM1QixHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUM5QyxJQUFHLEtBQUssQ0FBQyxHQUFHO1FBQ1IsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3hCLElBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUM7UUFDMUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzlELElBQUcsS0FBSyxDQUFDLGFBQWE7UUFDbEIsR0FBRyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO0lBQzVDLEdBQUcsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsT0FBTyxRQUFRLEdBQUcsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUMvQyxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBUyxNQUFZLEVBQUUsR0FBYzs7SUFDeEUsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDOztJQUM5QyxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7SUFDbkUsSUFBSSxTQUFTLEdBQUcsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztJQUM3QyxJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUUsTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFFLENBQUM7SUFDOUQsT0FBTyxRQUFRLEdBQUcseUJBQXlCLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDakYsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLFVBQVMsTUFBWSxFQUFFLEdBQWM7O0lBQy9FLElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1RCxPQUFPLFFBQVEsR0FBRyx5QkFBeUIsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDMUQsQ0FBQyxDQUFDO0FBR0gsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLFVBQVMsTUFBWSxFQUFFLEdBQWM7SUFDNUUsSUFBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO1FBQUUsT0FBTyxJQUFJLENBQUM7O0lBQ3pDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7O0lBQ3pELElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO0lBQ2pFLE9BQU8sUUFBUSxHQUFHLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNuRCxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsVUFBUyxNQUFZLEVBQUUsR0FBYztJQUN0RSxJQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7UUFBRSxPQUFPLElBQUksQ0FBQzs7SUFDekMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQzs7SUFDekQsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7SUFDakUsT0FBTyxRQUFRLEdBQUcsWUFBWSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUM3QyxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBUyxJQUFVLEVBQUUsR0FBYztJQUN0RSxJQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7UUFBRSxPQUFPLElBQUksQ0FBQzs7SUFDM0MsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1QyxPQUFPLFFBQVEsR0FBRyxjQUFjLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQy9DLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxVQUFTLElBQVUsRUFBRSxHQUFjO0lBQzVFLElBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUztRQUFFLE9BQU8sSUFBSSxDQUFDOztJQUNoQyxJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFDLE9BQU8sUUFBUSxHQUFHLGNBQWMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDL0MsQ0FBQyxDQUFDOzs7OztBQUlILG1CQUFtQixLQUFLO0lBQ3BCLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVUsRUFBRztRQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7S0FDeEU7SUFDRCxPQUFPLFVBQVMsTUFBTTtRQUNsQixPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzNDLENBQUM7Q0FDTDtBQUlELE9BQU8sRUFDSCxTQUFTLElBQUksT0FBTyxFQUNwQixTQUFTLElBQUksVUFBVSxFQUMxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgSXRlbVR5cGVzIGZyb20gJy4vdHlwZXMnO1xuXG5cblxuY29uc3QgVVJJX0JBU0UgPSAnaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3YnO1xuXG5jb25zdCBFU1JJX1RZUEVTID0gW1xuICAgIFwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3Yvc3BlYy9lc3JpLWZlYXR1cmUtcmVzdFwiLFxuICAgIFwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3Yvc3BlYy9lc3JpLWltYWdlLXJlc3RcIixcbiAgICBcImh0dHA6Ly93d3cuZ2VvcGxhdGZvcm0uZ292L3NwZWMvZXNyaS1tYXAtcmVzdFwiLFxuICAgIFwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3Yvc3BlYy9lc3JpLXRpbGUtcmVzdFwiXG5dO1xuXG5cblxuXG5mdW5jdGlvbiBmb3JtYXRSZWZlcmVuY2UoIHJlZiA6IGFueSApIDogYW55IHtcbiAgICBpZihyZWYgPT09IG51bGwpIHJldHVybiAnJztcbiAgICBpZih0eXBlb2YocmVmKSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHJldHVybiByZWYudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMvZywnJyk7XG4gICAgZWxzZSBpZih0eXBlb2YocmVmKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgICAgICBmb3IodmFyIHByb3AgaW4gcmVmKSB7XG4gICAgICAgICAgICBpZihyZWYuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSByZWZbcHJvcF07XG4gICAgICAgICAgICAgICAgaWYodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mKHZhbHVlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPIGNhdGNoIG5vbi1zdHJpbmctYWJsZSB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9ICh2YWx1ZSsnJykudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMvZywnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBBZGp1c3RzIHNlcnZpY2UgYWNjZXNzIHVybCB0byBpZ25vcmUgY2VydGFpbiBwYXR0ZXJucyB0aGF0IGNhbiBhZmZlY3RcbiAqIGhvdyBVUkkgdW5pcXVlbmVzcyBpcy5cbiAqIEBwYXJhbSBzZXJ2aWNlIC0gR1AgU2VydmljZSBpbnN0YW5jZVxuICogQHJldHVybiBhY2Nlc3MgdXJsIGFkanVzdGVkIGZvciBVUkkgZ2VuZXJhdGlvbiBuZWVkc1xuICovXG5mdW5jdGlvbiBmaXhTZXJ2aWNlSHJlZihzZXJ2aWNlIDogYW55KSA6IHN0cmluZyB7XG4gICAgc3RyaXBMYXllckZyb21TZXJ2aWNlSHJlZihzZXJ2aWNlKTtcbiAgICBsZXQgdXJsID0gc2VydmljZS5hY2Nlc3NVUkwgfHwgc2VydmljZS5ocmVmO1xuICAgIGlmKCF1cmwgfHwgIXVybC5sZW5ndGgpIHJldHVybiBudWxsO1xuXG4gICAgLy9lbnN1cmUgY2FzZSBzZW5zaXRpdml0eSBpcyBub3QgYW4gaXNzdWVcbiAgICAvLyBhbmQgdGhhdCBhbnkgc3Vycm91bmRpbmcgd2hpdGVzcGFjZSBpcyBpZ25vcmVkXG4gICAgdXJsID0gKHVybCArICcnKS50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICAgIHVybCA9IHVybC5yZXBsYWNlKC9odHRwKHMpPzpcXC9cXC8vLCcnKTsgICAgLy9pZ25vcmUgcHJvdG9jb2wgZm9yIFVSSSBwdXJwb3Nlc1xuXG4gICAgdXJsID0gdXJsLnJlcGxhY2UoLyY/cmVxdWVzdD1bQS1aYS16XSsvaSwnJylcbiAgICAgICAgICAgICAucmVwbGFjZSgvJj9zZXJ2aWNlPShXTVN8V0ZTfFdDU3xDU1cpL2ksJycpXG4gICAgICAgICAgICAgLnJlcGxhY2UoLyY/dmVyc2lvbj1bMC05XFwuXSovaSwnJylcbiAgICAgICAgICAgICAucmVwbGFjZSgvJj9sYXllcnM9W0EtWmEtejAtOVxcLVxcOl8sXSovaSwgJycpXG4gICAgICAgICAgICAgLnJlcGxhY2UoLyY/c3JzPVtBLVphLXowLTlcXDpdKi9pLCAnJylcbiAgICAgICAgICAgICAucmVwbGFjZSgvJj9jcnM9W0EtWmEtejAtOVxcOl0qL2ksICcnKVxuICAgICAgICAgICAgIC5yZXBsYWNlKC8mP2Zvcm1hdD1bQS1aYS16XFwvXSovaSwgJycpXG4gICAgICAgICAgICAgLnJlcGxhY2UoLyY/YmJveD1bMC05LFxcLl0qL2ksICcnKTtcblxuICAgIGxldCBsYXN0Q2hhciA9IHVybFt1cmwubGVuZ3RoLTFdO1xuICAgIGlmKCAnLycgPT09IGxhc3RDaGFyIHx8ICc/JyA9PT0gbGFzdENoYXIpIHsgLy9pZ25vcmUgZW1wdHkgcXVlcnlzdHJpbmcgb3IgdHJhaWxpbmcgc2xhc2hlc1xuICAgICAgICB1cmwgPSB1cmwuc3Vic3RyaW5nKDAsIHVybC5sZW5ndGgtMSk7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG59XG5cblxuLyoqXG4gKiBFU1JJIHNlcnZpY2VzIHNvbWV0aW1lcyBoYXZlIGxheWVyIGluZm9ybWF0aW9uIGJha2VkIGludG8gdGhlaXIgVVJMXG4gKiB3aGljaCBuZWVkcyB0byBiZSByZW1vdmVkIGJlZm9yZSB0aGUgc2VydmljZSBjYW4gYmUgdXNlZC5cbiAqIEBwYXJhbSBzZXJ2aWNlIC0gR1AgU2VydmljZSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gc3RyaXBMYXllckZyb21TZXJ2aWNlSHJlZihzZXJ2aWNlIDogYW55KSA6IHN0cmluZyB7XG5cbiAgICBpZighc2VydmljZSkgcmV0dXJuO1xuICAgIGxldCB0eXBlID0gc2VydmljZS5zZXJ2aWNlVHlwZSB8fCBzZXJ2aWNlLmNvbmZvcm1zVG87XG4gICAgaWYoIXR5cGUpIHJldHVybjtcblxuICAgIC8vaWYgRVNSSSBzZXJ2aWNlLCBtYWtlIHN1cmUgaXQgZG9lc24ndCBoYXZlIGEgbGF5ZXIgaWQgb24gdGhlIGhyZWZcbiAgICBpZiggRVNSSV9UWVBFUy5pbmRleE9mKHR5cGUudXJpKSA+PSAwICkge1xuXG4gICAgICAgIGxldCBocmVmID0gc2VydmljZS5ocmVmIHx8IHNlcnZpY2UuYWNjZXNzVVJMO1xuICAgICAgICBsZXQgbWF0Y2hlcyA9IGhyZWYubWF0Y2goLyhNYXB8RmVhdHVyZXxJbWFnZSkoU2VydmVyXFwvXFxkKykvaSk7XG4gICAgICAgIGlmKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAvLyAwIDwgZnVsbCBzdHJpbmcgbWF0Y2ggKGllLCAnTWFwU2VydmVyLzEnKVxuICAgICAgICAgICAgLy8gMSA8IHNlcnZlciB0eXBlIG1hdGNoIChpZSwgJ01hcCcgb3IgJ0ZlYXR1cmUnKVxuICAgICAgICAgICAgLy8gMiA8IGJpdCB3ZSBjYXJlIGFib3V0IChpZSwgJ1NlcnZlci8xJylcbiAgICAgICAgICAgIGhyZWYgPSBocmVmLnJlcGxhY2UobWF0Y2hlc1syXSwgJ1NlcnZlci8nKTtcblxuICAgICAgICAgICAgaWYoc2VydmljZS5ocmVmKSBzZXJ2aWNlLmhyZWYgPSBocmVmO1xuICAgICAgICAgICAgaWYoc2VydmljZS5hY2Nlc3NVUkwpIHNlcnZpY2UuYWNjZXNzVVJMID0gaHJlZjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cblxuLyoqXG4gKiBAc2VlIGh0dHBzOi8vZ2VvcGxhdGZvcm0uYXRsYXNzaWFuLm5ldC93aWtpL2Rpc3BsYXkvRFQvQ29tbW9uK09iamVjdCtJZGVudGlmaWVyK1NjaGVtZVxuICovXG5jb25zdCBVUklGYWN0b3J5ID0ge1xuXG4gICAgZmFjdG9yaWVzIDoge30sXG5cbiAgICByZWdpc3RlciA6IGZ1bmN0aW9uICh0eXBlIDogc3RyaW5nLCBmYWN0b3J5IDogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5mYWN0b3JpZXNbdHlwZV0gPSBmYWN0b3J5O1xuICAgIH0sXG5cbiAgICBjcmVhdGUgOiBmdW5jdGlvbihvYmplY3QgOiBhbnksIG1kNUZuIDogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYoIW9iamVjdCB8fCAhb2JqZWN0LnR5cGUpIHJldHVybiBudWxsO1xuICAgICAgICBpZiggdHlwZW9mKG1kNUZuKSAhPT0gJ2Z1bmN0aW9uJyApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3Qgc3BlY2lmeSBhIE1ENSBmdW5jdGlvbiB3aGVuIHVzaW5nIFVSSUZhY3RvcnlcIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZhY3RvcnkgPSB0aGlzLmZhY3Rvcmllc1tvYmplY3QudHlwZV07XG4gICAgICAgIGlmKCFmYWN0b3J5KSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIGZhY3Rvcnkob2JqZWN0LCBtZDVGbik7XG4gICAgfVxufTtcblxuXG5cblxuVVJJRmFjdG9yeS5yZWdpc3RlcihJdGVtVHlwZXMuREFUQVNFVCwgZnVuY3Rpb24oZGF0YXNldCA6IGFueSwgbWQ1IDogRnVuY3Rpb24pIHtcbiAgICBsZXQgcHViTmFtZSA9IChkYXRhc2V0LnB1Ymxpc2hlcnx8ZGF0YXNldC5wdWJsaXNoZXJzfHxbXSlcbiAgICAgICAgLm1hcCggcHViID0+IHsgcmV0dXJuIHB1Yi5sYWJlbHx8XCJcIjsgfSkuam9pbignJyk7XG4gICAgbGV0IHJlZiA6IGFueSA9IGZvcm1hdFJlZmVyZW5jZSh7XG4gICAgICAgIHRpdGxlOiBkYXRhc2V0LnRpdGxlLFxuICAgICAgICBwdWI6IHB1Yk5hbWVcbiAgICB9KTtcbiAgICByZXR1cm4gVVJJX0JBU0UgKyAnL2lkL2RhdGFzZXQvJyArIG1kNShyZWYpO1xufSk7XG5cblVSSUZhY3RvcnkucmVnaXN0ZXIoSXRlbVR5cGVzLlNFUlZJQ0UsIGZ1bmN0aW9uKHNlcnZpY2UgOiBhbnksIG1kNSA6IEZ1bmN0aW9uKSB7XG4gICAgbGV0IHVybCA9IGZpeFNlcnZpY2VIcmVmKHNlcnZpY2UpO1xuICAgIGxldCByZWYgPSBmb3JtYXRSZWZlcmVuY2UodXJsKTtcbiAgICByZXR1cm4gVVJJX0JBU0UgKyAnL2lkL3NlcnZpY2UvJyArIG1kNShyZWYpO1xufSk7XG5cblVSSUZhY3RvcnkucmVnaXN0ZXIoSXRlbVR5cGVzLkxBWUVSLCBmdW5jdGlvbihsYXllciA6IGFueSwgbWQ1IDogRnVuY3Rpb24pIHtcblxuICAgIGxldCBzdmNVcmwgPSAnJztcbiAgICBsZXQgc2VydmljZXMgPSBsYXllci5zZXJ2aWNlZEJ5IHx8IGxheWVyLnNlcnZpY2VzO1xuICAgIGlmKHNlcnZpY2VzICYmIHNlcnZpY2VzLmxlbmd0aClcbiAgICAgICAgc3ZjVXJsID0gc2VydmljZXNbMF0uYWNjZXNzVVJMIHx8IHNlcnZpY2VzWzBdLmhyZWYgfHwgJyc7XG4gICAgbGV0IGx5clVybCA9IGxheWVyLmFjY2Vzc1VSTCB8fCBsYXllci5ocmVmIHx8ICcnO1xuICAgIGxldCBseXJOYW1lID0gbGF5ZXIubGF5ZXJOYW1lIHx8ICcnO1xuXG4gICAgLy9ub3QgcmVjb21tZW5kZWQgYmFzZWQgdXBvbiBmb2xsb3dpbmcgZXhhbXBsZTpcbiAgICAvLyAgaHR0cDovL3NlcnZpY2VzLm5hdGlvbmFsbWFwLmdvdi8uLi4vTWFwU2VydmVyL1dNU1NlcnZlcj9yZXF1ZXN0PUdldENhcGFiaWxpdGllcyZzZXJ2aWNlPVdNUy9sYXllci8xXG4gICAgLy8gcmV0dXJuIHVybCArICcvbGF5ZXIvJyArIGxheWVyLmxheWVyTmFtZTtcblxuICAgIGxldCBhcmdzID0gc3ZjVXJsICsgbHlyTmFtZSArIGx5clVybDtcbiAgICBpZighYXJncy5sZW5ndGgpIHJldHVybiBudWxsOyAgIC8vbm90aGluZyB3YXMgcHJvdmlkZWRcblxuICAgIC8vQUxURVJOQVRFIFVSSSBQQVRURVJOXG4gICAgbGV0IHJlZiA9IGZvcm1hdFJlZmVyZW5jZShhcmdzKTtcbiAgICByZXR1cm4gVVJJX0JBU0UgKyAnL2lkL2xheWVyLycgKyBtZDUocmVmKTtcblxufSk7XG5cbi8qKlxuICogVXNlcyB0aGUgbWFwIHRpdGxlLCBjcmVhdGVkQnksIGFuZCBhbGwgdGhpcmQtcGFydHkgaWRlbnRpZmllcnMgYXNzb2NpYXRlZCB3aXRoIHRoZSBtYXBcbiAqIEBwYXJhbSB7b2JqZWN0fSBtYXAgLSBHUCBNYXAgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9IHVyaSB1bmlxdWUgdG8gdGhpcyBvYmplY3RcbiAqL1xuVVJJRmFjdG9yeS5yZWdpc3RlcihJdGVtVHlwZXMuTUFQLCBmdW5jdGlvbihtYXAgOiBhbnksIG1kNSA6IEZ1bmN0aW9uKSB7XG4gICAgbGV0IGF1dGhvciA9IG1hcC5jcmVhdGVkQnkgfHwgbWFwLl9jcmVhdGVkQnkgfHwgXCJcIjtcbiAgICBsZXQgaWRlbnRpZmllcnMgPSAobWFwLmlkZW50aWZpZXJzIHx8IG1hcC5pZGVudGlmaWVyIHx8IFtdKS5qb2luKCcnKTtcbiAgICBsZXQgcmVmID0gZm9ybWF0UmVmZXJlbmNlKHt0aXRsZTogbWFwLnRpdGxlLCBhdXRob3I6IGF1dGhvciwgaWRlbnRpZmllcnM6IGlkZW50aWZpZXJzfSk7XG4gICAgcmV0dXJuIFVSSV9CQVNFICsgJy9pZC9tYXAvJyArIG1kNShyZWYpO1xufSk7XG5cblVSSUZhY3RvcnkucmVnaXN0ZXIoSXRlbVR5cGVzLkdBTExFUlksIGZ1bmN0aW9uKGdhbGxlcnkgOiBhbnksIG1kNSA6IEZ1bmN0aW9uKSB7XG4gICAgbGV0IGF1dGhvciA9IGdhbGxlcnkuY3JlYXRlZEJ5IHx8IGdhbGxlcnkuX2NyZWF0ZWRCeSB8fCBcIlwiO1xuICAgIGxldCByZWYgPSBmb3JtYXRSZWZlcmVuY2Uoe3RpdGxlOiBnYWxsZXJ5LnRpdGxlLCBhdXRob3I6IGF1dGhvcn0pO1xuICAgIHJldHVybiBVUklfQkFTRSArICcvaWQvZ2FsbGVyeS8nICsgbWQ1KHJlZik7XG59KTtcblxuVVJJRmFjdG9yeS5yZWdpc3RlcihJdGVtVHlwZXMuQ09NTVVOSVRZLCBmdW5jdGlvbihjb21tdW5pdHkgOiBhbnksIG1kNSA6IEZ1bmN0aW9uKSB7XG4gICAgbGV0IHJlZiA9IGZvcm1hdFJlZmVyZW5jZSh7dGl0bGU6IGNvbW11bml0eS50aXRsZX0pO1xuICAgIHJldHVybiBVUklfQkFTRSArICcvaWQvY29tbXVuaXR5LycgKyBtZDUocmVmKTtcbn0pO1xuXG5VUklGYWN0b3J5LnJlZ2lzdGVyKEl0ZW1UeXBlcy5PUkdBTklaQVRJT04sIGZ1bmN0aW9uKG9yZyA6IGFueSwgbWQ1IDogRnVuY3Rpb24pIHtcbiAgICBsZXQgcmVmID0gZm9ybWF0UmVmZXJlbmNlKG9yZy5sYWJlbCB8fCBvcmcubmFtZSk7XG4gICAgcmV0dXJuIFVSSV9CQVNFICsgJy9pZC9vcmdhbml6YXRpb24vJyArIG1kNShyZWYpO1xufSk7XG5cblVSSUZhY3RvcnkucmVnaXN0ZXIoSXRlbVR5cGVzLlBFUlNPTiwgZnVuY3Rpb24ocGVyc29uIDogYW55LCBtZDUgOiBGdW5jdGlvbikge1xuICAgIGxldCByZWYgPSBmb3JtYXRSZWZlcmVuY2UocGVyc29uLm5hbWUpO1xuICAgIHJldHVybiBVUklfQkFTRSArICcvaWQvcGVyc29uLycgKyBtZDUocmVmKTtcbn0pO1xuXG5VUklGYWN0b3J5LnJlZ2lzdGVyKEl0ZW1UeXBlcy5DT05UQUNULCBmdW5jdGlvbih2Y2FyZCA6IGFueSwgbWQ1IDogRnVuY3Rpb24pIHtcbiAgICBsZXQgcmVmIDogYW55ID0ge307XG4gICAgaWYodmNhcmQuZW1haWwgfHwgdmNhcmQuaGFzRW1haWwpXG4gICAgICAgIHJlZi5lbWFpbCA9IHZjYXJkLmVtYWlsIHx8IHZjYXJkLmhhc0VtYWlsOyAvL2VtYWlsXG4gICAgaWYodmNhcmQudGVsKVxuICAgICAgICByZWYudGVsID0gdmNhcmQudGVsOyAvL3RlbFxuICAgIGlmKHZjYXJkLm9yZ05hbWUgfHwgdmNhcmRbJ29yZ2FuaXphdGlvbi1uYW1lJ10pXG4gICAgICAgIHJlZi5vcmdOYW1lID0gdmNhcmQub3JnTmFtZSB8fCB2Y2FyZFsnb3JnYW5pemF0aW9uLW5hbWUnXTsgLy9vcmdOYW1lXG4gICAgaWYodmNhcmQucG9zaXRpb25UaXRsZSlcbiAgICAgICAgcmVmLnBvc2l0aW9uVGl0bGUgPSB2Y2FyZC5wb3NpdGlvblRpdGxlOyAvL3Bvc2l0aW9uVGl0bGVcbiAgICByZWYgPSBmb3JtYXRSZWZlcmVuY2UocmVmKTtcbiAgICByZXR1cm4gVVJJX0JBU0UgKyAnL2lkL2NvbnRhY3QvJyArIG1kNShyZWYpO1xufSk7XG5cblVSSUZhY3RvcnkucmVnaXN0ZXIoSXRlbVR5cGVzLkNPTkNFUFQsIGZ1bmN0aW9uKG9iamVjdCA6IGFueSwgbWQ1IDogRnVuY3Rpb24pIHtcbiAgICBsZXQgc2NoZW1lID0gb2JqZWN0LmluU2NoZW1lIHx8IG9iamVjdC5zY2hlbWU7XG4gICAgbGV0IHNjaGVtZUxhYmVsID0gc2NoZW1lID8gKHNjaGVtZS5sYWJlbCB8fCBzY2hlbWUucHJlZkxhYmVsKSA6ICcnO1xuICAgIGxldCBzY2hlbWVSZWYgPSBmb3JtYXRSZWZlcmVuY2Uoc2NoZW1lTGFiZWwpO1xuICAgIGxldCByZWYgPSBmb3JtYXRSZWZlcmVuY2UoIG9iamVjdC5sYWJlbCB8fCBvYmplY3QucHJlZkxhYmVsICk7XG4gICAgcmV0dXJuIFVSSV9CQVNFICsgJy9pZC9tZXRhZGF0YS1jb2RlbGlzdHMvJyArIG1kNShzY2hlbWVSZWYpICsgJy8nICsgbWQ1KHJlZik7XG59KTtcblxuVVJJRmFjdG9yeS5yZWdpc3RlcihJdGVtVHlwZXMuQ09OQ0VQVF9TQ0hFTUUsIGZ1bmN0aW9uKG9iamVjdCA6IGFueSwgbWQ1IDogRnVuY3Rpb24pIHtcbiAgICBsZXQgcmVmID0gZm9ybWF0UmVmZXJlbmNlKG9iamVjdC5sYWJlbCB8fCBvYmplY3QucHJlZkxhYmVsKTtcbiAgICByZXR1cm4gVVJJX0JBU0UgKyAnL2lkL21ldGFkYXRhLWNvZGVsaXN0cy8nICsgbWQ1KHJlZik7XG59KTtcblxuXG5VUklGYWN0b3J5LnJlZ2lzdGVyKEl0ZW1UeXBlcy5BUFBMSUNBVElPTiwgZnVuY3Rpb24ob2JqZWN0IDogYW55LCBtZDUgOiBGdW5jdGlvbikge1xuICAgIGlmKCFvYmplY3QgfHwgIW9iamVjdC50aXRsZSkgcmV0dXJuIG51bGw7XG4gICAgbGV0IGF1dGhvciA9IG9iamVjdC5jcmVhdGVkQnkgfHwgb2JqZWN0Ll9jcmVhdGVkQnkgfHwgXCJcIjtcbiAgICBsZXQgcmVmID0gZm9ybWF0UmVmZXJlbmNlKHt0aXRsZTogb2JqZWN0LnRpdGxlLCBhdXRob3I6IGF1dGhvcn0pO1xuICAgIHJldHVybiBVUklfQkFTRSArICcvaWQvYXBwbGljYXRpb24vJyArIG1kNShyZWYpO1xufSk7XG5cblVSSUZhY3RvcnkucmVnaXN0ZXIoSXRlbVR5cGVzLlRPUElDLCBmdW5jdGlvbihvYmplY3QgOiBhbnksIG1kNSA6IEZ1bmN0aW9uKSB7XG4gICAgaWYoIW9iamVjdCB8fCAhb2JqZWN0LnRpdGxlKSByZXR1cm4gbnVsbDtcbiAgICBsZXQgYXV0aG9yID0gb2JqZWN0LmNyZWF0ZWRCeSB8fCBvYmplY3QuX2NyZWF0ZWRCeSB8fCBcIlwiO1xuICAgIGxldCByZWYgPSBmb3JtYXRSZWZlcmVuY2Uoe3RpdGxlOiBvYmplY3QudGl0bGUsIGF1dGhvcjogYXV0aG9yfSk7XG4gICAgcmV0dXJuIFVSSV9CQVNFICsgJy9pZC90b3BpYy8nICsgbWQ1KHJlZik7XG59KTtcblxuVVJJRmFjdG9yeS5yZWdpc3RlcihJdGVtVHlwZXMuV0VCU0lURSwgZnVuY3Rpb24oaXRlbSA6IGFueSwgbWQ1IDogRnVuY3Rpb24pIHtcbiAgICBpZighaXRlbSB8fCAhaXRlbS5sYW5kaW5nUGFnZSkgcmV0dXJuIG51bGw7XG4gICAgbGV0IHJlZiA9IGZvcm1hdFJlZmVyZW5jZShpdGVtLmxhbmRpbmdQYWdlKTtcbiAgICByZXR1cm4gVVJJX0JBU0UgKyAnL2lkL3dlYnNpdGUvJyArIG1kNShyZWYpO1xufSk7XG5cblVSSUZhY3RvcnkucmVnaXN0ZXIoSXRlbVR5cGVzLklNQUdFX1BST0RVQ1QsIGZ1bmN0aW9uKGl0ZW0gOiBhbnksIG1kNSA6IEZ1bmN0aW9uKSB7XG4gICAgaWYoIWl0ZW0ucHJvZHVjdElkKSByZXR1cm4gbnVsbDtcbiAgICBsZXQgcmVmID0gZm9ybWF0UmVmZXJlbmNlKGl0ZW0ucHJvZHVjdElkKTtcbiAgICByZXR1cm4gVVJJX0JBU0UgKyAnL2lkL3Byb2R1Y3QvJyArIG1kNShyZWYpO1xufSk7XG5cblxuXG5mdW5jdGlvbiBmYWN0b3J5Rm4obWQ1Rm4pIHtcbiAgICBpZiggdHlwZW9mKG1kNUZuKSAhPT0gJ2Z1bmN0aW9uJyApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBzcGVjaWZ5IGEgTUQ1IGZ1bmN0aW9uIHdoZW4gdXNpbmcgVVJJRmFjdG9yeVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICByZXR1cm4gVVJJRmFjdG9yeS5jcmVhdGUob2JqZWN0LCBtZDVGbik7XG4gICAgfTtcbn1cblxuXG5cbmV4cG9ydCB7XG4gICAgZmFjdG9yeUZuIGFzIGRlZmF1bHQsXG4gICAgZmFjdG9yeUZuIGFzIFVSSUZhY3Rvcnlcbn07XG4iXX0=