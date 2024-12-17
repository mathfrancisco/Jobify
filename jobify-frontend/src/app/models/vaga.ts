// vaga.ts

import {NgIterable} from '@angular/core';

export interface Vaga {
  skills: (NgIterable<unknown> & NgIterable<any>) | undefined | null;
  titulo: string;
  descricao: string;
  empresa: string;
  localizacao: string;
  dataPublicacao: Date;
  tipo: string;
  logo?: string;
  linkAplicacao?: string;
}



