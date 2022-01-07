import { Component, OnInit } from '@angular/core';
import { Observer, Subscription } from 'rxjs';
import { AuthentificationService } from '../authentification.service';
import { Router, ActivatedRoute ,Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth:any
  users:any
  token:any
  apiDB:any

  constructor(private AuthentificationService:AuthentificationService,private router:Router,private activatedRoute:ActivatedRoute,private http:HttpClient) {
    
    
  }

  ngOnInit(): void {    
      

    
  }
  deconnexion(){
    for (let i = 0; i < this.apiDB.length; i++) {
      if(this.token.t.value==this.apiDB[i].token){
        this.http.patch(`http://localhost:3000/api/${this.apiDB[i].userID}`,{token:0}).subscribe(()=>{
          this.AuthentificationService.isAuth.next(false)
          this.router.navigateByUrl('/home').then((res)=>{})
        })
        break
      }
    }
    

  }
  GoToProduct(){
    this.router.navigateByUrl('/product?t='+this.AuthentificationService.token).then((res)=>{})
  }
  GoToHome(){
    this.router.navigateByUrl('/home?t='+this.AuthentificationService.token).then((res)=>{})
  }


}