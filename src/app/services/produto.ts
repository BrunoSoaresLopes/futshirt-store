import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  // Busca todos os produtos
  getTodosProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  // Busca produtos filtrados por tipo (brasileirao ou europa)
  getProdutosPorTipo(tipo: 'brasileirao' | 'europa'): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}?tipo=${tipo}`);
  }

  // Busca um produto pelo ID
  getProdutoPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  // Adiciona um novo produto
  adicionarProduto(novoProduto: Omit<Produto, 'id'>): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, novoProduto);
  }

  // Atualiza um produto existente
  atualizarProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${produto.id}`, produto);
  }

  // Exclui um produto pelo ID
  excluirProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Busca produtos pelo nome (texto livre) 
  buscarProdutoPorNome(termo: string): Observable<Produto[]> {
    const texto = termo.trim();
    if (!texto) {
      return of([]); // retorna vazio se não houver termo
    }
    return this.http.get<Produto[]>(`${this.apiUrl}?q=${encodeURIComponent(texto)}`);
  }
}

