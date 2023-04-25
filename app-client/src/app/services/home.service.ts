import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  user: User | undefined;
  store: any;

  constructor() { }
}
