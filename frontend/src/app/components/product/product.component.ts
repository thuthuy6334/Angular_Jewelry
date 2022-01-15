import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ProductModelServer,
  serverResponse,
} from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productsAll: ProductModelServer[] = [];
  productsMenu: ProductModelServer[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.productService
      .getAllInPageProducts()
      .subscribe((prods: serverResponse) => {
        this.productsAll = prods.products;
        console.log(this.productsAll);
      });

    this.productService
      .getAllTypeOfProducts()
      .subscribe((prods: serverResponse) => {
        this.productsMenu = prods.products;
        console.log(this.productsMenu);
      });
  }
  //cái để phân trang
  p: any;
  data: any = [];
  getData() {
    this.auth.getData().subscribe((data) => {
      this.data = data;
    });
  }

  //hết phân trang
  selectProduct(masp: number) {
    this.router.navigate(['/detail', masp]).then();
  }

  selectProductOfType(tenlsp: String) {
    this.router.navigate(['/products/loaisp', tenlsp]).then();
  }
}
