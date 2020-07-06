import {Component, Input, OnInit} from '@angular/core';
import {DateRangeControl} from './control-daterange';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-daterange',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.scss']
})
export class DaterangeComponent implements OnInit {

  @Input() control: DateRangeControl;

  dateFilter = (d: Date | null): boolean => {
    return d < new Date();
  }

  constructor() { }

  ngOnInit(): void {
  }

  setFromValue(event: MatDatepickerInputEvent<Date>) {
    this.control.value = formatDate(event.value, 'yyyy-MM-dd', 'pl');
  }

  setToValue(event: MatDatepickerInputEvent<Date>) {
    this.control.toValue = formatDate(event.value, 'yyyy-MM-dd', 'pl');
  }

}
