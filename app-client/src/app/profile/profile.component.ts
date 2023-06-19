import {Component} from '@angular/core';
import {User} from "../interfaces/user";
import {HomeService} from "../services/home.service";
import {HttpClient} from "@angular/common/http";
import {CartService} from "../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user:User | undefined;
  showCreateStoreView: boolean = false;
  storeName: string = '';
  allUsers: User[] = [];
  selectedUser: User | undefined;
  showCreateItemView: boolean = false;

  constructor(private homeService: HomeService, private http: HttpClient, private cartService:CartService, private router: Router) { }

  ngOnInit() {
    this.user = this.homeService.user.getValue();
    // @ts-ignore
    !this.user ? this.homeService.user.next(JSON.parse(localStorage.getItem('user'))) : undefined;
    this.homeService.user.subscribe(res => {
      this.user = res;
    })
    this.http.get('http://172.20.10.2:8080/users').subscribe((res:any) => {
      this.allUsers = res;
    });
  }

  createStoreView() {
    this.showCreateStoreView = !this.showCreateStoreView;
  }

  createStore() {
    this.http.post('http://172.20.10.2:8080/createStore', {name: this.storeName, adminId: this.selectedUser?._id}).subscribe((res:any) => {
      console.log(res);
    });
  }

  addItem() {
    this.showCreateItemView = !this.showCreateItemView;
  }

  logoutEmit() {
    localStorage.removeItem('user');
    localStorage.removeItem('products');
    localStorage.removeItem('store');
    this.homeService.user.next(undefined);
    this.cartService.products.next([]);
    this.router.navigate(['']);
  }
}
