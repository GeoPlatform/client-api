import Polyfills from "./shared/polyfills";
Polyfills();

import GPError from './shared/error';
import { ItemTypes, ItemTypeLabels } from './shared/types';
import URIFactory from './shared/uri-factory';
import KGQuery from './shared/kg-query';
import KGClassifiers from './shared/classifiers';
import QueryParameters from './shared/parameters';
import {
    Query,
    Fields as QueryFields,
    Facets as QueryFacets
} from './shared/query';
import QueryFactory    from './shared/query-factory';
import Config from './shared/config';

import {
    Item, Asset, Dataset, Service, Layer, Map, Gallery,
    Application, Topic, WebSite,
    Organization, Contact, ConceptScheme, SearchResults, ServiceTypeStandard
} from "./shared/models";

import GPHttpClient from './http/client';
// import JQueryHttpClient from './http/jq';
import XHRHttpClient from './http/xhr';


import ItemService from './services/item';
import DatasetService from './services/dataset';
import MapService from './services/map';
import LayerService from './services/layer';
import ServiceService from './services/service';
import GalleryService from './services/gallery';
import UtilsService from './services/utils';
import { AgolService, AgolQuery } from './services/agol';

import {
    TrackingEvent,
    TrackingService,
    TrackingCategories,
    TrackingTypes,
    TrackingEventFactory
} from './services/tracking';

import KGService from './services/kg';
import ServiceFactory  from './services/factory';




export {

    //shared classes
    GPError,
    ItemTypes,
    ItemTypeLabels,
    QueryParameters,
    QueryFacets,
    Query,
    QueryFactory,
    QueryFields,
    KGQuery,
    KGClassifiers,
    AgolQuery,
    URIFactory,

    //model interfaces
    Item, Asset, Dataset, Service, Layer, Map, Gallery,
    Application, Topic, WebSite,
    Organization, Contact, ConceptScheme, SearchResults, ServiceTypeStandard,

    Config,

    GPHttpClient,
    XHRHttpClient,


    ItemService,
    DatasetService,
    MapService,
    LayerService,
    ServiceService,
    GalleryService,
    UtilsService,
    KGService,
    ServiceFactory,
    AgolService,


    TrackingEvent,
    TrackingService,
    TrackingCategories,
    TrackingTypes,
    TrackingEventFactory

};
