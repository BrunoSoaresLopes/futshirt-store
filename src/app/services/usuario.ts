import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { CarrinhoService } from './carrinho';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';

  // BehaviorSubject para gerenciar o estado de login
  private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor(private http: HttpClient, private carrinhoService: CarrinhoService) {}

  // Retorna o usuário logado atualmente
  public get usuarioLogado(): Usuario | null {
    return this.usuarioLogadoSubject.getValue();
  }

  // Cadastra um novo usuário
  cadastrarUsuario(novoUsuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, novoUsuario);
  }

  // Faz login
  login(email: string, senha: string): Observable<Usuario | null> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}&senha=${senha}`).pipe(
      map((usuarios) => {
        if (usuarios.length > 0) {
          const usuario = usuarios[0];
          this.usuarioLogadoSubject.next(usuario);
          this.carrinhoService.carregarItensDoServidor(usuario.id!).subscribe();

          console.log('Login bem-sucedido:', usuario);
          return usuario;
        } else {
          this.usuarioLogadoSubject.next(null);
          console.log('Login falhou: email ou senha inválidos');
          return null;
        }
      })
    );
  }

  // Faz logout
  logout(): void {
    const usuario = this.usuarioLogado;
    this.usuarioLogadoSubject.next(null);

    if (usuario) {
      // Limpa carrinho do usuário ao deslogar
      this.carrinhoService.limparCarrinho(usuario.id!).subscribe();
    }
  }
}
