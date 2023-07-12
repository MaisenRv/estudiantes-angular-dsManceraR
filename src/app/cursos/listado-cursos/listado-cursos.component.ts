import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistroCursosComponent } from '../registro-cursos/registro-cursos.component';
import { CursosServicioService } from '../cursos-servicio.service';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.css']
})
export class ListadoCursosComponent implements OnInit {

  cursos: any[] = [];
  displayedColumns: string[]  = ['nombre','descripcion','cupo','horario','profesor']


  constructor(
    public registroCurososDialog:MatDialog,
    private servicio:CursosServicioService
  ){ }

  ngOnInit(): void {
    this.servicio.obtenerCursos().subscribe({
      next:(res)=>{
        this.cursos = res.data;
        console.log(res);

      },
      error:(err)=>{
        console.log(err);

      }
    })
  }



  abrirDialogAgregarCurso(){
    const dialogRef = this.registroCurososDialog.open(RegistroCursosComponent, {
      width: '500px'
    })
  }

}
