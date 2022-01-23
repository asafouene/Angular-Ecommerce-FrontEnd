import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  _successNotif=new Subject<boolean>()
  successNotif$=this._successNotif.asObservable()
  _alertNotif=new Subject<boolean>()
  alertNotif$=this._alertNotif.asObservable()
  msg:string=""
  aMsg:string=""
  rLink:any
  token:any
  users:any
  idAuth:any=""
  role=new Subject<number>()
  isAuth=new Subject()
  autoriser=this.isAuth.asObservable()
  accountCreated=new Subject()
  oAccountCreated=this.accountCreated.asObservable()
  apiDB:any

  auth=false
  aut=this.isAuth.asObservable()

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('token')
    if(this.token!=null){
      this.OnGetApi().then((data)=>{
        this.apiDB=data
    }).then(()=>{
      for (let j = 0; j < this.apiDB.length; j++) {
        if(this.apiDB[j].token==this.token){
          this.OnGetUser().then((data)=>{
            this.users=data
          }).then(()=>{
            for (let i = 0; i < this.users.length; i++) {
              if(this.apiDB[j].id==this.users[i].id){            
                this.role.next(this.users[i].role)
                this.idAuth=this.apiDB[j].id
                break
              }
            }
          })
        }     
      }
    })
      this.isAuth.next(true)
      this.auth=true
      
      
    } 
    else this.isAuth.next(false)

    
    
  }
  OnGetUser(){
    return new Promise((result,rej)=>{
      this.http.get('http://localhost:3000/users').subscribe((res) => {
      result(res)
    });
    }) 
     
    
  }
  OnGetApi(){
    return new Promise((result,rej)=>{
      this.http.get('http://localhost:3000/api').subscribe((res) => {
      result(res)
    })
    })    
  }
  ngOnInit(): void {
  }
  onAlertNotif(etat:boolean,msg:string){
    this.aMsg=msg
    this._alertNotif.next(etat)
  }
  onSuccessNotif(etat:boolean,msg:string){
    this.msg=msg
    this._successNotif.next(etat)
  }
}
