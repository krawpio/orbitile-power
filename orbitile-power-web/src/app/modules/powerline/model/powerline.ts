import {Column} from '../../../shared/search/grid-table/decorators/column';
import {autoserializeAs} from 'cerializr';
import {ColumnModelType} from '../../../shared/search/grid-table/decorators/column.model';

export class Powerline {
  @autoserializeAs(Number)
  id: number;

  @autoserializeAs(String)
  code: string;

  @autoserializeAs(String)
  @Column({
    title: 'Nazwa Linii',
    routerLink: '/powerline/',
    routerLinkIdName: 'id'
  })
  name: string;

  @autoserializeAs(String)
  @Column({
    title: 'Napięcie',
    dict: {
      HIGH: 'WN',
      MEDIUM: 'SN'
    }
  })
  voltage: string;

  @autoserializeAs(Number)
  @Column({
    title: 'Długość',
    type: ColumnModelType.NUMBER,
    format: '1.0-1',
    sufix: ' km'
  })
  length: number;

  @autoserializeAs(Number)
  @Column({
    title: 'Powierzchnia alarmów',
    type: ColumnModelType.NUMBER,
    format: '1.0-0',
    sufix: ' m2'
  })
  alertArea: number;

  @autoserializeAs(Number)
  @Column({
    title: 'Procent zalesienia',
    type: ColumnModelType.NUMBER,
    format: '1.0-2',
    sufix: '%'
  })
  treePercentage: number;


  @autoserializeAs(String)
  @Column({
    title: 'Województwo'
  })
  province: string;

  @autoserializeAs(String)
  @Column({
    title: 'Powiat'
  })
  county: string;


  @autoserializeAs(Date)
  @Column({
    title: 'Data ostatniej wycinki',
    type: ColumnModelType.DATE
  })
  lastCutTime: Date;

}
