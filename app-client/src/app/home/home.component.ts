import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../interfaces/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() user:User | undefined;
  @Output() logout: any;
  isShowPayment: boolean = false;

  constructor() {
    this.logout = new EventEmitter;
  }

  logoutEmit() {
    this.logout.emit();
  }
}
