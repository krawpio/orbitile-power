import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ControlBase} from '../controls/control-base';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {

  @Input() controls: ControlBase<any>[];
  @Input() dialogRef: MatDialogRef<any>;
  @Input() title: string;
  @Input() submitTitle: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  getForm() {
    return this.controls;
  }


}
