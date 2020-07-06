import {NgModule} from '@angular/core';
import {DialogFormComponent} from './dialog-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ControlModule} from '../controls/control.module';
import {CommonModule} from '@angular/common';
import {MatControlsModule} from '../material/mat-controls.module';

@NgModule({
  declarations: [
    DialogFormComponent
  ],
    imports: [
        MatDialogModule,
        ControlModule,
        CommonModule,
        MatControlsModule,
    ],
  exports: [DialogFormComponent]
})
export class DialogModule {
}
