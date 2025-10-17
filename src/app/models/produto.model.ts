export interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagemUrl: string;
  tipo: 'brasileirao' | 'europa';
}
