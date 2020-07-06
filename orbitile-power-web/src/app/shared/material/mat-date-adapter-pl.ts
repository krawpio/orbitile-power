import {Injectable} from '@angular/core';
import {MatDateFormats, NativeDateAdapter} from '@angular/material/core';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MatDateAdapterPl extends NativeDateAdapter {

  getFirstDayOfWeek(): number {
    return 1;
  }

  format(date: Date, displayFormat): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'yyyy-MM-dd', 'En_en');
    }
    return super.format(date, displayFormat);
  }
}

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: { year: 'numeric', month: 'numeric' },
  }
};
