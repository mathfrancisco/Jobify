// criar-vaga.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VagaService } from '../../../services/vaga.service';
import { Vaga } from '../../../models/vaga';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidatura } from '../../../models/candidatura'; // Importe a interface Recrutador
import { switchMap, map, of, catchError } from 'rxjs';

@Component({
  selector: 'app-criar-vaga',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-vaga.component.html',
  styleUrls: ['./criar-vaga.component.css']
})
export class CriarVagaComponent implements OnInit {
  novaVaga: Vaga = {
    id: 0,
    skills: [],
    titulo: '',
    descricao: '',
    empresa: '',
    localizacao: '',
    dataPublicacao: new Date(),
    tipo: '',
    recrutador: { id: 0, nome: '', email: '', empresa: '', senha: '' },
    logo: '', // Inicialize logo e linkAplicacao
    linkAplicacao: ''
  };
  recrutadorId!: number; // Remova a inicialização nula
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
        if (isNaN(id)) {
          console.error("ID do recrutador inválido.");
          this.router.navigate(['/']); // Redireciona para a página inicial ou de erro
          return of(null);
        }
        this.recrutadorId = id;
        this.novaVaga.recrutador.id = this.recrutadorId; // Define o ID do recrutador imediatamente
        return of(null); // Não precisa retornar nada aqui, já que só precisamos do ID
      })
    ).subscribe(); // Não precisa fazer nada na inscrição
  }

  criarVaga() {
    if (!this.recrutadorId) { // Verifica se o recrutadorId foi definido
      console.error("Recrutador não definido. Não é possível criar a vaga.");
      return; // Impede a criação da vaga sem recrutador
    }

    this.novaVaga.skills = this.skillsTexto.split(',').map(skill => skill.trim());
    this.vagaService.criarVaga(this.novaVaga).subscribe({
      next: () => {
        this.router.navigate(['/recrutador', this.recrutadorId, 'dashboard']);
      },
      error: error => {
        console.error('Erro ao criar vaga:', error);
        // Lidar com o erro, ex.: exibir uma mensagem para o usuário
      }
    });
  }

  voltar(): void {
    if (this.recrutadorId) {
      this.router.navigate(['/recrutador', this.recrutadorId, 'dashboard']);
    } else {
      this.router.navigate(['/']); // Ou outra rota padrão
    }
  }

  cancelar() {
    this.voltar(); // Reutiliza o método voltar()
  }
}

