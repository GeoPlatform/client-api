/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import ItemTypes from '../shared/types';
/** @type {?} */
var Categories = {
    UNKNOWN: 'Unknown Category',
    DATASET: 'Dataset',
    SERVICE: 'Service',
    LAYER: 'Layer',
    MAP: 'Map',
    GALLERY: 'Gallery',
    COMMUNITY: 'Community',
    CONTACT: 'Contact',
    ORGANIZATION: 'Organization',
    CONCEPT: 'Concept',
    CONCEPT_SCHEME: 'Concept Scheme',
    APPLICATION: 'Application',
    TOPIC: 'Topic',
    WEBSITE: 'WebSite',
    IMAGE_PRODUCT: 'Image Product',
    RIGHTS_STATEMENT: 'RightsStatement',
    KNOWLEDGE_GRAPH: 'Knowledge Graph',
    USER: 'User',
    COMMUNITY_POST: 'Community Post',
    //post within a community portal
    COMMUNITY_PAGE: 'Community Page',
    //page within a community portal
    APP_PAGE: 'Application Page',
};
/** @type {?} */
var Events = {
    ACCESSED: 'Accessed',
    //related item was accessed using API
    DISPLAYED: 'Displayed',
    //related item was displayed in a native form (map)
    VIEWED: 'Viewed',
    //related item was viewed in general form (metadata)
    CREATED: 'Created',
    EDITED: 'Edited',
    DELETED: 'Deleted',
    CLONED: 'Cloned',
    ADDED: 'Added',
    //item was added to another (ie, layer on map)
    REMOVED: 'Removed',
    //item was removed from another (ie, item from gallery)
    EXPORTED: 'Exported',
    IMPORTED: 'Imported'
};
/**
 * @param {?} type
 * @return {?}
 */
function getCategory(type) {
    /** @type {?} */
    var result = Categories["UNKNOWN"];
    if (type) {
        /** @type {?} */
        var cats = Object.keys(Categories).map(function (k) { return Categories[k]; });
        //if existing category was specified
        if (~cats.indexOf(type))
            return type;
        //if an ItemType with prefix was specified (strip off prefix)
        else if (~type.indexOf(':')) {
            /** @type {?} */
            var cat = type.split(':')[1];
            if (~cats.indexOf(cat))
                return cat;
        }
    }
    return result;
}
/**
 *
 */
var /**
 *
 */
Event = /** @class */ (function () {
    function Event(category, type, item, related) {
        this.item = null;
        this.related = null;
        if (!category || !type) {
            throw new Error("TrackingService Event - Must specific an event " +
                "category and event type when constructing events");
        }
        this.category = category;
        this.type = type;
        this.setItem(item);
        this.setRelated(related);
    }
    /**
     * @return {?}
     */
    Event.prototype.getCategory = /**
     * @return {?}
     */
    function () { return this.category; };
    /**
     * @return {?}
     */
    Event.prototype.getType = /**
     * @return {?}
     */
    function () { return this.type; };
    /**
     * @return {?}
     */
    Event.prototype.getItem = /**
     * @return {?}
     */
    function () { return this.item; };
    /**
     * @param {?} item
     * @return {?}
     */
    Event.prototype.setItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { this.item = item ? (item.id || item) : null; };
    /**
     * @return {?}
     */
    Event.prototype.getRelated = /**
     * @return {?}
     */
    function () { return this.related; };
    /**
     * @param {?} related
     * @return {?}
     */
    Event.prototype.setRelated = /**
     * @param {?} related
     * @return {?}
     */
    function (related) {
        this.related = related ? (related.id || related) : null;
    };
    return Event;
}());
if (false) {
    /** @type {?} */
    Event.prototype.category;
    /** @type {?} */
    Event.prototype.type;
    /** @type {?} */
    Event.prototype.item;
    /** @type {?} */
    Event.prototype.related;
}
/**
 * @param {?} eventType - type of event being created
 * @param {?} item - GeoPlatform Item instance
 * @return {?} list of event objects
 */
function TrackingEventFactory(eventType, item) {
    /** @type {?} */
    var result = /** @type {?} */ ([]);
    if (eventType && item && item.type) {
        if (ItemTypes.MAP === item.type) {
            result.push(new Event(Categories["MAP"], eventType, item));
            if (Events["DISPLAYED"] === eventType) {
                item.layers.forEach(function (layerState) {
                    if (layerState.layer) {
                        /** @type {?} */
                        var layerEvents = TrackingEventFactory(eventType, layerState.layer)
                            .filter(function (e) { return e !== null; });
                        if (layerEvents && layerEvents.length) {
                            result = result.concat(layerEvents);
                        }
                    }
                });
                if (item.baseLayer) {
                    /** @type {?} */
                    var baseEvents = TrackingEventFactory(eventType, item.baseLayer)
                        .filter(function (e) { return e !== null; });
                    if (baseEvents && baseEvents.length)
                        result = result.concat(baseEvents);
                }
            }
        }
        else if (ItemTypes.LAYER === item.type) {
            result.push(new Event(Categories["LAYER"], eventType, item));
            if (Events["DISPLAYED"] === eventType && item.services && item.services.length) {
                result.push(new Event(Categories["SERVICE"], eventType, item.services[0]));
            }
        }
        else {
            /** @type {?} */
            var category = getCategory(item.type);
            result.push(new Event(category, eventType, item));
        }
    }
    // else {
    //     if(!event) console.log("Missing event");
    //     if(!item) console.log("Missing item");
    //     if(!item.type) console.log("Missing item type");
    // }
    return result;
}
/**
 *
 */
