import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }

  get c() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    // Marca todos os campos como "tocados" para exibir erros, se houver
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      // Se o formulário for inválido, não faz nada
      return;
    }

    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.senha;

    // Chama o serviço de login (que retorna um Observable)
    this.usuarioService.login(email, senha).subscribe(usuario => {
      if (usuario) {
        // Sucesso!
        alert(`Bem-vindo, ${usuario.nome}.`);
        this.router.navigate(['/']); // Navega para a página Home
      } else {
        // Falha
        alert('Email ou senha inválidos. Tente novamente.');
      }
    });
  }
}
