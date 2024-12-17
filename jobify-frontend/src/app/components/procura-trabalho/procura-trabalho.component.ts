// procura-trabalho.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vaga } from '../../models/vaga';
import { VagaService } from '../../services/vaga.service';
import {
  faClock,
  faMapMarkerAlt,
  faUserClock,
  faSearch,
  faBookmark,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-procura-trabalho',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './procura-trabalho.component.html',
  styleUrls: ['./procura-trabalho.component.css']
})
export class ProcuraTrabalhoComponent implements OnInit {
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

  constructor(private vagaService: VagaService) { }

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore() {
    this.vagaService.getVagas().subscribe({
      next: (vagas) => {
        this.vagas = this.vagas.concat(vagas);
        if (vagas.length === 0) {
          this.allVagasLoaded = true;
        }
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
        // Implement error handling/notification
      }
    });
  }

  applyNow(vaga: Vaga) {
    console.log('Applying for job:', vaga);
    if (vaga.linkAplicacao) {
      window.open(vaga.linkAplicacao, '_blank');
    }
  }
}
