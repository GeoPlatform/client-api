

import GPError from './error';
import { ItemTypes, ItemTypeLabels } from './types';
import URIFactory from './uri-factory';
import KGQuery from './kg-query';
import KGClassifiers from './classifiers';
import QueryParameters from './parameters';
import {
    Query,
    Fields as QueryFields,
    Facets as QueryFacets
} from './query';
import QueryFactory    from './query-factory';
import Config from './config';

import {
    Item, Asset, Dataset, Service, Layer, Map, Gallery,
    Application, Topic, WebSite,
    Organization, Contact, ConceptScheme,
    SearchResults, ServiceTypeStandard, Association
} from "./models";


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
    URIFactory,

    //model interfaces
    Item, Asset, Dataset, Service, Layer, Map, Gallery,
    Application, Topic, WebSite,
    Organization, Contact, ConceptScheme,
    SearchResults, ServiceTypeStandard, Association,

    Config

};
