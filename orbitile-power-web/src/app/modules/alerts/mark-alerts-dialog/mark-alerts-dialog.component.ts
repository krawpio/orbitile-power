import {Component, Inject, OnInit} from '@angular/core';
import {ControlBase} from '../../../shared/controls/control-base';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Alert} from '../model/alert';
import {DecimalPipe, formatDate} from '@angular/common';
import {SelectionDropdownControl} from '../../../shared/controls/selection-dropdown/control-selection-dropdown';
import {AlertService} from '../service/alert.service';
import {TextboxControl} from '../../../shared/controls/textbox/control-textbox';
import {DropdownControl} from '../../../shared/controls/dropdown/control-dropdown';
import {MarkAlertsData} from './mark-alerts-data';

@Component({
  selector: 'app-mark-alerts-dialog',
  templateUrl: './mark-alerts-dialog.component.html',
  styleUrls: ['./mark-alerts-dialog.component.css']
})
export class MarkAlertsDialogComponent implements OnInit {
  controls: ControlBase<any>[];
  descControl: TextboxControl;
  statusControl: DropdownControl;
  alertsControl: SelectionDropdownControl<number[]>;


  constructor(
    public dialogRef: MatDialogRef<MarkAlertsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MarkAlertsData,
    public decimalPipe: DecimalPipe,
    private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.setControls(this.data.alerts);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.alertService.markAlerts(
          this.descControl.value,
          this.statusControl.value,
          this.alertsControl.value
        ).subscribe(
          () => this.data.action.call(this)
        );
      }
    });
  }


  private setControls(data: Alert[]) {
    const alertOptions: { key: number, value: string }[] = data.map(alert =>
      ({key: alert.id, value: this.formatAlertValue(alert)})
    );

    this.alertsControl = new SelectionDropdownControl({
        key: 'alerts',
        label: 'Wybierz z listy alarmy, z których chcesz utworzyć zlecenie',
        placeholder: 'Alarmy',
        options: alertOptions,
        value: data.map(alert => alert.id),
        width: 400
      });

    this.descControl = new TextboxControl({
      key: 'description',
      label: 'Dodaj opis',
      width: 400
    });

    this.statusControl = new DropdownControl({
      key: 'status',
      label: 'Status alarmu',
      options: [
        {key: 'ACTIVE', value: 'AKTYWNY'},
        {key: 'INACTIVE', value: 'NIEAKTYWNY'}
      ],
      width: 400
    });

    this.controls = [this.descControl, this.statusControl, this.alertsControl];
  }

  private formatAlertValue(alert: Alert): string {
    const dateString = formatDate(alert.createdTime, 'yyyy-MM-dd', 'pl');
    const numberString = this.decimalPipe.transform(alert.area, '1.1-1');
    return `${dateString} / ${numberString}`;
  }
}
