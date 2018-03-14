
const chai = require('chai');
const expect = chai.expect;

const API = require('../../src/index');
const Types = API.ItemTypes;
const ItemFactory = API.ItemFactory;

const SampleMap = require('../data/map');

chai.config.includeStack = true;

describe('# ItemModel Factory', function() {

    it('should parse a Map', function(done) {

        let sampleMap = JSON.parse(JSON.stringify(SampleMap));
        let item = ItemFactory(sampleMap);

        expect(item.toJson).to.be.ok;
        expect(item.getLabel()).to.equal(SampleMap.label, "Map label was incorrect");
        expect(item.getDescription()).to.equal(SampleMap.description, "Map desc was incorrect");
        expect(item.getKeywords().length).to.equal(SampleMap.keywords.length, "Map keys were incorrect");
        expect(item.getKeywords()[0]).to.equal(SampleMap.keywords[0]);

        let bl = item.getBaseLayer();
        expect(bl).to.exist;
        expect(bl.toJson).to.be.ok;
        expect(bl.getLabel()).to.equal(SampleMap.baseLayer.label, "base layer label was incorrect");
        expect(bl.getResourceTypes().length).to.equal(1, "Incorrect resource types on base layer");

        expect(item.getLayers().length).to.equal(SampleMap.layers.length, "incorrect # of layers on map");
        item.getLayers().forEach( (state,li) => {

            let l1 = SampleMap.layers[li].layer;
            
            expect(state.layer).to.exist;
            expect(state.layer.toJson).to.be.ok;
            expect(state.layer.getLabel()).to.equal(l1.label, "layer label was incorrect");
            expect(state.layer.getDescription()).to.equal(l1.description);
            expect(state.layer.getLayerName()).to.equal(l1.layerName);
            expect(state.layer.getLayerType()).to.equal(l1.layerType);

            let svcs = state.layer.getServices();
            expect(svcs.length).to.equal(l1.services.length);
            svcs.forEach( function(service,si) {

                let s1 = l1.services[si];
                expect(service).to.exist;
                expect(service.toJson).to.be.ok;
                expect(service.getLabel()).to.equal(s1.label);
                expect(service.getDescription()).to.equal(s1.description);
                expect(service.getHref()).to.equal(s1.href);

                let t1 = s1.serviceType;
                let t2 = service.getServiceType();
                expect(t2.uri).to.equal(t1.uri);
                expect(t2.label).to.equal(t1.label);

            });

        });

        done();
    });

});
