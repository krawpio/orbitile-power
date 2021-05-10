import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PowerlineDetailsComponent } from './powerline-details.component';

describe('LineDetailsComponent', () => {
  let component: PowerlineDetailsComponent;
  let fixture: ComponentFixture<PowerlineDetailsComponent>;

  beforeEach(waitForAsync(() => {
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
