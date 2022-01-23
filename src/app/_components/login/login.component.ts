import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthentificationService } from 'src/app/_services/authentification.service';
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
          let r = (Math.random()).toString(36).substring(2)
          let api={
            id:this.usersDB[i].id,
            token:r,
            delay:99
          }
          let exist          
          for (let j = 0; j < this.apiDB.length; j++) {
            if(this.apiDB[j].id==api.id){
              exist=true
              break
            }
            else exist=false 
          }
          if(exist){
            this.http.put("http://localhost:3000/api/"+api.id,api).subscribe(()=>{
              sessionStorage.setItem('token', api.token);
              this.router.navigateByUrl('/home').then(()=>{window.location.reload()})
            })
            break
          }
          else{
            this.http.post("http://localhost:3000/api",api).subscribe(()=>{
            sessionStorage.setItem('token', api.token);
            this.router.navigateByUrl('/home').then(()=>{window.location.reload()})
          })
          break
          }          
        }
      else this.verifconnect="Email ou password incorrect"
    }
  }
}
