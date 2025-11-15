import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  // Lista todos os produtos
  getTodosProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  // Busca produto por ID (necessário para carrinho e detalhes)
  getProdutoPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  // Adiciona novo produto
  adicionarProduto(produto: Omit<Produto, 'id'>): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  // Atualiza produto existente
  atualizarProduto(id: number, produto: Omit<Produto, 'id'>): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto);
  }

  // Exclui produto
  excluirProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Busca produto por nome (parcial) usando JSON-Server
  buscarProdutoPorNome(nome: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}?nome_like=${encodeURIComponent(nome)}`);
  }

  // Busca produtos por tipo (ex: brasileirao, europa)
  buscarProdutosPorTipo(tipo: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}?tipo=${tipo}`);
  }
}


