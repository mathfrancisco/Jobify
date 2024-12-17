// recrutador-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecrutadorService } from '../../services/recrutador.service';
import { Recrutador } from '../../models/recrutador';
import { Vaga } from '../../models/vaga'; // Importe o modelo Vaga
import { VagaService } from '../../services/vaga.service'; // Importe o VagaService
import { Observable, map } from 'rxjs'; // Importe o Observable




@Component({
  selector: 'app-recrutador-dashboard',
  standalone: true,
  imports: [CommonModule], // Importe o CommonModule
  templateUrl: './recrutador-dashboard.component.html',
  styleUrls: ['./recrutador-dashboard.component.css'] // Adicione os estilos
})
export class RecrutadorDashboardComponent implements OnInit {
  recrutador: Recrutador | undefined;
  vagas: Vaga[] = []; // Array para armazenar as vagas do recrutador

  constructor(
    private route: ActivatedRoute,
    private recrutadorService: RecrutadorService,
    private vagaService: VagaService // Injete o VagaService
  ) {}

  ngOnInit(): void {
    const recrutadorId = Number(this.route.snapshot.paramMap.get('id'));

    if (recrutadorId) {
      this.recrutadorService.getRecrutadorById(recrutadorId).subscribe({
        next: (recrutador) => {
          if (recrutador) { // Verifica se recrutador não é undefined
            this.recrutador = recrutador;

            // Buscar as vagas do recrutador (agora dentro do if)
            this.vagaService.getVagasPorRecrutador(this.recrutador.id).subscribe({
              next: (vagas) => {
                this.vagas = vagas;
              },
              error: (error) => {
                console.error('Erro ao buscar vagas:', error);
                // Implementar tratamento de erro
              }
            });
          } else {
            // Tratar o caso em que o recrutador não é encontrado
            console.error('Recrutador não encontrado.');
            // Exibir uma mensagem de erro, redirecionar, etc.
          }
        },
        error: (error) => {
          console.error('Erro ao buscar recrutador:', error);
          // Implementar tratamento de erro
        }
      });
    }
  }
}
