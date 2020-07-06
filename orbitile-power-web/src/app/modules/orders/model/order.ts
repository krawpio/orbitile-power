import {autoserializeAs} from 'cerializr';
import {Column} from '../../../shared/search/grid-table/decorators/column';
import {ColumnModelType} from '../../../shared/search/grid-table/decorators/column.model';

export class Order {
  @autoserializeAs(Number)
  id: number;

  @autoserializeAs(Date)
  @Column({
    title: 'Data utworzenia',
    type: ColumnModelType.DATE
  })
  createdTime: Date;

  @autoserializeAs(Date)
  @Column({
    title: 'Data realizacji wycinki',
    type: ColumnModelType.DATE
  })
  closedTime: Date;


  @autoserializeAs(String)
  @Column({
    title: 'Numer',
    routerLink: '/order/',
    routerLinkIdName: 'id'
  })
  nr: string;

  @autoserializeAs(String)
  @Column({
    title: 'Twórca',
  })
  owner: string;


  @autoserializeAs(String)
  powerLineId: number;

  @autoserializeAs(Number)
  @Column({
    title: 'Powierzchnia',
    type: ColumnModelType.NUMBER,
    format: '1.0-1',
    sufix: ' m2'
  })
  area: number;

  @autoserializeAs(String)
  @Column({
    title: 'Status',
    dict: {
      NEW : 'Nowe',
      PROGRESS: 'W trakcie',
      ORDERED: 'Zlecone',
      CLOSED: 'Zamknięte'
    },
    chipDict: {
      NEW : '#FDBD00',
      PROGRESS: '#9463FD',
      ORDERED: '#6093FF',
      CLOSED: '#BBBBBB'
    }
  })
  status: string;

  verification: string;
}