var /**
 *
 */
DefaultTrackingServiceProvider = /** @class */ (function () {
    function DefaultTrackingServiceProvider() {
    }
    /**
     * @param {?} category
     * @param {?} event
     * @param {?=} item
     * @param {?=} related
     * @return {?}
     */
    DefaultTrackingServiceProvider.prototype.logEvent = /**
     * @param {?} category
     * @param {?} event
     * @param {?=} item
     * @param {?=} related
     * @return {?}
     */
    function (category, event, item, 
    // @ts-ignore
    // @ts-ignore
    related) {
        console.log("Event (" + category + ") - " + event + " : " + item);
    };
    /**
     * @param {?} view
     * @param {?} data
     * @return {?}
     */
    DefaultTrackingServiceProvider.prototype.logPageView = /**
     * @param {?} view
     * @param {?} data
     * @return {?}
     */
    function (view, data) {
        console.log("Page View " + view + (data ? " : " + JSON.stringify(data) : ''));
    };
    /**
     * @param {?} params
     * @param {?} resultCount
     * @return {?}
     */
    DefaultTrackingServiceProvider.prototype.logSearch = /**
     * @param {?} params
     * @param {?} resultCount
     * @return {?}
     */
    function (params, resultCount) {
        console.log("Query : " + JSON.stringify(params) + " found " + resultCount + " matches");
    };
    return DefaultTrackingServiceProvider;
}());
/**
 * TrackingService
 *
 * Service for logging events related to usage of the GeoPlatform and its data
 *
 * Example:
 *
 *   import { TrackingService, EventCategories, EventTypes } from 'geoplatform.client';
 *
 *   let tracker = new TrackingService();
 *   tracker.setProvider( ... );
 *   tracker.event( Event.of(EventCategories.MAP, EventTypes.VIEWED, map) );
 *
 * Multi-event example:
 *
 *   import {
 *      TrackingService, TrackingEventCategories, TrackingEventTypes, TrackingEventFactory
 *   } from 'geoplatform.client';
 *
 *   let tracker = new TrackingService();
 *   tracker.setProvider( ... );
 *
 *   let events = [
 *       TrackingEvent.of( TrackingCategories.MAP, TrackingEventTypes.VIEWED, this.map )
 *       TrackingEvent.of( TrackingCategories.LAYER, TrackingEventTypes.VIEWED, this.map.baseLayer )
 *   ];
 *   tracker.event(events);
 *
 *   //OR use the event factory:
 *   tracker.event( TrackingEventFactory(EventTypes.VIEWED, this.map) );
 */
var /**
 * TrackingService
 *
 * Service for logging events related to usage of the GeoPlatform and its data
 *
 * Example:
 *
 *   import { TrackingService, EventCategories, EventTypes } from 'geoplatform.client';
 *
 *   let tracker = new TrackingService();
 *   tracker.setProvider( ... );
 *   tracker.event( Event.of(EventCategories.MAP, EventTypes.VIEWED, map) );
 *
 * Multi-event example:
 *
 *   import {
 *      TrackingService, TrackingEventCategories, TrackingEventTypes, TrackingEventFactory
 *   } from 'geoplatform.client';
 *
 *   let tracker = new TrackingService();
 *   tracker.setProvider( ... );
 *
 *   let events = [
 *       TrackingEvent.of( TrackingCategories.MAP, TrackingEventTypes.VIEWED, this.map )
 *       TrackingEvent.of( TrackingCategories.LAYER, TrackingEventTypes.VIEWED, this.map.baseLayer )
 *   ];
 *   tracker.event(events);
 *
 *   //OR use the event factory:
 *   tracker.event( TrackingEventFactory(EventTypes.VIEWED, this.map) );
 */
