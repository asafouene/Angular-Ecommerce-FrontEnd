import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { HeaderComponent } from './_components/header/header.component';
import { HomeComponent } from './_components/home/home.component';
import { ProductCardComponent } from './_components/product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PrixPipe } from './prix.pipe';
import { AuthGuard } from './auth.guard';
import { PanierComponent } from './_components/panier/panier.component';
import { GestionProduitComponent } from './_components/admin/gestion-produit/gestion-produit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfilComponent } from './_components/profil/profil.component';
import { RegisterComponent } from './_components/register/register.component';
import { GestionUsersComponent } from './_components/admin/gestion-users/gestion-users.component';
  
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    ProductCardComponent,
    PrixPipe,
    PanierComponent,
    GestionProduitComponent,
    ProfilComponent,
    RegisterComponent,
    GestionUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
