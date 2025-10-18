import { Component } from '@angular/core';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../models/produto.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-produtos',
  templateUrl: './admin-produtos.html',
  styleUrls: ['./admin-produtos.css'],
  standalone: false,
})
export class AdminProdutos {

  nomeProduto: string = '';
  precoProduto: number | null = null;
  imagemUrlProduto: string = '';
  tipoProduto: 'brasileirao' | 'europa' = 'brasileirao';

  constructor(private produtoService: ProdutoService) { }

  onSubmit(): void {
    if (!this.nomeProduto || this.precoProduto === null || this.precoProduto <= 0 || !this.tipoProduto) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const novoProduto: Omit<Produto, 'id'> = {
      nome: this.nomeProduto,
      preco: this.precoProduto,
      imagemUrl: this.imagemUrlProduto,
      tipo: this.tipoProduto
    };

    this.produtoService.adicionarProduto(novoProduto);

    this.nomeProduto = '';
    this.precoProduto = null;
    this.imagemUrlProduto = 'assets/images/placeholder.png';
    this.tipoProduto = 'brasileirao';
  }
}
