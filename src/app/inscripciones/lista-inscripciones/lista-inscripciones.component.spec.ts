import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInscripcionesComponent } from './lista-inscripciones.component';

describe('ListaInscripcionesComponent', () => {
  let component: ListaInscripcionesComponent;
  let fixture: ComponentFixture<ListaInscripcionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaInscripcionesComponent]
    });
    fixture = TestBed.createComponent(ListaInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
