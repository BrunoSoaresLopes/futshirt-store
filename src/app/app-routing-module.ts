import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { CadastroComponent } from './pages/cadastro/cadastro';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos';
import { AdminProdutosComponent } from './pages/admin-produtos/admin-produtos';
import { CarrinhoComponent } from './pages/carrinho/carrinho';
import { CamisasBrasileirao } from './pages/camisas-brasileirao/camisas-brasileirao';
import { CamisasEuropa } from './pages/camisas-europa/camisas-europa';
import { FinalizarCompraComponent } from './pages/finalizar-compra/finalizar-compra';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar', component: CadastroComponent },
  { path: 'sobre-nos', component: SobreNosComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'admin/produtos', component: AdminProdutosComponent },
  { path: 'camisas/brasileirao', component: CamisasBrasileirao },
  { path: 'camisas/europa', component: CamisasEuropa },
  { path: 'finalizar-compra', component: FinalizarCompraComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
