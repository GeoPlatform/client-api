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
Asset.prototype.thumbnail;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NsaWVudC8iLCJzb3VyY2VzIjpbInNoYXJlZC9tb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5leHBvcnQgaW50ZXJmYWNlIEl0ZW0ge1xuICAgIGlkIDogc3RyaW5nO1xuICAgIHR5cGUgOiBzdHJpbmc7XG4gICAgdXJpID86IHN0cmluZztcbiAgICB0aXRsZSA6IHN0cmluZztcbiAgICBsYWJlbCA/OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb24gPzogc3RyaW5nO1xuICAgIGNyZWF0ZWRCeSA/OiBzdHJpbmc7XG4gICAgbGFzdE1vZGlmaWVkQnkgPzogc3RyaW5nO1xuICAgIGNyZWF0ZWQgPzogbnVtYmVyO1xuICAgIG1vZGlmaWVkID86IG51bWJlcjtcbiAgICBfbW9kaWZpZWQgPzogbnVtYmVyO1xuICAgIHJlc291cmNlVHlwZXMgPzogc3RyaW5nW107XG5cbiAgICBbcHJvcE5hbWU6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBc3NldCBleHRlbmRzIEl0ZW0ge1xuICAgIHRoZW1lcyA/OiBDb25jZXB0W107XG4gICAgcHVibGlzaGVycyA/OiBPcmdhbml6YXRpb25bXTtcbiAgICBjb250cmlidXRvcnMgPzogT3JnYW5pemF0aW9uW107XG4gICAgY29udGFjdHMgPzogQ29udGFjdFtdO1xuICAgIGFzc2V0cyA/OiBBc3NldFtdO1xuICAgIGNsYXNzaWZpZXJzID86IGFueTtcbiAgICB0aHVtYm5haWwgPzoge1xuICAgICAgICB1cmwgPzogc3RyaW5nO1xuICAgICAgICBjb250ZW50RGF0YSA/OiBzdHJpbmc7XG4gICAgICAgIHdpZHRoID86IHN0cmluZ3xudW1iZXI7XG4gICAgICAgIGhlaWdodCA/OiBzdHJpbmd8bnVtYmVyO1xuICAgICAgICBtaW1lVHlwZSA/OiBzdHJpbmc7XG4gICAgfTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFzZXQgZXh0ZW5kcyBBc3NldCB7XG4gICAgZGlzdHJpYnV0aW9ucyA/OiBhbnlbXTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgU2VydmljZSBleHRlbmRzIEFzc2V0IHtcbiAgICBzZXJ2aWNlVHlwZSA6IGFueTtcbiAgICBocmVmIDogc3RyaW5nO1xufVxuZXhwb3J0IGludGVyZmFjZSBMYXllciBleHRlbmRzIEFzc2V0IHtcbiAgICBsYXllck5hbWUgPzogc3RyaW5nO1xuICAgIGxheWVyVHlwZSA/OiBzdHJpbmc7XG4gICAgZGlzdHJpYnV0aW9ucyA/OiBhbnlbXTtcbiAgICBtaW5TY2FsZSA/OiBudW1iZXI7XG4gICAgbWF4U2NhbGUgPzogbnVtYmVyO1xuICAgIHN1cHBvcnRlZENSUyA/OiBzdHJpbmdbXTtcbiAgICBzdXBwb3J0ZWRGb3JtYXRzID86IHN0cmluZ1tdO1xufVxuZXhwb3J0IGludGVyZmFjZSBNYXAgZXh0ZW5kcyBBc3NldCB7XG4gICAgYmFzZUxheWVyID86IExheWVyO1xuICAgIGxheWVycyA/OiB7XG4gICAgICAgIGxheWVyIDogTGF5ZXI7XG4gICAgICAgIHZpc2liaWxpdHkgPzogYm9vbGVhbjtcbiAgICAgICAgb3BhY2l0eSA/OiBudW1iZXI7XG4gICAgfVtdO1xuICAgIGFubm90YXRpb25zID86IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgR2FsbGVyeSBleHRlbmRzIEFzc2V0IHtcbiAgICBpdGVtcyA/OiB7XG4gICAgICAgIGFzc2V0IDogSXRlbTtcbiAgICAgICAgYXNzZXRJZCA6IHN0cmluZztcbiAgICAgICAgYXNzZXRUeXBlIDogc3RyaW5nO1xuICAgIH1bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcmdhbml6YXRpb24gZXh0ZW5kcyBJdGVtIHtcbiAgICBvcmdOYW1lIDogc3RyaW5nO1xuICAgIHN1Yk9yZ2FuaXphdGlvbk9mOiBPcmdhbml6YXRpb247XG59XG5leHBvcnQgaW50ZXJmYWNlIENvbnRhY3QgZXh0ZW5kcyBJdGVtIHtcbiAgICBmdWxsTmFtZSA/OiBzdHJpbmc7XG4gICAgb3JnTmFtZSA/OiBzdHJpbmc7XG4gICAgcG9zaXRpb25UaXRsZSA/OiBzdHJpbmc7XG4gICAgdGVsID86IG51bWJlcnxzdHJpbmc7XG4gICAgZW1haWwgPzogc3RyaW5nO1xuICAgIGZheCA/OiBudW1iZXJ8c3RyaW5nO1xuICAgIGFkZHJlc3M6IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQ29uY2VwdFNjaGVtZSBleHRlbmRzIEl0ZW0geyB9XG5leHBvcnQgaW50ZXJmYWNlIENvbmNlcHQgZXh0ZW5kcyBJdGVtIHtcbiAgICBzY2hlbWUgPzogQ29uY2VwdFNjaGVtZTtcbiAgICBwcmVmTGFiZWwgPzogc3RyaW5nO1xufVxuXG5cblxuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hSZXN1bHRzIHtcbiAgICB0b3RhbFJlc3VsdHMgOiBudW1iZXI7XG4gICAgcmVzdWx0cyA6IEl0ZW1bXTtcbiAgICBmYWNldHMgPzogYW55W107XG59XG4iXX0=