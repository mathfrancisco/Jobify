// recrutador-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecrutadorService } from '../../services/recrutador.service';
import { Recrutador } from '../../models/recrutador';
import { Vaga } from '../../models/vaga';
import { VagaService } from '../../services/vaga.service';
import { Observable, of } from 'rxjs'; // Importe 'of'

@Component({
  selector: 'app-recrutador-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recrutador-dashboard.component.html',
  styleUrls: ['./recrutador-dashboard.component.css']
})
export class RecrutadorDashboardComponent implements OnInit {
  recrutador: Recrutador | undefined;
  vagas: Vaga[] = [];
  editandoPerfil = false;
  originalRecrutador: Recrutador | undefined;
  carregandoRecrutador = true;
  carregandoVagas = true;
  candidato$: Observable<Candidato | undefined> = of(undefined); // Inicialize com of(undefined)


  constructor(
    private route: ActivatedRoute,
    private recrutadorService: RecrutadorService,
    private vagaService: VagaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const recrutadorId = Number(this.route.snapshot.paramMap.get('id'));

    if (recrutadorId) {
      this.carregandoRecrutador = true;
      this.recrutadorService.getRecrutadorById(recrutadorId).subscribe({
        next: (recrutador) => {
          this.carregandoRecrutador = false;
          if (recrutador) {
            this.recrutador = recrutador;
            this.originalRecrutador = { ...recrutador };

            this.carregandoVagas = true;
            this.vagaService.getVagasPorRecrutador(this.recrutador.id).subscribe({
              next: (vagas) => {
                this.carregandoVagas = false;
                this.vagas = vagas;
              },
              error: (error) => {
                this.carregandoVagas = false;
                console.error('Erro ao buscar vagas:', error);
                // TODO: Implementar tratamento de erro (exibir mensagem, etc.)
              }
            });
          } else {
            console.error('Recrutador não encontrado.');
            // TODO: Implementar tratamento de erro (redirecionar, etc.)
          }
        },
        error: (error) => {
          this.carregandoRecrutador = false;
          console.error('Erro ao buscar recrutador:', error);
          // TODO: Implementar tratamento de erro (redirecionar, etc.)
        }
      });
    } else {
      console.error("ID do recrutador não encontrado na URL");
      // TODO: Implementar tratamento de erro (redirecionar, etc.)
    }
  }

  criarNovaVaga() {
    if (this.recrutador) {
      this.router.navigate(['/criar-vaga', this.recrutador.id]);
    } else {
      console.error("Recrutador não definido. Não é possível criar uma vaga.");
      // TODO: Implementar tratamento de erro
    }
  }

  editarPerfil() {
    this.editandoPerfil = !this.editandoPerfil; // Alterna o modo de edição
    if (!this.editandoPerfil && this.recrutador) { // Se estiver saindo do modo de edição
      this.recrutadorService.atualizarRecrutador(this.recrutador).subscribe(
        () => {
          // Sucesso ao atualizar
          if (this.recrutador) {
            this.originalRecrutador = { ...this.recrutador };
          }
        },
        (error) => {
          console.error('Erro ao atualizar:', error);
          // Lógica para lidar com o erro, como exibir uma mensagem para o usuário
        }
      );
    }
  }


  cancelarEdicao() {
    if (this.originalRecrutador && this.recrutador) {
      this.recrutador = { ...this.originalRecrutador };
      this.editandoPerfil = false;
    }
  }

  gerenciarCandidaturas(vagaId: number) {
    this.router.navigate(['/gerenciar-candidaturas', vagaId]);
  }
}
