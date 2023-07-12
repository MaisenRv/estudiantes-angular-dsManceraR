import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { RegistroComponent } from '../registro/registro.component';
import { MatDialog } from '@angular/material/dialog';
import { EditarComponent } from '../editar/editar.component';
import { VerComponent } from '../ver/ver.component';
import { EstadoEstudiante, EstadoEstudiantePUT, EstudianteGET } from 'src/app/interfaces/shared/estudiante.interface';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit{

  estudiantes: EstudianteGET[] = [];
  displayedColumns: string[]  = ['id','nombre','apellidos','telefono','correo','estado','acciones']

  constructor(
    private servicio:EstudiantesService,
    public dialog:MatDialog,
    public dialogEdit:MatDialog,
    public dialogVer:MatDialog
  ){ }


  ngOnInit(): void {
    this.actulizarTabla();
  }

  actulizarTabla(){
    this.servicio.obtenerEstudiantes().subscribe({
      next: (response)=>{
        this.estudiantes = response.data;
      },
      error: (error)=>{
        console.log(error);
      }
    })
  }

  // Eventos de los botones
  abrirDialogoRegistro(){
    const dialogRef = this.dialog.open(RegistroComponent,{
      width:'500px'
    })
    dialogRef.afterClosed().subscribe({
      next:()=>{this.actulizarTabla()},
      error:(err)=>{console.log(err)}
    })
  }

  verEstudiante(id:number){
    const dialogVer = this.dialogVer.open(VerComponent,{
      width:'500px',
      data: {id}
    })
  }

  editarEstudiante(id:number){
    const dialogRefEdit = this.dialogEdit.open(EditarComponent,{
      width:'500px',
      data: {id}
    })
    dialogRefEdit.afterClosed().subscribe({
      next:()=>{this.actulizarTabla()},
      error:(err)=>{console.log(err)}
    })
  }

  actualizarEstadoEtudiante(id:number, estado:string){
    let estadoActulizado:EstadoEstudiantePUT;
    if (estado.toLowerCase() === 'activo') {
      estadoActulizado = {
        estado: EstadoEstudiante.Inactivo
      }
    }else if(estado.toLowerCase() === 'inactivo'){
      estadoActulizado = {
        estado: EstadoEstudiante.Activo
      }
    }
    this.servicio.actualizarEstadoEstudiante(id,estadoActulizado!).subscribe({
      next:(res)=>{
        alert('Actualizado con exito');
        this.actulizarTabla();
      },
      error:(err)=>{
        console.log(err);
      }
    }
    )
  }
}
