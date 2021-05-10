import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpandedFiltersPanelComponent } from './expanded-filters-panel.component';

describe('FiltersPanelComponent', () => {
  let component: ExpandedFiltersPanelComponent;
  let fixture: ComponentFixture<ExpandedFiltersPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandedFiltersPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedFiltersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
