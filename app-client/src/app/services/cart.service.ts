import { Injectable } from '@angular/core';
import {Product} from "../search/product.model";
import {BehaviorSubject} from "rxjs";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products = new BehaviorSubject<Product[]>([]);

  constructor() { }

  addItem(product: Product) {
    if (!this.products.getValue().some(prod => prod.name == product.name)) {
      this.products.next([...this.products.getValue(), product]);
      localStorage.setItem('products', JSON.stringify(this.products.getValue()));
      alert(`${product.name} added successfully to cart!`);
    } else {
      alert(`${product.name} already in your cart!`);
    }
  }
}
