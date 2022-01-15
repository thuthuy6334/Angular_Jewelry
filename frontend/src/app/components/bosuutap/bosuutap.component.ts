import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ProductModelServer,
  serverResponse,
} from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-bosuutap',
  templateUrl: './bosuutap.component.html',
  styleUrls: ['./bosuutap.component.css'],
})
export class BosuutapComponent implements OnInit {
  products: ProductModelServer[] = [];
  productsThiennhien: ProductModelServer[] = [];
  productsVutru: ProductModelServer[] = [];
  productsThanhlich: ProductModelServer[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService
      .getProductsThiennhien(4)
      .subscribe((prods: serverResponse) => {
        this.productsThiennhien = prods.products;
        console.log(this.productsThiennhien);
      });
    this.productService
      .getProductsVutru(4)
      .subscribe((prods: serverResponse) => {
        this.productsVutru = prods.products;
        console.log(this.productsVutru);
      });
    this.productService
      .getProductsThanhlich(4)
      .subscribe((prods: serverResponse) => {
        this.productsThanhlich = prods.products;
        console.log(this.productsThanhlich);
      });
  }

  selectProduct(masp: number) {
    this.router.navigate(['/detail', masp]).then();
  }
  AddProduct(masp: number) {
    this.cartService.AddProductToCart(masp);
  }
}
