import {Column} from '../../../shared/search/grid-table/decorators/column';
import {autoserializeAs} from 'cerializr';
import {ColumnModelType} from '../../../shared/search/grid-table/decorators/column.model';

export class Alert {
  @autoserializeAs(Number)
  id: number;

  @autoserializeAs(Date)
  @Column({
    title: 'Data utworzenia',
    type: ColumnModelType.DATE
  })
  createdTime: Date;


  @autoserializeAs(String)
  @Column({
    title: 'Nazwa Linii',
    routerLink: '/powerline/',
    routerLinkIdName: 'powerLineId'
  })
  powerLineName: string;

  @autoserializeAs(String)
  @Column({
    title: 'Przęsło',
  })
  span: string;

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
    title: 'Stan',
    routerLink: '/order/',
    routerLinkIdName: 'orderId',
    routerPrefix: 'Zlecenie ',
    dict: {
      UNORDERED : 'Niezlecone',
      INACTIVE: 'Nieaktywny'
    },
    chipDict: {
      UNORDERED : '#FF8642',
      INACTIVE : '#626F78',
      DEFAULT: '#6093FF'
    }
  })
  orderNr: string;

  @autoserializeAs(Number)
  orderId: number;
}
