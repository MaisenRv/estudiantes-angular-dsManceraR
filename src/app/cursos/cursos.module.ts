import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCursosComponent } from './listado-cursos/listado-cursos.component';
import { RegistroCursosComponent } from './registro-cursos/registro-cursos.component';

import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ListadoCursosComponent,
    RegistroCursosComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule
  ],
})
export class CursosModule { }
