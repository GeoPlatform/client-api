

import ItemTypes from '../shared/types';


const Categories : {[key:string]:string} = {
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
    APPLICATION:     'Application',
    TOPIC:           'Topic',
    WEBSITE:         'WebSite',
    RIGHTS_STATEMENT: 'RightsStatement',
    KNOWLEDGE_GRAPH: 'Knowledge Graph',
    USER:            'User',
    COMMUNITY_POST:  'Community Post',   //post within a community portal
    COMMUNITY_PAGE:  'Community Page',   //page within a community portal
    APP_PAGE:        'Application Page', //page/view within a client application
};

const Events : {[key:string]:string} = {
    ACCESSED:   'Accessed',  //related item was accessed using API
    DISPLAYED:  'Displayed', //related item was displayed in a native form (map)
    VIEWED:     'Viewed',    //related item was viewed in general form (metadata)
    CREATED:    'Created',
    EDITED:     'Edited',
    DELETED:    'Deleted',
    CLONED:     'Cloned',
    ADDED:      'Added',    //item was added to another (ie, layer on map)
    REMOVED:    'Removed',  //item was removed from another (ie, item from gallery)
    EXPORTED:   'Exported',
    IMPORTED:   'Imported'
};


function getCategory(type : string) : string {
    let result = Categories.UNKNOWN;
    if(type) {
        let cats : string[] = Object.keys(Categories).map((k:string)=>Categories[k]);
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

    private category : string;
    private type : string;
    private item : any = null;
    private related : any = null;

    constructor(category : string, type : string, item ?: any, related ?: any) {
        if(!category || ! type) {
            throw new Error("TrackingService Event - Must specific an event " +
            "category and event type when constructing events");
        }
        this.category = category;
        this.type = type;
        this.setItem(item);
        this.setRelated(related);
    }
    getCategory() : string { return this.category; }
    getType() : string { return this.type; }
    getItem() : any { return this.item; }
    setItem(item : any) { this.item = item ? (item.id || item) : null; }
    getRelated() : any { return this.related; }
    setRelated(related : any) {
        this.related = related ? (related.id || related) : null;
    }
}



/**
 * @param eventType - type of event being created
 * @param item - GeoPlatform Item instance
 * @return list of event objects
 */
function TrackingEventFactory(eventType : string, item : any) : Event[] {
    let result : Event[] = [] as Event[];
    if(eventType && item && item.type) {
        if(ItemTypes.MAP === item.type) {
            result.push( new Event(Categories.MAP, eventType, item) );
            if(Events.DISPLAYED === eventType) {

                item.layers.forEach( (layerState : any) => {
                    if(layerState.layer) {
                        let layerEvents = TrackingEventFactory(eventType, layerState.layer)
                            .filter(e=>e!==null);
                        if(layerEvents && layerEvents.length) {
                            result = result.concat(layerEvents);
                        }
                    }
                });

                if(item.baseLayer) {
                    let baseEvents = TrackingEventFactory(eventType, item.baseLayer)
                        .filter(e=>e!==null);
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
    logEvent(
        category : string,
        event : string,
        item ?: any,
        // @ts-ignore
        related ?: any
    ) {
        console.log( "EVENT (" + category + ") - " + event + " : " + item);
    }
    // logPageView( view, data ) {
    //     console.log("PAGEVIEW " + view + (data ? " : " + JSON.stringify(data) : '') );
    // }
    logSearch(params : string, resultCount : string|number) {
        console.log( "Query : " + JSON.stringify(params) + " found " + resultCount+ " matches");
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

    private provider : any = null;

    constructor(options ?: any) {
        if(options && typeof(options) === 'object')
            Object.assign(this, options);

        if(!this.provider)
            this.setProvider(new DefaultTrackingServiceProvider());
    }

    /**
     * @param provider -
     */
    setProvider(provider : any) {
        if(provider)
            this.provider = provider;
    }

    /**
     * @param event - event to log
     * @return TrackingService
     */
    event( event : Event ) : TrackingService {
        this.logEvent( event );
        return this;
    }

    /**
     * @param event - event to log
     */
    logEvent( event : Event|Event[]) {
        if(!this.provider || !this.provider.logEvent || !event) return;

        if(Array.isArray(event)) {
            let events : Event[] = event as Event[];
            events.forEach( (evt : Event) => this.logEvent(evt) );

        } else {
            let evt : Event = event as Event;
            try {
                this.provider.logEvent(
                    evt.getCategory(),
                    evt.getType(),
                    evt.getItem(),
                    evt.getRelated()
                );
            } catch(e) {
                console.log(
                    "TrackingService.logEvent() - Error logging event (" +
                    evt.getCategory() + ", " + evt.getType() + ", " +
                    evt.getItem() + ") - " + e.message
                );
            }
        }
    }


    /**
     * @param view - name of the view being activated
     * @param data - additional context to supply for the event
     * @return TrackingService
     * @deprecated use svc.event( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     */
    pageView( view : string, data : any) {
        this.logPageView(view, data);
        return this;
    }

    /**
     * @param view - name of the view being activated
     * @param data - additional context to supply for the event
     * @deprecated use svc.logEvent( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     */
    logPageView(
        view : string,
        // @ts-ignore
        data ?: any
    ) {
        this.logEvent( new Event(Categories.APP_PAGE, Events.VIEWED, view) );
        // if(this.provider && this.provider.logPageView) {
        //     this.provider.logPageView(view, data);
        // }
    }

    /**
     * @param params
     * @param resultCount
     */
    logSearch (params : any, resultCount : string|number) {
        this.provider.logSearch(params, resultCount);
    }

}


export {
    Event as TrackingEvent,
    TrackingService,
    Categories as TrackingCategories,
    Events as TrackingTypes,
    TrackingEventFactory
};
