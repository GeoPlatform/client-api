import ItemTypes from './types';
var URI_BASE = 'http://www.geoplatform.gov';
var ESRI_TYPES = [
    "http://www.geoplatform.gov/spec/esri-feature-rest",
    "http://www.geoplatform.gov/spec/esri-image-rest",
    "http://www.geoplatform.gov/spec/esri-map-rest",
    "http://www.geoplatform.gov/spec/esri-tile-rest"
];
function formatReference(ref) {
    if (ref === null)
        return '';
    if (typeof (ref) === 'string')
        return ref.toLowerCase().replace(/\s/g, '');
    else if (typeof (ref) === 'object') {
        var result = '';
        for (var prop in ref) {
            if (ref.hasOwnProperty(prop)) {
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
 * @param service - GP Service instance
 * @return access url adjusted for URI generation needs
 */
function fixServiceHref(service) {
    stripLayerFromServiceHref(service);
    var url = service.accessURL || service.href;
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
    var lastChar = url[url.length - 1];
    if ('/' === lastChar || '?' === lastChar) { //ignore empty querystring or trailing slashes
        url = url.substring(0, url.length - 1);
    }
    return url;
}
/**
 * ESRI services sometimes have layer information baked into their URL
 * which needs to be removed before the service can be used.
 * @param service - GP Service object
 */
function stripLayerFromServiceHref(service) {
    if (!service)
        return;
    var type = service.serviceType || service.conformsTo;
    if (!type)
        return;
    //if ESRI service, make sure it doesn't have a layer id on the href
    if (ESRI_TYPES.indexOf(type.uri) >= 0) {
        var href = service.href || service.accessURL;
        var matches = href.match(/(Map|Feature|Image)(Server\/\d+)/i);
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
var ɵ0 = function (type, factory) {
    this.factories[type] = factory;
}, ɵ1 = function (object, md5Fn) {
    if (!object || !object.type)
        return null;
    if (typeof (md5Fn) !== 'function') {
        throw new Error("Must specify a MD5 function when using URIFactory");
    }
    var factory = this.factories[object.type];
    if (!factory)
        return null;
    return factory(object, md5Fn);
};
/**
 * @see https://geoplatform.atlassian.net/wiki/display/DT/Common+Object+Identifier+Scheme
 */
var URIFactory = {
    factories: {},
    register: ɵ0,
    create: ɵ1
};
URIFactory.register(ItemTypes.DATASET, function (dataset, md5) {
    var pubName = (dataset.publisher || dataset.publishers || [])
        .map(function (pub) { return pub.label || ""; }).join('');
    var ref = formatReference({
        title: dataset.title,
        pub: pubName
    });
    return URI_BASE + '/id/dataset/' + md5(ref);
});
URIFactory.register(ItemTypes.SERVICE, function (service, md5) {
    var url = fixServiceHref(service);
    var ref = formatReference(url);
    return URI_BASE + '/id/service/' + md5(ref);
});
URIFactory.register(ItemTypes.LAYER, function (layer, md5) {
    var svcUrl = '';
    var services = layer.servicedBy || layer.services;
    if (services && services.length)
        svcUrl = services[0].accessURL || services[0].href || '';
    var lyrUrl = layer.accessURL || layer.href || '';
    var lyrName = layer.layerName || '';
    //not recommended based upon following example:
    //  http://services.nationalmap.gov/.../MapServer/WMSServer?request=GetCapabilities&service=WMS/layer/1
    // return url + '/layer/' + layer.layerName;
    var args = svcUrl + lyrName + lyrUrl;
    if (!args.length)
        return null; //nothing was provided
    //ALTERNATE URI PATTERN
    var ref = formatReference(args);
    return URI_BASE + '/id/layer/' + md5(ref);
});
/**
 * Uses the map title, createdBy, and all third-party identifiers associated with the map
 * @param {object} map - GP Map object
 * @return {string} uri unique to this object
 */
URIFactory.register(ItemTypes.MAP, function (map, md5) {
    var author = map.createdBy || map._createdBy || "";
    var identifiers = (map.identifiers || map.identifier || []).join('');
    var ref = formatReference({ title: map.title, author: author, identifiers: identifiers });
    return URI_BASE + '/id/map/' + md5(ref);
});
URIFactory.register(ItemTypes.GALLERY, function (gallery, md5) {
    var author = gallery.createdBy || gallery._createdBy || "";
    var ref = formatReference({ title: gallery.title, author: author });
    return URI_BASE + '/id/gallery/' + md5(ref);
});
URIFactory.register(ItemTypes.COMMUNITY, function (community, md5) {
    var ref = formatReference({ title: community.title });
    return URI_BASE + '/id/community/' + md5(ref);
});
URIFactory.register(ItemTypes.ORGANIZATION, function (org, md5) {
    var ref = formatReference(org.label || org.name);
    return URI_BASE + '/id/organization/' + md5(ref);
});
URIFactory.register(ItemTypes.PERSON, function (person, md5) {
    var ref = formatReference(person.name);
    return URI_BASE + '/id/person/' + md5(ref);
});
URIFactory.register(ItemTypes.CONTACT, function (vcard, md5) {
    var ref = {};
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
    var scheme = object.inScheme || object.scheme;
    var schemeLabel = scheme ? (scheme.label || scheme.prefLabel) : '';
    var schemeRef = formatReference(schemeLabel);
    var ref = formatReference(object.label || object.prefLabel);
    return URI_BASE + '/id/metadata-codelists/' + md5(schemeRef) + '/' + md5(ref);
});
URIFactory.register(ItemTypes.CONCEPT_SCHEME, function (object, md5) {
    var ref = formatReference(object.label || object.prefLabel);
    return URI_BASE + '/id/metadata-codelists/' + md5(ref);
});
URIFactory.register(ItemTypes.APPLICATION, function (object, md5) {
    if (!object || !object.title)
        return null;
    var author = object.createdBy || object._createdBy || "";
    var ref = formatReference({ title: object.title, author: author });
    return URI_BASE + '/id/application/' + md5(ref);
});
URIFactory.register(ItemTypes.TOPIC, function (object, md5) {
    if (!object || !object.title)
        return null;
    var author = object.createdBy || object._createdBy || "";
    var ref = formatReference({ title: object.title, author: author });
    return URI_BASE + '/id/topic/' + md5(ref);
});
URIFactory.register(ItemTypes.WEBSITE, function (item, md5) {
    if (!item || !item.landingPage)
        return null;
    var ref = formatReference(item.landingPage);
    return URI_BASE + '/id/website/' + md5(ref);
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJpLWZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL3VyaS1mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUloQyxJQUFNLFFBQVEsR0FBRyw0QkFBNEIsQ0FBQztBQUU5QyxJQUFNLFVBQVUsR0FBRztJQUNmLG1EQUFtRDtJQUNuRCxpREFBaUQ7SUFDakQsK0NBQStDO0lBQy9DLGdEQUFnRDtDQUNuRCxDQUFDO0FBS0YsU0FBUyxlQUFlLENBQUUsR0FBUztJQUMvQixJQUFHLEdBQUcsS0FBSyxJQUFJO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFDM0IsSUFBRyxPQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUTtRQUN2QixPQUFPLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFDLElBQUcsT0FBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUM5QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsS0FBSSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7WUFDakIsSUFBRyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6QixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RCLElBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxFQUFFO29CQUNoRCxtQ0FBbUM7b0JBQ25DLE1BQU0sSUFBSSxDQUFDLEtBQUssR0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUN4RDthQUNKO1NBQ0o7UUFDRCxPQUFPLE1BQU0sQ0FBQztLQUNqQjtJQUNELE9B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QyxPQUFPLFFBQVEsR0FBRyxjQUFjLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hELENBQUMsQ0FBQyxDQUFDO0FBSUgsU0FBUyxTQUFTLENBQUMsS0FBSztJQUNwQixJQUFJLE9BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxVQUFVLEVBQUc7UUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO0tBQ3hFO0lBQ0QsT0FBTyxVQUFTLE1BQU07UUFDbEIsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUM7QUFDTixDQUFDO0FBSUQsT0FBTyxFQUNILFNBQVMsSUFBSSxPQUFPLEVBQ3BCLFNBQVMsSUFBSSxVQUFVLEVBQzFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBJdGVtVHlwZXMgZnJvbSAnLi90eXBlcyc7XG5cblxuXG5jb25zdCBVUklfQkFTRSA9ICdodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdic7XG5cbmNvbnN0IEVTUklfVFlQRVMgPSBbXG4gICAgXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9zcGVjL2VzcmktZmVhdHVyZS1yZXN0XCIsXG4gICAgXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9zcGVjL2VzcmktaW1hZ2UtcmVzdFwiLFxuICAgIFwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3Yvc3BlYy9lc3JpLW1hcC1yZXN0XCIsXG4gICAgXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9zcGVjL2VzcmktdGlsZS1yZXN0XCJcbl07XG5cblxuXG5cbmZ1bmN0aW9uIGZvcm1hdFJlZmVyZW5jZSggcmVmIDogYW55ICkgOiBhbnkge1xuICAgIGlmKHJlZiA9PT0gbnVsbCkgcmV0dXJuICcnO1xuICAgIGlmKHR5cGVvZihyZWYpID09PSAnc3RyaW5nJylcbiAgICAgICAgcmV0dXJuIHJlZi50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCcnKTtcbiAgICBlbHNlIGlmKHR5cGVvZihyZWYpID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgICAgIGZvcih2YXIgcHJvcCBpbiByZWYpIHtcbiAgICAgICAgICAgIGlmKHJlZi5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJlZltwcm9wXTtcbiAgICAgICAgICAgICAgICBpZih2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YodmFsdWUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAvL1RPRE8gY2F0Y2ggbm9uLXN0cmluZy1hYmxlIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gKHZhbHVlKycnKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIEFkanVzdHMgc2VydmljZSBhY2Nlc3MgdXJsIHRvIGlnbm9yZSBjZXJ0YWluIHBhdHRlcm5zIHRoYXQgY2FuIGFmZmVjdFxuICogaG93IFVSSSB1bmlxdWVuZXNzIGlzLlxuICogQHBhcmFtIHNlcnZpY2UgLSBHUCBTZXJ2aWNlIGluc3RhbmNlXG4gKiBAcmV0dXJuIGFjY2VzcyB1cmwgYWRqdXN0ZWQgZm9yIFVSSSBnZW5lcmF0aW9uIG5lZWRzXG4gKi9cbmZ1bmN0aW9uIGZpeFNlcnZpY2VIcmVmKHNlcnZpY2UgOiBhbnkpIDogc3RyaW5nIHtcbiAgICBzdHJpcExheWVyRnJvbVNlcnZpY2VIcmVmKHNlcnZpY2UpO1xuICAgIGxldCB1cmwgPSBzZXJ2aWNlLmFjY2Vzc1VSTCB8fCBzZXJ2aWNlLmhyZWY7XG4gICAgaWYoIXVybCB8fCAhdXJsLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cbiAgICAvL2Vuc3VyZSBjYXNlIHNlbnNpdGl2aXR5IGlzIG5vdCBhbiBpc3N1ZVxuICAgIC8vIGFuZCB0aGF0IGFueSBzdXJyb3VuZGluZyB3aGl0ZXNwYWNlIGlzIGlnbm9yZWRcbiAgICB1cmwgPSAodXJsICsgJycpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgdXJsID0gdXJsLnJlcGxhY2UoL2h0dHAocyk/OlxcL1xcLy8sJycpOyAgICAvL2lnbm9yZSBwcm90b2NvbCBmb3IgVVJJIHB1cnBvc2VzXG5cbiAgICB1cmwgPSB1cmwucmVwbGFjZSgvJj9yZXF1ZXN0PVtBLVphLXpdKy9pLCcnKVxuICAgICAgICAgICAgIC5yZXBsYWNlKC8mP3NlcnZpY2U9KFdNU3xXRlN8V0NTfENTVykvaSwnJylcbiAgICAgICAgICAgICAucmVwbGFjZSgvJj92ZXJzaW9uPVswLTlcXC5dKi9pLCcnKVxuICAgICAgICAgICAgIC5yZXBsYWNlKC8mP2xheWVycz1bQS1aYS16MC05XFwtXFw6XyxdKi9pLCAnJylcbiAgICAgICAgICAgICAucmVwbGFjZSgvJj9zcnM9W0EtWmEtejAtOVxcOl0qL2ksICcnKVxuICAgICAgICAgICAgIC5yZXBsYWNlKC8mP2Nycz1bQS1aYS16MC05XFw6XSovaSwgJycpXG4gICAgICAgICAgICAgLnJlcGxhY2UoLyY/Zm9ybWF0PVtBLVphLXpcXC9dKi9pLCAnJylcbiAgICAgICAgICAgICAucmVwbGFjZSgvJj9iYm94PVswLTksXFwuXSovaSwgJycpO1xuXG4gICAgbGV0IGxhc3RDaGFyID0gdXJsW3VybC5sZW5ndGgtMV07XG4gICAgaWYoICcvJyA9PT0gbGFzdENoYXIgfHwgJz8nID09PSBsYXN0Q2hhcikgeyAvL2lnbm9yZSBlbXB0eSBxdWVyeXN0cmluZyBvciB0cmFpbGluZyBzbGFzaGVzXG4gICAgICAgIHVybCA9IHVybC5zdWJzdHJpbmcoMCwgdXJsLmxlbmd0aC0xKTtcbiAgICB9XG4gICAgcmV0dXJuIHVybDtcbn1cblxuXG4vKipcbiAqIEVTUkkgc2VydmljZXMgc29tZXRpbWVzIGhhdmUgbGF5ZXIgaW5mb3JtYXRpb24gYmFrZWQgaW50byB0aGVpciBVUkxcbiAqIHdoaWNoIG5lZWRzIHRvIGJlIHJlbW92ZWQgYmVmb3JlIHRoZSBzZXJ2aWNlIGNhbiBiZSB1c2VkLlxuICogQHBhcmFtIHNlcnZpY2UgLSBHUCBTZXJ2aWNlIG9iamVjdFxuICovXG5mdW5jdGlvbiBzdHJpcExheWVyRnJvbVNlcnZpY2VIcmVmKHNlcnZpY2UgOiBhbnkpIDogc3RyaW5nIHtcblxuICAgIGlmKCFzZXJ2aWNlKSByZXR1cm47XG4gICAgbGV0IHR5cGUgPSBzZXJ2aWNlLnNlcnZpY2VUeXBlIHx8IHNlcnZpY2UuY29uZm9ybXNUbztcbiAgICBpZighdHlwZSkgcmV0dXJuO1xuXG4gICAgLy9pZiBFU1JJIHNlcnZpY2UsIG1ha2Ugc3VyZSBpdCBkb2Vzbid0IGhhdmUgYSBsYXllciBpZCBvbiB0aGUgaHJlZlxuICAgIGlmKCBFU1JJX1RZUEVTLmluZGV4T2YodHlwZS51cmkpID49IDAgKSB7XG5cbiAgICAgICAgbGV0IGhyZWYgPSBzZXJ2aWNlLmhyZWYgfHwgc2VydmljZS5hY2Nlc3NVUkw7XG4gICAgICAgIGxldCBtYXRjaGVzID0gaHJlZi5tYXRjaCgvKE1hcHxGZWF0dXJlfEltYWdlKShTZXJ2ZXJcXC9cXGQrKS9pKTtcbiAgICAgICAgaWYobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIC8vIDAgPCBmdWxsIHN0cmluZyBtYXRjaCAoaWUsICdNYXBTZXJ2ZXIvMScpXG4gICAgICAgICAgICAvLyAxIDwgc2VydmVyIHR5cGUgbWF0Y2ggKGllLCAnTWFwJyBvciAnRmVhdHVyZScpXG4gICAgICAgICAgICAvLyAyIDwgYml0IHdlIGNhcmUgYWJvdXQgKGllLCAnU2VydmVyLzEnKVxuICAgICAgICAgICAgaHJlZiA9IGhyZWYucmVwbGFjZShtYXRjaGVzWzJdLCAnU2VydmVyLycpO1xuXG4gICAgICAgICAgICBpZihzZXJ2aWNlLmhyZWYpIHNlcnZpY2UuaHJlZiA9IGhyZWY7XG4gICAgICAgICAgICBpZihzZXJ2aWNlLmFjY2Vzc1VSTCkgc2VydmljZS5hY2Nlc3NVUkwgPSBocmVmO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuXG4vKipcbiAqIEBzZWUgaHR0cHM6Ly9nZW9wbGF0Zm9ybS5hdGxhc3NpYW4ubmV0L3dpa2kvZGlzcGxheS9EVC9Db21tb24rT2JqZWN0K0lkZW50aWZpZXIrU2NoZW1lXG4gKi9cbmNvbnN0IFVSSUZhY3RvcnkgPSB7XG5cbiAgICBmYWN0b3JpZXMgOiB7fSxcblxuICAgIHJlZ2lzdGVyIDogZnVuY3Rpb24gKHR5cGUgOiBzdHJpbmcsIGZhY3RvcnkgOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLmZhY3Rvcmllc1t0eXBlXSA9IGZhY3Rvcnk7XG4gICAgfSxcblxuICAgIGNyZWF0ZSA6IGZ1bmN0aW9uKG9iamVjdCA6IGFueSwgbWQ1Rm4gOiBGdW5jdGlvbikge1xuICAgICAgICBpZighb2JqZWN0IHx8ICFvYmplY3QudHlwZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmKCB0eXBlb2YobWQ1Rm4pICE9PSAnZnVuY3Rpb24nICkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBzcGVjaWZ5IGEgTUQ1IGZ1bmN0aW9uIHdoZW4gdXNpbmcgVVJJRmFjdG9yeVwiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmFjdG9yeSA9IHRoaXMuZmFjdG9yaWVzW29iamVjdC50eXBlXTtcbiAgICAgICAgaWYoIWZhY3RvcnkpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gZmFjdG9yeShvYmplY3QsIG1kNUZuKTtcbiAgICB9XG59O1xuXG5cblxuXG5VUklGYWN0b3J5LnJlZ2lzdGVyKEl0ZW1UeXBlcy5EQVRBU0VULCBmdW5jdGlvbihkYXRhc2V0IDogYW55LCBtZDUgOiBGdW5jdGlvbikge1xuICAgIGxldCBwdWJOYW1lID0gKGRhdGFzZXQucHVibGlzaGVyfHxkYXRhc2V0LnB1Ymxpc2hlcnN8fFtdKVxuICAgICAgICAubWFwKCBwdWIgPT4geyByZXR1cm4gcHViLmxhYmVsfHxcIlwiOyB9KS5qb2luKCcnKTtcbiAgICBsZXQgcmVmIDogYW55ID0gZm9ybWF0UmVmZXJlbmNlKHtcbiAgICAgICAgdGl0bGU6IGRhdGFzZXQudGl0bGUsXG4gICAgICAgIHB1YjogcHViTmFtZVxuICAgIH0pO1xuICAgIHJldHVybiBVUklfQkFTRSArICcvaWQvZGF0YXNldC8nICsgbWQ1KHJlZik7XG59KTtcblxuVVJJRmFjdG9yeS5yZWdpc3RlcihJdGVtVHlwZXMuU0VSVklDRSwgZnVuY3Rpb24oc2VydmljZSA6IGFueSwgbWQ1IDogRnVuY3Rpb24pIHtcbiAgICBsZXQgdXJsID0gZml4U2VydmljZUhyZWYoc2VydmljZSk7XG4gICAgbGV0IHJlZiA9IGZvcm1hdFJlZmVyZW5jZSh1cmwpO1xuICAgIHJldHVybiBVUklfQkFTRSArICcvaWQvc2VydmljZS8nICsgbWQ1KHJlZik7XG59KTtcblxuVVJJRmFjdG9yeS5yZWdpc3RlcihJdGVtVHlwZXMuTEFZRVIsIGZ1bmN0aW9uKGxheWVyIDogYW55LCBtZDUgOiBGdW5jdGlvbikge1xuXG4gICAgbGV0IHN2Y1VybCA9ICcnO1xuICAgIGxldCBzZXJ2aWNlcyA9IGxheWVyLnNlcnZpY2VkQnkgfHwgbGF5ZXIuc2VydmljZXM7XG4gICAgaWYoc2VydmljZXMgJiYgc2VydmljZXMubGVuZ3RoKVxuICAgICAgICBzdmNVcmwgPSBzZXJ2aWNlc1swXS5hY2Nlc3NVUkwgfHwgc2VydmljZXNbMF0uaHJlZiB8fCAnJztcbiAgICBsZXQgbHlyVXJsID0gbGF5ZXIuYWNjZXNzVVJMIHx8IGxheWVyLmhyZWYgfHwgJyc7XG4gICAgbGV0IGx5ck5hbWUgPSBsYXllci5sYXllck5hbWUgfHwgJyc7XG5cbiAgICAvL25vdCByZWNvbW1lbmRlZCBiYXNlZCB1cG9uIGZvbGxvd2luZyBleGFtcGxlOlxuICAgIC8vICBodHRwOi8vc2VydmljZXMubmF0aW9uYWxtYXAuZ292Ly4uLi9NYXBTZXJ2ZXIvV01TU2VydmVyP3JlcXVlc3Q9R2V0Q2FwYWJpbGl0aWVzJnNlcnZpY2U9V01TL2xheWVyLzFcbiAgICAvLyByZXR1cm4gdXJsICsgJy9sYXllci8nICsgbGF5ZXIubGF5ZXJOYW1lO1xuXG4gICAgbGV0IGFyZ3MgPSBzdmNVcmwgKyBseXJOYW1lICsgbHlyVXJsO1xuICAgIGlmKCFhcmdzLmxlbmd0aCkgcmV0dXJuIG51bGw7ICAgLy9ub3RoaW5nIHdhcyBwcm92aWRlZFxuXG4gICAgLy9BTFRFUk5BVEUgVVJJIFBBVFRFUk5cbiAgICBsZXQgcmVmID0gZm9ybWF0UmVmZXJlbmNlKGFyZ3MpO1xuICAgIHJldHVybiBVUklfQkFTRSArICcvaWQvbGF5ZXIvJyArIG1kNShyZWYpO1xuXG59KTtcblxuLyoqXG4gKiBVc2VzIHRoZSBtYXAgdGl0bGUsIGNyZWF0ZWRCeSwgYW5kIGFsbCB0aGlyZC1wYXJ0eSBpZGVudGlmaWVycyBhc3NvY2lhdGVkIHdpdGggdGhlIG1hcFxuICogQHBhcmFtIHtvYmplY3R9IG1hcCAtIEdQIE1hcCBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ30gdXJpIHVuaXF1ZSB0byB0aGlzIG9iamVjdFxuICovXG5VUklGYWN0b3J5LnJlZ2lzdGVyKEl0ZW1UeXBlcy5NQVAsIGZ1bmN0aW9uKG1hcCA6IGFueSwgbWQ1IDogRnVuY3Rpb24pIHtcbiAgICBsZXQgYXV0aG9yID0gbWFwLmNyZWF0ZWRCeSB8fCBtYXAuX2NyZWF0ZWRCeSB8fCBcIlwiO1xuICAgIGxldCBpZGVudGlmaWVycyA9IChtYXAuaWRlbnRpZmllcnMgfHwgbWFwLmlkZW50aWZpZXIgfHwgW10pLmpvaW4oJycpO1xuICAgIGxldCByZWYgPSBmb3JtYXRSZWZlcmVuY2Uoe3RpdGxlOiBtYXAudGl0bGUsIGF1dGhvcjogYXV0aG9yLCBpZGVudGlmaWVyczogaWRlbnRpZmllcnN9KTtcbiAgICByZXR1cm4gVVJJX0JBU0UgKyAnL2lkL21hcC8nICsgbWQ1KHJlZik7XG59KTtcblxuVVJJRmFjdG9yeS5yZWdpc3RlcihJdGVtVHlwZXMuR0FMTEVSWSwgZnVuY3Rpb24oZ2FsbGVyeSA6IGFueSwgbWQ1IDogRnVuY3Rpb24pIHtcbiAgICBsZXQgYXV0aG9yID0gZ2FsbGVyeS5jcmVhdGVkQnkgfHwgZ2FsbGVyeS5fY3JlYXRlZEJ5IHx8IFwiXCI7XG4gICAgbGV0IHJlZiA9IGZvcm1hdFJlZmVyZW5jZSh7dGl0bGU6IGdhbGxlcnkudGl0bGUsIGF1dGhvcjogYXV0aG9yfSk7XG4gICAgcmV0dXJuIFVSSV9CQVNFICsgJy9pZC9nYWxsZXJ5LycgKyBtZDUocmVmKTtcbn0pO1xuXG5VUklGYWN0b3J5LnJlZ2lzdGVyKEl0ZW1UeXBlcy5DT01NVU5JVFksIGZ1bmN0aW9uKGNvbW11bml0eSA6IGFueSwgbWQ1IDogRnVuY3Rpb24pIHtcbiAgICBsZXQgcmVmID0gZm9ybWF0UmVmZXJlbmNlKHt0aXRsZTogY29tbXVuaXR5LnRpdGxlfSk7XG4gICAgcmV0dXJuIFVSSV9CQVNFICsgJy9pZC9jb21tdW5pdHkvJyArIG1kNShyZWYpO1xufSk7XG5cblVSSUZhY3RvcnkucmVnaXN0ZXIoSXRlbVR5cGVzLk9SR0FOSVpBVElPTiwgZnVuY3Rpb24ob3JnIDogYW55LCBtZDUgOiBGdW5jdGlvbikge1xuICAgIGxldCByZWYgPSBmb3JtYXRSZWZlcmVuY2Uob3JnLmxhYmVsIHx8IG9yZy5uYW1lKTtcbiAgICByZXR1cm4gVVJJX0JBU0UgKyAnL2lkL29yZ2FuaXphdGlvbi8nICsgbWQ1KHJlZik7XG59KTtcblxuVVJJRmFjdG9yeS5yZWdpc3RlcihJdGVtVHlwZXMuUEVSU09OLCBmdW5jdGlvbihwZXJzb24gOiBhbnksIG1kNSA6IEZ1bmN0aW9uKSB7XG4gICAgbGV0IHJlZiA9IGZvcm1hdFJlZmVyZW5jZShwZXJzb24ubmFtZSk7XG4gICAgcmV0dXJuIFVSSV9CQVNFICsgJy9pZC9wZXJzb24vJyArIG1kNShyZWYpO1xufSk7XG5cblVSSUZhY3RvcnkucmVnaXN0ZXIoSXRlbVR5cGVzLkNPTlRBQ1QsIGZ1bmN0aW9uKHZjYXJkIDogYW55LCBtZDUgOiBGdW5jdGlvbikge1xuICAgIGxldCByZWYgOiBhbnkgPSB7fTtcbiAgICBpZih2Y2FyZC5lbWFpbCB8fCB2Y2FyZC5oYXNFbWFpbClcbiAgICAgICAgcmVmLmVtYWlsID0gdmNhcmQuZW1haWwgfHwgdmNhcmQuaGFzRW1haWw7IC8vZW1haWxcbiAgICBpZih2Y2FyZC50ZWwpXG4gICAgICAgIHJlZi50ZWwgPSB2Y2FyZC50ZWw7IC8vdGVsXG4gICAgaWYodmNhcmQub3JnTmFtZSB8fCB2Y2FyZFsnb3JnYW5pemF0aW9uLW5hbWUnXSlcbiAgICAgICAgcmVmLm9yZ05hbWUgPSB2Y2FyZC5vcmdOYW1lIHx8IHZjYXJkWydvcmdhbml6YXRpb24tbmFtZSddOyAvL29yZ05hbWVcbiAgICBpZih2Y2FyZC5wb3NpdGlvblRpdGxlKVxuICAgICAgICByZWYucG9zaXRpb25UaXRsZSA9IHZjYXJkLnBvc2l0aW9uVGl0bGU7IC8vcG9zaXRpb25UaXRsZVxuICAgIHJlZiA9IGZvcm1hdFJlZmVyZW5jZShyZWYpO1xuICAgIHJldHVybiBVUklfQkFTRSArICcvaWQvY29udGFjdC8nICsgbWQ1KHJlZik7XG59KTtcblxuVVJJRmFjdG9yeS5yZWdpc3RlcihJdGVtVHlwZXMuQ09OQ0VQVCwgZnVuY3Rpb24ob2JqZWN0IDogYW55LCBtZDUgOiBGdW5jdGlvbikge1xuICAgIGxldCBzY2hlbWUgPSBvYmplY3QuaW5TY2hlbWUgfHwgb2JqZWN0LnNjaGVtZTtcbiAgICBsZXQgc2NoZW1lTGFiZWwgPSBzY2hlbWUgPyAoc2NoZW1lLmxhYmVsIHx8IHNjaGVtZS5wcmVmTGFiZWwpIDogJyc7XG4gICAgbGV0IHNjaGVtZVJlZiA9IGZvcm1hdFJlZmVyZW5jZShzY2hlbWVMYWJlbCk7XG4gICAgbGV0IHJlZiA9IGZvcm1hdFJlZmVyZW5jZSggb2JqZWN0LmxhYmVsIHx8IG9iamVjdC5wcmVmTGFiZWwgKTtcbiAgICByZXR1cm4gVVJJX0JBU0UgKyAnL2lkL21ldGFkYXRhLWNvZGVsaXN0cy8nICsgbWQ1KHNjaGVtZVJlZikgKyAnLycgKyBtZDUocmVmKTtcbn0pO1xuXG5VUklGYWN0b3J5LnJlZ2lzdGVyKEl0ZW1UeXBlcy5DT05DRVBUX1NDSEVNRSwgZnVuY3Rpb24ob2JqZWN0IDogYW55LCBtZDUgOiBGdW5jdGlvbikge1xuICAgIGxldCByZWYgPSBmb3JtYXRSZWZlcmVuY2Uob2JqZWN0LmxhYmVsIHx8IG9iamVjdC5wcmVmTGFiZWwpO1xuICAgIHJldHVybiBVUklfQkFTRSArICcvaWQvbWV0YWRhdGEtY29kZWxpc3RzLycgKyBtZDUocmVmKTtcbn0pO1xuXG5VUklGYWN0b3J5LnJlZ2lzdGVyKEl0ZW1UeXBlcy5BUFBMSUNBVElPTiwgZnVuY3Rpb24ob2JqZWN0IDogYW55LCBtZDUgOiBGdW5jdGlvbikge1xuICAgIGlmKCFvYmplY3QgfHwgIW9iamVjdC50aXRsZSkgcmV0dXJuIG51bGw7XG4gICAgbGV0IGF1dGhvciA9IG9iamVjdC5jcmVhdGVkQnkgfHwgb2JqZWN0Ll9jcmVhdGVkQnkgfHwgXCJcIjtcbiAgICBsZXQgcmVmID0gZm9ybWF0UmVmZXJlbmNlKHt0aXRsZTogb2JqZWN0LnRpdGxlLCBhdXRob3I6IGF1dGhvcn0pO1xuICAgIHJldHVybiBVUklfQkFTRSArICcvaWQvYXBwbGljYXRpb24vJyArIG1kNShyZWYpO1xufSk7XG5cblVSSUZhY3RvcnkucmVnaXN0ZXIoSXRlbVR5cGVzLlRPUElDLCBmdW5jdGlvbihvYmplY3QgOiBhbnksIG1kNSA6IEZ1bmN0aW9uKSB7XG4gICAgaWYoIW9iamVjdCB8fCAhb2JqZWN0LnRpdGxlKSByZXR1cm4gbnVsbDtcbiAgICBsZXQgYXV0aG9yID0gb2JqZWN0LmNyZWF0ZWRCeSB8fCBvYmplY3QuX2NyZWF0ZWRCeSB8fCBcIlwiO1xuICAgIGxldCByZWYgPSBmb3JtYXRSZWZlcmVuY2Uoe3RpdGxlOiBvYmplY3QudGl0bGUsIGF1dGhvcjogYXV0aG9yfSk7XG4gICAgcmV0dXJuIFVSSV9CQVNFICsgJy9pZC90b3BpYy8nICsgbWQ1KHJlZik7XG59KTtcblxuVVJJRmFjdG9yeS5yZWdpc3RlcihJdGVtVHlwZXMuV0VCU0lURSwgZnVuY3Rpb24oaXRlbSA6IGFueSwgbWQ1IDogRnVuY3Rpb24pIHtcbiAgICBpZighaXRlbSB8fCAhaXRlbS5sYW5kaW5nUGFnZSkgcmV0dXJuIG51bGw7XG4gICAgbGV0IHJlZiA9IGZvcm1hdFJlZmVyZW5jZShpdGVtLmxhbmRpbmdQYWdlKTtcbiAgICByZXR1cm4gVVJJX0JBU0UgKyAnL2lkL3dlYnNpdGUvJyArIG1kNShyZWYpO1xufSk7XG5cblxuXG5mdW5jdGlvbiBmYWN0b3J5Rm4obWQ1Rm4pIHtcbiAgICBpZiggdHlwZW9mKG1kNUZuKSAhPT0gJ2Z1bmN0aW9uJyApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBzcGVjaWZ5IGEgTUQ1IGZ1bmN0aW9uIHdoZW4gdXNpbmcgVVJJRmFjdG9yeVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICByZXR1cm4gVVJJRmFjdG9yeS5jcmVhdGUob2JqZWN0LCBtZDVGbik7XG4gICAgfTtcbn1cblxuXG5cbmV4cG9ydCB7XG4gICAgZmFjdG9yeUZuIGFzIGRlZmF1bHQsXG4gICAgZmFjdG9yeUZuIGFzIFVSSUZhY3Rvcnlcbn07XG4iXX0=