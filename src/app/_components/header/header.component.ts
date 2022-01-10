import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/_services/authentification.service';
import { Router} from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth:any
  panier=0
  role=0
  fauser=faUser
  alertMsg:any
  alertAnimation=false
  alertShow=false
  panierAfter=1


  constructor(private AuthentificationService:AuthentificationService,private router:Router,private productService:ProductService) {
    
    this.AuthentificationService.autoriser.subscribe((data)=>{
      this.isAuth=data
      if(this.isAuth===true){
        this.alertMsg="Connexion avec succes"
        this.alertShow=!this.alertShow
        this.alertAnimation=!this.alertAnimation
        setTimeout(() => {
          this.alertAnimation=!this.alertAnimation
        }, 5000);
        setTimeout(() => {
          this.alertShow=!this.alertShow
        },6000);
      }
    })
    this.productService.panier.subscribe((data)=>{
      this.panier=data
      if(this.panierAfter==this.panier){
        this.panierAfter++
        this.alertMsg="Produit ajouter au panier avec succes"
        this.alertShow=!this.alertShow
        this.alertAnimation=!this.alertAnimation
        setTimeout(() => {
          this.alertAnimation=!this.alertAnimation
        }, 5000);
        setTimeout(() => {
          this.alertShow=!this.alertShow
        },6000);
      }
      
      
    })

    this.AuthentificationService.role.subscribe((data)=>{
      this.role=data      
    })    
    
  }

  ngOnInit(): void {    
    
      
      
    
      

    

    
    
 
    
  }

  deconnexion(){
    this.AuthentificationService.isAuth.next(false)
    this.productService.panier.next(0)
    this.router.navigateByUrl('/home')
  }

}