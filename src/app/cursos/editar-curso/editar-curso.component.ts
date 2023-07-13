import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursosServicioService } from '../cursos-servicio.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { CursoGET, CursoPUT } from 'src/app/interfaces/shared/curso.interface';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit{

  formEditar:FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public editarDialog:MatDialogRef<EditarCursoComponent>,
    private servicio:CursosServicioService,
    private fb:FormBuilder
  ){
    this.formEditar = this.fb.group({
      nombre: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      descripcion: ['',[Validators.required,Validators.maxLength(100)]],
      cupo: ['',[Validators.required]],
      horario: ['',[Validators.required]],
      profesor: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    })
  }

  ngOnInit(): void {
    this.servicio.obtenerCurso(this.data.id).subscribe({
      next:(res)=>{
        const curso:CursoGET = res.data[0];
        this.formEditar.setValue({
          nombre: curso.curso_nombre,
          descripcion: curso.curso_descripcion,
          cupo: curso.curso_cupo,
          horario: curso.curso_horario,
          profesor: curso.curso_profesor
        })
      },
      error:(err)=>{
          console.log(err);
      }
    })
  }

  onSubmit(){
    if (this.formEditar.valid) {
      const nuevoCurso:CursoPUT = this.formEditar.value
      this.servicio.actualizarCurso(this.data.id,nuevoCurso).subscribe({
        next:(res)=>{
          alert("Curso actualizado correctamente")
          this.editarDialog.close();
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }


}
