import { Component, OnInit, Inject } from '@angular/core';
import { CursoGET } from 'src/app/interfaces/shared/curso.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursosServicioService } from '../cursos-servicio.service';

@Component({
  selector: 'app-ver-curso',
  templateUrl: './ver-curso.component.html',
  styleUrls: ['./ver-curso.component.css']
})
export class VerCursoComponent implements OnInit {
  curso!:CursoGET;

  constructor(
    public verDialog:MatDialogRef<VerCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private servicio:CursosServicioService
  ){

  }
  ngOnInit(): void {
    this.servicio.obtenerCurso(this.data.id).subscribe({
      next:(res)=>{
        this.curso = res.data[0];
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
