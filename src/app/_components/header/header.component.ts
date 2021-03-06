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
  alertAnimation:any=false
  alertShow:any=false
  msg:any
  aMsg:any
  successAnimation:any=false
  successShow:any=false
  panierAfter=1
  pAlertMsg:any
  pAlertAnimation=false
  pAlertShow=false
  isRegistred:any
  rLink:any
  srch:any
  clickedProductUrl:any=false


  constructor(private AuthentificationService:AuthentificationService,private router:Router,private productService:ProductService) {  
    this.checkIsRegistred()
    this.checkIsAuth()
    this.productService.panier.subscribe((data)=>{
      this.panier=data
      if(this.panierAfter==this.panier){
        this.panierAfter++
        this.pAlertMsg="Produit ajouter au panier avec succes"
        this.pAlertShow=!this.pAlertShow
        this.pAlertAnimation=!this.pAlertAnimation
        setTimeout(() => {
          this.pAlertAnimation=!this.pAlertAnimation
        }, 2000);
        setTimeout(() => {
          this.pAlertShow=!this.pAlertShow
        },3000);
      }
    })

    this.AuthentificationService.role.subscribe((data)=>{
      this.role=data    
    })    
      }

  ngOnInit(): void {   
    this.rLink=this.AuthentificationService.rLink

    this.AuthentificationService.successNotif$.subscribe((data)=>{
      if(data){
        this.onSuccessMsg(this.AuthentificationService.msg)
      }
    }) 
    this.AuthentificationService.alertNotif$.subscribe((data2)=>{
      if(data2){
        this.onAlertMsg(this.AuthentificationService.aMsg)
      }
    }) 
  }

  checkIsAuth(){
        
      if(this.AuthentificationService.token!=null){
        this.AuthentificationService.onSuccessNotif(true,"connexion avec success")
        this.isAuth=true
      }
      else this.isAuth=false
    
  }

  checkIsRegistred(){
    this.isRegistred=false
    this.AuthentificationService.oAccountCreated.subscribe((data)=>{
      this.isRegistred=data
      if(this.isRegistred===true){
        this.AuthentificationService.onSuccessNotif(true,"Compte enregistrer avec succes")
      }
    })
  }

  deconnexion(){
    sessionStorage.removeItem('token')
    
    this.productService.panier.next(0)
    
    this.AuthentificationService.role.next(0)
    this.productService.DansPanier=[]
    this.productService.panier.next(0)
    this.productService.pp=0
    this.router.navigateByUrl('/home').then(()=>{window.location.reload()})
    
    
  }

  onAlertMsg(msg:string){
          this.aMsg=msg
          this.alertShow=!this.alertShow
          this.alertAnimation=!this.alertAnimation
          setTimeout(() => {
            this.alertAnimation=!this.alertAnimation
          }, 5000);
          setTimeout(() => {
            this.alertShow=!this.alertShow
          },6000);
  }
  onSuccessMsg(msg:string){
          this.msg=msg
          this.successShow=!this.successShow
          this.successAnimation=!this.successAnimation
          setTimeout(() => {
            this.successAnimation=!this.successAnimation
          }, 5000);
          setTimeout(() => {
            this.successShow=!this.successShow
          },6000);
  }
  activateProdcutUrl(){
    this.clickedProductUrl=true
  }
  desactivateProdcutUrl(){
    this.clickedProductUrl=false
  }

  onSearch(f:any){
    if(f.value.srch){
      this.productService._srch.next(f.value.srch.toUpperCase())   
    }
    else this.productService._srch.next("")    
  }

}