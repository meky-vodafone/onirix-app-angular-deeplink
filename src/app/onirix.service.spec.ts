import { TestBed } from '@angular/core/testing';

import { OnirixService } from './onirix.service';

describe('OnirixService', () => {
  let service: OnirixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnirixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
