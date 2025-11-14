import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario';
import { Usuario } from '../../models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
  standalone: false,
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  get c() {
    return this.cadastroForm.controls;
  }

  onSubmit(): void {
    this.cadastroForm.markAllAsTouched();

    if (this.cadastroForm.invalid) {
      alert('Formulário inválido. Verifique os campos.');
      return;
    }

    const novoUsuario: Usuario = this.cadastroForm.value;

    this.usuarioService.cadastrarUsuario(novoUsuario).subscribe(() => {
      this.cadastroForm.reset();
      alert('Usuário cadastrado com sucesso!');
    });
  }
}

