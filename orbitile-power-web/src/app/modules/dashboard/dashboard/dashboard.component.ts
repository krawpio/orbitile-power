import {Component, OnInit} from '@angular/core';
import {FilterTabGroup} from '../../../shared/search/filters/filter-tab-group';
import {Alert} from '../../alerts/model/alert';
import {FilterTab} from '../../../shared/search/filters/filter-tab';
import {Order} from '../../orders/model/order';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  powerlineChartLabels: string[] = ['WN', 'SN', 'NISKIE'];
  powerlineChartData = [
    {
      data: [27, 81, 0],
      barThickness: 23
    }
  ];
  powerlineChartColors = [{backgroundColor: '#43CD82'}];

  alertChartLabels: string[] = ['2016', '2017', '2018', '2019', '2020'];
  alertChartData = [
    {
      data: [1156, 6452, 20567, 10540, 32252]
    }
  ];
  alertChartColors = [
    {
      borderColor: '#FDBD00',
      backgroundColor: 'rgba(253, 189, 0, 0.2)',
    },
  ];

  tabFilters: FilterTabGroup<any>[];

  constructor() {
  }

  ngOnInit(): void {
    this.tabFilters = [
      new FilterTabGroup<Alert>({
        modelType: Alert,
        title: 'Alarmy',
        filters: [
          new FilterTab({
            title: 'Bez Zlecenia',
            url: '/alert/search',
            value: 'UNORDERED',
            key: 'status'
          })
        ]
      }),
      new FilterTabGroup<Order>({
        modelType: Order,
        title: 'Zlecenia',
        filters: [
          new FilterTab({
            title: 'Nowe',
            url: '/order/search',
            value: 'NEW',
            key: 'status'
          }),
          new FilterTab({
            title: 'Zgodne z deklaracją',
            url: '/order/search',
            value: 'CHECKED',
            key: 'verification'
          }),
          new FilterTab({
            title: 'Do kontroli',
            url: '/order/search',
            value: 'CONTROL',
            key: 'verification'
          })
        ]
      })
    ];
  }

}
