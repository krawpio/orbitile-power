import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() title: string;
  @Input() titlePadding: number;
  @Input() chartType: ChartType;
  @Input() chartLabels: Label[];
  chartLegend = false;
  chartPlugins = [pluginDataLabels];

  @Input() chartColors: Color[];

  @Input() chartData: ChartDataSets[];

  chartOptions: ChartOptions = {
    plugins: {
      datalabels: {
        color: 'black',
        labels: {
          title: {
            font: {
              weight: 300,
              family: 'Mukta',
              size: 14,
            }
          }
        },
        anchor: 'end',
        align: 'end',
      }
    },
    responsive: true,
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false
        },
        ticks: {
          max : 200,
          min: 0,
          stepSize: 20,
          fontColor : '#020000',
          fontFamily : 'Mukta',
          fontSize : 14,
          fontStyle : 'normal',
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          fontColor : '#020000',
          fontFamily : 'Mukta',
          fontSize : 14,
          fontStyle : 'normal',
          padding: 30,
          max : 40000,
          min: 0,
          stepSize: 5000,
        }
      }]
    },
  };

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
