import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertRoutingModule } from './alert-routing.module';
import { AlertListComponent } from './alert-list/alert-list.component';
import {InfoPageModule} from '../../shared/info-page/info-page.module';
import {SearchModule} from '../../shared/search/search.module';
import {MapModule} from '../../shared/map/map.module';
import { AddOrderDialogComponent } from './add-order-dialog/add-order-dialog.component';
import {MatControlsModule} from '../../shared/material/mat-controls.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { MarkAlertsDialogComponent } from './mark-alerts-dialog/mark-alerts-dialog.component';
import {DialogModule} from '../../shared/dialog-form/dialog.module';


@NgModule({
  declarations: [AlertListComponent, AddOrderDialogComponent, MarkAlertsDialogComponent],
    imports: [
        CommonModule,
        AlertRoutingModule,
        InfoPageModule,
        SearchModule,
        MapModule,
        MatControlsModule,
        ReactiveFormsModule,
        MatDialogModule,
        DialogModule
    ]
})
export class AlertModule { }
