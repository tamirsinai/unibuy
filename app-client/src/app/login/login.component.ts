import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user";
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string = '';
  password:string = '';
  user:User | undefined;
  currPage: string = 'login';

  constructor(private http: HttpClient, private router:Router, private userService: UserService) { }

  login() {
    this.http.post('http://localhost:8080/login', {email: this.email, password: this.password}).subscribe((res:any) => {
      if (res) {
        // this.user = res;
        this.currPage = 'home';
        this.email = '';
        this.password = '';
        this.userService = res;
        this.router.navigateByUrl('/home')
      } else {
        alert('User dosent exist!');
      }
    });
  }

  changePage(page:string) {
    this.currPage = page;
  }

  // logout() {
  //   delete this.user;
  //   this.currPage = 'login';
  // }
}
