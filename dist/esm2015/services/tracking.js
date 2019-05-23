/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import ItemTypes from '../shared/types';
/** @type {?} */
const Categories = {
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
const Events = {
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
    let result = Categories["UNKNOWN"];
    if (type) {
        /** @type {?} */
        let cats = Object.keys(Categories).map((k) => Categories[k]);
        //if existing category was specified
        if (~cats.indexOf(type))
            return type;
        //if an ItemType with prefix was specified (strip off prefix)
        else if (~type.indexOf(':')) {
            /** @type {?} */
            let cat = type.split(':')[1];
            if (~cats.indexOf(cat))
                return cat;
        }
    }
    return result;
}
/**
 *
 */
class Event {
    /**
     * @param {?} category
     * @param {?} type
     * @param {?=} item
     * @param {?=} related
     */
    constructor(category, type, item, related) {
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
    getCategory() { return this.category; }
    /**
     * @return {?}
     */
    getType() { return this.type; }
    /**
     * @return {?}
     */
    getItem() { return this.item; }
    /**
     * @param {?} item
     * @return {?}
     */
    setItem(item) { this.item = item ? (item.id || item) : null; }
    /**
     * @return {?}
     */
    getRelated() { return this.related; }
    /**
     * @param {?} related
     * @return {?}
     */
    setRelated(related) {
        this.related = related ? (related.id || related) : null;
    }
}
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
    let result = /** @type {?} */ ([]);
    if (eventType && item && item.type) {
        if (ItemTypes.MAP === item.type) {
            result.push(new Event(Categories["MAP"], eventType, item));
            if (Events["DISPLAYED"] === eventType) {
                item.layers.forEach((layerState) => {
                    if (layerState.layer) {
                        /** @type {?} */
                        let layerEvents = TrackingEventFactory(eventType, layerState.layer)
                            .filter(e => e !== null);
                        if (layerEvents && layerEvents.length) {
                            result = result.concat(layerEvents);
                        }
                    }
                });
                if (item.baseLayer) {
                    /** @type {?} */
                    let baseEvents = TrackingEventFactory(eventType, item.baseLayer)
                        .filter(e => e !== null);
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
            let category = getCategory(item.type);
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
class DefaultTrackingServiceProvider {
    constructor() { }
    /**
     * @param {?} category
     * @param {?} event
     * @param {?=} item
     * @param {?=} related
     * @return {?}
     */
    logEvent(category, event, item, 
    // @ts-ignore
    // @ts-ignore
    related) {
        console.log("EVENT (" + category + ") - " + event + " : " + item);
    }
    /**
     * @param {?} params
     * @param {?} resultCount
     * @return {?}
     */
    logSearch(params, resultCount) {
        console.log("Query : " + JSON.stringify(params) + " found " + resultCount + " matches");
    }
}
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
class TrackingService {
    /**
     * @param {?=} options
     */
    constructor(options) {
        this.provider = null;
        if (options && typeof (options) === 'object')
            Object.assign(this, options);
        if (!this.provider)
            this.setProvider(new DefaultTrackingServiceProvider());
    }
    /**
     * @param {?} provider -
     * @return {?}
     */
    setProvider(provider) {
        if (provider)
            this.provider = provider;
    }
    /**
     * @param {?} event - event to log
     * @return {?} TrackingService
     */
    event(event) {
        this.logEvent(event);
        return this;
    }
    /**
     * @param {?} event - event to log
     * @return {?}
     */
    logEvent(event) {
        if (!this.provider || !this.provider.logEvent || !event)
            return;
        if (Array.isArray(event)) {
            /** @type {?} */
            let events = /** @type {?} */ (event);
            events.forEach((evt) => this.logEvent(evt));
        }
        else {
            /** @type {?} */
            let evt = /** @type {?} */ (event);
            try {
                this.provider.logEvent(evt.getCategory(), evt.getType(), evt.getItem(), evt.getRelated());
            }
            catch (e) {
                console.log("TrackingService.logEvent() - Error logging event (" +
                    evt.getCategory() + ", " + evt.getType() + ", " +
                    evt.getItem() + ") - " + e.message);
            }
        }
    }
    /**
     * @deprecated use svc.event( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     * @param {?} view - name of the view being activated
     * @param {?} data - additional context to supply for the event
     * @return {?} TrackingService
     */
    pageView(view, data) {
        this.logPageView(view, data);
        return this;
    }
    /**
     * @deprecated use svc.logEvent( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     * @param {?} view - name of the view being activated
     * @param {?=} data - additional context to supply for the event
     * @return {?}
     */
    logPageView(view, 
    // @ts-ignore
    // @ts-ignore
    data) {
        this.logEvent(new Event(Categories["APP_PAGE"], Events["VIEWED"], view));
        // if(this.provider && this.provider.logPageView) {
        //     this.provider.logPageView(view, data);
        // }
    }
    /**
     * @param {?} params
     * @param {?} resultCount
     * @return {?}
     */
    logSearch(params, resultCount) {
        this.provider.logSearch(params, resultCount);
    }
}
if (false) {
    /** @type {?} */
    TrackingService.prototype.provider;
}
export { Event as TrackingEvent, TrackingService, Categories as TrackingCategories, Events as TrackingTypes, TrackingEventFactory };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tpbmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvdHJhY2tpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDOztBQUd4QyxNQUFNLFVBQVUsR0FBMkI7SUFDdkMsT0FBTyxFQUFVLGtCQUFrQjtJQUNuQyxPQUFPLEVBQVUsU0FBUztJQUMxQixPQUFPLEVBQVUsU0FBUztJQUMxQixLQUFLLEVBQVksT0FBTztJQUN4QixHQUFHLEVBQWMsS0FBSztJQUN0QixPQUFPLEVBQVUsU0FBUztJQUMxQixTQUFTLEVBQVEsV0FBVztJQUM1QixPQUFPLEVBQVUsU0FBUztJQUMxQixZQUFZLEVBQUssY0FBYztJQUMvQixPQUFPLEVBQVUsU0FBUztJQUMxQixjQUFjLEVBQUcsZ0JBQWdCO0lBQ2pDLFdBQVcsRUFBTSxhQUFhO0lBQzlCLEtBQUssRUFBWSxPQUFPO0lBQ3hCLE9BQU8sRUFBVSxTQUFTO0lBQzFCLGdCQUFnQixFQUFFLGlCQUFpQjtJQUNuQyxlQUFlLEVBQUUsaUJBQWlCO0lBQ2xDLElBQUksRUFBYSxNQUFNO0lBQ3ZCLGNBQWMsRUFBRyxnQkFBZ0I7O0lBQ2pDLGNBQWMsRUFBRyxnQkFBZ0I7O0lBQ2pDLFFBQVEsRUFBUyxrQkFBa0I7Q0FDdEMsQ0FBQzs7QUFFRixNQUFNLE1BQU0sR0FBMkI7SUFDbkMsUUFBUSxFQUFJLFVBQVU7O0lBQ3RCLFNBQVMsRUFBRyxXQUFXOztJQUN2QixNQUFNLEVBQU0sUUFBUTs7SUFDcEIsT0FBTyxFQUFLLFNBQVM7SUFDckIsTUFBTSxFQUFNLFFBQVE7SUFDcEIsT0FBTyxFQUFLLFNBQVM7SUFDckIsTUFBTSxFQUFNLFFBQVE7SUFDcEIsS0FBSyxFQUFPLE9BQU87O0lBQ25CLE9BQU8sRUFBSyxTQUFTOztJQUNyQixRQUFRLEVBQUksVUFBVTtJQUN0QixRQUFRLEVBQUksVUFBVTtD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MkI7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQ2hEO0NBRUo7Ozs7O0FBR0QsT0FBTyxFQUNILEtBQUssSUFBSSxhQUFhLEVBQ3RCLGVBQWUsRUFDZixVQUFVLElBQUksa0JBQWtCLEVBQ2hDLE1BQU0sSUFBSSxhQUFhLEVBQ3ZCLG9CQUFvQixFQUN2QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCBJdGVtVHlwZXMgZnJvbSAnLi4vc2hhcmVkL3R5cGVzJztcblxuXG5jb25zdCBDYXRlZ29yaWVzIDoge1trZXk6c3RyaW5nXTpzdHJpbmd9ID0ge1xuICAgIFVOS05PV046ICAgICAgICAgJ1Vua25vd24gQ2F0ZWdvcnknLFxuICAgIERBVEFTRVQ6ICAgICAgICAgJ0RhdGFzZXQnLFxuICAgIFNFUlZJQ0U6ICAgICAgICAgJ1NlcnZpY2UnLFxuICAgIExBWUVSOiAgICAgICAgICAgJ0xheWVyJyxcbiAgICBNQVA6ICAgICAgICAgICAgICdNYXAnLFxuICAgIEdBTExFUlk6ICAgICAgICAgJ0dhbGxlcnknLFxuICAgIENPTU1VTklUWTogICAgICAgJ0NvbW11bml0eScsXG4gICAgQ09OVEFDVDogICAgICAgICAnQ29udGFjdCcsXG4gICAgT1JHQU5JWkFUSU9OOiAgICAnT3JnYW5pemF0aW9uJyxcbiAgICBDT05DRVBUOiAgICAgICAgICdDb25jZXB0JyxcbiAgICBDT05DRVBUX1NDSEVNRTogICdDb25jZXB0IFNjaGVtZScsXG4gICAgQVBQTElDQVRJT046ICAgICAnQXBwbGljYXRpb24nLFxuICAgIFRPUElDOiAgICAgICAgICAgJ1RvcGljJyxcbiAgICBXRUJTSVRFOiAgICAgICAgICdXZWJTaXRlJyxcbiAgICBSSUdIVFNfU1RBVEVNRU5UOiAnUmlnaHRzU3RhdGVtZW50JyxcbiAgICBLTk9XTEVER0VfR1JBUEg6ICdLbm93bGVkZ2UgR3JhcGgnLFxuICAgIFVTRVI6ICAgICAgICAgICAgJ1VzZXInLFxuICAgIENPTU1VTklUWV9QT1NUOiAgJ0NvbW11bml0eSBQb3N0JywgICAvL3Bvc3Qgd2l0aGluIGEgY29tbXVuaXR5IHBvcnRhbFxuICAgIENPTU1VTklUWV9QQUdFOiAgJ0NvbW11bml0eSBQYWdlJywgICAvL3BhZ2Ugd2l0aGluIGEgY29tbXVuaXR5IHBvcnRhbFxuICAgIEFQUF9QQUdFOiAgICAgICAgJ0FwcGxpY2F0aW9uIFBhZ2UnLCAvL3BhZ2UvdmlldyB3aXRoaW4gYSBjbGllbnQgYXBwbGljYXRpb25cbn07XG5cbmNvbnN0IEV2ZW50cyA6IHtba2V5OnN0cmluZ106c3RyaW5nfSA9IHtcbiAgICBBQ0NFU1NFRDogICAnQWNjZXNzZWQnLCAgLy9yZWxhdGVkIGl0ZW0gd2FzIGFjY2Vzc2VkIHVzaW5nIEFQSVxuICAgIERJU1BMQVlFRDogICdEaXNwbGF5ZWQnLCAvL3JlbGF0ZWQgaXRlbSB3YXMgZGlzcGxheWVkIGluIGEgbmF0aXZlIGZvcm0gKG1hcClcbiAgICBWSUVXRUQ6ICAgICAnVmlld2VkJywgICAgLy9yZWxhdGVkIGl0ZW0gd2FzIHZpZXdlZCBpbiBnZW5lcmFsIGZvcm0gKG1ldGFkYXRhKVxuICAgIENSRUFURUQ6ICAgICdDcmVhdGVkJyxcbiAgICBFRElURUQ6ICAgICAnRWRpdGVkJyxcbiAgICBERUxFVEVEOiAgICAnRGVsZXRlZCcsXG4gICAgQ0xPTkVEOiAgICAgJ0Nsb25lZCcsXG4gICAgQURERUQ6ICAgICAgJ0FkZGVkJywgICAgLy9pdGVtIHdhcyBhZGRlZCB0byBhbm90aGVyIChpZSwgbGF5ZXIgb24gbWFwKVxuICAgIFJFTU9WRUQ6ICAgICdSZW1vdmVkJywgIC8vaXRlbSB3YXMgcmVtb3ZlZCBmcm9tIGFub3RoZXIgKGllLCBpdGVtIGZyb20gZ2FsbGVyeSlcbiAgICBFWFBPUlRFRDogICAnRXhwb3J0ZWQnLFxuICAgIElNUE9SVEVEOiAgICdJbXBvcnRlZCdcbn07XG5cblxuZnVuY3Rpb24gZ2V0Q2F0ZWdvcnkodHlwZSA6IHN0cmluZykgOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSBDYXRlZ29yaWVzLlVOS05PV047XG4gICAgaWYodHlwZSkge1xuICAgICAgICBsZXQgY2F0cyA6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoQ2F0ZWdvcmllcykubWFwKChrOnN0cmluZyk9PkNhdGVnb3JpZXNba10pO1xuICAgICAgICAvL2lmIGV4aXN0aW5nIGNhdGVnb3J5IHdhcyBzcGVjaWZpZWRcbiAgICAgICAgaWYofmNhdHMuaW5kZXhPZih0eXBlKSlcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICAvL2lmIGFuIEl0ZW1UeXBlIHdpdGggcHJlZml4IHdhcyBzcGVjaWZpZWQgKHN0cmlwIG9mZiBwcmVmaXgpXG4gICAgICAgIGVsc2UgaWYofnR5cGUuaW5kZXhPZignOicpKSB7XG4gICAgICAgICAgICBsZXQgY2F0ID0gdHlwZS5zcGxpdCgnOicpWzFdO1xuICAgICAgICAgICAgaWYofmNhdHMuaW5kZXhPZihjYXQpKVxuICAgICAgICAgICAgICAgIHJldHVybiBjYXQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgRXZlbnQge1xuXG4gICAgcHJpdmF0ZSBjYXRlZ29yeSA6IHN0cmluZztcbiAgICBwcml2YXRlIHR5cGUgOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBpdGVtIDogYW55ID0gbnVsbDtcbiAgICBwcml2YXRlIHJlbGF0ZWQgOiBhbnkgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoY2F0ZWdvcnkgOiBzdHJpbmcsIHR5cGUgOiBzdHJpbmcsIGl0ZW0gPzogYW55LCByZWxhdGVkID86IGFueSkge1xuICAgICAgICBpZighY2F0ZWdvcnkgfHwgISB0eXBlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUcmFja2luZ1NlcnZpY2UgRXZlbnQgLSBNdXN0IHNwZWNpZmljIGFuIGV2ZW50IFwiICtcbiAgICAgICAgICAgIFwiY2F0ZWdvcnkgYW5kIGV2ZW50IHR5cGUgd2hlbiBjb25zdHJ1Y3RpbmcgZXZlbnRzXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5zZXRJdGVtKGl0ZW0pO1xuICAgICAgICB0aGlzLnNldFJlbGF0ZWQocmVsYXRlZCk7XG4gICAgfVxuICAgIGdldENhdGVnb3J5KCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5jYXRlZ29yeTsgfVxuICAgIGdldFR5cGUoKSA6IHN0cmluZyB7IHJldHVybiB0aGlzLnR5cGU7IH1cbiAgICBnZXRJdGVtKCkgOiBhbnkgeyByZXR1cm4gdGhpcy5pdGVtOyB9XG4gICAgc2V0SXRlbShpdGVtIDogYW55KSB7IHRoaXMuaXRlbSA9IGl0ZW0gPyAoaXRlbS5pZCB8fCBpdGVtKSA6IG51bGw7IH1cbiAgICBnZXRSZWxhdGVkKCkgOiBhbnkgeyByZXR1cm4gdGhpcy5yZWxhdGVkOyB9XG4gICAgc2V0UmVsYXRlZChyZWxhdGVkIDogYW55KSB7XG4gICAgICAgIHRoaXMucmVsYXRlZCA9IHJlbGF0ZWQgPyAocmVsYXRlZC5pZCB8fCByZWxhdGVkKSA6IG51bGw7XG4gICAgfVxufVxuXG5cblxuLyoqXG4gKiBAcGFyYW0gZXZlbnRUeXBlIC0gdHlwZSBvZiBldmVudCBiZWluZyBjcmVhdGVkXG4gKiBAcGFyYW0gaXRlbSAtIEdlb1BsYXRmb3JtIEl0ZW0gaW5zdGFuY2VcbiAqIEByZXR1cm4gbGlzdCBvZiBldmVudCBvYmplY3RzXG4gKi9cbmZ1bmN0aW9uIFRyYWNraW5nRXZlbnRGYWN0b3J5KGV2ZW50VHlwZSA6IHN0cmluZywgaXRlbSA6IGFueSkgOiBFdmVudFtdIHtcbiAgICBsZXQgcmVzdWx0IDogRXZlbnRbXSA9IFtdIGFzIEV2ZW50W107XG4gICAgaWYoZXZlbnRUeXBlICYmIGl0ZW0gJiYgaXRlbS50eXBlKSB7XG4gICAgICAgIGlmKEl0ZW1UeXBlcy5NQVAgPT09IGl0ZW0udHlwZSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goIG5ldyBFdmVudChDYXRlZ29yaWVzLk1BUCwgZXZlbnRUeXBlLCBpdGVtKSApO1xuICAgICAgICAgICAgaWYoRXZlbnRzLkRJU1BMQVlFRCA9PT0gZXZlbnRUeXBlKSB7XG5cbiAgICAgICAgICAgICAgICBpdGVtLmxheWVycy5mb3JFYWNoKCAobGF5ZXJTdGF0ZSA6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihsYXllclN0YXRlLmxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGF5ZXJFdmVudHMgPSBUcmFja2luZ0V2ZW50RmFjdG9yeShldmVudFR5cGUsIGxheWVyU3RhdGUubGF5ZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihlPT5lIT09bnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsYXllckV2ZW50cyAmJiBsYXllckV2ZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KGxheWVyRXZlbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5iYXNlTGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJhc2VFdmVudHMgPSBUcmFja2luZ0V2ZW50RmFjdG9yeShldmVudFR5cGUsIGl0ZW0uYmFzZUxheWVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihlPT5lIT09bnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGJhc2VFdmVudHMgJiYgYmFzZUV2ZW50cy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KCBiYXNlRXZlbnRzICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZihJdGVtVHlwZXMuTEFZRVIgPT09IGl0ZW0udHlwZSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goIG5ldyBFdmVudChDYXRlZ29yaWVzLkxBWUVSLCBldmVudFR5cGUsIGl0ZW0pICk7XG4gICAgICAgICAgICBpZihFdmVudHMuRElTUExBWUVEID09PSBldmVudFR5cGUgJiYgaXRlbS5zZXJ2aWNlcyAmJiBpdGVtLnNlcnZpY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCBuZXcgRXZlbnQoQ2F0ZWdvcmllcy5TRVJWSUNFLCBldmVudFR5cGUsIGl0ZW0uc2VydmljZXNbMF0pICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgY2F0ZWdvcnkgPSBnZXRDYXRlZ29yeShpdGVtLnR5cGUpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goIG5ldyBFdmVudChjYXRlZ29yeSwgZXZlbnRUeXBlLCBpdGVtKSApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGVsc2Uge1xuICAgIC8vICAgICBpZighZXZlbnQpIGNvbnNvbGUubG9nKFwiTWlzc2luZyBldmVudFwiKTtcbiAgICAvLyAgICAgaWYoIWl0ZW0pIGNvbnNvbGUubG9nKFwiTWlzc2luZyBpdGVtXCIpO1xuICAgIC8vICAgICBpZighaXRlbS50eXBlKSBjb25zb2xlLmxvZyhcIk1pc3NpbmcgaXRlbSB0eXBlXCIpO1xuICAgIC8vIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuXG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgRGVmYXVsdFRyYWNraW5nU2VydmljZVByb3ZpZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG4gICAgbG9nRXZlbnQoXG4gICAgICAgIGNhdGVnb3J5IDogc3RyaW5nLFxuICAgICAgICBldmVudCA6IHN0cmluZyxcbiAgICAgICAgaXRlbSA/OiBhbnksXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmVsYXRlZCA/OiBhbnlcbiAgICApIHtcbiAgICAgICAgY29uc29sZS5sb2coIFwiRVZFTlQgKFwiICsgY2F0ZWdvcnkgKyBcIikgLSBcIiArIGV2ZW50ICsgXCIgOiBcIiArIGl0ZW0pO1xuICAgIH1cbiAgICAvLyBsb2dQYWdlVmlldyggdmlldywgZGF0YSApIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJQQUdFVklFVyBcIiArIHZpZXcgKyAoZGF0YSA/IFwiIDogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSA6ICcnKSApO1xuICAgIC8vIH1cbiAgICBsb2dTZWFyY2gocGFyYW1zIDogc3RyaW5nLCByZXN1bHRDb3VudCA6IHN0cmluZ3xudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coIFwiUXVlcnkgOiBcIiArIEpTT04uc3RyaW5naWZ5KHBhcmFtcykgKyBcIiBmb3VuZCBcIiArIHJlc3VsdENvdW50KyBcIiBtYXRjaGVzXCIpO1xuICAgIH1cbn1cblxuXG5cblxuXG5cbi8qKlxuICogVHJhY2tpbmdTZXJ2aWNlXG4gKlxuICogU2VydmljZSBmb3IgbG9nZ2luZyBldmVudHMgcmVsYXRlZCB0byB1c2FnZSBvZiB0aGUgR2VvUGxhdGZvcm0gYW5kIGl0cyBkYXRhXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgIGltcG9ydCB7IFRyYWNraW5nU2VydmljZSwgRXZlbnRDYXRlZ29yaWVzLCBFdmVudFR5cGVzIH0gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcbiAqXG4gKiAgIGxldCB0cmFja2VyID0gbmV3IFRyYWNraW5nU2VydmljZSgpO1xuICogICB0cmFja2VyLnNldFByb3ZpZGVyKCAuLi4gKTtcbiAqICAgdHJhY2tlci5ldmVudCggRXZlbnQub2YoRXZlbnRDYXRlZ29yaWVzLk1BUCwgRXZlbnRUeXBlcy5WSUVXRUQsIG1hcCkgKTtcbiAqXG4gKiBNdWx0aS1ldmVudCBleGFtcGxlOlxuICpcbiAqICAgaW1wb3J0IHtcbiAqICAgICAgVHJhY2tpbmdTZXJ2aWNlLCBUcmFja2luZ0V2ZW50Q2F0ZWdvcmllcywgVHJhY2tpbmdFdmVudFR5cGVzLCBUcmFja2luZ0V2ZW50RmFjdG9yeVxuICogICB9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG4gKlxuICogICBsZXQgdHJhY2tlciA9IG5ldyBUcmFja2luZ1NlcnZpY2UoKTtcbiAqICAgdHJhY2tlci5zZXRQcm92aWRlciggLi4uICk7XG4gKlxuICogICBsZXQgZXZlbnRzID0gW1xuICogICAgICAgVHJhY2tpbmdFdmVudC5vZiggVHJhY2tpbmdDYXRlZ29yaWVzLk1BUCwgVHJhY2tpbmdFdmVudFR5cGVzLlZJRVdFRCwgdGhpcy5tYXAgKVxuICogICAgICAgVHJhY2tpbmdFdmVudC5vZiggVHJhY2tpbmdDYXRlZ29yaWVzLkxBWUVSLCBUcmFja2luZ0V2ZW50VHlwZXMuVklFV0VELCB0aGlzLm1hcC5iYXNlTGF5ZXIgKVxuICogICBdO1xuICogICB0cmFja2VyLmV2ZW50KGV2ZW50cyk7XG4gKlxuICogICAvL09SIHVzZSB0aGUgZXZlbnQgZmFjdG9yeTpcbiAqICAgdHJhY2tlci5ldmVudCggVHJhY2tpbmdFdmVudEZhY3RvcnkoRXZlbnRUeXBlcy5WSUVXRUQsIHRoaXMubWFwKSApO1xuICovXG5jbGFzcyBUcmFja2luZ1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBwcm92aWRlciA6IGFueSA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IGFueSkge1xuICAgICAgICBpZihvcHRpb25zICYmIHR5cGVvZihvcHRpb25zKSA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgICAgIGlmKCF0aGlzLnByb3ZpZGVyKVxuICAgICAgICAgICAgdGhpcy5zZXRQcm92aWRlcihuZXcgRGVmYXVsdFRyYWNraW5nU2VydmljZVByb3ZpZGVyKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwcm92aWRlciAtXG4gICAgICovXG4gICAgc2V0UHJvdmlkZXIocHJvdmlkZXIgOiBhbnkpIHtcbiAgICAgICAgaWYocHJvdmlkZXIpXG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVyID0gcHJvdmlkZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGV2ZW50IC0gZXZlbnQgdG8gbG9nXG4gICAgICogQHJldHVybiBUcmFja2luZ1NlcnZpY2VcbiAgICAgKi9cbiAgICBldmVudCggZXZlbnQgOiBFdmVudCApIDogVHJhY2tpbmdTZXJ2aWNlIHtcbiAgICAgICAgdGhpcy5sb2dFdmVudCggZXZlbnQgKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGV2ZW50IC0gZXZlbnQgdG8gbG9nXG4gICAgICovXG4gICAgbG9nRXZlbnQoIGV2ZW50IDogRXZlbnR8RXZlbnRbXSkge1xuICAgICAgICBpZighdGhpcy5wcm92aWRlciB8fCAhdGhpcy5wcm92aWRlci5sb2dFdmVudCB8fCAhZXZlbnQpIHJldHVybjtcblxuICAgICAgICBpZihBcnJheS5pc0FycmF5KGV2ZW50KSkge1xuICAgICAgICAgICAgbGV0IGV2ZW50cyA6IEV2ZW50W10gPSBldmVudCBhcyBFdmVudFtdO1xuICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goIChldnQgOiBFdmVudCkgPT4gdGhpcy5sb2dFdmVudChldnQpICk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBldnQgOiBFdmVudCA9IGV2ZW50IGFzIEV2ZW50O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3ZpZGVyLmxvZ0V2ZW50KFxuICAgICAgICAgICAgICAgICAgICBldnQuZ2V0Q2F0ZWdvcnkoKSxcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldEl0ZW0oKSxcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldFJlbGF0ZWQoKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgXCJUcmFja2luZ1NlcnZpY2UubG9nRXZlbnQoKSAtIEVycm9yIGxvZ2dpbmcgZXZlbnQgKFwiICtcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldENhdGVnb3J5KCkgKyBcIiwgXCIgKyBldnQuZ2V0VHlwZSgpICsgXCIsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldEl0ZW0oKSArIFwiKSAtIFwiICsgZS5tZXNzYWdlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHZpZXcgLSBuYW1lIG9mIHRoZSB2aWV3IGJlaW5nIGFjdGl2YXRlZFxuICAgICAqIEBwYXJhbSBkYXRhIC0gYWRkaXRpb25hbCBjb250ZXh0IHRvIHN1cHBseSBmb3IgdGhlIGV2ZW50XG4gICAgICogQHJldHVybiBUcmFja2luZ1NlcnZpY2VcbiAgICAgKiBAZGVwcmVjYXRlZCB1c2Ugc3ZjLmV2ZW50KCBuZXcgRXZlbnQoRXZlbnRDYXRlZ29yaWVzLkFQUF9QQUdFLCBFdmVudFR5cGVzLlZJRVdFRCwgcGFnZUlkKSApXG4gICAgICovXG4gICAgcGFnZVZpZXcoIHZpZXcgOiBzdHJpbmcsIGRhdGEgOiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2dQYWdlVmlldyh2aWV3LCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHZpZXcgLSBuYW1lIG9mIHRoZSB2aWV3IGJlaW5nIGFjdGl2YXRlZFxuICAgICAqIEBwYXJhbSBkYXRhIC0gYWRkaXRpb25hbCBjb250ZXh0IHRvIHN1cHBseSBmb3IgdGhlIGV2ZW50XG4gICAgICogQGRlcHJlY2F0ZWQgdXNlIHN2Yy5sb2dFdmVudCggbmV3IEV2ZW50KEV2ZW50Q2F0ZWdvcmllcy5BUFBfUEFHRSwgRXZlbnRUeXBlcy5WSUVXRUQsIHBhZ2VJZCkgKVxuICAgICAqL1xuICAgIGxvZ1BhZ2VWaWV3KFxuICAgICAgICB2aWV3IDogc3RyaW5nLFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGRhdGEgPzogYW55XG4gICAgKSB7XG4gICAgICAgIHRoaXMubG9nRXZlbnQoIG5ldyBFdmVudChDYXRlZ29yaWVzLkFQUF9QQUdFLCBFdmVudHMuVklFV0VELCB2aWV3KSApO1xuICAgICAgICAvLyBpZih0aGlzLnByb3ZpZGVyICYmIHRoaXMucHJvdmlkZXIubG9nUGFnZVZpZXcpIHtcbiAgICAgICAgLy8gICAgIHRoaXMucHJvdmlkZXIubG9nUGFnZVZpZXcodmlldywgZGF0YSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICogQHBhcmFtIHJlc3VsdENvdW50XG4gICAgICovXG4gICAgbG9nU2VhcmNoIChwYXJhbXMgOiBhbnksIHJlc3VsdENvdW50IDogc3RyaW5nfG51bWJlcikge1xuICAgICAgICB0aGlzLnByb3ZpZGVyLmxvZ1NlYXJjaChwYXJhbXMsIHJlc3VsdENvdW50KTtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQge1xuICAgIEV2ZW50IGFzIFRyYWNraW5nRXZlbnQsXG4gICAgVHJhY2tpbmdTZXJ2aWNlLFxuICAgIENhdGVnb3JpZXMgYXMgVHJhY2tpbmdDYXRlZ29yaWVzLFxuICAgIEV2ZW50cyBhcyBUcmFja2luZ1R5cGVzLFxuICAgIFRyYWNraW5nRXZlbnRGYWN0b3J5XG59O1xuIl19