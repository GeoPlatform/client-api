
const Q = require('q');
const chai = require('chai');
const expect = chai.expect;

const API            = require('../../dist/js/geoplatform.client');
const TrackingService   = API.TrackingService;
const TrackingEvent = API.TrackingEvent;
const TrackingCategories = API.TrackingCategories;
const TrackingTypes = API.TrackingTypes;
const TrackingEventFactory = API.TrackingEventFactory;

chai.config.includeStack = true;

describe('# Tracking Service', function() {


    class TestTrackingServiceProvider {
        constructor() {
            this.numCalls = 0;
        }
        logEvent( category, event, item, related ) {
            this.numCalls++;
        }
        validate(expected) {
            expect(this.numCalls).to.equal(expected);
        }
        reset() { this.numCalls = 0; }
    }

    let provider = new TestTrackingServiceProvider();
    let service = new TrackingService({ provider: provider });


    it('should support logging events', function(done) {

        let item = { type: "Map", id: "testing" };
        let event = new TrackingEvent(TrackingCategories.MAP, TrackingTypes.VIEWED, item);
        expect(event).to.be.ok;
        expect(event.getCategory()).to.equal(TrackingCategories.MAP);
        expect(event.getType()).to.equal(TrackingTypes.VIEWED);
        expect(event.getItem()).to.equal(item.id);

        service.event(event);
        provider.validate(1);

        done();

    });


    it('should support multiple events at once', function(done) {

        let item = {
            type: "Map",
            id: "testing",
            layers: [
                {
                    type: "Layer",
                    id: "layer1",
                    services: [{
                        id: 'service1',
                        type: "regp:Service"
                    }]
                }
            ]
        };
        let events = TrackingEventFactory(TrackingTypes.DISPLAYED, item);
        expect(events.length).to.equal(3);
        expect(events[0].getCategory()).to.equal(TrackingCategories.MAP);
        expect(events[0].getType()).to.equal(TrackingTypes.DISPLAYED);
        expect(events[0].getItem()).to.equal(item.id);
        expect(events[1].getCategory()).to.equal(TrackingCategories.LAYER);
        expect(events[1].getType()).to.equal(TrackingTypes.DISPLAYED);
        expect(events[1].getItem()).to.equal(item.layers[0].id);
        expect(events[2].getCategory()).to.equal(TrackingCategories.SERVICE);
        expect(events[2].getType()).to.equal(TrackingTypes.DISPLAYED);
        expect(events[2].getItem()).to.equal(item.layers[0].services[0].id);

        provider.reset();
        service.event(events);
        provider.validate(3);

        done();

    });

});
