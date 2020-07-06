import {NgModule} from '@angular/core';
import {InfoWithMapComponent} from './info-with-map/info-with-map.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {InfoDetailsComponent} from './info-details/info-details.component';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MapModule} from '../map/map.module';
import {InfoGeneralContentComponent} from './info-general-content/info-general-content.component';
import { InfoActionsComponent } from './info-actions/info-actions.component';
import {MatControlsModule} from "../material/mat-controls.module";
import {ControlModule} from "../controls/control.module";


@NgModule({
  declarations: [
    InfoWithMapComponent,
    InfoDetailsComponent,
    InfoGeneralContentComponent,
    InfoActionsComponent
  ],
  imports: [
    MatSidenavModule,
    MatIconModule,
    CommonModule,
    MapModule,
    MatControlsModule,
    ControlModule
  ],
    exports: [
        InfoWithMapComponent,
        InfoDetailsComponent,
        InfoGeneralContentComponent,
        InfoActionsComponent
    ],
})
export class InfoPageModule {
}
