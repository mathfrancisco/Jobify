// candidato-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CandidatoService } from '../../services/candidato.service';
import { Candidato } from '../../models/candidato';
import { Observable,of, map } from 'rxjs';

interface Candidatura { // Nova interface
  vaga: { titulo: string };
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
  // Mock data for Vagas and Vagas Recomendadas
  vagas: any[] = [
    { titulo: 'Desenvolvedor Front-end', empresa: 'Empresa A', localizacao: 'Remoto' },
    { titulo: 'Engenheiro de Software', empresa: 'Empresa B', localizacao: 'São Paulo' },
    { titulo: 'Analista de Dados', empresa: 'Empresa C', localizacao: 'Rio de Janeiro' },
    { titulo: 'Especialista em UX/UI', empresa: 'Empresa D', localizacao: 'Belo Horizonte' },
    { titulo: 'Desenvolvedor Mobile', empresa: 'Empresa E', localizacao: 'Porto Alegre' }
  ];

  vagasRecomendadas: any[] = [
    { titulo: 'Desenvolvedor Full-stack', empresa: 'Empresa F', localizacao: 'Remoto' },
    { titulo: 'Especialista em Angular', empresa: 'Empresa G', localizacao: 'São Paulo' },
    { titulo: 'Arquiteto de Software', empresa: 'Empresa H', localizacao: 'Rio de Janeiro' },
    { titulo: 'Cientista de Dados', empresa: 'Empresa I', localizacao: 'Campinas' },
    { titulo: 'DevOps Engineer', empresa: 'Empresa J', localizacao: 'Florianópolis' }

  ];
   candidaturas: Candidatura[] = [ // Dados mockados
    { vaga: { titulo: 'Desenvolvedor Front-end' }, status: 'Em análise', dataAplicacao: new Date() },
    { vaga: { titulo: 'Engenheiro de Software' }, status: 'Entrevista agendada', dataAplicacao: new Date() },
  ];

   editarPerfil() {
    // Lógica para editar o perfil (navegar para uma página de edição, abrir um modal, etc.)
    console.log("Editar perfil..."); // Placeholder
  }

  constructor(
    private route: ActivatedRoute,
    private candidatoService: CandidatoService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap; // Use snapshot.paramMap
    const candidatoIdString = routeParams.get('id'); // Recupere o ID como string
    console.log("candidatoIdString:", candidatoIdString); // Debug

    if (candidatoIdString) {
      const candidatoId = Number(candidatoIdString); // Converta para número APENAS se existir
      console.log("candidatoId:", candidatoId); // Debug
      this.candidato$ = this.candidatoService.getCandidatoById(candidatoId);
    } else {
      console.error("ID do candidato não encontrado na rota.");
    }
  }
}
