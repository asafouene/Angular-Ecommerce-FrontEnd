import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router} from '@angular/router';
import { ProductService } from '../product.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth:any
  panier=0
  constructor(private AuthentificationService:AuthentificationService,private router:Router,private productService:ProductService) {
  }
  ngOnInit(): void {    
    this.AuthentificationService.autoriser.subscribe((data)=>{
      this.isAuth=data
    })
    this.productService.panier.subscribe((data)=>{
      this.panier=data
      console.log(data);
    })
  }
  deconnexion(){
    this.AuthentificationService.isAuth.next(false)
    this.productService.panier.next(0)
    this.router.navigateByUrl('/home')
  }
}