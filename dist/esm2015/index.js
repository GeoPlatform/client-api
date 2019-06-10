/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import Polyfills from "./shared/polyfills";
Polyfills();
import GPError from './shared/error';
import { ItemTypes, ItemTypeLabels } from './shared/types';
import URIFactory from './shared/uri-factory';
import KGQuery from './shared/kg-query';
import KGClassifiers from './shared/classifiers';
import QueryParameters from './shared/parameters';
import { Query, Fields as QueryFields, Facets as QueryFacets } from './shared/query';
import QueryFactory from './shared/query-factory';
import Config from './shared/config';
import GPHttpClient from './http/client';
import XHRHttpClient from './http/xhr';
import ItemService from './services/item';
import DatasetService from './services/dataset';
import MapService from './services/map';
import LayerService from './services/layer';
import ServiceService from './services/service';
import GalleryService from './services/gallery';
import UtilsService from './services/utils';
import { AgolService, AgolQuery } from './services/agol';
import { TrackingEvent, TrackingService, TrackingCategories, TrackingTypes, TrackingEventFactory } from './services/tracking';
import KGService from './services/kg';
import ServiceFactory from './services/factory';
export { 
//shared classes
GPError, ItemTypes, ItemTypeLabels, QueryParameters, QueryFacets, Query, QueryFactory, QueryFields, KGQuery, KGClassifiers, AgolQuery, URIFactory, Config, GPHttpClient, XHRHttpClient, ItemService, DatasetService, MapService, LayerService, ServiceService, GalleryService, UtilsService, KGService, ServiceFactory, AgolService, TrackingEvent, TrackingService, TrackingCategories, TrackingTypes, TrackingEventFactory };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLG9CQUFvQixDQUFDO0FBQzNDLFNBQVMsRUFBRSxDQUFDO0FBRVosT0FBTyxPQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLFVBQVUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUN4QyxPQUFPLGFBQWEsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLGVBQWUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQ0gsS0FBSyxFQUNMLE1BQU0sSUFBSSxXQUFXLEVBQ3JCLE1BQU0sSUFBSSxXQUFXLEVBQ3hCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxZQUFZLE1BQVMsd0JBQXdCLENBQUM7QUFDckQsT0FBTyxNQUFNLE1BQU0saUJBQWlCLENBQUM7QUFRckMsT0FBTyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sYUFBYSxNQUFNLFlBQVksQ0FBQztBQUd2QyxPQUFPLFdBQVcsTUFBTSxpQkFBaUIsQ0FBQztBQUMxQyxPQUFPLGNBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLFVBQVUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUM1QyxPQUFPLGNBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLGNBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpELE9BQU8sRUFDSCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixhQUFhLEVBQ2Isb0JBQW9CLEVBQ3ZCLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxTQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLE9BQU8sY0FBYyxNQUFPLG9CQUFvQixDQUFDO0FBS2pELE9BQU87QUFFSCxnQkFBZ0I7QUFDaEIsT0FBTyxFQUNQLFNBQVMsRUFDVCxjQUFjLEVBQ2QsZUFBZSxFQUNmLFdBQVcsRUFDWCxLQUFLLEVBQ0wsWUFBWSxFQUNaLFdBQVcsRUFDWCxPQUFPLEVBQ1AsYUFBYSxFQUNiLFNBQVMsRUFDVCxVQUFVLEVBT1YsTUFBTSxFQUVOLFlBQVksRUFDWixhQUFhLEVBR2IsV0FBVyxFQUNYLGNBQWMsRUFDZCxVQUFVLEVBQ1YsWUFBWSxFQUNaLGNBQWMsRUFDZCxjQUFjLEVBQ2QsWUFBWSxFQUNaLFNBQVMsRUFDVCxjQUFjLEVBQ2QsV0FBVyxFQUdYLGFBQWEsRUFDYixlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLGFBQWEsRUFDYixvQkFBb0IsRUFFdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb2x5ZmlsbHMgZnJvbSBcIi4vc2hhcmVkL3BvbHlmaWxsc1wiO1xuUG9seWZpbGxzKCk7XG5cbmltcG9ydCBHUEVycm9yIGZyb20gJy4vc2hhcmVkL2Vycm9yJztcbmltcG9ydCB7IEl0ZW1UeXBlcywgSXRlbVR5cGVMYWJlbHMgfSBmcm9tICcuL3NoYXJlZC90eXBlcyc7XG5pbXBvcnQgVVJJRmFjdG9yeSBmcm9tICcuL3NoYXJlZC91cmktZmFjdG9yeSc7XG5pbXBvcnQgS0dRdWVyeSBmcm9tICcuL3NoYXJlZC9rZy1xdWVyeSc7XG5pbXBvcnQgS0dDbGFzc2lmaWVycyBmcm9tICcuL3NoYXJlZC9jbGFzc2lmaWVycyc7XG5pbXBvcnQgUXVlcnlQYXJhbWV0ZXJzIGZyb20gJy4vc2hhcmVkL3BhcmFtZXRlcnMnO1xuaW1wb3J0IHtcbiAgICBRdWVyeSxcbiAgICBGaWVsZHMgYXMgUXVlcnlGaWVsZHMsXG4gICAgRmFjZXRzIGFzIFF1ZXJ5RmFjZXRzXG59IGZyb20gJy4vc2hhcmVkL3F1ZXJ5JztcbmltcG9ydCBRdWVyeUZhY3RvcnkgICAgZnJvbSAnLi9zaGFyZWQvcXVlcnktZmFjdG9yeSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vc2hhcmVkL2NvbmZpZyc7XG5cbmltcG9ydCB7XG4gICAgSXRlbSwgQXNzZXQsIERhdGFzZXQsIFNlcnZpY2UsIExheWVyLCBNYXAsIEdhbGxlcnksXG4gICAgQXBwbGljYXRpb24sIFRvcGljLCBXZWJTaXRlLFxuICAgIE9yZ2FuaXphdGlvbiwgQ29udGFjdCwgQ29uY2VwdFNjaGVtZSwgU2VhcmNoUmVzdWx0cywgU2VydmljZVR5cGVTdGFuZGFyZFxufSBmcm9tIFwiLi9zaGFyZWQvbW9kZWxzXCI7XG5cbmltcG9ydCBHUEh0dHBDbGllbnQgZnJvbSAnLi9odHRwL2NsaWVudCc7XG4vLyBpbXBvcnQgSlF1ZXJ5SHR0cENsaWVudCBmcm9tICcuL2h0dHAvanEnO1xuaW1wb3J0IFhIUkh0dHBDbGllbnQgZnJvbSAnLi9odHRwL3hocic7XG5cblxuaW1wb3J0IEl0ZW1TZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvaXRlbSc7XG5pbXBvcnQgRGF0YXNldFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9kYXRhc2V0JztcbmltcG9ydCBNYXBTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvbWFwJztcbmltcG9ydCBMYXllclNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9sYXllcic7XG5pbXBvcnQgU2VydmljZVNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9zZXJ2aWNlJztcbmltcG9ydCBHYWxsZXJ5U2VydmljZSBmcm9tICcuL3NlcnZpY2VzL2dhbGxlcnknO1xuaW1wb3J0IFV0aWxzU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL3V0aWxzJztcbmltcG9ydCB7IEFnb2xTZXJ2aWNlLCBBZ29sUXVlcnkgfSBmcm9tICcuL3NlcnZpY2VzL2Fnb2wnO1xuXG5pbXBvcnQge1xuICAgIFRyYWNraW5nRXZlbnQsXG4gICAgVHJhY2tpbmdTZXJ2aWNlLFxuICAgIFRyYWNraW5nQ2F0ZWdvcmllcyxcbiAgICBUcmFja2luZ1R5cGVzLFxuICAgIFRyYWNraW5nRXZlbnRGYWN0b3J5XG59IGZyb20gJy4vc2VydmljZXMvdHJhY2tpbmcnO1xuXG5pbXBvcnQgS0dTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMva2cnO1xuaW1wb3J0IFNlcnZpY2VGYWN0b3J5ICBmcm9tICcuL3NlcnZpY2VzL2ZhY3RvcnknO1xuXG5cblxuXG5leHBvcnQge1xuXG4gICAgLy9zaGFyZWQgY2xhc3Nlc1xuICAgIEdQRXJyb3IsXG4gICAgSXRlbVR5cGVzLFxuICAgIEl0ZW1UeXBlTGFiZWxzLFxuICAgIFF1ZXJ5UGFyYW1ldGVycyxcbiAgICBRdWVyeUZhY2V0cyxcbiAgICBRdWVyeSxcbiAgICBRdWVyeUZhY3RvcnksXG4gICAgUXVlcnlGaWVsZHMsXG4gICAgS0dRdWVyeSxcbiAgICBLR0NsYXNzaWZpZXJzLFxuICAgIEFnb2xRdWVyeSxcbiAgICBVUklGYWN0b3J5LFxuXG4gICAgLy9tb2RlbCBpbnRlcmZhY2VzXG4gICAgSXRlbSwgQXNzZXQsIERhdGFzZXQsIFNlcnZpY2UsIExheWVyLCBNYXAsIEdhbGxlcnksXG4gICAgQXBwbGljYXRpb24sIFRvcGljLCBXZWJTaXRlLFxuICAgIE9yZ2FuaXphdGlvbiwgQ29udGFjdCwgQ29uY2VwdFNjaGVtZSwgU2VhcmNoUmVzdWx0cywgU2VydmljZVR5cGVTdGFuZGFyZCxcblxuICAgIENvbmZpZyxcblxuICAgIEdQSHR0cENsaWVudCxcbiAgICBYSFJIdHRwQ2xpZW50LFxuXG5cbiAgICBJdGVtU2VydmljZSxcbiAgICBEYXRhc2V0U2VydmljZSxcbiAgICBNYXBTZXJ2aWNlLFxuICAgIExheWVyU2VydmljZSxcbiAgICBTZXJ2aWNlU2VydmljZSxcbiAgICBHYWxsZXJ5U2VydmljZSxcbiAgICBVdGlsc1NlcnZpY2UsXG4gICAgS0dTZXJ2aWNlLFxuICAgIFNlcnZpY2VGYWN0b3J5LFxuICAgIEFnb2xTZXJ2aWNlLFxuXG5cbiAgICBUcmFja2luZ0V2ZW50LFxuICAgIFRyYWNraW5nU2VydmljZSxcbiAgICBUcmFja2luZ0NhdGVnb3JpZXMsXG4gICAgVHJhY2tpbmdUeXBlcyxcbiAgICBUcmFja2luZ0V2ZW50RmFjdG9yeVxuXG59O1xuIl19