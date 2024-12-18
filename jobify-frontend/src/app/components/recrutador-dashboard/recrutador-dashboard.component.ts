// recrutador-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecrutadorService } from '../../services/recrutador.service';
import { Recrutador } from '../../models/recrutador';
import { Vaga } from '../../models/vaga';
import { VagaService } from '../../services/vaga.service';
import { Observable, of, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-recrutador-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recrutador-dashboard.component.html',
  styleUrls: ['./recrutador-dashboard.component.css']
})
export class RecrutadorDashboardComponent implements OnInit {
  recrutador$: Observable<Recrutador | undefined> = of(undefined);
  vagas$: Observable<Vaga[]> = of([]);
  editandoPerfil = false;
  recrutadorOriginal: Recrutador | undefined; // Para armazenar os dados originais

  constructor(
    private route: ActivatedRoute,
    private recrutadorService: RecrutadorService,
    private vagaService: VagaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recrutador$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => {
        if (id) {
          return this.recrutadorService.getRecrutadorById(id);
        } else {
          console.error("ID do recrutador não encontrado na URL");
          return of(undefined);
        }
      })
    );

    this.vagas$ = this.recrutador$.pipe(
      switchMap(recrutador => {
        if (recrutador) {
          return this.vagaService.getVagasPorRecrutador(recrutador.id);
        } else {
          return of([]);
        }
      })
    );

    // Armazena os dados originais do recrutador quando o observable emitir um valor
    this.recrutador$.subscribe(recrutador => {
      if (recrutador) {
        this.recrutadorOriginal = { ...recrutador };
      }
    });
  }

  criarNovaVaga() {
    this.recrutador$.subscribe(recrutador => {
      if (recrutador) {
        this.router.navigate(['/criar-vaga', recrutador.id]); // Corrigido: usar recrutador.id
      } else {
        console.error("Recrutador não definido. Não é possível criar uma vaga.");
      }
    });
  }

  editarPerfil() {
    this.editandoPerfil = true;
  }

  salvarAlteracoes(recrutador: Recrutador) {
    this.recrutadorService.atualizarRecrutador(recrutador).subscribe({
      next: recrutadorAtualizado => {
        if (recrutadorAtualizado) {
          this.recrutador$ = of(recrutadorAtualizado);
          this.recrutadorOriginal = { ...recrutadorAtualizado }; // Atualiza o original
          this.editandoPerfil = false;
        } else {
          console.error("Não foi possível atualizar o recrutador.");
        }
      },
      error: error => {
        console.error('Erro ao atualizar recrutador:', error);
      }
    });
  }

  cancelarEdicao() {
    if (this.recrutadorOriginal) {
      this.recrutador$ = of({ ...this.recrutadorOriginal }); // Restaura os dados originais
    }
    this.editandoPerfil = false;
  }

  gerenciarCandidaturas(vagaId: number) {
    this.router.navigate(['/gerenciar-candidaturas', vagaId]);
  }
}
