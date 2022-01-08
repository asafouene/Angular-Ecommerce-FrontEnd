import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/authentification.service';
import { ProductService } from 'src/app/product.service';
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-gestion-produit',
  templateUrl: './gestion-produit.component.html',
  styleUrls: ['./gestion-produit.component.css']
})
export class GestionProduitComponent implements OnInit {
  items:any
  faedit = faEdit
  fatrash=faTrash


  constructor(private productService:ProductService,private authentifacationService:AuthentificationService) { 
    this.productService.OnGetProduct().then((data)=>{
      this.items=data}) 

  }

  ngOnInit(): void {
  }

}
