// vaga.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Vaga } from '../models/vaga';

@Injectable({
  providedIn: 'root'
})
export class VagaService {
  private apiUrl = 'http://localhost:8080/api'; // URL da sua API Spring

  constructor(private http: HttpClient) { }

  getVagas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(`${this.apiUrl}/vagas`);
  }
  getVagasPorRecrutador(recrutadorId: number): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(`${this.apiUrl}/vagas/recrutador/${recrutadorId}`).pipe(
      catchError((error: any) => {
        console.error('Erro ao buscar vagas por recrutador:', error);
        return throwError(() => new Error('Erro ao buscar vagas por recrutador'));
      })
    );
  }
}
