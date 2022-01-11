import { Component, Injectable, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { AuthentificationService } from 'src/app/_services/authentification.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class ProductCardComponent implements OnInit {
items:any
isAuth:any
newProductInPanier:any
indiceProductInPanier:any
pages:any[]=[]
itemsPerPage:any[]=[]


  constructor(private productService:ProductService,private authentifacationService:AuthentificationService) { 
    this.productService.OnGetProduct().then((data)=>{
    this.items=data}).then(()=>{
      this.calculNumberPages()}).then(()=>{
      this.pagination(0)
    })

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
   calculNumberPages(){
    let j =0
    for (let i = 0; i < this.items.length; i+=3) {
      this.pages[j]=this.items[i]
      j++
    }
   }
   desactivePagination(){
     for (let i = 0; i < this.pages.length; i++) {
      this.pages[i].status=false
     }
   }

   pagination(num:any){
     let debut
     let fin
     let j=0
     debut=(num)*3
     fin=debut+3
     this.desactivePagination()
     this.pages[num].status=true
     for (let i = debut; i < fin; i++) {
      this.itemsPerPage[j]=this.items[i]       
      j++
     }
   }
}