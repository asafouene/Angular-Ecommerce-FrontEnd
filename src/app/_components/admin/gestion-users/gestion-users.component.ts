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
    }).then(()=>{this.loadPage=true})
  }

  ngOnInit(): void {
  }
  onEdit(user:any){
    this.userEdit=user
  }

  onDelate(user:any){
    if(user.role==1){
      let nbrAdmin=0
     for (let i = 0; i < this.users.length; i++) {
      if(this.users[i]==1)nbrAdmin++
     }
     if(nbrAdmin<2)this.authService.onAlertNotif(true,"Impossible car vous êtes le seul administrateur !")
    }
    else{
      this.http.delete("http://localhost:3000/users/"+user.id).subscribe((data)=>{        
        this.authService.OnGetUser().then((data)=>{
          this.users=data
        }).then(()=>{this.loadPage=true})
        this.authService.onSuccessNotif(true,"Utilisateur supprimer avec success")
      })
    }
  }

  onSave(id:any,f:any){
    this.http.patch("http://localhost:3000/users/"+id,f).subscribe(()=>{
      this.authService.OnGetUser().then((data)=>{
        this.users=data
      }).then(()=>{this.loadPage=true})
      this.authService.onSuccessNotif(true,"Utilisateur modifier avec success")
    })
  }

  onAdd(f:any){
    this.http.post("http://localhost:3000/users",f).subscribe((data)=>{
      this.authService.OnGetUser().then((data)=>{
        this.users=data
        }).then(()=>{this.loadPage=true})
        this.authService.onSuccessNotif(true,"Utilisateur ajouter avec success")    
    }) 
  }

  onCancel(f:NgForm){
    f.reset()
  }
}
