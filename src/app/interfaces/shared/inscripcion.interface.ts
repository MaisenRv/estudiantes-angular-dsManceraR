export interface EstudianteInscripcionGET{
  estudiante_apellidos: string,
  estudiante_id: number,
  estudiante_nombres: string,
  inscripcion_estado: number,
  inscripcion_fechaCreacion: string,
  inscripcion_id: number
}

export interface EstudianteInscripcionPOST{
  estudianteId: number,
  cursoId: number,
  estado: number
}

export interface EstudianteEstadoInscripcionPUT{
  estado: number
}
