import {NgModule} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorIntlPl} from './mat-paginator-custom';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {APP_DATE_FORMATS, MatDateAdapterPl} from './mat-date-adapter-pl';
import {NgxSliderModule} from '@angular-slider/ngx-slider';


@NgModule({
  declarations: [],
  exports: [
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxSliderModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlPl},
    {provide: DateAdapter, useClass: MatDateAdapterPl },
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
  ]
})
export class MatControlsModule {
}
