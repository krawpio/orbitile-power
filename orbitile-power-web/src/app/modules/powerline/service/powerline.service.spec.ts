import { TestBed } from '@angular/core/testing';

import { PowerlineService } from './powerline.service';

describe('PowerlineService', () => {
  let service: PowerlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
