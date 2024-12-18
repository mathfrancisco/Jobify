import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map, of } from 'rxjs';
import { Candidato } from '../models/candidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getCandidatos(pagina: number, tamanhoPagina: number): Observable<Candidato[] | null> {
    const params = { pagina: pagina.toString(), tamanhoPagina: tamanhoPagina.toString() };
    return this.http.get<Candidato[]>(`${this.apiUrl}/candidatos`, { params }).pipe(
      map(response => response ? response : null),
      catchError((error: any) => {
        console.error('Erro ao buscar candidatos:', error);
        return of(null);
      })
    );
  }
  getCandidatoByEmail(email: string): Observable<Candidato | undefined> {
    return this.http.get<Candidato>(`${this.apiUrl}/candidatos/email/${email}`).pipe(
      catchError(_ => of(undefined))
    );
  }


  // candidato.service.ts
  getCandidatoById(id: number): Observable<Candidato | undefined> {
    return this.http.get<Candidato>(`${this.apiUrl}/candidatos/${id}`).pipe(
      catchError(error => {
        console.error(`Erro ao buscar candidato por ID ${id}:`, error);
        return of(undefined);
      })
    );
  }


}
