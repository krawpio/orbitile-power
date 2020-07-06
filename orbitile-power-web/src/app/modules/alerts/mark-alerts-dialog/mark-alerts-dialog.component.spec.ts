import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarkAlertsDialogComponent} from './mark-alerts-dialog.component';

describe('MarkAlertsDialogComponent', () => {
  let component: MarkAlertsDialogComponent;
  let fixture: ComponentFixture<MarkAlertsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkAlertsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkAlertsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
