import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Params } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  items:any
  firstItem:any
  token:any
  apiDB:any
  isAuth:any
  

  constructor(private productService:ProductService,private AuthentificationService:AuthentificationService,private activatedRoute:ActivatedRoute) {  
        
    this.productService.OnGetProduct().then((data_product)=>{
      this.items=data_product
      this.firstItem=this.items[0]})  
              
  }

  ngOnInit(): void {

    this.AuthentificationService.OnGetApi().then((data)=>{
      this.apiDB=data})
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.token=Object.getOwnPropertyDescriptors(params)
  
        for (let i = 0; i < this.apiDB.length; i++) {
          console.log("bilel mrejni aaaa "+this.apiDB[i].token);
  
          if(this.token.t.value==this.apiDB[i].token){
            
            this.AuthentificationService.isAuth.next(true)
            this.isAuth=true
            break
          }
        }
      })
  }
  
}
