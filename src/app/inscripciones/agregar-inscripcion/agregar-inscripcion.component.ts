import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstudianteGET } from 'src/app/interfaces/shared/estudiante.interface';
import { EstudianteInscripcionGET } from 'src/app/interfaces/shared/inscripcion.interface';
import { SelectEstudiantesInscripcion } from 'src/app/interfaces/shared/select.interface';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any
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

  onSubmit(): void {

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
      for (const estNoIns of estudiantesNoInscritos) {
        if ( estudianteIns.estudiante_id == estNoIns.refEstudiante && estudianteIns.inscripcion_estado == 1 ) {

          const estudianteEncontrado:SelectEstudiantesInscripcion = {
            refEstudiante:estudianteIns.estudiante_id,
            infoEstudiante:{
              value: estudianteIns.estudiante_id,
              viewValue: estudianteIns.estudiante_nombres + " " + estudianteIns.estudiante_apellidos
            }
          }
          this.removerItemEnArray(estudiantesNoInscritos,estudianteEncontrado)
          break;
        }
      }
    }
    this.listaEstudiantes = estudiantesNoInscritos;
  }
}
