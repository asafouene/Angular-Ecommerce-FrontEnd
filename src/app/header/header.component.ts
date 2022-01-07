import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router} from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth:any
  constructor(private AuthentificationService:AuthentificationService,private router:Router) {
  }
  ngOnInit(): void {    
    this.AuthentificationService.autoriser.subscribe((data)=>{
      this.isAuth=data
    })
  }
  deconnexion(){
    this.AuthentificationService.isAuth.next(false)
    this.router.navigateByUrl('/home')
  }
}