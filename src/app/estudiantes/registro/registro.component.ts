import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formRegistro!:FormGroup;

  tiposIndentificacion = [
    {value:1, viewValue: 'Cedula de ciudadania'},
    {value:2, viewValue: 'Targeta de identidad'},
    {value:3, viewValue: 'Pasaporte'}
  ]

  constructor(
    private fb:FormBuilder,
    private servicio:EstudiantesService,
    // Esta asociado al registro component
    public dialogR:MatDialogRef<RegistroComponent>
    ){

  }

  ngOnInit(): void {
    this.formRegistro = this.fb.group({
      tipoIdentificacion: ['', [Validators.required]],
      numeroIdentificacion: ['', [Validators.required, Validators.minLength(6),Validators.pattern('^[0-9]*$')]],
      nombres: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      apellidos: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(30)]],
      celular: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(13),Validators.pattern('^[0-9]*$')]],
      correo: ['',[Validators.required, Validators.email]],
      linkedin: ['https://linkedin.con/in/',[Validators.required,]],
      github: ['https://github.com/',[Validators.required]],
    })
  }

  onSubmit(){
    if (this.formRegistro.valid) {
      console.log(JSON.stringify(this.formRegistro.value));
      this.servicio.crearEstudiante(JSON.stringify(this.formRegistro.value)).subscribe({
        next: (res)=>{
          this.dialogR.close();
          // console.log(res);
        },
        error: (error)=>{
          console.log(error);
        }
      })
    }
  }

}
