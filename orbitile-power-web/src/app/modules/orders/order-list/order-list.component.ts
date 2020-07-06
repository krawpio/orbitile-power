import {Component, OnInit, ViewChild} from '@angular/core';
import {ControlBase} from '../../../shared/controls/control-base';
import {ActionButton} from '../../../shared/search/actions/action-button';
import {DropdownControl} from '../../../shared/controls/dropdown/control-dropdown';
import {TextboxControl} from '../../../shared/controls/textbox/control-textbox';
import {SliderControl} from '../../../shared/controls/slider/control-slider';
import {Order} from '../model/order';
import {DateRangeControl} from '../../../shared/controls/daterange/control-daterange';
import {OrderService} from '../service/order.service';
import {SearchComponent} from '../../../shared/search/search.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  dataUrl = '/order/search';
  modelType = Order;
  title = 'Zlecenia';
  filters: ControlBase<any>[];
  actions: ActionButton<Order>[];
  filtersStyle = 'grid-column3';

  @ViewChild(SearchComponent, {static: true}) search: SearchComponent<Order>;


  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.filters = this.getFilters();
    this.actions = this.getActions();
  }


  private getFilters(): ControlBase<any>[] {
    return [

      new TextboxControl({
        key: 'nr',
        label: 'Numer zlecenia',
        placeholder: 'Wybierz numer',
        order: 1,
        width: 350
      }),

      new DropdownControl({
        key: 'status',
        label: 'Status zlecenia',
        options: [
          {key: 'NEW',  value: 'Nowe'},
          {key: 'ORDERED',   value: 'Zlecone'},
          {key: 'PROGRESS',  value: 'W trakcie'},
          {key: 'CLOSED',   value: 'Zamknięte'}
        ],
        order: 2,
        width: 300
      }),

      new DateRangeControl({
        key: 'createdTime',
        label: 'Data utworzenia zlecenia',
        order: 3,
        width: 500
      }),


      new TextboxControl({
        key: 'region',
        label: 'Obszar',
        placeholder: 'Wybierz województwo, powiat, gminę lub obszar',
        type: 'text',
        order: 4,
        width: 350
      }),

      new DropdownControl({
        key: 'owner',
        label: 'Twórca zlecenia',
        options: [
          {key: 'user1',  value: 'Jan Kowalski'}
        ],
        order: 5,
        width: 300
      }),

      new DateRangeControl({
        key: 'closedTime',
        label: 'Data realizacji wycinki',
        order: 6,
        width: 500
      }),

      new DropdownControl({
        key: 'verification',
        label: 'Status weryfikacji',
        options: [
          {key: 'CHECKED',  value: 'Zgodne z deklaracją'},
          {key: 'CONTROL',   value: 'Do kontroli'}
        ],
        order: 7,
        width: 350
      }),

      new SliderControl({
        key: 'area',
        label: 'Wielkość powierzchni w m2',
        order: 8,
        width: 300,
        toRange: 100000
      }),
      new DropdownControl({
        key: 'code',
        label: 'Nazwa linii',
        options: [
          {key: 'SIT-WOR', value: 'Sitnicka'},
          {key: 'LUB-KOC', value: 'Kock'},
          {key: 'RAD-BRZ', value: 'Radomsko'}
        ],
        order: 9,
        width: 500
      }),
    ];
  }

  private getActions(): ActionButton<Order>[] {
    return [
      new ActionButton({
        label: 'Usuń',
        buttonType: 'stroked',
        icon: 'delete_outline',
        action: (orders: Order[]) => this.deleteOrders(orders)
      }),
      new ActionButton({
        label: 'Zamknij zlecenia',
        buttonType: 'stroked',
        icon: 'check',
        action: (orders: Order[]) => this.closeOrders(orders)
      }),
      new ActionButton({
        label: 'Eksportuj',
        buttonType: 'flat',
        icon: 'save_alt',
        action: (orders: Order[]) => this.exportToExcel(orders)
      }),
    ];
  }

  private exportToExcel(orders: Order[]): void {
    this.orderService.export(orders.map(a => a.id));
  }

  private deleteOrders(orders: Order[]): void {
    this.orderService.delete(orders.map(a => a.id)).subscribe(
      () => this.search.search()
    );
  }

  private closeOrders(orders: Order[]): void {
    this.orderService.close(orders.map(a => a.id)).subscribe(
      () => this.search.search()
    );
  }
}
