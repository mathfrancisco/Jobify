export interface Candidato {
  id: number;
  nome: string;
  email: string;
  habilidades: string[]; // Array de strings para as habilidades
  cargo: string;
  foto?: string; // Propriedade opcional para a foto
  curriculo?: string; // Propriedade opcional para o link do currículo
  senha: string;
}
