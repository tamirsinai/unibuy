import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {HomeComponent} from "./home/home.component";
import {PaymentComponent} from "./payment/payment.component";
import {MyStoreComponent} from "./my-store/my-store.component";
import {MyItemsComponent} from "./my-items/my-items.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'my-store', component: MyStoreComponent },
  { path: 'my-items', component: MyItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
