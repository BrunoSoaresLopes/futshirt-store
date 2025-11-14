import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto';
import { CarrinhoService } from '../../services/carrinho';
import { UsuarioService } from '../../services/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-camisas-europa',
  standalone: false,
  templateUrl: './camisas-europa.html',
  styleUrls: ['./camisas-europa.css']
})
export class CamisasEuropa implements OnInit {
  listaProdutosEuropa: Produto[] = [];
  tamanhosSelecionados: { [id: number]: string } = {};

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.produtoService.getProdutosPorTipo('europa').subscribe(produtos => {
      this.listaProdutosEuropa = produtos;
    });
  }

  selecionarTamanho(produtoId: number, tamanho: string): void {
    this.tamanhosSelecionados[produtoId] = tamanho;
  }

  isTamanhoSelecionado(produtoId: number, tamanho: string): boolean {
    return this.tamanhosSelecionados[produtoId] === tamanho;
  }

  adicionarAoCarrinho(produto: Produto): void {
    const tamanhoSelecionado = this.tamanhosSelecionados[produto.id];
    const usuario = this.usuarioService.usuarioLogado;

    if (!tamanhoSelecionado) {
      Swal.fire('Selecione um tamanho!', 'Escolha antes de adicionar ao carrinho.', 'warning');
      return;
    }

    if (!usuario) {
      Swal.fire('Erro', 'Você precisa estar logado para adicionar ao carrinho.', 'error');
      return;
    }

    this.carrinhoService.adicionarItem(produto, tamanhoSelecionado, usuario.id!).subscribe({
      next: () => {
        Swal.fire(
          'Camisa adicionada!',
          `Camisa "${produto.nome}" (${tamanhoSelecionado}) adicionada ao carrinho.`,
          'success'
        );
      },
      error: () => {
        Swal.fire('Erro', 'Não foi possível adicionar ao carrinho. Tente novamente.', 'error');
      }
    });
  }
}


