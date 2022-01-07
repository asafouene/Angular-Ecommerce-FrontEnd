import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  nameAuth=new Subject()
  isAuth=new Subject()
  autoriser=this.isAuth.asObservable()
  token:any

  constructor(private http: HttpClient) {
    //this.autoriser.subscribe()
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
    });
    })    
  }

  getName(){
    this.nameAuth.subscribe((data)=>{
      return data
    })
  }
  setName(nameAth:string){
    this.nameAuth.next(nameAth)
  }
  ngOnInit(): void {

  }
}
