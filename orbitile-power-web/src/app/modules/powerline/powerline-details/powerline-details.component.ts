import {Component, OnInit} from '@angular/core';
import {PowerlineService} from '../service/powerline.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Powerline} from '../model/powerline';
import {Observable} from 'rxjs';
import {tableSymbol} from '../../../shared/search/grid-table/decorators/column';
import {ColumnModel} from '../../../shared/search/grid-table/decorators/column.model';
import {tap} from 'rxjs/operators';
import {Alert} from '../../alerts/model/alert';
import {DecimalPipe, formatDate} from '@angular/common';
import {ActionButton} from '../../../shared/search/actions/action-button';
import {AddOrderDialogComponent} from '../../alerts/add-order-dialog/add-order-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {OrderService} from '../../orders/service/order.service';
import {AlertService} from '../../alerts/service/alert.service';
import {Order} from '../../orders/model/order';
import {ControlBase} from '../../../shared/controls/control-base';
import {TextboxControl} from '../../../shared/controls/textbox/control-textbox';

@Component({
  selector: 'app-line-details',
  templateUrl: './powerline-details.component.html',
  styleUrls: ['./powerline-details.component.scss']
})
export class PowerlineDetailsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private powerLineService: PowerlineService,
    private orderService: OrderService,
    private alertService: AlertService,
    private decimalPipe: DecimalPipe,
    private router: Router
  ) {
  }

  powerline$: Observable<Powerline>;
  allOrders$: Observable<Order[]>;
  infoFields: ControlBase<any>[];
  allAlerts: Alert[];
  alertsSelected: Alert[] = [];
  actions: ActionButton<Powerline>[];


  ngOnInit(): void {
    this.getPowerLine();
    this.actions = this.getActions();
  }

  setAlerts(alerts: Alert[]) {
    this.alertsSelected = alerts;
  }

  private getAllAlerts(powerline: Powerline) {
    this.alertService.getAlertsForPowerLine(powerline.code)
      .subscribe(result => this.allAlerts = result);
  }

  private getAllOrders(powerline: Powerline) {
    this.allOrders$ = this.orderService.getOrdersForPowerLine(powerline.id);
  }


  private getPowerLine(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.powerline$ = this.powerLineService.getPowerLine(id).pipe(
      tap(pow => {
        this.infoFields = this.buildFields(pow);
        this.getAllAlerts(pow);
        this.getAllOrders(pow);
      })
    );
  }

  private buildFields(powerline: Powerline): ControlBase<any>[] {
    const columns: ColumnModel[] = powerline[tableSymbol].columns;
    return [
      new TextboxControl({
        label: 'NAPIĘCIE',
        value: columns.find(c => c.key === 'voltage').dict[powerline.voltage]
      }),
      new TextboxControl({
        label: 'DŁUGOŚĆ',
        value: this.decimalPipe.transform(powerline.length, '1.0-1') + ' km'
      }),
      new TextboxControl({
        label: 'ŁĄCZNA POWIERZCHNIA ALARMÓW',
        value: this.decimalPipe.transform(powerline.alertArea, '1.0-0') + ' m2'
      }),
      new TextboxControl({
        label: 'PROCENT ZALESIENIA BUFORA',
        value: this.decimalPipe.transform(powerline.treePercentage, '1.0-2') + '%'
      }),
      new TextboxControl({label: 'WOJEWÓDZTWO', value: powerline.province}),
      new TextboxControl({label: 'POWIAT', value: powerline.county}),
      new TextboxControl({
        label: 'DATA OSTATNIEJ WYCINKI',
        value: formatDate(powerline.lastCutTime, 'yyyy-MM-dd', 'pl')
      })
    ];
  }


  private getActions(): ActionButton<Powerline>[] {
    return [
      new ActionButton({
        label: 'Utwórz zlecenie z alarmów',
        buttonType: 'flat',
        action: () => this.openAddOrderDialog(this.allAlerts)
      }),
    ];
  }

  private openAddOrderDialog(alerts: Alert[]): void {
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      width: '544px',
      data: alerts
    });

    dialogRef.afterClosed().subscribe(result => {
      this.orderService.createOrder(result).subscribe(
        order => {
          this.router.navigate([`/order/${order.id}`]);
        }
      );
    });
  }
}
