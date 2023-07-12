import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './user/login/login.component';
import { RegistroComponent } from './user/registro/registro.component';
// import { PerfilComponent } from './user/perfil/perfil.component';
import { ResetpasswordComponent } from './user/resetpassword/resetpassword.component';

import { TemplateComponent } from './main-container/template/template.component';

const routes: Routes = [
  { path: 'login',component: LoginComponent },
  { path: 'registro',component: RegistroComponent },
  // { path: 'perfil',component: PerfilComponent },
  { path: 'reset-password',component: ResetpasswordComponent },
// Carga el template
  { path: 'main',component: TemplateComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/login' }, //Redirecciona a login si no encuaentra la ruta elegida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
