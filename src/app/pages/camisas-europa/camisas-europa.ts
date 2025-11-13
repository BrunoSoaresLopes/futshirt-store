import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto';
import { CarrinhoService } from '../../services/carrinho.service';
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
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.produtoService.getProdutosPorTipo('europa').subscribe(produtosRecebidos => {
      this.listaProdutosEuropa = produtosRecebidos;
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

    if (!tamanhoSelecionado) {
      Swal.fire({
        icon: 'warning',
        title: 'Selecione um tamanho!',
        text: 'Você precisa escolher um tamanho antes de adicionar ao carrinho.',
        background: '#0A2A08',
        color: 'white',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'swal2-confirm swal-btn-custom'
        }
      });
      return;
    }

    this.carrinhoService.adicionarItem(produto, tamanhoSelecionado);

    Swal.fire({
      icon: 'success',
      title: 'Camisa adicionada!',
      text: `Camisa "${produto.nome}" (${tamanhoSelecionado}) foi adicionada ao carrinho.`,
      background: '#0A2A08',
      color: 'white',
      confirmButtonText: 'Continuar comprando',
      customClass: {
        confirmButton: 'swal2-confirm swal-btn-custom'
      }
    });
  }
}
