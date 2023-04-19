import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../interfaces/user";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() user:User | undefined;
  @Output() logout: any;
  isShowPayment: boolean = false;

  constructor(private cartService:CartService) {
    this.logout = new EventEmitter;
  }

  logoutEmit() {
    this.cartService.products = [];
    this.logout.emit();
  }
}
