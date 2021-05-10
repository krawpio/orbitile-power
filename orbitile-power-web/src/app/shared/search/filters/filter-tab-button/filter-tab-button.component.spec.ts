import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterTabButtonComponent } from './filter-tab-button.component';

describe('FilterTabButtonComponent', () => {
  let component: FilterTabButtonComponent;
  let fixture: ComponentFixture<FilterTabButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTabButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTabButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
