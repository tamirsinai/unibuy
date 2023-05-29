import {Component, EventEmitter, Output} from '@angular/core';
import {User} from "../interfaces/user";
import {HomeService} from "../services/home.service";
import {CartService} from "../services/cart.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user:User | undefined;
  store: any;

  constructor(private cartService:CartService, private homeService: HomeService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    // @ts-ignore
    !this.user ? this.homeService.user.next(JSON.parse(localStorage.getItem('user'))) : undefined;
    this.homeService.user.subscribe(res => {
      this.user = res;
    })
    this.user?.isSeller && this.http.post('http://localhost:8080/getStore', {adminId: this.user?._id}).subscribe((res:any) => {
      this.store = res;
      this.homeService.store.next(this.store);
      localStorage.setItem('store', JSON.stringify(res));
    });
  }

  openInstagram(){
    window.open('https://www.instagram.com/', "_blank");
  }
}
