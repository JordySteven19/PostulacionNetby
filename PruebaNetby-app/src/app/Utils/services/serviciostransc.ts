import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaccion } from '../Interfaces/ETransaccion';

@Injectable({
  providedIn: 'root'
})
export class Serviciostransc {

  private baseUrl = 'http://localhost:5287/api/transacciones';

  constructor(private http: HttpClient) {}

  getTransacciones(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(this.baseUrl);
  }
  getTransaccion(id: number): Observable<Transaccion> {
    return this.http.get<Transaccion>(`${this.baseUrl}/${id}`);
  }
  registrarTransaccion(transaccion: Transaccion): Observable<Transaccion> {
    return this.http.post<Transaccion>(this.baseUrl, transaccion);
  }
  actualizarTransaccion(id: number, transaccion: Transaccion): Observable<Transaccion> {
    return this.http.put<Transaccion>(`${this.baseUrl}/${id}`, transaccion);
  }
  eliminarTransaccion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
