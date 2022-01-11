import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/_services/authentification.service';
import { ProductService } from 'src/app/_services/product.service';
import { faEdit,faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductCardComponent } from '../../product-card/product-card.component';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-gestion-produit',
  templateUrl: './gestion-produit.component.html',
  styleUrls: ['./gestion-produit.component.css']
})
export class GestionProduitComponent implements OnInit {
  itemEdit:any=[]
  items:any
  faedit = faEdit
  fatrash=faTrash
  faplus=faPlus
  loadPage=false


  constructor(private productService:ProductService,private authentifacationService:AuthentificationService,private http:HttpClient,private router:Router,private productComponent:ProductCardComponent) { 
    this.productService.OnGetProduct().then((data)=>{
      this.items=data}).then(()=>{this.loadPage=true})
  }

  ngOnInit(): void {
    

  }
  OnDelate(id:any){
    this.http.delete("http://localhost:3000/items/"+id).subscribe(()=>{
      this.productService.OnGetProduct().then((data)=>{
        this.items=data}) 
    })
  }

  OnEdit(itemOn:any){
    this.itemEdit=itemOn
  }

  onSave(id:any,f:any){
    let edititem={
      id:id,
      name:f.name,
      prix:f.prix,
      img_src:f.img_src,
      desc:f.desc
    }
    this.http.put("http://localhost:3000/items/"+id ,edititem).subscribe()
  }
  
  onAdd(f:any){
    this.http.post("http://localhost:3000/items",f).subscribe({complete:()=>{
      this.loadPage=true
      this.router.navigateByUrl('/product')
    }}).closed

    if(closed){
      this.loadPage=false
    }
      
  }
  onCancel(f:NgForm){
    this.itemEdit=[]
    
  }

}
