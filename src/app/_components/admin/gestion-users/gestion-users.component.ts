import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/_services/authentification.service';
import { faEdit,faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



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
  loadPage=false
  roles:any=["Client","Administrateur","Moderateur","Commercial","Comptable"]

  constructor(private authService:AuthentificationService,private http:HttpClient) { 
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
    }).then(()=>{this.loadPage=true})
    
  }

  ngOnInit(): void {
  }
  onEdit(user:any){
    this.userEdit=user
    

  }
  onDelate(id:any){

  }
  onSave(id:any,f:any){
    this.http.put("http://localhost:3000/users"+id,f).subscribe(()=>{
      this.loadPage=false
    }).closed
    if(closed)this.loadPage=true

  }
  onAdd(f:any){
    console.log(f);
    
  }
  onCancel(f:NgForm){
    f.reset()
  }

}
