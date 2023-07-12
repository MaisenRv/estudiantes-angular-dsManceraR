import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

// Components
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';


@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    PerfilComponent,
    ResetpasswordComponent,
    AyudaComponent,
    MiCuentaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    // Material
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  exports: [
    RegistroComponent,
    LoginComponent,
    PerfilComponent,
    ResetpasswordComponent
  ]
})
export class UserModule { }
