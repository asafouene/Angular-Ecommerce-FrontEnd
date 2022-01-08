import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
itemsIN:any=[]
somme=0

  constructor(private productService:ProductService) {
    for (let i = 0; i < this.productService.DansPanier.length; i++) {
      this.itemsIN[i] = this.productService.DansPanier[i] 
      this.somme+=this.itemsIN[i].prix
      
    } 
  }
  ngOnInit(): void {
  }
}
