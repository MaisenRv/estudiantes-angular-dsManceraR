import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateComponent } from './template/template.component';
import { PerfilComponent } from '../user/perfil/perfil.component';
import { AyudaComponent } from '../user/ayuda/ayuda.component';
import { MiCuentaComponent } from '../user/mi-cuenta/mi-cuenta.component';
import { ConsultaComponent } from '../estudiantes/consulta/consulta.component';
import { ListadoCursosComponent } from '../cursos/listado-cursos/listado-cursos.component';
import { ListaInscripcionesComponent } from '../inscripciones/lista-inscripciones/lista-inscripciones.component';

const routes: Routes = [
  { path: 'main',
    component: TemplateComponent,
    children:[
      {path: 'perfil', component: PerfilComponent},
      {path: 'ayuda', component: AyudaComponent},
      {path: 'miCuenta', component: MiCuentaComponent},
      {path: 'estudiantes', component: ConsultaComponent},
      {path: 'cursos', component: ListadoCursosComponent},
      {path: 'inscripciones', component: ListaInscripcionesComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainContainerRoutingModule { }
