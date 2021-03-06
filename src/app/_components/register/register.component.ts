import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/_services/authentification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users:any
  msg:any
  userExiste:boolean=false
  verifEmail:any
  inputEmail:any

  constructor(private http:HttpClient,private router:Router,private authService:AuthentificationService) {
    

   }

  ngOnInit(): void {
    
}
onSubmit(f:NgForm){
  this.userExiste=false
  console.log(f.value);
  let newUser={
    email:f.value.email,
    username:f.value.username,
    password:f.value.pwd,
    Role:0
  }

  if(f.value.pwd==f.value.rpwd){
    this.authService.OnGetUser().then((data)=>{
      this.users=data}).then(()=>{
        for (let i = 0; i < this.users.length; i++) {
          if(this.users[i].email==newUser.email){
            this.userExiste=true  
          }
        }
        if(this.userExiste){
          this.msg="compte existe déjà"
        }
          else{
            this.authService.accountCreated.next(true)
            this.http.post("http://localhost:3000/users",newUser).subscribe({complete:()=>{
              this.router.navigateByUrl('/login')
            }})}
        })  
  }
  else {this.msg="mot de passe pas identique"}
  
  
  }
}
