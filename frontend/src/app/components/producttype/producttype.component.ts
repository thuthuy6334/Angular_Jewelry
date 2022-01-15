import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ProductModelServer,
  serverResponse,
} from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-producttype',
  templateUrl: './producttype.component.html',
  styleUrls: ['./producttype.component.css'],
})
export class ProducttypeComponent implements OnInit {
  productsList: ProductModelServer[] = [];
  productsMenu: ProductModelServer[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const tenlsp = this.route.snapshot.paramMap.get('tenlsp');
    // @ts-ignore
    this.productService
      .getProductsFromType(tenlsp)
      .subscribe((prods: serverResponse) => {
        this.productsList = prods.products;
        console.log(this.productsList);
      });
    this.productService
      .getAllTypeOfProducts()
      .subscribe((prods: serverResponse) => {
        this.productsMenu = prods.products;
        console.log(this.productsMenu);
      });
  }

  // selectProduct(masp: Number) {
  //   this.router.navigate(['/details', masp]).then();
  // }
  AddProduct(masp: number) {
    this.cartService.AddProductToCart(masp);
  }
  selectProducts(masp: number) {
    this.router.navigate(['/detail', masp]).then();
  }

  selectProductOfType(tenlsp: String) {
    this.router.navigate(['/products/loaisp', tenlsp]).then();
  }
}
