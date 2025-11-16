import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, forkJoin, throwError } from 'rxjs';
import { map, switchMap, take, tap, catchError } from 'rxjs/operators';
import { Produto } from '../models/produto.model';

export interface CarrinhoItem {
  id?: number;
  produtoId: number;
  tamanho: string;
  quantidade: number;
  usuarioId: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private apiUrl = 'http://localhost:3000/carrinho';

  private itensCarrinhoSubject = new BehaviorSubject<CarrinhoItem[]>([]);
  public itensCarrinho$ = this.itensCarrinhoSubject.asObservable();

  private cepDestinoSubject = new BehaviorSubject<string>('');
  public cepDestino$ = this.cepDestinoSubject.asObservable();

  constructor(private http: HttpClient) {}

  setCepDestino(cep: string) {
    this.cepDestinoSubject.next(cep);
  }

  getCepDestino(): string {
    return this.cepDestinoSubject.getValue();
  }

  carregarItensDoServidor(usuarioId: string): Observable<CarrinhoItem[]> {
    return this.http.get<CarrinhoItem[]>(`${this.apiUrl}?usuarioId=${usuarioId}`).pipe(
      tap((itens) => this.itensCarrinhoSubject.next(itens)),
      catchError((err) => throwError(() => err))
    );
  }

  adicionarItem(produto: Produto, tamanho: string, usuarioId: string): Observable<CarrinhoItem[]> {
    return this.itensCarrinho$.pipe(
      take(1),
      switchMap((itens: CarrinhoItem[]) => {
        const itemExistente = itens.find(
          (item) =>
            item.produtoId === produto.id &&
            item.tamanho === tamanho &&
            item.usuarioId === usuarioId
        );

        if (itemExistente) {
          return this.http.patch<CarrinhoItem>(`${this.apiUrl}/${itemExistente.id}`, {
            quantidade: itemExistente.quantidade + 1,
          });
        } else {
          const novoItem: Omit<CarrinhoItem, 'id'> = {
            produtoId: produto.id,
            tamanho,
            quantidade: 1,
            usuarioId,
          };
          return this.http.post<CarrinhoItem>(this.apiUrl, novoItem);
        }
      }),
      switchMap(() => this.carregarItensDoServidor(usuarioId))
    );
  }

  removerItem(itemId: number, usuarioId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${itemId}`).pipe(
      switchMap(() => this.carregarItensDoServidor(usuarioId)),
      map(() => undefined)
    );
  }

  limparCarrinho(usuarioId: string): Observable<any> {
    return this.itensCarrinho$.pipe(
      take(1),
      switchMap((itens: CarrinhoItem[]) => {
        const itensDoUsuario = itens.filter((item) => item.usuarioId === usuarioId);
        const deleteRequests = itensDoUsuario.map((item) =>
          this.http.delete<void>(`${this.apiUrl}/${item.id}`)
        );
        if (deleteRequests.length === 0) return of(null);
        return forkJoin(deleteRequests).pipe(map(() => null));
      }),
      tap(() => {
        const itensRestantes = this.itensCarrinhoSubject
          .getValue()
          .filter((item) => item.usuarioId !== usuarioId);
        this.itensCarrinhoSubject.next(itensRestantes);
      })
    );
  }

  getTotal(usuarioId: string): number {
    const itens = this.itensCarrinhoSubject
      .getValue()
      .filter((item) => item.usuarioId === usuarioId);
    return itens.reduce((acc, item) => acc + item.quantidade, 0);
  }
}
