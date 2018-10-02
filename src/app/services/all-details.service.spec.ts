import { TestBed, inject } from '@angular/core/testing';

import { AllDetailsService } from './all-details.service';

describe('AllDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllDetailsService]
    });
  });

  it('should be created', inject([AllDetailsService], (service: AllDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
