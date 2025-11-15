import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  // Observable para saber quem está logado
  usuarioLogado$: Observable<Usuario | null>;

  constructor(private usuarioService: UsuarioService) {
    // Conecta o Observable local com o Observable do serviço
    this.usuarioLogado$ = this.usuarioService.usuarioLogado$;
  }
  // Logout
  sair(): void {
    this.usuarioService.logout();
  }
}
