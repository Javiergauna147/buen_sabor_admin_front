import { TestBed } from '@angular/core/testing';

import { RubroProductosService } from './rubro-productos.service';

describe('RubroProductosService', () => {
  let service: RubroProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubroProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
