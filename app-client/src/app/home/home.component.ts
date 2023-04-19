import {Component, EventEmitter, Output} from '@angular/core';
import {User} from "../interfaces/user";
import {HomeService} from "../services/home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user:User | undefined;
  @Output() logout: any;

  constructor(private homeService: HomeService) {
    this.logout = new EventEmitter;
  }

  ngOnInit() {
    this.user = this.homeService.user;
  }
}
