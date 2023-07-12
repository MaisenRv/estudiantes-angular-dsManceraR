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
      nombre: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      cupo: ['',[Validators.required]],
      horario: ['',[Validators.required]],
      profesor: ['',[Validators.required]],
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
