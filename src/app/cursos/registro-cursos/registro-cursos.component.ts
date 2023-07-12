import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { CursosServicioService } from '../cursos-servicio.service';

@Component({
  selector: 'app-registro-cursos',
  templateUrl: './registro-cursos.component.html',
  styleUrls: ['./registro-cursos.component.css']
})
export class RegistroCursosComponent implements OnInit {

  formRegistroCursos!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private servicio:CursosServicioService
  ){

  }
  ngOnInit(): void {
    this.formRegistroCursos = this.fb.group({
      nombre: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      descripcion: ['',[Validators.required,Validators.maxLength(100)]],
      cupo: ['',[Validators.required]],
      horario: ['',[Validators.required]],
      profesor: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    })
  }

  onSubmit(){
    if (this.formRegistroCursos.valid) {
      this.servicio.crearCurso(this.formRegistroCursos.value).subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }
}
