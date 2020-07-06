import {Component, Input, OnInit} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {formatDate} from '@angular/common';
import {DateControl} from './control-date';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  @Input() control: DateControl;

  dateFilter = (d: Date | null): boolean => {
    return true;
  }

  constructor() { }

  ngOnInit(): void {
  }

  setValue(event: MatDatepickerInputEvent<Date>) {
    this.control.value = formatDate(event.value, 'yyyy-MM-dd', 'pl');
  }

}
