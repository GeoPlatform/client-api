/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function Item() { }
/** @type {?} */
Item.prototype.id;
/** @type {?} */
Item.prototype.type;
/** @type {?|undefined} */
Item.prototype.uri;
/** @type {?} */
Item.prototype.title;
/** @type {?|undefined} */
Item.prototype.label;
/** @type {?|undefined} */
Item.prototype.description;
/** @type {?|undefined} */
Item.prototype.createdBy;
/** @type {?|undefined} */
Item.prototype.lastModifiedBy;
/** @type {?|undefined} */
Item.prototype.created;
/** @type {?|undefined} */
Item.prototype.modified;
/** @type {?|undefined} */
Item.prototype._modified;
/** @type {?|undefined} */
Item.prototype.resourceTypes;
/**
 * @record
 */
export function Asset() { }
/** @type {?|undefined} */
Asset.prototype.keywords;
/** @type {?|undefined} */
Asset.prototype.themes;
/** @type {?|undefined} */
Asset.prototype.publishers;
/** @type {?|undefined} */
Asset.prototype.contributors;
/** @type {?|undefined} */
Asset.prototype.contacts;
/** @type {?|undefined} */
Asset.prototype.assets;
/** @type {?|undefined} */
Asset.prototype.classifiers;
/** @type {?|undefined} */
Asset.prototype.href;
/** @type {?|undefined} */
Asset.prototype.landingPage;
/** @type {?|undefined} */
Asset.prototype.thumbnail;
/** @type {?|undefined} */
Asset.prototype.related;
/** @type {?|undefined} */
Asset.prototype.auxillaryResources;
/**
 * @record
 */
export function Dataset() { }
/** @type {?|undefined} */
Dataset.prototype.distributions;
/**
 * @record
 */
export function Service() { }
/** @type {?} */
Service.prototype.serviceType;
/** @type {?|undefined} */
Service.prototype.serviceTypeVersions;
/** @type {?} */
Service.prototype.href;
/**
 * @record
 */
export function Layer() { }
/** @type {?|undefined} */
Layer.prototype.layerName;
/** @type {?|undefined} */
Layer.prototype.layerType;
/** @type {?|undefined} */
Layer.prototype.distributions;
/** @type {?|undefined} */
Layer.prototype.minScale;
/** @type {?|undefined} */
Layer.prototype.maxScale;
/** @type {?|undefined} */
Layer.prototype.supportedCRS;
/** @type {?|undefined} */
Layer.prototype.supportedFormats;
/**
 * @record
 */
export function Map() { }
/** @type {?|undefined} */
Map.prototype.baseLayer;
/** @type {?|undefined} */
Map.prototype.layers;
/** @type {?|undefined} */
Map.prototype.annotations;
/**
 * @record
 */
export function Gallery() { }
/** @type {?|undefined} */
Gallery.prototype.items;
/**
 * @record
 */
export function Community() { }
/** @type {?|undefined} */
Community.prototype.members;
/**
 * @record
 */
export function Topic() { }
/** @type {?|undefined} */
Topic.prototype.subTopicOf;
/**
 * @record
 */
export function Application() { }
/**
 * @record
 */
export function WebSite() { }
/**
 * @record
 */
export function Organization() { }
/** @type {?} */
Organization.prototype.orgName;
/** @type {?} */
Organization.prototype.subOrganizationOf;
/**
 * @record
 */
export function Contact() { }
/** @type {?|undefined} */
Contact.prototype.fullName;
/** @type {?|undefined} */
Contact.prototype.orgName;
/** @type {?|undefined} */
Contact.prototype.positionTitle;
/** @type {?|undefined} */
Contact.prototype.tel;
/** @type {?|undefined} */
Contact.prototype.email;
/** @type {?|undefined} */
Contact.prototype.fax;
/** @type {?} */
Contact.prototype.address;
/**
 * @record
 */
export function ConceptScheme() { }
/**
 * @record
 */
export function Concept() { }
/** @type {?|undefined} */
Concept.prototype.scheme;
/** @type {?|undefined} */
Concept.prototype.prefLabel;
/**
 * @record
 */
