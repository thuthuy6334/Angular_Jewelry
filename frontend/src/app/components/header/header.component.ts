import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartModelServer } from 'src/app/models/cart.model';
import {
  ProductModelServer,
  serverResponse,
} from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartData!: CartModelServer;
  cartTotal!: number;
  subTotal!: number;
  productsMenu: ProductModelServer[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService
      .getAllTypeOfProducts()
      .subscribe((prods: serverResponse) => {
        this.productsMenu = prods.products;
        console.log(this.productsMenu);
      });

    this.cartService.cartDataObs$.subscribe((data) => (this.cartData = data));
    this.cartService.cartTotal$.subscribe((total) => (this.cartTotal = total));
  }
  selectProductOfType(tenlsp: String) {
    this.router.navigate(['/products/loaisp', tenlsp]).then();
  }

  ChangeQuantity(masp: number, increaseQuantity: Boolean) {
    this.cartService.UpdateCartData(masp, increaseQuantity);
  }
}
