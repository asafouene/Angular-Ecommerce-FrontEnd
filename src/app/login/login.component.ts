import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  role:any
  

  constructor(private AuthentificationService:AuthentificationService,private router:Router) {
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
          this.AuthentificationService.role.next(this.usersDB[i].Role)
          this.AuthentificationService.isAuth.next(true)
          this.AuthentificationService.auth=true
          this.router.navigateByUrl('/home')
          break          
        }
      else this.verifconnect="Email ou password incorrect"
    }
  }
}
