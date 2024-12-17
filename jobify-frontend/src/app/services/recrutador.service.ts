// recrutador.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs'; // Importa o map
import { Recrutador } from '../models/recrutador';

@Injectable({
  providedIn: 'root'
})
export class RecrutadorService {
  private apiUrl = 'http://localhost:8080/api'; // URL da sua API

  constructor(private http: HttpClient) { }

  getRecrutadorById(id: number): Observable<Recrutador | undefined> {
    return this.http.get<Recrutador>(`${this.apiUrl}/recrutadores/${id}`).pipe(
      catchError((error: any) => {
        console.error('Erro ao buscar recrutador:', error);
        return of(undefined); // Retorna undefined em caso de erro
      })
    );
  }

  getRecrutadorByEmail(email: string): Observable<Recrutador | undefined> {
    return this.http.get<Recrutador[]>(`${this.apiUrl}/recrutadores`).pipe(
      map(recrutadores => recrutadores.find(r => r.email === email)),
      catchError(_ => of(undefined))
    );
  }

  // ... outros métodos do serviço
}
