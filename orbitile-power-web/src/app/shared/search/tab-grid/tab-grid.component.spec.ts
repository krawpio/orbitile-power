import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabGridComponent } from './tab-grid.component';

describe('TabGridComponent', () => {
  let component: TabGridComponent;
  let fixture: ComponentFixture<TabGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
