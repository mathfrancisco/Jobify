// candidatura.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map, of } from 'rxjs';
import { Candidatura } from '../models/candidatura';

@Injectable({
  providedIn: 'root'
})
export class CandidaturaService {
  private apiUrl = 'http://localhost:8080/api/candidaturas'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) {}

  getCandidaturasPorVaga(vagaId: number): Observable<Candidatura[]> {
    return this.http.get<Candidatura[]>(`${this.apiUrl}/vaga/${vagaId}`).pipe(
      catchError(error => {
        console.error('Erro ao buscar candidaturas por vaga:', error);
        return throwError(() => new Error('Erro ao buscar candidaturas.')); // Lança um erro para ser tratado no componente
      })
    );
  }

  criarCandidatura(candidatura: Candidatura): Observable<Candidatura> {
    return this.http.post<Candidatura>(this.apiUrl, candidatura).pipe(
      catchError(error => {
        console.error('Erro ao criar candidatura:', error);
        return throwError(() => new Error('Erro ao criar candidatura.'));
      })
    );
  }

  atualizarCandidatura(candidatura: Candidatura): Observable<Candidatura> {
    return this.http.put<Candidatura>(`${this.apiUrl}/${candidatura.id}`, candidatura).pipe(
      catchError(error => {
        console.error('Erro ao atualizar candidatura:', error);
        return throwError(() => new Error('Erro ao atualizar candidatura.'));
      })
    );
  }

  excluirCandidatura(candidaturaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${candidaturaId}`).pipe(
      catchError(error => {
        console.error('Erro ao excluir candidatura:', error);
        return throwError(() => new Error('Erro ao excluir candidatura.'));
      })
    );
  }


  getCandidaturasPorCandidato(candidatoId: number): Observable<Candidatura[]> {
    const url = `${this.apiUrl}/candidato/${candidatoId}`;
    return this.http.get<Candidatura[]>(url).pipe(
      catchError(error => {
        console.error('Erro ao buscar candidaturas por candidato:', error);
        return of([]); // Retorna um array vazio se houver erro
      })
    );
  }
}
