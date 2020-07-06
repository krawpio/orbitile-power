import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DecimalPipe, formatDate} from '@angular/common';
import {Observable} from 'rxjs';
import {InfoField} from '../../../shared/info-page/info-field';
import {Alert} from '../../alerts/model/alert';
import {tap} from 'rxjs/operators';
import {OrderService} from '../service/order.service';
import {Order} from '../model/order';
import {AlertService} from '../../alerts/service/alert.service';
import {ControlBase} from '../../../shared/controls/control-base';
import {TextboxControl} from '../../../shared/controls/textbox/control-textbox';
import {DateControl} from '../../../shared/controls/date/control-date';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private alertService: AlertService,
    private decimalPipe: DecimalPipe
  ) {}

  order$: Observable<Order>;
  infoFields: ControlBase<any>[];
  allAlerts: Alert[];
  allAlerts$: Observable<Alert[]>;
  updateUrl: string;


  ngOnInit(): void {
    this.getOrder();
  }

  private getAllAlerts(order: Order) {
    this.allAlerts$ = this.alertService.getAlertsForOrder(order.id)
      .pipe(tap(result => this.allAlerts = result));
  }

  private getOrder(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.updateUrl = `/order/update/${id}`;
    this.order$ = this.orderService.getOrder(id).pipe(
      tap(order => {
        this.infoFields = this.buildFields(order);
        this.getAllAlerts(order);
      })
    );
  }

  private buildFields(order: Order): ControlBase<any>[] {
    const closedTime = order.closedTime.getTime() !== 0
      ? formatDate(order.closedTime, 'yyyy-MM-dd', 'pl')
      : '';


    return [
      new TextboxControl({
        label: 'DATA UTWORZENIA',
        value: formatDate(order.createdTime, 'yyyy-MM-dd', 'pl')
      }),
      new DateControl({
        label: 'DATA REALIZACJI WYCINKI',
        key: 'closedtime',
        value: closedTime,
      }),
      new TextboxControl({
        label: 'ŁĄCZNA POWIERZCHNIA ALARMÓW',
        value: this.decimalPipe.transform(order.area, '1.0-0') + ' m2'
      }),
      new TextboxControl({
        label: 'TWÓRCA ZLECENIA',
        value: order.owner,
        key: 'owner'
      })
    ];
  }

}
