import {Component, Input, OnInit} from '@angular/core';
import {SelectionDropdownControl} from './control-selection-dropdown';

@Component({
  selector: 'app-selection-dropdown',
  templateUrl: './selection-dropdown.component.html',
  styleUrls: ['./selection-dropdown.component.scss']
})
export class SelectionDropdownComponent implements OnInit {

  @Input() control: SelectionDropdownControl<any>;

  constructor() { }

  ngOnInit(): void {
  }

  input($event) {
    this.control.value = $event.target.value;
  }

}
