import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionServicioService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + environment.token
    })
  }

  constructor(
    private http:HttpClient
  ) { }

  obtenerInscripcion(id:number): Observable<any>{
    return this.http.get(environment.apiUrl + "inscripcion/"+id,this.httpOptions);
  }

  actualizarInscripcion(id:number,inscripcion:any): Observable<any>{
    return this.http.put(environment.apiUrl + "inscripcion/"+id,inscripcion,this.httpOptions);
  }

  crearInscripcion(inscripcion:any): Observable<any>{
    return this.http.post(environment.apiUrl + "inscripcion",inscripcion,this.httpOptions);
  }
}
