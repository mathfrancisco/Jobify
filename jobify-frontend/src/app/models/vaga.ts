// vaga.ts
import { Recrutador } from './recrutador'; // Importe a interface Recrutador

export interface Vaga {
  id: number;
  skills: string[];
  titulo: string;
  descricao: string;
  empresa: string;
  localizacao: string;
  dataPublicacao: Date;
  tipo: string;
  logo?: string;
  linkAplicacao?: string;
  recrutador: Recrutador; // Adicione o campo recrutador
}

