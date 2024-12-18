// vaga.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs'; // Importe o 'map'
import { Vaga } from '../models/vaga';

@Injectable({
  providedIn: 'root'
})
export class VagaService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getVagas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(`${this.apiUrl}/vagas`).pipe(
      map((vagas: Vaga[]) => { // Use map para transformar as vagas
        return vagas.map(vaga => ({
          ...vaga,
          id: Number(vaga.id), // Converte o ID para number
          dataPublicacao: new Date(vaga.dataPublicacao) // Converte a data
        }));
      }),
      catchError((error: any) => {
        console.error('Erro ao buscar vagas:', error);
        return throwError(() => new Error('Erro ao buscar vagas'));
      })
    );
  }

  getVagasPorRecrutador(recrutadorId: number): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(`${this.apiUrl}/vagas/recrutador/${recrutadorId}`).pipe(
      map((vagas: Vaga[]) => { // Use map aqui também
        return vagas.map(vaga => ({
          ...vaga,
          id: Number(vaga.id), // Converte o ID para number
          dataPublicacao: new Date(vaga.dataPublicacao) // Converte a data
        }));
      }),
      catchError((error: any) => {
        console.error('Erro ao buscar vagas por recrutador:', error);
        return throwError(() => new Error('Erro ao buscar vagas por recrutador'));
      })
    );
  }
}