TrackingService = /** @class */ (function () {
    function TrackingService(options) {
        this.provider = null;
        if (options && typeof (options) === 'object')
            Object.assign(this, options);
        if (!this.provider)
            this.setProvider(new DefaultTrackingServiceProvider());
    }
    /**
     * @param provider -
     */
    /**
     * @param {?} provider -
     * @return {?}
     */
    TrackingService.prototype.setProvider = /**
     * @param {?} provider -
     * @return {?}
     */
    function (provider) {
        if (provider)
            this.provider = provider;
    };
    /**
     * @param event - event to log
     * @return TrackingService
     */
    /**
     * @param {?} event - event to log
     * @return {?} TrackingService
     */
    TrackingService.prototype.event = /**
     * @param {?} event - event to log
     * @return {?} TrackingService
     */
    function (event) {
        this.logEvent(event);
        return this;
    };
    /**
     * @param event - event to log
     */
    /**
     * @param {?} event - event to log
     * @return {?}
     */
    TrackingService.prototype.logEvent = /**
     * @param {?} event - event to log
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!this.provider || !this.provider.logEvent || !event)
            return;
        if (Array.isArray(event)) {
            /** @type {?} */
            var events = /** @type {?} */ (event);
            events.forEach(function (evt) { return _this.logEvent(evt); });
        }
        else {
            /** @type {?} */
            var evt = /** @type {?} */ (event);
            try {
                this.provider.logEvent(evt.getCategory(), evt.getType(), evt.getItem(), evt.getRelated());
            }
            catch (e) {
                console.log("TrackingService.logEvent() - Error logging event (" +
                    evt.getCategory() + ", " + evt.getType() + ", " +
                    evt.getItem() + ") - " + e.message);
            }
        }
    };
    /**
     * @param view - name of the view being activated
     * @param data - additional context to supply for the event
     * @return TrackingService
     * @deprecated use svc.event( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     */
    /**
     * @deprecated use svc.event( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     * @param {?} view - name of the view being activated
     * @param {?} data - additional context to supply for the event
     * @return {?} TrackingService
     */
    TrackingService.prototype.pageView = /**
     * @deprecated use svc.event( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     * @param {?} view - name of the view being activated
     * @param {?} data - additional context to supply for the event
     * @return {?} TrackingService
     */
    function (view, data) {
        this.logPageView(view, data);
        return this;
    };
    /**
     * @param view - name of the view being activated
     * @param data - additional context to supply for the event
     * @deprecated use svc.logEvent( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     */
    /**
     * @deprecated use svc.logEvent( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     * @param {?} view - name of the view being activated
     * @param {?=} data - additional context to supply for the event
     * @return {?}
     */
    TrackingService.prototype.logPageView = /**
     * @deprecated use svc.logEvent( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     * @param {?} view - name of the view being activated
     * @param {?=} data - additional context to supply for the event
     * @return {?}
     */
    function (view, 
    // @ts-ignore
    // @ts-ignore
    data) {
        if (this.provider && this.provider.logPageView) {
            this.provider.logPageView(view, data);
        }
        else {
            this.logEvent(new Event(Categories["APP_PAGE"], Events["VIEWED"], view));
        }
    };
    /**
     * @param params
     * @param resultCount
     */
    /**
     * @param {?} params
     * @param {?} resultCount
     * @return {?}
     */
    TrackingService.prototype.logSearch = /**
     * @param {?} params
     * @param {?} resultCount
     * @return {?}
     */
    function (params, resultCount) {
        if (this.provider.logSearch)
            this.provider.logSearch(params, resultCount);
    };
    return TrackingService;
}());
if (false) {
    /** @type {?} */
    TrackingService.prototype.provider;
}
export { Event as TrackingEvent, TrackingService, Categories as TrackingCategories, Events as TrackingTypes, TrackingEventFactory };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tpbmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvdHJhY2tpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDOztBQUd4QyxJQUFNLFVBQVUsR0FBMkI7SUFDdkMsT0FBTyxFQUFVLGtCQUFrQjtJQUNuQyxPQUFPLEVBQVUsU0FBUztJQUMxQixPQUFPLEVBQVUsU0FBUztJQUMxQixLQUFLLEVBQVksT0FBTztJQUN4QixHQUFHLEVBQWMsS0FBSztJQUN0QixPQUFPLEVBQVUsU0FBUztJQUMxQixTQUFTLEVBQVEsV0FBVztJQUM1QixPQUFPLEVBQVUsU0FBUztJQUMxQixZQUFZLEVBQUssY0FBYztJQUMvQixPQUFPLEVBQVUsU0FBUztJQUMxQixjQUFjLEVBQUcsZ0JBQWdCO0lBQ2pDLFdBQVcsRUFBTSxhQUFhO0lBQzlCLEtBQUssRUFBWSxPQUFPO0lBQ3hCLE9BQU8sRUFBVSxTQUFTO0lBQzFCLGFBQWEsRUFBSSxlQUFlO0lBQ2hDLGdCQUFnQixFQUFDLGlCQUFpQjtJQUNsQyxlQUFlLEVBQUUsaUJBQWlCO0lBQ2xDLElBQUksRUFBYSxNQUFNO0lBQ3ZCLGNBQWMsRUFBRyxnQkFBZ0I7O0lBQ2pDLGNBQWMsRUFBRyxnQkFBZ0I7O0lBQ2pDLFFBQVEsRUFBUyxrQkFBa0I7Q0FDdEMsQ0FBQzs7QUFFRixJQUFNLE1BQU0sR0FBMkI7SUFDbkMsUUFBUSxFQUFJLFVBQVU7O0lBQ3RCLFNBQVMsRUFBRyxXQUFXOztJQUN2QixNQUFNLEVBQU0sUUFBUTs7SUFDcEIsT0FBTyxFQUFLLFNBQVM7SUFDckIsTUFBTSxFQUFNLFFBQVE7SUFDcEIsT0FBTyxFQUFLLFNBQVM7SUFDckIsTUFBTSxFQUFNLFFBQVE7SUFDcEIsS0FBSyxFQUFPLE9BQU87O0lBQ25CLE9BQU8sRUFBSyxTQUFTOztJQUNyQixRQUFRLEVBQUksVUFBVTtJ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b3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IEl0ZW1UeXBlcyBmcm9tICcuLi9zaGFyZWQvdHlwZXMnO1xuXG5cbmNvbnN0IENhdGVnb3JpZXMgOiB7W2tleTpzdHJpbmddOnN0cmluZ30gPSB7XG4gICAgVU5LTk9XTjogICAgICAgICAnVW5rbm93biBDYXRlZ29yeScsXG4gICAgREFUQVNFVDogICAgICAgICAnRGF0YXNldCcsXG4gICAgU0VSVklDRTogICAgICAgICAnU2VydmljZScsXG4gICAgTEFZRVI6ICAgICAgICAgICAnTGF5ZXInLFxuICAgIE1BUDogICAgICAgICAgICAgJ01hcCcsXG4gICAgR0FMTEVSWTogICAgICAgICAnR2FsbGVyeScsXG4gICAgQ09NTVVOSVRZOiAgICAgICAnQ29tbXVuaXR5JyxcbiAgICBDT05UQUNUOiAgICAgICAgICdDb250YWN0JyxcbiAgICBPUkdBTklaQVRJT046ICAgICdPcmdhbml6YXRpb24nLFxuICAgIENPTkNFUFQ6ICAgICAgICAgJ0NvbmNlcHQnLFxuICAgIENPTkNFUFRfU0NIRU1FOiAgJ0NvbmNlcHQgU2NoZW1lJyxcbiAgICBBUFBMSUNBVElPTjogICAgICdBcHBsaWNhdGlvbicsXG4gICAgVE9QSUM6ICAgICAgICAgICAnVG9waWMnLFxuICAgIFdFQlNJVEU6ICAgICAgICAgJ1dlYlNpdGUnLFxuICAgIElNQUdFX1BST0RVQ1Q6ICAgJ0ltYWdlIFByb2R1Y3QnLFxuICAgIFJJR0hUU19TVEFURU1FTlQ6J1JpZ2h0c1N0YXRlbWVudCcsXG4gICAgS05PV0xFREdFX0dSQVBIOiAnS25vd2xlZGdlIEdyYXBoJyxcbiAgICBVU0VSOiAgICAgICAgICAgICdVc2VyJyxcbiAgICBDT01NVU5JVFlfUE9TVDogICdDb21tdW5pdHkgUG9zdCcsICAgLy9wb3N0IHdpdGhpbiBhIGNvbW11bml0eSBwb3J0YWxcbiAgICBDT01NVU5JVFlfUEFHRTogICdDb21tdW5pdHkgUGFnZScsICAgLy9wYWdlIHdpdGhpbiBhIGNvbW11bml0eSBwb3J0YWxcbiAgICBBUFBfUEFHRTogICAgICAgICdBcHBsaWNhdGlvbiBQYWdlJywgLy9wYWdlL3ZpZXcgd2l0aGluIGEgY2xpZW50IGFwcGxpY2F0aW9uXG59O1xuXG5jb25zdCBFdmVudHMgOiB7W2tleTpzdHJpbmddOnN0cmluZ30gPSB7XG4gICAgQUNDRVNTRUQ6ICAgJ0FjY2Vzc2VkJywgIC8vcmVsYXRlZCBpdGVtIHdhcyBhY2Nlc3NlZCB1c2luZyBBUElcbiAgICBESVNQTEFZRUQ6ICAnRGlzcGxheWVkJywgLy9yZWxhdGVkIGl0ZW0gd2FzIGRpc3BsYXllZCBpbiBhIG5hdGl2ZSBmb3JtIChtYXApXG4gICAgVklFV0VEOiAgICAgJ1ZpZXdlZCcsICAgIC8vcmVsYXRlZCBpdGVtIHdhcyB2aWV3ZWQgaW4gZ2VuZXJhbCBmb3JtIChtZXRhZGF0YSlcbiAgICBDUkVBVEVEOiAgICAnQ3JlYXRlZCcsXG4gICAgRURJVEVEOiAgICAgJ0VkaXRlZCcsXG4gICAgREVMRVRFRDogICAgJ0RlbGV0ZWQnLFxuICAgIENMT05FRDogICAgICdDbG9uZWQnLFxuICAgIEFEREVEOiAgICAgICdBZGRlZCcsICAgIC8vaXRlbSB3YXMgYWRkZWQgdG8gYW5vdGhlciAoaWUsIGxheWVyIG9uIG1hcClcbiAgICBSRU1PVkVEOiAgICAnUmVtb3ZlZCcsICAvL2l0ZW0gd2FzIHJlbW92ZWQgZnJvbSBhbm90aGVyIChpZSwgaXRlbSBmcm9tIGdhbGxlcnkpXG4gICAgRVhQT1JURUQ6ICAgJ0V4cG9ydGVkJyxcbiAgICBJTVBPUlRFRDogICAnSW1wb3J0ZWQnXG59O1xuXG5cbmZ1bmN0aW9uIGdldENhdGVnb3J5KHR5cGUgOiBzdHJpbmcpIDogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gQ2F0ZWdvcmllcy5VTktOT1dOO1xuICAgIGlmKHR5cGUpIHtcbiAgICAgICAgbGV0IGNhdHMgOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKENhdGVnb3JpZXMpLm1hcCgoazpzdHJpbmcpPT5DYXRlZ29yaWVzW2tdKTtcbiAgICAgICAgLy9pZiBleGlzdGluZyBjYXRlZ29yeSB3YXMgc3BlY2lmaWVkXG4gICAgICAgIGlmKH5jYXRzLmluZGV4T2YodHlwZSkpXG4gICAgICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgICAgLy9pZiBhbiBJdGVtVHlwZSB3aXRoIHByZWZpeCB3YXMgc3BlY2lmaWVkIChzdHJpcCBvZmYgcHJlZml4KVxuICAgICAgICBlbHNlIGlmKH50eXBlLmluZGV4T2YoJzonKSkge1xuICAgICAgICAgICAgbGV0IGNhdCA9IHR5cGUuc3BsaXQoJzonKVsxXTtcbiAgICAgICAgICAgIGlmKH5jYXRzLmluZGV4T2YoY2F0KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gY2F0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKipcbiAqXG4gKi9cbmNsYXNzIEV2ZW50IHtcblxuICAgIHByaXZhdGUgY2F0ZWdvcnkgOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSB0eXBlIDogc3RyaW5nO1xuICAgIHByaXZhdGUgaXRlbSA6IGFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSByZWxhdGVkIDogYW55ID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKGNhdGVnb3J5IDogc3RyaW5nLCB0eXBlIDogc3RyaW5nLCBpdGVtID86IGFueSwgcmVsYXRlZCA/OiBhbnkpIHtcbiAgICAgICAgaWYoIWNhdGVnb3J5IHx8ICEgdHlwZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVHJhY2tpbmdTZXJ2aWNlIEV2ZW50IC0gTXVzdCBzcGVjaWZpYyBhbiBldmVudCBcIiArXG4gICAgICAgICAgICBcImNhdGVnb3J5IGFuZCBldmVudCB0eXBlIHdoZW4gY29uc3RydWN0aW5nIGV2ZW50c1wiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuc2V0SXRlbShpdGVtKTtcbiAgICAgICAgdGhpcy5zZXRSZWxhdGVkKHJlbGF0ZWQpO1xuICAgIH1cbiAgICBnZXRDYXRlZ29yeSgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMuY2F0ZWdvcnk7IH1cbiAgICBnZXRUeXBlKCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy50eXBlOyB9XG4gICAgZ2V0SXRlbSgpIDogYW55IHsgcmV0dXJuIHRoaXMuaXRlbTsgfVxuICAgIHNldEl0ZW0oaXRlbSA6IGFueSkgeyB0aGlzLml0ZW0gPSBpdGVtID8gKGl0ZW0uaWQgfHwgaXRlbSkgOiBudWxsOyB9XG4gICAgZ2V0UmVsYXRlZCgpIDogYW55IHsgcmV0dXJuIHRoaXMucmVsYXRlZDsgfVxuICAgIHNldFJlbGF0ZWQocmVsYXRlZCA6IGFueSkge1xuICAgICAgICB0aGlzLnJlbGF0ZWQgPSByZWxhdGVkID8gKHJlbGF0ZWQuaWQgfHwgcmVsYXRlZCkgOiBudWxsO1xuICAgIH1cbn1cblxuXG5cbi8qKlxuICogQHBhcmFtIGV2ZW50VHlwZSAtIHR5cGUgb2YgZXZlbnQgYmVpbmcgY3JlYXRlZFxuICogQHBhcmFtIGl0ZW0gLSBHZW9QbGF0Zm9ybSBJdGVtIGluc3RhbmNlXG4gKiBAcmV0dXJuIGxpc3Qgb2YgZXZlbnQgb2JqZWN0c1xuICovXG5mdW5jdGlvbiBUcmFja2luZ0V2ZW50RmFjdG9yeShldmVudFR5cGUgOiBzdHJpbmcsIGl0ZW0gOiBhbnkpIDogRXZlbnRbXSB7XG4gICAgbGV0IHJlc3VsdCA6IEV2ZW50W10gPSBbXSBhcyBFdmVudFtdO1xuICAgIGlmKGV2ZW50VHlwZSAmJiBpdGVtICYmIGl0ZW0udHlwZSkge1xuICAgICAgICBpZihJdGVtVHlwZXMuTUFQID09PSBpdGVtLnR5cGUpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCBuZXcgRXZlbnQoQ2F0ZWdvcmllcy5NQVAsIGV2ZW50VHlwZSwgaXRlbSkgKTtcbiAgICAgICAgICAgIGlmKEV2ZW50cy5ESVNQTEFZRUQgPT09IGV2ZW50VHlwZSkge1xuXG4gICAgICAgICAgICAgICAgaXRlbS5sYXllcnMuZm9yRWFjaCggKGxheWVyU3RhdGUgOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYobGF5ZXJTdGF0ZS5sYXllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxheWVyRXZlbnRzID0gVHJhY2tpbmdFdmVudEZhY3RvcnkoZXZlbnRUeXBlLCBsYXllclN0YXRlLmxheWVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZT0+ZSE9PW51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGF5ZXJFdmVudHMgJiYgbGF5ZXJFdmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdChsYXllckV2ZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmKGl0ZW0uYmFzZUxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBiYXNlRXZlbnRzID0gVHJhY2tpbmdFdmVudEZhY3RvcnkoZXZlbnRUeXBlLCBpdGVtLmJhc2VMYXllcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZT0+ZSE9PW51bGwpO1xuICAgICAgICAgICAgICAgICAgICBpZihiYXNlRXZlbnRzICYmIGJhc2VFdmVudHMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdCggYmFzZUV2ZW50cyApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYoSXRlbVR5cGVzLkxBWUVSID09PSBpdGVtLnR5cGUpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCBuZXcgRXZlbnQoQ2F0ZWdvcmllcy5MQVlFUiwgZXZlbnRUeXBlLCBpdGVtKSApO1xuICAgICAgICAgICAgaWYoRXZlbnRzLkRJU1BMQVlFRCA9PT0gZXZlbnRUeXBlICYmIGl0ZW0uc2VydmljZXMgJiYgaXRlbS5zZXJ2aWNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCggbmV3IEV2ZW50KENhdGVnb3JpZXMuU0VSVklDRSwgZXZlbnRUeXBlLCBpdGVtLnNlcnZpY2VzWzBdKSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNhdGVnb3J5ID0gZ2V0Q2F0ZWdvcnkoaXRlbS50eXBlKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCBuZXcgRXZlbnQoY2F0ZWdvcnksIGV2ZW50VHlwZSwgaXRlbSkgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBlbHNlIHtcbiAgICAvLyAgICAgaWYoIWV2ZW50KSBjb25zb2xlLmxvZyhcIk1pc3NpbmcgZXZlbnRcIik7XG4gICAgLy8gICAgIGlmKCFpdGVtKSBjb25zb2xlLmxvZyhcIk1pc3NpbmcgaXRlbVwiKTtcbiAgICAvLyAgICAgaWYoIWl0ZW0udHlwZSkgY29uc29sZS5sb2coXCJNaXNzaW5nIGl0ZW0gdHlwZVwiKTtcbiAgICAvLyB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cblxuXG4vKipcbiAqXG4gKi9cbmNsYXNzIERlZmF1bHRUcmFja2luZ1NlcnZpY2VQcm92aWRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuICAgIGxvZ0V2ZW50KFxuICAgICAgICBjYXRlZ29yeSA6IHN0cmluZyxcbiAgICAgICAgZXZlbnQgOiBzdHJpbmcsXG4gICAgICAgIGl0ZW0gPzogYW55LFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJlbGF0ZWQgPzogYW55XG4gICAgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCBcIkV2ZW50IChcIiArIGNhdGVnb3J5ICsgXCIpIC0gXCIgKyBldmVudCArIFwiIDogXCIgKyBpdGVtKTtcbiAgICB9XG4gICAgbG9nUGFnZVZpZXcoIHZpZXcsIGRhdGEgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGFnZSBWaWV3IFwiICsgdmlldyArIChkYXRhID8gXCIgOiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpIDogJycpICk7XG4gICAgfVxuICAgIGxvZ1NlYXJjaChwYXJhbXMgOiBzdHJpbmcsIHJlc3VsdENvdW50IDogc3RyaW5nfG51bWJlcikge1xuICAgICAgICBjb25zb2xlLmxvZyggXCJRdWVyeSA6IFwiICsgSlNPTi5zdHJpbmdpZnkocGFyYW1zKSArIFwiIGZvdW5kIFwiICsgcmVzdWx0Q291bnQrIFwiIG1hdGNoZXNcIik7XG4gICAgfVxufVxuXG5cblxuXG5cblxuLyoqXG4gKiBUcmFja2luZ1NlcnZpY2VcbiAqXG4gKiBTZXJ2aWNlIGZvciBsb2dnaW5nIGV2ZW50cyByZWxhdGVkIHRvIHVzYWdlIG9mIHRoZSBHZW9QbGF0Zm9ybSBhbmQgaXRzIGRhdGFcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgaW1wb3J0IHsgVHJhY2tpbmdTZXJ2aWNlLCBFdmVudENhdGVnb3JpZXMsIEV2ZW50VHlwZXMgfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuICpcbiAqICAgbGV0IHRyYWNrZXIgPSBuZXcgVHJhY2tpbmdTZXJ2aWNlKCk7XG4gKiAgIHRyYWNrZXIuc2V0UHJvdmlkZXIoIC4uLiApO1xuICogICB0cmFja2VyLmV2ZW50KCBFdmVudC5vZihFdmVudENhdGVnb3JpZXMuTUFQLCBFdmVudFR5cGVzLlZJRVdFRCwgbWFwKSApO1xuICpcbiAqIE11bHRpLWV2ZW50IGV4YW1wbGU6XG4gKlxuICogICBpbXBvcnQge1xuICogICAgICBUcmFja2luZ1NlcnZpY2UsIFRyYWNraW5nRXZlbnRDYXRlZ29yaWVzLCBUcmFja2luZ0V2ZW50VHlwZXMsIFRyYWNraW5nRXZlbnRGYWN0b3J5XG4gKiAgIH0gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcbiAqXG4gKiAgIGxldCB0cmFja2VyID0gbmV3IFRyYWNraW5nU2VydmljZSgpO1xuICogICB0cmFja2VyLnNldFByb3ZpZGVyKCAuLi4gKTtcbiAqXG4gKiAgIGxldCBldmVudHMgPSBbXG4gKiAgICAgICBUcmFja2luZ0V2ZW50Lm9mKCBUcmFja2luZ0NhdGVnb3JpZXMuTUFQLCBUcmFja2luZ0V2ZW50VHlwZXMuVklFV0VELCB0aGlzLm1hcCApXG4gKiAgICAgICBUcmFja2luZ0V2ZW50Lm9mKCBUcmFja2luZ0NhdGVnb3JpZXMuTEFZRVIsIFRyYWNraW5nRXZlbnRUeXBlcy5WSUVXRUQsIHRoaXMubWFwLmJhc2VMYXllciApXG4gKiAgIF07XG4gKiAgIHRyYWNrZXIuZXZlbnQoZXZlbnRzKTtcbiAqXG4gKiAgIC8vT1IgdXNlIHRoZSBldmVudCBmYWN0b3J5OlxuICogICB0cmFja2VyLmV2ZW50KCBUcmFja2luZ0V2ZW50RmFjdG9yeShFdmVudFR5cGVzLlZJRVdFRCwgdGhpcy5tYXApICk7XG4gKi9cbmNsYXNzIFRyYWNraW5nU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHByb3ZpZGVyIDogYW55ID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPzogYW55KSB7XG4gICAgICAgIGlmKG9wdGlvbnMgJiYgdHlwZW9mKG9wdGlvbnMpID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgaWYoIXRoaXMucHJvdmlkZXIpXG4gICAgICAgICAgICB0aGlzLnNldFByb3ZpZGVyKG5ldyBEZWZhdWx0VHJhY2tpbmdTZXJ2aWNlUHJvdmlkZXIoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHByb3ZpZGVyIC1cbiAgICAgKi9cbiAgICBzZXRQcm92aWRlcihwcm92aWRlciA6IGFueSkge1xuICAgICAgICBpZihwcm92aWRlcilcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXIgPSBwcm92aWRlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZXZlbnQgLSBldmVudCB0byBsb2dcbiAgICAgKiBAcmV0dXJuIFRyYWNraW5nU2VydmljZVxuICAgICAqL1xuICAgIGV2ZW50KCBldmVudCA6IEV2ZW50ICkgOiBUcmFja2luZ1NlcnZpY2Uge1xuICAgICAgICB0aGlzLmxvZ0V2ZW50KCBldmVudCApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZXZlbnQgLSBldmVudCB0byBsb2dcbiAgICAgKi9cbiAgICBsb2dFdmVudCggZXZlbnQgOiBFdmVudHxFdmVudFtdKSB7XG4gICAgICAgIGlmKCF0aGlzLnByb3ZpZGVyIHx8ICF0aGlzLnByb3ZpZGVyLmxvZ0V2ZW50IHx8ICFldmVudCkgcmV0dXJuO1xuXG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkoZXZlbnQpKSB7XG4gICAgICAgICAgICBsZXQgZXZlbnRzIDogRXZlbnRbXSA9IGV2ZW50IGFzIEV2ZW50W107XG4gICAgICAgICAgICBldmVudHMuZm9yRWFjaCggKGV2dCA6IEV2ZW50KSA9PiB0aGlzLmxvZ0V2ZW50KGV2dCkgKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGV2dCA6IEV2ZW50ID0gZXZlbnQgYXMgRXZlbnQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvdmlkZXIubG9nRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIGV2dC5nZXRDYXRlZ29yeSgpLFxuICAgICAgICAgICAgICAgICAgICBldnQuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgICAgICAgICBldnQuZ2V0SXRlbSgpLFxuICAgICAgICAgICAgICAgICAgICBldnQuZ2V0UmVsYXRlZCgpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBcIlRyYWNraW5nU2VydmljZS5sb2dFdmVudCgpIC0gRXJyb3IgbG9nZ2luZyBldmVudCAoXCIgK1xuICAgICAgICAgICAgICAgICAgICBldnQuZ2V0Q2F0ZWdvcnkoKSArIFwiLCBcIiArIGV2dC5nZXRUeXBlKCkgKyBcIiwgXCIgK1xuICAgICAgICAgICAgICAgICAgICBldnQuZ2V0SXRlbSgpICsgXCIpIC0gXCIgKyBlLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdmlldyAtIG5hbWUgb2YgdGhlIHZpZXcgYmVpbmcgYWN0aXZhdGVkXG4gICAgICogQHBhcmFtIGRhdGEgLSBhZGRpdGlvbmFsIGNvbnRleHQgdG8gc3VwcGx5IGZvciB0aGUgZXZlbnRcbiAgICAgKiBAcmV0dXJuIFRyYWNraW5nU2VydmljZVxuICAgICAqIEBkZXByZWNhdGVkIHVzZSBzdmMuZXZlbnQoIG5ldyBFdmVudChFdmVudENhdGVnb3JpZXMuQVBQX1BBR0UsIEV2ZW50VHlwZXMuVklFV0VELCBwYWdlSWQpIClcbiAgICAgKi9cbiAgICBwYWdlVmlldyggdmlldyA6IHN0cmluZywgZGF0YSA6IGFueSkge1xuICAgICAgICB0aGlzLmxvZ1BhZ2VWaWV3KHZpZXcsIGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdmlldyAtIG5hbWUgb2YgdGhlIHZpZXcgYmVpbmcgYWN0aXZhdGVkXG4gICAgICogQHBhcmFtIGRhdGEgLSBhZGRpdGlvbmFsIGNvbnRleHQgdG8gc3VwcGx5IGZvciB0aGUgZXZlbnRcbiAgICAgKiBAZGVwcmVjYXRlZCB1c2Ugc3ZjLmxvZ0V2ZW50KCBuZXcgRXZlbnQoRXZlbnRDYXRlZ29yaWVzLkFQUF9QQUdFLCBFdmVudFR5cGVzLlZJRVdFRCwgcGFnZUlkKSApXG4gICAgICovXG4gICAgbG9nUGFnZVZpZXcoXG4gICAgICAgIHZpZXcgOiBzdHJpbmcsXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZGF0YSA/OiBhbnlcbiAgICApIHtcbiAgICAgICAgaWYodGhpcy5wcm92aWRlciAmJiB0aGlzLnByb3ZpZGVyLmxvZ1BhZ2VWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVyLmxvZ1BhZ2VWaWV3KHZpZXcsIGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dFdmVudCggbmV3IEV2ZW50KENhdGVnb3JpZXMuQVBQX1BBR0UsIEV2ZW50cy5WSUVXRUQsIHZpZXcpICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICogQHBhcmFtIHJlc3VsdENvdW50XG4gICAgICovXG4gICAgbG9nU2VhcmNoIChwYXJhbXMgOiBhbnksIHJlc3VsdENvdW50IDogc3RyaW5nfG51bWJlcikge1xuICAgICAgICBpZih0aGlzLnByb3ZpZGVyLmxvZ1NlYXJjaClcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXIubG9nU2VhcmNoKHBhcmFtcywgcmVzdWx0Q291bnQpO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCB7XG4gICAgRXZlbnQgYXMgVHJhY2tpbmdFdmVudCxcbiAgICBUcmFja2luZ1NlcnZpY2UsXG4gICAgQ2F0ZWdvcmllcyBhcyBUcmFja2luZ0NhdGVnb3JpZXMsXG4gICAgRXZlbnRzIGFzIFRyYWNraW5nVHlwZXMsXG4gICAgVHJhY2tpbmdFdmVudEZhY3Rvcnlcbn07XG4iXX0=