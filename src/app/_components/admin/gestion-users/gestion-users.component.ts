import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/_services/authentification.service';
import { faEdit,faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.css']
})
export class GestionUsersComponent implements OnInit {
  users:any=[]
  userEdit:any=[]
  faedit = faEdit
  fatrash=faTrash
  faplus=faPlus

  constructor(private authService:AuthentificationService) { 
    this.authService.OnGetUser().then((data)=>{
      this.users=data
    }).then(()=>{
      for (let i = 0; i < this.users.length; i++) {
        if(this.users[i].Role==1)this.users[i].role="Administrateur"
        else if (this.users[i].Role==0)this.users[i].role="Client"

        if(this.users[i].url_img==undefined){
          this.users[i].url_img="https://www.seekpng.com/png/detail/413-4139803_unknown-profile-profile-picture-unknown.png"
        }

      }
    })
    
  }

  ngOnInit(): void {
  }
  onEdit(user:any){
    this.userEdit=user

  }
  onDelate(id:any){

  }
  onSave(id:any,f:any){

  }
  onAdd(f:any){

  }

}
