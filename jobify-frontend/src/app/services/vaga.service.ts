// vaga.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, catchError, throwError, map, of} from 'rxjs'; // Importe o 'map'
import { Vaga } from '../models/vaga';

@Injectable({
  providedIn: 'root'
})
export class VagaService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getVagas(paginaAtual: number, tamanhoPagina: number): Observable<Vaga[]> {
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

  criarVaga(vaga: Vaga): Observable<Vaga> {
    // Converter o array de strings de habilidades para uma única string separada por vírgulas
    const skillsString = vaga.skills.join(',');
    const vagaData = { ...vaga, skills: skillsString }; // Cria um novo objeto com a string de skills

    return this.http.post<Vaga>(`${this.apiUrl}/vagas`, vagaData).pipe(
      map(vagaCriada => ({
        ...vagaCriada,
        id: Number(vagaCriada.id),
        dataPublicacao: new Date(vagaCriada.dataPublicacao)
      })),
      catchError(error => {
        console.error('Erro ao criar vaga:', error);
        return throwError(() => new Error('Erro ao criar vaga.'));
      })
    );
  }
  getVagaById(id: number): Observable<Vaga | undefined> {
    return this.http.get<Vaga>(`${this.apiUrl}/vagas/${id}`).pipe(
      map(vaga => ({ ...vaga, id: Number(vaga.id), dataPublicacao: new Date(vaga.dataPublicacao) })),
      catchError(error => {
        console.error('Erro ao buscar vaga por ID:', error);
        return of(undefined); // Retorna undefined se a vaga não for encontrada
      })
    );
  }
}
