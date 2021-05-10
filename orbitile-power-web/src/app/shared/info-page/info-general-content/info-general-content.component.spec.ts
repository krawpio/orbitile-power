import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoGeneralContentComponent } from './info-general-content.component';

describe('InfoGeneralContentComponent', () => {
  let component: InfoGeneralContentComponent;
  let fixture: ComponentFixture<InfoGeneralContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoGeneralContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoGeneralContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
