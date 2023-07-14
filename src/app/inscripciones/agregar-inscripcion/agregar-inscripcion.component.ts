import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstudianteGET } from 'src/app/interfaces/shared/estudiante.interface';
import { EstudianteInscripcionGET, EstudianteInscripcionPOST } from 'src/app/interfaces/shared/inscripcion.interface';
import { SelectEstudiantesInscripcion } from 'src/app/interfaces/shared/select.interface';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { InscripcionServicioService } from '../inscripcion-servicio.service';

@Component({
  selector: 'app-agregar-inscripcion',
  templateUrl: './agregar-inscripcion.component.html',
  styleUrls: ['./agregar-inscripcion.component.css']
})
export class AgregarInscripcionComponent implements OnInit {

  formRegistroInscripcion: FormGroup;

  listaEstudiantes: SelectEstudiantesInscripcion[] = [];

  constructor(
    private fb: FormBuilder,
    private servicioEstudiantes: EstudiantesService,
    private servicioInscripciones: InscripcionServicioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogAgregarRef:MatDialogRef<AgregarInscripcionComponent>
  ) {
    this.formRegistroInscripcion = this.fb.group({
      estudianteId: ['', [Validators.required]]
    })

  }
  ngOnInit(): void {
    this.servicioEstudiantes.obtenerEstudiantes().subscribe({
      next: (res) => {
        const estudiantes: EstudianteGET[] = res.data;
        this.estudiantesNoInscritos(estudiantes);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onSubmit(e:any): void {
    if (this.formRegistroInscripcion.valid) {
      e.target[1].disabled = true;
      const nuevaInscripcion: EstudianteInscripcionPOST ={
        cursoId: this.data.cursoId,
        estudianteId: this.formRegistroInscripcion.value.estudianteId,
        estado: 1
      }
      this.servicioInscripciones.crearInscripcion(nuevaInscripcion).subscribe({
        next:(res)=>{
          alert(res.message)
          this.dialogAgregarRef.close();
        },
        error:(err)=>{
          console.log(err);

        }
      })
    }
  }

  removerItemEnArray(arr:SelectEstudiantesInscripcion[], objeto:SelectEstudiantesInscripcion){
    let i = arr.findIndex( (item)=> item.refEstudiante ===  objeto.refEstudiante);
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
  }

  // Filtra los estudiantes que no estan inscritos al curso seleccionado
  estudiantesNoInscritos(estudiantes: EstudianteGET[]): void {
    let est: EstudianteGET[] = estudiantes;
    let estIns: EstudianteInscripcionGET[] = this.data.estudianteInscritos;

    let estudiantesNoInscritos: SelectEstudiantesInscripcion[] = [];

    for (const estudiante of est) {
      estudiantesNoInscritos.push({
        refEstudiante: estudiante.estudiante_id,
        infoEstudiante: {
          value: estudiante.estudiante_id,
          viewValue: estudiante.estudiante_nombres + " " + estudiante.estudiante_apellidos
        }
      })
    }

    if (estIns.length == 0) {
      this.listaEstudiantes = estudiantesNoInscritos;
      return;
    }

    for (const estudianteIns of estIns) {
      const estudianteFormateado:SelectEstudiantesInscripcion = {
        refEstudiante:estudianteIns.estudiante_id,
        infoEstudiante:{
          value: estudianteIns.estudiante_id,
          viewValue: estudianteIns.estudiante_nombres + " " + estudianteIns.estudiante_apellidos
        }
      }
      this.removerItemEnArray(estudiantesNoInscritos,estudianteFormateado)
    }
    this.listaEstudiantes = estudiantesNoInscritos;
  }
}
