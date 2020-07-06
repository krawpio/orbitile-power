import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerlineDetailsComponent } from './powerline-details.component';

describe('LineDetailsComponent', () => {
  let component: PowerlineDetailsComponent;
  let fixture: ComponentFixture<PowerlineDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerlineDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerlineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
