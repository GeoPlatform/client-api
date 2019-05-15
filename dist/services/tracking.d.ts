declare const Categories: {
    [key: string]: string;
};
declare const Events: {
    [key: string]: string;
};
/**
 *
 */
declare class Event {
    private category;
    private type;
    private item;
    private related;
    constructor(category: string, type: string, item?: any, related?: any);
    getCategory(): string;
    getType(): string;
    getItem(): any;
    setItem(item: any): void;
    getRelated(): any;
    setRelated(related: any): void;
}
/**
 * @param eventType - type of event being created
 * @param item - GeoPlatform Item instance
 * @return list of event objects
 */
declare function TrackingEventFactory(eventType: string, item: any): Event[];
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
declare class TrackingService {
    private provider;
    constructor(options?: any);
    /**
     * @param provider -
     */
    setProvider(provider: any): void;
    /**
     * @param event - event to log
     * @return TrackingService
     */
    event(event: Event): TrackingService;
    /**
     * @param event - event to log
     */
    logEvent(event: Event | Event[]): void;
    /**
     * @param view - name of the view being activated
     * @param data - additional context to supply for the event
     * @return TrackingService
     * @deprecated use svc.event( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     */
    pageView(view: string, data: any): this;
    /**
     * @param view - name of the view being activated
     * @param data - additional context to supply for the event
     * @deprecated use svc.logEvent( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     */
    logPageView(view: string, data?: any): void;
    /**
     * @param params
     * @param resultCount
     */
    logSearch(params: any, resultCount: string | number): void;
}
export { Event as TrackingEvent, TrackingService, Categories as TrackingCategories, Events as TrackingTypes, TrackingEventFactory };
