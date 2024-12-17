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
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
