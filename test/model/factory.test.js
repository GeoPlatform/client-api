
const chai = require('chai');
const expect = chai.expect;

const API = require('../../dist/js/geoplatform.client');
const Types = API.ItemTypes;
const ItemFactory = API.ItemFactory;

const SampleMap = require('../data/map');
const SampleLayer = require('../data/layer');
const SampleService = require('../data/service');
const SampleDataset = require('../data/dataset');
const SampleGallery = require('../data/gallery');
const SampleCommunity = require('../data/community');
const SampleContact = require('../data/contact');
const SampleOrg = require('../data/org');

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





    it('should parse a Layer', function(done) {

        let layer = JSON.parse(JSON.stringify(SampleLayer));
        let item = ItemFactory(layer);

        expect(item.toJson).to.be.ok;
        expect(item.getLabel()).to.equal(SampleLayer.label, "label was incorrect");
        expect(item.getDescription()).to.equal(SampleLayer.description, "desc was incorrect");
        expect(item.getKeywords().length).to.equal(SampleLayer.keywords.length, "keys were incorrect");
        expect(item.getKeywords()[0]).to.equal(SampleLayer.keywords[0]);
        expect(item.getLayerName()).to.equal(SampleLayer.layerName);
        expect(item.getLayerType()).to.equal(SampleLayer.layerType);
        expect(item.getFormats().length).to.equal(SampleLayer.supportedFormats.length);
        expect(item.getFormats()[0]).to.equal(SampleLayer.supportedFormats[0]);
        expect(item.getCreated()).to.equal(SampleLayer._created);
        expect(item.getModified()).to.equal(SampleLayer.modified);
        expect(item.getCreatedBy()).to.equal(SampleLayer.createdBy);
        expect(item.getThemes().length).to.equal(SampleLayer.themes.length);
        expect(item.getThemes()[0].getLabel()).to.equal(SampleLayer.themes[0].label);
        expect(item.getPublishers().length).to.equal(SampleLayer.publishers.length);
        expect(item.getPublishers()[0].getLabel()).to.equal(SampleLayer.publishers[0].label);
        expect(item.getServices().length).to.equal(SampleLayer.services.length);
        expect(item.getServices()[0].getLabel()).to.equal(SampleLayer.services[0].label);

        let extent = item.getExtent();
        expect(extent).to.be.ok;
        expect(extent.minx).to.equal(SampleLayer.extent.minx);
        expect(extent.miny).to.equal(SampleLayer.extent.miny);
        expect(extent.maxx).to.equal(SampleLayer.extent.maxx);
        expect(extent.maxy).to.equal(SampleLayer.extent.maxy);

        expect(item.getMinScale()).to.equal(SampleLayer.minScale);
        expect(item.getMaxScale()).to.equal(SampleLayer.maxScale);

        let legend = item.getLegend();
        expect(legend).to.exist;
        expect(legend.title).to.equal(SampleLayer.legend.title);
        expect(legend.description).to.equal(SampleLayer.legend.description);
        expect(legend.items.length).to.equal(SampleLayer.legend.items.length);
        expect(legend.items[0].label).to.equal(SampleLayer.legend.items[0].label);

        done();
    });




    it('should parse a Service', function(done) {

        let service = JSON.parse(JSON.stringify(SampleService));
        let item = ItemFactory(service);

        expect(item.toJson).to.be.ok;
        expect(item.getLabel()).to.equal(SampleService.label, "label was incorrect");
        expect(item.getDescription()).to.equal(SampleService.description, "desc was incorrect");
        expect(item.getKeywords().length).to.equal(SampleService.keywords.length, "keys were incorrect");
        expect(item.getKeywords()[0]).to.equal(SampleService.keywords[0]);
        expect(item.getIdentifiers().length).to.equal(SampleService.identifiers.length);
        expect(item.getCreated()).to.equal(SampleService._created);
        expect(item.getModified()).to.equal(SampleService.modified);
        expect(item.getCreatedBy()).to.equal(SampleService.createdBy);
        expect(item.getHref()).to.equal(SampleService.href);
        expect(item.getThemes().length).to.equal(SampleService.themes.length);
        expect(item.getPublishers().length).to.equal(SampleService.publishers.length);
        expect(item.getPublishers()[0].getLabel()).to.equal(SampleService.publishers[0].label);

        let extent = item.getExtent();
        expect(extent).to.be.ok;
        expect(extent.minx).to.equal(SampleService.extent.minx);
        expect(extent.miny).to.equal(SampleService.extent.miny);
        expect(extent.maxx).to.equal(SampleService.extent.maxx);
        expect(extent.maxy).to.equal(SampleService.extent.maxy);

        let svcType = item.getServiceType();
        expect(svcType).to.exist;
        expect(svcType.uri).to.equal(SampleService.serviceType.uri);
        expect(svcType.label).to.equal(SampleService.serviceType.label);
        expect(svcType.id).to.equal(SampleService.serviceType.id);

        let stats = item.getStatistics();
        expect(stats).to.exist;
        expect(stats.online).to.equal(SampleService.statistics.online);
        expect(stats.compliant).to.equal(SampleService.statistics.compliant);
        expect(stats.days_online).to.equal(SampleService.statistics.days_online);
        expect(stats.days_in_service).to.equal(SampleService.statistics.days_in_service);
        expect(stats.speed).to.equal(SampleService.statistics.speed);
        expect(stats.score).to.equal(SampleService.statistics.score);
        expect(stats.reliability).to.equal(SampleService.statistics.reliability);
        expect(stats.percent_uptime).to.equal(SampleService.statistics.percent_uptime);
        expect(stats.average_speed).to.equal(SampleService.statistics.average_speed);
        expect(stats.numLikes).to.equal(SampleService.statistics.numLikes);
        expect(stats.numViews).to.equal(SampleService.statistics.numViews);

        done();
    });




    it('should parse a Dataset', function(done) {

        let dataset = JSON.parse(JSON.stringify(SampleDataset));
        let item = ItemFactory(dataset);

        expect(item.toJson).to.be.ok;
        expect(item.getLabel()).to.equal(SampleDataset.label, "label was incorrect");
        expect(item.getDescription()).to.equal(SampleDataset.description, "desc was incorrect");
        expect(item.getKeywords().length).to.equal(SampleDataset.keywords.length, "keys were incorrect");
        expect(item.getKeywords()[0]).to.equal(SampleDataset.keywords[0]);

        //TODO more test

        done();
    });




    it('should parse a Gallery', function(done) {

        let gallery = JSON.parse(JSON.stringify(SampleGallery));
        let item = ItemFactory(gallery);

        expect(item.toJson).to.be.ok;
        expect(item.getLabel()).to.equal(SampleGallery.label, "label was incorrect");
        expect(item.getDescription()).to.equal(SampleGallery.description, "desc was incorrect");
        expect(item.getKeywords().length).to.equal(SampleGallery.keywords.length, "keys were incorrect");
        expect(item.getKeywords()[0]).to.equal(SampleGallery.keywords[0]);
        expect(item.getCreated()).to.equal(SampleGallery._created);
        expect(item.getModified()).to.equal(SampleGallery.modified);
        expect(item.getCreatedBy()).to.equal(SampleGallery.createdBy);
        expect(item.getLastModifiedBy()).to.equal(SampleGallery.lastModifiedBy);
        expect(item.getStatus()).to.equal(SampleGallery.status);
        expect(item.getVisibility()).to.equal(SampleGallery.visibility);
        expect(item.getContacts().length).to.equal(SampleGallery.contacts.length);
        expect(item.getContacts()[0].getLabel()).to.equal(SampleGallery.contacts[0].label);

        let extent = item.getExtent();
        expect(extent).to.be.ok;
        expect(extent.minx).to.equal(SampleGallery.extent.minx);
        expect(extent.miny).to.equal(SampleGallery.extent.miny);
        expect(extent.maxx).to.equal(SampleGallery.extent.maxx);
        expect(extent.maxy).to.equal(SampleGallery.extent.maxy);

        let stats = item.getStatistics();
        expect(stats).to.exist;
        expect(stats.numViews).to.equal(SampleGallery.statistics.numViews);

        let items = item.getItems();
        expect(items.length).to.equal(SampleGallery.items.length);
        expect(items[0].assetId).to.equal(SampleGallery.items[0].assetId);
        expect(items[0].assetType).to.equal(SampleGallery.items[0].assetType);
        expect(items[0].label).to.equal(SampleGallery.items[0].label);

        done();
    });





    it('should parse a Community', function(done) {

        let community = JSON.parse(JSON.stringify(SampleCommunity));
        let item = ItemFactory(community);

        expect(item.toJson).to.be.ok;
        expect(item.getLabel()).to.equal(SampleCommunity.label, "label was incorrect");
        expect(item.getDescription()).to.equal(SampleCommunity.description, "desc was incorrect");
        expect(item.getKeywords().length).to.equal(SampleCommunity.keywords.length, "keys were incorrect");
        expect(item.getKeywords()[0]).to.equal(SampleCommunity.keywords[0]);

        //TODO more test

        done();
    });






    it('should parse a Contact', function(done) {

        let contact = JSON.parse(JSON.stringify(SampleContact));
        let item = ItemFactory(contact);

        expect(item.toJson).to.be.ok;
        expect(item.getFullName()).to.equal(SampleContact.fullName);
        expect(item.getEmail()).to.equal(SampleContact.email);
        expect(item.getPhone()).to.equal(SampleContact.tel);
        expect(item.getOrgName()).to.equal(SampleContact.orgName);
        expect(item.getPosition()).to.equal(SampleContact.positionTitle);

        let addr = item.getAddress();
        expect(addr).to.exist;
        expect(addr.street).to.equal(SampleContact.address.street);
        expect(addr.city).to.equal(SampleContact.address.city);
        expect(addr.state).to.equal(SampleContact.address.state);
        expect(addr.country).to.equal(SampleContact.address.country);
        expect(addr.zip).to.equal(SampleContact.address.zip);

        done();
    });





    it('should parse an Organization', function(done) {

        let org = JSON.parse(JSON.stringify(SampleOrg));
        let item = ItemFactory(org);

        expect(item.toJson).to.be.ok;
        expect(item.getName()).to.equal(SampleOrg.name, "name was incorrect");
        expect(item.getResourceTypes().length).to.equal(SampleOrg.resourceTypes.length);

        //TODO more test

        done();
    });
});
