import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';
import { ProductCardComponent } from './_components/product-card/product-card.component';
import { AuthGuard } from './auth.guard';
import { PanierComponent } from './_components/panier/panier.component';
import { GestionProduitComponent } from './_components/admin/gestion-produit/gestion-produit.component';
import { ProfilComponent } from './_components/profil/profil.component';
import { RegisterComponent } from './_components/register/register.component';
import { GestionUsersComponent } from './_components/admin/gestion-users/gestion-users.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'product',component:ProductCardComponent,canActivate:[AuthGuard]},
  {path:'panier',component:PanierComponent,canActivate:[AuthGuard]},
  {path:'gestionproduit',component:GestionProduitComponent,canActivate:[AuthGuard]},
  {path:'profil',component:ProfilComponent,canActivate:[AuthGuard]},
  {path:'gestionusers',component:GestionUsersComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
