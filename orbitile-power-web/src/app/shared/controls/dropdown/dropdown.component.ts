import {Component, Input, OnInit} from '@angular/core';
import {DropdownControl} from './control-dropdown';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() control: DropdownControl;

  constructor() { }

  ngOnInit(): void {
  }

  input($event) {
    this.control.value = $event.target.value;
  }

}
