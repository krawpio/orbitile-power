import {NgModule} from '@angular/core';
import { MapComponent } from './map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { MapPopupComponent } from './map-popup/map-popup.component';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [MapComponent, MapPopupComponent],
  imports: [
    LeafletModule,
    CommonModule
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule {
}
