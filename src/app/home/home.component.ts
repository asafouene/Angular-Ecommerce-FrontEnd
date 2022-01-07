import { Component, OnInit } from '@angular/core';
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

  constructor(private productService:ProductService,private AuthentificationService:AuthentificationService) {  
        
    this.productService.OnGetProduct().then((data_product)=>{
      this.items=data_product
      this.firstItem=this.items[0]})  
              
  }

  ngOnInit(): void {

    this.AuthentificationService.CheckToken()
  }
  
}
