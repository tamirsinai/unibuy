import {Component, OnChanges, OnInit, Pipe, PipeTransform, ViewEncapsulation} from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import {Tags} from "../models/tags.model";
import { Filter } from '../models/filter';
import {first} from "rxjs/operators";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements  OnInit {

  searchQuery: string = '';
  searchUrl: string = "http://localhost:8080/search"
  newestUrl: string = "http://localhost:8080/search/newest"

colors: string[] = ["red","white", "blue", "green", "black", "yellow"];

Tags = Tags;
values = Object.values;
selectedOptionsTags:Tags[] = [];
selectedColors:string[] = [];
products: Product[] = [];
private newestProducts: Product[] = [];

constructor(private http: HttpClient, private cartService:CartService) { }

  ngOnInit(): void {
    this.getNewestProducts();
  }

  setProducts(products: Product[]): void {
  if(this.isEmptySearch())
    this.products = this.newestProducts;
  else
    this.products = products;
  }

  private isEmptySearch() {
    return !this.selectedColors.length && !this.selectedOptionsTags.length && this.searchQuery === '';
  }

  private getNewestProducts() {
    this.http.get<Product[]>(this.newestUrl).pipe(first()).subscribe(
      data => {
        console.log(data);
        this.newestProducts = data;
        this.setProducts(this.newestProducts);
      },
      error => {
        console.error('Error gettinf newest products:', error);
      }
    );
  }

  search() {
    if (!this.isEmptySearch()) {
      const searchFilter: Filter = {
        tags: this.selectedOptionsTags,
        wordSearch: this.searchQuery,
        colors: this.selectedColors,
        limit: 10
      };
      console.log(searchFilter);

      this.http.post<Product[]>(this.searchUrl, searchFilter).pipe(first()).subscribe(
        data => {
          console.log(data);
          this.setProducts(data);
        },
        error => {
          console.error('Error searching products:', error);
        }
      );
    } else {
      this.products = this.newestProducts;
    }
  }

  addItem(product: Product) {
    this.cartService.addItem(product);
    alert(`${product.name} added successfully to cart!`);
  }

  selectOption(option: any) {
    this.selectedOptionsTags.some(tag => tag == option) ? this.selectedOptionsTags = this.selectedOptionsTags.filter(tag => tag != option) : this.selectedOptionsTags.push(option);
  }

  showSelectTag(option: any) {
    return this.selectedOptionsTags.some(tag => tag == option);
  }

  selectColor(option: any) {
    this.selectedColors.some(tag => tag == option) ? this.selectedColors = this.selectedColors.filter(tag => tag != option) : this.selectedColors.push(option);
  }

  showSelectColor(option: any) {
    return this.selectedColors.some(tag => tag == option);
  }
}
