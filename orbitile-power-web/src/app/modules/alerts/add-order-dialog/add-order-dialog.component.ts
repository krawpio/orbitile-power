import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Alert} from '../model/alert';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.scss']
})
export class AddOrderDialogComponent {

  alertForm = new FormControl();
  alerts: Alert[];

  constructor(
    public dialogRef: MatDialogRef<AddOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alert[]) {
    this.alerts = data;
    this.alertForm.setValue(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  getSelectedAlerts() {
    return this.alertForm.value;
  }

}
