import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData!: CartModelServer;
  cartTotal!: number;
  subTotal!: number;
  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
     this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }
  ChangeQuantity(masp: number, increaseQuantity: Boolean) {
    this.cartService.UpdateCartData(masp, increaseQuantity);
  }

}
