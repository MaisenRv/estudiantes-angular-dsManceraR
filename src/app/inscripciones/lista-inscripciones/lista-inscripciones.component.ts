
import { Component, OnInit } from '@angular/core';
import { CursosServicioService } from 'src/app/cursos/cursos-servicio.service';
import { CursoGET } from 'src/app/interfaces/shared/curso.interface';
import { SelectCursos } from 'src/app/interfaces/shared/select.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionServicioService } from '../inscripcion-servicio.service';
import { EstudianteInscripcionGET } from 'src/app/interfaces/shared/inscripcion.interface';

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.css']
})
export class ListaInscripcionesComponent implements OnInit {
  formSelectCurso:FormGroup
  displayedColumns:string[] = ['nombre', 'apellido','estado','fechaCreacion','acciones']

  listaCursos:SelectCursos[] = [];

  listaEstudiantesInscripciones!:EstudianteInscripcionGET[];
  numeroEstudiantesInscritos!:number;
  numeroCuposCurso!:number;

  constructor(
    private servicioCursos:CursosServicioService,
    private servicioInscripcion:InscripcionServicioService,
    private fb:FormBuilder
  ){
    this.formSelectCurso = this.fb.group({
      idCurso: ['',Validators.required]
    })
  }


  ngOnInit(): void {
    this.servicioCursos.obtenerCursos().subscribe({
      next:(res)=>{
        const cursos:CursoGET[] = res.data;
        for (let curso of cursos) {
          this.listaCursos.push({
            value: curso.curso_id ,
            viewValue: curso.curso_nombre
          })
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  onSubmit(): void{
    if (this.formSelectCurso.valid) {
      this.servicioInscripcion.obtenerInscripcion(this.formSelectCurso.value.idCurso).subscribe({
        next:(res)=>{
          this.listaEstudiantesInscripciones = res.data;
          this.numeroEstudiantesInscritos = res.data.length;
          console.log(this.listaEstudiantesInscripciones);
        },
        error:(err)=>{
          console.log(err);
        }
      })
      this.servicioCursos.obtenerCurso(this.formSelectCurso.value.idCurso).subscribe({
        next:(res)=>{
          const curso:CursoGET = res.data[0];
          this.numeroCuposCurso = curso.curso_cupo;
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

  get isEstudiantesInscriptos():boolean{
    return this.numeroEstudiantesInscritos > 0;
  }
}
