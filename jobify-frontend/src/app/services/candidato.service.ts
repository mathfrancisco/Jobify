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

  getCandidatos(): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(`${this.apiUrl}/candidatos`).pipe(
      catchError((error: any) => {
        console.error('Erro ao buscar candidatos:', error);
        return throwError(() => new Error('Erro ao buscar candidatos'));
      })
    );
  }
  getCandidatoByEmail(email: string): Observable<Candidato | undefined> {
    return this.http.get<Candidato[]>(`${this.apiUrl}/candidatos`).pipe(
      map(candidatos => candidatos.find(c => c.email === email)), // Filtra o array pelo email
      catchError(_ => of(undefined)) // Retorna undefined se não encontrar
    );
  }

}
