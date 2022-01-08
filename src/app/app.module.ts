import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PrixPipe } from './prix.pipe';
import { AuthGuard } from './auth.guard';
import { PanierComponent } from './panier/panier.component';
import { GestionProduitComponent } from './admin/gestion-produit/gestion-produit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
  
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
