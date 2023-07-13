import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CursoPOST, CursoPUT } from '../interfaces/shared/curso.interface';

@Injectable({
  providedIn: 'root'
})
export class CursosServicioService {

  httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + environment.token
    })
  }

  constructor(
    private http:HttpClient
  ) { }

  obtenerCursos(): Observable<any>{
    return this.http.get(environment.apiUrl + 'cursos', this.httpOptions);
  }

  crearCurso(curso:CursoPOST): Observable<any>{
    return this.http.post(environment.apiUrl +'cursos', curso, this.httpOptions);
  }

  obtenerCurso(id:number):Observable<any>{
    return this.http.get(environment.apiUrl+'cursos/'+id, this.httpOptions);
  }

  actualizarCurso(id:number, curso:CursoPUT):Observable<any>{
    return this.http.put(environment.apiUrl+'cursos/'+id, curso, this.httpOptions);
  }

  actualizarEstadoCurso(id:number, estado:any):Observable<any>{
    return this.http.put(environment.apiUrl+'cursos/estado/'+id,estado,this.httpOptions)
  }
}
