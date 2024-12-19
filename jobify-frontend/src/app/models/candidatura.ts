import { Vaga } from './vaga';
import { Candidato } from './candidato';

export interface Candidatura {
  id?: number; // Opcional, dependendo se o backend retorna o ID na criação
  vaga: Vaga;
  candidato: Candidato;
  status: string;
  dataAplicacao: Date;
  skillstexto: String;
}
