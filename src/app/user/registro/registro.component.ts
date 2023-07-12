import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formRegistro:FormGroup;

  constructor(private fb:FormBuilder){
    this.formRegistro = this.fb.group({
      nombre: ['', [Validators.required,Validators.minLength(3)]],
      apellidos: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required,Validators.email]],
      edad: ['', [Validators.required,Validators.min(18,),Validators.max(60)]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    })
  }

  onSubmit(){
    if (this.formRegistro.valid) {
      console.log(this.formRegistro.value);
      this.formRegistro.reset();
    }
  }
}
