import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }

  getTodosProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  getProdutosPorTipo(tipo: 'brasileirao' | 'europa'): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}?tipo=${tipo}`);
  }

  getProdutoPorId(id: number): Observable<Produto | undefined> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  adicionarProduto(novoProdutoDados: Omit<Produto, 'id'>): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, novoProdutoDados);
  }

  atualizarProduto(produtoAtualizado: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${produtoAtualizado.id}`, produtoAtualizado);
  }

  excluirProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarProdutoPorNome(termo: string): Observable<Produto[]> {
    if (!termo.trim()) {
      return of([]); // Retorna um Observable de array vazio
    }
    return this.http.get<Produto[]>(`${this.apiUrl}?q=${termo}`);
  }
}
