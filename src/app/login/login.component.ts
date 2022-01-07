import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usersDB:any
  verifEmail=false
  verifconnect:any
  apiDB:any
  

  constructor(private AuthentificationService:AuthentificationService,private router:Router,private http:HttpClient) {
    this.AuthentificationService.OnGetUser().then((data)=>{
      this.usersDB=data})

      this.AuthentificationService.OnGetApi().then((data)=>{
        this.apiDB=data})
      
  }
  ngOnInit(): void {
    
  }
onSubmit(f:NgForm){
  for (let i = 0; i < this.usersDB.length; i++) {
    if((f.value.email==this.usersDB[i].email)&&(f.value.pwd==this.usersDB[i].password)){
          this.AuthentificationService.setName(this.usersDB[i].name)
          this.AuthentificationService.isAuth.next(true)
          this.AuthentificationService.token=Math.floor(Math.random() * (1000000 - 99999 + 1)) + 99999
          this.http.patch(`http://localhost:3000/api/${this.usersDB[i].userID}`,{token:this.AuthentificationService.token}).subscribe(()=>{})
          this.router.navigateByUrl('/home?t='+this.AuthentificationService.token)
          
        
          break          
        }
      else this.verifconnect="Email ou password incorrect"
    }
  }
}
