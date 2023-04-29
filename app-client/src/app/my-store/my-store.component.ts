import { Component } from '@angular/core';
import {HomeService} from "../services/home.service";
import {HttpClient} from "@angular/common/http";
import {Tags} from "../models/tags.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.css']
})
export class MyStoreComponent {
  colors: string[] = ["red","white", "blue", "green", "black", "yellow"];
  Tags = Tags;
  values = Object.values;
  store: any;
  itemName: string = '';
  itemPrice: string = '';
  itemDescription: string = '';
  itemQuantity: string = '';
  itemImage: string = '';
  selectedColors:string[] = [];
  selectedOptionsTags:Tags[] = [];
  showCreateItemView: boolean = true;

  constructor(private homeService: HomeService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.post('http://localhost:8080/getStore', {adminId: this.homeService.user?._id}).subscribe((res:any) => {
      this.store = res;
      this.homeService.store = this.store;
    });
  }

  addItem() {
    this.showCreateItemView = !this.showCreateItemView;
  }

  createItem() {
    this.http.post('http://localhost:8080/shop/insert', [{name: this.itemName, price: this.itemPrice, description: this.itemDescription, quantity: this.itemQuantity, image: this.itemImage, colors: this.selectedColors, tags: this.selectedOptionsTags, storeId: this.store._id}]).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['profile']);
    });
  }
}
