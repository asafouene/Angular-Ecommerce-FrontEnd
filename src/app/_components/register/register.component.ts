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

  constructor(private http:HttpClient,private router:Router,private authService:AuthentificationService) { }

  ngOnInit(): void {
    
}
onSubmit(f:NgForm){
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
        this.http.post("http://localhost:3000/users",newUser).subscribe({complete:()=>{
          for (let i = 0; i < this.users.length; i++) {
            if(this.users[i].email==newUser.email){
              this.msg="compte existe déjà"
              break
            }
            else {
              this.authService.accountCreated.next(true)
              this.router.navigateByUrl('/login')
            }
          }
          
        }})
      })  
    
  }
  else {this.msg="mot de passe pas identique"}
  
  
  }
}
