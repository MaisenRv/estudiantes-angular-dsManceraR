export interface CursoPOST{
  cupo: number,
  descripcion: string,
  horario: string,
  nombre: string,
  profesor: string
}

export interface CursoGET{
  curso_cupo: number,
  curso_descripcion: string,
  curso_fechaCreacion: string,
  curso_horario: string,
  curso_id: number,
  curso_nombre: string,
  curso_profesor: string
}

export interface CursoPUT{
  cupo: number,
  descripcion: string,
  horario: string,
  nombre: string,
  profesor: string
}
