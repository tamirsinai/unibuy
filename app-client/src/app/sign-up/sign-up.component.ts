import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  email:string = '';
  password:string = '';
  name:string = '';

  constructor(private http: HttpClient, private router: Router) { }

  signup() {
    this.http.post('http://172.20.10.2:8080/signup', {email: this.email, password: this.password, name: this.name}).subscribe(res => {
      if (res) {
        this.router.navigate(['']);
      } else {
        alert('Error with create new user, please try again')
      }
    });
  }
}
