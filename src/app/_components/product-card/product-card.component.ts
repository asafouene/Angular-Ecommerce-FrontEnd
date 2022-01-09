import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { AuthentificationService } from 'src/app/_services/authentification.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
items:any
isAuth:any
newProductInPanier:any
indiceProductInPanier:any


  constructor(private productService:ProductService,private authentifacationService:AuthentificationService) { 
    this.productService.OnGetProduct().then((data)=>{
      this.items=data}) 

    this.authentifacationService.autoriser.subscribe((data)=>{
        this.isAuth=data
        })
 }
  ngOnInit(): void { 
  
   }
   AddToCard(item:any){
    if(this.productService.pp==0){
      this.productService.panier.next(++this.productService.pp)
      this.productService.DansPanier[this.productService.pp-1]=item
      this.productService.DansPanier[this.productService.pp-1].qte=1
      
    }
    else{
      for (let i = 0; i < this.productService.pp; i++) {
        if(item.id===this.productService.DansPanier[i].id){
          this.newProductInPanier=false
          this.indiceProductInPanier=i
          break
        }
        else {
          this.newProductInPanier=true 
        }
      }


      if(this.newProductInPanier){
        this.productService.panier.next(++this.productService.pp)
        this.productService.DansPanier[this.productService.pp-1]=item
        this.productService.DansPanier[this.productService.pp-1].qte=1
      }
      else {
        this.productService.DansPanier[this.indiceProductInPanier].qte++
        this.productService.panier.next(++this.productService.pp)}
    }
   }
   afficheDetail(item:any){
     

   }
}