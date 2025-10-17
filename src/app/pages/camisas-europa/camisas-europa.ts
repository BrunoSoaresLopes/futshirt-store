import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto'; // Correção aqui

@Component({
  selector: 'app-camisas-europa',
  standalone: false,
  templateUrl: './camisas-europa.html',
  styleUrls: ['./camisas-europa.css']
})
export class CamisasEuropa implements OnInit {
  listaProdutosEuropa: Produto[] = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.listaProdutosEuropa = this.produtoService.getProdutosEuropa();
  }
}
