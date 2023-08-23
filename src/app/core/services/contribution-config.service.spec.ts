import { TestBed } from '@angular/core/testing';

import { ContributionConfigService } from './contribution-config.service';

describe('ContributionConfigService', () => {
  let service: ContributionConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContributionConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
