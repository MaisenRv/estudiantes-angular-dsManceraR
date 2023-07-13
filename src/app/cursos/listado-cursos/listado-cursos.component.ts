import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistroCursosComponent } from '../registro-cursos/registro-cursos.component';
import { CursosServicioService } from '../cursos-servicio.service';
import { CursoGET } from 'src/app/interfaces/shared/curso.interface';
import { VerCursoComponent } from '../ver-curso/ver-curso.component';
import { EditarCursoComponent } from '../editar-curso/editar-curso.component';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.css']
})
export class ListadoCursosComponent implements OnInit {

  cursos: CursoGET[] = [];
  displayedColumns: string[]  = ['nombre','descripcion','cupo','horario','profesor','acciones']


  constructor(
    public registroCurososDialog:MatDialog,
    public verCurosoDialog:MatDialog,
    public editarCurosoDialog:MatDialog,
    private servicio:CursosServicioService
  ){ }

  ngOnInit(): void {
    this.servicio.obtenerCursos().subscribe({
      next:(res)=>{
        this.cursos = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  actualizarTabla(){
    this.servicio.obtenerCursos().subscribe({
      next:(res)=>{
        this.cursos = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

// Eventos
  abrirDialogAgregarCurso(){
    const dialogRef = this.registroCurososDialog.open(RegistroCursosComponent, {
      width: '500px'
    })

    dialogRef.afterClosed().subscribe({
      next:()=>{
        this.actualizarTabla();
      }
    })
  }

  verDialogCurso(id:number){
    const dialogRef = this.verCurosoDialog.open(VerCursoComponent,{
      width: "500px",
      data:{id:id}
    })
  }

  editarDialogCurso(id:number){
    const dialogRef = this.editarCurosoDialog.open(EditarCursoComponent,{
      width: "500px",
      data: {id}
    })
    dialogRef.afterClosed().subscribe({
      next:()=>{
        this.actualizarTabla();
      }
    })
  }

  actulizarDialogEstadoCurso(id:number,estado:string){

  }

}
