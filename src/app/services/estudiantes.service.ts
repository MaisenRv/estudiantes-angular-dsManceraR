import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//Libreria para utilizar metodos asincronos
import { Observable } from 'rxjs';
// Variables de entorno
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + environment.token
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  // Funcion asincrona, retorna un Observable
  obtenerEstudiantes(): Observable<any>{
    return this.http.get(environment.apiUrl + 'estudiantes', this.httpOptions);
  }

  crearEstudiante(estudiante:any): Observable<any>{
    return this.http.post(environment.apiUrl +'estudiantes', estudiante, this.httpOptions);
  }

  obtenerEstudiante(id:number):Observable<any>{
    return this.http.get(environment.apiUrl+'estudiantes/'+id, this.httpOptions);
  }

  actualizarEstudiante(id:number, estudiante:any):Observable<any>{
    return this.http.put(environment.apiUrl+'estudiantes/'+id, estudiante, this.httpOptions);
  }

  actualizarEstadoEstudiante(id:number, estado:any):Observable<any>{
    return this.http.put(environment.apiUrl+'estudiantes/estado/'+id,estado,this.httpOptions)
  }
}
