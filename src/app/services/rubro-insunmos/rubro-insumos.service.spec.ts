import { TestBed } from '@angular/core/testing';

import { RubroInsumosService } from './rubro-insumos.service';

describe('RubroInsumosService', () => {
  let service: RubroInsumosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubroInsumosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
