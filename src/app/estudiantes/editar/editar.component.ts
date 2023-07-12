import { Component,Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { EstudianteGET, EstudiantePUT } from 'src/app/interfaces/shared/estudiante.interface';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  formEditar!:FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private servicio:EstudiantesService ,
    public dialogEditar:MatDialogRef<EditarComponent>,
    private fb:FormBuilder
  ){

    this.formEditar = this.fb.group({
      nombres: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      apellidos: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(30)]],
      celular: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(13),Validators.pattern('^[0-9]*$')]],
      correo: ['',[Validators.required, Validators.email]],
      linkedin: ['',[Validators.required,]],
      github: ['',[Validators.required]]
    })

  }

  ngOnInit(): void {
    this.servicio.obtenerEstudiante(this.data.id).subscribe({
      next: (res)=>{
        const estudianteData:EstudianteGET = res.data[0];

        this.formEditar.setValue({
          nombres:estudianteData.estudiante_nombres,
          apellidos:estudianteData.estudiante_apellidos,
          celular:estudianteData.estudiante_celular,
          correo:estudianteData.estudiante_correo,
          linkedin:estudianteData.estudiante_linkedin,
          github:estudianteData.estudiante_github,
        })

      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
  onSubmit(){
    if (this.formEditar.valid) {
      const estudiante:EstudiantePUT = {
        nombres: this.formEditar.value.nombres,
        apellidos: this.formEditar.value.apellidos,
        celular: Number(this.formEditar.value.celular),
        linkedin: this.formEditar.value.linkedin,
        github: this.formEditar.value.github,
        correo: this.formEditar.value.correo
      }

      this.servicio.actualizarEstudiante(this.data.id,estudiante).subscribe({
        next:(res)=>{
          alert('estudiantes actualizado')
          this.dialogEditar.close()
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

}
