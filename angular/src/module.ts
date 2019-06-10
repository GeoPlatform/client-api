import {NgModule, ModuleWithProviders} from '@angular/core';
import { Injectable } from '@angular/core';

import { ItemService, GPHttpClient } from '@geoplatform/client';

import NG2HttpClient from './http/ng';



@Injectable()
export class NgItemService extends ItemService {
    constructor(url : string, client : GPHttpClient) {
        super(url, client);
    }
}



@NgModule({
    providers: [ NG2HttpClient, NgItemService ]
})
export class NgbModule {

}
