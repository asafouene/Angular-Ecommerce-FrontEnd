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

  idAuth:any=""
  role=new Subject<number>()
  isAuth=new Subject()
  autoriser=this.isAuth.asObservable()
  accountCreated=new Subject()
  oAccountCreated=this.accountCreated.asObservable()

  auth=false
  aut=this.isAuth.asObservable()

  constructor(private http: HttpClient) {
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
