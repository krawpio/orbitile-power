import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Alert} from '../model/alert';
import {ControlBase} from '../../../shared/controls/control-base';
import {SelectionDropdownControl} from '../../../shared/controls/selection-dropdown/control-selection-dropdown';
import {DecimalPipe, formatDate} from '@angular/common';
import {OrderService} from '../../orders/service/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.scss']
})
export class AddOrderDialogComponent implements OnInit {

  controls: ControlBase<any>[];
  alertsControl: SelectionDropdownControl<number[]>;


  constructor(
    public dialogRef: MatDialogRef<AddOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alert[],
    public decimalPipe: DecimalPipe,
    private orderService: OrderService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.controls = this.getControls(this.data);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.orderService.createOrder(result[0].value).subscribe(
          order => {
            this.router.navigate([`/order/${order.id}`]);
          }
        );
      }
    });
  }


  private getControls(data: Alert[]): ControlBase<any>[] {
    const alertOptions: { key: number, value: string }[] = data.map(alert =>
      ({key: alert.id, value: this.formatAlertValue(alert)})
    );
    this.alertsControl = new SelectionDropdownControl({
      key: 'alerts',
      label: 'Wybierz z listy alarmy, z których chcesz utworzyć zlecenie',
      placeholder: 'Alarmy',
      options: alertOptions,
      value: data.map(alert => alert.id),
      order: 1,
      width: 400
    });
    return [this.alertsControl];
  }

  private formatAlertValue(alert: Alert): string {
    const dateString = formatDate(alert.createdTime, 'yyyy-MM-dd', 'pl');
    const numberString = this.decimalPipe.transform(alert.area, '1.1-1');
    return `${dateString} / ${numberString}`;
  }
}
