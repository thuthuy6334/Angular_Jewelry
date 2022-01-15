import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BosuutapComponent } from './components/bosuutap/bosuutap.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailComponent } from './components/detail/detail.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProductComponent } from './components/product/product.component';
import { ProducttypeComponent } from './components/producttype/producttype.component';
import { SigninComponent } from './components/signin/signin.component';


const routes: Routes = [
  {path:'', component:MainComponent},
  {path:'product', component:ProductComponent},
  {path:'detail/:masp', component:DetailComponent},
  {path:'bosuutap', component:BosuutapComponent}, 
  {path:'signin', component:SigninComponent},
  {path:'cart', component:CartComponent},
  {path:'login', component:LoginComponent},
  {path:'about', component:AboutComponent},
  {path:'contact', component:ContactComponent},
  {path: 'checkout', component:CheckoutComponent},
  {path:'products/loaisp/:tenlsp', component:ProducttypeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
