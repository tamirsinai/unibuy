import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { ProfileComponent } from './profile/profile.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { MyStoreComponent } from './my-store/my-store.component';
import { MyItemsComponent } from './my-items/my-items.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    PaymentComponent,
    ProfileComponent,
    CreateStoreComponent,
    MyStoreComponent,
    MyItemsComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxPayPalModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
