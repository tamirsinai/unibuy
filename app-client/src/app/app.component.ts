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

  constructor(private cartService:CartService, private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    this.homeService.user.subscribe(res => {
      this.user = res;
    })
  }
}
