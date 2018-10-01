import { TestBed, inject } from '@angular/core/testing';

import { PredictionsService } from './predictions.service';

describe('PredictionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PredictionsService]
    });
  });

  it('should be created', inject([PredictionsService], (service: PredictionsService) => {
    expect(service).toBeTruthy();
  }));
});
