// procura-candidatos.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidato } from '../../models/candidato';
import { CandidatoService } from '../../services/candidato.service';
import {
  faSearch,
  faLocationDot,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-procura-candidatos',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './procura-candidatos.component.html',
  styleUrls: ['./procura-candidatos.component.css']
})
export class ProcuraCandidatosComponent implements OnInit, OnDestroy {
  candidatos: Candidato[] = [];
  allCandidatosLoaded = false;
  faSearch = faSearch;
  faLocationDot = faLocationDot;
  faArrowDown = faArrowDown;
  private destroy$ = new Subject<void>();
  paginaAtual = 0; // Para paginação
  tamanhoPagina = 10; // Para paginação

  constructor(private candidatoService: CandidatoService) { }

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore() {
    this.candidatoService.getCandidatos(this.paginaAtual, this.tamanhoPagina).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (candidatos) => {
        if (candidatos) { // Verifica se candidatos não é null
          this.candidatos = this.candidatos.concat(candidatos);
          if (candidatos.length < this.tamanhoPagina) {
            this.allCandidatosLoaded = true;
          }
          this.paginaAtual++; // Incrementa a página para a próxima chamada
        } else {
          this.allCandidatosLoaded = true; // Define como true se a resposta for null, indicando que não há mais dados.
        }
      },
      error: (error) => {
        console.error('Erro ao carregar candidatos:', error);
        // Exibir uma mensagem de erro para o usuário
        alert('Ocorreu um erro ao carregar os candidatos. Por favor, tente novamente mais tarde.');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
