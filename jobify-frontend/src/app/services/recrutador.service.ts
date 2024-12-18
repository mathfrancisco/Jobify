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
  const url = `${this.apiUrl}/recrutadores/${id}`;
  return this.http.get<Recrutador>(url).pipe(
    map(recrutador => {  // Adicione map para conversão se necessário
      if (recrutador) {
        recrutador.id = Number(recrutador.id); // Converta o ID para number
        return recrutador;
      }
      return undefined;
    }),
    catchError((error: any) => {
      console.error('Erro ao buscar recrutador:', error);
      return of(undefined);
    })
  );
}

  getRecrutadorByEmail(email: string): Observable<Recrutador | undefined> {
    return this.http.get<Recrutador>(`${this.apiUrl}/recrutadores/email/${email}`).pipe(
      catchError(_ => of(undefined))
    );
  }
  
 atualizarRecrutador(recrutador: Recrutador): Observable<Recrutador | undefined> {
  recrutador.id = Number(recrutador.id); // Certifique-se de que o ID seja um number
  const url = `${this.apiUrl}/recrutadores/${recrutador.id}`;
    return this.http.put<Recrutador>(url, recrutador).pipe(
      map(recrutadorAtualizado => {
        if (recrutadorAtualizado) {
          return recrutadorAtualizado;
        } else {
          console.error("Não foi possível atualizar o recrutador.");
          return undefined; // Ou lance um erro, se preferir
        }
      }),
      catchError(error => {
        console.error('Erro ao atualizar recrutador:', error);
        return of(undefined); // Retorna undefined em caso de erro
      })
    );
  }
}
