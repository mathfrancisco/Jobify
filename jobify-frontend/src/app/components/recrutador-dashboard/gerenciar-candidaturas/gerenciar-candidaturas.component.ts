// gerenciar-candidaturas.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidaturaService } from '../../../services/candidatura.service';
import { Candidatura } from '../../../models/candidatura';
import { VagaService } from '../../../services/vaga.service';
import { Vaga } from '../../../models/vaga';
import {switchMap, map, catchError, of, tap} from 'rxjs';


@Component({
  selector: 'app-gerenciar-candidaturas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gerenciar-candidaturas.component.html',
  styleUrls: ['./gerenciar-candidaturas.component.css']
})
export class GerenciarCandidaturasComponent implements OnInit {
  candidaturas: Candidatura[] = [];
  vaga: Vaga | undefined; // Variável para armazenar a vaga
  vagaId!: number;
  showConfirmModal = false; // Variável para controlar a exibição do modal
  candidaturaSelecionada: Candidatura | undefined; // Candidatura selecionada para alteração de status
  novoStatus: string | undefined; // Novo status a ser aplicado


  constructor(
    private route: ActivatedRoute,
    private candidaturaService: CandidaturaService,
    private vagaService: VagaService, // Injete o VagaService
    private router: Router // Injete o Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => {
        if (isNaN(id)) { // Verifica se o ID é um número válido
          console.error("ID da vaga inválido.");
          // Redireciona para o dashboard ou outra página de erro
          this.router.navigate(['/recrutador-dashboard']); // Importe o Router
          return of(null);
        }

        this.vagaId = id;
        return this.vagaService.getVagaById(id).pipe( // Use getVagaById
          tap(vaga => this.vaga = vaga), // Define a vaga se encontrada
          switchMap(vaga => {
            if (vaga) { // Só busca candidaturas se a vaga existir
              return this.candidaturaService.getCandidaturasPorVaga(id);
            } else {
              return of([]); // Retorna um array vazio se a vaga não for encontrada
            }
          }),
          catchError(error => {
            console.error('Erro ao buscar vaga ou candidaturas:', error);
            // Trate o erro, por exemplo, exibindo uma mensagem
            return of([]);
          })
        );
      })
    ).subscribe(candidaturas => this.candidaturas = candidaturas ?? []); // Define candidaturas como um array vazio se for null
  }

  voltar(): void {
    this.router.navigate(['/recrutador', this.vaga?.recrutador, 'dashboard']); // Navega de volta para o dashboard do recrutador
  }

  atualizarStatus(candidatura: Candidatura, novoStatus: string): void {
    this.candidaturaSelecionada = candidatura;
    this.novoStatus = novoStatus;
    this.showConfirmModal = true; // Exibe o modal de confirmação
  }

  confirmarAlteracaoStatus() {
    this.showConfirmModal = false; // Fecha o modal

    if (this.candidaturaSelecionada && this.novoStatus) {
      const candidaturaAtualizada = { ...this.candidaturaSelecionada, status: this.novoStatus };

      this.candidaturaService.atualizarCandidatura(candidaturaAtualizada).subscribe({
        next: () => {
          // Atualiza a candidatura na lista local
          const index = this.candidaturas.findIndex(c => c.id === this.candidaturaSelecionada!.id);
          if (index !== -1) {
            this.candidaturas[index] = candidaturaAtualizada;
          }
        },
        error: (error) => {
          console.error('Erro ao atualizar status da candidatura:', error);
          // Lide com o erro adequadamente
        }
      });
    }
  }
}
