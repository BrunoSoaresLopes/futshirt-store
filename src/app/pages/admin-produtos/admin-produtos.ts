import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-admin-produtos',
  templateUrl: './admin-produtos.html',
  styleUrls: ['./admin-produtos.css'],
  standalone: false,
})

export class AdminProdutos implements OnInit {

  nomeProduto: string = '';
  precoProduto: number | null = null;
  imagemUrlProduto: string = '';
  tipoProduto: 'brasileirao' | 'europa' = 'brasileirao';
  listaTodosProdutos: Produto[] = [];
  produtosExibidos: Produto[] = [];
  termoBusca: string = '';

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.listaTodosProdutos = this.produtoService.getTodosProdutos();
    this.produtosExibidos = [...this.listaTodosProdutos];
    this.termoBusca = '';
  }

  // --- ADICIONA PRODUTO ---
  onSubmitAdicionar(): void {
    if (!this.nomeProduto || this.precoProduto === null || this.precoProduto <= 0 || !this.tipoProduto) {
      alert('Por favor, preencha todos os campos corretamente para adicionar.');
      return;
    }
    const novoProduto: Omit<Produto, 'id'> = {
      nome: this.nomeProduto,
      preco: this.precoProduto,
      imagemUrl: this.imagemUrlProduto || 'assets/images/placeholder.png',
      tipo: this.tipoProduto
    };
    this.produtoService.adicionarProduto(novoProduto);
    this.limparFormularioAdicionar();
    this.carregarProdutos();
  }

  limparFormularioAdicionar(): void {
    this.nomeProduto = '';
    this.precoProduto = null;
    this.imagemUrlProduto = '';
    this.tipoProduto = 'brasileirao';
  }

  // --- EXCLUI PRODUTO ---
  excluir(id: number | undefined): void {
    if (id === undefined) {
      alert('ID do produto inválido para exclusão.');
      return;
    }
    if (confirm(`Tem certeza que deseja excluir o produto com ID ${id}?`)) {
      const sucesso = this.produtoService.excluirProduto(id);
      if (sucesso) {
        this.carregarProdutos();
      }
    }
  }

  // --- BUSCA PRODUTO ---
  buscarProdutos(): void {
    if (!this.termoBusca.trim()) {
      this.produtosExibidos = [...this.listaTodosProdutos];
    } else {
      this.produtosExibidos = this.produtoService.buscarProdutoPorNome(this.termoBusca);
    }
  }
}
