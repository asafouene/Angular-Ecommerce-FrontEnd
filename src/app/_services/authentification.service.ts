import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

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
}
