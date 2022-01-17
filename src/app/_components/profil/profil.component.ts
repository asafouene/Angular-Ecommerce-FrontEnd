import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/_services/authentification.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  users:any
  myProfil:any
  loadPage=false
  errorAnimation=false


  constructor(private authService:AuthentificationService,private http:HttpClient,private router:Router) {
    this.authService.OnGetUser().then((data)=>{
      this.users=data      
    }).then(()=>{
      for (let i = 0; i < this.users.length; i++) {        
        if(this.users[i].id==this.authService.idAuth){
          this.myProfil=this.users[i]
          break
        }
      }
      }).then(()=>{
      if(this.myProfil.url_img==undefined)this.myProfil.url_img="https://www.seekpng.com/png/detail/413-4139803_unknown-profile-profile-picture-unknown.png"    
    }).finally(()=>{this.loadPage=true})
   }

  ngOnInit(): void {
  }
  onChange(f:NgForm){
    
    if(this.myProfil.password!=f.value.opwd){
      this.authService.onAlertNotif(true,"ancien mot de passe erroner")
      this.errorAnimation=true
      setTimeout(() => {
        this.errorAnimation=false
      }, 1000);
      
    }
    else if(f.value.npwd!=f.value.rnpwd){
      this.authService.onAlertNotif(true,"nouveau mot de passe n'est pas identique")
      this.errorAnimation=true
      setTimeout(() => {
        this.errorAnimation=false
      }, 1000);
    }
    else{
      this.http.patch("http://localhost:3000/users/"+this.myProfil.id,{password:f.value.npwd}).subscribe(()=>{
        window.location.reload();
      })
    }
    

  }
  onCancel(f:NgForm){
    f.reset()
  }

}
