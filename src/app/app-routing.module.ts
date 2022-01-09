import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';
import { ProductCardComponent } from './_components/product-card/product-card.component';
import { AuthGuard } from './auth.guard';
import { PanierComponent } from './_components/panier/panier.component';
import { GestionProduitComponent } from './_components/admin/gestion-produit/gestion-produit.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'product',component:ProductCardComponent,canActivate:[AuthGuard]},
  {path:'panier',component:PanierComponent,canActivate:[AuthGuard]},
  {path:'gestionproduit',component:GestionProduitComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
