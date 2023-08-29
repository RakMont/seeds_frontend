import { TestBed } from '@angular/core/testing';

import { SouvenirTrackingService } from './souvenir-tracking.service';

describe('SouvenirTrackingService', () => {
  let service: SouvenirTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SouvenirTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
