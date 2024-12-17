// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CandidatoService } from '../../services/candidato.service'; // Importe o serviço
import { RecrutadorService } from '../../services/recrutador.service'; // Importe o serviço
import { Candidato } from '../../models/candidato';
import { Recrutador } from '../../models/recrutador'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  tipoUsuario: 'candidato' | 'recrutador' = 'candidato';
  email = ''; // Variável para o email
  password = ''; // Variável para a senha
  errorMessage = ''; // Variável para exibir mensagens de erro

  constructor(
    private router: Router,
    private candidatoService: CandidatoService,
    private recrutadorService: RecrutadorService
  ) {}

  login() {
    this.errorMessage = ''; // Limpa a mensagem de erro

    if (this.tipoUsuario === 'candidato') {
      this.candidatoService.getCandidatoByEmail(this.email).subscribe({
        next: (candidato: Candidato | undefined) => {
          if (candidato) { // Verifica se o candidato existe
            // Aqui você deve comparar a senha fornecida com a senha do candidato (se armazenada)
            // Por simplicidade, vamos assumir que a senha está correta
            this.router.navigate(['/candidato-dashboard', candidato.id]); // Navega para a página do candidato com o ID
          } else {
            this.errorMessage = 'Candidato não encontrado.';
          }
        },
        error: (error) => {
          console.error('Erro ao buscar candidato:', error);
          this.errorMessage = 'Erro ao fazer login.';
        }
      });
    } else { // Recrutador
      this.recrutadorService.getRecrutadorByEmail(this.email).subscribe({
        next: (recrutador: Recrutador | undefined) => {
          if (recrutador) {
            // Mesma lógica de comparação de senha que para o candidato
            this.router.navigate(['/recrutador-dashboard', recrutador.id]);
          } else {
            this.errorMessage = 'Recrutador não encontrado.';
          }
        },
        error: (error) => {
          console.error('Erro ao buscar recrutador:', error);
          this.errorMessage = 'Erro ao fazer login.';
        }
      });
    }
  }
}
