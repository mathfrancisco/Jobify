// procura-candidatos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidato } from '../../models/candidato';
import { CandidatoService } from '../../services/candidato.service';
import {
  faSearch,
  faLocationDot,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-procura-candidatos',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './procura-candidatos.component.html',
  styleUrls: ['./procura-candidatos.component.css']
})
export class ProcuraCandidatosComponent implements OnInit {
  candidatos: Candidato[] = [];
  allCandidatosLoaded = false;
  faSearch = faSearch;
  faLocationDot = faLocationDot;
  faArrowDown = faArrowDown;

  constructor(private candidatoService: CandidatoService) { }

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore() {
    this.candidatoService.getCandidatos().subscribe({
      next: (candidatos) => {
        this.candidatos = this.candidatos.concat(candidatos);
        if (candidatos.length === 0) {
          this.allCandidatosLoaded = true;
        }
      },
      error: (error) => {
        console.error('Error loading candidates:', error);
        // Implement error handling/notification
      }
    });
  }
}
