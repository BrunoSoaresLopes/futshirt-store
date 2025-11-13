import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../models/produto.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-produtos',
  templateUrl: './admin-produtos.html',
  styleUrls: ['./admin-produtos.css'],
  standalone: false,
})
export class AdminProdutosComponent implements OnInit {

  //Cria a propriedade do FormGroup
  produtoForm: FormGroup;

  //Propriedades para listagem
  listaTodosProdutos: Produto[] = [];
  produtosExibidos: Produto[] = [];
  termoBusca: string = '';

  //Injeta o FormBuilder
  constructor(
    private produtoService: ProdutoService,
    private fb: FormBuilder
  ) {
    //Inicializa o formulário no construtor
    this.produtoForm = this.fb.group({
      //Define os controles: [valorPadrão, [Validadores]]
      nome: ['', [Validators.required, Validators.minLength(3)]],
      preco: [null, [Validators.required, Validators.min(0.01)]],
      imagemUrl: ['', [
        Validators.required,
        //Validador de padrão (regex) que aceita 'assets/images/...' OU 'http...'
        Validators.pattern('^(assets/images/|http|https).*')
      ]],
      tipo: ['brasileirao', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  //Getter (atalho) para acessar os controles do formulário no HTML
  get f() {
    return this.produtoForm.controls;
  }

  carregarProdutos(): void {
    this.produtoService.getTodosProdutos().subscribe(produtos => {
      this.listaTodosProdutos = produtos;
      this.produtosExibidos = [...this.listaTodosProdutos];
      this.termoBusca = '';
    });
  }

  //Atualiza o método de Adicionar
  onSubmitAdicionar(): void {
    //Marca todos os campos como "tocados" para exibir erros
    this.produtoForm.markAllAsTouched();

    //Para se o formulário for inválido
    if (this.produtoForm.invalid) {
      return;
    }

    //Pega os valores do formulário reativo
    const novoProduto: Omit<Produto, 'id'> = this.produtoForm.value;

    this.produtoService.adicionarProduto(novoProduto).subscribe(produtoAdicionado => {
      alert(`Produto ${produtoAdicionado.nome} adicionado com sucesso! (ID: ${produtoAdicionado.id})`);
      this.produtoForm.reset({ // Limpa o formulário
        nome: '',
        preco: null,
        imagemUrl: '',
        tipo: 'brasileirao'
      });
      this.carregarProdutos();
    });
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

  buscarProdutos(): void {
    if (!this.termoBusca.trim()) {
      this.produtosExibidos = [...this.listaTodosProdutos];
    } else {
      this.produtoService.buscarProdutoPorNome(this.termoBusca).subscribe(produtosEncontrados => {
        this.produtosExibidos = produtosEncontrados;
      });
    }
  }
}
