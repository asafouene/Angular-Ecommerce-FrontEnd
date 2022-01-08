import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit {
  pp=0
  panier=new Subject<number>()
  p=this.panier.asObservable()
  jsonDataResult: any
  constructor(private http: HttpClient) {
  }
  OnGetProduct(){
    return new Promise((result,rej)=>{
      this.http.get('http://localhost:3000/items').subscribe((res) => {
      this.jsonDataResult = res;
      result(res)
    });
    })
  }
  ngOnInit(): void {
      //this.panier.next(0)
      
  }
}
