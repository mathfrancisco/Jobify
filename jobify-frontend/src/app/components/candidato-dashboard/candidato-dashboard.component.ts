// candidato-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatoService } from '../../services/candidato.service';
import { Candidato } from '../../models/candidato';
import {Observable, of, switchMap, withLatestFrom, map, catchError, combineLatest} from 'rxjs';
import { VagaService } from '../../services/vaga.service';
import { Vaga } from '../../models/vaga';
import { CandidaturaService } from '../../services/candidatura.service';
import { Candidatura } from '../../models/candidatura';

@Component({
  selector: 'app-candidato-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidato-dashboard.component.html',
  styleUrls: ['./candidato-dashboard.component.css']
})
export class CandidatoDashboardComponent implements OnInit {
  candidato$: Observable<Candidato | undefined> = of(undefined);
  vagas: Vaga[] = [];
  vagasRecomendadas: Vaga[] = [];
  candidaturas: Candidatura[] = [];
  paginaAtual = 0;
  tamanhoPagina = 10;
  carregandoCandidatura: { [vagaId: number]: boolean } = {};
  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null; // Nova variável para mensagens de erro


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidatoService: CandidatoService,
    private vagaService: VagaService,
    private candidaturaService: CandidaturaService
  ) { }

  ngOnInit(): void {
    this.candidato$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => {
        if (id) {
          return this.candidatoService.getCandidatoById(id);
        } else {
          // Lide com o caso em que o ID não é encontrado.  Talvez redirecione para uma página de erro?
          console.error("ID do candidato não encontrado na URL");
          return of(undefined);
        }
      })
    );

    this.candidato$.subscribe(candidato => {
      if (candidato) {
        this.carregarDados(candidato.id);
      }
    });
  }

  carregarDados(candidatoId: number) {
    // Use combineLatest para buscar vagas e candidaturas em paralelo
    combineLatest([
      this.vagaService.getVagas(this.paginaAtual, this.tamanhoPagina),
      this.candidaturaService.getCandidaturasPorCandidato(candidatoId)
    ]).pipe(
      catchError(error => {
        console.error('Erro ao carregar dados:', error);
        this.mensagemErro = 'Erro ao carregar dados.'; // Define a mensagem de erro
        return of([[], []]); // Retorna arrays vazios para evitar erros no template
      })
    ).subscribe(([vagas, candidaturas]) => {
      this.vagas = vagas;
      this.candidaturas = candidaturas;

      // Recomenda vagas apenas se houver um candidato
      this.candidato$.subscribe(candidato => {
        if (candidato) {
          this.vagasRecomendadas = this.vagas.filter(vaga =>
            vaga.skills.some(skill => candidato.habilidades.includes(skill))
          );
        }
      });
    });
  }

  editarPerfil() {
    this.candidato$.subscribe(candidato => {
      if (candidato) {
        this.router.navigate(['/candidato', candidato.id, 'editar']);
      }
    });
  }

  candidatarSe(vaga: Vaga) {
    this.carregandoCandidatura[vaga.id] = true;
    this.mensagemErro = null; // Limpa a mensagem de erro

    of(vaga).pipe(
      withLatestFrom(this.candidato$)
    ).subscribe(([vaga, candidato]) => {
      if (candidato) {
        const novaCandidatura: Candidatura = {
          vaga: vaga,
          candidato: candidato,
          status: 'Em análise',
          dataAplicacao: new Date(),
          skillstexto: vaga.skills.join(', ')
        };

        this.candidaturaService.criarCandidatura(novaCandidatura).subscribe({
          next: (candidaturaCriada) => {
            this.candidaturas.push(candidaturaCriada);
            this.carregandoCandidatura[vaga.id] = false;
            this.mensagemSucesso = `Candidatura para ${vaga.titulo} enviada com sucesso!`;
            setTimeout(() => this.mensagemSucesso = null, 5000);
          },
          error: (error) => {
            console.error('Erro ao criar candidatura:', error);
            this.carregandoCandidatura[vaga.id] = false;
            this.mensagemErro = 'Erro ao criar candidatura.'; // Define a mensagem de erro
          }
        });
      }
    });
  }
}
