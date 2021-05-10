import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoActionsComponent } from './info-actions.component';

describe('InfoActionsComponent', () => {
  let component: InfoActionsComponent;
  let fixture: ComponentFixture<InfoActionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
