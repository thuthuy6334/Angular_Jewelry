import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
// import { serverResponse } from 'src/app/models/product.model';
import {
  ProductModelServer,
  serverResponse,
} from 'src/app/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  id!: number;
  product: any;
  productsCaitoc: ProductModelServer[] = [];

  @ViewChild('soluong') soluongInput: any;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService
      .getProductsCaitoc(4)
      .subscribe((prods: serverResponse) => {
        this.productsCaitoc = prods.products;
        console.log(this.productsCaitoc);
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

  Increase() {
    let value = parseInt(this.soluongInput.nativeElement.value);
    if (this.product.soluong >= 1) {
      value++;
      if (value > this.product.soluong) {
        value = this.product.soluong;
      }
    } else {
      return;
    }
    this.soluongInput.nativeElement.value = value.toString();
  }
  Decrease() {
    let value = parseInt(this.soluongInput.nativeElement.value);
    if (this.product.soluong > 0) {
      value--;
      if (value <= 0) {
        value = 0;
      }
    } else {
      return;
    }
    this.soluongInput.nativeElement.value = value.toString();
  }

  addToCart(masp: number) {
    this.cartService.AddProductToCart(
      masp,
      this.soluongInput.nativeElement.value
    );
  }

  selectProduct(masp: number) {
    this.router.navigate(['/detail', masp]).then();
  }
  AddProduct(masp: number) {
    this.cartService.AddProductToCart(masp);
  }
}
