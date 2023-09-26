import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { InsumosPageComponent } from './components/insumos-page/insumos-page.component';
import { UsuariosPageComponent } from './components/usuarios-page/usuarios-page/usuarios-page.component';

const routes: Routes = [
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: 'home', component: HomePageComponent
  },
  {
    path: 'menu-insumos', component: InsumosPageComponent
  },
  {
    path: 'menu-usuarios', component: UsuariosPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
