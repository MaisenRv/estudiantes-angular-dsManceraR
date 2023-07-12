enum TipoIdentificacion {
  CedulaCiudadania = 1,
  TargetaIdentidad = 2,
  Pasaporte = 3
}

export enum EstadoEstudiante{
  Activo = "Activo",
  Inactivo = "Inactivo"
}

export interface EstadoEstudiantePUT{
  estado: EstadoEstudiante
}

export interface EstudianteGET {
  estudiante_id: number,
  estudiante_nombres: string,
  estudiante_apellidos: string,
  estudiante_celular: string,
  estudiante_correo: string,
  estudiante_estado: string,
  estudiante_fechaCreacion: string,
  estudiante_github: string,
  estudiante_linkedin: string,
  estudiante_numeroIdentificacion?: number,
  estudiante_tipoIdentificacion?:TipoIdentificacion
}


export interface EstudiantePOST{
  tipoIdentificacion: TipoIdentificacion,
  numeroIdentificacion: number,
  nombres: string,
  apellidos: string,
  celular: number
  correo: string,
  linkedin: string,
  github: string
}

export interface EstudiantePUT{
  nombres: string,
  apellidos: string,
  celular: number
  correo: string,
  linkedin: string,
  github: string
}
