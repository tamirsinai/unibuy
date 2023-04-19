import { Injectable } from '@angular/core';
import {Product} from "../search/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: Product[] = [];

  constructor() { }

  addItem(product: Product) {
    this.products.push(product);
  }
}
