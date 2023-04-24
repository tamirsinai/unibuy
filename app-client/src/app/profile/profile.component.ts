import {Component} from '@angular/core';
import {User} from "../interfaces/user";
import {HomeService} from "../services/home.service";
import {HttpClient} from "@angular/common/http";

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

  constructor(private homeService: HomeService, private http: HttpClient) { }

  ngOnInit() {
    this.user = this.homeService.user;
    this.http.get('http://localhost:8080/users').subscribe((res:any) => {
      this.allUsers = res;
    });
  }

  createStoreView() {
    this.showCreateStoreView = !this.showCreateStoreView;
  }

  createStore() {
    this.http.post('http://localhost:8080/createStore', {name: this.storeName, adminId: this.selectedUser?._id}).subscribe((res:any) => {
      console.log(res);
    });
  }
}
