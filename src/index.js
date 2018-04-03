
import HttpClientBase from './http/client';
import JQueryHttpClient from './http/jq';
import NGHttpClient from './http/ng';
import NodeHttpClient from './http/node';
import ItemTypes from './shared/types';
import ItemService from './services/item';
import DatasetService from './services/dataset';
import MapService from './services/map';
import LayerService from './services/layer';
import ServiceService from './services/service';
import GalleryService from './services/gallery';
import CommunityService from './services/community';
import UtilsService from './services/utils';

import KGQuery from './shared/kg-query';
import KGService from './services/kg';
import KGClassifiers from './shared/classifiers';

import QueryParameters from './shared/parameters';
import QueryFacets     from './shared/facets';
import Query           from './shared/query';
import QueryFactory    from './shared/query-factory';
import ServiceFactory  from './services/factory';

import { ItemProperties, PropertiesFor } from './models/properties';
import ItemFactory from './models/factory';
import BaseModel from './models/base';
import DatasetModel from './models/dataset';
import MapModel from './models/map';
import LayerModel from './models/layer';
import ServiceModel from './models/service';
import GalleryModel from './models/gallery';
import CommunityModel from './models/community';
import ContactModel from './models/contact';
import OrganizationModel from './models/organization';
import SearchResults from './models/search-results';

import Config from './shared/config';

export {

    //shared
    ItemTypes,
    QueryParameters,
    QueryFacets,
    Query,
    QueryFactory,
    KGQuery,
    KGClassifiers,

    //http
    HttpClientBase,
    JQueryHttpClient,
    NGHttpClient,
    NodeHttpClient,

    //services
    ItemService,
    LayerService,
    ServiceService,
    GalleryService,
    CommunityService,
    DatasetService,
    MapService,
    UtilsService,
    KGService,
    ServiceFactory,

    //models
    ItemProperties,
    PropertiesFor,
    ItemFactory,
    BaseModel,
    DatasetModel,
    MapModel,
    LayerModel,
    ServiceModel,
    GalleryModel,
    CommunityModel,
    ContactModel,
    OrganizationModel,

    SearchResults,
    
    Config
};
