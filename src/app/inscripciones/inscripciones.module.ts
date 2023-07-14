import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaInscripcionesComponent } from './lista-inscripciones/lista-inscripciones.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AgregarInscripcionComponent } from './agregar-inscripcion/agregar-inscripcion.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ListaInscripcionesComponent,
    AgregarInscripcionComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class InscripcionesModule { }
