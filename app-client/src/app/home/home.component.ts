import {Component, EventEmitter, Output} from '@angular/core';
import {User} from "../interfaces/user";
import {HomeService} from "../services/home.service";
import {CartService} from "../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user:User | undefined;

  constructor(private cartService:CartService, private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    this.homeService.user.subscribe(res => {
      this.user = res;
    })
  }
}
