import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpansionGridComponent } from './expansion-grid.component';

describe('ExpansionGridComponent', () => {
  let component: ExpansionGridComponent;
  let fixture: ComponentFixture<ExpansionGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpansionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
