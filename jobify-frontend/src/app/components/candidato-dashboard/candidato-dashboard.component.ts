// candidato-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Importe o Router
import { CandidatoService } from '../../services/candidato.service';
import { Candidato } from '../../models/candidato';
import { Observable, of, switchMap, combineLatest } from 'rxjs';
import { VagaService } from '../../services/vaga.service';
import { Vaga } from '../../models/vaga';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Injete o Router
    private candidatoService: CandidatoService,
    private vagaService: VagaService
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
        this.vagaService.getVagas().subscribe(vagas => {
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
    // Lógica para candidatar-se à vaga
    console.log(`Candidatar-se à vaga ${vaga.titulo}`);

    this.candidato$.subscribe(candidato => {
      if (candidato) {
        // Simular a criação de uma candidatura (substitua pela lógica real)
        const novaCandidatura: Candidatura = {
          vaga: vaga,
          status: 'Em análise',
          dataAplicacao: new Date()
        };
        this.candidaturas.push(novaCandidatura);
      }
    });
  }
}
