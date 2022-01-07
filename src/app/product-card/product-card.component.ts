import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthentificationService } from '../authentification.service';
import { ActivatedRoute, Router,Params } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
items:any
isAuth:any
token:any

  constructor(private productService:ProductService,private authentifacationService:AuthentificationService,private router:Router,private activatedRoute:ActivatedRoute) { 
    
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.token=Object.getOwnPropertyDescriptors(params)
   });   
   
   if(Object.keys(this.token).length){
    this.productService.OnGetProduct().then((data)=>{
      this.items=data}) 
      this.authentifacationService.autoriser.subscribe((data)=>{
        this.isAuth=data
        /*if (data===undefined) { 
          this.isAuth=false  
          console.log("oui");
        }*/
        })
        /*if (this.isAuth===undefined) { 
          this.isAuth=false  
        }
        if(this.isAuth==false){
          this.router.navigateByUrl('/home').then((res)=>{})
        }*/
      }
      else this.router.navigateByUrl('/home').then((res)=>{})
 }
  ngOnInit(): void { 
    
   }

}
