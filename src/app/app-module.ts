import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CommonModule } from '@angular/common';


import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { CadastroComponent } from './pages/cadastro/cadastro';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos';
import { CamisasBrasileirao } from './pages/camisas-brasileirao/camisas-brasileirao';
import { CamisasEuropa } from './pages/camisas-europa/camisas-europa';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { AdminProdutos} from './pages/admin-produtos/admin-produtos';
import { CarrinhoComponent } from './pages/carrinho/carrinho';

@NgModule({
  declarations: [
    App,
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    SobreNosComponent,
    CamisasBrasileirao,
    CamisasEuropa,
    NavbarComponent,
    FooterComponent,
    AdminProdutos,
    CarrinhoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   // Para <router-outlet>
    FormsModule,        // Para ngModel e ngForm
    ReactiveFormsModule, // Para o Trabalho Final
    CommonModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
