import {Component, Input, OnInit} from '@angular/core';

import {ControlBase} from '../control-base';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  @Input() control: ControlBase<any>;
  @Input() hideLabel: boolean;

  constructor() {
    if (this.hideLabel === undefined) {
      this.hideLabel = false;
    }
  }

  ngOnInit(): void {
  }

}


