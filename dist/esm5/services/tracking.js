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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tpbmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvdHJhY2tpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDOztBQUd4QyxJQUFNLFVBQVUsR0FBMkI7SUFDdkMsT0FBTyxFQUFVLGtCQUFrQjtJQUNuQyxPQUFPLEVBQVUsU0FBUztJQUMxQixPQUFPLEVBQVUsU0FBUztJQUMxQixLQUFLLEVBQVksT0FBTztJQUN4QixHQUFHLEVBQWMsS0FBSztJQUN0QixPQUFPLEVBQVUsU0FBUztJQUMxQixTQUFTLEVBQVEsV0FBVztJQUM1QixPQUFPLEVBQVUsU0FBUztJQUMxQixZQUFZLEVBQUssY0FBYztJQUMvQixPQUFPLEVBQVUsU0FBUztJQUMxQixjQUFjLEVBQUcsZ0JBQWdCO0lBQ2pDLFdBQVcsRUFBTSxhQUFhO0lBQzlCLEtBQUssRUFBWSxPQUFPO0lBQ3hCLE9BQU8sRUFBVSxTQUFTO0lBQzFCLGdCQUFnQixFQUFFLGlCQUFpQjtJQUNuQyxlQUFlLEVBQUUsaUJBQWlCO0lBQ2xDLElBQUksRUFBYSxNQUFNO0lBQ3ZCLGNBQWMsRUFBRyxnQkFBZ0I7O0lBQ2pDLGNBQWMsRUFBRyxnQkFBZ0I7O0lBQ2pDLFFBQVEsRUFBUyxrQkFBa0I7Q0FDdEMsQ0FBQzs7QUFFRixJQUFNLE1BQU0sR0FBMkI7SUFDbkMsUUFBUSxFQUFJLFVBQVU7O0lBQ3RCLFNBQVMsRUFBRyxXQUFXOztJQUN2QixNQUFNLEVBQU0sUUFBUTs7SUFDcEIsT0FBTyxFQUFLLFNBQVM7SUFDckIsTUFBTSxFQUFNLFFBQVE7SUFDcEIsT0FBTyxFQUFLLFNBQVM7SUFDckIsTUFBTSxFQUFNLFFBQVE7SUFDcEIsS0FBSyxFQUFPLE9BQU87O0lBQ25CLE9BQU8sRUFBSyxTQUFTOztJQUNyQixRQUFRLEVBQUksVUFBVTtJQUN0QixRQUFRLEVBQUksVUFBVTtDQUN6QixDQUFDOzs7OztBQUdGLHFCQUFxQixJQUFhOztJQUM5QixJQUFJLE1BQU0sR0FBRyxVQUFVLFlBQVM7SUFDaEMsSUFBRyxJQUFJLEVBQUU7O1FBQ0wsSUFBSSxJQUFJLEdBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFRLElBQUcsT0FBQSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUM7O1FBRTdFLElBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNsQixPQUFPLElBQUksQ0FBQztRQUNoQiw2REFBNkQ7YUFDeEQsSUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7O1lBQ3hCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNqQixPQUFPLEdBQUcsQ0FBQztTQUNsQjtLQUNKO0lBQ0QsT0FBTyxNQUFNLENBQUM7Q0FDakI7Ozs7QUFPRDs7O0FBQUE7SUFPSSxlQUFZLFFBQWlCLEVBQUUsSUFBYSxFQUFFLElBQVcsRUFBRSxPQUFjO29CQUhwRCxJQUFJO3VCQUNELElBQUk7UUFHeEIsSUFBRyxDQUFDLFFBQVEsSUFBSSxDQUFFLElBQUksRUFBRTtZQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRDtnQkFDakUsa0RBQWtELENBQUMsQ0FBQztTQUN2RDtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUM1Qjs7OztJQUNELDJCQUFXOzs7SUFBWCxjQUF5QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTs7OztJQUNoRCx1QkFBTzs7O0lBQVAsY0FBcUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Ozs7SUFDeEMsdUJBQU87OztJQUFQLGNBQWtCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFOzs7OztJQUNyQyx1QkFBTzs7OztJQUFQLFVBQVEsSUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFOzs7O0lBQ3BFLDBCQUFVOzs7SUFBVixjQUFxQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTs7Ozs7SUFDM0MsMEJBQVU7Ozs7SUFBVixVQUFXLE9BQWE7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQzNEO2dCQXpGTDtJQTBGQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FBU0QsOEJBQThCLFNBQWtCLEVBQUUsSUFBVTs7SUFDeEQsSUFBSSxNQUFNLHFCQUFhLEVBQWEsRUFBQztJQUNyQyxJQUFHLFNBQVMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtRQUMvQixJQUFHLFNBQVMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtZQUM1QixNQUFNLENBQUMsSUFBSSxDQUFFLElBQUksS0FBSyxDQUFDLFVBQVUsU0FBTSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUUsQ0FBQztZQUMxRCxJQUFHLE1BQU0sa0JBQWUsU0FBUyxFQUFFO2dCQUUvQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBRSxVQUFDLFVBQWdCO29CQUNsQyxJQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUU7O3dCQUNqQixJQUFJLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQzs2QkFDOUQsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFFLE9BQUEsQ0FBQyxLQUFHLElBQUksRUFBUixDQUFRLENBQUMsQ0FBQzt3QkFDekIsSUFBRyxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTs0QkFDbEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7eUJBQ3ZDO3FCQUNKO2lCQUNKLENBQUMsQ0FBQztnQkFFSCxJQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7O29CQUNmLElBQUksVUFBVSxHQUFHLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO3lCQUMzRCxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxDQUFDLEtBQUcsSUFBSSxFQUFSLENBQVEsQ0FBQyxDQUFDO29CQUN6QixJQUFHLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTTt3QkFDOUIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUUsVUFBVSxDQUFFLENBQUM7aUJBQzVDO2FBQ0o7U0FFSjthQUFNLElBQUcsU0FBUyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUUsSUFBSSxLQUFLLENBQUMsVUFBVSxXQUFRLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBRSxDQUFDO1lBQzVELElBQUcsTUFBTSxrQkFBZSxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDeEUsTUFBTSxDQUFDLElBQUksQ0FBRSxJQUFJLEtBQUssQ0FBQyxVQUFVLGFBQVUsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO2FBQzdFO1NBQ0o7YUFBTTs7WUFDSCxJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUUsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBRSxDQUFDO1NBQ3ZEO0tBQ0o7Ozs7OztJQU1ELE9BQU8sTUFBTSxDQUFDO0NBQ2pCOzs7O0FBU0Q7OztBQUFBO0lBQ0k7S0FBZ0I7Ozs7Ozs7O0lBQ2hCLGlEQUFROzs7Ozs7O0lBQVIsVUFDSSxRQUFpQixFQUNqQixLQUFjLEVBQ2QsSUFBVzs7SUFFWCxBQURBLGFBQWE7SUFDYixPQUFjO1FBRWQsT0FBTyxDQUFDLEdBQUcsQ0FBRSxTQUFTLEdBQUcsUUFBUSxHQUFHLE1BQU0sR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQ3RFO0lBQ0QsOEJBQThCO0lBQzlCLHFGQUFxRjtJQUNyRixJQUFJOzs7Ozs7SUFDSixrREFBUzs7Ozs7SUFBVCxVQUFVLE1BQWUsRUFBRSxXQUEyQjtRQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsR0FBRyxXQUFXLEdBQUUsVUFBVSxDQUFDLENBQUM7S0FDM0Y7eUNBcktMO0lBc0tDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0NEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFJSSx5QkFBWSxPQUFjO3dCQUZELElBQUk7UUFHekIsSUFBRyxPQUFPLElBQUksT0FBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVE7WUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFakMsSUFBRyxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDhCQUE4QixFQUFFLENBQUMsQ0FBQztLQUM5RDtJQUVEOztPQUVHOzs7OztJQUNILHFDQUFXOzs7O0lBQVgsVUFBWSxRQUFjO1FBQ3RCLElBQUcsUUFBUTtZQUNQLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0tBQ2hDO0lBRUQ7OztPQUdHOzs7OztJQUNILCtCQUFLOzs7O0lBQUwsVUFBTyxLQUFhO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUUsS0FBSyxDQUFFLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVEOztPQUVHOzs7OztJQUNILGtDQUFROzs7O0lBQVIsVUFBVSxLQUFxQjtRQUEvQixpQkF3QkM7UUF2QkcsSUFBRyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBRS9ELElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTs7WUFDckIsSUFBSSxNQUFNLHFCQUFhLEtBQWdCLEVBQUM7WUFDeEMsTUFBTSxDQUFDLE9BQU8sQ0FBRSxVQUFDLEdBQVcsSUFBSyxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQWxCLENBQWtCLENBQUUsQ0FBQztTQUV6RDthQUFNOztZQUNILElBQUksR0FBRyxxQkFBVyxLQUFjLEVBQUM7WUFDakMsSUFBSTtnQkFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDbEIsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUNqQixHQUFHLENBQUMsT0FBTyxFQUFFLEVBQ2IsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUNiLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FDbkIsQ0FBQzthQUNMO1lBQUMsT0FBTSxDQUFDLEVBQUU7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FDUCxvREFBb0Q7b0JBQ3BELEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUk7b0JBQy9DLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FDckMsQ0FBQzthQUNMO1NBQ0o7S0FDSjtJQUdEOzs7OztPQUtHOzs7Ozs7O0lBQ0gsa0NBQVE7Ozs7OztJQUFSLFVBQVUsSUFBYSxFQUFFLElBQVU7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0IsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCxxQ0FBVzs7Ozs7O0lBQVgsVUFDSSxJQUFhOztJQUViLEFBREEsYUFBYTtJQUNiLElBQVc7UUFFWCxJQUFJLENBQUMsUUFBUSxDQUFFLElBQUksS0FBSyxDQUFDLFVBQVUsY0FBVyxNQUFNLFlBQVMsSUFBSSxDQUFDLENBQUUsQ0FBQzs7OztLQUl4RTtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsbUNBQVM7Ozs7O0lBQVQsVUFBVyxNQUFZLEVBQUUsV0FBMkI7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQ2hEOzBCQXhTTDtJQTBTQyxDQUFBOzs7OztBQUdELE9BQU8sRUFDSCxLQUFLLElBQUksYUFBYSxFQUN0QixlQUFlLEVBQ2YsVUFBVSxJQUFJLGtCQUFrQixFQUNoQyxNQUFNLElBQUksYUFBYSxFQUN2QixvQkFBb0IsRUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgSXRlbVR5cGVzIGZyb20gJy4uL3NoYXJlZC90eXBlcyc7XG5cblxuY29uc3QgQ2F0ZWdvcmllcyA6IHtba2V5OnN0cmluZ106c3RyaW5nfSA9IHtcbiAgICBVTktOT1dOOiAgICAgICAgICdVbmtub3duIENhdGVnb3J5JyxcbiAgICBEQVRBU0VUOiAgICAgICAgICdEYXRhc2V0JyxcbiAgICBTRVJWSUNFOiAgICAgICAgICdTZXJ2aWNlJyxcbiAgICBMQVlFUjogICAgICAgICAgICdMYXllcicsXG4gICAgTUFQOiAgICAgICAgICAgICAnTWFwJyxcbiAgICBHQUxMRVJZOiAgICAgICAgICdHYWxsZXJ5JyxcbiAgICBDT01NVU5JVFk6ICAgICAgICdDb21tdW5pdHknLFxuICAgIENPTlRBQ1Q6ICAgICAgICAgJ0NvbnRhY3QnLFxuICAgIE9SR0FOSVpBVElPTjogICAgJ09yZ2FuaXphdGlvbicsXG4gICAgQ09OQ0VQVDogICAgICAgICAnQ29uY2VwdCcsXG4gICAgQ09OQ0VQVF9TQ0hFTUU6ICAnQ29uY2VwdCBTY2hlbWUnLFxuICAgIEFQUExJQ0FUSU9OOiAgICAgJ0FwcGxpY2F0aW9uJyxcbiAgICBUT1BJQzogICAgICAgICAgICdUb3BpYycsXG4gICAgV0VCU0lURTogICAgICAgICAnV2ViU2l0ZScsXG4gICAgUklHSFRTX1NUQVRFTUVOVDogJ1JpZ2h0c1N0YXRlbWVudCcsXG4gICAgS05PV0xFREdFX0dSQVBIOiAnS25vd2xlZGdlIEdyYXBoJyxcbiAgICBVU0VSOiAgICAgICAgICAgICdVc2VyJyxcbiAgICBDT01NVU5JVFlfUE9TVDogICdDb21tdW5pdHkgUG9zdCcsICAgLy9wb3N0IHdpdGhpbiBhIGNvbW11bml0eSBwb3J0YWxcbiAgICBDT01NVU5JVFlfUEFHRTogICdDb21tdW5pdHkgUGFnZScsICAgLy9wYWdlIHdpdGhpbiBhIGNvbW11bml0eSBwb3J0YWxcbiAgICBBUFBfUEFHRTogICAgICAgICdBcHBsaWNhdGlvbiBQYWdlJywgLy9wYWdlL3ZpZXcgd2l0aGluIGEgY2xpZW50IGFwcGxpY2F0aW9uXG59O1xuXG5jb25zdCBFdmVudHMgOiB7W2tleTpzdHJpbmddOnN0cmluZ30gPSB7XG4gICAgQUNDRVNTRUQ6ICAgJ0FjY2Vzc2VkJywgIC8vcmVsYXRlZCBpdGVtIHdhcyBhY2Nlc3NlZCB1c2luZyBBUElcbiAgICBESVNQTEFZRUQ6ICAnRGlzcGxheWVkJywgLy9yZWxhdGVkIGl0ZW0gd2FzIGRpc3BsYXllZCBpbiBhIG5hdGl2ZSBmb3JtIChtYXApXG4gICAgVklFV0VEOiAgICAgJ1ZpZXdlZCcsICAgIC8vcmVsYXRlZCBpdGVtIHdhcyB2aWV3ZWQgaW4gZ2VuZXJhbCBmb3JtIChtZXRhZGF0YSlcbiAgICBDUkVBVEVEOiAgICAnQ3JlYXRlZCcsXG4gICAgRURJVEVEOiAgICAgJ0VkaXRlZCcsXG4gICAgREVMRVRFRDogICAgJ0RlbGV0ZWQnLFxuICAgIENMT05FRDogICAgICdDbG9uZWQnLFxuICAgIEFEREVEOiAgICAgICdBZGRlZCcsICAgIC8vaXRlbSB3YXMgYWRkZWQgdG8gYW5vdGhlciAoaWUsIGxheWVyIG9uIG1hcClcbiAgICBSRU1PVkVEOiAgICAnUmVtb3ZlZCcsICAvL2l0ZW0gd2FzIHJlbW92ZWQgZnJvbSBhbm90aGVyIChpZSwgaXRlbSBmcm9tIGdhbGxlcnkpXG4gICAgRVhQT1JURUQ6ICAgJ0V4cG9ydGVkJyxcbiAgICBJTVBPUlRFRDogICAnSW1wb3J0ZWQnXG59O1xuXG5cbmZ1bmN0aW9uIGdldENhdGVnb3J5KHR5cGUgOiBzdHJpbmcpIDogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gQ2F0ZWdvcmllcy5VTktOT1dOO1xuICAgIGlmKHR5cGUpIHtcbiAgICAgICAgbGV0IGNhdHMgOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKENhdGVnb3JpZXMpLm1hcCgoazpzdHJpbmcpPT5DYXRlZ29yaWVzW2tdKTtcbiAgICAgICAgLy9pZiBleGlzdGluZyBjYXRlZ29yeSB3YXMgc3BlY2lmaWVkXG4gICAgICAgIGlmKH5jYXRzLmluZGV4T2YodHlwZSkpXG4gICAgICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgICAgLy9pZiBhbiBJdGVtVHlwZSB3aXRoIHByZWZpeCB3YXMgc3BlY2lmaWVkIChzdHJpcCBvZmYgcHJlZml4KVxuICAgICAgICBlbHNlIGlmKH50eXBlLmluZGV4T2YoJzonKSkge1xuICAgICAgICAgICAgbGV0IGNhdCA9IHR5cGUuc3BsaXQoJzonKVsxXTtcbiAgICAgICAgICAgIGlmKH5jYXRzLmluZGV4T2YoY2F0KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gY2F0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKipcbiAqXG4gKi9cbmNsYXNzIEV2ZW50IHtcblxuICAgIHByaXZhdGUgY2F0ZWdvcnkgOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSB0eXBlIDogc3RyaW5nO1xuICAgIHByaXZhdGUgaXRlbSA6IGFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSByZWxhdGVkIDogYW55ID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKGNhdGVnb3J5IDogc3RyaW5nLCB0eXBlIDogc3RyaW5nLCBpdGVtID86IGFueSwgcmVsYXRlZCA/OiBhbnkpIHtcbiAgICAgICAgaWYoIWNhdGVnb3J5IHx8ICEgdHlwZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVHJhY2tpbmdTZXJ2aWNlIEV2ZW50IC0gTXVzdCBzcGVjaWZpYyBhbiBldmVudCBcIiArXG4gICAgICAgICAgICBcImNhdGVnb3J5IGFuZCBldmVudCB0eXBlIHdoZW4gY29uc3RydWN0aW5nIGV2ZW50c1wiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuc2V0SXRlbShpdGVtKTtcbiAgICAgICAgdGhpcy5zZXRSZWxhdGVkKHJlbGF0ZWQpO1xuICAgIH1cbiAgICBnZXRDYXRlZ29yeSgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMuY2F0ZWdvcnk7IH1cbiAgICBnZXRUeXBlKCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy50eXBlOyB9XG4gICAgZ2V0SXRlbSgpIDogYW55IHsgcmV0dXJuIHRoaXMuaXRlbTsgfVxuICAgIHNldEl0ZW0oaXRlbSA6IGFueSkgeyB0aGlzLml0ZW0gPSBpdGVtID8gKGl0ZW0uaWQgfHwgaXRlbSkgOiBudWxsOyB9XG4gICAgZ2V0UmVsYXRlZCgpIDogYW55IHsgcmV0dXJuIHRoaXMucmVsYXRlZDsgfVxuICAgIHNldFJlbGF0ZWQocmVsYXRlZCA6IGFueSkge1xuICAgICAgICB0aGlzLnJlbGF0ZWQgPSByZWxhdGVkID8gKHJlbGF0ZWQuaWQgfHwgcmVsYXRlZCkgOiBudWxsO1xuICAgIH1cbn1cblxuXG5cbi8qKlxuICogQHBhcmFtIGV2ZW50VHlwZSAtIHR5cGUgb2YgZXZlbnQgYmVpbmcgY3JlYXRlZFxuICogQHBhcmFtIGl0ZW0gLSBHZW9QbGF0Zm9ybSBJdGVtIGluc3RhbmNlXG4gKiBAcmV0dXJuIGxpc3Qgb2YgZXZlbnQgb2JqZWN0c1xuICovXG5mdW5jdGlvbiBUcmFja2luZ0V2ZW50RmFjdG9yeShldmVudFR5cGUgOiBzdHJpbmcsIGl0ZW0gOiBhbnkpIDogRXZlbnRbXSB7XG4gICAgbGV0IHJlc3VsdCA6IEV2ZW50W10gPSBbXSBhcyBFdmVudFtdO1xuICAgIGlmKGV2ZW50VHlwZSAmJiBpdGVtICYmIGl0ZW0udHlwZSkge1xuICAgICAgICBpZihJdGVtVHlwZXMuTUFQID09PSBpdGVtLnR5cGUpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCBuZXcgRXZlbnQoQ2F0ZWdvcmllcy5NQVAsIGV2ZW50VHlwZSwgaXRlbSkgKTtcbiAgICAgICAgICAgIGlmKEV2ZW50cy5ESVNQTEFZRUQgPT09IGV2ZW50VHlwZSkge1xuXG4gICAgICAgICAgICAgICAgaXRlbS5sYXllcnMuZm9yRWFjaCggKGxheWVyU3RhdGUgOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYobGF5ZXJTdGF0ZS5sYXllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxheWVyRXZlbnRzID0gVHJhY2tpbmdFdmVudEZhY3RvcnkoZXZlbnRUeXBlLCBsYXllclN0YXRlLmxheWVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZT0+ZSE9PW51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGF5ZXJFdmVudHMgJiYgbGF5ZXJFdmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdChsYXllckV2ZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmKGl0ZW0uYmFzZUxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBiYXNlRXZlbnRzID0gVHJhY2tpbmdFdmVudEZhY3RvcnkoZXZlbnRUeXBlLCBpdGVtLmJhc2VMYXllcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZT0+ZSE9PW51bGwpO1xuICAgICAgICAgICAgICAgICAgICBpZihiYXNlRXZlbnRzICYmIGJhc2VFdmVudHMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdCggYmFzZUV2ZW50cyApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYoSXRlbVR5cGVzLkxBWUVSID09PSBpdGVtLnR5cGUpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCBuZXcgRXZlbnQoQ2F0ZWdvcmllcy5MQVlFUiwgZXZlbnRUeXBlLCBpdGVtKSApO1xuICAgICAgICAgICAgaWYoRXZlbnRzLkRJU1BMQVlFRCA9PT0gZXZlbnRUeXBlICYmIGl0ZW0uc2VydmljZXMgJiYgaXRlbS5zZXJ2aWNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCggbmV3IEV2ZW50KENhdGVnb3JpZXMuU0VSVklDRSwgZXZlbnRUeXBlLCBpdGVtLnNlcnZpY2VzWzBdKSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNhdGVnb3J5ID0gZ2V0Q2F0ZWdvcnkoaXRlbS50eXBlKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCBuZXcgRXZlbnQoY2F0ZWdvcnksIGV2ZW50VHlwZSwgaXRlbSkgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBlbHNlIHtcbiAgICAvLyAgICAgaWYoIWV2ZW50KSBjb25zb2xlLmxvZyhcIk1pc3NpbmcgZXZlbnRcIik7XG4gICAgLy8gICAgIGlmKCFpdGVtKSBjb25zb2xlLmxvZyhcIk1pc3NpbmcgaXRlbVwiKTtcbiAgICAvLyAgICAgaWYoIWl0ZW0udHlwZSkgY29uc29sZS5sb2coXCJNaXNzaW5nIGl0ZW0gdHlwZVwiKTtcbiAgICAvLyB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cblxuXG4vKipcbiAqXG4gKi9cbmNsYXNzIERlZmF1bHRUcmFja2luZ1NlcnZpY2VQcm92aWRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuICAgIGxvZ0V2ZW50KFxuICAgICAgICBjYXRlZ29yeSA6IHN0cmluZyxcbiAgICAgICAgZXZlbnQgOiBzdHJpbmcsXG4gICAgICAgIGl0ZW0gPzogYW55LFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJlbGF0ZWQgPzogYW55XG4gICAgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCBcIkVWRU5UIChcIiArIGNhdGVnb3J5ICsgXCIpIC0gXCIgKyBldmVudCArIFwiIDogXCIgKyBpdGVtKTtcbiAgICB9XG4gICAgLy8gbG9nUGFnZVZpZXcoIHZpZXcsIGRhdGEgKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwiUEFHRVZJRVcgXCIgKyB2aWV3ICsgKGRhdGEgPyBcIiA6IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkgOiAnJykgKTtcbiAgICAvLyB9XG4gICAgbG9nU2VhcmNoKHBhcmFtcyA6IHN0cmluZywgcmVzdWx0Q291bnQgOiBzdHJpbmd8bnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCBcIlF1ZXJ5IDogXCIgKyBKU09OLnN0cmluZ2lmeShwYXJhbXMpICsgXCIgZm91bmQgXCIgKyByZXN1bHRDb3VudCsgXCIgbWF0Y2hlc1wiKTtcbiAgICB9XG59XG5cblxuXG5cblxuXG4vKipcbiAqIFRyYWNraW5nU2VydmljZVxuICpcbiAqIFNlcnZpY2UgZm9yIGxvZ2dpbmcgZXZlbnRzIHJlbGF0ZWQgdG8gdXNhZ2Ugb2YgdGhlIEdlb1BsYXRmb3JtIGFuZCBpdHMgZGF0YVxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICBpbXBvcnQgeyBUcmFja2luZ1NlcnZpY2UsIEV2ZW50Q2F0ZWdvcmllcywgRXZlbnRUeXBlcyB9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG4gKlxuICogICBsZXQgdHJhY2tlciA9IG5ldyBUcmFja2luZ1NlcnZpY2UoKTtcbiAqICAgdHJhY2tlci5zZXRQcm92aWRlciggLi4uICk7XG4gKiAgIHRyYWNrZXIuZXZlbnQoIEV2ZW50Lm9mKEV2ZW50Q2F0ZWdvcmllcy5NQVAsIEV2ZW50VHlwZXMuVklFV0VELCBtYXApICk7XG4gKlxuICogTXVsdGktZXZlbnQgZXhhbXBsZTpcbiAqXG4gKiAgIGltcG9ydCB7XG4gKiAgICAgIFRyYWNraW5nU2VydmljZSwgVHJhY2tpbmdFdmVudENhdGVnb3JpZXMsIFRyYWNraW5nRXZlbnRUeXBlcywgVHJhY2tpbmdFdmVudEZhY3RvcnlcbiAqICAgfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuICpcbiAqICAgbGV0IHRyYWNrZXIgPSBuZXcgVHJhY2tpbmdTZXJ2aWNlKCk7XG4gKiAgIHRyYWNrZXIuc2V0UHJvdmlkZXIoIC4uLiApO1xuICpcbiAqICAgbGV0IGV2ZW50cyA9IFtcbiAqICAgICAgIFRyYWNraW5nRXZlbnQub2YoIFRyYWNraW5nQ2F0ZWdvcmllcy5NQVAsIFRyYWNraW5nRXZlbnRUeXBlcy5WSUVXRUQsIHRoaXMubWFwIClcbiAqICAgICAgIFRyYWNraW5nRXZlbnQub2YoIFRyYWNraW5nQ2F0ZWdvcmllcy5MQVlFUiwgVHJhY2tpbmdFdmVudFR5cGVzLlZJRVdFRCwgdGhpcy5tYXAuYmFzZUxheWVyIClcbiAqICAgXTtcbiAqICAgdHJhY2tlci5ldmVudChldmVudHMpO1xuICpcbiAqICAgLy9PUiB1c2UgdGhlIGV2ZW50IGZhY3Rvcnk6XG4gKiAgIHRyYWNrZXIuZXZlbnQoIFRyYWNraW5nRXZlbnRGYWN0b3J5KEV2ZW50VHlwZXMuVklFV0VELCB0aGlzLm1hcCkgKTtcbiAqL1xuY2xhc3MgVHJhY2tpbmdTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcHJvdmlkZXIgOiBhbnkgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA/OiBhbnkpIHtcbiAgICAgICAgaWYob3B0aW9ucyAmJiB0eXBlb2Yob3B0aW9ucykgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTtcblxuICAgICAgICBpZighdGhpcy5wcm92aWRlcilcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvdmlkZXIobmV3IERlZmF1bHRUcmFja2luZ1NlcnZpY2VQcm92aWRlcigpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcHJvdmlkZXIgLVxuICAgICAqL1xuICAgIHNldFByb3ZpZGVyKHByb3ZpZGVyIDogYW55KSB7XG4gICAgICAgIGlmKHByb3ZpZGVyKVxuICAgICAgICAgICAgdGhpcy5wcm92aWRlciA9IHByb3ZpZGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBldmVudCAtIGV2ZW50IHRvIGxvZ1xuICAgICAqIEByZXR1cm4gVHJhY2tpbmdTZXJ2aWNlXG4gICAgICovXG4gICAgZXZlbnQoIGV2ZW50IDogRXZlbnQgKSA6IFRyYWNraW5nU2VydmljZSB7XG4gICAgICAgIHRoaXMubG9nRXZlbnQoIGV2ZW50ICk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBldmVudCAtIGV2ZW50IHRvIGxvZ1xuICAgICAqL1xuICAgIGxvZ0V2ZW50KCBldmVudCA6IEV2ZW50fEV2ZW50W10pIHtcbiAgICAgICAgaWYoIXRoaXMucHJvdmlkZXIgfHwgIXRoaXMucHJvdmlkZXIubG9nRXZlbnQgfHwgIWV2ZW50KSByZXR1cm47XG5cbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShldmVudCkpIHtcbiAgICAgICAgICAgIGxldCBldmVudHMgOiBFdmVudFtdID0gZXZlbnQgYXMgRXZlbnRbXTtcbiAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKCAoZXZ0IDogRXZlbnQpID0+IHRoaXMubG9nRXZlbnQoZXZ0KSApO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZXZ0IDogRXZlbnQgPSBldmVudCBhcyBFdmVudDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm92aWRlci5sb2dFdmVudChcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldENhdGVnb3J5KCksXG4gICAgICAgICAgICAgICAgICAgIGV2dC5nZXRUeXBlKCksXG4gICAgICAgICAgICAgICAgICAgIGV2dC5nZXRJdGVtKCksXG4gICAgICAgICAgICAgICAgICAgIGV2dC5nZXRSZWxhdGVkKClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIFwiVHJhY2tpbmdTZXJ2aWNlLmxvZ0V2ZW50KCkgLSBFcnJvciBsb2dnaW5nIGV2ZW50IChcIiArXG4gICAgICAgICAgICAgICAgICAgIGV2dC5nZXRDYXRlZ29yeSgpICsgXCIsIFwiICsgZXZ0LmdldFR5cGUoKSArIFwiLCBcIiArXG4gICAgICAgICAgICAgICAgICAgIGV2dC5nZXRJdGVtKCkgKyBcIikgLSBcIiArIGUubWVzc2FnZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB2aWV3IC0gbmFtZSBvZiB0aGUgdmlldyBiZWluZyBhY3RpdmF0ZWRcbiAgICAgKiBAcGFyYW0gZGF0YSAtIGFkZGl0aW9uYWwgY29udGV4dCB0byBzdXBwbHkgZm9yIHRoZSBldmVudFxuICAgICAqIEByZXR1cm4gVHJhY2tpbmdTZXJ2aWNlXG4gICAgICogQGRlcHJlY2F0ZWQgdXNlIHN2Yy5ldmVudCggbmV3IEV2ZW50KEV2ZW50Q2F0ZWdvcmllcy5BUFBfUEFHRSwgRXZlbnRUeXBlcy5WSUVXRUQsIHBhZ2VJZCkgKVxuICAgICAqL1xuICAgIHBhZ2VWaWV3KCB2aWV3IDogc3RyaW5nLCBkYXRhIDogYW55KSB7XG4gICAgICAgIHRoaXMubG9nUGFnZVZpZXcodmlldywgZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB2aWV3IC0gbmFtZSBvZiB0aGUgdmlldyBiZWluZyBhY3RpdmF0ZWRcbiAgICAgKiBAcGFyYW0gZGF0YSAtIGFkZGl0aW9uYWwgY29udGV4dCB0byBzdXBwbHkgZm9yIHRoZSBldmVudFxuICAgICAqIEBkZXByZWNhdGVkIHVzZSBzdmMubG9nRXZlbnQoIG5ldyBFdmVudChFdmVudENhdGVnb3JpZXMuQVBQX1BBR0UsIEV2ZW50VHlwZXMuVklFV0VELCBwYWdlSWQpIClcbiAgICAgKi9cbiAgICBsb2dQYWdlVmlldyhcbiAgICAgICAgdmlldyA6IHN0cmluZyxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBkYXRhID86IGFueVxuICAgICkge1xuICAgICAgICB0aGlzLmxvZ0V2ZW50KCBuZXcgRXZlbnQoQ2F0ZWdvcmllcy5BUFBfUEFHRSwgRXZlbnRzLlZJRVdFRCwgdmlldykgKTtcbiAgICAgICAgLy8gaWYodGhpcy5wcm92aWRlciAmJiB0aGlzLnByb3ZpZGVyLmxvZ1BhZ2VWaWV3KSB7XG4gICAgICAgIC8vICAgICB0aGlzLnByb3ZpZGVyLmxvZ1BhZ2VWaWV3KHZpZXcsIGRhdGEpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHBhcmFtc1xuICAgICAqIEBwYXJhbSByZXN1bHRDb3VudFxuICAgICAqL1xuICAgIGxvZ1NlYXJjaCAocGFyYW1zIDogYW55LCByZXN1bHRDb3VudCA6IHN0cmluZ3xudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wcm92aWRlci5sb2dTZWFyY2gocGFyYW1zLCByZXN1bHRDb3VudCk7XG4gICAgfVxuXG59XG5cblxuZXhwb3J0IHtcbiAgICBFdmVudCBhcyBUcmFja2luZ0V2ZW50LFxuICAgIFRyYWNraW5nU2VydmljZSxcbiAgICBDYXRlZ29yaWVzIGFzIFRyYWNraW5nQ2F0ZWdvcmllcyxcbiAgICBFdmVudHMgYXMgVHJhY2tpbmdUeXBlcyxcbiAgICBUcmFja2luZ0V2ZW50RmFjdG9yeVxufTtcbiJdfQ==