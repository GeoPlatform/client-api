
const Q = require('q');
const chai = require('chai');
const expect = chai.expect;
const md5 = require('md5');

const API        = require('../dist/bundles/geoplatform-client.umd');
const ItemTypes  = API.ItemTypes;
const URIFactory = API.URIFactory(md5);

chai.config.includeStack = true;

const URI_BASE = 'http://www.geoplatform.gov/id/';


describe('## URI Factory', () => {


    describe("### Datasets", () => {

        it("should support generate URIs", (done) => {

            let input = {
                title: "Testing",
                publishers: [
                    { label: "Publisher One" }
                ]
            };

            let uri = URIFactory(input);
            expect(uri).to.not.be.ok;       //missing 'type'

            input.type = ItemTypes.DATASET;
            uri = URIFactory(input);
            expect(uri).to.be.ok;
            expect(uri).to.contain(URI_BASE + 'dataset/');

            //verify case insensitivity and spaces don't matter
            input.title = input.title.toLowerCase() + ' ';
            input.publishers[0].label = input.publishers[0].label.toUpperCase().replace(/\s/g, '');
            let uri2 = URIFactory(input);
            expect(uri2).to.be.ok;
            expect(uri2).to.equal(uri);

            done();
        });

    });

    describe("### Services", () => {

        it("should generate URIs", (done) => {

            let input = {
                href: 'http://www.google.com'
            };

            let uri = URIFactory(input);
            expect(uri).to.not.be.ok;       //missing 'type'

            input.type = ItemTypes.SERVICE;
            uri = URIFactory(input);
            expect(uri).to.be.ok;
            expect(uri).to.contain(URI_BASE + 'service/');

            //verify case insensitivity and spaces don't matter
            input.href = input.href.toUpperCase() + ' ';
            let uri2 = URIFactory(input);
            expect(uri2).to.be.ok;
            expect(uri2).to.equal(uri);

            done();
        });

        it("should ignore trailing '?' and '/'", (done) => {

            let originalBase = 'http://www.google.com';
            let input = {
                type: ItemTypes.SERVICE,
                href: originalBase+''
            };

            let control = URIFactory(input);
            expect(control).to.be.ok;

            input.href = originalBase + '/';
            let trailingSlash = URIFactory(input);
            expect(trailingSlash).to.be.ok;
            expect(trailingSlash).to.equal(control);

            input.href = originalBase + '?';
            let trailingQ = URIFactory(input);
            expect(trailingQ).to.be.ok;
            expect(trailingQ).to.equal(control);

            done();
        });

        it("should ignore OGC parameters", (done) => {

            let originalBase = 'http://www.google.com';
            let input = {
                type: ItemTypes.SERVICE,
                href: originalBase+''
            };

            let control = URIFactory(input);
            expect(control).to.be.ok;

            input.href = originalBase + '?request=GetCapabilities&service=WMS&version=1.1.1';
            let getCap = URIFactory(input);
            expect(getCap).to.be.ok;
            expect(getCap).to.equal(control);

            input.href = originalBase + '?request=GetMap&service=WMS&version=1.1.1&layers=1,2';
            let getMap = URIFactory(input);
            expect(getMap).to.be.ok;
            expect(getMap).to.equal(control);

            done();
        });

        it("should ignore protocols", (done) => {

            let originalBase = 'www.google.com';
            let input = {
                type: ItemTypes.SERVICE,
                href: 'http://' + originalBase
            };

            let control = URIFactory(input);
            expect(control).to.be.ok;

            input.href = 'https://' + originalBase;
            let httpsUrl = URIFactory(input);
            expect(httpsUrl).to.be.ok;
            expect(httpsUrl).to.equal(control);

            done();
        });

    });

    describe("### Layers", () => {

        it("should generate URIs", (done) => {

            let input = {
                layerName: 'test',
                services: [{
                    href: 'http://www.google.com'
                }]
            };

            let uri = URIFactory(input);
            expect(uri).to.not.be.ok;       //missing 'type'

            input.type = ItemTypes.LAYER;
            uri = URIFactory(input);
            expect(uri).to.be.ok;
            expect(uri).to.contain(URI_BASE + 'layer/');

            //verify case insensitivity and spaces don't matter
            input.layerName = input.layerName.toUpperCase() + ' ';
            input.services[0].href = input.services[0].href.toUpperCase() + ' ';
            let uri2 = URIFactory(input);
            expect(uri2).to.be.ok;
            expect(uri2).to.equal(uri);

            done();
        });

    });


    describe("### Maps", () => {

        it("should generate URIs", (done) => {

            let input = {
                title: 'My Map',
                createdBy: "tester"
            };

            let uri = URIFactory(input);
            expect(uri).to.not.be.ok;       //missing 'type'

            input.type = ItemTypes.MAP;
            uri = URIFactory(input);
            expect(uri).to.be.ok;
            expect(uri).to.contain(URI_BASE + 'map/');

            done();
        });

    });


    describe("### Galleries", () => {

        it("should generate URIs", (done) => {

            let input = {
                title: 'My Gallery',
                createdBy: "tester"
            };

            let uri = URIFactory(input);
            expect(uri).to.not.be.ok;       //missing 'type'

            input.type = ItemTypes.GALLERY;
            uri = URIFactory(input);
            expect(uri).to.be.ok;
            expect(uri).to.contain(URI_BASE + 'gallery/');

            done();
        });

    });


    describe("### Communities", () => {

        it("should generate URIs", (done) => {

            let input = {
                title: 'My Community',
                createdBy: "tester"
            };

            let uri = URIFactory(input);
            expect(uri).to.not.be.ok;       //missing 'type'

            input.type = ItemTypes.COMMUNITY;
            uri = URIFactory(input);
            expect(uri).to.be.ok;
            expect(uri).to.contain(URI_BASE + 'community/');

            done();
        });

    });


    describe("### Orgs", () => {

        it("should support Organizations", (done) => {

            let input = { name: 'Acme, Inc.' };

            let uri = URIFactory(input);
            expect(uri).to.not.be.ok;       //missing 'type'

            input.type = ItemTypes.ORGANIZATION;
            uri = URIFactory(input);
            expect(uri).to.be.ok;
            expect(uri).to.contain(URI_BASE + 'organization/');

            //verify case insensitivity and that spaces don't matter
            input.name = input.name.toUpperCase().replace(/\s/g, '');
            let uri2 = URIFactory(input);
            expect(uri2).to.be.ok;
            expect(uri2).to.equal(uri);

            done();
        });

    });


    describe("### Contacts", () => {

        it("should generate URIs", (done) => {

            let input = {
                fullName: 'Joe Test',
                email: "test@geoplatform.gov"
            };

            let uri = URIFactory(input);
            expect(uri).to.not.be.ok;       //missing 'type'

            input.type = ItemTypes.CONTACT;
            uri = URIFactory(input);
            expect(uri).to.be.ok;
            expect(uri).to.contain(URI_BASE + 'contact/');

            //verify case insensitivity and spaces don't matter
            input.fullName = input.fullName.toUpperCase().replace(/\s/g, '');
            input.email = input.email.toUpperCase();
            let uri2 = URIFactory(input);
            expect(uri2).to.be.ok;
            expect(uri2).to.equal(uri);

            done();
        });

    });


    describe("### Persons", () => {

        it("should generate URIs", (done) => {

            let input = {
                name: 'Joe Test'
            };

            let uri = URIFactory(input);
            expect(uri).to.not.be.ok;       //missing 'type'

            input.type = ItemTypes.PERSON;
            uri = URIFactory(input);
            expect(uri).to.be.ok;
            expect(uri).to.contain(URI_BASE + 'person/');

            //verify case insensitivity and spaces don't matter
            input.name = input.name.toUpperCase().replace(/\s/g, '');
            let uri2 = URIFactory(input);
            expect(uri2).to.be.ok;
            expect(uri2).to.equal(uri);

            done();
        });

    });

    describe("### Concepts", () => {

        it("should generate URIs", (done) => {

            let input = {
                prefLabel: 'Test',
                scheme: {
                    prefLabel: "Test Scheme"
                }
            };

            let uri = URIFactory(input);
            expect(uri).to.not.be.ok;       //missing 'type'

            input.type = ItemTypes.CONCEPT;
            uri = URIFactory(input);
            expect(uri).to.be.ok;
            expect(uri).to.contain(URI_BASE + 'metadata-codelists/');

            //verify case insensitivity and spaces don't matter
            input.prefLabel = input.prefLabel.toUpperCase();
            input.scheme.prefLabel.replace(/\s/g, '');
            let uri2 = URIFactory(input);
            expect(uri2).to.be.ok;
            expect(uri2).to.equal(uri);

            done();
        });

    });


    describe("### Concept Schemes", () => {

        it("should generate URIs", (done) => {

            let input = {
                prefLabel: 'Test Scheme'
            };

            let uri = URIFactory(input);
            expect(uri).to.not.be.ok;       //missing 'type'

            input.type = ItemTypes.CONCEPT_SCHEME;
            uri = URIFactory(input);
            expect(uri).to.be.ok;
            expect(uri).to.contain(URI_BASE + 'metadata-codelists/');

            //verify case insensitivity and spaces don't matter
            input.prefLabel = input.prefLabel.toUpperCase().replace(/\s/g, '');
            let uri2 = URIFactory(input);
            expect(uri2).to.be.ok;
            expect(uri2).to.equal(uri);

            done();
        });

    });


    describe("### Topics", () => {

        it("should support Topics", (done) => {

            let input = {
                title: "Testing",
                createdBy: 'tester'
            };

            let uri = URIFactory(input);
            expect(uri).to.not.be.ok;       //missing 'type'

            input.type = ItemTypes.TOPIC;
            uri = URIFactory(input);
            expect(uri).to.be.ok;
            expect(uri).to.contain(URI_BASE + 'topic/');

            done();
        });

    });

    describe("### Applications", () => {

        it("should generate URIs", (done) => {

            let input = {
                title: "Testing",
                createdBy: 'tester'
            };

            let uri = URIFactory(input);
            expect(uri).to.not.be.ok;       //missing 'type'

            input.type = ItemTypes.APPLICATION;
            uri = URIFactory(input);
            expect(uri).to.be.ok;
            expect(uri).to.contain(URI_BASE + 'application/');

            done();
        });

    });


    describe("### WebSites", () => {

        it("should generate URIs", (done) => {

            let input = {
                title: "Testing",
                landingPage: 'http://www.google.com'
            };

            let uri = URIFactory(input);
            expect(uri).to.not.be.ok;       //missing 'type'

            input.type = ItemTypes.WEBSITE;
            uri = URIFactory(input);
            expect(uri).to.be.ok;
            expect(uri).to.contain(URI_BASE + 'website/');

            done();
        });
    });


});
