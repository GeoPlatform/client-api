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
    DELETED: 'Deleted'
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tpbmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvdHJhY2tpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDOztBQUd4QyxJQUFNLFVBQVUsR0FBMkI7SUFDdkMsT0FBTyxFQUFVLGtCQUFrQjtJQUNuQyxPQUFPLEVBQVUsU0FBUztJQUMxQixPQUFPLEVBQVUsU0FBUztJQUMxQixLQUFLLEVBQVksT0FBTztJQUN4QixHQUFHLEVBQWMsS0FBSztJQUN0QixPQUFPLEVBQVUsU0FBUztJQUMxQixTQUFTLEVBQVEsV0FBVztJQUM1QixPQUFPLEVBQVUsU0FBUztJQUMxQixZQUFZLEVBQUssY0FBYztJQUMvQixPQUFPLEVBQVUsU0FBUztJQUMxQixjQUFjLEVBQUcsZ0JBQWdCO0lBQ2pDLFdBQVcsRUFBTSxhQUFhO0lBQzlCLEtBQUssRUFBWSxPQUFPO0lBQ3hCLE9BQU8sRUFBVSxTQUFTO0lBQzFCLGdCQUFnQixFQUFFLGlCQUFpQjtJQUNuQyxlQUFlLEVBQUUsaUJBQWlCO0lBQ2xDLElBQUksRUFBYSxNQUFNO0lBQ3ZCLGNBQWMsRUFBRyxnQkFBZ0I7O0lBQ2pDLGNBQWMsRUFBRyxnQkFBZ0I7O0lBQ2pDLFFBQVEsRUFBUyxrQkFBa0I7Q0FDdEMsQ0FBQzs7QUFFRixJQUFNLE1BQU0sR0FBMkI7SUFDbkMsUUFBUSxFQUFJLFVBQVU7O0lBQ3RCLFNBQVMsRUFBRyxXQUFXOztJQUN2QixNQUFNLEVBQU0sUUFBUTs7SUFDcEIsT0FBTyxFQUFLLFNBQVM7SUFDckIsTUFBTSxFQUFNLFFBQVE7SUFDcEIsT0FBTyxFQUFLLFNBQVM7Q0FDeEIsQ0FBQzs7Ozs7QUFHRixxQkFBcUIsSUFBYTs7SUFDOUIsSUFBSSxNQUFNLEdBQUcsVUFBVSxZQUFTO0lBQ2hDLElBQUcsSUFBSSxFQUFFOztRQUNMLElBQUksSUFBSSxHQUFjLE1B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QU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gscUNBQVc7Ozs7OztJQUFYLFVBQ0ksSUFBYTs7SUFFYixBQURBLGFBQWE7SUFDYixJQUFXO1FBRVgsSUFBSSxDQUFDLFFBQVEsQ0FBRSxJQUFJLEtBQUssQ0FBQyxVQUFVLGNBQVcsTUFBTSxZQUFTLElBQUksQ0FBQyxDQUFFLENBQUM7Ozs7S0FJeEU7SUFFRDs7O09BR0c7Ozs7OztJQUNILG1DQUFTOzs7OztJQUFULFVBQVcsTUFBWSxFQUFFLFdBQTJCO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztLQUNoRDswQkFuU0w7SUFxU0MsQ0FBQTs7Ozs7QUFHRCxPQUFPLEVBQ0gsS0FBSyxJQUFJLGFBQWEsRUFDdEIsZUFBZSxFQUNmLFVBQVUsSUFBSSxrQkFBa0IsRUFDaEMsTUFBTSxJQUFJLGFBQWEsRUFDdkIsb0JBQW9CLEVBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IEl0ZW1UeXBlcyBmcm9tICcuLi9zaGFyZWQvdHlwZXMnO1xuXG5cbmNvbnN0IENhdGVnb3JpZXMgOiB7W2tleTpzdHJpbmddOnN0cmluZ30gPSB7XG4gICAgVU5LTk9XTjogICAgICAgICAnVW5rbm93biBDYXRlZ29yeScsXG4gICAgREFUQVNFVDogICAgICAgICAnRGF0YXNldCcsXG4gICAgU0VSVklDRTogICAgICAgICAnU2VydmljZScsXG4gICAgTEFZRVI6ICAgICAgICAgICAnTGF5ZXInLFxuICAgIE1BUDogICAgICAgICAgICAgJ01hcCcsXG4gICAgR0FMTEVSWTogICAgICAgICAnR2FsbGVyeScsXG4gICAgQ09NTVVOSVRZOiAgICAgICAnQ29tbXVuaXR5JyxcbiAgICBDT05UQUNUOiAgICAgICAgICdDb250YWN0JyxcbiAgICBPUkdBTklaQVRJT046ICAgICdPcmdhbml6YXRpb24nLFxuICAgIENPTkNFUFQ6ICAgICAgICAgJ0NvbmNlcHQnLFxuICAgIENPTkNFUFRfU0NIRU1FOiAgJ0NvbmNlcHQgU2NoZW1lJyxcbiAgICBBUFBMSUNBVElPTjogICAgICdBcHBsaWNhdGlvbicsXG4gICAgVE9QSUM6ICAgICAgICAgICAnVG9waWMnLFxuICAgIFdFQlNJVEU6ICAgICAgICAgJ1dlYlNpdGUnLFxuICAgIFJJR0hUU19TVEFURU1FTlQ6ICdSaWdodHNTdGF0ZW1lbnQnLFxuICAgIEtOT1dMRURHRV9HUkFQSDogJ0tub3dsZWRnZSBHcmFwaCcsXG4gICAgVVNFUjogICAgICAgICAgICAnVXNlcicsXG4gICAgQ09NTVVOSVRZX1BPU1Q6ICAnQ29tbXVuaXR5IFBvc3QnLCAgIC8vcG9zdCB3aXRoaW4gYSBjb21tdW5pdHkgcG9ydGFsXG4gICAgQ09NTVVOSVRZX1BBR0U6ICAnQ29tbXVuaXR5IFBhZ2UnLCAgIC8vcGFnZSB3aXRoaW4gYSBjb21tdW5pdHkgcG9ydGFsXG4gICAgQVBQX1BBR0U6ICAgICAgICAnQXBwbGljYXRpb24gUGFnZScsIC8vcGFnZS92aWV3IHdpdGhpbiBhIGNsaWVudCBhcHBsaWNhdGlvblxufTtcblxuY29uc3QgRXZlbnRzIDoge1trZXk6c3RyaW5nXTpzdHJpbmd9ID0ge1xuICAgIEFDQ0VTU0VEOiAgICdBY2Nlc3NlZCcsICAvL3JlbGF0ZWQgaXRlbSB3YXMgYWNjZXNzZWQgdXNpbmcgQVBJXG4gICAgRElTUExBWUVEOiAgJ0Rpc3BsYXllZCcsIC8vcmVsYXRlZCBpdGVtIHdhcyBkaXNwbGF5ZWQgaW4gYSBuYXRpdmUgZm9ybSAobWFwKVxuICAgIFZJRVdFRDogICAgICdWaWV3ZWQnLCAgICAvL3JlbGF0ZWQgaXRlbSB3YXMgdmlld2VkIGluIGdlbmVyYWwgZm9ybSAobWV0YWRhdGEpXG4gICAgQ1JFQVRFRDogICAgJ0NyZWF0ZWQnLFxuICAgIEVESVRFRDogICAgICdFZGl0ZWQnLFxuICAgIERFTEVURUQ6ICAgICdEZWxldGVkJ1xufTtcblxuXG5mdW5jdGlvbiBnZXRDYXRlZ29yeSh0eXBlIDogc3RyaW5nKSA6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdCA9IENhdGVnb3JpZXMuVU5LTk9XTjtcbiAgICBpZih0eXBlKSB7XG4gICAgICAgIGxldCBjYXRzIDogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhDYXRlZ29yaWVzKS5tYXAoKGs6c3RyaW5nKT0+Q2F0ZWdvcmllc1trXSk7XG4gICAgICAgIC8vaWYgZXhpc3RpbmcgY2F0ZWdvcnkgd2FzIHNwZWNpZmllZFxuICAgICAgICBpZih+Y2F0cy5pbmRleE9mKHR5cGUpKVxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgIC8vaWYgYW4gSXRlbVR5cGUgd2l0aCBwcmVmaXggd2FzIHNwZWNpZmllZCAoc3RyaXAgb2ZmIHByZWZpeClcbiAgICAgICAgZWxzZSBpZih+dHlwZS5pbmRleE9mKCc6JykpIHtcbiAgICAgICAgICAgIGxldCBjYXQgPSB0eXBlLnNwbGl0KCc6JylbMV07XG4gICAgICAgICAgICBpZih+Y2F0cy5pbmRleE9mKGNhdCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqXG4gKlxuICovXG5jbGFzcyBFdmVudCB7XG5cbiAgICBwcml2YXRlIGNhdGVnb3J5IDogc3RyaW5nO1xuICAgIHByaXZhdGUgdHlwZSA6IHN0cmluZztcbiAgICBwcml2YXRlIGl0ZW0gOiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgcmVsYXRlZCA6IGFueSA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihjYXRlZ29yeSA6IHN0cmluZywgdHlwZSA6IHN0cmluZywgaXRlbSA/OiBhbnksIHJlbGF0ZWQgPzogYW55KSB7XG4gICAgICAgIGlmKCFjYXRlZ29yeSB8fCAhIHR5cGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRyYWNraW5nU2VydmljZSBFdmVudCAtIE11c3Qgc3BlY2lmaWMgYW4gZXZlbnQgXCIgK1xuICAgICAgICAgICAgXCJjYXRlZ29yeSBhbmQgZXZlbnQgdHlwZSB3aGVuIGNvbnN0cnVjdGluZyBldmVudHNcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnNldEl0ZW0oaXRlbSk7XG4gICAgICAgIHRoaXMuc2V0UmVsYXRlZChyZWxhdGVkKTtcbiAgICB9XG4gICAgZ2V0Q2F0ZWdvcnkoKSA6IHN0cmluZyB7IHJldHVybiB0aGlzLmNhdGVnb3J5OyB9XG4gICAgZ2V0VHlwZSgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMudHlwZTsgfVxuICAgIGdldEl0ZW0oKSA6IGFueSB7IHJldHVybiB0aGlzLml0ZW07IH1cbiAgICBzZXRJdGVtKGl0ZW0gOiBhbnkpIHsgdGhpcy5pdGVtID0gaXRlbSA/IChpdGVtLmlkIHx8IGl0ZW0pIDogbnVsbDsgfVxuICAgIGdldFJlbGF0ZWQoKSA6IGFueSB7IHJldHVybiB0aGlzLnJlbGF0ZWQ7IH1cbiAgICBzZXRSZWxhdGVkKHJlbGF0ZWQgOiBhbnkpIHtcbiAgICAgICAgdGhpcy5yZWxhdGVkID0gcmVsYXRlZCA/IChyZWxhdGVkLmlkIHx8IHJlbGF0ZWQpIDogbnVsbDtcbiAgICB9XG59XG5cblxuXG4vKipcbiAqIEBwYXJhbSBldmVudFR5cGUgLSB0eXBlIG9mIGV2ZW50IGJlaW5nIGNyZWF0ZWRcbiAqIEBwYXJhbSBpdGVtIC0gR2VvUGxhdGZvcm0gSXRlbSBpbnN0YW5jZVxuICogQHJldHVybiBsaXN0IG9mIGV2ZW50IG9iamVjdHNcbiAqL1xuZnVuY3Rpb24gVHJhY2tpbmdFdmVudEZhY3RvcnkoZXZlbnRUeXBlIDogc3RyaW5nLCBpdGVtIDogYW55KSA6IEV2ZW50W10ge1xuICAgIGxldCByZXN1bHQgOiBFdmVudFtdID0gW10gYXMgRXZlbnRbXTtcbiAgICBpZihldmVudFR5cGUgJiYgaXRlbSAmJiBpdGVtLnR5cGUpIHtcbiAgICAgICAgaWYoSXRlbVR5cGVzLk1BUCA9PT0gaXRlbS50eXBlKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCggbmV3IEV2ZW50KENhdGVnb3JpZXMuTUFQLCBldmVudFR5cGUsIGl0ZW0pICk7XG4gICAgICAgICAgICBpZihFdmVudHMuRElTUExBWUVEID09PSBldmVudFR5cGUpIHtcblxuICAgICAgICAgICAgICAgIGl0ZW0ubGF5ZXJzLmZvckVhY2goIChsYXllclN0YXRlIDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGxheWVyU3RhdGUubGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYXllckV2ZW50cyA9IFRyYWNraW5nRXZlbnRGYWN0b3J5KGV2ZW50VHlwZSwgbGF5ZXJTdGF0ZS5sYXllcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGU9PmUhPT1udWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxheWVyRXZlbnRzICYmIGxheWVyRXZlbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQobGF5ZXJFdmVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZihpdGVtLmJhc2VMYXllcikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmFzZUV2ZW50cyA9IFRyYWNraW5nRXZlbnRGYWN0b3J5KGV2ZW50VHlwZSwgaXRlbS5iYXNlTGF5ZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGU9PmUhPT1udWxsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoYmFzZUV2ZW50cyAmJiBiYXNlRXZlbnRzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoIGJhc2VFdmVudHMgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmKEl0ZW1UeXBlcy5MQVlFUiA9PT0gaXRlbS50eXBlKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCggbmV3IEV2ZW50KENhdGVnb3JpZXMuTEFZRVIsIGV2ZW50VHlwZSwgaXRlbSkgKTtcbiAgICAgICAgICAgIGlmKEV2ZW50cy5ESVNQTEFZRUQgPT09IGV2ZW50VHlwZSAmJiBpdGVtLnNlcnZpY2VzICYmIGl0ZW0uc2VydmljZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goIG5ldyBFdmVudChDYXRlZ29yaWVzLlNFUlZJQ0UsIGV2ZW50VHlwZSwgaXRlbS5zZXJ2aWNlc1swXSkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjYXRlZ29yeSA9IGdldENhdGVnb3J5KGl0ZW0udHlwZSk7XG4gICAgICAgICAgICByZXN1bHQucHVzaCggbmV3IEV2ZW50KGNhdGVnb3J5LCBldmVudFR5cGUsIGl0ZW0pICk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gZWxzZSB7XG4gICAgLy8gICAgIGlmKCFldmVudCkgY29uc29sZS5sb2coXCJNaXNzaW5nIGV2ZW50XCIpO1xuICAgIC8vICAgICBpZighaXRlbSkgY29uc29sZS5sb2coXCJNaXNzaW5nIGl0ZW1cIik7XG4gICAgLy8gICAgIGlmKCFpdGVtLnR5cGUpIGNvbnNvbGUubG9nKFwiTWlzc2luZyBpdGVtIHR5cGVcIik7XG4gICAgLy8gfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG5cblxuLyoqXG4gKlxuICovXG5jbGFzcyBEZWZhdWx0VHJhY2tpbmdTZXJ2aWNlUHJvdmlkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge31cbiAgICBsb2dFdmVudChcbiAgICAgICAgY2F0ZWdvcnkgOiBzdHJpbmcsXG4gICAgICAgIGV2ZW50IDogc3RyaW5nLFxuICAgICAgICBpdGVtID86IGFueSxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZWxhdGVkID86IGFueVxuICAgICkge1xuICAgICAgICBjb25zb2xlLmxvZyggXCJFVkVOVCAoXCIgKyBjYXRlZ29yeSArIFwiKSAtIFwiICsgZXZlbnQgKyBcIiA6IFwiICsgaXRlbSk7XG4gICAgfVxuICAgIC8vIGxvZ1BhZ2VWaWV3KCB2aWV3LCBkYXRhICkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlBBR0VWSUVXIFwiICsgdmlldyArIChkYXRhID8gXCIgOiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpIDogJycpICk7XG4gICAgLy8gfVxuICAgIGxvZ1NlYXJjaChwYXJhbXMgOiBzdHJpbmcsIHJlc3VsdENvdW50IDogc3RyaW5nfG51bWJlcikge1xuICAgICAgICBjb25zb2xlLmxvZyggXCJRdWVyeSA6IFwiICsgSlNPTi5zdHJpbmdpZnkocGFyYW1zKSArIFwiIGZvdW5kIFwiICsgcmVzdWx0Q291bnQrIFwiIG1hdGNoZXNcIik7XG4gICAgfVxufVxuXG5cblxuXG5cblxuLyoqXG4gKiBUcmFja2luZ1NlcnZpY2VcbiAqXG4gKiBTZXJ2aWNlIGZvciBsb2dnaW5nIGV2ZW50cyByZWxhdGVkIHRvIHVzYWdlIG9mIHRoZSBHZW9QbGF0Zm9ybSBhbmQgaXRzIGRhdGFcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgaW1wb3J0IHsgVHJhY2tpbmdTZXJ2aWNlLCBFdmVudENhdGVnb3JpZXMsIEV2ZW50VHlwZXMgfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuICpcbiAqICAgbGV0IHRyYWNrZXIgPSBuZXcgVHJhY2tpbmdTZXJ2aWNlKCk7XG4gKiAgIHRyYWNrZXIuc2V0UHJvdmlkZXIoIC4uLiApO1xuICogICB0cmFja2VyLmV2ZW50KCBFdmVudC5vZihFdmVudENhdGVnb3JpZXMuTUFQLCBFdmVudFR5cGVzLlZJRVdFRCwgbWFwKSApO1xuICpcbiAqIE11bHRpLWV2ZW50IGV4YW1wbGU6XG4gKlxuICogICBpbXBvcnQge1xuICogICAgICBUcmFja2luZ1NlcnZpY2UsIFRyYWNraW5nRXZlbnRDYXRlZ29yaWVzLCBUcmFja2luZ0V2ZW50VHlwZXMsIFRyYWNraW5nRXZlbnRGYWN0b3J5XG4gKiAgIH0gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcbiAqXG4gKiAgIGxldCB0cmFja2VyID0gbmV3IFRyYWNraW5nU2VydmljZSgpO1xuICogICB0cmFja2VyLnNldFByb3ZpZGVyKCAuLi4gKTtcbiAqXG4gKiAgIGxldCBldmVudHMgPSBbXG4gKiAgICAgICBUcmFja2luZ0V2ZW50Lm9mKCBUcmFja2luZ0NhdGVnb3JpZXMuTUFQLCBUcmFja2luZ0V2ZW50VHlwZXMuVklFV0VELCB0aGlzLm1hcCApXG4gKiAgICAgICBUcmFja2luZ0V2ZW50Lm9mKCBUcmFja2luZ0NhdGVnb3JpZXMuTEFZRVIsIFRyYWNraW5nRXZlbnRUeXBlcy5WSUVXRUQsIHRoaXMubWFwLmJhc2VMYXllciApXG4gKiAgIF07XG4gKiAgIHRyYWNrZXIuZXZlbnQoZXZlbnRzKTtcbiAqXG4gKiAgIC8vT1IgdXNlIHRoZSBldmVudCBmYWN0b3J5OlxuICogICB0cmFja2VyLmV2ZW50KCBUcmFja2luZ0V2ZW50RmFjdG9yeShFdmVudFR5cGVzLlZJRVdFRCwgdGhpcy5tYXApICk7XG4gKi9cbmNsYXNzIFRyYWNraW5nU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHByb3ZpZGVyIDogYW55ID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPzogYW55KSB7XG4gICAgICAgIGlmKG9wdGlvbnMgJiYgdHlwZW9mKG9wdGlvbnMpID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgaWYoIXRoaXMucHJvdmlkZXIpXG4gICAgICAgICAgICB0aGlzLnNldFByb3ZpZGVyKG5ldyBEZWZhdWx0VHJhY2tpbmdTZXJ2aWNlUHJvdmlkZXIoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHByb3ZpZGVyIC1cbiAgICAgKi9cbiAgICBzZXRQcm92aWRlcihwcm92aWRlciA6IGFueSkge1xuICAgICAgICBpZihwcm92aWRlcilcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXIgPSBwcm92aWRlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZXZlbnQgLSBldmVudCB0byBsb2dcbiAgICAgKiBAcmV0dXJuIFRyYWNraW5nU2VydmljZVxuICAgICAqL1xuICAgIGV2ZW50KCBldmVudCA6IEV2ZW50ICkgOiBUcmFja2luZ1NlcnZpY2Uge1xuICAgICAgICB0aGlzLmxvZ0V2ZW50KCBldmVudCApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZXZlbnQgLSBldmVudCB0byBsb2dcbiAgICAgKi9cbiAgICBsb2dFdmVudCggZXZlbnQgOiBFdmVudHxFdmVudFtdKSB7XG4gICAgICAgIGlmKCF0aGlzLnByb3ZpZGVyIHx8ICF0aGlzLnByb3ZpZGVyLmxvZ0V2ZW50IHx8ICFldmVudCkgcmV0dXJuO1xuXG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkoZXZlbnQpKSB7XG4gICAgICAgICAgICBsZXQgZXZlbnRzIDogRXZlbnRbXSA9IGV2ZW50IGFzIEV2ZW50W107XG4gICAgICAgICAgICBldmVudHMuZm9yRWFjaCggKGV2dCA6IEV2ZW50KSA9PiB0aGlzLmxvZ0V2ZW50KGV2dCkgKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGV2dCA6IEV2ZW50ID0gZXZlbnQgYXMgRXZlbnQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvdmlkZXIubG9nRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIGV2dC5nZXRDYXRlZ29yeSgpLFxuICAgICAgICAgICAgICAgICAgICBldnQuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgICAgICAgICBldnQuZ2V0SXRlbSgpLFxuICAgICAgICAgICAgICAgICAgICBldnQuZ2V0UmVsYXRlZCgpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICBcIlRyYWNraW5nU2VydmljZS5sb2dFdmVudCgpIC0gRXJyb3IgbG9nZ2luZyBldmVudCAoXCIgK1xuICAgICAgICAgICAgICAgICAgICBldnQuZ2V0Q2F0ZWdvcnkoKSArIFwiLCBcIiArIGV2dC5nZXRUeXBlKCkgKyBcIiwgXCIgK1xuICAgICAgICAgICAgICAgICAgICBldnQuZ2V0SXRlbSgpICsgXCIpIC0gXCIgKyBlLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdmlldyAtIG5hbWUgb2YgdGhlIHZpZXcgYmVpbmcgYWN0aXZhdGVkXG4gICAgICogQHBhcmFtIGRhdGEgLSBhZGRpdGlvbmFsIGNvbnRleHQgdG8gc3VwcGx5IGZvciB0aGUgZXZlbnRcbiAgICAgKiBAcmV0dXJuIFRyYWNraW5nU2VydmljZVxuICAgICAqIEBkZXByZWNhdGVkIHVzZSBzdmMuZXZlbnQoIG5ldyBFdmVudChFdmVudENhdGVnb3JpZXMuQVBQX1BBR0UsIEV2ZW50VHlwZXMuVklFV0VELCBwYWdlSWQpIClcbiAgICAgKi9cbiAgICBwYWdlVmlldyggdmlldyA6IHN0cmluZywgZGF0YSA6IGFueSkge1xuICAgICAgICB0aGlzLmxvZ1BhZ2VWaWV3KHZpZXcsIGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdmlldyAtIG5hbWUgb2YgdGhlIHZpZXcgYmVpbmcgYWN0aXZhdGVkXG4gICAgICogQHBhcmFtIGRhdGEgLSBhZGRpdGlvbmFsIGNvbnRleHQgdG8gc3VwcGx5IGZvciB0aGUgZXZlbnRcbiAgICAgKiBAZGVwcmVjYXRlZCB1c2Ugc3ZjLmxvZ0V2ZW50KCBuZXcgRXZlbnQoRXZlbnRDYXRlZ29yaWVzLkFQUF9QQUdFLCBFdmVudFR5cGVzLlZJRVdFRCwgcGFnZUlkKSApXG4gICAgICovXG4gICAgbG9nUGFnZVZpZXcoXG4gICAgICAgIHZpZXcgOiBzdHJpbmcsXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZGF0YSA/OiBhbnlcbiAgICApIHtcbiAgICAgICAgdGhpcy5sb2dFdmVudCggbmV3IEV2ZW50KENhdGVnb3JpZXMuQVBQX1BBR0UsIEV2ZW50cy5WSUVXRUQsIHZpZXcpICk7XG4gICAgICAgIC8vIGlmKHRoaXMucHJvdmlkZXIgJiYgdGhpcy5wcm92aWRlci5sb2dQYWdlVmlldykge1xuICAgICAgICAvLyAgICAgdGhpcy5wcm92aWRlci5sb2dQYWdlVmlldyh2aWV3LCBkYXRhKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYXJhbXNcbiAgICAgKiBAcGFyYW0gcmVzdWx0Q291bnRcbiAgICAgKi9cbiAgICBsb2dTZWFyY2ggKHBhcmFtcyA6IGFueSwgcmVzdWx0Q291bnQgOiBzdHJpbmd8bnVtYmVyKSB7XG4gICAgICAgIHRoaXMucHJvdmlkZXIubG9nU2VhcmNoKHBhcmFtcywgcmVzdWx0Q291bnQpO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCB7XG4gICAgRXZlbnQgYXMgVHJhY2tpbmdFdmVudCxcbiAgICBUcmFja2luZ1NlcnZpY2UsXG4gICAgQ2F0ZWdvcmllcyBhcyBUcmFja2luZ0NhdGVnb3JpZXMsXG4gICAgRXZlbnRzIGFzIFRyYWNraW5nVHlwZXMsXG4gICAgVHJhY2tpbmdFdmVudEZhY3Rvcnlcbn07XG4iXX0=