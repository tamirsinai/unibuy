import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../interfaces/user";
import {CartService} from "../services/cart.service";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user:User | undefined;

  constructor(private cartService:CartService, private userService: UserService) {
    this.user = userService.user;

  }

  logoutEmit() {
    this.userService.logout();
    this.cartService.products = [];
  }
}
