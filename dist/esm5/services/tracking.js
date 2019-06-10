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
        console.log("EVENT (" + category + ") - " + event + " : " + item);
    };
    // logPageView( view, data ) {
    //     console.log("PAGEVIEW " + view + (data ? " : " + JSON.stringify(data) : '') );
    // }
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
        this.logEvent(new Event(Categories["APP_PAGE"], Events["VIEWED"], view));
        // if(this.provider && this.provider.logPageView) {
        //     this.provider.logPageView(view, data);
        // }
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
        this.provider.logSearch(params, resultCount);
    };
    return TrackingService;
}());
if (false) {
    /** @type {?} */
    TrackingService.prototype.provider;
}
export { Event as TrackingEvent, TrackingService, Categories as TrackingCategories, Events as TrackingTypes, TrackingEventFactory };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tpbmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvdHJhY2tpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDOztBQUd4QyxJQUFNLFVBQVUsR0FBMkI7SUFDdkMsT0FBTyxFQUFVLGtCQUFrQjtJQUNuQyxPQUFPLEVBQVUsU0FBUztJQUMxQixPQUFPLEVBQVUsU0FBUztJQUMxQixLQUFLLEVBQVksT0FBTztJQUN4QixHQUFHLEVBQWMsS0FBSztJQUN0QixPQUFPLEVBQVUsU0FBUztJQUMxQixTQUFTLEVBQVEsV0FBVztJQUM1QixPQUFPLEVBQVUsU0FBUztJQUMxQixZQUFZLEVBQUssY0FBYztJQUMvQixPQUFPLEVBQVUsU0FBUztJQUMxQixjQUFjLEVBQUcsZ0JBQWdCO0lBQ2pDLFdBQVcsRUFBTSxhQUFhO0lBQzlCLEtBQUssRUFBWSxPQUFPO0lBQ3hCLE9BQU8sRUFBVSxTQUFTO0lBQzFCLGFBQWEsRUFBSSxlQUFlO0lBQ2hDLGdCQUFnQixFQUFDLGlCQUFpQjtJQUNsQyxlQUFlLEVBQUUsaUJBQWlCO0lBQ2xDLElBQUksRUFBYSxNQUFNO0lBQ3ZCLGNBQWMsRUFBRyxnQkFBZ0I7O0lBQ2pDLGNBQWMsRUFBRyxnQkFBZ0I7O0lBQ2pDLFFBQVEsRUFBUyxrQkFBa0I7Q0FDdEMsQ0FBQzs7QUFFRixJQUFNLE1BQU0sR0FBMkI7SUFDbkMsUUFBUSxFQUFJLFVBQVU7O0lBQ3RCLFNBQVMsRUFBRyxXQUFXOztJQUN2QixNQUFNLEVBQU0sUUFBUTs7SUFDcEIsT0FBTyxFQUFLLFNBQVM7SUFDckIsTUFBTSxFQUFNLFFBQVE7SUFDcEIsT0FBTyxFQUFLLFNBQVM7SUFDckIsTUFBTSxFQUFNLFFBQVE7SUFDcEIsS0FBSyxFQUFPLE9BQU87O0lBQ25CLE9BQU8sRUFBSyxTQUFTOztJQUNyQixRQUFRLEVBQUksVUFBVTtJ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Q0o7S0FDSjtJQUdEOzs7OztPQUtHOzs7Ozs7O0lBQ0gsa0NBQVE7Ozs7OztJQUFSLFVBQVUsSUFBYSxFQUFFLElBQVU7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0IsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCxxQ0FBVzs7Ozs7O0lBQVgsVUFDSSxJQUFhOztJQUViLEFBREEsYUFBYTtJQUNiLElBQVc7UUFFWCxJQUFJLENBQUMsUUFBUSxDQUFFLElBQUksS0FBSyxDQUFDLFVBQVUsY0FBVyxNQUFNLFlBQVMsSUFBSSxDQUFDLENBQUUsQ0FBQzs7OztLQUl4RTtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsbUNBQVM7Ozs7O0lBQVQsVUFBVyxNQUFZLEVBQUUsV0FBMkI7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQ2hEOzBCQXpTTDtJQTJTQyxDQUFBOzs7OztBQUdELE9BQU8sRUFDSCxLQUFLLElBQUksYUFBYSxFQUN0QixlQUFlLEVBQ2YsVUFBVSxJQUFJLGtCQUFrQixFQUNoQyxNQUFNLElBQUksYUFBYSxFQUN2QixvQkFBb0IsRUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgSXRlbVR5cGVzIGZyb20gJy4uL3NoYXJlZC90eXBlcyc7XG5cblxuY29uc3QgQ2F0ZWdvcmllcyA6IHtba2V5OnN0cmluZ106c3RyaW5nfSA9IHtcbiAgICBVTktOT1dOOiAgICAgICAgICdVbmtub3duIENhdGVnb3J5JyxcbiAgICBEQVRBU0VUOiAgICAgICAgICdEYXRhc2V0JyxcbiAgICBTRVJWSUNFOiAgICAgICAgICdTZXJ2aWNlJyxcbiAgICBMQVlFUjogICAgICAgICAgICdMYXllcicsXG4gICAgTUFQOiAgICAgICAgICAgICAnTWFwJyxcbiAgICBHQUxMRVJZOiAgICAgICAgICdHYWxsZXJ5JyxcbiAgICBDT01NVU5JVFk6ICAgICAgICdDb21tdW5pdHknLFxuICAgIENPTlRBQ1Q6ICAgICAgICAgJ0NvbnRhY3QnLFxuICAgIE9SR0FOSVpBVElPTjogICAgJ09yZ2FuaXphdGlvbicsXG4gICAgQ09OQ0VQVDogICAgICAgICAnQ29uY2VwdCcsXG4gICAgQ09OQ0VQVF9TQ0hFTUU6ICAnQ29uY2VwdCBTY2hlbWUnLFxuICAgIEFQUExJQ0FUSU9OOiAgICAgJ0FwcGxpY2F0aW9uJyxcbiAgICBUT1BJQzogICAgICAgICAgICdUb3BpYycsXG4gICAgV0VCU0lURTogICAgICAgICAnV2ViU2l0ZScsXG4gICAgSU1BR0VfUFJPRFVDVDogICAnSW1hZ2UgUHJvZHVjdCcsXG4gICAgUklHSFRTX1NUQVRFTUVOVDonUmlnaHRzU3RhdGVtZW50JyxcbiAgICBLTk9XTEVER0VfR1JBUEg6ICdLbm93bGVkZ2UgR3JhcGgnLFxuICAgIFVTRVI6ICAgICAgICAgICAgJ1VzZXInLFxuICAgIENPTU1VTklUWV9QT1NUOiAgJ0NvbW11bml0eSBQb3N0JywgICAvL3Bvc3Qgd2l0aGluIGEgY29tbXVuaXR5IHBvcnRhbFxuICAgIENPTU1VTklUWV9QQUdFOiAgJ0NvbW11bml0eSBQYWdlJywgICAvL3BhZ2Ugd2l0aGluIGEgY29tbXVuaXR5IHBvcnRhbFxuICAgIEFQUF9QQUdFOiAgICAgICAgJ0FwcGxpY2F0aW9uIFBhZ2UnLCAvL3BhZ2UvdmlldyB3aXRoaW4gYSBjbGllbnQgYXBwbGljYXRpb25cbn07XG5cbmNvbnN0IEV2ZW50cyA6IHtba2V5OnN0cmluZ106c3RyaW5nfSA9IHtcbiAgICBBQ0NFU1NFRDogICAnQWNjZXNzZWQnLCAgLy9yZWxhdGVkIGl0ZW0gd2FzIGFjY2Vzc2VkIHVzaW5nIEFQSVxuICAgIERJU1BMQVlFRDogICdEaXNwbGF5ZWQnLCAvL3JlbGF0ZWQgaXRlbSB3YXMgZGlzcGxheWVkIGluIGEgbmF0aXZlIGZvcm0gKG1hcClcbiAgICBWSUVXRUQ6ICAgICAnVmlld2VkJywgICAgLy9yZWxhdGVkIGl0ZW0gd2FzIHZpZXdlZCBpbiBnZW5lcmFsIGZvcm0gKG1ldGFkYXRhKVxuICAgIENSRUFURUQ6ICAgICdDcmVhdGVkJyxcbiAgICBFRElURUQ6ICAgICAnRWRpdGVkJyxcbiAgICBERUxFVEVEOiAgICAnRGVsZXRlZCcsXG4gICAgQ0xPTkVEOiAgICAgJ0Nsb25lZCcsXG4gICAgQURERUQ6ICAgICAgJ0FkZGVkJywgICAgLy9pdGVtIHdhcyBhZGRlZCB0byBhbm90aGVyIChpZSwgbGF5ZXIgb24gbWFwKVxuICAgIFJFTU9WRUQ6ICAgICdSZW1vdmVkJywgIC8vaXRlbSB3YXMgcmVtb3ZlZCBmcm9tIGFub3RoZXIgKGllLCBpdGVtIGZyb20gZ2FsbGVyeSlcbiAgICBFWFBPUlRFRDogICAnRXhwb3J0ZWQnLFxuICAgIElNUE9SVEVEOiAgICdJbXBvcnRlZCdcbn07XG5cblxuZnVuY3Rpb24gZ2V0Q2F0ZWdvcnkodHlwZSA6IHN0cmluZykgOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSBDYXRlZ29yaWVzLlVOS05PV047XG4gICAgaWYodHlwZSkge1xuICAgICAgICBsZXQgY2F0cyA6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoQ2F0ZWdvcmllcykubWFwKChrOnN0cmluZyk9PkNhdGVnb3JpZXNba10pO1xuICAgICAgICAvL2lmIGV4aXN0aW5nIGNhdGVnb3J5IHdhcyBzcGVjaWZpZWRcbiAgICAgICAgaWYofmNhdHMuaW5kZXhPZih0eXBlKSlcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICAvL2lmIGFuIEl0ZW1UeXBlIHdpdGggcHJlZml4IHdhcyBzcGVjaWZpZWQgKHN0cmlwIG9mZiBwcmVmaXgpXG4gICAgICAgIGVsc2UgaWYofnR5cGUuaW5kZXhPZignOicpKSB7XG4gICAgICAgICAgICBsZXQgY2F0ID0gdHlwZS5zcGxpdCgnOicpWzFdO1xuICAgICAgICAgICAgaWYofmNhdHMuaW5kZXhPZihjYXQpKVxuICAgICAgICAgICAgICAgIHJldHVybiBjYXQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgRXZlbnQge1xuXG4gICAgcHJpdmF0ZSBjYXRlZ29yeSA6IHN0cmluZztcbiAgICBwcml2YXRlIHR5cGUgOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBpdGVtIDogYW55ID0gbnVsbDtcbiAgICBwcml2YXRlIHJlbGF0ZWQgOiBhbnkgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoY2F0ZWdvcnkgOiBzdHJpbmcsIHR5cGUgOiBzdHJpbmcsIGl0ZW0gPzogYW55LCByZWxhdGVkID86IGFueSkge1xuICAgICAgICBpZighY2F0ZWdvcnkgfHwgISB0eXBlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUcmFja2luZ1NlcnZpY2UgRXZlbnQgLSBNdXN0IHNwZWNpZmljIGFuIGV2ZW50IFwiICtcbiAgICAgICAgICAgIFwiY2F0ZWdvcnkgYW5kIGV2ZW50IHR5cGUgd2hlbiBjb25zdHJ1Y3RpbmcgZXZlbnRzXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5zZXRJdGVtKGl0ZW0pO1xuICAgICAgICB0aGlzLnNldFJlbGF0ZWQocmVsYXRlZCk7XG4gICAgfVxuICAgIGdldENhdGVnb3J5KCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5jYXRlZ29yeTsgfVxuICAgIGdldFR5cGUoKSA6IHN0cmluZyB7IHJldHVybiB0aGlzLnR5cGU7IH1cbiAgICBnZXRJdGVtKCkgOiBhbnkgeyByZXR1cm4gdGhpcy5pdGVtOyB9XG4gICAgc2V0SXRlbShpdGVtIDogYW55KSB7IHRoaXMuaXRlbSA9IGl0ZW0gPyAoaXRlbS5pZCB8fCBpdGVtKSA6IG51bGw7IH1cbiAgICBnZXRSZWxhdGVkKCkgOiBhbnkgeyByZXR1cm4gdGhpcy5yZWxhdGVkOyB9XG4gICAgc2V0UmVsYXRlZChyZWxhdGVkIDogYW55KSB7XG4gICAgICAgIHRoaXMucmVsYXRlZCA9IHJlbGF0ZWQgPyAocmVsYXRlZC5pZCB8fCByZWxhdGVkKSA6IG51bGw7XG4gICAgfVxufVxuXG5cblxuLyoqXG4gKiBAcGFyYW0gZXZlbnRUeXBlIC0gdHlwZSBvZiBldmVudCBiZWluZyBjcmVhdGVkXG4gKiBAcGFyYW0gaXRlbSAtIEdlb1BsYXRmb3JtIEl0ZW0gaW5zdGFuY2VcbiAqIEByZXR1cm4gbGlzdCBvZiBldmVudCBvYmplY3RzXG4gKi9cbmZ1bmN0aW9uIFRyYWNraW5nRXZlbnRGYWN0b3J5KGV2ZW50VHlwZSA6IHN0cmluZywgaXRlbSA6IGFueSkgOiBFdmVudFtdIHtcbiAgICBsZXQgcmVzdWx0IDogRXZlbnRbXSA9IFtdIGFzIEV2ZW50W107XG4gICAgaWYoZXZlbnRUeXBlICYmIGl0ZW0gJiYgaXRlbS50eXBlKSB7XG4gICAgICAgIGlmKEl0ZW1UeXBlcy5NQVAgPT09IGl0ZW0udHlwZSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goIG5ldyBFdmVudChDYXRlZ29yaWVzLk1BUCwgZXZlbnRUeXBlLCBpdGVtKSApO1xuICAgICAgICAgICAgaWYoRXZlbnRzLkRJU1BMQVlFRCA9PT0gZXZlbnRUeXBlKSB7XG5cbiAgICAgICAgICAgICAgICBpdGVtLmxheWVycy5mb3JFYWNoKCAobGF5ZXJTdGF0ZSA6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihsYXllclN0YXRlLmxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGF5ZXJFdmVudHMgPSBUcmFja2luZ0V2ZW50RmFjdG9yeShldmVudFR5cGUsIGxheWVyU3RhdGUubGF5ZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihlPT5lIT09bnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsYXllckV2ZW50cyAmJiBsYXllckV2ZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KGxheWVyRXZlbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5iYXNlTGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJhc2VFdmVudHMgPSBUcmFja2luZ0V2ZW50RmFjdG9yeShldmVudFR5cGUsIGl0ZW0uYmFzZUxheWVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihlPT5lIT09bnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGJhc2VFdmVudHMgJiYgYmFzZUV2ZW50cy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KCBiYXNlRXZlbnRzICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZihJdGVtVHlwZXMuTEFZRVIgPT09IGl0ZW0udHlwZSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goIG5ldyBFdmVudChDYXRlZ29yaWVzLkxBWUVSLCBldmVudFR5cGUsIGl0ZW0pICk7XG4gICAgICAgICAgICBpZihFdmVudHMuRElTUExBWUVEID09PSBldmVudFR5cGUgJiYgaXRlbS5zZXJ2aWNlcyAmJiBpdGVtLnNlcnZpY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCBuZXcgRXZlbnQoQ2F0ZWdvcmllcy5TRVJWSUNFLCBldmVudFR5cGUsIGl0ZW0uc2VydmljZXNbMF0pICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgY2F0ZWdvcnkgPSBnZXRDYXRlZ29yeShpdGVtLnR5cGUpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goIG5ldyBFdmVudChjYXRlZ29yeSwgZXZlbnRUeXBlLCBpdGVtKSApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGVsc2Uge1xuICAgIC8vICAgICBpZighZXZlbnQpIGNvbnNvbGUubG9nKFwiTWlzc2luZyBldmVudFwiKTtcbiAgICAvLyAgICAgaWYoIWl0ZW0pIGNvbnNvbGUubG9nKFwiTWlzc2luZyBpdGVtXCIpO1xuICAgIC8vICAgICBpZighaXRlbS50eXBlKSBjb25zb2xlLmxvZyhcIk1pc3NpbmcgaXRlbSB0eXBlXCIpO1xuICAgIC8vIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuXG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgRGVmYXVsdFRyYWNraW5nU2VydmljZVByb3ZpZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG4gICAgbG9nRXZlbnQoXG4gICAgICAgIGNhdGVnb3J5IDogc3RyaW5nLFxuICAgICAgICBldmVudCA6IHN0cmluZyxcbiAgICAgICAgaXRlbSA/OiBhbnksXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmVsYXRlZCA/OiBhbnlcbiAgICApIHtcbiAgICAgICAgY29uc29sZS5sb2coIFwiRVZFTlQgKFwiICsgY2F0ZWdvcnkgKyBcIikgLSBcIiArIGV2ZW50ICsgXCIgOiBcIiArIGl0ZW0pO1xuICAgIH1cbiAgICAvLyBsb2dQYWdlVmlldyggdmlldywgZGF0YSApIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJQQUdFVklFVyBcIiArIHZpZXcgKyAoZGF0YSA/IFwiIDogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSA6ICcnKSApO1xuICAgIC8vIH1cbiAgICBsb2dTZWFyY2gocGFyYW1zIDogc3RyaW5nLCByZXN1bHRDb3VudCA6IHN0cmluZ3xudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coIFwiUXVlcnkgOiBcIiArIEpTT04uc3RyaW5naWZ5KHBhcmFtcykgKyBcIiBmb3VuZCBcIiArIHJlc3VsdENvdW50KyBcIiBtYXRjaGVzXCIpO1xuICAgIH1cbn1cblxuXG5cblxuXG5cbi8qKlxuICogVHJhY2tpbmdTZXJ2aWNlXG4gKlxuICogU2VydmljZSBmb3IgbG9nZ2luZyBldmVudHMgcmVsYXRlZCB0byB1c2FnZSBvZiB0aGUgR2VvUGxhdGZvcm0gYW5kIGl0cyBkYXRhXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgIGltcG9ydCB7IFRyYWNraW5nU2VydmljZSwgRXZlbnRDYXRlZ29yaWVzLCBFdmVudFR5cGVzIH0gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcbiAqXG4gKiAgIGxldCB0cmFja2VyID0gbmV3IFRyYWNraW5nU2VydmljZSgpO1xuICogICB0cmFja2VyLnNldFByb3ZpZGVyKCAuLi4gKTtcbiAqICAgdHJhY2tlci5ldmVudCggRXZlbnQub2YoRXZlbnRDYXRlZ29yaWVzLk1BUCwgRXZlbnRUeXBlcy5WSUVXRUQsIG1hcCkgKTtcbiAqXG4gKiBNdWx0aS1ldmVudCBleGFtcGxlOlxuICpcbiAqICAgaW1wb3J0IHtcbiAqICAgICAgVHJhY2tpbmdTZXJ2aWNlLCBUcmFja2luZ0V2ZW50Q2F0ZWdvcmllcywgVHJhY2tpbmdFdmVudFR5cGVzLCBUcmFja2luZ0V2ZW50RmFjdG9yeVxuICogICB9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG4gKlxuICogICBsZXQgdHJhY2tlciA9IG5ldyBUcmFja2luZ1NlcnZpY2UoKTtcbiAqICAgdHJhY2tlci5zZXRQcm92aWRlciggLi4uICk7XG4gKlxuICogICBsZXQgZXZlbnRzID0gW1xuICogICAgICAgVHJhY2tpbmdFdmVudC5vZiggVHJhY2tpbmdDYXRlZ29yaWVzLk1BUCwgVHJhY2tpbmdFdmVudFR5cGVzLlZJRVdFRCwgdGhpcy5tYXAgKVxuICogICAgICAgVHJhY2tpbmdFdmVudC5vZiggVHJhY2tpbmdDYXRlZ29yaWVzLkxBWUVSLCBUcmFja2luZ0V2ZW50VHlwZXMuVklFV0VELCB0aGlzLm1hcC5iYXNlTGF5ZXIgKVxuICogICBdO1xuICogICB0cmFja2VyLmV2ZW50KGV2ZW50cyk7XG4gKlxuICogICAvL09SIHVzZSB0aGUgZXZlbnQgZmFjdG9yeTpcbiAqICAgdHJhY2tlci5ldmVudCggVHJhY2tpbmdFdmVudEZhY3RvcnkoRXZlbnRUeXBlcy5WSUVXRUQsIHRoaXMubWFwKSApO1xuICovXG5jbGFzcyBUcmFja2luZ1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBwcm92aWRlciA6IGFueSA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IGFueSkge1xuICAgICAgICBpZihvcHRpb25zICYmIHR5cGVvZihvcHRpb25zKSA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgICAgIGlmKCF0aGlzLnByb3ZpZGVyKVxuICAgICAgICAgICAgdGhpcy5zZXRQcm92aWRlcihuZXcgRGVmYXVsdFRyYWNraW5nU2VydmljZVByb3ZpZGVyKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwcm92aWRlciAtXG4gICAgICovXG4gICAgc2V0UHJvdmlkZXIocHJvdmlkZXIgOiBhbnkpIHtcbiAgICAgICAgaWYocHJvdmlkZXIpXG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVyID0gcHJvdmlkZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGV2ZW50IC0gZXZlbnQgdG8gbG9nXG4gICAgICogQHJldHVybiBUcmFja2luZ1NlcnZpY2VcbiAgICAgKi9cbiAgICBldmVudCggZXZlbnQgOiBFdmVudCApIDogVHJhY2tpbmdTZXJ2aWNlIHtcbiAgICAgICAgdGhpcy5sb2dFdmVudCggZXZlbnQgKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGV2ZW50IC0gZXZlbnQgdG8gbG9nXG4gICAgICovXG4gICAgbG9nRXZlbnQoIGV2ZW50IDogRXZlbnR8RXZlbnRbXSkge1xuICAgICAgICBpZighdGhpcy5wcm92aWRlciB8fCAhdGhpcy5wcm92aWRlci5sb2dFdmVudCB8fCAhZXZlbnQpIHJldHVybjtcblxuICAgICAgICBpZihBcnJheS5pc0FycmF5KGV2ZW50KSkge1xuICAgICAgICAgICAgbGV0IGV2ZW50cyA6IEV2ZW50W10gPSBldmVudCBhcyBFdmVudFtdO1xuICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goIChldnQgOiBFdmVudCkgPT4gdGhpcy5sb2dFdmVudChldnQpICk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBldnQgOiBFdmVudCA9IGV2ZW50IGFzIEV2ZW50O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3ZpZGVyLmxvZ0V2ZW50KFxuICAgICAgICAgICAgICAgICAgICBldnQuZ2V0Q2F0ZWdvcnkoKSxcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldEl0ZW0oKSxcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldFJlbGF0ZWQoKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgXCJUcmFja2luZ1NlcnZpY2UubG9nRXZlbnQoKSAtIEVycm9yIGxvZ2dpbmcgZXZlbnQgKFwiICtcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldENhdGVnb3J5KCkgKyBcIiwgXCIgKyBldnQuZ2V0VHlwZSgpICsgXCIsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldEl0ZW0oKSArIFwiKSAtIFwiICsgZS5tZXNzYWdlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHZpZXcgLSBuYW1lIG9mIHRoZSB2aWV3IGJlaW5nIGFjdGl2YXRlZFxuICAgICAqIEBwYXJhbSBkYXRhIC0gYWRkaXRpb25hbCBjb250ZXh0IHRvIHN1cHBseSBmb3IgdGhlIGV2ZW50XG4gICAgICogQHJldHVybiBUcmFja2luZ1NlcnZpY2VcbiAgICAgKiBAZGVwcmVjYXRlZCB1c2Ugc3ZjLmV2ZW50KCBuZXcgRXZlbnQoRXZlbnRDYXRlZ29yaWVzLkFQUF9QQUdFLCBFdmVudFR5cGVzLlZJRVdFRCwgcGFnZUlkKSApXG4gICAgICovXG4gICAgcGFnZVZpZXcoIHZpZXcgOiBzdHJpbmcsIGRhdGEgOiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2dQYWdlVmlldyh2aWV3LCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHZpZXcgLSBuYW1lIG9mIHRoZSB2aWV3IGJlaW5nIGFjdGl2YXRlZFxuICAgICAqIEBwYXJhbSBkYXRhIC0gYWRkaXRpb25hbCBjb250ZXh0IHRvIHN1cHBseSBmb3IgdGhlIGV2ZW50XG4gICAgICogQGRlcHJlY2F0ZWQgdXNlIHN2Yy5sb2dFdmVudCggbmV3IEV2ZW50KEV2ZW50Q2F0ZWdvcmllcy5BUFBfUEFHRSwgRXZlbnRUeXBlcy5WSUVXRUQsIHBhZ2VJZCkgKVxuICAgICAqL1xuICAgIGxvZ1BhZ2VWaWV3KFxuICAgICAgICB2aWV3IDogc3RyaW5nLFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGRhdGEgPzogYW55XG4gICAgKSB7XG4gICAgICAgIHRoaXMubG9nRXZlbnQoIG5ldyBFdmVudChDYXRlZ29yaWVzLkFQUF9QQUdFLCBFdmVudHMuVklFV0VELCB2aWV3KSApO1xuICAgICAgICAvLyBpZih0aGlzLnByb3ZpZGVyICYmIHRoaXMucHJvdmlkZXIubG9nUGFnZVZpZXcpIHtcbiAgICAgICAgLy8gICAgIHRoaXMucHJvdmlkZXIubG9nUGFnZVZpZXcodmlldywgZGF0YSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICogQHBhcmFtIHJlc3VsdENvdW50XG4gICAgICovXG4gICAgbG9nU2VhcmNoIChwYXJhbXMgOiBhbnksIHJlc3VsdENvdW50IDogc3RyaW5nfG51bWJlcikge1xuICAgICAgICB0aGlzLnByb3ZpZGVyLmxvZ1NlYXJjaChwYXJhbXMsIHJlc3VsdENvdW50KTtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQge1xuICAgIEV2ZW50IGFzIFRyYWNraW5nRXZlbnQsXG4gICAgVHJhY2tpbmdTZXJ2aWNlLFxuICAgIENhdGVnb3JpZXMgYXMgVHJhY2tpbmdDYXRlZ29yaWVzLFxuICAgIEV2ZW50cyBhcyBUcmFja2luZ1R5cGVzLFxuICAgIFRyYWNraW5nRXZlbnRGYWN0b3J5XG59O1xuIl19