import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ProductModelServer,
  serverResponse,
} from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  products: ProductModelServer[] = [];
  productsDaychuyen: ProductModelServer[] = [];
  productsBongtai: ProductModelServer[] = [];
  productsVongtay: ProductModelServer[] = [];

  id!: number;
  product: any;
  @ViewChild('soluong') soluongInput: any;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.productService.getAllProducts(4).subscribe((prods: serverResponse) => {
      this.products = prods.products;
      console.log(this.products);
    });
    this.productService
      .getProductsDaychuyen(3)
      .subscribe((prods: serverResponse) => {
        this.productsDaychuyen = prods.products;
        console.log(this.productsDaychuyen);
      });
    this.productService
      .getProductsBongtai(3)
      .subscribe((prods: serverResponse) => {
        this.productsBongtai = prods.products;
        console.log(this.productsBongtai);
      });
    this.productService
      .getProductsVongtay(3)
      .subscribe((prods: serverResponse) => {
        this.productsVongtay = prods.products;
        console.log(this.productsVongtay);
      });

    this.route.paramMap
      .pipe(
        map((param: ParamMap) => {
          //@ts-ignore
          return param.params.masp;
        })
      )
      .subscribe((prodId) => {
        this.id = prodId;
        this.productService.getSingleProduct(this.id).subscribe((prod) => {
          this.product = prod;
        });
      });
  }
  selectProduct(masp: number) {
    this.router.navigate(['/detail', masp]).then();
  }
  AddProduct(masp: number) {
    this.cartService.AddProductToCart(masp);
  }
}
