
import Polyfills from "./shared/polyfills";

import JQueryHttpClient from './http/jq';
import NGHttpClient from './http/ng';
import NodeHttpClient from './http/node';
import { ItemTypes, ItemTypeLabels } from './shared/types';
import ItemService from './services/item';
import DatasetService from './services/dataset';
import MapService from './services/map';
import LayerService from './services/layer';
import ServiceService from './services/service';
import GalleryService from './services/gallery';
import UtilsService from './services/utils';
import { AgolService, AgolQuery } from './services/agol';

import ItemServiceProxy from './services/proxies/item';
import ServiceServiceProxy from './services/proxies/service';
import LayerServiceProxy from './services/proxies/layer';
import DatasetServiceProxy from './services/proxies/dataset';
import MapServiceProxy from './services/proxies/map';
import GalleryServiceProxy from './services/proxies/gallery';
import UtilsServiceProxy from './services/proxies/utils';
import AgolServiceProxy from './services/proxies/agol';

import KGQuery from './shared/kg-query';
import KGService from './services/kg';
import KGClassifiers from './shared/classifiers';

import QueryParameters from './shared/parameters';
import {
    Query,
    Fields as QueryFields,
    Facets as QueryFacets
} from './shared/query';
import QueryFactory    from './shared/query-factory';
import ServiceFactory  from './services/factory';

import Config from './shared/config';

import {
    TrackingEvent,
    TrackingService,
    TrackingCategories,
    TrackingTypes,
    TrackingEventFactory
} from './services/tracking';



export {

    ItemTypes,
    ItemTypeLabels,
    QueryParameters,
    QueryFacets,
    Query,
    QueryFactory,
    QueryFields,
    KGQuery,
    KGClassifiers,

    JQueryHttpClient,
    NGHttpClient,
    NodeHttpClient,

    ItemService,
    LayerService,
    ServiceService,
    GalleryService,
    DatasetService,
    MapService,
    UtilsService,
    AgolService,
    AgolQuery,
    KGService,
    ServiceFactory,

    ItemServiceProxy,
    ServiceServiceProxy,
    LayerServiceProxy,
    DatasetServiceProxy,
    MapServiceProxy,
    GalleryServiceProxy,
    UtilsServiceProxy,
    AgolServiceProxy,

    Config,

    TrackingEvent,
    TrackingService,
    TrackingCategories,
    TrackingTypes,
    TrackingEventFactory
};
