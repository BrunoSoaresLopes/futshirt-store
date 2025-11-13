import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/usuarios';

  // BehaviorSubject para gerenciar o estado de login (saber quem está logado)
  private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor(private http: HttpClient) { } // Injete o HttpClient

  /** Retorna o usuário logado atualmente */
  public get usuarioLogado(): Usuario | null {
    return this.usuarioLogadoSubject.getValue();
  }

  /** Cadastra um novo usuário via HTTP POST */
  cadastrarUsuario(novoUsuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, novoUsuario);
  }

  /** Tenta logar um usuário via HTTP GET */
  login(email: string, senha: string): Observable<Usuario | null> {
    // Busca no json-server por um usuário que combine email E senha
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}&senha=${senha}`).pipe(
      map(usuarios => {
        if (usuarios.length > 0) {
          // Usuário encontrado (login sucesso)
          const usuario = usuarios[0];
          this.usuarioLogadoSubject.next(usuario); // Informa a todos que o usuário logou
          console.log('Login bem-sucedido:', usuario);
          return usuario;
        } else {
          // Usuário não encontrado (login falhou)
          this.usuarioLogadoSubject.next(null);
          console.log('Login falhou: email ou senha inválidos');
          return null;
        }
      })
    );
  }

  /** Desloga o usuário */
  logout(): void {
    this.usuarioLogadoSubject.next(null);
  }
}
