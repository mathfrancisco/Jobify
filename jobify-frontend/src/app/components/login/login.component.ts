// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CandidatoService } from '../../services/candidato.service';
import { RecrutadorService } from '../../services/recrutador.service';
import { Candidato } from '../../models/candidato';
import { Recrutador } from '../../models/recrutador';

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
          if (!candidato) {
            this.errorMessage = 'Email não encontrado.';
            return;
          }
          if (candidato.senha !== this.password) {
            this.errorMessage = 'Senha incorreta.';
            return;
          }
          this.router.navigate(['/candidato-dashboard', candidato.id]);
        },
        error: (error) => {
          console.error('Erro ao buscar candidato:', error);
          this.errorMessage = 'Erro ao fazer login.';
        }
      });
    } else { // Recrutador
      this.recrutadorService.getRecrutadorByEmail(this.email).subscribe({
        next: (recrutador) => {
          if (!recrutador) {
            this.errorMessage = 'Email não encontrado.';
            return;
          }
          if (recrutador.senha !== this.password) {
            this.errorMessage = 'Senha incorreta.';
            return;
          }
          const recrutadorId: number = Number(recrutador.id);
          this.router.navigate(['/recrutador-dashboard', recrutadorId]);
        },
        error: (error) => {
          console.error('Erro ao buscar recrutador:', error);
          this.errorMessage = 'Erro ao fazer login.';
        }
      });
    }
  }
}
