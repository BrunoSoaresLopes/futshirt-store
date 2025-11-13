import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

export interface CarrinhoItem {
  produto: Produto;
  tamanho: string;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itensCarrinhoSubject: BehaviorSubject<CarrinhoItem[]> = new BehaviorSubject<CarrinhoItem[]>([]);
  public itensCarrinho$: Observable<CarrinhoItem[]> = this.itensCarrinhoSubject.asObservable();

  constructor() {
    const storedCart = localStorage.getItem('carrinhoItens');
    if (storedCart) {
      this.itensCarrinhoSubject.next(JSON.parse(storedCart));
    }
  }

  private saveCartToLocalStorage(itens: CarrinhoItem[]): void {
    localStorage.setItem('carrinhoItens', JSON.stringify(itens));
  }

  adicionarItem(produto: Produto, tamanho: string): void {
    const itensAtuais = this.itensCarrinhoSubject.getValue();
    const itemExistente = itensAtuais.find(
      item => item.produto.id === produto.id && item.tamanho === tamanho
    );

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      itensAtuais.push({ produto, tamanho, quantidade: 1 });
    }

    this.itensCarrinhoSubject.next([...itensAtuais]);
    this.saveCartToLocalStorage(itensAtuais);
  }

  removerItem(produtoId: number, tamanho: string): void {
    let itensAtuais = this.itensCarrinhoSubject.getValue();
    itensAtuais = itensAtuais.filter(
      item => !(item.produto.id === produtoId && item.tamanho === tamanho)
    );
    this.itensCarrinhoSubject.next(itensAtuais);
    this.saveCartToLocalStorage(itensAtuais);
  }

  getTotal(): number {
    return this.itensCarrinhoSubject.getValue().reduce((total, item) => {
      return total + (item.produto.preco * item.quantidade);
    }, 0);
  }

  limparCarrinho(): void {
    this.itensCarrinhoSubject.next([]); 
    localStorage.removeItem('carrinhoItens');
    console.log('Carrinho limpo após logout.');
  }
}
