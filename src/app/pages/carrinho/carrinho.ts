import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrinhoItem, CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  standalone: false,
  templateUrl: './carrinho.html',
  styleUrls: ['./carrinho.css']
})
export class CarrinhoComponent implements OnInit {

  // Observables para os itens e o total
  itens$: Observable<CarrinhoItem[]>;
  total: number = 0;

  constructor(private carrinhoService: CarrinhoService) {

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
