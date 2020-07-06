import {ControlComponent} from './control/control.component';
import {NgModule} from '@angular/core';
import {DateComponent} from './date/date.component';
import {DropdownComponent} from './dropdown/dropdown.component';
import {TextboxComponent} from './textbox/textbox.component';
import {SliderComponent} from './slider/slider.component';
import {DaterangeComponent} from './daterange/daterange.component';
import {CommonModule} from "@angular/common";
import {MatControlsModule} from "../material/mat-controls.module";


@NgModule({
  declarations: [
    ControlComponent,
    DateComponent,
    DropdownComponent,
    TextboxComponent,
    SliderComponent,
    DaterangeComponent,
  ],
  imports: [
    CommonModule,
    MatControlsModule
  ],
  exports: [ControlComponent
  ]
})
export class ControlModule {
}
