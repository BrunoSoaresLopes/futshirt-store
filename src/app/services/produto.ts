import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private proximoId = 19;

  private produtos: Produto[] = [
    // Brasileirão
    { id: 1, nome: 'Santos', preco: 350.00, imagemUrl: 'assets/images/camisas/br/santos.png', tipo: 'brasileirao' },
    { id: 2, nome: 'Atlético Mineiro', preco: 320.00, imagemUrl: 'assets/images/camisas/br/atletico.png', tipo: 'brasileirao' },
    { id: 3, nome: 'Cruzeiro', preco: 175.00, imagemUrl: 'assets/images/camisas/br/cruzeiro.png', tipo: 'brasileirao' },
    { id: 4, nome: 'Flamengo', preco: 300.00, imagemUrl: 'assets/images/camisas/br/flamengo.png', tipo: 'brasileirao' },
    { id: 5, nome: 'Botafogo', preco: 180.00, imagemUrl: 'assets/images/camisas/br/botafogo.png', tipo: 'brasileirao' },
    { id: 6, nome: 'Fluminense', preco: 150.00, imagemUrl: 'assets/images/camisas/br/fluminense.png', tipo: 'brasileirao' },
    { id: 7, nome: 'Vasco', preco: 180.00, imagemUrl: 'assets/images/camisas/br/vasco.png', tipo: 'brasileirao' },
    { id: 8, nome: 'Internacional', preco: 240.00, imagemUrl: 'assets/images/camisas/br/internacional.png', tipo: 'brasileirao' },
    { id: 9, nome: 'Gremio', preco: 220.00, imagemUrl: 'assets/images/camisas/br/gremio.png', tipo: 'brasileirao' },
    { id: 10, nome: 'São Paulo', preco: 320.00, imagemUrl: 'assets/images/camisas/br/saopaulo.png', tipo: 'brasileirao' },
    { id: 11, nome: 'Palmeiras', preco: 180.00, imagemUrl: 'assets/images/camisas/br/palmeiras.png', tipo: 'brasileirao' },
    { id: 12, nome: 'Corinthians', preco: 140.00, imagemUrl: 'assets/images/camisas/br/corinthians.png', tipo: 'brasileirao' },
    // Europa
    { id: 13, nome: 'Real Madrid', preco: 300.00, imagemUrl: 'assets/images/camisas/europa/real.png', tipo: 'europa' },
    { id: 14, nome: 'Barcelona', preco: 250.00, imagemUrl: 'assets/images/camisas/europa/barcelona.png', tipo: 'europa' },
    { id: 15, nome: 'Liverpool', preco: 280.00, imagemUrl: 'assets/images/camisas/europa/liverpool.png', tipo: 'europa' },
    { id: 16, nome: 'Manchester City', preco: 220.00, imagemUrl: 'assets/images/camisas/europa/city.png', tipo: 'europa' },
    { id: 17, nome: 'Bayern', preco: 300.00, imagemUrl: 'assets/images/camisas/europa/bayern.png', tipo: 'europa' },
    { id: 18, nome: 'PSG', preco: 180.00, imagemUrl: 'assets/images/camisas/europa/psg.png', tipo: 'europa' }
  ];

  constructor() { }
  getTodosProdutos(): Produto[] {
    console.log("Buscando todos os produtos...");
    return [...this.produtos];
  }

  getProdutosBrasileirao(): Produto[] {
    console.log("Buscando produtos Brasileirão...");
    return this.produtos.filter(p => p.tipo === 'brasileirao');
  }

  getProdutosEuropa(): Produto[] {
    console.log("Buscando produtos Europa...");
    return this.produtos.filter(p => p.tipo === 'europa');
  }

  getProdutoPorId(id: number): Produto | undefined {
    return this.produtos.find(p => p.id === id);
  }

  // --- MÉTODO DE CRIAÇÃO (CADASTRO) ---
  adicionarProduto(novoProdutoDados: Omit<Produto, 'id'>): Produto {
    const produtoComId: Produto = {
      ...novoProdutoDados,
      id: this.proximoId++
    };
    this.produtos.push(produtoComId);
    console.log('Produto adicionado (simulado):', produtoComId);
    console.log('Lista atualizada:', this.produtos);
    alert(`Produto ${produtoComId.nome} adicionado com sucesso! (ID: ${produtoComId.id})`);
    return produtoComId;
  }

  // --- MÉTODO DE ATUALIZAÇÃO (EDIÇÃO) ---
  atualizarProduto(produtoAtualizado: Produto): boolean {
    const index = this.produtos.findIndex(p => p.id === produtoAtualizado.id);
    if (index !== -1) {
      this.produtos[index] = produtoAtualizado;
      console.log('Produto atualizado (simulado):', produtoAtualizado);
      console.log('Lista atualizada:', this.produtos);
      alert(`Produto ${produtoAtualizado.nome} atualizado com sucesso!`);
      return true;
    }
    console.warn(`Produto com ID ${produtoAtualizado.id} não encontrado para atualização.`);
    alert(`Erro: Produto com ID ${produtoAtualizado.id} não encontrado!`);
    return false;
  }

  // --- MÉTODO DE EXCLUSÃO ---
  excluirProduto(id: number): boolean {
    const index = this.produtos.findIndex(p => p.id === id);
    if (index !== -1) {
      const produtoRemovido = this.produtos.splice(index, 1)[0];
      console.log('Produto removido (simulado):', produtoRemovido);
      console.log('Lista atualizada:', this.produtos);
      alert(`Produto ${produtoRemovido.nome} (ID: ${id}) removido com sucesso!`);
      return true;
    }
    console.warn(`Produto com ID ${id} não encontrado para exclusão.`);
    alert(`Erro: Produto com ID ${id} não encontrado!`);
    return false;
  }

  // --- MÉTODO DE PESQUISA ---
  buscarProdutoPorNome(termo: string): Produto[] {
    const termoBusca = termo.toLowerCase().trim();
    if (!termoBusca) {
      return [];
    }
    const resultados = this.produtos.filter(p =>
      p.nome.toLowerCase().includes(termoBusca)
    );
    console.log(`Busca por "${termo}": ${resultados.length} resultados encontrados.`);
    return resultados;
  }
}
