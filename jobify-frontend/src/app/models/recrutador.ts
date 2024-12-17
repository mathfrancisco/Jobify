// recrutador.ts
export interface Recrutador {
  id: number;
  nome: string;
  email: string;
  empresa: string;
  // Adicione outras propriedades conforme necessário, seguindo o modelo do Candidato
  logo?: string; // URL da logo da empresa (opcional)
  descricao?: string; // Descrição da empresa (opcional)
  site?: string; // Site da empresa (opcional)
}
