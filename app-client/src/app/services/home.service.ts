import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  user = new BehaviorSubject<User | undefined>(undefined);
  store: any;

  constructor() { }
}
