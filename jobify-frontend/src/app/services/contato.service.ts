// contato.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = 'http://localhost:8080/api'; // URL da sua API Spring

  constructor(private http: HttpClient) { }

  enviarMensagem(mensagem: Mensagem): Observable<any> {
    return this.http.post(`${this.apiUrl}/contato`, mensagem);
  }
}