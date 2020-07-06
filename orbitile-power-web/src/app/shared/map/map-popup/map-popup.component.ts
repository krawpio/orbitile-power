import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.scss']
})
export class MapPopupComponent implements OnInit {

  @Input() feature;
  area: number;

  constructor() { }

  ngOnInit(): void {
    this.area = Math.round(this.feature.properties.area * 10) / 10;
  }

}
