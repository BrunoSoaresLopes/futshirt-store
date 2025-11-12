// src/app/pages/carrinho/carrinho.ts

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrinhoItem, CarrinhoService } from '../../services/carrinho.service'; // Importa o serviço e a interface

@Component({
  selector: 'app-carrinho',
  standalone: false,
  templateUrl: './carrinho.html', // Verifique o nome do arquivo HTML
  styleUrls: ['./carrinho.css']   // Verifique o nome do arquivo CSS
})
export class CarrinhoComponent implements OnInit {

  // Observables para os itens e o total
  itens$: Observable<CarrinhoItem[]>;
  total: number = 0;

  constructor(private carrinhoService: CarrinhoService) {
    // Inicializa o Observable
    this.itens$ = this.carrinhoService.itensCarrinho$;
  }

  ngOnInit(): void {
    // Atualiza o total sempre que os itens mudarem
    this.itens$.subscribe(() => {
      this.total = this.carrinhoService.getTotal();
    });
  }

  // Método para chamar o serviço de remoção
  removerDoCarrinho(produtoId: number, tamanho: string): void {
    if (produtoId === undefined) return;
    this.carrinhoService.removerItem(produtoId, tamanho);
  }
}
