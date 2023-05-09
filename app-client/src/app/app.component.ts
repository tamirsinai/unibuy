import { Component } from '@angular/core';
import {CartService} from "./services/cart.service";
import {HomeService} from "./services/home.service";
import {Router} from "@angular/router";
import {User} from "./interfaces/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user:User | undefined;
  productsLength: number = 0;

  constructor(private cartService:CartService, private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    // @ts-ignore
    !this.user ? this.homeService.user.next(JSON.parse(localStorage.getItem('user'))) : undefined;
    this.homeService.user.subscribe(res => {
      this.user = res;
    })
    // @ts-ignore
    !this.productsLength ? this.cartService.products.next(JSON.parse(localStorage.getItem('products'))) : undefined;
    this.cartService.products.subscribe(res => {
      this.productsLength = res?.length || 0;
    })
  }
}
