import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

import { MatDialogRef } from '@angular/material/dialog';
import { EstudiantePOST } from 'src/app/interfaces/shared/estudiante.interface';

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

  onSubmit(e:any){
    if (this.formRegistro.valid) {
      e.target[8].disabled = true
      const nuevoEstudiante:EstudiantePOST = this.formRegistro.value;
      this.servicio.crearEstudiante(nuevoEstudiante).subscribe({
        next: (res)=>{
          alert(res.message)
          this.dialogR.close();
        },
        error: (err)=>{
          let msg:String = "";
          for(const msgError of err.error.message){
            msg += msgError + " \n";
          }
          alert(msg);
        }
      })
    }
  }

}
