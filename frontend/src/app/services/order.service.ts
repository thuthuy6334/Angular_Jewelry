import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  products: ProductResponseModel[] = [];

  private serverUrl = environment.SERVER_URL;

  constructor(private http: HttpClient) {}


  getSingleOrder(orderId: Number) {
    return this.http.get<ProductResponseModel[]>(`${this.serverUrl}orders/${orderId}`).toPromise();
  }
}


interface ProductResponseModel{
  masp: number;
  tensp: string;
  dongia: number;
  hinh: string;
  mota: string;
  soluongdat: Number;
}
