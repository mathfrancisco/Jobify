import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CandidaturaService } from '../../../services/candidatura.service'; // Certifique-se de ter este serviço
import { Candidatura } from '../../../models/candidatura'; // Importe a interface Candidatura
import { switchMap, map } from 'rxjs';

@Component({
  selector: 'app-gerenciar-candidaturas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gerenciar-candidaturas.component.html',
  styleUrls: ['./gerenciar-candidaturas.component.css']
})
export class GerenciarCandidaturasComponent implements OnInit {
  candidaturas: Candidatura[] = [];
  vagaId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private candidaturaService: CandidaturaService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => {
        this.vagaId = id;
        return this.candidaturaService.getCandidaturasPorVaga(id);
      })
    ).subscribe({
      next: (candidaturas) => {
        this.candidaturas = candidaturas;
      },
      error: (error) => {
        console.error('Erro ao buscar candidaturas:', error);
        // Trate o erro adequadamente, por exemplo, exibindo uma mensagem de erro
      }
    });
  }
  atualizarStatus(candidatura: Candidatura, novoStatus: string) {
    this.candidaturaService.atualizarCandidatura({ ...candidatura, status: novoStatus }).subscribe({
      next: (candidaturaAtualizada) => {
        // Atualize a candidatura na lista local
        const index = this.candidaturas.findIndex(c => c.id === candidaturaAtualizada.id);
        if (index !== -1) {
          this.candidaturas[index] = candidaturaAtualizada;
        }
      },
      error: (error) => {
        console.error('Erro ao atualizar status da candidatura:', error);
        // Exiba uma mensagem de erro para o usuário
      }
    });
  }
}
