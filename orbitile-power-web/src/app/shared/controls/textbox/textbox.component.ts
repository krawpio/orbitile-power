import {Component, Input, OnInit} from '@angular/core';
import {TextboxControl} from './control-textbox';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css']
})
export class TextboxComponent implements OnInit {
  @Input() control: TextboxControl;

  constructor() { }

  ngOnInit(): void {
  }

  input($event) {
    this.control.value = $event.target.value;
  }
}
