import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
items:any
isAuth:any

  constructor(private productService:ProductService,private authentifacationService:AuthentificationService) { 
    this.productService.OnGetProduct().then((data)=>{
      this.items=data}) 
      this.authentifacationService.autoriser.subscribe((data)=>{
        this.isAuth=data
        })
        if (this.isAuth) {
          
        }
 }
  ngOnInit(): void { 
  
   }
   AddToCard(){
    
    this.productService.panier.next(this.productService.pp++)
    
   }
}