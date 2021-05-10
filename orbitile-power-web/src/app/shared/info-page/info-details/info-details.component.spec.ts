import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoGeneralDetailsComponent } from './info-header.component';

describe('InfoHeaderComponent', () => {
  let component: InfoGeneralDetailsComponent;
  let fixture: ComponentFixture<InfoGeneralDetailsComponent>;

  beforeEach(waitForAsync(() => {
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
