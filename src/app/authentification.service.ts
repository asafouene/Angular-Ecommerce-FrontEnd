import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ActivatedRoute ,Params} from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  nameAuth=new Subject()
  isAuth=new Subject()
  autoriser=this.isAuth.asObservable()
  token:any
  apiDB:any

  constructor(private http: HttpClient,private activatedRoute:ActivatedRoute) {
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
    })
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
  CheckToken(){
    this.activatedRoute.queryParams.subscribe((params: Params) => {
    this.token=Object.getOwnPropertyDescriptors(params)})
    this.OnGetApi().then((data)=>{
    this.apiDB=data})

    if(this.token.t.value===undefined){}
    else
      for (let i = 0; i < this.apiDB.length; i++) {
        if(this.token.t.value===this.apiDB[i].token){
          this.isAuth.next(true)
          
          
          break
        }
        console.log(this.apiDB[i])        
      }
    
  }
}
