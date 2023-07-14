
import { Component, OnInit } from '@angular/core';
import { CursosServicioService } from 'src/app/cursos/cursos-servicio.service';
import { CursoGET } from 'src/app/interfaces/shared/curso.interface';
import { SelectCursos } from 'src/app/interfaces/shared/select.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionServicioService } from '../inscripcion-servicio.service';
import { EstudianteEstadoInscripcionPUT, EstudianteInscripcionGET } from 'src/app/interfaces/shared/inscripcion.interface';
import { MatDialog } from '@angular/material/dialog';
import { AgregarInscripcionComponent } from '../agregar-inscripcion/agregar-inscripcion.component';

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
    private fb:FormBuilder,
    public dialogAgregarInscripcion:MatDialog
  ){
    this.formSelectCurso = this.fb.group({
      idCurso: ['',Validators.required]
    })
  }


  ngOnInit(): void {
    this.servicioCursos.obtenerCursos().subscribe({
      next:(res)=>{
        this.listaCursos = [];
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


  agregarInscripcion():void{
    const dialogRef = this.dialogAgregarInscripcion.open(AgregarInscripcionComponent,{
      width:"500px",
      data: {
        cursoId: this.formSelectCurso.value.idCurso,
        estudianteInscritos: this.listaEstudiantesInscripciones
      }
    })
    dialogRef.afterClosed().subscribe({
      next:()=>{
        this.numeroEstudiantesInscritos = 0;
        this.numeroCuposCurso = 0;
        this.onSubmit()
      }
    })
  }

  actualizarEstadoInscripcion(id:number, estado:number): void{
    let estadoActulizado:number = 0;
    if (estado == 1) {
      estadoActulizado = 0;
    }else if (estado == 0) {
      estadoActulizado = 1;
    }

    const inscripcionActualizada:EstudianteEstadoInscripcionPUT = {
      estado: estadoActulizado
    }
    this.servicioInscripcion.actualizarInscripcion(id,inscripcionActualizada).subscribe({
      next:(res)=>{
        alert(res.message)
        // console.log(res);
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  get isEstudiantesInscriptos():boolean{
    return this.numeroEstudiantesInscritos > 0;
  }
  get isCuposLlenos():boolean{
    return !(this.numeroEstudiantesInscritos >= this.numeroCuposCurso);
  }
}
