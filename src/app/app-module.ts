import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { CadastroComponent } from './pages/cadastro/cadastro';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos';
import { AdminProdutosComponent } from './pages/admin-produtos/admin-produtos';
import { CarrinhoComponent } from './pages/carrinho/carrinho';
import { CamisasBrasileirao } from './pages/camisas-brasileirao/camisas-brasileirao';
import { CamisasEuropa } from './pages/camisas-europa/camisas-europa';
import { FinalizarCompraComponent } from './pages/finalizar-compra/finalizar-compra';

@NgModule({
  declarations: [
    App,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    SobreNosComponent,
    AdminProdutosComponent,
    CarrinhoComponent,
    CamisasBrasileirao,
    CamisasEuropa,
    FinalizarCompraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
