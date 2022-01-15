import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { ProductComponent } from './components/product/product.component';
import { DetailComponent } from './components/detail/detail.component';
import { BosuutapComponent } from './components/bosuutap/bosuutap.component';
import { SigninComponent } from './components/signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxSpinnerModule} from "ngx-spinner";
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import { CartComponent } from './components/cart/cart.component';
import { ProducttypeComponent } from './components/producttype/producttype.component';
import { LoginComponent } from './components/login/login.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ProductComponent,
    DetailComponent,
    BosuutapComponent,
    SigninComponent,
    CartComponent,
    ProducttypeComponent,
    LoginComponent,
    AboutComponent,
    ContactComponent,
    CheckoutComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
