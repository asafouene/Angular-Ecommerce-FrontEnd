import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  jsonDataResult: any;
  constructor(private http: HttpClient) {}
  OnGetProduct(){
    return new Promise((result,rej)=>{
      this.http.get('http://localhost:3000/items').subscribe((res) => {
      this.jsonDataResult = res;
      result(res)
    });
    })
  }
}
