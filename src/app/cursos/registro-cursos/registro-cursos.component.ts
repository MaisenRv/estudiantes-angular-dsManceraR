import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { CursosServicioService } from '../cursos-servicio.service';
import { CursoPOST } from 'src/app/interfaces/shared/curso.interface';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-registro-cursos',
  templateUrl: './registro-cursos.component.html',
  styleUrls: ['./registro-cursos.component.css']
})
export class RegistroCursosComponent implements OnInit {

  formRegistroCursos!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private servicio:CursosServicioService,
    private registroDialogRef:DialogRef<RegistroCursosComponent>
  ){

  }
  ngOnInit(): void {
    this.formRegistroCursos = this.fb.group({
      nombre: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      descripcion: ['',[Validators.required,Validators.maxLength(100)]],
      cupo: ['',[Validators.required]],
      horario: ['',[Validators.required]],
      profesor: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    })
  }

  onSubmit(){
    if (this.formRegistroCursos.valid) {
      const nuevoCurso:CursoPOST = this.formRegistroCursos.value;
      this.servicio.crearCurso(nuevoCurso).subscribe({
        next:(res)=>{
          alert("Curso agregado correctamente");
          this.registroDialogRef.close();
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }
}
