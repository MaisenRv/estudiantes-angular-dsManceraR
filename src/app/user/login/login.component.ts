import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  // Agrupa los controles de los formularios
  loginForm:FormGroup;

  constructor(
      private router:Router,
      // Servicio que se inyecta en el constructor
      private formBuilder:FormBuilder
    ){

    // Creando las validaciones del formulario login
    this.loginForm = this.formBuilder.group({
      usuario: [ '', [ Validators.email, Validators.required] ],
      password: [ '', [ Validators.minLength(6), Validators.required] ]
    });

  }
  ngOnInit(): void {
    if (sessionStorage.getItem("loggedIn")) {
      this.router.navigate(["main"])
    }
  }

  login(){

    // Obtiene los datos del formulario
    const formData = this.loginForm.value;
    // const usuario:string = formData.usuario;
    // const password:string = formData.password;

    if (this.loginForm.valid) {
      sessionStorage.setItem('formData', JSON.stringify(formData))
      sessionStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/main'])
    }else{
      alert("No cumple la validacion");
    }
  }
}
