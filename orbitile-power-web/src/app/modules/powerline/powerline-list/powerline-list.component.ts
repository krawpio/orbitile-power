import {Component, OnInit} from '@angular/core';
import {Powerline} from '../model/powerline';
import {ControlBase} from '../../../shared/controls/control-base';
import {DropdownControl} from '../../../shared/controls/dropdown/control-dropdown';
import {TextboxControl} from '../../../shared/controls/textbox/control-textbox';
import {SliderControl} from '../../../shared/controls/slider/control-slider';
import {ActionButton} from '../../../shared/search/actions/action-button';
import {PowerlineService} from '../service/powerline.service';

@Component({
  selector: 'app-line-list',
  templateUrl: './powerline-list.component.html',
  styleUrls: ['./powerline-list.component.css']
})
export class PowerlineListComponent implements OnInit {

  dataUrl = '/powerline/search';
  modelType = Powerline;
  title = 'Linie energetyczne';
  filters: ControlBase<any>[];
  actions: ActionButton<Powerline>[];
  filtersStyle = 'grid-column3';

  constructor(private powerlineService: PowerlineService) {
  }

  ngOnInit() {
    this.filters = this.getFilters();
    this.actions = this.getActions();
  }


  private getFilters(): ControlBase<any>[] {
    return [

      new DropdownControl({
        key: 'code',
        label: 'Nazwa linii',
        options: [
          {key: 'SIT-WOR',  value: 'Sitnicka'},
          {key: 'LUB-KOC',  value: 'Kock'},
          {key: 'RAD-BRZ',   value: 'Radomsko'}
        ],
        order: 1,
        width: 450
      }),

      new DropdownControl({
        key: 'voltage',
        label: 'Napięcie linii',
        options: [
          {key: 'HIGH',  value: 'WN'},
          {key: 'MEDIUM',  value: 'SN'}
        ],
        order: 2,
        width: 244
      }),

      new TextboxControl({
        key: 'region',
        label: 'Obszar',
        placeholder: 'Wybierz województwo, powiat, gminę lub obszar',
        type: 'text',
        order: 3,
        width: 437
      }),

      new SliderControl({
        key: 'length',
        label: 'Długość linii w km',
        order: 4,
        width: 450,
        toRange: 200
      })
    ];
  }

  private getActions(): ActionButton<Powerline>[] {
    return [
      new ActionButton({
        label: 'Eksportuj',
        buttonType: 'flat',
        icon: 'save_alt',
        action: (powerlines: Powerline[]) => this.exportToExcel(powerlines)
      }),
    ];
  }

  private exportToExcel(powerlines: Powerline[]): void {
    this.powerlineService.export(powerlines.map(a => a.id));
  }
}

