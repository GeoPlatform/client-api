

import ItemTypes from '../shared/types';


const Categories = {
    UNKNOWN:         'Unknown Category',
    DATASET:         'Dataset',
    SERVICE:         'Service',
    LAYER:           'Layer',
    MAP:             'Map',
    GALLERY:         'Gallery',
    COMMUNITY:       'Community',
    CONTACT:         'Contact',
    ORGANIZATION:    'Organization',
    CONCEPT:         'Concept',
    CONCEPT_SCHEME:  'Concept Scheme',
    KNOWLEDGE_GRAPH: 'Knowledge Graph',
    USER:            'User',
    COMMUNITY_POST:  'Community Post',   //post within a community portal
    COMMUNITY_PAGE:  'Community Page',   //page within a community portal
    APP_PAGE:        'Application Page', //page/view within a client application
};

const Events = {
    ACCESSED:   'Accessed',  //related item was accessed using API
    DISPLAYED:  'Displayed', //related item was displayed in a native form (map)
    VIEWED:     'Viewed',    //related item was viewed in general form (metadata)
    CREATED:    'Created',
    EDITED:     'Edited',
    DELETED:    'Deleted'
};


function getCategory(type) {
    let result = Categories.UNKNOWN;
    if(type) {
        let cats = Object.keys(Categories).map(k=>Categories[k]);
        //if existing category was specified
        if(~cats.indexOf(type))
            return type;
        //if an ItemType with prefix was specified (strip off prefix)
        else if(~type.indexOf(':')) {
            let cat = type.split(':')[1];
            if(~cats.indexOf(cat))
                return cat;
        }
    }
    return result;
}



/**
 *
 */
class Event {
    constructor(category, type, item, related) {
        if(!category || ! type) {
            throw new Error("TrackingService Event - Must specific an event " +
            "category and event type when constructing events");
        }
        this.category = category;
        this.type = type;
        this.setItem(item);
        this.setRelated(related);
    }
    getCategory() { return this.category; }
    getType() { return this.type; }
    getItem() { return this.item; }
    setItem(item) { this.item = item ? (item.id || item) : null; }
    getRelated() { return this.related; }
    setRelated(related) { this.related = related ? (related.id || related) : null; }
}



/**
 * @param {string} eventType - type of event being created
 * @param {Object} item - GeoPlatform Item instance
 * @return {Array<Event>} list of event objects
 */
function TrackingEventFactory(eventType, item) {
    let result = [];
    if(eventType && item && item.type) {
        if(ItemTypes.MAP === item.type) {
            result.push( new Event(Categories.MAP, eventType, item) );
            if(Events.DISPLAYED === eventType) {

                item.layers.forEach( layer => {
                    let layerEvents = TrackingEventFactory(eventType, layer).filter(e=>e!==null);
                    if(layerEvents && layerEvents.length) {
                        result = result.concat(layerEvents);
                    }
                });

                if(item.baseLayer) {
                    let baseEvents = TrackingEventFactory(eventType, item.baseLayer).filter(e=>e!==null);
                    if(baseEvents && baseEvents.length)
                        result = result.concat( baseEvents );
                }
            }

        } else if(ItemTypes.LAYER === item.type) {
            result.push( new Event(Categories.LAYER, eventType, item) );
            if(Events.DISPLAYED === eventType && item.services && item.services.length) {
                result.push( new Event(Categories.SERVICE, eventType, item.services[0]) );
            }
        } else {
            let category = getCategory(item.type);
            result.push( new Event(category, eventType, item) );
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
    constructor() {}
    logEvent( category, event, item, related ) {
        console.log( "EVENT (" + category + ") - " + event + " : " + item);
    }
    // logPageView( view, data ) {
    //     console.log("PAGEVIEW " + view + (data ? " : " + JSON.stringify(data) : '') );
    // }
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

    constructor(options) {
        if(options && typeof(options) === 'object')
            Object.assign(this, options);

        if(!this.provider)
            this.setProvider(new DefaultEventServiceProvider());
    }

    /**
     * @param {EventServiceProvider} provider -
     */
    setProvider(provider) {
        if(provider)
            this.provider = provider;
    }

    /**
     * @param {Event} event - event to log
     * @return {TrackingService}
     */
    event( event ) {
        this.logEvent( event );
        return this;
    }

    /**
     * @param {Event} event - event to log
     */
    logEvent( event ) {
        if(!this.provider || !this.provider.logEvent || !event) return;

        if(typeof(event.push) !== 'undefined') {
            event.forEach( evt => this.logEvent(evt) );

        } else {
            this.provider.logEvent(
                event.getCategory(),
                event.getType(),
                event.getItem(),
                event.getRelated()
            );
        }

        // this.provider.logEvent(category, event, data);
    }


    /**
     * @param {string} view - name of the view being activated
     * @param {any} data - additional context to supply for the event
     * @return {TrackingService}
     * @deprecated use svc.event( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     */
    pageView( view, data) {
        this.logPageView(view, data);
        return this;
    }

    /**
     * @param {string} view - name of the view being activated
     * @param {any} data - additional context to supply for the event
     * @deprecated use svc.logEvent( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     */
    logPageView( view, data ) {
        this.logEvent( new Event(Categories.APP_PAGE, Events.VIEWED, view) );
        // if(this.provider && this.provider.logPageView) {
        //     this.provider.logPageView(view, data);
        // }
    }

}


export {
    Event as TrackingEvent,
    TrackingService,
    Categories as TrackingCategories,
    Events as TrackingTypes,
    TrackingEventFactory
};
