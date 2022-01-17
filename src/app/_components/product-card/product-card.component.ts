import { Component, Injectable, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { AuthentificationService } from 'src/app/_services/authentification.service';
import { UpperCasePipe } from '@angular/common';


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
itemsFilterd:any[]=[]
isAuth:any
newProductInPanier:any
indiceProductInPanier:any
pages:any=[]
itemsPerPage:any=[]
a:any


  constructor(private productService:ProductService,private authentifacationService:AuthentificationService) { 
    this.productService.OnGetProduct().then((data)=>{
    this.items=data
          for (let i = 0; i < this.items.length; i++) {
          this.itemsFilterd[i]=this.items[i]
        }
      
      
    
  }).then(()=>{
      this.calculNumberPages()}).then(()=>{
      this.pagination(0)
    })

    this.authentifacationService.autoriser.subscribe((data)=>{
        this.isAuth=data
        })        
 }
  ngOnInit(): void { 
    this.productService.srch$.subscribe((res)=>{
      this.itemsFilterd=[]
      for (let i = 0; i < this.items.length; i++) {        
        if(this.items[i].name.toUpperCase().indexOf(res)!=-1){
          this.itemsFilterd.push(this.items[i])
        }
      }
      this.calculNumberPages()
      this.pagination(0) 
    })   
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
    this.pages=[]
    for (let i = 0; i < this.itemsFilterd.length; i+=3) {
      this.pages[j]=this.itemsFilterd[i]
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
     console.log(this.itemsFilterd.length)
     if(this.itemsFilterd.length!=0){
       this.desactivePagination()
       this.pages[num].status=true}
     for (let i = debut; i < fin; i++) {
      this.itemsPerPage[j]=this.itemsFilterd[i]       
      j++
     }
   }
}