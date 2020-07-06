import {Component, OnInit} from '@angular/core';
import {ControlBase} from '../../../shared/controls/control-base';
import {Alert} from '../model/alert';
import {DropdownControl} from '../../../shared/controls/dropdown/control-dropdown';
import {DateRangeControl} from '../../../shared/controls/daterange/control-daterange';
import {SliderControl} from '../../../shared/controls/slider/control-slider';
import {TextboxControl} from '../../../shared/controls/textbox/control-textbox';
import {FilterBase} from '../../../shared/search/filters/filter-base';
import {ActionButton} from '../../../shared/search/actions/action-button';
import {AddOrderDialogComponent} from '../add-order-dialog/add-order-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {OrderService} from '../../orders/service/order.service';
import {Router} from '@angular/router';
import {AlertService} from '../service/alert.service';
import {MessageService} from '../../../core/messages/message.service';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css']
})
export class AlertListComponent implements OnInit {

  dataUrl = '/alert/search';
  modelType = Alert;
  title = 'Alarmy';
  filters: FilterBase[];
  extendedFilters: ControlBase<any>[];
  actions: ActionButton<Alert>[];
  filtersStyle = 'grid-column2';
  alertsSelected: Alert[] = [];

  constructor(
    private dialog: MatDialog,
    private orderService: OrderService,
    private alertService: AlertService,
    private router: Router,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.filters = this.getFilters();
    this.extendedFilters = this.getExpandedFilters();
    this.actions = this.getActions();

  }

  itemsSelected(alerts: Alert[]) {
    this.alertsSelected = alerts;
  }


  private getFilters(): FilterBase[] {
    return [
      new FilterBase({
        key: 'status',
        value: 'UNORDERED',
        title: 'NIEZLECONE'
      }),
      new FilterBase({
        key: 'status',
        value: 'ORDERED',
        title: 'ZLECONE'
      })
    ];
  }

  private getExpandedFilters(): ControlBase<any>[] {
    return [
      new DateRangeControl({
        key: 'createdTime',
        label: 'Data utworzenia alarmu',
        order: 1,
        width: 520
      }),

      new DropdownControl({
        key: 'code',
        label: 'Nazwa linii',
        options: [
          {key: 'SIT-WOR', value: 'Sitnicka'},
          {key: 'LUB-KOC', value: 'Kock'},
          {key: 'RAD-BRZ', value: 'Radomsko'}
        ],
        order: 2,
        width: 250
      }),

      new SliderControl({
        key: 'area',
        label: 'Wielkość powierzchni w m2',
        order: 3,
        width: 510,
        toRange: 2300
      }),

      new DropdownControl({
        key: 'status',
        label: 'Status zlecenia',
        options: [
          {key: 'ORDERED', value: 'Zlecone'},
          {key: 'UNORDERED', value: 'Niezlecone'}
        ],
        order: 4,
        width: 250
      }),

      new TextboxControl({
        key: 'region',
        label: 'Obszar',
        placeholder: 'Wybierz województwo, powiat, gminę lub obszar',
        type: 'text',
        order: 5,
        width: 520
      }),

      new DropdownControl({
        key: 'voltage',
        label: 'Napięcie linii',
        options: [
          {key: 'HIGH', value: 'WN'},
          {key: 'MEDIUM', value: 'SN'}
        ],
        order: 6,
        width: 250
      }),
    ];
  }


  private getActions(): ActionButton<Alert>[] {
    return [
      new ActionButton({
        label: 'Eksportuj',
        icon: 'save_alt',
        action: (alerts: Alert[]) => this.exportToExcel(alerts)
      }),
      new ActionButton({
        label: 'Utwórz zlecenie',
        buttonType: 'flat',
        action: (alerts: Alert[]) => this.openAddOrderDialog(alerts)
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

  private exportToExcel(alerts: Alert[]): void {
    this.alertService.export(alerts.map(a => a.id));
    this.messageService.sendInfo(`Alarmy (${alerts.length}) zostały wyeksportowane`);
  }
}
