import { Component } from '@angular/core';
// REMOVA os imports de UsuarioService e Usuario se eles não existem
// import { UsuarioService } from '../../services/usuario.service';
// import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
  standalone: false,
})
export class CadastroComponent {

  // Propriedades para o formulário
  nomeUsuario: string = '';
  emailUsuario: string = '';
  senhaUsuario: string = '';

  // Remova o UsuarioService do construtor por enquanto
  constructor(/*private usuarioService: UsuarioService*/) { }

  onSubmit(): void {
    if (!this.nomeUsuario || !this.emailUsuario || !this.senhaUsuario) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    console.log('Dados do formulário de cadastro:');
    console.log('Nome:', this.nomeUsuario);
    console.log('Email:', this.emailUsuario);
    // Não logue a senha em aplicações reais!
    // console.log('Senha:', this.senhaUsuario);

    // Comente ou remova a criação do objeto e a chamada ao service
    /*
    const novoUsuario: Usuario = {
      nome: this.nomeUsuario,
      email: this.emailUsuario,
      senha: this.senhaUsuario
    };
    this.usuarioService.cadastrarUsuario(novoUsuario);
    */

    alert('Cadastro enviado (simulação - sem salvar)!');

    // Limpa o formulário após o envio
    this.nomeUsuario = '';
    this.emailUsuario = '';
    this.senhaUsuario = '';
  }
}
