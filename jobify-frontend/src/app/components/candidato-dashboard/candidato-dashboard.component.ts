// candidato-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CandidatoService } from '../../services/candidato.service';
import { Candidato } from '../../models/candidato';

@Component({
  selector: 'app-candidato-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidato-dashboard.component.html',
  styleUrls: ['./candidato-dashboard.component.css']
})
export class CandidatoDashboardComponent implements OnInit {
  candidato: Candidato | undefined;

  constructor(
    private route: ActivatedRoute,
    private candidatoService: CandidatoService
  ) {}

  ngOnInit(): void {
    const candidatoId = Number(this.route.snapshot.paramMap.get('id'));

    if (candidatoId) {
      this.candidatoService.getCandidatoById(candidatoId).subscribe({
        next: (candidato) => {
          this.candidato = candidato;
        },
        error: (error) => {
          console.error('Erro ao buscar candidato:', error);
          // Implementar tratamento de erro
        }
      });
    }
  }


}
