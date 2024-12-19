// candidato-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Importe o Router
import { CandidatoService } from '../../services/candidato.service';
import { Candidato } from '../../models/candidato';
import {Observable, of, switchMap, combineLatest, map} from 'rxjs';
import { VagaService } from '../../services/vaga.service';
import { Vaga } from '../../models/vaga';
import { CandidaturaService } from '../../services/candidatura.service'; // Importe o serviço
import { Candidatura } from '../../models/candidatura'; 

interface Candidatura {
  vaga: Vaga;
  status: string;
  dataAplicacao: Date;
}

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
  carregandoCandidatura: { [vagaId: number]: boolean } = {}; // Para controlar o loading por vaga
  mensagemSucesso: string | null = null; // Para exibir a mensagem de sucesso


  constructor(
    private route: ActivatedRoute,
    private router: Router, // Injete o Router
    private candidatoService: CandidatoService,
    private vagaService: VagaService,
    private candidaturaService: CandidaturaService
  ) {}

  ngOnInit(): void {
    this.candidato$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => {
        if (id) {
          return this.candidatoService.getCandidatoById(id);
        } else {
          console.error("ID do candidato não encontrado na rota.");
          return of(undefined);
        }
      })
    );

    // Buscar vagas e candidaturas
    this.candidato$.subscribe(candidato => {
      if (candidato) {
        // Buscar todas as vagas
        this.vagaService.getVagas(this.paginaAtual, this.tamanhoPagina).subscribe(vagas => {
          this.vagas = vagas;

          // Simular a busca de candidaturas (substitua pela lógica real)
          this.candidaturas = this.vagas.slice(0, 2).map(vaga => ({
            vaga: vaga,
            status: ['Em análise', 'Entrevista agendada', 'Aprovado', 'Rejeitado'][Math.floor(Math.random() * 4)],
            dataAplicacao: new Date()
          }));

          // Recomendar vagas com base nas habilidades do candidato (substitua pela lógica real)
          this.vagasRecomendadas = this.vagas.filter(vaga =>
            vaga.skills.some(skill => candidato.habilidades.includes(skill))
          );
        });


      }
    });
  }

  editarPerfil() {
    this.candidato$.subscribe(candidato => {
      if (candidato) {
        // Navegar para a página de edição de perfil, passando o ID do candidato
        this.router.navigate(['/candidato', candidato.id, 'editar']);
      }
    });
  }

  candidatarSe(vaga: Vaga) {
    this.carregandoCandidatura[vaga.id] = true; // Inicia o loading
    this.candidato$.subscribe(candidato => {
      if (candidato) {
        const novaCandidatura: Candidatura = {
          vaga: vaga,
          candidato: candidato, // Associe o candidato à candidatura
          status: 'Em análise',
          dataAplicacao: new Date(),
          skillstexto: vaga.skills.join(', ')
        };

         this.candidaturaService.criarCandidatura(novaCandidatura).subscribe({
          next: (candidaturaCriada) => {
            console.log('Candidatura criada com sucesso:', candidaturaCriada);
            this.candidaturas.push(candidaturaCriada); // Atualiza a lista local
            this.carregandoCandidatura[vaga.id] = false; // Para o loading
            this.mensagemSucesso = `Candidatura para ${vaga.titulo} enviada com sucesso!`; // Define a mensagem de sucesso
         setTimeout(() => {
              this.mensagemSucesso = null; // Limpa a mensagem após um tempo
            }, 5000); // 5 segundos
          },
          error: (error) => {
            console.error('Erro ao criar candidatura:', error);
            this.carregandoCandidatura[vaga.id] = false; // Para o loading
            // Exibir uma mensagem de erro para o usuário
          }
        });
      }
    });
  }
}
