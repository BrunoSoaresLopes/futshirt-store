// src/app/app-routing-module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importando com os nomes corretos
import { HomeComponent } from './pages/home/home'; // Verifique o nome da classe
import { LoginComponent } from './pages/login/login'; // Verifique o nome da classe
import { CadastroComponent } from './pages/cadastro/cadastro'; // Verifique o nome da classe
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos'; // Verifique o nome da classe
import { CamisasBrasileirao } from './pages/camisas-brasileirao/camisas-brasileirao'; // << SEM Component
import { CamisasEuropa } from './pages/camisas-europa/camisas-europa'; // << SEM Component

const routes: Routes = [
  // Usando os nomes corretos
  { path: '', component: HomeComponent }, // Verifique o nome da classe
  { path: 'login', component: LoginComponent }, // Verifique o nome da classe
  { path: 'cadastrar', component: CadastroComponent }, // Verifique o nome da classe
  { path: 'sobre-nos', component: SobreNosComponent }, // Verifique o nome da classe
  { path: 'camisas/brasileirao', component: CamisasBrasileirao }, // << SEM Component
  { path: 'camisas/europa', component: CamisasEuropa }       // << SEM Component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
