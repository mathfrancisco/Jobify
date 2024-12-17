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
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private candidatoService: CandidatoService,
    private recrutadorService: RecrutadorService
  ) {}

  login() {
    this.errorMessage = '';

    if (this.tipoUsuario === 'candidato') {
      this.candidatoService.getCandidatoByEmail(this.email).subscribe({
        next: (candidato) => {
          if (candidato && candidato.senha === this.password) {
            const candidatoId = Number(candidato.id); // Converte para number
            this.router.navigate(['/candidato-dashboard', candidatoId]);
          } else {
            this.errorMessage = 'Email ou senha inválidos.';
          }
        },
        error: (error) => {
          console.error('Erro ao buscar candidato:', error);
          this.errorMessage = 'Erro ao fazer login.';
        }
      });
    } else { // Recrutador
      this.recrutadorService.getRecrutadorByEmail(this.email).subscribe({
        next: (recrutador) => {
          if (recrutador && recrutador.senha === this.password) {
            const recrutadorId = Number(recrutador.id)
            this.router.navigate(['/recrutador-dashboard', recrutador.id]); // Passa o ID do recrutador
          } else {
            this.errorMessage = 'Email ou senha inválidos.';
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
