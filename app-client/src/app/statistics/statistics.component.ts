import { Component } from '@angular/core';
import {User} from "../interfaces/user";
import {HomeService} from "../services/home.service";
import {HttpClient} from "@angular/common/http";
import {CartService} from "../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  user:User | undefined;

  constructor(private homeService: HomeService, private http: HttpClient, private cartService:CartService, private router: Router) { }

  ngOnInit() {
    this.user = this.homeService.user.getValue();
    // @ts-ignore
    !this.user ? this.homeService.user.next(JSON.parse(localStorage.getItem('user'))) : undefined;
    this.homeService.user.subscribe(res => {
      this.user = res;
    })
  }
}
