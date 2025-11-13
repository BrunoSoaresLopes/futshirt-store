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

  //Cria a propriedade do FormGroup
  cadastroForm: FormGroup;

  //Injeta FormBuilder e UsuarioService
  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {
    //Inicializa o formulário
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void { }

  //Getter (atalho) para os controles
  get c() {
    return this.cadastroForm.controls;
  }

  //Atualiza o método onSubmit
  onSubmit(): void {
    this.cadastroForm.markAllAsTouched();

    if (this.cadastroForm.invalid) {
      alert('Formulário inválido. Verifique os campos.');
      return;
    }

    const novoUsuario: Usuario = this.cadastroForm.value;

    // Assumindo que UsuarioService foi atualizado para HTTP
    this.usuarioService.cadastrarUsuario(novoUsuario).subscribe(usuarioCadastrado => {
      this.cadastroForm.reset();
    });
  }
}
