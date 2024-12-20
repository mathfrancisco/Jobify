// procura-trabalho.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vaga } from '../../models/vaga';
import { VagaService } from '../../services/vaga.service';
import {
  faClock,
  faMapMarkerAlt,
  faUserClock,
  faSearch,
  faBookmark,
  faArrowDown, faLaptopHouse, faBusinessTime, faMicrochip, faPalette, faBullhorn, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-procura-trabalho',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './procura-trabalho.component.html',
  styleUrls: ['./procura-trabalho.component.css']
})
export class ProcuraTrabalhoComponent implements OnInit, OnDestroy {
  vagas: Vaga[] = [];
  allVagasLoaded = false;
  faClock = faClock;
  faMapMarkerAlt = faMapMarkerAlt;
  faUserClock = faUserClock;
  faSearch = faSearch;
  faBookmark = faBookmark;
  faArrowDown = faArrowDown;

  popularFilters: string[] = [
    'Remote',
    'Full-time',
    'Tech',
    'Design',
    'Marketing'
  ];

  private destroy$ = new Subject<void>();
  paginaAtual = 0;
  tamanhoPagina = 10;

  constructor(private vagaService: VagaService) { }

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore() {
    this.vagaService.getVagas(this.paginaAtual, this.tamanhoPagina).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (vagas) => {
        if (vagas) {
          this.vagas = this.vagas.concat(vagas);
          if (vagas.length < this.tamanhoPagina) {
            this.allVagasLoaded = true;
          }
          this.paginaAtual++;
        } else {
          this.allVagasLoaded = true;
        }
      },
      error: (error) => {
        console.error('Erro ao carregar vagas:', error);
        alert('Ocorreu um erro ao carregar as vagas. Por favor, tente novamente mais tarde.');
      }
    });
  }

  applyNow(vaga: Vaga) {
    console.log('Applying for job:', vaga);
    if (vaga.linkAplicacao) {
      window.open(vaga.linkAplicacao, '_blank');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getFilterIcon(filter: string) {
    switch (filter) {
      case 'Remote':
        return faLaptopHouse;
      case 'Full-time':
        return faBusinessTime;
      case 'Tech':
        return faMicrochip;
      case 'Design':
        return faPalette;
      case 'Marketing':
        return faBullhorn;
      default:
        return faSearch; // Ícone padrão
    }
  }

  protected readonly faArrowRight = faArrowRight;
}
