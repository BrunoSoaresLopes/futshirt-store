import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProdutoService } from '../../services/produto';
import { UsuarioService } from '../../services/usuario';

import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-admin-produtos',
  templateUrl: './admin-produtos.html',
  styleUrls: ['./admin-produtos.css'],
  standalone: false,
})
export class AdminProdutosComponent implements OnInit {
  // Formulário reativo
  produtoForm: FormGroup;

  // Listagem e busca
  listaTodosProdutos: Produto[] = [];
  produtosExibidos: Produto[] = [];
  termoBusca: string = '';

  // Edição
  produtoEditando: Produto | null = null;

  constructor(
    private produtoService: ProdutoService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      preco: [null, [Validators.required, Validators.min(0.01)]],
      imagemUrl: ['', [Validators.required, Validators.pattern('^(assets/images/|http|https).*')]],
      tipo: ['brasileirao', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Restrição de acesso: apenas administradores
    const usuario = this.usuarioService.usuarioLogado;
    if (!usuario || !usuario.admin) {
      alert('Acesso negado. Apenas administradores podem entrar.');
      this.router.navigate(['/']);
      return;
    }

    this.carregarProdutos();
  }

  get f() {
    return this.produtoForm.controls;
  }

  carregarProdutos(): void {
    this.produtoService.getTodosProdutos().subscribe((produtos) => {
      this.listaTodosProdutos = produtos;
      this.produtosExibidos = [...this.listaTodosProdutos];
      this.termoBusca = '';
    });
  }

  // Adicionar ou atualizar (quando estiver editando)
  onSubmitAdicionar(): void {
    this.produtoForm.markAllAsTouched();
    if (this.produtoForm.invalid) return;

    const dadosProduto: Omit<Produto, 'id'> = this.produtoForm.value;

    if (this.produtoEditando) {
      // Atualizar produto existente
      this.produtoService.atualizarProduto(this.produtoEditando.id!, dadosProduto).subscribe(() => {
        alert(`Produto "${this.produtoEditando?.nome}" atualizado com sucesso!`);
        this.produtoEditando = null;
        this.produtoForm.reset({ nome: '', preco: null, imagemUrl: '', tipo: 'brasileirao' });
        this.carregarProdutos();
      });
    } else {
      // Adicionar novo produto
      this.produtoService.adicionarProduto(dadosProduto).subscribe((produtoAdicionado) => {
        alert(
          `Produto "${produtoAdicionado.nome}" adicionado com sucesso! (ID: ${produtoAdicionado.id})`
        );
        this.produtoForm.reset({ nome: '', preco: null, imagemUrl: '', tipo: 'brasileirao' });
        this.carregarProdutos();
      });
    }
  }

  excluir(id: number | undefined): void {
    if (id === undefined) return;
    if (confirm(`Tem certeza que deseja excluir o produto com ID ${id}?`)) {
      this.produtoService.excluirProduto(id).subscribe(() => {
        alert(`Produto com ID ${id} removido com sucesso!`);
        this.carregarProdutos();
      });
    }
  }

  // Entrar em modo edição e carregar dados no formulário
  editar(produto: Produto): void {
    this.produtoEditando = produto;
    this.produtoForm.patchValue({
      nome: produto.nome,
      preco: produto.preco,
      imagemUrl: produto.imagemUrl,
      tipo: produto.tipo,
    });
    // Opcional: rolar até o formulário
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Busca por nome (parcial) usando JSON-Server (?nome_like=)
  buscarProdutos(): void {
    const termo = this.termoBusca.trim().toLowerCase();

    if (!termo) {
      this.produtosExibidos = [...this.listaTodosProdutos];
      return;
    }

    this.produtosExibidos = this.listaTodosProdutos.filter((produto) =>
      produto.nome.toLowerCase().includes(termo)
    );
  }
}
