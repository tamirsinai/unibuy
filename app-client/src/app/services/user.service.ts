import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | undefined ;

  constructor(private router:Router) { }

  defineUser(user:User){
    this.user = user;
  }

  logout(){
    delete this.user;
    this.router.navigateByUrl('/login')
  }
}
