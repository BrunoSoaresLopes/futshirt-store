import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model'; // Verifica se o caminho está correto

@Injectable({
  providedIn: 'root' // Essencial para a injeção funcionar
})
export class ProdutoService { // <-- Nome da classe aqui é ProdutoService

  // Lista estática de dados fictícios (mock objects)
  private produtos: Produto[] = [
    // Brasileirão
    { id: 1, nome: 'Santos', preco: 350.00, imagemUrl: 'assets/images/camisas/br/santos.png', tipo: 'brasileirao' },
    { id: 2, nome: 'Atlético Mineiro', preco: 320.00, imagemUrl: 'assets/images/camisas/br/atletico.png', tipo: 'brasileirao' },
    { id: 3, nome: 'Cruzeiro', preco: 175.00, imagemUrl: 'assets/images/camisas/br/cruzeiro.png', tipo: 'brasileirao' /*, precoAntigo: 200.00 */ },
    { id: 4, nome: 'Flamengo', preco: 300.00, imagemUrl: 'assets/images/camisas/br/flamengo.png', tipo: 'brasileirao' },
    { id: 5, nome: 'Botafogo', preco: 180.00, imagemUrl: 'assets/images/camisas/br/botafogo.png', tipo: 'brasileirao' /*, precoAntigo: 250.00 */ },
    { id: 6, nome: 'Fluminense', preco: 150.00, imagemUrl: 'assets/images/camisas/br/fluminense.png', tipo: 'brasileirao' },
    { id: 7, nome: 'Vasco', preco: 180.00, imagemUrl: 'assets/images/camisas/br/vasco.png', tipo: 'brasileirao' /*, precoAntigo: 200.00 */ },
    { id: 8, nome: 'Internacional', preco: 240.00, imagemUrl: 'assets/images/camisas/br/internacional.png', tipo: 'brasileirao' },
    { id: 9, nome: 'Gremio', preco: 220.00, imagemUrl: 'assets/images/camisas/br/gremio.png', tipo: 'brasileirao' /*, precoAntigo: 250.00 */ },
    { id: 10, nome: 'São Paulo', preco: 320.00, imagemUrl: 'assets/images/camisas/br/saopaulo.png', tipo: 'brasileirao' },
    { id: 11, nome: 'Palmeiras', preco: 180.00, imagemUrl: 'assets/images/camisas/br/palmeiras.png', tipo: 'brasileirao' /*, precoAntigo: 200.00 */ },
    { id: 12, nome: 'Corinthians', preco: 140.00, imagemUrl: 'assets/images/camisas/br/corinthians.png', tipo: 'brasileirao' },
    // Europa
    { id: 13, nome: 'Real Madrid', preco: 300.00, imagemUrl: 'assets/images/camisas/europa/real.png', tipo: 'europa' },
    { id: 14, nome: 'Barcelona', preco: 250.00, imagemUrl: 'assets/images/camisas/europa/barcelona.png', tipo: 'europa' },
    { id: 15, nome: 'Liverpool', preco: 280.00, imagemUrl: 'assets/images/camisas/europa/liverpool.png', tipo: 'europa' /*, precoAntigo: 300.00 */ },
    { id: 16, nome: 'Manchester City', preco: 220.00, imagemUrl: 'assets/images/camisas/europa/city.png', tipo: 'europa' },
    { id: 17, nome: 'Bayern', preco: 300.00, imagemUrl: 'assets/images/camisas/europa/bayern.png', tipo: 'europa' /*, precoAntigo: 320.00 */ },
    { id: 18, nome: 'PSG', preco: 180.00, imagemUrl: 'assets/images/camisas/europa/psg.png', tipo: 'europa' /*, precoAntigo: 200.00 */ }
  ];

  constructor() { }

  getProdutosBrasileirao(): Produto[] {
    return this.produtos.filter(p => p.tipo === 'brasileirao');
  }

  getProdutosEuropa(): Produto[] {
    return this.produtos.filter(p => p.tipo === 'europa');
  }

  // Adicione outros métodos se precisar (ex: getProdutoPorId, adicionarProduto, etc.)
}
