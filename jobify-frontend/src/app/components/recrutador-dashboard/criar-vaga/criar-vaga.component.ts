import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VagaService } from '../../../services/vaga.service';
import { Vaga } from '../../../models/vaga';
import { ActivatedRoute, Router } from '@angular/router';
import { Recrutador } from '../../../models/recrutador';
import { switchMap, map } from 'rxjs';

@Component({
  selector: 'app-criar-vaga',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-vaga.component.html',
  styleUrls: ['./criar-vaga.component.css']
})
export class CriarVagaComponent {
  novaVaga: Vaga = {
    id: 0, // ou null, dependendo da sua API
    skills: [],
    titulo: '',
    descricao: '',
    empresa: '',
    localizacao: '',
    dataPublicacao: new Date(),
    tipo: '',
    recrutador: { id: 0, nome: '', email: '', empresa: '', senha: '' } // Precisa ser inicializado
  };
  recrutadorId: number | null = null;
  skillsTexto: string = '';

  constructor(
    private vagaService: VagaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => {
        if (id) {
          this.recrutadorId = id;
          return this.vagaService.getVagasPorRecrutador(id); // Ou outro método para obter dados do recrutador
        } else {
          // Lide com o caso em que o ID não é encontrado
          console.error("ID do recrutador não encontrado na URL");
          return []; // Retorna um array vazio para evitar erros no template
        }
      })
    ).subscribe(vagas => {
      // ... (opcional) faça algo com as vagas do recrutador, se necessário
    });
  }


  criarVaga() {
    if (this.recrutadorId) {
      this.novaVaga.skills = this.skillsTexto.split(',').map(skill => skill.trim());
      this.novaVaga.recrutador.id = this.recrutadorId; // Define o ID do recrutador na vaga
      this.vagaService.criarVaga(this.novaVaga).subscribe({
        next: vagaCriada => {
          // Redirecionar para o dashboard do recrutador após criar a vaga
          this.router.navigate(['/recrutador-dashboard', this.recrutadorId]);
        },
        error: error => {
          console.error('Erro ao criar vaga:', error);
          // Lidar com o erro, ex.: exibir uma mensagem para o usuário
        }
      });
    } else {
      console.error("Não é possível criar uma vaga sem um recrutador associado.");
    }

  }
}
