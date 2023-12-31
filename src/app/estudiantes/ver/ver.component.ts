import { Component, OnInit, Inject  } from '@angular/core';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { EstudianteGET } from 'src/app/interfaces/shared/estudiante.interface';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit{

  estudiante!:EstudianteGET;

  constructor(
    private servicio:EstudiantesService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogVer:MatDialogRef<VerComponent>
  ){

  }
  ngOnInit(): void {

    this.servicio.obtenerEstudiante(this.data.id).subscribe({
      next: (res)=>{
        this.estudiante = res.data[0];
        console.log(this.estudiante);

      },
      error:(err)=>{
        console.log(err);
      }
    })

  }

}
