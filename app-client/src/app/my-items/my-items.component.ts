import { Component } from '@angular/core';
import {HomeService} from "../services/home.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css']
})
export class MyItemsComponent {
  store: any;
  constructor(private homeService: HomeService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // @ts-ignore
    !this.store ? this.homeService.store.next(JSON.parse(localStorage.getItem('store'))) : undefined;
    this.homeService.store.subscribe(res => {
      this.store = res;
    })
  }
}
