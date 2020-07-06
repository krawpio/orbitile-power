import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoWithMapComponent } from './info-with-map.component';

describe('InfoWithMapComponent', () => {
  let component: InfoWithMapComponent;
  let fixture: ComponentFixture<InfoWithMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoWithMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoWithMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});