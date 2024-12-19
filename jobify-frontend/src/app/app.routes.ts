// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent),
    title: 'Jobify - Home'
  },
  {
    path: 'contato',
    loadComponent: () => import('./components/contato/contato.component').then(c => c.ContatoComponent),
    title: 'Jobify - Contato'
  },
  {
    path: 'procura-trabalho',
    loadComponent: () => import('./components/procura-trabalho/procura-trabalho.component').then(c => c.ProcuraTrabalhoComponent),
    title: 'Jobify - Procurar Trabalho'
  },
  {
    path: 'procura-candidatos',
    loadComponent: () => import('./components/procura-candidatos/procura-candidatos.component').then(c => c.ProcuraCandidatosComponent),
    title: 'Jobify - Procurar Candidatos'
  },
  {
    path: 'como-funciona',
    loadComponent: () => import('./components/como-funciona/como-funciona.component').then(c => c.ComoFuncionaComponent),
    title: 'Jobify - Como Funciona'
  },
  {
    path: 'blog',
    loadComponent: () => import('./components/blog/blog.component').then(c => c.BlogComponent),
    title: 'Jobify - Blog'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent),
    title: 'Jobify - Login'
  },
  {
    path: 'candidato-dashboard/:id', // Rota com parâmetro para o ID do candidato
    loadComponent: () => import('./components/candidato-dashboard/candidato-dashboard.component').then(c => c.CandidatoDashboardComponent),
    title: 'Jobify - Candidato Dashboard'
  },
  {
    path: 'recrutador-dashboard/:id', // Rota com parâmetro para o ID do recrutador
    loadComponent: () => import('./components/recrutador-dashboard/recrutador-dashboard.component').then(c => c.RecrutadorDashboardComponent),
    title: 'Jobify - Recrutador Dashboard'
  },
  {
    path: 'criar-vaga/:id', // :id é o parâmetro para o ID do recrutador
    loadComponent: () => import('./components/recrutador-dashboard/criar-vaga/criar-vaga.component').then(c => c.CriarVagaComponent),
    title: 'Jobify - Criar Vaga'
  },
  {
    path: 'gerenciar-candidaturas/:id', // :id é o parâmetro para o ID da vaga
    loadComponent: () => import('./components/recrutador-dashboard/gerenciar-candidaturas/gerenciar-candidaturas.component').then(c => c.GerenciarCandidaturasComponent),
    title: 'Jobify - Gerenciar Candidaturas'
  },
    //{
   // path: 'candidato/:id/editar',
   // loadComponent: () => import('./components/editar-candidato/editar-candidato.component').then(c => c.EditarCandidatoComponent),
   // title: 'Jobify - Editar Perfil'
  //},
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
