import { TestBed, inject } from '@angular/core/testing';

import { MetricaService } from './metrica.service';

describe('MetricaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetricaService]
    });
  });

  it('should be created', inject([MetricaService], (service: MetricaService) => {
    expect(service).toBeTruthy();
  }));
});
