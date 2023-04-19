import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user";
import {HomeService} from "../services/home.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string = '';
  password:string = '';
  user:User | undefined;

  constructor(private http: HttpClient, private router: Router, private homeService: HomeService) { }

  login() {
    this.http.post('http://localhost:8080/login', {email: this.email, password: this.password}).subscribe((res:any) => {
      if (res) {
        this.homeService.user = res;
        this.user = res;
        this.router.navigate(['home']);
        this.email = '';
        this.password = '';
      } else {
        alert('User dosent exist!');
      }
    });
  }
}
