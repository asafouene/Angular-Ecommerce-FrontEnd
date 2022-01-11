import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/_services/authentification.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  users:any
  myProfil:any

  constructor(private authService:AuthentificationService) {
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
      console.log(this.myProfil.url_img)
      
    })
    
   }

  ngOnInit(): void {
  }

}
