import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PowerlineRoutingModule} from './powerline-routing.module';
import {PowerlineListComponent} from './powerline-list/powerline-list.component';
import {PowerlineDetailsComponent} from './powerline-details/powerline-details.component';
import {SearchModule} from '../../shared/search/search.module';
import {MapModule} from '../../shared/map/map.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {InfoPageModule} from '../../shared/info-page/info-page.module';

@NgModule({
  declarations: [PowerlineListComponent, PowerlineDetailsComponent],
  imports: [
    CommonModule,
    PowerlineRoutingModule,
    SearchModule,
    MapModule,
    MatSidenavModule,
    InfoPageModule
  ]
})
export class PowerlineModule {
}
