// candidato.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidato } from '../models/candidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {
  private apiUrl = 'http://localhost:8080/api'; // URL da sua API Spring

  constructor(private http: HttpClient) { }

  getCandidatos(): Observable<Candidato[]> {
  return this.http.get<Candidato[]>(`${this.apiUrl}/candidatos`).pipe(
    catchError(error => {
      console.error('Erro ao buscar candidatos:', error);
      return throwError(() => new Error('Erro ao buscar candidatos')); // Ou retorne um observable de erro
    })
  );
}
}
