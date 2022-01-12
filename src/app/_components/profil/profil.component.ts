import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/_services/authentification.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  users:any
  myProfil:any

  constructor(private authService:AuthentificationService,private http:HttpClient) {
    this.authService.OnGetUser().then((data)=>{
      this.users=data      
    }).then(()=>{
      for (let i = 0; i < this.users.length; i++) {        
        if(this.users[i].id==this.authService.idAuth){
          this.myProfil=this.users[i]
          break
        }
      }
      }).finally(()=>{
      if(this.myProfil.url_img==undefined)this.myProfil.url_img="https://www.seekpng.com/png/detail/413-4139803_unknown-profile-profile-picture-unknown.png"    
    })
   }

  ngOnInit(): void {
  }
  onChange(f:NgForm){
    
    if(this.myProfil.password==f.value.opwd&&f.value.npwd==f.value.rnpwd){
      this.http.patch("http://localhost:3000/users/"+this.myProfil.id,{password:f.value.npwd}).subscribe()
    }
    else console.log("Erreur");
    

  }
  onCancel(f:NgForm){
    f.reset
  }

}
