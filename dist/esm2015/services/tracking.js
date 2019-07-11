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
        console.log("Event (" + category + ") - " + event + " : " + item);
    }
    /**
     * @param {?} view
     * @param {?} data
     * @return {?}
     */
    logPageView(view, data) {
        console.log("Page View " + view + (data ? " : " + JSON.stringify(data) : ''));
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
        if (this.provider && this.provider.logPageView) {
            this.provider.logPageView(view, data);
        }
        else {
            this.logEvent(new Event(Categories["APP_PAGE"], Events["VIEWED"], view));
        }
    }
    /**
     * @param {?} params
     * @param {?} resultCount
     * @return {?}
     */
    logSearch(params, resultCount) {
        if (this.provider.logSearch)
            this.provider.logSearch(params, resultCount);
    }
}
if (false) {
    /** @type {?} */
    TrackingService.prototype.provider;
}
export { Event as TrackingEvent, TrackingService, Categories as TrackingCategories, Events as TrackingTypes, TrackingEventFactory };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tpbmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZXMvdHJhY2tpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDOztBQUd4QyxNQUFNLFVBQVUsR0FBMkI7SUFDdkMsT0FBTyxFQUFVLGtCQUFrQjtJQUNuQyxPQUFPLEVBQVUsU0FBUztJQUMxQixPQUFPLEVBQVUsU0FBUztJQUMxQixLQUFLLEVBQVksT0FBTztJQUN4QixHQUFHLEVBQWMsS0FBSztJQUN0QixPQUFPLEVBQVUsU0FBUztJQUMxQixTQUFTLEVBQVEsV0FBVztJQUM1QixPQUFPLEVBQVUsU0FBUztJQUMxQixZQUFZLEVBQUssY0FBYztJQUMvQixPQUFPLEVBQVUsU0FBUztJQUMxQixjQUFjLEVBQUcsZ0JBQWdCO0lBQ2pDLFdBQVcsRUFBTSxhQUFhO0lBQzlCLEtBQUssRUFBWSxPQUFPO0lBQ3hCLE9BQU8sRUFBVSxTQUFTO0lBQzFCLGFBQWEsRUFBSSxlQUFlO0lBQ2hDLGdCQUFnQixFQUFDLGlCQUFpQjtJQUNsQyxlQUFlLEVBQUUsaUJBQWlCO0lBQ2xDLElBQUksRUFBYSxNQUFNO0lBQ3ZCLGNBQWMsRUFBRyxnQkFBZ0I7O0lBQ2pDLGNBQWMsRUFBRyxnQkFBZ0I7O0lBQ2pDLFFBQVEsRUFBUyxrQkFBa0I7Q0FDdEMsQ0FBQzs7QUFFRixNQUFNLE1BQU0sR0FBMkI7SUFDbkMsUUFBUSxFQUFJLFVBQVU7O0lBQ3RCLFNBQVMsRUFBRyxXQUFXOztJQUN2QixNQUFNLEVBQU0sUUFBUTs7SUFDcEIsT0FBTyxFQUFLLFNBQVM7SUFDckIsTUFBTSxFQUFNLFFBQVE7SUFDcEIsT0FBTyxFQUFLLFNBQVM7SUFDckIsTUFBTSxFQUFNLFFBQVE7SUFDcEIsS0FBSyxFQUFPLE9BQU87O0lBQ25CLE9BQU8sRUFBSyxTQUFTOztJQUNyQixRQUFRLEVBQUksVUFBVTtJ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QUMsQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQztLQUNmOzs7Ozs7O0lBT0QsV0FBVyxDQUNQLElBQWE7O0lBRWIsQUFEQSxhQUFhO0lBQ2IsSUFBVztRQUVYLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLENBQUUsSUFBSSxLQUFLLENBQUMsVUFBVSxjQUFXLE1BQU0sWUFBUyxJQUFJLENBQUMsQ0FBRSxDQUFDO1NBQ3hFO0tBQ0o7Ozs7OztJQU1ELFNBQVMsQ0FBRSxNQUFZLEVBQUUsV0FBMkI7UUFDaEQsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQ3BEO0NBRUo7Ozs7O0FBR0QsT0FBTyxFQUNILEtBQUssSUFBSSxhQUFhLEVBQ3RCLGVBQWUsRUFDZixVQUFVLElBQUksa0JBQWtCLEVBQ2hDLE1BQU0sSUFBSSxhQUFhLEVBQ3ZCLG9CQUFvQixFQUN2QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCBJdGVtVHlwZXMgZnJvbSAnLi4vc2hhcmVkL3R5cGVzJztcblxuXG5jb25zdCBDYXRlZ29yaWVzIDoge1trZXk6c3RyaW5nXTpzdHJpbmd9ID0ge1xuICAgIFVOS05PV046ICAgICAgICAgJ1Vua25vd24gQ2F0ZWdvcnknLFxuICAgIERBVEFTRVQ6ICAgICAgICAgJ0RhdGFzZXQnLFxuICAgIFNFUlZJQ0U6ICAgICAgICAgJ1NlcnZpY2UnLFxuICAgIExBWUVSOiAgICAgICAgICAgJ0xheWVyJyxcbiAgICBNQVA6ICAgICAgICAgICAgICdNYXAnLFxuICAgIEdBTExFUlk6ICAgICAgICAgJ0dhbGxlcnknLFxuICAgIENPTU1VTklUWTogICAgICAgJ0NvbW11bml0eScsXG4gICAgQ09OVEFDVDogICAgICAgICAnQ29udGFjdCcsXG4gICAgT1JHQU5JWkFUSU9OOiAgICAnT3JnYW5pemF0aW9uJyxcbiAgICBDT05DRVBUOiAgICAgICAgICdDb25jZXB0JyxcbiAgICBDT05DRVBUX1NDSEVNRTogICdDb25jZXB0IFNjaGVtZScsXG4gICAgQVBQTElDQVRJT046ICAgICAnQXBwbGljYXRpb24nLFxuICAgIFRPUElDOiAgICAgICAgICAgJ1RvcGljJyxcbiAgICBXRUJTSVRFOiAgICAgICAgICdXZWJTaXRlJyxcbiAgICBJTUFHRV9QUk9EVUNUOiAgICdJbWFnZSBQcm9kdWN0JyxcbiAgICBSSUdIVFNfU1RBVEVNRU5UOidSaWdodHNTdGF0ZW1lbnQnLFxuICAgIEtOT1dMRURHRV9HUkFQSDogJ0tub3dsZWRnZSBHcmFwaCcsXG4gICAgVVNFUjogICAgICAgICAgICAnVXNlcicsXG4gICAgQ09NTVVOSVRZX1BPU1Q6ICAnQ29tbXVuaXR5IFBvc3QnLCAgIC8vcG9zdCB3aXRoaW4gYSBjb21tdW5pdHkgcG9ydGFsXG4gICAgQ09NTVVOSVRZX1BBR0U6ICAnQ29tbXVuaXR5IFBhZ2UnLCAgIC8vcGFnZSB3aXRoaW4gYSBjb21tdW5pdHkgcG9ydGFsXG4gICAgQVBQX1BBR0U6ICAgICAgICAnQXBwbGljYXRpb24gUGFnZScsIC8vcGFnZS92aWV3IHdpdGhpbiBhIGNsaWVudCBhcHBsaWNhdGlvblxufTtcblxuY29uc3QgRXZlbnRzIDoge1trZXk6c3RyaW5nXTpzdHJpbmd9ID0ge1xuICAgIEFDQ0VTU0VEOiAgICdBY2Nlc3NlZCcsICAvL3JlbGF0ZWQgaXRlbSB3YXMgYWNjZXNzZWQgdXNpbmcgQVBJXG4gICAgRElTUExBWUVEOiAgJ0Rpc3BsYXllZCcsIC8vcmVsYXRlZCBpdGVtIHdhcyBkaXNwbGF5ZWQgaW4gYSBuYXRpdmUgZm9ybSAobWFwKVxuICAgIFZJRVdFRDogICAgICdWaWV3ZWQnLCAgICAvL3JlbGF0ZWQgaXRlbSB3YXMgdmlld2VkIGluIGdlbmVyYWwgZm9ybSAobWV0YWRhdGEpXG4gICAgQ1JFQVRFRDogICAgJ0NyZWF0ZWQnLFxuICAgIEVESVRFRDogICAgICdFZGl0ZWQnLFxuICAgIERFTEVURUQ6ICAgICdEZWxldGVkJyxcbiAgICBDTE9ORUQ6ICAgICAnQ2xvbmVkJyxcbiAgICBBRERFRDogICAgICAnQWRkZWQnLCAgICAvL2l0ZW0gd2FzIGFkZGVkIHRvIGFub3RoZXIgKGllLCBsYXllciBvbiBtYXApXG4gICAgUkVNT1ZFRDogICAgJ1JlbW92ZWQnLCAgLy9pdGVtIHdhcyByZW1vdmVkIGZyb20gYW5vdGhlciAoaWUsIGl0ZW0gZnJvbSBnYWxsZXJ5KVxuICAgIEVYUE9SVEVEOiAgICdFeHBvcnRlZCcsXG4gICAgSU1QT1JURUQ6ICAgJ0ltcG9ydGVkJ1xufTtcblxuXG5mdW5jdGlvbiBnZXRDYXRlZ29yeSh0eXBlIDogc3RyaW5nKSA6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdCA9IENhdGVnb3JpZXMuVU5LTk9XTjtcbiAgICBpZih0eXBlKSB7XG4gICAgICAgIGxldCBjYXRzIDogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhDYXRlZ29yaWVzKS5tYXAoKGs6c3RyaW5nKT0+Q2F0ZWdvcmllc1trXSk7XG4gICAgICAgIC8vaWYgZXhpc3RpbmcgY2F0ZWdvcnkgd2FzIHNwZWNpZmllZFxuICAgICAgICBpZih+Y2F0cy5pbmRleE9mKHR5cGUpKVxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgIC8vaWYgYW4gSXRlbVR5cGUgd2l0aCBwcmVmaXggd2FzIHNwZWNpZmllZCAoc3RyaXAgb2ZmIHByZWZpeClcbiAgICAgICAgZWxzZSBpZih+dHlwZS5pbmRleE9mKCc6JykpIHtcbiAgICAgICAgICAgIGxldCBjYXQgPSB0eXBlLnNwbGl0KCc6JylbMV07XG4gICAgICAgICAgICBpZih+Y2F0cy5pbmRleE9mKGNhdCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqXG4gKlxuICovXG5jbGFzcyBFdmVudCB7XG5cbiAgICBwcml2YXRlIGNhdGVnb3J5IDogc3RyaW5nO1xuICAgIHByaXZhdGUgdHlwZSA6IHN0cmluZztcbiAgICBwcml2YXRlIGl0ZW0gOiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgcmVsYXRlZCA6IGFueSA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihjYXRlZ29yeSA6IHN0cmluZywgdHlwZSA6IHN0cmluZywgaXRlbSA/OiBhbnksIHJlbGF0ZWQgPzogYW55KSB7XG4gICAgICAgIGlmKCFjYXRlZ29yeSB8fCAhIHR5cGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRyYWNraW5nU2VydmljZSBFdmVudCAtIE11c3Qgc3BlY2lmaWMgYW4gZXZlbnQgXCIgK1xuICAgICAgICAgICAgXCJjYXRlZ29yeSBhbmQgZXZlbnQgdHlwZSB3aGVuIGNvbnN0cnVjdGluZyBldmVudHNcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnNldEl0ZW0oaXRlbSk7XG4gICAgICAgIHRoaXMuc2V0UmVsYXRlZChyZWxhdGVkKTtcbiAgICB9XG4gICAgZ2V0Q2F0ZWdvcnkoKSA6IHN0cmluZyB7IHJldHVybiB0aGlzLmNhdGVnb3J5OyB9XG4gICAgZ2V0VHlwZSgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMudHlwZTsgfVxuICAgIGdldEl0ZW0oKSA6IGFueSB7IHJldHVybiB0aGlzLml0ZW07IH1cbiAgICBzZXRJdGVtKGl0ZW0gOiBhbnkpIHsgdGhpcy5pdGVtID0gaXRlbSA/IChpdGVtLmlkIHx8IGl0ZW0pIDogbnVsbDsgfVxuICAgIGdldFJlbGF0ZWQoKSA6IGFueSB7IHJldHVybiB0aGlzLnJlbGF0ZWQ7IH1cbiAgICBzZXRSZWxhdGVkKHJlbGF0ZWQgOiBhbnkpIHtcbiAgICAgICAgdGhpcy5yZWxhdGVkID0gcmVsYXRlZCA/IChyZWxhdGVkLmlkIHx8IHJlbGF0ZWQpIDogbnVsbDtcbiAgICB9XG59XG5cblxuXG4vKipcbiAqIEBwYXJhbSBldmVudFR5cGUgLSB0eXBlIG9mIGV2ZW50IGJlaW5nIGNyZWF0ZWRcbiAqIEBwYXJhbSBpdGVtIC0gR2VvUGxhdGZvcm0gSXRlbSBpbnN0YW5jZVxuICogQHJldHVybiBsaXN0IG9mIGV2ZW50IG9iamVjdHNcbiAqL1xuZnVuY3Rpb24gVHJhY2tpbmdFdmVudEZhY3RvcnkoZXZlbnRUeXBlIDogc3RyaW5nLCBpdGVtIDogYW55KSA6IEV2ZW50W10ge1xuICAgIGxldCByZXN1bHQgOiBFdmVudFtdID0gW10gYXMgRXZlbnRbXTtcbiAgICBpZihldmVudFR5cGUgJiYgaXRlbSAmJiBpdGVtLnR5cGUpIHtcbiAgICAgICAgaWYoSXRlbVR5cGVzLk1BUCA9PT0gaXRlbS50eXBlKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCggbmV3IEV2ZW50KENhdGVnb3JpZXMuTUFQLCBldmVudFR5cGUsIGl0ZW0pICk7XG4gICAgICAgICAgICBpZihFdmVudHMuRElTUExBWUVEID09PSBldmVudFR5cGUpIHtcblxuICAgICAgICAgICAgICAgIGl0ZW0ubGF5ZXJzLmZvckVhY2goIChsYXllclN0YXRlIDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGxheWVyU3RhdGUubGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYXllckV2ZW50cyA9IFRyYWNraW5nRXZlbnRGYWN0b3J5KGV2ZW50VHlwZSwgbGF5ZXJTdGF0ZS5sYXllcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGU9PmUhPT1udWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxheWVyRXZlbnRzICYmIGxheWVyRXZlbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQobGF5ZXJFdmVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZihpdGVtLmJhc2VMYXllcikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmFzZUV2ZW50cyA9IFRyYWNraW5nRXZlbnRGYWN0b3J5KGV2ZW50VHlwZSwgaXRlbS5iYXNlTGF5ZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGU9PmUhPT1udWxsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoYmFzZUV2ZW50cyAmJiBiYXNlRXZlbnRzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoIGJhc2VFdmVudHMgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmKEl0ZW1UeXBlcy5MQVlFUiA9PT0gaXRlbS50eXBlKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCggbmV3IEV2ZW50KENhdGVnb3JpZXMuTEFZRVIsIGV2ZW50VHlwZSwgaXRlbSkgKTtcbiAgICAgICAgICAgIGlmKEV2ZW50cy5ESVNQTEFZRUQgPT09IGV2ZW50VHlwZSAmJiBpdGVtLnNlcnZpY2VzICYmIGl0ZW0uc2VydmljZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goIG5ldyBFdmVudChDYXRlZ29yaWVzLlNFUlZJQ0UsIGV2ZW50VHlwZSwgaXRlbS5zZXJ2aWNlc1swXSkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjYXRlZ29yeSA9IGdldENhdGVnb3J5KGl0ZW0udHlwZSk7XG4gICAgICAgICAgICByZXN1bHQucHVzaCggbmV3IEV2ZW50KGNhdGVnb3J5LCBldmVudFR5cGUsIGl0ZW0pICk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gZWxzZSB7XG4gICAgLy8gICAgIGlmKCFldmVudCkgY29uc29sZS5sb2coXCJNaXNzaW5nIGV2ZW50XCIpO1xuICAgIC8vICAgICBpZighaXRlbSkgY29uc29sZS5sb2coXCJNaXNzaW5nIGl0ZW1cIik7XG4gICAgLy8gICAgIGlmKCFpdGVtLnR5cGUpIGNvbnNvbGUubG9nKFwiTWlzc2luZyBpdGVtIHR5cGVcIik7XG4gICAgLy8gfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG5cblxuLyoqXG4gKlxuICovXG5jbGFzcyBEZWZhdWx0VHJhY2tpbmdTZXJ2aWNlUHJvdmlkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge31cbiAgICBsb2dFdmVudChcbiAgICAgICAgY2F0ZWdvcnkgOiBzdHJpbmcsXG4gICAgICAgIGV2ZW50IDogc3RyaW5nLFxuICAgICAgICBpdGVtID86IGFueSxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZWxhdGVkID86IGFueVxuICAgICkge1xuICAgICAgICBjb25zb2xlLmxvZyggXCJFdmVudCAoXCIgKyBjYXRlZ29yeSArIFwiKSAtIFwiICsgZXZlbnQgKyBcIiA6IFwiICsgaXRlbSk7XG4gICAgfVxuICAgIGxvZ1BhZ2VWaWV3KCB2aWV3LCBkYXRhICkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBhZ2UgVmlldyBcIiArIHZpZXcgKyAoZGF0YSA/IFwiIDogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSA6ICcnKSApO1xuICAgIH1cbiAgICBsb2dTZWFyY2gocGFyYW1zIDogc3RyaW5nLCByZXN1bHRDb3VudCA6IHN0cmluZ3xudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coIFwiUXVlcnkgOiBcIiArIEpTT04uc3RyaW5naWZ5KHBhcmFtcykgKyBcIiBmb3VuZCBcIiArIHJlc3VsdENvdW50KyBcIiBtYXRjaGVzXCIpO1xuICAgIH1cbn1cblxuXG5cblxuXG5cbi8qKlxuICogVHJhY2tpbmdTZXJ2aWNlXG4gKlxuICogU2VydmljZSBmb3IgbG9nZ2luZyBldmVudHMgcmVsYXRlZCB0byB1c2FnZSBvZiB0aGUgR2VvUGxhdGZvcm0gYW5kIGl0cyBkYXRhXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgIGltcG9ydCB7IFRyYWNraW5nU2VydmljZSwgRXZlbnRDYXRlZ29yaWVzLCBFdmVudFR5cGVzIH0gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcbiAqXG4gKiAgIGxldCB0cmFja2VyID0gbmV3IFRyYWNraW5nU2VydmljZSgpO1xuICogICB0cmFja2VyLnNldFByb3ZpZGVyKCAuLi4gKTtcbiAqICAgdHJhY2tlci5ldmVudCggRXZlbnQub2YoRXZlbnRDYXRlZ29yaWVzLk1BUCwgRXZlbnRUeXBlcy5WSUVXRUQsIG1hcCkgKTtcbiAqXG4gKiBNdWx0aS1ldmVudCBleGFtcGxlOlxuICpcbiAqICAgaW1wb3J0IHtcbiAqICAgICAgVHJhY2tpbmdTZXJ2aWNlLCBUcmFja2luZ0V2ZW50Q2F0ZWdvcmllcywgVHJhY2tpbmdFdmVudFR5cGVzLCBUcmFja2luZ0V2ZW50RmFjdG9yeVxuICogICB9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG4gKlxuICogICBsZXQgdHJhY2tlciA9IG5ldyBUcmFja2luZ1NlcnZpY2UoKTtcbiAqICAgdHJhY2tlci5zZXRQcm92aWRlciggLi4uICk7XG4gKlxuICogICBsZXQgZXZlbnRzID0gW1xuICogICAgICAgVHJhY2tpbmdFdmVudC5vZiggVHJhY2tpbmdDYXRlZ29yaWVzLk1BUCwgVHJhY2tpbmdFdmVudFR5cGVzLlZJRVdFRCwgdGhpcy5tYXAgKVxuICogICAgICAgVHJhY2tpbmdFdmVudC5vZiggVHJhY2tpbmdDYXRlZ29yaWVzLkxBWUVSLCBUcmFja2luZ0V2ZW50VHlwZXMuVklFV0VELCB0aGlzLm1hcC5iYXNlTGF5ZXIgKVxuICogICBdO1xuICogICB0cmFja2VyLmV2ZW50KGV2ZW50cyk7XG4gKlxuICogICAvL09SIHVzZSB0aGUgZXZlbnQgZmFjdG9yeTpcbiAqICAgdHJhY2tlci5ldmVudCggVHJhY2tpbmdFdmVudEZhY3RvcnkoRXZlbnRUeXBlcy5WSUVXRUQsIHRoaXMubWFwKSApO1xuICovXG5jbGFzcyBUcmFja2luZ1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBwcm92aWRlciA6IGFueSA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IGFueSkge1xuICAgICAgICBpZihvcHRpb25zICYmIHR5cGVvZihvcHRpb25zKSA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgICAgIGlmKCF0aGlzLnByb3ZpZGVyKVxuICAgICAgICAgICAgdGhpcy5zZXRQcm92aWRlcihuZXcgRGVmYXVsdFRyYWNraW5nU2VydmljZVByb3ZpZGVyKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwcm92aWRlciAtXG4gICAgICovXG4gICAgc2V0UHJvdmlkZXIocHJvdmlkZXIgOiBhbnkpIHtcbiAgICAgICAgaWYocHJvdmlkZXIpXG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVyID0gcHJvdmlkZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGV2ZW50IC0gZXZlbnQgdG8gbG9nXG4gICAgICogQHJldHVybiBUcmFja2luZ1NlcnZpY2VcbiAgICAgKi9cbiAgICBldmVudCggZXZlbnQgOiBFdmVudCApIDogVHJhY2tpbmdTZXJ2aWNlIHtcbiAgICAgICAgdGhpcy5sb2dFdmVudCggZXZlbnQgKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGV2ZW50IC0gZXZlbnQgdG8gbG9nXG4gICAgICovXG4gICAgbG9nRXZlbnQoIGV2ZW50IDogRXZlbnR8RXZlbnRbXSkge1xuICAgICAgICBpZighdGhpcy5wcm92aWRlciB8fCAhdGhpcy5wcm92aWRlci5sb2dFdmVudCB8fCAhZXZlbnQpIHJldHVybjtcblxuICAgICAgICBpZihBcnJheS5pc0FycmF5KGV2ZW50KSkge1xuICAgICAgICAgICAgbGV0IGV2ZW50cyA6IEV2ZW50W10gPSBldmVudCBhcyBFdmVudFtdO1xuICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goIChldnQgOiBFdmVudCkgPT4gdGhpcy5sb2dFdmVudChldnQpICk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBldnQgOiBFdmVudCA9IGV2ZW50IGFzIEV2ZW50O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3ZpZGVyLmxvZ0V2ZW50KFxuICAgICAgICAgICAgICAgICAgICBldnQuZ2V0Q2F0ZWdvcnkoKSxcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldEl0ZW0oKSxcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldFJlbGF0ZWQoKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgXCJUcmFja2luZ1NlcnZpY2UubG9nRXZlbnQoKSAtIEVycm9yIGxvZ2dpbmcgZXZlbnQgKFwiICtcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldENhdGVnb3J5KCkgKyBcIiwgXCIgKyBldnQuZ2V0VHlwZSgpICsgXCIsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmdldEl0ZW0oKSArIFwiKSAtIFwiICsgZS5tZXNzYWdlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHZpZXcgLSBuYW1lIG9mIHRoZSB2aWV3IGJlaW5nIGFjdGl2YXRlZFxuICAgICAqIEBwYXJhbSBkYXRhIC0gYWRkaXRpb25hbCBjb250ZXh0IHRvIHN1cHBseSBmb3IgdGhlIGV2ZW50XG4gICAgICogQHJldHVybiBUcmFja2luZ1NlcnZpY2VcbiAgICAgKiBAZGVwcmVjYXRlZCB1c2Ugc3ZjLmV2ZW50KCBuZXcgRXZlbnQoRXZlbnRDYXRlZ29yaWVzLkFQUF9QQUdFLCBFdmVudFR5cGVzLlZJRVdFRCwgcGFnZUlkKSApXG4gICAgICovXG4gICAgcGFnZVZpZXcoIHZpZXcgOiBzdHJpbmcsIGRhdGEgOiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2dQYWdlVmlldyh2aWV3LCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHZpZXcgLSBuYW1lIG9mIHRoZSB2aWV3IGJlaW5nIGFjdGl2YXRlZFxuICAgICAqIEBwYXJhbSBkYXRhIC0gYWRkaXRpb25hbCBjb250ZXh0IHRvIHN1cHBseSBmb3IgdGhlIGV2ZW50XG4gICAgICogQGRlcHJlY2F0ZWQgdXNlIHN2Yy5sb2dFdmVudCggbmV3IEV2ZW50KEV2ZW50Q2F0ZWdvcmllcy5BUFBfUEFHRSwgRXZlbnRUeXBlcy5WSUVXRUQsIHBhZ2VJZCkgKVxuICAgICAqL1xuICAgIGxvZ1BhZ2VWaWV3KFxuICAgICAgICB2aWV3IDogc3RyaW5nLFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGRhdGEgPzogYW55XG4gICAgKSB7XG4gICAgICAgIGlmKHRoaXMucHJvdmlkZXIgJiYgdGhpcy5wcm92aWRlci5sb2dQYWdlVmlldykge1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlci5sb2dQYWdlVmlldyh2aWV3LCBkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nRXZlbnQoIG5ldyBFdmVudChDYXRlZ29yaWVzLkFQUF9QQUdFLCBFdmVudHMuVklFV0VELCB2aWV3KSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHBhcmFtc1xuICAgICAqIEBwYXJhbSByZXN1bHRDb3VudFxuICAgICAqL1xuICAgIGxvZ1NlYXJjaCAocGFyYW1zIDogYW55LCByZXN1bHRDb3VudCA6IHN0cmluZ3xudW1iZXIpIHtcbiAgICAgICAgaWYodGhpcy5wcm92aWRlci5sb2dTZWFyY2gpXG4gICAgICAgICAgICB0aGlzLnByb3ZpZGVyLmxvZ1NlYXJjaChwYXJhbXMsIHJlc3VsdENvdW50KTtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQge1xuICAgIEV2ZW50IGFzIFRyYWNraW5nRXZlbnQsXG4gICAgVHJhY2tpbmdTZXJ2aWNlLFxuICAgIENhdGVnb3JpZXMgYXMgVHJhY2tpbmdDYXRlZ29yaWVzLFxuICAgIEV2ZW50cyBhcyBUcmFja2luZ1R5cGVzLFxuICAgIFRyYWNraW5nRXZlbnRGYWN0b3J5XG59O1xuIl19