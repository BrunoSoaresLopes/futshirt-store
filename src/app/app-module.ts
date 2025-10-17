// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app'; // Classe principal é 'App' (confirmado pelo erro TS2305 anterior)

// Importando componentes com seus nomes corretos
import { HomeComponent } from './pages/home/home'; // Verifique o nome da classe em home.ts
import { LoginComponent } from './pages/login/login'; // Verifique o nome da classe em login.ts
import { CadastroComponent } from './pages/cadastro/cadastro'; // Verifique o nome da classe em cadastro.ts
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos'; // Verifique o nome da classe em sobre-nos.ts
import { CamisasBrasileirao } from './pages/camisas-brasileirao/camisas-brasileirao'; // << SEM Component
import { CamisasEuropa } from './pages/camisas-europa/camisas-europa';       // << SEM Component
import { NavbarComponent } from './components/navbar/navbar'; // Classe é 'NavbarComponent'
import { FooterComponent } from './components/footer/footer'; // Classe é 'FooterComponent'

@NgModule({
  declarations: [
    App, // Classe principal
    // Declarando com os nomes corretos
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    SobreNosComponent,
    CamisasBrasileirao, // << SEM Component
    CamisasEuropa,    // << SEM Component
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule // Importa o módulo de rotas
  ],
  providers: [],
  bootstrap: [App] // Classe principal
})
export class AppModule { }
