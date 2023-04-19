import {Component} from '@angular/core';
import {User} from "../interfaces/user";
import {HomeService} from "../services/home.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user:User | undefined;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.user = this.homeService.user;
  }
}
