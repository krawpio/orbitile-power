import {NgModule} from '@angular/core';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {OrderRoutingModule} from './order-routing.module';
import {SearchModule} from '../../shared/search/search.module';
import {InfoPageModule} from "../../shared/info-page/info-page.module";
import {CommonModule} from "@angular/common";
import {MapModule} from "../../shared/map/map.module";


@NgModule({
  declarations: [OrderListComponent, OrderDetailsComponent],
  imports: [OrderRoutingModule, SearchModule, InfoPageModule, CommonModule, MapModule]
})
export class OrderModule { }
