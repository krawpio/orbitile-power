import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ChartModule} from '../../shared/chart/chart.module';
import {SearchModule} from '../../shared/search/search.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartModule,
    SearchModule
  ]
})
export class DashboardModule { }
