import {Component, Input, OnInit} from '@angular/core';
import {ActionButton} from '../../search/actions/action-button';
import {ControlBase} from '../../controls/control-base';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoadingService} from '../../overlay/loading.service';
import {MessageService} from '../../../core/messages/message.service';

@Component({
  selector: 'app-info-with-map',
  templateUrl: './info-with-map.component.html',
  styleUrls: ['./info-with-map.component.scss']
})
export class InfoWithMapComponent implements OnInit {

  mapExpanded: boolean;
  mainWidth;
  editMode: boolean;
  editButton: ActionButton<any>;
  confirmEditButton: ActionButton<any>;
  cancelEditButton: ActionButton<any>;

  @Input() actions: ActionButton<any>[];
  @Input() infoFields: ControlBase<any>[];
  @Input() title: string;
  @Input() updateUrl: string;

  constructor(
    private loadingService: LoadingService,
    private http: HttpClient,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.mapExpanded = false;
    this.mainWidth = window.screen.width * 3 / 5;
    this.editMode = false;
    if (this.infoFields?.length > 0) {
      const editable = this.infoFields.filter(field => field.key?.length > 0).length > 0;
      if (this.actions === undefined) {
        this.actions = [];
      }
      if (editable) {
        this.editButton = this.getEditAction();
        this.confirmEditButton = this.getConfirmEditAction();
        this.cancelEditButton = this.getCancelEditAction();

        this.actions = [
          this.editButton,
          this.confirmEditButton,
          this.cancelEditButton,
          ...this.actions];
      }
    }
  }

  mapToggle() {
    this.mapExpanded = !this.mapExpanded;
  }

  private getEditAction(): ActionButton<any> {
    return new ActionButton({
      label: 'Edytuj',
      buttonType: 'flat',
      action: () => {
        this.editMode = true;
        this.editButton.visible = false;
        this.cancelEditButton.visible = true;
        this.confirmEditButton.visible = true;
      }
    });
  }

  private getConfirmEditAction(): ActionButton<any> {
    return new ActionButton({
      label: 'Zatwierdź edycję',
      buttonType: 'flat',
      visible: false,
      action: () => {
        this.updateEntity();
      }
    });
  }

  private getCancelEditAction(): ActionButton<any> {
    return new ActionButton({
      label: 'Anuluj',
      visible: false,
      action: () => {
        this.editMode = false;
        this.editButton.visible = true;
        this.cancelEditButton.visible = false;
        this.confirmEditButton.visible = false;
      }
    });
  }

  private updateEntity() {
    let httpParams = new HttpParams();
    this.infoFields.forEach(field => {
      if (field.key.length > 0) {
        httpParams = httpParams.set(field.key, field.value);
      }
    });
    this.loadingService.open();
    this.http.get(this.updateUrl, {params: httpParams}).subscribe(
      data => {
        this.editMode = false;
        this.editButton.visible = true;
        this.cancelEditButton.visible = false;
        this.confirmEditButton.visible = false;
        this.loadingService.close();
        this.messageService.sendInfo('Edycja zakończona sukcesem!');
      },
      error => {
        // this.messageService.sendError(error);
        this.loadingService.close();
      }
    );
  }
}
