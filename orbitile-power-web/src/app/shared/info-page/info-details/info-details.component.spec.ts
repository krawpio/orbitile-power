import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGeneralDetailsComponent } from './info-header.component';

describe('InfoHeaderComponent', () => {
  let component: InfoGeneralDetailsComponent;
  let fixture: ComponentFixture<InfoGeneralDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoGeneralDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoGeneralDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
