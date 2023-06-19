import { Component } from '@angular/core';
import {HomeService} from "../services/home.service";
import {HttpClient} from "@angular/common/http";
import {Tags} from "../models/tags.model";
import {Router} from "@angular/router";
import {User} from "../interfaces/user";

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.css']
})
export class MyStoreComponent {
  colors: string[] = ["Red","White", "Blue", "Green", "Black", "Yellow", "Brown"];
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
  user:User | undefined;

  constructor(private homeService: HomeService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // @ts-ignore
    !this.user ? this.homeService.user.next(JSON.parse(localStorage.getItem('user'))) : undefined;
    this.homeService.user.subscribe(res => {
      this.user = res;
    });
    this.user?.isSeller && this.http.post('http://172.20.10.2:8080/getStore', {adminId: this.user?._id}).subscribe((res:any) => {
      this.store = res;
      this.homeService.store.next(this.store);
      localStorage.setItem('store', JSON.stringify(res));
    });
  }

  createItem() {
    this.http.post('http://172.20.10.2:8080/shop/insert', [{name: this.itemName, price: this.itemPrice, description: this.itemDescription, quantity: this.itemQuantity, image: this.itemImage, colors: this.selectedColors, tags: this.selectedOptionsTags, storeId: this.store._id}]).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['profile']);
    });
  }
}
