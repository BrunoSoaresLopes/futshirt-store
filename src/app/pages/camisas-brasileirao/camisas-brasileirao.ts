import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-camisas-brasileirao',
  standalone: false,
  templateUrl: './camisas-brasileirao.html',
  styleUrls: ['./camisas-brasileirao.css']
})
export class CamisasBrasileirao implements OnInit {
  listaProdutos: Produto[] = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.listaProdutos = this.produtoService.getProdutosBrasileirao();
  }
}
