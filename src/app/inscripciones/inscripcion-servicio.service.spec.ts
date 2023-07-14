import { TestBed } from '@angular/core/testing';

import { InscripcionServicioService } from './inscripcion-servicio.service';

describe('InscripcionServicioService', () => {
  let service: InscripcionServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