export function SearchResults() { }
/** @type {?} */
SearchResults.prototype.totalResults;
/** @type {?} */
SearchResults.prototype.results;
/** @type {?|undefined} */
SearchResults.prototype.facets;
/**
 * @record
 */
export function ServiceTypeStandard() { }
/** @type {?} */
ServiceTypeStandard.prototype.uri;
/** @type {?} */
ServiceTypeStandard.prototype.label;
/** @type {?} */
ServiceTypeStandard.prototype.resourceType;
/** @type {?|undefined} */
ServiceTypeStandard.prototype.availableVersions;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbInNoYXJlZC9tb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5leHBvcnQgaW50ZXJmYWNlIEl0ZW0ge1xuICAgIGlkIDogc3RyaW5nO1xuICAgIHR5cGUgOiBzdHJpbmc7XG4gICAgdXJpID86IHN0cmluZztcbiAgICB0aXRsZSA6IHN0cmluZztcbiAgICBsYWJlbCA/OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb24gPzogc3RyaW5nO1xuICAgIGNyZWF0ZWRCeSA/OiBzdHJpbmc7XG4gICAgbGFzdE1vZGlmaWVkQnkgPzogc3RyaW5nO1xuICAgIGNyZWF0ZWQgPzogbnVtYmVyO1xuICAgIG1vZGlmaWVkID86IG51bWJlcjtcbiAgICBfbW9kaWZpZWQgPzogbnVtYmVyO1xuICAgIHJlc291cmNlVHlwZXMgPzogc3RyaW5nW107XG5cbiAgICBbcHJvcE5hbWU6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBc3NldCBleHRlbmRzIEl0ZW0ge1xuICAgIGtleXdvcmRzICAgICA/OiBzdHJpbmdbXTtcbiAgICB0aGVtZXMgICAgICAgPzogQ29uY2VwdFtdO1xuICAgIHB1Ymxpc2hlcnMgICA/OiBPcmdhbml6YXRpb25bXTtcbiAgICBjb250cmlidXRvcnMgPzogT3JnYW5pemF0aW9uW107XG4gICAgY29udGFjdHMgICAgID86IENvbnRhY3RbXTtcbiAgICBhc3NldHMgICAgICAgPzogQXNzZXRbXTtcbiAgICBjbGFzc2lmaWVycyAgPzogYW55O1xuICAgIGhyZWYgICAgICAgICA/OiBzdHJpbmc7XG4gICAgbGFuZGluZ1BhZ2UgID86IHN0cmluZztcbiAgICB0aHVtYm5haWwgICAgPzoge1xuICAgICAgICB1cmwgICAgICAgICA/OiBzdHJpbmc7XG4gICAgICAgIGNvbnRlbnREYXRhID86IHN0cmluZztcbiAgICAgICAgd2lkdGggICAgICAgPzogc3RyaW5nfG51bWJlcjtcbiAgICAgICAgaGVpZ2h0ICAgICAgPzogc3RyaW5nfG51bWJlcjtcbiAgICAgICAgbWltZVR5cGUgICAgPzogc3RyaW5nO1xuICAgIH07XG4gICAgcmVsYXRlZCAgICAgPzogYW55W107XG4gICAgYXV4aWxsYXJ5UmVzb3VyY2VzID86IGFueVtdO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YXNldCBleHRlbmRzIEFzc2V0IHtcbiAgICBkaXN0cmlidXRpb25zID86IGFueVtdO1xufVxuZXhwb3J0IGludGVyZmFjZSBTZXJ2aWNlIGV4dGVuZHMgQXNzZXQge1xuICAgIHNlcnZpY2VUeXBlIDogU2VydmljZVR5cGVTdGFuZGFyZDtcbiAgICBzZXJ2aWNlVHlwZVZlcnNpb25zID86IHN0cmluZ1tdO1xuICAgIGhyZWYgOiBzdHJpbmc7XG59XG5leHBvcnQgaW50ZXJmYWNlIExheWVyIGV4dGVuZHMgQXNzZXQge1xuICAgIGxheWVyTmFtZSA/OiBzdHJpbmc7XG4gICAgbGF5ZXJUeXBlID86IHN0cmluZztcbiAgICBkaXN0cmlidXRpb25zID86IGFueVtdO1xuICAgIG1pblNjYWxlID86IG51bWJlcjtcbiAgICBtYXhTY2FsZSA/OiBudW1iZXI7XG4gICAgc3VwcG9ydGVkQ1JTID86IHN0cmluZ1tdO1xuICAgIHN1cHBvcnRlZEZvcm1hdHMgPzogc3RyaW5nW107XG59XG5leHBvcnQgaW50ZXJmYWNlIE1hcCBleHRlbmRzIEFzc2V0IHtcbiAgICBiYXNlTGF5ZXIgPzogTGF5ZXI7XG4gICAgbGF5ZXJzID86IHtcbiAgICAgICAgbGF5ZXIgOiBMYXllcjtcbiAgICAgICAgdmlzaWJpbGl0eSA/OiBib29sZWFuO1xuICAgICAgICBvcGFjaXR5ID86IG51bWJlcjtcbiAgICB9W107XG4gICAgYW5ub3RhdGlvbnMgPzogYW55O1xufVxuZXhwb3J0IGludGVyZmFjZSBHYWxsZXJ5IGV4dGVuZHMgQXNzZXQge1xuICAgIGl0ZW1zID86IHtcbiAgICAgICAgYXNzZXQgOiBJdGVtO1xuICAgICAgICBhc3NldElkIDogc3RyaW5nO1xuICAgICAgICBhc3NldFR5cGUgOiBzdHJpbmc7XG4gICAgfVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbW11bml0eSBleHRlbmRzIEFzc2V0IHtcbiAgICBtZW1iZXJzID86IGFueVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRvcGljIGV4dGVuZHMgQXNzZXQge1xuICAgIHN1YlRvcGljT2YgPzogVG9waWM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGljYXRpb24gZXh0ZW5kcyBBc3NldCB7XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBXZWJTaXRlIGV4dGVuZHMgQXNzZXQge1xuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3JnYW5pemF0aW9uIGV4dGVuZHMgSXRlbSB7XG4gICAgb3JnTmFtZSA6IHN0cmluZztcbiAgICBzdWJPcmdhbml6YXRpb25PZjogT3JnYW5pemF0aW9uO1xufVxuZXhwb3J0IGludGVyZmFjZSBDb250YWN0IGV4dGVuZHMgSXRlbSB7XG4gICAgZnVsbE5hbWUgPzogc3RyaW5nO1xuICAgIG9yZ05hbWUgPzogc3RyaW5nO1xuICAgIHBvc2l0aW9uVGl0bGUgPzogc3RyaW5nO1xuICAgIHRlbCA/OiBudW1iZXJ8c3RyaW5nO1xuICAgIGVtYWlsID86IHN0cmluZztcbiAgICBmYXggPzogbnVtYmVyfHN0cmluZztcbiAgICBhZGRyZXNzOiBhbnk7XG59XG5leHBvcnQgaW50ZXJmYWNlIENvbmNlcHRTY2hlbWUgZXh0ZW5kcyBJdGVtIHsgfVxuZXhwb3J0IGludGVyZmFjZSBDb25jZXB0IGV4dGVuZHMgSXRlbSB7XG4gICAgc2NoZW1lID86IENvbmNlcHRTY2hlbWU7XG4gICAgcHJlZkxhYmVsID86IHN0cmluZztcbn1cblxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoUmVzdWx0cyB7XG4gICAgdG90YWxSZXN1bHRzIDogbnVtYmVyO1xuICAgIHJlc3VsdHMgOiBJdGVtW107XG4gICAgZmFjZXRzID86IGFueVtdO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VydmljZVR5cGVTdGFuZGFyZCB7XG4gICAgdXJpIDogc3RyaW5nO1xuICAgIGxhYmVsIDogc3RyaW5nO1xuICAgIHJlc291cmNlVHlwZSA6IGFueTtcbiAgICBhdmFpbGFibGVWZXJzaW9ucyA/OiBzdHJpbmdbXTtcbn1cbiJdfQ==