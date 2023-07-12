import { TestBed } from '@angular/core/testing';

import { CursosServicioService } from './cursos-servicio.service';

describe('CursosServicioService', () => {
  let service: CursosServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
