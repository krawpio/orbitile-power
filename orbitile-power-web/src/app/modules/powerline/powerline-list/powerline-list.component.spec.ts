import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerlineListComponent } from './powerline-list.component';

describe('LineListComponent', () => {
  let component: PowerlineListComponent;
  let fixture: ComponentFixture<PowerlineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerlineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerlineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
