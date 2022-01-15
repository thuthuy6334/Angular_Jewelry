import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CartModelPublic, CartModelServer} from "../models/cart.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {NavigationExtras, Router} from "@angular/router";
import {OrderService} from "./order.service";
import { ProductModelServer } from '../models/product.model';
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})


export class CartService {
  

  ServerURL = environment.SERVER_URL;

  private cartDataClient: CartModelPublic = {prodData: [{incart: 0, id: 0}], total: 0};  // This will be sent to the backend Server as post data
  // Cart Data variable to store the cart information on the server
  private cartDataServer: CartModelServer = {
    data: [{
     
      product: undefined!,
      numInCart: 0
    }],
    total: 0
  };

  cartTotal$ = new BehaviorSubject<number>(0);
  // Data variable to store the cart information on the client's local storage

  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);


  constructor(private productService: ProductsService,
              private orderService: OrderService,
              private httpClient: HttpClient,
              private router: Router,
              private spinner: NgxSpinnerService, 
              private toast: ToastrService) {

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(this.cartDataServer);
    
    let info: CartModelPublic = JSON.parse(localStorage.getItem('cart') as string);

    if (info !== null && info !== undefined && info.prodData[0].incart !== 0) {
      // assign the value to our data variable which corresponds to the LocalStorage data format
      this.cartDataClient = info;
      // Loop through each entry and put it in the cartDataServer object
      this.cartDataClient.prodData.forEach(p => {
        this.productService.getSingleProduct(p.id).subscribe((actualProdInfo: ProductModelServer) => {
          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].numInCart = p.incart;
            this.cartDataServer.data[0].product = actualProdInfo;
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {
            this.cartDataServer.data.push({
              numInCart: p.incart,
              product: actualProdInfo
            });
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartDataObs$.next({...this.cartDataServer});
        });
      });
    }
  }

  CalculateSubTotal(index:any): number {
    let subTotal = 0;

    let p = this.cartDataServer.data[index];
        subTotal = p.product.dongia * p.numInCart;

    return subTotal;
  }

  AddProductToCart(id: number, soluong?: number) {

    this.productService.getSingleProduct(id).subscribe((prod:any) => {
      // If the cart is empty
      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numInCart = soluong !== undefined ? soluong : 1;
        this.CalculateTotal();
        this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0].id = prod.id;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({...this.cartDataServer});
        this.toast.success(`${prod.tensp} Sản phẩm đã được thêm vào giỏ hàng`, " Thêm vào giỏ hàng", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
      }  // END of IF
      // Cart is not empty
      else {
        let index = this.cartDataServer.data.findIndex(p => p.product.masp === prod.id);

        // 1. If chosen product is already in cart array
        if (index !== -1) {

          if (soluong !== undefined && soluong <= prod.soluong) {
           
            this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.soluong ? soluong : prod.soluong;
          } else {
            
            this.cartDataServer.data[index].numInCart < prod.soluong ? this.cartDataServer.data[index].numInCart++ : prod.soluong;
          }


          this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
          this.toast.info(`${prod.name} Cập nhật giỏ hàng`, "Số lượng đã được cập nhật trong giỏ hàng.", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          })
        }
        // 2. If chosen product is not in cart array
        else {
          this.cartDataServer.data.push({
            product: prod,
            numInCart: 1
          });
          this.cartDataClient.prodData.push({
            incart: 1,
            id: prod.id
          });
          this.toast.success(`${prod.name} Thêm vào giỏ hàng.`, "Sản phẩm đã được thêm vào giỏ hàng", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          })
        }
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({...this.cartDataServer});
      }  // END of ELSE


    });
  }

  UpdateCartData(index:any, increase: Boolean) {
    let data = this.cartDataServer.data[index];
    if (increase) {
      
      data.numInCart < data.product.soluong ? data.numInCart++ : data.product.soluong;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      this.cartDataObs$.next({...this.cartDataServer});
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    } else {
      
      data.numInCart--;

      
      if (data.numInCart < 1) {
        this.DeleteProductFromCart(index);
        this.cartDataObs$.next({...this.cartDataServer});
      } else {
       
        this.cartDataObs$.next({...this.cartDataServer});
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

    }

  }

  DeleteProductFromCart(index:any) {
    /*    console.log(this.cartDataClient.prodData[index].prodId);
        console.log(this.cartDataServer.data[index].product.id);*/

    if (window.confirm('Bạn có muốn xóa sản phẩm này')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {
          data: [{
            //@ts-ignore
            product: undefined,
            numInCart: 0
          }],
          total: 0
        };
        this.cartDataObs$.next({...this.cartDataServer});
      } else {
        this.cartDataObs$.next({...this.cartDataServer});
      }
    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }


  }

  // CheckoutFromCart(userId: Number) {

  //   this.httpClient.post(`${this.ServerURL}orders/payment`, null).subscribe((res: { success: Boolean }) => {
  //     console.clear();

  //     if (res.success) {


  //       this.resetServerData();
  //       this.httpClient.post(`${this.ServerURL}orders/new`, {
  //         userId: userId,
  //         products: this.cartDataClient.prodData
  //       }).subscribe((data: OrderConfirmationResponse) => {

  //         this.orderService.getSingleOrder(data.order_id).then(prods => {
  //           if (data.success) {
  //             const navigationExtras: NavigationExtras = {
  //               state: {
  //                 message: data.message,
  //                 products: prods,
  //                 orderId: data.order_id,
  //                 total: this.cartDataClient.total
  //               }
  //             };
  //             this.spinner.hide().then();
  //             this.router.navigate(['/thankyou'], navigationExtras).then(p => {
  //               this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
  //               this.cartTotal$.next(0);
  //               localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
  //             });
  //           }
  //         });

  //       })
  //     } else {
  //       this.spinner.hide().then();
  //       this.router.navigateByUrl('/checkout').then();
  //       this.toast.error(`Sorry, failed to book the order`, "Order Status", {
  //         timeOut: 1500,
  //         progressBar: true,
  //         progressAnimation: 'increasing',
  //         positionClass: 'toast-top-right'
  //       })
  //     }
  //   })
  // }


  private CalculateTotal() {
    let Total = 0;

    this.cartDataServer.data.forEach(p => {
      const {numInCart} = p;
      const {dongia} = p.product;
      // @ts-ignore
      Total += numInCart * dongia;

      console.log(this.cartDataServer.data);
      console.log(numInCart);
      console.log(dongia);
      console.log(Total);
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  private resetServerData() {
    this.cartDataServer = {
      data: [{
        //@ts-ignore
        product: undefined,
        numInCart: 0
      }],
      total: 0
    };
    this.cartDataObs$.next({...this.cartDataServer});
  }

}

interface OrderConfirmationResponse {
  order_id: Number;
  success: Boolean;
  message: String;
  products: [{
    id: String,
    numInCart: String
  }]
}
